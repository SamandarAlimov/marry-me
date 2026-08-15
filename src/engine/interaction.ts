export interface PointerState {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
  velocityX: number
  velocityY: number
}

export interface InteractionState {
  pointer: PointerState
  hasInteracted: boolean
  intensity: number
}

export const initialInteractionState: InteractionState = {
  pointer: {
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocityX: 0,
    velocityY: 0,
  },
  hasInteracted: false,
  intensity: 0,
}

export function normalizePointer(
  x: number,
  y: number,
  width: number,
  height: number,
  previous: PointerState,
): PointerState {
  const normalizedX = (x / width) * 2 - 1
  const normalizedY = (y / height) * 2 - 1

  return {
    x,
    y,
    normalizedX,
    normalizedY,
    velocityX: normalizedX - previous.normalizedX,
    velocityY: normalizedY - previous.normalizedY,
  }
}
