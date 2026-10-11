"use client";
import Image from "next/image";
import ProjectIcon from "./ProjectIcon";
import ProjectArt from "./ProjectArt";
import { useReveal } from "./useReveal";
import type { Project } from "../i18n";

/**
 * גוון ייעודי לכל פרויקט. המחרוזות כתובות במלואן כדי ש-Tailwind יזהה אותן
 * בסריקת הקוד — בנייה דינמית של שמות מחלקות לא הייתה נכנסת ל-CSS.
 */
const accents: Record<
  string,
  { icon: string; badge: string; line: string; border: string; num: string }
> = {
  mulligan: {
    icon: "bg-violet-50 text-violet-600 ring-violet-100 group-hover:bg-violet-600 group-hover:text-white group-hover:ring-violet-600",
    badge: "border-violet-200 bg-violet-50 text-violet-700",
    line: "from-violet-500 to-indigo-500",
    border: "hover:border-violet-300",
    num: "group-hover:text-violet-500",
  },
  sugarsteps: {
    icon: "bg-rose-50 text-rose-500 ring-rose-100 group-hover:bg-rose-500 group-hover:text-white group-hover:ring-rose-500",
    badge: "border-rose-200 bg-rose-50 text-rose-700",
    line: "from-rose-500 to-pink-500",
    border: "hover:border-rose-300",
    num: "group-hover:text-rose-500",
  },
  "plastic-factory": {
    icon: "bg-amber-50 text-amber-600 ring-amber-100 group-hover:bg-amber-500 group-hover:text-white group-hover:ring-amber-500",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    line: "from-amber-500 to-orange-500",
    border: "hover:border-amber-300",
    num: "group-hover:text-amber-500",
  },
  moveit: {
    icon: "bg-emerald-50 text-emerald-600 ring-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:ring-emerald-600",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    line: "from-emerald-500 to-teal-500",
    border: "hover:border-emerald-300",
    num: "group-hover:text-emerald-500",
  },
  budgi: {
    icon: "bg-sky-50 text-sky-600 ring-sky-100 group-hover:bg-sky-600 group-hover:text-white group-hover:ring-sky-600",
    badge: "border-sky-200 bg-sky-50 text-sky-700",
    line: "from-sky-500 to-cyan-500",
    border: "hover:border-sky-300",
    num: "group-hover:text-sky-500",
  },
};

const fallbackAccent = accents.mulligan;

type ProjectCardProps = {
  project: Project;
  index: number;
  detailsLabel: string;
  githubLabel: string;
  onOpen: () => void;
};

export default function ProjectCard({
  project,
  index,
  detailsLabel,
  githubLabel,
  onOpen,
}: ProjectCardProps) {
  const reveal = useReveal<HTMLElement>(index * 90);
  const accent = accents[project.id] ?? fallbackAccent;

  return (
    <article
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} ${accent.border} group relative flex flex-col overflow-hidden rounded-xl border border-indigo-100 bg-white/85 backdrop-blur-sm p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-indigo-400/20 dark:bg-white/[0.04] dark:hover:shadow-black/40`}
    >
      {/* קו מבטא עליון שנפרש בריחוף */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 z-10 h-0.5 origin-[left_center] scale-x-0 bg-gradient-to-l ${accent.line} transition-transform duration-500 group-hover:scale-x-100 rtl:origin-[right_center]`}
      />

      {/* כותרת חזותית: אייקון מונפש, או תמונה אמיתית אם הוגדרה ב-i18n */}
      <div className="-mx-6 -mt-6 mb-5 h-36 w-[calc(100%+3rem)] overflow-hidden border-b border-indigo-100 dark:border-indigo-400/15">
        {project.image ? (
          <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          </div>
        ) : (
          <ProjectArt
            project={project}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
          />
        )}
      </div>

      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg ring-1 transition-colors duration-300 ${accent.icon}`}
        >
          <ProjectIcon name={project.icon} className="h-6 w-6" />
        </span>
        <div className="flex flex-col items-end gap-1.5">
          <span
            dir="ltr"
            className={`font-mono text-xs text-gray-300 transition-colors duration-300 dark:text-gray-600 ${accent.num}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${accent.badge}`}
          >
            {project.category}
          </span>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-bold text-[#1E1B4B] sm:text-xl dark:text-indigo-100">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700 sm:text-base dark:text-gray-300">
        {project.summary}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            dir="ltr"
            className="rounded-md border border-indigo-100 bg-indigo-50 px-2.5 py-1 font-mono text-xs text-indigo-800 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-200"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span dir="ltr" className="px-1 py-1 font-mono text-xs text-gray-400 dark:text-gray-500">
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={onOpen}
          className="flex-1 rounded-md bg-gradient-to-l from-indigo-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-blue-700 sm:text-base"
        >
          {detailsLabel}
        </button>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-gray-800 px-4 py-2 text-center text-sm font-semibold text-white shadow-md transition hover:bg-black sm:text-base"
          >
            {githubLabel}
          </a>
        )}
      </div>
    </article>
  );
}
