import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Select customizado, acessível (teclado + ARIA), no visual da marca. */
export function Select({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  ariaLabel: string
}) {
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(0)
  const wrapRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    setHi(Math.max(0, options.indexOf(value)))
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open, options, value])

  const close = (refocus = true) => {
    setOpen(false)
    if (refocus) btnRef.current?.focus()
  }
  const choose = (v: string) => {
    onChange(v)
    close()
  }

  const onKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        if (open) {
          e.preventDefault()
          close()
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!open) setOpen(true)
        else setHi((h) => Math.min(options.length - 1, h + 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!open) setOpen(true)
        else setHi((h) => Math.max(0, h - 1))
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          setHi(0)
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          setHi(options.length - 1)
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!open) setOpen(true)
        else choose(options[hi])
        break
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
        className={`flex w-full items-center justify-between rounded-xl border bg-white/[0.04] px-4 py-3 font-display text-sm text-white outline-none transition-colors ${
          open ? 'border-volt-orange-bright/70' : 'border-white/12 hover:border-white/25'
        }`}
      >
        <span>{value}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-white/55 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={ariaLabel}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/12 bg-volt-ink-2/95 p-1 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            {options.map((opt, i) => {
              const selected = opt === value
              const active = i === hi
              return (
                <li
                  key={opt}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHi(i)}
                  onClick={() => choose(opt)}
                  className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    active ? 'bg-white/[0.08] text-white' : 'text-volt-fog'
                  }`}
                >
                  <span className={selected ? 'font-semibold text-white' : ''}>{opt}</span>
                  {selected && (
                    <span
                      className="flex h-4 w-4 items-center justify-center rounded-full text-white"
                      style={{ background: 'linear-gradient(135deg,#fb6803,#b022dd)' }}
                    >
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
