import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '@1doc/1ds-react';
import { useT, useLang } from '../i18n';
import type { Lang } from '../i18n';
import type { Page } from '../types';
import { ALL_SERVICES, MOCK_USER, SIDEBAR_COLLAPSED } from '../mocks';
import FAIcon from './FAIcon';

function HeaderSearch() {
  const t = useT();
  const lang = useLang();
  const [query,       setQuery]       = useState('');
  const [open,        setOpen]        = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => query.trim().length === 0
    ? [] : ALL_SERVICES[lang].filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 6),
  [query, lang]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) { setOpen(false); setHighlighted(-1); }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter' && highlighted >= 0) { setQuery(results[highlighted]); setOpen(false); }
    else if (e.key === 'Escape') setOpen(false);
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: 260 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, border: '1px solid var(--primary-light)', borderRadius: 8, padding: '0 10px', background: 'var(--background-color-light)' }}>
        <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 14, color: 'var(--neutral-dark-medium)', flexShrink: 0 }} />
        <input
          value={query} placeholder={t('buscar')}
          onChange={e => { setQuery(e.target.value); setOpen(true); setHighlighted(-1); }}
          onFocus={() => query.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: 'var(--neutral-dark-pure)' }}
        />
        {query && <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 13, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0 }} />}
      </div>
      {open && results.length > 0 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 300, overflow: 'hidden' }}>
          {results.map((s, i) => (
            <div key={s} onMouseDown={() => { setQuery(s); setOpen(false); }} onMouseEnter={() => setHighlighted(i)}
              style={{ padding: '9px 14px', cursor: 'pointer', background: highlighted === i ? 'var(--primary-bg-subtle)' : 'white', fontSize: 13, color: 'var(--neutral-dark-pure)', borderBottom: i < results.length - 1 ? '1px solid var(--neutral-light-medium)' : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 12, color: 'var(--neutral-dark-up)' }} />
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header({ onToggle, onLogin, isLoggedIn, onLogout, onNavigate, darkMode, onToggleDark, highContrast, onToggleContrast, lang, onSetLang }: {
  onToggle: () => void; onLogin: () => void; isLoggedIn: boolean; onLogout: () => void;
  onNavigate: (p: Page) => void;
  darkMode: boolean; onToggleDark: () => void;
  highContrast: boolean; onToggleContrast: () => void;
  lang: Lang; onSetLang: (l: Lang) => void;
}) {
  const t = useT();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [langOpen,   setLangOpen]   = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const langRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const iconBtn = (active: boolean): React.CSSProperties => ({
    width: 36, height: 36, border: `1px solid ${active ? 'var(--primary-pure)' : 'var(--primary-light)'}`,
    borderRadius: 6, background: active ? 'var(--primary-bg-hover)' : 'white', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: active ? 'var(--primary-pure)' : 'var(--neutral-dark-down)', transition: 'all 0.12s', flexShrink: 0,
  });

  return (
    <div style={{ background: 'white', borderBottom: '1px solid var(--primary-light)', height: 56, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      {/* Toggle sidebar */}
      <div title="Expandir/retrair menu" onClick={onToggle}
        style={{ width: SIDEBAR_COLLAPSED, minWidth: SIDEBAR_COLLAPSED, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
        <FAIcon icon="fa-regular fa-sidebar" style={{ fontSize: 20, color: 'var(--primary-pure)' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px' }}>
        {/* Logo + subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <span style={{ fontWeight: 700, fontSize: 28, color: 'var(--primary-pure)', letterSpacing: '-0.5px' }}>FloripaOn</span>
          <div style={{ width: 1, height: 28, background: 'var(--primary-light)' }} />
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink-strong)', whiteSpace: 'nowrap', letterSpacing: '-0.2px' }}>{t('municipio')}</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Busca */}
        <HeaderSearch />

        {/*  Botões de acessibilidade / tema  */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

          {/* Alto contraste */}
          <button title={t('altoContraste')} onClick={onToggleContrast} style={iconBtn(highContrast)}>
            <FAIcon icon="fa-regular fa-circle-half-stroke" style={{ fontSize: 16, color: 'inherit' }} />
          </button>

          {/* Idioma */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button title={t('idioma')} onClick={() => setLangOpen(o => !o)} style={iconBtn(langOpen)}>
              <FAIcon icon="fa-regular fa-globe" style={{ fontSize: 16, color: 'inherit' }} />
            </button>
            {langOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: 'white', border: '1px solid var(--primary-light)', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 300, minWidth: 140, overflow: 'hidden' }}>
                {(['pt', 'en', 'es'] as Lang[]).map(l => (
                  <div key={l} onClick={() => { onSetLang(l); setLangOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', background: lang === l ? 'var(--primary-bg-hover)' : 'white', fontSize: 14, fontWeight: lang === l ? 700 : 400, color: lang === l ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)', borderBottom: l !== 'es' ? '1px solid var(--neutral-light-medium)' : 'none', transition: 'background 0.1s' }}
                    onMouseEnter={e => { if (lang !== l) (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; }}
                    onMouseLeave={e => { if (lang !== l) (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
                  >
                    <span style={{ fontSize: 18 }}>{l === 'pt' ? '🇧🇷' : l === 'en' ? '🇺🇸' : '🇪🇸'}</span>
                    {l === 'pt' ? 'Português' : l === 'en' ? 'English' : 'Español'}
                    {lang === l && <FAIcon icon="fa-solid fa-check" style={{ fontSize: 12, marginLeft: 'auto' }} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modo escuro */}
          <button title={t('modoEscuro')} onClick={onToggleDark} style={iconBtn(darkMode)}>
            <FAIcon icon={darkMode ? 'fa-regular fa-moon' : 'fa-regular fa-sun-bright'} style={{ fontSize: 16, color: 'inherit' }} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: 'var(--primary-light)' }} />

        {/*  Login / Avatar  */}
        {isLoggedIn ? (
          <div ref={avatarRef} style={{ position: 'relative' }}>
            <div onClick={() => setAvatarOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 8, transition: 'background 0.12s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-light)', border: '2px solid var(--primary-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary-pure)' }}>{MOCK_USER.initials}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--neutral-ink)', whiteSpace: 'nowrap' }}>{MOCK_USER.nome}</span>
                <span style={{ fontWeight: 400, fontSize: 11, color: 'var(--neutral-dark-medium)', whiteSpace: 'nowrap' }}>{MOCK_USER.cpf}</span>
              </div>
              <FAIcon icon="fa-regular fa-chevron-down" style={{ fontSize: 12, color: 'var(--neutral-dark-medium)' }} />
            </div>
            {avatarOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: 'white', border: '1px solid var(--primary-light)', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 300, minWidth: 160, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--neutral-light-medium)', fontSize: 13 }}>
                  <div style={{ fontWeight: 700, color: 'var(--neutral-ink)' }}>{MOCK_USER.nome}</div>
                  <div style={{ fontWeight: 400, color: 'var(--neutral-dark-medium)', fontSize: 11 }}>{MOCK_USER.cpf}</div>
                </div>
                <div onClick={() => { setAvatarOpen(false); onNavigate('meusdados'); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', transition: 'background 0.1s', borderBottom: '1px solid var(--neutral-light-medium)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  <FAIcon icon="fa-regular fa-user" style={{ fontSize: 14, color: 'var(--primary-pure)' }} />
                  {t('meusDados')}
                </div>
                <div onClick={() => { setAvatarOpen(false); onLogout(); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 400, fontSize: 14, color: 'var(--error-color)', transition: 'background 0.1s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--error-bg)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  <FAIcon icon="fa-regular fa-arrow-right-from-bracket" style={{ fontSize: 14 }} />
                  {t('sair')}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button size="sm" variant="primary" onClick={onLogin}>{t('entrar')}</Button>
        )}
      </div>
    </div>
  );
}

