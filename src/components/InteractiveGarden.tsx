import { motion, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import { setWindTarget, useWindField } from '../engine/wind'

interface InteractiveGardenProps {
  active: boolean
}

interface Blade {
  id: number
  left: number
  height: number
  lean: number
  delay: number
  depth: number
}

export function InteractiveGarden({ active }: InteractiveGardenProps) {
  const wind = useWindField()
  const foliageX = useTransform(wind.x, [-1, 1], [-13, 13])
  const foliageY = useTransform(wind.y, [-1, 1], [-7, 7])
  const vignetteX = useTransform(wind.x, [-1, 1], [-5, 5])
  const vignetteY = useTransform(wind.y, [-1, 1], [-3, 3])
  const blades = useMemo<Blade[]>(() => Array.from({ length: 42 }, (_, id) => ({
    id,
    left: 2 + ((id * 37) % 96),
    height: 7 + ((id * 17) % 22),
    lean: -10 + ((id * 13) % 21),
    delay: (id * 0.17) % 2.6,
    depth: 0.35 + ((id * 29) % 65) / 100,
  })), [])

  return (
    <motion.div
      className="interactive-garden"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 1.2 }}
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        setWindTarget(wind, ((event.clientX - bounds.left) / bounds.width) * 2 - 1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1)
      }}
      onPointerLeave={() => setWindTarget(wind, 0, 0)}
    >
      <motion.div className="interactive-foliage" style={{ x: foliageX, y: foliageY }}>
        {blades.map((blade) => (
          <motion.span
            key={blade.id}
            className="grass-blade"
            style={{ left: `${blade.left}%`, height: `${blade.height}px`, rotate: blade.lean, opacity: 0.2 + blade.depth * 0.55 }}
            animate={{ rotate: [blade.lean - 3, blade.lean + 5, blade.lean - 3], x: [-blade.depth * 2, blade.depth * 4, -blade.depth * 2] }}
            transition={{ duration: 2.8 + blade.height / 12, delay: blade.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>
      <motion.div className="garden-vignette" style={{ x: vignetteX, y: vignetteY }} />
    </motion.div>
  )
}
