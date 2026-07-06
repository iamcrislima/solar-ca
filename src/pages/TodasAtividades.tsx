import React, { useState, useEffect, useRef } from 'react';
import { useT, useIsMobile } from '../i18n';
import type { AtividadeTipo } from '../mocks';
import { MOCK_ATIVIDADES, ATIVIDADE_TIPOS, ATIVIDADE_TIPO_META } from '../mocks';
import FAIcon from '../components/FAIcon';

const PAGE = 12; // itens carregados por vez (scroll infinito)

export default function TodasAtividades() {
  const t = useT();
  const isMobile = useIsMobile();
  const tt = t as (k: string) => string; // labels de tipo vêm de chaves dinâmicas

  const [filtro,  setFiltro]  = useState<AtividadeTipo | 'todos'>('todos');
  const [visible, setVisible] = useState(PAGE);
  const [loading, setLoading] = useState(false);
  const rootRef     = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const filtradas = filtro === 'todos' ? MOCK_ATIVIDADES : MOCK_ATIVIDADES.filter(a => a.tipo === filtro);
  const mostradas = filtradas.slice(0, visible);
  const hasMore   = visible < filtradas.length;

  // Scroll infinito por listener de scroll + posição do sentinela (robusto em qualquer
  // ambiente). Enquanto `loading` é true o listener fica desligado (guard) e é religado
  // ao terminar, encadeando páginas seguidas se o sentinela continuar próximo do fim.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || loading) return;

    // acha o ancestral rolável (o portal rola num container interno, não na window)
    function getScrollParent(node: HTMLElement | null): HTMLElement | null {
      let p = node?.parentElement ?? null;
      while (p) {
        const oy = getComputedStyle(p).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && p.scrollHeight > p.clientHeight) return p;
        p = p.parentElement;
      }
      return null;
    }
    const scroller: HTMLElement | Window = getScrollParent(rootRef.current) ?? window;

    function check() {
      const rect = el!.getBoundingClientRect();
      if (rect.top <= window.innerHeight + 200) {
        setLoading(true);
        window.setTimeout(() => { setVisible(v => v + PAGE); setLoading(false); }, 500);
      }
    }
    scroller.addEventListener('scroll', check, { passive: true } as AddEventListenerOptions);
    const id = window.setTimeout(check, 120); // conteúdo curto / após troca de filtro
    return () => { scroller.removeEventListener('scroll', check as EventListener); window.clearTimeout(id); };
  }, [hasMore, loading, filtro, visible]);

  function selecionarFiltro(f: AtividadeTipo | 'todos') {
    setFiltro(f);
    setVisible(PAGE);
    setLoading(false);
  }

  const chips: { key: AtividadeTipo | 'todos'; label: string; icon?: string; color?: string }[] = [
    { key: 'todos', label: t('atvTodos') },
    ...ATIVIDADE_TIPOS.map(tp => ({ key: tp.key, label: tt(tp.labelKey), icon: tp.icon, color: tp.color })),
  ];

  return (
    <div ref={rootRef} style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: isMobile ? '16px 16px 48px 16px' : '24px 24px 48px 24px' }}>
      {/* Cabeçalho */}
      <div>
        <h1 style={{ fontWeight: 700, fontSize: isMobile ? 20 : 24, color: 'var(--neutral-ink-strong)', margin: '0 0 6px 0' }}>{t('atvTitle')}</h1>
        <p style={{ fontSize: 14, color: 'var(--neutral-dark-down)', margin: 0, lineHeight: 1.5, maxWidth: 820 }}>{t('atvDesc')}</p>
      </div>

      {/* Filtro por tipo */}
      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: '14px 16px', boxShadow: '0px 2px 8px rgba(24,39,75,0.06)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--neutral-label)', marginBottom: 10 }}>{t('atvFiltrarTipo')}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {chips.map(chip => {
            const active = filtro === chip.key;
            return (
              <button
                key={chip.key}
                onClick={() => selecionarFiltro(chip.key)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '7px 14px', borderRadius: 20, cursor: 'pointer',
                  border: `1.5px solid ${active ? 'var(--primary-pure)' : 'var(--card-border)'}`,
                  background: active ? 'var(--primary-bg-hover)' : 'white',
                  color: active ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)',
                  fontWeight: 600, fontSize: 12, whiteSpace: 'nowrap', transition: 'all 0.12s',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--card-border-hover)'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--card-border)'; }}
              >
                {chip.icon && <FAIcon icon={chip.icon} style={{ fontSize: 12, color: active ? 'var(--primary-pure)' : chip.color }} />}
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contador */}
      <div style={{ fontSize: 13, color: 'var(--neutral-dark-medium)' }}>
        {filtradas.length} {t('atvContador')}
      </div>

      {/* Lista */}
      {filtradas.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 64, height: 64, background: 'var(--primary-bg-hover)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FAIcon icon="fa-regular fa-clock-rotate-left" style={{ fontSize: 24, color: 'var(--primary-pure)' }} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--neutral-ink)' }}>{t('atvNenhuma')}</div>
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: '4px 20px', boxShadow: '0px 2px 8px rgba(24,39,75,0.07)' }}>
          {mostradas.map((at, i) => {
            const meta = ATIVIDADE_TIPO_META[at.tipo];
            return (
              <div key={at.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderBottom: i < mostradas.length - 1 ? '1px solid var(--neutral-light-medium)' : 'none' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: meta.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FAIcon icon={meta.icon} style={{ fontSize: 15, color: meta.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--neutral-ink)', lineHeight: 1.4 }}>{at.text}</div>
                  <div style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', marginTop: 2 }}>
                    <span style={{ color: meta.color, fontWeight: 600 }}>{tt(meta.labelKey)}</span> · {at.ref} · {at.date}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sentinela + indicador de carregamento / fim */}
      {filtradas.length > 0 && (
        <div ref={sentinelRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px 0 4px', minHeight: 32 }}>
          {loading && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--neutral-dark-medium)', fontSize: 13 }}>
              <FAIcon icon="fa-regular fa-spinner-third" style={{ fontSize: 16, color: 'var(--primary-pure)', animation: 'atvSpin 0.7s linear infinite' }} />
              {t('atvCarregando')}
            </div>
          )}
          {!hasMore && !loading && (
            <span style={{ fontSize: 12, color: 'var(--neutral-dark-up)' }}>{t('atvFimLista')}</span>
          )}
        </div>
      )}

      <style>{`@keyframes atvSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
