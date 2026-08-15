import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface FlowerFieldProps { active: boolean; progress?: number }

export function FlowerField({ active, progress = 1 }: FlowerFieldProps) {
  const flowers = useMemo(() => Array.from({ length: 26 }, (_, id) => ({
    id,
    x: 8 + ((id * 29) % 84),
    y: 28 + ((id * 41) % 43),
    size: 5 + (id % 4) * 2,
    delay: (id % 13) * 0.075,
    duration: 1.15 + (id % 5) * 0.12,
    tilt: -18 + ((id * 17) % 36),
  })), [])

  return (
    <div className="flower-field" aria-hidden="true">
      {flowers.map((flower) => (
        <motion.span
          key={flower.id}
          className="flower"
          style={{ left: `${flower.x}%`, top: `${flower.y}%`, width: flower.size, height: flower.size, rotate: flower.tilt }}
          initial={{ opacity: 0, scale: 0, y: 10 }}
          animate={{ opacity: active ? Math.min(1, progress * 1.3) : 0, scale: active ? Math.min(1, progress * 1.2) : 0, y: active ? 0 : 10 }}
          transition={{ delay: flower.delay, duration: flower.duration, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  )
}
