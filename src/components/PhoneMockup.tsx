import { IconBolt, IconCashback, IconGift, IconPump } from './icons'

/** Mockup do app Voltix (tema dark da marca) dentro de um aparelho flutuante. */
export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] [transform:perspective(1400px)_rotateY(-14deg)_rotateX(4deg)]">
      {/* glow atrás */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-[60px] blur-3xl"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(176,34,221,0.4), transparent 70%)' }}
      />
      {/* aparelho */}
      <div className="relative rounded-[44px] border border-white/10 bg-[#0c0718] p-3 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-b from-[#15092b] to-[#0a0518]">
          {/* notch */}
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/70" />
          {/* conteúdo do app */}
          <div className="px-5 pb-6 pt-9">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-white/50">Olá, bom dia</p>
                <p className="font-display text-sm font-bold text-white">Matheus</p>
              </div>
              <img src="/brand/symbol.svg" alt="" className="h-7 w-7" />
            </div>

            {/* saldo */}
            <div
              className="mt-4 rounded-2xl p-4"
              style={{ background: 'linear-gradient(135deg, #fb6803, #b022dd)' }}
            >
              <p className="text-[11px] font-medium text-white/80">Saldo de cashback</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-white">R$ 148,90</p>
              <p className="mt-1 text-[10px] text-white/70">+ 1.240 pontos · 3 cupons</p>
            </div>

            {/* tiles */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { t: 'Abastecer', tone: 'linear-gradient(150deg,#fb6803,#ea400f)', I: IconPump },
                { t: 'Carregar', tone: 'linear-gradient(150deg,#b022dd,#7a14d5)', I: IconBolt },
                { t: 'Cashback', tone: 'linear-gradient(150deg,#ea400f,#b022dd)', I: IconCashback },
                { t: 'Brindes', tone: 'linear-gradient(150deg,#7a14d5,#b022dd)', I: IconGift },
              ].map(({ t, tone, I }) => (
                <div key={t} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                    style={{ background: tone }}
                  >
                    <I size={18} />
                  </div>
                  <p className="mt-2 text-[12px] font-semibold text-white">{t}</p>
                </div>
              ))}
            </div>

            {/* faixa de progresso */}
            <div className="mt-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-white/70">Próximo brinde</span>
                <span className="font-semibold text-volt-orange-bright">80%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-4/5 rounded-full" style={{ background: 'linear-gradient(90deg,#fb6803,#b022dd)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
