"use client";
import { useState } from "react";
import Image from "next/image";
import ProjectModal from "./components/ProjectModal";
import ProjectCard from "./components/ProjectCard";
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
  { label: "text-indigo-700", dot: "text-indigo-400", pill: "bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300" },
  { label: "text-violet-700", dot: "text-violet-400", pill: "bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100 hover:border-violet-300" },
  { label: "text-emerald-700", dot: "text-emerald-400", pill: "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300" },
  { label: "text-sky-700", dot: "text-sky-400", pill: "bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100 hover:border-sky-300" },
  { label: "text-rose-700", dot: "text-rose-400", pill: "bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 hover:border-rose-300" },
  { label: "text-amber-700", dot: "text-amber-500", pill: "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 hover:border-amber-300" },
  { label: "text-teal-700", dot: "text-teal-400", pill: "bg-teal-50 text-teal-800 border-teal-200 hover:bg-teal-100 hover:border-teal-300" },
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
        className="font-mono text-sm text-indigo-500/80 mb-2 text-center tracking-tight"
      >
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] mb-3 text-center">
        {heading}
      </h2>
      <p className="text-gray-500 text-center">{sub}</p>
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
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 bg-white/70 backdrop-blur-sm rounded-2xl border border-indigo-200 shadow-lg p-6 sm:p-10 md:p-12">
          <div className="fade-up shrink-0" style={{ animationDelay: "60ms" }}>
            <Image
              src="/sivan.jpg"
              alt={t.hero.photoAlt}
              width={667}
              height={1000}
              priority
              className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover object-top border-4 border-indigo-200 shadow-lg"
            />
          </div>

          <div className="text-center md:text-start">
            <h1
              className="fade-up text-4xl sm:text-5xl font-extrabold text-[#1E1B4B] mb-3"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.greeting}{" "}
              <span className="bg-gradient-to-l from-blue-600 to-indigo-900 bg-clip-text text-transparent">
                {t.hero.name}
              </span>
            </h1>
            <p
              className="fade-up text-lg sm:text-xl font-semibold text-indigo-700 mb-4"
              style={{ animationDelay: "260ms" }}
            >
              {t.hero.role}
            </p>
            <p
              className="fade-up text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl"
              style={{ animationDelay: "360ms" }}
            >
              {t.hero.bio}
            </p>
            <div
              className="fade-up mt-7 flex flex-col sm:flex-row gap-3 justify-center md:justify-start items-center"
              style={{ animationDelay: "460ms" }}
            >
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-l from-indigo-600 to-blue-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 transition transform hover:-translate-y-0.5 text-center"
              >
                {t.hero.ctaProjects}
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-white text-indigo-700 border border-indigo-300 font-semibold shadow-sm hover:bg-indigo-50 transition transform hover:-translate-y-0.5 text-center"
              >
                {t.hero.ctaContact}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* פרויקטים */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeading
          eyebrow={t.eyebrows.projects}
          heading={t.projects.heading}
          sub={t.projects.subheading}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projectList.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              detailsLabel={t.projects.details}
              githubLabel={t.projects.github}
              onOpen={() => setOpenProjectId(project.id)}
            />
          ))}
        </div>
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
          <div className="rounded-xl shadow-lg border border-indigo-200 overflow-hidden bg-white/85 backdrop-blur-sm">
            <div
              dir="ltr"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1E1B4B] border-b border-indigo-900"
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
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow-md hover:bg-black transition transform hover:-translate-y-0.5 text-center"
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="bg-white border-t border-indigo-100 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} {t.footer}
      </footer>

      <ProjectModal
        isOpen={openProject !== undefined}
        onClose={() => setOpenProjectId(null)}
        title={openProject?.title ?? ""}
        description={openProject?.description ?? ""}
        githubUrl={openProject?.githubUrl}
        tech={openProject?.tech}
      />
    </main>
  );
}
