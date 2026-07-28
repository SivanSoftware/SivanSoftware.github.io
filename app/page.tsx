"use client";
import { useState } from "react";
import Image from "next/image";
import ProjectModal from "./components/ProjectModal";

type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  githubUrl?: string;
  tech: string[];
};

const projects: Project[] = [
  {
    id: "mulligan",
    title: "Mulligan — מערכת חניה מבוזרת",
    summary:
      "פלטפורמת חניה מבוזרת ועמידה לתקלות ב-Java: נהגים, פקחי חניה ופקידי עירייה על גבי אשכולות MongoDB, RabbitMQ ו-Raft — עם אבטחה קשוחה מקצה לקצה.",
    description:
      "Mulligan היא מערכת חניה מבוזרת שנבנתה ב-Java ומשרתת שלושה תפקידים: נהגים (רישום רכב, התחלת/סיום חניה, תשלום והמלצת חניה), פקחי חניה (בדיקת רכבים והנפקת דוחות) ופקידי עירייה (צפייה בדוחות עסקאות ודוחות חניה).\n\n" +
      "המערכת עמידה לתקלות מקצה לקצה: MongoDB replica set של 3 צמתים, אשכול RabbitMQ של 3 צמתים עם quorum queues, ואשכול המלצות של 3 צמתים המשלב קונצנזוס Raft (Apache Ratis) עם הצבעת רוב — כך שהאשכול שורד גם צומת שנפל וגם צומת זדוני.\n\n" +
      "בצד האבטחה: אימות TLS מול MongoDB, חתימות HMAC בגישת fail-closed, הגנה מפני replay בין צמתים, הרשאות מינימליות ב-RabbitMQ ותיעוד אבטחה מתמשך. הכול רץ עם Docker Compose, וכל תפקיד מגיע גם כ-GUI (JavaFX) וגם כ-CLI אינטראקטיבי.",
    githubUrl: "https://github.com/SivanSoftware/mulligan-parking-system",
    tech: [
      "Java",
      "MongoDB",
      "RabbitMQ",
      "Raft (Apache Ratis)",
      "Docker Compose",
      "JavaFX",
      "TLS & HMAC",
      "Gradle",
    ],
  },
  {
    id: "budgi",
    title: "Budgi — ניהול תקציב אישי",
    summary:
      "אפליקציית ווב לניהול תקציב אישי ב-React: מעקב הוצאות, תכנון תקציב חודשי וניהול משתמשים מבוסס Firebase.",
    description:
      "Budgi היא אפליקציית ווב לניהול תקציב אישי שנבנתה ב-React עם Vite. האפליקציה כוללת מעקב אחר הוצאות, תכנון תקציב חודשי, ומערכת משתמשים מלאה (הרשמה, התחברות ושחזור סיסמה) מבוססת Firebase.",
    tech: ["React", "Vite", "Firebase", "React Router", "TypeScript"],
  },
];

const skills = [
  "Java",
  "מערכות מבוזרות",
  "MongoDB",
  "RabbitMQ",
  "Docker",
  "React",
  "Next.js",
  "TypeScript",
  "Firebase",
  "Tailwind CSS",
  "Git & CI/CD",
];

export default function Home() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <main id="top" className="pt-20">
      {/* פתיח */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <Image
          src="/sivan.jpg"
          alt="סיון לסרי"
          width={667}
          height={1000}
          priority
          className="w-40 h-40 sm:w-52 sm:h-52 rounded-full object-cover object-top mx-auto mb-6 border-4 border-purple-200 shadow-lg"
        />
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4">
          היי, אני <span className="text-[#733B73]">סיון לסרי</span>
        </h1>
        <p className="text-lg sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          מפתחת תוכנה עם תשוקה למערכות מבוזרות, אבטחה ופיתוח ווב.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#733B73] text-white font-semibold shadow-md hover:bg-[#5d2f5d] transition transform hover:-translate-y-0.5"
          >
            לפרויקטים שלי
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-white text-[#733B73] border border-purple-300 font-semibold shadow-sm hover:bg-purple-50 transition transform hover:-translate-y-0.5"
          >
            דברו איתי
          </a>
        </div>
      </section>

      {/* פרויקטים */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          פרויקטים
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-purple-100 p-6 flex flex-col hover:shadow-xl transition"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4 flex-1">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="bg-purple-100 text-[#733B73] text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-sm text-gray-500 px-1 py-1">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setOpenProject(project)}
                  className="px-5 py-2 rounded-md bg-[#733B73] text-white font-semibold hover:bg-[#5d2f5d] transition shadow-md"
                >
                  פרטים נוספים
                </button>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-md bg-gray-800 text-white font-semibold hover:bg-black transition shadow-md text-center"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* כישורים ורקע */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          כישורים ורקע
        </h2>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-purple-100 p-6 sm:p-8 max-w-3xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-6 text-center">
            אני בונה מערכות מהתשתית ועד לממשק — ממערכות מבוזרות עמידות לתקלות
            ב-Java ועד אפליקציות ווב מודרניות ב-React. אוהבת בעיות של אמינות,
            קונצנזוס ואבטחה.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-purple-100 text-[#733B73] font-medium px-4 py-1.5 rounded-full text-sm sm:text-base"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* צרו קשר */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          צרו קשר
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:sivanlasri4@gmail.com"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#733B73] text-white font-semibold shadow-md hover:bg-[#5d2f5d] transition text-center"
          >
            sivanlasri4@gmail.com
          </a>
          <a
            href="https://github.com/SivanSoftware"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow-md hover:bg-black transition text-center"
          >
            GitHub
          </a>
        </div>
      </section>

      <footer className="border-t border-purple-200 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} סיון לסרי
      </footer>

      <ProjectModal
        isOpen={openProject !== null}
        onClose={() => setOpenProject(null)}
        title={openProject?.title ?? ""}
        description={openProject?.description ?? ""}
        githubUrl={openProject?.githubUrl}
        tech={openProject?.tech}
      />
    </main>
  );
}
