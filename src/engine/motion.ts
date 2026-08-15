export const spring = {
  type: 'spring' as const,
  stiffness: 80,
  damping: 18,
  mass: 0.8,
}

export const cinematicEase = [0.16, 1, 0.3, 1] as const

export const sceneMotion = {
  enter: { opacity: 0, scale: 0.985, y: 28 },
  active: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 1.02, y: -20 },
}
