"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { href: "#projects", label: "פרויקטים" },
  { href: "#about", label: "כישורים ורקע" },
  { href: "#contact", label: "צרו קשר" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses =
    "text-gray-700 font-medium hover:text-indigo-700 transition px-3 py-2 rounded-md hover:bg-indigo-50";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-indigo-100 backdrop-blur-sm ${
        scrolled ? "bg-white/90 shadow-lg" : "bg-white/75"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 sm:p-4">
        <a
          href="#top"
          className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl text-indigo-700 hover:underline transition"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo-mark.png"
            alt="הלוגו של סיון לסרי"
            width={242}
            height={160}
            priority
            className="h-9 sm:h-10 w-auto"
          />
          <span>סיון לסרי</span>
        </a>

        {/* קישורים — דסקטופ */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={linkClasses}>
              {link.label}
            </a>
          ))}
        </div>

        {/* כפתור המבורגר — מובייל */}
        <button
          className="sm:hidden p-2 rounded-md text-indigo-700 hover:bg-indigo-50 transition"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "סגירת תפריט" : "פתיחת תפריט"}
          aria-expanded={menuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* תפריט מובייל נפתח */}
      {menuOpen && (
        <div className="sm:hidden border-t border-indigo-100 bg-white/95 backdrop-blur-sm px-4 py-2 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={linkClasses}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
