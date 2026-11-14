<script setup lang="ts">
import HalftoneFlower from './HalftoneFlower.vue'
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero-top">
      <span>CREATIVE STUDIO FOR CREATIVES</span>
      <span>BRAND / DIGITAL / VISUAL</span>
    </div>
    <div class="hero-main">
      <h1 aria-label="Ideias precisam de alma.">
        <span class="title-line" aria-hidden="true"><span>Ideias</span></span>
        <span class="title-line" aria-hidden="true"><span>precisam</span></span>
        <span class="title-line" aria-hidden="true"><span>de <em>alma.</em></span></span>
      </h1>
      <HalftoneFlower />
    </div>
    <div class="hero-bottom">
      <p>Identidade, site e imagem feitos pelas mesmas mãos,<br>do primeiro rascunho ao arquivo final.<br><b>Com opinião em cada etapa.</b></p>
      <a class="button dark" href="#projetos">Ver os projetos <span>↘</span></a>
    </div>
  </section>
</template>
