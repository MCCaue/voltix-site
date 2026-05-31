import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'

/** Botão que "puxa" suavemente em direção ao cursor. */
export function MagneticButton({
  children,
  href,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold transition-shadow will-change-transform'
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-volt-orange to-volt-purple-bright text-white shadow-[0_0_44px_-10px_rgba(176,34,221,0.7)] hover:shadow-[0_0_60px_-8px_rgba(251,104,3,0.7)]'
      : 'border border-white/15 bg-white/[0.03] text-white backdrop-blur-md hover:border-white/30 hover:bg-white/[0.06]'

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </motion.a>
  )
}
