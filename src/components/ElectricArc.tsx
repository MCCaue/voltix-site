/**
 * Raio elétrico animado (SVG): traço principal ramificado, núcleo branco-quente
 * sobre glow ciano-elétrico, com flicker e redesenho contínuo.
 */
export function ElectricArc({
  className = '',
  glow = '#3fd0ff',
  width = 280,
  height = 150,
}: {
  className?: string
  glow?: string
  width?: number
  height?: number
}) {
  const main = 'M8 75 L60 66 L44 90 L104 62 L90 84 L150 58 L138 80 L200 60 L188 78 L272 72'
  const branchA = 'M104 62 L120 40 L132 52'
  const branchB = 'M150 58 L160 86 L150 104'

  return (
    <svg className={className} width={width} height={height} viewBox="0 0 280 150" fill="none" aria-hidden>
      <defs>
        <filter id="boltGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="boltCore" x1="0" y1="0" x2="280" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fb6803" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#b022dd" />
        </linearGradient>
      </defs>

      {/* halo ciano (glow largo) */}
      <g filter="url(#boltGlow)" className="volt-bolt-flicker">
        <path d={main} stroke={glow} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
        <path d={branchA} stroke={glow} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        <path d={branchB} stroke={glow} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </g>

      {/* núcleo branco-quente com gradiente de marca nas pontas */}
      <g className="volt-bolt-draw">
        <path d={main} stroke="url(#boltCore)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d={branchA} stroke="#eaf7ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        <path d={branchB} stroke="#eaf7ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      </g>
    </svg>
  )
}
