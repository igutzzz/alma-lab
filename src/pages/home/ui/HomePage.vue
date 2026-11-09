<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '~/entities/project'
import { useReveal } from '~/shared/lib'
import { AboutSection } from '~/widgets/about'
import { CaseDialog } from '~/widgets/case-dialog'
import { ContactSection } from '~/widgets/contact'
import { HeroSection } from '~/widgets/hero'
import { ProjectsGallery } from '~/widgets/projects-gallery'
import { ServicesSection } from '~/widgets/services'
import { SiteFooter } from '~/widgets/site-footer'
import { SiteHeader } from '~/widgets/site-header'
import { TraitsBand } from '~/widgets/traits'

const selected = ref<Project | null>(null)
useReveal()
</script>

<template>
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>
  <SiteHeader />
  <main id="conteudo">
    <HeroSection />
    <TraitsBand />
    <ProjectsGallery @select="selected = $event" />
    <ServicesSection />
    <AboutSection />
    <ContactSection />
  </main>
  <SiteFooter />
  <CaseDialog v-if="selected" :project="selected" @close="selected = null" />
</template>
