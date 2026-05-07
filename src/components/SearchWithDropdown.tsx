import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Input } from '@1doc/1ds-react';
import { useT, useLang } from '../i18n';
import { ALL_SERVICES } from '../mocks';
import FAIcon from './FAIcon';

export default function SearchWithDropdown() {
  const t = useT();
  const lang = useLang();
  const [query, setQuery]             = useState('');
  const [open, setOpen]               = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef                    = useRef<HTMLDivElement>(null);

  const results = useMemo(() => query.trim().length === 0
    ? []
    : ALL_SERVICES[lang].filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8),
  [query, lang]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlighted(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
    setHighlighted(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter' && highlighted >= 0) { setQuery(results[highlighted]); setOpen(false); }
    else if (e.key === 'Escape') { setOpen(false); }
  }

  function handleSelect(label: string) { setQuery(label); setOpen(false); setHighlighted(-1); }

  function highlightMatch(text: string) {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (<>{text.slice(0, idx)}<strong style={{ color: 'var(--primary-pure)' }}>{text.slice(idx, idx + query.length)}</strong>{text.slice(idx + query.length)}</>);
  }

  return (
    <div ref={wrapperRef} style={{ width: '100%', position: 'relative' }}>
      <Input
        placeholder={t('swdPlaceholder')}
        fullWidth size="md" type="search"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown as React.KeyboardEventHandler<HTMLInputElement>}
        onFocus={() => query.trim() && setOpen(true)}
        iconsRight={[{ icon: <FAIcon icon="fa-regular fa-magnifying-glass" style={{ color: 'var(--neutral-dark-medium)' }} /> }]}
      />
      {open && results.length > 0 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 100, overflow: 'hidden' }}>
          {results.map((service, i) => (
            <div key={service} onMouseDown={() => handleSelect(service)} onMouseEnter={() => setHighlighted(i)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', cursor: 'pointer', background: highlighted === i ? 'var(--primary-bg-subtle)' : 'white', borderBottom: i < results.length - 1 ? '1px solid var(--neutral-light-medium)' : 'none', fontSize: 14, color: 'var(--neutral-dark-pure)', transition: 'background 0.1s' }}>
              <FAIcon icon="fa-regular fa-magnifying-glass" style={{ color: 'var(--neutral-dark-up)', fontSize: 13, flexShrink: 0 }} />
              <span>{highlightMatch(service)}</span>
            </div>
          ))}
          <div style={{ padding: '8px 16px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--neutral-light-medium)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--neutral-dark-medium)' }}>
            <FAIcon icon="fa-regular fa-circle-info" style={{ fontSize: 12 }} />
            <span>{t('swdPressEnter')}</span>
          </div>
        </div>
      )}
    </div>
  );
}

