import { motion } from 'framer-motion'

export function GardenDetails() {
  return (
    <div className="garden-details" aria-hidden="true">
      <motion.div
        className="garden-path"
        animate={{ opacity: [0.25, 0.38, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="garden-bench"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1.2 }}
      >
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
