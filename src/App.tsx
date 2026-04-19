import { useState, useRef, useEffect, createContext, useContext, Fragment } from 'react';
import { Button, Input } from '@1doc/1ds-react';

// ── Traduções ─────────────────────────────────────────────────────────────────
type Lang = 'pt' | 'en';
const TRANS = {
  pt: {
    // Nav
    inicio: 'Início', consultaProcessos: 'Consulta de Processos',
    conferenciaDocumentos: 'Conferência de Documentos', solicitacaoServicos: 'Solicitação de serviços',
    meusProcessos: 'Meus processos', minhasPendencias: 'Minhas pendências',
    processosLiberados: 'Processos liberados', meusDados: 'Meus Dados',
    sair: 'Sair', ajuda: 'Ajuda', entrar: 'Entrar',
    // Header
    altoContraste: 'Alto Contraste', idioma: 'Idioma', modoEscuro: 'Modo Escuro', buscar: 'Buscar',
    // Breadcrumb
    breadInicio: 'Início',
    // Botões
    consultar: 'Consultar', limpar: 'Limpar', salvarContinuar: 'Salvar e continuar',
    // Consulta Processos
    consultaTitle: 'Consulta de processos',
    consultaDesc: 'Consulte o andamento de processos digitais informando o número do processo. Acesse processos nos quais você é parte interessada ou representante legal. Para processos sigilosos, é necessário autenticação.',
    numeroProcesso: 'Número do processo', orgao: 'Órgão', procedencia: 'Procedência',
    numero: 'Número', ano: 'Ano',
    pesquiseProcesso: 'Pesquise um processo',
    pesquiseDesc: 'Preencha os campos acima com o número do processo para consultar o andamento detalhado',
    nenhumProcesso: 'Nenhum processo encontrado', nenhumDesc: 'Verifique os dados informados e tente novamente',
    resultados: 'Resultados', consultasRecentes: 'Consultas recentes',
    // Consulta Documentos
    docTitle: 'Consulta de documentos',
    docDesc: 'Confira se uma cópia impressa corresponde a um documento assinado digitalmente em um processo administrativo. Basta inserir o código localizado na lateral direita do documento.',
    codigoDoc: 'Código do documento',
    // Processo detalhe tabs
    dadosProcesso: 'Dados do processo', documentos: 'Documentos', tramitacoes: 'Tramitações',
    movimentacoes: 'Movimentações', arquivamentos: 'Arquivamentos',
    // Home
    encontreServico: 'Encontre o serviço que você precisa',
    iptuDesc: 'Pague o seu IPTU com até 20% de desconto até o dia 30/04/2026',
    maisAcessados: 'Serviços mais acessados', emDestaque: 'Serviços em destaque',
    porAssunto: 'Serviços por assunto',
    // Meus Dados
    solicitacaoDesc: 'Solicite serviços municipais de forma rápida e digital. Encontre o serviço pelo nome ou navegue pelas categorias.',
    meusDadosTitle: 'Meus Dados', identificacao: 'Identificação', acesso: 'Acesso',
    dadosPessoais: 'Dados Pessoais', endereco: 'Endereço',
    // Login
    boasVindas: 'Boas vindas ao FloripaOn', senha: 'Senha', esqueciSenha: 'Esqueci a senha',
    ouContinuar: 'Ou continuar com', redefinicaoSenha: 'Redefinição de senha',
    redefinirSenha: 'Redefinir senha', voltar: 'Voltar', emailCadastrado: 'Email cadastrado',
  },
  en: {
    inicio: 'Home', consultaProcessos: 'Process Inquiry',
    conferenciaDocumentos: 'Document Verification', solicitacaoServicos: 'Service Requests',
    meusProcessos: 'My Processes', minhasPendencias: 'My Pending Items',
    processosLiberados: 'Released Processes', meusDados: 'My Profile',
    sair: 'Sign Out', ajuda: 'Help', entrar: 'Sign In',
    altoContraste: 'High Contrast', idioma: 'Language', modoEscuro: 'Dark Mode', buscar: 'Search',
    breadInicio: 'Home',
    consultar: 'Search', limpar: 'Clear', salvarContinuar: 'Save and continue',
    consultaTitle: 'Process Inquiry',
    consultaDesc: 'Check the status of digital processes by entering the process number. Access processes in which you are an interested party or legal representative. Authentication is required for confidential processes.',
    numeroProcesso: 'Process Number', orgao: 'Agency', procedencia: 'Origin',
    numero: 'Number', ano: 'Year',
    pesquiseProcesso: 'Search for a process',
    pesquiseDesc: 'Fill in the fields above with the process number to check the detailed status',
    nenhumProcesso: 'No processes found', nenhumDesc: 'Check the information provided and try again',
    resultados: 'Results', consultasRecentes: 'Recent Queries',
    docTitle: 'Document Verification',
    docDesc: 'Check whether a printed copy matches a digitally signed document in an administrative process. Just enter the code located on the right side of the document.',
    codigoDoc: 'Document Code',
    dadosProcesso: 'Process Data', documentos: 'Documents', tramitacoes: 'Routing',
    movimentacoes: 'Activities', arquivamentos: 'Archives',
    encontreServico: 'Find the service you need',
    iptuDesc: 'Pay your IPTU with up to 20% discount until 04/30/2026',
    maisAcessados: 'Most Accessed Services', emDestaque: 'Featured Services',
    porAssunto: 'Services by Category',
    solicitacaoDesc: 'Request municipal services quickly and digitally. Find the service by name or browse through categories.',
    meusDadosTitle: 'My Profile', identificacao: 'Identification', acesso: 'Access',
    dadosPessoais: 'Personal Data', endereco: 'Address',
    boasVindas: 'Welcome to FloripaOn', senha: 'Password', esqueciSenha: 'Forgot my password',
    ouContinuar: 'Or continue with', redefinicaoSenha: 'Password Reset',
    redefinirSenha: 'Reset Password', voltar: 'Back', emailCadastrado: 'Registered email',
  },
} as const;

const LangContext = createContext<Lang>('pt');
function useT() {
  const lang = useContext(LangContext);
  return (key: keyof typeof TRANS['pt']) => TRANS[lang][key];
}

// ── FAIcon — ícone que bypassa o reconciliador do React ───────────────────────
function FAIcon({ icon, style, onClick }: { icon: string; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: `<i class="${icon}"></i>` }}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, ...style }}
      onClick={onClick}
    />
  );
}

// ── Imagens via servidor Figma local ─────────────────────────────────────────
const imgBannerFloripa   = '/floripa.jpg';
const imgFloripa         = '/Floripa 02.jpg';

// Ícones do detalhe do processo
const imgBuildingColumns = 'http://localhost:3845/assets/28f0f3f96e9121dc8c7cdd390da7e21ac41b7af1.svg';
const imgCalendarIcon    = 'http://localhost:3845/assets/3f3d8ad8e8fdbbf83d15b3643683a2e7bafd918e.svg';
const imgFolderClosed    = 'http://localhost:3845/assets/e8513ebcf8bcd05a28c2c5b92a56343029cfe04f.svg';
const imgEyeSolid        = 'http://localhost:3845/assets/eb3c3e8d81f45b7c7213f3e2779d272ec2242141.svg';
const imgFileLines       = 'http://localhost:3845/assets/4938efb98f1dd509cb825a72fae373d130a55be4.svg';
const imgDownToLine      = 'http://localhost:3845/assets/6ec71a8441202dd2e3af69bd421865453eb71731.svg';
const imgTimelineLine    = 'http://localhost:3845/assets/47758b7fc5133202301ceb3a5dc69b07e761e275.svg';
const imgTimelineEnd     = 'http://localhost:3845/assets/d195b410caf516ddd8979525771220b9d566f9ab.svg';
const imgLocationDot     = 'http://localhost:3845/assets/c7bfbd2db7dbf29fac74fea0b36e09c701fc1b3f.svg';

// ── Tipo de página ────────────────────────────────────────────────────────────
type Page = 'home' | 'consulta' | 'processo' | 'documentos' | 'meusdados' | 'solicitacao' | 'cat-servicos' | 'servico-detalhe' | 'servico-form';

// ── Serviços municipais para o dropdown de busca ──────────────────────────────
const ALL_SERVICES = [
  '2ª Via de IPTU',
  'Agendamento de atendimento presencial',
  'Alvará de funcionamento',
  'Alvará de obra',
  'Aprovação de projetos arquitetônicos',
  'Atestado de residência',
  'Baixa de inscrição municipal',
  'Boletim de ocorrência online',
  'Cadastro de MEI',
  'Cadastro único (CadÚnico)',
  'Carteira do idoso',
  'Carteira de trabalho digital',
  'Certidão de débitos municipais',
  'Certidão de nascimento',
  'Certidão de propriedade de imóvel',
  'Certidão negativa de débitos (CND)',
  'Consulta de processo administrativo',
  'Consulta de débitos de IPTU',
  'Consulta de processos judiciais',
  'Defesa do consumidor (PROCON)',
  'Emissão de boleto de IPTU',
  'Emissão de nota fiscal eletrônica',
  'Fala, cidadão (Ouvidoria)',
  'Habite-se',
  'Imposto sobre serviços (ISS)',
  'Inscrição em concurso público',
  'Inscrição escolar municipal',
  'Isenção de IPTU para idosos',
  'Isenção de IPTU para PCDs',
  'Licença ambiental',
  'Licença sanitária',
  'Matrícula escolar municipal',
  'Nota fiscal de serviço eletrônica',
  'Parcelamento de débitos municipais',
  'Pedido de informação (LAI)',
  'Regularização de imóvel',
  'Renovação de alvará',
  'Serviço de limpeza urbana',
  'Solicitação de poda de árvores',
  'Solicitação de tapa-buraco',
  'Taxa de coleta de lixo',
  'Transferência de titularidade de imóvel',
  'Vacinação municipal',
  'Vigilância sanitária',
  'Vistoria de imóvel',
];

// ── Categorias de serviço ─────────────────────────────────────────────────────
const categories = [
  { icon: 'fa-duotone fa-file-signature',    label: 'Alvarás, autorizações e licenças' },
  { icon: 'fa-duotone fa-hand-holding-heart',label: 'Assistência social' },
  { icon: 'fa-duotone fa-circle-xmark',      label: 'Baixas e cancelamentos' },
  { icon: 'fa-duotone fa-file-lines',        label: 'Certidões, declarações e documentos' },
  { icon: 'fa-duotone fa-store',             label: 'Comércio e serviços' },
  { icon: 'fa-duotone fa-money-bill',        label: 'Devoluções, compensações e prescrições' },
  { icon: 'fa-duotone fa-bullhorn',          label: 'Editais' },
  { icon: 'fa-duotone fa-landmark',          label: 'Impostos e taxas' },
  { icon: 'fa-duotone fa-shield-halved',     label: 'Isenções e imunidade' },
  { icon: 'fa-duotone fa-tree',              label: 'Meio ambiente' },
  { icon: 'fa-duotone fa-paint-roller',      label: 'Obras e urbanismo' },
  { icon: 'fa-duotone fa-folder-plus',       label: 'Processos externos' },
  { icon: 'fa-duotone fa-user-gear',         label: 'Processo funcional' },
  { icon: 'fa-duotone fa-comments',          label: 'Reclamações e denúncias' },
  { icon: 'fa-duotone fa-hospital',          label: 'Saúde' },
  { icon: 'fa-duotone fa-list-ol',           label: 'Solicitações' },
  { icon: 'fa-duotone fa-arrows-rotate',     label: 'Substituições, alterações e exclusões' },
  { icon: 'fa-duotone fa-cars',              label: 'Transporte e trânsito' },
];

const popularServices = [
  '2ª Via de IPTU',
  'Consulta de processo',
  'Alvará de funcionamento',
  'Nota fiscal de serviço eletrônica',
  'Agendamento de atendimento presencial',
];

const featuredServices = [
  'Aprovação de projetos',
  'Carteira do idoso',
  'Fala, cidadão',
  'Licença ambiental',
  'Matrícula escolar municipal',
];

// ── Consultas recentes ────────────────────────────────────────────────────────
type ProcessoStatus = 'Concluído' | 'Em Andamento' | 'Pendente';

interface ConsultaRecente {
  numero: string;
  data: string;
  descricao: string;
  status: ProcessoStatus;
}

const consultasRecentes: ConsultaRecente[] = [
  { numero: 'SOLARBPM2025/000338', data: '31/03/2026 às 08h33', descricao: 'Solicitação de Cartão nacional do Idoso', status: 'Concluído' },
  { numero: 'SOLARBPM2025/000452', data: '25/03/2026 às 14h11', descricao: 'Solicitação de férias (Simples)',         status: 'Em Andamento' },
  { numero: 'SOLARBPM2025/000379', data: '19/03/2026 às 19h34', descricao: 'Solicitação de férias (Simples)',         status: 'Em Andamento' },
  { numero: 'SOLARBPM2025/000125', data: '10/03/2026 às 08h41', descricao: 'Ligação de Água e ramal',                status: 'Pendente' },
  { numero: 'SOLARBPM2025/000433', data: '07/03/2026 às 19h18', descricao: 'Mobilidade Urbana',                      status: 'Concluído' },
];

const STATUS_STYLE: Record<ProcessoStatus, { bg: string; color: string }> = {
  'Concluído':    { bg: '#e6f9f0', color: '#0f6b3e' },
  'Em Andamento': { bg: '#ebebeb', color: '#555555' },
  'Pendente':     { bg: '#fff0f2', color: '#c0182d' },
};

