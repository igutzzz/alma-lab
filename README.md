# Alma Lab

Site-portfólio da Alma Lab, estúdio criativo independente de design, web e conteúdo visual.

**Stack:** [Nuxt 4](https://nuxt.com) · Vue 3 · Tailwind CSS v4 · [Feature-Sliced Design](https://feature-sliced.design). O site é gerado de forma estática.

## Executar

```sh
npm install
npm run dev        # http://127.0.0.1:4173
npm run build      # site estático em dist/client + pacote Sites
npm run test:sites
```

## Estrutura (FSD)

```
src/
  app.vue                 raiz do Nuxt (só <NuxtPage />)
  routes/                 rotas do Nuxt (dir.pages), finas: só montam uma page FSD
  app/styles/             estilos globais: main.css (Tailwind) + site.css (visual do site)
  pages/home/             página inicial: compõe os widgets
  widgets/                blocos da página: site-header, hero, traits, projects-gallery,
                          services, about, contact, site-footer, case-dialog
  features/               interações: filter-projects, compare-colors, prepare-brief
  entities/project/       modelo, dados e prévia visual dos projetos
  shared/                 config (contato) e lib (movimento reduzido, reveal ao rolar)
```

Regras: cada slice expõe sua API pública em `index.ts` e só importa de camadas abaixo
(`pages → widgets → features → entities → shared`). Auto-imports do Nuxt estão desligados
para manter os imports explícitos.

### Estilos

`site.css` mantém o visual atual sem alterações. O Tailwind entra **sem preflight** (o reset
mudaria o visual). As cores e fontes da marca estão expostas como tokens (`bg-paper`,
`text-rust`, `font-display`, `font-mono`…). Como `site.css` fica fora de camadas, ele vence
os utilitários num mesmo elemento. Para componentes novos, prefira utilitários.

## Editar conteúdo

- Projetos: `src/entities/project/model/projects.ts`
- Contato: `src/shared/config/contact.ts`. Com `email` preenchido, aparecem o contato e o botão "Abrir no e-mail".

Nenhum dado do formulário de briefing é enviado a servidor.

## Licença

Código sob [MIT](LICENSE). Nome, marca, símbolo, imagens e textos da Alma Lab são de uso reservado. Detalhes em `LICENSE`.
