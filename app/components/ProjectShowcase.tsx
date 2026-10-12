"use client";
import { useState } from "react";
import Image from "next/image";
import ProjectArt from "./ProjectArt";
import ProjectIcon from "./ProjectIcon";
import Reveal from "./Reveal";
import { useReveal } from "./useReveal";
import type { Project } from "../i18n";

type Accent = {
  text: string;
  chip: string;
  activeBorder: string;
  activeBg: string;
  bar: string;
  glow: string;
};

const accents: Record<string, Accent> = {
  watervision: {
    text: "text-cyan-600 dark:text-cyan-300",
    chip: "bg-cyan-50 text-cyan-600 ring-cyan-100 dark:bg-cyan-500/10 dark:text-cyan-300 dark:ring-cyan-400/20",
    activeBorder: "border-cyan-300 dark:border-cyan-400/40",
    activeBg: "bg-cyan-50/70 dark:bg-cyan-500/10",
    bar: "from-cyan-500 to-sky-400",
    glow: "rgba(6,182,212,0.20)",
  },
  mulligan: {
    text: "text-violet-600 dark:text-violet-300",
    chip: "bg-violet-50 text-violet-600 ring-violet-100 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-400/20",
    activeBorder: "border-violet-300 dark:border-violet-400/40",
    activeBg: "bg-violet-50/70 dark:bg-violet-500/10",
    bar: "from-violet-500 to-indigo-400",
    glow: "rgba(139,92,246,0.20)",
  },
  sugarsteps: {
    text: "text-rose-600 dark:text-rose-300",
    chip: "bg-rose-50 text-rose-500 ring-rose-100 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/20",
    activeBorder: "border-rose-300 dark:border-rose-400/40",
    activeBg: "bg-rose-50/70 dark:bg-rose-500/10",
    bar: "from-rose-500 to-pink-400",
    glow: "rgba(244,63,94,0.18)",
  },
  "plastic-factory": {
    text: "text-amber-600 dark:text-amber-300",
    chip: "bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
    activeBorder: "border-amber-300 dark:border-amber-400/40",
    activeBg: "bg-amber-50/70 dark:bg-amber-500/10",
    bar: "from-amber-500 to-orange-400",
    glow: "rgba(245,158,11,0.18)",
  },
  moveit: {
    text: "text-emerald-600 dark:text-emerald-300",
    chip: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    activeBorder: "border-emerald-300 dark:border-emerald-400/40",
    activeBg: "bg-emerald-50/70 dark:bg-emerald-500/10",
    bar: "from-emerald-500 to-teal-400",
    glow: "rgba(16,185,129,0.18)",
  },
  budgi: {
    text: "text-sky-600 dark:text-sky-300",
    chip: "bg-sky-50 text-sky-600 ring-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20",
    activeBorder: "border-sky-300 dark:border-sky-400/40",
    activeBg: "bg-sky-50/70 dark:bg-sky-500/10",
    bar: "from-sky-500 to-cyan-400",
    glow: "rgba(14,165,233,0.18)",
  },
};

const fallbackAccent = accents.mulligan;

// בועות עדינות לתמונה של WaterVision (left/גודל/משך/השהיה)
const bubbles = [
  { left: "12%", size: 12, dur: "7s", delay: "0s" },
  { left: "24%", size: 8, dur: "9s", delay: "1.4s" },
  { left: "38%", size: 16, dur: "8s", delay: "2.6s" },
  { left: "50%", size: 10, dur: "10s", delay: "0.8s" },
  { left: "63%", size: 13, dur: "7.5s", delay: "3.2s" },
  { left: "74%", size: 8, dur: "9.5s", delay: "1.9s" },
  { left: "85%", size: 15, dur: "8.5s", delay: "0.4s" },
  { left: "92%", size: 9, dur: "10.5s", delay: "2.2s" },
];

