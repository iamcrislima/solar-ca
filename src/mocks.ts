import type {
  ConsultaRecente, ProcessoStatus, MeuProcesso,
  Pendencia, PendenciaTipo, ProcessoLiberado, Servico, FormField
} from './types';

//  Imagens 
export const imgBannerFloripa = '/floripa.jpg';
export const imgFloripa       = '/Floripa 02.jpg';

//  Usuário logado (mock) 
export const MOCK_USER = { nome: 'Cris Lima', cpf: '012.345.678-90', initials: 'CL' };

//  Layout sidebar 
export const SIDEBAR_COLLAPSED = 48;
export const SIDEBAR_EXPANDED  = 248;

//  Serviços municipais para o dropdown de busca
export const ALL_SERVICES: Record<'pt' | 'en' | 'es', string[]> = {
  pt: [
    '2ª Via de IPTU',
    'Agendamento de atendimento presencial',
    'Alvará de funcionamento',
    'Alvará de obra',
    'Aprovação de projetos arquitetônicos',
    'Atestado de residência',
    'Baixa de inscrição municipal',
    'Boletim de ocorrência online',
    'Cadastro de MEI',
    'Cadastro único (Cadanico)',
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
  ],
  en: [
    'Property tax duplicate',
    'In-person appointment scheduling',
    'Business operating permit',
    'Construction permit',
    'Architectural project approval',
    'Proof of residence certificate',
    'Municipal registration cancellation',
    'Online police report',
    'Micro-entrepreneur (MEI) registration',
    'Social benefits registration (CadÚnico)',
    'Senior citizen card',
    'Digital work card',
    'Municipal debt certificate',
    'Birth certificate',
    'Property ownership certificate',
    'Debt clearance certificate (CND)',
    'Administrative process inquiry',
    'Property tax debt inquiry',
    'Judicial process inquiry',
    'Consumer protection (PROCON)',
    'Property tax payment slip',
    'Electronic invoice issuance',
    'Speak up, citizen (Ombudsman)',
    'Occupancy certificate',
    'Services tax (ISS)',
    'Public examination registration',
    'Municipal school enrollment',
    'Property tax exemption for seniors',
    'Property tax exemption for persons with disabilities',
    'Environmental license',
    'Health permit',
    'Municipal school enrollment',
    'Electronic service invoice',
    'Municipal debt installment plan',
    'Public information request (FOIA)',
    'Property regularization',
    'Permit renewal',
    'Urban cleaning service',
    'Tree trimming request',
    'Pothole repair request',
    'Waste collection fee',
    'Property ownership transfer',
    'Municipal vaccination',
    'Health surveillance',
    'Property inspection',
  ],
  es: [
    'Duplicado del IPTU',
    'Agenda de atención presencial',
    'Permiso de funcionamiento',
    'Permiso de obra',
    'Aprobación de proyectos arquitectónicos',
    'Certificado de residencia',
    'Baja de inscripción municipal',
    'Denuncia policial en línea',
    'Registro de microemprendedor (MEI)',
    'Registro único de beneficios sociales',
    'Tarjeta del adulto mayor',
    'Libreta de trabajo digital',
    'Certificado de deudas municipales',
    'Acta de nacimiento',
    'Certificado de propiedad inmobiliaria',
    'Certificado de libre deuda (CND)',
    'Consulta de proceso administrativo',
    'Consulta de deudas del IPTU',
    'Consulta de procesos judiciales',
    'Defensa del consumidor (PROCON)',
    'Emisión de recibo del IPTU',
    'Emisión de factura electrónica',
    'Hable, ciudadano (Defensoría)',
    'Certificado de habitabilidad',
    'Impuesto sobre servicios (ISS)',
    'Inscripción a concurso público',
    'Inscripción escolar municipal',
    'Exención del IPTU para adultos mayores',
    'Exención del IPTU para personas con discapacidad',
    'Licencia ambiental',
    'Licencia sanitaria',
    'Matrícula escolar municipal',
    'Factura electrónica de servicio',
    'Plan de pago de deudas municipales',
    'Solicitud de información pública',
    'Regularización de inmueble',
    'Renovación de permiso',
    'Servicio de limpieza urbana',
    'Solicitud de poda de árboles',
    'Solicitud de reparación de baches',
    'Tasa de recolección de basura',
    'Transferencia de titularidad de inmueble',
    'Vacunación municipal',
    'Vigilancia sanitaria',
    'Inspección de inmueble',
  ],
};

