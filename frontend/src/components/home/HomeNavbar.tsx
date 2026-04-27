"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { navItems } from "./hero-data";

export function HomeNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="topbar"
    >
      <a className="brand-mark" href="#">
        Care2 Training
      </a>

      <nav className="nav-list">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="nav-link"
          >
            <span className="nav-link-icon">
              {item.label}
              {item.label === "Courses" ? <ChevronDown size={18} /> : null}
            </span>
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <button className="btn btn-primary">
          Sign Up
        </button>
        <button className="btn btn-secondary">
          Log In
        </button>
      </div>
    </motion.header>
  );
}
