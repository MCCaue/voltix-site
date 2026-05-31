import { Reveal } from '../components/Reveal'
import { MagneticButton } from '../components/MagneticButton'
import { GlossyTile, IconShield, IconChart, IconBolt } from '../components/icons'
import { whatsappLink } from '../lib/contact'

const beneficios = [
  {
    I: IconShield,
    tone: 'orange' as const,
    t: 'Condição de site',
    d: 'Quem fecha pelo site garante uma condição comercial que não está na mesa em outros canais.',
  },
  {
    I: IconBolt,
    tone: 'purple' as const,
    t: 'Implementação acompanhada',
    d: 'A gente configura seu app de marca e fica do seu lado na largada, sem você se preocupar com a parte técnica.',
  },
  {
    I: IconChart,
    tone: 'orange' as const,
    t: 'Prioridade na fila',
    d: 'Pedidos vindos do site entram na frente para ativar o posto e começar a fidelizar mais rápido.',
  },
]

export function ProvaSocial() {
  return (
    <section id="oportunidade" className="relative mx-auto max-w-[1180px] px-6 py-28 sm:py-36">
      <Reveal>
        <div className="volt-glass relative overflow-hidden rounded-[40px] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 60% at 30% 20%, rgba(251,104,3,0.16), transparent 70%), radial-gradient(50% 60% at 75% 85%, rgba(176,34,221,0.18), transparent 72%)',
            }}
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-volt-orange-bright/30 bg-volt-orange/10 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-volt-orange-bright">
              <span className="volt-spark h-1.5 w-1.5 rounded-full bg-volt-orange-bright" />
              Oferta exclusiva do site
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Condição especial para
              <br />
              <span className="volt-gradient-text">quem chegou pelo site</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-volt-fog">
              Você não caiu aqui por acaso. Quem fala com a Voltix pelo site fecha em condições que a gente
              não oferece em nenhum outro canal. É a sua janela para sair na frente.
            </p>

            <div className="mt-12 grid gap-5 text-left sm:grid-cols-3">
              {beneficios.map((b, i) => (
                <Reveal key={b.t} delay={i * 0.1}>
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                    <GlossyTile tone={b.tone} className="h-12 w-12">
                      <b.I size={20} />
                    </GlossyTile>
                    <h3 className="mt-5 font-display text-base font-bold text-white">{b.t}</h3>
                    <p className="mt-2 text-sm text-volt-fog">{b.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12">
              <MagneticButton href={whatsappLink('Olá! Cheguei pela Voltix pelo site e quero garantir a condição especial para o meu posto.')}>
                Quero a condição do site
              </MagneticButton>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
