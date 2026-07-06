import React, { useState } from 'react';
import FAIcon from './FAIcon';

// Dois documentos independentes, exibidos em abas na mesma modal.
// (No SolarBPM cada documento é configurado separadamente; o portal apenas consome.)
const TERMOS_USO: string[] = [
  'Este Portal de Atendimento é monitorado e auditado por administradores, o que permite identificar e rastrear o uso e o mau-uso dos mesmos, em caráter de segurança e sigilo do sistema;',
  'A senha é pessoal e intransferível, do que advirá minha responsabilidade pessoal por todo e qualquer prejuízo decorrente de sua cessão proposital a terceiros ainda que em caráter emergencial ou por necessidade de serviço;',
  'O uso indevido do Portal de Atendimento pode ter consequências, pelas quais assumo toda e qualquer responsabilidade legal.',
];

const POLITICA_PRIVACIDADE: string[] = [
  'Os dados pessoais fornecidos neste Portal são tratados em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018) e utilizados exclusivamente para a prestação dos serviços municipais solicitados.',
  'A Prefeitura Municipal de Florianópolis poderá comunicar dados a outros órgãos públicos quando exigido por lei ou necessário para a execução de políticas públicas, sempre observando os princípios da LGPD.',
  'O titular dos dados tem direito a solicitar acesso, correção, exclusão e portabilidade de suas informações pessoais, por meio dos canais oficiais de atendimento do Município.',
];

type Aba = 'termos' | 'privacidade';

// Formata ISO → "DD/MM/AAAA - HHhMM"
function formatAceite(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} - ${p(d.getHours())}h${p(d.getMinutes())}`;
}

export default function TermosModal({
  onClose,
  mode = 'view',
  onAceitar,
  aceiteEm = null,
}: {
  onClose: () => void;
  // 'view'  → consulta dentro do portal (mostra a data do aceite, botão Fechar)
  // 'aceite'→ gate obrigatório no primeiro acesso (checkbox + Voltar/Confirmar)
  mode?: 'view' | 'aceite';
  onAceitar?: () => void;
  aceiteEm?: string | null;
}) {
  const [aba, setAba]       = useState<Aba>('termos');
  const [aceito, setAceito] = useState(false);
  const isAceite = mode === 'aceite';

  const docs = aba === 'termos' ? TERMOS_USO : POLITICA_PRIVACIDADE;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.52)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
      // No modo aceite a navegação fica bloqueada: clicar fora não fecha.
      onClick={e => { if (!isAceite && e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: 'white', borderRadius: 14, maxWidth: 580, width: '100%',
        maxHeight: '86vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0px 12px 48px rgba(0,0,0,0.28)',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '20px 24px 0',
        }}>
          <h2 style={{
            flex: 1, fontWeight: 700, fontSize: 17, color: '#0058db',
            margin: 0, lineHeight: 1.4,
          }}>
            Termos de uso e Política de privacidade
          </h2>
          {!isAceite && (
            <button
              onClick={onClose}
              aria-label="Fechar"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#5f6b7a', padding: 4, display: 'flex', alignItems: 'center',
                flexShrink: 0, borderRadius: 6, transition: 'background 0.12s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#f2f4f7'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'none'}
            >
              <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 20 }} />
            </button>
          )}
        </div>

        {/* Abas */}
        <div style={{ display: 'flex', gap: 4, padding: '14px 24px 0', borderBottom: '1px solid #e8ecf2' }}>
          {([
            { id: 'termos' as Aba,      label: 'Termos de uso' },
            { id: 'privacidade' as Aba, label: 'Política de privacidade' },
          ]).map(tab => {
            const active = aba === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAba(tab.id)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '8px 14px 12px',
                  fontSize: 13, fontWeight: active ? 700 : 500,
                  color: active ? '#0058db' : '#565656',
                  borderBottom: active ? '3px solid #0058db' : '3px solid transparent',
                  marginBottom: -1,
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Banner data de aceite (modo view) */}
        {mode === 'view' && aceiteEm && (
          <div style={{ margin: '16px 24px 0', background: '#e6f9f0', border: '1px solid #b7e2c9', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <FAIcon icon="fa-regular fa-circle-check" style={{ fontSize: 15, color: '#0f6b3e', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#0f6b3e', fontWeight: 600 }}>
              Você concordou em: {formatAceite(aceiteEm)}
            </span>
          </div>
        )}

        {/* Conteúdo */}
        <div style={{ padding: '18px 24px 24px', overflowY: 'auto', flex: 1 }}>
          <p style={{ fontSize: 14, color: '#333', margin: '0 0 16px' }}>
            {aba === 'termos'
              ? 'Pelo presente termo, declaro estar ciente de que:'
              : 'Sobre o tratamento dos seus dados pessoais:'}
          </p>
          <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {docs.map((item, i) => (
              <li key={i} style={{ fontSize: 14, color: '#333', lineHeight: 1.75 }}>
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* Footer */}
        {isAceite ? (
          <div style={{ borderTop: '1px solid #e8ecf2', padding: '14px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={aceito}
                onChange={e => setAceito(e.target.checked)}
                style={{ accentColor: '#0058db', width: 16, height: 16, marginTop: 2, cursor: 'pointer', flexShrink: 0 }}
              />
              <span style={{ fontSize: 13, color: '#333', lineHeight: 1.5 }}>
                Li e aceito os <strong>termos de uso</strong> e a <strong>política de privacidade</strong>
              </span>
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                onClick={onClose}
                style={{
                  height: 40, padding: '0 20px', borderRadius: 8,
                  background: 'white', border: '1.5px solid #dde3ee', cursor: 'pointer',
                  fontWeight: 600, fontSize: 13, color: '#565656',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#f4f6f9'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}
              >
                Voltar
              </button>
              <button
                onClick={() => { if (aceito) onAceitar?.(); }}
                disabled={!aceito}
                style={{
                  height: 40, padding: '0 24px', borderRadius: 8,
                  background: aceito ? '#0058db' : '#b0bac7', border: 'none',
                  cursor: aceito ? 'pointer' : 'not-allowed',
                  fontWeight: 700, fontSize: 13, color: 'white',
                  display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 0.12s',
                }}
                onMouseEnter={e => { if (aceito) (e.currentTarget as HTMLButtonElement).style.background = '#0046b5'; }}
                onMouseLeave={e => { if (aceito) (e.currentTarget as HTMLButtonElement).style.background = '#0058db'; }}
              >
                <FAIcon icon="fa-regular fa-circle-check" style={{ fontSize: 14 }} />
                Confirmar
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '14px 24px', borderTop: '1px solid #e8ecf2', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={onClose}
              style={{
                height: 38, padding: '0 20px', borderRadius: 8,
                background: '#0058db', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: 13, color: 'white',
                transition: 'background 0.12s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#0046b5'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#0058db'}
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
