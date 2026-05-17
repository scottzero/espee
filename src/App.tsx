import { useState } from 'react'
import { problems } from './data/problems'
import { loadProgress, markSolved } from './store/progress'
import ProblemScreen from './components/ProblemScreen'

export default function App() {
  const [progress, setProgress] = useState(() => loadProgress())
  const [currentIdx, setCurrentIdx] = useState(0)
  const [problemKey, setProblemKey] = useState(0)
  const [xp, setXp] = useState(() => {
    const p = loadProgress()
    return Object.values(p).reduce((sum, v) => sum + v.timesSolved * 10, 0)
  })

  const currentProblem = problems[currentIdx]

  function handleSelectProblem(idx: number) {
    if (idx === currentIdx) return
    setCurrentIdx(idx)
    setProblemKey(k => k + 1)
  }

  function handleSolved() {
    const newProgress = markSolved(currentProblem.id)
    setProgress(newProgress)
    setXp(prev => prev + 10)
    const nextIdx = (currentIdx + 1) % problems.length
    setCurrentIdx(nextIdx)
    setProblemKey(k => k + 1)
  }

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '24px 16px',
      fontFamily: 'system-ui, sans-serif',
    }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 500 }}>
            {currentProblem.title}
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6b6a65', maxWidth: '480px' }}>
            {currentProblem.subtitle}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '20px', fontWeight: 500 }}>{xp} XP</div>
          <div style={{ fontSize: '11px', color: '#6b6a65' }}>
            {Object.keys(progress).length} solved
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        marginBottom: '20px',
      }}>
        {problems.map((p, i) => {
          const isDone = !!progress[p.id]
          const isActive = i === currentIdx
          return (
            <button
              key={p.id}
              onClick={() => handleSelectProblem(i)}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '999px',
                border: '0.5px solid',
                borderColor: isActive ? '#378ADD' : isDone ? '#639922' : '#d0cfc8',
                background: isActive ? '#E6F1FB' : isDone ? '#EAF3DE' : '#f8f7f4',
                color: isActive ? '#0C447C' : isDone ? '#27500A' : '#6b6a65',
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
              }}
            >
              {isDone ? '✓ ' : ''}{p.title}
            </button>
          )
        })}
      </div>

      <div style={{
        borderTop: '0.5px solid #e5e4e0',
        paddingTop: '20px',
      }}>
        <ProblemScreen
          key={`${currentIdx}-${problemKey}`}
          problem={currentProblem}
          onSolved={handleSolved}
        />
      </div>

    </div>
  )
}