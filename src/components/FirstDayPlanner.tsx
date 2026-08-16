import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChoiceGardenPreview } from './ChoiceGardenPreview'

type Choice = { id: string; label: string; meta: string }
type Plan = Record<string, Choice>

const DAYS: Choice[] = [
  { id: 'today', label: 'Bugun', meta: 'Agar hozirning o‘zi to‘g‘ri tuyulsa' },
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
const PARKS: Choice[] = [
  { id: 'quiet-park', label: 'Sokin park', meta: 'Uzoq suhbat va sekin sayr uchun' },
  { id: 'green-park', label: 'Yashil bog‘', meta: 'Tabiat ichida birga vaqt uchun' },
  { id: 'choose-together', label: 'Birga tanlaymiz', meta: 'Joyning o‘zi ham birgalikdagi qaror' },
]
const BOOKS: Choice[] = [
  { id: 'quran', label: 'Qur’on', meta: 'Birga o‘qish va mulohaza uchun' },
  { id: 'islamic', label: 'Islomiy kitob', meta: 'Bir-birimizga foydali kitob tanlaymiz' },
  { id: 'novel', label: 'Badiiy kitob', meta: 'Bir-birimizning didimizni bilish uchun' },
]
const TIMES: Choice[] = [
  { id: 'afternoon', label: 'Peshindan keyin', meta: 'Kun yorug‘ida boshlaymiz' },
  { id: 'sunset', label: 'Quyosh botishida', meta: 'Sayr uchun yumshoq vaqt' },
  { id: 'evening', label: 'Kechqurun', meta: 'Sokin kecha uchun' },
]
const FINISHES: Choice[] = [
  { id: 'walk', label: 'Yana biroz sayr', meta: 'Kunni shoshmasdan yakunlaymiz' },
  { id: 'tea', label: 'Choy va suhbat', meta: 'Kechani suhbat bilan tugatamiz' },
  { id: 'surprise', label: 'Oxirini rejalashtirmaymiz', meta: 'Eng chiroyli qismi kutilmagan bo‘lsin' },
]

export function FirstDayPlanner() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Plan>({})
  const place = answers.place?.id
  const steps: Array<{ key: string; title: string; choices: Choice[] }> = [
    { key: 'day', title: 'Qaysi kun?', choices: DAYS },
    { key: 'place', title: 'Qayerga boramiz?', choices: PLACES },
    ...(place === 'cinema' ? [{ key: 'film', title: 'Qaysi kayfiyatdagi film?', choices: FILMS }] : []),
    ...(place === 'park' ? [{ key: 'park', title: 'Qanday park?', choices: PARKS }] : []),
    ...(place === 'book' ? [{ key: 'book', title: 'Qanday kitob?', choices: BOOKS }] : []),
    { key: 'time', title: 'Qachon boshlaymiz?', choices: TIMES },
    { key: 'finish', title: 'Kunni qanday yakunlaymiz?', choices: FINISHES },
  ]
  const done = step >= steps.length
  const current = steps[step]
  const choose = (choice: Choice) => { setAnswers((prev) => ({ ...prev, [current.key]: choice })); setStep((value) => value + 1) }
  const restart = () => { setAnswers({}); setStep(0) }
  const previewType = current?.key === 'place' ? undefined : current?.key === 'film' ? 'cinema' : current?.key === 'park' ? 'park' : current?.key === 'book' ? 'book' : undefined

  return <section className="planner" aria-label="Birinchi kun rejalashtirgichi">
    <div className="planner-topline"><span>08 / 08 — Birga rejalash</span><span>{done ? 'Tayyor' : `${step + 1} / ${steps.length}`}</span></div>
    <AnimatePresence mode="wait">
      {!done && current ? <motion.div key={current.key} className="planner-step" initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }} transition={{ duration: .6, ease: [0.16, 1, .3, 1] }}>
        <span className="eyebrow">Birinchi kun · {step + 1}</span><h2>{current.title}</h2>
        {previewType && <ChoiceGardenPreview type={previewType} />}
        <div className="choice-list">{current.choices.map((choice, index) => <motion.button key={choice.id} className="choice" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .08, duration: .45 }} whileHover={{ x: 8 }} whileTap={{ scale: .985 }} onClick={() => choose(choice)}><span className="choice-label">{choice.label}</span><span className="choice-meta">{choice.meta}</span><span className="choice-arrow">↗</span></motion.button>)}</div>
      </motion.div> : <motion.div key="done" className="planner-summary" initial={{ opacity: 0, scale: .96, filter: 'blur(8px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: .9 }}><span className="eyebrow">Birgalikdagi reja</span><h2>Unda boshlanishi shunday bo‘lsin.</h2><div className="summary-list">{Object.entries(answers).map(([key, answer]) => <div className="summary-row" key={key}><span>{answer.label}</span><small>{answer.meta}</small></div>)}</div><p>Rejaning o‘zi emas, uni birga tanlash muhim. Qolganini o‘sha kuni o‘zimiz hal qilamiz.</p><button className="planner-reset" onClick={restart}>Qaytadan tanlash</button></motion.div>}
    </AnimatePresence>
  </section>
}
