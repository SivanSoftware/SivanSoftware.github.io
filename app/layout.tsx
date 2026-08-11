import "./globals.css";
import Navbar from "./components/Navbar";
import { LanguageProvider } from "./components/LanguageProvider";
import { ReactNode } from "react";
import { Rubik, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";

type RootLayoutProps = {
  children: ReactNode;
};

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700"],
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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${rubik.className} ${jetbrainsMono.variable}`}
    >
      <body className="text-gray-800 antialiased">
        {/* ללא JavaScript אין מי שיחשוף את התוכן — מציגים אותו כמו שהוא */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
