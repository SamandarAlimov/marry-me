import { motion, useTransform } from 'framer-motion'
import { useWindField } from '../engine/wind'

export function GardenDetails() {
  const wind = useWindField()
  const benchX = useTransform(wind.x, [-1, 1], [-1.5, 1.5])
  const pathOpacity = useTransform(wind.strength, [0, 1], [0.25, 0.4])

  return (
    <div className="garden-details" aria-hidden="true">
      <motion.div className="garden-path" style={{ opacity: pathOpacity }} />
      <motion.div className="garden-bench" style={{ x: benchX }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1.2 }}>
        <span className="bench-seat" />
        <span className="bench-leg bench-leg-a" />
        <span className="bench-leg bench-leg-b" />
        <span className="bench-back" />
      </motion.div>
      <div className="grass-line grass-line-a" />
      <div className="grass-line grass-line-b" />
      <div className="grass-line grass-line-c" />
    </div>
  )
}
