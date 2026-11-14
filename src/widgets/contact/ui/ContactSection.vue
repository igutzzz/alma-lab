<script setup lang="ts">
import { BriefForm } from '~/features/prepare-brief'
import { contact } from '~/shared/config'
</script>

<template>
  <section id="orcamento" class="contact section">
    <div class="brief-grid">
      <div>
        <h2>Por onde<br>a gente<br>começa?</h2>
        <p>Marca nova, site que envelheceu ou só uma vontade sem forma.<br>Qualquer ponto de partida serve. Conte o contexto.</p>
        <p v-if="contact.email" class="contact-note">Contato: <a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p>
        <p v-else class="contact-note">O e-mail do estúdio ainda não está no ar. Enquanto isso, monte seu briefing aqui e guarde o texto.</p>
      </div>
      <BriefForm />
    </div>
  </section>
</template>