//  Categorias de serviço 
export const categories = [
  { icon: 'fa-duotone fa-file-signature',    label: 'Alvarás, autorizações e licenças',      labelEn: 'Permits, authorizations and licenses',       labelEs: 'Permisos, autorizaciones y licencias' },
  { icon: 'fa-duotone fa-hand-holding-heart',label: 'Assistência social',                    labelEn: 'Social assistance',                          labelEs: 'Asistencia social' },
  { icon: 'fa-duotone fa-circle-xmark',      label: 'Baixas e cancelamentos',                labelEn: 'Cancellations',                              labelEs: 'Bajas y cancelaciones' },
  { icon: 'fa-duotone fa-file-lines',        label: 'Certidões, declarações e documentos',  labelEn: 'Certificates, declarations and documents',   labelEs: 'Certificados, declaraciones y documentos' },
  { icon: 'fa-duotone fa-store',             label: 'Comércio e serviços',                  labelEn: 'Commerce and services',                      labelEs: 'Comercio y servicios' },
  { icon: 'fa-duotone fa-money-bill',        label: 'Devoluções, compensações e prescrições',labelEn: 'Refunds, compensations and claims',           labelEs: 'Devoluciones, compensaciones y prescripciones' },
  { icon: 'fa-duotone fa-bullhorn',          label: 'Editais',                              labelEn: 'Public notices',                             labelEs: 'Edictos' },
  { icon: 'fa-duotone fa-landmark',          label: 'Impostos e taxas',                     labelEn: 'Taxes and fees',                             labelEs: 'Impuestos y tasas' },
  { icon: 'fa-duotone fa-shield-halved',     label: 'Isenções e imunidade',                 labelEn: 'Exemptions and immunity',                    labelEs: 'Exenciones e inmunidad' },
  { icon: 'fa-duotone fa-tree',              label: 'Meio ambiente',                        labelEn: 'Environment',                                labelEs: 'Medio ambiente' },
  { icon: 'fa-duotone fa-paint-roller',      label: 'Obras e urbanismo',                    labelEn: 'Construction and urban planning',             labelEs: 'Obras y urbanismo' },
  { icon: 'fa-duotone fa-folder-plus',       label: 'Processos externos',                   labelEn: 'External processes',                         labelEs: 'Procesos externos' },
  { icon: 'fa-duotone fa-user-gear',         label: 'Processo funcional',                   labelEn: 'Functional process',                         labelEs: 'Proceso funcional' },
  { icon: 'fa-duotone fa-comments',          label: 'Reclamações e denúncias',              labelEn: 'Complaints and reports',                     labelEs: 'Reclamaciones y denuncias' },
  { icon: 'fa-duotone fa-hospital',          label: 'Saúde',                                labelEn: 'Health',                                     labelEs: 'Salud' },
  { icon: 'fa-duotone fa-list-ol',           label: 'Solicitações',                         labelEn: 'Requests',                                   labelEs: 'Solicitudes' },
  { icon: 'fa-duotone fa-arrows-rotate',     label: 'Substituições, alterações e exclusões',labelEn: 'Replacements, changes and deletions',         labelEs: 'Sustituciones, alteraciones y exclusiones' },
  { icon: 'fa-duotone fa-cars',              label: 'Transporte e trânsito',                labelEn: 'Transport and transit',                      labelEs: 'Transporte y tránsito' },
];

export const popularServices = {
  pt: ['2ª Via de IPTU', 'Consulta de processo', 'Alvará de funcionamento', 'Nota fiscal de serviço eletrônica', 'Agendamento de atendimento presencial'],
  en: ['2nd copy of IPTU', 'Process inquiry', 'Business permit', 'Electronic service invoice', 'In-person appointment scheduling'],
  es: ['2ª Copia del IPTU', 'Consulta de proceso', 'Permiso de funcionamiento', 'Factura electrónica de servicio', 'Agenda de atención presencial'],
};

export const featuredServices = {
  pt: ['Aprovação de projetos', 'Carteira do idoso', 'Fala, cidadão', 'Licença ambiental', 'Matrícula escolar municipal'],
  en: ['Project approval', 'Senior citizen card', 'Speak up, citizen', 'Environmental permit', 'Municipal school enrollment'],
  es: ['Aprobación de proyectos', 'Tarjeta del adulto mayor', 'Hable, ciudadano', 'Licencia ambiental', 'Matrícula escolar municipal'],
};

//  Consultas recentes 
export const consultasRecentes: ConsultaRecente[] = [
  { numero: 'PMF2026/000338', data: '31/03/2026 às 08h33', descricao: 'Solicitação de Cartão nacional do Idoso', status: 'Concluído' as ProcessoStatus },
  { numero: 'PMF2026/000452', data: '25/03/2026 às 14h11', descricao: 'Solicitação de férias (Simples)',         status: 'Em Andamento' as ProcessoStatus },
  { numero: 'PMF2026/000379', data: '19/03/2026 às 19h34', descricao: 'Solicitação de férias (Simples)',         status: 'Em Andamento' as ProcessoStatus },
  { numero: 'PMF2026/000125', data: '10/03/2026 às 08h41', descricao: 'Ligação de Água e ramal',                status: 'Pendente' as ProcessoStatus },
  { numero: 'PMF2026/000433', data: '07/03/2026 às 19h18', descricao: 'Mobilidade Urbana',                      status: 'Concluído' as ProcessoStatus },
];

//  Mock: processos do usuário 
export const MOCK_MEUS_PROCESSOS: MeuProcesso[] = [
  { numero: 'PMF2026/000418', titulo: 'Solicitação de Cartão Nacional do Idoso', orgao: 'SEMAS — Secretaria Municipal de Assistência Social', dataAbertura: '05/04/2026', atualizadoEm: '18/04/2026', status: 'Em Andamento', pendencias: 1 },
  { numero: 'PMF2026/000392', titulo: 'Solicitação de IPTU  isenção', orgao: 'SMF — Secretaria Municipal da Fazenda', dataAbertura: '02/04/2026', atualizadoEm: '15/04/2026', status: 'Em Andamento', pendencias: 2 },
  { numero: 'PMF2026/000367', titulo: 'Ligação de Água e Ramal', orgao: 'SEINFRA — Secretaria Municipal de Infraestrutura', dataAbertura: '28/03/2026', atualizadoEm: '14/04/2026', status: 'Em Andamento', pendencias: 0 },
  { numero: 'PMF2026/000341', titulo: 'Matrícula Escolar Municipal', orgao: 'SME — Secretaria Municipal de Educação', dataAbertura: '20/03/2026', atualizadoEm: '12/04/2026', status: 'Concluído', pendencias: 0 },
  { numero: 'PMF2026/000298', titulo: 'Licença Ambiental  obra residencial', orgao: 'SMMA — Secretaria Municipal do Meio Ambiente', dataAbertura: '15/03/2026', atualizadoEm: '10/04/2026', status: 'Em Andamento', pendencias: 1 },
  { numero: 'PMF2026/000275', titulo: 'Aprovação de projeto arquitetônico', orgao: 'SMDU — Secretaria Municipal de Desenvolvimento Urbano', dataAbertura: '10/03/2026', atualizadoEm: '08/04/2026', status: 'Em Andamento', pendencias: 0 },
  { numero: 'PMF2026/000244', titulo: 'Fala, cidadão  reclamação iluminação', orgao: 'OUV — Ouvidoria Municipal', dataAbertura: '05/03/2026', atualizadoEm: '06/04/2026', status: 'Concluído', pendencias: 0 },
  { numero: 'PMF2026/000221', titulo: 'Mobilidade Urbana  passe livre estudantil', orgao: 'SMM — Secretaria Municipal de Mobilidade', dataAbertura: '02/03/2026', atualizadoEm: '02/04/2026', status: 'Em Andamento', pendencias: 0 },
  { numero: 'PMF2026/000198', titulo: 'Solicitação de poda de árvore', orgao: 'SMMA — Secretaria Municipal do Meio Ambiente', dataAbertura: '25/02/2026', atualizadoEm: '28/03/2026', status: 'Concluído', pendencias: 0 },
  { numero: 'PMF2026/000174', titulo: 'Vistoria de habite-se', orgao: 'SMDU — Secretaria Municipal de Desenvolvimento Urbano', dataAbertura: '20/02/2026', atualizadoEm: '22/03/2026', status: 'Concluído', pendencias: 0 },
  { numero: 'PMF2026/000152', titulo: 'Retificação de área  imóvel urbano', orgao: 'SMDU — Secretaria Municipal de Desenvolvimento Urbano', dataAbertura: '15/02/2026', atualizadoEm: '18/03/2026', status: 'Em Andamento', pendencias: 0 },
  { numero: 'PMF2026/000128', titulo: 'Alvará de construção', orgao: 'SMDU — Secretaria Municipal de Desenvolvimento Urbano', dataAbertura: '10/02/2026', atualizadoEm: '14/03/2026', status: 'Em Andamento', pendencias: 3 },
];

