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
  const [dark, setDark] = useState(false)

  const currentProblem = problems[currentIdx]

  function toggleDark() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
  }

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
      color: 'var(--text-primary)',
    }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
<span style={{
            fontSize: '14px',
            fontWeight: 300,
            letterSpacing: '0.15em',
            color: 'var(--text-primary)',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            espee
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            by Scott Payton
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '20px', fontWeight: 500, color: 'var(--text-primary)' }}>{xp} XP</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {Object.keys(progress).length} solved
            </div>
          </div>
          <button
            onClick={toggleDark}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '0.5px solid var(--border-secondary)',
              background: 'var(--bg-secondary)',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)' }}>
          {currentProblem.title}
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '480px' }}>
          {currentProblem.subtitle}
        </p>
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
                borderColor: isActive ? 'var(--blue-border)' : isDone ? 'var(--green-border)' : 'var(--border-secondary)',
                background: isActive ? 'var(--blue-bg)' : isDone ? 'var(--green-bg)' : 'var(--bg-secondary)',
                color: isActive ? 'var(--blue-text)' : isDone ? 'var(--green-text)' : 'var(--text-secondary)',
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
        borderTop: '0.5px solid var(--border)',
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