import React, { useState } from 'react';
import { useT } from '../i18n';
import type { Pendencia, PendenciaStatus, PendenciaTipo } from '../types';
import { MOCK_PENDENCIAS, PENDENCIA_ICON, pendenciaTipoKey } from '../mocks';
import FAIcon from '../components/FAIcon';
import StatCard from '../components/StatCard';

function PendenciaStatusBadge({ status }: { status: PendenciaStatus }) {
  const t = useT();
  const s = status === 'Aberta'
    ? { bg: 'var(--warning-bg)', color: 'var(--warning-color)' }
    : { bg: 'var(--success-bg)', color: 'var(--success-color)' };
  const label = status === 'Aberta' ? t('pendAberta') : t('pendFinalizada');
  return (
    <span style={{
      display: 'inline-block', background: s.bg, color: s.color,
      borderRadius: 100, padding: '2px 12px',
      fontWeight: 600, fontSize: 12, lineHeight: '20px',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

export function PrazoBadge({ prazo, diasRestantes, finalizada }: { prazo: string | null; diasRestantes: number | null; finalizada: boolean }) {
  const t = useT();
  if (finalizada) {
    return <span style={{ fontSize: 12, color: 'var(--neutral-dark-medium)' }}>{prazo || '-'}</span>;
  }
  if (prazo === null || diasRestantes === null) {
    return <span style={{ fontSize: 12, color: 'var(--neutral-dark-up)', fontStyle: 'italic' }}>{t('mpendSemPrazo')}</span>;
  }
  let bg = 'var(--success-bg)', color = 'var(--success-color)', label = `${prazo} · ${t('prazoEm')} ${diasRestantes} ${t('prazoDias')}`;
  if (diasRestantes < 0) { bg = 'var(--error-bg)'; color = 'var(--error-color)'; label = `${prazo} · ${Math.abs(diasRestantes)} ${Math.abs(diasRestantes) === 1 ? t('prazoDia') : t('prazoDias')} ${t('prazoVencida')}`; }
  else if (diasRestantes <= 3) { bg = 'var(--warning-bg)'; color = 'var(--warning-color)'; label = `${prazo} · ${diasRestantes === 0 ? t('prazoVenceHoje') : `${t('prazoEm')} ${diasRestantes} ${diasRestantes === 1 ? t('prazoDia') : t('prazoDias')}`}`; }

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: bg, color,
      borderRadius: 6, padding: '4px 10px',
      fontWeight: 600, fontSize: 11,
      whiteSpace: 'nowrap',
    }}>
      <FAIcon icon="fa-regular fa-clock" style={{ fontSize: 10 }} />
      {label}
    </span>
  );
}

function PendenciaCard({ pendencia, onResolver, onVer }: { pendencia: Pendencia; onResolver: () => void; onVer: () => void }) {
  const t = useT();
  const iconInfo = PENDENCIA_ICON[pendencia.tipo as PendenciaTipo];
  const finalizada = pendencia.status === 'Finalizada';

  return (
    <div
      style={{
        background: 'white', border: '1px solid var(--card-border)', borderRadius: 10,
        padding: 20, display: 'flex', flexDirection: 'column', gap: 14,
        boxShadow: '0px 2px 8px rgba(24,39,75,0.07)',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 4px 16px rgba(24,39,75,0.13)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border-hover)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 2px 8px rgba(24,39,75,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, color: iconInfo.color,
            fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3,
            background: iconInfo.bg, borderRadius: 6, padding: '4px 10px',
          }}>
            {t(pendenciaTipoKey(pendencia.tipo as PendenciaTipo))}
          </span>
          <PendenciaStatusBadge status={pendencia.status} />
        </div>
        <PrazoBadge prazo={pendencia.prazo} diasRestantes={pendencia.diasRestantes} finalizada={finalizada} />
      </div>

      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', lineHeight: 1.35 }}>
        {pendencia.titulo}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--neutral-label)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 2 }}>
            {t('mpendProcesso')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {pendencia.processo}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--neutral-label)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 2 }}>
            {t('mpendInteressado')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {pendencia.interessado}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--neutral-label)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 2 }}>
            {t('mpendCriadaEm')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', fontWeight: 600 }}>
            {pendencia.criadaEm}
          </div>
        </div>
      </div>

      {finalizada ? (
        <button
          onClick={onVer}
          style={{
            marginTop: 4,
            height: 42, width: '100%', borderRadius: 8, background: 'white',
            border: '1.5px solid var(--neutral-light-down)', color: 'var(--neutral-dark-down)',
            fontWeight: 600, fontSize: 13,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--background-color-light)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-dark-up)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-light-down)'; }}
        >
          <FAIcon icon="fa-regular fa-eye" style={{ fontSize: 13 }} />
          {t('mpendVer')}
        </button>
      ) : (
        <button
          onClick={onResolver}
          style={{
            marginTop: 4,
            height: 44, width: '100%', borderRadius: 8,
            background: 'var(--primary-pure)', border: '1.5px solid var(--primary-pure)', color: 'white',
            fontWeight: 700, fontSize: 14,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0px 2px 6px rgba(0,88,219,0.24)',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure-hover)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure)'}
        >
          <FAIcon icon="fa-regular fa-circle-check" style={{ fontSize: 14 }} />
          {t('mpendResolver')}
        </button>
      )}
    </div>
  );
}

