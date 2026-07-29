import React from 'react';

// Ilustrações do fluxo, em SVG inline — sem dependência nova e sem arquivo de
// imagem. Cores vindas dos tokens do portal.

export function IlustracaoSucesso({ tamanho = 132 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho * 0.72} viewBox="0 0 200 144" role="img" aria-label="Autenticação concluída" style={{ display: 'block', margin: '0 auto' }}>
      <ellipse cx="100" cy="128" rx="62" ry="8" fill="var(--primary-light)" opacity="0.55" />
      <circle cx="100" cy="62" r="46" fill="var(--wa-bg-soft)" stroke="var(--wa-color)" strokeWidth="2.5" />
      <path d="M78 62.5 L94 78 L124 47" fill="none" stroke="var(--wa-deep)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="34" cy="34" r="5" fill="var(--wa-color)" opacity="0.5" />
      <circle cx="168" cy="46" r="7" fill="var(--primary-pure)" opacity="0.18" />
      <circle cx="150" cy="104" r="4" fill="var(--wa-color)" opacity="0.4" />
      <circle cx="46" cy="98" r="6" fill="var(--primary-pure)" opacity="0.14" />
    </svg>
  );
}

export function IlustracaoEmailEnviado({ tamanho = 132 }: { tamanho?: number }) {
  return (
    <svg width={tamanho} height={tamanho * 0.72} viewBox="0 0 200 144" role="img" aria-label="E-mail enviado" style={{ display: 'block', margin: '0 auto' }}>
      <ellipse cx="100" cy="128" rx="62" ry="8" fill="var(--primary-light)" opacity="0.55" />
      <rect x="50" y="40" width="100" height="68" rx="8" fill="white" stroke="var(--primary-pure)" strokeWidth="2.5" />
      <path d="M50 48 L100 82 L150 48" fill="none" stroke="var(--primary-pure)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="150" cy="42" r="15" fill="var(--wa-bg-soft)" stroke="var(--wa-color)" strokeWidth="2.5" />
      <path d="M143 42.5 L148 48 L157 37" fill="none" stroke="var(--wa-deep)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="34" cy="36" r="5" fill="var(--primary-pure)" opacity="0.2" />
      <circle cx="42" cy="100" r="6" fill="var(--primary-pure)" opacity="0.14" />
      <circle cx="166" cy="98" r="4" fill="var(--primary-pure)" opacity="0.2" />
    </svg>
  );
}
