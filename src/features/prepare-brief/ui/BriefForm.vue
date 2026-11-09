<script setup lang="ts">
import { ref } from 'vue'
import { contact } from '~/shared/config'
import { buildBrief, downloadBrief } from '../lib/build-brief'

const brief = ref('')
const status = ref('')

function generate(e: Event) {
  brief.value = buildBrief(new FormData(e.currentTarget as HTMLFormElement))
  status.value = 'Briefing preparado. Nenhuma informação foi enviada.'
}

function invalidate() {
  if (!brief.value) return
  brief.value = ''
  status.value = 'Você alterou o projeto. Prepare o briefing novamente.'
}

async function copy() {
  try {
    await navigator.clipboard.writeText(brief.value)
    status.value = 'Briefing copiado. Você pode compartilhar pelo canal de sua preferência.'
  } catch {
    status.value = 'Não foi possível copiar automaticamente. Selecione o texto abaixo ou baixe o arquivo.'
  }
}

function download() {
  downloadBrief(brief.value)
  status.value = 'Download solicitado. Nenhuma informação foi enviada.'
}

const mailto = () =>
  `mailto:${contact.email}?subject=Projeto%20para%20Alma%20Lab&body=${encodeURIComponent(brief.value)}`
</script>

<template>
  <form @submit.prevent="generate" @input="invalidate">
    <div class="form-pair">
      <label>Seu nome<input name="name" autocomplete="name" required placeholder="Como podemos chamar você?" maxlength="100"></label>
      <label>Seu e-mail<input name="email" type="email" autocomplete="email" required placeholder="voce@exemplo.com"></label>
    </div>
    <label>O que vamos criar?<select name="service">
      <option>Design e identidade visual</option>
      <option>Landing page ou site</option>
      <option>Dashboard ou sistema web</option>
      <option>Edição de imagem</option>
      <option>Edição de vídeo</option>
      <option>Ainda quero descobrir</option>
    </select></label>
    <div class="form-pair">
      <label>Prazo desejado<input name="deadline" placeholder="Ex.: próximo mês" maxlength="100"></label>
      <label>Investimento previsto<select name="budget">
        <option>A definir juntos</option>
        <option>Até R$ 1.500</option>
        <option>R$ 1.500 a R$ 3.000</option>
        <option>R$ 3.000 a R$ 6.000</option>
        <option>Acima de R$ 6.000</option>
      </select></label>
    </div>
    <label>Conte um pouco da ideia<textarea name="message" rows="3" required minlength="10" maxlength="4000" placeholder="O que você faz? O que precisa mudar? Há alguma referência ou entrega em mente?" /></label>
    <p class="form-note">Os dados ficam apenas nesta página. Nada é enviado ou salvo em um servidor.</p>
    <button class="button paper" type="submit">Preparar meu briefing <span>↗</span></button>
    <p role="status" class="status">{{ status }}</p>
    <div v-if="brief" class="brief-result">
      <label>Seu briefing<textarea :value="brief" readonly rows="9" /></label>
      <div class="result-actions">
        <button type="button" @click="copy">Copiar texto</button>
        <button type="button" @click="download">Baixar .txt</button>
        <a v-if="contact.email" :href="mailto()">Abrir no e-mail</a>
      </div>
    </div>
  </form>
</template>
