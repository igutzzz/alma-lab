<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { prefersReducedMotion } from '~/shared/lib'

const canvas = ref<HTMLCanvasElement>()
const ready = ref(false)
let cleanup = () => {}

const RADIUS = 120 // cursor influence
const PUSH = 2.2
const TILT = (-8 * Math.PI) / 180

type Dot = { x: number; y: number; s: number; ox: number; oy: number; vx: number; vy: number }

onMounted(() => {
  const c = canvas.value!
  const ctx = c.getContext('2d')
  if (!ctx) return
  const img = new Image()
  img.src = '/assets/symbol-cutout.webp'
  let dots: Dot[] = []
  let width = 0
  let dpr = 1
  let frame = 0
  let px = -1e4
  let step = 9 // css px between bitmap dots, scaled to the canvas in sample()
  let py = -1e4
  const color = getComputedStyle(c).color

  const sample = () => {
    width = c.clientWidth
    if (!width) return
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = c.height = Math.round(width * dpr)
    step = Math.max(5, width / 92)
    const n = Math.floor(width / step)
    if (n < 2) return
    const off = document.createElement('canvas')
    off.width = off.height = n
    const o = off.getContext('2d', { willReadFrequently: true })!
    // Bake the brand's -8° tilt into the sampling so pointer math stays unrotated.
    o.translate(n / 2, n / 2)
    o.rotate(TILT)
    o.drawImage(img, -n / 2, -n / 2, n, n)
    const data = o.getImageData(0, 0, n, n).data
    dots = []
    for (let j = 0; j < n; j++)
      for (let i = 0; i < n; i++) {
        const k = (j * n + i) * 4
        const alpha = data[k + 3] / 255
        const lum = (data[k] + data[k + 1] + data[k + 2]) / 765
        const v = alpha * Math.min(1, (1 - lum) * 1.25)
        if (v < 0.12) continue
        dots.push({ x: (i + 0.5) * step, y: (j + 0.5) * step, s: step * (0.35 + v * 0.62), ox: 0, oy: 0, vx: 0, vy: 0 })
      }
    draw()
  }

  const draw = () => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, width, width)
    ctx.fillStyle = color
    for (const d of dots) ctx.fillRect(d.x + d.ox - d.s / 2, d.y + d.oy - d.s / 2, d.s, d.s)
  }

  const tick = () => {
    let moving = false
    for (const d of dots) {
      const dx = d.x + d.ox - px
      const dy = d.y + d.oy - py
      const dist = Math.hypot(dx, dy)
      if (dist < RADIUS && dist > 0.01) {
        const f = (1 - dist / RADIUS) * PUSH
        d.vx += (dx / dist) * f
        d.vy += (dy / dist) * f
      }
      d.vx = (d.vx - d.ox * 0.06) * 0.84
      d.vy = (d.vy - d.oy * 0.06) * 0.84
      d.ox += d.vx
      d.oy += d.vy
      if (Math.abs(d.ox) + Math.abs(d.oy) + Math.abs(d.vx) > 0.05) moving = true
    }
    draw()
    frame = moving || px > -1e3 ? requestAnimationFrame(tick) : 0
  }

  const onMove = (e: PointerEvent) => {
    const r = c.getBoundingClientRect()
    const inside = e.clientX > r.left - RADIUS && e.clientX < r.right + RADIUS && e.clientY > r.top - RADIUS && e.clientY < r.bottom + RADIUS
    px = inside ? e.clientX - r.left : -1e4
    py = inside ? e.clientY - r.top : -1e4
    if (inside && !frame) frame = requestAnimationFrame(tick)
  }
  const onLeave = () => (px = py = -1e4)

  let resizeFrame = 0
  const onResize = () => {
    cancelAnimationFrame(resizeFrame)
    resizeFrame = requestAnimationFrame(sample)
  }

  img.onload = () => {
    sample()
    ready.value = true
    window.addEventListener('resize', onResize)
    if (prefersReducedMotion()) return
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
  }

  cleanup = () => {
    cancelAnimationFrame(frame)
    cancelAnimationFrame(resizeFrame)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerleave', onLeave)
  }
})

onBeforeUnmount(() => cleanup())
</script>

<template>
  <figure :class="`halftone ${ready ? 'is-ready' : ''}`">
    <img src="/assets/symbol-cutout.webp" width="1080" height="1080" alt="Símbolo azul de seis pétalas da Alma Lab">
    <canvas ref="canvas" aria-hidden="true" />
  </figure>
</template>
