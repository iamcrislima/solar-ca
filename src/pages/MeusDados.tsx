import React, { useState } from 'react';
import { Button } from '@1doc/1ds-react';
import { useT } from '../i18n';
import FAIcon from '../components/FAIcon';
import { MOCK_USER } from '../mocks';

//  Estilos compartilhados 
const LBL_STYLE: React.CSSProperties = {
  fontWeight: 600, fontSize: 11,
  color: 'var(--neutral-label)', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px', marginBottom: 4,
};

// Field extrado para fora  evita unmount/remount a cada re-render do pai
function Field({ label, children, flex }: { label: string; children: React.ReactNode; flex?: number | string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: flex ?? 1, minWidth: 0 }}>
      <label style={LBL_STYLE}>{label}</label>
      {children}
    </div>
  );
}

//  Tela: Meus Dados 
export default function MeusDados() {
  const t = useT();
  const [activeTab,        setActiveTab]        = useState<'dados' | 'senha'>('dados');
  const [nome,             setNome]             = useState(MOCK_USER.nome);
  const [senhaAtual,       setSenhaAtual]       = useState('');
  const [senha,            setSenha]            = useState('');
  const [confirmarSenha,   setConfirmarSenha]   = useState('');
  const [showSenhaAtual,   setShowSenhaAtual]   = useState(false);
  const [showSenha,        setShowSenha]        = useState(false);
  const [showConfSenha,    setShowConfSenha]    = useState(false);
  const [email,            setEmail]            = useState('emaildoandersonalves@gmail.com');
  const [confirmarEmail,   setConfirmarEmail]   = useState('emaildoandersonalves@gmail.com');
  const [sexo,             setSexo]             = useState('Masculino');
  const [nascimento,       setNascimento]       = useState('08/08/1988');
  const [nacionalidade,    setNacionalidade]    = useState('brasileiro');
  const [telefone,         setTelefone]         = useState('(86) 99968-8687');
  const [cep,              setCep]              = useState('81230-170');
  const [estado,           setEstado]           = useState('PR');
  const [cidade,           setCidade]           = useState('Curitiba');
  const [bairro,           setBairro]           = useState('Campo Comprido');
  const [logradouro,       setLogradouro]       = useState('Rua Renato Polatti');
  const [numero,           setNumero]           = useState('3651');
  const [complemento,      setComplemento]      = useState('b6 75');
  const [resideFloripa,    setResideFloripa]    = useState('');
  const [emailsAdicionais, setEmailsAdicionais] = useState<string[]>([]);
  const [novoEmail,        setNovoEmail]        = useState('');

  //  Estilos reutilizveis 
  const inp: React.CSSProperties = {
    background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 6, height: 44,
    padding: '0 12px', fontWeight: 400,
    fontSize: 14, color: 'var(--neutral-dark-pure)', width: '100%', boxSizing: 'border-box', outline: 'none',
    transition: 'border-color 0.15s',
  };
  const inpReadOnly: React.CSSProperties = { ...inp, background: 'var(--background-color-light)', color: 'var(--neutral-label)', cursor: 'default' };
  const inpPassword: React.CSSProperties = { ...inp, flex: 1, border: 'none', padding: 0, height: '100%' };
  const passwordBox: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 6, height: 44,
    padding: '0 12px', boxSizing: 'border-box',
  };
  const alertBanner = (text: string): React.ReactElement => (
    <div style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning-color)', borderRadius: 6, padding: '10px 16px', fontWeight: 400, fontSize: 13, color: 'var(--warning-color)', textAlign: 'center' }}>
      {text}
    </div>
  );

  const tabBtn = (id: 'dados' | 'senha', label: string, icon: string) => {
    const active = activeTab === id;
    return (
      <button
        key={id}
        onClick={() => setActiveTab(id)}
        style={{
          background: 'none', border: 'none',
          borderBottom: active ? '3px solid var(--primary-pure)' : '3px solid transparent',
          padding: '10px 16px',
          fontSize: 13, fontWeight: active ? 700 : 500,
          color: active ? 'var(--primary-pure)' : 'var(--neutral-dark-pure)',
          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
        }}
      >
        <FAIcon icon={icon} style={{ fontSize: 13 }} />
        {label}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>
      <h1 style={{ fontWeight: 700, fontSize: 24, color: 'var(--neutral-ink-strong)', margin: 0 }}>{t('meusDados')}</h1>

      {/* Tabs (card isolado) */}
      <div style={{ background: 'white', border: '1px solid var(--neutral-light-down)', borderRadius: 8, padding: '4px 8px', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {tabBtn('dados', t('perfilAbaDados'), 'fa-regular fa-id-card')}
        {tabBtn('senha', t('perfilAbaSenha'), 'fa-regular fa-lock')}
      </div>

      {activeTab === 'dados' && (
      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 8, padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>

        {/*  Identificao  */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontWeight: 700, fontSize: 15, color: 'var(--colors-neutral-01)', margin: 0, paddingBottom: 8, borderBottom: '1px solid var(--neutral-light-medium)' }}>{t('identificacao')}</h2>
          {alertBanner(t('mdCompletarCadastro'))}
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label={t('mdCpf')} flex={1}>
              <input value="043.792.234-00" readOnly style={inpReadOnly} />
            </Field>
            <Field label={t('mdNomeCompleto')} flex={2}>
              <input value={nome} onChange={e => setNome(e.target.value)} style={inp} />
            </Field>
          </div>
        </div>

        {/*  Acesso (e-mails)  */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontWeight: 700, fontSize: 15, color: 'var(--colors-neutral-01)', margin: 0, paddingBottom: 8, borderBottom: '1px solid var(--neutral-light-medium)' }}>{t('mdEmailAcesso')}</h2>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label={t('mdEmail')}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
            </Field>
            <Field label={t('mdConfirmarEmail')}>
              <input type="email" value={confirmarEmail} onChange={e => setConfirmarEmail(e.target.value)} style={inp} />
            </Field>
          </div>
        </div>

        {/*  E-mails adicionais  */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--neutral-light-medium)' }}>
            <h2 style={{ fontWeight: 700, fontSize: 15, color: 'var(--colors-neutral-01)', margin: 0 }}>{t('mdEmailAdicional')}</h2>
            <Button size="sm" variant="primary" onClick={() => { if (novoEmail.trim()) { setEmailsAdicionais(v => [...v, novoEmail.trim()]); setNovoEmail(''); } }}>
              <FAIcon icon="fa-regular fa-plus" style={{ fontSize: 13, marginRight: 4 }} />{t('mdIncluir')}
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <Field label={t('mdNovoEmail')} flex={1}>
              <input type="email" value={novoEmail} onChange={e => setNovoEmail(e.target.value)} placeholder={t('mdNovoEmailPh')} style={inp} />
            </Field>
          </div>
          {emailsAdicionais.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: '85%' }} /><col style={{ width: '15%' }} /></colgroup>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--neutral-light-down)' }}>
                  <th style={{ fontWeight: 600, fontSize: 13, color: 'var(--neutral-dark-medium)', padding: '6px 0', textAlign: 'left' }}>{t('mdEmailCol')}</th>
                  <th style={{ fontWeight: 600, fontSize: 13, color: 'var(--neutral-dark-medium)', padding: '6px 0', textAlign: 'center' }}>{t('mdAcoes')}</th>
                </tr>
              </thead>
              <tbody>
                {emailsAdicionais.map((em) => (
                  <tr key={em} style={{ borderBottom: '1px solid var(--neutral-light-medium)' }}>
                    <td style={{ fontSize: 14, color: 'var(--neutral-dark-pure)', padding: '8px 0' }}>{em}</td>
                    <td style={{ textAlign: 'center' }}>
                      <FAIcon icon="fa-regular fa-trash" style={{ fontSize: 15, color: 'var(--error-color)', cursor: 'pointer' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/*  Dados pessoais  */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontWeight: 700, fontSize: 15, color: 'var(--colors-neutral-01)', margin: 0, paddingBottom: 8, borderBottom: '1px solid var(--neutral-light-medium)' }}>{t('dadosPessoais')}</h2>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label={t('mdSexo')}>
              <div style={{ position: 'relative' }}>
                <select value={sexo} onChange={e => setSexo(e.target.value)} style={{ ...inp, appearance: 'none', WebkitAppearance: 'none', paddingRight: 32, cursor: 'pointer' }}>
                  <option value="Masculino">{t('mdMasculino')}</option>
                  <option value="Feminino">{t('mdFeminino')}</option>
                  <option value="No informado">{t('mdNaoInformado')}</option>
                </select>
                <FAIcon icon="fa-regular fa-chevron-down" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--neutral-label)', pointerEvents: 'none' }} />
              </div>
            </Field>
            <Field label={t('mdDataNasc')}>
              <input value={nascimento} onChange={e => setNascimento(e.target.value)} placeholder={t('mdNascPh')} style={inp} />
            </Field>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label={t('mdNacionalidade')}>
              <input value={nacionalidade} onChange={e => setNacionalidade(e.target.value)} style={inp} />
            </Field>
            <Field label={t('mdTelefone')}>
              <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder={t('mdTelefonePh')} style={inp} />
            </Field>
          </div>
        </div>

        {/*  Endereo  */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontWeight: 700, fontSize: 15, color: 'var(--colors-neutral-01)', margin: 0, paddingBottom: 8, borderBottom: '1px solid var(--neutral-light-medium)' }}>{t('endereco')}</h2>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <Field label={t('mdCep')} flex="none">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input value={cep} onChange={e => setCep(e.target.value)} placeholder={t('mdCepPh')} style={{ ...inp, width: 140 }} />
                <span style={{ fontWeight: 600, fontSize: 12, color: 'var(--primary-pure)', whiteSpace: 'nowrap', cursor: 'pointer', textDecoration: 'underline' }}>{t('mdConsultarCep')}</span>
              </div>
            </Field>
            <Field label={t('mdEstado')} flex="none">
              <input value={estado} onChange={e => setEstado(e.target.value)} style={{ ...inp, width: 80 }} />
            </Field>
            <Field label={t('mdCidade')}>
              <input value={cidade} onChange={e => setCidade(e.target.value)} style={inp} />
            </Field>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label={t('mdBairro')}>
              <input value={bairro} onChange={e => setBairro(e.target.value)} style={inp} />
            </Field>
            <Field label={t('mdLogradouro')}>
              <input value={logradouro} onChange={e => setLogradouro(e.target.value)} style={inp} />
            </Field>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label={t('mdNumero')} flex="none">
              <input value={numero} onChange={e => setNumero(e.target.value)} style={{ ...inp, width: 120 }} />
            </Field>
            <Field label={t('mdComplemento')}>
              <input value={complemento} onChange={e => setComplemento(e.target.value)} style={inp} />
            </Field>
            <Field label={t('mdResideFloripa')}>
              <div style={{ position: 'relative' }}>
                <select value={resideFloripa} onChange={e => setResideFloripa(e.target.value)} style={{ ...inp, appearance: 'none', WebkitAppearance: 'none', paddingRight: 32, cursor: 'pointer' }}>
                  <option value="">{t('mdSelecione')}</option>
                  <option value="sim">{t('mdSim')}</option>
                  <option value="nao">{t('mdNao')}</option>
                </select>
                <FAIcon icon="fa-regular fa-chevron-down" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--neutral-label)', pointerEvents: 'none' }} />
              </div>
            </Field>
          </div>
        </div>

        {/*  Boto salvar  */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
          <Button size="md" variant="primary" style={{ minWidth: 200 }}>{t('salvarContinuar')}</Button>
        </div>

      </div>
      )}

      {activeTab === 'senha' && (
      <div style={{ background: 'white', border: '1px solid var(--card-border)', borderRadius: 8, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)', maxWidth: 640 }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: 16, color: 'var(--neutral-ink-strong)', margin: 0 }}>{t('tsTitle')}</h2>
          <p style={{ fontSize: 13, color: 'var(--neutral-dark-down)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
            {t('tsDesc')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label={t('tsSenhaAtual')}>
            <div style={passwordBox}>
              <input type={showSenhaAtual ? 'text' : 'password'} value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} placeholder={t('tsSenhaAtualPh')} style={inpPassword} />
              <FAIcon icon={showSenhaAtual ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 15, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowSenhaAtual(v => !v)} />
            </div>
          </Field>
          <Field label={t('tsNovaSenha')}>
            <div style={passwordBox}>
              <input type={showSenha ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} placeholder={t('tsNovaSenhaPh')} style={inpPassword} />
              <FAIcon icon={showSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 15, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowSenha(v => !v)} />
            </div>
          </Field>
          <Field label={t('tsConfirmarSenha')}>
            <div style={passwordBox}>
              <input type={showConfSenha ? 'text' : 'password'} value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} placeholder={t('tsConfirmarSenhaPh')} style={inpPassword} />
              <FAIcon icon={showConfSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 15, color: 'var(--neutral-dark-medium)', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowConfSenha(v => !v)} />
            </div>
          </Field>
        </div>

        {/* Dicas de segurana */}
        <div style={{ background: 'var(--background-color-light)', border: '1px solid var(--neutral-light-medium)', borderRadius: 8, padding: '12px 14px' }}>
          <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--neutral-dark-down)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <FAIcon icon="fa-regular fa-shield-check" style={{ fontSize: 12, color: 'var(--primary-pure)' }} />
            {t('tsDicas')}
          </div>
          <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 12, color: 'var(--neutral-dark-down)', lineHeight: 1.7 }}>
            <li>{t('tsDica1')}</li>
            <li>{t('tsDica2')}</li>
            <li>{t('tsDica3')}</li>
            <li>{t('tsDica4')}</li>
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 4 }}>
          <button
            onClick={() => { setSenhaAtual(''); setSenha(''); setConfirmarSenha(''); }}
            style={{
              height: 44, padding: '0 20px', borderRadius: 8, background: 'white',
              border: '1.5px solid var(--neutral-light-down)', color: 'var(--neutral-dark-down)',
              fontWeight: 600, fontSize: 14, cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'var(--background-color-light)'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'white'}
          >
            {t('tsCancelar')}
          </button>
          <Button size="md" variant="primary" style={{ minWidth: 200 }}>{t('tsAlterar')}</Button>
        </div>
      </div>
      )}
    </div>
  );
}





