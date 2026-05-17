import { useState } from 'react'
import type { Problem } from '../types'
import CodeBlock from './CodeBlock'
import FeedbackBar from './FeedbackBar'
import FunctionPreview from './FunctionPreview'

type BlockState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dimmed'
type FeedbackState = 'idle' | 'correct' | 'wrong'

type Props = {
  problem: Problem
  onSolved: () => void
}

export default function ProblemScreen({ problem, onSolved }: Props) {
  const [stepIdx, setStepIdx] = useState(0)
  const [blockStates, setBlockStates] = useState<BlockState[]>(
    problem.steps[0].blocks.map(() => 'idle')
  )
  const [feedback, setFeedback] = useState('Pick the block that fits this step, then hit Check.')
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle')
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [snippets, setSnippets] = useState<string[]>([])
  const [solved, setSolved] = useState(false)

  const step = problem.steps[stepIdx]
  const isLastStep = stepIdx === problem.steps.length - 1

  function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5)
  }

  const [shuffledBlocks, setShuffledBlocks] = useState(() => shuffle(step.blocks))

  function handleSelect(idx: number) {
    if (blockStates[idx] === 'dimmed') return
    const next = blockStates.map((s, i) => {
      if (s === 'correct' || s === 'dimmed') return s
      return i === idx ? 'selected' : 'idle'
    }) as BlockState[]
    setBlockStates(next)
    setSelectedIdx(idx)
    setFeedback('Hit Check to see if this is right.')
    setFeedbackState('idle')
  }

  function handleCheck() {
    if (selectedIdx === null) {
      setFeedback('Pick a block first!')
      return
    }

    const block = shuffledBlocks[selectedIdx]

    if (block.correct) {
      const next = blockStates.map((_, i) =>
        i === selectedIdx ? 'correct' : 'dimmed'
      ) as BlockState[]
      setBlockStates(next)
      setFeedback('✓ ' + step.feedback.correct)
      setFeedbackState('correct')
      setSnippets(prev => [...prev, step.snippet])
      if (isLastStep) setSolved(true)
    } else {
      const next = [...blockStates] as BlockState[]
      next[selectedIdx] = 'wrong'
      setBlockStates(next)
      const msg = step.feedback.wrong[block.code] || 'Not quite — think about what we need here.'
      setFeedback('✗ ' + msg)
      setFeedbackState('wrong')
      setSelectedIdx(null)
    }
  }

  function handleNext() {
    if (solved) {
      onSolved()
      return
    }
    const nextStep = stepIdx + 1
    setStepIdx(nextStep)
    setShuffledBlocks(shuffle(problem.steps[nextStep].blocks))
    setBlockStates(problem.steps[nextStep].blocks.map(() => 'idle'))
    setSelectedIdx(null)
    setFeedback('Pick the block that fits this step, then hit Check.')
    setFeedbackState('idle')
  }

  const showNext = feedbackState === 'correct'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      <div style={{
        display: 'inline-block',
        fontSize: '11px',
        padding: '3px 10px',
        borderRadius: '999px',
        background: 'var(--blue-bg)',
        color: 'var(--blue-text)',
        alignSelf: 'flex-start',
      }}>
        {step.prompt}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
      }}>
        {shuffledBlocks.map((block, i) => (
          <CodeBlock
            key={i}
            code={block.code}
            state={blockStates[i]}
            onClick={() => handleSelect(i)}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {!showNext ? (
          <button
            onClick={handleCheck}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '0.5px solid var(--border-secondary)',
              background: 'var(--bg)',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--text-primary)',
            }}
          >
            Check ↗
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '0.5px solid var(--green-border)',
              background: 'var(--green-bg)',
              cursor: 'pointer',
              fontSize: '13px',
              color: 'var(--green-text)',
            }}
          >
            {solved ? 'Problem solved! Next →' : 'Next step →'}
          </button>
        )}
        <button
          onClick={() => {
            setBlockStates(step.blocks.map(() => 'idle'))
            setSelectedIdx(null)
            setFeedback('Pick the block that fits this step, then hit Check.')
            setFeedbackState('idle')
          }}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '0.5px solid var(--border-secondary)',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '13px',
            color: 'var(--text-secondary)',
          }}
        >
          Reset step
        </button>

        <button
          onClick={() => {
            setStepIdx(0)
            setShuffledBlocks(shuffle(problem.steps[0].blocks))
            setBlockStates(problem.steps[0].blocks.map(() => 'idle'))
            setSelectedIdx(null)
            setSnippets([])
            setSolved(false)
            setFeedback('Pick the block that fits this step, then hit Check.')
            setFeedbackState('idle')
          }}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '0.5px solid var(--border-secondary)',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '13px',
            color: 'var(--text-muted)',
          }}
        >
          Reset problem
        </button>
      </div>

      <FeedbackBar message={feedback} state={feedbackState} />

      <div style={{
        borderTop: '0.5px solid var(--border)',
        paddingTop: '16px',
      }}>
        <FunctionPreview
          sig={problem.sig}
          snippets={snippets}
          complete={solved}
        />
      </div>

    </div>
  )
}