"use client";
import { useState } from "react";
import Image from "next/image";
import ProjectModal from "./components/ProjectModal";

type Project = {
  id: string;
  emoji: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  githubUrl?: string;
  tech: string[];
};

const projects: Project[] = [
  {
    id: "mulligan",
    emoji: "🅿️",
    category: "מערכות מבוזרות",
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
    id: "sugarsteps",
    emoji: "🍰",
    category: "אפליקציית אנדרואיד",
    title: "SugarSteps — לימוד בישול בשלבים",
    summary:
      "אפליקציית אנדרואיד ללימוד בישול לפי רמות קושי, עם שני תפקידי משתמש: תלמידים שצופים בשיעורים ומדריכים שמנהלים אותם.",
    description:
      "SugarSteps היא אפליקציית אנדרואיד ללימוד בישול בשלבים — השיעורים מאורגנים לפי רמות קושי (קל, בינוני, קשה).\n\n" +
      "האפליקציה תומכת בשני תפקידים: תלמידים שיכולים לצפות בשיעורים, ומדריכים שיכולים להוסיף, לערוך ולמחוק אותם. בנוסף יש מסך הרשמה עם בחירת תפקיד ואישור תנאים, ומסך הגדרות לעדכון פרטים אישיים.\n\n" +
      "הנתונים נשמרים מקומית עם Room/SQLite, וה-APK זמין להורדה בעמוד ה-Releases בגיטהאב.",
    githubUrl: "https://github.com/sivanlasri/SugarStepsApp",
    tech: ["Android", "Java", "Room / SQLite", "Android Studio"],
  },
  {
    id: "plastic-factory",
    emoji: "🏭",
    category: "מערכת ניהול",
    title: "מערכת ניהול מפעל יריעות פלסטיק",
    summary:
      "מערכת בקרה למפעל יריעות פלסטיק ב-Java: ייבוא נתוני ייצור מ-CSV ל-MySQL, ממשק Swing, שש שאילתות אנליטיות ועיבוד מקבילי.",
    description:
      "מערכת בקרה למפעל המייצר יריעות פלסטיק לחממות. המערכת קוראת נתוני ייצור מקובץ CSV, מייבאת אותם למסד נתונים MySQL דרך JDBC, ומציגה ממשק גרפי בנוי ב-Java Swing.\n\n" +
      "המערכת כוללת שש שאילתות SQL אנליטיות לניתוח פעילות המפעל — סך ייצור לפי מכונה, שיעור פגמים ממוצע, סיכומי ייצור יומיים ועוד — והשאילתה השישית רצה במקביל עם Threads לשיפור ביצועים.\n\n" +
      "הפרויקט פותח יחד עם אלינור סרור במסגרת קורס מבוא לתכנות מערכות.",
    githubUrl:
      "https://github.com/sivanlasri/Plastic-Sheet-Factory-Management-System",
    tech: ["Java", "MySQL", "JDBC", "Swing", "Multithreading"],
  },
  {
    id: "moveit",
    emoji: "💪",
    category: "אתר ווב",
    title: "Moveit — המאמן האישי שלך",
    summary:
      "אתר כושר אינטראקטיבי: שאלון העדפות אישי, הרשמה רב-שלבית ומסד נתונים ששומר את הפרופיל לקראת תוכניות אימון מותאמות אישית.",
    description:
      "Moveit הוא אתר כושר שנועד ללוות משתמשים במסע הכושר האישי שלהם, ופותח במסגרת קורס פיתוח יישומי ווב.\n\n" +
      "האתר כולל שאלון העדפות אישי (רמת כושר, מטרות, ימים פנויים ומשך אימון מועדף), תהליך הרשמה רב-שלבי עם הצהרת בריאות, מסכי התחברות ובית עם ניווט נוח, וממשק אינטראקטיבי עם אינדיקטורים של התקדמות.\n\n" +
      "הנתונים וההעדפות נשמרים בטבלאות SQL ייעודיות — תשתית להמלצות אימון מותאמות אישית בהמשך. פותח יחד עם שלו תורג'מן ודוד רן כהן.",
    githubUrl:
      "https://github.com/sivanlasri/Moveit-Website---Your-Personal-Trainer",
    tech: ["Angular", "JavaScript", "TypeScript", "HTML & CSS", "SQL"],
  },
  {
    id: "budgi",
    emoji: "💰",
    category: "אתר ווב",
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
  "Android",
  "MongoDB",
  "MySQL",
  "RabbitMQ",
  "Docker",
  "React",
  "Angular",
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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 text-center">
          פרויקטים
        </h2>
        <p className="text-gray-500 text-center mb-10">
          מבחר עבודות — ממערכות מבוזרות ועד אפליקציות מובייל וווב
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-purple-100 p-6 flex flex-col transition duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl" aria-hidden="true">
                  {project.emoji}
                </span>
                <span className="text-xs font-semibold text-[#733B73] bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 flex-1">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="bg-purple-100 text-[#733B73] text-xs sm:text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs sm:text-sm text-gray-500 px-1 py-1">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setOpenProject(project)}
                  className="flex-1 px-4 py-2 rounded-md bg-[#733B73] text-white text-sm sm:text-base font-semibold hover:bg-[#5d2f5d] transition shadow-md"
                >
                  פרטים נוספים
                </button>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-md bg-gray-800 text-white text-sm sm:text-base font-semibold hover:bg-black transition shadow-md text-center"
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
          <div className="text-gray-700 leading-relaxed mb-6 space-y-3">
            <p>
              נעים להכיר! אני סיון, מהנדסת תוכנה צעירה מהמכללה האקדמית כנרת.
              במהלך התואר בניתי מערכות מהתשתית ועד לממשק — ממערכת חניה מבוזרת
              ועמידה לתקלות ב-Java, דרך אפליקציות אנדרואיד ועד אתרי ווב
              מודרניים ב-React וב-Angular.
            </p>
            <p>
              בפרויקט הגמר, WaterVision VR, שימשתי כ-Scrum Master של צוות בן
              חמישה חברים — ניהלתי ספרינטים, תיאמתי בין אנשי הצוות ודאגתי
              שהמוצר יגיע להצגה מוכן ובזמן. אני נמשכת לבעיות של אמינות,
              קונצנזוס ואבטחה, ואוהבת ללמוד טכנולוגיות חדשות תוך כדי בנייה.
            </p>
          </div>
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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 text-center">
          צרו קשר
        </h2>
        <p className="text-gray-500 text-center mb-8">
          מוזמנים לפנות אליי בכל שאלה או הצעה
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:sivanlasri4@gmail.com"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#733B73] text-white font-semibold shadow-md hover:bg-[#5d2f5d] transition text-center"
          >
            ✉️ sivanlasri4@gmail.com
          </a>
          <a
            href="https://github.com/sivanlasri"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow-md hover:bg-black transition text-center"
          >
            GitHub — sivanlasri
          </a>
          <a
            href="https://github.com/SivanSoftware"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gray-800 text-white font-semibold shadow-md hover:bg-black transition text-center"
          >
            GitHub — SivanSoftware
          </a>
        </div>
      </section>

      <footer className="border-t border-purple-200 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} סיון לסרי · נבנה עם Next.js ו-Tailwind CSS
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
