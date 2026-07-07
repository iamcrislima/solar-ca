//  Tipo de página
export type Page = 'home' | 'consulta' | 'processo' | 'documentos' | 'meusdados' | 'meusprocessos' | 'minhaspendencias' | 'pendencia-resolver' | 'processosliberados' | 'solicitacao' | 'cat-servicos' | 'servico-detalhe' | 'servico-form' | 'cadastro' | 'atividades';

//  Status de processo
export type ProcessoStatus = 'Concluído' | 'Em Andamento' | 'Pendente';

//  Consulta recente
export interface ConsultaRecente {
  numero: string;
  data: string;
  descricao: string;
  status: ProcessoStatus;
}

//  Aba do processo
export type ProcessoTab = 'dados' | 'documentos' | 'tramitacoes' | 'movimentacoes' | 'arquivamentos' | 'numeros-externos';

//  Meu processo
//  A situação é sempre 'Em Andamento' ou 'Concluído'. A existência de pendências NÃO é
//  um status — é um refinamento de "Em andamento" (contagem em `pendencias`).
export interface MeuProcesso {
  numero: string;
  titulo: string;
  orgao: string;
  dataAbertura: string;
  atualizadoEm: string;
  status: ProcessoStatus;
  pendencias: number; // nº de pendências vinculadas (0 = sem pendências)
}

//  Pendência
export type PendenciaStatus = 'Aberta' | 'Finalizada';
export type PendenciaTipo = 'Assinatura de documentos' | 'Verificar informações' | 'Comunique-se' | 'Análise de documentos' | 'Complementar dados';

export interface Pendencia {
  id: string;
  tipo: PendenciaTipo;
  criadaEm: string;
  prazo: string | null;
  diasRestantes: number | null;
  status: PendenciaStatus;
  processo: string;
  interessado: string;
  titulo: string;
  solicitante: string; // órgão solicitante no formato "SIGLA — Nome"
}

//  Processo liberado
export interface ProcessoLiberado {
  id: string;
  numero: string;
  interessado: string;
  cpf: string;
  liberadoEm: string;
  terminaEm: string | null;
  ativo: boolean;
  anexos: number;
  orgao: string;
}

//  FormField dinâmico
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'checkbox' | 'file';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  readonlyValue?: string;
}

//  Documento para assinar
export interface DocParaAssinar {
  id: string;
  nome: string;
  descricao?: string;
  tipo: string;
  tamanho: string;
  paginas: number;
  assinado?: boolean;
}

//  Documento-modelo / complementar de um serviço (não é upload)
export interface ServicoDocumento {
  nome: string;
  descricao?: string;
  arquivoModelo?: string; // nome do arquivo-modelo disponível para download
}

//  Detalhamento do serviço (espelha o Cadastro de Serviços do SolarBPM).
//  Cada campo preenchido vira uma seção; campos vazios são omitidos.
export interface ServicoDetalheConfig {
  modo: 'campos' | 'agrupamento';
  unidadePath?: string;     // caminho da unidade responsável (ex.: 'ADM / Administração')
  // modo 'campos' — conteúdo em HTML renderizado:
  descricaoResumida?: string;   // obrigatório no modo campos
  descricaoDetalhada?: string;
  requisitos?: string;
  comoSolicitar?: string;
  conteudoDependente?: string;
  infoTaxa?: string;
  // modo 'agrupamento' — texto livre único em HTML:
  descricao?: string;
  // seções adicionais (renderizadas só quando houver conteúdo):
  documentosSolicitar?: ServicoDocumento[];
  linksRelacionados?: { label: string; url: string }[];
  documentosDownload?: ServicoDocumento[];
  // Card "Fluxo" — uma linha por ação disponível:
  fluxo?: {
    temFluxo?: boolean;            // serviço tem fluxo configurado
    diagrama?: boolean;           // checkbox "Diagrama" marcado → linha "Diagrama" (abrir em nova aba)
    diagramaUrl?: string;         // URL do diagrama (abre em nova aba)
    documentacaoArquivo?: string; // arquivo de documentação anexado → linha "Documentação" (download)
  };
}

//  Tipo de serviço municipal
export interface Servico {
  servico: string;
  categoria: string;
  setor: string;
  destino: string[];
  agrupado?: boolean;
  htmlContent?: string;
  // Opção de abertura configurada no SolarBPM:
  //  'solarbpm' (padrão) → abre o formulário dinâmico no portal
  //  'terceiro'          → redireciona para um link externo (sem formulário)
  opcaoAbertura?: 'solarbpm' | 'terceiro';
  linkExterno?: string;
  // Detalhamento data-driven ("Mais informações")
  detalhe?: ServicoDetalheConfig;
}
