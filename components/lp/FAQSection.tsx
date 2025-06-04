import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { motion } from "framer-motion"

const faqs = [
  {
    q: "プログラミング経験ゼロでも大丈夫ですか？",
    a: "問題ありません。実際、受講者の約70％は非エンジニアです。",
  },
  {
    q: "AIの知識がなくても参加できますか？",
    a: "ChatGPTやNoCodeなど、やさしい導入から始めます。",
  },
  {
    q: "料金や期間は？",
    a: "モニター期間中は一部無料。正式リリース前に相談が可能です。",
  },
]

export function FAQSection() {
  return (
    <section className="flex flex-col items-center py-20 w-full">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-green-400 mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        よくある質問
      </motion.h2>
      <Accordion type="single" collapsible className="w-full max-w-2xl">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={"faq-" + i}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
} 