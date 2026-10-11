"use client";
import Image from "next/image";
import Reveal from "./Reveal";
import { useReveal } from "./useReveal";
import type { Experience as ExperienceItem } from "../i18n";

function KindIcon({ kind }: { kind: ExperienceItem["kind"] }) {
  if (kind === "service") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V4m0 0h11l-2 4 2 4H5" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" />
    </svg>
  );
}

function TimelineRow({
  item,
  index,
  techLabel,
}: {
  item: ExperienceItem;
  index: number;
  techLabel: string;
}) {
  const reveal = useReveal<HTMLLIElement>(index * 140);

  return (
    <li
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} relative ps-16 sm:ps-20`}
    >
      {/* נקודת ציר הזמן */}
      <span className="pulse-ring absolute start-4 top-1.5 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg ring-4 ring-[#f5f8ff] rtl:translate-x-1/2 dark:ring-[#0a0f1f]">
        <KindIcon kind={item.kind} />
      </span>

      <div className="glow-hover group rounded-xl border border-indigo-200/70 bg-white/85 p-5 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:p-6 dark:border-indigo-400/20 dark:bg-white/[0.04]">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-lg font-bold text-[#1E1B4B] dark:text-indigo-100">
                {item.role}
              </h3>
              <span
                dir="ltr"
                className="rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-300"
              >
                {item.period}
              </span>
            </div>
            <p className="mt-0.5 font-semibold text-indigo-600 dark:text-sky-300">
              {item.org}
            </p>
          </div>

          {/* אמblem מונפש של הארגון — או לוגו אמיתי אם הוגדר ב-i18n */}
          {item.logo ? (
            <div className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:block">
              <Image src={item.logo} alt={item.org} fill className="object-contain" />
            </div>
          ) : (
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-100 to-sky-100 text-indigo-500 sm:flex dark:from-indigo-500/15 dark:to-sky-500/10 dark:text-indigo-300">
              <span className="float-y flex items-center justify-center">
                <span className="scale-[1.6]">
                  <KindIcon kind={item.kind} />
                </span>
              </span>
            </div>
          )}
        </div>

        <ul className="mt-4 space-y-2">
          {item.points.map((point) => (
            <li
              key={point}
              className="flex gap-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 dark:bg-sky-400"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {item.tech && item.tech.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
              {techLabel}:
            </span>
            {item.tech.map((tech) => (
              <span
                key={tech}
                dir="ltr"
                className="rounded-md border border-indigo-100 bg-indigo-50 px-2.5 py-1 font-mono text-xs text-indigo-800 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function Experience({
  items,
  techLabel,
}: {
  items: ExperienceItem[];
  techLabel: string;
}) {
  const lineReveal = useReveal<HTMLSpanElement>(0);

  return (
    <Reveal className="relative mx-auto max-w-3xl">
      <ol className="relative space-y-8">
        {/* קו ציר הזמן — מצויר בכניסה למסך */}
        <span
          ref={lineReveal.ref}
          style={lineReveal.style}
          aria-hidden="true"
          className={`timeline-line ${lineReveal.className} absolute bottom-2 start-4 top-2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-blue-500 to-indigo-300 rtl:translate-x-1/2 dark:from-indigo-400 dark:via-sky-400 dark:to-indigo-500/40`}
        />
        {items.map((item, index) => (
          <TimelineRow
            key={item.id}
            item={item}
            index={index}
            techLabel={techLabel}
          />
        ))}
      </ol>
    </Reveal>
  );
}
