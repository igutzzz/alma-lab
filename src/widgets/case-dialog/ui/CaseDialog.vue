<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ProjectPreview, type Project } from '~/entities/project'
import { ColorCompare } from '~/features/compare-colors'
import { prefersReducedMotion } from '~/shared/lib'

defineProps<{ project: Project }>()
const emit = defineEmits<{ close: [] }>()

const dialog = ref<HTMLDialogElement>()
const closing = ref(false)
// Captured at creation: the card that opened the case gets focus back on close.
const opener = document.activeElement as HTMLElement | null
let closeTimer: ReturnType<typeof setTimeout> | undefined
let isClosing = false
let goingToBrief = false
let previousOverflow = ''

function close(toBrief = false) {
  if (isClosing) return
  isClosing = true
  goingToBrief = toBrief
  const finish = () => {
    dialog.value?.close()
    emit('close')
    if (toBrief) {
      const section = document.getElementById('orcamento')!
      section.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth' })
      section.querySelector('input')?.focus({ preventScroll: true })
    }
  }
  if (prefersReducedMotion()) {
    finish()
    return
  }
  closing.value = true
  closeTimer = setTimeout(finish, 220)
}

function onClick(e: MouseEvent) {
  if (e.target === dialog.value) close()
}

onMounted(() => {
  dialog.value!.showModal()
  previousOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  clearTimeout(closeTimer)
  document.body.style.overflow = previousOverflow
  if (!goingToBrief) opener?.focus({ preventScroll: true })
})
</script>

<template>
  <dialog ref="dialog" :class="closing ? 'is-closing' : 'is-entering'" aria-labelledby="case-title" @cancel.prevent="close()" @click="onClick">
    <button class="close" autofocus @click="close()">Fechar ×</button>
    <div class="case-content">
      <p class="eyebrow">{{ project.category }} / {{ project.type }}</p>
      <h2 id="case-title">{{ project.title }}</h2>
      <p class="case-subtitle">{{ project.subtitle }}</p>
      <div class="case-visual">
        <ColorCompare v-if="project.visual === 'image'" />
        <ProjectPreview v-else :kind="project.visual" />
      </div>
      <div class="case-columns">
        <section>
          <h3>O ponto de partida</h3>
          <p>{{ project.challenge }}</p>
        </section>
        <section>
          <h3>A direção</h3>
          <p>{{ project.solution }}</p>
        </section>
      </div>
      <p class="scope">{{ project.scope.join(' / ') }}</p>
      <p class="case-note">{{ project.note }}</p>
      <button class="button dark" @click="close(true)">Tenho um projeto nessa direção <span>↗</span></button>
    </div>
  </dialog>
</template>
