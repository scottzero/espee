type BlockState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dimmed'

type Props = {
  code: string
  state: BlockState
  onClick: () => void
}

export default function CodeBlock({ code, state, onClick }: Props) {
  const base: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '12px',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1.5px solid',
    cursor: state === 'dimmed' ? 'default' : 'pointer',
    textAlign: 'left',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflow: 'hidden',
    width: '100%',
    opacity: state === 'dimmed' ? 0.3 : 1,
    pointerEvents: state === 'dimmed' ? 'none' : 'auto',
    display: 'block',
    background:
      state === 'selected' ? 'var(--blue-bg)' :
      state === 'correct'  ? 'var(--green-bg)' :
      state === 'wrong'    ? 'var(--red-bg)' :
      'var(--bg)',
    borderColor:
      state === 'selected' ? 'var(--blue-border)' :
      state === 'correct'  ? 'var(--green-border)' :
      state === 'wrong'    ? 'var(--red-border)' :
      'var(--border-secondary)',
    color:
      state === 'selected' ? 'var(--blue-text)' :
      state === 'correct'  ? 'var(--green-text)' :
      state === 'wrong'    ? 'var(--red-text)' :
      'var(--text-primary)',
  }

  return (
    <button style={base} onClick={onClick}>
      {code}
    </button>
  )
}