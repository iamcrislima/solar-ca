# HANDOFF — FloripaOn / solar-bpm

> Entregue por: Cristianderson Lima
> Data: 06/05/2026
> Stack: React 19 + Vite + TypeScript + CSS puro (FPT Design System / 1DS)

---

## O que é esse projeto

Protótipo de portal de serviços digitais para a Prefeitura de Florianópolis (FloripaOn), construído sobre a plataforma Solar BPM. O cidadão acessa, acompanha e interage com processos administrativos municipais — solicitações de serviço, assinatura de documentos, consulta de processos, pendências — tudo em uma interface única. O projeto foi entregue como protótipo de alta fidelidade pronto para integração com APIs reais.

---

## Como rodar localmente

```bash
# 1. Instalar dependências (requer Node >= 18)
npm install

# 2. Não há variáveis de ambiente necessárias para rodar localmente
#    Copie o exemplo só para referência futura:
cp .env.example .env

# 3. Subir em dev
npm run dev
# → http://localhost:5173

# 4. Build de produção
npm run build

# 5. Preview do build
npm run preview
```

> **Atenção:** O projeto usa FontAwesome Pro. O `.npmrc` já está commitado com o token de acesso — não remova nem adicione ao `.gitignore`.

---

## Variáveis de ambiente

Atualmente **nenhuma variável é necessária** para rodar o protótipo. Quando a integração com API real começar, adicionar:

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `VITE_API_URL` | Base URL da API Solar BPM | Sim (integração) |
| `VITE_GOVBR_CLIENT_ID` | Client ID do OAuth gov.br | Sim (auth real) |

---

## Estrutura do projeto

```
src/
  components/
    FAIcon.tsx              → Wrapper obrigatório para FontAwesome Pro via SVG
    Header.tsx              → Header fixo 56px — busca, acessibilidade, avatar
    SideMenu.tsx            → Sidebar colapsável 48px/248px com navegação principal
    Breadcrumb.tsx          → Breadcrumb clicável para sub-páginas
    Mobile.tsx              → MobileHeader, MobileDrawer, MobileBottomNav
    LoginModal.tsx          → Modal de login — gov.br (primário) + sistema (oculto)
    StatusBadge.tsx         → Badge de status reutilizável (Concluído/Andamento/Pendente)
    StatCard.tsx            → Card de estatística clicável (usado em dashboards)
    ErrorBoundary.tsx       → Classe React para capturar erros em páginas críticas
    DynamicFormRenderer.tsx → Renderiza FormField[] dinamicamente (pendências)
    SearchWithDropdown.tsx  → Busca com autocomplete e navegação por teclado
    FormComponents.tsx      → Inputs segmentados e componentes de formulário
    ServiceCard.tsx         → Card de serviço para catálogo
    ContactModal.tsx        → Modal de contato
    InfoTooltip.tsx         → Tooltip de informação para campos complexos

  pages/
    HomePage.tsx            → Home pública + dashboard pós-login (hero azul + stats)
    ConsultaProcessos.tsx   → Consulta pública de processos por número
    ProcessoDetalhe.tsx     → Detalhe completo do processo (abas, docs, histórico)
    ConsultaDocumentos.tsx  → Consulta de documentos
    MeusProcessos.tsx       → Lista de processos do usuário com filtros e busca
    MinhasPendencias.tsx    → Lista de pendências abertas e finalizadas
    ResolverPendencia.tsx   → Tela de resolução de pendência (assinar, comunique-se, etc.)
    ProcessosLiberados.tsx  → Processos liberados para consulta por terceiros
    MeusDados.tsx           → Perfil do usuário + troca de senha
    SolicitacaoServicos.tsx → Catálogo de serviços com busca e filtros
    CatServicos.tsx         → Serviços filtrados por categoria
    ServicoDetalhe.tsx      → Detalhe de um serviço municipal
    ServicoForm.tsx         → Formulário multi-step de solicitação (3 passos)

  i18n.tsx                  → Contexto de idioma PT/EN + hook useT()
  types.ts                  → Todas as interfaces e tipos TypeScript
  constants.ts              → STATUS_STYLE e outras constantes de runtime
  mocks.ts                  → Todos os dados mockados (substituir por chamadas de API)
  App.tsx                   → Roteamento por useState<Page>, layouts mobile/desktop
  main.tsx                  → Entry point — ordem de imports crítica (tokens → CSS → FA → App)
  index.css                 → CSS vars globais, dark mode, alto contraste, reset

public/
  floripa.jpg               → Imagem do banner da homepage
  Floripa 02.jpg            → Imagem secundária
```

