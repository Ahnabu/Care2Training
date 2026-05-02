import { BadgeCheck, Rocket, University } from "lucide-react";

export const navItems = [
  { label: "Courses", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Corporate Training", href: "#" },
  { label: "Blog", href: "#" },
] as const;

export const stats = [
  {
    icon: BadgeCheck,
    value: "98%",
    label: "Visa Success Rate",
  },
  {
    icon: University,
    value: "100+",
    label: "Partner Universities",
  },
  {
    icon: Rocket,
    value: "10,000+",
    label: "Careers Launched",
  },
] as const;
