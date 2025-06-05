"use client"

import type React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Text, Stars, Sparkles, Environment } from "@react-three/drei"
import { useRef, useState, useEffect, useMemo } from "react"
import type { Group } from "three"
import * as THREE from "three"

// カメラに近づく処理だけ
function CameraRig({ children }: { children: React.ReactNode }) {
  const scroll = useScroll()
  const group = useRef<Group>(null)

  useFrame(() => {
    if (group.current) {
      const maxDepth = 1300
      group.current.position.z = scroll.offset * maxDepth
    }
  })

  return <group ref={group}>{children}</group>
}

// 各セクションの zPosition のみ使用（y補正なし）
function Section({
  children,
  zPosition,
}: {
  children: React.ReactNode
  zPosition: number
}) {
  return (
    <group position={[0, 0, zPosition]}>
      {children}
    </group>
  )
}

// Custom 3D Starfield Effect (Kirupa style)
function Starfield({ count = 500, speed = 0.08, spread = 100, starSize = 0.7 }) {
  const mesh = useRef<THREE.Points>(null)
  const [positions] = useState(() => {
    // Each star: [x, y, z, speed, maxRadius]
    const arr = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * 2 * Math.PI
      const radius = Math.random() * spread
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      const z = Math.random() * spread * 2 - spread
      const s = 0.5 + Math.random() * 1.5
      const maxR = 0.5 + Math.random() * 1.5
      arr.push({ x, y, z, s, maxR })
    }
    return arr
  })

  useFrame(() => {
    for (let i = 0; i < positions.length; i++) {
      let star = positions[i]
      star.z += star.s * speed * 2
      if (star.z > spread) {
        // Reset star to far away
        const angle = Math.random() * 2 * Math.PI
        const radius = Math.random() * spread
        star.x = Math.cos(angle) * radius
        star.y = Math.sin(angle) * radius
        star.z = -spread
        star.s = 0.5 + Math.random() * 1.5
        star.maxR = 0.5 + Math.random() * 1.5
      }
    }
    if (mesh.current) {
      const geometry = mesh.current.geometry as THREE.BufferGeometry
      geometry.attributes.position.needsUpdate = true
      geometry.attributes.size.needsUpdate = true
    }
  })

  // Prepare buffer geometry for all stars
  const starGeom = useMemo(() => {
    const positionsArr = new Float32Array(count * 3)
    const sizesArr = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positionsArr[i * 3] = positions[i].x
      positionsArr[i * 3 + 1] = positions[i].y
      positionsArr[i * 3 + 2] = positions[i].z
      sizesArr[i] = positions[i].maxR * starSize
    }
    const geom = new THREE.BufferGeometry()
    geom.setAttribute("position", new THREE.BufferAttribute(positionsArr, 3))
    geom.setAttribute("size", new THREE.BufferAttribute(sizesArr, 1))
    return geom
  }, [count, positions, starSize])

  // Update geometry on each frame
  useFrame(() => {
    if (!mesh.current) return
    const geometry = mesh.current.geometry as THREE.BufferGeometry
    const pos = geometry.attributes.position.array as Float32Array
    const size = geometry.attributes.size.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3] = positions[i].x
      pos[i * 3 + 1] = positions[i].y
      pos[i * 3 + 2] = positions[i].z
      // Make stars grow as they approach
      size[i] = positions[i].maxR * starSize * (1.5 - (positions[i].z + spread) / (2 * spread))
    }
    geometry.attributes.position.needsUpdate = true
    geometry.attributes.size.needsUpdate = true
  })

  // Custom shader material for glowing stars
  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color("#fff") },
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        void main() {
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vSize;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float alpha = smoothstep(0.5, 0.2, d);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    })
  }, [])

  return (
    <points ref={mesh} geometry={starGeom} material={starMaterial} />
  )
}

// 3D Background Scene
function BackgroundScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Starfield count={1200} speed={0.3} spread={120} starSize={1.3} />
      <Sparkles count={150} scale={[100, 100, 100]} size={6} speed={0.5} />
      <Environment preset="night" />
    </>
  )
}

function AchievementSection() {
  return (
    <group>
      <Text position={[0, 0, 0]} fontSize={2.5} color="#facc15" anchorX="center" anchorY="middle">
        実際に生まれたプロダクト・受講生の声
      </Text>
      <Text position={[0, -2, 0]} fontSize={1.2} color="#fff" anchorX="center" anchorY="middle">
        AI議事録自動化ツール など（ダミー）
      </Text>
      <Text position={[0, -4, 0]} fontSize={1.2} color="#fff" anchorX="center" anchorY="middle">
        「ゼロから本当にプロダクトが作れた！」（ダミー）
      </Text>
    </group>
  )
}

