import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMemo } from 'react'

interface Point { id: number; x: number; y: number; tx: number; ty: number; size: number; phase: number }
const targets = [[-42,-8],[-21,-30],[0,-42],[22,-30],[43,-7],[27,14],[0,31],[-27,14]]

export function Constellation({ active, formed }: { active: boolean; formed: boolean }) {
  const pointer = useMotionValue(0)
  const smooth = useSpring(pointer, { stiffness: 35, damping: 18 })
  const drift = useTransform(smooth, [-1, 1], [-7, 7])
  const points = useMemo<Point[]>(() => Array.from({ length: 72 }, (_, id) => {
    const target = targets[id % targets.length]
    return { id, x: (id * 43.7) % 100, y: (id * 67.1) % 100, tx: target[0] + ((id * 11) % 9) - 4, ty: target[1] + ((id * 7) % 9) - 4, size: 1 + id % 3 * .45, phase: id % 13 * .18 }
  }), [])
  return <motion.div className="constellation" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 1.8 }} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1) }} onPointerLeave={() => pointer.set(0)}>
    {points.map((point) => <motion.i key={point.id} className="constellation-star" style={{ left: `${point.x}%`, top: `${point.y}%`, x: drift }} animate={{ left: formed ? `calc(50% + ${point.tx}px)` : `${point.x}%`, top: formed ? `calc(50% + ${point.ty}px)` : `${point.y}%`, opacity: [0.08, formed ? 1 : 0.7, 0.12], scale: [0.7, formed ? 1.3 : 1, 0.8] }} transition={{ duration: formed ? 2.8 + point.phase : 4 + point.phase, delay: point.phase, repeat: Infinity, ease: 'easeInOut' }} />)}
    {formed && <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="8,42 29,20 50,8 72,20 92,43 77,64 50,81 23,64 8,42" /></svg>}
  </motion.div>
}
