"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const faqItems = [
  {
    question: "Are you a care provider?",
    answer:
      "No. We are a reablement and neuro-rehabilitation support service. We do not provide personal care such as washing, dressing, or toileting, and we do not administer medication. Our focus is on helping people rebuild independence in everyday life, including routines, cooking, community access, cognitive strategies, and confidence.",
  },
  {
    question: "Who do you support?",
    answer:
      "Adults living with the effects of acquired brain injury, stroke, MS, Parkinson's, and other neurological conditions. Support is delivered one-to-one in the person's home and community.",
  },
  {
    question: "Where do you operate?",
    answer:
      "We are based in England and aim to offer support across the country as our network of rehabilitation support workers grows. Coverage in any given area depends on local availability — please get in touch and we will let you know what is possible.",
  },
  {
    question: "How do you work with other professionals?",
    answer:
      "We work alongside care providers, occupational therapists, neuropsychologists, case managers, and other members of the wider professional team. Our role is to complement clinical and care input, not replace it, and we coordinate closely so that support stays joined up.",
  },
  {
    question: "Who funds the service?",
    answer:
      "Funding can come through a number of routes including NHS Continuing Healthcare, local authorities, case managers, and private clients. We are happy to discuss what is appropriate for each situation.",
  },
  {
    question: "How do you choose support workers?",
    answer:
      "We match support workers to each client based on clinical need, location, personality, and the goals set out in the support plan. All staff are enhanced-DBS checked and trained against our internal staff standards before being placed with a client.",
  },
  {
    question: "How do you keep track of progress?",
    answer:
      "Progress is captured through structured session notes, regular summaries, and formal reviews with the client, the family, and the wider professional team. Goals are set in plain language and tracked against meaningful outcomes rather than hours delivered.",
  },
  {
    question: "How do I get in touch about a referral?",
    answer:
      "Use the contact form below, or email info@axonneuro.co.uk. We will arrange a short initial conversation, review the situation together, and explain what support might look like.",
  },
  {
    question: "What happens after I get in touch?",
    answer:
      "We will have an initial conversation to understand the situation, review any existing reports or care plans you would like to share, and discuss what kind of support would be useful. From there we can outline next steps, including timing and costs, with no obligation.",
  },
];

export default function Faq() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-50px" });
  const [underlineActive, setUnderlineActive] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (headingInView) {
      const timer = setTimeout(() => setUnderlineActive(true), 300);
      return () => clearTimeout(timer);
    }
  }, [headingInView]);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <h2
            ref={headingRef}
            className={`heading-underline text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 ${
              underlineActive ? "active" : ""
            }`}
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            Straight answers about how we work, who we support, and how to refer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            return (
              <div key={item.question} className="border-b border-gray-200">
                <button
                  id={questionId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between gap-4 py-5 sm:py-6 text-left font-semibold text-gray-900 transition-colors duration-200 hover:text-brand focus:outline-none focus-visible:text-brand"
                >
                  <span className="text-base sm:text-lg leading-snug">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center text-brand"
                  >
                    <span className="absolute h-[2px] w-4 rounded-full bg-current" />
                    <motion.span
                      animate={{
                        opacity: isOpen ? 0 : 1,
                        rotate: isOpen ? 45 : 0,
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute h-4 w-[2px] rounded-full bg-current"
                    />
                  </span>
                </button>
                <motion.div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 sm:pb-6 pr-10 text-sm sm:text-base leading-relaxed text-gray-600">
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
