import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Choice = { id: string; label: string; meta: string }
const DAYS: Choice[] = [
  { id: 'today', label: 'Bugun', meta: 'Shoshilinch emas, lekin yaqin' },
  { id: 'friday', label: 'Juma', meta: 'Sokin va mazmunli kecha' },
  { id: 'weekend', label: 'Dam olish kuni', meta: 'Vaqtni kengroq ajratamiz' },
]
const PLACES: Choice[] = [
  { id: 'cinema', label: 'Kino', meta: 'Bir filmni birga tanlaymiz' },
  { id: 'park', label: 'Park', meta: 'Shoshilmay sayr qilamiz' },
  { id: 'book', label: 'Kitob do‘koni', meta: 'Bir-birimizga kitob tanlaymiz' },
]
const FILMS: Choice[] = [
  { id: 'thoughtful', label: 'Mazmunli film', meta: 'Ko‘rgandan keyin gaplashadigan' },
  { id: 'beautiful', label: 'Chiroyli film', meta: 'Kechani yengil qiladigan' },
  { id: 'surprise', label: 'Siz tanlang', meta: 'Men sizning tanlovingizga ishonaman' },
]

export function FirstDayPlanner() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Choice>>({})
  const groups = useMemo(() => [DAYS, PLACES, FILMS], [])
  const titles = ['Qaysi kun?', 'Qayerga boramiz?', 'Agar kino bo‘lsa, qanday?']
  const current = groups[step]
  const choose = (choice: Choice) => {
    setAnswers((prev) => ({ ...prev, [String(step)]: choice }))
    setStep((value) => Math.min(value + 1, groups.length))
  }
  const done = step >= groups.length

  return <section className="planner" aria-label="Birinchi kun rejalashtirgichi">
    <div className="planner-topline"><span>08 / 08 — Birga rejalash</span><span>{done ? 'Tayyor' : `${step + 1} / ${groups.length}`}</span></div>
    <AnimatePresence mode="wait">
      {!done ? <motion.div key={step} className="planner-step" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .55 }}>
        <span className="eyebrow">Birinchi kun</span><h2>{titles[step]}</h2>
        <div className="choice-list">{current.map((choice) => <motion.button key={choice.id} className="choice" whileHover={{ x: 8 }} whileTap={{ scale: .985 }} onClick={() => choose(choice)}><span className="choice-label">{choice.label}</span><span className="choice-meta">{choice.meta}</span><span className="choice-arrow">↗</span></motion.button>)}</div>
      </motion.div> : <motion.div key="done" className="planner-summary" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}>
        <span className="eyebrow">Birgalikdagi reja</span><h2>Unda boshlanishi shunday bo‘lsin.</h2>
        <div className="summary-list">{Object.values(answers).map((answer) => <div className="summary-row" key={answer.id}><span>{answer.label}</span><small>{answer.meta}</small></div>)}</div>
        <p>Qolganini o‘sha kuni o‘zimiz hal qilamiz. Rejaning o‘zi emas, birga qilinishi muhim.</p>
      </motion.div>}
    </AnimatePresence>
  </section>
}
