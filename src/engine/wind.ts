import { useEffect } from 'react'
import type { MotionValue } from 'framer-motion'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export interface WindField {
  x: MotionValue<number>
  y: MotionValue<number>
  strength: MotionValue<number>
  targetX: MotionValue<number>
  targetY: MotionValue<number>
}

/** Converts pointer movement into a slowly settling environmental wind field. */
export function useWindField(): WindField {
  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const x = useSpring(targetX, { stiffness: 26, damping: 18, mass: 0.7 })
  const y = useSpring(targetY, { stiffness: 26, damping: 18, mass: 0.7 })
  const strength = useTransform([x, y], ([currentX, currentY]) => Math.min(1, Math.hypot(currentX, currentY)))

  useEffect(() => {
    const move = (event: PointerEvent) => {
      targetX.set((event.clientX / window.innerWidth) * 2 - 1)
      targetY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    const leave = () => { targetX.set(0); targetY.set(0) }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerleave', leave)
    }
  }, [targetX, targetY])

  return { x, y, strength, targetX, targetY }
}

export function setWindTarget(field: WindField, x: number, y: number) {
  field.targetX.set(Math.max(-1, Math.min(1, x)))
  field.targetY.set(Math.max(-1, Math.min(1, y)))
}
