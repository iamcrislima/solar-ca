import React, { useState } from 'react';
import { useT } from '../i18n';
import type { Lang } from '../i18n';
import { Page } from '../types';
import { MOCK_USER } from '../mocks';
import FAIcon from './FAIcon';
import ContactModal from './ContactModal';

export function MobileHeader({ onOpenDrawer, onLogin, isLoggedIn, onNavigate }: {
  onOpenDrawer: () => void; onLogin: () => void; isLoggedIn: boolean; onNavigate: (p: Page) => void;
}) {
  const t = useT();
  return (
    <div style={{ background: 'white', borderBottom: '1px solid var(--primary-light)', height: 56, display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0, position: 'relative', zIndex: 10 }}>
      <button onClick={onOpenDrawer} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px 8px 8px 0', color: 'var(--primary-pure)', display: 'flex', alignItems: 'center' }}>
        <FAIcon icon="fa-regular fa-bars" style={{ fontSize: 22, color: 'var(--primary-pure)' }} />
      </button>
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
        <span style={{ fontWeight: 700, fontSize: 22, color: 'var(--primary-pure)', letterSpacing: '-0.5px' }}>FloripaOn</span>
      </div>
      <div style={{ flex: 1 }} />
      {isLoggedIn ? (
        <div onClick={() => onNavigate('meusdados')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', border: '2px solid var(--primary-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--primary-pure)' }}>CL</span>
        </div>
      ) : (
        <button onClick={onLogin} style={{ background: 'var(--primary-pure)', border: 'none', borderRadius: 6, color: 'white', fontWeight: 600, fontSize: 13, padding: '7px 14px', cursor: 'pointer' }}>
          {t('entrar')}
        </button>
      )}
    </div>
  );
}

export function MobileDrawer({ open, onClose, activePage, onNavigate, isLoggedIn, onLogin, onLogout, darkMode, onToggleDark, highContrast, onToggleContrast, lang, onSetLang }: {
  open: boolean; onClose: () => void; activePage: Page; onNavigate: (p: Page) => void;
  isLoggedIn: boolean; onLogin: () => void; onLogout: () => void;
  darkMode: boolean; onToggleDark: () => void; highContrast: boolean; onToggleContrast: () => void;
  lang: Lang; onSetLang: (l: Lang) => void;
}) {
  const t = useT();
  const [showContact, setShowContact] = useState(false);

  const navigate = (p: Page) => { onNavigate(p); onClose(); };
  const effectivePage: Page =
    activePage === 'processo' ? 'consulta' :
    (activePage === 'cat-servicos' || activePage === 'servico-detalhe' || activePage === 'servico-form') ? 'solicitacao' :
    activePage;

  const navItem = (icon: string, label: string, page: Page | null, color?: string, customOnClick?: () => void) => {
    const isActive = page === effectivePage;
    return (
      <div
        onClick={customOnClick || (page ? () => navigate(page) : undefined)}
        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px', background: isActive ? 'var(--primary-bg-hover)' : 'transparent', color: color || (isActive ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)'), cursor: 'pointer', fontSize: 15, fontWeight: isActive ? 600 : 400, borderLeft: isActive ? '3px solid var(--primary-pure)' : '3px solid transparent', transition: 'background 0.12s' }}
        onMouseEnter={e => { if (!isActive && !color) (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-subtle)'; }}
        onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLDivElement).style.background = isActive ? 'var(--primary-bg-hover)' : 'transparent'; }}
      >
        <FAIcon icon={icon} style={{ fontSize: 18, color: 'inherit', flexShrink: 0 }} />
        {label}
      </div>
    );
  };

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 900 }} />}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: 288, background: 'white', zIndex: 901, transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.26s cubic-bezier(0.25,0.8,0.25,1)', display: 'flex', flexDirection: 'column', boxShadow: open ? '4px 0 32px rgba(0,0,0,0.18)' : 'none' }}>

        {/* Drawer header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--primary-light)', flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 22, color: 'var(--primary-pure)', letterSpacing: '-0.3px' }}>FloripaOn</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-dark-medium)', padding: 6, display: 'flex', alignItems: 'center' }}>
            <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 18 }} />
          </button>
        </div>

        {/* User info if logged in */}
        {isLoggedIn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', background: 'var(--primary-bg-subtle)', borderBottom: '1px solid var(--primary-light)', flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-light)', border: '2px solid var(--primary-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary-pure)' }}>{MOCK_USER.initials}</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--neutral-ink-strong)' }}>{MOCK_USER.nome}</div>
              <div style={{ fontSize: 11, color: 'var(--neutral-dark-medium)' }}>{MOCK_USER.cpf}</div>
            </div>
          </div>
        )}

        {/* Nav items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {navItem('fa-regular fa-house', t('inicio'), 'home')}
          {navItem('fa-regular fa-magnifying-glass', t('consultaProcessos'), 'consulta')}
          {navItem('fa-regular fa-list-check', t('conferenciaDocumentos'), 'documentos')}
          {navItem('fa-regular fa-file-circle-plus', t('solicitacaoServicos'), 'solicitacao')}

          {isLoggedIn && <>
            <div style={{ height: 1, background: 'var(--neutral-light-medium)', margin: '6px 0' }} />
            {navItem('fa-regular fa-folder-user', t('meusProcessos'), 'meusprocessos')}
            {navItem('fa-regular fa-bell', t('minhasPendencias'), 'minhaspendencias')}
            {navItem('fa-regular fa-circle-check', t('processosLiberados'), 'processosliberados')}
          </>}

          <div style={{ height: 1, background: 'var(--neutral-light-medium)', margin: '6px 0' }} />

          {isLoggedIn ? (
            <>
              {navItem('fa-regular fa-user', t('meusDados'), 'meusdados')}
              {navItem('fa-regular fa-arrow-right-from-bracket', t('sair'), null, 'var(--error-color)', () => { onLogout(); onClose(); })}
            </>
          ) : (
            navItem('fa-regular fa-arrow-right-to-bracket', t('entrar'), null, 'var(--primary-pure)', () => { onLogin(); onClose(); })
          )}

          <div style={{ height: 1, background: 'var(--neutral-light-medium)', margin: '6px 0' }} />
          {navItem('fa-regular fa-phone', t('contato'), null, undefined, () => setShowContact(true))}
        </div>

        {/* Accessibility controls */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--primary-light)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <button title={t('altoContraste')} onClick={onToggleContrast} style={{ flex: 1, height: 40, border: `1.5px solid ${highContrast ? 'var(--primary-pure)' : 'var(--primary-light)'}`, borderRadius: 8, background: highContrast ? 'var(--primary-bg-hover)' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: highContrast ? 'var(--primary-pure)' : 'var(--neutral-dark-down)', gap: 5 }}>
            <FAIcon icon="fa-regular fa-circle-half-stroke" style={{ fontSize: 15, color: 'inherit' }} />
          </button>
          <button title={t('modoEscuro')} onClick={onToggleDark} style={{ flex: 1, height: 40, border: `1.5px solid ${darkMode ? 'var(--primary-pure)' : 'var(--primary-light)'}`, borderRadius: 8, background: darkMode ? 'var(--primary-bg-hover)' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: darkMode ? 'var(--primary-pure)' : 'var(--neutral-dark-down)', gap: 5 }}>
            <FAIcon icon={darkMode ? 'fa-regular fa-moon' : 'fa-regular fa-sun-bright'} style={{ fontSize: 15, color: 'inherit' }} />
          </button>
          <button title={t('idioma')} onClick={() => onSetLang(lang === 'pt' ? 'en' : lang === 'en' ? 'es' : 'pt')} style={{ flex: 1, height: 40, border: '1.5px solid var(--primary-light)', borderRadius: 8, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>
            {lang === 'pt' ? '🇧🇷' : lang === 'en' ? '🇺🇸' : '🇪🇸'}
          </button>
        </div>

        {/* Solar BPM branding */}
        <div style={{ padding: '10px 20px', background: 'white', borderTop: '1px solid var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <img src="/Logo completa.png" alt="SolarBPM" style={{ height: 26, objectFit: 'contain' }} />
        </div>
      </div>

      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </>
  );
}

export function MobileBottomNav({ activePage, onNavigate, isLoggedIn, onLogin }: {
  activePage: Page; onNavigate: (p: Page) => void; isLoggedIn: boolean; onLogin: () => void;
}) {
  const t = useT();
  const effectivePage: Page =
    activePage === 'processo' ? 'consulta' :
    (activePage === 'cat-servicos' || activePage === 'servico-detalhe' || activePage === 'servico-form') ? 'solicitacao' :
    (activePage === 'pendencia-resolver') ? 'minhaspendencias' :
    activePage;

  const tabs = [
    { icon: 'fa-regular fa-house',            label: t('inicio'),              page: 'home' as Page,             requiresLogin: false },
    { icon: 'fa-regular fa-magnifying-glass', label: t('consultar'),           page: 'consulta' as Page,         requiresLogin: false },
    { icon: 'fa-regular fa-file-circle-plus', label: t('solicitacaoServicos'), page: 'solicitacao' as Page,      requiresLogin: false },
    { icon: 'fa-regular fa-bell',             label: t('minhasPendencias'),    page: 'minhaspendencias' as Page, requiresLogin: true  },
    { icon: 'fa-regular fa-user',             label: t('meusDados'),           page: 'meusdados' as Page,        requiresLogin: true  },
  ];

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 800, background: 'white', borderTop: '1px solid var(--primary-light)', display: 'flex', paddingBottom: 'env(safe-area-inset-bottom)', boxShadow: '0px -2px 12px rgba(0,0,0,0.09)', flexShrink: 0 }}>
      {tabs.map((tab) => {
        const isActive = tab.page === effectivePage;
        const isLocked = tab.requiresLogin && !isLoggedIn;
        return (
          <button
            key={tab.page}
            onClick={() => { if (isLocked) { onLogin(); return; } onNavigate(tab.page); }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, padding: '8px 2px 6px', background: 'none', border: 'none', cursor: 'pointer', color: isActive ? 'var(--primary-pure)' : 'var(--neutral-dark-medium)', position: 'relative', minWidth: 0 }}
          >
            {isActive && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 32, height: 3, background: 'var(--primary-pure)', borderRadius: '0 0 4px 4px' }} />}
            <FAIcon icon={tab.icon} style={{ fontSize: 20, color: isActive ? 'var(--primary-pure)' : isLocked ? 'var(--neutral-dark-up)' : 'var(--neutral-dark-medium)' }} />
            <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400, color: isActive ? 'var(--primary-pure)' : isLocked ? 'var(--neutral-dark-up)' : 'var(--neutral-dark-medium)', lineHeight: 1, whiteSpace: 'nowrap' }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

