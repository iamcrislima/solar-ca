import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { useT, useLang, useIsMobile } from '../i18n';
import type { Page } from '../types';
import { MOCK_USER, MOCK_TELEFONE_WHATSAPP, MOCK_CPF_PARCIAL } from '../mocks';

import FAIcon from '../components/FAIcon';
import TermosModal from '../components/TermosModal';
import LoginOptions from '../components/LoginOptions';
import CredenciaisForm from '../components/CredenciaisForm';
import WhatsAppContextStrip from '../components/WhatsAppContextStrip';

import { autenticacaoConfig, whatsappUrl, sessaoValidaAte, formatarData } from '../config/autenticacao';
import { useWaT } from '../textosWhatsapp';
import {
  navegarWa, urlWa, veioDoWhatsapp, retornoAutomatico, ESTADOS_DEMO,
} from '../rotasWhatsapp';
import type { WaEstado } from '../rotasWhatsapp';

// Tela de tarefa única: só o card do login. Sem cabeçalho de site, sem rodapé,
// sem menu e sem a foto de Florianópolis — é o painel do login de hoje, isolado.
const CARD_MAX = 460;

// ── Blocos do card ───────────────────────────────────────────────────────────

// Cabeçalho do card: o mesmo "FloripaOn" que o login do portal usa hoje.
function MarcaFloripaOn() {
  const isMobile = useIsMobile();
  return (
    <span style={{
      fontWeight: 700, fontSize: isMobile ? 22 : 28, color: 'var(--primary-pure)',
      letterSpacing: '-0.5px', lineHeight: 1, display: 'block',
    }}>
      FloripaOn
    </span>
  );
}

