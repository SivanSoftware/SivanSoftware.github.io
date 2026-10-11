import type { IconName } from "./components/ProjectIcon";

export type Lang = "he" | "en";

export type Project = {
  id: string;
  icon: IconName;
  category: string;
  title: string;
  summary: string;
  description: string;
  githubUrl?: string;
  tech: string[];
  /** תמונת תצוגה אופציונלית מתוך /public (למשל "/projects/mulligan.png").
   *  אם ריק — מוצג placeholder מעוצב עם שם הקובץ המומלץ. */
  image?: string;
};

export type ExperienceKind = "work" | "service";

export type Experience = {
  id: string;
  kind: ExperienceKind;
  role: string;
  org: string;
  period: string;
  location?: string;
  points: string[];
  tech?: string[];
  /** לוגו ארגון אופציונלי מתוך /public (למשל "/logos/magshimim.png"). */
  logo?: string;
};

export type Stat = { value: string; label: string };

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    name: string;
    projects: string;
    experience: string;
    about: string;
    contact: string;
  };
  langToggle: { label: string; aria: string };
  themeToggle: { toDark: string; toLight: string };
  menu: { open: string; close: string };
  hero: {
    greeting: string;
    name: string;
    role: string;
    bio: string;
    ctaProjects: string;
    ctaContact: string;
    ctaCv: string;
    photoAlt: string;
    logoAlt: string;
  };
  stats: Stat[];
  projects: { heading: string; subheading: string; details: string; github: string };
  experience: { heading: string; subheading: string; techLabel: string };
  about: { heading: string; intro: string };
  contact: { heading: string; subheading: string; linkedin: string };
  modal: { github: string; close: string; closeAria: string };
  footer: string;
  eyebrows: { projects: string; experience: string; about: string; contact: string };
  skillGroups: { label: string; items: string[] }[];
  projectList: Project[];
  experienceList: Experience[];
};

