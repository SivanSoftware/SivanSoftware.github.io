import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { ReactNode } from "react";
import { Heebo, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";

type RootLayoutProps = {
  children: ReactNode;
};

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "סיון לסרי | פורטפוליו",
  description:
    "הפורטפוליו של סיון לסרי — מפתחת תוכנה. פרויקטים במערכות מבוזרות, Java, React ועוד.",
};

/*
 * קובע את מצב התצוגה (בהיר/כהה) לפני ציור הדף כדי למנוע הבהוב:
 * קורא העדפה שמורה, ואם אין — נופל להעדפת המערכת.
 */
const themeInitScript = `(function () {
  try {
    var stored = localStorage.getItem("portfolio-theme");
    var dark = stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();`;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.className} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="text-gray-800 antialiased dark:text-gray-200">
        {/* ללא JavaScript אין מי שיחשוף את התוכן — מציגים אותו כמו שהוא */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
