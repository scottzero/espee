type FeedbackState = 'idle' | 'correct' | 'wrong'

type Props = {
  message: string
  state: FeedbackState
}

export default function FeedbackBar({ message, state }: Props) {
  const style: React.CSSProperties = {
    fontSize: '13px',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '0.5px solid',
    lineHeight: '1.6',
    minHeight: '40px',
    borderColor:
      state === 'correct' ? 'var(--green-border)' :
      state === 'wrong'   ? 'var(--red-border)' :
      'var(--border)',
    background:
      state === 'correct' ? 'var(--green-bg)' :
      state === 'wrong'   ? 'var(--red-bg)' :
      'var(--bg-secondary)',
    color:
      state === 'correct' ? 'var(--green-text)' :
      state === 'wrong'   ? 'var(--red-text)' :
      'var(--text-secondary)',
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}