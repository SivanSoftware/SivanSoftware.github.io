"use client";
import Image from "next/image";
import ProjectCarousel from "./components/ProjectCarousel";
import Experience from "./components/Experience";
import Stats from "./components/Stats";
import Reveal from "./components/Reveal";
import ScrollProgress from "./components/ScrollProgress";
import { useLanguage } from "./components/LanguageProvider";

// שמות טכנולוגיות באנגלית מקבלים גופן מונוספייס; טקסט עברי נשאר בגופן הרגיל
const isLatin = (text: string) => !/[֐-׿]/.test(text);

/** גוונים רכים לכרטיסי הכישורים, בתוך פלטת הפלום/זהב/מרווה/לבנדר */
const topicAccents = [
  { badge: "bg-[#f1ebf7] text-[#6E5B86] ring-[#e4d8ec] dark:bg-[#7E6A9E]/12 dark:text-[#cdb9e6] dark:ring-[#7E6A9E]/25", bar: "from-[#8E72AE] to-[#C2A368]" },
  { badge: "bg-[#f6efe1] text-[#b48d43] ring-[#ecdcc0] dark:bg-[#C2A368]/12 dark:text-[#d8c08a] dark:ring-[#C2A368]/25", bar: "from-[#C2A368] to-[#8E72AE]" },
  { badge: "bg-[#eef4ec] text-[#5f7a5a] ring-[#d9e6d3] dark:bg-[#6f8a68]/15 dark:text-[#a9c7a0] dark:ring-[#6f8a68]/30", bar: "from-[#8aa882] to-[#C2A368]" },
  { badge: "bg-[#efeaf6] text-[#7E6A9E] ring-[#e0d6ec] dark:bg-[#7E6A9E]/12 dark:text-[#c3b0dd] dark:ring-[#7E6A9E]/25", bar: "from-[#7E6A9E] to-[#b48d43]" },
];

/** אייקון נושא לכל כרטיס כישורים (לפי סדר הקבוצות) */
function TopicIcon({ index }: { index: number }) {
  const cls = "h-5 w-5";
  const common = { className: cls, fill: "none", stroke: "currentColor", strokeWidth: 1.8, viewBox: "0 0 24 24", "aria-hidden": true as const };
  switch (index % 7) {
    case 0: // שפות
      return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3M14 5l-4 14" /></svg>;
    case 1: // מערכות מבוזרות / backend
      return <svg {...common}><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /><path strokeLinecap="round" d="M7 7h.01M7 17h.01" /></svg>;
    case 2: // מסדי נתונים
      return <svg {...common}><ellipse cx="12" cy="6" rx="7" ry="3" /><path strokeLinecap="round" d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" /></svg>;
    case 3: // frontend
      return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><path strokeLinecap="round" d="M3 9h18M7 6.5h.01M9.5 6.5h.01" /></svg>;
    case 4: // מובייל / XR
      return <svg {...common}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path strokeLinecap="round" d="M11 18.5h2" /></svg>;
    case 5: // DevOps
      return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a4 4 0 00-5.4 5.4l-6 6 2 2 6-6a4 4 0 005.4-5.4l-2.5 2.5-2-2 2.5-2.5z" /></svg>;
    default: // בדיקות ומתודולוגיה
      return <svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3l7 4v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V7l7-4z" /></svg>;
  }
}

/** מדגיש מילים נבחרות המסומנות ב-**...** בצבע הפלום של המותג */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong
            key={i}
            className="font-semibold text-[#6E5B86] dark:text-[#c3b0dd]"
          >
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

function SectionHeading({
  heading,
  sub,
}: {
  heading: string;
  sub: string;
}) {
  return (
    <Reveal className="mb-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3E2E4F] mb-3 text-center dark:text-indigo-100">
        {heading}
      </h2>
      <p className="text-gray-500 text-center dark:text-gray-400">{sub}</p>
    </Reveal>
  );
}

