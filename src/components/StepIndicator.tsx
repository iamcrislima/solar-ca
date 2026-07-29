import React, { Fragment } from 'react';
import FAIcon from './FAIcon';

// ── Stepper — fonte única ────────────────────────────────────────────────────
// Extraído do LoginModal (cadastro em 3 passos). Os rótulos vêm por prop porque
// o cadastro do portal e o cadastro do fluxo do WhatsApp nomeiam as etapas de
// formas diferentes; o visual é o mesmo.
export default function StepIndicator({ step, steps }: { step: number; steps: string[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
      {steps.map((lbl, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <Fragment key={n}>
            {/* Largura fixa por etapa: com rótulos longos ("Criação de senha") o
                texto quebra em duas linhas em vez de estourar o card em 320px. */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flex: '0 0 76px', width: 76 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: done ? 'var(--success-color)' : active ? 'var(--primary-pure)' : '#e4e8f0',
                color: (done || active) ? 'white' : '#8a9ab0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13, transition: 'background 0.2s',
              }}>
                {done ? <FAIcon icon="fa-solid fa-check" style={{ fontSize: 11 }} /> : n}
              </div>
              <span style={{
                fontSize: 10.5, fontWeight: 600, textAlign: 'center', lineHeight: 1.2, wordBreak: 'break-word',
                color: done ? 'var(--success-color)' : active ? 'var(--primary-pure)' : '#8a9ab0',
                letterSpacing: '0.2px',
              }}>
                {lbl}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: n < step ? 'var(--success-color)' : '#e4e8f0', margin: '15px 8px 0', transition: 'background 0.2s' }} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
