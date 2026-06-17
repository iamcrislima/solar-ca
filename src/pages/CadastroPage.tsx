import React, { useState } from 'react';
import FAIcon from '../components/FAIcon';
import TermosModal from '../components/TermosModal';

type TipoPessoa = 'fisica' | 'juridica';

interface EmailAdicional { id: number; email: string; }

export default function CadastroPage({
  onVoltar,
  onEntrar,
}: {
  onVoltar: () => void;
  onEntrar: () => void;
}) {
  const [tipo, setTipo] = useState<TipoPessoa>('fisica');

  // Pessoa física
  const [cpf,            setCpf]            = useState('');
  const [nome,           setNome]           = useState('');
  const [email,          setEmail]          = useState('');
  const [emailConf,      setEmailConf]      = useState('');
  const [senha,          setSenha]          = useState('');
  const [senhaConf,      setSenhaConf]      = useState('');
  const [showSenha,      setShowSenha]      = useState(false);
  const [showSenhaConf,  setShowSenhaConf]  = useState(false);
  const [sexo,           setSexo]           = useState('');
  const [dataNasc,       setDataNasc]       = useState('');
  const [nacionalidade,  setNacionalidade]  = useState('');
  const [telefone,       setTelefone]       = useState('');
  const [cep,            setCep]            = useState('');
  const [estado,         setEstado]         = useState('');
  const [cidade,         setCidade]         = useState('');
  const [bairro,         setBairro]         = useState('');
  const [logradouro,     setLogradouro]     = useState('');
  const [numero,         setNumero]         = useState('');
  const [complemento,    setComplemento]    = useState('');
  const [resideFloripa,  setResideFloripa]  = useState('');

  // Pessoa jurídica
  const [cnpj,           setCnpj]           = useState('');
  const [razaoSocial,    setRazaoSocial]    = useState('');
  const [nomeFantasia,   setNomeFantasia]   = useState('');
  const [responsavel,    setResponsavel]    = useState('');
  const [cpfResponsavel, setCpfResponsavel] = useState('');

  // E-mails adicionais
  const [emailsAdic, setEmailsAdic] = useState<EmailAdicional[]>([]);
  const [novoEmail,  setNovoEmail]  = useState('');
  const [emailAdicId, setEmailAdicId] = useState(1);

  // Termos
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [showTermos,    setShowTermos]    = useState(false);
  const [termosField,   setTermosField]   = useState<'uso' | 'privacidade'>('uso');

  function formatCpf(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 11);
    return d.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  function formatCnpj(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 14);
    return d.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }
  function formatTel(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 10) return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
    return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
  }
  function formatCep(v: string) {
    const d = v.replace(/\D/g, '').slice(0, 8);
    return d.replace(/(\d{5})(\d)/, '$1-$2');
  }

  function handleAdicionarEmail() {
    const trimmed = novoEmail.trim();
    if (!trimmed) return;
    setEmailsAdic(prev => [...prev, { id: emailAdicId, email: trimmed }]);
    setEmailAdicId(id => id + 1);
    setNovoEmail('');
  }
  function handleRemoverEmail(id: number) {
    setEmailsAdic(prev => prev.filter(e => e.id !== id));
  }

  const input: React.CSSProperties = {
    width: '100%', height: 44, border: '1px solid #c8d3e0', borderRadius: 8,
    padding: '0 12px', fontSize: 14, color: '#1a2332', background: 'white',
    boxSizing: 'border-box', outline: 'none', fontFamily: 'Open Sans, sans-serif',
  };
  const inputWrap: React.CSSProperties = {
    display: 'flex', alignItems: 'center', height: 44,
    border: '1px solid #c8d3e0', borderRadius: 8, background: 'white',
    padding: '0 12px', gap: 8, boxSizing: 'border-box',
  };
  const inputInner: React.CSSProperties = {
    flex: 1, border: 'none', outline: 'none', background: 'transparent',
    fontSize: 14, color: '#1a2332', fontFamily: 'Open Sans, sans-serif', minWidth: 0,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 4,
  };
  const fieldCol: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 4 };

  return (
    <>
      {showTermos && <TermosModal onClose={() => setShowTermos(false)} />}

      <div style={{ minHeight: '100%', background: '#f4f6f9', padding: '0 0 48px' }}>

        {/* Voltar */}
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px 0' }}>
          <button
            onClick={onVoltar}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#0058db', fontSize: 13, fontWeight: 600, padding: 0, fontFamily: 'Open Sans, sans-serif' }}
          >
            <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 12 }} />
            Voltar
          </button>
        </div>

        {/* Card principal */}
        <div style={{ maxWidth: 900, margin: '16px auto 0', background: 'white', borderRadius: 14, boxShadow: '0px 2px 16px rgba(24,39,75,0.08)', padding: '32px 36px 40px' }}>

          <h1 style={{ fontWeight: 700, fontSize: 24, color: '#0058db', margin: '0 0 24px' }}>Cadastro</h1>

          {/* Subtítulo */}
          <p style={{ fontWeight: 600, fontSize: 16, color: '#1a2332', textAlign: 'center', margin: '0 0 20px' }}>Criar conta</p>

          {/* Tipo de pessoa */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 28 }}>
            {(['fisica', 'juridica'] as TipoPessoa[]).map(t => (
              <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#1a2332' }}>
                <input
                  type="radio" name="tipoPessoa" value={t}
                  checked={tipo === t}
                  onChange={() => setTipo(t)}
                  style={{ accentColor: '#0058db', width: 16, height: 16, cursor: 'pointer' }}
                />
                {t === 'fisica' ? 'Pessoa Física' : 'Pessoa Jurídica'}
              </label>
            ))}
          </div>

          {tipo === 'fisica' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              {/* Linha 1: CPF + Nome */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>CPF <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="000.000.000-00" value={cpf} onChange={e => setCpf(formatCpf(e.target.value))} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Nome completo <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} />
                </div>
              </div>

              {/* Linha 2: Email + Confirmar Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Email <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Confirmar E-mail <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} type="email" placeholder="Confirmar e-mail" value={emailConf} onChange={e => setEmailConf(e.target.value)} />
                </div>
              </div>

              {/* Linha 3: Senha + Confirmar Senha */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Senha <span style={{ color: '#c0182d' }}>*</span></span>
                  <div style={inputWrap}>
                    <input style={inputInner} type={showSenha ? 'text' : 'password'} placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    <FAIcon icon={showSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 16, color: '#7d7d7d', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowSenha(v => !v)} />
                  </div>
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Confirmar Senha <span style={{ color: '#c0182d' }}>*</span></span>
                  <div style={inputWrap}>
                    <input style={inputInner} type={showSenhaConf ? 'text' : 'password'} placeholder="Confirmar Senha" value={senhaConf} onChange={e => setSenhaConf(e.target.value)} />
                    <FAIcon icon={showSenhaConf ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 16, color: '#7d7d7d', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowSenhaConf(v => !v)} />
                  </div>
                </div>
              </div>

              {/* E-mail Adicional */}
              <div style={{ border: '1px solid #c8d3e0', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: emailsAdic.length > 0 ? '1px solid #e8ecf2' : 'none', background: 'white' }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: '#1a2332' }}>E-mail Adicional</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                      style={{ height: 34, border: '1px solid #c8d3e0', borderRadius: 7, padding: '0 10px', fontSize: 13, color: '#1a2332', outline: 'none', width: 220, fontFamily: 'Open Sans, sans-serif' }}
                      type="email" placeholder="Digite o e-mail adicional"
                      value={novoEmail}
                      onChange={e => setNovoEmail(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdicionarEmail(); } }}
                    />
                    <button
                      onClick={handleAdicionarEmail}
                      style={{ height: 34, padding: '0 14px', borderRadius: 7, background: '#0058db', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 13, color: 'white', fontFamily: 'Open Sans, sans-serif' }}
                    >
                      <FAIcon icon="fa-regular fa-circle-plus" style={{ fontSize: 14 }} />
                      Incluir
                    </button>
                  </div>
                </div>
                {/* Tabela de emails adicionais */}
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', padding: '10px 18px', background: '#f7f9fc', borderBottom: '1px solid #e8ecf2' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#5f6b7a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>E-mail</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#5f6b7a', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>Ações</span>
                  </div>
                  {emailsAdic.length === 0 ? (
                    <div style={{ padding: '28px 18px', textAlign: 'center', color: '#7d7d7d', fontSize: 13 }}>
                      Nenhum e-mail adicional cadastrado
                    </div>
                  ) : (
                    emailsAdic.map((ea, i) => (
                      <div key={ea.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px', padding: '12px 18px', borderBottom: i < emailsAdic.length - 1 ? '1px solid #f0f2f5' : 'none', alignItems: 'center' }}>
                        <span style={{ fontSize: 14, color: '#1a2332' }}>{ea.email}</span>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleRemoverEmail(ea.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0182d', padding: 4, borderRadius: 4, display: 'flex', alignItems: 'center' }}
                            title="Remover"
                          >
                            <FAIcon icon="fa-regular fa-trash" style={{ fontSize: 14 }} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Linha 4: Sexo + Data de Nascimento */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Selecione seu sexo <span style={{ color: '#c0182d' }}>*</span></span>
                  <select style={{ ...input, cursor: 'pointer' }} value={sexo} onChange={e => setSexo(e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                    <option value="NI">Prefiro não informar</option>
                  </select>
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Data de Nascimento <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} type="date" value={dataNasc} onChange={e => setDataNasc(e.target.value)} />
                </div>
              </div>

              {/* Linha 5: Nacionalidade + Telefone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Nacionalidade <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Ex: Brasileira" value={nacionalidade} onChange={e => setNacionalidade(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Telefone <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="(48) 99999-9999" value={telefone} onChange={e => setTelefone(formatTel(e.target.value))} />
                </div>
              </div>

              {/* Linha 6: CEP + Estado + Cidade */}
              <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>CEP <span style={{ color: '#c0182d' }}>*</span></span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input style={{ ...input, flex: 1 }} placeholder="00000-000" value={cep} onChange={e => setCep(formatCep(e.target.value))} />
                  </div>
                  <span
                    style={{ fontSize: 12, color: '#0058db', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', marginTop: 2 }}
                    onClick={() => {/* futura integração ViaCEP */}}
                  >
                    Consultar CEP
                  </span>
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Estado <span style={{ color: '#c0182d' }}>*</span></span>
                  <select style={{ ...input, cursor: 'pointer' }} value={estado} onChange={e => setEstado(e.target.value)}>
                    <option value="">Selecione...</option>
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Cidade <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                </div>
              </div>

              {/* Linha 7: Bairro + Logradouro */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Bairro <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Bairro" value={bairro} onChange={e => setBairro(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Logradouro <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Rua, Avenida..." value={logradouro} onChange={e => setLogradouro(e.target.value)} />
                </div>
              </div>

              {/* Linha 8: Número + Complemento + Reside em Floripa */}
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Número <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Nº" value={numero} onChange={e => setNumero(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Complemento</span>
                  <input style={input} placeholder="Apto, bloco..." value={complemento} onChange={e => setComplemento(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Reside no município de Florianópolis?</span>
                  <select style={{ ...input, cursor: 'pointer' }} value={resideFloripa} onChange={e => setResideFloripa(e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </div>
            </div>

          ) : (
            /* Pessoa Jurídica */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>CNPJ <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="00.000.000/0000-00" value={cnpj} onChange={e => setCnpj(formatCnpj(e.target.value))} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Razão Social <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Razão Social" value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} />
                </div>
              </div>

              <div style={fieldCol}>
                <span style={labelStyle}>Nome Fantasia</span>
                <input style={input} placeholder="Nome Fantasia" value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Nome do Responsável <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Nome completo do responsável" value={responsavel} onChange={e => setResponsavel(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>CPF do Responsável <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="000.000.000-00" value={cpfResponsavel} onChange={e => setCpfResponsavel(formatCpf(e.target.value))} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Email <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Confirmar E-mail <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} type="email" placeholder="Confirmar e-mail" value={emailConf} onChange={e => setEmailConf(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Senha <span style={{ color: '#c0182d' }}>*</span></span>
                  <div style={inputWrap}>
                    <input style={inputInner} type={showSenha ? 'text' : 'password'} placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
                    <FAIcon icon={showSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 16, color: '#7d7d7d', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowSenha(v => !v)} />
                  </div>
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Confirmar Senha <span style={{ color: '#c0182d' }}>*</span></span>
                  <div style={inputWrap}>
                    <input style={inputInner} type={showSenhaConf ? 'text' : 'password'} placeholder="Confirmar Senha" value={senhaConf} onChange={e => setSenhaConf(e.target.value)} />
                    <FAIcon icon={showSenhaConf ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 16, color: '#7d7d7d', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowSenhaConf(v => !v)} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Telefone <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="(48) 99999-9999" value={telefone} onChange={e => setTelefone(formatTel(e.target.value))} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>CEP <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="00000-000" value={cep} onChange={e => setCep(formatCep(e.target.value))} />
                  <span style={{ fontSize: 12, color: '#0058db', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', marginTop: 2 }}>Consultar CEP</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Estado <span style={{ color: '#c0182d' }}>*</span></span>
                  <select style={{ ...input, cursor: 'pointer' }} value={estado} onChange={e => setEstado(e.target.value)}>
                    <option value="">Selecione...</option>
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Cidade <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Cidade" value={cidade} onChange={e => setCidade(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Logradouro <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Rua, Avenida..." value={logradouro} onChange={e => setLogradouro(e.target.value)} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr', gap: 16 }}>
                <div style={fieldCol}>
                  <span style={labelStyle}>Número <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Nº" value={numero} onChange={e => setNumero(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Complemento</span>
                  <input style={input} placeholder="Apto, bloco..." value={complemento} onChange={e => setComplemento(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Bairro <span style={{ color: '#c0182d' }}>*</span></span>
                  <input style={input} placeholder="Bairro" value={bairro} onChange={e => setBairro(e.target.value)} />
                </div>
                <div style={fieldCol}>
                  <span style={labelStyle}>Reside em Florianópolis?</span>
                  <select style={{ ...input, cursor: 'pointer' }} value={resideFloripa} onChange={e => setResideFloripa(e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Aceite de termos */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 28, padding: '16px 18px', background: '#f7f9fc', borderRadius: 10, border: '1px solid #e8ecf2' }}>
            <input
              type="checkbox" id="aceiteTermos"
              checked={aceitouTermos}
              onChange={e => setAceitouTermos(e.target.checked)}
              style={{ accentColor: '#0058db', width: 16, height: 16, marginTop: 2, cursor: 'pointer', flexShrink: 0 }}
            />
            <label htmlFor="aceiteTermos" style={{ fontSize: 13, color: '#333', lineHeight: 1.6, cursor: 'pointer' }}>
              Li e aceito os{' '}
              <span
                onClick={e => { e.preventDefault(); setTermosField('uso'); setShowTermos(true); }}
                style={{ color: '#0058db', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
              >
                Termos de uso
              </span>
              {' '}e{' '}
              <span
                onClick={e => { e.preventDefault(); setTermosField('privacidade'); setShowTermos(true); }}
                style={{ color: '#0058db', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}
              >
                Política de privacidade
              </span>
              .
            </label>
          </div>

          {/* Botão salvar */}
          <button
            onClick={() => { if (aceitouTermos) { /* futura integração API */ onEntrar(); } }}
            disabled={!aceitouTermos}
            style={{
              width: '100%', height: 50, marginTop: 20,
              background: aceitouTermos ? '#0058db' : '#b0bac7',
              border: 'none', borderRadius: 10, cursor: aceitouTermos ? 'pointer' : 'not-allowed',
              fontWeight: 700, fontSize: 15, color: 'white', fontFamily: 'Open Sans, sans-serif',
              transition: 'background 0.14s',
            }}
            onMouseEnter={e => { if (aceitouTermos) (e.currentTarget as HTMLButtonElement).style.background = '#0046b5'; }}
            onMouseLeave={e => { if (aceitouTermos) (e.currentTarget as HTMLButtonElement).style.background = '#0058db'; }}
          >
            Salvar e continuar
          </button>

          {/* Já possui conta */}
          <p style={{ textAlign: 'center', fontSize: 13, color: '#5f6b7a', margin: '16px 0 0' }}>
            Já possui uma conta?{' '}
            <span onClick={onEntrar} style={{ color: '#0058db', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
              Entrar
            </span>
            {' '}Ou{' '}
            <span onClick={onEntrar} style={{ color: '#0058db', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
              Esqueceu a senha?
            </span>
          </p>

        </div>
      </div>
    </>
  );
}
