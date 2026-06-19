# FloripaOn — Portal Cidadão · Handoff Técnico

> Projeto: **Solar BPM — Portal FloripaOn**
> Repositório: https://github.com/iamcrislima/solar-ca
> Estado atual: protótipo de alta fidelidade, 100% frontend estático com mocks

---

## Visão Geral

Portal de serviços digitais para o cidadão da Prefeitura de Florianópolis, construído sobre a plataforma Solar BPM. O cidadão acessa, acompanha e interage com processos administrativos municipais: solicitações de serviço, acompanhamento de processos, resolução de pendências, assinatura de documentos e consulta de processos liberados.

O projeto foi entregue como protótipo de alta fidelidade navegável, com todas as 14 telas implementadas e passado por pipeline de qualidade (Tyrion → Thanos → Arya → Aragorn). Não há backend conectado — toda a lógica usa dados mockados em `src/mocks.ts`. Pronto para integração com APIs reais.

---

## Setup local (< 5 minutos)

### Pré-requisitos

- Node.js >= 18
- Token FontAwesome Pro (ver abaixo)

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/iamcrislima/solar-ca.git
cd solar-ca

# 2. Criar o arquivo .env com o token FontAwesome Pro
cp .env.example .env
# Editar .env e substituir "seu_token_aqui" pelo token real

# 3. Instalar dependências (o .npmrc lê FA_TOKEN do .env automaticamente)
npm install

# 4. Subir em desenvolvimento
npm run dev
# → http://localhost:5173

# 5. Build de produção (opcional)
npm run build

# 6. Preview do build local (opcional)
npm run preview
```

### Onde obter o token FontAwesome Pro

1. Acessar https://fontawesome.com/account
2. Seção "Tokens" → copiar o token de acesso
3. Colar em `.env` como `FA_TOKEN=<token>`

O `.npmrc` commitado usa `${FA_TOKEN}` — ele lê a variável do ambiente ou do `.env` durante o `npm install`. O `.env` **nunca deve ser commitado** (já está no `.gitignore`).

---

## Variáveis de ambiente

| Variável | Obrigatória | Descrição | Onde obter |
|----------|-------------|-----------|------------|
| `FA_TOKEN` | **Sim** (agora) | Token de acesso à biblioteca FontAwesome Pro | https://fontawesome.com/account |
| `VITE_API_URL` | Não (integração futura) | Base URL da API Solar BPM | Time de backend |
| `VITE_GOVBR_CLIENT_ID` | Não (integração futura) | Client ID do OAuth gov.br | Time de integração gov.br |

---

## Arquitetura

### Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | React + TypeScript | 19.x / ~5.7.2 |
| Build | Vite | ^6.3.1 |
| Design System | @1doc/1ds-react + @1doc/1ds-tokens | latest / ^0.0.1 |
| Ícones | @fortawesome/fontawesome-pro | latest |
| Tipografia | Open Sans (Google Fonts) | — |
| Estilo | Inline styles (React.CSSProperties) | — |

Sem CSS modules. Sem Tailwind. Sem react-router.

### Estrutura de pastas

```
src/
  components/
    FAIcon.tsx              → Wrapper obrigatório para FA Pro (ver abaixo)
    Header.tsx              → Header fixo 56px: busca, acessibilidade, avatar
    SideMenu.tsx            → Sidebar colapsável 48px/248px
    Breadcrumb.tsx          → Breadcrumb clicável em sub-páginas
    Mobile.tsx              → MobileHeader, MobileDrawer, MobileBottomNav
    LoginModal.tsx          → Login gov.br (primário) + sistema (oculto por padrão)
    StatusBadge.tsx         → Badge Concluído/Em Andamento/Pendente
    StatCard.tsx            → Card de estatística clicável
    ErrorBoundary.tsx       → Captura de erros em páginas críticas
    DynamicFormRenderer.tsx → Renderiza FormField[] dinamicamente
    SearchWithDropdown.tsx  → Busca com autocomplete e navegação por teclado
    FormComponents.tsx      → Inputs segmentados, SearchableSelect
    ServiceCard.tsx         → Card de serviço no catálogo
    ContactModal.tsx        → Modal de contato
    TermosModal.tsx         → Modal de termos de uso
    InfoTooltip.tsx         → Tooltip para campos com formato não-óbvio

  pages/
    HomePage.tsx            → Home pública + dashboard pós-login (hero azul + stats)
    ConsultaProcessos.tsx   → Consulta pública por número (inputs segmentados)
    ProcessoDetalhe.tsx     → Detalhe completo do processo (abas, docs, histórico)
    ConsultaDocumentos.tsx  → Consulta de documentos
    MeusProcessos.tsx       → Lista de processos do usuário (filtros + busca)
    MinhasPendencias.tsx    → Lista de pendências abertas e finalizadas
    ResolverPendencia.tsx   → Resolução de pendência (5 templates condicionais)
    ProcessosLiberados.tsx  → Processos liberados para consulta por terceiros
    MeusDados.tsx           → Perfil + troca de senha + e-mails adicionais
    SolicitacaoServicos.tsx → Catálogo de serviços com busca e filtros
    CatServicos.tsx         → Serviços filtrados por categoria
    ServicoDetalhe.tsx      → Detalhe de um serviço municipal
    ServicoForm.tsx         → Formulário multi-step de solicitação (3 passos)
    CadastroPage.tsx        → Cadastro de cidadão (PF e PJ)

  i18n.tsx        → Contexto PT/EN + hook useT() + todas as strings traduzidas
  types.ts        → Interfaces TypeScript: Page, Servico, Pendencia, etc.
  constants.ts    → STATUS_STYLE e outras constantes de runtime
  mocks.ts        → Dados mockados (substituir por chamadas de API)
  App.tsx         → Roteamento por useState<Page>, layouts mobile/desktop
  main.tsx        → Entry point — ordem de imports crítica
  index.css       → CSS vars globais, dark mode, alto contraste, reset

