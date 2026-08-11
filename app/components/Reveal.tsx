"use client";
import { ReactNode } from "react";
import { useReveal } from "./useReveal";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reveal = useReveal<HTMLDivElement>(delay);

  return (
    <div
      ref={reveal.ref}
      style={reveal.style}
      className={`${reveal.className} ${className}`}
    >
      {children}
    </div>
  );
}