---

## O que está implementado

- ✅ **Navegação completa** — roteamento por `useState<Page>` entre todas as 14 telas
- ✅ **Layout responsivo** — desktop (header + sidebar + breadcrumb) e mobile (drawer + bottom nav)
- ✅ **Dark mode** — via `data-dark` no `<html>`, filter invert
- ✅ **Alto contraste** — via `data-contrast` no `<html>`
- ✅ **Internacionalização PT/EN** — todas as strings passam por `useT()`, nenhum texto hardcoded
- ✅ **Design System 1DS** — tokens CSS aplicados em 100% do projeto, zero hexcode solto
- ✅ **Login modal** — gov.br como primário, sistema como secundário (progressive disclosure)
- ✅ **Dashboard pós-login** — hero azul com glassmorphism, stats, acesso rápido, atividades recentes
- ✅ **Consulta de processos** — busca por número com inputs segmentados e validação de formato
- ✅ **Detalhe do processo** — abas (Histórico, Documentos, Arquivamentos), modal de motivo de arquivamento
- ✅ **Meus Processos** — lista com filtros por status, busca textual, StatCards clicáveis
- ✅ **Minhas Pendências** — todos os 5 tipos de pendência, filtros, prazo/urgência visual
- ✅ **Resolver Pendência** — `DynamicFormRenderer` para Comunique-se e Análise; tabela de assinatura/recusa para Assinatura de documentos
- ✅ **Processos Liberados** — tabela com badge ativo/expirado, link para detalhe
- ✅ **Meus Dados** — abas Dados pessoais + Trocar senha, e-mails adicionais gerenciáveis
- ✅ **Catálogo de Serviços** — busca, filtro por destino, cards agrupáveis com conteúdo HTML
- ✅ **Formulário multi-step** — 3 etapas (dados pessoais → detalhes → documentos), stepper visual
- ✅ **ErrorBoundary** — catch visual em ProcessoDetalhe e ResolverPendencia
- ✅ **Busca com autocomplete** — header e homepage, navegação por teclado, highlight do termo

---

## O que ainda é mock

Tudo em `src/mocks.ts` é dado falso. Substituir por chamadas de API:

| Mock | Constante | Substituir por |
|------|-----------|----------------|
| Usuário logado | `MOCK_USER` | `GET /auth/me` |
| Processos do usuário | `MOCK_MEUS_PROCESSOS` | `GET /processos?usuario=:id` |
| Pendências | `MOCK_PENDENCIAS` | `GET /pendencias?usuario=:id` |
| Processos liberados | `MOCK_LIBERADOS` | `GET /liberados?usuario=:id` |
| Arquivamentos | `MOCK_ARQUIVAMENTOS` | `GET /processos/:id/arquivamentos` |
| Atividades do dashboard | `MOCK_DASH_ATIVIDADES` | `GET /atividades?usuario=:id` |
| Consultas recentes | `consultasRecentes` | `GET /consulta/recentes?usuario=:id` |
| Catálogo de serviços | `MOCK_SERVICOS_AV` + `categories` | `GET /servicos` + `GET /servicos/categorias` |
| Campos de formulário de pendência | `FORM_FIELDS_COMUNIQUE` / `FORM_FIELDS_ANALISE` | `GET /pendencias/:id/formulario` |
| Nomes de anexos | `MOCK_NOMES_ANEXOS` | `GET /processos/:id/documentos` |

**Comportamentos visuais sem implementação real:**

- 🟡 **Login gov.br / sistema** — clique seta `isLoggedIn = true` localmente; sem OAuth, sem JWT
- 🟡 **Upload de arquivos** — área de upload renderizada, `<input type="file">` não conectado a nenhum endpoint
- 🟡 **"Consultar CEP"** em Meus Dados — link visual, sem chamada ViaCEP/Correios
- 🟡 **Botões "Salvar"** em Meus Dados — atualizam state local, sem `PUT /usuarios/:id`
- 🟡 **"Alterar senha"** — formulário validado visualmente, sem `POST /auth/senha`
- 🟡 **Assinar/recusar documentos** — state local `Set<string>`, sem endpoint de assinatura digital
- 🟡 **Exportar PDF/XLS** em Meus Processos — botões visuais, sem implementação
- 🟡 **Protocolo no ServicoForm** — gerado com `Math.random()`, sem ID real do backend
- 🟡 **Paginação** — não implementada em nenhuma tela (dados mockados cabem em uma página)

