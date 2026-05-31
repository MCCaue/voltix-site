import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MagneticButton } from './MagneticButton'

const LINKS: [string, string][] = [
  ['O app', '#app'],
  ['Como funciona', '#como-funciona'],
  ['Para o posto', '#posto'],
  ['FAQ', '#faq'],
]

export function Nav({ revealed = true }: { revealed?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'none' : 'translateY(-14px)',
        pointerEvents: revealed ? 'auto' : 'none',
        transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* fundo fosco: anima só a opacidade (não o blur) — sem jank */}
      <div
        aria-hidden
        className="absolute inset-0 border-b border-white/[0.06]"
        style={{
          background: 'rgba(8,4,15,0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          opacity: scrolled || open ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
      />
      <nav className="relative mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Voltix — início">
          <img src="/brand/symbol.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-xl font-extrabold tracking-tight text-white">voltix</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-display text-sm font-medium text-volt-fog transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MagneticButton href="#parceiro" className="!px-5 !py-2.5 text-[13px]">
            Seja um parceiro
          </MagneticButton>
          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] md:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="relative z-10 overflow-hidden md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-1 px-6 pb-5 pt-1">
              {LINKS.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 font-display text-base font-medium text-volt-fog transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
