"use client";

import { motion } from "framer-motion";
import { stats } from "./hero-data";

export function StatsStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.28 }}
      className="stats-strip"
    >
      <div className="stats-grid">
        {stats.map((item) => (
          <article key={item.label} className="stat-item">
            <div className="stat-icon">
              <item.icon size={28} strokeWidth={2} />
            </div>
            <div>
              <p className="stat-value">
                {item.value}
              </p>
              <p className="stat-label">{item.label}</p>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
