"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Dot positions calibrated to the accurate UK SVG (viewBox 0 0 500 800)
const locations = [
  { name: "Birmingham", cx: 280, cy: 560 },
  { name: "Coventry", cx: 300, cy: 570 },
  { name: "Warwickshire", cx: 310, cy: 555 },
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

        <div ref={ref} className="relative max-w-sm mx-auto">
          {/* Accurate UK mainland outline SVG */}
          <motion.svg
            viewBox="0 0 500 800"
            className="w-full h-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Great Britain mainland — Scotland, England, Wales */}
            <motion.path
              d={`
                M 255 95 L 260 85 L 270 80 L 275 70 L 265 60 L 255 55 L 245 50
                L 235 55 L 225 65 L 220 75 L 210 80 L 200 78 L 195 85 L 200 95
                L 195 105 L 185 110 L 180 100 L 170 95 L 165 105 L 170 115
                L 180 120 L 175 130 L 180 140 L 190 135 L 200 130 L 210 125
                L 215 115 L 225 110 L 230 100 L 240 95 Z

                M 280 120 L 290 115 L 300 120 L 305 130 L 295 135 L 285 130 Z

                M 235 140 L 245 135 L 255 130 L 268 125 L 278 130 L 285 140
                L 290 150 L 298 145 L 310 148 L 305 158 L 295 165 L 285 160
                L 280 170 L 290 178 L 300 175 L 308 180 L 315 172 L 325 175
                L 330 185 L 322 195 L 312 200 L 305 210 L 295 215 L 288 225
                L 280 220 L 275 210 L 268 218 L 258 222 L 250 215 L 242 220
                L 235 228 L 228 222 L 222 230 L 215 225 L 210 218 L 218 210
                L 225 205 L 220 198 L 212 200 L 205 195 L 210 185 L 218 180
                L 225 175 L 220 165 L 212 160 L 218 150 L 228 148 Z

                M 248 235 L 258 230 L 270 228 L 282 232 L 292 228 L 302 225
                L 312 220 L 322 225 L 330 235 L 325 248 L 318 260 L 325 270
                L 332 280 L 340 290 L 345 302 L 340 315 L 332 325 L 338 335
                L 345 345 L 350 358 L 345 370 L 338 378 L 340 390 L 348 400
                L 355 412 L 360 425 L 358 440 L 350 450 L 340 458 L 332 470
                L 325 480 L 330 492 L 338 502 L 335 515 L 325 525 L 318 535
                L 320 548 L 328 558 L 335 570 L 330 582 L 322 590 L 315 600
                L 320 612 L 328 622 L 335 635 L 340 648 L 348 658 L 355 668
                L 350 678 L 338 685 L 325 690 L 312 695 L 298 698 L 285 700
                L 275 695 L 268 685 L 258 680 L 250 688 L 240 692 L 228 688
                L 218 680 L 210 672 L 205 660 L 212 648 L 220 640 L 228 630
                L 222 618 L 215 608 L 208 598 L 202 588 L 195 580 L 188 572
                L 180 568 L 172 575 L 162 580 L 155 572 L 150 560 L 155 548
                L 162 538 L 158 525 L 150 515 L 145 505 L 150 495 L 158 488
                L 165 478 L 160 468 L 152 460 L 148 448 L 155 438 L 165 432
                L 172 422 L 168 412 L 160 405 L 155 395 L 162 385 L 172 380
                L 168 368 L 158 362 L 150 355 L 148 342 L 155 332 L 165 328
                L 175 322 L 180 310 L 175 298 L 168 288 L 172 278 L 182 272
                L 190 265 L 195 255 L 205 248 L 215 242 L 225 238 L 238 235 Z
              `}
              fill="none"
              stroke="#055000"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: {
                  pathLength: 1,
                  opacity: 1,
                  transition: { duration: 2.5, ease: "easeOut" },
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
                    delay: 2 + i * 0.2,
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
                    delay: 2.5 + i * 0.3,
                    ease: "easeOut",
                  }}
                />
                <motion.text
                  x={loc.cx + 12}
                  y={loc.cy + 4}
                  fill="#055000"
                  fontSize="11"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="500"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 2.5 + i * 0.2 }}
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
            transition={{ type: "spring", stiffness: 150, delay: 3 }}
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
