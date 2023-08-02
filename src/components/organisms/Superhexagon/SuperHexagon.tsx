import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { useDispatch } from 'react-redux'
import { Line } from '~components/molecules/Line'
import { Player } from '~components/molecules/Player'
import { StoreProvider } from '~redux/Provider/StoreProvider'
import {
  setPlayerIntervalId,
  setSpawnIntervalId,
  updateAngle,
} from '~redux/slices/game'

export const SuperHexagon = () => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const t1 = useRef<HTMLDivElement>(null)
  const t2 = useRef<HTMLDivElement>(null)
  const t3 = useRef<HTMLDivElement>(null)
  const t4 = useRef<HTMLDivElement>(null)
  const t5 = useRef<HTMLDivElement>(null)
  const t6 = useRef<HTMLDivElement>(null)

  const triangles = useMemo(() => new Array(t1, t2, t3, t4, t5, t6), [])

  const audio = useMemo(
    () => new Audio(`${process.env.NEXT_PUBLIC_HOST}/game-over.wav`),
    []
  )

  const handleSpawn = useCallback(() => {
    const randomId = Math.floor(Math.random() * 6)

    triangles.map((triangle, idx) => {
      if (idx === randomId) return
      const div = document.createElement('div')
      div.className = 'h-0'
      createRoot(div).render(
        <StoreProvider>
          <Line audio={audio} />
        </StoreProvider>
      )
      triangle.current?.appendChild(div)
    })
  }, [triangles, audio])

  useEffect(() => {
    const spawnIntervalId = setInterval(handleSpawn, 1800)
    dispatch(setSpawnIntervalId(spawnIntervalId))
  }, [dispatch, handleSpawn])

  useEffect(() => {
    const playerIntervalId = setInterval(() => {
      const transform = ref.current?.style?.transform
      if (transform)
        dispatch(
          updateAngle({
            angle: transform
              ?.match(/rotate(\(.+deg\))/gm)?.[0]
              .split('.')[0]
              ?.match(/([0-9]+)/gm)?.[0],
          })
        )
    }, 20)
    dispatch(setPlayerIntervalId(playerIntervalId))
  }, [dispatch])

  return (
    <>
      <div className='overflow-hidden bg-[#f5914a]'>
        <motion.div
          ref={ref}
          className='box relative'
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        >
          {triangles.map((triangle, idx) => (
            <div
              key={idx}
              ref={triangle}
              className='triangle top-[calc(50vh_-_260px)]'
            ></div>
          ))}
          <div className='hexagon absolute w-[92px] h-20 left-0 right-0 top-[calc(50vh_-_40px)] ml-auto mr-auto bg-orange-500'></div>
          <div className='hexagon absolute w-[81px] h-[70px] left-0 right-0 top-[calc(50vh_-_35px)] ml-auto mr-auto  bg-[#de0000]'></div>
        </motion.div>
      </div>
      <Player />
    </>
  )
}
