import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Atmosphere } from './components/Atmosphere'
import { cinematicEase } from './engine/motion'
import { initialNarrativeState, reduceNarrative } from './engine/narrative'
import type { NarrativeState } from './engine/narrative'

export function App() {
  const [narrative, setNarrative] = useState<NarrativeState>(initialNarrativeState)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const cameraX = useSpring(pointerX, { stiffness: 40, damping: 22 })
  const cameraY = useSpring(pointerY, { stiffness: 40, damping: 22 })

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [pointerX, pointerY])

  const open = () => setNarrative((state) => reduceNarrative(state, { type: 'OPEN' }))

  return (
    <main className="experience">
      <Atmosphere />
      <motion.div className="camera" style={{ x: cameraX, y: cameraY }} aria-hidden="true" />
      <div className="grain" />
      <div className="moon" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <motion.div
        className="scene"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: cinematicEase }}
      >
        <motion.p
          className="bismillah"
          initial={{ opacity: 0, letterSpacing: '0.05em' }}
          animate={{ opacity: 1, letterSpacing: '0.16em' }}
          transition={{ delay: 0.4, duration: 1.2 }}
        >
          Bismillahir Rohmanir Rohiym
        </motion.p>

        <motion.div
          className="title-wrap"
          animate={{ x: narrative.opened ? -18 : 0, opacity: narrative.opened ? 0.42 : 1 }}
          transition={{ duration: 0.9, ease: cinematicEase }}
        >
          <span className="eyebrow">Bir kichik hikoya</span>
          <h1>
            Ba'zi savollarni
            <em> shunchaki so'rab bo'lmaydi.</em>
          </h1>
          <p className="intro">
            Ba'zilariga javob berishdan oldin, ularni qanday so'rash haqida o'ylash kerak.
          </p>
        </motion.div>

        <motion.button
          className="enter"
          whileHover={{ y: -4, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          onClick={open}
          disabled={narrative.opened}
        >
          <span>{narrative.opened ? 'Hikoya ochildi' : 'Boshlaymiz'}</span>
          <span className="arrow">↗</span>
        </motion.button>

        {narrative.opened && (
          <motion.section
            className="threshold"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 1.2, ease: cinematicEase }}
          >
            <span className="eyebrow">01 / 05 — Ostona</span>
            <h2>Shoshilmang.</h2>
            <p>Bu sahifani ko'rish uchun emas, bir oz yashash uchun ochdingiz.</p>
            <button
              className="enter"
              onClick={() => setNarrative((state) => reduceNarrative(state, { type: 'EXPLORE' }))}
            >
              <span>Davom etish</span><span className="arrow">↗</span>
            </button>
          </motion.section>
        )}
      </motion.div>

      <div className="horizon" />
      <div className="silhouette silhouette-back" />
      <div className="silhouette silhouette-front" />

      <footer>
        <span>{String(Math.min(narrative.scene + 1, 5)).padStart(2, '0')} / 05</span>
        <span>Marry Me</span>
        <span>© Qalb</span>
      </footer>
    </main>
  )
}
