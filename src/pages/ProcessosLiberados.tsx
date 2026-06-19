import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useT, useIsMobile } from '../i18n';
import { ProcessoLiberado } from '../types';
import FAIcon from '../components/FAIcon';
import StatCard from '../components/StatCard';

const MOCK_LIBERADOS: ProcessoLiberado[] = [
  { id: 'l1', numero: 'SolarBPM 2026/000848', interessado: 'João da Silva Santos',  cpf: '098.765.432-10', liberadoEm: '29/03/2026', terminaEm: '29/04/2026', ativo: true,  anexos: 3, orgao: 'SAUDE - Secretaria da Saúde' },
  { id: 'l2', numero: 'PMF 2026/000721',      interessado: 'Filipe Otávio Reis',    cpf: '123.456.789-00', liberadoEm: '15/03/2026', terminaEm: '15/04/2026', ativo: true,  anexos: 1, orgao: 'SEFAZ - Secretaria da Fazenda' },
  { id: 'l3', numero: 'PMF 2025/009812',      interessado: 'João da Silva Santos',  cpf: '098.765.432-10', liberadoEm: '10/10/2025', terminaEm: '10/11/2025', ativo: false, anexos: 5, orgao: 'IPUF - Instituto de Planejamento Urbano' },
  { id: 'l4', numero: 'PMF 2025/008234',      interessado: 'Cris Lima',              cpf: '012.345.678-90', liberadoEm: '22/08/2025', terminaEm: '22/09/2025', ativo: false, anexos: 2, orgao: 'SMC - Secretaria de Mobilidade' },
  { id: 'l5', numero: 'PMF 2025/007109',      interessado: 'João da Silva Santos',  cpf: '098.765.432-10', liberadoEm: '12/07/2025', terminaEm: '12/08/2025', ativo: false, anexos: 4, orgao: 'SMDU - Desenvolvimento Urbano' },
  { id: 'l6', numero: 'PMF 2025/006055',      interessado: 'Cris Lima',              cpf: '012.345.678-90', liberadoEm: '03/06/2025', terminaEm: '03/07/2025', ativo: false, anexos: 1, orgao: 'SAUDE - Secretaria da Saúde' },
];

const MOCK_NOMES_ANEXOS = [
  'Certidão de regularidade fiscal.pdf',
  'Alvará de funcionamento 2025.pdf',
  'Memorial descritivo do processo.pdf',
  'Declaração de ciência dos termos.pdf',
  'Planta baixa do imóvel.pdf',
];

