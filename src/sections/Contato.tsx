import { useState } from 'react'
import { Reveal } from '../components/Reveal'
import { Select } from '../components/Select'
import { whatsappLink } from '../lib/contact'
import { IconShield, IconCashback, IconChart } from '../components/icons'

const PORTE = ['1 posto', '2 a 10 postos', '10 a 100 postos', 'Mais de 100 postos']

const bullets = [
  { I: IconShield, t: 'Sem obra, sem risco', d: 'Entra por cima da sua operação atual.' },
  { I: IconCashback, t: 'Você no controle', d: 'Preço, cashback e regras na sua mão.' },
  { I: IconChart, t: 'Resultado visível', d: 'Acompanhe a fidelização em tempo real.' },
]

export function Contato() {
  const [nome, setNome] = useState('')
  const [posto, setPosto] = useState('')
  const [porte, setPorte] = useState(PORTE[0])
  const [cidade, setCidade] = useState('')
  const [erro, setErro] = useState('')

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim() || !posto.trim()) {
      setErro('Preencha seu nome e o nome do posto.')
      return
    }
    setErro('')
    const msg = `Olá! Quero levar a Voltix para o meu posto.\n\nNome: ${nome}\nPosto/Rede: ${posto}\nPorte: ${porte}${
      cidade.trim() ? `\nCidade/UF: ${cidade}` : ''
    }`
    window.open(whatsappLink(msg), '_blank', 'noopener')
  }

  const field =
    'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 font-display text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-volt-orange-bright/70'

  return (
    <section id="parceiro" className="relative mx-auto max-w-[1180px] px-6 py-28 sm:py-36">
      <div className="relative overflow-hidden rounded-[40px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 60% at 25% 25%, rgba(251,104,3,0.16), transparent 70%), radial-gradient(60% 60% at 82% 82%, rgba(176,34,221,0.2), transparent 72%)',
          }}
        />
        <div className="volt-glass relative grid items-center gap-10 rounded-[40px] p-8 sm:p-12 lg:grid-cols-2">
          {/* copy */}
          <div>
            <Reveal>
              <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                Coloque o seu posto no
                <br />
                <span className="volt-gradient-text">mapa das vantagens</span>
              </h2>
              <p className="mt-5 max-w-md text-base text-white/90 [text-shadow:0_2px_18px_rgba(8,4,15,0.7)]">
                Fale com a gente no WhatsApp e leve a Voltix para o seu posto, com condição de fundador para
                quem entra agora.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {bullets.map((b, i) => (
                <Reveal as="li" key={b.t} delay={i * 0.08} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-volt-orange-bright">
                    <b.I size={20} />
                  </span>
                  <span>
                    <span className="font-display text-sm font-bold text-white">{b.t}</span>
                    <span className="block text-sm text-volt-fog">{b.d}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* formulário */}
          <Reveal delay={0.1}>
            <form
              onSubmit={enviar}
              className="rounded-3xl border border-white/10 bg-volt-ink/60 p-6 backdrop-blur-xl sm:p-8"
            >
              <h3 className="font-display text-lg font-bold text-white">Quero conhecer a Voltix</h3>
              <p className="mt-1 text-sm text-volt-fog">Leva menos de um minuto. Continuamos no WhatsApp.</p>

              <div className="mt-6 space-y-3">
                <input
                  className={field}
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  aria-label="Seu nome"
                />
                <input
                  className={field}
                  placeholder="Nome do posto ou rede"
                  value={posto}
                  onChange={(e) => setPosto(e.target.value)}
                  aria-label="Nome do posto ou rede"
                />
                <Select value={porte} onChange={setPorte} options={PORTE} ariaLabel="Porte do posto ou rede" />
                <input
                  className={field}
                  placeholder="Cidade / UF (opcional)"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  aria-label="Cidade e UF"
                />
              </div>

              {erro && <p className="mt-3 text-sm text-volt-orange-bright">{erro}</p>}

              <button
                type="submit"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-volt-orange to-volt-purple-bright px-6 py-3.5 font-display text-sm font-semibold text-white shadow-[0_0_44px_-10px_rgba(176,34,221,0.7)] transition-transform hover:scale-[1.02]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.45 1.32-1.99 1.36-.51.04-1.16.21-3.74-.78-3.16-1.23-5.18-4.43-5.34-4.64-.16-.21-1.28-1.7-1.28-3.25 0-1.54.81-2.3 1.1-2.61.29-.31.63-.39.84-.39.21 0 .42 0 .6.01.19.01.45-.07.7.54.25.61.86 2.11.93 2.26.07.15.12.33.02.54-.1.21-.15.33-.29.51-.15.18-.31.4-.44.54-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.15.26.1 1.66.78 1.94.93.29.15.48.22.55.34.07.12.07.7-.18 1.39Z" />
                </svg>
                Falar no WhatsApp
              </button>
              <p className="mt-3 text-center text-[11px] text-volt-fog/60">
                Sem compromisso. A gente responde rápido.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
