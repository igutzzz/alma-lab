<script setup lang="ts">
import { BriefForm } from '~/features/prepare-brief'
import { contact } from '~/shared/config'
</script>

<template>
  <section id="orcamento" class="contact section">
    <div class="brief-grid">
      <div>
        <h2>Vamos dar<br>forma à sua<br>próxima ideia?</h2>
        <p>Pode ser um começo, uma mudança ou uma ideia ainda solta.<br>Conte o contexto. Vamos partir dele.</p>
        <p v-if="contact.email" class="contact-note">Contato: <a :href="`mailto:${contact.email}`">{{ contact.email }}</a></p>
        <p v-else class="contact-note">O contato direto estará disponível em breve. Enquanto isso, organize sua ideia em um briefing e leve o texto com você.</p>
      </div>
      <BriefForm />
    </div>
  </section>
</template>
