import { Position } from '~redux/slices/game'

export const handleCollision = (
  polyX1: number,
  polyY1: number,
  polyX2: number,
  polyY2: number,
  polyX3: number,
  polyY3: number,
  polyX4: number,
  polyY4: number,
  hitboX: number,
  hitboY: number
) => {
  const angle1 = getAngle(
    { x: polyX1, y: polyY1 },
    { x: hitboX, y: hitboY },
    { x: polyX2, y: polyY2 }
  )
  const angle2 = getAngle(
    { x: polyX2, y: polyY2 },
    { x: hitboX, y: hitboY },
    { x: polyX3, y: polyY3 }
  )
  const angle3 = getAngle(
    { x: polyX3, y: polyY3 },
    { x: hitboX, y: hitboY },
    { x: polyX4, y: polyY4 }
  )
  const angle4 = getAngle(
    { x: polyX4, y: polyY4 },
    { x: hitboX, y: hitboY },
    { x: polyX1, y: polyY1 }
  )

  const totalAngle = angle1 + angle2 + angle3 + angle4

  return totalAngle
}

export const getAngle = (A: Position, B: Position, C: Position) => {
  var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))
  var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2))
  var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2))

  return (
    Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * (180 / Math.PI)
  )
}

const toRadians = (angle: number) => {
  return angle * (Math.PI / 180)
}

// DIAGRAM: https://app.diagrams.net/#G1cy5PtgwJnl19e3pnx9I2fIMAX0jtiNJ0

// DEPRECATED
export const getVerticesRT = (
  top: number,
  bottom: number,
  left: number,
  right: number,
  height: number,
  angle: number
) => {
  const angleRD = toRadians(Math.abs(angle))
  const oppsiteSide = Math.sin(angleRD) * height
  const adyacentSide = Math.cos(angleRD) * height
  const polyX1 = Math.floor(left)
  const polyY1 = Math.floor(top + adyacentSide)
  const polyX2 = Math.floor(left + oppsiteSide)
  const polyY2 = Math.floor(top)
  const polyX3 = Math.floor(right - adyacentSide)
  const polyY3 = Math.floor(bottom)
  const polyX4 = Math.floor(right)
  const polyY4 = Math.floor(bottom - oppsiteSide)

  return { polyX1, polyY1, polyX2, polyY2, polyX3, polyY3, polyX4, polyY4 }
}

// DEPRECATED
export const getVerticesLB = (
  top: number,
  bottom: number,
  left: number,
  right: number,
  height: number,
  angle: number
) => {
  const angleRD = toRadians(Math.abs(180 - angle))
  const oppsiteSide = Math.sin(angleRD) * height
  const adyacentSide = Math.cos(angleRD) * height
  const polyX1 = Math.floor(left)
  const polyY1 = Math.floor(top + adyacentSide)
  const polyX2 = Math.floor(left + oppsiteSide)
  const polyY2 = Math.floor(top)
  const polyX3 = Math.floor(right - adyacentSide)
  const polyY3 = Math.floor(bottom)
  const polyX4 = Math.floor(right)
  const polyY4 = Math.floor(bottom - oppsiteSide)

  return { polyX1, polyY1, polyX2, polyY2, polyX3, polyY3, polyX4, polyY4 }
}

// DEPRECATED
export const getVerticesRB = (
  top: number,
  bottom: number,
  left: number,
  right: number,
  height: number,
  angle: number
) => {
  const angleRD = toRadians(Math.abs(90 - angle))
  const oppsiteSide = Math.sin(angleRD) * height
  const adyacentSide = Math.cos(angleRD) * height
  const polyX1 = Math.floor(right)
  const polyY1 = Math.floor(top + oppsiteSide)
  const polyX2 = Math.floor(right - adyacentSide)
  const polyY2 = Math.floor(top)
  const polyX3 = Math.floor(left)
  const polyY3 = Math.floor(bottom - oppsiteSide)
  const polyX4 = Math.floor(left + adyacentSide)
  const polyY4 = Math.floor(bottom)

  return { polyX1, polyY1, polyX2, polyY2, polyX3, polyY3, polyX4, polyY4 }
}

// DEPRECATED
export const getVerticesLT = (
  top: number,
  bottom: number,
  left: number,
  right: number,
  height: number,
  angle: number
) => {
  const angleRD = toRadians(Math.abs(360 - angle))
  const oppsiteSide = Math.sin(angleRD) * height
  const adyacentSide = Math.cos(angleRD) * height
  const polyX1 = Math.floor(right)
  const polyY1 = Math.floor(top + adyacentSide)
  const polyX2 = Math.floor(right - oppsiteSide)
  const polyY2 = Math.floor(top)
  const polyX3 = Math.floor(left)
  const polyY3 = Math.floor(bottom - adyacentSide)
  const polyX4 = Math.floor(left + oppsiteSide)
  const polyY4 = Math.floor(bottom)

  return { polyX1, polyY1, polyX2, polyY2, polyX3, polyY3, polyX4, polyY4 }
}
