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
      // The intro counter is the first thing on screen; don't let it render in a fallback face.
      link: [{ rel: 'preload', href: '/assets/AlteHaasGroteskBold.ttf', as: 'font', type: 'font/ttf', crossorigin: '' }],
      // Intro counter plays once per session; later visits skip it and the hero delay.
      script: [
        {
          innerHTML:
            "try{sessionStorage.getItem('alma-intro')?document.head.insertAdjacentHTML('beforeend','<style>.intro{display:none}:root{--intro-delay:0s}</style>'):sessionStorage.setItem('alma-intro','1')}catch(e){}",
          tagPosition: 'head',
        },
      ],
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