// ── Badge de status ───────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ProcessoStatus }) {
  const s = STATUS_STYLE[status];
  return (
    <span style={{
      display: 'inline-block',
      background: s.bg,
      color: s.color,
      borderRadius: 100,
      padding: '2px 12px',
      fontFamily: 'Open Sans, sans-serif',
      fontWeight: 600,
      fontSize: 12,
      lineHeight: '20px',
      whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  );
}

// ── Card de consulta recente ──────────────────────────────────────────────────
function ConsultaRow({ numero, data, descricao, status, onClick }: ConsultaRecente & { onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'white', border: '1px solid #dde3ee', borderRadius: 10,
        padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16,
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: '0px 2px 8px rgba(24,39,75,0.07)',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => { if (onClick) { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 4px 16px rgba(24,39,75,0.13)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#b3c7e6'; } }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 2px 8px rgba(24,39,75,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#dde3ee'; }}
    >
      {/* Ícone */}
      <div style={{ width: 48, height: 48, background: '#f0f4fb', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <FAIcon icon="fa-regular fa-folder-open" style={{ fontSize: 22, color: '#0058db' }} />
      </div>

      {/* Informações principais */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {descricao}
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#7d7d7d' }}>
            <strong style={{ color: '#565656' }}>Processo:</strong> {numero}
          </span>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#7d7d7d' }}>
            <strong style={{ color: '#565656' }}>Data:</strong> {data}
          </span>
        </div>
      </div>

      {/* Status + seta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <StatusBadge status={status} />
        {onClick && <FAIcon icon="fa-regular fa-angle-right" style={{ fontSize: 16, color: '#a3a3a3' }} />}
      </div>
    </div>
  );
}

// ── SearchDropdown ────────────────────────────────────────────────────────────
function SearchWithDropdown() {
  const [query, setQuery]             = useState('');
  const [open, setOpen]               = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef                    = useRef<HTMLDivElement>(null);

  const results = query.trim().length === 0
    ? []
    : ALL_SERVICES.filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlighted(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
    setHighlighted(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter' && highlighted >= 0) { setQuery(results[highlighted]); setOpen(false); }
    else if (e.key === 'Escape') { setOpen(false); }
  }

  function handleSelect(label: string) { setQuery(label); setOpen(false); setHighlighted(-1); }

  function highlightMatch(text: string) {
    if (!query.trim()) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (<>{text.slice(0, idx)}<strong style={{ color: '#0058db' }}>{text.slice(idx, idx + query.length)}</strong>{text.slice(idx + query.length)}</>);
  }

  return (
    <div ref={wrapperRef} style={{ width: '100%', position: 'relative' }}>
      <Input
        placeholder="Busque pelo serviço desejado"
        fullWidth size="md" type="search"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown as never}
        onFocus={() => query.trim() && setOpen(true)}
        iconsRight={[{ icon: <i className="fa-regular fa-magnifying-glass" style={{ color: '#7d7d7d' }} /> }]}
      />
      {open && results.length > 0 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 100, overflow: 'hidden' }}>
          {results.map((service, i) => (
            <div key={service} onMouseDown={() => handleSelect(service)} onMouseEnter={() => setHighlighted(i)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', cursor: 'pointer', background: highlighted === i ? '#f0f5ff' : 'white', borderBottom: i < results.length - 1 ? '1px solid #f0f0f0' : 'none', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#333', transition: 'background 0.1s' }}>
              <i className="fa-regular fa-magnifying-glass" style={{ color: '#a3a3a3', fontSize: 13, flexShrink: 0 }} />
              <span>{highlightMatch(service)}</span>
            </div>
          ))}
          <div style={{ padding: '8px 16px', background: '#f8f9fb', borderTop: '1px solid #ebebeb', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#7d7d7d', fontFamily: 'Open Sans, sans-serif' }}>
            <i className="fa-regular fa-circle-info" style={{ fontSize: 12 }} />
            <span>Pressione Enter para buscar todos os resultados</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Modal de Login ────────────────────────────────────────────────────────────
function LoginModal({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  const [view,         setView]         = useState<'login' | 'recovery'>('login');
  const [email,        setEmail]        = useState('');
  const [senha,        setSenha]        = useState('');
  const [showSenha,    setShowSenha]    = useState(false);
  const [emailRecov,   setEmailRecov]   = useState('');

  const label: React.CSSProperties = {
    fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#333', lineHeight: '20px',
  };
  const inputStyle: React.CSSProperties = {
    background: 'white', border: '1px solid #a3a3a3', borderRadius: 8,
    display: 'flex', alignItems: 'center', gap: 8, padding: 8, height: 44, width: '100%', boxSizing: 'border-box',
  };
  const inputEl: React.CSSProperties = {
    flex: 1, border: 'none', outline: 'none', background: 'transparent',
    fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#333', minWidth: 0,
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

      <div style={{ display: 'flex', width: '100%', maxWidth: 1100, height: '90vh', maxHeight: 800, borderRadius: 16, overflow: 'hidden', boxShadow: '0px 10px 40px rgba(0,0,0,0.25)' }}>

        {/* ── Foto Florianópolis ── */}
        <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
          <img src={imgFloripa} alt="Florianópolis" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>

        {/* ── Card de formulário ── */}
        <div style={{
          width: 470, flexShrink: 0,
          background: 'white', border: '1px solid #f6f6f6',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: '40px 40px 24px 40px', overflowY: 'auto',
        }}>

          {/* Logo FloripaOn */}
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 28, color: '#0059db', letterSpacing: '-0.5px', lineHeight: 1 }}>
            FloripaOn
          </span>

          {view === 'login' ? (
            /* ── LOGIN ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, marginTop: 32 }}>
              <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#333', margin: 0, letterSpacing: '0.12px' }}>
                Boas vindas ao FloripaOn
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={label}>Email <span style={{ color: '#b2132e' }}>*</span></span>
                  <div style={inputStyle}>
                    <input style={inputEl} type="email" placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>

                {/* Senha */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={label}>Senha <span style={{ color: '#b2132e' }}>*</span></span>
                  <div style={inputStyle}>
                    <input style={inputEl} type={showSenha ? 'text' : 'password'} placeholder="Senha FloripaOn" value={senha} onChange={e => setSenha(e.target.value)} />
                    <FAIcon icon={showSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 16, color: '#7d7d7d', cursor: 'pointer', flexShrink: 0 }} />
                  </div>
                  <span
                    onClick={() => setView('recovery')}
                    style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 12, color: '#0058db', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Esqueci a senha
                  </span>
                </div>
              </div>

              {/* Botão Login */}
              <Button size="md" variant="primary" onClick={() => { onLogin(); onClose(); }} style={{ width: '100%' }}>Login</Button>

              {/* Divider gov.br */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1, height: 1, background: '#d5d5d5' }} />
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#565656', whiteSpace: 'nowrap', letterSpacing: '0.06px' }}>
                  Ou continuar com
                </span>
                <div style={{ flex: 1, height: 1, background: '#d5d5d5' }} />
              </div>

              {/* gov.br */}
              <button style={{
                width: '100%', height: 40, border: '1px solid #0058db', borderRadius: 8,
                background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#194280',
              }}>
                Entrar com <strong style={{ fontWeight: 700, fontSize: 18, letterSpacing: '0.09px' }}>gov.br</strong>
              </button>
            </div>

          ) : (
            /* ── RECUPERAR SENHA ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, marginTop: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#333', margin: 0, letterSpacing: '0.12px' }}>
                  Redefinição de senha
                </p>
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#565656', margin: 0, lineHeight: '20px', letterSpacing: '0.07px' }}>
                  Informe seu e-mail no campo abaixo e enviaremos instruções para você redefinir sua senha com segurança.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={label}>Email cadastrado <span style={{ color: '#b2132e' }}>*</span></span>
                  <div style={inputStyle}>
                    <input style={inputEl} type="email" placeholder="Digite seu email" value={emailRecov} onChange={e => setEmailRecov(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Button size="md" variant="primary" style={{ width: '100%' }}>Redefinir senha</Button>
                  <Button size="md" variant="secondary" onClick={() => setView('login')} style={{ width: '100%' }}>
                    <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 14, marginRight: 6 }} />
                    Voltar
                  </Button>
                </div>
              </div>

              {/* Divider gov.br */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1, height: 1, background: '#d5d5d5' }} />
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#565656', whiteSpace: 'nowrap', letterSpacing: '0.06px' }}>
                  Ou continuar com
                </span>
                <div style={{ flex: 1, height: 1, background: '#d5d5d5' }} />
              </div>

              <button style={{
                width: '100%', height: 40, border: '1px solid #0058db', borderRadius: 8,
                background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#194280',
              }}>
                Entrar com <strong style={{ fontWeight: 700, fontSize: 18, letterSpacing: '0.09px' }}>gov.br</strong>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-componentes ───────────────────────────────────────────────────────────
const SIDEBAR_COLLAPSED = 48;
const SIDEBAR_EXPANDED  = 248;

// ── Busca compacta para o header ──────────────────────────────────────────────
function HeaderSearch() {
  const t = useT();
  const [query,       setQuery]       = useState('');
  const [open,        setOpen]        = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length === 0
    ? [] : ALL_SERVICES.filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 6);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) { setOpen(false); setHighlighted(-1); }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter' && highlighted >= 0) { setQuery(results[highlighted]); setOpen(false); }
    else if (e.key === 'Escape') setOpen(false);
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: 260 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 36, border: '1px solid #dce6f5', borderRadius: 8, padding: '0 10px', background: '#f4f6f9' }}>
        <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 14, color: '#7d7d7d', flexShrink: 0 }} />
        <input
          value={query} placeholder={t('buscar')}
          onChange={e => { setQuery(e.target.value); setOpen(true); setHighlighted(-1); }}
          onFocus={() => query.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#333' }}
        />
        {query && <FAIcon icon="fa-regular fa-xmark" style={{ fontSize: 13, color: '#7d7d7d', cursor: 'pointer', flexShrink: 0 }} />}
      </div>
      {open && results.length > 0 && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 300, overflow: 'hidden' }}>
          {results.map((s, i) => (
            <div key={s} onMouseDown={() => { setQuery(s); setOpen(false); }} onMouseEnter={() => setHighlighted(i)}
              style={{ padding: '9px 14px', cursor: 'pointer', background: highlighted === i ? '#f0f5ff' : 'white', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#333', borderBottom: i < results.length - 1 ? '1px solid #f0f0f0' : 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
              <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 12, color: '#a3a3a3' }} />
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Header({ onToggle, onLogin, isLoggedIn, onLogout, darkMode, onToggleDark, highContrast, onToggleContrast, lang, onSetLang }: {
  onToggle: () => void; onLogin: () => void; isLoggedIn: boolean; onLogout: () => void;
  darkMode: boolean; onToggleDark: () => void;
  highContrast: boolean; onToggleContrast: () => void;
  lang: Lang; onSetLang: (l: Lang) => void;
}) {
  const t = useT();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [langOpen,   setLangOpen]   = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const langRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const iconBtn = (active: boolean): React.CSSProperties => ({
    width: 36, height: 36, border: `1px solid ${active ? '#0058db' : '#dce6f5'}`,
    borderRadius: 6, background: active ? '#edf2ff' : 'white', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: active ? '#0058db' : '#565656', transition: 'all 0.12s', flexShrink: 0,
  });

  return (
    <div style={{ background: 'white', borderBottom: '1px solid #dce6f5', height: 56, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      {/* Toggle sidebar */}
      <div title="Expandir/retrair menu" onClick={onToggle}
        style={{ width: SIDEBAR_COLLAPSED, minWidth: SIDEBAR_COLLAPSED, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
        <FAIcon icon="fa-regular fa-sidebar" style={{ fontSize: 20, color: '#0058db' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px' }}>
        {/* Logo */}
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 28, color: '#0059db', letterSpacing: '-0.5px', flexShrink: 0 }}>FloripaOn</span>

        <div style={{ flex: 1 }} />

        {/* Busca */}
        <HeaderSearch />

        {/* ── Botões de acessibilidade / tema ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

          {/* Alto contraste */}
          <button title={t('altoContraste')} onClick={onToggleContrast} style={iconBtn(highContrast)}>
            <FAIcon icon="fa-regular fa-circle-half-stroke" style={{ fontSize: 16, color: 'inherit' }} />
          </button>

          {/* Idioma */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button title={t('idioma')} onClick={() => setLangOpen(o => !o)} style={iconBtn(langOpen)}>
              <FAIcon icon="fa-regular fa-globe" style={{ fontSize: 16, color: 'inherit' }} />
            </button>
            {langOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: 'white', border: '1px solid #dce6f5', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 300, minWidth: 140, overflow: 'hidden' }}>
                {(['pt', 'en'] as Lang[]).map(l => (
                  <div key={l} onClick={() => { onSetLang(l); setLangOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', background: lang === l ? '#edf2ff' : 'white', fontFamily: 'Open Sans, sans-serif', fontSize: 14, fontWeight: lang === l ? 700 : 400, color: lang === l ? '#0058db' : '#333', borderBottom: l === 'pt' ? '1px solid #f0f0f0' : 'none', transition: 'background 0.1s' }}
                    onMouseEnter={e => { if (lang !== l) (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; }}
                    onMouseLeave={e => { if (lang !== l) (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
                  >
                    <span style={{ fontSize: 18 }}>{l === 'pt' ? '🇧🇷' : '🇺🇸'}</span>
                    {l === 'pt' ? 'Português' : 'English'}
                    {lang === l && <FAIcon icon="fa-solid fa-check" style={{ fontSize: 12, marginLeft: 'auto' }} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modo escuro */}
          <button title={t('modoEscuro')} onClick={onToggleDark} style={iconBtn(darkMode)}>
            <FAIcon icon={darkMode ? 'fa-regular fa-moon' : 'fa-regular fa-sun-bright'} style={{ fontSize: 16, color: 'inherit' }} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 28, background: '#dce6f5' }} />

        {/* ── Login / Avatar ── */}
        {isLoggedIn ? (
          <div ref={avatarRef} style={{ position: 'relative' }}>
            <div onClick={() => setAvatarOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 8, transition: 'background 0.12s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#dce6f5', border: '2px solid #0058db', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#0058db' }}>CL</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 13, color: '#222', whiteSpace: 'nowrap' }}>Cris Lima</span>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 11, color: '#7d7d7d', whiteSpace: 'nowrap' }}>043.792.234-00</span>
              </div>
              <FAIcon icon="fa-regular fa-chevron-down" style={{ fontSize: 12, color: '#7d7d7d' }} />
            </div>
            {avatarOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, background: 'white', border: '1px solid #dce6f5', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 300, minWidth: 160, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontFamily: 'Open Sans, sans-serif', fontSize: 13 }}>
                  <div style={{ fontWeight: 700, color: '#222' }}>Cris Lima</div>
                  <div style={{ fontWeight: 400, color: '#7d7d7d', fontSize: 11 }}>043.792.234-00</div>
                </div>
                <div onClick={() => { setAvatarOpen(false); onLogout(); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', cursor: 'pointer', fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#c0182d', transition: 'background 0.1s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#fff0f2'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
                >
                  <FAIcon icon="fa-regular fa-arrow-right-from-bracket" style={{ fontSize: 14 }} />
                  {t('sair')}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Button size="sm" variant="primary" onClick={onLogin}>{t('entrar')}</Button>
        )}
      </div>
    </div>
  );
}

function SideMenu({ activePage, onNavigate, expanded, onLogin, isLoggedIn, onLogout }: {
  activePage: Page;
  onNavigate: (page: Page) => void;
  expanded: boolean;
  onLogin: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}) {
  const t = useT();
  const baseItems: { icon: string; label: string; page: Page | null }[] = [
    { icon: 'fa-regular fa-house',            label: t('inicio'),                    page: 'home' },
    { icon: 'fa-regular fa-magnifying-glass', label: t('consultaProcessos'),         page: 'consulta' },
    { icon: 'fa-regular fa-list-check',       label: t('conferenciaDocumentos'),     page: 'documentos' as Page },
    { icon: 'fa-regular fa-file-circle-plus', label: t('solicitacaoServicos'),       page: 'solicitacao' as Page },
  ];

  const loggedInItems: { icon: string; label: string; page: Page | null }[] = [
    { icon: 'fa-regular fa-folder-user',  label: t('meusProcessos'),     page: null },
    { icon: 'fa-regular fa-clock',        label: t('minhasPendencias'),   page: null },
    { icon: 'fa-regular fa-circle-check', label: t('processosLiberados'), page: null },
  ];

  const items = isLoggedIn ? [...baseItems, ...loggedInItems] : baseItems;

  // Quando estamos em sub-páginas, mantém o item pai ativo no menu
  const effectivePage: Page =
    activePage === 'processo' ? 'consulta' :
    (activePage === 'cat-servicos' || activePage === 'servico-detalhe' || activePage === 'servico-form') ? 'solicitacao' :
    activePage;

  const menuItemStyle = (isActive: boolean, hasPage: boolean): React.CSSProperties => ({
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: expanded ? 'flex-start' : 'center',
    gap: 10,
    padding: expanded ? '0 12px' : 0,
    cursor: hasPage ? 'pointer' : 'default',
    color: isActive ? '#0058db' : '#565656',
    background: isActive ? '#edf2ff' : 'transparent',
    borderRadius: 6,
    margin: '1px 4px',
    transition: 'background 0.12s, color 0.12s',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  });

  return (
    <div style={{
      width: expanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
      minWidth: expanded ? SIDEBAR_EXPANDED : SIDEBAR_COLLAPSED,
      background: 'white',
      borderRight: '1px solid #dce6f5',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'width 0.2s ease, min-width 0.2s ease',
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingTop: 8,
    }}>
      {/* ── Itens principais ── */}
      {items.map((item, i) => {
        const isActive = item.page === effectivePage;
        return (
          <div key={i} title={expanded ? undefined : item.label}
            onClick={() => item.page && onNavigate(item.page)}
            style={menuItemStyle(isActive, !!item.page)}
            onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; (e.currentTarget as HTMLDivElement).style.color = '#0058db'; } }}
            onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = '#565656'; } }}
          >
            <FAIcon icon={item.icon} style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
            {expanded && (
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}

      {/* ── Espaço flex para empurrar para o fundo ── */}
      <div style={{ flex: 1 }} />

      {/* ── Divider ── */}
      <div style={{ height: 1, background: '#dce6f5', margin: '4px 8px', flexShrink: 0 }} />

      {isLoggedIn ? (
        <>
          {/* ── Meus Dados ── */}
          <div title={expanded ? undefined : t('meusDados')}
            onClick={() => onNavigate('meusdados')}
            style={menuItemStyle(effectivePage === 'meusdados', true)}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; (e.currentTarget as HTMLDivElement).style.color = '#0058db'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = '#565656'; }}
          >
            <FAIcon icon="fa-regular fa-user" style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
            {expanded && <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{t('meusDados')}</span>}
          </div>

          {/* ── Sair ── */}
          <div title={expanded ? undefined : t('sair')}
            onClick={onLogout}
            style={{ ...menuItemStyle(false, true), color: '#c0182d' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#fff0f2'; (e.currentTarget as HTMLDivElement).style.color = '#c0182d'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = '#c0182d'; }}
          >
            <FAIcon icon="fa-regular fa-arrow-right-from-bracket" style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
            {expanded && <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{t('sair')}</span>}
          </div>
        </>
      ) : (
        /* ── Entrar ── */
        <div title={expanded ? undefined : t('entrar')}
          onClick={onLogin}
          style={menuItemStyle(false, true)}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; (e.currentTarget as HTMLDivElement).style.color = '#0058db'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = '#565656'; }}
        >
          <FAIcon icon="fa-regular fa-arrow-right-to-bracket" style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
          {expanded && <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{t('entrar')}</span>}
        </div>
      )}

      {/* ── Divider ── */}
      <div style={{ height: 1, background: '#dce6f5', margin: '4px 8px', flexShrink: 0 }} />

      {/* ── Ajuda ── */}
      <div title={expanded ? undefined : t('ajuda')}
        style={{ ...menuItemStyle(false, true), marginBottom: 8 }}
        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; (e.currentTarget as HTMLDivElement).style.color = '#0058db'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; (e.currentTarget as HTMLDivElement).style.color = '#565656'; }}
      >
        <FAIcon icon="fa-regular fa-circle-question" style={{ fontSize: 18, flexShrink: 0, color: 'inherit' }} />
        {expanded && <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, whiteSpace: 'nowrap', pointerEvents: 'none' }}>{t('ajuda')}</span>}
      </div>
    </div>
  );
}

function Breadcrumb({ page, onNavigate, selectedCat, selectedService }: {
  page: Page;
  onNavigate: (p: Page) => void;
  selectedCat?: { label: string; icon: string } | null;
  selectedService?: typeof MOCK_SERVICOS_AV[0] | null;
}) {
  const t = useT();
  const txt: React.CSSProperties = { fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#565656' };
  const sep = <span style={{ ...txt, fontWeight: 700 }}>/</span>;
  const link = (label: string, onClick: () => void): React.ReactElement => (
    <span onClick={onClick} style={{ ...txt, fontWeight: 400, cursor: 'pointer' }}>{label}</span>
  );

  const inSolicitacao = page === 'solicitacao' || page === 'cat-servicos' || page === 'servico-detalhe' || page === 'servico-form';

  return (
    <div style={{ background: 'white', borderBottom: '1px solid #dce6f5', padding: '10px 24px', flexShrink: 0, display: 'flex', gap: 4, alignItems: 'center' }}>
      <span onClick={() => onNavigate('home')} style={{ ...txt, fontWeight: 700, cursor: page !== 'home' ? 'pointer' : 'default' }}>
        {t('breadInicio')}
      </span>

      {/* Consulta de processos */}
      {(page === 'consulta' || page === 'processo') && (
        <>{sep}{link(t('consultaProcessos'), () => onNavigate('consulta'))}</>
      )}
      {page === 'processo' && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>PMF2026/000418</span></>
      )}

      {/* Conferência de documentos */}
      {page === 'documentos' && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>{t('conferenciaDocumentos')}</span></>
      )}

      {/* Meus dados */}
      {page === 'meusdados' && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>{t('meusDados')}</span></>
      )}

      {/* Solicitação de serviços + sub-páginas */}
      {inSolicitacao && (
        <>{sep}{page === 'solicitacao'
          ? <span style={{ ...txt, fontWeight: 400 }}>{t('solicitacaoServicos')}</span>
          : link(t('solicitacaoServicos'), () => onNavigate('solicitacao'))
        }</>
      )}
      {(page === 'cat-servicos' || page === 'servico-detalhe' || page === 'servico-form') && selectedCat && (
        <>{sep}{page === 'cat-servicos'
          ? <span style={{ ...txt, fontWeight: 400 }}>{selectedCat.label}</span>
          : link(selectedCat.label, () => onNavigate('cat-servicos'))
        }</>
      )}
      {(page === 'servico-detalhe' || page === 'servico-form') && selectedService && (
        <>{sep}{page === 'servico-detalhe'
          ? <span style={{ ...txt, fontWeight: 400 }}>{selectedService.servico}</span>
          : link(selectedService.servico, () => onNavigate('servico-detalhe'))
        }</>
      )}
      {page === 'servico-form' && selectedService && (
        <>{sep}<span style={{ ...txt, fontWeight: 400 }}>Solicitar</span></>
      )}
    </div>
  );
}

function ServiceCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: 24, flex: '1 0 0', boxShadow: '0px 6px 8px rgba(24,39,75,0.12), 0px 8px 16px rgba(24,39,75,0.08)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#353535', lineHeight: 1.2, margin: 0 }}>{title}</h2>
      <div>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < items.length - 1 ? '1px solid #d5d5d5' : 'none', cursor: 'pointer' }}>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#333', lineHeight: '24px' }}>{item}</span>
            <i className="fa-regular fa-angle-right" style={{ color: '#7d7d7d', fontSize: 16 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ background: '#dce6f5', border: '1px solid #6393db', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: 24, aspectRatio: '1', boxShadow: '0px 6px 8px rgba(24,39,75,0.12), 0px 8px 16px rgba(24,39,75,0.08)', cursor: 'pointer', transition: 'transform 0.12s, box-shadow 0.12s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 10px 24px rgba(24,39,75,0.18)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 6px 8px rgba(24,39,75,0.12), 0px 8px 16px rgba(24,39,75,0.08)'; }}
    >
      <i className={icon} style={{ fontSize: 56, color: '#0058db' }} />
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#333', textAlign: 'center', lineHeight: 1.2 }}>{label}</span>
    </div>
  );
}

// ── Segmento de texto livre ───────────────────────────────────────────────────
function FormSegment({ label, value, onChange, placeholder, width, last = false }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; width?: number | string; last?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: width ? 'none' : 1, width: width ?? undefined, borderRight: last ? 'none' : '1px solid #b3c7e6', padding: '8px 14px' }}>
      <label style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 10, color: '#8a9ab5', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px' }}>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 15, color: '#222', padding: 0, width: '100%' }} />
    </div>
  );
}

