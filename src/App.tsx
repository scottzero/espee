import { useState, useEffect } from 'react'
import { problems } from './data/problems'
import { loadProgress, markSolved } from './store/progress'
import { fetchGlobalXP, incrementGlobalXP } from './lib/supabase'
import ProblemScreen from './components/ProblemScreen'

function animateCounter(from: number, to: number, duration: number, setter: (n: number) => void) {
  const start = performance.now()
  function tick(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    setter(Math.floor(from + (to - from) * eased))
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default function App() {
  const [progress, setProgress] = useState(() => loadProgress())
  const [currentIdx, setCurrentIdx] = useState(0)
  const [problemKey, setProblemKey] = useState(0)
  const [language, setLanguage] = useState<'csharp' | 'python' | 'javascript'>('csharp')
  const [xp, setXp] = useState(() => {
    const p = loadProgress()
    return Object.values(p).reduce((sum, v) => sum + v.timesSolved * 10, 0)
  })
  const [dark, setDark] = useState(false)
  const [_globalXP, setGlobalXP] = useState(0)
  const [displayXP, setDisplayXP] = useState(0)

  useEffect(() => {
    fetchGlobalXP().then(xp => {
      setGlobalXP(xp)
      animateCounter(0, xp, 2000, setDisplayXP)
    })
  }, [])

  const filteredProblems = problems.filter(p => p.language === language)
  const currentProblem = filteredProblems[currentIdx] ?? filteredProblems[0]

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
    setGlobalXP(prev => prev + 10)
    setDisplayXP(prev => prev + 10)
    incrementGlobalXP(10)
    const nextIdx = (currentIdx + 1) % filteredProblems.length
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

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{
            fontSize: '14px',
            fontWeight: 300,
            letterSpacing: '0.15em',
            color: 'var(--text-primary)',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            espee
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 300,
            letterSpacing: '0.08em',
            color: 'var(--text-muted)',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            global xp: {displayXP.toLocaleString()}
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

      {/* Language toggle */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
        {(['csharp', 'python', 'javascript'] as const).map(lang => (
          <button
            key={lang}
            onClick={() => {
              setLanguage(lang)
              setCurrentIdx(0)
              setProblemKey(k => k + 1)
            }}
            style={{
              fontSize: '10px',
              padding: '3px 12px',
              borderRadius: '999px',
              border: '0.5px solid',
              borderColor: language === lang ? '#e8a0b0' : 'var(--border-secondary)',
              background: language === lang ? '#fce8ed' : 'transparent',
              color: language === lang ? '#9b2d45' : 'var(--text-muted)',
              fontFamily: 'monospace',
              cursor: 'pointer',
              fontWeight: language === lang ? 500 : 400,
            }}
          >
            {lang === 'csharp' ? 'C#' : lang === 'python' ? 'Python' : 'JS'}
          </button>
        ))}
      </div>

      {/* Problem title */}
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)' }}>
          {currentProblem.title}
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '480px' }}>
          {currentProblem.subtitle}
        </p>
      </div>

      {/* Problem pills */}
      <div style={{
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
        marginBottom: '20px',
      }}>
        {filteredProblems.map((p, i) => {
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

      {/* Problem screen */}
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

      {/* Footer */}
      <div style={{
        marginTop: '48px',
        paddingTop: '16px',
        borderTop: '0.5px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          © 2026 Scott Payton
        </span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="https://x.com/espeeapp" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'none' }}>Twitter</a>
          <a href="https://bsky.app/profile/espeeapp.bsky.social" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'none' }}>Bluesky</a>
          <a href="https://ko-fi.com/espeeapp" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'none' }}>Support ☕</a>
          <a href="https://www.linkedin.com/in/scottpayton1337/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'none' }}>LinkedIn</a>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>espee — a muscle memory app</span>
        </div>
      </div>

    </div>
  )
}