import tailwindcss from '@tailwindcss/vite'

// Feature-Sliced Design: src/{app,pages,widgets,features,entities,shared}.
// Nuxt routes live in src/routes so they don't collide with the FSD `pages` layer.
export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  srcDir: 'src',
  dir: {
    pages: 'routes',
  },
  // FSD imports go through each slice's public API (index.ts), never auto-imports.
  components: [],
  imports: { autoImport: false },
  css: ['~/app/styles/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Alma Lab — ideias precisam de alma.',
      meta: [
        { name: 'theme-color', content: '#f0e6d2' },
        {
          name: 'description',
          content:
            'Alma Lab: design com personalidade, sites, experiências digitais e conteúdo visual. Conheça o trabalho e prepare seu briefing.',
        },
      ],
    },
  },
  nitro: {
    preset: 'static',
    output: { publicDir: 'dist/client' },
  },
  devtools: { enabled: false },
  devServer: { host: '127.0.0.1', port: 4173 },
  vite: {
    plugins: [tailwindcss()],
  },
})
