"use client";
import type { Project } from "../i18n";

/**
 * סצנת SVG מונפשת לכל פרויקט — תחליף לצילום מסך. נעה בלולאה ומגיבה בריחוף.
 * הצבעים דרך currentColor (נקבע ב-wrapper, עם וריאנט למצב כהה).
 */

type Art = { text: string; bg: string; scene: React.ReactNode };

// מערכת מבוזרת — צמתים מהבהבים וקווים זורמים
const networkScene = (
  <>
    <g stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.8">
      <path className="art-flow" d="M55 32 L145 32" />
      <path className="art-flow" style={{ animationDelay: "0.3s" }} d="M55 32 L100 68" />
      <path className="art-flow" style={{ animationDelay: "0.6s" }} d="M145 32 L100 68" />
    </g>
    <g fill="currentColor">
      <circle className="art-node" cx="55" cy="32" r="8" />
      <circle className="art-node" style={{ animationDelay: "0.35s" }} cx="145" cy="32" r="8" />
      <circle className="art-node" style={{ animationDelay: "0.7s" }} cx="100" cy="68" r="8" />
      <circle className="art-node" style={{ animationDelay: "0.2s" }} cx="100" cy="32" r="3.5" />
      <circle className="art-node" style={{ animationDelay: "0.5s" }} cx="77" cy="50" r="3.5" />
      <circle className="art-node" style={{ animationDelay: "0.8s" }} cx="123" cy="50" r="3.5" />
    </g>
  </>
);

// מדרגות לימוד עולות + נקודה מנתרת
const stepsScene = (
  <>
    <g fill="currentColor">
      <rect x="28" y="58" width="30" height="22" rx="3" opacity="0.35" />
      <rect x="66" y="46" width="30" height="34" rx="3" opacity="0.55" />
      <rect x="104" y="34" width="30" height="46" rx="3" opacity="0.75" />
      <rect x="142" y="22" width="30" height="58" rx="3" opacity="0.95" />
    </g>
    <circle className="art-bob" cx="157" cy="12" r="6" fill="currentColor" />
  </>
);

// גלגל שיניים — מפעל
const gear = (
  <path
    fillRule="evenodd"
    d="M19.4 13a7.8 7.8 0 000-2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 00-1.7-1l-.4-2.6h-4l-.4 2.6a7.6 7.6 0 00-1.7 1l-2.4-1-2 3.4L4.6 11a7.8 7.8 0 000 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.7 1.7 1l.4 2.6h4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4-2-1.6zM12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7z"
  />
);
const factoryScene = (
  <g fill="currentColor">
    <g transform="translate(52 20) scale(1.9)">
      <g className="art-spin">{gear}</g>
    </g>
    <g transform="translate(112 8) scale(1.25)">
      <g className="art-spin" style={{ animationDirection: "reverse", animationDuration: "4.5s" }}>
        {gear}
      </g>
    </g>
  </g>
);

// דופק — כושר
const pulseScene = (
  <>
    <path
      className="art-flow"
      d="M8 46 H58 l9-26 16 50 11-36 h86"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />
    <circle className="art-beat" cx="83" cy="36" r="6" fill="currentColor" />
  </>
);

// תקציב — עמודות גדלות + מטבע
const budgetScene = (
  <>
    <g fill="currentColor">
      <rect className="art-bar" x="34" y="30" width="22" height="48" rx="3" opacity="0.55" />
      <rect className="art-bar" style={{ animationDelay: "0.25s" }} x="66" y="22" width="22" height="56" rx="3" opacity="0.7" />
      <rect className="art-bar" style={{ animationDelay: "0.5s" }} x="98" y="40" width="22" height="38" rx="3" opacity="0.6" />
      <rect className="art-bar" style={{ animationDelay: "0.75s" }} x="130" y="16" width="22" height="62" rx="3" opacity="0.9" />
    </g>
    <g className="art-bob">
      <circle cx="166" cy="24" r="11" fill="currentColor" />
      <text x="166" y="29" textAnchor="middle" fontSize="13" fontWeight="700" className="fill-white dark:fill-[#0a0f1f]">
        ₪
      </text>
    </g>
  </>
);

