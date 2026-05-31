import type { ReactNode } from 'react'

/** Tile glossy 3D que envolve um ícone — visual de app icon da marca. */
export function GlossyTile({
  children,
  tone = 'orange',
  className = '',
}: {
  children: ReactNode
  tone?: 'orange' | 'purple'
  className?: string
}) {
  const bg =
    tone === 'orange'
      ? 'linear-gradient(150deg, #fb6803, #ea400f)'
      : 'linear-gradient(150deg, #b022dd, #7a14d5)'
  const glow = tone === 'orange' ? 'rgba(251,104,3,0.45)' : 'rgba(176,34,221,0.45)'
  return (
    <div
      className={`relative flex items-center justify-center rounded-[28%] ${className}`}
      style={{
        background: bg,
        boxShadow: `0 18px 50px -14px ${glow}, inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -10px 18px rgba(0,0,0,0.25)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28%]"
        style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.5), transparent 42%)' }}
      />
      <div className="relative text-white">{children}</div>
    </div>
  )
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function IconPump({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M3 21h12" />
      <path d="M7 8h4" />
      <path d="M14 9l3 3v5a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8l-3-3" />
    </svg>
  )
}

export function IconBolt({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </svg>
  )
}

export function IconGift({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="8" width="18" height="13" rx="2" />
      <path d="M3 12h18M12 8v13" />
      <path d="M12 8S10 3 7.5 3 5 6 8 8M12 8s2-5 4.5-5S19 6 16 8" />
    </svg>
  )
}

export function IconCashback({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 15s.5 1.5 3 1.5S15 15 15 14s-1-1.5-3-2-3-1-3-2 .8-1.5 3-1.5S15 9 15 9" />
      <path d="M12 6v1.5M12 16.5V18" />
    </svg>
  )
}

export function IconTicket({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z" />
      <path d="M14 6v12" strokeDasharray="2 3" />
    </svg>
  )
}

export function IconQr({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3M21 14v7h-7M17 21v-3" />
    </svg>
  )
}

export function IconChart({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-5 3 3 5-7" />
    </svg>
  )
}

export function IconShield({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