// מכוניות נוסעות לתמונה של Mulligan (פרויקט החניה)
const cars: { bottom: string; w: number; dur: string; delay: string; dir: "ltr" | "rtl" }[] = [
  { bottom: "6%", w: 36, dur: "11s", delay: "0s", dir: "ltr" },
  { bottom: "20%", w: 26, dur: "17s", delay: "4s", dir: "rtl" },
  { bottom: "34%", w: 22, dur: "19s", delay: "8s", dir: "ltr" },
  { bottom: "2%", w: 30, dur: "14s", delay: "6s", dir: "ltr" },
  { bottom: "48%", w: 20, dur: "23s", delay: "2s", dir: "rtl" },
  { bottom: "13%", w: 24, dur: "15s", delay: "11s", dir: "rtl" },
];

// סוכריות צבעוניות נושרות — SugarSteps
const sprinkleColors = ["#f472b6", "#facc15", "#34d399", "#38bdf8", "#a78bfa", "#fb923c", "#fb7185"];
const sprinkles = Array.from({ length: 16 }, (_, i) => ({
  left: `${4 + (i * 6.1) % 92}%`,
  color: sprinkleColors[i % sprinkleColors.length],
  len: 8 + (i % 4) * 2,
  dur: `${4.5 + (i % 5) * 0.9}s`,
  delay: `${(i * 0.5) % 6}s`,
}));

function Car({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" className={className} aria-hidden="true">
      <path fill="#ffffff" d="M9 13 L13 6.5 Q14 5 16 5 L24 5 Q26 5 27 6.5 L31 13 Z" />
      <rect x="3" y="11.5" width="34" height="8" rx="4" fill="#ffffff" />
      <path fill="#bfdbfe" d="M12 11.5 L14.6 7.6 Q15 7 16 7 L19 7 L19 11.5 Z" />
      <path fill="#bfdbfe" d="M21 7 L24 7 Q25 7 25.4 7.6 L28 11.5 L21 11.5 Z" />
      <circle cx="11.5" cy="19.5" r="3.1" fill="#1f2937" />
      <circle cx="11.5" cy="19.5" r="1.2" fill="#cbd5e1" />
      <circle cx="28.5" cy="19.5" r="3.1" fill="#1f2937" />
      <circle cx="28.5" cy="19.5" r="1.2" fill="#cbd5e1" />
      <circle cx="36" cy="14.5" r="1.1" fill="#fde68a" />
    </svg>
  );
}

function IconBadge({
  project,
  accent,
  size = "h-11 w-11",
}: {
  project: Project;
  accent: Accent;
  size?: string;
}) {
  if (project.iconImage) {
    return (
      <span className={`relative inline-flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-lg`}>
        <Image src={project.iconImage} alt={project.title} fill className="object-contain" />
      </span>
    );
  }
  return (
    <span className={`inline-flex ${size} shrink-0 items-center justify-center rounded-lg ring-1 ${accent.chip}`}>
      <ProjectIcon name={project.icon} className="h-6 w-6" />
    </span>
  );
}

