export type OrganicPoint = { x: number; y: number; phase: number; amplitude: number; frequency: number }

export function createOrganicPoints(count: number, seed = 17): OrganicPoint[] {
  return Array.from({ length: count }, (_, index) => {
    const n = index + seed
    return {
      x: ((n * 47) % 997) / 997,
      y: ((n * 83) % 991) / 991,
      phase: ((n * 31) % 113) / 113 * Math.PI * 2,
      amplitude: 0.45 + ((n * 19) % 55) / 100,
      frequency: 0.65 + ((n * 13) % 80) / 100,
    }
  })
}

export function organicOffset(point: OrganicPoint, time: number, windX = 0, windY = 0) {
  const phase = point.phase + time * point.frequency
  return {
    x: Math.sin(phase) * point.amplitude * (1 + Math.abs(windX) * 0.8),
    y: Math.cos(phase * 0.73) * point.amplitude * (1 + Math.abs(windY) * 0.55),
  }
}
