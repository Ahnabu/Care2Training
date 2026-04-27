"use client";

import { motion } from "framer-motion";
import { ChevronDown, Mail, MapPin } from "lucide-react";
import { navItems } from "./hero-data";

export function HomeNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="navbar-shell"
    >
      <div className="utility-bar">
        <div className="utility-group">
          <a className="utility-item" href="mailto:info@care2training.com">
            <Mail size={16} strokeWidth={2.2} />
            <span>info@care2training.com</span>
          </a>
          <a className="utility-item" href="tel:+8801842497766">
            <span className="utility-flag utility-flag-bd" aria-hidden="true" />
            <span>+880 1842 497 766</span>
          </a>
          <a className="utility-item" href="tel:+4402035762072">
            <span className="utility-flag utility-flag-uk" aria-hidden="true" />
            <span>+44 0203 576 2072</span>
          </a>
        </div>

        <div className="utility-group utility-group-end">
          <button className="utility-language" type="button">
            <span>English</span>
            <ChevronDown size={14} strokeWidth={2.4} />
          </button>
          <button className="utility-cta" type="button">
            Become an Agent
          </button>
        </div>
      </div>

      <div className="navbar-main">
        <a className="brand-lockup" href="#">
          <span className="brand-mark" aria-hidden="true">
            C2
          </span>
          <span className="brand-copy">
            <span className="brand-name">Care2 Training</span>
          </span>
        </a>

        <nav className="nav-list">
          {navItems.map((item, index) => {
            const isDropdown = index === 2 || index === 0;

            return (
              <a key={item.label} href={item.href} className="nav-link">
                <span className="nav-link-icon">
                  {item.label}
                  {isDropdown ? <ChevronDown size={16} /> : null}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button className="nav-book-button" type="button">
            Book an Appointment
          </button>
        </div>
      </div>
    </motion.header>
  );
}
