<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { ProjectPreview, projects, type Project } from '~/entities/project'
import { ProjectFilters, filterProjects, type ProjectArea } from '~/features/filter-projects'
import { prefersReducedMotion } from '~/shared/lib'

const emit = defineEmits<{ select: [project: Project] }>()

const filter = ref<ProjectArea>('Todos')
const displayFilter = ref<ProjectArea>('Todos')
const filtering = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const visible = computed(() => filterProjects(projects, displayFilter.value))

function changeFilter(area: ProjectArea) {
  filter.value = area
  clearTimeout(timer)
  if (prefersReducedMotion()) {
    displayFilter.value = area
    filtering.value = false
    return
  }
  filtering.value = true
  timer = setTimeout(() => {
    displayFilter.value = area
    filtering.value = false
  }, 150)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <section id="projetos" class="projects section">
    <div class="section-heading">
      <div><h2>Do nosso<br>universo.</h2></div>
      <p>Identidades, interfaces e experimentos.<br>Veja como uma intenção se transforma<br>em escolhas de design.</p>
    </div>
    <ProjectFilters :active="filter" @change="changeFilter" />
    <p class="sr-only" role="status">{{ visible.length }} projetos em {{ displayFilter.toLowerCase() }}</p>
    <!-- Keyed by filter so the grid remounts and the card entrance replays. -->
    <div
      :key="displayFilter"
      :class="`project-grid ${displayFilter === 'Todos' ? 'is-all' : ''} ${filtering ? 'is-filtering' : ''}`"
    >
      <article v-for="(p, i) in visible" :key="p.id" :class="`project project--${p.visual}`" :style="{ '--order': i }">
        <button class="project-link" :aria-label="`Ver projeto ${p.title}`" @click="emit('select', p)">
          <div class="project-image"><ProjectPreview :kind="p.visual" /></div>
          <div class="project-info">
            <div class="project-meta">
              <span>{{ p.category }} / {{ p.type }}</span>
              <span class="project-index">/{{ p.year }}</span>
            </div>
            <h3>{{ p.title }}</h3>
            <p class="project-subtitle">{{ p.subtitle }}</p>
          </div>
        </button>
      </article>
    </div>
    <p class="gallery-note">Trabalhos da marca e estudos independentes, identificados em cada projeto. Conceitos apresentados sem vínculo com clientes.</p>
  </section>
</template>
