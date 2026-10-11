"use client";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

/**
 * מציג תמונה אם ניתן `src`, אחרת מסגרת placeholder מעוצבת עם רמז לשם הקובץ.
 * כדי להחליף ל-תמונה אמיתית: שומרים קובץ בתיקיית public לפי ה-hint,
 * ומוסיפים את הנתיב בשדה image/logo ב-i18n.ts.
 */
export default function ImagePlaceholder({
  src,
  alt,
  hint,
  className = "",
  rounded = "rounded-xl",
  icon = "image",
}: {
  src?: string;
  alt: string;
  hint?: string;
  className?: string;
  rounded?: string;
  icon?: "image" | "logo";
}) {
  const { lang } = useLanguage();

  if (src) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  const label = lang === "he" ? "מקום לתמונה" : "Image slot";
  const sub =
    lang === "he" ? "אפשר להוסיף כאן תמונה" : "Drop an image here";

  return (
    <div
      className={`shimmer relative flex flex-col items-center justify-center gap-2 overflow-hidden border-2 border-dashed border-indigo-300/70 bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-400 dark:border-indigo-400/30 dark:from-indigo-500/10 dark:to-sky-500/10 dark:text-indigo-300/80 ${rounded} ${className}`}
      aria-label={alt}
      role="img"
    >
      {icon === "logo" ? (
        <svg className="h-7 w-7 opacity-80" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path strokeLinecap="round" d="M8 13l2.5-3 2 2.5L15 9l1.5 2" />
          <circle cx="9" cy="8.5" r="1" />
        </svg>
      ) : (
        <svg className="h-8 w-8 opacity-80" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 17l4.5-4.5 3 3L15 11l5 5" />
        </svg>
      )}
      <span className="text-xs font-semibold">{label}</span>
      <span className="text-[10px] opacity-70">{sub}</span>
      {hint && (
        <code dir="ltr" className="mt-0.5 rounded bg-white/60 px-1.5 py-0.5 font-mono text-[10px] text-indigo-500/90 dark:bg-white/10 dark:text-indigo-200/80">
          {hint}
        </code>
      )}
    </div>
  );
}
