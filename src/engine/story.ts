export type StoryScene = 'night' | 'constellation' | 'words' | 'growth' | 'bloom' | 'question' | 'accepted' | 'first-day'

export type StoryEvent =
  | { type: 'BEGIN' }
  | { type: 'CONTINUE' }
  | { type: 'ANSWER_YES' }
  | { type: 'PLAN_FIRST_DAY' }

export interface StoryState {
  scene: StoryScene
  progress: number
  answered: boolean
  firstDayUnlocked: boolean
}

export const initialStoryState: StoryState = {
  scene: 'night',
  progress: 0,
  answered: false,
  firstDayUnlocked: false,
}

const linearScenes: StoryScene[] = ['constellation', 'words', 'growth', 'bloom', 'question']

export function reduceStory(state: StoryState, event: StoryEvent): StoryState {
  switch (event.type) {
    case 'BEGIN':
      return { ...state, scene: 'constellation', progress: Math.max(state.progress, 0.14) }
    case 'CONTINUE': {
      const currentIndex = Math.max(0, linearScenes.indexOf(state.scene))
      const nextIndex = Math.min(currentIndex + 1, linearScenes.length - 1)
      return { ...state, scene: linearScenes[nextIndex], progress: Math.min(1, state.progress + 0.2) }
    }
    case 'ANSWER_YES':
      return { ...state, scene: 'accepted', progress: 1, answered: true, firstDayUnlocked: true }
    case 'PLAN_FIRST_DAY':
      return { ...state, scene: 'first-day', firstDayUnlocked: true }
  }
}

export const STORY_ORDER: StoryScene[] = ['night', 'constellation', 'words', 'growth', 'bloom', 'question', 'accepted', 'first-day']
