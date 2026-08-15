import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMemo } from 'react'
import { createParticles } from '../engine/particle'
import { parallaxOffset } from '../engine/world'

export function Atmosphere() {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 45, damping: 18 })
  const smoothY = useSpring(pointerY, { stiffness: 45, damping: 18 })
  const particles = useMemo(() => createParticles(34), [])

  return (
    <div
      className="atmosphere"
      aria-hidden="true"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width * 2 - 1
        const y = (event.clientY - bounds.top) / bounds.height * 2 - 1
        pointerX.set(x)
        pointerY.set(y)
      }}
    >
      <motion.div
        className="atmosphere-light"
        style={{ x: smoothX, y: smoothY }}
      />
      {particles.map((particle) => (
        <motion.i
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            x: smoothX,
            y: smoothY,
          }}
          animate={{
            x: [0, parallaxOffset(particle.drift, 0.35, 10), 0],
            y: [0, -18 * particle.speed, 0],
            opacity: [particle.opacity, particle.opacity * 1.8, particle.opacity],
          }}
          transition={{
            duration: 8 + particle.speed * 20,
            delay: particle.phase,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
