import React, { useState, Fragment } from 'react';
import { Button } from '@1doc/1ds-react';
import { useT } from '../i18n';
import type { Servico } from '../types';
import { MOCK_USER } from '../mocks';
import FAIcon from '../components/FAIcon';

export default function ServicoForm({ service }: { service: Servico }) {
  const t = useT();
  const [step,          setStep]          = useState(1);
  const [nome,          setNome]          = useState(MOCK_USER.nome);
  const [cpf]                             = useState(MOCK_USER.cpf);
  const [email,         setEmail]         = useState('');
  const [telefone,      setTelefone]      = useState('');
  const [descricao,     setDescricao]     = useState('');
  const [urgencia,      setUrgencia]      = useState('Normal');
  const [destino,       setDestino]       = useState(service.destino[0] ?? 'Cidadão');
  const [submitted,     setSubmitted]     = useState(false);
  const [protocolo]                       = useState(() => Math.floor(Math.random() * 900000 + 100000));

  const totalSteps = 3;

  const inp: React.CSSProperties = {
    background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 6, height: 44,
    padding: '0 12px', fontWeight: 400,
    fontSize: 14, color: 'var(--neutral-dark-pure)', width: '100%', boxSizing: 'border-box', outline: 'none',
    transition: 'border-color 0.15s',
  };
  const lbl: React.CSSProperties = {
    fontWeight: 600, fontSize: 11,
    color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 5, display: 'block',
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '64px 24px', minHeight: 400 }}>
        <div style={{ width: 80, height: 80, background: 'var(--success-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FAIcon icon="fa-regular fa-circle-check" style={{ fontSize: 38, color: 'var(--success-color)' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-ink)', marginBottom: 8 }}>{t('sfEnviada')}</div>
          <div style={{ fontSize: 15, color: 'var(--neutral-dark-down)', lineHeight: '22px', maxWidth: 480 }}>
            {t('sfEnviadaDesc1')} <strong>{service.servico}</strong> {t('sfEnviadaDesc2')} <strong>{t('meusProcessos')}</strong>.
          </div>
        </div>
        <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--card-border)', borderRadius: 8, padding: '14px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <FAIcon icon="fa-regular fa-clock" style={{ fontSize: 15, color: 'var(--primary-pure)' }} />
          <span style={{ fontSize: 13, color: 'var(--neutral-dark-down)' }}>{t('sfProtocolo')} <strong>PMF2026/{protocolo}</strong></span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>

      {/* Ttulo */}
      <div>
        <h1 style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-ink-strong)', margin: '0 0 4px 0' }}>
          {t('sfSolicitarPrefixo')} {service.servico}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--neutral-dark-down)', margin: 0 }}>
          {t('sfSubtitulo')}
        </p>
      </div>

      {/* Indicador de progresso */}
      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 8, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 0 }}>
        {[t('sfStepDados'), t('sfStepDetalhes'), t('sfStepDocumentos')].map((label, i) => {
          const s = i + 1;
          const done   = step > s;
          const active = step === s;
          return (
            <Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: done ? 'var(--success-color)' : active ? 'var(--primary-pure)' : 'var(--neutral-light-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                  {done
                    ? <FAIcon icon="fa-solid fa-check" style={{ fontSize: 13, color: 'white' }} />
                    : <span style={{ fontWeight: 700, fontSize: 13, color: active ? 'white' : 'var(--neutral-dark-up)' }}>{s}</span>
                  }
                </div>
                <span style={{ fontWeight: active ? 700 : 400, fontSize: 13, color: active ? 'var(--primary-pure)' : done ? 'var(--success-color)' : 'var(--neutral-dark-medium)', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: done ? 'var(--success-color)' : 'var(--neutral-light-down)', margin: '0 10px', minWidth: 20, transition: 'background 0.2s' }} />}
            </Fragment>
          );
        })}
      </div>

      {/* Card do formulrio */}
      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 10, padding: 28, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>

        {/*  Step 1: Dados pessoais  */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, color: 'var(--colors-neutral-01)', margin: 0, paddingBottom: 12, borderBottom: '1px solid var(--neutral-light-medium)' }}>
              {t('sfDadosSolicitante')}
            </h2>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 2 }}>
                <label style={lbl}>{t('mdNomeCompleto')}</label>
                <input value={nome} onChange={e => setNome(e.target.value)} style={inp} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>{t('mdCpf')}</label>
                <input value={cpf} readOnly style={{ ...inp, background: 'var(--background-color-light)', color: 'var(--neutral-label)', cursor: 'default' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={lbl}>{t('mdEmail')}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>{t('mdTelefone')}</label>
                <input value={telefone} onChange={e => setTelefone(e.target.value)} style={inp} />
              </div>
            </div>
            <div style={{ background: 'var(--info-bg)', border: '1px solid var(--info-border)', borderRadius: 6, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <FAIcon icon="fa-regular fa-circle-info" style={{ fontSize: 14, color: 'var(--primary-pure)', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'var(--info-dark)', lineHeight: '18px' }}>
                {t('sfAutoFill')}
              </span>
            </div>
          </div>
        )}

        {/*  Step 2: Detalhes  */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, color: 'var(--colors-neutral-01)', margin: 0, paddingBottom: 12, borderBottom: '1px solid var(--neutral-light-medium)' }}>
              {t('sfDetalhesTitle')}
            </h2>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 2 }}>
                <label style={lbl}>{t('sfServicoSolicitado')} *</label>
                <input value={service.servico} readOnly style={{ ...inp, background: 'var(--background-color-light)', color: 'var(--neutral-dark-down)', cursor: 'default' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>{t('sfAQuemDestina')} *</label>
                <select
                  value={destino}
                  onChange={e => setDestino(e.target.value)}
                  style={{ ...inp, cursor: 'pointer', appearance: 'none', paddingRight: 36, backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath fill=\'%238a9ab5\' d=\'M1 1l5 5 5-5\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'calc(100% - 12px) center' } as React.CSSProperties}
                >
                  <option value="Cidado">{t('destinoCidadao')}</option>
                  <option value="Empresa">{t('destinoEmpresa')}</option>
                  <option value="Visitante">{t('destinoVisitante')}</option>
                </select>
              </div>
            </div>
            <div>
              <label style={lbl}>{t('sfNivelUrgencia')}</label>
              <div style={{ display: 'flex', gap: 0, border: '1px solid var(--neutral-light-down)', borderRadius: 6, overflow: 'hidden' }}>
                {['Normal', 'Urgente', 'Muito urgente'].map((u, i) => {
                  const active = urgencia === u;
                  return (
                    <div key={u} onClick={() => setUrgencia(u)}
                      style={{ flex: 1, padding: '11px 0', textAlign: 'center', cursor: 'pointer', background: active ? 'var(--primary-pure)' : 'white', color: active ? 'white' : 'var(--neutral-dark-down)', fontSize: 13, fontWeight: active ? 700 : 400, borderRight: i < 2 ? '1px solid var(--neutral-light-down)' : 'none', transition: 'all 0.12s', userSelect: 'none' }}>
                      {u}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={lbl}>{t('sfDescricao')}</label>
              <textarea
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                placeholder={t('sfDescricaoPh')}
                style={{ ...inp, height: 130, padding: '10px 12px', resize: 'vertical', lineHeight: '21px' } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/*  Step 3: Documentos  */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 style={{ fontWeight: 700, fontSize: 18, color: 'var(--colors-neutral-01)', margin: 0, paddingBottom: 12, borderBottom: '1px solid var(--neutral-light-medium)' }}>
              {t('sfAnexarTitle')}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--neutral-dark-down)', margin: 0 }}>
              {t('sfAnexarDesc')}
            </p>
            {[
              { label: t('sfDocIdentificacao'), required: true },
              { label: t('sfCompResidencia'), required: true },
              { label: t('sfOutrosDocs'), required: false },
            ].map((doc) => (
              <div key={doc.label}
                style={{ border: '2px dashed var(--neutral-light-down)', borderRadius: 8, padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, cursor: 'pointer', transition: 'border-color 0.12s, background 0.12s', background: 'var(--bg-subtle)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--info-bg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-subtle)'; }}
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, background: 'var(--primary-bg-hover)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FAIcon icon="fa-regular fa-file-arrow-up" style={{ fontSize: 22, color: 'var(--primary-pure)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--neutral-dark-pure)' }}>
                      {doc.label} {doc.required && <span style={{ color: 'var(--error-required)' }}>*</span>}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', marginTop: 2 }}>{t('sfCliqueArquivo')}</div>
                  </div>
                </div>
                <button
                  style={{ height: 34, padding: '0 16px', border: '1.5px solid var(--primary-pure)', borderRadius: 6, background: 'white', color: 'var(--primary-pure)', fontWeight: 600, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
                  onClick={e => e.stopPropagation()}
                >
                  {t('sfSelecionar')}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botes de navegao */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 28, paddingTop: 18, borderTop: '1px solid var(--neutral-light-medium)' }}>
          {step > 1 && (
            <Button size="md" variant="secondary" onClick={() => setStep(s => s - 1)}>
              <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 14, marginRight: 6 }} />
              {t('sfVoltar')}
            </Button>
          )}
          {step < totalSteps ? (
            <Button size="md" variant="primary" onClick={() => setStep(s => s + 1)}>
              {t('sfProximo')}
              <FAIcon icon="fa-regular fa-arrow-right" style={{ fontSize: 14, marginLeft: 6 }} />
            </Button>
          ) : (
            <Button size="md" variant="primary" onClick={() => setSubmitted(true)}>
              {t('sfEnviarSolicitacao')}
              <FAIcon icon="fa-regular fa-paper-plane" style={{ fontSize: 14, marginLeft: 6 }} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}