function FAQSection() {
  return (
    <group>
      <Text position={[0, 0, 0]} fontSize={2} color="#4ade80" anchorX="center" anchorY="middle">
        よくある質問
      </Text>
      <Text position={[0, -2, 0]} fontSize={1.1} color="#fff" anchorX="center" anchorY="middle">
        Q. プログラミング経験ゼロでも大丈夫ですか？\nA. 問題ありません。受講者の約70％は非エンジニアです。
      </Text>
      <Text position={[0, -4, 0]} fontSize={1.1} color="#fff" anchorX="center" anchorY="middle">
        Q. AIの知識がなくても参加できますか？\nA. ChatGPTやNoCodeなど、やさしい導入から始めます。
      </Text>
      <Text position={[0, -6, 0]} fontSize={1.1} color="#fff" anchorX="center" anchorY="middle">
        Q. 料金や期間は？\nA. モニター期間中は一部無料。正式リリース前に相談が可能です。
      </Text>
    </group>
  )
}

function CTASection() {
  return (
    <group>
      <Text position={[0, 0, 0]} fontSize={2.2} color="#fbbf24" anchorX="center" anchorY="middle">
        まだ"誰も見たことのない"サービスを、あなたの手で生み出そう。
      </Text>
      <Text position={[0, -2, 0]} fontSize={1.2} color="#94a3b8" anchorX="center" anchorY="middle">
        無料で相談する（フォームはWeb版で表示）
      </Text>
      <Text position={[0, -4, 0]} fontSize={1.1} color="#94a3b8" anchorX="center" anchorY="middle">
        今だけ無料・先着20名限定・リリース前の特別モニター枠
      </Text>
    </group>
  )
}

function ProblemSection() {
  const problems = [
    "AIを学んでも実際のビジネスに活かせない",
    "技術は分かるが事業化のノウハウがない",
    "一人で学習していても限界を感じる",
    "最新のAI技術についていけない",
  ]
  return (
    <group>
      <Text position={[0, 0, 0]} fontSize={3} color="#f87171" anchorX="center" anchorY="middle">
        こんな悩みありませんか？
      </Text>
      {problems.map((text, i) => (
        <Text key={i} position={[0, -2 - i * 2, 0]} fontSize={1.5} color="#94a3b8" anchorX="center" anchorY="middle">
          {text}
        </Text>
      ))}
    </group>
  )
}

function HeroSection() {
  return (
    <group>
      <Text position={[0, 0, 0]} fontSize={4} color="white" anchorX="center" anchorY="middle">
        AI × 事業開発
      </Text>
      <Text position={[0, -2, 0]} fontSize={2} color="#94a3b8" anchorX="center" anchorY="middle">
        未来を創造する力を、あなたの手に
      </Text>
    </group>
  )
}

function SolutionSection() {
  const solutions = [
    { title: "実践的AI開発", description: "理論だけでなく、実際のプロダクト開発を通じて学習" },
    { title: "事業化ノウハウ", description: "技術を収益に変える具体的な方法論を習得" },
    { title: "コミュニティ", description: "同じ志を持つ仲間との継続的な学習環境" },
    { title: "最新技術", description: "常にアップデートされる最先端のAI技術情報" },
  ]
  return (
    <group>
      <Text position={[0, 0, 0]} fontSize={3} color="#60a5fa" anchorX="center" anchorY="middle">
        未来都市への扉を開く
      </Text>
      {solutions.map((s, i) => (
        <group key={i} position={[0, -2.5 - i * 3, 0]}>
          <Text fontSize={1.5} color="#93c5fd" anchorX="center" anchorY="middle">
            {s.title}
          </Text>
          <Text position={[0, -1.2, 0]} fontSize={1} color="#94a3b8" anchorX="center" anchorY="middle">
            {s.description}
          </Text>
        </group>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <CameraRig>
      <ambientLight intensity={0.5} />
      <Starfield count={800} speed={0.25} spread={100} starSize={1.2} />
      <Sparkles count={100} scale={[100, 100, 100]} size={6} speed={0.4} />
      <Environment preset="night" />

      <Section zPosition={-50}><HeroSection /></Section>
      <Section zPosition={-300}><ProblemSection /></Section>
      <Section zPosition={-550}><SolutionSection /></Section>
      <Section zPosition={-800}><AchievementSection /></Section>
      <Section zPosition={-1050}><FAQSection /></Section>
      <Section zPosition={-1300}><CTASection /></Section>
    </CameraRig>
  )
}

export default function SpaceScrollLP() {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Starfield count={1200} speed={0.3} spread={120} starSize={1.3} />
        <Sparkles count={150} scale={[100, 100, 100]} size={6} speed={0.5} />
        <Environment preset="night" />

        {/* The Drei Scroll element is omitted to keep sections vertically centered */}
        <ScrollControls pages={12} damping={0.15}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  )
}