export default function Home() {
  const { t } = useLanguage();

  return (
    <main id="top" className="pt-20">
      <ScrollProgress />

      {/* Hero — באנר הלוגו המלא (שם + כותרת) עם כפתורי CTA מתחת */}
      <section className="relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-40 pb-24 sm:pt-52 sm:pb-32">
          <h1 className="sr-only">{t.hero.name}</h1>

          {/* לוגו מלא (שם + כותרת) — רקע שקוף, גרסה בהירה / כהה */}
          <div className="fade-up float-y w-full max-w-xl" style={{ animationDelay: "80ms" }}>
            <Image
              src="/logo-full.png"
              alt={t.hero.logoAlt}
              width={1536}
              height={1024}
              priority
              className="mx-auto h-auto w-full dark:hidden"
            />
            <Image
              src="/logo-full-dark.png"
              alt={t.hero.logoAlt}
              width={1536}
              height={1024}
              priority
              className="mx-auto hidden h-auto w-full dark:block"
            />
          </div>

          {/* כפתורי CTA */}
          <div
            className="fade-up mt-6 flex w-full flex-col flex-wrap items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "280ms" }}
          >
            <a href="#projects" className="btn-glass btn-glass-primary w-full sm:w-auto">
              {t.hero.ctaProjects}
            </a>
            <a
              href="/sivan-lasri-cv.pdf"
              download
              className="btn-glass btn-glass-ghost group w-full sm:w-auto"
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
            <a href="#contact" className="btn-glass btn-glass-ghost w-full sm:w-auto">
              {t.hero.ctaContact}
            </a>
          </div>
        </div>
      </section>

      {/* אודות — תמונה + תקציר */}
      <section id="about-intro" className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
        <Reveal>
          <div className="flex flex-col items-center gap-8 rounded-2xl border border-[#E7DFD6] bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm sm:p-9 md:flex-row md:gap-10 md:text-start dark:border-white/10 dark:bg-white/[0.04]">
            <Image
              src="/sivan.webp"
              alt={t.hero.photoAlt}
              width={1209}
              height={1209}
              className="h-40 w-40 shrink-0 rounded-full border-4 border-white object-cover object-top shadow-lg ring-1 ring-[#e7dcea] sm:h-48 sm:w-48 dark:border-white/10"
            />
            <div>
              <p className="mb-3 text-lg font-semibold text-[#6E5B86] sm:text-xl dark:text-[#c3b0dd]">
                {t.hero.role}
              </p>
              <p className="text-justify text-base leading-relaxed text-[#5a5160] sm:text-lg dark:text-gray-300">
                <RichText text={t.hero.bio} />
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-8">
          <Stats stats={t.stats} />
        </div>
      </section>

      {/* פרויקטים */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading
          heading={t.projects.heading}
          sub={t.projects.subheading}
        />
        <ProjectCarousel projects={t.projectList} />
      </section>

      {/* ניסיון */}
      <section id="experience" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading
          heading={t.experience.heading}
          sub={t.experience.subheading}
        />
        <Experience items={t.experienceList} techLabel={t.experience.techLabel} />
      </section>

      {/* כישורים ורקע */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading
          heading={t.about.heading}
          sub={t.about.intro}
        />

        {/* רשת כרטיסים לפי נושאים */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.skillGroups.map((group, index) => {
            const accent = topicAccents[index % topicAccents.length];
            return (
              <Reveal key={group.label} delay={index * 60} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-[#E7DFD6] bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.06]">
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1 origin-[right_center] scale-x-0 bg-gradient-to-l ${accent.bar} transition-transform duration-500 group-hover:scale-x-100`}
                  />
                  <div className="mb-3.5 flex items-center gap-2.5">
                    <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${accent.badge}`}>
                      <TopicIcon index={index} />
                    </span>
                    <h3 className="text-sm font-bold text-[#3E2E4F] dark:text-[#e9def5]">
                      {group.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        dir={isLatin(item) ? "ltr" : undefined}
                        className={`rounded-md border border-[#e4d8ec] bg-[#f3ecf7] px-2.5 py-1 text-xs text-[#6E5B86] transition-colors dark:border-[#7E6A9E]/25 dark:bg-[#7E6A9E]/10 dark:text-[#cdb9e6] ${
                          isLatin(item) ? "font-mono" : "font-medium"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* צרו קשר */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-28">
        <SectionHeading
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
    </main>
  );
}
