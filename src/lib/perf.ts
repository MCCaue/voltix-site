/** Heurística simples de capacidade do dispositivo para degradar o 3D com graça. */
export type Tier = 'high' | 'mid' | 'low'

export function detectTier(): Tier {
  if (typeof window === 'undefined') return 'high'
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
  const cores = navigator.hardwareConcurrency ?? 8
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.innerWidth < 768

  if (mem <= 4 || cores <= 4 || (coarse && narrow)) return 'low'
  if (mem <= 6 || cores <= 6 || coarse) return 'mid'
  return 'high'
}

export const BRAND = {
  orange: '#fb6803',
  orangeDeep: '#ea400f',
  purple: '#b022dd',
  purpleDeep: '#7a14d5',
  ink: '#08040f',
} as const
