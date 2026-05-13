import React from 'react';
import FAIcon from './FAIcon';

export function ServiceCard({ title, items, icon, onItemClick }: { title: string; items: string[]; icon: string; onItemClick?: (item: string) => void }) {
  return (
    <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: 24, flex: '1 0 0', boxShadow: 'var(--shadow-level-3)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <FAIcon icon={icon} style={{ fontSize: 20, color: 'var(--primary-pure)', flexShrink: 0 }} />
        <h2 style={{ fontWeight: 700, fontSize: 24, color: 'var(--colors-neutral-01)', lineHeight: 1.2, margin: 0 }}>{title}</h2>
      </div>
      <div>
        {items.map((item, i) => (
          <div key={item}
            onClick={() => onItemClick?.(item)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < items.length - 1 ? '1px solid var(--neutral-light-down)' : 'none', cursor: onItemClick ? 'pointer' : 'default', transition: 'color 0.12s' }}
            onMouseEnter={e => { if (onItemClick) (e.currentTarget as HTMLDivElement).style.color = 'var(--primary-pure)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.color = ''; }}
          >
            <span style={{ fontWeight: 400, fontSize: 16, color: 'inherit', lineHeight: '24px' }}>{item}</span>
            <FAIcon icon="fa-regular fa-angle-right" style={{ color: 'var(--neutral-dark-medium)', fontSize: 16 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoryCard({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ background: 'white', border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '20px 12px', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0px 2px 6px rgba(24,39,75,0.08)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-bg-subtle)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
    >
      <FAIcon icon={icon} style={{ fontSize: 40, color: 'var(--primary-medium)' }} />
      <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--colors-neutral-01)', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
    </div>
  );
}
