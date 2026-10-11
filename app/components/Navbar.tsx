"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? t.themeToggle.toLight : t.themeToggle.toDark}
      title={isDark ? t.themeToggle.toLight : t.themeToggle.toDark}
      className={`relative flex h-9 w-9 items-center justify-center rounded-md border border-indigo-300 text-indigo-700 transition hover:bg-indigo-50 dark:border-indigo-400/30 dark:text-indigo-200 dark:hover:bg-indigo-500/10 ${className}`}
    >
      <svg
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
      </svg>
    </button>
  );
}

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
    const sections = ["projects", "experience", "about", "contact"]
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
    { href: "#experience", id: "experience", label: t.nav.experience },
    { href: "#about", id: "about", label: t.nav.about },
    { href: "#contact", id: "contact", label: t.nav.contact },
  ];

  const linkClasses =
    "nav-link text-gray-700 font-medium hover:text-indigo-700 transition px-3 py-2 rounded-md hover:bg-indigo-50 dark:text-gray-300 dark:hover:text-indigo-200 dark:hover:bg-indigo-500/10";

  const langButtonClasses =
    "px-3 py-1.5 rounded-md border border-indigo-300 text-indigo-700 text-sm font-bold hover:bg-indigo-50 transition dark:border-indigo-400/30 dark:text-indigo-200 dark:hover:bg-indigo-500/10";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-indigo-100 backdrop-blur-sm dark:border-indigo-400/15 ${
        scrolled
          ? "bg-white/90 shadow-lg dark:bg-[#0a0f1f]/90 dark:shadow-black/40"
          : "bg-white/75 dark:bg-[#0a0f1f]/70"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 sm:p-4">
        <a
          href="#top"
          className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl text-indigo-700 hover:underline transition dark:text-indigo-300"
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
                  ? "nav-link-active text-indigo-700 dark:text-indigo-200"
                  : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle className="ms-2" />
          <button
            onClick={toggleLang}
            className={`${langButtonClasses} ms-1`}
            aria-label={t.langToggle.aria}
            lang={lang === "he" ? "en" : "he"}
          >
            {t.langToggle.label}
          </button>
        </div>

        {/* החלפת מצב + שפה + המבורגר — מובייל */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleLang}
            className={langButtonClasses}
            aria-label={t.langToggle.aria}
            lang={lang === "he" ? "en" : "he"}
          >
            {t.langToggle.label}
          </button>
          <button
            className="p-2 rounded-md text-indigo-700 hover:bg-indigo-50 transition dark:text-indigo-200 dark:hover:bg-indigo-500/10"
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
        <div className="sm:hidden border-t border-indigo-100 bg-white/95 backdrop-blur-sm px-4 py-2 flex flex-col gap-1 dark:border-indigo-400/15 dark:bg-[#0a0f1f]/95">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${linkClasses} ${
                activeSection === link.id
                  ? "text-indigo-700 dark:text-indigo-200"
                  : ""
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
