import React, { useState } from 'react';
import { Button } from '@1doc/1ds-react';
import { useT, useIsMobile } from '../i18n';
import { imgFloripa } from '../mocks';
import FAIcon from './FAIcon';

export default function LoginModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  const t = useT();
  const isMobile = useIsMobile();
  const [view,          setView]          = useState<'login' | 'recovery'>('login');
  const [email,         setEmail]         = useState('');
  const [senha,         setSenha]         = useState('');
  const [showSenha,     setShowSenha]     = useState(false);
  const [emailRecov,    setEmailRecov]    = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const label: React.CSSProperties = {
    fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '20px',
  };
  const inputStyle: React.CSSProperties = {
    background: 'white', border: '1px solid var(--neutral-dark-up)', borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 8, padding: 8, height: 44, width: '100%', boxSizing: 'border-box',
  };
  const inputEl: React.CSSProperties = {
    flex: 1, border: 'none', outline: 'none', background: 'transparent',
    fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', minWidth: 0,
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: isMobile ? 'white' : 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? 0 : 32,
    }} onClick={e => { if (!isMobile && e.target === e.currentTarget) onClose(); }}>

      <div style={{ display: 'flex', width: '100%', maxWidth: isMobile ? '100%' : 1100, height: isMobile ? '100%' : '90vh', maxHeight: isMobile ? '100%' : 800, borderRadius: isMobile ? 0 : 16, overflow: 'hidden', boxShadow: isMobile ? 'none' : '0px 10px 40px rgba(0,0,0,0.25)' }}>

        {/*  Foto Florianópolis (hidden on mobile)  */}
        {!isMobile && (
          <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
            <img src={imgFloripa} alt="Florianópolis" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        )}

        {/*  Card de formulário  */}
        <div style={{
          width: isMobile ? '100%' : 470, flexShrink: 0,
          background: 'white', border: '1px solid var(--bg-subtle)',
          display: 'flex', flexDirection: 'column', justifyContent: isMobile ? 'flex-start' : 'space-between',
          padding: isMobile ? '24px 24px 32px 24px' : '40px 40px 24px 40px', overflowY: 'auto',
        }}>

          {/* Logo FloripaOn + botão fechar (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? 8 : 0 }}>
            <span style={{ fontWeight: 700, fontSize: 28, color: 'var(--primary-pure)', letterSpacing: '-0.5px', lineHeight: 1 }}>
              FloripaOn
            </span>
            {isMobile && (
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-dark-medium)', padding: 8, display: 'flex', alignItems: 'center' }}>
                <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 20 }} />
              </button>
            )}
          </div>

          {view === 'login' ? (
            /*  LOGIN  */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, marginTop: 32 }}>
              <p style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-dark-pure)', margin: 0, letterSpacing: '0.12px' }}>
                Boas vindas ao FloripaOn
              </p>

              {/*  gov.br PRIMEIRO (opção principal)  */}
              <a
                href="https://sso.acesso.gov.br/login?client_id=floripa.sc.gov.br&authorization_id=19dadc40977"
                target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button style={{
                  width: '100%', height: 52, borderRadius: 10,
                  background: 'var(--govbr-color)', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontWeight: 700, fontSize: 15, color: 'white',
                  boxShadow: '0px 2px 8px rgba(19,81,180,0.30)',
                  transition: 'background 0.12s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-hover)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-color)'}
                >
                  <FAIcon icon="fa-regular fa-shield-check" style={{ fontSize: 18 }} />
                  Entrar com <strong style={{ fontSize: 20, letterSpacing: '0.09px' }}>gov.br</strong>
                </button>
              </a>
              <p style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', textAlign: 'center', margin: 0, lineHeight: '18px' }}>
                {t('loginGovBrRecomendado')}
              </p>

              {/* Divider gov.br / Certificado */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
                <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--neutral-dark-down)', whiteSpace: 'nowrap' }}>ou</span>
                <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
              </div>

              {/*  Certificado Digital  */}
              <button
                style={{
                  width: '100%', height: 48, borderRadius: 10,
                  background: 'white', border: '1.5px solid var(--cert-color)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontWeight: 700, fontSize: 14, color: 'var(--cert-color)',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--cert-bg-hover)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}
              >
                <FAIcon icon="fa-regular fa-certificate" style={{ fontSize: 18, color: 'var(--cert-color)' }} />
                {t('certDigital')}
              </button>
              <p style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', textAlign: 'center', margin: 0, lineHeight: '18px' }}>
                {t('certDigitalDesc')}
              </p>

              {/* Divider gov.br / Login sistema */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
                <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--neutral-dark-down)', whiteSpace: 'nowrap' }}>
                  ou {t('loginEntrarSistema')}
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
              </div>

              {/*  Login do sistema (opção secundária)  */}
              {!showLoginForm ? (
                <button
                  onClick={() => setShowLoginForm(true)}
                  style={{
                    width: '100%', height: 44, border: '1.5px solid var(--neutral-light-down)', borderRadius: 8,
                    background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontWeight: 600, fontSize: 14, color: 'var(--neutral-dark-down)',
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-pure)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--neutral-dark-down)'; }}
                >
                  <FAIcon icon="fa-regular fa-arrow-right-to-bracket" style={{ fontSize: 14 }} />
                  {t('loginEntrarSistema')}
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={label}>Email <span style={{ color: 'var(--error-required)' }}>*</span></span>
                    <div style={inputStyle}>
                      <input style={inputEl} type="email" placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                  </div>
                  {/* Senha */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={label}>Senha <span style={{ color: 'var(--error-required)' }}>*</span></span>
                    <div style={inputStyle}>
                      <input style={inputEl} type={showSenha ? 'text' : 'password'} placeholder="Senha FloripaOn" value={senha} onChange={e => setSenha(e.target.value)} />
                      <FAIcon icon={showSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 16, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowSenha(v => !v)} />
                    </div>
                    <span onClick={() => setView('recovery')} style={{ fontWeight: 600, fontSize: 12, color: 'var(--primary-pure)', textDecoration: 'underline', cursor: 'pointer' }}>
                      Esqueci a senha
                    </span>
                  </div>
                  <Button size="md" variant="primary" onClick={() => { onLogin(); onClose(); }} style={{ width: '100%' }}>Entrar</Button>
                </div>
              )}
            </div>

          ) : (
            /*  RECUPERAR SENHA  */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, marginTop: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-dark-pure)', margin: 0, letterSpacing: '0.12px' }}>
                  Redefinição de senha
                </p>
                <p style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-down)', margin: 0, lineHeight: '20px', letterSpacing: '0.07px' }}>
                  Informe seu e-mail no campo abaixo e enviaremos instruções para vocêê redefinir sua senha com segurança.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={label}>Email cadastrado <span style={{ color: 'var(--error-required)' }}>*</span></span>
                  <div style={inputStyle}>
                    <input style={inputEl} type="email" placeholder="Digite seu email" value={emailRecov} onChange={e => setEmailRecov(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Button size="md" variant="primary" style={{ width: '100%' }}>Redefinir senha</Button>
                  <Button size="md" variant="secondary" onClick={() => setView('login')} style={{ width: '100%' }}>
                    <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 14, marginRight: 6 }} />
                    Voltar
                  </Button>
                </div>
              </div>

              {/* Divider gov.br */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
                <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--neutral-dark-down)', whiteSpace: 'nowrap', letterSpacing: '0.06px' }}>
                  Ou continuar com
                </span>
                <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
              </div>

              <button style={{
                width: '100%', height: 40, border: '1px solid var(--primary-pure)', borderRadius: 8,
                background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                fontWeight: 600, fontSize: 14, color: 'var(--govbr-dark)',
              }}>
                Entrar com <strong style={{ fontWeight: 700, fontSize: 18, letterSpacing: '0.09px' }}>gov.br</strong>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


