<script setup lang="ts">
import type { ProjectVisual } from '../model/types'

defineProps<{ kind: ProjectVisual }>()
</script>

<template>
  <img v-if="kind === 'brand'" src="/assets/brand-cover.jpg" alt="Identidade Alma Lab em ferrugem, papel e azul">
  <div v-else-if="kind === 'image'" class="image-preview">
    <img src="/assets/identity.jpg" alt="Composição original da identidade Alma Lab">
    <span>MATÉRIA &amp; COR / EXPLORAÇÃO</span>
  </div>
  <div v-else-if="kind === 'motion'" class="motion-preview">
    <small>STORYBOARD / 3 MOMENTOS</small>
    <strong>ideias<br>ganham<br><em>movimento.</em></strong>
    <div>01. SENTIR <span>02. CRIAR</span> 03. MOVER</div>
  </div>
  <div v-else-if="kind === 'landing'" class="landing-preview">
    <div class="mini-nav">rua.<span>ESPAÇO · CULTURA · ENCONTRO</span></div>
    <strong>A cultura<br>mora aqui.</strong>
    <p>Um espaço aberto para o que ainda não existe.</p>
    <div class="mini-bottom">PROGRAMAÇÃO INDEPENDENTE <span>OUT / 2026</span></div>
  </div>
  <div v-else-if="kind === 'dashboard'" class="ui-preview">
    <aside>pulso.<br><small>Visão geral<br>Projetos<br>Equipe</small></aside>
    <div>
      <small>ÁREA DE TRABALHO / DEMONSTRAÇÃO</small>
      <h3>Bom dia, equipe.</h3>
      <p>O que move a semana.</p>
      <div class="stats">
        <span><b>08</b>Em andamento</span>
        <span><b>03</b>Em revisão</span>
      </div>
      <div class="task-row">Identidade visual <i>Em revisão</i></div>
      <div class="task-row">Nova página <i>Em produção</i></div>
      <div class="task-row">Campanha editorial <i>Planejado</i></div>
    </div>
  </div>
  <div v-else class="agenda-preview">
    <div class="mini-nav">hora.<span>CONCEITO DE SISTEMA</span></div>
    <h3>Espaço na agenda.<br>Clareza na rotina.</h3>
    <div class="days">SEG <span>TER</span><b>QUA</b><span>QUI</span> SEX</div>
    <div class="appointment">09:00 <b>Alinhamento criativo</b><span>Equipe de design</span></div>
    <div class="appointment">14:30 <b>Apresentação de projeto</b><span>Sala 02 · demonstração</span></div>
  </div>
</template>
