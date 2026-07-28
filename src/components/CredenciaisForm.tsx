import React, { useState } from 'react';
import { Button } from '@1doc/1ds-react';
import FAIcon from './FAIcon';
import { loginLabel, loginInputWrap, loginInputEl } from './loginStyles';

// ── Formulário de credenciais — fonte única ──────────────────────────────────
// Usado pelo LoginModal (progressive disclosure) e pela rota
// /entrar/whatsapp/senha. Os rótulos variam entre os dois contextos, o restante
// (estilos, olho da senha, esqueci a senha) é o mesmo.
export default function CredenciaisForm({
  identificadorLabel,
  identificadorPlaceholder,
  identificadorTipo = 'text',
  identificadorAutoComplete = 'username',
  identificadorInputMode,
  senhaLabel,
  senhaPlaceholder,
  submitLabel,
  submitSize = 'md',
  exigirPreenchimento = false,
  fonteInput,
  compacto = false,
  onSubmit,
  onEsqueciSenha,
  esqueciSenhaLabel,
  esqueciSenhaAlinhamento = 'left',
  onVoltar,
  voltarLabel,
  rodape,
}: {
  identificadorLabel: string;
  identificadorPlaceholder: string;
  identificadorTipo?: 'text' | 'email';
  identificadorAutoComplete?: string;
  identificadorInputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  senhaLabel: string;
  senhaPlaceholder: string;
  submitLabel: string;
  submitSize?: 'sm' | 'md' | 'lg';
  exigirPreenchimento?: boolean;      // desabilita o submit até os campos terem conteúdo
  fonteInput?: number;                // 16 em página mobile real (evita zoom no iOS)
  compacto?: boolean;                 // espaçamento menor para caber na tela do celular
  onSubmit: () => void;
  onEsqueciSenha: () => void;
  esqueciSenhaLabel: string;
  esqueciSenhaAlinhamento?: 'left' | 'right';
  onVoltar?: () => void;
  voltarLabel?: string;
  rodape?: React.ReactNode;
}) {
  const [identificador, setIdentificador] = useState('');
  const [senha,         setSenha]         = useState('');
  const [showSenha,     setShowSenha]     = useState(false);

  const inputEl = fonteInput ? { ...loginInputEl, fontSize: fonteInput } : loginInputEl;
  const podeEnviar = !exigirPreenchimento || (identificador.trim().length > 0 && senha.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compacto ? 9 : 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: compacto ? 4 : 6 }}>
        <span style={loginLabel}>{identificadorLabel} <span style={{ color: 'var(--error-required)' }}>*</span></span>
        <div style={loginInputWrap}>
          <input
            style={inputEl}
            type={identificadorTipo}
            inputMode={identificadorInputMode}
            autoComplete={identificadorAutoComplete}
            placeholder={identificadorPlaceholder}
            value={identificador}
            onChange={e => setIdentificador(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: compacto ? 4 : 6 }}>
        <span style={loginLabel}>{senhaLabel} <span style={{ color: 'var(--error-required)' }}>*</span></span>
        <div style={loginInputWrap}>
          <input
            style={inputEl}
            type={showSenha ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder={senhaPlaceholder}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && podeEnviar) onSubmit(); }}
          />
          <FAIcon
            icon={showSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}
            style={{ fontSize: 16, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0, width: 24, height: 24 }}
            onClick={() => setShowSenha(v => !v)}
          />
        </div>
        <span
          onClick={onEsqueciSenha}
          style={{
            fontWeight: 600, fontSize: 12, color: 'var(--primary-pure)', textDecoration: 'underline',
            cursor: 'pointer', alignSelf: esqueciSenhaAlinhamento === 'right' ? 'flex-end' : 'flex-start',
            padding: compacto ? '3px 0' : '6px 0',
          }}
        >
          {esqueciSenhaLabel}
        </span>
      </div>

      <Button size={submitSize} variant="primary" disabled={!podeEnviar} onClick={onSubmit} style={{ width: '100%' }}>
        {submitLabel}
      </Button>

      {onVoltar && (
        <Button size={submitSize} variant="secondary" onClick={onVoltar} style={{ width: '100%' }}>
          <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 14, marginRight: 6 }} />
          {voltarLabel}
        </Button>
      )}

      {rodape}
    </div>
  );
}
