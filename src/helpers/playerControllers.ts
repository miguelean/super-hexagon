import { SetStateAction } from 'react'

export const keyDownHandler = ({
  key,
  setLeftHeld,
  setRightHeld,
}: {
  key: string
  setLeftHeld: (value: SetStateAction<boolean>) => void
  setRightHeld: (value: SetStateAction<boolean>) => void
}) => {
  if (key === 'ArrowLeft') {
    setLeftHeld(true)
    setRightHeld(false)
  }
  if (key === 'ArrowRight') {
    setRightHeld(true)
    setLeftHeld(false)
  }
}

export const keyUpHandler = ({
  key,
  setLeftHeld,
  setRightHeld,
}: {
  key: string
  setLeftHeld: (value: SetStateAction<boolean>) => void
  setRightHeld: (value: SetStateAction<boolean>) => void
}) => {
  if (key === 'ArrowLeft') {
    setLeftHeld(false)
  }
  if (key === 'ArrowRight') {
    setRightHeld(false)
  }
}

export const playerController = ({
  leftHeld,
  rightHeld,
  degres,
  setDegres,
  el,
}: {
  leftHeld: boolean
  rightHeld: boolean
  degres: number
  setDegres: (value: SetStateAction<number>) => void
  el: HTMLDivElement | null
}) => {
  if (leftHeld && el) {
    setDegres(degres - 2)
    el.style.transform = `rotate(${degres}deg)`
  }
  if (rightHeld && el) {
    setDegres(degres + 2)
    el.style.transform = `rotate(${degres}deg)`
  }
}