// ── Segmento de select ────────────────────────────────────────────────────────
function SelectSegment({ label, value, onChange, options, width }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; width?: number | string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 'none', width: width ?? undefined, borderRight: '1px solid #b3c7e6', padding: '8px 14px' }}>
      <label style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 10, color: '#8a9ab5', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px' }}>{label}</label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 15, color: '#222', padding: 0, appearance: 'none', WebkitAppearance: 'none', width: '100%', paddingRight: 20, cursor: 'pointer' }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <i className="fa-regular fa-chevron-down" style={{ position: 'absolute', right: 0, fontSize: 11, color: '#8a9ab5', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}

// ── Tela: Consulta de Processos ───────────────────────────────────────────────
const ORGAOS       = ['PMF', 'SMTTU', 'FLORIPAMANHÃ', 'IPUF', 'SMDS'];
const PROCEDENCIAS = ['Interno', 'Externo'];

function ConsultaProcessos({ onNavigateProcesso }: { onNavigateProcesso: () => void }) {
  const [orgao,       setOrgao]       = useState(ORGAOS[0]);
  const [procedencia, setProcedencia] = useState(PROCEDENCIAS[0]);
  const [numero,      setNumero]      = useState('');
  const [ano,         setAno]         = useState('');
  const [resultados,  setResultados]  = useState<ConsultaRecente[] | null>(null);

  function handleLimpar() { setOrgao(ORGAOS[0]); setProcedencia(PROCEDENCIAS[0]); setNumero(''); setAno(''); setResultados(null); }

  function handleConsultar() {
    const found = consultasRecentes.filter(c => {
      const numMatch = !numero || c.numero.toLowerCase().includes(numero.toLowerCase());
      const anoMatch = !ano    || c.numero.includes(ano);
      return numMatch && anoMatch;
    });
    setResultados(found);
  }

  const visibleNumeros = new Set(resultados?.map(r => r.numero) ?? []);
  const showEmpty     = resultados === null;
  const showNoResults = resultados !== null && resultados.length === 0;
  const showResults   = resultados !== null && resultados.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>

      <div>
        <h1 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#1a1a1a', margin: '0 0 8px 0' }}>Consulta de processos</h1>
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#565656', margin: 0, lineHeight: '22px', maxWidth: 820 }}>
          Consulte o andamento de processos digitais informando o número do processo. Acesse processos nos quais você é parte interessada ou representante legal. Para processos sigilosos, é necessário autenticação.
        </p>
      </div>

      <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 8, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>
        <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#222', margin: 0 }}>Número do processo</h2>
        <div style={{ display: 'flex', alignItems: 'stretch', border: '1.5px solid #0058db', borderRadius: 8, overflow: 'hidden', background: 'white', minHeight: 58 }}>
          <SelectSegment label="Órgão"       value={orgao}       onChange={setOrgao}       options={ORGAOS}       width={150} />
          <SelectSegment label="Procedência" value={procedencia} onChange={setProcedencia} options={PROCEDENCIAS} width={160} />
          <FormSegment   label="Número"      value={numero}      onChange={setNumero}       placeholder="000000" />
          <FormSegment   label="Ano"         value={ano}         onChange={setAno}          placeholder="2026"   width={90} last />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="md" variant="primary"   onClick={handleConsultar}>Consultar</Button>
          <Button size="md" variant="secondary" onClick={handleLimpar}>Limpar</Button>
        </div>
      </div>

      {/* Estado vazio */}
      <div style={{ display: showEmpty ? 'flex' : 'none', background: 'white', border: '1px solid #dde3ee', borderRadius: 8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '48px 24px' }}>
        <div style={{ width: 72, height: 72, background: '#f0f4fb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="fa-regular fa-magnifying-glass-plus" style={{ fontSize: 28, color: '#0058db' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 4 }}>Pesquise um processo</div>
          <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#7a8a9e', maxWidth: 420 }}>Preencha os campos acima com o número do processo para consultar o andamento detalhado</div>
        </div>
      </div>

      {/* Sem resultados */}
      <div style={{ display: showNoResults ? 'flex' : 'none', background: 'white', border: '1px solid #dde3ee', borderRadius: 8, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '48px 24px' }}>
        <div style={{ width: 72, height: 72, background: '#f0f4fb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="fa-regular fa-file-slash" style={{ fontSize: 28, color: '#0058db' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 4 }}>Nenhum processo encontrado</div>
          <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#7a8a9e' }}>Verifique os dados informados e tente novamente</div>
        </div>
      </div>

      {/* Resultados */}
      {showResults && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#353535' }}>Resultados</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {consultasRecentes.filter(r => visibleNumeros.has(r.numero)).map(r => (
              <ConsultaRow key={r.numero} numero={r.numero} data={r.data} descricao={r.descricao} status={r.status} onClick={onNavigateProcesso} />
            ))}
          </div>
        </div>
      )}

      {/* Consultas recentes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#353535' }}>Consultas recentes</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {consultasRecentes.map(c => (
            <ConsultaRow key={c.numero} numero={c.numero} data={c.data} descricao={c.descricao} status={c.status} onClick={onNavigateProcesso} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tela: Conferência de Documentos ──────────────────────────────────────────
function ConsultaDocumentos() {
  const [orgao,       setOrgao]       = useState(ORGAOS[0]);
  const [procedencia, setProcedencia] = useState(PROCEDENCIAS[0]);
  const [numero,      setNumero]      = useState('');
  const [ano,         setAno]         = useState('');
  const [codigo,      setCodigo]      = useState('');

  function handleLimpar() { setOrgao(ORGAOS[0]); setProcedencia(PROCEDENCIAS[0]); setNumero(''); setAno(''); setCodigo(''); }
  function handleConsultar() { /* busca */ }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>

      <div>
        <h1 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#1a1a1a', margin: '0 0 8px 0' }}>Consulta de documentos</h1>
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#333', margin: 0, lineHeight: '24px', letterSpacing: '0.08px', maxWidth: 820 }}>
          Confira se uma cópia impressa corresponde a um documento assinado digitalmente em um processo administrativo. Basta inserir o código localizado na lateral direita do documento.
        </p>
      </div>

      <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 24, boxShadow: '0px 6px 8px rgba(24,39,75,0.12), 0px 8px 16px rgba(24,39,75,0.08)' }}>

        {/* Número do processo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#353535', margin: 0 }}>Número do processo</h2>
          <div style={{ display: 'flex', alignItems: 'stretch', border: '1.5px solid #0058db', borderRadius: 8, overflow: 'hidden', background: 'white', minHeight: 58 }}>
            <SelectSegment label="Órgão"       value={orgao}       onChange={setOrgao}       options={ORGAOS}       width={150} />
            <SelectSegment label="Procedência" value={procedencia} onChange={setProcedencia} options={PROCEDENCIAS} width={160} />
            <FormSegment   label="Número"      value={numero}      onChange={setNumero}       placeholder="000000" />
            <FormSegment   label="Ano"         value={ano}         onChange={setAno}          placeholder="2026" width={90} last />
          </div>
        </div>

        {/* Código do documento */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#353535', margin: 0 }}>Código do documento</h2>
          <div style={{ width: 390 }}>
            <Input
              placeholder="Ex: 00U61ULQ"
              fullWidth size="md" type="text"
              value={codigo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCodigo(e.target.value)}
              iconsRight={[{ icon: <i className="fa-regular fa-barcode-scan" style={{ color: '#7d7d7d' }} /> }]}
            />
          </div>
        </div>

        {/* Botões */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Button size="md" variant="primary"   onClick={handleConsultar}>Consultar</Button>
          <Button size="md" variant="secondary" onClick={handleLimpar}>Limpar</Button>
        </div>
      </div>

    </div>
  );
}

