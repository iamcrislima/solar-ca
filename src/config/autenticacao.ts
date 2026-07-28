// ── Configuração da autenticação (parametrizável por cliente) ────────────────
// Fonte única dos prazos exibidos nas telas de /entrar/whatsapp. Trocar um valor
// aqui muda o texto das telas — nenhum prazo é escrito em JSX.
export const autenticacaoConfig = {
  janelaAutenticacaoDias: 10,   // parametrizável por cliente: 1, 10, 365…
  validadeLinkMinutos: 15,
  whatsappNumero: '5548000000000',
};

// São DOIS prazos distintos e não se misturam nas mensagens:
//  • validadeLinkMinutos     → validade do link de identificação (curta)
//  • janelaAutenticacaoDias  → validade da sessão depois de autenticar (longa)

// Deep link do canal de atendimento. O número vive só aqui.
export function whatsappUrl(): string {
  return `https://wa.me/${autenticacaoConfig.whatsappNumero}`;
}

// Data absoluta em que a sessão expira ("Válido até 06/08/2026").
export function sessaoValidaAte(base: Date = new Date()): Date {
  const d = new Date(base.getTime());
  d.setDate(d.getDate() + autenticacaoConfig.janelaAutenticacaoDias);
  return d;
}

export function formatarData(d: Date, lang: string): string {
  const locale = lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'pt-BR';
  return d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
}
