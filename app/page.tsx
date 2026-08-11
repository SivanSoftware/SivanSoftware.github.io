"use client";
import { useState } from "react";
import Image from "next/image";
import ProjectModal from "./components/ProjectModal";
import { useLanguage } from "./components/LanguageProvider";
import type { Project } from "./i18n";

// שמות טכנולוגיות באנגלית מקבלים גופן מונוספייס; טקסט עברי נשאר בגופן הרגיל
const isLatin = (text: string) => !/[֐-׿]/.test(text);

function Eyebrow({ children }: { children: string }) {
  return (
    <p
      dir="ltr"
      className="font-mono text-sm text-indigo-500/80 mb-2 text-center tracking-tight"
    >
      {children}
    </p>
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
      {/* פתיח */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 bg-white/70 backdrop-blur-sm rounded-2xl border border-indigo-200 shadow-lg p-6 sm:p-10 md:p-12">
          <Image
            src="/sivan.jpg"
            alt={t.hero.photoAlt}
            width={667}
            height={1000}
            priority
            className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover object-top border-4 border-indigo-200 shadow-lg shrink-0"
          />
          <div className="text-center md:text-start">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E1B4B] mb-3">
              {t.hero.greeting}{" "}
              <span className="bg-gradient-to-l from-blue-600 to-indigo-900 bg-clip-text text-transparent">
                {t.hero.name}
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-indigo-700 mb-4">
              {t.hero.role}
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              {t.hero.bio}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center md:justify-start items-center">
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
        <Eyebrow>{t.eyebrows.projects}</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] mb-2 text-center">
          {t.projects.heading}
        </h2>
        <p className="text-gray-500 text-center mb-10">
          {t.projects.subheading}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projectList.map((project) => (
            <article
              key={project.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-100 p-6 flex flex-col transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl" aria-hidden="true">
                  {project.emoji}
                </span>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1E1B4B] mb-3">
                {project.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 flex-1">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs sm:text-sm text-gray-500 px-1 py-1">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setOpenProjectId(project.id)}
                  className="flex-1 px-4 py-2 rounded-md bg-gradient-to-l from-indigo-600 to-blue-600 text-white text-sm sm:text-base font-semibold hover:from-indigo-700 hover:to-blue-700 transition shadow-md"
                >
                  {t.projects.details}
                </button>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md bg-gray-800 text-white text-sm sm:text-base font-semibold hover:bg-black transition shadow-md text-center"
                  >
                    {t.projects.github}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* כישורים ורקע */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <Eyebrow>{t.eyebrows.about}</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] mb-3 text-center">
          {t.about.heading}
        </h2>
        <p className="text-gray-500 text-center mb-8">{t.about.intro}</p>

        {/* כרטיס בסגנון חלון עורך קוד */}
        <div className="max-w-4xl mx-auto rounded-xl shadow-lg border border-indigo-200 overflow-hidden bg-white/85 backdrop-blur-sm">
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
            {t.skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-bold text-indigo-700 mb-2.5 flex items-center gap-1.5">
                  <span className="font-mono text-indigo-400" aria-hidden="true">
                    ▸
                  </span>
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      dir={isLatin(item) ? "ltr" : undefined}
                      className={`bg-indigo-50 text-indigo-800 border border-indigo-100 px-3 py-1 rounded-md text-sm ${
                        isLatin(item) ? "font-mono" : "font-medium"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* צרו קשר */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <Eyebrow>{t.eyebrows.contact}</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B4B] mb-3 text-center">
          {t.contact.heading}
        </h2>
        <p className="text-gray-500 text-center mb-8">
          {t.contact.subheading}
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center items-center px-2">
          <a
            href="mailto:sivanlasri4@gmail.com"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-l from-indigo-600 to-blue-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 transition text-center"
          >
            ✉️ sivanlasri4@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/sivan-lasri-a05924230/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#0A66C2] text-white font-semibold shadow-md hover:bg-[#084d92] transition text-center"
          >
            {t.contact.linkedin}
          </a>
          <a
            href="https://github.com/SivanSoftware"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow-md hover:bg-black transition text-center"
          >
            GitHub
          </a>
        </div>
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
