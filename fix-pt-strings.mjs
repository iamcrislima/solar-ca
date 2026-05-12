import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename } from 'path';

// Exact phrase replacements — sorted longest first to avoid partial matches
const FIXES = [
  // ── Palavras/frases únicas ──────────────────────────────────────────────────

  // órgão
  ["'rgo'",               "'Órgão'"],
  ['"rgo"',               '"Órgão"'],
  ["'rgo:'",              "'Órgão:'"],
  ["'rgo de abertura'",   "'Órgão de abertura'"],
  ["'rgo atual'",         "'Órgão atual'"],
  ["'ORGAO / SETOR'",     "'ÓRGÃO / SETOR'"],
  ["'RGO / SETOR'",       "'ÓRGÃO / SETOR'"],
  ["'rgo...'",            "'órgão...'"],
  ["ou rgo...'",          "ou órgão...'"],
  ["interessado ou rgo",  "interessado ou órgão"],
  ["ttulo ou rgo",        "título ou órgão"],
  ["nmero, interessado ou rgo", "número, interessado ou órgão"],
  ["Sigla do rgo",        "Sigla do Órgão"],
  ["rgo de abertura",     "Órgão de abertura"],
  ["rgo atual",           "Órgão atual"],
  ["pdOrgaoAbertura: 'rgo",  "pdOrgaoAbertura: 'Órgão"],
  ["pdOrgaoAtual: 'rgo",     "pdOrgaoAtual: 'Órgão"],
  ["mpOrgao: 'rgo'",         "mpOrgao: 'Órgão'"],
  ["orgao: 'rgo'",            "orgao: 'Órgão'"],
  ["solOrgao: 'rgo:'",        "solOrgao: 'Órgão:'"],

  // número / Número
  ["'Nmero do processo'",        "'Número do processo'"],
  ["'Nmero sequencial'",         "'Número sequencial'"],
  ["'Nmero *'",                  "'Número *'"],
  ["'Nmero'",                    "'Número'"],
  ["'nmero'",                    "'número'"],
  ["o nmero",                    "o número"],
  ["por nmero",                  "por número"],
  ["com o nmero",                "com o número"],
  ["n do processo",              "nº do processo"],
  ["nmeros e um",                "números e um"],
  ["letras, nmeros",             "letras, números"],
  ["nmeros e",                   "números e"],

  // pendências / Pendências
  ["'Minhas pendncias'",         "'Minhas pendências'"],
  ["'pendncias'",                "'pendências'"],
  ["'pendncia'",                 "'pendência'"],
  ["'Pendncias abertas'",        "'Pendências abertas'"],
  ["'Minhas Pendncias'",         "'Minhas Pendências'"],
  ["'Minhas pendncias'",         "'Minhas pendências'"],
  ["pendncias com",              "pendências com"],
  ["pendncias.',",               "pendências.',"],
  ["pendncias.",                 "pendências."],
  ["Total de pendncias",         "Total de pendências"],
  ["outras pendncias",           "outras pendências"],
  ["pendncia encontrada",        "pendência encontrada"],
  ["Resolver pendncia",          "Resolver pendência"],
  ["Voltar para pendncias",      "Voltar para pendências"],
  ["Com pendncias",              "Com pendências"],

  // você / Você
  ["'voc'",    "'você'"],
  ["'Voc'",    "'Você'"],
  ["que voc",  "que você"],
  ["Voc pode", "Você pode"],
  ["Voc est",  "Você está"],
  ["para voc", "para você"],
  ["a voc,",   "a você,"],

  // está / Está
  ["Voc est em dia",  "Você está em dia"],
  ["'est em dia",     "'está em dia"],

  // até
  ["'at 20%",        "'até 20%"],
  ["'at o dia",      "'até o dia"],
  ["com at 20%",     "com até 20%"],
  ["desconto at o",  "desconto até o"],

  // início / Início
  ["'Incio'",    "'Início'"],
  ["inicio: 'Incio'", "inicio: 'Início'"],
  ["breadInicio: 'Incio'", "breadInicio: 'Início'"],

  // conferência
  ["'Conferncia de Documentos'", "'Conferência de Documentos'"],
  ["'Procedncia'",               "'Procedência'"],
  ["procedencia: 'Procedncia'",  "procedencia: 'Procedência'"],

  // código / Código
  ["'cdigo localizado'",  "'código localizado'"],
  ["o cdigo localizado",  "o código localizado"],
  ["'Cdigo do documento'","'Código do documento'"],
  ["'cdigo nico",         "'código único"],
  ["codigoDoc: 'Cdigo",   "codigoDoc: 'Código"],
  ["tooltipDocumento: 'Informe o cdigo", "tooltipDocumento: 'Informe o código"],

  // cópia
  ["uma cpia impressa",   "uma cópia impressa"],
  ["cpia impressa",       "cópia impressa"],

  // tramitações / movimentações
  ["'Tramitaes'",    "'Tramitações'"],
  ["'Movimentaes'",  "'Movimentações'"],

  // rápida / rápido
  ["forma rpida",   "forma rápida"],
  ["'Acesso rpido'","'Acesso rápido'"],
  ["rpido'",        "rápido'"],

  // identificação / endereço
  ["'Identificao'",  "'Identificação'"],
  ["'Endereo'",       "'Endereço'"],

  // histórico
  ["histrico completo", "histórico completo"],

  // concluídos / concluído
  ["'Concludos'",  "'Concluídos'"],
  ["'Concludo'",   "'Concluído'"],
  ["mpConcluidos: 'Concludos'", "mpConcluidos: 'Concluídos'"],
  ["statusConcluido: 'Concludo'", "statusConcluido: 'Concluído'"],

  // título
  ["ttulo ou",    "título ou"],
  ["por ttulo",   "por título"],

  // solicitações / ações
  ["solicitaes que",   "solicitações que"],
  ["'observaes'",      "'observações'"],
  ["'observaes ou",    "'observações ou"],
  ["Adicione observaes", "Adicione observações"],
  ["Parecer ou observaes", "Parecer ou observações"],
  ["'informaes'",      "'informações'"],
  ["'Aes'",            "'Ações'"],
  ["pdAcoes: 'Aes'",   "pdAcoes: 'Ações'"],
  ["mdAcoes: 'Aes'",   "mdAcoes: 'Ações'"],
  ["'Redefinio de senha'", "'Redefinição de senha'"],
  ["redefinicaoSenha: 'Redefinio", "redefinicaoSenha: 'Redefinição"],
  ["Tipoação Verificar informaes", "Tipo Verificar informações"],
  ["'Verificar informaes'", "'Verificar informações'"],

  // ação (standalone ao → ação)
  ["aguardam sua ao.'",  "aguardam sua ação.'"],
  ["rpLimparSelecao: 'Limpar seleo'", "rpLimparSelecao: 'Limpar seleção'"],
  ["'Limpar seleo'",     "'Limpar seleção'"],
  ["'Criao'",            "'Criação'"],
  ["pdClassificacao: 'Classificao'", "pdClassificacao: 'Classificação'"],
  ["'Classificao'",      "'Classificação'"],
  ["'Data de Criao'",    "'Data de Criação'"],
  ["Tipo de Criao",      "Tipo de Criação"],

  // Não / não
  ["'No assinar'",    "'Não assinar'"],
  ["'No informado'",  "'Não informado'"],
  ["mdNao: 'No'",     "mdNao: 'Não'"],
  ["mdNaoInformado: 'No informado'", "mdNaoInformado: 'Não informado'"],

  // análise
  ["'Anlise de documentos'", "'Análise de documentos'"],
  ["tipoAnalise: 'Anlise",   "tipoAnalise: 'Análise"],

  // município / Florianópolis
  ["'municpio de Florianpolis'",  "'município de Florianópolis'"],
  ["municpio de Florianpolis",    "município de Florianópolis"],
  ["'Municpio de Florianpolis'",  "'Município de Florianópolis'"],
  ["municipio: 'Municpio",        "municipio: 'Município"],

  // segurança
  ["'segurana'",          "'segurança'"],
  ["Para sua segurana",   "Para sua segurança"],
  ["tsDicas: 'Dicas de segurana'", "tsDicas: 'Dicas de segurança'"],
  ["'Dicas de segurana'", "'Dicas de segurança'"],

  // símbolo
  ["um smbolo.'",       "um símbolo.'"],
  ["um smbolo (",       "um símbolo ("],
  ["'smbolo'",          "'símbolo'"],
  ["pelo menos um smbolo", "pelo menos um símbolo"],

  // maiúsculas / minúsculas
  ["maisculas, minsculas", "maiúsculas, minúsculas"],
  ["letras maisculas",     "letras maiúsculas"],
  ["minsculas e",          "minúsculas e"],

  // básicos
  ["'Dados bsicos'",  "'Dados básicos'"],
  ["pdDadosBasicos: 'Dados bsicos'", "pdDadosBasicos: 'Dados básicos'"],

  // olá
  ["boaTarde: 'Ol'",   "boaTarde: 'Olá'"],
  ["dashOla: 'Ol'",    "dashOla: 'Olá'"],

  // só
  ["em um s lugar",   "em um só lugar"],

  // aparecerá
  ["ele aparecer aqui", "ele aparecerá aqui"],

  // conteúdo
  ["o contedo antes",  "o conteúdo antes"],

  // disponível / disponíveis
  ["'disponvel nesta'",   "'disponível nesta'"],
  ["'disponveis nesta'",  "'disponíveis nesta'"],
  ["solDispSingular: 'disponvel", "solDispSingular: 'disponível"],
  ["solDispPlural: 'disponveis",  "solDispPlural: 'disponíveis"],

  // horário
  ["'Horrio de Atendimento'",     "'Horário de Atendimento'"],
  ["horarioAtendimento: 'Horrio", "horarioAtendimento: 'Horário"],

  // atendimento horário
  ["'Seg.  Sex., das 8h s 17h'",  "'Seg. à Sex., das 8h às 17h'"],

  // dúvidas / utilização
  ["caso de dvidas",    "caso de dúvidas"],
  ["sobre a utilizao",  "sobre a utilização"],

  // dígitos
  ["Ano (4 dgitos)",    "Ano (4 dígitos)"],

  // público
  ["solPublico: 'Pblico:'",  "solPublico: 'Público:'"],
  ["'Pblico:'",              "'Público:'"],

  // necessários
  ["'Documentos necessrios'",  "'Documentos necessários'"],
  ["solDocsTitle: 'Documentos necessrios'", "solDocsTitle: 'Documentos necessários'"],

  // cidadão
  ["'Cidado'",              "'Cidadão'"],
  ["destinoCidadao: 'Cidado'", "destinoCidadao: 'Cidadão'"],

  // Últimas
  ["'ltimas atividades'",  "'Últimas atividades'"],
  ["dashHistoricoTitle: 'ltimas", "dashHistoricoTitle: 'Últimas"],

  // O que é
  ["'O que  este serviço?'",   "'O que é este serviço?'"],
  ["solOQueE: 'O que",         "solOQueE: 'O que"],

  // gov.br recomendado (em-dash)
  ["gov.br  recomendado'",  "gov.br — recomendado'"],

  // buscar serviço nesta categoria
  ["'Buscar servio nesta categoria...'", "'Buscar serviço nesta categoria...'"],
  ["solTituloBusca: 'Buscar servio", "solTituloBusca: 'Buscar serviço"],

  // mais informações
  ["'Mais informaes'",   "'Mais informações'"],
  ["solMaisInfo: 'Mais informaes'", "solMaisInfo: 'Mais informações'"],

  // Botões (comment)
  ["// Botes",   "// Botões"],

  // Pendências (comment)
  ["// Minhas Pendncias",    "// Minhas Pendências"],
  ["// Resolver Pendncia",   "// Resolver Pendência"],
  ["// Status de pendncia",  "// Status de pendência"],
  ["// Tipos de pendncia",   "// Tipos de pendência"],

  // Processos Detalhe
  ["pdOrgaoSetor: 'RGO / SETOR'",  "pdOrgaoSetor: 'ÓRGÃO / SETOR'"],
  ["'ORGAO / SETOR'",               "'ÓRGÃO / SETOR'"],

  // Solicitar serviço detalhe
  ["'O que  este serviço?'",   "'O que é este serviço?'"],
];

