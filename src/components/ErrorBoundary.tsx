import React from 'react';
import FAIcon from './FAIcon';

interface Props {
  children: React.ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(e: Error): State {
    return { hasError: true, message: e.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 64, gap: 16, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--error-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FAIcon icon="fa-regular fa-triangle-exclamation" style={{ fontSize: 28, color: 'var(--error-color)' }} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--neutral-ink-strong)' }}>
          {this.props.fallbackTitle ?? 'Algo deu errado'}
        </div>
        {this.state.message && (
          <div style={{ fontSize: 13, color: 'var(--neutral-dark-down)', maxWidth: 400, lineHeight: '20px' }}>
            {this.state.message}
          </div>
        )}
        <button
          onClick={() => this.setState({ hasError: false, message: '' })}
          style={{ marginTop: 8, height: 40, padding: '0 20px', borderRadius: 8, border: '1.5px solid var(--primary-pure)', background: 'white', color: 'var(--primary-pure)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
        >
          Tentar novamente
        </button>
      </div>
    );
  }
}