//  Mock: pendências do usuário 
export function pendenciaTipoKey(tipo: PendenciaTipo): 'tipoAssinatura' | 'tipoVerificar' | 'tipoComunique' | 'tipoAnalise' | 'tipoComplementar' {
  switch (tipo) {
    case 'Assinatura de documentos': return 'tipoAssinatura';
    case 'Verificar informações':    return 'tipoVerificar';
    case 'Comunique-se':             return 'tipoComunique';
    case 'Análise de documentos':    return 'tipoAnalise';
    case 'Complementar dados':       return 'tipoComplementar';
  }
}

export const MOCK_PENDENCIAS: Pendencia[] = [
  { id: 'p1', tipo: 'Verificar informações',    criadaEm: '15/04/2026', prazo: '22/04/2026', diasRestantes: 2,    status: 'Aberta',      processo: 'PMF2026/000418', interessado: 'João da Silva Santos', titulo: 'Verificar informações solicitadas sobre renda', solicitante: 'SEMAS — Secretaria Municipal de Assistência Social' },
  { id: 'p2', tipo: 'Assinatura de documentos', criadaEm: '14/04/2026', prazo: '21/04/2026', diasRestantes: 1,    status: 'Aberta',      processo: 'PMF2026/000392', interessado: 'Empresa de Transportes', titulo: 'Assinatura de contrato de prestação', solicitante: 'SMF — Secretaria Municipal da Fazenda' },
  { id: 'p3', tipo: 'Comunique-se',             criadaEm: '12/04/2026', prazo: '19/04/2026', diasRestantes: -1,   status: 'Aberta',      processo: 'PMF2026/000367', interessado: 'João da Silva Santos', titulo: 'Responder questionamento sobre documentação', solicitante: 'SEINFRA — Secretaria Municipal de Infraestrutura' },
  { id: 'p4', tipo: 'Assinatura de documentos', criadaEm: '11/04/2026', prazo: '25/04/2026', diasRestantes: 5,    status: 'Aberta',      processo: 'PMF2026/000341', interessado: 'Maria Oliveira Costa',    titulo: 'Assinatura de declaração de residência', solicitante: 'SME — Secretaria Municipal de Educação' },
  { id: 'p5', tipo: 'Complementar dados',       criadaEm: '10/04/2026', prazo: null,         diasRestantes: null, status: 'Aberta',      processo: 'PMF2026/000298', interessado: 'João da Silva Santos', titulo: 'Anexar comprovante de endereço atualizado', solicitante: 'SMMA — Secretaria Municipal do Meio Ambiente' },
  { id: 'p6', tipo: 'Análise de documentos',    criadaEm: '08/04/2026', prazo: '28/04/2026', diasRestantes: 8,    status: 'Aberta',      processo: 'PMF2026/000275', interessado: 'João da Silva Santos', titulo: 'Analisar parecer técnico da vistoria', solicitante: 'SMDU — Secretaria Municipal de Desenvolvimento Urbano' },
  { id: 'p7', tipo: 'Assinatura de documentos', criadaEm: '05/04/2026', prazo: '12/04/2026', diasRestantes: -8,   status: 'Aberta',      processo: 'PMF2026/000244', interessado: 'João da Silva Santos', titulo: 'Assinatura de termo de compromisso', solicitante: 'OUV — Ouvidoria Municipal' },
  { id: 'p8', tipo: 'Comunique-se',             criadaEm: '02/04/2026', prazo: '09/04/2026', diasRestantes: -11,  status: 'Finalizada',  processo: 'PMF2026/000221', interessado: 'João da Silva Santos', titulo: 'Responder sobre histórico escolar', solicitante: 'SMM — Secretaria Municipal de Mobilidade' },
  { id: 'p9', tipo: 'Verificar informações',    criadaEm: '28/03/2026', prazo: '04/04/2026', diasRestantes: -16,  status: 'Finalizada',  processo: 'PMF2026/000198', interessado: 'João da Silva Santos', titulo: 'Verificar dados cadastrais', solicitante: 'SMMA — Secretaria Municipal do Meio Ambiente' },
];

