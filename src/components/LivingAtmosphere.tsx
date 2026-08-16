import { motion, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { useWindField } from '../engine/wind'

type Blade = { id: number; x: number; h: number; phase: number; delay: number; depth: number }
type Pollen = { id: number; x: number; y: number; drift: number; phase: number; depth: number }

export function LivingAtmosphere({ active }: { active: boolean }) {
  const wind = useWindField()
  const grass = useMemo<Blade[]>(() => Array.from({ length: 108 }, (_, id) => ({ id, x: 1 + ((id * 37) % 98), h: 8 + ((id * 17) % 19), phase: (id * .41) % 3, delay: (id % 9) * .07, depth: .25 + ((id * 13) % 75) / 100 })), [])
  const pollen = useMemo<Pollen[]>(() => Array.from({ length: 30 }, (_, id) => ({ id, x: 5 + ((id * 43) % 90), y: 32 + ((id * 29) % 50), drift: 8 + ((id * 11) % 25), phase: (id % 8) * .6, depth: .3 + ((id * 19) % 70) / 100 })), [])
  const sway = useTransform(wind.x, [-1, 1], [-6, 6])
  const lift = useTransform(wind.y, [-1, 1], [2, -4])
  return <div className="living-atmosphere" aria-hidden="true">
    <div className="grass-field">{grass.map((blade) => <motion.i key={blade.id} className="grass-blade" style={{ left: `${blade.x}%`, height: blade.h, rotate: blade.id % 2 ? 3 : -3, x: sway }} animate={{ rotate: [-5 - blade.depth * 2, 7 + blade.depth * 4, -2, 4 + blade.depth * 2, -5], y: [0, -1 - blade.depth * 2, 0, 1, 0], scaleY: [.9, 1 + blade.depth * .08, .9] }} transition={{ duration: 2.8 + blade.phase + blade.depth, delay: blade.delay, repeat: Infinity, ease: 'easeInOut' }} />)}</div>
    {pollen.map((particle) => <motion.i key={particle.id} className="pollen" style={{ left: `${particle.x}%`, top: `${particle.y}%`, x: useTransform(wind.x, [-1, 1], [-particle.depth * 5, particle.depth * 5]), y: lift }} initial={{ opacity: 0 }} animate={active ? { opacity: [0, .35 + particle.depth * .18, .12, .4, 0], x: [0, particle.drift, -particle.drift * .6, particle.drift * .4, 0], y: [0, -12, -26, -38, -48] } : { opacity: 0 }} transition={{ duration: 8.5 + particle.phase + particle.depth * 2, delay: particle.phase, repeat: Infinity, ease: 'easeInOut' }} />)}
  </div>
}
