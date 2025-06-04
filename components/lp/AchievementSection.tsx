import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const products = [
  { img: "/placeholder.jpg", title: "AI議事録自動化ツール" },
  { img: "/placeholder.jpg", title: "ノーコードAIチャットボット" },
]
const voices = [
  { name: "田中 翔太", comment: "ゼロから本当にプロダクトが作れた！サポートが手厚い。", img: "/placeholder-user.jpg" },
  { name: "佐藤 美咲", comment: "AIの知識ゼロでも、仲間と一緒に成長できました。", img: "/placeholder-user.jpg" },
]
const beforeAfter = {
  before: "ただのアイデア",
  after: "実際に使えるAIツールに！",
}

export function AchievementSection() {
  return (
    <section className="flex flex-col items-center py-20 w-full">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-yellow-400 mb-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        実際に生まれたプロダクト・受講生の声
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center mb-12">
        {products.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}>
            <Card className="w-full md:w-72 bg-slate-900/80">
              <img src={p.img} alt={p.title} className="rounded-t-lg w-full h-40 object-cover" />
              <CardHeader>
                <CardTitle className="text-lg text-white">{p.title}</CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center mb-12">
        {voices.map((v, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}>
            <Card className="w-full md:w-72 bg-slate-900/80">
              <div className="flex items-center gap-4 p-6">
                <img src={v.img} alt={v.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="text-white font-semibold">{v.name}</div>
                  <div className="text-slate-300 text-sm">{v.comment}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div className="flex flex-col md:flex-row items-center gap-6 bg-slate-800/60 rounded-xl p-8 max-w-2xl w-full shadow-lg" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}>
        <div className="flex-1 text-center">
          <div className="text-slate-400 mb-2">Before</div>
          <div className="text-lg text-white font-bold">{beforeAfter.before}</div>
        </div>
        <span className="text-3xl text-yellow-400">→</span>
        <div className="flex-1 text-center">
          <div className="text-slate-400 mb-2">After</div>
          <div className="text-lg text-white font-bold">{beforeAfter.after}</div>
        </div>
      </motion.div>
    </section>
  )
} 