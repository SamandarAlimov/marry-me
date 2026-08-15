export interface WorldParallax {
  depth: number
  x: number
  y: number
}

export interface WorldLayer {
  id: string
  depth: number
  opacity: number
  parallax: WorldParallax
}

export interface WorldState {
  layers: WorldLayer[]
  ambientIntensity: number
  wind: number
  time: number
}

export const createWorldState = (): WorldState => ({
  layers: [
    { id: 'sky', depth: 0.08, opacity: 1, parallax: { depth: 0.08, x: 0, y: 0 } },
    { id: 'atmosphere', depth: 0.18, opacity: 0.7, parallax: { depth: 0.18, x: 0, y: 0 } },
    { id: 'distant', depth: 0.32, opacity: 0.9, parallax: { depth: 0.32, x: 0, y: 0 } },
    { id: 'midground', depth: 0.55, opacity: 1, parallax: { depth: 0.55, x: 0, y: 0 } },
    { id: 'foreground', depth: 0.82, opacity: 1, parallax: { depth: 0.82, x: 0, y: 0 } },
  ],
  ambientIntensity: 0.5,
  wind: 0.2,
  time: 0,
})

export function parallaxOffset(normalizedPointer: number, depth: number, strength = 24): number {
  return normalizedPointer * depth * strength
}
