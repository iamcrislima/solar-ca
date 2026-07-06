import React, { Fragment } from 'react';
import { useT, useIsMobile } from '../i18n';
import { Servico, ServicoDocumento } from '../types';
import FAIcon from '../components/FAIcon';
//  Tela: Detalhe do serviço
export default function ServicoDetalhe({ service, onNavigateForm }: {
  service: Servico;
  onNavigateForm: (service: Servico) => void;
}) {
  const t = useT();
  const isMobile = useIsMobile();
  const d = service.detalhe;

  // Cabeçalho (universal)
  const classificacao = d?.classificacao ?? service.categoria;
  const setorParts = service.setor.split('/').map(s => s.trim()).filter(Boolean);
  const orgaoSigla = setorParts[0] ?? service.setor;
  const unidadePath = d?.unidadePath ?? setorParts.slice(1).join(' / ');

  // ── Fallback (serviços sem `detalhe` configurado) ──
  const catDescMap: Record<string, string> = {
    'Impostos e taxas':                       t('sdDescImpostos'),
    'Alvarás, autorizações e licenças':       t('sdDescAlvaras'),
    'Certidões, declarações e documentos':    t('sdDescCertidoes'),
    'Assistência social':                     t('sdDescAssistencia'),
    'Obras e urbanismo':                      t('sdDescObras'),
    'Meio ambiente':                          t('sdDescMeio'),
    'Saúde':                                  t('sdDescSaude'),
    'Solicitações':                           t('sdDescSolicitacoes'),
    'Comércio e serviços':                    t('sdDescComercio'),
  };
  const desc = catDescMap[service.categoria] ?? t('sdDescDefault');
  const steps = [t('sdStep1'), t('sdStep2'), t('sdStep3'), t('sdStep4'), t('sdStep5')];
  const docs  = [t('sdDoc1'),  t('sdDoc2'),  t('sdDoc3'),  t('sdDoc4')];
  const linksFallback = [
    { label: t('solLinksTitle'), url: '#' },
    { label: t('labelOrgaoResp'), url: '#' },
  ];

  // Opção de abertura "Terceiro" redireciona para o link externo; senão abre o formulário.
  function handleSolicitar() {
    if (service.opcaoAbertura === 'terceiro' && service.linkExterno) { window.open(service.linkExterno, '_blank', 'noopener,noreferrer'); return; }
    onNavigateForm(service);
  }

  const cardBox: React.CSSProperties = { background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 24 };
  const h2Style: React.CSSProperties = { fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 8 };
  const htmlStyle: React.CSSProperties = { fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '23px' };

  // Seção com conteúdo HTML renderizado
  function HtmlSection({ icon, title, html }: { icon: string; title: string; html: string }) {
    return (
      <div style={cardBox}>
        <h2 style={h2Style}><FAIcon icon={icon} style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{title}</h2>
        <div style={htmlStyle} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

  // Lista de documentos (modelo p/ solicitar ou complementares p/ download)
  function DocLista({ icon, title, items, labelBaixar }: { icon: string; title: string; items: ServicoDocumento[]; labelBaixar: string }) {
    return (
      <div style={cardBox}>
        <h2 style={h2Style}><FAIcon icon={icon} style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((doc) => (
            <div key={doc.nome} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--neutral-light-medium)', borderRadius: 8 }}>
              <FAIcon icon="fa-regular fa-file-lines" style={{ fontSize: 15, color: 'var(--primary-pure)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--neutral-dark-pure)' }}>{doc.nome}</div>
                {doc.descricao && <div style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', marginTop: 2 }}>{doc.descricao}</div>}
              </div>
              {doc.arquivoModelo && (
                <button
                  onClick={() => window.open('#', '_blank', 'noopener,noreferrer')}
                  style={{ height: 32, padding: '0 12px', border: '1.5px solid var(--primary-pure)', borderRadius: 6, background: 'white', color: 'var(--primary-pure)', fontWeight: 600, fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', flexShrink: 0 }}
                >
                  <FAIcon icon="fa-regular fa-download" style={{ fontSize: 11 }} />
                  {labelBaixar}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Diagrama horizontal do fluxo (reutilizado do fallback)
  function DiagramaFluxo() {
    return (
      <div style={cardBox}>
        <h2 style={h2Style}><FAIcon icon="fa-regular fa-diagram-project" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{t('sdDiagramaFluxo')}</h2>
        <div style={{ background: 'var(--bg-subtle)', borderRadius: 8, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
          {[t('sdEtapa1'), t('sdEtapa2'), t('sdEtapa3'), t('sdEtapa4'), t('sdEtapa5')].map((etapa, i, arr) => (
            <Fragment key={etapa}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'white' }}>{i + 1}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--neutral-dark-pure)', whiteSpace: 'nowrap' }}>{etapa}</span>
              </div>
              {i < arr.length - 1 && <div style={{ flex: 1, height: 2, background: 'var(--card-border-hover)', minWidth: 20, marginBottom: 20 }} />}
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Seções adicionais comuns (data-driven)
  const secoesAdicionais = d && (
    <>
      {d.documentosSolicitar && d.documentosSolicitar.length > 0 && (
        <DocLista icon="fa-regular fa-paperclip" title={t('sdDocsSolicitar')} items={d.documentosSolicitar} labelBaixar={t('sdBaixarModelo')} />
      )}
      {d.linksRelacionados && d.linksRelacionados.length > 0 && (
        <div style={cardBox}>
          <h2 style={h2Style}><FAIcon icon="fa-regular fa-link" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{t('solLinksTitle')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d.linksRelacionados.map(link => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--primary-pure)', fontSize: 14, fontWeight: 600 }}>
                <FAIcon icon="fa-regular fa-arrow-up-right-from-square" style={{ fontSize: 12, flexShrink: 0 }} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
      {d.documentosDownload && d.documentosDownload.length > 0 && (
        <DocLista icon="fa-regular fa-folder-arrow-down" title={t('sdDocsDownload')} items={d.documentosDownload} labelBaixar={t('sdBaixar')} />
      )}
      {d.diagramaFluxo && <DiagramaFluxo />}
      {d.documentacaoFluxo && (
        <HtmlSection icon="fa-regular fa-book" title={t('sdDocumentacaoFluxo')} html={d.documentacaoFluxo} />
      )}
    </>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: isMobile ? '16px 16px 80px 16px' : '24px 24px 48px 24px' }}>

      {/* Cabeçalho fixo */}
      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: isMobile ? '20px' : 28, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <span style={{ background: 'var(--primary-light)', color: 'var(--primary-pure)', borderRadius: 100, padding: '3px 12px', fontWeight: 600, fontSize: 12 }}>{classificacao}</span>
          {service.destino.map(dst => (
            <span key={dst} style={{ background: 'var(--neutral-light-medium)', color: 'var(--neutral-dark-down)', borderRadius: 100, padding: '3px 12px', fontWeight: 600, fontSize: 12 }}>{dst}</span>
          ))}
          {'agrupado' in service && service.agrupado && (
            <span style={{ background: 'var(--badge-simplified-bg)', color: 'var(--badge-simplified-color)', borderRadius: 100, padding: '3px 12px', fontWeight: 600, fontSize: 12 }}>{t('solSimplificado')}</span>
          )}
        </div>
        <h1 style={{ fontWeight: 700, fontSize: isMobile ? 20 : 28, color: 'var(--neutral-ink-strong)', margin: '0 0 12px 0' }}>{service.servico}</h1>

        {/* Órgão e unidade responsável */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--neutral-label)', marginBottom: 3 }}>{t('sdOrgaoUnidade')}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--neutral-dark-pure)' }}>
            <FAIcon icon="fa-regular fa-building" style={{ fontSize: 14, color: 'var(--neutral-dark-medium)', flexShrink: 0 }} />
            <span><strong>{orgaoSigla}</strong>{unidadePath ? ` — ${unidadePath}` : ''}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={handleSolicitar}
            style={{ height: 44, padding: '0 32px', border: 'none', borderRadius: 8, background: 'var(--primary-pure)', color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.12s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure-hover)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure)'; }}
          >
            <FAIcon icon={service.opcaoAbertura === 'terceiro' ? 'fa-regular fa-arrow-up-right-from-square' : 'fa-regular fa-paper-plane'} style={{ fontSize: 15 }} />
            {t('solSolicitarServico')}
          </button>
          <button
            onClick={() => window.print()}
            style={{ height: 44, padding: '0 20px', border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, background: 'white', color: 'var(--neutral-dark-down)', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.12s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-pure)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--neutral-dark-down)'; }}
          >
            <FAIcon icon="fa-regular fa-file-arrow-down" style={{ fontSize: 14 }} />
            {t('exportarDescritivo')}
          </button>
        </div>
      </div>

      {/* ── Conteúdo: modo "Por agrupamento" ── */}
      {(d?.modo === 'agrupamento' || (!d && 'agrupado' in service && service.agrupado)) ? (
        <>
          <div style={cardBox}>
            <h2 style={h2Style}><FAIcon icon="fa-regular fa-circle-info" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{t('sdDescricaoUnica')}</h2>
            <div style={htmlStyle} dangerouslySetInnerHTML={{ __html: d?.descricao ?? service.htmlContent ?? '' }} />
          </div>
          {secoesAdicionais}
        </>
      ) : d?.modo === 'campos' ? (
        /* ── Conteúdo: modo "Por campos" (uma seção por campo preenchido) ── */
        <>
          <HtmlSection icon="fa-regular fa-circle-info" title={t('sdDescResumida')} html={d.descricaoResumida ?? ''} />
          {d.descricaoDetalhada && <HtmlSection icon="fa-regular fa-align-left" title={t('sdDescDetalhada')} html={d.descricaoDetalhada} />}
          {d.requisitos && <HtmlSection icon="fa-regular fa-list-check" title={t('sdRequisitos')} html={d.requisitos} />}
          {d.comoSolicitar && <HtmlSection icon="fa-regular fa-clipboard-list" title={t('sdComoSolicitarSec')} html={d.comoSolicitar} />}
          {d.conteudoDependente && <HtmlSection icon="fa-regular fa-diagram-subtask" title={t('sdConteudoDependente')} html={d.conteudoDependente} />}
          {d.infoTaxa && <HtmlSection icon="fa-regular fa-money-bill" title={t('sdInfoTaxa')} html={d.infoTaxa} />}
          {secoesAdicionais}
        </>
      ) : (
        /* ── Fallback: serviços sem detalhamento configurado ── */
        <>
          <div style={{ ...cardBox, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 style={h2Style}><FAIcon icon="fa-regular fa-circle-info" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{t('solOQueE')}</h2>
              <p style={{ fontSize: 14, color: 'var(--neutral-dark-pure)', margin: 0, lineHeight: '23px' }}>{desc}</p>
            </div>
            <div style={{ height: 1, background: 'var(--neutral-light-medium)' }} />
            <div>
              <h2 style={h2Style}><FAIcon icon="fa-regular fa-clock" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{t('sdInformacoesTitle')}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
                {[
                  { label: t('sdPrazoAtendimento'), value: t('sdPrazoValor'),                    icon: 'fa-regular fa-calendar' },
                  { label: t('sdCusto'),            value: t('sdCustoValor'),                    icon: 'fa-regular fa-circle-check' },
                  { label: t('labelOrgaoResp'),     value: orgaoSigla,                           icon: 'fa-regular fa-building' },
                  { label: t('labelSetorResp'),      value: setorParts[setorParts.length - 1] ?? '', icon: 'fa-regular fa-sitemap' },
                ].map((info) => (
                  <div key={info.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'var(--bg-subtle)', borderRadius: 8, padding: '10px 14px' }}>
                    <FAIcon icon={info.icon} style={{ fontSize: 14, color: 'var(--neutral-dark-medium)', marginTop: 2, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 11, color: 'var(--neutral-dark-medium)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>{info.label}</div>
                      <div style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', fontWeight: 600 }}>{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: 1, background: 'var(--neutral-light-medium)' }} />
            <div>
              <h2 style={h2Style}><FAIcon icon="fa-regular fa-list-check" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{t('sdComoSolicitar')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {steps.map((step, i) => (
                  <div key={step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--primary-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <span style={{ fontWeight: 700, fontSize: 11, color: 'white' }}>{i + 1}</span>
                    </div>
                    <p style={{ fontSize: 14, color: 'var(--neutral-dark-pure)', margin: 0, lineHeight: '22px', paddingTop: 2 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={cardBox}>
            <h2 style={h2Style}><FAIcon icon="fa-regular fa-paperclip" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{t('solDocsTitle')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {docs.map((doc) => (
                <div key={doc} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '8px 12px', background: 'var(--bg-subtle)', borderRadius: 8 }}>
                  <FAIcon icon="fa-regular fa-file-check" style={{ fontSize: 14, color: 'var(--primary-pure)', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: 'var(--neutral-dark-pure)', lineHeight: '20px' }}>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={cardBox}>
            <h2 style={h2Style}><FAIcon icon="fa-regular fa-link" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />{t('solLinksTitle')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {linksFallback.map((link) => (
                <a key={link.label} href={link.url} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--primary-pure)', fontSize: 14, fontWeight: 600 }}>
                  <FAIcon icon="fa-regular fa-arrow-up-right-from-square" style={{ fontSize: 12, flexShrink: 0 }} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <DiagramaFluxo />
        </>
      )}
    </div>
  );
}
