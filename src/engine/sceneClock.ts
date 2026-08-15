import { useEffect, useRef } from 'react'

/** Small deterministic scene clock used to keep environmental animation coherent. */
export function useSceneClock(active: boolean, onFrame: (delta: number, elapsed: number) => void) {
  const frame = useRef<number | null>(null)
  const previous = useRef<number | null>(null)
  const elapsed = useRef(0)
  const callback = useRef(onFrame)
  callback.current = onFrame

  useEffect(() => {
    if (!active) return
    const tick = (time: number) => {
      if (previous.current === null) previous.current = time
      const delta = Math.min(0.05, (time - previous.current) / 1000)
      previous.current = time
      elapsed.current += delta
      callback.current(delta, elapsed.current)
      frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      frame.current = null
      previous.current = null
    }
  }, [active])
}
