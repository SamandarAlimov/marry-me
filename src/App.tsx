import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Atmosphere } from './components/Atmosphere'
import { Butterflies } from './components/Butterflies'
import { Constellation } from './components/Constellation'
import { InteractiveGarden } from './components/InteractiveGarden'
import { LivingGarden } from './components/LivingGarden'
import { Starfield } from './components/Starfield'
import { SceneTransition } from './components/SceneTransition'
import { initialStoryState, reduceStory } from './engine/story'
import type { StoryEvent, StoryState } from './engine/story'

export function App() {
  const [story, setStory] = useState<StoryState>(initialStoryState)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const cameraX = useSpring(pointerX, { stiffness: 40, damping: 22 })
  const cameraY = useSpring(pointerY, { stiffness: 40, damping: 22 })
  const send = (event: StoryEvent) => setStory((state) => reduceStory(state, event))
  const scene = story.scene
  const cosmic = scene === 'night' || scene === 'constellation'
  const garden = scene === 'growth' || scene === 'bloom' || scene === 'question' || scene === 'accepted' || scene === 'first-day'

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1)
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [pointerX, pointerY])

  return (
    <main className={`experience scene-${scene}`}>
      <Atmosphere />
      <Starfield active={cosmic} />
      <Constellation active={scene === 'constellation'} formed={scene !== 'night'} />
      <LivingGarden active={garden} />
      <Butterflies active={scene === 'accepted' || scene === 'first-day'} />
      <InteractiveGarden active={garden} />
      <motion.div className="camera" style={{ x: cameraX, y: cameraY }} aria-hidden="true" />
      <div className="grain" />
      <div className="moon" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <SceneTransition sceneKey={scene}>
        <motion.div className="scene" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: 'easeOut' }}>
          <motion.p className="bismillah" initial={{ opacity: 0, letterSpacing: '0.05em' }} animate={{ opacity: 1, letterSpacing: '0.16em' }} transition={{ delay: 0.4, duration: 1.2 }}>
            Bismillahir Rohmanir Rohiym
          </motion.p>

          {scene === 'night' && <section className="title-wrap">
            <span className="eyebrow">Bir kichik hikoya</span>
            <h1>Ba'zi yo'llar <em>yolg'iz yurish uchun emas.</em></h1>
            <p className="intro">Shoshilmang. Avval osmonni kuzating.</p>
            <motion.button className="enter" whileHover={{ y: -4 }} whileTap={{ scale: .98 }} onClick={() => send({ type: 'BEGIN' })}>
              <span>Davom etamiz</span><span className="arrow">↗</span>
            </motion.button>
          </section>}

          {scene === 'constellation' && <section className="threshold">
            <span className="eyebrow">01 / 08 — Osmon</span>
            <h2>Ba'zan tartib avval ko'rinmaydi.</h2>
            <p>Yaqinroq qarang. Uzoqdagi nuqtalar ham bir-biriga tegishli bo'lishi mumkin.</p>
            <button className="enter" onClick={() => send({ type: 'CONTINUE' })}><span>Keyingi</span><span className="arrow">↗</span></button>
          </section>}

          {scene === 'words' && <section className="threshold">
            <span className="eyebrow">02 / 08 — So'z</span>
            <h2>Ba'zi sukunatlar ikki kishilik bo'ladi.</h2>
            <p>Bu hikoya hali o'zining eng muhim gapini aytmadi.</p>
            <button className="enter" onClick={() => send({ type: 'CONTINUE' })}><span>Davom etamiz</span><span className="arrow">↗</span></button>
          </section>}

          {scene === 'growth' && <section className="garden-copy">
            <span className="eyebrow">03 / 08 — O'sish</span>
            <h2>Ikki novda. Ikki hayot.</h2>
            <p>Scroll qiling. Ular bir-birini yo'qotmasdan qanday o'sishini ko'ring.</p>
            <button className="enter" onClick={() => send({ type: 'CONTINUE' })}><span>Gullash sari</span><span className="arrow">↗</span></button>
          </section>}

          {scene === 'bloom' && <section className="garden-copy">
            <span className="eyebrow">04 / 08 — Gullash</span>
            <h2>Muhabbat shovqinli bo'lishi shart emas.</h2>
            <p>Ba'zan u shunchaki yonida tinchlik topishdir.</p>
            <button className="enter" onClick={() => send({ type: 'CONTINUE' })}><span>Yana bir qadam</span><span className="arrow">↗</span></button>
          </section>}

          {scene === 'question' && <section className="question">
            <span className="eyebrow">05 / 08 — Savol</span>
            <h2>Menga turmushga chiqasizmi?</h2>
            <p>Bu savolga shoshmasdan javob berishingiz mumkin.</p>
            <button className="enter" onClick={() => send({ type: 'ANSWER_YES' })}><span>Ha. Birga yuramiz.</span><span className="arrow">↗</span></button>
          </section>}

          {scene === 'accepted' && <section className="question">
            <span className="eyebrow">06 / 08 — Bismillah</span>
            <h2>Unda bu yo'lni birga boshlaymiz.</h2>
            <p>Endi sahifa emas, birinchi kunimiz haqida o'ylashimiz mumkin.</p>
            <button className="enter" onClick={() => send({ type: 'PLAN_FIRST_DAY' })}><span>Birinchi kunni tanlaymiz</span><span className="arrow">↗</span></button>
          </section>}

          {scene === 'first-day' && <section className="question">
            <span className="eyebrow">07 / 08 — Birinchi kun</span>
            <h2>Bugun rejangiz bormi?</h2>
            <p>Bu yerda keyingi bosqich: kun, joy, film, sayr va boshqa rejalarni birga tanlash.</p>
          </section>}
        </motion.div>
      </SceneTransition>

      <div className="horizon" />
      <div className="silhouette silhouette-back" />
      <div className="silhouette silhouette-front" />
      <footer><span>{String(Math.min(storyOrderIndex(scene) + 1, 8)).padStart(2, '0')} / 08</span><span>Marry Me</span><span>© Qalb</span></footer>
    </main>
  )
}

function storyOrderIndex(scene: StoryState['scene']) {
  return ['night', 'constellation', 'words', 'growth', 'bloom', 'question', 'accepted', 'first-day'].indexOf(scene)
}
