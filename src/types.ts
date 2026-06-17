//  Tipo de página
export type Page = 'home' | 'consulta' | 'processo' | 'documentos' | 'meusdados' | 'meusprocessos' | 'minhaspendencias' | 'pendencia-resolver' | 'processosliberados' | 'solicitacao' | 'cat-servicos' | 'servico-detalhe' | 'servico-form' | 'cadastro';

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
export type ProcessoTab = 'dados' | 'documentos' | 'tramitacoes' | 'movimentacoes' | 'arquivamentos';

//  Meu processo
export interface MeuProcesso {
  numero: string;
  titulo: string;
  orgao: string;
  dataAbertura: string;
  atualizadoEm: string;
  status: ProcessoStatus;
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

//  Tipo de serviço municipal
export interface Servico {
  servico: string;
  categoria: string;
  setor: string;
  destino: string[];
  agrupado?: boolean;
  htmlContent?: string;
}
