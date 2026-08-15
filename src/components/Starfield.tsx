import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMemo } from 'react'

interface Star { id: number; x: number; y: number; size: number; depth: number; phase: number }

export function Starfield({ active }: { active: boolean }) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, { stiffness: 28, damping: 20 })
  const y = useSpring(pointerY, { stiffness: 28, damping: 20 })
  const stars = useMemo<Star[]>(() => Array.from({ length: 120 }, (_, id) => ({
    id, x: (id * 37.17) % 100, y: (id * 61.83) % 100,
    size: 1 + (id % 4) * 0.45, depth: 0.2 + (id % 8) / 10, phase: (id % 17) * 0.31,
  })), [])
  const shiftX = useTransform(x, [-1, 1], [-18, 18])
  const shiftY = useTransform(y, [-1, 1], [-10, 10])

  return (
    <motion.div className="starfield" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 2.4, ease: 'easeOut' }} onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
      pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
    }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}>
      {stars.map((star) => (
        <motion.i key={star.id} className="star" style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, x: useTransform(shiftX, (value) => value * star.depth), y: useTransform(shiftY, (value) => value * star.depth) }} animate={{ opacity: [0.15, 0.65, 0.2], scale: [0.7, 1, 0.8] }} transition={{ duration: 4 + star.depth * 5, delay: star.phase, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </motion.div>
  )
}
