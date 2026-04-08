"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gray-50 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Axon Neuro"
              width={220}
              height={56}
              className="h-10 sm:h-14 w-auto opacity-70"
            />
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-brand transition-colors min-h-[44px] flex items-center">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand transition-colors min-h-[44px] flex items-center">
              Cookie Policy
            </a>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-200 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            &copy; 2025 Axon Neuro Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