function AnexosExpiradoModal({ item, onClose }: { item: ProcessoLiberado; onClose: () => void }) {
  const arquivos = MOCK_NOMES_ANEXOS.slice(0, item.anexos);
  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: 'white', borderRadius: 14, width: '100%', maxWidth: 500, boxShadow: '0px 16px 48px rgba(0,0,0,0.20)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--neutral-light-medium)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--background-color-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FAIcon icon="fa-regular fa-folder-xmark" style={{ fontSize: 18, color: 'var(--neutral-dark-medium)' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', lineHeight: 1.2 }}>Anexos do processo</div>
              <div style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', marginTop: 2 }}>{item.numero}</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-dark-medium)', padding: 4, display: 'flex', alignItems: 'center' }}>
            <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Banner de acesso expirado */}
        <div style={{ margin: '16px 24px 0', background: 'var(--error-bg)', border: '1px solid var(--error-border-light)', borderRadius: 8, padding: '12px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <FAIcon icon="fa-regular fa-circle-exclamation" style={{ fontSize: 15, color: 'var(--error-color)', flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--error-color)', marginBottom: 2 }}>Acesso expirado</div>
            <div style={{ fontSize: 12, color: 'var(--error-dark)', lineHeight: '18px' }}>
              O prazo de acesso a este processo encerrou em <strong>{item.terminaEm}</strong>. Os documentos abaixo não estão mais disponíveis para visualização ou download.
            </div>
          </div>
        </div>

        {/* Lista de arquivos (somente nomes) */}
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--neutral-label)', marginBottom: 4 }}>
            {arquivos.length} documento{arquivos.length !== 1 ? 's' : ''} neste processo
          </div>
          {arquivos.map((nome) => (
            <div key={nome} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--neutral-light-medium)', borderRadius: 8 }}>
              <FAIcon icon="fa-regular fa-file-pdf" style={{ fontSize: 16, color: 'var(--neutral-dark-up)', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--neutral-dark-down)', flex: 1 }}>{nome}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--neutral-dark-up)', background: 'var(--neutral-light-medium)', borderRadius: 4, padding: '2px 8px' }}>Indisponível</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 24px 20px' }}>
          <button onClick={onClose} style={{ height: 38, padding: '0 24px', border: 'none', borderRadius: 8, background: 'var(--primary-pure)', color: 'white', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ProcessoLiberadoCard({ item, onVerAnexos }: { item: ProcessoLiberado; onVerAnexos: () => void }) {
  const t = useT();
  return (
    <div
      style={{
        background: 'white', border: '1px solid var(--card-border)', borderRadius: 10,
        padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14,
        boxShadow: '0px 2px 8px rgba(24,39,75,0.07)',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 4px 16px rgba(24,39,75,0.13)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border-hover)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 2px 8px rgba(24,39,75,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <div style={{ width: 42, height: 42, background: item.ativo ? 'var(--success-bg)' : 'var(--background-color-light)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <FAIcon icon={item.ativo ? 'fa-regular fa-folder-open' : 'fa-regular fa-folder-xmark'} style={{ fontSize: 17, color: item.ativo ? 'var(--success-color)' : 'var(--neutral-dark-medium)' }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--primary-pure)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.numero}
            </div>
            <div style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.orgao}
            </div>
          </div>
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: item.ativo ? 'var(--success-bg)' : 'var(--background-color-light)',
          color: item.ativo ? 'var(--success-color)' : 'var(--neutral-dark-medium)',
          borderRadius: 100, padding: '3px 10px',
          fontWeight: 600, fontSize: 11,
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.ativo ? 'var(--success-color)' : 'var(--neutral-dark-up)' }} />
          {item.ativo ? t('plAtivo') : t('plExpirado')}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--neutral-label)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 2 }}>
            {t('plInteressado')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.interessado}
          </div>
          <div style={{ fontSize: 11, color: 'var(--neutral-dark-medium)' }}>{item.cpf}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--neutral-label)', letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 2 }}>
            {item.ativo ? t('plTerminaEm') : t('plLiberadoEm')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', fontWeight: 600 }}>
            {item.ativo ? (item.terminaEm || '-') : item.liberadoEm}
          </div>
          <div style={{ fontSize: 11, color: 'var(--neutral-dark-medium)' }}>
            {item.ativo ? `Liberado em ${item.liberadoEm}` : `Encerrado em ${item.terminaEm || '-'}`}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--neutral-light-medium)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--neutral-dark-down)' }}>
          <FAIcon icon="fa-regular fa-paperclip" style={{ fontSize: 12, color: 'var(--neutral-dark-medium)' }} />
          {item.anexos} {t('plAnexos').toLowerCase()}
        </div>
        <button
          onClick={onVerAnexos}
          style={{
            height: 34, padding: '0 14px', borderRadius: 6, background: 'white',
            border: '1.5px solid var(--primary-pure)', color: 'var(--primary-pure)',
            fontWeight: 600, fontSize: 12,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-bg-hover)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}
        >
          <FAIcon icon="fa-regular fa-paperclip" style={{ fontSize: 11 }} />
          {t('plVerAnexos')}
        </button>
      </div>
    </div>
  );
}