// Ícone e cor para cada tipo de pendência
export const PENDENCIA_ICON: Record<PendenciaTipo, { icon: string; color: string; bg: string }> = {
  'Assinatura de documentos': { icon: 'fa-regular fa-signature',             color: 'var(--primary-pure)', bg: 'var(--primary-bg-hover)' },
  'Verificar informações':    { icon: 'fa-regular fa-magnifying-glass',      color: 'var(--warning-color)', bg: 'var(--warning-bg)' },
  'Comunique-se':             { icon: 'fa-regular fa-comment-dots',          color: 'var(--pendencia-comunique-color)', bg: 'var(--pendencia-comunique-bg)' },
  'Análise de documentos':    { icon: 'fa-regular fa-file-magnifying-glass', color: 'var(--success-color)', bg: 'var(--success-bg)' },
  'Complementar dados':       { icon: 'fa-regular fa-file-arrow-up',         color: 'var(--error-color)', bg: 'var(--error-bg)' },
};

//  Mock: processos liberados 
export const MOCK_LIBERADOS: ProcessoLiberado[] = [
  { id: 'l1', numero: 'PMF2026/000848', interessado: 'João da Silva Santos',  cpf: '098.765.432-10', liberadoEm: '29/03/2026', terminaEm: '29/04/2026', ativo: true,  anexos: 3, orgao: 'SAUDE - Secretaria da Saúde' },
  { id: 'l2', numero: 'PMF2026/000721', interessado: 'Maria Oliveira Costa',   cpf: '123.456.789-00', liberadoEm: '15/03/2026', terminaEm: '15/04/2026', ativo: true,  anexos: 1, orgao: 'SEFAZ - Secretaria da Fazenda' },
  { id: 'l3', numero: 'PMF2025/009812', interessado: 'João da Silva Santos',  cpf: '098.765.432-10', liberadoEm: '10/10/2025', terminaEm: '10/11/2025', ativo: false, anexos: 5, orgao: 'IPUF - Instituto de Planejamento Urbano' },
  { id: 'l4', numero: 'PMF2025/008234', interessado: 'Cris Lima',             cpf: '012.345.678-90', liberadoEm: '22/08/2025', terminaEm: '22/09/2025', ativo: false, anexos: 2, orgao: 'SMC - Secretaria de Mobilidade' },
  { id: 'l5', numero: 'PMF2025/007109', interessado: 'João da Silva Santos',  cpf: '098.765.432-10', liberadoEm: '12/07/2025', terminaEm: '12/08/2025', ativo: false, anexos: 4, orgao: 'SMDU - Desenvolvimento Urbano' },
  { id: 'l6', numero: 'PMF2025/006055', interessado: 'Cris Lima',             cpf: '012.345.678-90', liberadoEm: '03/06/2025', terminaEm: '03/07/2025', ativo: false, anexos: 1, orgao: 'SAUDE - Secretaria da Saúde' },
];

// Nomes mock de arquivos por slot
export const MOCK_NOMES_ANEXOS = [
  'Certidão de regularidade fiscal.pdf',
  'Alvará de funcionamento 2025.pdf',
  'Memorial descritivo do processo.pdf',
  'Declaração de ciência dos termos.pdf',
  'Planta baixa do imóvel.pdf',
];

//  Mock: arquivamentos 
export const MOCK_ARQUIVAMENTOS = [
  {
    vol: 1,
    tarefa: 'SAUDE - Secretaria da Saúde',
    arquivadoEm: '08/09/2025',
    motivo: {
      tipo: 'Conclusão de fluxo',
      responsavel: 'Ana Cristina Souza',
      unidade: 'SAUDE  Secretaria da Saúde',
      descricao: 'Processo concluído com êxito após análise completa da documentação pela unidade responsável. Todas as etapas do fluxo foram cumpridas dentro do prazo estabelecido pela legislação municipal.\n\nO processo foi encaminhado para arquivamento definitivo conforme determinação da unidade SAUDE  Secretaria da Saúde, em conformidade com a Instrução Normativa nº 014/2025.',
    },
    reabertoEm: '02/10/2025',
    motivoReab: 'Complementação documental solicitada pelo requerente',
  },
  {
    vol: 2,
    tarefa: 'DIGITAL - Secretaria de Inovação',
    arquivadoEm: '12/10/2025',
    motivo: {
      tipo: 'Arquivamento automático',
      responsavel: 'Sistema Solar BPM',
      unidade: 'DIGITAL  Secretaria de Inovação',
      descricao: 'Arquivamento automático ao finalizar o fluxo de análise de sustentabilidade. O processo atingiu o estado final sem pendências em aberto.\n\nGerado automaticamente pelo sistema Solar BPM após confirmação de todas as assinaturas digitais e validação dos critérios ambientais exigidos pela legislação vigente.',
    },
    reabertoEm: '',
    motivoReab: '',
  },
];

