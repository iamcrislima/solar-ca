import React, { useState } from 'react';
import { Button } from '@1doc/1ds-react';
import { useT, useIsMobile } from '../i18n';
import { ORGAOS, PROCEDENCIAS } from '../mocks';
import FAIcon from '../components/FAIcon';
import InfoTooltip from '../components/InfoTooltip';
import { FormSegment, SearchableSelect, MobileFormField } from '../components/FormComponents';

export default function ConsultaDocumentos() {
  const t = useT();
  const isMobile = useIsMobile();
  const [orgao,       setOrgao]       = useState(ORGAOS[0]);
  const [procedencia, setProcedencia] = useState(PROCEDENCIAS[0]);
  const [numero,      setNumero]      = useState('');
  const [ano,         setAno]         = useState('');
  const [codigo,      setCodigo]      = useState('');

  function handleLimpar() { setOrgao(ORGAOS[0]); setProcedencia(PROCEDENCIAS[0]); setNumero(''); setAno(''); setCodigo(''); }
  function handleConsultar() { /* busca */ }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: isMobile ? '16px 16px 48px 16px' : '24px 24px 48px 24px' }}>

      <div>
        <h1 style={{ fontWeight: 700, fontSize: isMobile ? 20 : 24, color: 'var(--neutral-ink-strong)', margin: '0 0 8px 0' }}>{t('docTitle')}</h1>
        <p style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-down)', margin: 0, lineHeight: '22px', maxWidth: 820 }}>
          {t('docDesc')}
        </p>
      </div>

      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 8, padding: isMobile ? '16px' : '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>

          {/* Linha: Número do processo + Código do documento (mesma altura) */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'flex-end', gap: 16, flexWrap: isMobile ? 'nowrap' : 'wrap' }}>

            {/* Número do processo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink)' }}>{t('numeroProcesso')}</span>
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
                  <FormSegment   label={t('ano')}         value={ano}         onChange={v => setAno(v.replace(/\D/g, '').slice(0, 4))}       placeholder="2026" width={72} center last />
                </div>
              )}
            </div>

            {/* Código do documento */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink)' }}>{t('codigoDoc')}</span>
                <InfoTooltip text={t('tooltipDocumento')} />
              </div>
              {isMobile ? (
                <MobileFormField label={t('codigoDoc')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Ex: 00U61ULQ" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 15, color: 'var(--neutral-ink)', padding: 0 }} />
                    <FAIcon icon="fa-regular fa-barcode-scan" style={{ color: 'var(--neutral-dark-medium)', fontSize: 16 }} />
                  </div>
                </MobileFormField>
              ) : (
                <div style={{ display: 'inline-flex', alignItems: 'stretch', alignSelf: 'flex-start', border: '1.5px solid var(--primary-pure)', borderRadius: 8, overflow: 'hidden', background: 'white', minHeight: 58 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 14px', width: 200 }}>
                    <label style={{ fontWeight: 700, fontSize: 10, color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px' }}>{t('codigoDoc')}</label>
                    <input value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Ex: 00U61ULQ" style={{ border: 'none', outline: 'none', background: 'transparent', fontWeight: 400, fontSize: 15, color: 'var(--neutral-ink)', padding: 0, width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '0 14px', borderLeft: '1px solid var(--card-border-hover)', color: 'var(--neutral-dark-medium)', fontSize: 15 }}>
                    <FAIcon icon="fa-regular fa-barcode-scan" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div style={{ display: 'flex', gap: 10 }}>
            <Button size="md" variant="primary"   onClick={handleConsultar}>{t('consultar')}</Button>
            <Button size="md" variant="secondary" onClick={handleLimpar}>{t('limpar')}</Button>
          </div>
      </div>

    </div>
  );
}

