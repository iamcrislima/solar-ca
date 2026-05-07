import React from 'react';
import FAIcon from './FAIcon';

export function ServiceCard({ title, items, icon }: { title: string; items: string[]; icon: string }) {
  return (
    <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: 24, flex: '1 0 0', boxShadow: 'var(--shadow-level-3)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <FAIcon icon={icon} style={{ fontSize: 20, color: 'var(--primary-pure)', flexShrink: 0 }} />
        <h2 style={{ fontWeight: 700, fontSize: 24, color: 'var(--colors-neutral-01)', lineHeight: 1.2, margin: 0 }}>{title}</h2>
      </div>
      <div>
        {items.map((item, i) => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < items.length - 1 ? '1px solid var(--neutral-light-down)' : 'none', cursor: 'pointer' }}>
            <span style={{ fontWeight: 400, fontSize: 16, color: 'var(--neutral-dark-pure)', lineHeight: '24px' }}>{item}</span>
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
      style={{ background: 'var(--primary-light)', border: '1px solid var(--primary-medium)', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 24, aspectRatio: '1', boxShadow: 'var(--shadow-level-3)', cursor: 'pointer', transition: 'transform 0.12s, box-shadow 0.12s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 10px 24px rgba(24,39,75,0.18)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-level-3)'; }}
    >
      <FAIcon icon={icon} style={{ fontSize: 56, color: 'var(--primary-pure)' }} />
      <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-dark-pure)', textAlign: 'center', lineHeight: 1.2 }}>{label}</span>
    </div>
  );
}
