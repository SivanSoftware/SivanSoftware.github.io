export type IconName =
  | "network"
  | "mobile"
  | "factory"
  | "pulse"
  | "wallet"
  | "vr"
  | "web";

const paths: Record<IconName, React.ReactNode> = {
  // משקפת מציאות מדומה
  vr: (
    <path d="M3.5 8.5h17a1 1 0 0 1 1 1v3.5a2.5 2.5 0 0 1-2.5 2.5h-2.8a2 2 0 0 1-1.7-1l-.8-1.2a1.4 1.4 0 0 0-2.4 0l-.8 1.2a2 2 0 0 1-1.7 1H5a2.5 2.5 0 0 1-2.5-2.5V9.5a1 1 0 0 1 1-1z" />
  ),
  // חלון דפדפן — אתר
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18" />
      <path d="M6 6.75h.01M8.4 6.75h.01M10.8 6.75h.01" />
    </>
  ),
  // אשכול צמתים — מערכת מבוזרת
  network: (
    <>
      <circle cx="12" cy="4.5" r="2.25" />
      <circle cx="4.75" cy="18" r="2.25" />
      <circle cx="19.25" cy="18" r="2.25" />
      <path d="M10.6 6.4 6 15.9M13.4 6.4 18 15.9M7 18h10" />
    </>
  ),
  // מכשיר נייד
  mobile: (
    <>
      <rect x="6.25" y="2.5" width="11.5" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
      <path d="M9.5 6.5h5" />
    </>
  ),
  // מפעל
  factory: (
    <>
      <path d="M2.5 20.5h19" />
      <path d="M4.5 20.5V10l5 3V10l5 3V6.5l5 3v11" />
      <path d="M8 20.5v-3M13 20.5v-3M17.5 20.5v-3" />
    </>
  ),
  // דופק — כושר
  pulse: (
    <>
      <path d="M2.5 12h4l2.5-7 4.5 14 2.5-7h5.5" />
    </>
  ),
  // ארנק
  wallet: (
    <>
      <path d="M3.5 8V6.75A2.25 2.25 0 0 1 5.75 4.5h11" />
      <rect x="3.5" y="8" width="17" height="11.5" rx="2.25" />
      <circle cx="16.25" cy="13.75" r="1.15" />
    </>
  ),
};

export default function ProjectIcon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
