import type { ProcessoStatus } from './types';

// STATUS_STYLE separado de types.ts para não misturar tipos com valores de runtime
export const STATUS_STYLE: Record<ProcessoStatus, { bg: string; color: string }> = {
  'Concluído':    { bg: 'var(--success-bg)', color: 'var(--success-color)' },
  'Em Andamento': { bg: 'var(--neutral-light-medium)', color: 'var(--neutral-dark-down)' },
  'Pendente':     { bg: 'var(--error-bg)', color: 'var(--error-color)' },
};
