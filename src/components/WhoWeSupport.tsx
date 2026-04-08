"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const conditions = [
  "Brain Injury",
  "Stroke",
  "Multiple Sclerosis",
  "Parkinson's Disease",
  "Other Neurological Conditions",
];

const fundingSources = [
  { title: "NHS Continuing Healthcare", desc: "CHC-funded packages" },
  { title: "Local Authorities", desc: "Social care referrals" },
  { title: "Case Managers", desc: "Medico-legal cases" },
  { title: "Private Self-Funding", desc: "Direct arrangements" },
];

export default function WhoWeSupport() {
  const pillsRef = useRef<HTMLDivElement>(null);
  const fundingRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillsInView = useInView(pillsRef, { once: true, margin: "-80px" });
  const fundingInView = useInView(fundingRef, { once: true, margin: "-80px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-50px" });
  const [underlineActive, setUnderlineActive] = useState(false);

  useEffect(() => {
    if (headingInView) {
      const timer = setTimeout(() => setUnderlineActive(true), 300);
      return () => clearTimeout(timer);
    }
  }, [headingInView]);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-brand-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <h2
            ref={headingRef}
            className={`heading-underline text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 ${
              underlineActive ? "active" : ""
            }`}
          >
            Who We Support
          </h2>
          <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
            Adults living with brain injury, stroke, multiple sclerosis,
            Parkinson&apos;s disease, and other neurological conditions.
          </p>
        </motion.div>

        {/* Condition pills — flex-wrap handles mobile naturally */}
        <div ref={pillsRef} className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12 sm:mb-16">
          {conditions.map((condition, i) => (
            <motion.span
              key={condition}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={pillsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: i * 0.12,
              }}
              className="inline-block bg-white border border-brand/20 text-brand font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm shadow-sm"
            >
              {condition}
            </motion.span>
          ))}
        </div>

        {/* Funding sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Funded through NHS Continuing Healthcare, Local Authorities, Case Managers, and private self-funding.
          </p>
        </motion.div>

        <div ref={fundingRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {fundingSources.map((source, i) => (
            <motion.div
              key={source.title}
              initial={{ opacity: 0, y: 20 }}
              animate={fundingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="bg-white rounded-xl p-4 sm:p-5 text-center border border-gray-100 shadow-sm"
            >
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">{source.title}</h4>
              <p className="text-gray-500 text-[11px] sm:text-xs mt-1">{source.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