function Titulo({ titulo, sub }: { titulo: string; sub?: string }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ marginTop: isMobile ? 8 : 20 }}>
      <h1 style={{
        fontSize: isMobile ? 17 : 20, fontWeight: 700, lineHeight: 1.28, margin: 0,
        letterSpacing: '-0.2px', color: 'var(--neutral-dark-pure)',
      }}>
        {titulo}
      </h1>
      {sub && (
        <p style={{ fontSize: 12.5, color: 'var(--neutral-dark-down)', lineHeight: 1.4, margin: '4px 0 0' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// Prazo da SESSÃO em forma relativa — derivado do config, nunca escrito em JSX.
function ValidadeSessao() {
  const wa = useWaT();
  const isMobile = useIsMobile();
  const prazo = wa.prazoDias(autenticacaoConfig.janelaAutenticacaoDias);
  const [antes, depois] = wa.validadeSessao.split('{prazo}');

  return (
    <div style={{
      display: 'flex', gap: 9, alignItems: 'flex-start', marginTop: isMobile ? 10 : 16,
      background: 'var(--bg-subtle)', border: '1px solid var(--primary-light)',
      borderRadius: 8, padding: isMobile ? '8px 10px' : '11px 13px',
    }}>
      <FAIcon icon="fa-regular fa-clock" style={{ fontSize: 14, color: 'var(--neutral-dark-medium)', marginTop: 1, flexShrink: 0 }} />
      <p style={{ margin: 0, fontSize: 12, color: 'var(--neutral-dark-down)', lineHeight: 1.45 }}>
        {antes}
        <span title={wa.validadeSessaoTooltip}
          style={{ fontWeight: 700, color: 'var(--neutral-dark-pure)', borderBottom: '1.5px dashed var(--primary-pure)', cursor: 'help', whiteSpace: 'nowrap' }}>
          {prazo}
        </span>
        {depois}
      </p>
    </div>
  );
}

function Legal({ onOpenTermos }: { onOpenTermos: () => void }) {
  const wa = useWaT();
  const isMobile = useIsMobile();
  return (
    <>
      <p style={{ fontSize: 11.5, color: 'var(--neutral-dark-medium)', lineHeight: 1.4, margin: `${isMobile ? 14 : 18}px 0 0`, textAlign: 'center' }}>
        {wa.legal}{' '}
        <span onClick={onOpenTermos} style={{ color: 'var(--primary-pure)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>
          {wa.legalLink}
        </span>.
      </p>
      <p style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--neutral-dark-medium)', margin: `${isMobile ? 7 : 12}px 0 0`, fontWeight: 600 }}>
        {wa.powered} <b style={{ color: 'var(--primary-pure)', fontWeight: 800 }}>Solar BPM</b>
      </p>
    </>
  );
}

function Badge({ tipo }: { tipo: 'ok' | 'aviso' }) {
  const ok = tipo === 'ok';
  return (
    <div style={{
      width: 62, height: 62, borderRadius: '50%', margin: '0 auto 14px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: ok ? 'var(--wa-bg-soft)' : 'var(--warning-bg)',
      border: `2px solid ${ok ? 'var(--wa-color)' : 'var(--warning-border-light)'}`,
    }}>
      <FAIcon
        icon={ok ? 'fa-regular fa-check' : 'fa-regular fa-triangle-exclamation'}
        style={{ fontSize: 26, color: ok ? 'var(--wa-deep)' : 'var(--warning-color)' }}
      />
    </div>
  );
}

// Retorno ao canal. No celular a conversa está no mesmo aparelho; em tela larga o
// WhatsApp está no celular da pessoa — a diferença é de largura de tela, não de
// user agent.
function RetornoWhatsApp({ rotuloMobile, texto, textoDesktop, mostrarQr, contagem }: {
  rotuloMobile: string;
  texto: string;
  textoDesktop?: string;
  mostrarQr?: boolean;
  contagem?: boolean;
}) {
  const wa = useWaT();
  const isMobile = useIsMobile();
  const url = whatsappUrl();

  const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Contagem só no celular e só com movimento normal. Ela aparece sempre; o
  // redirecionamento em si depende de VITE_RETORNO_AUTOMATICO.
  const contar = !!contagem && isMobile && !reduzido;
  const redirecionar = contar && retornoAutomatico;
  const [restante, setRestante] = useState(5);

  useEffect(() => {
    if (!contar || restante <= 0) {
      if (redirecionar && restante <= 0) window.location.href = url;
      return;
    }
    const id = setTimeout(() => setRestante(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [contar, redirecionar, restante, url]);

  return (
    <>
      <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', lineHeight: 1.5, margin: '0 auto 16px', maxWidth: 320 }}>
        {isMobile ? texto : (textoDesktop ?? texto)}
      </p>

      {!isMobile && mostrarQr && (
        <div aria-label={wa.okQrLabel} style={{
          width: 140, height: 140, margin: '0 auto 14px', padding: 7,
          borderRadius: 8, border: '1px solid var(--neutral-light-down)', background: 'white',
        }}>
          <QRCodeSVG value={url} size={124} level="M" bgColor="#ffffff" fgColor="#333333" />
        </div>
      )}

      <a href={url} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
        <button style={{
          width: '100%', height: 48, borderRadius: 10, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          fontWeight: 700, fontSize: 15, transition: 'background 0.12s',
          ...(isMobile
            ? { background: 'var(--wa-color)', color: 'var(--wa-ink)', border: 'none' }
            : { background: 'white', color: 'var(--wa-deep)', border: '1.5px solid var(--wa-color)' }),
        }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = isMobile ? 'var(--wa-hover)' : 'var(--wa-bg-soft)'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = isMobile ? 'var(--wa-color)' : 'white'}>
          <FAIcon icon="fa-brands fa-whatsapp" style={{ fontSize: 19 }} />
          {isMobile ? rotuloMobile : wa.abrirWhatsappWeb}
        </button>
      </a>

      {contar && restante > 0 && (
        <p style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', margin: '10px 0 0' }}>
          {wa.okContagem(restante)}
        </p>
      )}
    </>
  );
}

// ── Telas ────────────────────────────────────────────────────────────────────

function TelaLogin({ daOrigemWhatsapp, onOpenTermos }: { daOrigemWhatsapp: boolean; onOpenTermos: () => void }) {
  const t = useT();
  const wa = useWaT();
  const isMobile = useIsMobile();
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Titulo
        titulo={daOrigemWhatsapp ? wa.loginTitulo : t('boasVindas')}
        sub={daOrigemWhatsapp ? wa.loginSub : undefined}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 7 : 14, marginTop: isMobile ? 12 : 18 }}>
        {/* Mesmos componentes do login do portal — não há botão recriado aqui. */}
        <LoginOptions
          compacto={isMobile}
          showForm={showForm}
          onShowForm={() => setShowForm(true)}
          onGovBr={() => navegarWa('confirmado', daOrigemWhatsapp)}
          onCertificado={() => navegarWa('confirmado', daOrigemWhatsapp)}
          onSystemLogin={() => navegarWa('senha', daOrigemWhatsapp)}
        />
      </div>
      <ValidadeSessao />
      <Legal onOpenTermos={onOpenTermos} />
    </>
  );
}

function TelaSenha({ daOrigemWhatsapp, onOpenTermos }: { daOrigemWhatsapp: boolean; onOpenTermos: () => void }) {
  const t = useT();
  const wa = useWaT();
  const isMobile = useIsMobile();

  return (
    <>
      <Titulo titulo={t('loginEntrarSistema')} sub={wa.senhaSub} />
      <div style={{ marginTop: isMobile ? 12 : 18 }}>
        <CredenciaisForm
          compacto={isMobile}
          identificadorLabel={wa.senhaIdentificador}
          identificadorPlaceholder={wa.senhaIdentificadorPlaceholder}
          senhaLabel={t('senha')}
          senhaPlaceholder={wa.senhaCampoPlaceholder}
          submitLabel={t('entrar')}
          submitSize="lg"
          exigirPreenchimento
          fonteInput={16}
          esqueciSenhaLabel={t('esqueciSenha')}
          esqueciSenhaAlinhamento="right"
          onEsqueciSenha={() => { /* recuperação de senha fora do escopo do protótipo */ }}
          onSubmit={() => navegarWa('confirmado', daOrigemWhatsapp)}
          onVoltar={() => navegarWa('login', daOrigemWhatsapp)}
          voltarLabel={t('voltar')}
        />
      </div>
      <ValidadeSessao />
      <Legal onOpenTermos={onOpenTermos} />
    </>
  );
}

function TelaConfirmado({ onOpenTermos }: { onOpenTermos: () => void }) {
  const wa = useWaT();
  const lang = useLang();

  return (
    <div style={{ textAlign: 'center', marginTop: 18 }}>
      <Badge tipo="ok" />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.2px', color: 'var(--neutral-dark-pure)' }}>
        {wa.okTitulo}
      </h2>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 16,
        background: 'var(--bg-subtle)', border: '1px solid var(--primary-light)',
        borderRadius: 999, padding: '5px 12px', fontSize: 12, fontWeight: 700, color: 'var(--neutral-dark-down)',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--wa-color)' }} />
        {wa.okValidoAte(formatarData(sessaoValidaAte(), lang))}
      </div>

      <RetornoWhatsApp
        rotuloMobile={wa.okBotaoMobile}
        texto={wa.okTextoMobile}
        textoDesktop={wa.okTextoDesktop}
        mostrarQr
        contagem
      />
      <Legal onOpenTermos={onOpenTermos} />
    </div>
  );
}

function TelaSessaoValida({ daOrigemWhatsapp, onOpenTermos }: { daOrigemWhatsapp: boolean; onOpenTermos: () => void }) {
  const wa = useWaT();

  return (
    <div style={{ textAlign: 'center', marginTop: 18 }}>
      <Badge tipo="ok" />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.2px', color: 'var(--neutral-dark-pure)' }}>
        {wa.sessaoTitulo}
      </h2>
      <RetornoWhatsApp
        rotuloMobile={wa.sessaoBotaoMobile}
        texto={wa.sessaoTexto(MOCK_USER.nome, MOCK_CPF_PARCIAL)}
      />
      <p style={{ margin: '12px 0 0', fontSize: 12.5 }}>
        <span onClick={() => navegarWa('login', daOrigemWhatsapp)}
          style={{ color: 'var(--primary-pure)', fontWeight: 700, cursor: 'pointer' }}>
          {wa.sessaoNaoEhVoce}
        </span>
      </p>
      <Legal onOpenTermos={onOpenTermos} />
    </div>
  );
}

function TelaLinkExpirado({ onOpenTermos }: { onOpenTermos: () => void }) {
  const wa = useWaT();

  return (
    <div style={{ textAlign: 'center', marginTop: 18 }}>
      <Badge tipo="aviso" />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.2px', color: 'var(--neutral-dark-pure)' }}>
        {wa.expiradoTitulo}
      </h2>
      <RetornoWhatsApp
        rotuloMobile={wa.expiradoBotaoMobile}
        texto={wa.expiradoTexto(autenticacaoConfig.validadeLinkMinutos)}
      />
      <p style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', margin: '10px 0 0' }}>
        {wa.expiradoNadaPerdido}
      </p>
      <Legal onOpenTermos={onOpenTermos} />
    </div>
  );
}

// Lista de navegação para apresentação ao vivo. Só existe com VITE_MOSTRAR_TELAS.
function TelaEstados() {
  const wa = useWaT();
  const t = useT();
  const rotulos: Record<typeof ESTADOS_DEMO[number], string> = {
    'login':         wa.loginTitulo,
    'senha':         t('loginEntrarSistema'),
    'confirmado':    wa.okTitulo,
    'sessao-valida': wa.sessaoTitulo,
    'link-expirado': wa.expiradoTitulo,
  };

  return (
    <>
      <Titulo titulo={wa.estadosTitulo} sub={wa.estadosSub} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
        {ESTADOS_DEMO.map((estado, i) => {
          const href = urlWa(estado, estado !== 'confirmado' && estado !== 'link-expirado');
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
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--neutral-dark-pure)' }}>{rotulos[estado]}</div>
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
    <div style={{ textAlign: 'center', marginTop: 18 }}>
      <Badge tipo="aviso" />
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.2px', color: 'var(--neutral-dark-pure)' }}>
        {wa.naoEncontradoTitulo}
      </h2>
      <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', lineHeight: 1.5, margin: '0 auto 16px', maxWidth: 320 }}>
        {wa.naoEncontradoTexto}
      </p>
      <button onClick={onIrParaPortal} style={{
        width: '100%', height: 44, borderRadius: 8, border: 'none', cursor: 'pointer',
        background: 'var(--primary-pure)', color: 'white', fontWeight: 700, fontSize: 14,
      }}>
        {wa.irParaPortal}
      </button>
    </div>
  );
}

// ── Página ───────────────────────────────────────────────────────────────────
export default function EntrarWhatsApp({ estado, onNavigatePortal }: {
  estado: WaEstado;
  onNavigatePortal: (p: Page) => void;
}) {
  const isMobile = useIsMobile();
  const wa = useWaT();
  const [showTermos, setShowTermos] = useState(false);
  const daOrigemWhatsapp = veioDoWhatsapp();
  const abrirTermos = () => setShowTermos(true);

  // A faixa de contexto aparece nas telas em que a pessoa ainda está sendo
  // identificada. Sem `origem=whatsapp`, é o login normal do portal.
  const comFaixa = daOrigemWhatsapp && (estado === 'login' || estado === 'senha' || estado === 'sessao-valida');
  const motivo = estado === 'sessao-valida' ? 'faixaMotivoSessao' : 'faixaMotivoLogin';

  const conteudo =
    estado === 'login'         ? <TelaLogin daOrigemWhatsapp={daOrigemWhatsapp} onOpenTermos={abrirTermos} /> :
    estado === 'senha'         ? <TelaSenha daOrigemWhatsapp={daOrigemWhatsapp} onOpenTermos={abrirTermos} /> :
    estado === 'confirmado'    ? <TelaConfirmado onOpenTermos={abrirTermos} /> :
    estado === 'sessao-valida' ? <TelaSessaoValida daOrigemWhatsapp={daOrigemWhatsapp} onOpenTermos={abrirTermos} /> :
    estado === 'link-expirado' ? <TelaLinkExpirado onOpenTermos={abrirTermos} /> :
    estado === 'estados'       ? <TelaEstados /> :
                                 <TelaNaoEncontrado onIrParaPortal={() => onNavigatePortal('home')} />;

  return (
    // 100dvh + centralização: no celular o card cabe na tela sem scroll; em tela
    // curta (paisagem) a página rola em vez de cortar conteúdo.
    <div style={{
      background: 'var(--background-color-light)', minHeight: '100dvh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile
        ? '10px 10px calc(10px + env(safe-area-inset-bottom))'
        : '32px 24px calc(32px + env(safe-area-inset-bottom))',
    }}>
      {showTermos && <TermosModal mode="view" onClose={() => setShowTermos(false)} />}

      <div style={{
        width: '100%', maxWidth: CARD_MAX,
        background: 'white', border: '1px solid var(--primary-light)', borderRadius: 14,
        boxShadow: 'var(--shadow-card)', overflow: 'hidden',
      }}>
        {comFaixa && (
          <WhatsAppContextStrip telefone={MOCK_TELEFONE_WHATSAPP} motivo={wa[motivo]} />
        )}
        <div style={{ padding: isMobile ? '12px 16px 12px' : '26px 32px 28px' }}>
          <MarcaFloripaOn />
          {conteudo}
        </div>
      </div>
    </div>
  );
}
