/**
 * Campo de energia de fundo (fixo, atrás de tudo). Duas nebulosas — laranja
 * (combustível) e roxa (elétrico) — fazem cross-fade conforme o scroll (--scroll),
 * traduzindo a jornada combustível → elétrico.
 */
export function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-volt-ink">
      {/* Laranja — domina no topo */}
      <div
        className="volt-bg-fade absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 'calc(0.9 - var(--scroll, 0) * 0.75)',
          background:
            'radial-gradient(55% 45% at 50% 18%, rgba(251,104,3,0.30), transparent 70%), radial-gradient(40% 35% at 78% 42%, rgba(234,64,15,0.22), transparent 72%)',
        }}
      />
      {/* Roxo — domina embaixo */}
      <div
        className="volt-bg-fade absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 'calc(0.25 + var(--scroll, 0) * 0.85)',
          background:
            'radial-gradient(55% 50% at 50% 80%, rgba(176,34,221,0.30), transparent 72%), radial-gradient(45% 40% at 22% 55%, rgba(122,20,213,0.24), transparent 74%)',
        }}
      />
      {/* Mesh vivo, lento */}
      <div className="volt-mesh absolute inset-0 opacity-50" />
      {/* Vinheta */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 80% at 50% 50%, transparent 55%, rgba(4,2,8,0.7) 100%)' }}
      />
    </div>
  )
}
