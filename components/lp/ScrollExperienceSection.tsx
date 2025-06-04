import { motion } from "framer-motion"

export function ScrollExperienceSection() {
  return (
    <section className="flex flex-col items-center py-20 w-full">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-purple-400 mb-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        未来都市への奥行きスクロール体験
      </motion.h2>
      <motion.p
        className="text-base md:text-lg text-slate-300 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        下に進むほど、未来に近づく。宇宙・未来都市の3D空間を体験してください。
      </motion.p>
    </section>
  )
} 