import React from 'react';
import { useT, useIsMobile } from '../i18n';
import type { Page } from '../types';
import FAIcon from './FAIcon';

// ── Footer ──────────────────────────────────────────────────────────────────
export default function Footer({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const t = useT();
  const isMobile = useIsMobile();

  const quickLinks: { label: string; page: Page; icon: string }[] = [
    { label: t('solicitacaoServicos'),     page: 'solicitacao',        icon: 'fa-regular fa-file-circle-plus' },
    { label: t('meusProcessos'),           page: 'meusprocessos',      icon: 'fa-regular fa-folder-open' },
    { label: t('minhasPendencias'),        page: 'minhaspendencias',   icon: 'fa-regular fa-bell' },
    { label: t('processosLiberados'),      page: 'processosliberados', icon: 'fa-regular fa-unlock' },
    { label: t('consultaProcessos'),       page: 'consulta',           icon: 'fa-regular fa-magnifying-glass' },
    { label: t('conferenciaDocumentos'),   page: 'documentos',         icon: 'fa-regular fa-file-search' },
  ];

  const contactItems = [
    { icon: 'fa-regular fa-phone',           text: '(48) 3952-1000'          },
    { icon: 'fa-regular fa-envelope',        text: 'atendimento@pmf.sc.gov.br' },
    { icon: 'fa-regular fa-location-dot',    text: 'Av. Mauro Ramos, 1624 — Centro, Florianópolis/SC' },
    { icon: 'fa-regular fa-clock',           text: 'Seg – Sex  08h às 18h'  },
  ];

  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, #002d7a 0%, #003ea0 55%, #0046b5 100%)',
        color: 'white',
        flexShrink: 0,
        marginTop: 0,
      }}
    >
      {/* ── Faixa superior ── */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: isMobile ? '32px 20px 24px' : '48px 40px 32px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr',
          gap: isMobile ? 36 : 48,
        }}
      >

        {/* Coluna 1 — Identidade */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Logo / nome */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Brasão simulado com ícone institucional */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 10,
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FAIcon icon="fa-duotone fa-landmark" style={{ fontSize: 26, color: 'rgba(255,255,255,0.92)' }} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.3px', lineHeight: 1.1 }}>FloripaOn</div>
              <div style={{ fontWeight: 400, fontSize: 12, color: 'rgba(255,255,255,0.70)', marginTop: 3, lineHeight: 1.4 }}>
                Prefeitura Municipal de Florianópolis
              </div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 320 }}>
            Portal oficial de serviços digitais da Prefeitura de Florianópolis.
            Solicite, acompanhe e gerencie seus processos com agilidade e segurança.
          </p>

          {/* Selos / badges */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
            {[
              { icon: 'fa-regular fa-shield-check', label: 'Acesso seguro' },
              { icon: 'fa-regular fa-universal-access', label: 'Acessível' },
            ].map(b => (
              <div
                key={b.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '5px 10px',
                  borderRadius: 20,
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  fontSize: 11, fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                <FAIcon icon={b.icon} style={{ fontSize: 12 }} />
                {b.label}
              </div>
            ))}
          </div>
        </div>

        {/* Coluna 2 — Links rápidos */}
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'rgba(255,255,255,0.55)', marginBottom: 18 }}>
            Links Rápidos
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quickLinks.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 0, textAlign: 'left',
                  fontSize: 13, fontWeight: 500,
                  color: 'rgba(255,255,255,0.80)',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.80)')}
              >
                <FAIcon icon={link.icon} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', flexShrink: 0 }} />
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Coluna 3 — Central de Atendimento */}
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'rgba(255,255,255,0.55)', marginBottom: 18 }}>
            Central de Atendimento
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {contactItems.map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div
                  style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <FAIcon icon={item.icon} style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }} />
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.80)', lineHeight: 1.5, marginTop: 6 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Faixa inferior (copyright) ── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.12)',
          padding: isMobile ? '14px 20px' : '16px 40px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: 8,
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
          © {new Date().getFullYear()} Prefeitura Municipal de Florianópolis. Todos os direitos reservados.
        </span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          Powered by Solar BPM · v1.0
        </span>
      </div>
    </footer>
  );
}
