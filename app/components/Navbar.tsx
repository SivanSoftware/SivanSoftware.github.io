"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // מסמן את הסעיף שנמצא כרגע מול העין
  useEffect(() => {
    const sections = ["projects", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const links = [
    { href: "#projects", id: "projects", label: t.nav.projects },
    { href: "#about", id: "about", label: t.nav.about },
    { href: "#contact", id: "contact", label: t.nav.contact },
  ];

  const linkClasses =
    "nav-link text-gray-700 font-medium hover:text-indigo-700 transition px-3 py-2 rounded-md hover:bg-indigo-50";

  const langButtonClasses =
    "px-3 py-1.5 rounded-md border border-indigo-300 text-indigo-700 text-sm font-bold hover:bg-indigo-50 transition";

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
            alt={t.hero.logoAlt}
            width={242}
            height={160}
            priority
            className="h-9 sm:h-10 w-auto"
          />
          <span>{t.nav.name}</span>
        </a>

        {/* קישורים — דסקטופ */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.id ? "true" : undefined}
              className={`${linkClasses} ${
                activeSection === link.id
                  ? "nav-link-active text-indigo-700"
                  : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className={`${langButtonClasses} ms-2`}
            aria-label={t.langToggle.aria}
            lang={lang === "he" ? "en" : "he"}
          >
            {t.langToggle.label}
          </button>
        </div>

        {/* החלפת שפה + המבורגר — מובייל */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className={langButtonClasses}
            aria-label={t.langToggle.aria}
            lang={lang === "he" ? "en" : "he"}
          >
            {t.langToggle.label}
          </button>
          <button
            className="p-2 rounded-md text-indigo-700 hover:bg-indigo-50 transition"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t.menu.close : t.menu.open}
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
      </div>

      {/* תפריט מובייל נפתח */}
      {menuOpen && (
        <div className="sm:hidden border-t border-indigo-100 bg-white/95 backdrop-blur-sm px-4 py-2 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${linkClasses} ${
                activeSection === link.id ? "text-indigo-700" : ""
              }`}
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
