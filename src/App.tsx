import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Atmosphere } from './components/Atmosphere'
import { LivingGarden } from './components/LivingGarden'
import { SceneTransition } from './components/SceneTransition'
import { cinematicEase } from './engine/motion'
import { initialNarrativeState, reduceNarrative } from './engine/narrative'
import type { NarrativeEvent, NarrativeState } from './engine/narrative'

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

  const send = (event: NarrativeEvent) => setNarrative((state) => reduceNarrative(state, event))
  const isGarden = narrative.scene >= 2

  return (
    <main className="experience">
      <Atmosphere />
      <LivingGarden active={isGarden} />
      <motion.div className="camera" style={{ x: cameraX, y: cameraY }} aria-hidden="true" />
      <div className="grain" />
      <div className="moon" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <SceneTransition sceneKey={isGarden ? 'garden' : narrative.opened ? 'threshold' : 'opening'}>
        <motion.div className="scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <motion.p className="bismillah" initial={{ opacity: 0, letterSpacing: '0.05em' }} animate={{ opacity: 1, letterSpacing: '0.16em' }} transition={{ delay: 0.4, duration: 1.2 }}>
            Bismillahir Rohmanir Rohiym
          </motion.p>

          {!narrative.opened && (
            <>
              <div className="title-wrap">
                <span className="eyebrow">Bir kichik hikoya</span>
                <h1>Ba'zi savollarni <em>shunchaki so'rab bo'lmaydi.</em></h1>
                <p className="intro">Ba'zilariga javob berishdan oldin, ularni qanday so'rash haqida o'ylash kerak.</p>
              </div>
              <motion.button className="enter" whileHover={{ y: -4, scale: 1.015 }} whileTap={{ scale: 0.98 }} onClick={() => send({ type: 'OPEN' })}>
                <span>Boshlaymiz</span><span className="arrow">↗</span>
              </motion.button>
            </>
          )}

          {narrative.opened && !isGarden && (
            <section className="threshold">
              <span className="eyebrow">01 / 05 — Ostona</span>
              <h2>Shoshilmang.</h2>
              <p>Bu sahifani ko'rish uchun emas, bir oz yashash uchun ochdingiz.</p>
              <button className="enter" onClick={() => send({ type: 'EXPLORE' })}>
                <span>Bog‘ga kirish</span><span className="arrow">↗</span>
              </button>
            </section>
          )}

          {isGarden && (
            <section className="garden-copy">
              <span className="eyebrow">02 / 05 — Bir kun</span>
              <h2>Bugun rejangiz bormi?</h2>
              <p>Chunki ba'zi rejalar oldindan yozilmaydi. Ular birga yaratiladi.</p>
              <button className="enter" onClick={() => send({ type: 'UNLOCK_REVEAL' })}>
                <span>Rejani davom ettirish</span><span className="arrow">↗</span>
              </button>
            </section>
          )}
        </motion.div>
      </SceneTransition>

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
