import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useLenis, getLenis } from './lib/scroll'
import { useReducedMotion } from './lib/useReducedMotion'
import { Nav } from './components/Nav'
import { BackgroundFX } from './components/BackgroundFX'
import { MagneticButton } from './components/MagneticButton'
import { AuthorityStrip } from './sections/AuthorityStrip'
import { Dualidade } from './sections/Dualidade'
import { AppVantagens } from './sections/AppVantagens'
import { Carteira } from './sections/Carteira'
import { ComoFunciona } from './sections/ComoFunciona'
import { B2B } from './sections/B2B'
import { Comparativo } from './sections/Comparativo'
import { ProvaSocial } from './sections/ProvaSocial'
import { FAQ } from './sections/FAQ'
import { Contato } from './sections/Contato'
import { Fechamento } from './sections/Fechamento'
import { Footer } from './sections/Footer'

const HeroScene = lazy(() => import('./three/HeroScene').then((m) => ({ default: m.HeroScene })))

export default function App() {
  useLenis()
  const reduced = useReducedMotion()
  const [revealed, setRevealed] = useState(false)
  const startedRef = useRef(false)

  // Revela assim que o X 3D termina de voar para a posição.
  const onHeroReady = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true
    window.setTimeout(() => setRevealed(true), reduced ? 200 : 1750)
  }, [reduced])

  // Trava o scroll até a revelação (com fallback de segurança).
  useEffect(() => {
    const lenis = getLenis()
    if (!revealed) {
      lenis?.stop()
      const safety = window.setTimeout(() => setRevealed(true), 4500)
      return () => window.clearTimeout(safety)
    }
    lenis?.start()
  }, [revealed])

  // Reveal puramente via CSS (compositor) — não compete com o loop do three.js.
  const rs = (delay: number) => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'translateY(0)' : 'translateY(26px)',
    transition: `opacity 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
    willChange: 'opacity, transform',
  })

  return (
    <>
      <BackgroundFX />
      <Nav revealed={revealed} />

      <main id="top" className="relative text-white">
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0">
            <Suspense fallback={null}>
              <HeroScene onReady={onHeroReady} />
            </Suspense>
          </div>

          <div className="pointer-events-none relative z-10 flex flex-col items-center text-center">
            <div className="mt-[56vh]" />
            <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl" style={rs(0)}>
              Cashback e vantagens
              <br />
              <span className="volt-gradient-text">em cada parada</span>
            </h1>
            <p
              className="mt-5 max-w-md font-display text-base font-medium text-volt-fog sm:text-lg"
              style={rs(0.12)}
            >
              Combustível e recarga elétrica num só app de vantagens.
            </p>
            <div className="pointer-events-auto mt-8" style={rs(0.24)}>
              <MagneticButton href="#parceiro">Seja um parceiro</MagneticButton>
            </div>
          </div>
        </section>

        <AuthorityStrip />
        <Dualidade />
        <AppVantagens />
        <Carteira />
        <ComoFunciona />
        <B2B />
        <Comparativo />
        <ProvaSocial />
        <FAQ />
        <Contato />
        <Fechamento />
        <Footer />
      </main>
    </>
  )
}
