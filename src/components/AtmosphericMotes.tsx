import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface AtmosphericMotesProps { active: boolean; intensity?: number }

export function AtmosphericMotes({ active, intensity = 1 }: AtmosphericMotesProps) {
  const motes = useMemo(() => Array.from({ length: 44 }, (_, id) => ({
    id, x: 4 + ((id * 43) % 92), y: 28 + ((id * 31) % 61), size: 1 + (id % 3),
    drift: 18 + ((id * 17) % 45), rise: 12 + ((id * 13) % 35), duration: 6 + (id % 7) * .9, delay: (id % 15) * .31,
  })), [])
  return <div className="atmospheric-motes" aria-hidden="true">
    {motes.map((mote) => <motion.i key={mote.id} className="atmospheric-mote" style={{ left: `${mote.x}%`, top: `${mote.y}%`, width: mote.size, height: mote.size }} animate={{ opacity: active ? [0, .22 * intensity, .05, .18 * intensity, 0] : 0, x: [-mote.drift, mote.drift * .6, -mote.drift * .4, mote.drift], y: [0, -mote.rise, -mote.rise * 1.8, -mote.rise * 2.2], scale: [.65, 1, .8, 1.1] }} transition={{ duration: mote.duration, delay: mote.delay, repeat: Infinity, ease: 'easeInOut' }} />)}
  </div>
}
