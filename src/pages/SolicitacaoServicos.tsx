import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@1doc/1ds-react';
import { useT, useLang } from '../i18n';
import type { Servico } from '../types';
import { MOCK_SERVICOS_AV, ALL_SERVICES, categories } from '../mocks';
import FAIcon from '../components/FAIcon';

export default function SolicitacaoServicos({ onNavigateCat, onNavigateDetalhe }: {
  onNavigateCat: (cat: { label: string; icon: string }) => void;
  onNavigateDetalhe: (service: Servico) => void;
}) {
  const t = useT();
  const lang = useLang();
  const [tab,    setTab]    = useState<'servicos' | 'avancada'>('servicos');
  const [query,  setQuery]  = useState('');

  // Estado da consulta avançada
  const [avServico,    setAvServico]    = useState('');
  const [avCategoria,  setAvCategoria]  = useState('');
  const [avCatQuery,   setAvCatQuery]   = useState('');
  const [avCatOpen,    setAvCatOpen]    = useState(false);
  const [avDestino,    setAvDestino]    = useState('');
  const [avResultados, setAvResultados] = useState<typeof MOCK_SERVICOS_AV | null>(null);
  const [avPage,       setAvPage]       = useState(1);
  const [avPerPage,    setAvPerPage]    = useState(10);
  const avCatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOut(e: MouseEvent) { if (avCatRef.current && !avCatRef.current.contains(e.target as Node)) setAvCatOpen(false); }
    document.addEventListener('mousedown', onOut);
    return () => document.removeEventListener('mousedown', onOut);
  }, []);


  function handleAvConsultar() {
    let res = MOCK_SERVICOS_AV;
    if (avServico.trim()) res = res.filter(r => r.servico.toLowerCase().includes(avServico.toLowerCase()));
    if (avCategoria) res = res.filter(r => r.categoria === avCategoria);
    if (avDestino) res = res.filter(r => r.destino.includes(avDestino));
    setAvResultados(res);
    setAvPage(1);
  }

  function handleAvLimpar() { setAvServico(''); setAvCategoria(''); setAvCatQuery(''); setAvDestino(''); setAvResultados(null); setAvPage(1); }

  const catOptions = categories.map(c => c.label).filter(l => !avCatQuery || l.toLowerCase().includes(avCatQuery.toLowerCase()));
  const totalAv    = avResultados?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalAv / avPerPage));
  const avSlice    = avResultados?.slice((avPage - 1) * avPerPage, avPage * avPerPage) ?? [];

  const results = query.trim()
    ? ALL_SERVICES.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : [];

  const tabBtn = (active: boolean): React.CSSProperties => ({
    background: 'none', border: 'none', borderBottom: active ? '3px solid var(--primary-pure)' : '3px solid transparent',
    padding: '10px 16px', fontWeight: active ? 700 : 400,
    fontSize: 14, color: active ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)', cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'color 0.12s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>

      {/* Título */}
      <div>
        <h1 style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-ink-strong)', margin: '0 0 4px 0' }}>
          {t('solicitacaoServicos')}
        </h1>
        <p style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-down)', margin: 0 }}>
          {t('solicitacaoDesc')}
        </p>
      </div>

      {/* Barra de tabs separada */}
      <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: '8px 24px', display: 'flex', gap: 0 }}>
        <button style={tabBtn(tab === 'servicos')}  onClick={() => setTab('servicos')}>Serviços</button>
        <button style={tabBtn(tab === 'avancada')}  onClick={() => setTab('avancada')}>Consulta avançada</button>
      </div>

      {/* Card de conteúdo */}
      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 8, overflow: 'hidden', boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>

        {tab === 'servicos' && (
          <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Busca */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <p style={{ fontWeight: 600, fontSize: 15, color: 'var(--colors-neutral-01)', margin: 0 }}>
                O que você procura?
              </p>
              <div style={{ width: '100%', maxWidth: 760, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--primary-pure)', borderRadius: 8, overflow: 'hidden', background: 'white', height: 48 }}>
                  <input
                    value={query} placeholder="Digite o serviço desejado..."
                    onChange={e => { setQuery(e.target.value); }}
                    style={{ flex: 1, border: 'none', outline: 'none', padding: '0 16px', fontSize: 14, color: 'var(--neutral-dark-pure)', background: 'transparent' }}
                  />
                  <div style={{ width: 48, height: 48, background: 'var(--primary-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                    <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 18, color: 'white' }} />
                  </div>
                </div>
                {/* Dropdown resultados */}
                {query.trim() && results.length > 0 && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 100, overflow: 'hidden' }}>
                    {results.slice(0, 8).map((s, i) => (
                      <div key={s} onClick={() => setQuery(s)}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', cursor: 'pointer', background: 'white', borderBottom: i < Math.min(results.length, 8) - 1 ? '1px solid var(--neutral-light-medium)' : 'none', fontSize: 14, color: 'var(--neutral-dark-pure)', transition: 'background 0.1s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
                      >
                        <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 13, color: 'var(--neutral-dark-up)', flexShrink: 0 }} />
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Resultados de serviços ao filtrar */}
            {query.trim() && results.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--card-border)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--bg-subtle)', fontWeight: 700, fontSize: 14, color: 'var(--colors-neutral-01)' }}>
                  {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </div>
                {results.map((s, i) => (
                  <div key={s}
                    onClick={() => { const svc = MOCK_SERVICOS_AV.find(m => m.servico === s); if (svc) onNavigateDetalhe(svc); }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: i % 2 === 0 ? 'white' : 'var(--bg-subtle)', borderBottom: i < results.length - 1 ? '1px solid var(--neutral-light-medium)' : 'none', cursor: 'pointer', transition: 'background 0.1s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-hover)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = i % 2 === 0 ? 'white' : 'var(--bg-subtle)'; }}
                  >
                    <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)' }}>{s}</span>
                    <FAIcon icon="fa-regular fa-angle-right" style={{ fontSize: 14, color: 'var(--neutral-dark-medium)' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Grade de categorias */}
            {!query.trim() && (
              <>
                <p style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-down)', margin: 0, textAlign: 'center' }}>
                  Navegue pelas categorias e encontre o serviço desejado:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12 }}>
                  {categories.map((cat) => (
                    <div key={lang === 'en' ? cat.labelEn : lang === 'es' ? cat.labelEs : cat.label} onClick={() => onNavigateCat({ label: cat.label, icon: cat.icon })}
                      style={{ background: 'white', border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0px 2px 6px rgba(24,39,75,0.08)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
                    >
                      <FAIcon icon={cat.icon} style={{ fontSize: 40, color: 'var(--primary-medium)' }} />
                      <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--colors-neutral-01)', textAlign: 'center', lineHeight: 1.3 }}>{lang === 'en' ? cat.labelEn : lang === 'es' ? cat.labelEs : cat.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        )}

        {tab === 'avancada' && (
          <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Formulário de filtros */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Serviço */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontWeight: 600, fontSize: 11, color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Serviço</label>
                <input value={avServico} onChange={e => setAvServico(e.target.value)} placeholder="Nome do serviço..."
                  style={{ height: 44, border: '1px solid var(--neutral-light-down)', borderRadius: 6, padding: '0 12px', fontSize: 14, color: 'var(--neutral-dark-pure)', outline: 'none', width: '100%' }} />
              </div>

              {/* Linha: Categoria | rgão | A quem se destina */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>

                {/* Categoria com busca */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, position: 'relative' }} ref={avCatRef}>
                  <label style={{ fontWeight: 600, fontSize: 11, color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Categoria</label>
                  <div onClick={() => setAvCatOpen(o => !o)}
                    style={{ height: 44, border: '1px solid var(--neutral-light-down)', borderRadius: 6, padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'white' }}>
                    <span style={{ fontSize: 14, color: avCategoria ? 'var(--neutral-dark-pure)' : 'var(--neutral-dark-up)' }}>{avCategoria || 'Todas as categorias'}</span>
                    <FAIcon icon="fa-regular fa-chevron-down" style={{ fontSize: 11, color: 'var(--neutral-label)' }} />
                  </div>
                  {avCatOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200, background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', overflow: 'hidden', marginTop: 4 }}>
                      <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--neutral-light-medium)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--neutral-light-down)', borderRadius: 6, padding: '0 10px', height: 34 }}>
                          <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 12, color: 'var(--neutral-dark-up)', flexShrink: 0 }} />
                          <input autoFocus value={avCatQuery} onChange={e => setAvCatQuery(e.target.value)} placeholder="Buscar categoria..."
                            style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: 'var(--neutral-dark-pure)', background: 'transparent' }} />
                        </div>
                      </div>
                      <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                        <div onClick={() => { setAvCategoria(''); setAvCatOpen(false); setAvCatQuery(''); }}
                          style={{ padding: '9px 12px', cursor: 'pointer', fontSize: 13, color: !avCategoria ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)', fontWeight: !avCategoria ? 600 : 400, borderBottom: '1px solid var(--neutral-light-medium)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                          Todas as categorias
                        </div>
                        {catOptions.map(c => (
                          <div key={c} onClick={() => { setAvCategoria(c); setAvCatOpen(false); setAvCatQuery(''); }}
                            style={{ padding: '9px 12px', cursor: 'pointer', fontSize: 13, color: avCategoria === c ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)', fontWeight: avCategoria === c ? 600 : 400, borderBottom: '1px solid var(--neutral-light-medium)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                            {c}
                            {avCategoria === c && <FAIcon icon="fa-solid fa-check" style={{ fontSize: 11, color: 'var(--primary-pure)' }} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* rgão Responsável */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <label style={{ fontWeight: 600, fontSize: 11, color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>rgão responsável</label>
                  <div style={{ position: 'relative' }}>
                    <select style={{ width: '100%', height: 44, border: '1px solid var(--neutral-light-down)', borderRadius: 6, padding: '0 32px 0 12px', fontSize: 14, color: 'var(--neutral-dark-pure)', background: 'white', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Todos</option>
                      <option value="PMF">PMF - Prefeitura Municipal de Florianópolis</option>
                    </select>
                    <FAIcon icon="fa-regular fa-chevron-down" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--neutral-label)', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* A quem se destina */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <label style={{ fontWeight: 600, fontSize: 11, color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>A quem se destina</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: 44, border: '1px solid var(--neutral-light-down)', borderRadius: 6, background: 'white', overflow: 'hidden' }}>
                    <select
                      value={avDestino}
                      onChange={e => setAvDestino(e.target.value)}
                      style={{ width: '100%', height: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: 14, color: avDestino ? 'var(--neutral-dark-pure)' : 'var(--neutral-dark-up)', padding: '0 36px 0 12px', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="">Todos os públicos</option>
                      <option value="Cidadão">{t('destinoCidadao')}</option>
                      <option value="Empresa">{t('destinoEmpresa')}</option>
                      <option value="Visitante">{t('destinoVisitante')}</option>
                    </select>
                    <FAIcon icon="fa-regular fa-chevron-down" style={{ position: 'absolute', right: 12, fontSize: 11, color: 'var(--neutral-label)', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <Button size="md" variant="secondary" onClick={handleAvLimpar}>{t('limpar')}</Button>
                <Button size="md" variant="primary"   onClick={handleAvConsultar}>{t('consultar')}</Button>
              </div>
            </div>

            {/* Estado vazio (antes de pesquisar) */}
            {avResultados === null && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px', background: 'var(--bg-subtle)', borderRadius: 8, border: '1px solid var(--bg-subtle)' }}>
                <div style={{ width: 64, height: 64, background: 'var(--primary-bg-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FAIcon icon="fa-regular fa-magnifying-glass-plus" style={{ fontSize: 24, color: 'var(--primary-pure)' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink)', marginBottom: 4 }}>Pesquise um serviço</div>
                  <div style={{ fontWeight: 400, fontSize: 13, color: 'var(--neutral-label)' }}>Use os filtros acima para encontrar o serviço desejado</div>
                </div>
              </div>
            )}

            {/* Resultados */}
            {avResultados !== null && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* Cabeçalho resultado + exportar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--colors-neutral-01)' }}>
                    {totalAv} resultado{totalAv !== 1 ? 's' : ''} encontrado{totalAv !== 1 ? 's' : ''}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--neutral-dark-medium)' }}>Exportar:</span>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'var(--primary-pure)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                      <FAIcon icon="fa-regular fa-file-pdf" style={{ fontSize: 13 }} /> Documento em PDF
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'var(--success-btn)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                      <FAIcon icon="fa-regular fa-file-spreadsheet" style={{ fontSize: 13 }} /> Planilha em XLS
                    </button>
                  </div>
                </div>

                {/* Sem resultados */}
                {totalAv === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px', background: 'var(--bg-subtle)', borderRadius: 8, border: '1px solid var(--bg-subtle)' }}>
                    <div style={{ width: 64, height: 64, background: 'var(--primary-bg-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FAIcon icon="fa-regular fa-file-slash" style={{ fontSize: 24, color: 'var(--primary-pure)' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink)', marginBottom: 4 }}>Nenhum serviço encontrado</div>
                      <div style={{ fontWeight: 400, fontSize: 13, color: 'var(--neutral-label)' }}>Tente ajustar os filtros e pesquisar novamente</div>
                    </div>
                  </div>
                )}

                {/* Tabela */}
                {totalAv > 0 && (
                  <div style={{ border: '1px solid var(--card-border)', borderRadius: 8, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <colgroup>
                        <col style={{ width: '22%' }} />
                        <col style={{ width: '18%' }} />
                        <col style={{ width: '18%' }} />
                        <col style={{ width: '26%' }} />
                        <col style={{ width: '12%' }} />
                        <col style={{ width: '4%' }} />
                      </colgroup>
                      <thead>
                        <tr style={{ background: 'var(--bg-subtle)' }}>
                          {['Serviço', 'Categoria', 'rgão responsável', 'Setor responsável', 'A quem se destina', ''].map((h, i) => (
                            <th key={h || `col-${i}`} style={{ fontWeight: 600, fontSize: 13, color: 'var(--neutral-dark-down)', padding: '12px 14px', textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                              {h}{i === 0 && <FAIcon icon="fa-regular fa-arrow-up" style={{ fontSize: 10, marginLeft: 4, color: 'var(--neutral-dark-up)' }} />}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {avSlice.map((row, i) => (
                          <tr key={row.servico} style={{ borderBottom: '1px solid var(--bg-subtle)', background: i % 2 === 0 ? 'white' : 'var(--bg-subtle)', cursor: 'pointer', transition: 'background 0.1s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--primary-bg-hover)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? 'white' : 'var(--bg-subtle)'; }}>
                            <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--primary-pure)', fontWeight: 500 }}>{row.servico}</td>
                            <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--primary-pure)' }}>{row.categoria}</td>
                            <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--primary-pure)' }}>PMF - Prefeitura Municipal de Florianópolis</td>
                            <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--primary-pure)' }}>{row.setor}</td>
                            <td style={{ padding: '11px 14px', fontSize: 13, color: 'var(--primary-pure)' }}>{row.destino.join(', ')}</td>
                            <td style={{ padding: '11px 14px', textAlign: 'center' }}>
                              <div style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                <FAIcon icon="fa-solid fa-eye" style={{ fontSize: 14, color: 'var(--primary-pure)', cursor: 'pointer' }} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Rodapé: por página + paginação */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '12px 16px', borderTop: '1px solid var(--bg-subtle)', gap: 20, background: 'white' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 13, color: 'var(--neutral-dark-medium)' }}>Quantidade por página</span>
                        <select value={avPerPage} onChange={e => { setAvPerPage(Number(e.target.value)); setAvPage(1); }}
                          style={{ height: 30, border: '1px solid var(--neutral-light-down)', borderRadius: 4, padding: '0 8px', fontSize: 13, color: 'var(--neutral-dark-pure)', cursor: 'pointer', outline: 'none' }}>
                          {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <span style={{ fontSize: 13, color: 'var(--neutral-dark-medium)' }}>
                        {(avPage - 1) * avPerPage + 1}{Math.min(avPage * avPerPage, totalAv)} de {totalAv}
                      </span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => setAvPage(p => Math.max(1, p - 1))} disabled={avPage === 1}
                          style={{ width: 30, height: 30, border: '1px solid var(--neutral-light-down)', borderRadius: 4, background: 'white', cursor: avPage === 1 ? 'default' : 'pointer', color: avPage === 1 ? 'var(--neutral-dark-up)' : 'var(--neutral-dark-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FAIcon icon="fa-regular fa-chevron-left" style={{ fontSize: 12 }} />
                        </button>
                        <button onClick={() => setAvPage(p => Math.min(totalPages, p + 1))} disabled={avPage === totalPages}
                          style={{ width: 30, height: 30, border: '1px solid var(--neutral-light-down)', borderRadius: 4, background: 'white', cursor: avPage === totalPages ? 'default' : 'pointer', color: avPage === totalPages ? 'var(--neutral-dark-up)' : 'var(--neutral-dark-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FAIcon icon="fa-regular fa-chevron-right" style={{ fontSize: 12 }} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