//  Mock: serviços avançados 
export const MOCK_SERVICOS_AV: Servico[] = [
  { servico: '2ª Via de IPTU',                         categoria: 'Impostos e taxas',                    setor: 'SMF/SUBRT/CCC/Departamento de Cadastro Imobiliário', destino: ['Cidadão', 'Empresa'] },
  { servico: 'Agendamento de atendimento presencial',  categoria: 'Solicitações',                         setor: 'SMA/SGP/GAC/Central de Atendimento',                 destino: ['Cidadão', 'Empresa', 'Visitante'] },
  { servico: 'Alvará de funcionamento',                categoria: 'Alvarás, autorizações e licenças',     setor: 'SMPHDU/SDU/DLAE/Gerência de Alvarás',               destino: ['Empresa'] },
  { servico: 'Alvará de obra',                         categoria: 'Alvarás, autorizações e licenças',    setor: 'SMPHDU/SDU/DLAE/Plano Diretor',                     destino: ['Cidadão', 'Empresa'],
    detalhe: {
      modo: 'campos',
      unidadePath: 'SDU / DLAE / Plano Diretor',
      descricaoResumida: '<p>O <strong>Alvará de Obra</strong> autoriza a execução de obras de construção, reforma ou ampliação em imóveis no município de Florianópolis, garantindo que o projeto atenda às normas urbanísticas e de segurança vigentes.</p>',
      descricaoDetalhada: '<p>A emissão do alvará é obrigatória antes do início de qualquer obra. O documento vincula-se ao projeto arquitetônico aprovado e possui prazo de validade conforme o porte da obra.</p><ul><li>Construções novas</li><li>Reformas com alteração de área</li><li>Ampliações e demolições</li></ul>',
      requisitos: '<ul><li>Imóvel regularizado junto ao cadastro imobiliário municipal</li><li>Projeto arquitetônico aprovado</li><li>Responsável técnico com ART/RRT ativa</li></ul>',
      comoSolicitar: '<ol><li>Preencha o formulário de solicitação com os dados do imóvel.</li><li>Anexe o projeto aprovado e a ART/RRT.</li><li>Acompanhe a análise em “Meus processos”.</li></ol>',
      infoTaxa: '<p>A taxa é calculada com base na área construída, conforme a tabela vigente do Código Tributário Municipal. O boleto é gerado após a análise inicial do pedido.</p>',
      documentosSolicitar: [
        { nome: 'Requerimento de alvará de obra', descricao: 'Formulário padrão preenchido e assinado', arquivoModelo: 'modelo_requerimento_alvara.pdf' },
        { nome: 'ART/RRT do responsável técnico', descricao: 'Anotação/registro de responsabilidade técnica' },
        { nome: 'Projeto arquitetônico aprovado', descricao: 'Cópia do projeto com carimbo de aprovação' },
      ],
      linksRelacionados: [
        { label: 'Código de Obras de Florianópolis', url: 'https://www.pmf.sc.gov.br/' },
        { label: 'Consulta de viabilidade construtiva', url: 'https://www.pmf.sc.gov.br/' },
      ],
      documentosDownload: [
        { nome: 'Cartilha do solicitante — Obras', arquivoModelo: 'cartilha_obras.pdf' },
        { nome: 'Tabela de taxas 2026', arquivoModelo: 'tabela_taxas_2026.pdf' },
      ],
      fluxo: { temFluxo: true, diagrama: true, diagramaUrl: 'https://exemplo.gov.br/fluxo-diagrama', documentacaoArquivo: 'documentacao_fluxo_alvara_obra.pdf' },
    } },
  { servico: 'Aprovação de projetos arquitetônicos',   categoria: 'Obras e urbanismo',                   setor: 'SMPHDU/SDU/DIPU/Projetos',                          destino: ['Empresa', 'Visitante'] },
  { servico: 'Atestado de residência',                 categoria: 'Certidões, declarações e documentos', setor: 'SMA/SGP/GAC/Protocolo',                             destino: ['Cidadão'],
    // Teste "Por campos" com apenas ALGUNS campos preenchidos (Descrição detalhada,
    // Conteúdo dependente e Informações sobre a taxa ficam VAZIOS → não geram seção).
    detalhe: {
      modo: 'campos',
      unidadePath: 'SGP / GAC / Protocolo',
      descricaoResumida: '<p>O <strong>Atestado de Residência</strong> comprova o endereço de domicílio do cidadão no município, para fins cadastrais e de acesso a serviços públicos.</p>',
      requisitos: '<ul><li>Ser residente no município de Florianópolis</li><li>Apresentar documento de identificação com foto</li></ul>',
      comoSolicitar: '<ol><li>Preencha o formulário com seus dados.</li><li>Anexe um comprovante de endereço recente.</li><li>Acompanhe a emissão em <a href="https://exemplo.gov.br/meus-processos">Meus processos</a>.</li></ol>',
      documentosSolicitar: [
        { nome: 'Comprovante de endereço', descricao: 'Emitido nos últimos 90 dias', arquivoModelo: 'modelo_declaracao_residencia.pdf' },
      ],
    } },
  { servico: 'Baixa de inscrição municipal',           categoria: 'Baixas e cancelamentos',              setor: 'SMF/SUBRT/CCC/Cadastro Municipal',                  destino: ['Empresa'] },
  { servico: 'Cadastro de MEI',                        categoria: 'Comércio e serviços',                 setor: 'SMF/SUBRT/CCC/Departamento de Cadastro de Pessoas', destino: ['Cidadão', 'Empresa'] },
  { servico: 'Carteira do idoso',                      categoria: 'Assistência social',                  setor: 'SMDS/Coordenadoria do Idoso',                       destino: ['Cidadão'],
    // Teste "Agrupado": conteúdo livre em HTML num único campo "Descrição".
    detalhe: {
      modo: 'agrupamento',
      unidadePath: 'Coordenadoria do Idoso',
      descricao: '<p>A <strong>Carteira do Idoso</strong> garante à pessoa idosa o acesso a benefícios como gratuidade ou desconto em transportes intermunicipais, conforme o Estatuto do Idoso.</p><p><b>Quem pode solicitar:</b></p><ul><li>Pessoas com 60 anos ou mais</li><li>Renda de até 2 salários mínimos</li></ul><p>Mais informações no <a href="https://exemplo.gov.br/carteira-idoso">portal da Assistência Social</a>.</p>',
    } },
  { servico: 'Certidão de débitos municipais',         categoria: 'Certidões, declarações e documentos', setor: 'SMF/SUBRT/CCC/Certidões',                           destino: ['Cidadão', 'Empresa', 'Visitante'] },
  { servico: 'Certidão negativa de débitos (CND)',     categoria: 'Certidões, declarações e documentos', setor: 'SMF/SUBRT/CCC/Certidões',                           destino: ['Cidadão', 'Empresa'], opcaoAbertura: 'terceiro', linkExterno: 'https://www.pmf.sc.gov.br/servicos/' },
  { servico: 'Consulta de processo administrativo',    categoria: 'Processos externos',                  setor: 'SMA/SGP/GAC/Protocolo',                             destino: ['Cidadão', 'Empresa', 'Visitante'], opcaoAbertura: 'terceiro', linkExterno: 'https://exemplo.gov.br/consulta' },
  { servico: 'Emissão de boleto de IPTU',              categoria: 'Impostos e taxas',                    setor: 'SMF/SUBRT/CCC/Departamento de Cadastro Imobiliário', destino: ['Cidadão', 'Empresa'], opcaoAbertura: 'terceiro', linkExterno: 'https://www.pmf.sc.gov.br/servicos/' },
  { servico: 'Fala, cidadão (Ouvidoria)',              categoria: 'Reclamações e denúncias',             setor: 'SMA/SGP/GAC/Ouvidoria',                             destino: ['Cidadão', 'Visitante'] },
  { servico: 'Habite-se',                              categoria: 'Obras e urbanismo',                   setor: 'SMPHDU/SDU/DLAE/Vistoria',                          destino: ['Cidadão', 'Empresa'] },
  { servico: 'Isenção de IPTU para idosos',            categoria: 'Isenções e imunidade',                setor: 'SMF/SUBRT/CCC/Isenções',                            destino: ['Cidadão'] },
  { servico: 'Licença ambiental',                      categoria: 'Meio ambiente',                       setor: 'FLORIPAMANHÒ/Licenciamento Ambiental',              destino: ['Empresa', 'Visitante'] },
  { servico: 'Licença sanitária',                      categoria: 'Alvarás, autorizações e licenças',    setor: 'SMS/Vigilância Sanitária',                          destino: ['Empresa'] },
  { servico: 'Matrícula escolar municipal',            categoria: 'Solicitações',                        setor: 'SME/Coordenadoria de Ensino Fundamental',           destino: ['Cidadão'] },
  { servico: 'Parcelamento de débitos municipais',     categoria: 'Devoluções, compensações e prescrições', setor: 'SMF/SUBRT/CCC/Parcelamento',                    destino: ['Cidadão', 'Empresa'] },
  { servico: 'Pedido de informação (LAI)',              categoria: 'Certidões, declarações e documentos', setor: 'SMA/SGP/GAC/Transparência',                        destino: ['Cidadão', 'Empresa', 'Visitante'] },
  { servico: 'Renovação de alvará',                    categoria: 'Alvarás, autorizações e licenças',    setor: 'SMPHDU/SDU/DLAE/Gerência de Alvarás',              destino: ['Empresa'],
    detalhe: {
      modo: 'campos',
      unidadePath: 'SDU / DLAE / Gerência de Alvarás',
      descricaoResumida: '<p>A <strong>Renovação de Alvará</strong> prorroga a validade do alvará de funcionamento do estabelecimento, mantendo a atividade regularizada perante o município.</p>',
      comoSolicitar: '<ol><li>Confirme os dados do estabelecimento.</li><li>Anexe a documentação atualizada.</li><li>Acompanhe a análise em “Meus processos”.</li></ol>',
      documentosDownload: [
        { nome: 'Cartilha de renovação de alvará', arquivoModelo: 'cartilha_renovacao_alvara.pdf' },
        { nome: 'Checklist de documentos exigidos', arquivoModelo: 'checklist_renovacao.pdf' },
      ],
      fluxo: { temFluxo: true, documentacaoArquivo: 'documentacao_fluxo_renovacao_alvara.pdf' },
    } },
  { servico: 'Solicitação de poda de árvores',         categoria: 'Meio ambiente',                       setor: 'FLORIPAMANHÒ/Parques e Jardins',                    destino: ['Cidadão', 'Visitante'] },
  { servico: 'Taxa de coleta de lixo',                 categoria: 'Impostos e taxas',                    setor: 'COMCAP/Coleta Urbana',                              destino: ['Cidadão', 'Empresa'] },
  { servico: 'Vacinação municipal',                    categoria: 'Saúde',                               setor: 'SMS/Vigilância Epidemiológica',                     destino: ['Cidadão', 'Visitante'] },
  { servico: 'Alvará de funcionamento (Simplificado)', categoria: 'Alvarás, autorizações e licenças',    setor: 'SMPHDU/SDU/DLAE/Gerência de Alvarás',               destino: ['Empresa'], agrupado: true, htmlContent: `<div style="font-family:Open Sans,sans-serif;font-size:14px;color:#333;line-height:22px"><h2 style="font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 12px 0">Descrição do serviço</h2><p style="margin:0 0 16px 0">O Alvará de Funcionamento Simplificado permite a regularização de atividades comerciais de baixo risco de forma ágil e digital, sem necessidade de vistoria prévia. Ideal para MEIs e microempresas que desejam iniciar suas atividades rapidamente.</p><h2 style="font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 12px 0">Quem pode solicitar</h2><p style="margin:0 0 16px 0">Microempreendedores individuais (MEI), microempresas (ME) e empresas de pequeno porte (EPP) com atividade de baixo risco enquadrada na Lista Nacional de Atividades.</p><h2 style="font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 12px 0">Documentos necessários</h2><ul style="margin:0 0 16px 0;padding-left:20px"><li>CNPJ ativo</li><li>Contrato social ou certificado MEI</li><li>Comprovante de endereço do estabelecimento</li><li>Declaração de enquadramento em atividade de baixo risco</li></ul><h2 style="font-size:17px;font-weight:700;color:#1a1a1a;margin:0 0 12px 0">Prazo e custo</h2><p style="margin:0 0 8px 0"><strong>Prazo:</strong> Emissão imediata após aprovação automática do sistema.</p><p style="margin:0"><strong>Custo:</strong> Gratuito para MEI. Taxas aplicáveis para ME e EPP conforme tabela vigente.</p></div>` },
];

