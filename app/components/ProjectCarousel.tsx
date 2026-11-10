"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { accents, fallbackAccent, IconBadge, ProjectVisual } from "./ProjectVisual";
import type { Project } from "../i18n";

type Metrics = { cardW: number; cardH: number; spacing: number; depth: number; angle: number };

const DESKTOP: Metrics = { cardW: 300, cardH: 400, spacing: 212, depth: 150, angle: 40 };
const TABLET: Metrics = { cardW: 270, cardH: 370, spacing: 168, depth: 130, angle: 38 };
const MOBILE: Metrics = { cardW: 230, cardH: 330, spacing: 78, depth: 120, angle: 34 };

/** מדגיש את החלק "הכי טוב" המסומן ב-**...** בצבע הפלום של המותג */
function Emphasis({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-[#6E5B86] dark:text-[#c3b0dd]">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

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
}: {
  projects: Project[];
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
                if (!isActive) setActive(i);
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

          <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-[#5a5160] sm:text-base dark:text-gray-300">
            <Emphasis text={activeProject.summary} />
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

          <div className="flex flex-wrap items-center justify-center gap-3">
            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${activeProject.title} — live site`}
                title={activeProject.title}
                className="cf-iconlink"
              >
                {/* דפדפן */}
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" />
                </svg>
              </a>
            )}
            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${activeProject.title} — GitHub`}
                title="GitHub"
                className="cf-iconlink"
              >
                {/* לוגו GitHub */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .5C5.73.5.6 5.63.6 11.9c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2.1c-3.17.69-3.84-1.3-3.84-1.3-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.95.1-.74.4-1.25.72-1.54-2.53-.29-5.2-1.27-5.2-5.64 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.38-2.67 5.35-5.21 5.63.41.35.78 1.04.78 2.1v3.11c0 .3.2.66.79.55 4.51-1.5 7.77-5.76 7.77-10.78C23.4 5.63 18.27.5 12 .5z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
