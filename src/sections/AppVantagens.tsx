import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { PhoneMockup } from '../components/PhoneMockup'
import { GlossyTile, IconQr, IconCashback, IconPump } from '../components/icons'
import { useReducedMotion } from '../lib/useReducedMotion'

const momentos = [
  {
    n: '01',
    tone: 'orange' as const,
    Icon: IconPump,
    titulo: 'Escolha como abastecer',
    texto: 'Um valor em reais ou encher o tanque. Você decide direto no app, em segundos.',
  },
  {
    n: '02',
    tone: 'purple' as const,
    Icon: IconQr,
    titulo: 'Libere a bomba',
    texto: 'Leia o QR Code ou digite o código da bomba. O app valida o posto e libera o pagamento.',
  },
  {
    n: '03',
    tone: 'orange' as const,
    Icon: IconCashback,
    titulo: 'Ganhe de volta',
    texto: 'Confirmou o pagamento, ganhou. Cashback, cupons e pontos caem na carteira na hora.',
  },
]

export function AppVantagens() {
  const reduced = useReducedMotion()
  return (
    <section id="app" className="relative mx-auto max-w-[1180px] px-6 py-28 sm:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* mockup + órbita */}
        <div className="relative flex justify-center">
          <motion.div
            animate={reduced ? undefined : { y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <PhoneMockup />
          </motion.div>

          {/* ícones glossy orbitando */}
          {[
            { top: '4%', left: '6%', tone: 'orange' as const, I: IconPump, d: 0 },
            { top: '14%', right: '2%', tone: 'purple' as const, I: IconCashback, d: 0.6 },
            { bottom: '10%', left: '0%', tone: 'purple' as const, I: IconQr, d: 1.2 },
          ].map((o, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: o.top, left: o.left, right: o.right, bottom: o.bottom }}
              animate={reduced ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: o.d }}
            >
              <GlossyTile tone={o.tone} className="h-14 w-14">
                <o.I size={24} />
              </GlossyTile>
            </motion.div>
          ))}
        </div>

        {/* texto + 3 momentos */}
        <div>
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-volt-purple-bright">
              O app de vantagens
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Três toques entre
              <br />
              <span className="volt-gradient-text">a parada e o prêmio</span>
            </h2>
          </Reveal>

          <ol className="mt-10 space-y-8">
            {momentos.map((m, i) => (
              <Reveal as="li" key={m.n} delay={i * 0.1} className="flex gap-5">
                <GlossyTile tone={m.tone} className="h-14 w-14 shrink-0">
                  <m.Icon size={24} />
                </GlossyTile>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xs font-bold text-white/40">{m.n}</span>
                    <h3 className="font-display text-lg font-bold text-white">{m.titulo}</h3>
                  </div>
                  <p className="mt-1 text-sm text-volt-fog">{m.texto}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
