import { IconBolt, IconChart, IconShield, IconCashback } from '../components/icons'

const items = [
  { I: IconCashback, t: 'Cashback unificado', d: 'combustível + elétrico' },
  { I: IconShield, t: 'App white-label', d: 'com a sua marca' },
  { I: IconChart, t: 'Painel em tempo real', d: 'BI da rede ao posto' },
  { I: IconBolt, t: 'Pronta para escalar', d: 'de 1 posto a uma rede' },
]

/** Faixa de capacidades logo abaixo do hero — substância e credibilidade (sem inventar clientes). */
export function AuthorityStrip() {
  return (
    <section aria-label="Capacidades da plataforma" className="relative border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-px px-6 md:grid-cols-4">
        {items.map((it) => (
          <div key={it.t} className="flex items-center gap-3 py-6 md:justify-center">
            <it.I size={22} />
            <div>
              <p className="font-display text-sm font-bold leading-tight text-white">{it.t}</p>
              <p className="text-[12px] leading-tight text-volt-fog">{it.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
