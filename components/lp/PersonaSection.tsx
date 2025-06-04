import { motion } from "framer-motion"

const problems = [
  { icon: "💡", text: "学んでも「何を作ればいいか」わからない" },
  { icon: "🧠", text: "一人で手を動かしても、結局挫折した" },
  { icon: "🚫", text: "プロダクト作りに進めない自分が嫌になった" },
]

export function PersonaSection() {
  return (
    <section className="flex flex-col items-center py-20 w-full">
      <motion.p
        className="text-xl md:text-2xl text-slate-300 mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        ChatGPTやAIを触ってみた。でも、事業にはつながらない…<br />
        そんな不安を感じたこと、ありませんか？
      </motion.p>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center bg-slate-800/60 rounded-xl p-6 w-full md:w-1/3 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
          >
            <span className="text-4xl mb-2">{p.icon}</span>
            <span className="text-lg text-slate-200 text-center">{p.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 