//  Mock: FormFields para ResolverPendencia 
export const FORM_FIELDS_COMUNIQUE: FormField[] = [
  { id: 'assunto',      label: 'Assunto',          type: 'text',     placeholder: 'Informe o assunto da resposta', required: true, readonlyValue: 'Complementação de documentação de residência' },
  { id: 'resposta',     label: 'Sua resposta',      type: 'textarea', placeholder: 'Digite sua resposta ao comunicado...', required: true, readonlyValue: 'Segue em anexo o comprovante de residência atualizado, emitido em março/2026. Confirmo que o endereço corresponde ao domicílio atual.' },
  { id: 'urgencia',     label: 'Urgência',          type: 'select',   options: ['Normal', 'Urgente', 'Muito urgente'], readonlyValue: 'Normal' },
  { id: 'dataResposta', label: 'Data da resposta',  type: 'date',     readonlyValue: '2026-04-10' },
  { id: 'ciencia',      label: 'Declaro que estou ciente das informações prestadas', type: 'checkbox', required: true },
  { id: 'anexo',        label: 'Documento anexo (opcional)', type: 'file', readonlyValue: 'comprovante_residencia_mar2026.pdf' },
];

export const FORM_FIELDS_ANALISE: FormField[] = [
  { id: 'parecer',       label: 'Parecer técnico',   type: 'select',   options: ['Aprovado', 'Aprovado com ressalva', 'Reprovado', 'Pendente de complementação'], required: true, readonlyValue: 'Aprovado com ressalva' },
  { id: 'fundamentacao', label: 'Fundamentação técnica', type: 'textarea', placeholder: 'Descreva a fundamentação do seu parecer...', required: true, readonlyValue: 'Documentos analisados conforme normativas vigentes. A planta de situação foi aprovada com ressalva: necessária correção da escala gráfica.' },
  { id: 'prazoCorrecao', label: 'Prazo para correção (se houver)', type: 'date', readonlyValue: '2026-05-15' },
  { id: 'norma',         label: 'Norma de referência', type: 'text',   placeholder: 'Ex: ABNT NBR 15575, Lei 12.462/2011', readonlyValue: 'ABNT NBR 15575' },
  { id: 'requer',        label: 'Requer complementação documental', type: 'checkbox', readonlyValue: 'true' },
  { id: 'laudo',         label: 'Laudo técnico assinado', type: 'file', required: true, readonlyValue: 'laudo_tecnico_analise.pdf' },
];

