import React, { useState } from 'react';
import FAIcon from './FAIcon';

export default function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{ display: 'inline-flex', alignItems: 'center', cursor: 'help', color: 'var(--neutral-dark-medium)', fontSize: 14 }}
      >
        <FAIcon icon="fa-regular fa-circle-info" />
      </span>
      {show && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--neutral-ink)', color: 'white', borderRadius: 8, padding: '10px 16px',
          fontSize: 12, lineHeight: '19px',
          whiteSpace: 'pre-wrap', width: 360, zIndex: 500,
          boxShadow: '0px 4px 16px rgba(0,0,0,0.22)',
          pointerEvents: 'none',
        }}>
          <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '6px solid #222' }} />
          {text}
        </div>
      )}
    </span>
  );
}
