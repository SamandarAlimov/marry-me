import { motion, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { useWindField } from '../engine/wind'

interface FlowerFieldProps { active: boolean; progress?: number }

export function FlowerField({ active, progress = 1 }: FlowerFieldProps) {
  const wind = useWindField()
  const sway = useTransform(wind.x, [-1, 1], [-4, 4])
  const flowers = useMemo(() => Array.from({ length: 34 }, (_, id) => ({
    id,
    x: 6 + ((id * 29) % 88),
    y: 28 + ((id * 41) % 45),
    size: 5 + (id % 4) * 2,
    delay: (id % 17) * 0.075,
    duration: 1.15 + (id % 5) * 0.12,
    tilt: -18 + ((id * 17) % 36),
    sway: 1.5 + (id % 5) * .55,
  })), [])

  return <div className="flower-field" aria-hidden="true">
    {flowers.map((flower) => <motion.span key={flower.id} className="flower" style={{ left: `${flower.x}%`, top: `${flower.y}%`, width: flower.size, height: flower.size, rotate: flower.tilt, x: sway }} initial={{ opacity: 0, scale: 0, y: 10 }} animate={active ? { opacity: Math.min(1, progress * 1.3), scale: Math.min(1, progress * 1.2), y: [0, -flower.sway, 0], rotate: [flower.tilt - 2, flower.tilt + 3, flower.tilt - 2] } : { opacity: 0, scale: 0, y: 10 }} transition={{ delay: flower.delay, duration: active ? flower.duration + 2.5 : flower.duration, repeat: active ? Infinity : 0, repeatType: 'mirror', ease: [0.16, 1, 0.3, 1] }} />)}
  </div>
}
