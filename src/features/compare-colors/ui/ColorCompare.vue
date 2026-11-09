<script setup lang="ts">
import { ref } from 'vue'

const amount = ref(50)
</script>

<template>
  <div class="compare">
    <img src="/assets/identity.jpg" alt="Identidade em cores">
    <img class="gray" :style="{ clipPath: `inset(0 ${100 - amount}% 0 0)` }" src="/assets/identity.jpg" alt="Versão dessaturada">
  </div>
  <label class="slider-label">Dessaturado / original<input
    type="range"
    min="0"
    max="100"
    :value="amount"
    aria-label="Proporção da imagem dessaturada"
    @input="amount = Number(($event.target as HTMLInputElement).value)"
  ></label>
</template>
