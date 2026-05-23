import { useState } from 'react'
import { systemDesignTopics } from './data/systemDesign'
import { useTheme } from './hooks/useTheme'

export default function SystemDesign() {
const [openId, setOpenId] = useState<string | null>(null)
  const { dark, toggleDark } = useTheme()

  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      padding: '24px 16px',
      fontFamily: 'system-ui, sans-serif',
      color: 'var(--text-primary)',
    }}>

      {/* Top nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <a href="/" style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          textDecoration: 'none',
          letterSpacing: '0.04em',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>
          ← practice problems
        </a>
        <button
          onClick={toggleDark}
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
          }}
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 500, color: 'var(--text-primary)' }}>
          System Design
        </h1>
        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
          The core concepts behind every system design interview.
        </p>
      </div>

      {/* Topic list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {systemDesignTopics.map(topic => (
          <div key={topic.id} style={{
            border: '0.5px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>

            {/* Header */}
            <button
              onClick={() => setOpenId(openId === topic.id ? null : topic.id)}
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
                  #{topic.number}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {topic.title}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                  {topic.subtitle}
                </span>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {openId === topic.id ? '▲' : '▼'}
              </span>
            </button>

            {/* Content */}
            {openId === topic.id && (
              <div style={{ padding: '16px', borderTop: '0.5px solid var(--border)' }}>

                {/* Core idea */}
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '0 0 16px' }}>
                  {topic.coreIdea}
                </p>

                {/* SVG diagram */}
                <div style={{
                  background: '#1a1a1a',
                  borderRadius: '8px',
                  border: '0.5px solid #333',
                  padding: '16px',
                  marginBottom: '16px',
                  overflowX: 'auto',
                }}
                  dangerouslySetInnerHTML={{ __html: topic.svg }}
                />

                {/* Key points */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>key points</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {topic.keyPoints.map((point, i) => (
                      <div key={i} style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        padding: '4px 0',
                        borderBottom: i < topic.keyPoints.length - 1 ? '0.5px solid var(--border)' : 'none',
                      }}>
                        → {point}
                      </div>
                    ))}
                  </div>
                </div>

                {/* When asked */}
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>when this comes up</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {topic.whenAsked.map((w, i) => (
                      <div key={i} style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        padding: '4px 0',
                        borderBottom: i < topic.whenAsked.length - 1 ? '0.5px solid var(--border)' : 'none',
                        fontStyle: 'italic',
                      }}>
                        {w}
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
        more topics coming soon
      </div>

    </div>
  )
}