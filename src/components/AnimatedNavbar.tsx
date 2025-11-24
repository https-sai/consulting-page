// app/components/AnimatedNavbar.tsx
"use client";

import Navbar, { NavbarItem } from "./[navbar]";

const SECTIONS: NavbarItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Professional Experience" },
  { id: "consulting", label: "Private Consulting" },
  { id: "contact", label: "Contact" },
];

export default function AnimatedNavbar() {
  return <Navbar items={SECTIONS} theme="light" />;
}
