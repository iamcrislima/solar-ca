import React, { useState } from 'react';
import { useIsMobile } from '../i18n';
import { imgFloripa } from '../mocks';
import LoginPanel from './LoginPanel';
import type { PanelView } from './LoginPanel';

// Modal de login do portal: moldura + foto de Florianópolis. Todo o conteúdo
// (entrar, redefinir senha, criar conta) vive no LoginPanel, compartilhado com
// as rotas /whatsapp.
export default function LoginModal({
  onClose, onLogin, viewInicial = 'login',
}: {
  onClose: () => void;
  onLogin: () => void;
  onShowCadastro?: () => void;
  viewInicial?: 'login' | 'recovery';   // 'recovery' quando vem do "Esqueci a senha" de /whatsapp
}) {
  const isMobile = useIsMobile();
  const [view, setView] = useState<PanelView>(viewInicial);

  const isCadastroMode = view === 'cadastro' || view === 'sucesso';
  const showPhoto = !isMobile && !isCadastroMode;
  const formWidth = isMobile ? '100%' : (isCadastroMode ? 540 : 470);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: isMobile ? 'white' : 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? 0 : 32,
    }} onClick={e => { if (!isMobile && e.target === e.currentTarget) onClose(); }}>

      <div style={{
        display: 'flex', width: '100%',
        maxWidth: isMobile ? '100%' : (isCadastroMode ? 540 : 1100),
        height: isMobile ? '100%' : '90vh', maxHeight: isMobile ? '100%' : 800,
        borderRadius: isMobile ? 0 : 16, overflow: 'hidden',
        boxShadow: isMobile ? 'none' : '0px 10px 40px rgba(0,0,0,0.25)',
      }}>

        {/* Foto Florianópolis */}
        {showPhoto && (
          <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
            <img src={imgFloripa} alt="Florianópolis" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        )}

        {/* Painel */}
        <div style={{
          width: formWidth, flexShrink: 0, background: 'white',
          border: '1px solid var(--bg-subtle)',
          display: 'flex', flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          padding: isMobile ? '24px 24px 32px' : (isCadastroMode ? '32px 32px 28px' : '40px 40px 24px'),
          overflowY: 'auto',
        }}>
          <LoginPanel
            viewInicial={viewInicial}
            onViewChange={setView}
            mostrarFechar
            onFechar={onClose}
            onAutenticar={() => { onLogin(); onClose(); }}
          />
        </div>
      </div>
    </div>
  );
}
