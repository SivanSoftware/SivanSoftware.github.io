"use client";
import ProjectIcon from "./ProjectIcon";
import { useReveal } from "./useReveal";
import type { Project } from "../i18n";

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

  return (
    <article
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} group relative flex flex-col overflow-hidden rounded-xl border border-indigo-100 bg-white/85 backdrop-blur-sm p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-indigo-300 hover:shadow-xl`}
    >
      {/* קו מבטא עליון שנפרש בריחוף */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-[left_center] scale-x-0 bg-gradient-to-l from-indigo-500 to-blue-500 transition-transform duration-500 group-hover:scale-x-100 rtl:origin-[right_center]"
      />

      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:ring-indigo-600">
          <ProjectIcon name={project.icon} className="h-6 w-6" />
        </span>
        <div className="flex flex-col items-end gap-1.5">
          <span
            dir="ltr"
            className="font-mono text-xs text-indigo-300 transition-colors duration-300 group-hover:text-indigo-500"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1 text-xs font-semibold text-indigo-700">
            {project.category}
          </span>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-bold text-[#1E1B4B] sm:text-xl">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-700 sm:text-base">
        {project.summary}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            dir="ltr"
            className="rounded-md border border-indigo-100 bg-indigo-50 px-2.5 py-1 font-mono text-xs text-indigo-800"
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span dir="ltr" className="px-1 py-1 font-mono text-xs text-gray-400">
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
