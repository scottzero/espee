export type Block = {
  code: string
  correct: boolean
}

export type Step = {
  prompt: string
  blocks: Block[]
  feedback: {
    correct: string
    wrong: Record<string, string>
  }
  snippet: string
}

export type Problem = {
  id: string
  title: string
  subtitle: string
  difficulty: 'easy' | 'medium' | 'hard'
  language: 'csharp'
  sig: string
  steps: Step[]
}

export type UserProgress = {
  problemId: string
  timesSolved: number
  lastSolvedAt: string | null
  nextDueAt: string | null
  intervalDays: number
}