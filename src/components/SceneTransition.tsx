import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cinematicEase } from '../engine/motion'

interface SceneTransitionProps {
  sceneKey: string
  children: ReactNode
}

export function SceneTransition({ sceneKey, children }: SceneTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        className="scene-layer"
        initial={{ opacity: 0, y: 36, scale: 0.985, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -36, scale: 1.015, filter: 'blur(8px)' }}
        transition={{ duration: 1.15, ease: cinematicEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