// ── Tela: Detalhe do Processo ─────────────────────────────────────────────────
type ProcessoTab = 'dados' | 'documentos' | 'tramitacoes' | 'movimentacoes' | 'arquivamentos';

// Linha de tabela de dados básicos
function DadosRow({ label, children, last = false }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div style={{ borderBottom: last ? 'none' : '1px solid #d5d5d5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', fontSize: 16, color: '#333', letterSpacing: '0.08px' }}>
      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400 }}>{label}</span>
      {children}
    </div>
  );
}

// Cabeçalho de tabela (colunas)
function TableHeader({ cols }: { cols: { label: string; width?: number | string; flex?: number | string; center?: boolean }[] }) {
  return (
    <div style={{ borderBottom: '1px solid #d5d5d5', display: 'flex', alignItems: 'center', padding: '8px 0', gap: 0 }}>
      {cols.map((col, i) => (
        <div key={i} style={{ ...(col.flex !== undefined ? { flex: col.flex } : { width: col.width, flexShrink: 0 }), fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 16, color: '#7d7d7d', letterSpacing: '0.08px', lineHeight: '24px', textAlign: col.center ? 'center' : 'left' }}>
          {col.label}
        </div>
      ))}
    </div>
  );
}

function ProcessoDetalhe() {
  const [activeTab, setActiveTab] = useState<ProcessoTab>('dados');

  const tabs: { key: ProcessoTab; label: string }[] = [
    { key: 'dados',         label: 'Dados do processo' },
    { key: 'documentos',    label: 'Documentos' },
    { key: 'tramitacoes',   label: 'Tramitações' },
    { key: 'movimentacoes', label: 'Movimentações' },
    { key: 'arquivamentos', label: 'Arquivamentos' },
  ];

  const cardStyle: React.CSSProperties = {
    background: 'white',
    border: '1px solid #ebebeb',
    borderRadius: 8,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    overflow: 'hidden',
  };

  const sectionTitle: React.CSSProperties = {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    fontSize: 16,
    color: '#353535',
    lineHeight: '1.2',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '24px 24px 48px 24px' }}>

      {/* ── Cabeçalho do processo ── */}
      <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#a3a3a3', lineHeight: '1.2' }}>
          PMF2026/000418
        </div>
        <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#333', lineHeight: 1 }}>
          Ranking de Sustentabilidade
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={imgBuildingColumns} style={{ width: 14, height: 16 }} alt="" />
            </div>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#a3a3a3', whiteSpace: 'nowrap' }}>SAUDE - Secretaria de Saúde</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={imgCalendarIcon} style={{ width: 14, height: 16 }} alt="" />
            </div>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#a3a3a3', whiteSpace: 'nowrap' }}>Entrada em:</span>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#a3a3a3', whiteSpace: 'nowrap' }}>02/09/2025</span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={imgFolderClosed} style={{ width: 14, height: 16 }} alt="" />
            </div>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#a3a3a3', whiteSpace: 'nowrap' }}>Processo Digital</span>
          </div>
        </div>
      </div>

      {/* ── Barra de tabs ── */}
      <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: '8px 24px', display: 'flex', gap: 0 }}>
        {tabs.map(tab => {
          const isActive = tab.key === activeTab;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{ background: 'none', border: 'none', borderBottom: isActive ? '3px solid #0058db' : '3px solid transparent', padding: '10px 16px', fontFamily: 'Open Sans, sans-serif', fontWeight: isActive ? 700 : 400, fontSize: 14, color: isActive ? '#0058db' : '#333', cursor: 'pointer', lineHeight: 1.5, whiteSpace: 'nowrap', transition: 'color 0.12s' }}>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab: Dados do Processo ── */}
      {activeTab === 'dados' && (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

          {/* Coluna esquerda */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: '0 0 65%' }}>

            {/* Dados básicos + Detalhamento */}
            <div style={cardStyle}>
              <div style={sectionTitle}>Dados básicos</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {([
                  { label: 'Tipo',             value: 'Processo Digital' },
                  { label: 'Classificação',    value: 'Ranking de Sustentabilidade' },
                  { label: 'Data de entrada',  value: '02/09/2025' },
                  { label: 'Recebido em',      value: '02/09/2025' },
                  { label: 'Órgão de abertura',value: 'USP - Universidade de São Paulo' },
                  { label: 'Órgão atual',      value: 'SOF - Secretaria de Orçamento e Finanças' },
                  { label: 'Unidade atual',    value: 'SolarBPM - Demonstração' },
                ] as { label: string; value: string }[]).map(row => (
                  <DadosRow key={row.label} label={row.label}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#333', letterSpacing: '0.08px', whiteSpace: 'nowrap' }}>{row.value}</span>
                  </DadosRow>
                ))}
                <DadosRow label="Situação" last>
                  <span style={{ background: '#ffe9d9', color: '#99470c', borderRadius: 6, padding: '4px 8px', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 12, lineHeight: '16px', letterSpacing: '0.06px', whiteSpace: 'nowrap' }}>
                    Arquivado
                  </span>
                </DadosRow>
              </div>

              <div style={sectionTitle}>Detalhamento</div>
              <div style={{ background: '#f4f6f9', borderRadius: 8, padding: 10 }}>
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#333', lineHeight: '16px', margin: 0, letterSpacing: '0.08px' }}>
                  Sustentabilidade da Unidade: SOF - Secretaria de Orçamento e Finanças referente ao mês de setembro
                </p>
              </div>
            </div>

            {/* Andamento (timeline) */}
            <div style={cardStyle}>
              <div style={sectionTitle}>Andamento</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {([
                  { date: '02/09/2025', title: 'Processo aberto',                          desc: 'Solicitação protocolada e recebida pela unidade UN - São Paulo',                              loc: 'UN - São Paulo',               isLast: false },
                  { date: '02/09/2025', title: 'Encaminhamento para unidade digital',       desc: 'Processo encaminhado e recebido pela unidade DIGITAL para análise',                          loc: 'Digital',                      isLast: false },
                  { date: '08/09/2025', title: 'Análise de sustentabilidade finalizada',    desc: 'Tarefa concluída pela unidade DIGITAL. Processo encaminhado à Secretaria de Saúde',          loc: 'SAUDE - Secretaria da Saúde',  isLast: false },
                  { date: '08/09/2025', title: 'Processo arquivado',                        desc: 'Arquivado pela unidade SAUDE - Secretaria da Saúde após conclusão da análise',               loc: 'SAUDE - Secretaria da Saúde',  isLast: true  },
                ] as { date: string; title: string; desc: string; loc: string; isLast: boolean }[]).map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 10, height: 104, flexShrink: 0 }}>
                      <img src={item.isLast ? imgTimelineEnd : imgTimelineLine} style={{ width: '100%', height: '100%' }} alt="" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 12, color: '#333', lineHeight: '24px', letterSpacing: '0.06px' }}>{item.date}</span>
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#333', lineHeight: '24px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>{item.title}</span>
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#333', lineHeight: '24px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>{item.desc}</span>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <img src={imgLocationDot} style={{ width: 12, height: 12, objectFit: 'contain' }} alt="" />
                        </div>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#333', lineHeight: '24px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>{item.loc}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna direita */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, minWidth: 0 }}>

            {/* Interessados */}
            <div style={cardStyle}>
              <div style={sectionTitle}>Interessados</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {([
                  { initials: 'FS', name: 'Fernando Naim Schmitz', role: 'Requerente' },
                  { initials: 'CL', name: 'Cris Lima',             role: 'Requerente' },
                ] as { initials: string; name: string; role: string }[]).map((person, i, arr) => (
                  <div key={person.initials} style={{ borderBottom: i < arr.length - 1 ? '1px solid #d5d5d5' : 'none', display: 'flex', alignItems: 'center', padding: '8px 0', gap: 8 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', background: '#dce6f5', border: '1.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 16, color: '#194280', textTransform: 'uppercase', letterSpacing: '0.08px' }}>{person.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#333', lineHeight: '24px', letterSpacing: '0.08px' }}>{person.name}</div>
                      <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#333', lineHeight: '24px', letterSpacing: '0.07px' }}>{person.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentos (resumo) */}
            <div style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', fontSize: 16, whiteSpace: 'nowrap' }}>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, color: '#353535', lineHeight: '1.2' }}>Documentos</span>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, color: '#353535', lineHeight: '1.2', cursor: 'pointer' }}>Ver todos</span>
              </div>
              {([
                { name: 'Despacho_UN-SAOPAULO.pdf', vol: 'Vol. 1', date: '02/09/2025' },
                { name: 'Despacho_DIGITAL.pdf',     vol: 'Vol. 1', date: '02/09/2025' },
                { name: 'Despacho_SAUDE.pdf',       vol: 'Vol. 1', date: '02/09/2025' },
              ] as { name: string; vol: string; date: string }[]).map(doc => (
                <div key={doc.name} style={{ background: '#dce6f5', borderRadius: 8, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={imgFileLines} style={{ width: 12, height: 14 }} alt="" />
                </div>
                    <div>
                      <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#333', lineHeight: '24px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>{doc.name}</div>
                      <div style={{ display: 'flex', gap: 16, fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#333', lineHeight: '24px', letterSpacing: '0.07px' }}>
                        <span>{doc.vol}</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src={imgDownToLine} style={{ width: 12, height: 14 }} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Documentos ── */}
      {activeTab === 'documentos' && (
        <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={sectionTitle}>Documentos</div>
          {([
            { name: 'Despacho_UN-SAOPAULO.pdf', vol: 'Vol. 1', date: '02/09/2025' },
            { name: 'Despacho_DIGITAL.pdf',     vol: 'Vol. 1', date: '02/09/2025' },
            { name: 'Despacho_SAUDE.pdf',       vol: 'Vol. 1', date: '02/09/2025' },
          ] as { name: string; vol: string; date: string }[]).map(doc => (
            <div key={doc.name} style={{ background: '#dce6f5', borderRadius: 8, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={imgFileLines} style={{ width: 12, height: 14 }} alt="" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#333', lineHeight: '24px', letterSpacing: '0.07px', whiteSpace: 'nowrap' }}>{doc.name}</div>
                  <div style={{ display: 'flex', gap: 16, fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#333', lineHeight: '24px', letterSpacing: '0.07px' }}>
                    <span>{doc.vol}</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              </div>
              <div style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={imgDownToLine} style={{ width: 12, height: 14 }} alt="" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Tramitações ── */}
      {activeTab === 'tramitacoes' && (() => {
        const th: React.CSSProperties = { fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 16, color: '#7d7d7d', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0', borderBottom: '1px solid #d5d5d5', textAlign: 'left', fontStyle: 'normal' };
        const td: React.CSSProperties = { fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#333', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0' };
        return (
          <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: 24 }}>
            <div style={{ ...sectionTitle, marginBottom: 8 }}>Tramitações</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={th}>VOL.</th>
                  <th style={th}>ÓRGÃO / SETOR</th>
                  <th style={th}>RECEBIDO EM</th>
                  <th style={th}>ENCAMINHADO EM</th>
                  <th style={{ ...th, textAlign: 'center' }}>DESPACHO</th>
                </tr>
              </thead>
              <tbody>
                {([
                  { vol: '1', orgao: 'UN-SAOPAULO', recebido: '02/09/2025', encaminhado: '02/09/2025' },
                  { vol: '1', orgao: 'DIGITAL',     recebido: '02/09/2025', encaminhado: '08/09/2025' },
                  { vol: '1', orgao: 'SAUDE',       recebido: '08/09/2025', encaminhado: '' },
                ] as { vol: string; orgao: string; recebido: string; encaminhado: string }[]).map((row, i, arr) => (
                  <tr key={i} style={{ borderBottom: i < arr.length - 1 ? '1px solid #d5d5d5' : 'none' }}>
                    <td style={td}>{row.vol}</td>
                    <td style={td}>{row.orgao}</td>
                    <td style={td}>{row.recebido}</td>
                    <td style={td}>{row.encaminhado}</td>
                    <td style={{ ...td, textAlign: 'center' }}>
                      <div style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={imgEyeSolid} style={{ width: 18, height: 14, cursor: 'pointer' }} alt="Ver despacho" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })()}

      {/* ── Tab: Movimentações ── */}
      {activeTab === 'movimentacoes' && (() => {
        const th: React.CSSProperties = { fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 16, color: '#7d7d7d', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0', borderBottom: '1px solid #d5d5d5', textAlign: 'left', fontStyle: 'normal' };
        const td: React.CSSProperties = { fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#333', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0', borderBottom: '1px solid #d5d5d5' };
        return (
          <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: 24 }}>
            <div style={{ ...sectionTitle, marginBottom: 8 }}>Movimentações</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '45%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '15%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={th}>TIPO DE TAREFA</th>
                  <th style={th}>Data de Criação</th>
                  <th style={th}>Situação</th>
                  <th style={{ ...th, textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>Analisar sustentabilidade</td>
                  <td style={td}>02/09/2025</td>
                  <td style={td}>
                    <span style={{ background: '#cef2e1', color: '#0f4c30', borderRadius: 6, padding: '4px 8px', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 12, lineHeight: '16px', letterSpacing: '0.06px', whiteSpace: 'nowrap' }}>
                      Finalizada
                    </span>
                  </td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={imgEyeSolid} style={{ width: 18, height: 14, cursor: 'pointer' }} alt="Ver detalhes" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })()}

      {/* ── Tab: Arquivamentos ── */}
      {activeTab === 'arquivamentos' && (() => {
        const th: React.CSSProperties = { fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 16, color: '#7d7d7d', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0', borderBottom: '1px solid #d5d5d5', textAlign: 'left', fontStyle: 'normal' };
        const td: React.CSSProperties = { fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 16, color: '#333', lineHeight: '24px', letterSpacing: '0.08px', padding: '8px 0', borderBottom: '1px solid #d5d5d5' };
        return (
          <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: 24 }}>
            <div style={{ ...sectionTitle, marginBottom: 8 }}>Arquivamentos e reaberturas</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '5%' }} />
                <col style={{ width: '25%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '25%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th style={th}>VOL.</th>
                  <th style={th}>TIPO DE TAREFA</th>
                  <th style={th}>ARQUIVADO EM</th>
                  <th style={{ ...th, textAlign: 'center' }}>MOTIVO DO ARQUIVAMENTO</th>
                  <th style={th}>REABERTO EM</th>
                  <th style={th}>MOTIVO REABERTURA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>1</td>
                  <td style={td}>SAUDE - Secretaria da saude</td>
                  <td style={td}>02/09/2025</td>
                  <td style={{ ...td, textAlign: 'center' }}>
                    <div style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={imgEyeSolid} style={{ width: 18, height: 14, cursor: 'pointer' }} alt="Ver motivo" />
                    </div>
                  </td>
                  <td style={td}>02/09/2025</td>
                  <td style={td}>02/09/2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })()}

    </div>
  );
}

// ── Dados mock para consulta avançada ────────────────────────────────────────
const MOCK_SERVICOS_AV = [
  { servico: '2ª Via de IPTU',                         categoria: 'Impostos e taxas',                    setor: 'SMF/SUBRT/CCC/Departamento de Cadastro Imobiliário', destino: ['Cidadão', 'Empresa'] },
  { servico: 'Agendamento de atendimento presencial',  categoria: 'Solicitações',                         setor: 'SMA/SGP/GAC/Central de Atendimento',                 destino: ['Cidadão', 'Empresa', 'Visitante'] },
  { servico: 'Alvará de funcionamento',                categoria: 'Alvarás, autorizações e licenças',     setor: 'SMPHDU/SDU/DLAE/Gerência de Alvarás',               destino: ['Empresa'] },
  { servico: 'Alvará de obra',                         categoria: 'Obras e urbanismo',                   setor: 'SMPHDU/SDU/DLAE/Plano Diretor',                     destino: ['Cidadão', 'Empresa'] },
  { servico: 'Aprovação de projetos arquitetônicos',   categoria: 'Obras e urbanismo',                   setor: 'SMPHDU/SDU/DIPU/Projetos',                          destino: ['Empresa', 'Visitante'] },
  { servico: 'Atestado de residência',                 categoria: 'Certidões, declarações e documentos', setor: 'SMA/SGP/GAC/Protocolo',                             destino: ['Cidadão'] },
  { servico: 'Baixa de inscrição municipal',           categoria: 'Baixas e cancelamentos',              setor: 'SMF/SUBRT/CCC/Cadastro Municipal',                  destino: ['Empresa'] },
  { servico: 'Cadastro de MEI',                        categoria: 'Comércio e serviços',                 setor: 'SMF/SUBRT/CCC/Departamento de Cadastro de Pessoas', destino: ['Cidadão', 'Empresa'] },
  { servico: 'Carteira do idoso',                      categoria: 'Assistência social',                  setor: 'SMDS/Coordenadoria do Idoso',                       destino: ['Cidadão'] },
  { servico: 'Certidão de débitos municipais',         categoria: 'Certidões, declarações e documentos', setor: 'SMF/SUBRT/CCC/Certidões',                           destino: ['Cidadão', 'Empresa', 'Visitante'] },
  { servico: 'Certidão negativa de débitos (CND)',     categoria: 'Certidões, declarações e documentos', setor: 'SMF/SUBRT/CCC/Certidões',                           destino: ['Cidadão', 'Empresa'] },
  { servico: 'Consulta de processo administrativo',    categoria: 'Processos externos',                  setor: 'SMA/SGP/GAC/Protocolo',                             destino: ['Cidadão', 'Empresa', 'Visitante'] },
  { servico: 'Emissão de boleto de IPTU',              categoria: 'Impostos e taxas',                    setor: 'SMF/SUBRT/CCC/Departamento de Cadastro Imobiliário', destino: ['Cidadão', 'Empresa'] },
  { servico: 'Fala, cidadão (Ouvidoria)',              categoria: 'Reclamações e denúncias',             setor: 'SMA/SGP/GAC/Ouvidoria',                             destino: ['Cidadão', 'Visitante'] },
  { servico: 'Habite-se',                              categoria: 'Obras e urbanismo',                   setor: 'SMPHDU/SDU/DLAE/Vistoria',                          destino: ['Cidadão', 'Empresa'] },
  { servico: 'Isenção de IPTU para idosos',            categoria: 'Isenções e imunidade',                setor: 'SMF/SUBRT/CCC/Isenções',                            destino: ['Cidadão'] },
  { servico: 'Licença ambiental',                      categoria: 'Meio ambiente',                       setor: 'FLORIPAMANHÃ/Licenciamento Ambiental',              destino: ['Empresa', 'Visitante'] },
  { servico: 'Licença sanitária',                      categoria: 'Alvarás, autorizações e licenças',    setor: 'SMS/Vigilância Sanitária',                          destino: ['Empresa'] },
  { servico: 'Matrícula escolar municipal',            categoria: 'Solicitações',                        setor: 'SME/Coordenadoria de Ensino Fundamental',           destino: ['Cidadão'] },
  { servico: 'Parcelamento de débitos municipais',     categoria: 'Devoluções, compensações e prescrições', setor: 'SMF/SUBRT/CCC/Parcelamento',                    destino: ['Cidadão', 'Empresa'] },
  { servico: 'Pedido de informação (LAI)',              categoria: 'Certidões, declarações e documentos', setor: 'SMA/SGP/GAC/Transparência',                        destino: ['Cidadão', 'Empresa', 'Visitante'] },
  { servico: 'Renovação de alvará',                    categoria: 'Alvarás, autorizações e licenças',    setor: 'SMPHDU/SDU/DLAE/Gerência de Alvarás',              destino: ['Empresa'] },
  { servico: 'Solicitação de poda de árvores',         categoria: 'Meio ambiente',                       setor: 'FLORIPAMANHÃ/Parques e Jardins',                    destino: ['Cidadão', 'Visitante'] },
  { servico: 'Taxa de coleta de lixo',                 categoria: 'Impostos e taxas',                    setor: 'COMCAP/Coleta Urbana',                              destino: ['Cidadão', 'Empresa'] },
  { servico: 'Vacinação municipal',                    categoria: 'Saúde',                               setor: 'SMS/Vigilância Epidemiológica',                     destino: ['Cidadão', 'Visitante'] },
];

// ── Tela: Solicitação de Serviços ─────────────────────────────────────────────
function SolicitacaoServicos({ onNavigateCat, onNavigateDetalhe }: {
  onNavigateCat: (cat: { label: string; icon: string }) => void;
  onNavigateDetalhe: (service: typeof MOCK_SERVICOS_AV[0]) => void;
}) {
  const t = useT();
  const [tab,    setTab]    = useState<'servicos' | 'avancada'>('servicos');
  const [query,  setQuery]  = useState('');

  // Estado da consulta avançada
  const [avServico,    setAvServico]    = useState('');
  const [avCategoria,  setAvCategoria]  = useState('');
  const [avCatQuery,   setAvCatQuery]   = useState('');
  const [avCatOpen,    setAvCatOpen]    = useState(false);
  const [avDestino,    setAvDestino]    = useState<string[]>([]);
  const [avResultados, setAvResultados] = useState<typeof MOCK_SERVICOS_AV | null>(null);
  const [avPage,       setAvPage]       = useState(1);
  const [avPerPage,    setAvPerPage]    = useState(10);
  const avCatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOut(e: MouseEvent) { if (avCatRef.current && !avCatRef.current.contains(e.target as Node)) setAvCatOpen(false); }
    document.addEventListener('mousedown', onOut);
    return () => document.removeEventListener('mousedown', onOut);
  }, []);

  function toggleDestino(d: string) { setAvDestino(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]); }

  function handleAvConsultar() {
    let res = MOCK_SERVICOS_AV;
    if (avServico.trim()) res = res.filter(r => r.servico.toLowerCase().includes(avServico.toLowerCase()));
    if (avCategoria) res = res.filter(r => r.categoria === avCategoria);
    if (avDestino.length > 0) res = res.filter(r => avDestino.some(d => r.destino.includes(d)));
    setAvResultados(res);
    setAvPage(1);
  }

  function handleAvLimpar() { setAvServico(''); setAvCategoria(''); setAvCatQuery(''); setAvDestino([]); setAvResultados(null); setAvPage(1); }

  const catOptions = categories.map(c => c.label).filter(l => !avCatQuery || l.toLowerCase().includes(avCatQuery.toLowerCase()));
  const totalAv    = avResultados?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalAv / avPerPage));
  const avSlice    = avResultados?.slice((avPage - 1) * avPerPage, avPage * avPerPage) ?? [];

  const results = query.trim()
    ? ALL_SERVICES.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : [];

  const tabBtn = (active: boolean): React.CSSProperties => ({
    background: 'none', border: 'none', borderBottom: active ? '3px solid #0058db' : '3px solid transparent',
    padding: '10px 16px', fontFamily: 'Open Sans, sans-serif', fontWeight: active ? 700 : 400,
    fontSize: 14, color: active ? '#0058db' : '#333', cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'color 0.12s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>

      {/* Título */}
      <div>
        <h1 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#1a1a1a', margin: '0 0 4px 0' }}>
          {t('solicitacaoServicos')}
        </h1>
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#565656', margin: 0 }}>
          {t('solicitacaoDesc')}
        </p>
      </div>

      {/* Barra de tabs separada */}
      <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: '8px 24px', display: 'flex', gap: 0 }}>
        <button style={tabBtn(tab === 'servicos')}  onClick={() => setTab('servicos')}>Serviços</button>
        <button style={tabBtn(tab === 'avancada')}  onClick={() => setTab('avancada')}>Consulta avançada</button>
      </div>

      {/* Card de conteúdo */}
      <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 8, overflow: 'hidden', boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>

        {tab === 'servicos' && (
          <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Busca */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
              <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 15, color: '#353535', margin: 0 }}>
                O que você procura?
              </p>
              <div style={{ width: '100%', maxWidth: 760, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #0058db', borderRadius: 8, overflow: 'hidden', background: 'white', height: 48 }}>
                  <input
                    value={query} placeholder="Digite o serviço desejado..."
                    onChange={e => { setQuery(e.target.value); }}
                    style={{ flex: 1, border: 'none', outline: 'none', padding: '0 16px', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#333', background: 'transparent' }}
                  />
                  <div style={{ width: 48, height: 48, background: '#0058db', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                    <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 18, color: 'white' }} />
                  </div>
                </div>
                {/* Dropdown resultados */}
                {query.trim() && results.length > 0 && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', zIndex: 100, overflow: 'hidden' }}>
                    {results.slice(0, 8).map((s, i) => (
                      <div key={s} onClick={() => setQuery(s)}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', cursor: 'pointer', background: 'white', borderBottom: i < Math.min(results.length, 8) - 1 ? '1px solid #f0f0f0' : 'none', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#333', transition: 'background 0.1s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
                      >
                        <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 13, color: '#a3a3a3', flexShrink: 0 }} />
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Resultados de serviços ao filtrar */}
            {query.trim() && results.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #dde3ee', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #edf0f5', fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#353535' }}>
                  {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </div>
                {results.map((s, i) => (
                  <div key={s}
                    onClick={() => { const svc = MOCK_SERVICOS_AV.find(m => m.servico === s); if (svc) onNavigateDetalhe(svc); }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: i % 2 === 0 ? 'white' : '#f5f7fa', borderBottom: i < results.length - 1 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer', transition: 'background 0.1s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#e8f0fd'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = i % 2 === 0 ? 'white' : '#f5f7fa'; }}
                  >
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#333' }}>{s}</span>
                    <FAIcon icon="fa-regular fa-angle-right" style={{ fontSize: 14, color: '#7d7d7d' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Grade de categorias */}
            {!query.trim() && (
              <>
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#565656', margin: 0, textAlign: 'center' }}>
                  Navegue pelas categorias e encontre o serviço desejado:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 12 }}>
                  {categories.map((cat, i) => (
                    <div key={i} onClick={() => onNavigateCat({ label: cat.label, icon: cat.icon })}
                      style={{ background: 'white', border: '1.5px solid #d5d5d5', borderRadius: 8, padding: '20px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0px 2px 6px rgba(24,39,75,0.08)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#0058db'; (e.currentTarget as HTMLDivElement).style.background = '#f5f8ff'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#d5d5d5'; (e.currentTarget as HTMLDivElement).style.background = 'white'; }}
                    >
                      <i className={cat.icon} style={{ fontSize: 40, color: '#4a7fc1' }} />
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#353535', textAlign: 'center', lineHeight: 1.3 }}>{cat.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        )}

        {tab === 'avancada' && (
          <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* ── Formulário de filtros ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Serviço */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 11, color: '#8a9ab5', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Serviço</label>
                <input value={avServico} onChange={e => setAvServico(e.target.value)} placeholder="Nome do serviço..."
                  style={{ height: 44, border: '1px solid #d5d5d5', borderRadius: 6, padding: '0 12px', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#333', outline: 'none', width: '100%' }} />
              </div>

              {/* Linha: Categoria | Órgão | A quem se destina */}
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>

                {/* Categoria com busca */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, position: 'relative' }} ref={avCatRef}>
                  <label style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 11, color: '#8a9ab5', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Categoria</label>
                  <div onClick={() => setAvCatOpen(o => !o)}
                    style={{ height: 44, border: '1px solid #d5d5d5', borderRadius: 6, padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'white' }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: avCategoria ? '#333' : '#a3a3a3' }}>{avCategoria || 'Todas as categorias'}</span>
                    <FAIcon icon="fa-regular fa-chevron-down" style={{ fontSize: 11, color: '#8a9ab5' }} />
                  </div>
                  {avCatOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200, background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, boxShadow: '0px 8px 24px rgba(24,39,75,0.16)', overflow: 'hidden', marginTop: 4 }}>
                      <div style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #d5d5d5', borderRadius: 6, padding: '0 10px', height: 34 }}>
                          <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 12, color: '#a3a3a3', flexShrink: 0 }} />
                          <input autoFocus value={avCatQuery} onChange={e => setAvCatQuery(e.target.value)} placeholder="Buscar categoria..."
                            style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#333', background: 'transparent' }} />
                        </div>
                      </div>
                      <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                        <div onClick={() => { setAvCategoria(''); setAvCatOpen(false); setAvCatQuery(''); }}
                          style={{ padding: '9px 12px', cursor: 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: !avCategoria ? '#0058db' : '#333', fontWeight: !avCategoria ? 600 : 400, borderBottom: '1px solid #f5f5f5' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                          Todas as categorias
                        </div>
                        {catOptions.map(c => (
                          <div key={c} onClick={() => { setAvCategoria(c); setAvCatOpen(false); setAvCatQuery(''); }}
                            style={{ padding: '9px 12px', cursor: 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: avCategoria === c ? '#0058db' : '#333', fontWeight: avCategoria === c ? 600 : 400, borderBottom: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = '#f0f5ff'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}>
                            {c}
                            {avCategoria === c && <FAIcon icon="fa-solid fa-check" style={{ fontSize: 11, color: '#0058db' }} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Órgão Responsável */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <label style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 11, color: '#8a9ab5', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Órgão responsável</label>
                  <div style={{ position: 'relative' }}>
                    <select style={{ width: '100%', height: 44, border: '1px solid #d5d5d5', borderRadius: 6, padding: '0 32px 0 12px', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#333', background: 'white', outline: 'none', appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Todos</option>
                      <option value="PMF">PMF - Prefeitura Municipal de Florianópolis</option>
                    </select>
                    <FAIcon icon="fa-regular fa-chevron-down" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#8a9ab5', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* A quem se destina */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <label style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 11, color: '#8a9ab5', letterSpacing: '0.07em', textTransform: 'uppercase' }}>A quem se destina</label>
                  <div style={{ display: 'flex', alignItems: 'stretch', border: '1.5px solid #d5d5d5', borderRadius: 6, overflow: 'hidden', height: 44 }}>
                    {(['Cidadão', 'Empresa', 'Visitante'] as const).map((d, i) => {
                      const active = avDestino.includes(d);
                      return (
                        <div key={d} onClick={() => toggleDestino(d)}
                          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: active ? '#0058db' : 'white', color: active ? 'white' : '#555', fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: active ? 600 : 400, borderRight: i < 2 ? '1px solid #d5d5d5' : 'none', transition: 'all 0.15s', userSelect: 'none' }}>
                          {d}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <Button size="md" variant="secondary" onClick={handleAvLimpar}>{t('limpar')}</Button>
                <Button size="md" variant="primary"   onClick={handleAvConsultar}>{t('consultar')}</Button>
              </div>
            </div>

            {/* ── Estado vazio (antes de pesquisar) ── */}
            {avResultados === null && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px', background: '#f9fafb', borderRadius: 8, border: '1px solid #edf0f5' }}>
                <div style={{ width: 64, height: 64, background: '#edf2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FAIcon icon="fa-regular fa-magnifying-glass-plus" style={{ fontSize: 24, color: '#0058db' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 4 }}>Pesquise um serviço</div>
                  <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#7a8a9e' }}>Use os filtros acima para encontrar o serviço desejado</div>
                </div>
              </div>
            )}

            {/* ── Resultados ── */}
            {avResultados !== null && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                {/* Cabeçalho resultado + exportar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#353535' }}>
                    {totalAv} resultado{totalAv !== 1 ? 's' : ''} encontrado{totalAv !== 1 ? 's' : ''}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#7d7d7d' }}>Exportar:</span>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#0058db', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600 }}>
                      <FAIcon icon="fa-regular fa-file-pdf" style={{ fontSize: 13 }} /> Documento em PDF
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#1a7a3c', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'Open Sans, sans-serif', fontSize: 12, fontWeight: 600 }}>
                      <FAIcon icon="fa-regular fa-file-spreadsheet" style={{ fontSize: 13 }} /> Planilha em XLS
                    </button>
                  </div>
                </div>

                {/* Sem resultados */}
                {totalAv === 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '40px 24px', background: '#f9fafb', borderRadius: 8, border: '1px solid #edf0f5' }}>
                    <div style={{ width: 64, height: 64, background: '#edf2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FAIcon icon="fa-regular fa-file-slash" style={{ fontSize: 24, color: '#0058db' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 4 }}>Nenhum serviço encontrado</div>
                      <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#7a8a9e' }}>Tente ajustar os filtros e pesquisar novamente</div>
                    </div>
                  </div>
                )}

                {/* Tabela */}
                {totalAv > 0 && (
                  <div style={{ border: '1px solid #dde3ee', borderRadius: 8, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <colgroup>
                        <col style={{ width: '22%' }} />
                        <col style={{ width: '18%' }} />
                        <col style={{ width: '18%' }} />
                        <col style={{ width: '26%' }} />
                        <col style={{ width: '12%' }} />
                        <col style={{ width: '4%' }} />
                      </colgroup>
                      <thead>
                        <tr style={{ background: '#f5f7fa' }}>
                          {['Serviço', 'Categoria', 'Órgão responsável', 'Setor responsável', 'A quem se destina', ''].map((h, i) => (
                            <th key={i} style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#565656', padding: '12px 14px', textAlign: 'left', borderBottom: '1px solid #dde3ee' }}>
                              {h}{i === 0 && <FAIcon icon="fa-regular fa-arrow-up" style={{ fontSize: 10, marginLeft: 4, color: '#a3a3a3' }} />}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {avSlice.map((row, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #edf0f5', background: i % 2 === 0 ? 'white' : '#f9fafb', cursor: 'pointer', transition: 'background 0.1s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLTableRowElement).style.background = '#eef3ff'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? 'white' : '#f9fafb'; }}>
                            <td style={{ padding: '11px 14px', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#0058db', fontWeight: 500 }}>{row.servico}</td>
                            <td style={{ padding: '11px 14px', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#0058db' }}>{row.categoria}</td>
                            <td style={{ padding: '11px 14px', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#0058db' }}>PMF - Prefeitura Municipal de Florianópolis</td>
                            <td style={{ padding: '11px 14px', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#0058db' }}>{row.setor}</td>
                            <td style={{ padding: '11px 14px', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#0058db' }}>{row.destino.join(', ')}</td>
                            <td style={{ padding: '11px 14px', textAlign: 'center' }}>
                              <div style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={imgEyeSolid} style={{ width: 18, height: 14, cursor: 'pointer' }} alt="Ver" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Rodapé: por página + paginação */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '12px 16px', borderTop: '1px solid #edf0f5', gap: 20, background: 'white' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#7d7d7d' }}>Quantidade por página</span>
                        <select value={avPerPage} onChange={e => { setAvPerPage(Number(e.target.value)); setAvPage(1); }}
                          style={{ height: 30, border: '1px solid #d5d5d5', borderRadius: 4, padding: '0 8px', fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#333', cursor: 'pointer', outline: 'none' }}>
                          {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#7d7d7d' }}>
                        {(avPage - 1) * avPerPage + 1}–{Math.min(avPage * avPerPage, totalAv)} de {totalAv}
                      </span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => setAvPage(p => Math.max(1, p - 1))} disabled={avPage === 1}
                          style={{ width: 30, height: 30, border: '1px solid #d5d5d5', borderRadius: 4, background: 'white', cursor: avPage === 1 ? 'default' : 'pointer', color: avPage === 1 ? '#c0c0c0' : '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FAIcon icon="fa-regular fa-chevron-left" style={{ fontSize: 12 }} />
                        </button>
                        <button onClick={() => setAvPage(p => Math.min(totalPages, p + 1))} disabled={avPage === totalPages}
                          style={{ width: 30, height: 30, border: '1px solid #d5d5d5', borderRadius: 4, background: 'white', cursor: avPage === totalPages ? 'default' : 'pointer', color: avPage === totalPages ? '#c0c0c0' : '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FAIcon icon="fa-regular fa-chevron-right" style={{ fontSize: 12 }} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tela: Meus Dados ─────────────────────────────────────────────────────────
function MeusDados() {
  const [nome,             setNome]             = useState('CRISTIANDERSON ALVES DE LIMA');
  const [senha,            setSenha]            = useState('');
  const [confirmarSenha,   setConfirmarSenha]   = useState('');
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

  // ── Estilos reutilizáveis ──
  const lbl: React.CSSProperties = {
    fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 11,
    color: '#8a9ab5', letterSpacing: '0.07em', textTransform: 'uppercase', lineHeight: '14px', marginBottom: 4,
  };
  const inp: React.CSSProperties = {
    background: 'white', border: '1px solid #d5d5d5', borderRadius: 6, height: 44,
    padding: '0 12px', fontFamily: 'Open Sans, sans-serif', fontWeight: 400,
    fontSize: 14, color: '#333', width: '100%', boxSizing: 'border-box', outline: 'none',
    transition: 'border-color 0.15s',
  };
  const inpReadOnly: React.CSSProperties = { ...inp, background: '#f4f6f9', color: '#8a9ab5', cursor: 'default' };
  const inpPassword: React.CSSProperties = { ...inp, flex: 1, border: 'none', padding: 0, height: '100%' };
  const passwordBox: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'white', border: '1px solid #d5d5d5', borderRadius: 6, height: 44,
    padding: '0 12px', boxSizing: 'border-box',
  };
  const alertBanner = (text: string): React.ReactElement => (
    <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', borderRadius: 6, padding: '10px 16px', fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 13, color: '#7a5a00', textAlign: 'center' }}>
      {text}
    </div>
  );

  function Field({ label, children, flex }: { label: string; children: React.ReactNode; flex?: number | string }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: flex ?? 1, minWidth: 0 }}>
        <label style={lbl}>{label}</label>
        {children}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>
      <h1 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#1a1a1a', margin: 0 }}>Meus Dados</h1>

      <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 8, padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>

        {/* ── Identificação ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#353535', margin: 0, paddingBottom: 8, borderBottom: '1px solid #ebebeb' }}>Identificação</h2>
          {alertBanner('Por favor, complete seu cadastro.')}
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label="CPF *" flex={1}>
              <input value="043.792.234-00" readOnly style={inpReadOnly} />
            </Field>
            <Field label="Nome completo *" flex={2}>
              <input value={nome} onChange={e => setNome(e.target.value)} style={inp} />
            </Field>
          </div>
        </div>

        {/* ── Acesso ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#353535', margin: 0, paddingBottom: 8, borderBottom: '1px solid #ebebeb' }}>Acesso</h2>
          {alertBanner('Para assinar documentos ou acessar o sistema, atualize seu cadastro e senha.')}
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label="Senha *">
              <div style={passwordBox}>
                <input type={showSenha ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} placeholder="Nova senha" style={inpPassword} />
                <FAIcon icon={showSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 15, color: '#7d7d7d', cursor: 'pointer', flexShrink: 0 }} />
              </div>
            </Field>
            <Field label="Confirmar Senha *">
              <div style={passwordBox}>
                <input type={showConfSenha ? 'text' : 'password'} value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} placeholder="Confirmar senha" style={inpPassword} />
                <FAIcon icon={showConfSenha ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{ fontSize: 15, color: '#7d7d7d', cursor: 'pointer', flexShrink: 0 }} onClick={() => setShowConfSenha(v => !v)} />
              </div>
            </Field>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label="E-mail *">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
            </Field>
            <Field label="Confirmar E-mail *">
              <input type="email" value={confirmarEmail} onChange={e => setConfirmarEmail(e.target.value)} style={inp} />
            </Field>
          </div>
        </div>

        {/* ── E-mails adicionais ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid #ebebeb' }}>
            <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#353535', margin: 0 }}>E-mail Adicional</h2>
            <Button size="sm" variant="primary" onClick={() => { if (novoEmail.trim()) { setEmailsAdicionais(v => [...v, novoEmail.trim()]); setNovoEmail(''); } }}>
              <FAIcon icon="fa-regular fa-plus" style={{ fontSize: 13, marginRight: 4 }} />Incluir
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <Field label="Novo e-mail" flex={1}>
              <input type="email" value={novoEmail} onChange={e => setNovoEmail(e.target.value)} placeholder="Digite um e-mail adicional" style={inp} />
            </Field>
          </div>
          {emailsAdicionais.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <colgroup><col style={{ width: '85%' }} /><col style={{ width: '15%' }} /></colgroup>
              <thead>
                <tr style={{ borderBottom: '1px solid #d5d5d5' }}>
                  <th style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#7d7d7d', padding: '6px 0', textAlign: 'left' }}>E-mail</th>
                  <th style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, color: '#7d7d7d', padding: '6px 0', textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {emailsAdicionais.map((em, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#333', padding: '8px 0' }}>{em}</td>
                    <td style={{ textAlign: 'center' }}>
                      <FAIcon icon="fa-regular fa-trash" style={{ fontSize: 15, color: '#c0182d', cursor: 'pointer' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Dados pessoais ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#353535', margin: 0, paddingBottom: 8, borderBottom: '1px solid #ebebeb' }}>Dados Pessoais</h2>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label="Sexo *">
              <div style={{ position: 'relative' }}>
                <select value={sexo} onChange={e => setSexo(e.target.value)} style={{ ...inp, appearance: 'none', WebkitAppearance: 'none', paddingRight: 32, cursor: 'pointer' }}>
                  {['Masculino', 'Feminino', 'Não informado'].map(o => <option key={o}>{o}</option>)}
                </select>
                <FAIcon icon="fa-regular fa-chevron-down" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#8a9ab5', pointerEvents: 'none' }} />
              </div>
            </Field>
            <Field label="Data de Nascimento *">
              <input value={nascimento} onChange={e => setNascimento(e.target.value)} placeholder="DD/MM/AAAA" style={inp} />
            </Field>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label="Nacionalidade *">
              <input value={nacionalidade} onChange={e => setNacionalidade(e.target.value)} style={inp} />
            </Field>
            <Field label="Telefone *">
              <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(00) 00000-0000" style={inp} />
            </Field>
          </div>
        </div>

        {/* ── Endereço ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#353535', margin: 0, paddingBottom: 8, borderBottom: '1px solid #ebebeb' }}>Endereço</h2>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <Field label="CEP *" flex="none">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input value={cep} onChange={e => setCep(e.target.value)} placeholder="00000-000" style={{ ...inp, width: 140 }} />
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 12, color: '#0058db', whiteSpace: 'nowrap', cursor: 'pointer', textDecoration: 'underline' }}>Consultar CEP</span>
              </div>
            </Field>
            <Field label="Estado *" flex="none">
              <input value={estado} onChange={e => setEstado(e.target.value)} style={{ ...inp, width: 80 }} />
            </Field>
            <Field label="Cidade *">
              <input value={cidade} onChange={e => setCidade(e.target.value)} style={inp} />
            </Field>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label="Bairro *">
              <input value={bairro} onChange={e => setBairro(e.target.value)} style={inp} />
            </Field>
            <Field label="Logradouro *">
              <input value={logradouro} onChange={e => setLogradouro(e.target.value)} style={inp} />
            </Field>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Field label="Número *" flex="none">
              <input value={numero} onChange={e => setNumero(e.target.value)} style={{ ...inp, width: 120 }} />
            </Field>
            <Field label="Complemento">
              <input value={complemento} onChange={e => setComplemento(e.target.value)} style={inp} />
            </Field>
            <Field label="Reside no município de Florianópolis?">
              <div style={{ position: 'relative' }}>
                <select value={resideFloripa} onChange={e => setResideFloripa(e.target.value)} style={{ ...inp, appearance: 'none', WebkitAppearance: 'none', paddingRight: 32, cursor: 'pointer' }}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
                <FAIcon icon="fa-regular fa-chevron-down" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: '#8a9ab5', pointerEvents: 'none' }} />
              </div>
            </Field>
          </div>
        </div>

        {/* ── Botão salvar ── */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 8 }}>
          <Button size="md" variant="primary" style={{ minWidth: 200 }}>Salvar e continuar</Button>
        </div>

      </div>
    </div>
  );
}

// ── Tela: Categoria de Serviços ───────────────────────────────────────────────
function CatServicos({ catLabel, catIcon, onNavigateDetalhe, onNavigateForm }: {
  catLabel: string;
  catIcon: string;
  onNavigateDetalhe: (service: typeof MOCK_SERVICOS_AV[0]) => void;
  onNavigateForm:    (service: typeof MOCK_SERVICOS_AV[0]) => void;
}) {
  const [search, setSearch] = useState('');

  const catServices = MOCK_SERVICOS_AV.filter(s => s.categoria === catLabel);
  const filtered    = search.trim()
    ? catServices.filter(s => s.servico.toLowerCase().includes(search.toLowerCase()))
    : catServices;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>

      {/* Cabeçalho da categoria */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 60, height: 60, background: '#dce6f5', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0px 2px 8px rgba(24,39,75,0.10)' }}>
          <i className={catIcon} style={{ fontSize: 30, color: '#0058db' }} />
        </div>
        <div>
          <h1 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#1a1a1a', margin: 0 }}>{catLabel}</h1>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: 14, color: '#7d7d7d', margin: '4px 0 0 0' }}>
            {filtered.length} serviço{filtered.length !== 1 ? 's' : ''} disponíve{filtered.length !== 1 ? 'is' : 'l'} nesta categoria
          </p>
        </div>
      </div>

      {/* Busca */}
      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #0058db', borderRadius: 8, overflow: 'hidden', background: 'white', height: 48 }}>
        <input
          value={search}
          placeholder="Buscar serviço nesta categoria..."
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', padding: '0 16px', fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#333', background: 'transparent' }}
        />
        <div style={{ width: 48, height: 48, background: '#0058db', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <FAIcon icon="fa-regular fa-magnifying-glass" style={{ fontSize: 18, color: 'white' }} />
        </div>
      </div>

      {/* Lista de serviços */}
      {filtered.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '48px 24px', background: 'white', borderRadius: 8, border: '1px solid #dde3ee' }}>
          <div style={{ width: 64, height: 64, background: '#edf2ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FAIcon icon="fa-regular fa-file-slash" style={{ fontSize: 24, color: '#0058db' }} />
          </div>
          <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#222' }}>Nenhum serviço encontrado</div>
          <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#7a8a9e' }}>Tente usar termos diferentes na busca</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map((svc, i) => (
            <div key={i}
              style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 10, padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0px 2px 8px rgba(24,39,75,0.07)', transition: 'box-shadow 0.15s, border-color 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 4px 16px rgba(24,39,75,0.13)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#b3c7e6'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 2px 8px rgba(24,39,75,0.07)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#dde3ee'; }}
            >
              {/* Ícone */}
              <div style={{ width: 48, height: 48, background: '#f0f4fb', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FAIcon icon="fa-regular fa-file-lines" style={{ fontSize: 22, color: '#0058db' }} />
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, color: '#222', marginBottom: 5 }}>{svc.servico}</div>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#7d7d7d' }}>
                    <strong style={{ color: '#565656' }}>Órgão:</strong> {svc.setor.split('/')[0]}
                  </span>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#7d7d7d' }}>
                    <strong style={{ color: '#565656' }}>Público:</strong> {svc.destino.join(', ')}
                  </span>
                </div>
              </div>

              {/* Ações */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => onNavigateDetalhe(svc)}
                  style={{ height: 36, padding: '0 16px', border: '1.5px solid #0058db', borderRadius: 6, background: 'white', color: '#0058db', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.12s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#edf2ff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
                >
                  Mais informações
                </button>
                <button onClick={() => onNavigateForm(svc)}
                  style={{ height: 36, padding: '0 16px', border: 'none', borderRadius: 6, background: '#0058db', color: 'white', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.12s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0046b5'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0058db'; }}
                >
                  Solicitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tela: Detalhe do Serviço ──────────────────────────────────────────────────
function ServicoDetalhe({ service, onNavigateForm }: {
  service: typeof MOCK_SERVICOS_AV[0];
  onNavigateForm: (service: typeof MOCK_SERVICOS_AV[0]) => void;
}) {
  // Informações genéricas que variam por categoria
  const descricoesPorCategoria: Record<string, string> = {
    'Impostos e taxas':                    'Serviço relacionado à emissão, consulta e pagamento de impostos e taxas municipais. Facilita o cumprimento das obrigações fiscais de forma digital, sem necessidade de comparecimento presencial.',
    'Alvarás, autorizações e licenças':    'Emissão e renovação de alvarás, autorizações e licenças municipais de forma eletrônica. Agilize a regularização da sua atividade ou obra com segurança e praticidade.',
    'Certidões, declarações e documentos': 'Solicite certidões, declarações e documentos oficiais emitidos pela Prefeitura Municipal. O processo é totalmente digital e os documentos possuem validade jurídica.',
    'Assistência social':                  'Acesso a serviços de assistência social e proteção social oferecidos pelo município. Atendimento humanizado voltado ao bem-estar e à inclusão social dos cidadãos.',
    'Obras e urbanismo':                   'Serviços relacionados a projetos, aprovações e fiscalização de obras no município. Regularize sua construção respeitando as normas urbanísticas vigentes.',
    'Meio ambiente':                       'Serviços ambientais para preservação e proteção do meio ambiente municipal. Contribua com a sustentabilidade e o equilíbrio ecológico de Florianópolis.',
    'Saúde':                               'Acesso a serviços de saúde pública municipal, incluindo agendamentos, vacinação e vigilância sanitária. Cuide da sua saúde com os serviços do município.',
    'Solicitações':                        'Registre solicitações de serviços municipais de forma prática e acompanhe o andamento em tempo real através da plataforma digital.',
    'Comércio e serviços':                 'Regularize e gerencie sua atividade comercial ou de prestação de serviços no município de Florianópolis de forma digital e segura.',
  };

  const desc = descricoesPorCategoria[service.categoria]
    ?? 'Solicite este serviço municipal de forma digital, com acompanhamento em tempo real do andamento do seu pedido através da plataforma FloripaOn.';

  const steps = [
    'Preencha o formulário de solicitação com seus dados pessoais',
    'Informe os detalhes específicos do serviço solicitado',
    'Anexe os documentos necessários conforme a lista indicada',
    'Envie a solicitação e aguarde análise pelo órgão responsável',
    'Acompanhe o status em "Meus processos" na plataforma',
  ];

  const docs = [
    'Documento de identificação com foto (RG, CNH ou passaporte)',
    'CPF (pode estar no documento de identificação)',
    'Comprovante de residência emitido nos últimos 3 meses',
    'Documentos específicos conforme o tipo de serviço',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>

      {/* Cabeçalho */}
      <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 10, padding: 28, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <span style={{ background: '#dce6f5', color: '#0058db', borderRadius: 100, padding: '3px 12px', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 12 }}>{service.categoria}</span>
          {service.destino.map(d => (
            <span key={d} style={{ background: '#f0f0f0', color: '#555', borderRadius: 100, padding: '3px 12px', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 12 }}>{d}</span>
          ))}
        </div>
        <h1 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 28, color: '#1a1a1a', margin: '0 0 8px 0' }}>{service.servico}</h1>
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#565656', margin: '0 0 20px 0', lineHeight: '22px' }}>
          {service.setor}
        </p>
        <button
          onClick={() => onNavigateForm(service)}
          style={{ height: 44, padding: '0 32px', border: 'none', borderRadius: 8, background: '#0058db', color: 'white', fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'background 0.12s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0046b5'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0058db'; }}
        >
          <FAIcon icon="fa-regular fa-paper-plane" style={{ fontSize: 15 }} />
          Solicitar serviço
        </button>
      </div>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

        {/* Coluna esquerda */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* O que é */}
          <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 10, padding: 24 }}>
            <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 17, color: '#353535', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FAIcon icon="fa-regular fa-circle-info" style={{ fontSize: 16, color: '#0058db' }} />
              O que é este serviço?
            </h2>
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#333', margin: 0, lineHeight: '23px' }}>{desc}</p>
          </div>

          {/* Como solicitar */}
          <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 10, padding: 24 }}>
            <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 17, color: '#353535', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FAIcon icon="fa-regular fa-list-check" style={{ fontSize: 16, color: '#0058db' }} />
              Como solicitar?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0058db', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 12, color: 'white' }}>{i + 1}</span>
                  </div>
                  <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#333', margin: 0, lineHeight: '22px', paddingTop: 3 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna direita */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Informações gerais */}
          <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 10, padding: 24 }}>
            <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#353535', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FAIcon icon="fa-regular fa-clock" style={{ fontSize: 15, color: '#0058db' }} />
              Informações
            </h2>
            {[
              { label: 'Prazo de atendimento', value: 'Até 30 dias úteis', icon: 'fa-regular fa-calendar' },
              { label: 'Custo',                value: 'Gratuito',          icon: 'fa-regular fa-circle-check' },
              { label: 'Órgão responsável',    value: service.setor.split('/')[0], icon: 'fa-regular fa-building' },
              { label: 'Setor',                value: service.setor.split('/').pop() ?? '', icon: 'fa-regular fa-sitemap' },
            ].map((info, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #f0f0f0' : 'none', alignItems: 'flex-start' }}>
                <FAIcon icon={info.icon} style={{ fontSize: 14, color: '#7d7d7d', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 11, color: '#7d7d7d', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>{info.label}</div>
                  <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#333' }}>{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Documentos necessários */}
          <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 10, padding: 24 }}>
            <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#353535', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FAIcon icon="fa-regular fa-paperclip" style={{ fontSize: 15, color: '#0058db' }} />
              Documentos necessários
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {docs.map((doc, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <FAIcon icon="fa-regular fa-file-check" style={{ fontSize: 14, color: '#0058db', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#333', lineHeight: '20px' }}>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA secundário */}
          <button
            onClick={() => onNavigateForm(service)}
            style={{ width: '100%', height: 44, border: '1.5px solid #0058db', borderRadius: 8, background: 'white', color: '#0058db', fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.12s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#edf2ff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
          >
            <FAIcon icon="fa-regular fa-paper-plane" style={{ fontSize: 14 }} />
            Solicitar serviço
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Tela: Formulário de Solicitação ───────────────────────────────────────────
function ServicoForm({ service }: { service: typeof MOCK_SERVICOS_AV[0] }) {
  const [step,          setStep]          = useState(1);
  const [nome,          setNome]          = useState('CRISTIANDERSON ALVES DE LIMA');
  const [cpf]                             = useState('043.792.234-00');
  const [email,         setEmail]         = useState('emaildoandersonalves@gmail.com');
  const [telefone,      setTelefone]      = useState('(86) 99968-8687');
  const [descricao,     setDescricao]     = useState('');
  const [urgencia,      setUrgencia]      = useState('Normal');
  const [submitted,     setSubmitted]     = useState(false);

  const totalSteps = 3;

  const inp: React.CSSProperties = {
    background: 'white', border: '1px solid #d5d5d5', borderRadius: 6, height: 44,
    padding: '0 12px', fontFamily: 'Open Sans, sans-serif', fontWeight: 400,
    fontSize: 14, color: '#333', width: '100%', boxSizing: 'border-box', outline: 'none',
    transition: 'border-color 0.15s',
  };
  const lbl: React.CSSProperties = {
    fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 11,
    color: '#8a9ab5', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 5, display: 'block',
  };

  if (submitted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '64px 24px', minHeight: 400 }}>
        <div style={{ width: 80, height: 80, background: '#e6f9f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FAIcon icon="fa-regular fa-circle-check" style={{ fontSize: 38, color: '#0f6b3e' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#222', marginBottom: 8 }}>Solicitação enviada!</div>
          <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 15, color: '#565656', lineHeight: '22px', maxWidth: 480 }}>
            Sua solicitação de <strong>{service.servico}</strong> foi recebida com sucesso. Você pode acompanhar o andamento em <strong>Meus processos</strong>.
          </div>
        </div>
        <div style={{ background: '#f5f7fb', border: '1px solid #dde3ee', borderRadius: 8, padding: '14px 24px', display: 'flex', gap: 8, alignItems: 'center' }}>
          <FAIcon icon="fa-regular fa-clock" style={{ fontSize: 15, color: '#0058db' }} />
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 13, color: '#565656' }}>Protocolo: <strong>SOLARBPM2026/{Math.floor(Math.random() * 900000 + 100000)}</strong></span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 48px 24px' }}>

      {/* Título */}
      <div>
        <h1 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#1a1a1a', margin: '0 0 4px 0' }}>
          Solicitar: {service.servico}
        </h1>
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#565656', margin: 0 }}>
          Preencha os campos abaixo para realizar sua solicitação de forma digital
        </p>
      </div>

      {/* Indicador de progresso */}
      <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 8, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 0 }}>
        {(['Dados pessoais', 'Detalhes', 'Documentos'] as const).map((label, i) => {
          const s = i + 1;
          const done   = step > s;
          const active = step === s;
          return (
            <Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: done ? '#0f6b3e' : active ? '#0058db' : '#ebebeb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                  {done
                    ? <FAIcon icon="fa-solid fa-check" style={{ fontSize: 13, color: 'white' }} />
                    : <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 13, color: active ? 'white' : '#a3a3a3' }}>{s}</span>
                  }
                </div>
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: active ? 700 : 400, fontSize: 13, color: active ? '#0058db' : done ? '#0f6b3e' : '#7d7d7d', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: done ? '#0f6b3e' : '#d5d5d5', margin: '0 10px', minWidth: 20, transition: 'background 0.2s' }} />}
            </Fragment>
          );
        })}
      </div>

      {/* Card do formulário */}
      <div style={{ background: 'white', border: '1px solid #dde3ee', borderRadius: 10, padding: 28, boxShadow: '0px 4px 12px rgba(24,39,75,0.10)' }}>

        {/* ── Step 1: Dados pessoais ── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 18, color: '#353535', margin: 0, paddingBottom: 12, borderBottom: '1px solid #ebebeb' }}>
              Dados do solicitante
            </h2>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 2 }}>
                <label style={lbl}>Nome completo *</label>
                <input value={nome} onChange={e => setNome(e.target.value)} style={inp} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>CPF *</label>
                <input value={cpf} readOnly style={{ ...inp, background: '#f4f6f9', color: '#8a9ab5', cursor: 'default' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={lbl}>E-mail *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={lbl}>Telefone *</label>
                <input value={telefone} onChange={e => setTelefone(e.target.value)} style={inp} />
              </div>
            </div>
            <div style={{ background: '#f0f6ff', border: '1px solid #b3cff0', borderRadius: 6, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <FAIcon icon="fa-regular fa-circle-info" style={{ fontSize: 14, color: '#0058db', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#365d8a', lineHeight: '18px' }}>
                Seus dados foram preenchidos automaticamente a partir do seu perfil. Verifique e corrija se necessário.
              </span>
            </div>
          </div>
        )}

        {/* ── Step 2: Detalhes ── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 18, color: '#353535', margin: 0, paddingBottom: 12, borderBottom: '1px solid #ebebeb' }}>
              Detalhes da solicitação
            </h2>
            <div>
              <label style={lbl}>Serviço solicitado *</label>
              <input value={service.servico} readOnly style={{ ...inp, background: '#f4f6f9', color: '#565656', cursor: 'default' }} />
            </div>
            <div>
              <label style={lbl}>Nível de urgência</label>
              <div style={{ display: 'flex', gap: 0, border: '1px solid #d5d5d5', borderRadius: 6, overflow: 'hidden' }}>
                {['Normal', 'Urgente', 'Muito urgente'].map((u, i) => {
                  const active = urgencia === u;
                  return (
                    <div key={u} onClick={() => setUrgencia(u)}
                      style={{ flex: 1, padding: '11px 0', textAlign: 'center', cursor: 'pointer', background: active ? '#0058db' : 'white', color: active ? 'white' : '#555', fontFamily: 'Open Sans, sans-serif', fontSize: 13, fontWeight: active ? 700 : 400, borderRight: i < 2 ? '1px solid #d5d5d5' : 'none', transition: 'all 0.12s', userSelect: 'none' }}>
                      {u}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <label style={lbl}>Descrição / observações</label>
              <textarea
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                placeholder="Descreva com detalhes sua solicitação, incluindo informações relevantes para análise..."
                style={{ ...inp, height: 130, padding: '10px 12px', resize: 'vertical', lineHeight: '21px' } as React.CSSProperties}
              />
            </div>
          </div>
        )}

        {/* ── Step 3: Documentos ── */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 18, color: '#353535', margin: 0, paddingBottom: 12, borderBottom: '1px solid #ebebeb' }}>
              Anexar documentos
            </h2>
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 14, color: '#565656', margin: 0 }}>
              Anexe os documentos necessários para a análise da sua solicitação. Formatos aceitos: PDF, JPG, PNG (máx. 10MB cada).
            </p>
            {[
              { label: 'Documento de identificação', required: true },
              { label: 'Comprovante de residência',  required: true },
              { label: 'Outros documentos',          required: false },
            ].map((doc, i) => (
              <div key={i}
                style={{ border: '2px dashed #d5d5d5', borderRadius: 8, padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, cursor: 'pointer', transition: 'border-color 0.12s, background 0.12s', background: '#fafbfc' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#0058db'; (e.currentTarget as HTMLDivElement).style.background = '#f0f6ff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#d5d5d5'; (e.currentTarget as HTMLDivElement).style.background = '#fafbfc'; }}
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, background: '#edf2ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FAIcon icon="fa-regular fa-file-arrow-up" style={{ fontSize: 22, color: '#0058db' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 14, color: '#333' }}>
                      {doc.label} {doc.required && <span style={{ color: '#b2132e' }}>*</span>}
                    </div>
                    <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, color: '#7d7d7d', marginTop: 2 }}>Clique para selecionar o arquivo</div>
                  </div>
                </div>
                <button
                  style={{ height: 34, padding: '0 16px', border: '1.5px solid #0058db', borderRadius: 6, background: 'white', color: '#0058db', fontFamily: 'Open Sans, sans-serif', fontWeight: 600, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
                  onClick={e => e.stopPropagation()}
                >
                  Selecionar
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Botões de navegação */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 28, paddingTop: 18, borderTop: '1px solid #ebebeb' }}>
          {step > 1 && (
            <Button size="md" variant="secondary" onClick={() => setStep(s => s - 1)}>
              <FAIcon icon="fa-regular fa-arrow-left" style={{ fontSize: 14, marginRight: 6 }} />
              Voltar
            </Button>
          )}
          {step < totalSteps ? (
            <Button size="md" variant="primary" onClick={() => setStep(s => s + 1)}>
              Próximo
              <FAIcon icon="fa-regular fa-arrow-right" style={{ fontSize: 14, marginLeft: 6 }} />
            </Button>
          ) : (
            <Button size="md" variant="primary" onClick={() => setSubmitted(true)}>
              Enviar solicitação
              <FAIcon icon="fa-regular fa-paper-plane" style={{ fontSize: 14, marginLeft: 6 }} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Tela: Home ────────────────────────────────────────────────────────────────
function HomePage({ onNavigateCat }: { onNavigateCat: (cat: { label: string; icon: string }) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: '16px 24px 48px 24px' }}>
      <div style={{ height: 300, overflow: 'hidden', flexShrink: 0, margin: '-16px -24px 0 -24px' }}>
        <img src={imgBannerFloripa} alt="Florianópolis" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
        <h1 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#333', textAlign: 'center', margin: 0 }}>Encontre o serviço que você precisa</h1>
        <SearchWithDropdown />
      </div>
      <div style={{ background: '#dce6f5', border: '1px solid #6393db', borderRadius: 8, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 6px 8px rgba(24,39,75,0.12), 0px 8px 16px rgba(24,39,75,0.08)' }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#333', lineHeight: '24px', textAlign: 'center' }}>
          Pague o seu IPTU com até 20% de desconto até o dia 30/04/2026
        </span>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <ServiceCard title="Serviços mais acessados" items={popularServices} />
        <ServiceCard title="Serviços em destaque"   items={featuredServices} />
      </div>
      <div style={{ background: 'white', border: '1px solid #d5d5d5', borderRadius: 8, padding: '24px 24px 48px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: '0px 6px 8px rgba(24,39,75,0.12), 0px 8px 16px rgba(24,39,75,0.08)' }}>
        <h2 style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#353535', lineHeight: 1.2, margin: 0 }}>Serviços por assunto</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 15 }}>
          {categories.map((cat, i) => <CategoryCard key={i} icon={cat.icon} label={cat.label} onClick={() => onNavigateCat({ label: cat.label, icon: cat.icon })} />)}
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function App() {
  const [page,            setPage]            = useState<Page>('home');
  const [expanded,        setExpanded]        = useState(false);
  const [showLogin,       setShowLogin]       = useState(false);
  const [isLoggedIn,      setIsLoggedIn]      = useState(false);
  const [lang,            setLang]            = useState<Lang>('pt');
  const [darkMode,        setDarkMode]        = useState(false);
  const [highContrast,    setHighContrast]    = useState(false);
  const [selectedCat,     setSelectedCat]     = useState<{ label: string; icon: string } | null>(null);
  const [selectedService, setSelectedService] = useState<typeof MOCK_SERVICOS_AV[0] | null>(null);

  function handleLogin()  { setIsLoggedIn(true);  setShowLogin(false); }
  function handleLogout() { setIsLoggedIn(false); setPage('home'); }

  useEffect(() => {
    document.documentElement.setAttribute('data-dark', darkMode ? 'true' : 'false');
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', highContrast ? 'true' : 'false');
  }, [highContrast]);

  return (
    <LangContext.Provider value={lang}>
      <div style={{ background: '#f4f6f9', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
        <Header
          onToggle={() => setExpanded(e => !e)}
          onLogin={() => setShowLogin(true)}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
          highContrast={highContrast}
          onToggleContrast={() => setHighContrast(c => !c)}
          lang={lang}
          onSetLang={setLang}
        />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <SideMenu
            activePage={page}
            onNavigate={setPage}
            expanded={expanded}
            onLogin={() => setShowLogin(true)}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
            <Breadcrumb page={page} onNavigate={setPage} selectedCat={selectedCat} selectedService={selectedService} />

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {page === 'home'       && <HomePage onNavigateCat={cat => { setSelectedCat(cat); setPage('cat-servicos'); }} />}
              {page === 'consulta'   && <ConsultaProcessos onNavigateProcesso={() => setPage('processo')} />}
              {page === 'processo'   && <ProcessoDetalhe />}
              {page === 'documentos' && <ConsultaDocumentos />}
              {page === 'meusdados'  && <MeusDados />}
              {page === 'solicitacao' && (
                <SolicitacaoServicos
                  onNavigateCat={cat => { setSelectedCat(cat); setPage('cat-servicos'); }}
                  onNavigateDetalhe={svc => { setSelectedService(svc); setPage('servico-detalhe'); }}
                />
              )}
              {page === 'cat-servicos' && selectedCat && (
                <CatServicos
                  catLabel={selectedCat.label}
                  catIcon={selectedCat.icon}
                  onNavigateDetalhe={svc => { setSelectedService(svc); setPage('servico-detalhe'); }}
                  onNavigateForm={svc => { setSelectedService(svc); setPage('servico-form'); }}
                />
              )}
              {page === 'servico-detalhe' && selectedService && (
                <ServicoDetalhe
                  service={selectedService}
                  onNavigateForm={svc => { setSelectedService(svc); setPage('servico-form'); }}
                />
              )}
              {page === 'servico-form' && selectedService && (
                <ServicoForm service={selectedService} />
              )}
            </div>
          </div>
        </div>
      </div>
    </LangContext.Provider>
  );
}
