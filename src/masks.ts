// ── Máscaras de campo — fonte única ──────────────────────────────────────────
// Extraídas do cadastro que o portal já tem (LoginModal / CadastroPage), para o
// fluxo do WhatsApp usar exatamente as mesmas regras.

export function fmtCpf(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 11);
  return d.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function fmtCnpj(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 14);
  return d.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

// Documento de login: CPF até 11 dígitos, CNPJ a partir daí.
export function fmtDocumento(v: string): string {
  const d = v.replace(/\D/g, '');
  return d.length <= 11 ? fmtCpf(d) : fmtCnpj(d);
}

export function fmtTel(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
}

export function fmtCep(v: string): string {
  const d = v.replace(/\D/g, '').slice(0, 8);
  return d.replace(/(\d{5})(\d)/, '$1-$2');
}

// UFs — mesma lista usada no cadastro do portal.
export const UF_LIST = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
