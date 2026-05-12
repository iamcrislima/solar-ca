import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename } from 'path';

// Fix broken cedilha ç — only inside string literals (between quotes)
// to avoid touching TypeScript identifiers like Servico, CatServicos, etc.
const FIXES = [
  // servios → serviços / servio → serviço (in strings)
  [/(['"`])([^'"`]*?)servios([^'"`]*?)\1/gi, (m, q, a, b) => `${q}${a}serviços${b}${q}`],
  [/(['"`])([^'"`]*?)\bservio\b([^'"`]*?)\1/gi, (m, q, a, b) => `${q}${a}serviço${b}${q}`],
  // Serviços / Serviço capitalised
  [/(['"`])([^'"`]*?)Servios([^'"`]*?)\1/g, (m, q, a, b) => `${q}${a}Serviços${b}${q}`],
  [/(['"`])([^'"`]*?)\bServio\b([^'"`]*?)\1/g, (m, q, a, b) => `${q}${a}Serviço${b}${q}`],

  // solicitao → solicitação
  [/solicitao/gi, 'solicitação'],
  [/Solicitao/g, 'Solicitação'],

  // situao → situação
  [/situao/gi, 'situação'],
  [/Situao/g, 'Situação'],

  // autenticao → autenticação
  [/autenticao/gi, 'autenticação'],
  [/Autenticao/g, 'Autenticação'],

  // funao → função
  [/funao/gi, 'função'],
  [/Funao/g, 'Função'],

  // informao → informação
  [/informao/gi, 'informação'],
  [/Informao/g, 'Informação'],

  // avaliao → avaliação
  [/avaliao/gi, 'avaliação'],

  // aao → ação (common suffix — careful with word boundary)
  [/\baao\b/gi, 'ação'],
  [/\bAao\b/g, 'Ação'],

  // operao → operação
  [/operao/gi, 'operação'],

  // cancelao → cancelação
  [/cancelao/gi, 'cancelação'],

  // configuraao → configuração
  [/configuraao/gi, 'configuração'],

  // execuo → execução
  [/execuo/gi, 'execução'],

  // verifica[aeo] at end → verificação
  [/verificao/gi, 'verificação'],

  // atualizao → atualização
  [/atualizao/gi, 'atualização'],

  // instalaao → instalação
  [/instalaao/gi, 'instalação'],

  // separao → separação
  [/separao/gi, 'separação'],

  // integrao → integração
  [/integrao/gi, 'integração'],

  // qualificao → qualificação
  [/qualificao/gi, 'qualificação'],

  // certifiao / certifiao → certificação
  [/certifiao/gi, 'certificação'],

  // homologao → homologação
  [/homologao/gi, 'homologação'],

  // condioes → condições / condio → condição
  [/condioes/gi, 'condições'],
  [/condio\b/gi, 'condição'],

  // notificao → notificação
  [/notificao/gi, 'notificação'],

  // comunica[^çã] → comunicação
  [/comunicao/gi, 'comunicação'],

  // vinculao → vinculação
  [/vinculao/gi, 'vinculação'],

  // duplicao → duplicação
  [/duplicao/gi, 'duplicação'],

  // publicao → publicação
  [/publicao/gi, 'publicação'],

  // classifiao → classificação
  [/classifiao/gi, 'classificação'],

  // emissao → emissão  (ão not ç, but let's handle)
  // NOTE: emissão has ã not ç — skip (was handled by main fix)

  // licena → licença  (ç missing before 'a')
  [/licena/gi, 'licença'],
  [/Licena/g, 'Licença'],

  // alvaras / alvar without á handled by ã fix
];

const base = 'C:/Users/cristianderson.lima/solar-bpm/src';
const targets = [
  'i18n.tsx', 'mocks.ts',
  'pages/HomePage.tsx', 'pages/MinhasPendencias.tsx', 'pages/MeusProcessos.tsx',
  'pages/ProcessosLiberados.tsx', 'pages/ProcessoDetalhe.tsx', 'pages/ResolverPendencia.tsx',
  'pages/MeusDados.tsx', 'pages/CatServicos.tsx', 'pages/ServicoDetalhe.tsx',
  'pages/ServicoForm.tsx', 'pages/SolicitacaoServicos.tsx', 'pages/ConsultaProcessos.tsx',
  'pages/ConsultaDocumentos.tsx', 'components/LoginModal.tsx', 'components/Header.tsx',
  'components/Mobile.tsx', 'components/SideMenu.tsx', 'components/Breadcrumb.tsx',
  'components/SearchWithDropdown.tsx', 'components/ConsultaRow.tsx',
  'components/FormComponents.tsx', 'components/StatCard.tsx',
];

targets.forEach(t => {
  const f = `${base}/${t}`;
  if (!existsSync(f)) return;
  let content = readFileSync(f, 'utf8');
  let changed = false;

  for (const [pattern, replacement] of FIXES) {
    const before = content;
    content = content.replace(pattern, replacement);
    if (content !== before) changed = true;
  }

  if (changed) {
    writeFileSync(f, content, 'utf8');
    console.log('FIXED ' + basename(f));
  } else {
    console.log('ok    ' + basename(f));
  }
});
