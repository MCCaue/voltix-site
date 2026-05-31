import { Reveal } from '../components/Reveal'
import { Counter } from '../components/Counter'
import { GlossyTile, IconCashback, IconTicket, IconGift, IconPump, IconBolt } from '../components/icons'

const fontes = [
  { I: IconCashback, t: 'Cashback', d: 'Parte do que você gasta volta', tone: 'orange' as const },
  { I: IconGift, t: 'Pontos', d: 'Acumule e troque por recompensas', tone: 'purple' as const },
  { I: IconTicket, t: 'Cupons', d: 'Concorra a sorteios a cada parada', tone: 'orange' as const },
]

const resgates = ['Combustível', 'Recarga elétrica', 'Troca de óleo', 'Conveniência']

export function Carteira() {
  return (
    <section id="carteira" className="relative mx-auto max-w-[1180px] px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-volt-orange-bright">
          Carteira unificada
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Tudo num só lugar,
          <br />
          <span className="volt-gradient-text">gasta onde quiser</span>
        </h2>
        <p className="mt-5 text-base text-volt-fog">
          Cashback, pontos e cupons se juntam numa carteira só. E o saldo é livre: vale no combustível, na
          recarga, no óleo ou na conveniência.
        </p>
      </Reveal>

      {/* fontes → carteira */}
      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        {fontes.map((f, i) => (
          <Reveal key={f.t} delay={i * 0.1}>
            <div className="volt-glass volt-card-glow flex h-full items-start gap-4 rounded-2xl p-6">
              <GlossyTile tone={f.tone} className="h-12 w-12 shrink-0">
                <f.I size={20} />
              </GlossyTile>
              <div>
                <h3 className="font-display text-lg font-bold text-white">{f.t}</h3>
                <p className="mt-1 text-sm text-volt-fog">{f.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* resgate cruzado */}
      <Reveal delay={0.15}>
        <div className="volt-glass mt-6 overflow-hidden rounded-3xl p-8 sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            <div>
              <h3 className="font-display text-2xl font-bold text-white">Resgate cruzado</h3>
              <p className="mt-2 text-volt-fog">
                Ganhou abastecendo, usa na recarga. Ganhou na recarga, usa no óleo. O valor é seu, sem
                amarras.
              </p>
            </div>

            {/* hub */}
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: 'radial-gradient(circle, rgba(176,34,221,0.55), transparent 70%)' }}
              />
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-3xl text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.4)]"
                style={{ background: 'linear-gradient(150deg,#fb6803,#b022dd)' }}
              >
                <IconCashback size={40} />
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-3">
              {resgates.map((r, i) => (
                <li
                  key={r}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-sm text-white/85"
                >
                  {i < 2 ? (
                    i === 0 ? (
                      <IconPump size={16} />
                    ) : (
                      <IconBolt size={16} />
                    )
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-volt-orange-bright" />
                  )}
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* stats */}
      <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {[
          { v: 5, suf: '%', l: 'de cashback médio por litro' },
          { v: 3, suf: 'x', l: 'mais visitas de quem usa o app' },
          { v: 100, suf: '%', l: 'do saldo livre para resgatar' },
        ].map((s, i) => (
          <Reveal key={s.l} delay={i * 0.1} className="text-center">
            <div className="font-display text-5xl font-extrabold volt-gradient-text">
              <Counter value={s.v} suffix={s.suf} />
            </div>
            <p className="mx-auto mt-2 max-w-[180px] text-sm text-volt-fog">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
