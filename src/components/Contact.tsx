"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Phone, CheckCircle } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-50px" });
  const [underlineActive, setUnderlineActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (headingInView) {
      const timer = setTimeout(() => setUnderlineActive(true), 300);
      return () => clearTimeout(timer);
    }
  }, [headingInView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
    { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "Your phone number" },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-white">
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
            Get in Touch
          </h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Ready to start a conversation? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div ref={ref}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="flex flex-col items-center justify-center h-full py-12 sm:py-16 relative"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-50 flex items-center justify-center mb-5 sm:mb-6"
                >
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-brand" />
                </motion.div>
                {/* Confetti particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-brand"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                      opacity: 0,
                      scale: 0,
                      x: (Math.random() - 0.5) * 200,
                      y: (Math.random() - 0.5) * 200,
                    }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                    style={{ opacity: [0.3, 0.5, 0.7, 1][i % 4] }}
                  />
                ))}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 text-sm sm:text-base">We&apos;ll be in touch shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-brand font-medium text-sm hover:underline min-h-[44px] px-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {fields.map((field, i) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      delay: i * 0.1,
                    }}
                  >
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      {field.label}
                    </label>
                    <div className="input-focus-effect relative">
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all duration-200 min-h-[48px]"
                      />
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.3,
                  }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Message
                  </label>
                  <div className="input-focus-effect relative">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Tell us about your enquiry..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all duration-200 resize-none"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: 0.4,
                  }}
                >
                  <button
                    type="submit"
                    className="shimmer-btn w-full bg-brand text-white py-3.5 rounded-xl font-semibold text-base hover:bg-brand-light transition-colors duration-200 min-h-[48px]"
                  >
                    Send Message
                  </button>
                </motion.div>
              </form>
            )}
          </div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Contact Information
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                Whether you&apos;re a case manager, healthcare professional, family
                member, or individual seeking support, we&apos;re here to help.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:info@axonneuro.co.uk"
                className="flex items-center gap-4 min-h-[48px] group"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Email</p>
                  <span className="text-sm sm:text-base text-gray-900 font-medium group-hover:text-brand transition-colors">
                    info@axonneuro.co.uk
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 min-h-[48px]">
                <div className="w-11 h-11 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                  <span className="text-sm sm:text-base text-gray-900 font-medium">
                    Phone number coming soon
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
