import React, { useState } from 'react';
import { useT } from '../i18n';
import { Servico } from '../types';
import FAIcon from '../components/FAIcon';
import { MOCK_SERVICOS_AV } from '../mocks';
//  Tela: Categoria de serviços 
export default function CatServicos({ catLabel, catIcon, onNavigateDetalhe, onNavigateForm }: {
  catLabel: string;
  catIcon: string;
  onNavigateDetalhe: (service: Servico) => void;
  onNavigateForm:    (service: Servico) => void;
}) {
  const t = useT();
  const [search, setSearch] = useState('');

  const catServices = MOCK_SERVICOS_AV.filter(s => s.categoria === catLabel);
  const filtered    = search.trim()
    ? catServices.filter(s => s.servico.toLowerCase().includes(search.toLowerCase()))
    : catServices;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>

      {/* Cabealho da categoria */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 60, height: 60, background: 'var(--primary-light)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0px 2px 8px rgba(24,39,75,0.10)' }}>
          <i className={catIcon} style={{ fontSize: 30, color: 'var(--primary-pure)' }} />
        </div>
        <div>
          <h1 style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-ink-strong)', margin: 0 }}>{catLabel}</h1>
          <p style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-medium)', margin: '4px 0 0 0' }}>
            {filtered.length} {filtered.length !== 1 ? t('solServicosDisp') : t('solServicoDisp')} {filtered.length !== 1 ? t('solDispPlural') : t('solDispSingular')}
          </p>
        </div>
      </div>

      {/* Busca */}
      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--primary-pure)', borderRadius: 8, overflow: 'hidden', background: 'white', height: 48 }}>
        <input
          value={search}
          placeholder={t('solTituloBusca')}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', padding: '0 16px', fontSize: 14, color: 'var(--neutral-dark-pure)', background: 'transparent' }}
        />
        <div style={{ width: 48, height: 48, background: 'var(--primary-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 18, color: 'white' }} />
        </div>
      </div>

      {/* Lista de serviços */}
      {filtered.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '48px 24px', background: 'white', borderRadius: 8, border: '1px solid var(--card-border)' }}>
          <div style={{ width: 64, height: 64, background: 'var(--primary-bg-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FAIcon icon="fa-regular fa-file-slash" style={{ fontSize: 24, color: 'var(--primary-pure)' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink)' }}>{t('solNenhumTitle')}</div>
          <div style={{ fontSize: 13, color: 'var(--neutral-label)' }}>{t('solNenhumDesc')}</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
          {filtered.map((svc) => (
            <div key={svc.servico}
              style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0px 2px 6px rgba(24,39,75,0.06)', transition: 'box-shadow 0.15s, border-color 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 4px 14px rgba(24,39,75,0.12)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border-hover)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 2px 6px rgba(24,39,75,0.06)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--card-border)'; }}
            >
              {/* Linha 1: cone + ttulo */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 36, height: 36, background: 'var(--icon-bg)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FAIcon icon="fa-regular fa-file-lines" style={{ fontSize: 16, color: 'var(--primary-pure)' }} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--neutral-ink)', lineHeight: '20px', paddingTop: 8 }}>{svc.servico}</div>
              </div>

              {/* Chips de meta */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, color: 'var(--primary-pure)', background: 'var(--primary-bg-hover)', borderRadius: 100, padding: '2px 9px', fontWeight: 600 }}>
                  {svc.setor.split('/')[0]}
                </span>
                {svc.destino.map((d, di) => (
                  <span key={di} style={{ fontSize: 10, color: 'var(--neutral-dark-down)', background: 'var(--background-color-light)', borderRadius: 100, padding: '2px 9px', fontWeight: 600 }}>
                    {d}
                  </span>
                ))}
              </div>

              {/* Botes */}
              <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                <button onClick={() => onNavigateDetalhe(svc)}
                  style={{ flex: 1, height: 32, border: '1.5px solid var(--primary-pure)', borderRadius: 6, background: 'white', color: 'var(--primary-pure)', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-bg-hover)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
                >
                  {t('solMaisInfo')}
                </button>
                <button onClick={() => onNavigateForm(svc)}
                  style={{ flex: 1, height: 32, border: 'none', borderRadius: 6, background: 'var(--primary-pure)', color: 'white', fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure-hover)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure)'; }}
                >
                  {t('solSolicitar')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