const he: Dictionary = {
  meta: {
    title: "סיון לסרי | פורטפוליו",
    description:
      "הפורטפוליו של סיון לסרי — מפתחת תוכנה. פרויקטים במערכות מבוזרות, Java, React ועוד.",
  },
  nav: {
    name: "סיון לסרי",
    projects: "פרויקטים",
    experience: "ניסיון",
    about: "כישורים ורקע",
    contact: "צרו קשר",
  },
  langToggle: { label: "EN", aria: "Switch to English" },
  themeToggle: { toDark: "מעבר למצב כהה", toLight: "מעבר למצב בהיר" },
  menu: { open: "פתיחת תפריט", close: "סגירת תפריט" },
  hero: {
    greeting: "היי, אני",
    name: "סיון לסרי",
    role: "מפתחת ג'וניור · בוגרת הנדסת תוכנה במכללה האקדמית כנרת",
    bio:
      "במהלך התואר בניתי מערכות מהתשתית ועד לממשק — ממערכת חניה מבוזרת ועמידה לתקלות ב-Java, דרך אפליקציות אנדרואיד ועד אתרי ווב מודרניים ב-React וב-Angular. בפרויקט הגמר פיתחנו את WaterVision VR — אפליקציה למשקפי Meta Quest שמשמשת פלטפורמה לפגישות ושיתוף פעולה בנושא תשתיות מים. שימשתי בו גם כמפתחת וגם כ-Scrum Master של צוות בן חמישה חברים. נמשכת לבעיות של אמינות, קונצנזוס ואבטחה, ואוהבת ללמוד טכנולוגיות חדשות תוך כדי בנייה.",
    ctaProjects: "לפרויקטים שלי",
    ctaContact: "דברו איתי",
    ctaCv: "הורדת קורות חיים",
    photoAlt: "סיון לסרי",
    logoAlt: "הלוגו של סיון לסרי",
  },
  stats: [
    { value: "93", label: "ממוצע בתואר" },
    { value: "2025", label: "רשימת הנשיא למצטיינים" },
    { value: "6+", label: "פרויקטים" },
    { value: "30+", label: "טכנולוגיות וכלים" },
  ],
  projects: {
    heading: "פרויקטים",
    subheading: "מבחר עבודות — ממערכות מבוזרות ועד אפליקציות מובייל וווב",
    details: "פרטים נוספים",
    github: "GitHub",
  },
  experience: {
    heading: "ניסיון",
    subheading: "תפקידים, הדרכה וצוות — מעבר לקוד עצמו",
    techLabel: "טכנולוגיות",
  },
  about: {
    heading: "כישורים ורקע",
    intro: "הטכנולוגיות והכלים שאני עובדת איתם — מתוך הפרויקטים עצמם:",
  },
  contact: {
    heading: "צרו קשר",
    subheading: "מוזמנים לפנות אליי בכל שאלה או הצעה",
    linkedin: "LinkedIn",
  },
  modal: {
    github: "מעבר לקוד ב-GitHub",
    close: "סגירה",
    closeAria: "סגירה",
  },
  footer: "סיון לסרי · נבנה עם Next.js ו-Tailwind CSS",
  eyebrows: {
    projects: "// projects",
    experience: "// experience",
    about: "// skills",
    contact: "// contact",
  },
  skillGroups: [
    {
      label: "שפות",
      items: ["Java", "TypeScript", "JavaScript", "C#", "SQL", "HTML & CSS"],
    },
    {
      label: "מערכות מבוזרות ו-Backend",
      items: [
        "מערכות מבוזרות",
        "RabbitMQ (AMQP)",
        "Apache Ratis (Raft)",
        "gRPC",
        "ריבוי תהליכונים",
        "JDBC",
        "TLS & HMAC",
      ],
    },
    {
      label: "מסדי נתונים",
      items: ["MongoDB", "MySQL", "SQLite / Room", "Firebase"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "Angular", "Tailwind CSS", "Vite"],
    },
    {
      label: "מובייל, שולחן עבודה ו-XR",
      items: ["Android", "Unity", "Meta Quest (XR)", "JavaFX", "Swing"],
    },
    {
      label: "DevOps וכלים",
      items: [
        "Docker & Compose",
        "GitHub Actions (CI/CD)",
        "Gradle",
        "Git",
        "Linux & Shell",
      ],
    },
    {
      label: "בדיקות ומתודולוגיה",
      items: ["JUnit 5", "Mockito", "Scrum & Agile", "ClickUp"],
    },
  ],
  projectList: [
    {
      id: "watervision",
      icon: "vr",
      category: "מציאות מדומה · פרויקט גמר",
      title: "WaterVision VR — פלטפורמת פגישות VR",
      summary:
        "פלטפורמת מציאות מדומה לפגישות מקצועיות בתעשיית המים, ב-Unity ל-Meta Quest: חדר ישיבות משותף עם avatars מסונכרנים, תמלול דיבור בזמן אמת, מודלים תלת-ממדיים וסימולציה חיה. פרויקט הגמר שלי — כמפתחת וכ-Scrum Master.",
      description:
        "WaterVision VR הוא פרויקט הגמר שלי (2026) — פלטפורמת VR/AR לפגישות מקצועיות בתחום תשתיות המים, שפותחה ב-Unity 6 (C#) למשקפי Meta Quest. שימשתי בו גם כמפתחת וגם כ-Scrum Master של צוות בן חמישה חברים, בעבודה בשיטת Agile.\n\n" +
        "הפלטפורמה כוללת חדר ישיבות משותף עם avatars מסונכרנים, מעקב ידיים ותקשורת קולית; תמלול דיבור לטקסט בזמן אמת עם ייצוא ל-PDF; חדר מודלים תלת-ממדי לקבצי GLB/FBX עם סימולציה חיה של טיהור שפכים; וניתוח השתתפות (זמן דיבור לכל משתתף).\n\n" +
        "בנוסף: זיהוי שפת סימנים ומחוות ידיים, לוח שיתופי, ומעבר בין VR מלא ל-passthrough (מציאות מעורבת) על ה-Quest. המערכת נוסתה בשטח במתקן טיהור השפכים בבית שאן.",
      githubUrl: "https://github.com/SivanSoftware/WaterVision_VR",
      tech: [
        "Unity 6",
        "C#",
        "Meta Quest (XR)",
        "URP",
        "Multiplayer",
        "Speech-to-Text",
        "Agile / Scrum",
      ],
    },
    {
      id: "mulligan",
      icon: "network",
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
      icon: "mobile",
      category: "אפליקציית אנדרואיד",
      title: "SugarSteps — לימוד בישול בשלבים",
      summary:
        "אפליקציית אנדרואיד ללימוד בישול לפי רמות קושי, עם שני תפקידי משתמש: תלמידים שצופים בשיעורים ומדריכים שמנהלים אותם.",
      description:
        "SugarSteps היא אפליקציית אנדרואיד ללימוד בישול בשלבים — השיעורים מאורגנים לפי רמות קושי (קל, בינוני, קשה).\n\n" +
        "האפליקציה תומכת בשני תפקידים: תלמידים שיכולים לצפות בשיעורים, ומדריכים שיכולים להוסיף, לערוך ולמחוק אותם. בנוסף יש מסך הרשמה עם בחירת תפקיד ואישור תנאים, ומסך הגדרות לעדכון פרטים אישיים.\n\n" +
        "הנתונים נשמרים מקומית עם Room/SQLite, וה-APK זמין להורדה בעמוד ה-Releases בגיטהאב.",
      githubUrl: "https://github.com/SivanSoftware/SugarStepsApp",
      tech: ["Android", "Java", "Room / SQLite", "Android Studio"],
    },
    {
      id: "plastic-factory",
      icon: "factory",
      category: "מערכת ניהול",
      title: "מערכת ניהול מפעל יריעות פלסטיק",
      summary:
        "מערכת בקרה למפעל יריעות פלסטיק ב-Java: ייבוא נתוני ייצור מ-CSV ל-MySQL, ממשק Swing, שש שאילתות אנליטיות ועיבוד מקבילי.",
      description:
        "מערכת בקרה למפעל המייצר יריעות פלסטיק לחממות. המערכת קוראת נתוני ייצור מקובץ CSV, מייבאת אותם למסד נתונים MySQL דרך JDBC, ומציגה ממשק גרפי בנוי ב-Java Swing.\n\n" +
        "המערכת כוללת שש שאילתות SQL אנליטיות לניתוח פעילות המפעל — סך ייצור לפי מכונה, שיעור פגמים ממוצע, סיכומי ייצור יומיים ועוד — והשאילתה השישית רצה במקביל עם Threads לשיפור ביצועים.\n\n" +
        "הפרויקט פותח יחד עם אלינור סרור במסגרת קורס מבוא לתכנות מערכות.",
      githubUrl:
        "https://github.com/SivanSoftware/Plastic-Sheet-Factory-Management-System",
      tech: ["Java", "MySQL", "JDBC", "Swing", "Multithreading"],
    },
    {
      id: "moveit",
      icon: "pulse",
      category: "אתר ווב",
      title: "Moveit — המאמן האישי שלך",
      summary:
        "אתר כושר אינטראקטיבי: שאלון העדפות אישי, הרשמה רב-שלבית ומסד נתונים ששומר את הפרופיל לקראת תוכניות אימון מותאמות אישית.",
      description:
        "Moveit הוא אתר כושר שנועד ללוות משתמשים במסע הכושר האישי שלהם, ופותח במסגרת קורס פיתוח יישומי ווב.\n\n" +
        "האתר כולל שאלון העדפות אישי (רמת כושר, מטרות, ימים פנויים ומשך אימון מועדף), תהליך הרשמה רב-שלבי עם הצהרת בריאות, מסכי התחברות ובית עם ניווט נוח, וממשק אינטראקטיבי עם אינדיקטורים של התקדמות.\n\n" +
        "הנתונים וההעדפות נשמרים בטבלאות SQL ייעודיות — תשתית להמלצות אימון מותאמות אישית בהמשך. פותח יחד עם שלו תורג'מן ודוד רן כהן.",
      githubUrl:
        "https://github.com/SivanSoftware/Moveit-Website---Your-Personal-Trainer",
      tech: ["Angular", "JavaScript", "TypeScript", "HTML & CSS", "SQL"],
    },
    {
      id: "budgi",
      icon: "wallet",
      category: "אתר ווב",
      title: "Budgi — ניהול תקציב אישי",
      summary:
        "אפליקציית ווב לניהול תקציב אישי ב-React: מעקב הוצאות, תכנון תקציב חודשי וניהול משתמשים מבוסס Firebase.",
      description:
        "Budgi היא אפליקציית ווב לניהול תקציב אישי שנבנתה ב-React עם Vite. האפליקציה כוללת מעקב אחר הוצאות, תכנון תקציב חודשי, ומערכת משתמשים מלאה (הרשמה, התחברות ושחזור סיסמה) מבוססת Firebase.",
      tech: ["React", "Vite", "Firebase", "React Router", "TypeScript"],
    },
  ],
  experienceList: [
    {
      id: "magshimim",
      kind: "work",
      role: "מדריכת תכנות",
      org: "מגשימים (Pre-Magshimim)",
      period: "2024 – 2026",
      points: [
        "לימוד שפת Processing (מבוססת Java) לתלמידי כיתות ח׳, ו-C# (‏.NET) לתלמידי כיתות ט׳.",
        "הנגשת מושגי יסוד במדעי המחשב באמצעות שיטות למידה אינטראקטיביות.",
        "ליווי התלמידים בפיתוח משחקים אינטראקטיביים — חיזוק מיומנויות קוד וחשיבה לפתרון בעיות.",
      ],
      tech: ["Java (Processing)", "C# / .NET"],
    },
    {
      id: "national-service",
      kind: "service",
      role: "מדריכה בשירות לאומי",
      org: "מוזיאון הרצל · מוזיאון לח״י",
      period: "2018 – 2020",
      points: [
        "הדרכת סיורים בעברית ובאנגלית — דיבור מול קהל והתאמה לקהלים מגוונים.",
        "ניהול לוגיסטיקה ותיאום לתפעול חלק ורציף של הסיורים.",
        "יצירת חוויית מבקרים מעולה מתוך ידע מקיף והגשה מקצועית.",
      ],
    },
  ],
};

