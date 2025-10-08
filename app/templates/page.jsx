"use client";

import TemplateSection from "../components/TemplateSection";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function TemplatesPage() {
  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-28 text-center overflow-hidden">
        {/* Decorative Gradient Blob */}
        <div className="absolute -top-20 -right-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Resume Templates
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Choose from our AI-optimized, professional templates designed to help
            you land interviews and impress recruiters with a standout resume.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-10 inline-block"
          >
            <a
              href="#templates"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all"
            >
              Browse Templates
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Template Section (grid of templates) */}
      <section id="templates">
        <TemplateSection />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
