import { forwardRef, useRef, useImperativeHandle } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { useScroll } from "@react-three/drei"
import type { Group } from "three"

// Similar to Drei's <Scroll> but keeps content vertically centered
export const FixedScroll = forwardRef<Group, { children: React.ReactNode }>(
  function FixedScroll({ children }, ref) {
    const group = useRef<Group>(null)
    useImperativeHandle(ref, () => group.current as Group)
    const state = useScroll()
    const { width } = useThree((s) => s.viewport)
    useFrame(() => {
      if (group.current) {
        // Only apply horizontal translation (if used) but keep Y constant
        group.current.position.x = state.horizontal
          ? -width * (state.pages - 1) * state.offset
          : 0
        group.current.position.y = 0
      }
    })
    return <group ref={group}>{children}</group>
  }
)
