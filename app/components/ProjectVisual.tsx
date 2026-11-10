"use client";
import Image from "next/image";
import ProjectArt from "./ProjectArt";
import ProjectIcon from "./ProjectIcon";
import type { Project } from "../i18n";

export type Accent = {
  text: string;
  chip: string;
  activeBorder: string;
  activeBg: string;
  bar: string;
  glow: string;
};

export const accents: Record<string, Accent> = {
  watervision: {
    text: "text-cyan-600 dark:text-cyan-300",
    chip: "bg-cyan-50 text-cyan-600 ring-cyan-100 dark:bg-cyan-500/10 dark:text-cyan-300 dark:ring-cyan-400/20",
    activeBorder: "border-cyan-300 dark:border-cyan-400/40",
    activeBg: "bg-cyan-50/70 dark:bg-cyan-500/10",
    bar: "from-cyan-500 to-sky-400",
    glow: "rgba(6,182,212,0.20)",
  },
  "watervision-site": {
    text: "text-teal-600 dark:text-teal-300",
    chip: "bg-teal-50 text-teal-600 ring-teal-100 dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-400/20",
    activeBorder: "border-teal-300 dark:border-teal-400/40",
    activeBg: "bg-teal-50/70 dark:bg-teal-500/10",
    bar: "from-teal-500 to-cyan-400",
    glow: "rgba(20,184,166,0.18)",
  },
  "tic-tac-toe": {
    text: "text-slate-600 dark:text-slate-300",
    chip: "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-400/20",
    activeBorder: "border-slate-300 dark:border-slate-400/40",
    activeBg: "bg-slate-50/70 dark:bg-slate-500/10",
    bar: "from-slate-500 to-indigo-400",
    glow: "rgba(100,116,139,0.18)",
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

export const fallbackAccent = accents.mulligan;

// בועות עדינות לתמונה של WaterVision
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

// מכוניות נוסעות — Mulligan (פרויקט החניה)
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

// אייקוני ספורט שעולים — Moveit
type ExName = "dumbbell" | "heart" | "flame" | "bolt" | "stopwatch";
function ExerciseIcon({ name, className = "" }: { name: ExName; className?: string }) {
  const common = { viewBox: "0 0 24 24", className, "aria-hidden": true as const };
  switch (name) {
    case "dumbbell":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M4 9v6M7 7.5v9M17 7.5v9M20 9v6M7 12h10" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 20s-6.5-4.3-6.5-9A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 6.5 3c0 4.7-6.5 9-6.5 9z" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2c1.6 3 4.5 4 4.5 8a4.5 4.5 0 0 1-9 0c0-1.8.9-2.8 1.8-3.7.4 1 1.3 1.5 1.9 1-.1-2-1-4 .8-5.3z" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common} fill="currentColor">
          <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l1-8z" />
        </svg>
      );
    case "stopwatch":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <circle cx="12" cy="14" r="7" />
          <path d="M12 14V10M10 2.5h4M18.5 7l-1.3 1.3" />
        </svg>
      );
  }
}

const exercises: { left: string; name: ExName; size: number; dur: string; delay: string }[] = [
  { left: "10%", name: "dumbbell", size: 26, dur: "7s", delay: "0s" },
  { left: "28%", name: "heart", size: 20, dur: "9s", delay: "2.4s" },
  { left: "45%", name: "flame", size: 24, dur: "8s", delay: "4.6s" },
  { left: "62%", name: "bolt", size: 22, dur: "7.5s", delay: "1.3s" },
  { left: "78%", name: "stopwatch", size: 24, dur: "9.5s", delay: "3.6s" },
  { left: "90%", name: "dumbbell", size: 18, dur: "8.5s", delay: "5.5s" },
];

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

export function IconBadge({
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

/**
 * הוויזואל הגדול של פרויקט — תמונה אמיתית (עם תנועה עדינה) או סצנה מונפשת.
 * animated=true מפעיל את הסצנות (בועות/מכוניות/סוכריות וכו') — מוצג רק בכרטיס הפעיל.
 */
export function ProjectVisual({
  project,
  animated = false,
}: {
  project: Project;
  animated?: boolean;
}) {
  if (!project.image) {
    return <ProjectArt project={project} className="h-full w-full" />;
  }

  return (
    <>
      {project.imageFit === "contain" && (
        <Image
          src={project.image}
          alt=""
          fill
          aria-hidden="true"
          className="scale-110 object-cover opacity-40 blur-2xl"
        />
      )}
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 80vw, 400px"
        className={
          project.imageFit === "contain"
            ? "object-contain"
            : `object-cover ${project.imagePosition ?? ""}`
        }
      />
      <span aria-hidden="true" className="media-shine pointer-events-none absolute inset-0" />

      {animated && project.id === "watervision" && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {bubbles.map((b, i) => (
            <span
              key={i}
              className="bubble"
              style={{ left: b.left, width: b.size, height: b.size, animationDuration: b.dur, animationDelay: b.delay }}
            />
          ))}
        </div>
      )}

      {animated && project.id === "sugarsteps" && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {sprinkles.map((s, i) => (
            <span
              key={i}
              className="sprinkle"
              style={{ left: s.left, width: 4, height: s.len, background: s.color, animationDuration: s.dur, animationDelay: s.delay }}
            />
          ))}
        </div>
      )}

      {animated && project.id === "plastic-factory" && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="plastic-sheet" />
          <span className="plastic-roll" />
        </div>
      )}

      {animated && project.id === "moveit" && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {exercises.map((e, i) => (
            <span
              key={i}
              className="exercise"
              style={{ left: e.left, width: e.size, height: e.size, animationDuration: e.dur, animationDelay: e.delay }}
            >
              <ExerciseIcon name={e.name} className="h-full w-full" />
            </span>
          ))}
        </div>
      )}

      {animated && project.id === "mulligan" && (
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
              <span className="block" style={{ transform: c.dir === "rtl" ? "scaleX(-1)" : undefined }}>
                <Car className="h-auto w-full" />
              </span>
            </span>
          ))}
        </div>
      )}
    </>
  );
}
