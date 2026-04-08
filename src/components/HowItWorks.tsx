"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const steps = [
  { number: 1, title: "Referral received", desc: "We receive a referral and begin our initial review process." },
  { number: 2, title: "Assessment & staff matching", desc: "A thorough assessment ensures the right support worker match." },
  { number: 3, title: "Goal-focused support begins", desc: "Tailored reablement support starts, focused on your goals." },
  { number: 4, title: "Ongoing review & progress", desc: "Regular reviews track progress and adapt the support plan." },
];

function AnimatedNumber({ target, inView }: { target: number; inView: boolean }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(target);
    }
  }, [inView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setValue(v));
    return unsubscribe;
  }, [display]);

  return <span>{value}</span>;
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-50px" });
  const [underlineActive, setUnderlineActive] = useState(false);

  useEffect(() => {
    if (headingInView) {
      const timer = setTimeout(() => setUnderlineActive(true), 300);
      return () => clearTimeout(timer);
    }
  }, [headingInView]);

  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2
            ref={headingRef}
            className={`heading-underline text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 ${
              underlineActive ? "active" : ""
            }`}
          >
            How It Works
          </h2>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Connecting line — desktop horizontal */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="h-full bg-brand/20 origin-left"
            />
          </div>

          {/* Connecting line — mobile/tablet vertical */}
          <div className="lg:hidden absolute left-[40px] sm:left-1/2 top-[80px] bottom-[80px] w-[2px] sm:-translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="h-full bg-brand/20 origin-top"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.3 + i * 0.25,
                }}
                className="relative flex lg:flex-col items-start sm:items-center lg:text-center gap-5 lg:gap-0"
              >
                {/* Step circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2 + i * 0.25,
                  }}
                  className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] lg:w-[104px] lg:h-[104px] rounded-full bg-brand-50 border-2 border-brand/20 flex items-center justify-center flex-shrink-0 lg:mx-auto lg:mb-5"
                >
                  <span className="text-2xl sm:text-3xl font-bold text-brand">
                    <AnimatedNumber target={step.number} inView={isInView} />
                  </span>
                </motion.div>

                {/* Step text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.25 }}
                  className="flex-1 min-w-0 pt-1 sm:pt-0"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm max-w-[240px] lg:mx-auto">
                    {step.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
