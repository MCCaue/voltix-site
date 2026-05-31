import { Environment, Lightformer } from '@react-three/drei'

/**
 * Environment procedural (sem HDR de CDN) — gerado uma única vez (`frames={1}`),
 * evitando o stall de PMREM no meio da animação. Luzes laranja/roxo dão reflexo de marca.
 */
export function VoltixEnvironment() {
  return (
    <Environment frames={1} resolution={256}>
      <color attach="background" args={['#06030d']} />
      <Lightformer form="rect" intensity={2.4} color="#fff1e6" position={[0, 3.5, 5]} scale={[9, 5, 1]} />
      <Lightformer form="rect" intensity={1.8} color="#ffb066" position={[6, 1, 3]} scale={[6, 6, 1]} />
      <Lightformer form="rect" intensity={1.8} color="#c98bff" position={[-6, -1, 3]} scale={[6, 6, 1]} />
      <Lightformer form="ring" intensity={1.3} color="#b022dd" position={[0, -3.5, 3]} scale={[5, 5, 1]} />
      <Lightformer form="circle" intensity={1.1} color="#fb6803" position={[3, -2, 4]} scale={[3, 3, 1]} />
    </Environment>
  )
}
