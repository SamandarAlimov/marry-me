import { motion } from 'framer-motion'
import { useMemo } from 'react'
import '../styles/acceptance.css'

type Particle = { id: number; x: number; y: number; size: number; delay: number; rotate: number }

export function AcceptanceBurst({ active }: { active: boolean }) {
  const particles = useMemo<Particle[]>(() => Array.from({ length: 84 }, (_, id) => {
    const angle = (id / 84) * Math.PI * 2 + ((id * 17) % 9) * 0.02
    const distance = 90 + ((id * 37) % 250)
    return { id, x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, size: 1 + (id % 4), delay: (id % 18) * 0.022, rotate: ((id * 41) % 120) - 60 }
  }), [])
  const petals = useMemo(() => Array.from({ length: 22 }, (_, id) => ({ id, x: -46 + ((id * 29) % 92), y: 8 + ((id * 43) % 76), r: -35 + ((id * 19) % 70), d: 2.8 + (id % 6) * .25, delay: .3 + (id % 9) * .07 })), [])

  return <div className="acceptance-burst" aria-hidden="true">
    <motion.div className="acceptance-ring ring-one" initial={{ scale: .2, opacity: 0 }} animate={active ? { scale: [0.2, 1.5], opacity: [0, .35, 0] } : { scale: .2, opacity: 0 }} transition={{ duration: 2.8, ease: [0.16, 1, .3, 1] }} />
    <motion.div className="acceptance-ring ring-two" initial={{ scale: .2, opacity: 0 }} animate={active ? { scale: [.2, 1.15], opacity: [0, .22, 0] } : { scale: .2, opacity: 0 }} transition={{ duration: 3.5, delay: .18, ease: [0.16, 1, .3, 1] }} />
    <div className="acceptance-rays">{Array.from({ length: 12 }, (_, id) => <motion.i key={id} style={{ transform: `rotate(${id * 30}deg)` }} initial={{ scaleY: 0, opacity: 0 }} animate={active ? { scaleY: [0, 1, 0], opacity: [0, .3, 0] } : { scaleY: 0, opacity: 0 }} transition={{ duration: 2.2, delay: .1 + id * .025, ease: 'easeOut' }} />)}</div>
    {particles.map((particle) => <motion.i key={particle.id} className="acceptance-particle" style={{ width: particle.size, height: particle.size }} initial={{ opacity: 0, x: 0, y: 0, scale: .15, rotate: 0 }} animate={active ? { opacity: [0, .85, .22, 0], x: particle.x, y: particle.y, scale: [.15, 1, .65, .2], rotate: particle.rotate } : { opacity: 0, x: 0, y: 0, scale: .15, rotate: 0 }} transition={{ duration: 3.1, delay: particle.delay, ease: [0.16, 1, .3, 1] }} />)}
    {petals.map((petal) => <motion.i key={petal.id} className="acceptance-petal" style={{ left: `${50 + petal.x / 2}%`, top: `${50 + petal.y / 2}%`, rotate: petal.r }} initial={{ opacity: 0, scale: .2, y: 0 }} animate={active ? { opacity: [0, .7, .25, 0], scale: [.2, 1, .65], y: [0, 90, 190], x: [0, petal.x, petal.x * 1.5], rotate: [petal.r, petal.r + 70, petal.r + 160] } : { opacity: 0, scale: .2, y: 0 }} transition={{ duration: petal.d, delay: petal.delay, ease: 'easeOut' }} />)}
    <motion.div className="acceptance-core" initial={{ scale: 0, opacity: 0 }} animate={active ? { scale: [0, 1.25, 1], opacity: [0, .72, 0] } : { scale: 0, opacity: 0 }} transition={{ duration: 3, ease: 'easeOut' }} />
  </div>
}
