<script setup lang="ts">
const traits = ['raw', 'curious', 'human', 'loud', 'independent', 'cultural']
</script>

<template>
  <ul class="traits" aria-label="Personalidade da marca">
    <li v-for="t in traits" :key="t">{{ t }}</li>
  </ul>
</template>
