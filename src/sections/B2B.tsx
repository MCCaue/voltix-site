import { Reveal } from '../components/Reveal'
import { DashboardMockup } from '../components/DashboardMockup'
import { GlossyTile, IconChart, IconShield, IconGift } from '../components/icons'

const beneficios = [
  {
    I: IconChart,
    tone: 'purple' as const,
    t: 'Painel com BI de verdade',
    d: 'Volume, ticket médio, clientes ativos, cashback distribuído vs. resgatado. Da rede ao posto, em tempo real.',
  },
  {
    I: IconGift,
    tone: 'orange' as const,
    t: 'Você dita as regras',
    d: 'Promoções, preço, % de cashback e sorteios. Muda no painel e reflete no app na hora, sem atualizar nada.',
  },
  {
    I: IconShield,
    tone: 'purple' as const,
    t: 'App de marca própria',
    d: 'White-label: o app sai com a sua marca. A plataforma escala com você, de um posto a uma rede.',
  },
]

export function B2B() {
  return (
    <section id="posto" className="relative mx-auto max-w-[1180px] px-6 py-28 sm:py-36">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-volt-purple-bright">
              Para o dono do posto
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              A Voltix chegou
              <br />
              <span className="volt-gradient-text">com tudo nesse mercado</span>
            </h2>
            <p className="mt-5 max-w-lg text-base text-volt-fog">
              Fidelize quem abastece, entenda seu posto como nunca e cresça com uma plataforma feita para
              escalar. Tudo no seu controle.
            </p>
          </Reveal>

          <div className="mt-10 space-y-7">
            {beneficios.map((b, i) => (
              <Reveal key={b.t} delay={i * 0.1} className="flex gap-5">
                <GlossyTile tone={b.tone} className="h-[52px] w-[52px] shrink-0">
                  <b.I size={22} />
                </GlossyTile>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{b.t}</h3>
                  <p className="mt-1 text-sm text-volt-fog">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[40px] blur-3xl"
              style={{ background: 'radial-gradient(circle at 60% 40%, rgba(176,34,221,0.3), transparent 70%)' }}
            />
            <DashboardMockup />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
