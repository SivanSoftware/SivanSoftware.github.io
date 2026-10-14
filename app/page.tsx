"use client";
import { useState } from "react";
import Image from "next/image";
import ProjectModal from "./components/ProjectModal";
import ProjectShowcase from "./components/ProjectShowcase";
import Experience from "./components/Experience";
import Stats from "./components/Stats";
import Reveal from "./components/Reveal";
import ScrollProgress from "./components/ScrollProgress";
import { useLanguage } from "./components/LanguageProvider";
import type { Project } from "./i18n";

// שמות טכנולוגיות באנגלית מקבלים גופן מונוספייס; טקסט עברי נשאר בגופן הרגיל
const isLatin = (text: string) => !/[֐-׿]/.test(text);

/**
 * גוון לכל קבוצת כישורים, לפי סדר הקבוצות (זהה בשתי השפות) — נותן לחלון
 * תחושה של הדגשת תחביר. המחרוזות מלאות כדי ש-Tailwind יזהה אותן.
 */
const skillAccents = [
  { label: "text-indigo-700 dark:text-indigo-300", dot: "text-indigo-400", pill: "bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 dark:bg-indigo-500/10 dark:text-indigo-200 dark:border-indigo-400/20 dark:hover:bg-indigo-500/20" },
  { label: "text-violet-700 dark:text-violet-300", dot: "text-violet-400", pill: "bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100 hover:border-violet-300 dark:bg-violet-500/10 dark:text-violet-200 dark:border-violet-400/20 dark:hover:bg-violet-500/20" },
  { label: "text-emerald-700 dark:text-emerald-300", dot: "text-emerald-400", pill: "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-400/20 dark:hover:bg-emerald-500/20" },
  { label: "text-sky-700 dark:text-sky-300", dot: "text-sky-400", pill: "bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100 hover:border-sky-300 dark:bg-sky-500/10 dark:text-sky-200 dark:border-sky-400/20 dark:hover:bg-sky-500/20" },
  { label: "text-rose-700 dark:text-rose-300", dot: "text-rose-400", pill: "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 hover:border-rose-300 dark:bg-rose-500/10 dark:text-rose-200 dark:border-rose-400/20 dark:hover:bg-rose-500/20" },
  { label: "text-amber-700 dark:text-amber-300", dot: "text-amber-500", pill: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 hover:border-amber-300 dark:bg-amber-500/10 dark:text-amber-200 dark:border-amber-400/20 dark:hover:bg-amber-500/20" },
  { label: "text-teal-700 dark:text-teal-300", dot: "text-teal-400", pill: "bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100 hover:border-teal-300 dark:bg-teal-500/10 dark:text-teal-200 dark:border-teal-400/20 dark:hover:bg-teal-500/20" },
];

function SectionHeading({
  eyebrow,
  heading,
  sub,
}: {
  eyebrow: string;
  heading: string;
  sub: string;
}) {
  return (
    <Reveal className="mb-10">
      <p
        dir="ltr"
        className="font-mono text-sm text-indigo-500/80 mb-2 text-center tracking-tight dark:text-sky-400/80"
      >
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] mb-3 text-center dark:text-indigo-100">
        {heading}
      </h2>
      <p className="text-gray-500 text-center dark:text-gray-400">{sub}</p>
    </Reveal>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  // מחזיקים מזהה ולא אובייקט, כך שתוכן הפופאפ מתחלף יחד עם השפה
  const openProject: Project | undefined = t.projectList.find(
    (p) => p.id === openProjectId
  );

  return (
    <main id="top" className="pt-20">
      <ScrollProgress />

      {/* פתיח */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* כתמי אורורה מרחפים ברקע */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="blob absolute -top-12 -start-10 h-64 w-64 rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-500/20" />
          <div className="blob blob-delay blob-slow absolute top-16 end-0 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl dark:bg-sky-500/15" />
          <div className="blob blob-slow absolute -bottom-10 start-1/3 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl dark:bg-violet-500/15" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 bg-white/70 backdrop-blur-sm rounded-2xl border border-indigo-200 shadow-lg p-6 sm:p-10 md:p-12 dark:bg-white/[0.04] dark:border-indigo-400/20 dark:shadow-black/40">
          <div className="fade-up shrink-0" style={{ animationDelay: "60ms" }}>
            <div className="float-y relative">
              {/* טבעת גרדיאנט מסתובבת מאחורי התמונה */}
              <span
                aria-hidden="true"
                className="animate-spin-slow absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#6366f1,#3b82f6,#06b6d4,#8b5cf6,#6366f1)] opacity-70 blur-[6px]"
              />
              <Image
                src="/sivan.jpg"
                alt={t.hero.photoAlt}
                width={667}
                height={1000}
                priority
                className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover object-top border-4 border-white shadow-lg dark:border-[#0a0f1f]"
              />
            </div>
          </div>

          <div className="text-center md:text-start">
            <h1
              className="fade-up text-4xl sm:text-5xl font-extrabold text-[#1E1B4B] mb-3 dark:text-indigo-100"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.greeting}{" "}
              <span className="animate-gradient bg-gradient-to-l from-blue-600 via-indigo-500 to-sky-500 bg-clip-text text-transparent">
                {t.hero.name}
              </span>
            </h1>
            <p
              className="fade-up text-lg sm:text-xl font-semibold text-indigo-700 mb-4 dark:text-sky-300"
              style={{ animationDelay: "260ms" }}
            >
              {t.hero.role}
            </p>
            <p
              className="fade-up text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl dark:text-gray-300"
              style={{ animationDelay: "360ms" }}
            >
              {t.hero.bio}
            </p>
            <div
              className="fade-up mt-7 flex flex-col sm:flex-row flex-wrap gap-3 justify-center md:justify-start items-center"
              style={{ animationDelay: "460ms" }}
            >
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-l from-indigo-600 to-blue-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 transition transform hover:-translate-y-0.5 text-center"
              >
                {t.hero.ctaProjects}
              </a>
              <a
                href="/sivan-lasri-cv.pdf"
                download
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-white text-indigo-700 border border-indigo-300 font-semibold shadow-sm hover:bg-indigo-50 transition transform hover:-translate-y-0.5 text-center dark:bg-white/5 dark:text-indigo-200 dark:border-indigo-400/30 dark:hover:bg-indigo-500/10"
              >
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                {t.hero.ctaCv}
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-indigo-50 text-indigo-700 border border-transparent font-semibold shadow-sm hover:bg-indigo-100 transition transform hover:-translate-y-0.5 text-center dark:bg-indigo-500/10 dark:text-indigo-200 dark:hover:bg-indigo-500/20"
              >
                {t.hero.ctaContact}
              </a>
            </div>
          </div>
        </div>

        {/* רצועת נתונים */}
        <div className="mt-8">
          <Stats stats={t.stats} />
        </div>
      </section>

      {/* פרויקטים */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeading
          eyebrow={t.eyebrows.projects}
          heading={t.projects.heading}
          sub={t.projects.subheading}
        />
        <ProjectShowcase
          projects={t.projectList}
          detailsLabel={t.projects.details}
          githubLabel={t.projects.github}
          liveLabel={t.projects.live}
          onOpen={(id) => setOpenProjectId(id)}
        />
      </section>

      {/* ניסיון */}
      <section id="experience" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeading
          eyebrow={t.eyebrows.experience}
          heading={t.experience.heading}
          sub={t.experience.subheading}
        />
        <Experience items={t.experienceList} techLabel={t.experience.techLabel} />
      </section>

      {/* כישורים ורקע */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeading
          eyebrow={t.eyebrows.about}
          heading={t.about.heading}
          sub={t.about.intro}
        />

        {/* כרטיס בסגנון חלון עורך קוד */}
        <Reveal className="max-w-4xl mx-auto">
          <div className="rounded-xl shadow-lg border border-indigo-200 overflow-hidden bg-white/85 backdrop-blur-sm dark:border-indigo-400/20 dark:bg-white/[0.04] dark:shadow-black/40">
            <div
              dir="ltr"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E1B4B] border-b border-indigo-900 dark:bg-[#05070f] dark:border-indigo-400/15"
            >
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="font-mono text-xs text-indigo-200 ms-3">
                skills.ts
              </span>
            </div>

            <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {t.skillGroups.map((group, index) => {
                const accent = skillAccents[index % skillAccents.length];
                return (
                  <Reveal key={group.label} delay={index * 70}>
                    <h3
                      className={`text-sm font-bold mb-2.5 flex items-center gap-1.5 ${accent.label}`}
                    >
                      <span
                        className={`font-mono ${accent.dot}`}
                        aria-hidden="true"
                      >
                        ▸
                      </span>
                      {group.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          dir={isLatin(item) ? "ltr" : undefined}
                          className={`border px-3 py-1 rounded-md text-sm transition-colors duration-200 ${accent.pill} ${
                            isLatin(item) ? "font-mono" : "font-medium"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* צרו קשר */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <SectionHeading
          eyebrow={t.eyebrows.contact}
          heading={t.contact.heading}
          sub={t.contact.subheading}
        />
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center items-center px-2">
            <a
              href="mailto:sivanlasri4@gmail.com"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-l from-indigo-600 to-blue-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 transition transform hover:-translate-y-0.5 text-center"
            >
              ✉️ sivanlasri4@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/sivan-lasri-a05924230/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#0A66C2] text-white font-semibold shadow-md hover:bg-[#084d92] transition transform hover:-translate-y-0.5 text-center"
            >
              {t.contact.linkedin}
            </a>
            <a
              href="https://github.com/SivanSoftware"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow-md hover:bg-black transition transform hover:-translate-y-0.5 text-center dark:bg-white/10 dark:hover:bg-white/20"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="bg-white border-t border-indigo-100 py-6 text-center text-gray-500 text-sm dark:bg-[#05070f] dark:border-indigo-400/15 dark:text-gray-400">
        © {new Date().getFullYear()} {t.footer}
      </footer>

      <ProjectModal
        isOpen={openProject !== undefined}
        onClose={() => setOpenProjectId(null)}
        title={openProject?.title ?? ""}
        description={openProject?.description ?? ""}
        githubUrl={openProject?.githubUrl}
        liveUrl={openProject?.liveUrl}
        liveLabel={t.projects.live}
        tech={openProject?.tech}
      />
    </main>
  );
}
