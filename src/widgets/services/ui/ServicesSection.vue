<script setup lang="ts">
import ServiceItem from './ServiceItem.vue'

const services = [
  { n: '01', title: 'Design & identidade', tag: 'Uma linguagem que é sua.', desc: 'Da ideia central às aplicações: identidade visual, direção de arte e peças de comunicação que mantêm sua marca reconhecível em cada ponto de contato.' },
  { n: '02', title: 'Web & sistemas', tag: 'Do primeiro clique à rotina.', desc: 'Landing pages para apresentar sua oferta, sites para organizar seu conteúdo e sistemas para facilitar a operação. Dashboards, autenticação e integrações são definidos conforme o projeto.' },
  { n: '03', title: 'Imagem & conteúdo', tag: 'Imagens com direção.', desc: 'Cor, composição e acabamento a serviço da mensagem. Tratamento de imagens, peças de campanha e conteúdo visual com consistência entre formatos.' },
  { n: '04', title: 'Vídeo & edição', tag: 'O corte também conta.', desc: 'Seu material ganha estrutura, ritmo e intenção. Edição de vídeos e reels com seleção de cenas, cortes, legendas e ajustes de cor, respeitando a história e o formato.' },
]
</script>

<template>
  <section id="servicos" class="services section">
    <div class="section-heading">
      <h2>Da essência<br>à experiência.</h2>
      <p>Um projeto costuma atravessar duas ou três frentes.<br>O escopo nasce do problema, <b>não de um pacote fechado.</b></p>
    </div>
    <ServiceItem v-for="s in services" :key="s.n" v-bind="s" />
  </section>
</template>
