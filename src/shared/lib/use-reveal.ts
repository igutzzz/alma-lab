import { onBeforeUnmount, onMounted } from 'vue'
import { prefersReducedMotion } from './motion'

const REVEAL_SELECTOR =
  '.section-heading, .about h2, .manifesto, .author, .brief-grid>div, .service'

/** Scroll-triggered entrance for editorial blocks. Skipped under reduced motion. */
export function useReveal(): void {
  let cleanup = () => {}

  onMounted(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const animations = new Set<Animation>()
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          const animation = entry.target.animate(
            [
              { opacity: 0.25, transform: 'translateY(22px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)' },
          )
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
        }),
      { threshold: 0.12 },
    )
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observer.observe(el))

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stopAll = () => {
      observer.disconnect()
      animations.forEach((a) => a.cancel())
    }
    const stop = () => {
      if (preference.matches) stopAll()
    }
    preference.addEventListener('change', stop)
    cleanup = () => {
      stopAll()
      preference.removeEventListener('change', stop)
    }
  })

  onBeforeUnmount(() => cleanup())
}
