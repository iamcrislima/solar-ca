import React from 'react';
import FAIcon from './FAIcon';

export default function StatCard({ icon, label, value, color, bg, active, onClick }: {
  icon: string; label: string; value: number;
  color: string; bg: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1, minWidth: 180,
        background: 'white',
        border: active ? `2px solid ${color}` : '1px solid var(--card-border)',
        borderRadius: 12,
        padding: '20px 22px',
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: active ? `0px 6px 18px rgba(24,39,75,0.13)` : '0px 2px 8px rgba(24,39,75,0.06)',
        transition: 'box-shadow 0.15s, border-color 0.15s, transform 0.15s',
        display: 'flex', alignItems: 'center', gap: 16,
      }}
      onMouseEnter={e => { if (onClick) { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 6px 18px rgba(24,39,75,0.13)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; } }}
      onMouseLeave={e => { if (onClick && !active) { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 2px 8px rgba(24,39,75,0.06)'; } (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
    >
      <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <FAIcon icon={icon} style={{ fontSize: 20, color }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 4 }}>
          {label}
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--neutral-ink-strong)', lineHeight: 1 }}>
          {value}
        </div>
      </div>
    </div>
  );
}