export default function ProcessosLiberados({ onVerAnexos }: { onVerAnexos: (item: ProcessoLiberado) => void }) {
  const t = useT();
  const isMobile = useIsMobile();
  const [query, setQuery]         = useState('');
  const [filtro, setFiltro]       = useState<'todos' | 'ativos' | 'expirados'>('ativos');
  const [expiradoModal, setExpiradoModal] = useState<ProcessoLiberado | null>(null);

  const total     = MOCK_LIBERADOS.length;
  const ativos    = MOCK_LIBERADOS.filter(i => i.ativo).length;
  const expirados = MOCK_LIBERADOS.filter(i => !i.ativo).length;

  const filtrados = MOCK_LIBERADOS.filter(i => {
    if (filtro === 'ativos'    && !i.ativo) return false;
    if (filtro === 'expirados' && i.ativo)  return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        i.numero.toLowerCase().includes(q) ||
        i.interessado.toLowerCase().includes(q) ||
        i.orgao.toLowerCase().includes(q) ||
        i.cpf.includes(q)
      );
    }
    return true;
  });

  const tabs: { id: typeof filtro; label: string; count: number }[] = [
    { id: 'todos',     label: t('mpTodos'),       count: total },
    { id: 'ativos',    label: t('plAtivos'),      count: ativos },
    { id: 'expirados', label: t('plExpirados'),   count: expirados },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: isMobile ? '16px 16px 48px 16px' : '24px 24px 48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h1 style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-ink-strong)', margin: 0 }}>
            {t('plTitle')}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--neutral-dark-down)', margin: '6px 0 0 0', lineHeight: 1.5 }}>
            {t('plDesc')}
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
        <StatCard icon="fa-regular fa-folder-open"   label={t('plTotal')}     value={total}     color="var(--primary-pure)" bg="var(--primary-bg-hover)"
          active={filtro === 'todos'}     onClick={() => setFiltro('todos')} />
        <StatCard icon="fa-regular fa-circle-check"  label={t('plAtivos')}    value={ativos}    color="var(--success-color)" bg="var(--success-bg)"
          active={filtro === 'ativos'}    onClick={() => setFiltro('ativos')} />
        <StatCard icon="fa-regular fa-clock-rotate-left" label={t('plExpirados')} value={expirados} color="var(--neutral-dark-medium)" bg="var(--background-color-light)"
          active={filtro === 'expirados'} onClick={() => setFiltro('expirados')} />
      </div>

      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 16, boxShadow: '0px 2px 8px rgba(24,39,75,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--primary-light)', borderRadius: 8, height: 44, overflow: 'hidden', background: 'white' }}>
          <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 15, color: 'var(--neutral-dark-medium)', marginLeft: 14 }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('plBuscar')}
            style={{ flex: 1, border: 'none', outline: 'none', padding: '0 14px', fontSize: 14, color: 'var(--neutral-dark-pure)', background: 'transparent', height: '100%' }}
          />
          {query && (
            <FAIcon icon="fa-regular fa-xmark" aria-label="Limpar busca" onClick={() => setQuery('')}
              style={{ fontSize: 14, color: 'var(--neutral-dark-medium)', cursor: 'pointer', marginRight: 14 }} />
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

      {filtrados.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 14 }}>
          {filtrados.map(i => (
            <ProcessoLiberadoCard
              key={i.id}
              item={i}
              onVerAnexos={i.ativo ? () => onVerAnexos(i) : () => setExpiradoModal(i)}
            />
          ))}
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 64, height: 64, background: 'var(--primary-bg-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FAIcon icon="fa-regular fa-folder-open" style={{ fontSize: 24, color: 'var(--primary-pure)' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink)' }}>
            {t('plNenhumTitle')}
          </div>
          <div style={{ fontSize: 13, color: 'var(--neutral-label)', textAlign: 'center', maxWidth: 380 }}>
            {t('plNenhumDesc')}
          </div>
        </div>
      )}

      {expiradoModal && <AnexosExpiradoModal item={expiradoModal} onClose={() => setExpiradoModal(null)} />}
    </div>
  );
}

