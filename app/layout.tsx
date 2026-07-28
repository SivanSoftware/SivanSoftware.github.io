import "./globals.css";
import Navbar from "./components/Navbar";
import { ReactNode } from "react";
import { Rubik } from "next/font/google";
import type { Metadata } from "next";

type RootLayoutProps = {
  children: ReactNode;
};

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "סיון לסרי | פורטפוליו",
  description:
    "הפורטפוליו של סיון לסרי — מפתחת תוכנה. פרויקטים במערכות מבוזרות, Java, React ועוד.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="he" dir="rtl" className={rubik.className}>
      <body className="text-gray-800 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
