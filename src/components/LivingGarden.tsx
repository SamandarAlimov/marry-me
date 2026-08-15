import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { createParticles } from '../engine/particle'

interface LivingGardenProps {
  active: boolean
}

const trees = [
  { x: '8%', scale: 0.78, delay: 0.2 },
  { x: '20%', scale: 1.02, delay: 0.8 },
  { x: '35%', scale: 0.66, delay: 1.4 },
  { x: '64%', scale: 0.72, delay: 0.5 },
  { x: '78%', scale: 1.05, delay: 1.1 },
  { x: '91%', scale: 0.8, delay: 1.8 },
]

export function LivingGarden({ active }: LivingGardenProps) {
  const fireflies = useMemo(() => createParticles(18, 91), [])

  return (
    <motion.div
      className="living-garden"
      aria-hidden="true"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 80 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="garden-haze" />
      <div className="garden-ground" />
      {trees.map((tree, index) => (
        <motion.div
          key={index}
          className="tree"
          style={{ left: tree.x, scale: tree.scale }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: active ? 0 : 30, opacity: active ? 1 : 0 }}
          transition={{ delay: tree.delay, duration: 1.4, ease: 'easeOut' }}
        >
          <div className="trunk" />
          <motion.div
            className="crown"
            animate={{ x: [-2, 2, -2], rotate: [-1, 1, -1] }}
            transition={{ duration: 5 + tree.scale, repeat: Infinity, ease: 'easeInOut', delay: tree.delay }}
          >
            <i /><i /><i /><i />
          </motion.div>
        </motion.div>
      ))}
      {fireflies.map((particle) => (
        <motion.i
          key={particle.id}
          className="firefly"
          style={{ left: `${particle.x}%`, top: `${45 + particle.y * 0.4}%` }}
          animate={{
            x: [-8, 12, -4, 8, -8],
            y: [5, -14, 2, -9, 5],
            opacity: [0.05, 0.8, 0.25, 0.7, 0.05],
            scale: [0.7, 1.2, 0.8, 1.1, 0.7],
          }}
          transition={{ duration: 7 + particle.speed * 12, delay: particle.phase, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </motion.div>
  )
}
