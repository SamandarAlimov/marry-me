import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { createOrganicPoints } from '../engine/organicMotion'

interface Butterfly { id: number; left: number; top: number; size: number; duration: number; delay: number; amplitude: number; phase: number }

export function Butterflies({ active }: { active: boolean }) {
  const pointer = useMotionValue(0)
  const smoothPointer = useSpring(pointer, { stiffness: 30, damping: 18 })
  const drift = useTransform(smoothPointer, [-1, 1], [-16, 16])
  const points = useMemo(() => createOrganicPoints(6, 73), [])
  const butterflies = useMemo<Butterfly[]>(() => points.map((point, id) => ({ id, left: 10 + point.x * 78, top: 24 + point.y * 42, size: .62 + point.amplitude * .35, duration: 8 + point.frequency * 4, delay: point.phase * .7, amplitude: 12 + point.amplitude * 18, phase: point.phase })), [points])

  return <motion.div className="butterflies" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 1.8, delay: .8 }} onPointerMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); pointer.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1) }} onPointerLeave={() => pointer.set(0)}>
    {butterflies.map((butterfly) => <motion.div key={butterfly.id} className="butterfly" style={{ left: `${butterfly.left}%`, top: `${butterfly.top}%`, scale: butterfly.size, x: drift }} animate={{ y: [-butterfly.amplitude, butterfly.amplitude * .3, butterfly.amplitude, -butterfly.amplitude * .2, -butterfly.amplitude], x: [0, 12 + butterfly.amplitude * .4, -8, 15, 0], rotate: [-8, 7, -5, 8, -8] }} transition={{ duration: butterfly.duration, delay: butterfly.delay, repeat: Infinity, ease: 'easeInOut' }}><motion.span className="wing wing-left" animate={{ scaleY: [.7, 1.15, .65, 1.1, .7] }} transition={{ duration: .42 + butterfly.phase * .03, repeat: Infinity, ease: 'easeInOut' }} /><motion.span className="wing wing-right" animate={{ scaleY: [1.1, .65, 1.15, .7, 1.1] }} transition={{ duration: .42 + butterfly.phase * .03, repeat: Infinity, ease: 'easeInOut' }} /><span className="butterfly-body" /></motion.div>)}
  </motion.div>
}
