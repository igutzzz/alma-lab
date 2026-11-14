<script setup lang="ts">
import { FlowerMark } from '~/shared/ui'

const traits = ['raw', 'curious', 'human', 'loud', 'independent', 'cultural']
</script>

<template>
  <div class="traits">
    <!-- Second copy only exists so the loop is seamless; screen readers get the first. -->
    <ul v-for="copy in 2" :key="copy" class="traits-track" :aria-label="copy === 1 ? 'Personalidade da marca' : undefined" :aria-hidden="copy === 2 ? 'true' : undefined">
      <li v-for="t in traits" :key="t">{{ t }}<FlowerMark /></li>
    </ul>
  </div>
</template>
