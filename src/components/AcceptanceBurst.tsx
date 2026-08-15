import { motion } from 'framer-motion'
import { useMemo } from 'react'

export function AcceptanceBurst({ active }: { active: boolean }) {
  const particles = useMemo(() => Array.from({ length: 64 }, (_, id) => {
    const angle = (id / 64) * Math.PI * 2 + ((id * 17) % 9) * 0.02
    const distance = 80 + ((id * 37) % 190)
    return { id, x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, size: 1 + (id % 3), delay: (id % 12) * 0.018 }
  }), [])

  return <div className="acceptance-burst" aria-hidden="true">
    {particles.map((particle) => <motion.i key={particle.id} className="acceptance-particle" style={{ width: particle.size, height: particle.size }} initial={{ opacity: 0, x: 0, y: 0, scale: .2 }} animate={active ? { opacity: [0, .9, 0], x: particle.x, y: particle.y, scale: [.2, 1, .3] } : { opacity: 0, x: 0, y: 0, scale: .2 }} transition={{ duration: 2.4, delay: particle.delay, ease: [0.16, 1, 0.3, 1] }} />)}
    <motion.div className="acceptance-core" initial={{ scale: 0, opacity: 0 }} animate={active ? { scale: [0, 1.3, 1], opacity: [0, .7, 0] } : { scale: 0, opacity: 0 }} transition={{ duration: 2.8, ease: 'easeOut' }} />
  </div>
}
