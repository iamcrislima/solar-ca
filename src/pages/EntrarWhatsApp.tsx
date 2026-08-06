import React, { useState } from 'react';

import { useIsMobile } from '../i18n';
import type { Page } from '../types';
import { MOCK_TELEFONE_FORMATADO, MOCK_EMAIL } from '../mocks';

import FAIcon from '../components/FAIcon';
import TermosModal from '../components/TermosModal';
import LoginPanel from '../components/LoginPanel';
import type { PanelView } from '../components/LoginPanel';
import SenhaRegras, { senhaValida } from '../components/SenhaRegras';
import { IlustracaoSucesso, IlustracaoEmailEnviado } from '../components/IlustracaoWhatsApp';

import { whatsappUrl } from '../config/autenticacao';
import { useWaT } from '../textosWhatsapp';
import {
  navegarWa, urlWa, veioDoCadastro, ESTADOS_DEMO, salvarEmail, lerEmail,
} from '../rotasWhatsapp';
import type { WaEstado } from '../rotasWhatsapp';

// É a mesma tela de login do portal, sem a foto ao lado, dentro de um card. As
// telas extras (e-mail, criar senha, conclusão, certificado) vêm do fluxo do
// WhatsApp.
const CARD_MAX_LOGIN    = 460;
const CARD_MAX_CADASTRO = 560;   // o cadastro tem campos em duas colunas

const inputBase: React.CSSProperties = {
  width: '100%', height: 44, border: '1px solid var(--neutral-dark-up)', borderRadius: 8,
  padding: '0 12px', fontSize: 16, color: 'var(--neutral-dark-pure)', background: 'white',
  boxSizing: 'border-box', outline: 'none',
};
const rotuloCampo: React.CSSProperties = {
  fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-dark-pure)',
};

// ── Peças ────────────────────────────────────────────────────────────────────

function MarcaFloripaOn() {
  const isMobile = useIsMobile();
  return (
    <div style={{ textAlign: 'center' }}>
      <span style={{ fontWeight: 700, fontSize: isMobile ? 22 : 26, color: 'var(--primary-pure)', letterSpacing: '-0.5px', lineHeight: 1 }}>
        FloripaOn
      </span>
    </div>
  );
}

// Título do fluxo: centralizado, com o trecho entre ** em negrito.
function Titulo({ texto }: { texto: string }) {
  const isMobile = useIsMobile();
  return (
    <h1 style={{
      fontSize: isMobile ? 17 : 19, lineHeight: 1.32, fontWeight: 400, textAlign: 'center',
      margin: 0, color: 'var(--neutral-dark-pure)', letterSpacing: '-0.1px',
    }}>
      {texto.split('**').map((parte, i) => (
        i % 2 === 1 ? <b key={i} style={{ fontWeight: 700 }}>{parte}</b> : <React.Fragment key={i}>{parte}</React.Fragment>
      ))}
    </h1>
  );
}

function Powered() {
  const wa = useWaT();
  const isMobile = useIsMobile();
  return (
    <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--neutral-dark-medium)', margin: `${isMobile ? 14 : 20}px 0 0`, fontWeight: 600 }}>
      {wa.powered} <b style={{ color: 'var(--primary-pure)', fontWeight: 800 }}>Solar BPM</b>
    </p>
  );
}

