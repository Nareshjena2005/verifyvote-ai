"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/submit", label: "Check a claim" },
  { href: "/dashboard", label: "My claims" },
  { href: "/admin", label: "Reviewer" },
  { href: "/about", label: "Methodology" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-navy-700 dark:bg-navy-950/90">
      <div className="page-wrap flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold text-navy-900 dark:text-white">
          <ShieldCheck size={22} className="text-teal-600" aria-hidden />
          VerifyVote AI
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-teal-500 ${
                pathname === l.href
                  ? "text-teal-700 dark:text-teal-300"
                  : "text-slate-600 hover:text-navy-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-teal-500 dark:text-slate-200 dark:hover:bg-navy-800"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-slate-200 px-4 py-2 md:hidden dark:border-navy-700">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-navy-800"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