//  Últimas atividades — 6 tipos de evento (ícone + cor + chave i18n).
//  Mesma definição reaproveitada na home e na tela "Todas as atividades".
export type AtividadeTipo = 'acessado' | 'servico' | 'solicitacao' | 'pendencia-finalizada' | 'liberado' | 'pendencia-criada';

export const ATIVIDADE_TIPOS: { key: AtividadeTipo; icon: string; color: string; labelKey: string }[] = [
  { key: 'acessado',             icon: 'fa-regular fa-folder-open',      color: 'var(--neutral-dark-down)', labelKey: 'atvTipoAcessado' },
  { key: 'servico',              icon: 'fa-regular fa-grid-2',           color: 'var(--govbr-color)',       labelKey: 'atvTipoServico' },
  { key: 'solicitacao',          icon: 'fa-regular fa-file-circle-plus', color: 'var(--primary-pure)',      labelKey: 'atvTipoSolicitacao' },
  { key: 'pendencia-finalizada', icon: 'fa-regular fa-circle-check',     color: 'var(--success-color)',     labelKey: 'atvTipoPendFinalizada' },
  { key: 'liberado',             icon: 'fa-regular fa-unlock',           color: 'var(--primary-medium)',    labelKey: 'atvTipoLiberado' },
  { key: 'pendencia-criada',     icon: 'fa-regular fa-bell',             color: 'var(--warning-color)',     labelKey: 'atvTipoPendCriada' },
];

export const ATIVIDADE_TIPO_META: Record<AtividadeTipo, { icon: string; color: string; labelKey: string }> =
  Object.fromEntries(ATIVIDADE_TIPOS.map(t => [t.key, { icon: t.icon, color: t.color, labelKey: t.labelKey }])) as Record<AtividadeTipo, { icon: string; color: string; labelKey: string }>;

export interface Atividade { id: string; tipo: AtividadeTipo; text: string; ref: string; date: string; }

