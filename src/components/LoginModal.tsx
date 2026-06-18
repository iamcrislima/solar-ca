import React, { useState, Fragment } from 'react';
import { Button } from '@1doc/1ds-react';
import { useT, useIsMobile } from '../i18n';
import { imgFloripa } from '../mocks';
import FAIcon from './FAIcon';
import TermosModal from './TermosModal';

type ViewType = 'login' | 'recovery' | 'cadastro' | 'sucesso';
type TipoPessoa = 'fisica' | 'juridica';
interface EmailAdicional { id: number; email: string; }

function StepIndicator({ step }: { step: number }) {
  const STEPS = ['Acesso', 'Perfil', 'Endereço'];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
      {STEPS.map((lbl, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <Fragment key={n}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: done ? '#0f6b3e' : active ? '#0058db' : '#e4e8f0',
                color: (done || active) ? 'white' : '#8a9ab0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 13, transition: 'background 0.2s',
              }}>
                {done ? <FAIcon icon="fa-solid fa-check" style={{ fontSize: 11 }} /> : n}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: done ? '#0f6b3e' : active ? '#0058db' : '#8a9ab0', letterSpacing: '0.2px' }}>
                {lbl}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: n < step ? '#0f6b3e' : '#e4e8f0', margin: '15px 8px 0', transition: 'background 0.2s' }} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

const UF_LIST = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