// WaterVision VR — משקפת מרחפת מעל גלי מים זורמים + טיפות
const waterVisionScene = (
  <>
    <g stroke="currentColor" fill="none" strokeWidth="3" strokeLinecap="round" opacity="0.7">
      <path className="art-flow" d="M14 68 q14 -10 28 0 t28 0 t28 0 t28 0 t28 0" />
      <path className="art-flow" style={{ animationDelay: "0.4s" }} d="M14 78 q14 -10 28 0 t28 0 t28 0 t28 0 t28 0" />
    </g>
    <g className="art-bob">
      <path
        fill="currentColor"
        d="M62 28 h76 a6 6 0 0 1 6 6 v9 a9 9 0 0 1 -9 9 h-13 a7 7 0 0 1 -6 -3.5 l-2.5 -4 a4 4 0 0 0 -6.8 0 l-2.5 4 a7 7 0 0 1 -6 3.5 h-13 a9 9 0 0 1 -9 -9 v-9 a6 6 0 0 1 6 -6 z"
      />
      <circle cx="80" cy="40" r="6" className="fill-white dark:fill-[#0a0f1f]" />
      <circle cx="120" cy="40" r="6" className="fill-white dark:fill-[#0a0f1f]" />
    </g>
    <circle className="art-bob" style={{ animationDelay: "0.6s" }} cx="40" cy="22" r="4" fill="currentColor" />
    <circle className="art-bob" style={{ animationDelay: "1s" }} cx="162" cy="20" r="5" fill="currentColor" />
  </>
);

// Tic-Tac-Toe — לוח עם סימני X/O שמופיעים לסירוגין
const ticTacToeScene = (
  <>
    <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5">
      <path d="M87 12V78M113 12V78M62 34H138M62 56H138" />
    </g>
    <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none">
      <g className="art-node">
        <path d="M70 17l10 10M80 17l-10 10" />
      </g>
      <g className="art-node" style={{ animationDelay: "0.5s" }}>
        <circle cx="125" cy="23" r="7.5" />
      </g>
      <g className="art-node" style={{ animationDelay: "1s" }}>
        <path d="M95 40l10 10M105 40l-10 10" />
      </g>
      <g className="art-node" style={{ animationDelay: "1.5s" }}>
        <circle cx="75" cy="67" r="7.5" />
      </g>
      <g className="art-node" style={{ animationDelay: "0.8s" }}>
        <path d="M120 62l10 10M130 62l-10 10" />
      </g>
    </g>
  </>
);

const artMap: Record<string, Art> = {
  "tic-tac-toe": {
    text: "text-slate-600 dark:text-slate-300",
    bg: "from-slate-100/70 to-indigo-100/40 dark:from-slate-500/15 dark:to-indigo-500/10",
    scene: ticTacToeScene,
  },
  watervision: {
    text: "text-cyan-500 dark:text-cyan-300",
    bg: "from-cyan-100/70 to-sky-100/50 dark:from-cyan-500/15 dark:to-sky-500/10",
    scene: waterVisionScene,
  },
  mulligan: {
    text: "text-violet-500 dark:text-violet-300",
    bg: "from-violet-100/70 to-indigo-100/50 dark:from-violet-500/15 dark:to-indigo-500/10",
    scene: networkScene,
  },
  sugarsteps: {
    text: "text-rose-500 dark:text-rose-300",
    bg: "from-rose-100/70 to-pink-100/50 dark:from-rose-500/15 dark:to-pink-500/10",
    scene: stepsScene,
  },
  "plastic-factory": {
    text: "text-amber-500 dark:text-amber-300",
    bg: "from-amber-100/70 to-orange-100/50 dark:from-amber-500/15 dark:to-orange-500/10",
    scene: factoryScene,
  },
  moveit: {
    text: "text-emerald-500 dark:text-emerald-300",
    bg: "from-emerald-100/70 to-teal-100/50 dark:from-emerald-500/15 dark:to-teal-500/10",
    scene: pulseScene,
  },
  budgi: {
    text: "text-sky-500 dark:text-sky-300",
    bg: "from-sky-100/70 to-cyan-100/50 dark:from-sky-500/15 dark:to-cyan-500/10",
    scene: budgetScene,
  },
};

const fallback = artMap.mulligan;

export default function ProjectArt({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const art = artMap[project.id] ?? fallback;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${art.bg} ${art.text} ${className}`}
      aria-hidden="true"
    >
      {/* רשת עדינה ברקע לתחושת "מסך" */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <svg
        viewBox="0 0 200 90"
        className="relative h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {art.scene}
      </svg>
    </div>
  );
}
