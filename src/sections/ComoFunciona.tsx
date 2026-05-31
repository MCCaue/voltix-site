import { Reveal } from '../components/Reveal'
import { GlossyTile, IconShield, IconQr, IconChart, IconCashback } from '../components/icons'

const passos = [
  {
    n: '01',
    tone: 'purple' as const,
    I: IconShield,
    t: 'Seu app, sua marca',
    d: 'A gente configura a Voltix com a identidade do seu posto (ou rede). White-label, pronto para as lojas.',
  },
  {
    n: '02',
    tone: 'orange' as const,
    I: IconQr,
    t: 'Seus clientes abastecem',
    d: 'Eles baixam o app, abastecem com preço especial e liberam a bomba pelo celular. Simples assim.',
  },
  {
    n: '03',
    tone: 'orange' as const,
    I: IconCashback,
    t: 'Você recompensa na hora',
    d: 'Cashback, pontos e cupons caem na carteira após o pagamento. Quem ganha, volta.',
  },
  {
    n: '04',
    tone: 'purple' as const,
    I: IconChart,
    t: 'Você acompanha e ajusta',
    d: 'No painel, você vê tudo em tempo real e muda preço, cashback e promoções quando quiser.',
  },
]

export function ComoFunciona() {
  return (
    <section id="como-funciona" className="relative mx-auto max-w-[1180px] px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-volt-purple-bright">
          Como funciona
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Do contrato ao cliente fiel,
          <br />
          <span className="volt-gradient-text">em quatro passos</span>
        </h2>
        <p className="mt-5 text-base text-volt-fog">
          Sem obra, sem dor de cabeça. A Voltix entra no seu posto e começa a fidelizar.
        </p>
      </Reveal>

      <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* trilha conectando os passos (desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-[34px] hidden h-px lg:block"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(251,104,3,0.4), rgba(176,34,221,0.4), transparent)' }}
        />
        {passos.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.1} className="relative">
            <div className="volt-glass volt-card-glow h-full rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <GlossyTile tone={p.tone} className="h-14 w-14">
                  <p.I size={24} />
                </GlossyTile>
                <span className="font-display text-3xl font-black text-white/10">{p.n}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-white">{p.t}</h3>
              <p className="mt-2 text-sm text-volt-fog">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
