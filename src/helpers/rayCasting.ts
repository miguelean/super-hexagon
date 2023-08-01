type Coordinates = { x: number; y: number }

// DEPRECATED

export const isPointInsidePolygon = (
  polyX1: number,
  polyY1: number,
  polyX2: number,
  polyY2: number,
  polyX3: number,
  polyY3: number,
  polyX4: number,
  polyY4: number,
  pointX: number,
  pointY: number
) => {
  // Convertimos las coordenadas del polígono en un array para facilitar el procesamiento
  const polygon = [
    { x: polyX1, y: polyY1 },
    { x: polyX2, y: polyY2 },
    { x: polyX3, y: polyY3 },
    { x: polyX4, y: polyY4 },
  ]

  // Verificamos si el punto está a la izquierda del polígono
  function isLeftOfEdge(
    start: Coordinates,
    end: Coordinates,
    point: Coordinates
  ) {
    return (
      (end.x - start.x) * (point.y - start.y) -
        (end.y - start.y) * (point.x - start.x) >
      0
    )
  }

  // Contamos el número de veces que un rayo hacia la derecha intersecta los lados del polígono
  let count = 0
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    if (
      polygon[i].y > pointY !== polygon[j].y > pointY &&
      pointX <
        ((polygon[j].x - polygon[i].x) * (pointY - polygon[i].y)) /
          (polygon[j].y - polygon[i].y) +
          polygon[i].x
    ) {
      if (isLeftOfEdge(polygon[i], polygon[j], { x: pointX, y: pointY })) {
        count++
      }
    }
  }

  // Si el número de intersecciones es impar, el punto está dentro del polígono
  return count % 2 !== 0
}
