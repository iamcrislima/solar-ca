import React from 'react';
import FAIcon from './FAIcon';
import { useWaT } from '../textosWhatsapp';

// Regras de senha do fluxo do WhatsApp. Fonte única: usada no passo 3 do
// cadastro e na tela de criar senha (link do e-mail).
export interface RegraSenha { id: string; rotulo: string; ok: boolean }

export function avaliarSenha(senha: string, rotulos: string[]): RegraSenha[] {
  return [
    { id: 'tamanho',  rotulo: rotulos[0], ok: senha.length >= 8 },
    { id: 'letra',    rotulo: rotulos[1], ok: /[a-zA-ZÀ-ÿ]/.test(senha) },
    { id: 'numero',   rotulo: rotulos[2], ok: /\d/.test(senha) },
    { id: 'especial', rotulo: rotulos[3], ok: /[^a-zA-ZÀ-ÿ0-9\s]/.test(senha) },
  ];
}

export function senhaValida(senha: string): boolean {
  return avaliarSenha(senha, ['', '', '', '']).every(r => r.ok);
}

// Lista com estado por regra: cinza enquanto não atende, verde quando atende.
export default function SenhaRegras({ senha }: { senha: string }) {
  const wa = useWaT();
  const regras = avaliarSenha(senha, wa.regrasSenha);

  return (
    <ul style={{ listStyle: 'none', margin: '10px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {regras.map(r => (
        <li key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, lineHeight: 1.4, color: r.ok ? 'var(--success-color)' : 'var(--neutral-dark-medium)' }}>
          <FAIcon
            icon={r.ok ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}
            style={{ fontSize: 13, color: r.ok ? 'var(--success-color)' : 'var(--neutral-dark-up)', flexShrink: 0 }}
          />
          {r.rotulo}
        </li>
      ))}
    </ul>
  );
}
