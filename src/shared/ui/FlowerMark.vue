<template>
  <svg class="flower-mark" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <ellipse v-for="k in 6" :key="k" cx="50" cy="27" rx="12" ry="23" :transform="`rotate(${k * 60} 50 50)`" />
  </svg>
</template>
