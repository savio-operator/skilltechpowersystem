'use client'
import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { panelState } from '@/lib/panelState'

/* ------------------------------------------------------------------ */
/*  Panel geometry                                                      */
/* ------------------------------------------------------------------ */
function PanelMesh() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return
    const p = panelState.scrollProgress

    // Side-on → face-on → slight display angle
    const targetY = THREE.MathUtils.lerp(-1.2, -0.22, Math.min(p * 2, 1))
    const targetX = THREE.MathUtils.lerp(0.22, -0.07, Math.min(p * 2, 1))
    const targetS = THREE.MathUtils.lerp(0.82, 1,     Math.min(p * 2, 1))

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.06)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.06)
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetS, 0.06)
    )
  })

  // Build 6×10 instanced solar cells
  const COLS = 6, ROWS = 10
  const cellW = 0.37, cellH = 0.34, gap = 0.015
  const gridW = COLS * cellW + (COLS - 1) * gap
  const gridH = ROWS * cellH + (ROWS - 1) * gap
  const positions: [number, number, number][] = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      positions.push([
        -gridW / 2 + c * (cellW + gap) + cellW / 2,
        gridH / 2 - r * (cellH + gap) - cellH / 2,
        0.04,
      ])
    }
  }

  return (
    <group ref={groupRef}>
      {/* Aluminum frame */}
      <mesh>
        <boxGeometry args={[2.7, 4.0, 0.07]} />
        <meshStandardMaterial color="#28304a" metalness={0.65} roughness={0.35} />
      </mesh>

      {/* Cell surface backing */}
      <mesh position={[0, 0, 0.037]}>
        <planeGeometry args={[2.42, 3.72]} />
        <meshStandardMaterial color="#0e1530" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Individual solar cells */}
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <planeGeometry args={[cellW - 0.01, cellH - 0.01]} />
          <meshStandardMaterial
            color="#111c42"
            metalness={0.45}
            roughness={0.5}
            envMapIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Bus bars */}
      {[0.33, 0.66].map((x, i) => (
        <mesh key={`vb${i}`} position={[-gridW / 2 + x * gridW, 0, 0.045]}>
          <planeGeometry args={[0.008, 3.6]} />
          <meshStandardMaterial color="#c8d0f0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[2.3, 0.008]} />
        <meshStandardMaterial color="#c8d0f0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Junction box */}
      <mesh position={[0, -1.85, -0.03]}>
        <boxGeometry args={[0.38, 0.16, 0.06]} />
        <meshStandardMaterial color="#1e2230" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#f5c060" castShadow />
      <pointLight position={[-3, 2, 3]} intensity={0.6} color="#4A90D9" />
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <PanelMesh />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  CSS-3D fallback (no WebGL / reduced-motion)                        */
/* ------------------------------------------------------------------ */
export function SolarPanel3DFallback() {
  return (
    <div
      className="w-[240px] h-[360px] rounded-sm"
      style={{
        background: '#101525',
        border: '12px solid #232a42',
        transform: 'perspective(1200px) rotateY(-12deg) rotateX(-4deg)',
      }}
    >
      <div className="grid grid-cols-6 gap-px p-1 h-full">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="panel-cell" />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Default export — the real Three.js canvas                          */
/* ------------------------------------------------------------------ */
export default function SolarPanel3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  )
}
