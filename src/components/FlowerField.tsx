import { motion, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { useWindField } from '../engine/wind'
import '../styles/flowers.css'

interface FlowerFieldProps { active: boolean; progress?: number }
type Flower = { id: number; x: number; y: number; size: number; delay: number; duration: number; tilt: number; sway: number; stem: number; petalCount: number; phase: number }

export function FlowerField({ active, progress = 1 }: FlowerFieldProps) {
  const wind = useWindField()
  const sway = useTransform(wind.x, [-1, 1], [-4, 4])
  const flowers = useMemo<Flower[]>(() => Array.from({ length: 46 }, (_, id) => ({ id, x: 4 + ((id * 29) % 92), y: 32 + ((id * 41) % 44), size: 5 + (id % 5) * 1.7, delay: (id % 23) * .065, duration: 1.1 + (id % 7) * .13, tilt: -18 + ((id * 17) % 36), sway: 1.4 + (id % 5) * .55, stem: 16 + (id % 7) * 4, petalCount: 4 + (id % 3), phase: (id * 1.731) % (Math.PI * 2) })), [])
  const visible = Math.max(0, Math.min(flowers.length, Math.ceil(progress * flowers.length)))
  return <div className="flower-field" aria-hidden="true">
    {flowers.map((flower, index) => { const emerged = active && index < visible; return <motion.span key={flower.id} className="flower-cluster" style={{ left: `${flower.x}%`, top: `${flower.y}%`, x: sway }} initial={{ opacity: 0, scale: .2, y: 12 }} animate={emerged ? { opacity: [0, .95, .72], scale: [.2, 1.05, 1], y: [12, -1, 0] } : { opacity: 0, scale: .2, y: 12 }} transition={{ delay: flower.delay + index * .012, duration: flower.duration + 1.8, ease: [0.16, 1, .3, 1] }}>
      <i className="flower-stem" style={{ height: flower.stem }} />
      <motion.i className="flower-head" style={{ width: flower.size, height: flower.size, rotate: flower.tilt }} animate={emerged ? { rotate: [flower.tilt - 2, flower.tilt + 3, flower.tilt - 2], y: [0, -flower.sway, 0] } : { rotate: flower.tilt }} transition={{ duration: 3.8 + flower.phase, repeat: emerged ? Infinity : 0, ease: 'easeInOut' }}>
        {Array.from({ length: flower.petalCount }, (_, petal) => <b key={petal} style={{ transform: `rotate(${(360 / flower.petalCount) * petal}deg) translateY(-${Math.max(2, flower.size * .28)}px)` }} />)}<em />
      </motion.i>
    </motion.span> })}
  </div>
}
