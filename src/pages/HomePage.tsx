import React from 'react';
import { useT, useIsMobile, useLang } from '../i18n';
import type { Page } from '../types';
import FAIcon from '../components/FAIcon';
import SearchWithDropdown from '../components/SearchWithDropdown';
import { ServiceCard, CategoryCard } from '../components/ServiceCard';
import { imgBannerFloripa, featuredServices, popularServices, categories, MOCK_USER } from '../mocks';
//  Tela: Home 
const MOCK_DASH_ATIVIDADES = [
  { icon: 'fa-regular fa-circle-check',     text: 'Pendência "Assinatura de documentos" concluída',  processo: 'PMF2026/000418', date: '20/04/2026', color: 'var(--success-color)' },
  { icon: 'fa-regular fa-file-circle-plus', text: 'Nova solicitação criada: Alvará de Obra',          processo: 'PMF2026/000501', date: '19/04/2026', color: 'var(--primary-pure)' },
  { icon: 'fa-regular fa-triangle-exclamation', text: 'Pendência de assinatura aguardando ação',   processo: 'PMF2026/000392', date: '18/04/2026', color: 'var(--error-color)' },
  { icon: 'fa-regular fa-folder-open',      text: 'Processo acessado: Ranking de Sustentabilidade',   processo: 'PMF2026/000322', date: '17/04/2026', color: 'var(--neutral-dark-down)' },
];

