"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Home, Heart, Brain, Users } from "lucide-react";

const cards = [
  {
    icon: Home,
    title: "Daily Living",
    description: "Routines, budgeting, meal planning, and managing appointments with growing independence.",
  },
  {
    icon: Heart,
    title: "Emotional Wellbeing",
    description: "Confidence building, coping strategies, and emotional regulation support.",
  },
  {
    icon: Brain,
    title: "Independence & Skills",
    description: "Decision-making, cognitive support, and graded independence planning.",
  },
  {
    icon: Users,
    title: "Community & Social",
    description: "Accessing activities, hobbies, and building social confidence.",
  },
];

export default function WhatWeDo() {
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
    <section id="about" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2
            ref={headingRef}
            className={`heading-underline text-3xl sm:text-4xl font-bold text-gray-900 ${
              underlineActive ? "active" : ""
            }`}
          >
            What We Do
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            We provide flexible, person-centred 1:1 support focused on helping
            individuals rebuild everyday skills and independence, not ongoing care.
            Our approach is strength-based, goal-focused, and designed to reduce
            long-term reliance on support.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: i * 0.15,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px -12px rgba(5, 80, 0, 0.15)",
              }}
              className="group bg-white border border-gray-100 rounded-2xl p-8 transition-shadow duration-300 cursor-default"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <card.icon className="w-6 h-6 text-brand" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
