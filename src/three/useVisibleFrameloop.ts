import { useCallback, useEffect, useRef, useState } from 'react'
import type { RootState } from '@react-three/fiber'

/**
 * Pausa o render loop do R3F quando o canvas sai da viewport ou a aba fica oculta,
 * e torna a perda de contexto WebGL recuperável.
 *
 * Por quê: o padrão do R3F é `frameloop="always"` — o canvas renderiza a 60fps mesmo
 * fora da tela. Em mobile, manter uma cena pesada (material físico + environment + bloom)
 * renderizando enquanto o usuário lê o resto da página acumula calor/memória de GPU até
 * o navegador matar a aba (tela de erro + reload). Pausar fora da viewport elimina esse
 * custo sustentado e garante que nunca há dois contextos WebGL renderizando ao mesmo tempo.
 *
 * `preventDefault()` no `webglcontextlost` permite que o navegador restaure o contexto em
 * vez de descartá-lo de vez (sem isso, pressão de memória deixa o canvas branco/quebrado).
 */
export function useVisibleFrameloop(onReady?: () => void) {
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always')
  const visibleRef = useRef(true)
  const cleanupRef = useRef<(() => void) | null>(null)

  const onCreated = useCallback(
    (state: RootState) => {
      const canvas = state.gl.domElement

      // Recuperação de contexto: sem preventDefault o contexto é perdido permanentemente.
      const onLost = (e: Event) => e.preventDefault()
      canvas.addEventListener('webglcontextlost', onLost as EventListener, false)

      const apply = () => setFrameloop(visibleRef.current && !document.hidden ? 'always' : 'never')

      // Só renderiza quando o canvas está (perto de) visível.
      const io = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting
          apply()
        },
        { rootMargin: '200px' },
      )
      io.observe(canvas)

      // Pausa quando a aba sai de foco.
      const onVis = () => apply()
      document.addEventListener('visibilitychange', onVis)

      cleanupRef.current = () => {
        canvas.removeEventListener('webglcontextlost', onLost as EventListener)
        io.disconnect()
        document.removeEventListener('visibilitychange', onVis)
      }

      onReady?.()
    },
    [onReady],
  )

  useEffect(() => () => cleanupRef.current?.(), [])

  return { frameloop, onCreated }
}
