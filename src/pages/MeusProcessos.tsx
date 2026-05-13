import React, { useState, useMemo } from 'react';
import { useT, useIsMobile } from '../i18n';
import type { MeuProcesso, ProcessoStatus } from '../types';
import { MOCK_MEUS_PROCESSOS } from '../mocks';
import FAIcon from '../components/FAIcon';
import StatusBadge from '../components/StatusBadge';
import StatCard from '../components/StatCard';

function ProcessoCard({ processo, onClick }: { processo: MeuProcesso; onClick: () => void }) {
  const t = useT();
  return (
    <div
      onClick={onClick}
      style={{
        background: 'white', border: '1px solid var(--card-border)', borderRadius: 10,
        padding: 20, display: 'flex', flexDirection: 'column', gap: 14,
        cursor: 'pointer',
        boxShadow: '0px 2px 8px rgba(24,39,75,0.07)',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 4px 16px rgba(24,39,75,0.13)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border-hover)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 2px 8px rgba(24,39,75,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--primary-pure)', letterSpacing: 0.2 }}>
          {processo.numero}
        </span>
        <StatusBadge status={processo.status} />
      </div>

      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', lineHeight: 1.35 }}>
        {processo.titulo}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--neutral-label)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 2 }}>
            {t('mpOrgao')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {processo.orgao}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--neutral-label)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 2 }}>
            {t('mpAtualizado')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', fontWeight: 600 }}>
            {processo.atualizadoEm}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, paddingTop: 10, borderTop: '1px solid var(--neutral-light-medium)', fontWeight: 600, fontSize: 12, color: 'var(--primary-pure)' }}>
        {t('mpVer')}
        <FAIcon icon="fa-regular fa-arrow-right" style={{ fontSize: 11 }} />
      </div>
    </div>
  );
}

