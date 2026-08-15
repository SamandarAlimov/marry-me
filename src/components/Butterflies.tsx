import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMemo } from 'react'

interface Butterfly {
  id: number
  left: number
  top: number
  size: number
  duration: number
  delay: number
  amplitude: number
}

export function Butterflies({ active }: { active: boolean }) {
  const pointer = useMotionValue(0)
  const smoothPointer = useSpring(pointer, { stiffness: 30, damping: 18 })
  const drift = useTransform(smoothPointer, [-1, 1], [-16, 16])
  const butterflies = useMemo<Butterfly[]>(() => Array.from({ length: 4 }, (_, id) => ({
    id,
    left: 14 + id * 22,
    top: 30 + (id % 2) * 14,
    size: 0.75 + id * 0.08,
    duration: 9 + id * 1.7,
    delay: id * 1.9,
    amplitude: 18 + id * 4,
  })), [])

  return (
    <motion.div className="butterflies" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 1.8, delay: 0.8 }} onPointerMove={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect()
      pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1)
    }} onPointerLeave={() => pointer.set(0)}>
      {butterflies.map((butterfly) => (
        <motion.div key={butterfly.id} className="butterfly" style={{ left: `${butterfly.left}%`, top: `${butterfly.top}%`, scale: butterfly.size, x: drift }} animate={{ y: [-butterfly.amplitude, butterfly.amplitude, -butterfly.amplitude], rotate: [-8, 8, -8] }} transition={{ duration: butterfly.duration, delay: butterfly.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <span className="wing wing-left" />
          <span className="wing wing-right" />
          <span className="butterfly-body" />
        </motion.div>
      ))}
    </motion.div>
  )
}
