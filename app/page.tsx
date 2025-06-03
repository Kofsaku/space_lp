"use client"

import type React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ScrollControls, useScroll, Text, Stars, Sparkles, Environment, Scroll } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import type { Group } from "three"

// カメラに近づく処理だけ
function CameraRig({ children }: { children: React.ReactNode }) {
  const scroll = useScroll()
  const group = useRef<Group>(null)

  useFrame(() => {
    if (group.current) {
      const maxDepth = 900
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

// セクション内容（手動でテキスト位置調整）
function HeroSection() {
  return (
    <group>
      <Text position={[0, 1.2, 0]} fontSize={4} color="white" anchorX="center" anchorY="middle">
        AI × 事業開発
      </Text>
      <Text position={[0, -2, 0]} fontSize={2} color="#94a3b8" anchorX="center" anchorY="middle">
        未来を創造する力を、あなたの手に
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
      <Text position={[0, 2, 0]} fontSize={3} color="#f87171" anchorX="center" anchorY="middle">
        こんな悩みありませんか？
      </Text>
      {problems.map((text, i) => (
        <Text key={i} position={[0, -1.5 - i * 2, 0]} fontSize={1.5} color="#94a3b8" anchorX="center" anchorY="middle">
          {text}
        </Text>
      ))}
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
      <Text position={[0, -2, 0]} fontSize={3} color="#60a5fa" anchorX="center" anchorY="middle">
        未来都市への扉を開く
      </Text>
      {solutions.map((s, i) => (
        <group key={i} position={[0, -3.5 - i * 4, 0]}>
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

function CTASection() {
  return (
    <group>
      <Text position={[0, -4, 0]} fontSize={4} color="#fbbf24" anchorX="center" anchorY="middle">
        今すぐ始めよう
      </Text>
      <Text position={[0, -7, 0]} fontSize={2} color="#94a3b8" anchorX="center" anchorY="middle">
        限定モニター募集中 - 特別価格でご提供
      </Text>
      <Text position={[0, -9, 0]} fontSize={1.5} color="#94a3b8" anchorX="center" anchorY="middle">
        ※ 先着20名様限定
      </Text>
    </group>
  )
}

// Sceneコンポーネント
function Scene() {
  return (
    <CameraRig>
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={[100, 100, 100]} size={6} speed={0.4} />
      <Environment preset="night" />

      {/* Z位置だけで制御。Yは各セクション内で個別調整 */}
      <Section zPosition={-50}><HeroSection /></Section>
      <Section zPosition={-300}><ProblemSection /></Section>
      <Section zPosition={-550}><SolutionSection /></Section>
      <Section zPosition={-800}><CTASection /></Section>
    </CameraRig>
  )
}

// Appルート
export default function SpaceScrollLP() {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* ⭐ 星・光・環境はカメラとともに常に表示 */}
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={100} count={8000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={150} scale={[100, 100, 100]} size={6} speed={0.5} />
        <Environment preset="night" />

        {/* 📜 スクロールで動かすのはセクションのみ */}
        <ScrollControls pages={4} damping={0.15}>
          <Scroll>
            <Scene />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
