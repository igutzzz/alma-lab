<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-row">
      <span>IDEIAS PRECISAM DE ALMA.</span>
      <span>© {{ year }} ALMA LAB</span>
      <a class="footer-top" href="#inicio">Voltar ao topo ↑</a>
    </div>
    <a class="footer-mark" href="#inicio" aria-label="Alma Lab, voltar ao início">alma lab.</a>
  </footer>
</template>
