export interface ProximityField {
  distance: number
  influence: number
  direction: number
}

/** Returns a smooth local influence value for an element along the horizontal axis. */
export function proximity(pointerX: number, elementX: number, radius = 0.28): ProximityField {
  const distance = Math.abs(pointerX - elementX)
  const influence = Math.max(0, 1 - distance / radius)
  const direction = pointerX >= elementX ? 1 : -1
  return { distance, influence: influence * influence, direction }
}
