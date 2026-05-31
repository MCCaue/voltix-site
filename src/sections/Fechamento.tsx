import { lazy, Suspense } from 'react'
import { Reveal } from '../components/Reveal'
import { MagneticButton } from '../components/MagneticButton'
import { whatsappLink } from '../lib/contact'

const CtaScene = lazy(() => import('../three/CtaScene').then((m) => ({ default: m.CtaScene })))

export function Fechamento() {
  return (
    <section
      aria-label="Comece com a Voltix"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6 py-28"
    >
      {/* X 3D — o herói volta para fechar o site */}
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>
          <CtaScene />
        </Suspense>
      </div>
      {/* glow + scrim para legibilidade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 45%, rgba(176,34,221,0.22), transparent 70%), radial-gradient(45% 40% at 50% 50%, rgba(251,104,3,0.16), transparent 70%), radial-gradient(80% 80% at 50% 50%, transparent 40%, rgba(4,2,8,0.65) 100%)',
        }}
      />

      <div className="relative z-10 text-center">
        <Reveal y={20}>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-volt-orange-bright [text-shadow:0_2px_16px_rgba(8,4,15,0.8)]">
            Chegou a Voltix
          </p>
        </Reveal>
        <Reveal delay={0.1} y={24}>
          <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-black leading-[0.98] tracking-tight [text-shadow:0_4px_30px_rgba(8,4,15,0.7)] sm:text-7xl">
            Transforme cada parada
            <br />
            <span className="volt-gradient-text">em fidelidade</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2} y={20}>
          <p className="mx-auto mt-7 max-w-xl text-lg font-medium text-white/90 [text-shadow:0_2px_18px_rgba(8,4,15,0.85)]">
            Combustível, recarga e recompensa numa plataforma só. Coloque o seu posto na próxima era do
            abastecimento, hoje.
          </p>
        </Reveal>
        <Reveal delay={0.3} y={20} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton href={whatsappLink('Olá! Quero levar a Voltix para o meu posto. Vamos conversar?')}>
            Falar no WhatsApp agora
          </MagneticButton>
          <MagneticButton href="#parceiro" variant="ghost">
            Deixar meus dados
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
