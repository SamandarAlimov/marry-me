export interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  drift: number
  phase: number
  opacity: number
}

export function createParticles(count: number, seed = 17): Particle[] {
  let state = seed >>> 0
  const random = () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 4294967296
  }

  return Array.from({ length: count }, (_, id) => ({
    id,
    x: random() * 100,
    y: random() * 100,
    size: 1 + random() * 2.4,
    speed: 0.08 + random() * 0.22,
    drift: -1 + random() * 2,
    phase: random() * Math.PI * 2,
    opacity: 0.08 + random() * 0.34,
  }))
}
