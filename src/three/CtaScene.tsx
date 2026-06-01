import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { VoltixX } from './VoltixX'
import { VoltixEnvironment } from './VoltixEnvironment'
import { useVisibleFrameloop } from './useVisibleFrameloop'
import { useReducedMotion } from '../lib/useReducedMotion'
import { detectTier } from '../lib/perf'

function Spin({ children, enabled }: { children: React.ReactNode; enabled: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (ref.current && enabled) ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.5
  })
  return <group ref={ref}>{children}</group>
}

/** X 3D leve para o fundo do CTA — auto-rotação suave, sem reação a scroll. */
export function CtaScene() {
  const reduced = useReducedMotion()
  const tier = detectTier()
  const { frameloop, onCreated } = useVisibleFrameloop()
  // O X 3D anima em todos os dispositivos. O tier só degrada o custo (dpr + bloom),
  // nunca troca por imagem estática — o useVisibleFrameloop garante que só um X
  // (hero OU fechamento) renderiza por vez, então o custo de GPU não dobra.
  const dpr: [number, number] = tier === 'low' ? [1, 1.2] : tier === 'mid' ? [1, 1.5] : [1, 2]
  const bloomEnabled = tier !== 'low'
  return (
    <Canvas
      className="!absolute inset-0"
      frameloop={frameloop}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 9], fov: 40 }}
      onCreated={onCreated}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 6, 8]} intensity={2.2} color="#fff1e6" />
        <directionalLight position={[-6, -3, 4]} intensity={1.5} color="#c98bff" />
        <Spin enabled={!reduced}>
          <Float enabled={!reduced} speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
            <VoltixX scale={0.00024} />
          </Float>
        </Spin>
        <VoltixEnvironment />
        {bloomEnabled && (
          <EffectComposer enableNormalPass={false}>
            <Bloom intensity={0.7} luminanceThreshold={0.65} luminanceSmoothing={0.25} mipmapBlur radius={0.65} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  )
}
