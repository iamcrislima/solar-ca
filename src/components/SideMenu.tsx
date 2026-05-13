import React, { useState } from 'react';
import { useT } from '../i18n';
import type { Page } from '../types';
import { SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED } from '../mocks';
import FAIcon from './FAIcon';
import ContactModal from './ContactModal';

export default function SideMenu({ activePage, onNavigate, expanded, onLogin, isLoggedIn, onLogout }: {
  activePage: Page;
  onNavigate: (page: Page) => void;
  expanded: boolean;
  onLogin: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}) {
  const t = useT();
  const [showContact, setShowContact] = useState(false);
  const baseItems: { icon: string; label: string; page: Page | null }[] = [
    { icon: 'fa-regular fa-house',            label: t('inicio'),                    page: 'home' },
    { icon: 'fa-regular fa-magnifying-glass', label: t('consultaProcessos'),         page: 'consulta' },
    { icon: 'fa-regular fa-list-check',       label: t('conferenciaDocumentos'),     page: 'documentos' as Page },
    { icon: 'fa-regular fa-file-circle-plus', label: t('solicitacaoServicos'),       page: 'solicitacao' as Page },
  ];

  const loggedInItems: { icon: string; label: string; page: Page | null }[] = [
    { icon: 'fa-regular fa-folder-user',  label: t('meusProcessos'),     page: 'meusprocessos' as Page },
    { icon: 'fa-regular fa-clock',        label: t('minhasPendencias'),   page: 'minhaspendencias' as Page },
    { icon: 'fa-regular fa-circle-check', label: t('processosLiberados'), page: 'processosliberados' as Page },
  ];

  const items = isLoggedIn ? [...baseItems, ...loggedInItems] : baseItems;

  const effectivePage: Page =
    activePage === 'processo' ? 'consulta' :
    (activePage === 'cat-servicos' || activePage === 'servico-detalhe' || activePage === 'servico-form') ? 'solicitacao' :
    activePage;

  const menuItemStyle = (isActive: boolean, hasPage: boolean): React.CSSProperties => ({
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: expanded ? 'flex-start' : 'center',
    gap: 10,
    padding: expanded ? '0 12px' : 0,
    cursor: hasPage ? 'pointer' : 'default',
    color: isActive ? 'var(--primary-pure)' : 'var(--neutral-dark-down)',
    background: isActive ? 'var(--primary-bg-hover)' : 'transparent',
    borderRadius: 6,
    margin: '1px 4px',
    transition: 'background 0.12s, color 0.12s',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  });

  return (
    <div style={{
      width: expanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
      minWidth: expanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
      background: 'white',
      borderRight: '1px solid var(--primary-light)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'width 0.2s ease, min-width 0.2s ease',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingTop: 8,
    }}>
      {/*  Itens principais  */}
      {items.map((item) => {
        const isActive = item.page === effectivePage;
        return (
          <div key={item.page ?? item.label} title={expanded ? undefined : item.label}
            onClick={() => item.page && onNavigate(item.page)}
            style={menuItemStyle(isActive, !!item.page)}
            onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--primary-pure)'; } }}
            onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = 'var(--neutral-dark-down)'; } }}
          >
            <FAIcon icon={item.icon} style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
            {expanded && (
              <span style={{ fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}

      {/*  Espaço flex para empurrar para o fundo  */}
      <div style={{ flex: 1 }} />

      {/*  Divider  */}
      <div style={{ height: 1, background: 'var(--primary-light)', margin: '4px 8px', flexShrink: 0 }} />

      {isLoggedIn ? (
        <>
          {/*  Meus Dados  */}
          <div title={expanded ? undefined : t('meusDados')}
            onClick={() => onNavigate('meusdados')}
            style={menuItemStyle(effectivePage === 'meusdados', true)}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--primary-pure)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = 'var(--neutral-dark-down)'; }}
          >
            <FAIcon icon="fa-regular fa-user" style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
            {expanded && <span style={{ fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{t('meusDados')}</span>}
          </div>

          {/*  Sair  */}
          <div title={expanded ? undefined : t('sair')}
            onClick={onLogout}
            style={{ ...menuItemStyle(false, true), color: 'var(--error-color)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--error-bg)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--error-color)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = 'var(--error-color)'; }}
          >
            <FAIcon icon="fa-regular fa-arrow-right-from-bracket" style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
            {expanded && <span style={{ fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{t('sair')}</span>}
          </div>
        </>
      ) : (
        /*  Entrar  */
        <div title={expanded ? undefined : t('entrar')}
          onClick={onLogin}
          style={menuItemStyle(false, true)}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--primary-pure)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = 'var(--neutral-dark-down)'; }}
        >
          <FAIcon icon="fa-regular fa-arrow-right-to-bracket" style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
          {expanded && <span style={{ fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{t('entrar')}</span>}
        </div>
      )}

      {/*  Divider  */}
      <div style={{ height: 1, background: 'var(--primary-light)', margin: '4px 8px', flexShrink: 0 }} />

      {/*  Contato (Ajuda)  */}
      <div title={expanded ? undefined : t('contato')}
        onClick={() => setShowContact(true)}
        style={{ ...menuItemStyle(false, true) }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--primary-pure)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = 'var(--neutral-dark-down)'; }}
      >
        <FAIcon icon="fa-regular fa-phone" style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
        {expanded && <span style={{ fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{t('contato')}</span>}
      </div>

      {/*  Logo Solar BPM  */}
      <div style={{
        flexShrink: 0, overflow: 'hidden',
        borderTop: '1px solid var(--primary-light)',
        padding: expanded ? '10px 12px' : '10px 6px',
        display: 'flex', alignItems: 'center', justifyContent: expanded ? 'flex-start' : 'center',
        background: 'white',
        transition: 'padding 0.2s ease',
      }}>
        {expanded ? (
          <img src="/Logo completa.png" alt="SolarBPM"
            style={{ height: 28, objectFit: 'contain', maxWidth: '100%' }} />
        ) : (
          <img src="/Logo compacta.png" alt="SolarBPM"
            style={{ height: 28, objectFit: 'contain' }} />
        )}
      </div>

      {/* Modal de contato */}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </div>
  );
}

