<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ n: string; title: string; tag: string; desc: string }>()
const open = ref(false)
</script>

<template>
  <div :class="`service ${open ? 'expanded' : ''}`">
    <h3>
      <button :id="`trigger-${n}`" class="service-trigger" :aria-expanded="open" :aria-controls="`service-${n}`" @click="open = !open">
        <span class="service-title">{{ title }}</span>
        <span class="service-tag">{{ tag }}</span>
        <span class="plus" aria-hidden="true">+</span>
      </button>
    </h3>
    <div :id="`service-${n}`" class="service-panel" role="region" :aria-labelledby="`trigger-${n}`" :aria-hidden="!open" :inert="!open">
      <div class="service-panel-inner">
        <div class="service-copy">
          <p>{{ desc }}</p>
          <a href="#orcamento">Vamos definir o escopo <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  </div>
</template>
