export default function Privacy() {
    return (
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '24px 16px',
        fontFamily: 'system-ui, sans-serif',
        color: '#1a1a1a',
      }}>
        <h1 style={{ fontSize: '22px', fontWeight: 500, marginBottom: '8px' }}>Privacy Policy</h1>
        <p style={{ fontSize: '13px', color: '#6b6a65', marginBottom: '24px' }}>Last updated: May 2026</p>
  
        <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
          espee is a free coding interview practice app. We take your privacy seriously — here's the short version: we don't collect any personal data.
        </p>
  
        <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Data We Collect</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
          None. espee does not collect, store, or share any personal information. No account is required to use the app.
        </p>
  
        <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Local Storage</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
          Your progress (problems solved, XP) is stored locally on your device only. This data never leaves your device and is not accessible to us.
        </p>
  
        <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Analytics</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
          The web version of espee uses Vercel Analytics to track anonymous page visits (no personal data, no cookies). The mobile app collects no analytics whatsoever.
        </p>
  
        <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Third Party Services</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
          We use Supabase to store a single global XP counter — this is an aggregate number only and contains no personal information.
        </p>
  
        <h2 style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>Contact</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
          Questions? Reach out on Twitter at @espeeapp
        </p>
  
        <p style={{ fontSize: '13px', color: '#6b6a65', marginTop: '40px' }}>
          © 2026 Scott Payton · espee
        </p>
      </div>
    )
  }