const en: Dictionary = {
  meta: {
    title: "Sivan Lasri | Portfolio",
    description:
      "Sivan Lasri's portfolio — software developer. Projects in distributed systems, Java, React and more.",
  },
  nav: {
    name: "Sivan Lasri",
    projects: "Projects",
    experience: "Experience",
    about: "Skills & Background",
    contact: "Contact",
  },
  langToggle: { label: "עב", aria: "מעבר לעברית" },
  themeToggle: { toDark: "Switch to dark mode", toLight: "Switch to light mode" },
  menu: { open: "Open menu", close: "Close menu" },
  hero: {
    greeting: "Hi, I'm",
    name: "Sivan Lasri",
    role: "Junior Developer · Software Engineering graduate, Kinneret Academic College",
    bio:
      "Throughout my degree I built systems from the infrastructure up to the interface — from a fault-tolerant distributed parking system in Java, through Android apps, to modern web apps in React and Angular. For my final project we built WaterVision VR — a Meta Quest application that serves as a platform for meetings and collaboration around water infrastructure. I served on it as both a developer and Scrum Master of a five-person team. I'm drawn to problems of reliability, consensus and security, and I love picking up new technologies while building.",
    ctaProjects: "View my projects",
    ctaContact: "Get in touch",
    ctaCv: "Download CV",
    photoAlt: "Sivan Lasri",
    logoAlt: "Sivan Lasri's logo",
  },
  stats: [
    { value: "93", label: "Degree GPA" },
    { value: "2025", label: "President's List" },
    { value: "6+", label: "Projects" },
    { value: "30+", label: "Technologies & tools" },
  ],
  projects: {
    heading: "Projects",
    subheading:
      "Selected work — from distributed systems to mobile and web applications",
    details: "More details",
    github: "GitHub",
  },
  experience: {
    heading: "Experience",
    subheading: "Roles, instruction and teamwork — beyond the code itself",
    techLabel: "Tech",
  },
  about: {
    heading: "Skills & Background",
    intro: "The technologies and tools I work with — drawn from the projects themselves:",
  },
  contact: {
    heading: "Contact",
    subheading: "Feel free to reach out with any question or offer",
    linkedin: "LinkedIn",
  },
  modal: {
    github: "View the code on GitHub",
    close: "Close",
    closeAria: "Close",
  },
  footer: "Sivan Lasri · Built with Next.js and Tailwind CSS",
  eyebrows: {
    projects: "// projects",
    experience: "// experience",
    about: "// skills",
    contact: "// contact",
  },
  skillGroups: [
    {
      label: "Languages",
      items: ["Java", "TypeScript", "JavaScript", "C#", "SQL", "HTML & CSS"],
    },
    {
      label: "Distributed Systems & Backend",
      items: [
        "Distributed Systems",
        "RabbitMQ (AMQP)",
        "Apache Ratis (Raft)",
        "gRPC",
        "Multithreading",
        "JDBC",
        "TLS & HMAC",
      ],
    },
    {
      label: "Databases",
      items: ["MongoDB", "MySQL", "SQLite / Room", "Firebase"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "Angular", "Tailwind CSS", "Vite"],
    },
    {
      label: "Mobile, Desktop & XR",
      items: ["Android", "Unity", "Meta Quest (XR)", "JavaFX", "Swing"],
    },
    {
      label: "DevOps & Tools",
      items: [
        "Docker & Compose",
        "GitHub Actions (CI/CD)",
        "Gradle",
        "Git",
        "Linux & Shell",
      ],
    },
    {
      label: "Testing & Methodology",
      items: ["JUnit 5", "Mockito", "Scrum & Agile", "ClickUp"],
    },
  ],
  projectList: [
    {
      id: "watervision",
      icon: "vr",
      category: "Virtual Reality · Final Project",
      title: "WaterVision VR — VR Meeting Platform",
      summary:
        "A virtual-reality platform for professional meetings in the water sector, built in Unity for Meta Quest: a shared meeting room with synchronized avatars, real-time speech-to-text, 3D models and a live simulation. My final project — as developer and Scrum Master.",
      description:
        "WaterVision VR is my final graduation project (2026) — a VR/AR platform for professional meetings in the water-infrastructure field, built in Unity 6 (C#) for Meta Quest headsets. I served as both a developer and the Scrum Master of a five-person team, working in an Agile methodology.\n\n" +
        "The platform includes a shared meeting room with synchronized avatars, hand tracking and voice; real-time speech-to-text transcription with PDF export; a 3D model room for GLB/FBX files with a live wastewater-treatment simulation; and participation analytics (speaking time per attendee).\n\n" +
        "It also features sign-language and hand-gesture recognition, a collaborative whiteboard, and switching between full VR and passthrough (mixed reality) on the Quest. The system was field-tested at the Beit She'an wastewater treatment plant.",
      githubUrl: "https://github.com/SivanSoftware/WaterVision_VR",
      tech: [
        "Unity 6",
        "C#",
        "Meta Quest (XR)",
        "URP",
        "Multiplayer",
        "Speech-to-Text",
        "Agile / Scrum",
      ],
    },
    {
      id: "mulligan",
      icon: "network",
      category: "Distributed Systems",
      title: "Mulligan — Distributed Parking System",
      summary:
        "A fault-tolerant distributed parking platform in Java: drivers, enforcement officers and municipality officers on top of MongoDB, RabbitMQ and Raft clusters — hardened end to end.",
      description:
        "Mulligan is a distributed parking system built in Java, serving three roles: drivers (register vehicles, start/stop parking, pay and get a parking recommendation), parking enforcement officers (inspect vehicles and issue citations) and municipality officers (view transaction and citation reports).\n\n" +
        "The system is fault tolerant end to end: a 3-node MongoDB replica set, a 3-node RabbitMQ cluster with quorum queues, and a 3-node recommender cluster combining Raft consensus (Apache Ratis) with majority voting — so the cluster survives both a failed node and a malicious one.\n\n" +
        "On the security side: MongoDB auth with required TLS, fail-closed HMAC message signing, cross-node replay protection, least-privilege RabbitMQ ACLs and persistent security logging. Everything runs with Docker Compose, and each role ships as both a JavaFX GUI and an interactive CLI.",
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
      icon: "mobile",
      category: "Android App",
      title: "SugarSteps — Learn Cooking by Levels",
      summary:
        "An Android app for learning cooking by difficulty level, with two user roles: students who view lessons and instructors who manage them.",
      description:
        "SugarSteps is an Android app for learning cooking step by step — lessons are organized by difficulty level (easy, medium, hard).\n\n" +
        "The app supports two roles: students who can view lessons, and instructors who can add, edit and delete them. It also includes a registration screen with role selection and terms approval, and a settings screen for updating personal details.\n\n" +
        "Data is stored locally with Room/SQLite, and the APK is available for download from the Releases page on GitHub.",
      githubUrl: "https://github.com/SivanSoftware/SugarStepsApp",
      tech: ["Android", "Java", "Room / SQLite", "Android Studio"],
    },
    {
      id: "plastic-factory",
      icon: "factory",
      category: "Management System",
      title: "Plastic Sheet Factory Management System",
      summary:
        "A control system for a plastic sheet factory in Java: imports production data from CSV into MySQL, a Swing interface, six analytical queries and parallel processing.",
      description:
        "A control system for a factory producing plastic sheets for greenhouses. The system reads production data from a CSV file, imports it into a MySQL database via JDBC, and presents a graphical interface built with Java Swing.\n\n" +
        "It includes six analytical SQL queries for analyzing factory operations — total production per machine, average defect rate, daily production summaries and more — and the sixth query runs in parallel using Threads to improve performance.\n\n" +
        "Developed together with Elinor Srur as part of the Introduction to System Programming course.",
      githubUrl:
        "https://github.com/SivanSoftware/Plastic-Sheet-Factory-Management-System",
      tech: ["Java", "MySQL", "JDBC", "Swing", "Multithreading"],
    },
    {
      id: "moveit",
      icon: "pulse",
      category: "Web App",
      title: "Moveit — Your Personal Trainer",
      summary:
        "An interactive fitness website: a personal preferences questionnaire, multi-step registration and a database storing the profile toward personalized training plans.",
      description:
        "Moveit is a fitness website designed to guide users on their personal fitness journey, developed as part of a web application development course.\n\n" +
        "The site includes a personal preferences questionnaire (fitness level, goals, available days and preferred workout duration), a multi-step registration flow with a health declaration, login and home screens with easy navigation, and an interactive interface with progress indicators.\n\n" +
        "User data and preferences are stored in dedicated SQL tables — the foundation for personalized training recommendations down the line. Developed together with Shalev Turgeman and David Ran Cohen.",
      githubUrl:
        "https://github.com/SivanSoftware/Moveit-Website---Your-Personal-Trainer",
      tech: ["Angular", "JavaScript", "TypeScript", "HTML & CSS", "SQL"],
    },
    {
      id: "budgi",
      icon: "wallet",
      category: "Web App",
      title: "Budgi — Personal Budget Management",
      summary:
        "A React web app for managing a personal budget: expense tracking, monthly budget planning and Firebase-based user management.",
      description:
        "Budgi is a web app for managing a personal budget, built with React and Vite. It includes expense tracking, monthly budget planning, and a full user system (registration, login and password recovery) based on Firebase.",
      tech: ["React", "Vite", "Firebase", "React Router", "TypeScript"],
    },
  ],
  experienceList: [
    {
      id: "magshimim",
      kind: "work",
      role: "Programming Instructor",
      org: "Magshimim (Pre-Magshimim)",
      period: "2024 – 2026",
      points: [
        "Taught Processing (Java-based) to 8th-grade students and C# (.NET) to 9th-grade students.",
        "Explained core computer-science concepts through interactive learning methodologies.",
        "Guided students in building interactive game projects — strengthening coding and problem-solving skills.",
      ],
      tech: ["Java (Processing)", "C# / .NET"],
    },
    {
      id: "national-service",
      kind: "service",
      role: "National Service Guide",
      org: "Herzl Museum · Lehi Museum",
      period: "2018 – 2020",
      points: [
        "Led tours in Hebrew and English — public speaking and adapting to diverse audiences.",
        "Managed logistics and coordination for smooth, continuous tour operations.",
        "Delivered an excellent visitor experience through broad knowledge and professional presentation.",
      ],
    },
  ],
};

export const dictionaries: Record<Lang, Dictionary> = { he, en };
