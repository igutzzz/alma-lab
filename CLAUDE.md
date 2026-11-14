# alma-lab

Site-portfólio da Alma Lab, estúdio criativo independente de design, web e conteúdo visual. Gerado de forma estática.

> **Este repositório é público** (`igutzzz/alma-lab`, MIT no código, marca reservada). Este arquivo só traz regras técnicas. Decisões de design, marca e notas internas ficam em `AGENTS.md`, `DESIGN.md`, `PRODUCT.md`, no guia de marca e em `NOTAS-INTERNAS.md`, todos fora do git.

@AGENTS.md

## Como trabalhar aqui

- Português do Brasil nas conversas, nos textos do site e nos commits. Inglês só em código e nomes técnicos.
- Rode o servidor local e confira no navegador antes de dizer que uma mudança visual está pronta.
- Siga as decisões de design registradas no `AGENTS.md`. Uma decisão nova e duradoura do Igor vai para lá, não para este arquivo.

## Stack e comandos

Nuxt 4 + Vue 3 + Tailwind v4 (sem preflight) + Feature-Sliced Design em `src/`.

```
npm install
npm run dev          # http://127.0.0.1:4173
npm run build        # nuxt generate + pacote Sites (dist/client, dist/server, dist/.openai)
npm run test:sites
```

## Regras de código

- **FSD:** cada slice expõe a API pública em `index.ts` e só importa de camadas abaixo: `pages → widgets → features → entities → shared`.
- Rotas do Nuxt ficam em `src/routes/` e são finas: só montam uma page FSD. Não confundir com a camada `pages`.
- **Auto-imports do Nuxt estão desligados.** Imports sempre explícitos.
- `src/app/styles/site.css` é a fonte do visual. O Tailwind entra sem preflight; não ative o reset. Para componentes novos, prefira utilitários com os tokens da marca (`bg-paper`, `text-rust`, `font-display`, `font-mono`…). Estilos da nova direção ficam em `src/app/styles/new-style.css`.
- Cores de apoio são derivadas da paleta com `color-mix`, nunca hex solto.
- Respeite `prefers-reduced-motion` em toda animação.
- **Não mexa** em `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs` nem `tests/sites-worker.test.mjs`. Antes de qualquer entrega para o Sites, `npm run build` e `npm run test:sites` precisam passar.

## Git

- Branches: `main`, `dev`. Trabalho em `feat/*` ou `chore/*`, sempre com PR para a `dev`.
- Por ser público, nunca commite documento interno, `.env`, dado de cliente, preço ou informação de negócio. Os docs internos já estão no `.gitignore`; não os remova de lá.

## Execução autônoma (Hermes na VPS)

Quando o Claude Code roda sem o Igor olhando (chamado pelo Hermes, por cron ou pelo painel):

- Trabalhe numa branch nova `task/<id>-<slug>` a partir da `dev`. Nunca faça push, merge ou rebase em `main` ou `dev`. Ao terminar, abra PR para a `dev` e devolva o link.
- Se `AGENTS.md` não existir (clone novo na VPS), pare antes de qualquer mudança visual e avise: as decisões de design estão nele.
- Antes de concluir, rode `npm run build` e `npm run test:sites`. Se falhar, reporte no PR; não pule testes.
- Nunca faça deploy nem altere a configuração de hospedagem.
- Mudanças de texto da marca seguem a voz da Alma Lab (skill `alma-lab-voz`); mudança visual grande pede aprovação do Igor antes de ir para PR.
- Ao concluir, responda em até 5 linhas: o que foi feito, link do PR, resultado do build e dos testes, e o que espera decisão do Igor.
