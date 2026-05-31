import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/useReducedMotion'
import { detectTier } from '../lib/perf'

type Pt = { x: number; y: number }

function lerpColor(a: [number, number, number], b: [number, number, number], t: number) {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(a[1] + (b[1] - a[1]) * t)}, ${Math.round(
    a[2] + (b[2] - a[2]) * t,
  )})`
}
const ORANGE: [number, number, number] = [251, 104, 3]
const PURPLE: [number, number, number] = [176, 34, 221]

/** Raio fractal VERTICAL: pontas ancoradas no centro (x), crepitando ao longo de Y. */
function makeBolt(w: number, h: number, amp: number, segs: number, rnd: () => number): Pt[] {
  const midX = w / 2
  const pts: Pt[] = []
  for (let i = 0; i <= segs; i++) {
    const u = i / segs
    const env = Math.sin(Math.PI * u) // 0 nas pontas, 1 no meio
    const x = midX + (rnd() - 0.5) * amp * env + Math.sin(u * 11 + rnd()) * 1.5 * env
    pts.push({ x, y: h * u })
  }
  return pts
}

/**
 * Costura de energia em canvas: raio fractal vertical que "estala" (recalculado a
 * cada poucos frames), com ramificações laterais, glow laranja vazando da esquerda e
 * roxo da direita (as duas energias se encontrando), núcleo branco-quente, flare
 * central e partículas descendo. Vive no vão entre os dois cards.
 */
export function LightningCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const tier = detectTier()
    const dpr = Math.min(window.devicePixelRatio || 1, tier === 'low' ? 1 : 2)
    let w = 0
    let h = 0

    const ro = new ResizeObserver(() => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    })
    ro.observe(canvas)

    const rnd = Math.random
    const segs = tier === 'low' ? 12 : 20
    const particles = Array.from({ length: tier === 'low' ? 4 : 9 }, () => ({
      p: rnd(),
      speed: 0.0018 + rnd() * 0.0026,
    }))

    let bolt: Pt[] = []
    let branches: Pt[][] = []
    let frame = 0
    let raf = 0

    const strokePath = (pts: Pt[]) => {
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
      ctx.stroke()
    }

    const posAt = (pts: Pt[], p: number): Pt => {
      const f = p * (pts.length - 1)
      const i = Math.min(pts.length - 2, Math.floor(f))
      const t = f - i
      return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * t, y: pts[i].y + (pts[i + 1].y - pts[i].y) * t }
    }

    const regen = () => {
      const amp = w * 0.62
      bolt = makeBolt(w, h, amp, segs, rnd)
      branches = []
      const nb = tier === 'low' ? 1 : 3
      for (let b = 0; b < nb; b++) {
        const start = 4 + Math.floor(rnd() * (segs - 7))
        const base = bolt[start]
        const dir = rnd() > 0.5 ? -1 : 1
        const bp: Pt[] = [base]
        let bx = base.x
        let by = base.y
        const steps = 2 + Math.floor(rnd() * 3)
        for (let s = 0; s < steps; s++) {
          bx += dir * (10 + rnd() * 16)
          by += (8 + rnd() * 14) * (rnd() > 0.3 ? 1 : -0.4)
          bp.push({ x: bx, y: by })
        }
        branches.push(bp)
      }
    }

    const drawSideGlows = () => {
      // laranja vazando da esquerda
      const lg = ctx.createLinearGradient(0, 0, w, 0)
      lg.addColorStop(0, 'rgba(251,104,3,0.22)')
      lg.addColorStop(0.5, 'rgba(251,104,3,0)')
      ctx.fillStyle = lg
      ctx.fillRect(0, 0, w, h)
      // roxo vazando da direita
      const rg = ctx.createLinearGradient(0, 0, w, 0)
      rg.addColorStop(0.5, 'rgba(176,34,221,0)')
      rg.addColorStop(1, 'rgba(176,34,221,0.24)')
      ctx.fillStyle = rg
      ctx.fillRect(0, 0, w, h)
    }

    const drawBolt = (flick: number) => {
      ctx.clearRect(0, 0, w, h)
      if (w === 0) return
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      drawSideGlows()

      // gradiente vertical laranja→roxo com pontas dissipando
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, 'rgba(251,104,3,0)')
      grad.addColorStop(0.16, 'rgba(251,104,3,1)')
      grad.addColorStop(0.5, 'rgba(255,228,188,1)')
      grad.addColorStop(0.84, 'rgba(176,34,221,1)')
      grad.addColorStop(1, 'rgba(176,34,221,0)')

      const coreGrad = ctx.createLinearGradient(0, 0, 0, h)
      coreGrad.addColorStop(0, 'rgba(255,255,255,0)')
      coreGrad.addColorStop(0.22, 'rgba(255,255,255,0.95)')
      coreGrad.addColorStop(0.78, 'rgba(255,255,255,0.95)')
      coreGrad.addColorStop(1, 'rgba(255,255,255,0)')

      const all = [bolt, ...branches]
      ctx.strokeStyle = grad
      ctx.globalAlpha = 0.16 * flick
      ctx.lineWidth = 14
      all.forEach(strokePath)
      ctx.globalAlpha = 0.5 * flick
      ctx.lineWidth = 5
      all.forEach(strokePath)
      ctx.globalAlpha = 0.85 * flick
      ctx.lineWidth = 2.4
      all.forEach(strokePath)
      ctx.strokeStyle = coreGrad
      ctx.globalAlpha = flick
      ctx.lineWidth = 1.3
      all.forEach(strokePath)

      // flare central
      const c = posAt(bolt, 0.5)
      const flare = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 30)
      flare.addColorStop(0, `rgba(255,245,230,${0.85 * flick})`)
      flare.addColorStop(0.45, `rgba(255,150,80,${0.35 * flick})`)
      flare.addColorStop(1, 'rgba(176,34,221,0)')
      ctx.fillStyle = flare
      ctx.beginPath()
      ctx.arc(c.x, c.y, 30, 0, Math.PI * 2)
      ctx.fill()

      // partículas descendo (laranja → roxo)
      for (const pt of particles) {
        const at = posAt(bolt, pt.p)
        const col = lerpColor(ORANGE, PURPLE, pt.p)
        ctx.globalAlpha = 0.95
        ctx.fillStyle = col
        ctx.beginPath()
        ctx.arc(at.x, at.y, 2.3, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 0.25
        ctx.beginPath()
        ctx.arc(at.x, at.y, 6, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
    }

    if (reduced) {
      const ro2 = new ResizeObserver(() => {
        const r = canvas.getBoundingClientRect()
        w = r.width
        h = r.height
        canvas.width = Math.max(1, Math.floor(w * dpr))
        canvas.height = Math.max(1, Math.floor(h * dpr))
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        regen()
        drawBolt(1)
      })
      ro2.observe(canvas)
      return () => {
        ro.disconnect()
        ro2.disconnect()
      }
    }

    const loop = () => {
      frame++
      if (frame % 4 === 0 || bolt.length === 0) regen()
      const flick = 0.72 + Math.abs(Math.sin(frame * 0.6)) * 0.28
      for (const pt of particles) {
        pt.p += pt.speed * 4
        if (pt.p > 1) pt.p -= 1
      }
      drawBolt(flick)
      raf = requestAnimationFrame(loop)
    }

    // Pausa o loop quando a aba fica em segundo plano (economiza CPU/bateria).
    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(loop)
    }
    document.addEventListener('visibilitychange', onVis)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduced])

  return <canvas ref={ref} className={className} aria-hidden />
}
