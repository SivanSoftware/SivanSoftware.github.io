"use client";
import { useEffect, useState } from "react";

/** פס דק בראש הדף שמראה את התקדמות הגלילה */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      aria-hidden="true"
    >
      <div
        className="scroll-progress h-full bg-gradient-to-l from-indigo-600 to-blue-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
