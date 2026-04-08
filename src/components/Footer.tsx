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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="Axon Neuro"
              width={220}
              height={56}
              className="h-14 w-auto opacity-70"
            />
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-brand transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2025 Axon Neuro Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
