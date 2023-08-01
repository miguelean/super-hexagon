import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleCollision } from '~helpers/collisionControllers'
import { selectAngle } from '~redux/selectors/angle'
import {
  selectPlayerIntervalId,
  selectSpawnIntervalId,
} from '~redux/selectors/intervals'
import { selectIsPLaying } from '~redux/selectors/isPlaying'
import {
  selectPlayerH1,
  selectPlayerH2,
  selectPlayerH3,
} from '~redux/selectors/player'
import { pause, updateScore } from '~redux/slices/game'

type LineProps = {
  angle: number
}

export const Line = ({ angle }: LineProps) => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null)

  const refVertix1 = useRef<HTMLDivElement>(null)
  const refVertix2 = useRef<HTMLDivElement>(null)
  const refVertix3 = useRef<HTMLDivElement>(null)
  const refVertix4 = useRef<HTMLDivElement>(null)

  const hitbox1 = useSelector(selectPlayerH1)
  const hitbox2 = useSelector(selectPlayerH2)
  const hitbox3 = useSelector(selectPlayerH3)
  const boardAngle = +useSelector(selectAngle)
  const playerIntervalId = useSelector(selectPlayerIntervalId)
  const spawnIntervalId = useSelector(selectSpawnIntervalId)
  const isPlaying = useSelector(selectIsPLaying)

  const [isTouching, setIsTouching] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      ref.current && ref.current.parentElement?.remove()
      setShouldRender(false)
      dispatch(updateScore())
    }, 12000)
    setTimeoutId(timeoutId)
  }, [dispatch])

  useEffect(() => {
    if (
      ref.current &&
      refVertix1.current &&
      refVertix2.current &&
      refVertix3.current &&
      refVertix4.current
    ) {
      const polyX1 = refVertix1.current.getBoundingClientRect()?.x
      const polyY1 = refVertix1.current.getBoundingClientRect()?.y
      const polyX2 = refVertix2.current.getBoundingClientRect()?.x
      const polyY2 = refVertix2.current.getBoundingClientRect()?.y
      const polyX3 = refVertix3.current.getBoundingClientRect()?.x
      const polyY3 = refVertix3.current.getBoundingClientRect()?.y
      const polyX4 = refVertix4.current.getBoundingClientRect()?.x
      const polyY4 = refVertix4.current.getBoundingClientRect()?.y

      const angle1 = handleCollision(
        polyX1,
        polyY1,
        polyX2,
        polyY2,
        polyX3,
        polyY3,
        polyX4,
        polyY4,
        hitbox1?.x ?? 0,
        hitbox1?.y ?? 0
      )

      const angle2 = handleCollision(
        polyX1,
        polyY1,
        polyX2,
        polyY2,
        polyX3,
        polyY3,
        polyX4,
        polyY4,
        hitbox2?.x ?? 0,
        hitbox2?.y ?? 0
      )

      const angle3 = handleCollision(
        polyX1,
        polyY1,
        polyX2,
        polyY2,
        polyX3,
        polyY3,
        polyX4,
        polyY4,
        hitbox3?.x ?? 0,
        hitbox3?.y ?? 0
      )

      setIsTouching(angle1 >= 360 || angle2 >= 360 || angle3 >= 360)
    }
  }, [
    hitbox1?.x,
    hitbox1?.y,
    hitbox2?.x,
    hitbox2?.y,
    hitbox3?.x,
    hitbox3?.y,
    boardAngle,
  ])

  useEffect(() => {
    if (isTouching) {
      clearInterval(playerIntervalId)
      clearInterval(spawnIntervalId)
      dispatch(pause())
      const audio = new Audio(`${process.env.NEXT_PUBLIC_HOST}/game-over.wav`)
      audio.play()
    }
  }, [dispatch, isTouching])

  useEffect(() => {
    !isPlaying && clearTimeout(timeoutId)
  }, [isPlaying])

  if (!shouldRender || !isPlaying) return null

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ y: 0 }}
        animate={{ y: 255, scaleY: 0.2, scaleX: 0 }}
        transition={{ duration: 12, ease: 'linear' }}
        className='relative w-full h-3 bg-orange-500'
      >
        <div
          ref={refVertix1}
          className='absolute w-[1px] h-[1px] top-0 left-0'
        ></div>
        <div
          ref={refVertix2}
          className='absolute w-[1px] h-[1px] bottom-0 left-[2px]'
        ></div>
        <div
          ref={refVertix3}
          className='absolute w-[1px] h-[1px] top-0 right-0'
        ></div>
        <div
          ref={refVertix4}
          className='absolute w-[1px] h-[1px] bottom-0 right-[2px]'
        ></div>
      </motion.div>
    </>
  )
}
