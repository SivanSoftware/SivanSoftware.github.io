"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { accents, fallbackAccent, IconBadge, ProjectVisual } from "./ProjectVisual";
import type { Project } from "../i18n";

type Metrics = { cardW: number; cardH: number; spacing: number; depth: number; angle: number };

const DESKTOP: Metrics = { cardW: 300, cardH: 400, spacing: 212, depth: 150, angle: 40 };
const TABLET: Metrics = { cardW: 270, cardH: 370, spacing: 168, depth: 130, angle: 38 };
const MOBILE: Metrics = { cardW: 230, cardH: 330, spacing: 78, depth: 120, angle: 34 };

function useMetrics(): Metrics {
  const [m, setM] = useState<Metrics>(DESKTOP);
  useEffect(() => {
    const pick = () => {
      const w = window.innerWidth;
      setM(w < 640 ? MOBILE : w < 1024 ? TABLET : DESKTOP);
    };
    pick();
    window.addEventListener("resize", pick);
    return () => window.removeEventListener("resize", pick);
  }, []);
  return m;
}

export default function ProjectCarousel({
  projects,
  detailsLabel,
  githubLabel,
  liveLabel,
  onOpen,
}: {
  projects: Project[];
  detailsLabel: string;
  githubLabel: string;
  liveLabel: string;
  onOpen: (id: string) => void;
}) {
  const n = projects.length;
  const [active, setActive] = useState(0);
  const m = useMetrics();
  const activeProject = projects[active];
  const accent = accents[activeProject.id] ?? fallbackAccent;

  // קיצור המרחק הטבעתי הקצר ביותר בין שני אינדקסים (קרוסלה מעגלית)
  const offsetOf = useCallback(
    (i: number) => {
      let off = i - active;
      if (off > n / 2) off -= n;
      if (off < -n / 2) off += n;
      return off;
    },
    [active, n]
  );

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + n) % n),
    [n]
  );

  // גרירה / החלקת אצבע
  const drag = useRef<{ x: number; active: boolean; moved: boolean }>({ x: 0, active: false, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, active: true, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 55) {
      go(dx > 0 ? -1 : 1); // גרירה ימינה -> הכרטיס הקודם (משמאל) למרכז
      drag.current.active = false;
      drag.current.moved = true;
    }
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  // ניווט מקלדת
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(1);
    }
  };

  const stageH = m.cardH + 56;

  return (
    <div className="select-none">
      {/* הבמה התלת-ממדית */}
      <div
        className="cf-perspective relative mx-auto w-full"
        style={{ height: stageH, maxWidth: 1100, touchAction: "pan-y" }}
        role="group"
        aria-roledescription="carousel"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        {/* פלטפורמת זהב זוהרת */}
        <div
          aria-hidden="true"
          className="cf-platform"
          style={{ width: m.cardW * 1.9, height: m.cardH * 0.4, bottom: 8 }}
        />
        {/* חלקיקי אור צפים */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {[14, 32, 50, 68, 86].map((l, i) => (
            <span
              key={i}
              className="cf-particle"
              style={{ left: `${l}%`, animationDuration: `${7 + i * 1.3}s`, animationDelay: `${i * 1.1}s` }}
            />
          ))}
        </div>

        {projects.map((project, i) => {
          const off = offsetOf(i);
          const abs = Math.abs(off);
          const isActive = off === 0;
          const visible = abs <= 3;
          const a = accents[project.id] ?? fallbackAccent;
          const x = off * m.spacing;
          const z = -abs * m.depth;
          const rotateY = Math.max(-45, Math.min(45, -off * m.angle));
          const scale = Math.max(0.55, 1 - abs * 0.14);
          const opacity = !visible ? 0 : Math.max(0.15, 1 - abs * (m.cardW < 260 ? 0.34 : 0.2));

          return (
            <button
              key={project.id}
              type="button"
              aria-label={project.title}
              aria-current={isActive ? "true" : undefined}
              tabIndex={isActive ? 0 : -1}
              onClick={() => {
                if (drag.current.moved) {
                  drag.current.moved = false;
                  return;
                }
                if (isActive) onOpen(project.id);
                else setActive(i);
              }}
              className="cf-card group"
              style={{
                width: m.cardW,
                height: m.cardH,
                opacity,
                zIndex: 50 - abs,
                pointerEvents: visible ? "auto" : "none",
                transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
              }}
            >
              <div
                className={`relative h-full w-full overflow-hidden rounded-2xl border bg-white/85 shadow-xl backdrop-blur-sm dark:bg-white/[0.04] ${
                  isActive
                    ? "cf-active border-[#d9bd7e] dark:border-[#C2A368]/50"
                    : "border-[#E7DFD6] dark:border-white/10"
                }`}
              >
                <div className="relative h-full w-full">
                  <ProjectVisual project={project} animated={isActive} />
                </div>

                {/* שכבת כיתוב */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent p-4 pt-10 text-start">
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#e9d7a6]">
                    {project.category}
                  </span>
                  <h3 className="mt-0.5 line-clamp-1 text-lg font-extrabold text-white drop-shadow sm:text-xl">
                    {project.title}
                  </h3>
                </div>

                {/* רמז "פתח" בכרטיס הפעיל */}
                {isActive && (
                  <span className="pointer-events-none absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M21 3l-9 9M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                    </svg>
                    {detailsLabel}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* חצים + מחוון */}
      <div className="mt-5 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous project"
          className="cf-arrow"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Projects">
          {projects.map((project, i) => {
            const isActive = i === active;
            return (
              <button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={project.title}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-gradient-to-l from-[#8E72AE] to-[#C2A368]"
                    : "w-2 bg-[#cbbbdd] hover:bg-[#8E72AE] dark:bg-white/20 dark:hover:bg-white/40"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next project"
          className="cf-arrow"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5l-7 7 7 7" />
          </svg>
        </button>
      </div>

      {/* פאנל מידע לפרויקט הפעיל */}
      <Reveal className="mx-auto mt-8 max-w-3xl">
        <div
          key={activeProject.id}
          className="fade-up rounded-2xl border border-[#E7DFD6] bg-white/70 p-6 text-center shadow-sm backdrop-blur-sm sm:p-7 dark:border-white/10 dark:bg-white/[0.04]"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <IconBadge project={activeProject} accent={accent} />
            <div className="text-start">
              <span className={`block text-xs font-semibold ${accent.text}`}>
                {activeProject.category}
              </span>
              <h3 className="text-xl font-extrabold text-[#3E2E4F] sm:text-2xl dark:text-[#e9def5]">
                {activeProject.title}
              </h3>
            </div>
          </div>

          <p className="mx-auto mb-5 max-w-2xl text-sm leading-relaxed text-[#5a5160] sm:text-base dark:text-gray-300">
            {activeProject.summary}
          </p>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {activeProject.tech.map((tech) => (
              <span
                key={tech}
                dir="ltr"
                className="rounded-md border border-[#e4d8ec] bg-[#f3ecf7] px-2.5 py-1 font-mono text-xs text-[#6E5B86] dark:border-[#7E6A9E]/25 dark:bg-[#7E6A9E]/10 dark:text-[#cdb9e6]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => onOpen(activeProject.id)}
              className="rounded-md bg-gradient-to-l from-[#8E72AE] to-[#C2A368] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-105 sm:text-base"
            >
              {detailsLabel}
            </button>
            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-[#bcd6c6] bg-[#eef5f0] px-5 py-2.5 text-sm font-semibold text-[#4f7a63] shadow-sm transition hover:bg-[#e4f0e9] sm:text-base dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M19 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
                </svg>
                {liveLabel}
              </a>
            )}
            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#3E2E4F] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2b2038] sm:text-base dark:bg-white/10 dark:hover:bg-white/20"
              >
                {githubLabel}
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