function BotaoPrimario({ rotulo, habilitado = true, onClick }: {
  rotulo: string; habilitado?: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={() => { if (habilitado) onClick(); }}
      disabled={!habilitado}
      style={{
        width: '100%', height: 48, marginTop: 16, borderRadius: 8, border: 'none',
        background: habilitado ? 'var(--primary-pure)' : '#e9ecf1',
        color: habilitado ? 'white' : 'var(--neutral-dark-up)',
        cursor: habilitado ? 'pointer' : 'not-allowed',
        fontWeight: 700, fontSize: 15, transition: 'background 0.12s',
      }}
      onMouseEnter={e => { if (habilitado) (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure-hover)'; }}
      onMouseLeave={e => { if (habilitado) (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure)'; }}
    >
      {rotulo}
    </button>
  );
}

function Campo({ rotulo, children }: { rotulo: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <span style={rotuloCampo}>{rotulo}</span>
      {children}
    </div>
  );
}

function CampoSenha({ valor, onChange, rotulo, placeholder }: {
  valor: string; onChange: (v: string) => void; rotulo: string; placeholder: string;
}) {
  const [mostrar, setMostrar] = useState(false);
  return (
    <Campo rotulo={rotulo}>
      <div style={{ ...inputBase, display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px 0 12px' }}>
        <input
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 16, color: 'var(--neutral-dark-pure)', minWidth: 0 }}
          type={mostrar ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder={placeholder}
          value={valor}
          onChange={e => onChange(e.target.value)}
        />
        <FAIcon
          icon={mostrar ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}
          style={{ fontSize: 16, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0, width: 32, height: 32 }}
          onClick={() => setMostrar(v => !v)}
        />
      </div>
    </Campo>
  );
}

// ── Telas ────────────────────────────────────────────────────────────────────

// Login / senha / cadastro / recuperação: o MESMO painel do portal. O que muda é
// o título, o rótulo do botão ("Autenticar") e para onde o sucesso vai.
function TelaPainel({ estado }: { estado: Extract<WaEstado, 'login' | 'senha' | 'cadastro' | 'recuperar-senha'> }) {
  const wa = useWaT();

  const viewInicial: PanelView = estado === 'cadastro' ? 'cadastro'
    : estado === 'recuperar-senha' ? 'recovery'
    : 'login';

  const titulo =
    estado === 'senha' ? wa.tituloSenha :
    estado === 'cadastro' ? wa.tituloCadastro :
    wa.tituloLogin;

  return (
    <>
      <LoginPanel
        viewInicial={viewInicial}
        formAberto={estado === 'senha'}
        marcaCentralizada
        submitLabel={wa.autenticar}
        titulo={<Titulo texto={titulo} />}
        tituloCadastro={<div style={{ marginBottom: 20 }}><Titulo texto={wa.tituloCadastro} /></div>}
        avisoRecuperacao={
          <p style={{ fontSize: 12.5, color: 'var(--wa-deep)', background: 'var(--wa-bg-soft)', border: '1px solid var(--wa-border-soft)', borderRadius: 8, padding: '10px 12px', margin: '4px 0 0', lineHeight: 1.45 }}>
            {wa.avisoVoltaWhatsapp}
          </p>
        }
        onGovBr={() => navegarWa('concluido', true)}
        onCertificado={() => navegarWa('certificado', true)}
        onAutenticar={() => navegarWa('concluido', true)}
        onCadastroCriado={() => navegarWa('concluido', true, { de: 'cadastro' })}
        // A URL acompanha a view para o link ser compartilhável e o refresh cair
        // na mesma tela.
        onViewChange={v => {
          if (v === 'cadastro' && estado !== 'cadastro') navegarWa('cadastro', true);
          if (v === 'recovery' && estado !== 'recuperar-senha') navegarWa('recuperar-senha', true);
          if (v === 'login' && estado !== 'login') navegarWa('login', true);
        }}
        onFormAberto={() => { if (estado !== 'senha') navegarWa('senha', true); }}
      />
      <Powered />
    </>
  );
}

function TelaCertificado() {
  const wa = useWaT();
  const [certificado, setCertificado] = useState('');
  return (
    <>
      <MarcaFloripaOn />
      <div style={{ marginTop: 16 }}><Titulo texto={wa.tituloCertificado} /></div>
      <div style={{ marginTop: 18 }}>
        <Campo rotulo={wa.certificadoLabel}>
          <select style={{ ...inputBase, cursor: 'pointer' }} value={certificado} onChange={e => setCertificado(e.target.value)}>
            <option value="">{wa.certificadoPlaceholder}</option>
            <option value="a1">CRIS LIMA:012.345.678-90 — A1</option>
            <option value="a3">CRIS LIMA:012.345.678-90 — A3</option>
          </select>
        </Campo>
      </div>
      <BotaoPrimario rotulo={wa.prosseguir} habilitado={!!certificado} onClick={() => navegarWa('concluido', true)} />
      <p style={{ textAlign: 'center', margin: '14px 0 0' }}>
        <span onClick={() => navegarWa('login', true)}
          style={{ fontSize: 12.5, color: 'var(--primary-pure)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
          {wa.voltar}
        </span>
      </p>
      <Powered />
    </>
  );
}

function TelaEmail() {
  const wa = useWaT();
  const [email, setEmail] = useState('');

  function prosseguir() {
    salvarEmail(email.trim());
    navegarWa('email-enviado', true);
  }

  return (
    <>
      <MarcaFloripaOn />
      <div style={{ marginTop: 16 }}><Titulo texto={wa.tituloEmail} /></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
        <Campo rotulo={wa.telefoneLabel}>
          {/* Veio da conversa no WhatsApp — não é editável aqui. */}
          <input style={{ ...inputBase, color: 'var(--neutral-dark-down)' }} value={MOCK_TELEFONE_FORMATADO} readOnly />
        </Campo>
        <Campo rotulo={wa.emailLabel}>
          <input
            style={inputBase} type="email" inputMode="email" autoComplete="email"
            placeholder={wa.emailPlaceholder}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && email.trim()) prosseguir(); }}
          />
        </Campo>
      </div>
      <BotaoPrimario rotulo={wa.prosseguir} habilitado={!!email.trim()} onClick={prosseguir} />
      <Powered />
    </>
  );
}

function TelaEmailEnviado() {
  const wa = useWaT();
  const email = lerEmail() || MOCK_EMAIL;
  return (
    <div style={{ textAlign: 'center' }}>
      <MarcaFloripaOn />
      <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--neutral-dark-pure)', lineHeight: 1.45, margin: '18px auto 0', maxWidth: 340, wordBreak: 'break-word' }}>
        {wa.emailEnviado(email)}
      </p>
      <div style={{ margin: '18px 0 0' }}><IlustracaoEmailEnviado /></div>
      <p style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', lineHeight: 1.5, margin: '16px auto 0', maxWidth: 320 }}>
        {wa.emailEnviadoDetalhe}
      </p>
      <Powered />
    </div>
  );
}

function TelaCriarSenha({ onAbrirTermos }: { onAbrirTermos: () => void }) {
  const wa = useWaT();
  const [senha, setSenha] = useState('');
  return (
    <>
      <MarcaFloripaOn />
      <div style={{ marginTop: 16 }}><Titulo texto={wa.tituloCriarSenha} /></div>
      <div style={{ marginTop: 18 }}>
        {/* Nas telas de referência as regras vêm ANTES do campo. */}
        <SenhaRegras senha={senha} />
        <div style={{ marginTop: 14 }}>
          <CampoSenha valor={senha} onChange={setSenha} rotulo={wa.senhaLabel} placeholder={wa.senhaPlaceholder} />
        </div>
        <p style={{ fontSize: 11.5, color: 'var(--neutral-dark-medium)', lineHeight: 1.45, margin: '12px 0 0', textAlign: 'center' }}>
          {wa.politicaPrivacidade}{' '}
          <span onClick={onAbrirTermos} style={{ color: 'var(--primary-pure)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
            {wa.politicaPrivacidadeLink}
          </span>.
        </p>
      </div>
      <BotaoPrimario rotulo={wa.criarEEntrar} habilitado={senhaValida(senha)} onClick={() => navegarWa('concluido', true, { de: 'cadastro' })} />
      <Powered />
    </>
  );
}

// Feedback de sucesso: uma tela, um botão, igual em qualquer largura.
function TelaConcluido({ doCadastro }: { doCadastro: boolean }) {
  const wa = useWaT();
  return (
    <div style={{ textAlign: 'center' }}>
      <MarcaFloripaOn />
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--neutral-dark-pure)', lineHeight: 1.35, margin: '18px auto 0', maxWidth: 300, letterSpacing: '-0.2px' }}>
        {doCadastro ? wa.concluidoCadastro : wa.concluidoAutenticacao}
      </h2>
      <div style={{ margin: '18px 0 0' }}><IlustracaoSucesso /></div>
      <a href={whatsappUrl()} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
        <button style={{
          width: '100%', height: 48, marginTop: 20, borderRadius: 8, border: 'none', cursor: 'pointer',
          background: 'var(--primary-pure)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          fontWeight: 700, fontSize: 15, transition: 'background 0.12s',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure-hover)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-pure)'}>
          <FAIcon icon="fa-brands fa-whatsapp" style={{ fontSize: 19 }} />
          {wa.voltarAoWhatsapp}
        </button>
      </a>
      <Powered />
    </div>
  );
}

function TelaEstados() {
  const wa = useWaT();
  const rotulos: Record<typeof ESTADOS_DEMO[number], string> = {
    'login':           wa.tituloLogin,
    'senha':           wa.tituloSenha,
    'cadastro':        wa.tituloCadastro,
    'recuperar-senha': 'Redefinição de senha',
    'certificado':     wa.tituloCertificado,
    'email':           wa.tituloEmail,
    'email-enviado':   wa.emailEnviado('…'),
    'criar-senha':     wa.tituloCriarSenha,
    'concluido':       wa.concluidoAutenticacao,
  };

  return (
    <>
      <MarcaFloripaOn />
      <div style={{ marginTop: 16 }}><Titulo texto={wa.estadosTitulo} /></div>
      <p style={{ fontSize: 12.5, color: 'var(--neutral-dark-down)', margin: '6px 0 0', textAlign: 'center' }}>{wa.estadosSub}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
        {ESTADOS_DEMO.map((estado, i) => {
          const href = urlWa(estado, true);
          return (
            <a key={estado} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, minHeight: 52,
                border: '1px solid var(--card-border)', borderRadius: 10, padding: '9px 13px', background: 'white',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: 'var(--icon-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 13, color: 'var(--primary-pure)',
                }}>{i + 1}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--neutral-dark-pure)', lineHeight: 1.3 }}>
                    {rotulos[estado].replace(/\*\*/g, '')}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--neutral-dark-medium)', wordBreak: 'break-all' }}>{href}</div>
                </div>
                <FAIcon icon="fa-regular fa-arrow-right" style={{ fontSize: 13, color: 'var(--primary-pure)', marginLeft: 'auto', flexShrink: 0 }} />
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}

function TelaNaoEncontrado({ onIrParaPortal }: { onIrParaPortal: () => void }) {
  const wa = useWaT();
  return (
    <div style={{ textAlign: 'center' }}>
      <MarcaFloripaOn />
      <div style={{
        width: 62, height: 62, borderRadius: '50%', margin: '18px auto 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--warning-bg)', border: '2px solid var(--warning-border-light)',
      }}>
        <FAIcon icon="fa-regular fa-triangle-exclamation" style={{ fontSize: 26, color: 'var(--warning-color)' }} />
      </div>
      <h2 style={{ fontSize: 19, fontWeight: 700, margin: '0 0 8px', color: 'var(--neutral-dark-pure)' }}>
        {wa.naoEncontradoTitulo}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', lineHeight: 1.5, margin: '0 auto 16px', maxWidth: 320 }}>
        {wa.naoEncontradoTexto}
      </p>
      <BotaoPrimario rotulo={wa.irParaPortal} onClick={onIrParaPortal} />
    </div>
  );
}

// ── Página ───────────────────────────────────────────────────────────────────
export default function EntrarWhatsApp({ estado, onNavigatePortal }: {
  estado: WaEstado;
  onNavigatePortal: (p: Page) => void;
}) {
  const isMobile = useIsMobile();
  const [showTermos, setShowTermos] = useState(false);

  const usaPainel = estado === 'login' || estado === 'senha' || estado === 'cadastro' || estado === 'recuperar-senha';

  const conteudo =
    usaPainel                  ? <TelaPainel key={estado} estado={estado as 'login' | 'senha' | 'cadastro' | 'recuperar-senha'} /> :
    estado === 'certificado'   ? <TelaCertificado /> :
    estado === 'email'         ? <TelaEmail /> :
    estado === 'email-enviado' ? <TelaEmailEnviado /> :
    estado === 'criar-senha'   ? <TelaCriarSenha onAbrirTermos={() => setShowTermos(true)} /> :
    estado === 'concluido'     ? <TelaConcluido doCadastro={veioDoCadastro()} /> :
    estado === 'estados'       ? <TelaEstados /> :
                                 <TelaNaoEncontrado onIrParaPortal={() => onNavigatePortal('home')} />;

  return (
    <div style={{
      background: 'var(--background-color-light)', minHeight: '100dvh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile
        ? '10px 10px calc(10px + env(safe-area-inset-bottom))'
        : '32px 24px calc(32px + env(safe-area-inset-bottom))',
    }}>
      {showTermos && <TermosModal mode="view" onClose={() => setShowTermos(false)} />}

      <div style={{
        width: '100%', maxWidth: estado === 'cadastro' ? CARD_MAX_CADASTRO : CARD_MAX_LOGIN,
        background: 'white', border: '1px solid var(--primary-light)', borderRadius: 14,
        boxShadow: 'var(--shadow-card)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: isMobile ? '14px 16px 16px' : '26px 32px 28px' }}>
          {conteudo}
        </div>
      </div>
    </div>
  );
}
