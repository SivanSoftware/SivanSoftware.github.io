"use client";
import React, { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  tech?: string[];
};

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  description,
  githubUrl,
  liveUrl,
  liveLabel,
  tech,
}: ProjectModalProps) {
  const { t, lang } = useLanguage();

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
        className="bg-white p-6 sm:p-8 rounded-xl max-w-lg w-full relative animate-modal-pop max-h-[85vh] overflow-y-auto dark:bg-[#111827] dark:ring-1 dark:ring-indigo-400/20"
        onClick={(e) => e.stopPropagation()}
        dir={lang === "he" ? "rtl" : "ltr"}
      >
        <button
          onClick={onClose}
          className="absolute top-3 end-3 text-gray-500 hover:text-gray-900 text-2xl font-bold p-1 leading-none dark:text-gray-400 dark:hover:text-white"
          aria-label={t.modal.closeAria}
        >
          &times;
        </button>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 border-b pb-2 dark:text-indigo-100 dark:border-indigo-400/20">
          {title}
        </h3>

        <p className="text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed dark:text-gray-300">
          {description}
        </p>

        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tech.map((item) => (
              <span
                key={item}
                className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full dark:bg-indigo-500/15 dark:text-indigo-200"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-start gap-3 pt-4 border-t dark:border-indigo-400/20">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} bg-gradient-to-l from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700`}
            >
              {liveLabel ?? "Live"}
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass} bg-gray-800 text-white hover:bg-black`}
            >
              {t.modal.github}
            </a>
          )}
          <button
            onClick={onClose}
            className={`${buttonClass} bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20`}
          >
            {t.modal.close}
          </button>
        </div>
      </div>
    </div>
  );
}
