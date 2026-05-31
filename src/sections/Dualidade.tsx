import { Reveal } from '../components/Reveal'
import { GlossyTile, IconPump, IconBolt } from '../components/icons'
import { LightningCanvas } from '../components/LightningCanvas'

export function Dualidade() {
  return (
    <section id="dualidade" className="relative mx-auto max-w-[1180px] px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-volt-orange-bright">
          Uma só plataforma
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Combustível e elétrico,
          <br />
          <span className="volt-gradient-text">a mesma energia</span>
        </h2>
        <p className="mt-5 text-base text-volt-fog">
          Do tanque à tomada: a Voltix conecta os dois mundos da parada num único app de vantagens.
        </p>
      </Reveal>

      <div className="relative mt-16 grid gap-6 md:grid-cols-2 md:gap-20">
        {/* costura de energia vertical no vão entre os cards */}
        <LightningCanvas className="pointer-events-none absolute left-1/2 top-0 z-20 hidden h-full w-[132px] -translate-x-1/2 md:block" />

        {/* Combustível */}
        <Reveal className="relative z-10">
          <article className="volt-glass volt-card-glow group relative h-full overflow-hidden rounded-3xl p-8">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(251,104,3,0.35), transparent 70%)' }}
            />
            <GlossyTile tone="orange" className="h-16 w-16">
              <IconPump />
            </GlossyTile>
            <h3 className="mt-6 font-display text-2xl font-bold text-white">Combustível</h3>
            <p className="mt-3 text-volt-fog">
              Abasteça com preço especial, libere a bomba pelo app e ganhe cashback a cada litro. Vantagem
              real em cada parada.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/80">
              {['Preço diferenciado para quem usa o app', 'Cashback que volta em combustível', 'Cupons de sorteio a cada abastecimento'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-volt-orange-bright" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </article>
        </Reveal>

        {/* Elétrico */}
        <Reveal delay={0.12} className="relative z-10">
          <article className="volt-glass volt-card-glow group relative h-full overflow-hidden rounded-3xl p-8">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(176,34,221,0.4), transparent 70%)' }}
            />
            <GlossyTile tone="purple" className="h-16 w-16">
              <IconBolt />
            </GlossyTile>
            <h3 className="mt-6 font-display text-2xl font-bold text-white">EletroPostos</h3>
            <p className="mt-3 text-volt-fog">
              Carregue o carro lendo o QR do carregador e acumule a cada real. A recarga elétrica também
              recompensa quem é fiel.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-white/80">
              {['Cashback ou pontos por R$ carregado', 'Mesma carteira do combustível', 'Pronto para a frota elétrica que chega'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-volt-purple-bright" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