---

## Decisões técnicas tomadas

- **Sem react-router** — navegação por `useState<Page>` no `App.tsx`. Simples o suficiente para o escopo; migrar para react-router quando houver URLs diretas ou deep-linking necessário.
- **Inline styles** — padrão do Design System Arthas/1DS; zero CSS modules, zero Tailwind. Todos os valores são CSS vars do 1DS tokens (`var(--primary-pure)`, etc.).
- **FAIcon wrapper com `dangerouslySetInnerHTML`** — necessário porque React destrói SVGs injetados via `<i>` pelo FontAwesome JS. Não substituir por outro método sem testar.
- **`Button` importado de `@1doc/1ds-react`** — o CSS do componente é carregado no `main.tsx`; ambos precisam estar presentes para funcionar.
- **`ErrorBoundary` como classe** — única forma de capturar erros em React; não existe hook equivalente ao `componentDidCatch`.
- **`STATUS_STYLE` em `constants.ts`** — separado de `types.ts` intencionalmente: tipos são compilados em zero runtime, constantes com valores CSS vars precisam existir em runtime.
- **`data-theme="1doc"`** no `<html>` via `main.tsx` — obrigatório para ativar os tokens visuais do 1DS.
- **`.npmrc` commitado** — token FontAwesome Pro necessário para o CI/Vercel instalar o pacote. Não mover para `.gitignore`.
- **Formulários sem validação de backend** — apenas validação visual/UX implementada. A validação real de negócio (ex: CPF válido, processo existente) é responsabilidade do backend.

---

## O que o time tech precisa fazer primeiro

1. **Definir o contrato de autenticação** — gov.br OAuth (client_id, redirect_uri, scopes) ou JWT próprio? Isso desbloqueia todas as outras integrações.
2. **Criar o serviço de usuário** — `GET /auth/me` retornando `{ nome, cpf, initials }` para substituir `MOCK_USER`.
3. **Mapear os endpoints de processos** — `GET /processos`, `GET /processos/:id` com a estrutura de dados que espelhe os tipos em `src/types.ts`.
4. **Implementar upload de arquivos** — endpoint `POST /documentos/upload` e conectar nos campos `type: 'file'` do `DynamicFormRenderer` e no `ServicoForm` (step 3).
5. **Integrar assinatura digital** — o fluxo de assinatura em `ResolverPendencia.tsx` está pronto visualmente; precisa de endpoint `POST /pendencias/:id/assinar`.
6. **Implementar autenticação gov.br** — substituir o `LoginModal.tsx` por redirect OAuth real.
7. **Adicionar paginação** — todas as listas (Processos, Pendências, Liberados) assumem dados infinitos hoje.
8. **CEP lookup** — conectar o botão "Consultar CEP" em `MeusDados.tsx` a ViaCEP ou serviço interno.

---

## Limitações conhecidas

- ⚠️ **Sem testes** — zero testes unitários ou de integração. Recomendado adicionar ao menos testes de componentes críticos (ResolverPendencia, ProcessoDetalhe) antes de produção.
- ⚠️ **Bundle grande** — FontAwesome Pro com `import all.min.js` gera ~14MB minificado (~4.7MB gzip). Em produção, migrar para imports individuais por ícone ou usar `import { faIconName } from '@fortawesome/pro-regular-svg-icons'`.
- ⚠️ **Sem controle de acesso** — todas as telas são acessíveis sem login (apenas visual). O guard de autenticação precisa ser implementado no frontend e validado no backend.
- ⚠️ **Datas hardcoded nos mocks** — as datas usam 2026 e vão "envelhecer" visualmente conforme o tempo passa. Substituir por datas relativas ao integrar.
- ⚠️ **i18n incompleta para erros de API** — as strings de erro de backend (ex: "CPF inválido", "processo não encontrado") ainda não estão no `i18n.tsx`. Adicionar ao integrar.

---

## Contato

Dúvidas sobre decisões de produto, fluxos e UX: **Cristianderson Lima**
