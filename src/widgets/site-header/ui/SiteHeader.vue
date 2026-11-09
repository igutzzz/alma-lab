<script setup lang="ts">
import { ref } from 'vue'

const menu = ref(false)
const close = () => (menu.value = false)
</script>

<template>
  <header>
    <a class="wordmark" href="#inicio" aria-label="Alma Lab, início">alma lab.</a>
    <nav id="main-menu" aria-label="Principal" :class="menu ? 'is-open' : ''">
      <a href="#projetos" @click="close">Projetos</a>
      <a href="#servicos" @click="close">O que fazemos</a>
      <a href="#sobre" @click="close">O estúdio</a>
      <a href="#orcamento" class="nav-cta" @click="close">Vamos criar <span>↗</span></a>
    </nav>
    <button class="menu-toggle" :aria-expanded="menu" aria-controls="main-menu" @click="menu = !menu">{{ menu ? 'Fechar' : 'Menu' }}</button>
    <span id="mobile-note" hidden>Menu principal</span>
  </header>
</template>
