import React from 'react';
import { useT } from '../i18n';
import FAIcon from './FAIcon';

export default function ContactModal({ onClose }: { onClose: () => void }) {
  const t = useT();
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.40)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: 'white', borderRadius: 16, padding: '32px 36px',
        width: 380, boxShadow: '0px 10px 40px rgba(0,0,0,0.20)',
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: 18, color: 'var(--neutral-ink-strong)', margin: 0 }}>{t('contato')}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-dark-medium)', padding: 4 }}>
            <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Dúvidas */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary-bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FAIcon icon="fa-regular fa-message-lines" style={{ fontSize: 20, color: 'var(--primary-pure)' }} />
          </div>
          <p style={{ fontSize: 14, color: 'var(--neutral-dark-pure)', margin: 0, lineHeight: '22px' }}>
            {t('duvidasContato')}{' '}
            <span style={{ color: 'var(--primary-pure)', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
              {t('centralAjuda')}.
            </span>
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--neutral-light-medium)' }} />

        {/* Horário */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary-bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FAIcon icon="fa-regular fa-clock" style={{ fontSize: 20, color: 'var(--primary-pure)' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--neutral-ink-strong)', marginBottom: 2 }}>{t('horarioAtendimento')}</div>
            <div style={{ fontSize: 13, color: 'var(--neutral-dark-down)' }}>{t('horarioAtendimentoDesc')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
