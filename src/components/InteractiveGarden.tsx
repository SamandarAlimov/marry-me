import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMemo } from 'react'

interface InteractiveGardenProps {
  active: boolean
}

interface Blade {
  id: number
  left: number
  height: number
  lean: number
  delay: number
}

export function InteractiveGarden({ active }: InteractiveGardenProps) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 38, damping: 20 })
  const smoothY = useSpring(pointerY, { stiffness: 38, damping: 20 })
  const foliageX = useTransform(smoothX, [-1, 1], [-13, 13])
  const foliageY = useTransform(smoothY, [-1, 1], [-7, 7])
  const blades = useMemo<Blade[]>(() => Array.from({ length: 30 }, (_, id) => ({
    id,
    left: 3 + ((id * 37) % 94),
    height: 8 + ((id * 17) % 18),
    lean: -10 + ((id * 13) % 21),
    delay: (id * 0.17) % 2.6,
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
        pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1)
        pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
      }}
    >
      <motion.div className="interactive-foliage" style={{ x: foliageX, y: foliageY }}>
        {blades.map((blade) => (
          <motion.span
            key={blade.id}
            className="grass-blade"
            style={{ left: `${blade.left}%`, height: `${blade.height}px`, rotate: blade.lean }}
            animate={{ rotate: [blade.lean - 3, blade.lean + 5, blade.lean - 3] }}
            transition={{ duration: 2.8 + blade.height / 12, delay: blade.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>
      <motion.div
        className="garden-vignette"
        style={{ x: useTransform(smoothX, [-1, 1], [-5, 5]), y: useTransform(smoothY, [-1, 1], [-3, 3]) }}
      />
    </motion.div>
  )
}
