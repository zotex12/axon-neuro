"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const locations = [
  { name: "Warwickshire", cx: 310, cy: 360 },
  { name: "Birmingham", cx: 290, cy: 350 },
  { name: "Coventry", cx: 320, cy: 355 },
];

export default function MapPlaceholder() {
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
    <section className="py-24 sm:py-32 bg-brand-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            ref={headingRef}
            className={`heading-underline text-3xl sm:text-4xl font-bold text-gray-900 ${
              underlineActive ? "active" : ""
            }`}
          >
            Find Local Support
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
            We&apos;re building a network of rehabilitation support workers across England.
          </p>
        </motion.div>

        <div ref={ref} className="relative max-w-md mx-auto">
          {/* UK Map outline SVG */}
          <motion.svg
            viewBox="0 0 500 700"
            className="w-full h-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Simplified UK outline */}
            <motion.path
              d="M250,50 C260,55 280,60 290,80 C300,100 310,120 305,140
                 C300,160 310,180 320,200 C330,220 350,230 360,250
                 C370,270 365,290 370,310 C375,330 380,350 370,370
                 C360,390 340,400 330,420 C320,440 310,460 300,475
                 C290,490 280,500 275,520 C270,540 265,555 260,570
                 C255,585 250,595 245,600 C240,605 230,600 225,590
                 C220,580 215,565 210,550 C205,535 195,520 190,505
                 C185,490 175,475 170,460 C165,445 155,435 150,420
                 C145,405 140,390 135,375 C130,360 125,345 130,330
                 C135,315 140,300 145,285 C150,270 155,255 165,245
                 C175,235 180,220 185,200 C190,180 195,165 200,150
                 C205,135 210,120 220,105 C230,90 235,75 240,60
                 C245,50 248,48 250,50Z"
              fill="none"
              stroke="#055000"
              strokeWidth="2"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 2, ease: "easeOut" },
                },
              }}
            />

            {/* Scotland rough shape */}
            <motion.path
              d="M230,50 C220,40 200,35 195,45 C190,55 185,70 190,85
                 C195,100 200,110 210,105 C215,100 220,90 225,80
                 C228,70 232,60 230,50Z
                 M260,30 C270,25 285,30 280,45 C275,55 265,50 260,40 C258,35 257,32 260,30Z"
              fill="none"
              stroke="#055000"
              strokeWidth="1.5"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.6,
                  transition: { duration: 1.5, ease: "easeOut", delay: 0.5 },
                },
              }}
            />

            {/* Wales rough shape enhancement */}
            <motion.path
              d="M175,350 C165,345 155,350 150,360 C145,370 150,385 160,390
                 C170,395 175,385 178,375 C180,365 180,355 175,350Z"
              fill="none"
              stroke="#055000"
              strokeWidth="1.5"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 0.6,
                  transition: { duration: 1, ease: "easeOut", delay: 1 },
                },
              }}
            />

            {/* Location dots */}
            {locations.map((loc, i) => (
              <g key={loc.name}>
                <motion.circle
                  cx={loc.cx}
                  cy={loc.cy}
                  r="6"
                  fill="#055000"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: 1.5 + i * 0.2,
                  }}
                />
                {/* Pulse ring */}
                <motion.circle
                  cx={loc.cx}
                  cy={loc.cy}
                  r="6"
                  fill="none"
                  stroke="#055000"
                  strokeWidth="2"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          scale: [1, 2.5],
                          opacity: [0.6, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 2 + i * 0.3,
                    ease: "easeOut",
                  }}
                />
                <motion.text
                  x={loc.cx + 12}
                  y={loc.cy + 4}
                  fill="#055000"
                  fontSize="11"
                  fontWeight="500"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 2 + i * 0.2 }}
                >
                  {loc.name}
                </motion.text>
              </g>
            ))}
          </motion.svg>

          {/* Coming Soon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 150, delay: 2.5 }}
            className="absolute top-6 right-6"
          >
            <div className="relative">
              <span className="inline-block bg-brand text-white text-xs font-semibold px-4 py-2 rounded-full">
                Coming Soon
              </span>
              <span className="absolute inset-0 bg-brand rounded-full animate-ping opacity-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
