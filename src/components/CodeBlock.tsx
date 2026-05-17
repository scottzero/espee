type BlockState = 'idle' | 'selected' | 'correct' | 'wrong' | 'dimmed'

type Props = {
  code: string
  state: BlockState
  onClick: () => void
}

export default function CodeBlock({ code, state, onClick }: Props) {
  const base: React.CSSProperties = {
    fontFamily: 'monospace',
    fontSize: '13px',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1.5px solid',
    cursor: state === 'dimmed' ? 'default' : 'pointer',
    textAlign: 'left',
    lineHeight: '1.6',
    whiteSpace: 'pre',
    width: '100%',
    transition: 'all 0.15s',
    opacity: state === 'dimmed' ? 0.3 : 1,
    pointerEvents: state === 'dimmed' ? 'none' : 'auto',
    display: 'block',
    background:
      state === 'selected' ? '#E6F1FB' :
      state === 'correct'  ? '#EAF3DE' :
      state === 'wrong'    ? '#FCEBEB' :
      '#ffffff',
    borderColor:
      state === 'selected' ? '#378ADD' :
      state === 'correct'  ? '#639922' :
      state === 'wrong'    ? '#E24B4A' :
      '#d0cfc8',
    color:
      state === 'selected' ? '#0C447C' :
      state === 'correct'  ? '#27500A' :
      state === 'wrong'    ? '#791F1F' :
      '#1a1a1a',
  }

  return (
    <button style={base} onClick={onClick}>
      {code}
    </button>
  )
}