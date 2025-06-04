import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { useState } from "react"

export function HeroSection() {
  const [open, setOpen] = useState(false)
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] w-full text-center">
      {/* 3D/space background handled by parent Canvas */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg mb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        あなたのアイデアに、AIという翼を。
      </motion.h1>
      <motion.p
        className="text-lg md:text-2xl text-slate-200 mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        学ぶだけじゃない。実際にプロダクトを創る実践型スクール。
      </motion.p>
      <motion.p
        className="text-base md:text-lg text-slate-400 mb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        0→1の新規事業をAIと共に生み出そう。非エンジニア・初心者OK。
      </motion.p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 text-white px-8 py-4 text-xl rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
            size="lg"
          >
            無料相談を申し込む
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg w-full">
          {/* ContactForm will be implemented and imported here */}
          <div className="py-8">フォーム準備中</div>
        </DialogContent>
      </Dialog>
    </section>
  )
} 