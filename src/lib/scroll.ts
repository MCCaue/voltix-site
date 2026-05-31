import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Progresso de scroll global (0..1) — lido pelo loop do R3F via useFrame. */
export const scrollState = { progress: 0, velocity: 0 }

let lenis: Lenis | null = null

/** Inicializa Lenis + ScrollTrigger uma única vez. */
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    })

    const onScroll = (e: { scroll: number; limit: number; velocity: number }) => {
      const limit = e.limit || 1
      scrollState.progress = Math.min(1, Math.max(0, e.scroll / limit))
      scrollState.velocity = e.velocity
      document.documentElement.style.setProperty('--scroll', String(scrollState.progress))
      ScrollTrigger.update()
    }
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    if (import.meta.env.DEV) (window as unknown as { __lenis?: Lenis }).__lenis = lenis

    return () => {
      gsap.ticker.remove(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [enabled])
}

export function getLenis() {
  return lenis
}
