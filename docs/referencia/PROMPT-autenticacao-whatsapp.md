# Prompt para o Claude Code — Autenticação via WhatsApp (FloripaOn / Solar BPM)

> Como usar: coloque o arquivo `floripaon-autenticacao-whatsapp.html` dentro do repositório
> em `docs/referencia/autenticacao-whatsapp.html` e cole o prompt abaixo no Claude Code,
> na raiz do projeto.

---

## Contexto

Este repositório é o portal **FloripaOn** (React + Vite, deploy na Vercel). Preciso adicionar
o fluxo de **autenticação via WhatsApp**: o cidadão conversa com a assistente (LIA) no WhatsApp,
pede para abrir um protocolo, o sistema verifica se ele tem autenticação válida e, se não tiver,
manda um link que abre uma tela de login no navegador. Depois de entrar, ele volta para a conversa.

Em `docs/referencia/autenticacao-whatsapp.html` existe um protótipo estático com **todos os estados,
textos e estilos definitivos**. Use como fonte da verdade para copy, hierarquia e espaçamentos.

## O que NÃO fazer

O protótipo de referência tem andaimes que **não devem ir para o código**:

- Nada de moldura de celular, barra de status falsa, notch ou home indicator.
- Nada de barra de navegador falsa com URL fake.
- Nada de barra escura do protótipo, seletor "Celular / Desktop", navegação por etapas
  ou painel de anotações no rodapé.
- Nada de sistema de design paralelo: **não recriar** botões, inputs, cards ou tokens que já
  existem no projeto.

O resultado precisa ser páginas reais dentro do shell da aplicação. A responsividade é a do
navegador — abrir no celular tem que dar a versão mobile sozinho, sem toggle.

## Rotas a criar

| Rota | Estado |
|---|---|
| `/entrar/whatsapp` | Tela de login com a faixa de contexto do WhatsApp |
| `/entrar/whatsapp/senha` | Login com e-mail ou CPF/CNPJ + senha |
| `/entrar/whatsapp/confirmado` | Identidade confirmada, retorno para a conversa |
| `/entrar/whatsapp/sessao-valida` | Já autenticado dentro da janela, sem pedir login |
| `/entrar/whatsapp/link-expirado` | Link de identificação expirado |

O mock da conversa no WhatsApp que existe no protótipo **não é tela do produto** — ignore.

## Reaproveitamento obrigatório

1. Localize os componentes que hoje montam o login do portal (o card com gov.br, Certificado
   Digital e "Entrar com login do sistema") e **reutilize**. Se hoje isso vive dentro de um modal,
   extraia o conteúdo para um componente compartilhado e faça o modal e as novas rotas consumirem
   o mesmo componente. Não duplique.
2. Use os tokens e utilitários de estilo já existentes no projeto. Tipografia continua Open Sans.
3. Header e footer: use os mesmos do portal.

## Componente novo

`WhatsAppContextStrip` — a faixa verde no topo do card. Props:

- `telefone: string` — renderizar **sempre mascarado** (`+55 (48) 9••••-0566`). A máscara é
  responsabilidade do componente, não do chamador.
- `motivo: string` — ex.: "Confirme sua identidade para abrir o protocolo e voltar à conversa."

## Configuração, não hardcode

Crie `src/config/autenticacao.ts`:

```ts
export const autenticacaoConfig = {
  janelaAutenticacaoDias: 10,   // parametrizável por cliente: 1, 10, 365…
  validadeLinkMinutos: 15,
  whatsappNumero: '5548000000000',
};
```

- O prazo da sessão aparece em duas formas: relativa ("por 10 dias") na tela de login e
  absoluta ("Válido até 06/08/2026") na tela de confirmado. Ambas derivam do config.
- São **dois prazos distintos**: validade do link (curta) e validade da sessão (longa).
  Não misturar nas mensagens.

## Query params

A rota lê `?origem=whatsapp&t=<token>`.

- Se `origem !== 'whatsapp'`, esconda a faixa de contexto e mostre o login normal do portal.
- Token **nunca** renderizado em tela nem logado no console.
- Não colocar telefone nem CPF em query string em nenhuma navegação interna.

## Retorno para a conversa

- Botão verde "Voltar para o WhatsApp" → `https://wa.me/${whatsappNumero}`, com
  `target="_blank" rel="noopener"`.
- Em telas largas, o WhatsApp está no celular da pessoa: troque o texto para "Abra o WhatsApp no
  seu celular" e ofereça QR + "Abrir no WhatsApp Web". Isso é **media query**, não detecção de
  user agent.
- O QR do protótipo é placeholder. Gere de verdade a partir da URL do `wa.me` usando uma lib
  pequena e sem dependências pesadas.

## Cuidados de mobile real

Vou acessar isso pelo celular, então:

- Layout fluido, coluna única, card com `max-width: 460px` e centralizado.
- Alvos de toque com no mínimo 44px de altura.
- Respeitar `env(safe-area-inset-bottom)` no rodapé — no iOS o conteúdo encosta na barra.
- Inputs com `inputMode` e `autoComplete` corretos (`username`, `current-password`) e
  `font-size` de no mínimo 16px, senão o iOS dá zoom ao focar.
- Sem scroll horizontal em 320px de largura.
- Foco visível no teclado e `prefers-reduced-motion` respeitado.

## Deploy na Vercel

Garanta que deep link e refresh direto nas rotas novas não caiam em 404. Se ainda não existir,
crie `vercel.json` com o rewrite de SPA:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## Navegação entre os estados para apresentação

Vou apresentar isso ao vivo pelo celular. Crie uma rota `/entrar/whatsapp/estados` que lista os
links das cinco telas, visível somente quando `import.meta.env.VITE_MOSTRAR_TELAS === 'true'`.
Sem essa variável, a rota responde 404. Adicione a variável ao `.env.example` com um comentário
explicando que é só para demonstração.

## Escopo

- Não implementar autenticação real. gov.br e Certificado Digital podem navegar direto para
  `/entrar/whatsapp/confirmado`, e "Entrar" na tela de senha também. É protótipo navegável.
- Não alterar nenhuma rota ou página existente, exceto a extração do componente de login
  descrita acima.

## Aceite

Ao terminar, rode o build e confirme:

- [ ] `npm run build` passa sem erro e sem warning novo.
- [ ] As cinco rotas abrem direto pela URL, sem 404 no refresh.
- [ ] Nenhuma moldura de celular, barra de status, barra de navegador falsa ou UI de protótipo
      sobrou no bundle. Faça um grep e me mostre o resultado.
- [ ] Em 320px de largura não há scroll horizontal.
- [ ] Trocar `janelaAutenticacaoDias` para `1` muda os textos das duas telas, sem tocar em JSX.
- [ ] Sem `VITE_MOSTRAR_TELAS`, `/entrar/whatsapp/estados` não existe.

Me mostre a lista de arquivos criados e alterados, e o diff do que você extraiu do componente
de login antes de eu subir pra Vercel.
