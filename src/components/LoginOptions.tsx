import React from 'react';
import { useT } from '../i18n';
import FAIcon from './FAIcon';
import { loginDivisor, loginDivisorLinha, loginDivisorTexto, loginHint } from './loginStyles';

// SSO real do gov.br (mesmo endereço usado antes da extração).
const GOVBR_SSO_URL = 'https://sso.acesso.gov.br/login?client_id=floripa.sc.gov.br&authorization_id=19dadc40977';

// ── Meios de acesso — fonte única ────────────────────────────────────────────
// gov.br → Certificado Digital → login do sistema. Consumido pelo LoginModal e
// pelas rotas /entrar/whatsapp; a ordem e os estilos são os mesmos nos dois.
//
// Estrutura estável de propósito: o botão do gov.br está SEMPRE dentro do <a>
// (o onClick só intercepta quando há navegação de protótipo), para o React nunca
// precisar desmontar um nó que o FontAwesome já trocou por <svg>.
export default function LoginOptions({
  showForm,
  onShowForm,
  onGovBr,
  onCertificado,
  onSystemLogin,
  systemLoginLabel,
  compacto = false,
  form,
}: {
  showForm: boolean;                 // form de credenciais visível (progressive disclosure)
  onShowForm: () => void;
  onGovBr?: () => void;              // protótipo navegável — no lugar de ir ao SSO
  onCertificado?: () => void;
  onSystemLogin?: () => void;        // quando definido, o botão navega em vez de expandir o form
  systemLoginLabel?: string;
  compacto?: boolean;                // alturas menores para caber na tela do celular sem scroll
  form?: React.ReactNode;
}) {
  const t = useT();
  const rotuloSistema = systemLoginLabel ?? t('loginEntrarSistema');
  const mostrarBotaoSistema = !!onSystemLogin || !showForm;

  // Alturas: nunca abaixo de 44px — alvo mínimo de toque.
  const hGovBr = compacto ? 46 : 52;
  const hCert  = compacto ? 44 : 48;
  const hint   = compacto ? { ...loginHint, fontSize: 11.5, lineHeight: '16px' } : loginHint;

  return (
    <>
      <a
        href={GOVBR_SSO_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        onClick={onGovBr ? (e => { e.preventDefault(); onGovBr(); }) : undefined}
      >
        <button style={{ width: '100%', height: hGovBr, borderRadius: 10, background: 'var(--govbr-color)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontWeight: 700, fontSize: 15, color: 'white', boxShadow: '0px 2px 8px rgba(19,81,180,0.30)', transition: 'background 0.12s' }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-hover)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-color)'}>
          <FAIcon icon="fa-regular fa-shield-check" style={{ fontSize: 18 }} />
          Entrar com <strong style={{ fontSize: 20, letterSpacing: '0.09px' }}>gov.br</strong>
        </button>
      </a>
      <p style={hint}>{t('loginGovBrRecomendado')}</p>

      <div style={loginDivisor}>
        <div style={loginDivisorLinha} />
        <span style={loginDivisorTexto}>ou</span>
        <div style={loginDivisorLinha} />
      </div>

      <button onClick={onCertificado}
        style={{ width: '100%', height: hCert, borderRadius: 10, background: 'white', border: '1.5px solid var(--cert-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontWeight: 700, fontSize: 14, color: 'var(--cert-color)', transition: 'background 0.12s' }}
        onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--cert-bg-hover)'}
        onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}>
        <FAIcon icon="fa-regular fa-certificate" style={{ fontSize: 18, color: 'var(--cert-color)' }} />
        {t('certDigital')}
      </button>
      <p style={hint}>{t('certDigitalDesc')}</p>

      <div style={loginDivisor}>
        <div style={loginDivisorLinha} />
        <span style={loginDivisorTexto}>ou {rotuloSistema}</span>
        <div style={loginDivisorLinha} />
      </div>

      {mostrarBotaoSistema ? (
        <button onClick={onSystemLogin ?? onShowForm}
          style={{ width: '100%', height: 44, border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, fontSize: 14, color: 'var(--neutral-dark-down)', transition: 'all 0.12s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-pure)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--neutral-dark-down)'; }}>
          <FAIcon icon="fa-regular fa-arrow-right-to-bracket" style={{ fontSize: 14 }} />
          {rotuloSistema}
        </button>
      ) : form}
    </>
  );
}
