import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  keyDownHandler,
  keyUpHandler,
  playerController,
} from '~helpers/playerControllers'
import { updatePosition } from '~redux/slices/game'

export const Player = () => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const refHitbox1 = useRef<HTMLDivElement>(null)
  const refHitbox2 = useRef<HTMLDivElement>(null)
  const refHitbox3 = useRef<HTMLDivElement>(null)

  const [leftHeld, setLeftHeld] = useState(false)
  const [rightHeld, setRightHeld] = useState(false)
  const [degres, setDegres] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.addEventListener('keydown', (e) =>
      keyDownHandler({ key: e.key, setLeftHeld, setRightHeld })
    )
    window.addEventListener('keyup', (e) =>
      keyUpHandler({ key: e.key, setLeftHeld, setRightHeld })
    )
    return () => {
      window.removeEventListener('keydown', (e) =>
        keyDownHandler({ key: e.key, setLeftHeld, setRightHeld })
      )
      window.removeEventListener('keyup', (e) =>
        keyUpHandler({ key: e.key, setLeftHeld, setRightHeld })
      )
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      playerController({
        leftHeld,
        rightHeld,
        degres,
        setDegres,
        el: ref.current,
      })
    }, 10)
  }, [degres, leftHeld, rightHeld])

  useEffect(() => {
    const hitbox1 = {
      x: refHitbox1.current?.getBoundingClientRect().x ?? 0,
      y: refHitbox1.current?.getBoundingClientRect().y ?? 0,
    }
    const hitbox2 = {
      x: refHitbox2.current?.getBoundingClientRect().x ?? 0,
      y: refHitbox2.current?.getBoundingClientRect().y ?? 0,
    }
    const hitbox3 = {
      x: refHitbox3.current?.getBoundingClientRect().x ?? 0,
      y: refHitbox3.current?.getBoundingClientRect().y ?? 0,
    }

    ref.current && dispatch(updatePosition({ hitbox1, hitbox2, hitbox3 }))
  }, [degres])

  useEffect(() => {
    setIsMobile(window.innerWidth < 800)
  }, [])

  return (
    <>
      <div ref={ref} className='player'>
        <div className='relative cursor bg-[red]'>
          <div
            ref={refHitbox1}
            className='absolute left-0 right-0 ml-auto mr-auto z-[99] w-[1px] min-h-[1px]'
          />
          <div
            ref={refHitbox2}
            className='absolute left-0 bottom-0 ml-auto mr-auto z-[99] w-[1px] min-h-[1px]'
          />
          <div
            ref={refHitbox3}
            className='absolute right-0 bottom-0 ml-auto mr-auto z-[99] w-[1px] min-h-[1px]'
          />
        </div>
      </div>
      {isMobile && (
        <>
          <button
            onTouchStart={() => {
              keyDownHandler({ key: 'ArrowLeft', setLeftHeld, setRightHeld })
            }}
            onTouchEnd={() => {
              keyUpHandler({ key: 'ArrowLeft', setLeftHeld, setRightHeld })
            }}
            className='fixed bottom-6 left-6 w-16 h-16 p-3 rounded-full border-2 border-white bg-black shadow-lg'
          ></button>
          <button
            onTouchStart={() => {
              keyDownHandler({ key: 'ArrowRight', setLeftHeld, setRightHeld })
            }}
            onTouchEnd={() => {
              keyUpHandler({ key: 'ArrowRight', setLeftHeld, setRightHeld })
            }}
            className='fixed bottom-6 right-6 w-16 h-16 p-3 rounded-full border-2 border-white bg-black shadow-lg'
          ></button>
        </>
      )}
    </>
  )
}
