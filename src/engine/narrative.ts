export interface NarrativeState {
  scene: number
  opened: boolean
  explored: boolean
  revealUnlocked: boolean
  answered: boolean
}

export const initialNarrativeState: NarrativeState = {
  scene: 0,
  opened: false,
  explored: false,
  revealUnlocked: false,
  answered: false,
}

export type NarrativeEvent =
  | { type: 'OPEN' }
  | { type: 'EXPLORE' }
  | { type: 'UNLOCK_REVEAL' }
  | { type: 'ANSWER' }

export function reduceNarrative(
  state: NarrativeState,
  event: NarrativeEvent,
): NarrativeState {
  switch (event.type) {
    case 'OPEN':
      return { ...state, opened: true, scene: Math.max(state.scene, 1) }
    case 'EXPLORE':
      return { ...state, explored: true, scene: Math.max(state.scene, 2) }
    case 'UNLOCK_REVEAL':
      return { ...state, revealUnlocked: true, scene: Math.max(state.scene, 3) }
    case 'ANSWER':
      return { ...state, answered: true, scene: 4 }
    default:
      return state
  }
}
