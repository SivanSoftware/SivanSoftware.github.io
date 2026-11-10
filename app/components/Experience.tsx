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

function ExperienceCard({
  item,
  index,
  techLabel,
}: {
  item: ExperienceItem;
  index: number;
  techLabel: string;
}) {
  const reveal = useReveal<HTMLLIElement>(index * 130);

  return (
    <li ref={reveal.ref} style={reveal.style} className={reveal.className}>
      <article className="group relative overflow-hidden rounded-2xl border border-[#E7DFD6] bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.06]">
        {/* פס מבטא זהב-פלום בראש הכרטיס */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 origin-[right_center] scale-x-0 bg-gradient-to-l from-[#8E72AE] via-[#7E6A9E] to-[#C2A368] transition-transform duration-500 group-hover:scale-x-100"
        />

        <div className="grid gap-5 p-6 sm:p-7 md:grid-cols-[186px_1fr] md:gap-7">
          {/* עמודת תאריך + ארגון */}
          <div className="flex items-start gap-3 md:flex-col md:items-start md:gap-3 md:border-e md:border-[#eadfd2] md:pe-6 dark:md:border-white/10">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f3ecf7] text-[#6E5B86] ring-1 ring-[#e4d8ec] dark:bg-[#7E6A9E]/12 dark:text-[#cdb9e6] dark:ring-[#7E6A9E]/25">
              {item.logo ? (
                <span className="relative h-7 w-7 overflow-hidden rounded">
                  <Image src={item.logo} alt={item.org} fill className="object-contain" />
                </span>
              ) : (
                <KindIcon kind={item.kind} />
              )}
            </span>
            <div className="min-w-0">
              <span
                dir="ltr"
                className="block font-mono text-sm font-bold tracking-tight text-[#b48d43] dark:text-[#d8c08a]"
              >
                {item.period}
              </span>
              <p className="mt-1 text-sm font-semibold text-[#6E5B86] dark:text-[#c3b0dd]">
                {item.org}
              </p>
            </div>
          </div>

          {/* עמודת תפקיד + תיאור */}
          <div>
            <h3 className="text-lg font-extrabold text-[#3E2E4F] sm:text-xl dark:text-[#e9def5]">
              {item.role}
            </h3>

            <ul className="mt-3 space-y-2">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm leading-relaxed text-[#5a5160] dark:text-gray-300"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#C2A368] to-[#8E72AE]"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {item.tech && item.tech.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-[#a99cb6] dark:text-gray-500">
                  {techLabel}:
                </span>
                {item.tech.map((tech) => (
                  <span
                    key={tech}
                    dir="ltr"
                    className="rounded-md border border-[#e4d8ec] bg-[#f3ecf7] px-2.5 py-1 font-mono text-xs text-[#6E5B86] dark:border-[#7E6A9E]/25 dark:bg-[#7E6A9E]/10 dark:text-[#cdb9e6]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
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
  return (
    <Reveal className="mx-auto max-w-3xl">
      <ol className="space-y-5 sm:space-y-6">
        {items.map((item, index) => (
          <ExperienceCard key={item.id} item={item} index={index} techLabel={techLabel} />
        ))}
      </ol>
    </Reveal>
  );
}
