import { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { BRAND } from '../lib/perf'

type Half = 'top' | 'bottom'

const SVG_MID_Y = 10500 // metade do viewBox 0..21000 — separa swoosh laranja (topo) do roxo (base)

/**
 * O X da Voltix em 3D: extruda os 4 traços do símbolo (symbol.svg) e atribui
 * material laranja (metade superior = "check") ou roxo (metade inferior = "X").
 */
export function VoltixX(props: {
  scale?: number
  depth?: number
  envMapIntensity?: number
}) {
  const { scale = 0.00019, depth = 2600, envMapIntensity = 1.5 } = props
  const data = useLoader(SVGLoader, '/brand/symbol.svg')

  const geometries = useMemo(() => {
    const out: { geometry: THREE.ExtrudeGeometry; half: Half }[] = []
    const extrude: THREE.ExtrudeGeometryOptions = {
      depth,
      bevelEnabled: true,
      bevelThickness: 220,
      bevelSize: 160,
      bevelSegments: 6,
      curveSegments: 24,
    }

    // 1) Constrói cada geometria em coordenadas SVG e mede o centro global.
    const built: { geometry: THREE.ExtrudeGeometry; half: Half }[] = []
    const union = new THREE.Box3()
    for (const path of data.paths) {
      const shapes = SVGLoader.createShapes(path)
      for (const shape of shapes) {
        const geometry = new THREE.ExtrudeGeometry(shape, extrude)
        geometry.computeBoundingBox()
        const bb = geometry.boundingBox!
        union.union(bb)
        const cy = (bb.min.y + bb.max.y) / 2
        built.push({ geometry, half: cy < SVG_MID_Y ? 'top' : 'bottom' })
      }
    }

    // 2) Centraliza tudo na origem (em coordenadas SVG, antes do flip de Y).
    const center = new THREE.Vector3()
    union.getCenter(center)
    for (const item of built) {
      item.geometry.translate(-center.x, -center.y, -center.z)
      out.push(item)
    }
    return out
  }, [data, depth])

  const orange = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(BRAND.orange),
        metalness: 0.85,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
        envMapIntensity,
        emissive: new THREE.Color(BRAND.orangeDeep),
        emissiveIntensity: 0.12,
        side: THREE.DoubleSide,
      }),
    [envMapIntensity],
  )

  const purple = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(BRAND.purple),
        metalness: 0.85,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.18,
        envMapIntensity,
        emissive: new THREE.Color(BRAND.purpleDeep),
        emissiveIntensity: 0.14,
        side: THREE.DoubleSide,
      }),
    [envMapIntensity],
  )

  // scale.y negativo converte o SVG (Y para baixo) em Y para cima; DoubleSide cuida do winding.
  return (
    <group scale={[scale, -scale, scale]}>
      {geometries.map((g, i) => (
        <mesh key={i} geometry={g.geometry} material={g.half === 'top' ? orange : purple} castShadow receiveShadow />
      ))}
    </group>
  )
}
