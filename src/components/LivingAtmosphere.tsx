import { motion, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { useWindField } from '../engine/wind'

type Blade = { id: number; x: number; h: number; phase: number; delay: number }
type Pollen = { id: number; x: number; y: number; drift: number; phase: number }

export function LivingAtmosphere({ active }: { active: boolean }) {
  const wind = useWindField()
  const grass = useMemo<Blade[]>(() => Array.from({ length: 72 }, (_, id) => ({
    id, x: 1 + ((id * 37) % 98), h: 8 + ((id * 17) % 16), phase: (id * .41) % 3, delay: (id % 9) * .07,
  })), [])
  const pollen = useMemo<Pollen[]>(() => Array.from({ length: 18 }, (_, id) => ({
    id, x: 5 + ((id * 43) % 90), y: 35 + ((id * 29) % 45), drift: 8 + ((id * 11) % 22), phase: (id % 8) * .6,
  })), [])
  const sway = useTransform(wind.x, [-1, 1], [-6, 6])

  return <div className="living-atmosphere" aria-hidden="true">
    <div className="grass-field">
      {grass.map((blade) => <motion.i key={blade.id} className="grass-blade" style={{ left: `${blade.x}%`, height: blade.h, rotate: blade.id % 2 ? 3 : -3, x: sway }} animate={{ rotate: [-5, 7, -2, 4, -5], y: [0, -1, 0, 1, 0] }} transition={{ duration: 3.4 + blade.phase, delay: blade.delay, repeat: Infinity, ease: 'easeInOut' }} />)}
    </div>
    {pollen.map((particle) => <motion.i key={particle.id} className="pollen" style={{ left: `${particle.x}%`, top: `${particle.y}%` }} initial={{ opacity: 0 }} animate={active ? { opacity: [0, .35, .12, .4, 0], x: [0, particle.drift, -particle.drift * .6, particle.drift * .4, 0], y: [0, -12, -26, -38, -48] } : { opacity: 0 }} transition={{ duration: 9 + particle.phase, delay: particle.phase, repeat: Infinity, ease: 'easeInOut' }} />)}
  </div>
}
