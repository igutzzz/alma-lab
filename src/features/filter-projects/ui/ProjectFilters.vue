<script setup lang="ts">
import { projects } from '~/entities/project'
import { areas, filterProjects, type ProjectArea } from '../model/areas'

defineProps<{ active: ProjectArea }>()
const emit = defineEmits<{ change: [area: ProjectArea] }>()
</script>

<template>
  <div class="filters" aria-label="Filtrar projetos por área">
    <button
      v-for="a in areas"
      :key="a"
      :aria-pressed="active === a"
      :class="active === a ? 'active' : ''"
      @click="emit('change', a)"
    >{{ a }}<sup>{{ filterProjects(projects, a).length }}</sup></button>
  </div>
</template>
