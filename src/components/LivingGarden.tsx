import { motion, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { createParticles } from '../engine/particle'
import { createOrganicPoints } from '../engine/organicMotion'
import { GardenDetails } from './GardenDetails'
import { useWindField } from '../engine/wind'

interface LivingGardenProps { active: boolean }

const trees = [
  { x: '8%', scale: 0.78, delay: 0.2 }, { x: '20%', scale: 1.02, delay: 0.8 },
  { x: '35%', scale: 0.66, delay: 1.4 }, { x: '64%', scale: 0.72, delay: 0.5 },
  { x: '78%', scale: 1.05, delay: 1.1 }, { x: '91%', scale: 0.8, delay: 1.8 },
]
const leaves = Array.from({ length: 38 }, (_, id) => ({ id, x: 6 + ((id * 31) % 88), y: 26 + ((id * 47) % 50), size: 4 + (id % 5), delay: (id % 12) * 0.11, phase: (id % 9) * 0.37 }))
const grass = createOrganicPoints(72, 41)

export function LivingGarden({ active }: LivingGardenProps) {
  const fireflies = useMemo(() => createParticles(24, 91), [])
  const wind = useWindField()
  const crownY = useTransform(wind.y, [-1, 1], [-2, 2])
  const heroLeftX = useTransform(wind.x, [-1, 1], [-5, 5])
  const heroRightX = useTransform(wind.x, [-1, 1], [-4, 4])

  return <motion.div className="living-garden" aria-hidden="true" initial={{ opacity: 0, y: 80 }} animate={{ opacity: active ? 1 : 0, y: active ? 0 : 80 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}>
    <div className="garden-haze" /><div className="garden-ground" /><GardenDetails />
    <motion.div className="hero-tree hero-tree-left" style={{ x: heroLeftX }} animate={{ scaleY: active ? 1 : 0.35, opacity: active ? 1 : 0 }} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}>
      <svg viewBox="0 0 220 520" className="hero-tree-svg"><path className="tree-bark" d="M110 520 C104 430 108 355 104 292 C101 234 73 197 46 158 M105 310 C128 268 151 224 170 178 M75 205 C55 181 36 163 24 136 M146 232 C166 214 190 196 205 164" /><path className="tree-branch" d="M104 292 C88 255 75 221 62 185 M120 330 C139 286 158 248 181 216" /></svg>
      <div className="hero-leaves">{leaves.slice(0, 19).map((leaf) => <motion.i key={leaf.id} style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }} animate={{ rotate: [-7, 5, -4], y: [0, -2, 1] }} transition={{ duration: 3.8 + leaf.phase, delay: leaf.delay, repeat: Infinity, ease: 'easeInOut' }} />)}</div>
    </motion.div>
    <motion.div className="hero-tree hero-tree-right" style={{ x: heroRightX }} animate={{ scaleY: active ? 1 : 0.35, opacity: active ? 1 : 0 }} transition={{ duration: 2.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}>
      <svg viewBox="0 0 220 520" className="hero-tree-svg"><path className="tree-bark" d="M110 520 C116 430 112 355 116 292 C119 234 147 197 174 158 M115 310 C92 268 69 224 50 178 M145 205 C165 181 184 163 196 136 M74 232 C54 214 30 196 15 164" /><path className="tree-branch" d="M116 292 C132 255 145 221 158 185 M100 330 C81 286 62 248 39 216" /></svg>
      <div className="hero-leaves hero-leaves-right">{leaves.slice(19).map((leaf) => <motion.i key={leaf.id} style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }} animate={{ rotate: [6, -5, 4], y: [0, 2, -1] }} transition={{ duration: 4.1 + leaf.phase, delay: leaf.delay, repeat: Infinity, ease: 'easeInOut' }} />)}</div>
    </motion.div>
    {trees.map((tree, index) => <motion.div key={index} className="tree" style={{ left: tree.x, scale: tree.scale }} initial={{ y: 30, opacity: 0 }} animate={{ y: active ? 0 : 30, opacity: active ? 1 : 0 }} transition={{ delay: tree.delay, duration: 1.4, ease: 'easeOut' }}><div className="trunk" /><motion.div className="crown" style={{ x: useTransform(wind.x, [-1, 1], [-3 - tree.scale * 2, 3 + tree.scale * 2]), y: crownY }} animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 5 + tree.scale, repeat: Infinity, ease: 'easeInOut', delay: tree.delay }}><i /><i /><i /><i /></motion.div></motion.div>)}
    <div className="organic-grass" aria-hidden="true">{grass.map((blade, index) => <motion.i key={index} style={{ left: `${blade.x * 100}%`, height: `${9 + blade.amplitude * 14}px` }} animate={{ rotate: [-5 + blade.phase * 1.5, 6 - blade.phase, -3, 4, -5], y: [0, -1.5, 0, 1, 0] }} transition={{ duration: 2.8 + blade.frequency, delay: blade.phase * .08, repeat: Infinity, ease: 'easeInOut' }} />)}</div>
    {fireflies.map((particle) => <motion.i key={particle.id} className="firefly" style={{ left: `${particle.x}%`, top: `${45 + particle.y * 0.4}%` }} animate={{ x: [-8, 12, -4, 8, -8], y: [5, -14, 2, -9, 5], opacity: [0.05, 0.8, 0.25, 0.7, 0.05], scale: [0.7, 1.2, 0.8, 1.1, 0.7] }} transition={{ duration: 7 + particle.speed * 12, delay: particle.phase, repeat: Infinity, ease: 'easeInOut' }} />)}
  </motion.div>
}