public/
  floripa.jpg     → Imagem do banner da homepage
```

### Roteamento por useState

O projeto não usa react-router. Toda a navegação é feita pelo estado `page: Page` em `App.tsx`:

```tsx
const [page, setPage] = useState<Page>('home');
```

O tipo `Page` em `src/types.ts` lista todas as telas válidas. Navegar = chamar `setPage('nome-da-tela')`. Consequências: sem URLs atualizadas, sem deep-linking, sem botão Voltar do browser. Migrar para react-router quando isso for necessário para produção.

### Sistema de i18n

Todas as strings da UI passam pelo hook `useT()` definido em `src/i18n.tsx`. O contexto `LangContext` está no topo do `App.tsx`. Para adicionar uma string:

1. Adicionar a chave em `TRANS.pt` e `TRANS.en` em `i18n.tsx`
2. Chamar `const t = useT()` no componente
3. Usar `t('minha-chave')` no JSX

Strings de erro de API ainda não estão no i18n — adicionar ao integrar backend.

### FAIcon wrapper — por que existe

React gerencia o DOM do componente. FontAwesome JS substitui `<i>` por `<svg>` após o React montar. Quando React tenta desmontar o `<i>` (que o FA já trocou por `<svg>`), ocorre `NotFoundError: removeChild` — tela branca.

A solução é o `FAIcon.tsx`: usa `dangerouslySetInnerHTML` num `<span>`. React gerencia apenas o `<span>`; o FA muta o conteúdo interno sem conflito.

```tsx
<FAIcon icon="fa-regular fa-eye" />
```

**Nunca usar `<i class="fa-...">` diretamente em componentes React que re-renderizam ou alternam entre estados.**

### Ordem de imports em main.tsx

```
1. @1doc/1ds-tokens (primitives → semantic → theme-1doc)
2. @1doc/1ds-react component CSS
3. @fortawesome/fontawesome-pro/js/all.min.js
4. index.css
5. App.tsx
6. document.documentElement.setAttribute('data-theme', '1doc')
```

Alterar essa ordem pode quebrar os tokens visuais ou os ícones.

---

## Páginas e funcionalidades

| Tela (Page) | Componente | Status | Observações |
|-------------|-----------|--------|-------------|
| `home` | HomePage | Completa | Home pública + dashboard pós-login com hero azul |
| `consulta` | ConsultaProcessos | Completa | Busca por número com inputs segmentados |
| `processo` | ProcessoDetalhe | Completa* | *Dados do cabeçalho hardcoded — ver Dívida Técnica |
| `documentos` | ConsultaDocumentos | Completa | |
| `meusdados` | MeusDados | Completa | Perfil, e-mails adicionais, troca de senha |
| `meusprocessos` | MeusProcessos | Completa | Filtros por status, busca, StatCards clicáveis |
| `minhaspendencias` | MinhasPendencias | Completa | 5 tipos de pendência, prazo/urgência visual |
| `pendencia-resolver` | ResolverPendencia | Completa | 5 templates: Assinatura, Comunique-se, Verificar, Análise, Complementar |
| `processosliberados` | ProcessosLiberados | Completa | Badge ativo/expirado, link para detalhe |
| `solicitacao` | SolicitacaoServicos | Completa | Busca + filtro por destino + cards agrupáveis |
| `cat-servicos` | CatServicos | Completa | |
| `servico-detalhe` | ServicoDetalhe | Completa | Renderiza htmlContent via dangerouslySetInnerHTML |
| `servico-form` | ServicoForm | Completa | 3 passos: dados → detalhes → documentos |
| `cadastro` | CadastroPage | Completa | Pessoa Física e Jurídica, multi-step |

---

## Mocks vs. API

Tudo em `src/mocks.ts` é dado fictício. Substituir por chamadas de API ao integrar:

| Constante mock | Substituir por |
|----------------|----------------|
| `MOCK_USER` | `GET /auth/me` |
| `MOCK_MEUS_PROCESSOS` | `GET /processos?usuario=:id` |
| `MOCK_PENDENCIAS` | `GET /pendencias?usuario=:id` |
| `MOCK_LIBERADOS` | `GET /liberados?usuario=:id` |
| `MOCK_ARQUIVAMENTOS` | `GET /processos/:id/arquivamentos` |
| `MOCK_DASH_ATIVIDADES` | `GET /atividades?usuario=:id` |
| `consultasRecentes` | `GET /consulta/recentes?usuario=:id` |
| `MOCK_SERVICOS_AV` + `categories` | `GET /servicos` + `GET /servicos/categorias` |
| `FORM_FIELDS_COMUNIQUE` / `FORM_FIELDS_ANALISE` | `GET /pendencias/:id/formulario` |
| `MOCK_NOMES_ANEXOS` | `GET /processos/:id/documentos` |

**Comportamentos visuais sem implementação real:**

- Login gov.br / sistema — define `isLoggedIn = true` localmente; sem OAuth, sem JWT
- Upload de arquivos — `<input type="file">` não conectado a endpoint
- "Consultar CEP" em Meus Dados — link visual, sem chamada externa
- Botões "Salvar" em Meus Dados — atualizam state local, sem `PUT /usuarios/:id`
- "Alterar senha" — validação visual apenas, sem `POST /auth/senha`
- Assinar/recusar documentos — state local `Set<string>`, sem endpoint de assinatura digital
- Exportar PDF/XLS em Meus Processos — botões visuais, sem implementação
- Protocolo no ServicoForm — gerado com `Math.random()`, sem ID real do backend
- Paginação — não implementada em nenhuma tela

---

## Segurança — itens resolvidos

Os itens abaixo foram corrigidos durante a pipeline antes deste handoff:

- **FA_TOKEN no histórico git:** auditoria do `git log -p -- .npmrc` confirmou que o token **nunca esteve em claro** no histórico deste repositório. O `.npmrc` sempre usou `${FA_TOKEN}` desde o primeiro commit.
- **Dados pessoais reais em mocks:** email, telefone, endereço e CPFs reais que existiam nos mocks foram substituídos por dados fictícios claramente identificáveis (`usuario.exemplo@email.com`, `(48) 91234-5678`, CEP `88010-000`, CPFs `012.345.678-90` e `098.765.432-10`) nos commits de 18–19/06/2026.
- **`dangerouslySetInnerHTML` no FAIcon:** o conteúdo é sempre `<i class="fa-...">` de strings literais do código — não é XSS.
- **Sem localStorage/sessionStorage com dados sensíveis.**
- **Sem chamadas de rede** — a aplicação é 100% frontend estático com mocks.

---

## Segurança — itens pendentes (ação obrigatória antes de produção)

### 1. `ServicoDetalhe.tsx:77` — dangerouslySetInnerHTML sem DOMPurify

```tsx
<div dangerouslySetInnerHTML={{ __html: service.htmlContent ?? '' }} />
```

Atualmente seguro (conteúdo hardcoded em `mocks.ts`). Quando a API real for integrada e `htmlContent` vier de CMS ou banco de dados, este ponto vira vetor XSS sem nenhuma barreira.

**Ação obrigatória antes de conectar qualquer API:**
```bash
npm install dompurify @types/dompurify
```
```tsx
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(service.htmlContent ?? '') }} />
```

### 2. `LoginModal.tsx` — authorization_id do SSO gov.br (a confirmar)

A URL hardcoded em `LoginModal.tsx` (linha ~537) contém um `authorization_id` de valor fixo:
```
https://sso.acesso.gov.br/login?client_id=floripa.sc.gov.br&authorization_id=19dadc40977
```

Não foi possível confirmar se este é um ID de sessão OAuth de produção real ou um valor fictício de teste. **Verificar com o time de integração gov.br.** Se for real, mover para variável de ambiente `VITE_GOVBR_AUTHORIZATION_ID`.

### 3. Vite ^6.3.1 — CVE-2025-46565

SSRF no dev server via `server.proxy`. Não afeta o build de produção (build estático), mas afeta desenvolvedores que expuserem o Vite na rede (`--host`). Atualizar para `^6.3.4+` quando disponível:
```bash
npm update vite
```

### 4. Validações de formulário ausentes (endereçar na integração)

- CPF: apenas máscara visual, sem validação módulo 11
- Senha: sem regras mínimas de força enforçadas
- E-mail e senha no cadastro: correspondência entre campos não validada antes de avançar o step
- Upload de arquivo: apenas `accept=".pdf,.jpg,.png"` no input; qualquer arquivo pode ser enviado programaticamente

---

## Dívida técnica documentada

Os itens abaixo funcionam, mas precisam de atenção antes de produção ou ao escalar:

### ProcessoDetalhe.tsx — dados hardcoded no cabeçalho

Os valores `"PMF2026/000418"` e `"Ranking de Sustentabilidade"` estão literais no JSX do componente. A prop `processo` existe no componente mas nunca foi implementada para receber dados externos. Prioridade alta ao integrar a API de processos.

### LoginModal.tsx — monólito com 30+ useState (594 linhas)

O cadastro multi-step está acoplado ao modal de login. Seria melhor como `CadastroModal` separado com estado próprio. Não é bloqueante para demo — é risco de regressão ao modificar.

### ResolverPendencia.tsx — 5 templates condicionais num único componente (680 linhas)

Cada tipo de pendência (Assinatura, Comunique-se, Verificar, Análise, Complementar) deveria ser componente separado. Não é bloqueante — é risco de regressão ao adicionar um sexto tipo.

### MeusDados.tsx — toggles de senha sem wrapper `<button>`

Linhas 262, 268, 274: `<FAIcon onClick={...}>` usado como span interativo sem `<button>`. Não ativável por Tab + Enter — falha WCAG 2.1 nível A. Correção de 5 minutos: envolver cada FAIcon em `<button type="button" style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'inline-flex', alignItems:'center' }}>`.

### Bundle FontAwesome — 14.8MB minificado / 4.7MB gzip

O `import '@fortawesome/fontawesome-pro/js/all.min.js'` carrega a biblioteca inteira. Tree-shaking não funciona com o loader JS. Em produção com usuários reais, migrar para imports individuais por ícone (`@fortawesome/pro-regular-svg-icons`). Não bloqueante para demo ou piloto.

### @1doc/1ds-tokens — versão ^0.0.1 possivelmente desatualizada

O sibling `@1doc/1ds-react` usa `latest`. Verificar se há versão mais recente de `@1doc/1ds-tokens` e atualizar o `package.json`.

### Sem testes

Zero testes unitários ou de integração. Os componentes com maior risco de regressão são `ResolverPendencia.tsx` e `LoginModal.tsx`.

### Inputs de busca sem debounce

Atualmente filtram array local — sem problema. Em produção com API, cada keystroke disparará uma requisição. Adicionar `debounce` ao conectar.

### SearchableSelect — posicionamento pode vazar do viewport

`FormComponents.tsx` usa `getBoundingClientRect` para posicionar o dropdown. Em telas pequenas ou elementos próximos à borda, o dropdown pode sair do viewport. Revisar ao integrar formulários reais.

---

## Deploy (Vercel)

O `vercel.json` na raiz já está configurado:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

**Passos para deploy:**

1. Importar o repositório no painel da Vercel
2. Adicionar a variável de ambiente `FA_TOKEN` no painel da Vercel (Settings → Environment Variables) com o token FontAwesome Pro real
3. Deploy — o build `npm run build` lê o `FA_TOKEN` do ambiente da Vercel e instala o pacote FontAwesome Pro via `.npmrc`

**Importante:** não usar `installCommand` customizado no `vercel.json`. O `.npmrc` commitado com `${FA_TOKEN}` é suficiente — o Vercel injeta a variável no ambiente de build automaticamente.

**Deploy rápido para aprovação sem Vercel:** `npm run build` → arrastar a pasta `/dist` no Netlify Drop (https://app.netlify.com/drop).

---

## Checklist de integração com backend

Ordem recomendada de integração:

- [ ] Definir contrato de autenticação — gov.br OAuth ou JWT próprio? Desbloqueia todo o resto
- [ ] Implementar `GET /auth/me` → substituir `MOCK_USER` em `src/mocks.ts`
- [ ] Substituir `MOCK_MEUS_PROCESSOS` → `GET /processos?usuario=:id`
- [ ] Substituir `MOCK_PENDENCIAS` → `GET /pendencias?usuario=:id`
- [ ] Conectar `DynamicFormRenderer` ao `GET /pendencias/:id/formulario`
- [ ] Implementar endpoint de assinatura `POST /pendencias/:id/assinar`
- [ ] Substituir `MOCK_LIBERADOS` → `GET /liberados?usuario=:id`
- [ ] Conectar upload de arquivos → `POST /documentos/upload`
- [ ] Implementar `GET /servicos` + `GET /servicos/categorias` → substituir catálogo mock
- [ ] **Adicionar DOMPurify em `ServicoDetalhe.tsx:77` antes de conectar CMS/API**
- [ ] Adicionar paginação em todas as listas (Processos, Pendências, Liberados)
- [ ] Implementar guard de autenticação no frontend (redirecionar rotas protegidas)
- [ ] Conectar CEP lookup em `MeusDados.tsx` → ViaCEP ou serviço interno
- [ ] Adicionar strings de erro de API em `src/i18n.tsx`
- [ ] Verificar e mover `authorization_id` do SSO gov.br para variável de ambiente
- [ ] Substituir datas hardcoded nos mocks por datas relativas ao integrar

---

> Gerado em: 2026-06-19 via pipeline Sauron
