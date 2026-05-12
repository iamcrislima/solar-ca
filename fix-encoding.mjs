import { readFileSync, writeFileSync, existsSync } from 'fs';
import { basename } from 'path';

// Remove replacement chars (U+FFFD) — artifacts from BOM or failed latin1 conversion
function stripReplacementChars(filePath) {
  const content = readFileSync(filePath, 'utf8');
  if (!content.includes('�')) return 'ok';
  const fixed = content.replaceAll('�', '');
  writeFileSync(filePath, fixed, 'utf8');
  return 'FIXED';
}

const base = 'C:/Users/cristianderson.lima/solar-bpm/src';
const targets = [
  `${base}/mocks.ts`,
  `${base}/types.ts`,
  `${base}/i18n.tsx`,
  `${base}/App.tsx`,
  `${base}/pages/HomePage.tsx`,
  `${base}/pages/MinhasPendencias.tsx`,
  `${base}/pages/MeusProcessos.tsx`,
  `${base}/pages/ProcessosLiberados.tsx`,
  `${base}/pages/ProcessoDetalhe.tsx`,
  `${base}/pages/ResolverPendencia.tsx`,
  `${base}/pages/MeusDados.tsx`,
  `${base}/pages/CatServicos.tsx`,
  `${base}/pages/ServicoDetalhe.tsx`,
  `${base}/pages/ServicoForm.tsx`,
  `${base}/pages/SolicitacaoServicos.tsx`,
  `${base}/pages/ConsultaProcessos.tsx`,
  `${base}/pages/ConsultaDocumentos.tsx`,
  `${base}/components/LoginModal.tsx`,
  `${base}/components/Header.tsx`,
  `${base}/components/Mobile.tsx`,
  `${base}/components/SideMenu.tsx`,
  `${base}/components/Breadcrumb.tsx`,
  `${base}/components/SearchWithDropdown.tsx`,
  `${base}/components/ServiceCard.tsx`,
  `${base}/components/ConsultaRow.tsx`,
  `${base}/components/DynamicFormRenderer.tsx`,
  `${base}/components/FormComponents.tsx`,
  `${base}/components/StatCard.tsx`,
  `${base}/components/FAIcon.tsx`,
];

targets.forEach(f => {
  if (existsSync(f)) {
    const r = stripReplacementChars(f);
    console.log(r + ' ' + basename(f));
  }
});