export default function HomePage({ onNavigateCat, isLoggedIn, onNavigate }: {
  onNavigateCat: (cat: { label: string; icon: string }) => void;
  isLoggedIn: boolean;
  onNavigate: (p: Page) => void;
}) {
  const t = useT();
  const lang = useLang();
  const isMobile = useIsMobile();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isLoggedIn ? 24 : (isMobile ? 24 : 48), padding: isMobile ? '16px 16px 48px 16px' : '16px 24px 48px 24px' }}>

      {/*  Dashboard pós-login  */}
      {isLoggedIn && (
        <>
          {/* Saudação + stats */}
          <div style={{ background: 'var(--hero-gradient)', borderRadius: 12, padding: isMobile ? '20px 20px' : '24px 28px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between', gap: isMobile ? 16 : 24, flexWrap: 'wrap', boxShadow: '0px 4px 16px rgba(0,88,219,0.28)' }}>
            <div>
              <div style={{ fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.80)', marginBottom: 4 }}>{t('dashOla')},</div>
              <div style={{ fontWeight: 700, fontSize: isMobile ? 18 : 22, color: 'white', lineHeight: 1.2 }}>{MOCK_USER.nome}</div>
              <div style={{ fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.70)', marginTop: 4 }}>{t('bemVindo')}</div>
            </div>
            <div style={{ display: 'flex', gap: isMobile ? 10 : 16, flexWrap: 'nowrap' }}>
              {([
                { label: t('dashPendencias'), value: '3', icon: 'fa-regular fa-bell', onClick: () => onNavigate('minhaspendencias') },
                { label: t('dashProcessos'),  value: '7', icon: 'fa-regular fa-folder-open', onClick: () => onNavigate('meusprocessos') },
                { label: t('dashLiberados'),  value: '2', icon: 'fa-regular fa-unlock', onClick: () => onNavigate('processosliberados') },
              ] as { label: string; value: string; icon: string; onClick: () => void }[]).map((stat) => (
                <div
                  key={stat.label}
                  onClick={stat.onClick}
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, padding: isMobile ? '10px 12px' : '14px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: isMobile ? 1 : 'none', minWidth: isMobile ? 0 : 110, cursor: 'pointer', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.25)'}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.15)'}
                >
                  <FAIcon icon={stat.icon} style={{ fontSize: isMobile ? 16 : 18, color: 'rgba(255,255,255,0.80)' }} />
                  <span style={{ fontWeight: 700, fontSize: isMobile ? 22 : 28, color: 'white', lineHeight: 1 }}>{stat.value}</span>
                  <span style={{ fontWeight: 400, fontSize: isMobile ? 10 : 11, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 1.3 }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Acesso rápido */}
          <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', boxShadow: '0px 2px 8px rgba(24,39,75,0.07)' }}>
            <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--colors-neutral-01)', marginRight: 4, whiteSpace: 'nowrap' }}>{t('dashAcessoRapido')}:</span>
            {([
              { label: t('meusProcessos'),     icon: 'fa-regular fa-folder-open', page: 'meusprocessos' as Page },
              { label: t('minhasPendencias'),  icon: 'fa-regular fa-bell',        page: 'minhaspendencias' as Page },
              { label: t('processosLiberados'),icon: 'fa-regular fa-unlock',      page: 'processosliberados' as Page },
              { label: t('solicitacaoServicos'),icon: 'fa-regular fa-file-circle-plus', page: 'solicitacao' as Page },
            ]).map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', border: '1.5px solid var(--card-border)', borderRadius: 20, background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 12, color: 'var(--neutral-dark-pure)', whiteSpace: 'nowrap', transition: 'all 0.12s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-bg-subtle)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--card-border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--neutral-dark-pure)'; (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
              >
                <FAIcon icon={item.icon} style={{ fontSize: 13 }} />
                {item.label}
              </button>
            ))}
          </div>

          {/* ÚÚltimas atividades */}
          <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 20, boxShadow: '0px 2px 8px rgba(24,39,75,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink-strong)' }}>{t('dashHistoricoTitle')}</span>
              <span onClick={() => onNavigate('meusprocessos')} style={{ fontWeight: 600, fontSize: 12, color: 'var(--primary-pure)', cursor: 'pointer', textDecoration: 'underline' }}>{t('dashVerTodos')}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {MOCK_DASH_ATIVIDADES.map((at, i) => (
                <div key={at.processo} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < MOCK_DASH_ATIVIDADES.length - 1 ? '1px solid var(--neutral-light-medium)' : 'none' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: at.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FAIcon icon={at.icon} style={{ fontSize: 15, color: at.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--neutral-ink)', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{at.text}</div>
                    <div style={{ fontSize: 11, color: 'var(--neutral-dark-medium)', marginTop: 2 }}>{at.processo}  {at.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divisor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--card-border)' }} />
            <span style={{ fontSize: 12, color: 'var(--neutral-dark-up)', whiteSpace: 'nowrap' }}>{t('encontreServico')}</span>
            <div style={{ flex: 1, height: 1, background: 'var(--card-border)' }} />
          </div>
        </>
      )}

      {/*  Contedo normal da Home  */}
      {!isLoggedIn && (
        <div style={{ height: isMobile ? 180 : 300, overflow: 'hidden', flexShrink: 0, margin: isMobile ? '-16px -16px 0 -16px' : '-16px -24px 0 -24px' }}>
          <img src={imgBannerFloripa} alt="Florianpolis" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <SearchWithDropdown />
      </div>
      <div style={{ background: 'var(--primary-light)', border: '1px solid var(--primary-medium)', borderRadius: 8, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0px 2px 6px rgba(24,39,75,0.08)' }}>
        <FAIcon icon="fa-regular fa-circle-info" style={{ fontSize: 14, color: 'var(--primary-pure)', flexShrink: 0 }} />
        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--neutral-dark-pure)', lineHeight: '20px' }}>
          {t('iptuDesc')}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 24 }}>
        <ServiceCard title={t('emDestaque')}    items={featuredServices} icon="fa-regular fa-star" />
        <ServiceCard title={t('maisAcessados')} items={popularServices}  icon="fa-regular fa-fire" />
      </div>
      <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: isMobile ? '16px 16px 32px' : '24px 24px 48px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0px 6px 8px rgba(24,39,75,0.12), 0px 8px 16px rgba(24,39,75,0.08)' }}>
        <h2 style={{ fontWeight: 700, fontSize: isMobile ? 18 : 24, color: 'var(--colors-neutral-01)', lineHeight: 1.2, margin: 0 }}>{t('porAssunto')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(180px, 1fr))', gap: isMobile ? 10 : 15 }}>
          {categories.map((cat) => <CategoryCard key={lang === 'en' ? cat.labelEn : lang === 'es' ? cat.labelEs : cat.label} icon={cat.icon} label={lang === 'en' ? cat.labelEn : lang === 'es' ? cat.labelEs : cat.label} onClick={() => onNavigateCat({ label: cat.label, icon: cat.icon })} />)}
        </div>
      </div>
    </div>
  );
}



