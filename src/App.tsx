import { motion } from 'framer-motion'
import { useState } from 'react'

export function App() {
  const [started, setStarted] = useState(false)

  return (
    <main className="experience" onClick={() => setStarted(true)}>
      <div className="grain" />
      <div className="moon" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <motion.div
        className="scene"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
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
          animate={{ scale: started ? 1.015 : 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <span className="eyebrow">Bir kichik hikoya</span>
          <h1>
            Ba'zi savollarni
            <em> shunchaki so'rab bo'lmaydi.</em>
          </h1>
          <p className="intro">
            Ba'zilariga javob berishdan oldin, ularni qanday so'rash haqida
            o'ylash kerak.
          </p>
        </motion.div>

        <motion.button
          className="enter"
          whileHover={{ y: -4, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          onClick={(event) => {
            event.stopPropagation()
            setStarted(true)
          }}
        >
          <span>{started ? 'Hikoya boshlandi' : 'Boshlaymiz'}</span>
          <span className="arrow">↗</span>
        </motion.button>
      </motion.div>

      <div className="horizon" />
      <div className="silhouette silhouette-back" />
      <div className="silhouette silhouette-front" />

      <footer>
        <span>01 / 05</span>
        <span>Marry Me</span>
        <span>© Qalb</span>
      </footer>
    </main>
  )
}
