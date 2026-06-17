import React from 'react';
import FAIcon from './FAIcon';

const TERMOS: string[] = [
  'Este Portal de Atendimento é monitorado e auditado por administradores, o que permite identificar e rastrear o uso e o mau-uso dos mesmos, em caráter de segurança e sigilo do sistema;',
  'A senha é pessoal e intransferível, do que advirá minha responsabilidade pessoal por todo e qualquer prejuízo decorrente de sua cessão proposital a terceiros ainda que em caráter emergencial ou por necessidade de serviço;',
  'O uso indevido do Portal de Atendimento pode ter consequências, pelas quais assumo toda e qualquer responsabilidade legal.',
  'Os dados pessoais fornecidos neste Portal são tratados em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018) e utilizados exclusivamente para a prestação dos serviços municipais solicitados.',
  'A Prefeitura Municipal de Florianópolis poderá comunicar dados a outros órgãos públicos quando exigido por lei ou necessário para a execução de políticas públicas, sempre observando os princípios da LGPD.',
  'O titular dos dados tem direito a solicitar acesso, correção, exclusão e portabilidade de suas informações pessoais, por meio dos canais oficiais de atendimento do Município.',
];

export default function TermosModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.52)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: 'white', borderRadius: 14, maxWidth: 560, width: '100%',
        maxHeight: '82vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0px 12px 48px rgba(0,0,0,0.28)',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
          padding: '22px 24px 18px',
          borderBottom: '1px solid #e8ecf2',
        }}>
          <h2 style={{
            flex: 1, fontWeight: 700, fontSize: 17, color: '#0058db',
            textAlign: 'center', margin: 0, lineHeight: 1.4,
          }}>
            Termo de condições de uso e política de privacidade
          </h2>
          <button
            onClick={onClose}
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
        </div>

        {/* Conteúdo */}
        <div style={{ padding: '20px 24px 28px', overflowY: 'auto', flex: 1 }}>
          <p style={{ fontSize: 14, color: '#333', marginBottom: 16, margin: '0 0 16px' }}>
            Pelo presente termo, ciente de que:
          </p>
          <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {TERMOS.map((item, i) => (
              <li key={i} style={{ fontSize: 14, color: '#333', lineHeight: 1.75 }}>
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px', borderTop: '1px solid #e8ecf2',
          display: 'flex', justifyContent: 'flex-end',
        }}>
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
      </div>
    </div>
  );
}
