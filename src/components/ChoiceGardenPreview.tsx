import { motion } from 'framer-motion'

type Props = { type: 'cinema' | 'park' | 'book' }

export function ChoiceGardenPreview({ type }: Props) {
  if (type === 'cinema') return <div className="choice-preview cinema-preview" aria-hidden="true"><div className="cinema-screen"><span /></div><div className="cinema-seat seat-a" /><div className="cinema-seat seat-b" /><div className="film-glow" /></div>
  if (type === 'book') return <div className="choice-preview book-preview" aria-hidden="true"><div className="book-shelf shelf-a" /><div className="book-shelf shelf-b" /><motion.div className="book-leaf" animate={{ rotate: [-4, 5, -3] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} /></div>
  return <div className="choice-preview park-preview" aria-hidden="true"><div className="park-moon" /><div className="park-tree tree-a" /><div className="park-tree tree-b" /><motion.div className="park-lamp" animate={{ opacity: [.45, .8, .45] }} transition={{ duration: 3, repeat: Infinity }} /><div className="park-path" /></div>
}
