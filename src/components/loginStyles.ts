import type React from 'react';

// ── Estilos do login — fonte única ───────────────────────────────────────────
// Extraídos do LoginModal para serem compartilhados entre o modal, o formulário
// de credenciais e as rotas /entrar/whatsapp. Inline styles, padrão do projeto.

export const loginLabel: React.CSSProperties = {
  fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '20px',
};

export const loginInputWrap: React.CSSProperties = {
  background: 'white', border: '1px solid var(--neutral-dark-up)', borderRadius: 8,
  display: 'flex', alignItems: 'center', gap: 8, padding: 8, height: 44, width: '100%',
  boxSizing: 'border-box',
};

// fontSize é sobrescrito pelo chamador quando o alvo é uma página mobile real
// (iOS dá zoom ao focar input com fonte < 16px).
export const loginInputEl: React.CSSProperties = {
  flex: 1, border: 'none', outline: 'none', background: 'transparent',
  fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', minWidth: 0,
};

export const loginDivisor: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 16,
};

export const loginDivisorLinha: React.CSSProperties = {
  flex: 1, height: 1, background: 'var(--neutral-light-down)',
};

export const loginDivisorTexto: React.CSSProperties = {
  fontWeight: 400, fontSize: 12, color: 'var(--neutral-dark-down)', whiteSpace: 'nowrap',
};

export const loginHint: React.CSSProperties = {
  fontSize: 12, color: 'var(--neutral-dark-medium)', textAlign: 'center', margin: 0, lineHeight: '18px',
};
