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
      state === 'correct' ? '#639922' :
      state === 'wrong'   ? '#E24B4A' :
      '#d0cfc8',
    background:
      state === 'correct' ? '#EAF3DE' :
      state === 'wrong'   ? '#FCEBEB' :
      '#f8f7f4',
    color:
      state === 'correct' ? '#27500A' :
      state === 'wrong'   ? '#791F1F' :
      '#6b6a65',
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}