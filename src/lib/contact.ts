// WhatsApp comercial da Voltix (DDI + DDD + número, só dígitos).
export const WHATSAPP = '5575998615843'

/** Monta um link wa.me com mensagem pré-preenchida. */
export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`
}

export const DEFAULT_WA_MESSAGE =
  'Olá! Quero levar a Voltix para o meu posto. Pode me explicar como funciona?'
