"use client";
import { useEffect, useRef, useState } from "react";

/**
 * חושף אלמנט כשהוא נכנס למסך. מחזיר ref ואת המחלקות להוספה.
 *
 * החשיפה היא שיפור ויזואלי בלבד — התוכן חייב להופיע גם אם האנימציה לא
 * מתאפשרת: תנועה מופחתת, דפדפן ללא IntersectionObserver, או חלון שאין לו
 * גובה (טאב מוסתר). בכל אחד מהמקרים מציגים מיד.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // חלון ללא גובה אמיתי (טאב מוסתר) לא יפיק חיתוכים לעולם
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerHeight < 200
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);

    // רשת ביטחון בלתי-מותנית: תוכן לעולם לא יישאר נסתר בגלל האנימציה.
    // אם המבקר עדיין לא גלל לכאן, החשיפה פשוט תקרה מראש — לא נגרם נזק.
    const fallback = window.setTimeout(() => setVisible(true), 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return {
    ref,
    className: visible ? "reveal reveal-in" : "reveal",
    style: { transitionDelay: `${delay}ms` },
  };
}
