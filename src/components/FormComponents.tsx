import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import FAIcon from './FAIcon';

export function FormSegment({ label, value, onChange, placeholder, width, last = false, center = false, maxLength }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; width?: number | string; last?: boolean; center?: boolean; maxLength?: number;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: width ? 'none' : 1, width: width ?? undefined, borderRight: last ? 'none' : '1px solid var(--card-border-hover)', padding: '8px 14px' }}>
      <label style={{ fontWeight: 700, fontSize: 10, color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px', textAlign: center ? 'center' : 'left' }}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} maxLength={maxLength}
        style={{ border: 'none', outline: 'none', background: 'transparent', fontWeight: 400, fontSize: 15, color: 'var(--neutral-ink)', padding: 0, width: '100%', textAlign: center ? 'center' : 'left' }} />
    </div>
  );
}

export function SelectSegment({ label, value, onChange, options, width }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; width?: number | string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 'none', width: width ?? undefined, borderRight: '1px solid var(--card-border-hover)', padding: '8px 14px' }}>
      <label style={{ fontWeight: 700, fontSize: 10, color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px' }}>{label}</label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ border: 'none', outline: 'none', background: 'transparent', fontWeight: 400, fontSize: 15, color: 'var(--neutral-ink)', padding: 0, appearance: 'none', WebkitAppearance: 'none', width: '100%', paddingRight: 20, cursor: 'pointer' }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <FAIcon icon="fa-regular fa-chevron-down" style={{ position: 'absolute', right: 0, fontSize: 11, color: 'var(--neutral-label)', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}

export function SearchableSelect({ label, value, onChange, options, placeholder, width }: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string; width?: number;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    function onOut(e: MouseEvent) {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        !(dropdownRef.current && dropdownRef.current.contains(e.target as Node))
      ) setOpen(false);
    }
    document.addEventListener('mousedown', onOut);
    return () => document.removeEventListener('mousedown', onOut);
  }, []);

  function handleOpen() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropPos({ top: rect.bottom + 4, left: rect.left, width: Math.max(rect.width, 200) });
    }
    setOpen(o => !o);
    setSearch('');
  }

  const filtered = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));
  const selected = value || (placeholder ?? options[0]);
  const isPlaceholder = !value;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2, flex: 'none', width: width ?? undefined, borderRight: '1px solid var(--card-border-hover)', padding: '8px 14px' }}>
      <label style={{ fontWeight: 700, fontSize: 10, color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px' }}>{label}</label>
      <div ref={triggerRef} onClick={handleOpen} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', minWidth: 0 }}>
        <span style={{ fontSize: 15, color: isPlaceholder ? 'var(--neutral-dark-up)' : 'var(--neutral-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
          {selected}
        </span>
        <FAIcon icon="fa-regular fa-chevron-down" style={{ fontSize: 11, color: 'var(--neutral-label)', flexShrink: 0 }} />
      </div>
      {open && createPortal(
        <div ref={dropdownRef} style={{ position: 'fixed', top: dropPos.top, left: dropPos.left, minWidth: dropPos.width, zIndex: 9999, background: 'white', border: '1.5px solid var(--primary-pure)', borderRadius: 8, boxShadow: '0px 8px 24px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--neutral-light-medium)' }}>
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." style={{ width: '100%', border: '1px solid var(--primary-light)', borderRadius: 6, padding: '5px 8px', fontSize: 13, outline: 'none', background: 'var(--bg-subtle)', color: 'var(--neutral-dark-pure)' }} />
          </div>
          <div style={{ maxHeight: 180, overflowY: 'auto' }}>
            {filtered.map(o => (
              <div key={o} onClick={() => { onChange(o); setOpen(false); setSearch(''); }}
                style={{ padding: '9px 14px', fontSize: 14, color: o === value ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)', fontWeight: o === value ? 700 : 400, cursor: 'pointer', background: o === value ? 'var(--primary-bg-hover)' : 'white' }}
                onMouseEnter={e => { if (o !== value) (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; }}
                onMouseLeave={e => { if (o !== value) (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
              >
                {o}
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '12px 14px', fontSize: 13, color: 'var(--neutral-dark-up)', textAlign: 'center' }}>Nenhum resultado</div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export function MobileFormField({ label, children, style }: { label: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ border: '1.5px solid var(--primary-pure)', borderRadius: 8, background: 'white', padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 3, ...style }}>
      <label style={{ fontWeight: 700, fontSize: 10, color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px' }}>{label}</label>
      {children}
    </div>
  );
}

