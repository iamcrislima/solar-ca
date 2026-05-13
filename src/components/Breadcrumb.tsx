import React from 'react';
import { useT } from '../i18n';
import type { Page, Servico } from '../types';

export default function Breadcrumb({ page, onNavigate, selectedCat, selectedService }: {
  page: Page;
  onNavigate: (p: Page) => void;
  selectedCat?: { label: string; icon: string } | null;
  selectedService?: Servico | null;
}) {
  const t = useT();
  const txt: React.CSSProperties = { fontSize: 14, color: 'var(--neutral-dark-down)' };
  const sep = <span style={{ ...txt, fontWeight: 700 }}>/</span>;

  const link = (label: string, onClick: () => void): React.ReactElement => (
    <span
      onClick={onClick}
      style={{ ...txt, fontWeight: 400, cursor: 'pointer', textDecoration: 'underline' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary-pure)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--neutral-dark-down)'; }}
    >{label}</span>
  );

  const inSolicitacao = page === 'solicitacao' || page === 'cat-servicos' || page === 'servico-detalhe' || page === 'servico-form';

  return (
    <div style={{ background: 'white', borderBottom: '1px solid var(--primary-light)', padding: '10px 24px', flexShrink: 0, display: 'flex', gap: 4, alignItems: 'center' }}>
      <span onClick={() => onNavigate('home')} style={{ ...txt, fontWeight: 700, cursor: page !== 'home' ? 'pointer' : 'default' }}>
        {t('breadInicio')}
      </span>

      {/* Consulta de processos */}
      {(page === 'consulta' || page === 'processo') && (
        <>{sep}{link(t('consultaProcessos'), () => onNavigate('consulta'))}</>
      )}
      {page === 'processo' && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>PMF2026/000418</span></>
      )}

      {/* Conferência de documentos */}
      {page === 'documentos' && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>{t('conferenciaDocumentos')}</span></>
      )}

      {/* Meus dados */}
      {page === 'meusdados' && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>{t('meusDados')}</span></>
      )}

      {/* Meus processos */}
      {page === 'meusprocessos' && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>{t('meusProcessos')}</span></>
      )}

      {/* Minhas pendências */}
      {(page === 'minhaspendencias' || page === 'pendencia-resolver') && (
        <>{sep}{page === 'pendencia-resolver'
          ? link(t('minhasPendencias'), () => onNavigate('minhaspendencias'))
          : <span style={{ ...txt, fontWeight: 400 }}>{t('minhasPendencias')}</span>
        }</>
      )}
      {page === 'pendencia-resolver' && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>{t('rpTitle')}</span></>
      )}

      {/* Processos Liberados */}
      {page === 'processosliberados' && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>{t('processosLiberados')}</span></>
      )}

      {/* Solicitação de serviços + sub-páginas */}
      {inSolicitacao && (
        <>{sep}{page === 'solicitacao'
          ? <span style={{ ...txt, fontWeight: 400 }}>{t('solicitacaoServicos')}</span>
          : link(t('solicitacaoServicos'), () => onNavigate('solicitacao'))
        }</>
      )}
      {(page === 'cat-servicos' || page === 'servico-detalhe' || page === 'servico-form') && selectedCat && (
        <>{sep}{page === 'cat-servicos'
          ? <span style={{ ...txt, fontWeight: 400 }}>{selectedCat.label}</span>
          : link(selectedCat.label, () => onNavigate('cat-servicos'))
        }</>
      )}
      {(page === 'servico-detalhe' || page === 'servico-form') && selectedService && (
        <>{sep}{page === 'servico-detalhe'
          ? <span style={{ ...txt, fontWeight: 400 }}>{selectedService.servico}</span>
          : link(selectedService.servico, () => onNavigate('servico-detalhe'))
        }</>
      )}
      {page === 'servico-form' && selectedService && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>Nova solicitação</span></>
      )}
    </div>
  );
}

