// Utilitários de formatação de exibição.

// Normaliza a identificação do órgão para o padrão "SIGLA — Nome completo".
// Aceita dados que já venham com travessão, com hífen ("SIGLA - Nome") ou
// apenas o nome, retornando sempre a forma canônica com travessão.
export function formatOrgao(orgao: string): string {
  if (!orgao) return orgao;
  if (orgao.includes(' — ')) return orgao;              // já normalizado
  return orgao.replace(/\s[-–]\s/, ' — ');              // hífen/en-dash → travessão
}

// ── Sanitização de HTML dos campos do Cadastro de Serviços ──
// Permite apenas tags estruturais básicas; remove script/style, tags desconhecidas
// (desembrulhando o conteúdo) e TODOS os atributos (incl. onclick e demais eventos),
// exceto href seguro em <a>.
const SANITIZE_ALLOWED = new Set(['b', 'i', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'p', 'br']);

function escapeText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function sanitizeNode(node: Node): string {
  if (node.nodeType === 3) return escapeText(node.textContent || '');   // texto
  if (node.nodeType !== 1) return '';                                    // comentários etc.
  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  if (tag === 'script' || tag === 'style') return '';
  const inner = Array.from(el.childNodes).map(sanitizeNode).join('');
  if (!SANITIZE_ALLOWED.has(tag)) return inner;                          // desembrulha tag não permitida
  if (tag === 'br') return '<br>';
  if (tag === 'a') {
    const href = (el.getAttribute('href') || '').trim();
    const safe = /^(https?:\/\/|mailto:|\/|#)/i.test(href);              // bloqueia javascript:, data: etc.
    return safe
      ? `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`
      : `<a>${inner}</a>`;
  }
  return `<${tag}>${inner}</${tag}>`;
}
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return '';
  const doc = new DOMParser().parseFromString(dirty, 'text/html');
  return Array.from(doc.body.childNodes).map(sanitizeNode).join('');
}

// Dispara o download de um arquivo-modelo (mock): gera um placeholder e baixa com o nome dado.
export function baixarArquivoMock(nome: string): void {
  const conteudo =
    `Documento de demonstração\n\nArquivo: ${nome}\n\n` +
    `Este é um arquivo-modelo gerado pelo protótipo do Portal de Atendimento (SolarBPM).`;
  const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nome || 'documento.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
