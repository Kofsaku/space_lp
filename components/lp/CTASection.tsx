import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

const interests = [
  "AIを使った自社プロダクト", "起業したい", "副業で試したい", "その他"
]

export function CTASection() {
  const form = useForm()
  return (
    <section className="flex flex-col items-center py-20 w-full">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        まだ"誰も見たことのない"サービスを、あなたの手で生み出そう。
      </motion.h2>
      <motion.p
        className="text-lg text-slate-200 mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        無料で相談する
      </motion.p>
      <Form {...form}>
        <form className="bg-slate-900/80 rounded-xl p-8 w-full max-w-lg flex flex-col gap-6 shadow-lg">
          <FormItem>
            <FormLabel>お名前</FormLabel>
            <FormControl>
              <Input placeholder="山田 太郎" required />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>メールアドレス</FormLabel>
            <FormControl>
              <Input type="email" placeholder="your@email.com" required />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>興味のある内容</FormLabel>
            <FormControl>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {interests.map((i) => (
                    <SelectItem key={i} value={i}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>ご相談・ご質問など</FormLabel>
            <FormControl>
              <Textarea placeholder="自由にご記入ください" rows={4} />
            </FormControl>
          </FormItem>
          <Button type="submit" className="w-full text-lg py-3 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-200">送信する</Button>
        </form>
      </Form>
      <Button variant="secondary" className="w-full max-w-lg mt-4 py-3 rounded-full text-lg bg-green-500 hover:bg-green-600 text-white font-bold">LINEで無料相談</Button>
      <div className="text-slate-400 text-sm mt-4 text-center">今だけ無料・先着20名限定・リリース前の特別モニター枠</div>
    </section>
  )
} 