export default function MeusProcessos({ onNavigateProcesso, initialFilter }: { onNavigateProcesso: () => void; initialFilter?: 'todos' | ProcessoStatus }) {
  const t = useT();
  const isMobile = useIsMobile();
  const [query, setQuery]   = useState('');
  const [filtro, setFiltro] = useState<'todos' | ProcessoStatus>(initialFilter ?? 'todos');

  const { total, andamento, concluidos, pendentes } = useMemo(() => ({
    total:      MOCK_MEUS_PROCESSOS.length,
    andamento:  MOCK_MEUS_PROCESSOS.filter(p => p.status === 'Em Andamento').length,
    concluidos: MOCK_MEUS_PROCESSOS.filter(p => p.status === 'Concluído').length,
    pendentes:  MOCK_MEUS_PROCESSOS.filter(p => p.status === 'Pendente').length,
  }), []);

  const filtrados = MOCK_MEUS_PROCESSOS.filter(p => {
    if (filtro !== 'todos' && p.status !== filtro) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        p.numero.toLowerCase().includes(q) ||
        p.titulo.toLowerCase().includes(q) ||
        p.orgao.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const tabs: { id: 'todos' | ProcessoStatus; label: string; count: number }[] = [
    { id: 'todos',        label: t('mpTodos'),      count: total },
    { id: 'Em Andamento', label: t('mpAndamento'),  count: andamento },
    { id: 'Concluído',    label: t('mpConcluidos'), count: concluidos },
    { id: 'Pendente',     label: t('mpPendentes'),  count: pendentes },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: isMobile ? '16px 16px 48px 16px' : '24px 24px 48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ fontWeight: 700, fontSize: isMobile ? 20 : 24, color: 'var(--neutral-ink-strong)', margin: 0 }}>
            {t('meusProcessosTitle')}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--neutral-dark-down)', margin: '6px 0 0 0', lineHeight: 1.5 }}>
            {t('meusProcessosDesc')}
          </p>
        </div>
        {!isMobile && <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button style={{
            height: 40, padding: '0 16px', borderRadius: 8, background: 'white',
            border: '1.5px solid var(--primary-pure)', color: 'var(--primary-pure)',
            fontWeight: 600, fontSize: 13,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-bg-hover)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}>
            <FAIcon icon="fa-regular fa-file-pdf" style={{ fontSize: 14 }} />
            {t('mpExportarPdf')}
          </button>
          <button style={{
            height: 40, padding: '0 16px', borderRadius: 8, background: 'var(--primary-pure)',
            border: '1.5px solid var(--primary-pure)', color: 'white',
            fontWeight: 600, fontSize: 13,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure-hover)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure)'}>
            <FAIcon icon="fa-regular fa-file-spreadsheet" style={{ fontSize: 14 }} />
            {t('mpExportarXls')}
          </button>
        </div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 10 : 14 }}>
        <StatCard
          icon="fa-regular fa-folder-user" label={t('mpTotal')} value={total}
          color="var(--primary-pure)" bg="var(--primary-bg-hover)"
          active={filtro === 'todos'}
          onClick={() => setFiltro('todos')}
        />
        <StatCard
          icon="fa-regular fa-clock-rotate-left" label={t('mpAndamento')} value={andamento}
          color="var(--neutral-dark-down)" bg="var(--neutral-light-medium)"
          active={filtro === 'Em Andamento'}
          onClick={() => setFiltro('Em Andamento')}
        />
        <StatCard
          icon="fa-regular fa-circle-check" label={t('mpConcluidos')} value={concluidos}
          color="var(--success-color)" bg="var(--success-bg)"
          active={filtro === 'Concluído'}
          onClick={() => setFiltro('Concluído')}
        />
        <StatCard
          icon="fa-regular fa-triangle-exclamation" label={t('mpPendentes')} value={pendentes}
          color="var(--error-color)" bg="var(--error-bg)"
          active={filtro === 'Pendente'}
          onClick={() => setFiltro('Pendente')}
        />
      </div>

      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 16, boxShadow: '0px 2px 8px rgba(24,39,75,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--primary-light)', borderRadius: 8, height: 44, overflow: 'hidden', background: 'white' }}>
          <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 15, color: 'var(--neutral-dark-medium)', marginLeft: 14 }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('mpBuscar')}
            style={{ flex: 1, border: 'none', outline: 'none', padding: '0 14px', fontSize: 14, color: 'var(--neutral-dark-pure)', background: 'transparent', height: '100%' }}
          />
          {query && (
            <FAIcon
              icon="fa-regular fa-xmark"
              onClick={() => setQuery('')}
              style={{ fontSize: 14, color: 'var(--neutral-dark-medium)', cursor: 'pointer', marginRight: 14 }}
            />
          )}
        </div>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: '4px 8px', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {tabs.map(tab => {
          const active = filtro === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFiltro(tab.id)}
              style={{
                background: 'none', border: 'none',
                borderBottom: active ? '3px solid var(--primary-pure)' : '3px solid transparent',
                padding: '10px 16px',
                fontSize: 13, fontWeight: active ? 700 : 500,
                color: active ? 'var(--primary-pure)' : 'var(--neutral-dark-down)',
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              {tab.label}
              <span style={{
                background: active ? 'var(--primary-pure)' : 'var(--neutral-light-medium)',
                color: active ? 'white' : 'var(--neutral-dark-down)',
                fontSize: 11, fontWeight: 700,
                padding: '2px 8px', borderRadius: 100, lineHeight: 1.2,
              }}>{tab.count}</span>
            </button>
          );
        })}
      </div>

      {filtrados.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtrados.map(p => (
            <ProcessoCard key={p.numero} processo={p} onClick={onNavigateProcesso} />
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 64, height: 64, background: 'var(--primary-bg-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FAIcon icon="fa-regular fa-file-slash" style={{ fontSize: 24, color: 'var(--primary-pure)' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink)' }}>
            {t('mpNenhumTitle')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-label)' }}>
            {t('mpNenhumDesc')}
          </div>
        </div>
      )}
    </div>
  );
}

