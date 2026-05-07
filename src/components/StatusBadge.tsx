import React from 'react';
import { useT } from '../i18n';
import type { ProcessoStatus } from '../types';
import { STATUS_STYLE } from '../constants';

export default function StatusBadge({ status }: { status: ProcessoStatus }) {
  const s = STATUS_STYLE[status];
  const t = useT();
  const label = status === 'Concluído' ? t('statusConcluido')
              : status === 'Em Andamento' ? t('statusAndamento')
              : t('statusPendente');
  return (
    <span style={{
      display: 'inline-block',
      background: s.bg,
      color: s.color,
      borderRadius: 100,
      padding: '2px 12px',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '20px',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}
