import React from 'react';
import { useT } from '../i18n';
import type { ConsultaRecente } from '../types';
import FAIcon from './FAIcon';
import StatusBadge from './StatusBadge';

export default function ConsultaRow({ numero, data, descricao, status, onClick }: ConsultaRecente & { onClick?: () => void }) {
  const t = useT();
  return (
    <div
      onClick={onClick}
      style={{
        background: 'white', border: '1px solid var(--card-border)', borderRadius: 10,
        padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16,
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0px 2px 8px rgba(24,39,75,0.07)',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => { if (onClick) { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 4px 16px rgba(24,39,75,0.13)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border-hover)'; } }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 2px 8px rgba(24,39,75,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; }}
    >
      {/* Ícone */}
      <div style={{ width: 48, height: 48, background: 'var(--icon-bg)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <FAIcon icon="fa-regular fa-folder-open" style={{ fontSize: 22, color: 'var(--primary-pure)' }} />
      </div>

      {/* Informações principais */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink)', marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {descricao}
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--neutral-dark-medium)' }}>
            <strong style={{ color: 'var(--neutral-dark-down)' }}>{t('crProcesso')}</strong> {numero}
          </span>
          <span style={{ fontSize: 12, color: 'var(--neutral-dark-medium)' }}>
            <strong style={{ color: 'var(--neutral-dark-down)' }}>{t('crData')}</strong> {data}
          </span>
        </div>
      </div>

      {/* Status + seta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <StatusBadge status={status} />
        {onClick && <FAIcon icon="fa-regular fa-angle-right" style={{ fontSize: 16, color: 'var(--neutral-dark-up)' }} />}
      </div>
    </div>
  );
}

