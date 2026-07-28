// ── Rotas de /entrar/whatsapp ────────────────────────────────────────────────
// O portal navega por estado (useState<Page>) e não usa react-router. Este módulo
// adiciona só o que o fluxo do WhatsApp exige: URLs reais, deep link e refresh
// direto. Nenhuma rota existente muda de comportamento.

export type WaEstado =
  | 'login'
  | 'senha'
  | 'confirmado'
  | 'sessao-valida'
  | 'link-expirado'
  | 'estados'
  | 'nao-encontrado';

// Rota canônica (é a que vai no link enviado pela LIA).
export const WA_BASE = '/whatsapp';

// /entrar/whatsapp continua respondendo, para não quebrar link já compartilhado.
const BASES_ACEITAS = [WA_BASE, '/entrar/whatsapp'];

// Sufixo de URL de cada estado (o login é a raiz do fluxo).
const SUFIXO: Record<Exclude<WaEstado, 'nao-encontrado'>, string> = {
  'login':          '',
  'senha':          '/senha',
  'confirmado':     '/confirmado',
  'sessao-valida':  '/sessao-valida',
  'link-expirado':  '/link-expirado',
  'estados':        '/estados',
};

// Telas listadas na rota de demonstração.
export const ESTADOS_DEMO: Exclude<WaEstado, 'estados' | 'nao-encontrado'>[] =
  ['login', 'senha', 'confirmado', 'sessao-valida', 'link-expirado'];

// A lista de telas fica disponível por padrão — é protótipo de apresentação.
// Para esconder em um ambiente real: VITE_MOSTRAR_TELAS=false.
export const telasDemoHabilitadas = import.meta.env.VITE_MOSTRAR_TELAS !== 'false';

// Retorno automático para o wa.me ao fim da contagem. Desligado por padrão: o
// número do config ainda é placeholder, e redirecionar no meio de uma
// apresentação joga quem está demonstrando fora da tela.
export const retornoAutomatico = import.meta.env.VITE_RETORNO_AUTOMATICO === 'true';

// Casa o pathname com um estado do fluxo.
// null  → a URL não é do fluxo (o portal segue normal).
// 'nao-encontrado' → é /entrar/whatsapp/algo-que-não-existe.
export function casarRotaWa(pathname: string): WaEstado | null {
  const limpo = pathname.replace(/\/+$/, '') || '/';
  const base = BASES_ACEITAS.find(b => limpo === b || limpo.startsWith(`${b}/`));
  if (!base) return null;

  const sufixo = limpo.slice(base.length);
  const achado = (Object.keys(SUFIXO) as Exclude<WaEstado, 'nao-encontrado'>[])
    .find(estado => SUFIXO[estado] === sufixo);

  if (!achado) return 'nao-encontrado';
  if (achado === 'estados' && !telasDemoHabilitadas) return 'nao-encontrado';
  return achado;
}

// A origem define se a faixa de contexto do WhatsApp aparece.
export function veioDoWhatsapp(search: string = window.location.search): boolean {
  return new URLSearchParams(search).get('origem') === 'whatsapp';
}

// URL de um estado. Só `origem` é propagada entre telas:
//  • o token (`t`) é de uso único e não é reaproveitado em navegação interna;
//  • telefone e CPF nunca entram em query string.
export function urlWa(estado: Exclude<WaEstado, 'nao-encontrado'>, origemWhatsapp: boolean): string {
  return `${WA_BASE}${SUFIXO[estado]}${origemWhatsapp ? '?origem=whatsapp' : ''}`;
}

// Navega sem recarregar. O `popstate` sintético mantém um único ponto de escuta
// no App, que trata igualmente voltar/avançar do navegador e navegação interna.
export function navegarWa(estado: Exclude<WaEstado, 'nao-encontrado'>, origemWhatsapp: boolean): void {
  window.history.pushState({}, '', urlWa(estado, origemWhatsapp));
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}
