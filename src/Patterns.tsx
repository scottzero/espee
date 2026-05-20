import { useState } from 'react'
import { patterns } from './data/patterns'

type Lang = 'python' | 'javascript' | 'csharp'

export default function Patterns() {
  const [openId, setOpenId] = useState<string | null>('sliding-window')
  const [lang, setLang] = useState<Lang>('python')

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '24px 16px',
      fontFamily: 'system-ui, sans-serif',
      color: 'var(--text-primary)',
    }}>

      <div style={{ marginBottom: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        
        <a href="/"
        style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        ← practice problems
      </a>
    </div>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)' }}>
          Pattern Library
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
          The core patterns behind every coding interview problem.
        </p>
      </div>

      {/* Language toggle */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
        {(['python', 'javascript', 'csharp'] as const).map(l => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              fontSize: '10px',
              padding: '3px 12px',
              borderRadius: '999px',
              border: '0.5px solid',
              borderColor: lang === l ? '#ea580c' : 'var(--border-secondary)',
              background: lang === l ? '#ffedd5' : 'transparent',
              color: lang === l ? '#9a3412' : 'var(--text-muted)',
              fontFamily: 'monospace',
              cursor: 'pointer',
              fontWeight: lang === l ? 500 : 400,
            }}
          >
            {l === 'csharp' ? 'C#' : l === 'python' ? 'Python' : 'JS'}
          </button>
        ))}
      </div>

      {/* Pattern list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {patterns.map(p => (
          <div key={p.id} style={{
            border: '0.5px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>

            {/* Header */}
            <button
              onClick={() => setOpenId(openId === p.id ? null : p.id)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                background: 'var(--bg-secondary)',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', marginRight: '8px' }}>
                  #{p.number}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {p.title}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                  {p.subtitle}
                </span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {openId === p.id ? '▲' : '▼'}
              </span>
            </button>

            {/* Content */}
            {openId === p.id && (
              <div style={{ padding: '16px', borderTop: '0.5px solid var(--border)' }}>

                {/* Core idea */}
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
                  {p.coreIdea}
                </p>

                {/* Mental model */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px' }}>mental model</div>
                  <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 8px' }}>
                    {p.mentalModel}
                  </p>
                  <pre style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    background: 'var(--bg-secondary)',
                    border: '0.5px solid var(--border)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: 'var(--text-primary)',
                    margin: 0,
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                    lineHeight: 1.8,
                  }}>
                    {p.ascii}
                  </pre>
                </div>

                {/* Flavors */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>flavors</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {p.flavors.map((f, i) => (
                      <div key={i} style={{
                        padding: '10px 12px',
                        background: 'var(--bg-secondary)',
                        border: '0.5px solid var(--border)',
                        borderRadius: '8px',
                      }}>
                        <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>
                          {f.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {f.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Template */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>template</div>
                  <pre style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    background: 'var(--bg-secondary)',
                    border: '0.5px solid var(--border)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: 'var(--text-primary)',
                    margin: 0,
                    overflowX: 'auto',
                    whiteSpace: 'pre',
                    lineHeight: 1.8,
                  }}>
                    {p.templates[lang]}
                  </pre>
                </div>

                {/* When to use */}
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>when to use</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {p.whenToUse.map((w, i) => (
                      <div key={i} style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        padding: '4px 0',
                        borderBottom: i < p.whenToUse.length - 1 ? '0.5px solid var(--border)' : 'none',
                      }}>
                        → {w}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '48px', paddingTop: '16px', borderTop: '0.5px solid var(--border)', fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
        more patterns coming soon
      </div>

    </div>
  )
}