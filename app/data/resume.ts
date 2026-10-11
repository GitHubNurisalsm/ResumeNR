// Всё содержимое резюме живёт здесь — вёрстку трогать не нужно.

export type Job = {
  company: string;
  role: string;
  period: string;
  place: string;
  summary: string;
  wins: string[];
  stack: string[];
  link?: string;
};

export type Project = {
  name: string;
  kind: string;
  about: string;
  stack: string[];
  link?: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Study = {
  place: string;
  degree?: string;
  period?: string;
};

const gh = "https://github.com/GitHubNurisalsm";

export const profile = {
  firstName: "Нурислам",
  lastName: "Абдыкайымов",
  role: "Fullstack-разработчик",
  location: "Бишкек, Кыргызстан",
  status: "Открыт к предложениям",
  email: "nurislam.mac", // TODO: дописать домен почты (@gmail.com / @icloud.com / ...)
  phone: "+996 556 666 313",
  telegram: "@NurislamR",
  github: gh,
  pitch:
    "Делаю сайты на Next.js и Telegram-ботов на Python и Java — от идеи и базы данных до деплоя.",
  about: [
    "Пишу фронтенд на TypeScript, React и Next.js, а backend и ботов — на Python (Django, aiogram) и Java (Spring Boot). Мне нравится доводить проекты до рабочего состояния: с деплоем, миграциями и понятным README.",
    "Участвую в хакатонах, делаю проекты для реальных заказчиков и постоянно пробую новое — от финансовых симуляторов до распознавания музыки.",
  ],
};

export const stats = [
  { value: "23", label: "публичных репозитория на GitHub" },
  { value: "4", label: "языка в работе: TypeScript, Python, Java, JavaScript" },
  { value: "2023", label: "год первого проекта на GitHub" },
];

export const jobs: Job[] = [
  {
    company: "ТРЕЗВЫЙ.KG",
    role: "Разработка сайта",
    period: "2026",
    place: "Бишкек",
    summary: "Сайт круглосуточной службы трезвых водителей с заказом по телефону и WhatsApp.",
    wins: [
      "Собрал отдельные страницы под услугу и под заказ в один клик",
      "Настроил SEO: метаданные, sitemap, robots и canonical-адрес",
      "Задеплоил проект на Vercel",
    ],
    stack: ["Next.js", "TypeScript", "Radix UI", "Vercel"],
    link: "https://trezvyi.vercel.app",
  },
  {
    company: "Career Task Control",
    role: "Внутренний инструмент команды",
    period: "2026",
    place: "Командный проект",
    summary: "Mini-Jira для тимлида и продакт-менеджера команды проекта Career.",
    wins: [
      "Сделал управление задачами команды в одном интерфейсе",
      "Использовал Next.js 16, shadcn и тёмную тему через next-themes",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn"],
    link: "https://task-maneger-silk.vercel.app",
  },
  {
    company: "Хакатон FinTech & AI Challenge",
    role: "FinGuard — AI-финансовый ассистент",
    period: "2026",
    place: "Хакатон",
    summary: "Telegram-бот, который защищает от импульсивных трат и помогает дожить до зарплаты.",
    wins: [
      "Написал бота на Java с нуля, сборка в один jar через Maven",
      "Подключил OpenAI для разбора трат и персональных советов",
    ],
    stack: ["Java", "Maven", "Telegram Bot API", "OpenAI"],
    link: `${gh}/finguard`,
  },
];

export const skills: SkillGroup[] = [
  { title: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn / Radix"] },
  { title: "Python", items: ["Django", "aiogram", "python-telegram-bot", "asyncio"] },
  { title: "Java", items: ["Java 17", "Spring Boot", "Maven"] },
  { title: "Данные", items: ["SQL", "SQLAlchemy", "Alembic", "Django ORM"] },
  { title: "DevOps", items: ["Docker", "Docker Compose", "Git", "Vercel"] },
  { title: "Качество", items: ["pytest", "ruff", "mypy"] },
];

export const projects: Project[] = [
  {
    name: "SongFinder Bot",
    kind: "Telegram-бот",
    about: "Определяет песню по голосовому, видео или «кружку» и отвечает карточкой трека со ссылками на Spotify, Apple Music и YouTube.",
    stack: ["Python", "aiogram", "ShazamIO", "SQLAlchemy", "Docker"],
    link: `${gh}/shazam`,
  },
  {
    name: "FinSim",
    kind: "Fullstack",
    about: "Финансовый симулятор: игровая логика и интерфейс на Next.js, backend на Spring Boot.",
    stack: ["Next.js", "TypeScript", "Spring Boot", "Java"],
    link: `${gh}/finsim`,
  },
  {
    name: "ДоброБот",
    kind: "Telegram-бот",
    about: "Платформа взаимопомощи: заявки, чат между пользователями через бота, рейтинг волонтёров и лидерборд.",
    stack: ["Python", "python-telegram-bot"],
    link: `${gh}/tgbot`,
  },
  {
    name: "Traveler's Diary",
    kind: "Web-приложение",
    about: "Дневник путешествий: записи о поездках, воспоминания и маршруты в одном месте.",
    stack: ["Next.js", "TypeScript", "Radix UI"],
    link: `${gh}/api`,
  },
  {
    name: "Blog",
    kind: "Backend",
    about: "Блог на Django с постами, категориями и админкой.",
    stack: ["Python", "Django"],
    link: `${gh}/blog`,
  },
  {
    name: "Это резюме",
    kind: "Pet-проект",
    about: "Интерактивное резюме с 3D-сферой на чистом canvas и кубом навыков на CSS 3D — без сторонних 3D-библиотек.",
    stack: ["Next.js", "TypeScript", "Canvas", "CSS 3D"],
  },
];

export const education: Study[] = [
  { place: "Институт INAI" },
  { place: "Колледж КНУ" },
  { place: "Школа № 4" },
];

// TODO: добавить языки, например { name: "Кыргызский", level: "Родной" }
export const languages: { name: string; level: string }[] = [];
