import type { UserProgress } from '../types'

const KEY = 'espee_progress'

const INTERVALS = [1, 3, 7, 14, 30]

export function loadProgress(): Record<string, UserProgress> {
  const raw = localStorage.getItem(KEY)
  if (!raw) return {}
  return JSON.parse(raw)
}

export function saveProgress(progress: Record<string, UserProgress>) {
  localStorage.setItem(KEY, JSON.stringify(progress))
}

export function markSolved(problemId: string): Record<string, UserProgress> {
  const progress = loadProgress()
  const existing = progress[problemId]
  const timesSolved = existing ? existing.timesSolved + 1 : 1
  const intervalDays = INTERVALS[Math.min(timesSolved - 1, INTERVALS.length - 1)]
  const nextDue = new Date()
  nextDue.setDate(nextDue.getDate() + intervalDays)

  progress[problemId] = {
    problemId,
    timesSolved,
    lastSolvedAt: new Date().toISOString(),
    nextDueAt: nextDue.toISOString(),
    intervalDays,
  }

  saveProgress(progress)
  return progress
}

export function buildQueue(progress: Record<string, UserProgress>, totalProblems: number): number[] {
  const queue: number[] = []
  const now = new Date()

  for (let i = 0; i < totalProblems; i++) {
    const id = Object.keys(progress)[i]
    const p = progress[id]
    if (!p) {
      queue.push(i)
      break
    }
    if (p.nextDueAt && new Date(p.nextDueAt) <= now) {
      queue.push(i)
    }
  }

  const newProblemIdx = Object.keys(progress).length
  if (newProblemIdx < totalProblems && !queue.includes(newProblemIdx)) {
    queue.push(newProblemIdx)
  }

  return queue
}