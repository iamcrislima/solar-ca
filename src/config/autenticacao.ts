// ── Configuração da autenticação via WhatsApp ────────────────────────────────
export const autenticacaoConfig = {
  whatsappNumero: '5548000000000',   // número do atendimento (placeholder)
};

// Deep link do canal de atendimento. O número vive só aqui.
export function whatsappUrl(): string {
  return `https://wa.me/${autenticacaoConfig.whatsappNumero}`;
}
