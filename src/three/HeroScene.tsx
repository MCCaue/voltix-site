import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { VoltixX } from './VoltixX'
import { VoltixEnvironment } from './VoltixEnvironment'
import { useVisibleFrameloop } from './useVisibleFrameloop'
import { useReducedMotion } from '../lib/useReducedMotion'
import { detectTier } from '../lib/perf'

const INTRO_DUR = 1.5 // s — voo de entrada do X

/** Grupo que voa para a posição no carregamento, depois segue o ponteiro + reage ao scroll. */
function HeroRig({ children, enabled }: { children: React.ReactNode; enabled: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    const t = state.clock.elapsedTime

    // Intro: o X voa de cima/de perto e se posiciona no hero
    if (enabled && t < INTRO_DUR) {
      const p = 1 - Math.pow(1 - t / INTRO_DUR, 3) // easeOutCubic
      g.rotation.y = THREE.MathUtils.lerp(-1.3, 0, p)
      g.rotation.x = THREE.MathUtils.lerp(0.5, 0, p)
      g.position.y = THREE.MathUtils.lerp(2.6, 0, p)
      g.scale.setScalar(THREE.MathUtils.lerp(1.9, 1, p))
      return
    }

    const heroP = Math.min(1, Math.max(0, window.scrollY / window.innerHeight))
    const targetY = (enabled ? state.pointer.x * 0.5 : 0) + heroP * 1.2
    const targetX = (enabled ? -state.pointer.y * 0.32 : 0) + heroP * 0.25
    const k = 1 - Math.pow(0.0009, delta)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, k)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, k)
    g.position.y = THREE.MathUtils.lerp(g.position.y, heroP * 2.2, k)
    const s = 1 - heroP * 0.25
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, k))
  })
  return <group ref={ref}>{children}</group>
}

export function HeroScene({ onReady }: { onReady?: () => void }) {
  const reduced = useReducedMotion()
  const tier = detectTier()
  const dpr: [number, number] = tier === 'low' ? [1, 1.2] : tier === 'mid' ? [1, 1.6] : [1, 2]
  const bloomEnabled = tier !== 'low'
  const sparkleCount = tier === 'low' ? 0 : tier === 'mid' ? 34 : 70
  const { frameloop, onCreated } = useVisibleFrameloop(onReady)

  return (
    <Canvas
      className="!absolute inset-0"
      frameloop={frameloop}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 9], fov: 38 }}
      onCreated={onCreated}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 6, 8]} intensity={2.4} color="#fff1e6" />
        <directionalLight position={[-6, -3, 4]} intensity={1.6} color="#c98bff" />
        <pointLight position={[0, 0, 6]} intensity={18} distance={20} color="#ffb066" />

        <HeroRig enabled={!reduced}>
          <Float
            enabled={!reduced}
            speed={1.4}
            rotationIntensity={0.5}
            floatIntensity={0.7}
            floatingRange={[-0.12, 0.12]}
            position={[0, 1.35, 0]}
          >
            <VoltixX />
          </Float>
        </HeroRig>

        {sparkleCount > 0 && (
          <Sparkles
            count={sparkleCount}
            scale={[12, 8, 6]}
            position={[0, 1, 0]}
            size={3}
            speed={reduced ? 0 : 0.4}
            opacity={0.6}
            color="#d79bff"
          />
        )}

        <VoltixEnvironment />

        {bloomEnabled && (
          <EffectComposer enableNormalPass={false}>
            <Bloom intensity={0.85} luminanceThreshold={0.62} luminanceSmoothing={0.25} mipmapBlur radius={0.7} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  )
}
