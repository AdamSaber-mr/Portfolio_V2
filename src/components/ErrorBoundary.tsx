import { Component, type ErrorInfo, type ReactNode } from 'react';
import { CONTACT_EMAIL } from '../data';

interface Props { children: ReactNode; }
interface State { failed: boolean; }

/**
 * Vangt render-fouten op zodat één kapot component niet de hele pagina wit maakt.
 *
 * Zonder dit betekent een enkele uncaught fout dat een recruiter een leeg scherm
 * ziet en weer wegklikt. De fallback houdt daarom altijd een e-mailadres zichtbaar,
 * zodat zelfs een crash nog tot contact kan leiden.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Onverwachte fout in de UI:', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '96px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '28px', marginBottom: '12px' }}>
          Er ging iets mis
        </h1>
        <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: '24px' }}>
          Deze pagina kon niet geladen worden. Ververs de pagina, of mail me gerust
          rechtstreeks.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          style={{
            display: 'inline-block', background: 'var(--accent)', color: 'var(--accentink)',
            padding: '13px 24px', borderRadius: '30px', fontWeight: 600, textDecoration: 'none',
          }}
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    );
  }
}