export default function ProjectShowcase({
  projects,
  detailsLabel,
  githubLabel,
  onOpen,
}: {
  projects: Project[];
  detailsLabel: string;
  githubLabel: string;
  onOpen: (id: string) => void;
}) {
  const [activeId, setActiveId] = useState(projects[0]?.id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0];
  const accent = accents[active.id] ?? fallbackAccent;

  const listReveal = useReveal<HTMLUListElement>(0);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(240px,0.82fr)_1.4fr]">
      {/* רשימת הפרויקטים */}
      <ul
        ref={listReveal.ref}
        style={listReveal.style}
        className={`${listReveal.className} flex flex-col gap-2.5`}
        role="tablist"
        aria-label="Projects"
        aria-orientation="vertical"
      >
        {projects.map((project, i) => {
          const a = accents[project.id] ?? fallbackAccent;
          const isActive = project.id === active.id;
          return (
            <li key={project.id}>
              <button
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onMouseEnter={() => setActiveId(project.id)}
                onFocus={() => setActiveId(project.id)}
                onClick={() => setActiveId(project.id)}
                className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border p-3 text-start transition-all duration-300 ${
                  isActive
                    ? `${a.activeBorder} ${a.activeBg} shadow-sm`
                    : "border-indigo-100 bg-white/70 hover:border-indigo-200 hover:bg-white dark:border-indigo-400/15 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                }`}
              >
                {/* פס מבטא בצד המתחיל כשהפריט פעיל */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 start-0 w-1 origin-top bg-gradient-to-b ${a.bar} transition-transform duration-300 ${
                    isActive ? "scale-y-100" : "scale-y-0"
                  }`}
                />
                <IconBadge project={project} accent={a} size="h-10 w-10" />
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-sm font-bold ${isActive ? a.text : "text-[#1E1B4B] dark:text-indigo-100"}`}>
                    {project.title}
                  </span>
                  <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                    {project.category}
                  </span>
                </span>
                <span
                  dir="ltr"
                  className="font-mono text-[11px] text-gray-300 dark:text-gray-600"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* פאנל התצוגה */}
      <Reveal>
        <div
          role="tabpanel"
          className={`relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/85 shadow-lg backdrop-blur-sm transition-[border-color] duration-300 dark:bg-white/[0.04] dark:shadow-black/40 ${accent.activeBorder}`}
        >
          {/* ויזואל גדול — תמונה אמיתית (עם תנועה עדינה) או סצנה מונפשת */}
          <div className="relative h-44 w-full overflow-hidden sm:h-56">
            {active.image ? (
              <>
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="media-shine pointer-events-none absolute inset-0"
                />
                {/* בועות עדינות שעולות — WaterVision */}
                {active.id === "watervision" && (
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    {bubbles.map((b, i) => (
                      <span
                        key={i}
                        className="bubble"
                        style={{
                          left: b.left,
                          width: b.size,
                          height: b.size,
                          animationDuration: b.dur,
                          animationDelay: b.delay,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* סוכריות צבעוניות נושרות — SugarSteps */}
                {active.id === "sugarsteps" && (
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    {sprinkles.map((s, i) => (
                      <span
                        key={i}
                        className="sprinkle"
                        style={{
                          left: s.left,
                          width: 4,
                          height: s.len,
                          background: s.color,
                          animationDuration: s.dur,
                          animationDelay: s.delay,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* מכוניות נוסעות — Mulligan */}
                {active.id === "mulligan" && (
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    {cars.map((c, i) => (
                      <span
                        key={i}
                        className="car"
                        style={{
                          bottom: c.bottom,
                          width: c.w,
                          animationName: c.dir === "ltr" ? "car-ltr" : "car-rtl",
                          animationDuration: c.dur,
                          animationDelay: c.delay,
                        }}
                      >
                        <span
                          className="block"
                          style={{ transform: c.dir === "rtl" ? "scaleX(-1)" : undefined }}
                        >
                          <Car className="h-auto w-full" />
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <ProjectArt project={active} className="h-full w-full" />
            )}
          </div>

          {/* תוכן — מתחלף עם אנימציה לפי המפתח */}
          <div key={active.id} className="fade-up flex flex-1 flex-col p-6 sm:p-7">
            <div className="mb-3 flex items-center gap-3">
              <IconBadge project={active} accent={accent} />
              <div>
                <span className={`block text-xs font-semibold ${accent.text}`}>
                  {active.category}
                </span>
                <h3 className="text-xl font-extrabold text-[#1E1B4B] sm:text-2xl dark:text-indigo-100">
                  {active.title}
                </h3>
              </div>
            </div>

            <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-700 sm:text-base dark:text-gray-300">
              {active.summary}
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              {active.tech.map((tech) => (
                <span
                  key={tech}
                  dir="ltr"
                  className="rounded-md border border-indigo-100 bg-indigo-50/80 px-2.5 py-1 font-mono text-xs text-indigo-800 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onOpen(active.id)}
                className="flex-1 rounded-md bg-gradient-to-l from-indigo-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-blue-700 sm:text-base"
              >
                {detailsLabel}
              </button>
              {active.githubUrl && (
                <a
                  href={active.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-gray-800 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md transition hover:bg-black sm:text-base dark:bg-white/10 dark:hover:bg-white/20"
                >
                  {githubLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
