export type SceneId = 'opening' | 'threshold' | 'garden' | 'reveal' | 'proposal'

export type SceneStatus = 'locked' | 'active' | 'complete'

export interface SceneDefinition {
  id: SceneId
  index: number
  title: string
  status: SceneStatus
}

export const scenes: SceneDefinition[] = [
  { id: 'opening', index: 0, title: 'Boshlanish', status: 'active' },
  { id: 'threshold', index: 1, title: 'Ostona', status: 'locked' },
  { id: 'garden', index: 2, title: 'Bog‘', status: 'locked' },
  { id: 'reveal', index: 3, title: 'Reveal', status: 'locked' },
  { id: 'proposal', index: 4, title: 'Savol', status: 'locked' },
]

export interface SceneTransition {
  from: SceneId
  to: SceneId
  duration: number
  reason: string
}

export const transitionFor = (from: SceneId, to: SceneId): SceneTransition => ({
  from,
  to,
  duration: 1.4,
  reason: 'narrative progression',
})
