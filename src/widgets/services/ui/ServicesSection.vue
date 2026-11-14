<script setup lang="ts">
import ServiceItem from './ServiceItem.vue'

const services = [
  { n: '01', title: 'Design & identidade', tag: 'Uma linguagem que é sua.', desc: 'Identidade visual, direção de arte e peças de comunicação. A ideia é sua marca ser reconhecida mesmo quando o logo não aparece.' },
  { n: '02', title: 'Web & sistemas', tag: 'Do primeiro clique à rotina.', desc: 'Landing page, site institucional ou um sistema para o dia a dia da operação. Dashboard, login e integrações entram quando o projeto pede.' },
  { n: '03', title: 'Imagem & conteúdo', tag: 'Imagens com direção.', desc: 'Tratamento de imagem, peças de campanha e conteúdo para redes, com cor e composição pensadas para a foto do feed conversar com a do site.' },
  { n: '04', title: 'Vídeo & edição', tag: 'O corte também conta.', desc: 'Você manda o material bruto, a gente procura a história nele. Seleção de cenas, cortes, legendas e cor para vídeos e reels, no formato de cada plataforma.' },
]
</script>

<template>
  <section id="servicos" class="services section">
    <div class="section-heading">
      <h2>O que a<br>gente faz.</h2>
      <p>Um projeto costuma atravessar duas ou três frentes.<br>O escopo nasce do problema, <b>não de um pacote fechado.</b></p>
    </div>
    <ServiceItem v-for="s in services" :key="s.n" v-bind="s" />
  </section>
</template>
