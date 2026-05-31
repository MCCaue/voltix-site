import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'

const faqs = [
  {
    q: 'Preciso trocar de bomba ou fazer obra no posto?',
    a: 'Não. No início a liberação da bomba segue manual, como já é hoje. A Voltix entra por cima da sua operação, sem obra nem equipamento novo. A automação da pista pode ser integrada depois, quando fizer sentido.',
  },
  {
    q: 'Serve para posto independente ou só para rede?',
    a: 'Os dois. A Voltix nasce multi-posto: funciona igual para um posto independente ou uma rede inteira, com visão da matriz e de cada filial.',
  },
  {
    q: 'O app sai com a minha marca?',
    a: 'Sim. É white-label: o app vai para as lojas com a identidade do seu posto ou da sua rede. A plataforma por trás é a mesma, robusta e atualizada.',
  },
  {
    q: 'O cashback não vai me dar prejuízo?',
    a: 'Você define a porcentagem e as regras no painel, e muda quando quiser. O cashback só é creditado após o pagamento confirmado, e existe para trazer o cliente de volta, aumentando visitas e ticket. É investimento em fidelização, com você no controle.',
  },
  {
    q: 'E a recarga elétrica?',
    a: 'Já faz parte. O cliente carrega o carro lendo o QR do carregador e acumula cashback ou pontos por real, na mesma carteira do combustível. Seu posto nasce pronto para a frota elétrica.',
  },
  {
    q: 'Quanto custa?',
    a: 'O plano é sob medida para o tamanho do seu posto ou rede. Fale com a gente no WhatsApp e montamos a proposta certa para você, com condição de fundador para quem entra agora.',
  },
]

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="volt-glass overflow-hidden rounded-2xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-semibold text-white">{q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-volt-fog">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="relative mx-auto max-w-[820px] px-6 py-28 sm:py-36">
      <Reveal className="text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-volt-purple-bright">
          Perguntas frequentes
        </p>
        <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          As dúvidas que <span className="volt-gradient-text">todo dono tem</span>
        </h2>
      </Reveal>

      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <Item {...f} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
