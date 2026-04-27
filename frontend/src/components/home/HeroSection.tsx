"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="hero-grid">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
        className="hero-copy"
      >
        <h1 className="hero-title">
          Your Fast Track to Global Opportunities
        </h1>
        <p className="hero-subtitle">
          Secure your future with expert guidance on visa applications, top university placements, and international career growth.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary">
            Get Free Assessment
          </button>
          <button className="btn btn-secondary">
            View Destinations
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.18 }}
        className="hero-media"
      >
        <Image
          src="https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&fit=crop&w=1400&q=80"
          alt="Student standing confidently on an international university campus"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>
    </section>
  );
}
