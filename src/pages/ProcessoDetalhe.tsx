import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useT, useIsMobile } from '../i18n';
import type { ProcessoTab, ProcessoLiberado } from '../types';
import { MOCK_ARQUIVAMENTOS } from '../mocks';
import FAIcon from '../components/FAIcon';

// Linha de tabela de dados básicos
function DadosRow({ label, children, last = false }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ borderBottom: last ? 'none' : '1px solid var(--neutral-light-down)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', fontSize: 16, color: 'var(--neutral-dark-pure)', letterSpacing: '0.08px' }}>
      <span style={{ fontWeight: 400 }}>{label}</span>
      {children}
    </div>
  );
}

// Cabeçalho de tabela (colunas)
function TableHeader({ cols }: { cols: { label: string; width?: number | string; flex?: number | string; center?: boolean }[] }) {
  return (
    <div style={{ borderBottom: '1px solid var(--neutral-light-down)', display: 'flex', alignItems: 'center', padding: '8px 0', gap: 0 }}>
      {cols.map((col) => (
        <div key={col.label} style={{ ...(col.flex !== undefined ? { flex: col.flex } : { width: col.width, flexShrink: 0 }), fontWeight: 600, fontSize: 16, color: 'var(--neutral-dark-medium)', letterSpacing: '0.08px', lineHeight: '24px', textAlign: col.center ? 'center' : 'left' }}>
          {col.label}
        </div>
      ))}
    </div>
  );
}

