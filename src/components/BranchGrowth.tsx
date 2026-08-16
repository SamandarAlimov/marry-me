import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface BranchGrowthProps { progress: number; active: boolean }
type Branch = { id: number; d: string; width: number; delay: number; length: number; side: 'left' | 'right' }

const left: Branch[] = [
  { id: 1, d: 'M112 500 C108 438 106 377 101 318 C94 272 72 238 42 207', width: 6, delay: .05, length: 1, side: 'left' },
  { id: 2, d: 'M101 320 C82 289 65 257 54 220 C46 193 35 173 20 153', width: 3.4, delay: .22, length: .86, side: 'left' },
  { id: 3, d: 'M91 270 C78 242 64 220 42 199', width: 2.6, delay: .38, length: .64, side: 'left' },
  { id: 4, d: 'M104 350 C87 330 69 315 46 306', width: 3, delay: .51, length: .7, side: 'left' },
  { id: 5, d: 'M74 241 C61 225 49 205 43 180', width: 2.2, delay: .67, length: .58, side: 'left' },
]
const right: Branch[] = [
  { id: 6, d: 'M108 500 C114 438 116 377 121 318 C128 272 150 238 180 207', width: 6, delay: .1, length: 1, side: 'right' },
  { id: 7, d: 'M119 320 C138 289 155 257 166 220 C174 193 185 173 200 153', width: 3.4, delay: .28, length: .86, side: 'right' },
  { id: 8, d: 'M129 270 C142 242 156 220 178 199', width: 2.6, delay: .44, length: .64, side: 'right' },
  { id: 9, d: 'M116 350 C133 330 151 315 174 306', width: 3, delay: .57, length: .7, side: 'right' },
  { id: 10, d: 'M146 241 C159 225 171 205 177 180', width: 2.2, delay: .73, length: .58, side: 'right' },
]

export function BranchGrowth({ progress, active }: BranchGrowthProps) {
  const branches = useMemo(() => [...left, ...right], [])
  const p = Math.max(0, Math.min(1, progress))
  return <div className="branch-growth" aria-hidden="true">
    <svg viewBox="0 0 220 520" className="branch-growth-svg">
      <defs><linearGradient id="barkGradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="rgba(55,46,32,.95)"/><stop offset=".52" stopColor="rgba(102,82,57,.88)"/><stop offset="1" stopColor="rgba(145,111,77,.7)"/></linearGradient></defs>
      {branches.map((branch) => <motion.path key={branch.id} d={branch.d} fill="none" stroke="url(#barkGradient)" strokeLinecap="round" strokeWidth={branch.width} pathLength={1} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? Math.max(0, Math.min(1, (p - branch.delay * .35) / Math.max(.1, .65 * branch.length))) : 0, opacity: active ? Math.min(1, Math.max(0, (p - branch.delay * .18) * 2.4)) : 0 }} transition={{ pathLength: { duration: .9, ease: [0.16, 1, .3, 1] }, opacity: { duration: .6 } }} />)}
    </svg>
  </div>
}
