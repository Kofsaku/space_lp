import { motion } from "framer-motion"

const features = [
  {
    title: "AI活用×プロダクト開発に特化",
    desc: "ChatGPTやノーコード／コードでMVP作成までサポート",
  },
  {
    title: "伴走型で1人じゃない",
    desc: "毎週の進捗支援・個別サポートで「継続」できる",
  },
  {
    title: "現場主義のカリキュラム",
    desc: "作って・検証して・ピボットまで体験",
  },
]

export function SolutionSection() {
  return (
    <section className="flex flex-col items-center py-20 w-full">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-blue-400 mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        だから私たちは、"実践重視"のスクールにしました。
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center bg-slate-800/60 rounded-xl p-8 w-full md:w-1/3 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
          >
            <span className="text-xl font-semibold text-blue-300 mb-2">{f.title}</span>
            <span className="text-base text-slate-200 text-center mb-2">{f.desc}</span>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="text-base text-slate-400 mt-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        最終的には「自分のプロダクト」を作れるようになります。
      </motion.p>
    </section>
  )
} 