// Histórico completo (mock) — ordenado do mais recente ao mais antigo.
export const MOCK_ATIVIDADES: Atividade[] = [
  { id: 'a01', tipo: 'pendencia-finalizada', text: 'Pendência "Assinatura de documentos" concluída',       ref: 'PMF2026/000418', date: '20/04/2026 · 16h42' },
  { id: 'a02', tipo: 'solicitacao',          text: 'Nova solicitação criada: Alvará de obra',              ref: 'PMF2026/000501', date: '19/04/2026 · 11h08' },
  { id: 'a03', tipo: 'pendencia-criada',     text: 'Nova pendência de assinatura atribuída a você',        ref: 'PMF2026/000392', date: '18/04/2026 · 09h20' },
  { id: 'a04', tipo: 'acessado',             text: 'Processo acessado: Ranking de Sustentabilidade',       ref: 'PMF2026/000322', date: '17/04/2026 · 14h55' },
  { id: 'a05', tipo: 'liberado',             text: 'Processo liberado para você: PMF2026/000848',          ref: 'PMF2026/000848', date: '16/04/2026 · 10h12' },
  { id: 'a06', tipo: 'servico',              text: 'Serviço acessado: Certidão negativa de débitos (CND)', ref: 'CND-2026/1182',  date: '15/04/2026 · 08h39' },
  { id: 'a07', tipo: 'acessado',             text: 'Documento consultado: Alvará de funcionamento 2025',   ref: 'DOC-00U61ULQ',   date: '14/04/2026 · 17h03' },
  { id: 'a08', tipo: 'solicitacao',          text: 'Nova solicitação criada: Solicitação de poda de árvore', ref: 'PMF2026/000498', date: '13/04/2026 · 13h47' },
  { id: 'a09', tipo: 'pendencia-finalizada', text: 'Pendência "Verificar informações" concluída',          ref: 'PMF2026/000367', date: '12/04/2026 · 15h30' },
  { id: 'a10', tipo: 'servico',              text: 'Serviço acessado: 2ª Via de IPTU',                     ref: 'IPTU-2026/9932', date: '11/04/2026 · 10h58' },
  { id: 'a11', tipo: 'pendencia-criada',     text: 'Nova pendência: Complementar dados do processo',       ref: 'PMF2026/000298', date: '10/04/2026 · 09h05' },
  { id: 'a12', tipo: 'liberado',             text: 'Documento liberado para você: Parecer técnico',        ref: 'PMF2026/000721', date: '09/04/2026 · 16h18' },
  { id: 'a13', tipo: 'acessado',             text: 'Processo acessado: Matrícula Escolar Municipal',       ref: 'PMF2026/000341', date: '08/04/2026 · 11h44' },
  { id: 'a14', tipo: 'solicitacao',          text: 'Nova solicitação criada: Licença ambiental',           ref: 'PMF2026/000298', date: '07/04/2026 · 14h22' },
  { id: 'a15', tipo: 'pendencia-finalizada', text: 'Pendência "Análise de documentos" concluída',          ref: 'PMF2026/000275', date: '06/04/2026 · 10h31' },
  { id: 'a16', tipo: 'servico',              text: 'Serviço acessado: Agendamento de atendimento',         ref: 'AGD-2026/0455',  date: '05/04/2026 · 08h50' },
  { id: 'a17', tipo: 'acessado',             text: 'Documento consultado: Declaração de residência',       ref: 'DOC-77K21ABZ',   date: '04/04/2026 · 17h39' },
  { id: 'a18', tipo: 'pendencia-criada',     text: 'Nova pendência: Assinatura de declaração de residência', ref: 'PMF2026/000341', date: '03/04/2026 · 09h14' },
  { id: 'a19', tipo: 'liberado',             text: 'Processo liberado para você: PMF2026/000721',          ref: 'PMF2026/000721', date: '02/04/2026 · 15h02' },
  { id: 'a20', tipo: 'acessado',             text: 'Processo acessado: Mobilidade Urbana',                 ref: 'PMF2026/000221', date: '01/04/2026 · 13h27' },
  { id: 'a21', tipo: 'solicitacao',          text: 'Nova solicitação criada: Aprovação de projeto',        ref: 'PMF2026/000275', date: '31/03/2026 · 10h49' },
  { id: 'a22', tipo: 'servico',              text: 'Serviço acessado: Fala, cidadão (Ouvidoria)',          ref: 'OUV-2026/3310',  date: '30/03/2026 · 16h05' },
  { id: 'a23', tipo: 'pendencia-finalizada', text: 'Pendência "Comunique-se" concluída',                   ref: 'PMF2026/000221', date: '29/03/2026 · 11h18' },
  { id: 'a24', tipo: 'acessado',             text: 'Documento consultado: Memorial descritivo',            ref: 'DOC-90P12QWE',   date: '28/03/2026 · 09h33' },
  { id: 'a25', tipo: 'pendencia-criada',     text: 'Nova pendência: Analisar parecer técnico da vistoria', ref: 'PMF2026/000275', date: '27/03/2026 · 14h41' },
  { id: 'a26', tipo: 'liberado',             text: 'Documento liberado para você: Planta baixa do imóvel', ref: 'PMF2025/009812', date: '26/03/2026 · 10h07' },
  { id: 'a27', tipo: 'servico',              text: 'Serviço acessado: Carteira do idoso',                  ref: 'IDO-2026/0781',  date: '25/03/2026 · 08h22' },
  { id: 'a28', tipo: 'acessado',             text: 'Processo acessado: Vistoria de habite-se',             ref: 'PMF2026/000174', date: '24/03/2026 · 17h11' },
  { id: 'a29', tipo: 'solicitacao',          text: 'Nova solicitação criada: Retificação de área',         ref: 'PMF2026/000152', date: '23/03/2026 · 13h59' },
  { id: 'a30', tipo: 'pendencia-finalizada', text: 'Pendência "Complementar dados" concluída',             ref: 'PMF2026/000152', date: '22/03/2026 · 10h28' },
  { id: 'a31', tipo: 'servico',              text: 'Serviço acessado: Matrícula escolar municipal',        ref: 'EDU-2026/1290',  date: '21/03/2026 · 09h47' },
  { id: 'a32', tipo: 'pendencia-criada',     text: 'Nova pendência: Verificar dados cadastrais',           ref: 'PMF2026/000198', date: '20/03/2026 · 15h36' },
  { id: 'a33', tipo: 'acessado',             text: 'Documento consultado: Certidão de regularidade fiscal', ref: 'DOC-12A98ZXC',  date: '19/03/2026 · 11h52' },
  { id: 'a34', tipo: 'liberado',             text: 'Processo liberado para você: PMF2025/007109',          ref: 'PMF2025/007109', date: '18/03/2026 · 10h19' },
  { id: 'a35', tipo: 'solicitacao',          text: 'Nova solicitação criada: Alvará de construção',        ref: 'PMF2026/000128', date: '17/03/2026 · 14h03' },
  { id: 'a36', tipo: 'acessado',             text: 'Processo acessado: Fala, cidadão — iluminação',        ref: 'PMF2026/000244', date: '16/03/2026 · 09h41' },
];

// Quantidade de atividades exibidas na home antes do "Ver todos".
export const HOME_ATIVIDADES_LIMIT = 6;

//  rgãos e procedências 
export const ORGAOS       = ['PMF', 'SMTTU', 'FLORIPAMANHÒ', 'IPUF', 'SMDS'];
export const PROCEDENCIAS = ['Interno', 'Externo'];

