"use client";

import { motion } from "framer-motion";

function FloatingBlob({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ delay: delay + 0.5, duration: 1 }}
      className={className}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          fill="#055000"
          d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.4,40.8C63.4,52.6,51,61.6,37.5,68.4C24,75.2,9.4,79.8,-4.5,79.1C-18.4,78.4,-31.6,72.4,-44.2,65.1C-56.8,57.8,-68.8,49.2,-76.1,37.2C-83.4,25.2,-86,9.8,-84.2,-4.8C-82.4,-19.4,-76.2,-33.2,-66.8,-43.8C-57.4,-54.4,-44.8,-61.8,-31.7,-69.5C-18.6,-77.2,-4.8,-85.2,5.8,-82.4C16.4,-79.6,30.6,-83.6,44.7,-76.4Z"
          transform="translate(100 100)"
        />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const handleGetInTouch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f0fdf0 25%, #ffffff 50%, #f0fdf0 75%, #ffffff 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating blobs — hidden on small screens, smaller on tablet */}
      <FloatingBlob
        className="hidden sm:block absolute -top-20 -right-20 w-[250px] lg:w-[400px] h-[250px] lg:h-[400px] opacity-10 animate-blob-drift"
        delay={0}
      />
      <FloatingBlob
        className="hidden sm:block absolute top-1/3 -left-32 w-[200px] lg:w-[350px] h-[200px] lg:h-[350px] opacity-10 animate-blob-drift-2"
        delay={0.3}
      />
      <FloatingBlob
        className="hidden md:block absolute -bottom-16 right-1/4 w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] opacity-10 animate-blob-drift-3"
        delay={0.6}
      />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center pt-24 sm:pt-20 pb-12">
        <motion.h1
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
        >
          Rebuilding independence after{" "}
          <span className="text-brand">brain injury</span> and{" "}
          <span className="text-brand">neurological conditions</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Person-centred reablement support across England, helping you regain
          confidence, skills, and independence in daily living.
        </motion.p>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.1 }}
          className="mt-8 sm:mt-10"
        >
          <a
            href="#contact"
            onClick={handleGetInTouch}
            className="inline-block w-full sm:w-auto bg-brand text-white px-8 py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-brand-light transition-all duration-200 hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-0.5 min-h-[48px]"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
