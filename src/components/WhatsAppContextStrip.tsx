import React from 'react';
import FAIcon from './FAIcon';
import { useIsMobile } from '../i18n';
import { useWaT } from '../textosWhatsapp';

// Mascara o telefone para exibição: +55 (48) 9••••-0566.
// A máscara é responsabilidade DESTE módulo — o chamador passa o número cru e
// nunca precisa (nem deve) montar a versão mascarada.
export function mascararTelefone(bruto: string): string {
  const d = (bruto || '').replace(/\D/g, '');
  if (d.length < 10) return '••••••';                    // sem DDD não há como mascarar direito

  const nacional = d.length > 11 ? d.slice(-11) : d;      // DDD + número (10 ou 11 dígitos)
  const ddi      = d.slice(0, d.length - nacional.length) || '55';
  const ddd      = nacional.slice(0, 2);
  const local    = nacional.slice(2);                     // 8 ou 9 dígitos
  const nono     = local.length === 9 ? local[0] : '';    // nono dígito fica visível
  const ocultos  = Math.max(local.length - 4 - nono.length, 0);

  return `+${ddi} (${ddd}) ${nono}${'•'.repeat(ocultos)}-${local.slice(-4)}`;
}

// ── Faixa de contexto do atendimento ─────────────────────────────────────────
// Topo do card de login quando a pessoa chegou pelo WhatsApp: diz de onde ela
// veio, para qual número e por que precisa se identificar.
export default function WhatsAppContextStrip({ telefone, motivo }: {
  telefone: string;   // número cru; a máscara é aplicada aqui
  motivo: string;
}) {
  const wa = useWaT();
  const isMobile = useIsMobile();
  const dim = isMobile ? 30 : 34;

  return (
    <div style={{
      display: 'flex', gap: isMobile ? 10 : 12, alignItems: 'flex-start',
      padding: isMobile ? '10px 14px' : '14px 16px',
      background: 'var(--wa-bg-soft)', borderBottom: '1px solid var(--wa-border-soft)',
    }}>
      <div style={{
        flex: `0 0 ${dim}px`, width: dim, height: dim, borderRadius: '50%',
        background: 'var(--wa-color)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <FAIcon icon="fa-brands fa-whatsapp" style={{ fontSize: isMobile ? 18 : 20, color: 'white' }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.8px', textTransform: 'uppercase', color: 'var(--wa-deep)' }}>
          {wa.faixaLabel}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--wa-ink)', marginTop: 2 }}>
          {mascararTelefone(telefone)}
        </div>
        <div style={{ fontSize: 12, color: 'var(--wa-ink-soft)', lineHeight: 1.45, marginTop: 3 }}>
          {motivo}
        </div>
      </div>
    </div>
  );
}
