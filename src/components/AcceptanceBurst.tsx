import { motion } from 'framer-motion'
import { useMemo } from 'react'
import '../styles/acceptance.css'

type Particle = { id: number; x: number; y: number; size: number; delay: number; rotate: number; curve: number }

export function AcceptanceBurst({ active }: { active: boolean }) {
  const particles = useMemo<Particle[]>(() => Array.from({ length: 112 }, (_, id) => { const angle = (id / 112) * Math.PI * 2 + ((id * 17) % 9) * .02; const distance = 90 + ((id * 37) % 290); return { id, x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, size: 1 + (id % 4), delay: (id % 24) * .022, rotate: ((id * 41) % 120) - 60, curve: ((id * 23) % 17) - 8 } }), [])
  const petals = useMemo(() => Array.from({ length: 34 }, (_, id) => ({ id, x: -46 + ((id * 29) % 92), y: 8 + ((id * 43) % 76), r: -35 + ((id * 19) % 70), d: 3 + (id % 6) * .28, delay: .3 + (id % 11) * .07 })), [])
  return <div className="acceptance-burst" aria-hidden="true">
    <motion.div className="acceptance-ring ring-one" initial={{ scale: .2, opacity: 0 }} animate={active ? { scale: [.2, 1.7], opacity: [0, .4, 0] } : { scale: .2, opacity: 0 }} transition={{ duration: 3.4, ease: [0.16, 1, .3, 1] }} />
    <motion.div className="acceptance-ring ring-two" initial={{ scale: .2, opacity: 0 }} animate={active ? { scale: [.2, 1.25], opacity: [0, .26, 0] } : { scale: .2, opacity: 0 }} transition={{ duration: 4.1, delay: .18, ease: [0.16, 1, .3, 1] }} />
    <motion.div className="acceptance-ring ring-three" initial={{ scale: .3, opacity: 0 }} animate={active ? { scale: [.3, 1.05], opacity: [0, .16, 0] } : { scale: .3, opacity: 0 }} transition={{ duration: 4.8, delay: .42, ease: [0.16, 1, .3, 1] }} />
    <div className="acceptance-rays">{Array.from({ length: 18 }, (_, id) => <motion.i key={id} style={{ transform: `rotate(${id * 20}deg)` }} initial={{ scaleY: 0, opacity: 0 }} animate={active ? { scaleY: [0, 1, 0], opacity: [0, .32, 0] } : { scaleY: 0, opacity: 0 }} transition={{ duration: 2.5, delay: .08 + id * .02, ease: 'easeOut' }} />)}</div>
    {particles.map((particle) => <motion.i key={particle.id} className="acceptance-particle" style={{ width: particle.size, height: particle.size }} initial={{ opacity: 0, x: 0, y: 0, scale: .15, rotate: 0 }} animate={active ? { opacity: [0, .88, .2, 0], x: [0, particle.x * .62 + particle.curve, particle.x], y: [0, particle.y * .62 - particle.curve, particle.y], scale: [.15, 1, .65, .2], rotate: [0, particle.rotate, particle.rotate + 35] } : { opacity: 0, x: 0, y: 0, scale: .15, rotate: 0 }} transition={{ duration: 3.4, delay: particle.delay, ease: [0.16, 1, .3, 1] }} />)}
    {petals.map((petal) => <motion.i key={petal.id} className="acceptance-petal" style={{ left: `${50 + petal.x / 2}%`, top: `${50 + petal.y / 2}%`, rotate: petal.r }} initial={{ opacity: 0, scale: .2, y: 0 }} animate={active ? { opacity: [0, .72, .28, 0], scale: [.2, 1, .65], y: [0, 90, 190], x: [0, petal.x, petal.x * 1.5], rotate: [petal.r, petal.r + 70, petal.r + 160] } : { opacity: 0, scale: .2, y: 0 }} transition={{ duration: petal.d, delay: petal.delay, ease: 'easeOut' }} />)}
    <motion.div className="acceptance-core" initial={{ scale: 0, opacity: 0 }} animate={active ? { scale: [0, 1.3, 1], opacity: [0, .78, 0] } : { scale: 0, opacity: 0 }} transition={{ duration: 3.3, ease: 'easeOut' }} />
  </div>
}