export default function MinhasPendencias({ onNavigateProcesso, onResolverPendencia }: { onNavigateProcesso: () => void; onResolverPendencia: (p: Pendencia) => void }) {
  const t = useT();
  const [query, setQuery]   = useState('');
  const [filtro, setFiltro] = useState<'todas' | 'aberto' | 'vencendo' | 'finalizadas'>('aberto');

  const total       = MOCK_PENDENCIAS.length;
  const emAberto    = MOCK_PENDENCIAS.filter(p => p.status === 'Aberta').length;
  const vencendo    = MOCK_PENDENCIAS.filter(p => p.status === 'Aberta' && p.diasRestantes !== null && p.diasRestantes <= 3).length;
  const finalizadas = MOCK_PENDENCIAS.filter(p => p.status === 'Finalizada').length;

  const filtradas = MOCK_PENDENCIAS.filter(p => {
    if (filtro === 'aberto'      && p.status !== 'Aberta') return false;
    if (filtro === 'finalizadas' && p.status !== 'Finalizada') return false;
    if (filtro === 'vencendo'    && !(p.status === 'Aberta' && p.diasRestantes !== null && p.diasRestantes <= 3)) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        p.tipo.toLowerCase().includes(q) ||
        p.titulo.toLowerCase().includes(q) ||
        p.processo.toLowerCase().includes(q) ||
        p.interessado.toLowerCase().includes(q)
      );
    }
    return true;
  }).sort((a, b) => {
    if (a.status !== b.status) return a.status === 'Aberta' ? -1 : 1;
    const da = a.diasRestantes ?? 9999;
    const db = b.diasRestantes ?? 9999;
    return da - db;
  });

  const tabs: { id: typeof filtro; label: string; count: number }[] = [
    { id: 'todas',       label: t('mpTodos'),          count: total },
    { id: 'aberto',      label: t('mpendAberto'),      count: emAberto },
    { id: 'vencendo',    label: t('mpendVencendo'),    count: vencendo },
    { id: 'finalizadas', label: t('mpendFinalizadas'), count: finalizadas },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-ink-strong)', margin: 0 }}>
            {t('mpendTitle')}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--neutral-dark-down)', margin: '6px 0 0 0', lineHeight: 1.5 }}>
            {t('mpendDesc')}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
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
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <StatCard
          icon="fa-regular fa-list-check" label={t('mpendTotal')} value={total}
          color="var(--primary-pure)" bg="var(--primary-bg-hover)"
          active={filtro === 'todas'}
          onClick={() => setFiltro('todas')}
        />
        <StatCard
          icon="fa-regular fa-hourglass-half" label={t('mpendAberto')} value={emAberto}
          color="var(--warning-color)" bg="var(--warning-bg)"
          active={filtro === 'aberto'}
          onClick={() => setFiltro('aberto')}
        />
        <StatCard
          icon="fa-regular fa-triangle-exclamation" label={t('mpendVencendo')} value={vencendo}
          color="var(--error-color)" bg="var(--error-bg)"
          active={filtro === 'vencendo'}
          onClick={() => setFiltro('vencendo')}
        />
        <StatCard
          icon="fa-regular fa-circle-check" label={t('mpendFinalizadas')} value={finalizadas}
          color="var(--success-color)" bg="var(--success-bg)"
          active={filtro === 'finalizadas'}
          onClick={() => setFiltro('finalizadas')}
        />
      </div>

      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 16, boxShadow: '0px 2px 8px rgba(24,39,75,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--primary-light)', borderRadius: 8, height: 44, overflow: 'hidden', background: 'white' }}>
          <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 15, color: 'var(--neutral-dark-medium)', marginLeft: 14 }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('mpendBuscar')}
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
                color: active ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)',
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

      {filtradas.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))', gap: 12 }}>
          {filtradas.map(p => (
            <PendenciaCard
              key={p.id}
              pendencia={p}
              onResolver={() => onResolverPendencia(p)}
              onVer={() => onResolverPendencia(p)}
            />
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 64, height: 64, background: 'var(--success-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FAIcon icon="fa-regular fa-circle-check" style={{ fontSize: 24, color: 'var(--success-color)' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink)' }}>
            {t('mpendNenhumTitle')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-label)', textAlign: 'center', maxWidth: 380 }}>
            {t('mpendNenhumDesc')}
          </div>
        </div>
      )}
    </div>
  );
}