export default function LoginModal({
  onClose, onLogin,
}: {
  onClose: () => void;
  onLogin: () => void;
  onShowCadastro?: () => void;
}) {
  const t = useT();
  const isMobile = useIsMobile();

  // ── View / step ──
  const [view,          setView]          = useState<ViewType>('login');
  const [step,          setStep]          = useState(1);

  // ── Login state ──
  const [email,         setEmail]         = useState('');
  const [senha,         setSenha]         = useState('');
  const [showSenha,     setShowSenha]     = useState(false);
  const [emailRecov,    setEmailRecov]    = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showTermos,    setShowTermos]    = useState(false);

  // ── Cadastro state ──
  const [tipo,           setTipo]           = useState<TipoPessoa>('fisica');
  // Step 1
  const [cpf,            setCpf]            = useState('');
  const [nome,           setNome]           = useState('');
  const [cnpj,           setCnpj]           = useState('');
  const [razaoSocial,    setRazaoSocial]    = useState('');
  const [cEmail,         setCEmail]         = useState('');
  const [cEmailConf,     setCEmailConf]     = useState('');
  const [cSenha,         setCSenha]         = useState('');
  const [cSenhaConf,     setCSenhaConf]     = useState('');
  const [cShowSenha,     setCShowSenha]     = useState(false);
  const [cShowSenhaConf, setCShowSenhaConf] = useState(false);
  // Step 2
  const [sexo,           setSexo]           = useState('');
  const [dataNasc,       setDataNasc]       = useState('');
  const [nacionalidade,  setNacionalidade]  = useState('');
  const [telefone,       setTelefone]       = useState('');
  const [nomeFantasia,   setNomeFantasia]   = useState('');
  const [responsavel,    setResponsavel]    = useState('');
  const [cpfResp,        setCpfResp]        = useState('');
  const [emailsAdic,     setEmailsAdic]     = useState<EmailAdicional[]>([]);
  const [novoEmail,      setNovoEmail]      = useState('');
  const [nextEId,        setNextEId]        = useState(1);
  // Step 3
  const [cep,            setCep]            = useState('');
  const [estado,         setEstado]         = useState('');
  const [cidade,         setCidade]         = useState('');
  const [bairro,         setBairro]         = useState('');
  const [logradouro,     setLogradouro]     = useState('');
  const [numero,         setNumero]         = useState('');
  const [complemento,    setComplemento]    = useState('');
  const [resideFloripa,  setResideFloripa]  = useState('');
  const [aceitouTermos,  setAceitouTermos]  = useState(false);

  // ── Formatters ──
  function fmtCpf(v: string) {
    const d = v.replace(/\D/g,'').slice(0,11);
    return d.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  }
  function fmtCnpj(v: string) {
    const d = v.replace(/\D/g,'').slice(0,14);
    return d.replace(/(\d{2})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1/$2').replace(/(\d{4})(\d{1,2})$/,'$1-$2');
  }
  function fmtTel(v: string) {
    const d = v.replace(/\D/g,'').slice(0,11);
    if (d.length <= 10) return d.replace(/(\d{2})(\d)/,'($1) $2').replace(/(\d{4})(\d)/,'$1-$2');
    return d.replace(/(\d{2})(\d)/,'($1) $2').replace(/(\d{5})(\d)/,'$1-$2');
  }
  function fmtCep(v: string) {
    const d = v.replace(/\D/g,'').slice(0,8);
    return d.replace(/(\d{5})(\d)/,'$1-$2');
  }

  function addEmailAdic() {
    const e = novoEmail.trim();
    if (!e) return;
    setEmailsAdic(prev => [...prev, { id: nextEId, email: e }]);
    setNextEId(n => n + 1);
    setNovoEmail('');
  }

  // ── Shared styles ──
  const inp: React.CSSProperties = {
    width: '100%', height: 40, border: '1px solid var(--neutral-dark-up)', borderRadius: 8,
    padding: '0 11px', fontSize: 13, color: 'var(--neutral-dark-pure)', background: 'white',
    boxSizing: 'border-box', outline: 'none',
  };
  const inpWrap: React.CSSProperties = {
    display: 'flex', alignItems: 'center', height: 40,
    border: '1px solid var(--neutral-dark-up)', borderRadius: 8,
    background: 'white', padding: '0 11px', gap: 8, boxSizing: 'border-box',
  };
  const inpEl: React.CSSProperties = {
    flex: 1, border: 'none', outline: 'none', background: 'transparent',
    fontSize: 13, color: 'var(--neutral-dark-pure)', minWidth: 0,
  };
  const lbl: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: 'var(--neutral-dark-pure)' };
  const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4 };
  const g2: React.CSSProperties  = { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 };
  const req = <span style={{ color: '#c0182d' }}>*</span>;

  // ── Login original styles (kept for existing views) ──
  const label: React.CSSProperties = { fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', lineHeight: '20px' };
  const inputStyle: React.CSSProperties = { background: 'white', border: '1px solid var(--neutral-dark-up)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 8, padding: 8, height: 44, width: '100%', boxSizing: 'border-box' };
  const inputEl2: React.CSSProperties = { flex: 1, border: 'none', outline: 'none', background: 'transparent', fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-pure)', minWidth: 0 };

  // ── Cadastro steps ──
  function renderStep1() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Tipo */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 28 }}>
          {(['fisica','juridica'] as TipoPessoa[]).map(tp => (
            <label key={tp} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontSize: 14, fontWeight: 500, color: 'var(--neutral-dark-pure)' }}>
              <input type="radio" name="tipoCad" value={tp} checked={tipo === tp} onChange={() => setTipo(tp)}
                style={{ accentColor: '#0058db', width: 15, height: 15, cursor: 'pointer' }} />
              {tp === 'fisica' ? 'Pessoa Física' : 'Pessoa Jurídica'}
            </label>
          ))}
        </div>

        {/* CPF/CNPJ + Nome */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '165px 1fr', gap: 12 }}>
          <div style={col}>
            <span style={lbl}>{tipo === 'fisica' ? 'CPF' : 'CNPJ'} {req}</span>
            {tipo === 'fisica'
              ? <input style={inp} placeholder="000.000.000-00" value={cpf} onChange={e => setCpf(fmtCpf(e.target.value))} />
              : <input style={inp} placeholder="00.000.000/0000-00" value={cnpj} onChange={e => setCnpj(fmtCnpj(e.target.value))} />
            }
          </div>
          <div style={col}>
            <span style={lbl}>{tipo === 'fisica' ? 'Nome completo' : 'Razão Social'} {req}</span>
            {tipo === 'fisica'
              ? <input style={inp} placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} />
              : <input style={inp} placeholder="Razão Social" value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} />
            }
          </div>
        </div>

        {/* Email + Confirmar */}
        <div style={g2}>
          <div style={col}>
            <span style={lbl}>Email {req}</span>
            <input style={inp} type="email" placeholder="seu@email.com" value={cEmail} onChange={e => setCEmail(e.target.value)} />
          </div>
          <div style={col}>
            <span style={lbl}>Confirmar E-mail {req}</span>
            <input style={inp} type="email" placeholder="Confirmar e-mail" value={cEmailConf} onChange={e => setCEmailConf(e.target.value)} />
          </div>
        </div>

        {/* Senha + Confirmar */}
        <div style={g2}>
          <div style={col}>
            <span style={lbl}>Senha {req}</span>
            <div style={inpWrap}>
              <input style={inpEl} type={cShowSenha ? 'text' : 'password'} placeholder="Senha" value={cSenha} onChange={e => setCSenha(e.target.value)} />
              <FAIcon icon={cShowSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 15, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0 }} onClick={() => setCShowSenha(v => !v)} />
            </div>
          </div>
          <div style={col}>
            <span style={lbl}>Confirmar Senha {req}</span>
            <div style={inpWrap}>
              <input style={inpEl} type={cShowSenhaConf ? 'text' : 'password'} placeholder="Confirmar" value={cSenhaConf} onChange={e => setCSenhaConf(e.target.value)} />
              <FAIcon icon={cShowSenhaConf ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 15, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0 }} onClick={() => setCShowSenhaConf(v => !v)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderStep2() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {tipo === 'fisica' ? (<>
          <div style={g2}>
            <div style={col}>
              <span style={lbl}>Sexo {req}</span>
              <select style={{ ...inp, cursor: 'pointer' }} value={sexo} onChange={e => setSexo(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
                <option value="NI">Prefiro não informar</option>
              </select>
            </div>
            <div style={col}>
              <span style={lbl}>Data de Nascimento {req}</span>
              <input style={inp} type="date" value={dataNasc} onChange={e => setDataNasc(e.target.value)} />
            </div>
          </div>
          <div style={g2}>
            <div style={col}>
              <span style={lbl}>Nacionalidade {req}</span>
              <input style={inp} placeholder="Ex: Brasileira" value={nacionalidade} onChange={e => setNacionalidade(e.target.value)} />
            </div>
            <div style={col}>
              <span style={lbl}>Telefone {req}</span>
              <input style={inp} placeholder="(48) 99999-9999" value={telefone} onChange={e => setTelefone(fmtTel(e.target.value))} />
            </div>
          </div>
        </>) : (<>
          <div style={col}>
            <span style={lbl}>Nome Fantasia</span>
            <input style={inp} placeholder="Nome Fantasia (opcional)" value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />
          </div>
          <div style={g2}>
            <div style={col}>
              <span style={lbl}>Nome do Responsável {req}</span>
              <input style={inp} placeholder="Nome do responsável" value={responsavel} onChange={e => setResponsavel(e.target.value)} />
            </div>
            <div style={col}>
              <span style={lbl}>CPF do Responsável {req}</span>
              <input style={inp} placeholder="000.000.000-00" value={cpfResp} onChange={e => setCpfResp(fmtCpf(e.target.value))} />
            </div>
          </div>
          <div style={{ ...col, maxWidth: '50%' }}>
            <span style={lbl}>Telefone {req}</span>
            <input style={inp} placeholder="(48) 99999-9999" value={telefone} onChange={e => setTelefone(fmtTel(e.target.value))} />
          </div>
        </>)}

        {/* E-mails adicionais */}
        <div style={{ border: '1px solid var(--neutral-light-down)', borderRadius: 9, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f7f9fc', borderBottom: emailsAdic.length > 0 ? '1px solid var(--neutral-light-medium)' : 'none', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--neutral-dark-pure)' }}>E-mail Adicional</span>
            <div style={{ display: 'flex', gap: 7 }}>
              <input
                style={{ height: 32, border: '1px solid var(--neutral-light-down)', borderRadius: 6, padding: '0 9px', fontSize: 12, outline: 'none', width: 170 }}
                type="email" placeholder="Digite e-mail adicional"
                value={novoEmail} onChange={e => setNovoEmail(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addEmailAdic(); } }}
              />
              <button onClick={addEmailAdic} style={{ height: 32, padding: '0 12px', borderRadius: 6, background: '#0058db', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: 'white' }}>
                <FAIcon icon="fa-regular fa-circle-plus" style={{ fontSize: 13 }} />
                Incluir
              </button>
            </div>
          </div>
          {emailsAdic.length === 0
            ? <div style={{ padding: '14px', textAlign: 'center', fontSize: 12, color: 'var(--neutral-dark-medium)' }}>Nenhum e-mail adicional</div>
            : <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px', padding: '7px 14px', background: '#f7f9fc', borderBottom: '1px solid var(--neutral-light-medium)' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--neutral-dark-medium)', textTransform: 'uppercase', letterSpacing: '0.4px' }}>E-mail</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--neutral-dark-medium)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Ação</span>
              </div>
              {emailsAdic.map((ea, i) => (
                <div key={ea.id} style={{ display: 'grid', gridTemplateColumns: '1fr 36px', padding: '9px 14px', borderBottom: i < emailsAdic.length - 1 ? '1px solid var(--neutral-light-medium)' : 'none', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: 'var(--neutral-dark-pure)' }}>{ea.email}</span>
                  <button onClick={() => setEmailsAdic(prev => prev.filter(e => e.id !== ea.id))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0182d', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, borderRadius: 4 }}>
                    <FAIcon icon="fa-regular fa-trash" style={{ fontSize: 13 }} />
                  </button>
                </div>
              ))}
            </>
          }
        </div>
      </div>
    );
  }

  function renderStep3() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* CEP + Estado + Cidade */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '148px 1fr 1fr', gap: 12 }}>
          <div style={col}>
            <span style={lbl}>CEP {req}</span>
            <input style={inp} placeholder="00000-000" value={cep} onChange={e => setCep(fmtCep(e.target.value))} />
            <span style={{ fontSize: 11, color: '#0058db', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', marginTop: 1 }}>Consultar CEP</span>
          </div>
          <div style={col}>
            <span style={lbl}>Estado {req}</span>
            <select style={{ ...inp, cursor: 'pointer' }} value={estado} onChange={e => setEstado(e.target.value)}>
              <option value="">UF</option>
              {UF_LIST.map(uf => <option key={uf} value={uf}>{uf}</option>)}
            </select>
          </div>
          <div style={col}>
            <span style={lbl}>Cidade {req}</span>
            <input style={inp} placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
          </div>
        </div>

        {/* Bairro + Logradouro */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: 12 }}>
          <div style={col}>
            <span style={lbl}>Bairro {req}</span>
            <input style={inp} placeholder="Bairro" value={bairro} onChange={e => setBairro(e.target.value)} />
          </div>
          <div style={col}>
            <span style={lbl}>Logradouro {req}</span>
            <input style={inp} placeholder="Rua, Avenida..." value={logradouro} onChange={e => setLogradouro(e.target.value)} />
          </div>
        </div>

        {/* Número + Complemento + Reside */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '100px 1fr 1fr', gap: 12 }}>
          <div style={col}>
            <span style={lbl}>Número {req}</span>
            <input style={inp} placeholder="Nº" value={numero} onChange={e => setNumero(e.target.value)} />
          </div>
          <div style={col}>
            <span style={lbl}>Complemento</span>
            <input style={inp} placeholder="Apto, bloco..." value={complemento} onChange={e => setComplemento(e.target.value)} />
          </div>
          <div style={col}>
            <span style={lbl}>Reside em Florianópolis?</span>
            <select style={{ ...inp, cursor: 'pointer' }} value={resideFloripa} onChange={e => setResideFloripa(e.target.value)}>
              <option value="">Selecione...</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </select>
          </div>
        </div>

        {/* Aceite */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '12px 14px', background: '#f7f9fc', borderRadius: 9, border: '1px solid var(--neutral-light-down)', marginTop: 4 }}>
          <input type="checkbox" id="aceiteT" checked={aceitouTermos} onChange={e => setAceitouTermos(e.target.checked)}
            style={{ accentColor: '#0058db', width: 15, height: 15, marginTop: 2, cursor: 'pointer', flexShrink: 0 }} />
          <label htmlFor="aceiteT" style={{ fontSize: 12, color: 'var(--neutral-dark-pure)', lineHeight: 1.6, cursor: 'pointer' }}>
            Li e aceito os{' '}
            <span onClick={e => { e.preventDefault(); setShowTermos(true); }} style={{ color: '#0058db', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Termos de uso</span>
            {' '}e{' '}
            <span onClick={e => { e.preventDefault(); setShowTermos(true); }} style={{ color: '#0058db', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Política de privacidade</span>
          </label>
        </div>
      </div>
    );
  }

  function renderNavButtons() {
    return (
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        {step > 1 && (
          <button onClick={() => setStep(s => s - 1)}
            style={{ flex: step === 3 ? '0 0 auto' : 1, height: 44, padding: '0 20px', border: '1.5px solid var(--primary-pure)', borderRadius: 9, background: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 13, color: 'var(--primary-pure)', display: 'flex', alignItems: 'center', gap: 7 }}>
            <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 12 }} />
            Anterior
          </button>
        )}
        {step < 3 ? (
          <button onClick={() => setStep(s => s + 1)}
            style={{ flex: 1, height: 44, border: 'none', borderRadius: 9, background: '#0058db', cursor: 'pointer', fontWeight: 600, fontSize: 13, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, transition: 'background 0.13s' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#0046b5'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#0058db'}>
            Próximo
            <FAIcon icon="fa-regular fa-arrow-right" style={{ fontSize: 12 }} />
          </button>
        ) : (
          <button
            onClick={() => { if (aceitouTermos) setView('sucesso'); }}
            disabled={!aceitouTermos}
            style={{ flex: 1, height: 44, border: 'none', borderRadius: 9, background: aceitouTermos ? '#0058db' : '#b0bac7', cursor: aceitouTermos ? 'pointer' : 'not-allowed', fontWeight: 700, fontSize: 13, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, transition: 'background 0.13s' }}
            onMouseEnter={e => { if (aceitouTermos) (e.currentTarget as HTMLButtonElement).style.background = '#0046b5'; }}
            onMouseLeave={e => { if (aceitouTermos) (e.currentTarget as HTMLButtonElement).style.background = '#0058db'; }}>
            <FAIcon icon="fa-regular fa-user-check" style={{ fontSize: 14 }} />
            Criar conta
          </button>
        )}
      </div>
    );
  }

  const isCadastroMode = view === 'cadastro' || view === 'sucesso';
  const showPhoto = !isMobile && !isCadastroMode;
  const formWidth = isMobile ? '100%' : (isCadastroMode ? 540 : 470);

  return (
    <>
      {showTermos && <TermosModal onClose={() => setShowTermos(false)} />}
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

          {/* Form panel */}
          <div style={{
            width: formWidth, flexShrink: 0, background: 'white',
            border: '1px solid var(--bg-subtle)',
            display: 'flex', flexDirection: 'column',
            justifyContent: isMobile ? 'flex-start' : 'space-between',
            padding: isMobile ? '24px 24px 32px' : (isCadastroMode ? '32px 32px 28px' : '40px 40px 24px'),
            overflowY: 'auto',
          }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? 8 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {view === 'cadastro' && (
                  <button onClick={() => { setView('login'); setStep(1); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0058db', padding: '0 4px 0 0', display: 'flex', alignItems: 'center' }}>
                    <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 14 }} />
                  </button>
                )}
                <span style={{ fontWeight: 700, fontSize: 28, color: 'var(--primary-pure)', letterSpacing: '-0.5px', lineHeight: 1 }}>FloripaOn</span>
              </div>
              {(isMobile || isCadastroMode) && (
                <button onClick={onClose}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--neutral-dark-medium)', padding: 6, display: 'flex', alignItems: 'center', borderRadius: 6 }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#f2f4f7'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'none'}>
                  <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 20 }} />
                </button>
              )}
            </div>

            {/* ── CADASTRO ── */}
            {view === 'cadastro' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: 24 }}>
                <p style={{ fontWeight: 700, fontSize: 20, color: 'var(--neutral-dark-pure)', margin: '0 0 20px' }}>Criar conta</p>
                <StepIndicator step={step} />
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {renderNavButtons()}
                <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--neutral-dark-medium)', margin: '16px 0 0' }}>
                  Já possui uma conta?{' '}
                  <span onClick={() => { setView('login'); setStep(1); }} style={{ color: '#0058db', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Entrar</span>
                </p>
              </div>
            )}

            {/* ── SUCESSO ── */}
            {view === 'sucesso' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center', padding: '24px 0' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#e6f9f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FAIcon icon="fa-solid fa-circle-check" style={{ fontSize: 40, color: '#0f6b3e' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{ fontWeight: 700, fontSize: 20, color: 'var(--neutral-dark-pure)', margin: 0 }}>Conta criada com sucesso!</p>
                  <p style={{ fontSize: 14, color: 'var(--neutral-dark-medium)', margin: 0, lineHeight: 1.6 }}>
                    Você já pode acessar o FloripaOn<br />com suas credenciais.
                  </p>
                </div>
                <button
                  onClick={() => { setView('login'); setStep(1); setShowLoginForm(true); }}
                  style={{ height: 46, padding: '0 32px', borderRadius: 9, background: '#0058db', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, color: 'white', transition: 'background 0.13s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#0046b5'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = '#0058db'}>
                  Fazer login
                </button>
              </div>
            )}

            {/* ── LOGIN ── */}
            {view === 'login' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, marginTop: 32 }}>
                <p style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-dark-pure)', margin: 0, letterSpacing: '0.12px' }}>
                  {t('boasVindas')}
                </p>

                <a href="https://sso.acesso.gov.br/login?client_id=floripa.sc.gov.br&authorization_id=19dadc40977" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={{ width: '100%', height: 52, borderRadius: 10, background: 'var(--govbr-color)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontWeight: 700, fontSize: 15, color: 'white', boxShadow: '0px 2px 8px rgba(19,81,180,0.30)', transition: 'background 0.12s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-hover)'}
                    onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-color)'}>
                    <FAIcon icon="fa-regular fa-shield-check" style={{ fontSize: 18 }} />
                    Entrar com <strong style={{ fontSize: 20, letterSpacing: '0.09px' }}>gov.br</strong>
                  </button>
                </a>
                <p style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', textAlign: 'center', margin: 0, lineHeight: '18px' }}>{t('loginGovBrRecomendado')}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
                  <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--neutral-dark-down)', whiteSpace: 'nowrap' }}>ou</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
                </div>

                <button style={{ width: '100%', height: 48, borderRadius: 10, background: 'white', border: '1.5px solid var(--cert-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontWeight: 700, fontSize: 14, color: 'var(--cert-color)', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--cert-bg-hover)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}>
                  <FAIcon icon="fa-regular fa-certificate" style={{ fontSize: 18, color: 'var(--cert-color)' }} />
                  {t('certDigital')}
                </button>
                <p style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', textAlign: 'center', margin: 0, lineHeight: '18px' }}>{t('certDigitalDesc')}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
                  <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--neutral-dark-down)', whiteSpace: 'nowrap' }}>ou {t('loginEntrarSistema')}</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
                </div>

                {!showLoginForm ? (
                  <button onClick={() => setShowLoginForm(true)} style={{ width: '100%', height: 44, border: '1.5px solid var(--neutral-light-down)', borderRadius: 8, background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, fontSize: 14, color: 'var(--neutral-dark-down)', transition: 'all 0.12s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-pure)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-pure)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--neutral-light-down)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--neutral-dark-down)'; }}>
                    <FAIcon icon="fa-regular fa-arrow-right-to-bracket" style={{ fontSize: 14 }} />
                    {t('loginEntrarSistema')}
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={label}>Email <span style={{ color: 'var(--error-required)' }}>*</span></span>
                      <div style={inputStyle}><input style={inputEl2} type="email" placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={label}>Senha <span style={{ color: 'var(--error-required)' }}>*</span></span>
                      <div style={inputStyle}>
                        <input style={inputEl2} type={showSenha ? 'text' : 'password'} placeholder="Senha FloripaOn" value={senha} onChange={e => setSenha(e.target.value)} />
                        <FAIcon icon={showSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 16, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowSenha(v => !v)} />
                      </div>
                      <span onClick={() => setView('recovery')} style={{ fontWeight: 600, fontSize: 12, color: 'var(--primary-pure)', textDecoration: 'underline', cursor: 'pointer' }}>Esqueci a senha</span>
                    </div>
                    <Button size="md" variant="primary" onClick={() => { onLogin(); onClose(); }} style={{ width: '100%' }}>Entrar</Button>
                    <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', textAlign: 'center', margin: 0 }}>
                      Não possui conta?{' '}
                      <span onClick={() => { setView('cadastro'); setStep(1); }} style={{ fontWeight: 700, color: 'var(--primary-pure)', cursor: 'pointer', textDecoration: 'underline' }}>
                        Criar conta
                      </span>
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--neutral-dark-medium)', textAlign: 'center', margin: 0 }}>
                      Ao entrar você concorda com os{' '}
                      <span onClick={() => setShowTermos(true)} style={{ fontWeight: 600, color: 'var(--primary-pure)', cursor: 'pointer', textDecoration: 'underline' }}>
                        Termos de Uso e Política de Privacidade
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── RECOVERY ── */}
            {view === 'recovery' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, marginTop: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-dark-pure)', margin: 0, letterSpacing: '0.12px' }}>Redefinição de senha</p>
                  <p style={{ fontWeight: 400, fontSize: 14, color: 'var(--neutral-dark-down)', margin: 0, lineHeight: '20px', letterSpacing: '0.07px' }}>
                    Informe seu e-mail no campo abaixo e enviaremos instruções para você redefinir sua senha com segurança.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={label}>Email cadastrado <span style={{ color: 'var(--error-required)' }}>*</span></span>
                    <div style={inputStyle}><input style={inputEl2} type="email" placeholder="Digite seu email" value={emailRecov} onChange={e => setEmailRecov(e.target.value)} /></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Button size="md" variant="primary" style={{ width: '100%' }}>Redefinir senha</Button>
                    <Button size="md" variant="secondary" onClick={() => setView('login')} style={{ width: '100%' }}>
                      <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 14, marginRight: 6 }} />
                      Voltar
                    </Button>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
                  <span style={{ fontWeight: 400, fontSize: 12, color: 'var(--neutral-dark-down)', whiteSpace: 'nowrap', letterSpacing: '0.06px' }}>Ou continuar com</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--neutral-light-down)' }} />
                </div>
                <button style={{ width: '100%', height: 52, border: 'none', borderRadius: 10, background: 'var(--govbr-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontWeight: 700, fontSize: 15, color: 'white', boxShadow: '0px 2px 8px rgba(19,81,180,0.30)', transition: 'background 0.12s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-hover)'}
                  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--govbr-color)'}>
                  <FAIcon icon="fa-regular fa-shield-check" style={{ fontSize: 18 }} />
                  Entrar com <strong style={{ fontSize: 20, letterSpacing: '0.09px' }}>gov.br</strong>
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
