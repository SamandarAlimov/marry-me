import { motion, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { setWindTarget, useWindField } from '../engine/wind'

interface InteractiveGardenProps { active: boolean }
interface Blade { id: number; left: number; height: number; lean: number; delay: number; depth: number; phase: number }

export function InteractiveGarden({ active }: InteractiveGardenProps) {
  const wind = useWindField()
  const foliageX = useTransform(wind.x, [-1, 1], [-13, 13])
  const foliageY = useTransform(wind.y, [-1, 1], [-7, 7])
  const vignetteX = useTransform(wind.x, [-1, 1], [-5, 5])
  const vignetteY = useTransform(wind.y, [-1, 1], [-3, 3])
  const blades = useMemo<Blade[]>(() => Array.from({ length: 72 }, (_, id) => ({
    id, left: 1 + ((id * 37) % 98), height: 7 + ((id * 17) % 25), lean: -10 + ((id * 13) % 21), delay: (id * .17) % 2.6, depth: .2 + ((id * 29) % 80) / 100, phase: (id * 1.31) % 6.28,
  })), [])
  return <motion.div className="interactive-garden" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0 }} transition={{ duration: 1.2 }} onPointerMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); setWindTarget(wind, ((event.clientX - bounds.left) / bounds.width) * 2 - 1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1) }} onPointerLeave={() => setWindTarget(wind, 0, 0)}>
    <motion.div className="interactive-foliage" style={{ x: foliageX, y: foliageY }}>
      {blades.map((blade) => <motion.span key={blade.id} className="grass-blade" style={{ left: `${blade.left}%`, height: `${blade.height}px`, rotate: blade.lean, opacity: .16 + blade.depth * .6 }} animate={{ rotate: [blade.lean - 3, blade.lean + 5 + blade.depth * 2, blade.lean - 3], x: [-blade.depth * 2, blade.depth * 4, -blade.depth * 2], scaleY: [.94, 1 + blade.depth * .08, .94] }} transition={{ duration: 2.6 + blade.height / 11 + blade.depth, delay: blade.delay + blade.phase * .03, repeat: Infinity, ease: 'easeInOut' }} />)}
    </motion.div>
    <motion.div className="garden-vignette" style={{ x: vignetteX, y: vignetteY }} />
  </motion.div>
}
