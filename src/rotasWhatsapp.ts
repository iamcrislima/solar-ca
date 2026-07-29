// ── Rotas de /whatsapp ───────────────────────────────────────────────────────
// O portal navega por estado (useState<Page>) e não usa react-router. Este módulo
// adiciona só o que o fluxo do WhatsApp exige: URLs reais, deep link e refresh
// direto. Nenhuma rota existente muda de comportamento.

export type WaEstado =
  | 'login'
  | 'senha'
  | 'cadastro'
  | 'recuperar-senha'
  | 'certificado'
  | 'email'
  | 'email-enviado'
  | 'criar-senha'
  | 'concluido'
  | 'estados'
  | 'nao-encontrado';

// Rota canônica (é a que vai no link enviado pela LIA).
export const WA_BASE = '/whatsapp';

// /entrar/whatsapp continua respondendo, para não quebrar link já compartilhado.
const BASES_ACEITAS = [WA_BASE, '/entrar/whatsapp'];

const SUFIXO: Record<Exclude<WaEstado, 'nao-encontrado'>, string> = {
  'login':           '',
  'senha':           '/senha',
  'cadastro':        '/cadastro',
  'recuperar-senha': '/recuperar-senha',
  'certificado':     '/certificado',
  'email':           '/email',
  'email-enviado':   '/email-enviado',
  'criar-senha':     '/criar-senha',
  'concluido':       '/concluido',
  'estados':         '/estados',
};

// Telas listadas na rota de demonstração.
export const ESTADOS_DEMO: Exclude<WaEstado, 'estados' | 'nao-encontrado'>[] =
  ['login', 'senha', 'cadastro', 'recuperar-senha', 'certificado', 'email', 'email-enviado', 'criar-senha', 'concluido'];

// A lista de telas fica disponível por padrão — é protótipo de apresentação.
// Para esconder em um ambiente real: VITE_MOSTRAR_TELAS=false.
export const telasDemoHabilitadas = import.meta.env.VITE_MOSTRAR_TELAS !== 'false';

// Casa o pathname com um estado do fluxo.
// null  → a URL não é do fluxo (o portal segue normal).
// 'nao-encontrado' → é /whatsapp/algo-que-não-existe.
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

// Passo do cadastro: /whatsapp/cadastro?passo=1|2|3.
export function passoCadastro(search: string = window.location.search): 1 | 2 | 3 {
  const n = Number(new URLSearchParams(search).get('passo'));
  return n === 2 ? 2 : n === 3 ? 3 : 1;
}

// A conclusão muda de título quando a pessoa acabou de se cadastrar.
export function veioDoCadastro(search: string = window.location.search): boolean {
  return new URLSearchParams(search).get('de') === 'cadastro';
}

// URL de um estado. Só parâmetros de navegação entram na query:
//  • o token (`t`) é de uso único e não é reaproveitado em navegação interna;
//  • telefone, e-mail e CPF nunca entram em query string (vão por sessionStorage).
export function urlWa(
  estado: Exclude<WaEstado, 'nao-encontrado'>,
  origemWhatsapp: boolean,
  extras?: Record<string, string | number>,
): string {
  const q = new URLSearchParams();
  if (origemWhatsapp) q.set('origem', 'whatsapp');
  Object.entries(extras ?? {}).forEach(([k, v]) => q.set(k, String(v)));
  const query = q.toString();
  return `${WA_BASE}${SUFIXO[estado]}${query ? `?${query}` : ''}`;
}

// Navega sem recarregar. O `popstate` sintético mantém um único ponto de escuta
// no App, que trata igualmente voltar/avançar do navegador e navegação interna.
export function navegarWa(
  estado: Exclude<WaEstado, 'nao-encontrado'>,
  origemWhatsapp: boolean,
  extras?: Record<string, string | number>,
): void {
  window.history.pushState({}, '', urlWa(estado, origemWhatsapp, extras));
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

// ── Dados que atravessam telas ───────────────────────────────────────────────
// Identificação e e-mail seguem por sessionStorage justamente para não ir na URL.
const CHAVE_IDENT = 'wa-identificacao';
const CHAVE_EMAIL = 'wa-email';

function ler(chave: string): string {
  try { return sessionStorage.getItem(chave) ?? ''; } catch { return ''; }
}
function gravar(chave: string, valor: string): void {
  try { sessionStorage.setItem(chave, valor); } catch { /* modo privado: segue com o mock */ }
}

export const lerIdentificacao  = () => ler(CHAVE_IDENT);
export const salvarIdentificacao = (v: string) => gravar(CHAVE_IDENT, v);
export const lerEmail  = () => ler(CHAVE_EMAIL);
export const salvarEmail = (v: string) => gravar(CHAVE_EMAIL, v);

// ── Para onde o "Prosseguir" leva ────────────────────────────────────────────
// As três saídas da tela de entrada, como no fluxo de referência:
//  • contato conhecido e com senha        → informa a senha
//  • contato conhecido e sem senha        → recebe link por e-mail
//  • contato desconhecido                 → cria a conta
// Sem back-end, a decisão é um mock: telefone cai no fluxo de e-mail (quem veio
// do WhatsApp costuma não ter senha) e a conta de demonstração cai na senha.
export function pareceTelefone(valor: string): boolean {
  if (valor.includes('@')) return false;
  // CPF e CNPJ chegam pontuados (000.000.000-00); telefone, não.
  if (valor.includes('.') || valor.includes('/')) return false;
  const d = valor.replace(/\D/g, '');
  return d.length >= 10 && d.length <= 11;
}

export function destinoDoProsseguir(
  valor: string,
  contasConhecidas: string[],
): Extract<WaEstado, 'senha' | 'email' | 'cadastro'> {
  const v = valor.trim().toLowerCase();
  const digitos = v.replace(/\D/g, '');

  // A conta conhecida vem primeiro: CPF e telefone têm 11 dígitos e seriam
  // indistinguíveis pela forma. A comparação ignora pontuação.
  const conhecida = contasConhecidas.some(c => {
    const alvo = c.toLowerCase();
    return alvo === v || (digitos.length > 0 && alvo.replace(/\D/g, '') === digitos);
  });
  if (conhecida) return 'senha';

  if (pareceTelefone(v)) return 'email';
  return 'cadastro';
}
