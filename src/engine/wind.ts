import type { MotionValue } from 'framer-motion'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export interface WindField {
  x: MotionValue<number>
  y: MotionValue<number>
  strength: MotionValue<number>
}

/** Converts pointer movement into a slowly settling environmental wind field. */
export function useWindField(): WindField {
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const x = useSpring(targetX, { stiffness: 26, damping: 18, mass: 0.7 })
  const y = useSpring(targetY, { stiffness: 26, damping: 18, mass: 0.7 })
  const strength = useTransform([x, y], ([currentX, currentY]) => Math.min(1, Math.hypot(currentX, currentY)))
  return { x, y, strength }
}

export function setWindTarget(field: WindField, x: number, y: number) {
  field.x.set(Math.max(-1, Math.min(1, x)))
  field.y.set(Math.max(-1, Math.min(1, y)))
}
