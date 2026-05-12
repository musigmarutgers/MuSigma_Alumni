"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, siteName } from "@/lib/site-content";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" onClick={() => setIsOpen(false)}>
        <span className="brand-mark">PMD</span>
        <span>{siteName}</span>
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="site-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        Menu
      </button>
      <nav id="site-navigation" className={isOpen ? "site-nav open" : "site-nav"} aria-label="Primary navigation">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              className={isActive ? "nav-link active" : "nav-link"}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
