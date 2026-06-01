/**
 * A Voltix ignora deliberadamente o `prefers-reduced-motion` do sistema.
 *
 * Motivo: o modo de economia de bateria (Android) e a opção "Mostrar animações"
 * desligada (Windows) ativam essa flag automaticamente. Isso congelava o X 3D, os
 * raios e todas as animações — o site parecia quebrado nesses aparelhos, enquanto
 * Mac/iPhone (sem a flag) rodavam normal. Decisão do Matheus (2026-06-01): a camada
 * decorativa sempre anima.
 *
 * Mantido como hook (em vez de remover dos consumidores) para preservar a assinatura
 * e permitir reverter o comportamento num único ponto, se um dia quisermos honrar a
 * preferência de novo.
 */
export function useReducedMotion(): boolean {
  return false
}
