"use client";
import { useEffect, useRef, useState } from "react";
import type { Stat } from "../i18n";

/** ספירה עולה למספר כשהרכיב נכנס למסך; שנים/ערכים גדולים מוצגים כמו שהם. */
function useCountUp(target: number, run: boolean, countable: boolean) {
  const [value, setValue] = useState(countable ? 0 : target);

  useEffect(() => {
    if (!countable || !run) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }
    let frame = 0;
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, run, countable]);

  return value;
}

function StatTile({ stat, run, delay }: { stat: Stat; run: boolean; delay: number }) {
  const match = stat.value.match(/^(\d+)(\+?)$/);
  const num = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  // ערכים קטנים נספרים; שנים (כמו 2025) מוצגים ישירות
  const countable = Boolean(match) && num <= 999;
  const display = useCountUp(num, run, countable);

  return (
    <div
      className="glow-hover group relative overflow-hidden rounded-xl border border-indigo-200/70 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 dark:border-indigo-400/20 dark:bg-white/[0.04]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-[right_center] scale-x-0 bg-gradient-to-l from-indigo-500 to-sky-400 transition-transform duration-500 group-hover:scale-x-100"
      />
      <div
        dir="ltr"
        className="bg-gradient-to-l from-blue-600 to-indigo-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl dark:from-sky-300 dark:to-indigo-300"
      >
        {countable ? `${display}${suffix}` : stat.value}
      </div>
      <div className="mt-1 text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
        {stat.label}
      </div>
    </div>
  );
}

export default function Stats({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <StatTile key={stat.label} stat={stat} run={run} delay={i * 90} />
      ))}
    </div>
  );
}
