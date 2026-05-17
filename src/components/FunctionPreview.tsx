type Props = {
  sig: string
  snippets: string[]
  complete: boolean
}

export default function FunctionPreview({ sig, snippets, complete }: Props) {
  const lines = [
    sig,
    ...snippets,
    ...(!complete ? ['    // more to come...'] : []),
    '}'
  ].join('\n')

  return (
    <div>
      <p style={{
        fontSize: '11px',
        color: '#6b6a65',
        margin: '0 0 6px 0',
      }}>
        Function so far
      </p>
      <pre style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        background: '#f8f7f4',
        border: '0.5px solid #d0cfc8',
        borderRadius: '8px',
        padding: '12px 14px',
        lineHeight: '1.8',
        color: '#1a1a1a',
        margin: 0,
        whiteSpace: 'pre-wrap',
        minHeight: '48px',
      }}>
        {lines}
      </pre>
    </div>
  )
}