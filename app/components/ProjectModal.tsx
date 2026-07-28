"use client";
import React, { useEffect } from "react";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  githubUrl?: string;
  tech?: string[];
};

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  description,
  githubUrl,
  tech,
}: ProjectModalProps) {
  // סגירה במקש Escape ונעילת גלילת הרקע כשהפופאפ פתוח
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const buttonClass =
    "px-5 py-2 rounded-md font-semibold transition transform hover:-translate-y-0.5 shadow-md text-center";

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white p-6 sm:p-8 rounded-xl max-w-lg w-full relative animate-modal-pop max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-gray-900 text-2xl font-bold p-1 leading-none"
          aria-label="סגירה"
        >
          &times;
        </button>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 border-b pb-2">
          {title}
        </h3>

        <p className="text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed">
          {description}
        </p>

        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tech.map((t) => (
              <span
                key={t}
                className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-start gap-3 pt-4 border-t">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} bg-gray-800 text-white hover:bg-black`}
            >
              מעבר לקוד ב-GitHub
            </a>
          )}
          <button
            onClick={onClose}
            className={`${buttonClass} bg-gray-200 text-gray-800 hover:bg-gray-300`}
          >
            סגירה
          </button>
        </div>
      </div>
    </div>
  );
}
