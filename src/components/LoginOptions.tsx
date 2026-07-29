import React from 'react';
import { useT } from '../i18n';
import FAIcon from './FAIcon';
import { loginDivisor, loginDivisorLinha, loginDivisorTexto, loginHint } from './loginStyles';

// SSO real do gov.br (mesmo endereço usado antes da extração).
const GOVBR_SSO_URL = 'https://sso.acesso.gov.br/login?client_id=floripa.sc.gov.br&authorization_id=19dadc40977';

// ── Meios de acesso — fonte única ────────────────────────────────────────────
// É o bloco do login do portal, sem alteração de ordem nem de estilo:
//   gov.br · ou · Certificado Digital · [Google] · ou entrar com login do
//   sistema · botão que revela o formulário de credenciais.
// O fluxo do WhatsApp só acrescenta o Google (mostrarGoogle).
//
// Estrutura estável de propósito: o botão do gov.br está SEMPRE dentro do <a>
// (o onClick só intercepta quando há navegação de protótipo), para o React nunca
// precisar desmontar um nó que o FontAwesome já trocou por <svg>.
export default function LoginOptions({
  showForm,
  onShowForm,
  onGovBr,
  onCertificado,
  mostrarGoogle = false,
  onGoogle,
  googleLabel = 'Entrar com Google',
  systemLoginLabel,
  form,
}: {
  showForm: boolean;                 // formulário de credenciais visível
  onShowForm: () => void;
  onGovBr?: () => void;              // protótipo navegável — no lugar de ir ao SSO
  onCertificado?: () => void;
  mostrarGoogle?: boolean;
  onGoogle?: () => void;
  googleLabel?: string;
  systemLoginLabel?: string;
  form?: React.ReactNode;
}) {
  const t = useT();
  const rotuloSistema = systemLoginLabel ?? t('loginEntrarSistema');

  const botaoContorno: React.CSSProperties = {
    width: '100%', height: 48, borderRadius: 10, background: 'white', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    fontWeight: 700, fontSize: 14, transition: 'background 0.12s',
  };

  return (
    <>
      <a
        href={GOVBR_SSO_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        onClick={onGovBr ? (e => { e.preventDefault(); onGovBr(); }) : undefined}
      >
        <button style={{ width: '100%', height: 52, borderRadius: 10, background: 'var(--govbr-color)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontWeight: 700, fontSize: 15, color: 'white', boxShadow: '0px 2px 8px rgba(19,81,180,0.30)', transition: 'background 0.12s' }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-hover)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-color)'}>
          <FAIcon icon="fa-regular fa-shield-check" style={{ fontSize: 18 }} />
          Entrar com <strong style={{ fontSize: 20, letterSpacing: '0.09px' }}>gov.br</strong>
        </button>
      </a>
      <p style={loginHint}>{t('loginGovBrRecomendado')}</p>

      <div style={loginDivisor}>
        <div style={loginDivisorLinha} />
        <span style={loginDivisorTexto}>ou</span>
        <div style={loginDivisorLinha} />
      </div>

      <button onClick={onCertificado}
        style={{ ...botaoContorno, color: 'var(--cert-color)', border: '1.5px solid var(--cert-color)' }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--cert-bg-hover)'}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}>
        <FAIcon icon="fa-regular fa-certificate" style={{ fontSize: 18, color: 'var(--cert-color)' }} />
        {t('certDigital')}
      </button>
      <p style={loginHint}>{t('certDigitalDesc')}</p>

      {mostrarGoogle && (
        <button onClick={onGoogle}
          style={{ ...botaoContorno, color: 'var(--neutral-dark-pure)', border: '1.5px solid var(--neutral-light-down)' }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-subtle)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}>
          <FAIcon icon="fa-brands fa-google" style={{ fontSize: 17, color: 'var(--govbr-color)' }} />
          {googleLabel}
        </button>
      )}

      <div style={loginDivisor}>
        <div style={loginDivisorLinha} />
        <span style={loginDivisorTexto}>ou {rotuloSistema}</span>
        <div style={loginDivisorLinha} />
      </div>

      {showForm ? form : (
        <button onClick={onShowForm}
          style={{ width: '100%', height: 44, border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, fontSize: 14, color: 'var(--neutral-dark-down)', transition: 'all 0.12s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-pure)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--neutral-dark-down)'; }}>
          <FAIcon icon="fa-regular fa-arrow-right-to-bracket" style={{ fontSize: 14 }} />
          {rotuloSistema}
        </button>
      )}
    </>
  );
}