// Modal: Motivo de Arquivamento
function MotivoArquivamentoModal({ motivo, arquivadoEm, onClose }: {
  motivo: typeof MOCK_ARQUIVAMENTOS[0]['motivo'];
  arquivadoEm: string;
  onClose: () => void;
}) {
  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: 'white', borderRadius: 14, width: '100%', maxWidth: 540, boxShadow: '0px 16px 48px rgba(0,0,0,0.20)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--neutral-light-medium)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FAIcon icon="fa-regular fa-box-archive" style={{ fontSize: 18, color: 'var(--primary-pure)' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', lineHeight: 1.2 }}>Motivo do Arquivamento</div>
              <div style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', marginTop: 2 }}>Arquivado em {arquivadoEm}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-dark-medium)', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 18 }} />
          </button>
        </div>

        {/* Metadados */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderBottom: '1px solid var(--neutral-light-medium)' }}>
          {[
            { label: 'Tipo de arquivamento', value: motivo.tipo },
            { label: 'Responsável', value: motivo.responsavel },
            { label: 'Unidade', value: motivo.unidade, full: true },
          ].map((item, i) => (
            <div key={item.label} style={{ padding: '12px 24px', borderRight: i % 2 === 0 && !item.full ? '1px solid var(--neutral-light-medium)' : 'none', ...(item.full ? { gridColumn: '1 / -1' } : {}) }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--neutral-label)', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 14, color: 'var(--neutral-ink)', fontWeight: 500 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Motivo */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--neutral-label)' }}>Descrição do motivo</div>
          <div style={{ background: 'var(--background-color-light)', border: '1px solid var(--card-border)', borderRadius: 8, padding: '14px 16px', fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '22px', whiteSpace: 'pre-wrap' }}>
            {motivo.descricao}
          </div>
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

// Modal: Despacho
function DespachoModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.40)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: 'white', borderRadius: 12, padding: '28px 32px', width: '100%', maxWidth: 560, boxShadow: '0px 10px 40px rgba(0,0,0,0.18)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: 18, color: 'var(--neutral-ink-strong)', margin: 0 }}>Despacho</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-dark-medium)', padding: 4 }}>
            <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 18 }} />
          </button>
        </div>
        <div style={{ height: 1, background: 'var(--neutral-light-medium)' }} />
        <div style={{ fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '22px', whiteSpace: 'pre-wrap' }}>
          {`Processo analisado e aprovado pela unidade responsável. Todas as informações foram verificadas e estão em conformidade com os requisitos estabelecidos.\n\nA análise de sustentabilidade foi concluída com êxito, demonstrando que os critérios ambientais e de eficiência energética foram atendidos conforme exigido pela legislação municipal vigente.\n\nEncaminha-se o processo para arquivamento definitivo.`}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ height: 36, padding: '0 20px', border: 'none', borderRadius: 6, background: 'var(--primary-pure)', color: 'white', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProcessoDetalhe({ onVoltar, liberadoItem, initialTab }: { onVoltar?: () => void; liberadoItem?: ProcessoLiberado | null; initialTab?: ProcessoTab }) {
  const t = useT();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<ProcessoTab>(initialTab ?? 'dados');
  const [showDespacho, setShowDespacho] = useState(false);
  const [motivoArq, setMotivoArq] = useState<{ motivo: typeof MOCK_ARQUIVAMENTOS[0]['motivo']; arquivadoEm: string } | null>(null);

  const tabs: { key: ProcessoTab; label: string }[] = liberadoItem
    ? [{ key: 'documentos', label: t('documentos') }]
    : [
        { key: 'dados',         label: t('dadosProcesso') },
        { key: 'documentos',    label: t('documentos') },
        { key: 'tramitacoes',   label: t('tramitacoes') },
        { key: 'movimentacoes', label: t('movimentacoes') },
        { key: 'arquivamentos', label: t('arquivamentos') },
      ];

  const cardStyle: React.CSSProperties = {
    background: 'white',
    border: '1px solid var(--neutral-light-medium)',
    borderRadius: 8,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    overflow: 'hidden',
  };

  const sectionTitle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 16,
    color: 'var(--colors-neutral-01)',
    lineHeight: '1.2',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 24, padding: isMobile ? '16px 16px 48px 16px' : '24px 24px 48px 24px' }}>

      {/* Botão voltar mobile */}
      {isMobile && onVoltar && (
        <button onClick={onVoltar} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, color: 'var(--primary-pure)', padding: 0 }}>
          <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 14, color: 'var(--primary-pure)' }} />
          {t('consultar')}
        </button>
      )}

      {/* Cabeçalho do processo */}
      <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: isMobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontWeight: 700, fontSize: isMobile ? 13 : 16, color: 'var(--neutral-dark-up)', lineHeight: '1.2' }}>
              PMF2026/000418
            </div>
            <div style={{ fontWeight: 700, fontSize: isMobile ? 18 : 24, color: 'var(--neutral-dark-pure)', lineHeight: 1 }}>
              Ranking de Sustentabilidade
            </div>
          </div>
          {!isMobile && <button
            onClick={() => window.print()}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0,
              border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, background: 'white', cursor: 'pointer',
              padding: '8px 16px', height: 38,
              fontWeight: 600, fontSize: 13, color: 'var(--neutral-dark-down)',
              transition: 'all 0.12s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-pure)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--neutral-dark-down)'; }}
          >
            <FAIcon icon="fa-regular fa-print" style={{ fontSize: 14 }} />
            {t('imprimir')}
          </button>}
        </div>
        {liberadoItem && (
          <div style={{ background: 'var(--success-bg-medium)', border: '1px solid var(--success-border-light)', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
            <FAIcon icon="fa-regular fa-circle-check" style={{ fontSize: 18, color: 'var(--success-color)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--success-color)' }}>
                Acesso liberado para: {liberadoItem.interessado} ({liberadoItem.cpf})
              </div>
              <div style={{ fontSize: 12, color: 'var(--success-dark)', marginTop: 2 }}>
                Liberado em {liberadoItem.liberadoEm}{liberadoItem.terminaEm ? ` · Acesso até ${liberadoItem.terminaEm}` : ''}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FAIcon icon="fa-regular fa-building-columns" style={{ fontSize: 14, color: 'var(--neutral-dark-up)' }} />
            </div>
            <span style={{ fontWeight: 400, fontSize: 16, color: 'var(--neutral-dark-up)', whiteSpace: 'nowrap' }}>SAUDE - Secretaria de Saúde</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FAIcon icon="fa-regular fa-calendar" style={{ fontSize: 14, color: 'var(--neutral-dark-up)' }} />
            </div>
            <span style={{ fontWeight: 400, fontSize: 16, color: 'var(--neutral-dark-up)', whiteSpace: 'nowrap' }}>{t('pdEntradaEm')}</span>
            <span style={{ fontWeight: 400, fontSize: 16, color: 'var(--neutral-dark-up)', whiteSpace: 'nowrap' }}>02/09/2025</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FAIcon icon="fa-regular fa-folder" style={{ fontSize: 14, color: 'var(--neutral-dark-up)' }} />
            </div>
            <span style={{ fontWeight: 400, fontSize: 16, color: 'var(--neutral-dark-up)', whiteSpace: 'nowrap' }}>{t('pdProcessoDigital')}</span>
          </div>
        </div>
      </div>

      {/* Barra de tabs */}
      <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: isMobile ? '4px 8px' : '8px 24px', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {tabs.map(tab => {
          const isActive = tab.key === activeTab;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{ background: 'none', border: 'none', borderBottom: isActive ? '3px solid var(--primary-pure)' : '3px solid transparent', padding: isMobile ? '8px 12px' : '10px 16px', fontWeight: isActive ? 700 : 400, fontSize: isMobile ? 13 : 14, color: isActive ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)', cursor: 'pointer', lineHeight: 1.5, whiteSpace: 'nowrap', transition: 'color 0.12s' }}>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab: Dados do Processo */}
      {activeTab === 'dados' && (
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 24, alignItems: 'flex-start' }}>

          {/* Coluna esquerda */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: isMobile ? 'none' : '0 0 65%', width: isMobile ? '100%' : undefined }}>

            {/* Dados básicos + Detalhamento */}
            <div style={cardStyle}>
              <div style={sectionTitle}>{t('pdDadosBasicos')}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {([
                  { label: t('pdTipo'),             value: 'Processo Digital' },
                  { label: t('pdClassificacao'),    value: 'Ranking de Sustentabilidade' },
                  { label: t('pdDataEntrada'),      value: '02/09/2025' },
                  { label: t('pdRecebido'),         value: '02/09/2025' },
                  { label: t('pdOrgaoAbertura'),    value: 'USP - Universidade de São Paulo' },
                  { label: t('pdOrgaoAtual'),       value: 'SOF - Secretaria de Orçamento e Finanças' },
                  { label: t('pdUnidadeAtual'),     value: 'SolarBPM - Demonstração' },
                ] as { label: string; value: string }[]).map(row => (
                  <DadosRow key={row.label} label={row.label}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-dark-pure)', letterSpacing: '0.08px', whiteSpace: 'nowrap' }}>{row.value}</span>
                  </DadosRow>
                ))}
                <DadosRow label={t('pdSituacao')} last>
                  <span style={{ background: 'var(--warning-bg-light)', color: 'var(--warning-dark)', borderRadius: 6, padding: '4px 8px', fontWeight: 600, fontSize: 12, lineHeight: '16px', letterSpacing: '0.06px', whiteSpace: 'nowrap' }}>
                    {t('pdArquivado')}
                  </span>
                </DadosRow>
              </div>

              <div style={sectionTitle}>{t('pdDetalhamento')}</div>
              <div style={{ background: 'var(--background-color-light)', borderRadius: 8, padding: 10 }}>
                <p style={{ fontWeight: 400, fontSize: 16, color: 'var(--neutral-dark-pure)', lineHeight: '16px', margin: 0, letterSpacing: '0.08px' }}>
                  Sustentabilidade da Unidade: SOF - Secretaria de Orçamento e Finanças referente ao mês de setembro
                </p>
              </div>
            </div>

            {/* Andamento (timeline) */}
            <div style={cardStyle}>
              <div style={sectionTitle}>{t('pdAndamento')}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {([
                  { date: '08/09/2025', title: 'Processo arquivado',                        desc: 'Arquivado pela unidade SAUDE - Secretaria da Saúde após conclusão da análise',               loc: 'SAUDE - Secretaria da Saúde',  isLast: false },
                  { date: '08/09/2025', title: 'Análise de sustentabilidade finalizada',    desc: 'Tarefa concluída pela unidade DIGITAL. Processo encaminhado à Secretaria de Saúde',          loc: 'SAUDE - Secretaria da Saúde',  isLast: false },
                  { date: '02/09/2025', title: 'Encaminhamento para unidade digital',       desc: 'Processo encaminhado e recebido pela unidade DIGITAL para análise',                          loc: 'Digital',                      isLast: false },
                  { date: '02/09/2025', title: 'Processo aberto',                          desc: 'Solicitação protocolada e recebida pela unidade UN - São Paulo',                              loc: 'UN - São Paulo',               isLast: true  },
                ] as { date: string; title: string; desc: string; loc: string; isLast: boolean }[]).map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
                    <div style={{ width: 12, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--primary-pure)', flexShrink: 0, boxShadow: '0 0 0 3px var(--primary-light)' }} />
                      {!item.isLast && <div style={{ width: 2, flex: 1, background: 'var(--primary-light)', marginTop: 4 }} />}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingBottom: item.isLast ? 0 : 16 }}>
                      <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--neutral-dark-pure)', lineHeight: '24px', letterSpacing: '0.06px' }}>{item.date}</span>
                      <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '24px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>{item.title}</span>
                      <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '24px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>{item.desc}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <FAIcon icon="fa-solid fa-location-dot" style={{ fontSize: 11, color: 'var(--primary-pure)' }} />
                        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '24px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>{item.loc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna direita */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, minWidth: 0 }}>

            {/* Interessados */}
            <div style={cardStyle}>
              <div style={sectionTitle}>{t('pdInteressados')}</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {([
                  { initials: 'FS', name: 'Fernando Naim Schmitz', role: t('pdRequerente') },
                  { initials: 'CL', name: 'Cris Lima',             role: t('pdRequerente') },
                ] as { initials: string; name: string; role: string }[]).map((person, i, arr) => (
                  <div key={person.initials} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--neutral-light-down)' : 'none', display: 'flex', alignItems: 'center', padding: '8px 0', gap: 8 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--primary-light)', border: '1.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontWeight: 600, fontSize: 16, color: 'var(--govbr-dark)', textTransform: 'uppercase', letterSpacing: '0.08px' }}>{person.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-dark-pure)', lineHeight: '24px', letterSpacing: '0.08px' }}>{person.name}</div>
                      <div style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '24px', letterSpacing: '0.07px' }}>{person.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab: Documentos (Pasta Digital) */}
      {activeTab === 'documentos' && (
        <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--neutral-light-medium)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FAIcon icon="fa-regular fa-folder-open" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-dark-pure)' }}>Pasta Digital  PMF2026/000418</span>
          </div>
          <div style={{ background: 'var(--warning-bg-medium)', border: '1px solid var(--warning-border)', borderRadius: 6, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, margin: '12px 16px 0', flexShrink: 0 }}>
            <FAIcon icon="fa-regular fa-triangle-exclamation" style={{ fontSize: 14, color: 'var(--warning-intense)', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'var(--warning-darker)', lineHeight: '18px' }}>
              {liberadoItem ? `Exibindo apenas os documentos liberados para: ${liberadoItem.interessado}` : 'Visualizando todos os documentos do processo via Sistema Solar BPM.'}
            </span>
          </div>
          <iframe
            src="https://solar.florianopolis.sc.gov.br/solar/api/visualizadorDocumentos/visualizadorPublico?proc=PMF2026/000418"
            style={{ width: '100%', height: 640, border: 'none', display: 'block', marginTop: 12 }}
            title="Pasta Digital do Processo"
          />
        </div>
      )}

      {/* Tab: Tramitações */}
      {activeTab === 'tramitacoes' && (() => {
        const th: React.CSSProperties = { fontWeight: 600, fontSize: 16, color: 'var(--neutral-dark-medium)', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0', borderBottom: '1px solid var(--neutral-light-down)', textAlign: 'left', fontStyle: 'normal' };
        const td: React.CSSProperties = { fontWeight: 400, fontSize: 16, color: 'var(--neutral-dark-pure)', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0' };
        return (
          <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: 24 }}>
            <div style={{ ...sectionTitle, marginBottom: 8 }}>{t('tramitacoes')}</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={th}>{t('pdVol')}</th>
                  <th style={th}>{t('pdOrgaoSetor')}</th>
                  <th style={th}>{t('pdRecebidoEm')}</th>
                  <th style={th}>{t('pdEncaminhadoEm')}</th>
                  <th style={{ ...th, textAlign: 'center' }}>{t('pdDespacho')}</th>
                </tr>
              </thead>
              <tbody>
                {([
                  { vol: '1', orgao: 'UN-SAOPAULO', recebido: '02/09/2025', encaminhado: '02/09/2025' },
                  { vol: '1', orgao: 'DIGITAL',     recebido: '02/09/2025', encaminhado: '08/09/2025' },
                  { vol: '1', orgao: 'SAUDE',       recebido: '08/09/2025', encaminhado: '' },
                ] as { vol: string; orgao: string; recebido: string; encaminhado: string }[]).map((row, i, arr) => (
                  <tr key={`${row.orgao}-${row.recebido}`} style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--neutral-light-down)' : 'none' }}>
                    <td style={td}>{row.vol}</td>
                    <td style={td}>{row.orgao}</td>
                    <td style={td}>{row.recebido}</td>
                    <td style={td}>{row.encaminhado}</td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <div style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FAIcon icon="fa-solid fa-eye" style={{ fontSize: 14, color: 'var(--primary-pure)', cursor: 'pointer' }} onClick={() => setShowDespacho(true)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })()}

      {/* Tab: Movimentações */}
      {activeTab === 'movimentacoes' && (() => {
        const th: React.CSSProperties = { fontWeight: 600, fontSize: 16, color: 'var(--neutral-dark-medium)', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0', borderBottom: '1px solid var(--neutral-light-down)', textAlign: 'left', fontStyle: 'normal' };
        const td: React.CSSProperties = { fontWeight: 400, fontSize: 16, color: 'var(--neutral-dark-pure)', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0', borderBottom: '1px solid var(--neutral-light-down)' };
        return (
          <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: 24 }}>
            <div style={{ ...sectionTitle, marginBottom: 8 }}>{t('movimentacoes')}</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '45%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={th}>{t('pdTipoTarefa')}</th>
                  <th style={th}>{t('pdDataCriacao')}</th>
                  <th style={th}>{t('pdSituacaoCol')}</th>
                  <th style={{ ...th, textAlign: 'center' }}>{t('pdAcoes')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>{t('pdAnalisarSustentabilidade')}</td>
                  <td style={td}>02/09/2025</td>
                  <td style={td}>
                    <span style={{ background: 'var(--success-bg-strong)', color: 'var(--success-darker)', borderRadius: 6, padding: '4px 8px', fontWeight: 600, fontSize: 12, lineHeight: '16px', letterSpacing: '0.06px', whiteSpace: 'nowrap' }}>
                      {t('pdFinalizada')}
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FAIcon icon="fa-solid fa-eye" style={{ fontSize: 14, color: 'var(--primary-pure)', cursor: 'pointer' }} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })()}

      {/* Tab: Arquivamentos */}
      {activeTab === 'arquivamentos' && (() => {
        const th: React.CSSProperties = { fontWeight: 600, fontSize: 13, color: 'var(--neutral-dark-medium)', lineHeight: '20px', letterSpacing: '0.06px', padding: '10px 12px', borderBottom: '1px solid var(--neutral-light-medium)', textAlign: 'left', fontStyle: 'normal', background: 'var(--bg-subtle)' };
        const td: React.CSSProperties = { fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '22px', padding: '12px 12px', borderBottom: '1px solid var(--neutral-light-medium)' };
        return (
          <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, overflow: 'hidden' }}>
            {/* Cabeçalho do card */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--neutral-light-medium)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: 'var(--primary-bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FAIcon icon="fa-regular fa-box-archive" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />
              </div>
              <div>
                <div style={{ ...sectionTitle, margin: 0 }}>{t('arquivamentos')}</div>
                <div style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', marginTop: 1 }}>{MOCK_ARQUIVAMENTOS.length} registro{MOCK_ARQUIVAMENTOS.length !== 1 ? 's' : ''} encontrado{MOCK_ARQUIVAMENTOS.length !== 1 ? 's' : ''}</div>
              </div>
            </div>

            {/* Tabela */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
                <thead>
                  <tr>
                    <th style={{ ...th, width: 50 }}>{t('pdVol')}</th>
                    <th style={th}>{t('pdTipoTarefa')}</th>
                    <th style={{ ...th, width: 130 }}>{t('pdArquivadoEm')}</th>
                    <th style={{ ...th, width: 80, textAlign: 'center' }}>{t('pdMotivoArq')}</th>
                    <th style={{ ...th, width: 130 }}>{t('pdReabertoEm')}</th>
                    <th style={th}>{t('pdMotivoReab')}</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ARQUIVAMENTOS.map((arq, i) => (
                    <tr key={arq.arquivadoEm} style={{ background: i % 2 === 1 ? 'var(--bg-subtle)' : 'white' }}>
                      <td style={td}>{arq.vol}</td>
                      <td style={td}>{arq.tarefa}</td>
                      <td style={td}>{arq.arquivadoEm}</td>
                      <td style={{ ...td, textAlign: 'center' }}>
                        <button
                          onClick={() => setMotivoArq({ motivo: arq.motivo, arquivadoEm: arq.arquivadoEm })}
                          title="Ver motivo do arquivamento"
                          style={{ background: 'var(--primary-bg-hover)', border: 'none', borderRadius: 6, width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-light)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary-bg-hover)')}
                        >
                          <FAIcon icon="fa-regular fa-eye" style={{ fontSize: 14, color: 'var(--primary-pure)' }} />
                        </button>
                      </td>
                      <td style={{ ...td, color: arq.reabertoEm === '' ? 'var(--neutral-dark-up)' : 'var(--neutral-dark-pure)' }}>{arq.reabertoEm}</td>
                      <td style={{ ...td, color: arq.motivoReab === '' ? 'var(--neutral-dark-up)' : 'var(--neutral-dark-pure)', fontSize: 13 }}>{arq.motivoReab}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {showDespacho && <DespachoModal onClose={() => setShowDespacho(false)} />}
      {motivoArq && <MotivoArquivamentoModal motivo={motivoArq.motivo} arquivadoEm={motivoArq.arquivadoEm} onClose={() => setMotivoArq(null)} />}

      {/* Keep TableHeader in scope to avoid unused warning */}
    </div>
  );
}

