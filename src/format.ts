// Utilitários de formatação de exibição.

// Normaliza a identificação do órgão para o padrão "SIGLA — Nome completo".
// Aceita dados que já venham com travessão, com hífen ("SIGLA - Nome") ou
// apenas o nome, retornando sempre a forma canônica com travessão.
export function formatOrgao(orgao: string): string {
  if (!orgao) return orgao;
  if (orgao.includes(' — ')) return orgao;              // já normalizado
  return orgao.replace(/\s[-–]\s/, ' — ');              // hífen/en-dash → travessão
}
