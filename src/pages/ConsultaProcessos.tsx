import React, { useState } from 'react';
import { Button } from '@1doc/1ds-react';
import { useT, useIsMobile } from '../i18n';
import { consultasRecentes, ORGAOS, PROCEDENCIAS } from '../mocks';
import FAIcon from '../components/FAIcon';
import ConsultaRow from '../components/ConsultaRow';
import InfoTooltip from '../components/InfoTooltip';
import { FormSegment, SearchableSelect, MobileFormField } from '../components/FormComponents';

export default function ConsultaProcessos({ onNavigateProcesso }: { onNavigateProcesso: () => void }) {
  const t = useT();
  const isMobile = useIsMobile();
  const [orgao,       setOrgao]       = useState(ORGAOS[0]);
  const [procedencia, setProcedencia] = useState(PROCEDENCIAS[0]);
  const [numero,      setNumero]      = useState('');
  const [ano,         setAno]         = useState('');
  const [resultados,  setResultados]  = useState<typeof consultasRecentes | null>(null);

  function handleLimpar() { setOrgao(ORGAOS[0]); setProcedencia(PROCEDENCIAS[0]); setNumero(''); setAno(''); setResultados(null); }

  function handleConsultar() {
    const found = consultasRecentes.filter(c => {
      const numMatch = !numero || c.numero.toLowerCase().includes(numero.toLowerCase());
      const anoMatch = !ano    || c.numero.includes(ano);
      return numMatch && anoMatch;
    });
    setResultados(found);
  }

  const visibleNumeros = new Set(resultados?.map(r => r.numero) ?? []);
  const showEmpty     = resultados === null;
  const showNoResults = resultados !== null && resultados.length === 0;
  const showResults   = resultados !== null && resultados.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: isMobile ? '16px 16px 48px 16px' : '24px 24px 48px 24px' }}>

      <div>
        <h1 style={{ fontWeight: 700, fontSize: isMobile ? 20 : 24, color: 'var(--neutral-ink-strong)', margin: '0 0 8px 0' }}>{t('consultaTitle')}</h1>
        <p style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-down)', margin: 0, lineHeight: '22px', maxWidth: 820 }}>
          {t('consultaDesc')}
        </p>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 8, padding: isMobile ? '16px' : '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink)', margin: 0 }}>{t('numeroProcesso')}</h2>
          <InfoTooltip text={t('tooltipProcesso')} />
        </div>
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <MobileFormField label={t('orgao')}>
              <select value={orgao} onChange={e => setOrgao(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: 'var(--neutral-ink)', padding: 0 }}>
                {ORGAOS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </MobileFormField>
            <MobileFormField label={t('procedencia')}>
              <select value={procedencia} onChange={e => setProcedencia(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: 'var(--neutral-ink)', padding: 0 }}>
                {PROCEDENCIAS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </MobileFormField>
            <div style={{ display: 'flex', gap: 10 }}>
              <MobileFormField label={t('numero')} style={{ flex: 1 }}>
                <input value={numero} onChange={e => setNumero(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="000000" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: 'var(--neutral-ink)', padding: 0 }} />
              </MobileFormField>
              <MobileFormField label={t('ano')} style={{ width: 90 }}>
                <input value={ano} onChange={e => setAno(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="2026" style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: 'var(--neutral-ink)', padding: 0 }} />
              </MobileFormField>
            </div>
          </div>
        ) : (
          <div style={{ display: 'inline-flex', alignItems: 'stretch', alignSelf: 'flex-start', border: '1.5px solid var(--primary-pure)', borderRadius: 8, overflow: 'hidden', background: 'white', minHeight: 58 }}>
            <SearchableSelect label={t('orgao')}       value={orgao}       onChange={setOrgao}       options={ORGAOS}       width={150} />
            <SearchableSelect label={t('procedencia')} value={procedencia} onChange={setProcedencia} options={PROCEDENCIAS} width={160} />
            <FormSegment   label={t('numero')}      value={numero}      onChange={v => setNumero(v.replace(/\D/g, '').slice(0, 10))}  placeholder="000000" width={120} center />
            <FormSegment   label={t('ano')}         value={ano}         onChange={v => setAno(v.replace(/\D/g, '').slice(0, 4))}       placeholder="2026"   width={72} center last />
          </div>
        )}
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="md" variant="primary"   onClick={handleConsultar}>{t('consultar')}</Button>
          <Button size="md" variant="secondary" onClick={handleLimpar}>{t('limpar')}</Button>
        </div>
      </div>

      {/* Estado vazio */}
      {showEmpty && (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '20px 24px' }}>
          <div style={{ width: 56, height: 56, background: 'var(--icon-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FAIcon icon="fa-regular fa-magnifying-glass-plus" style={{ fontSize: 22, color: 'var(--primary-pure)' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--neutral-ink)', marginBottom: 3 }}>{t('pesquiseProcesso')}</div>
            <div style={{ fontWeight: 400, fontSize: 12, color: 'var(--neutral-label)', maxWidth: 420 }}>{t('pesquiseDesc')}</div>
          </div>
        </div>
      )}

      {/* Sem resultados */}
      {showNoResults && (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '20px 24px' }}>
          <div style={{ width: 56, height: 56, background: 'var(--icon-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FAIcon icon="fa-regular fa-file-slash" style={{ fontSize: 22, color: 'var(--primary-pure)' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--neutral-ink)', marginBottom: 3 }}>{t('nenhumProcesso')}</div>
            <div style={{ fontWeight: 400, fontSize: 12, color: 'var(--neutral-label)' }}>{t('nenhumDesc')}</div>
          </div>
        </div>
      )}

      {/* Resultados */}
      {showResults && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--colors-neutral-01)' }}>{t('resultados')}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {consultasRecentes.filter(r => visibleNumeros.has(r.numero)).map(r => (
              <ConsultaRow key={r.numero} numero={r.numero} data={r.data} descricao={r.descricao} status={r.status} onClick={onNavigateProcesso} />
            ))}
          </div>
        </div>
      )}

      {/* Consultas recentes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--colors-neutral-01)' }}>{t('consultasRecentes')}</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {consultasRecentes.map(c => (
            <ConsultaRow key={c.numero} numero={c.numero} data={c.data} descricao={c.descricao} status={c.status} onClick={onNavigateProcesso} />
          ))}
        </div>
      </div>
    </div>
  );
}

