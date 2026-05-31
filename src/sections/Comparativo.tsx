import { Reveal } from '../components/Reveal'

const linhas = [
  'Combustível e recarga elétrica num app só',
  'Cashback que volta em qualquer serviço',
  'App com a marca do seu posto',
  'Painel com BI em tempo real',
  'Anti-fraude: recompensa só após o pagamento',
  'Promoções e sorteios que você controla',
  'Sem cartão físico, sem papel, sem fila',
]

// colunas: Voltix · Concorrente · Cartão de fidelidade · Sem programa
const matriz: ('full' | 'partial' | 'none')[][] = [
  ['full', 'partial', 'none', 'none'],
  ['full', 'partial', 'partial', 'none'],
  ['full', 'none', 'none', 'none'],
  ['full', 'partial', 'none', 'none'],
  ['full', 'partial', 'partial', 'none'],
  ['full', 'full', 'partial', 'none'],
  ['full', 'full', 'none', 'none'],
]

function Mark({ kind }: { kind: 'full' | 'partial' | 'none' }) {
  if (kind === 'none')
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04] text-white/30">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </span>
    )
  if (kind === 'partial')
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.06] text-white/45">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M5 12h14" />
        </svg>
      </span>
    )
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white"
      style={{ background: 'linear-gradient(135deg,#fb6803,#b022dd)' }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l4 4L19 7" />
      </svg>
    </span>
  )
}

const COLS = 'grid-cols-[1.7fr_1fr_1fr_1fr_1fr]'

export function Comparativo() {
  return (
    <section id="comparativo" className="relative mx-auto max-w-[1180px] px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-volt-orange-bright">
          Por que Voltix
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Não é mais um
          <br />
          <span className="volt-gradient-text">cartãozinho de fidelidade</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-14">
        <div className="overflow-x-auto">
          <div className="volt-glass min-w-[720px] overflow-hidden rounded-3xl">
            {/* cabeçalho */}
            <div className={`grid ${COLS} items-stretch`}>
              <div className="px-6 py-5" />
              <div
                className="flex items-center justify-center px-3 py-5 text-center"
                style={{ background: 'linear-gradient(180deg, rgba(251,104,3,0.16), rgba(176,34,221,0.16))' }}
              >
                <span className="flex items-center gap-2 font-display text-base font-extrabold text-white">
                  <img src="/brand/symbol.svg" alt="" className="h-5 w-5" /> Voltix
                </span>
              </div>
              <div className="flex items-center justify-center px-3 py-5 text-center font-display text-sm font-semibold text-white/55">
                Concorrente
              </div>
              <div className="flex items-center justify-center px-3 py-5 text-center font-display text-sm font-semibold text-white/55">
                Cartão fidelidade
              </div>
              <div className="flex items-center justify-center px-3 py-5 text-center font-display text-sm font-semibold text-white/55">
                Sem programa
              </div>
            </div>

            {/* linhas */}
            {linhas.map((l, i) => (
              <div
                key={l}
                className={`grid ${COLS} items-center border-t border-white/[0.06] ${i % 2 ? 'bg-white/[0.012]' : ''}`}
              >
                <div className="px-6 py-4 text-sm text-white/85">{l}</div>
                <div className="flex justify-center px-3 py-4" style={{ background: 'rgba(176,34,221,0.05)' }}>
                  <Mark kind={matriz[i][0]} />
                </div>
                <div className="flex justify-center px-3 py-4">
                  <Mark kind={matriz[i][1]} />
                </div>
                <div className="flex justify-center px-3 py-4">
                  <Mark kind={matriz[i][2]} />
                </div>
                <div className="flex justify-center px-3 py-4">
                  <Mark kind={matriz[i][3]} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