const base = 'C:/Users/cristianderson.lima/solar-bpm/src';
const targets = [
  'i18n.tsx',
  'mocks.ts',
  'pages/HomePage.tsx',
  'pages/MinhasPendencias.tsx',
  'pages/MeusProcessos.tsx',
  'pages/ProcessosLiberados.tsx',
  'pages/ProcessoDetalhe.tsx',
  'pages/ResolverPendencia.tsx',
  'pages/MeusDados.tsx',
  'pages/CatServicos.tsx',
  'pages/ServicoDetalhe.tsx',
  'pages/ServicoForm.tsx',
  'pages/SolicitacaoServicos.tsx',
  'pages/ConsultaProcessos.tsx',
  'pages/ConsultaDocumentos.tsx',
  'components/LoginModal.tsx',
  'components/Header.tsx',
  'components/Mobile.tsx',
  'components/SideMenu.tsx',
  'components/Breadcrumb.tsx',
  'components/SearchWithDropdown.tsx',
  'components/ConsultaRow.tsx',
  'components/FormComponents.tsx',
  'components/StatCard.tsx',
];

let totalFixed = 0;
targets.forEach(t => {
  const f = `${base}/${t}`;
  if (!existsSync(f)) return;
  let content = readFileSync(f, 'utf8');
  let changed = false;

  for (const [bad, good] of FIXES) {
    if (content.includes(bad)) {
      content = content.split(bad).join(good);
      changed = true;
      totalFixed++;
    }
  }

  if (changed) {
    writeFileSync(f, content, 'utf8');
    console.log('FIXED ' + basename(f));
  } else {
    console.log('ok    ' + basename(f));
  }
});
console.log(`\nTotal replacements applied: ${totalFixed}`);
