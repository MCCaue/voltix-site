import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago']
const BASE_D = [44, 58, 50, 66, 74, 69, 86, 94]
const BASE_R = [28, 39, 34, 47, 52, 50, 63, 71]
const BASE_POSTOS = [92, 74, 58]
const POSTO_NOMES = ['Matriz — Centro', 'Filial — Rod. BR-101', 'Filial — Av. Litorânea']
const CHART_H = 122

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const jitter = (v: number, amt: number) => clamp(v + (Math.random() - 0.5) * amt, 8, 100)

/** Número que faz tween suave até o alvo (0 → alvo ao entrar; pequenos bumps ao vivo). */
function LiveNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const [disp, setDisp] = useState(0)
  const fromRef = useRef(0)
  useEffect(() => {
    const from = fromRef.current
    const to = value
    let raf = 0
    let start = 0
    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / 750)
      const e = 1 - Math.pow(1 - p, 3)
      setDisp(from + (to - from) * e)
      if (p < 1) raf = requestAnimationFrame(step)
      else fromRef.current = to
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return (
    <>
      {prefix}
      {disp.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </>
  )
}

/** Painel/BI do dono do posto — todo o card anima ao entrar na viewport e fica vivo. */
export function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-18% 0px' })
  const reduced = useReducedMotion()

  const [d, setD] = useState<number[]>(() => BASE_D.map(() => 0))
  const [r, setR] = useState<number[]>(() => BASE_R.map(() => 0))
  const [postos, setPostos] = useState<number[]>(() => BASE_POSTOS.map(() => 0))
  const [ring, setRing] = useState(0)
  const [bump, setBump] = useState(0)

  useEffect(() => {
    if (!inView) {
      // reseta para re-animar na próxima entrada
      setD(BASE_D.map(() => 0))
      setR(BASE_R.map(() => 0))
      setPostos(BASE_POSTOS.map(() => 0))
      setRing(0)
      setBump(0)
      return
    }
    // entrada
    setD(BASE_D)
    setR(BASE_R)
    setPostos(BASE_POSTOS)
    setRing(64)
    if (reduced) return
    // vida contínua
    const id = window.setInterval(() => {
      setD(BASE_D.map((v) => jitter(v, 12)))
      setR(BASE_R.map((v) => jitter(v, 10)))
      setPostos(BASE_POSTOS.map((v) => jitter(v, 8)))
      setRing(clamp(64 + (Math.random() - 0.5) * 6, 55, 72))
      setBump((b) => b + 1)
    }, 2600)
    return () => window.clearInterval(id)
  }, [inView, reduced])

  return (
    <div
      ref={ref}
      className="volt-glass relative overflow-hidden rounded-3xl border-white/10 p-5 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]"
    >
      {/* topo */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <img src="/brand/symbol.svg" alt="" className="h-5 w-5" />
          <span className="font-display text-sm font-bold text-white">Painel Voltix</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-1 text-[10px] font-medium text-white/70">
            <span className="volt-spark h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ao vivo
          </span>
          <span className="h-2 w-2 rounded-full bg-volt-orange-bright" />
          <span className="h-2 w-2 rounded-full bg-volt-purple-bright" />
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Kpi label="Volume" tone="text-volt-orange-bright" value={128 + bump * 0.3} suffix="k L" decimals={0} />
        <Kpi label="Ticket médio" tone="text-white" value={187 + (bump % 5)} prefix="R$ " />
        <Kpi label="Clientes ativos" tone="text-volt-purple-bright" value={4.2 + bump * 0.01} suffix="k" decimals={1} />
      </div>

      {/* gráfico */}
      <div className="relative mt-3 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-white/75">Cashback distribuído vs. resgatado</p>
          <div className="flex items-center gap-3 text-[10px] text-white/55">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-volt-orange-bright" /> Distribuído
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-sm bg-volt-purple-bright" /> Resgatado
            </span>
          </div>
        </div>

        <div className="relative mt-4" style={{ height: CHART_H }}>
          {[0, 0.25, 0.5, 0.75, 1].map((g) => (
            <div key={g} className="absolute inset-x-0 border-t border-white/[0.05]" style={{ top: `${g * 100}%` }} />
          ))}
          {/* linha de varredura "ao vivo" */}
          {!reduced && inView && <div className="volt-scan pointer-events-none absolute inset-y-0 w-px" />}
          <div className="absolute inset-0 flex items-end justify-between gap-2">
            {d.map((dv, i) => (
              <div key={i} className="flex flex-1 items-end justify-center gap-[3px]">
                <span
                  className="w-2.5 rounded-t-[3px]"
                  style={{
                    height: (dv / 100) * CHART_H,
                    background: 'linear-gradient(180deg,#fb6803,#ea400f)',
                    transition: 'height 0.85s cubic-bezier(0.16,1,0.3,1)',
                    transitionDelay: `${i * 0.04}s`,
                  }}
                />
                <span
                  className="w-2.5 rounded-t-[3px]"
                  style={{
                    height: (r[i] / 100) * CHART_H,
                    background: 'linear-gradient(180deg,#b022dd,#7a14d5)',
                    transition: 'height 0.85s cubic-bezier(0.16,1,0.3,1)',
                    transitionDelay: `${i * 0.04 + 0.05}s`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          {meses.map((m) => (
            <span key={m} className="flex-1 text-center text-[9px] text-white/35">
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* rodapé: anel + postos */}
      <div className="mt-3 grid grid-cols-[auto_1fr] gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <RingProgress value={ring} />
          <div>
            <p className="font-display text-base font-extrabold text-white">
              <LiveNumber value={ring} suffix="%" />
            </p>
            <p className="max-w-[88px] text-[10px] leading-tight text-white/45">do cashback já resgatado</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-white/45">Postos por volume</p>
          <ul className="space-y-2">
            {postos.map((pv, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-28 truncate text-[10px] text-white/70">{POSTO_NOMES[i]}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${pv}%`,
                      background: 'linear-gradient(90deg,#fb6803,#b022dd)',
                      transition: 'width 0.85s cubic-bezier(0.16,1,0.3,1)',
                      transitionDelay: `${i * 0.08}s`,
                    }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Kpi({
  label,
  value,
  tone,
  prefix,
  suffix,
  decimals = 0,
}: {
  label: string
  value: number
  tone: string
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <p className="text-[10px] uppercase tracking-wider text-white/45">{label}</p>
      <p className={`mt-1 font-display text-lg font-extrabold ${tone}`}>
        <LiveNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
    </div>
  )
}

function RingProgress({ value }: { value: number }) {
  const r = 20
  const c = 2 * Math.PI * r
  const off = c * (1 - value / 100)
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
      <defs>
        <linearGradient id="ringGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fb6803" />
          <stop offset="1" stopColor="#b022dd" />
        </linearGradient>
      </defs>
      <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
      <circle
        cx="26"
        cy="26"
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1)' }}
      />
    </svg>
  )
}
