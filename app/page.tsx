"use client"

import type React from "react"
import { Canvas } from "@react-three/fiber"
import { ScrollControls, useScroll, Text, Stars, Sparkles, Environment } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef, useState, useEffect } from "react"
import type { Group } from "three"
import { motion } from "framer-motion"

// 現在のセクションを管理するカスタムフック
function useCurrentSection(totalSections: number) {
  const [currentSection, setCurrentSection] = useState(0)
  const scroll = useScroll()

  useFrame(() => {
    // スクロール位置に基づいて現在のセクションを計算
    const section = Math.floor(scroll.offset * totalSections)
    if (section !== currentSection) {
      setCurrentSection(section)
    }
  })

  return currentSection
}

function CameraRig({ children }: { children: React.ReactNode }) {
  const scroll = useScroll()
  const group = useRef<Group>(null)

  useFrame(() => {
    if (group.current) {
      // スクロールに応じてz軸方向に移動（奥へ進む）
      group.current.position.z = scroll.offset * -1000
    }
  })

  return <group ref={group}>{children}</group>
}

// セクションコンポーネントをラップして、現在のセクションに基づいて表示/非表示を制御
function Section({
  children,
  index,
  currentSection,
  zPosition,
}: {
  children: React.ReactNode
  index: number
  currentSection: number
  zPosition: number
}) {
  // 現在のセクションか、その前後のセクションのみ表示
  const isVisible = Math.abs(currentSection - index) <= 1
  const opacity = Math.max(0, 1 - Math.abs(currentSection - index))

  return (
    <group position={[0, 0, zPosition]} visible={isVisible}>
      {children}
    </group>
  )
}

function HeroSection() {
  return (
    <group>
      <Text
        position={[0, 2, 0]}
        fontSize={4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        AI × 事業開発
      </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={2}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
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
      <Text
        position={[0, 4, 0]}
        fontSize={3}
        color="#f87171"
        anchorX="center"
        anchorY="middle"
      >
        こんな悩みありませんか？
      </Text>
      {problems.map((problem, index) => (
        <Text
          key={index}
          position={[0, 2 - index * 1.5, 0]}
          fontSize={1.5}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          {problem}
        </Text>
      ))}
    </group>
  )
}

function SolutionSection() {
  const solutions = [
    {
      title: "実践的AI開発",
      description: "理論だけでなく、実際のプロダクト開発を通じて学習",
    },
    {
      title: "事業化ノウハウ",
      description: "技術を収益に変える具体的な方法論を習得",
    },
    {
      title: "コミュニティ",
      description: "同じ志を持つ仲間との継続的な学習環境",
    },
    {
      title: "最新技術",
      description: "常にアップデートされる最先端のAI技術情報",
    },
  ]

  return (
    <group>
      <Text
        position={[0, 4, 0]}
        fontSize={3}
        color="#60a5fa"
        anchorX="center"
        anchorY="middle"
      >
        未来都市への扉を開く
      </Text>
      {solutions.map((solution, index) => (
        <group key={index} position={[0, 2 - index * 1.5, 0]}>
          <Text
            fontSize={1.5}
            color="#93c5fd"
            anchorX="center"
            anchorY="middle"
          >
            {solution.title}
          </Text>
          <Text
            position={[0, -0.5, 0]}
            fontSize={1}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
          >
            {solution.description}
          </Text>
        </group>
      ))}
    </group>
  )
}

function CTASection() {
  return (
    <group>
      <Text
        position={[0, 2, 0]}
        fontSize={4}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
      >
        今すぐ始めよう
      </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={2}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        限定モニター募集中 - 特別価格でご提供
      </Text>
      <Text
        position={[0, -2, 0]}
        fontSize={1.5}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        ※ 先着20名様限定
      </Text>
    </group>
  )
}

function Scene() {
  const totalSections = 4
  const currentSection = useCurrentSection(totalSections)

  return (
    <CameraRig>
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={[100, 100, 100]} size={6} speed={0.4} />
      <Environment preset="night" />
      <Section index={0} currentSection={currentSection} zPosition={0}>
        <HeroSection />
      </Section>
      <Section index={1} currentSection={currentSection} zPosition={-1000}>
        <ProblemSection />
      </Section>
      <Section index={2} currentSection={currentSection} zPosition={-2000}>
        <SolutionSection />
      </Section>
      <Section index={3} currentSection={currentSection} zPosition={-3000}>
        <CTASection />
      </Section>
    </CameraRig>
  )
}

export default function SpaceScrollLP() {
  // bodyのoverflow:hiddenのみ適用
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ScrollControls
          pages={6}
          damping={0.1}
          enabled={true}
          distance={1}
          infinite={false}
          horizontal={false}
        >
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  )
}
