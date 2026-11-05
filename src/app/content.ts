// All site text and data lives here, so updating the portfolio
// (new project, new job, new skill) never requires touching the layout code.

export type Lang = "en" | "pt";

// Files in public/ with the site's prefix (/porfolio on GitHub Pages, none locally): next/image,
// <video> and plain links don't add it themselves. See next.config.ts.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const links = {
  email: "silvaflavio820@gmail.com",
  github: "https://github.com/FuzzyLaDuzzy",
  githubUsername: "FuzzyLaDuzzy",
  linkedin: "https://www.linkedin.com/in/flávio-alex-silva/",
  cv: asset("/cv.pdf"),
  jobradar: "https://github.com/FuzzyLaDuzzy/jobradar",
  jobradarInstall: "https://github.com/FuzzyLaDuzzy/jobradar/releases/latest",
};

export const text = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      education: "Education",
      contacts: "Contact",
    },
    switchLang: "PT",
    switchLangLabel: "Mudar para Português",
    menu: "Open menu",
    closeMenu: "Close menu",
    name: "Flávio Silva",
    titles: ["Software Engineer", "Web Developer", "Designer"],
    tagline:
      "Master's student in Software Engineering at the University of Minho.",
    openToWork: "Open to junior roles · Braga",
    downloadResume: "Download CV",
    contactMe: "Get in touch",
    aboutTitle: "About Me",
    aboutMe: [
      "I'm a Master's student in Software Engineering at the University of Minho in Braga, Portugal, finishing my thesis on a framework in which LLMs propose data quality checks that are validated before they are used.",
      "Lately I built JobRadar, an open-source job finder for Portugal that runs on Windows, macOS, Linux and Android. I enjoy working across the stack — from C to Python, Vue.js, React Native and Node.js — and shipping what I build, with CI, installers, Docker and Kubernetes.",
      "I'm looking for a junior role or a professional internship in the Braga area.",
    ],
    skillsTitle: "Skills",
    skillGroups: {
      languages: "Languages",
      frameworks: "Frameworks & Libraries",
      tools: "Databases & Tools",
    },
    projectsTitle: "Projects",
    seeCode: "See code",
    install: "Install",
    inProgress: "In progress",
    enlarge: "Enlarge",
    stats: { sites: "job sites", tests: "automated tests", platforms: "platforms", seconds: "seconds per search" },
    educationTitle: "Education",
    bachelors: "Bachelor's Degree in Software Engineering",
    masters: "Master's Degree in Software Engineering",
    present: "Present",
    contactsTitle: "Contact",
    contactIntro:
      "The best way to reach me is by email — I usually reply within a day.",
    copy: "Copy",
    copied: "Copied!",
    rights: "All rights reserved.",
    backToTop: "Back to top",
    projects: {
      jobradar: {
        title: "JobRadar · Job Finder for Portugal",
        desc: [
          "Finds junior jobs and internships on 30+ job boards and company careers sites at once, keeps the ones that fit your area and level, and scores each one against your profile.",
          "Optional AI (Gemini or Claude) explains each score, drafts the application message, tailors the CV and writes follow-up emails; applications are tracked through interview, offer or rejection.",
          "Python, FastAPI and SQLite with a Vue 3 interface. Ships as a Windows installer, one-line installers for macOS and Linux, and an Android app that runs the same Python code on the phone — every release is installed and tested on an emulator and on Windows by GitHub Actions.",
        ],
      },
      thesis: {
        title: "LLM Framework for Data Quality · MSc Thesis",
        desc: [
          "Python framework in which a large language model (Gemini, or local models through Ollama) proposes data quality checks from the context of each table.",
          "Deterministic validators test every proposal against the schema and the real data before it becomes SQL, and a human expert decides what is kept.",
          "Evaluated on a real data pipeline, against the tests written by its data engineers.",
        ],
      },
      f3m: {
        title: "F3M · Medication Care App",
        desc: [
          "Mobile app built for a university course project to help patients with mild to moderate dementia manage their medication.",
          "Includes a caregiver support system so family members can track and help with medication schedules.",
          "React Native (Expo) frontend, Node.js/Express/TypeScript backend and a PostgreSQL database managed with Prisma.",
        ],
      },
      picturas: {
        title: "PictuRAS · Image Editor",
        desc: [
          "Scalable web application to manage, edit and showcase images, with tools and filters applied directly in the browser.",
          "Frontend, backend API and integrated email management with Mailhog.",
          "Deployed on Kubernetes, using Minikube and Helm for orchestration and package management.",
        ],
      },
      li3: {
        title: "Data Reader & Organizer",
        desc: [
          "Program that stores and organizes large datasets and runs a list of user-provided queries from a file.",
          "Data is stored and indexed with hash tables and structs for fast lookups.",
          "Includes an interface that displays the results of each query.",
        ],
      },
      so: {
        title: "Client/Server Task System",
        desc: [
          "Client/server system built with pipes and forks that receives requests from multiple clients.",
          "Runs one or more programs concurrently and reports whether each is scheduled or completed.",
          'Uses my own implementation of "mysystem", written from scratch with fork and exec.',
        ],
      },
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      skills: "Competências",
      projects: "Projetos",
      education: "Educação",
      contacts: "Contacto",
    },
    switchLang: "EN",
    switchLangLabel: "Switch to English",
    menu: "Abrir menu",
    closeMenu: "Fechar menu",
    name: "Flávio Silva",
    titles: ["Engenheiro de Software", "Desenvolvedor Web", "Designer"],
    tagline:
      "Estudante de Mestrado em Engenharia Informática na Universidade do Minho.",
    openToWork: "Disponível para vagas júnior · Braga",
    downloadResume: "Descarregar CV",
    contactMe: "Entrar em contacto",
    aboutTitle: "Sobre Mim",
    aboutMe: [
      "Sou estudante de Mestrado em Engenharia Informática na Universidade do Minho, em Braga, e estou a terminar a minha tese sobre uma framework em que LLMs propõem verificações de qualidade de dados que são validadas antes de serem usadas.",
      "Recentemente criei o JobRadar, um buscador de vagas open source para Portugal que corre em Windows, macOS, Linux e Android. Gosto de trabalhar em todas as camadas — de C a Python, Vue.js, React Native e Node.js — e de pôr o que faço nas mãos de quem o usa, com CI, instaladores, Docker e Kubernetes.",
      "Procuro uma vaga júnior ou um estágio profissional na zona de Braga.",
    ],
    skillsTitle: "Competências",
    skillGroups: {
      languages: "Linguagens",
      frameworks: "Frameworks e Bibliotecas",
      tools: "Bases de Dados e Ferramentas",
    },
    projectsTitle: "Projetos",
    seeCode: "Ver código",
    install: "Instalar",
    inProgress: "Em curso",
    enlarge: "Ampliar",
    stats: { sites: "sites de emprego", tests: "testes automáticos", platforms: "plataformas", seconds: "segundos por pesquisa" },
    educationTitle: "Educação",
    bachelors: "Licenciatura em Engenharia Informática",
    masters: "Mestrado em Engenharia Informática",
    present: "Presente",
    contactsTitle: "Contacto",
    contactIntro:
      "A melhor forma de me contactar é por email — normalmente respondo em menos de um dia.",
    copy: "Copiar",
    copied: "Copiado!",
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
    projects: {
      jobradar: {
        title: "JobRadar · Buscador de Vagas para Portugal",
        desc: [
          "Procura vagas júnior e estágios em mais de 30 sites de emprego e páginas de carreiras ao mesmo tempo, guarda as que encaixam na tua zona e no teu nível e dá a cada uma uma pontuação face ao teu perfil.",
          "Com IA opcional (Gemini ou Claude), explica cada pontuação, escreve a mensagem de candidatura, ajusta o CV e redige emails de seguimento; acompanha as candidaturas até à entrevista, oferta ou rejeição.",
          "Python, FastAPI e SQLite com interface em Vue 3. Tem instalador para Windows, instaladores de uma linha para macOS e Linux e uma app Android que corre o mesmo código Python no telemóvel — cada versão é instalada e testada num emulador e em Windows pelo GitHub Actions.",
        ],
      },
      thesis: {
        title: "Framework de LLMs para Qualidade de Dados · Tese de Mestrado",
        desc: [
          "Framework em Python em que um modelo de linguagem (Gemini, ou modelos locais através do Ollama) propõe verificações de qualidade de dados a partir do contexto de cada tabela.",
          "Validadores determinísticos testam cada proposta contra o esquema e os dados reais antes de se tornar SQL, e um especialista humano decide o que fica.",
          "Avaliada num pipeline de dados real, face aos testes escritos pelos seus engenheiros de dados.",
        ],
      },
      f3m: {
        title: "F3M · App de Gestão de Medicação",
        desc: [
          "Aplicação móvel desenvolvida num projeto universitário para ajudar pacientes com demência leve a moderada a gerir a sua medicação.",
          "Inclui um sistema de apoio a cuidadores, permitindo que familiares acompanhem e ajudem na gestão dos horários de medicação.",
          "Frontend em React Native (Expo), backend em Node.js/Express/TypeScript e base de dados PostgreSQL gerida com Prisma.",
        ],
      },
      picturas: {
        title: "PictuRAS · Editor de Imagens",
        desc: [
          "Aplicação web escalável para gerir, editar e exibir imagens, com ferramentas e filtros aplicados diretamente no browser.",
          "Frontend, API de backend e gestão de email integrada com Mailhog.",
          "Deploy em Kubernetes, usando Minikube e Helm para orquestração e gestão de pacotes.",
        ],
      },
      li3: {
        title: "Leitor e Organizador de Dados",
        desc: [
          "Programa que armazena e organiza grandes volumes de dados e executa uma lista de consultas fornecidas num ficheiro.",
          "Os dados são guardados e indexados com tabelas de hash e structs para pesquisas rápidas.",
          "Inclui uma interface que apresenta os resultados de cada consulta.",
        ],
      },
      so: {
        title: "Sistema Cliente/Servidor de Tarefas",
        desc: [
          "Sistema cliente/servidor construído com pipes e forks que recebe pedidos de vários clientes.",
          "Executa um ou mais programas em concorrência e indica se cada um está agendado ou concluído.",
          'Usa a minha própria implementação do "mysystem", escrita de raiz com fork e exec.',
        ],
      },
    },
  },
} as const;

// mono: white logo that gets inverted when the pill turns white on hover
export type Skill = { name: string; icon?: string; mono?: boolean; link: string };

export const skills: Record<"languages" | "frameworks" | "tools", Skill[]> = {
  languages: [
    { name: "C", icon: "/C.png", link: "https://en.wikipedia.org/wiki/C_(programming_language)" },
    { name: "Python", icon: "/python.png", link: "https://www.python.org/" },
    { name: "JavaScript", icon: "/javascript.png", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", icon: "/icons/typescript.svg", link: "https://www.typescriptlang.org/" },
    { name: "Haskell", icon: "/haskell.png", link: "https://www.haskell.org/" },
    { name: "SQL", icon: "/sql.svg", link: "https://en.wikipedia.org/wiki/SQL" },
  ],
  frameworks: [
    { name: "Vue.js", icon: "/vue.png", link: "https://vuejs.org/" },
    { name: "React Native", icon: "/icons/react.svg", link: "https://reactnative.dev/" },
    { name: "Node.js", icon: "/icons/nodejs.svg", link: "https://nodejs.org/" },
    { name: "Express", icon: "/icons/express.svg", mono: true, link: "https://expressjs.com/" },
    { name: "FastAPI", link: "https://fastapi.tiangolo.com/" },
  ],
  tools: [
    { name: "PostgreSQL", icon: "/icons/postgresql.svg", link: "https://www.postgresql.org/" },
    { name: "Prisma", icon: "/icons/prisma.svg", mono: true, link: "https://www.prisma.io/" },
    { name: "Kubernetes", icon: "/icons/kubernetes.svg", link: "https://kubernetes.io/" },
    { name: "Helm", icon: "/icons/helm.svg", mono: true, link: "https://helm.sh/" },
    { name: "Git", icon: "/icons/git.svg", link: "https://git-scm.com/" },
    { name: "SQLite", link: "https://www.sqlite.org/" },
    { name: "Docker", link: "https://www.docker.com/" },
    { name: "GitHub Actions", link: "https://github.com/features/actions" },
    { name: "Gemini & Claude APIs", link: "https://ai.google.dev/" },
  ],
};

export type Project = {
  key: keyof (typeof text)["en"]["projects"];
  tags: readonly string[];
  github?: string;
  install?: string; // where to download it
  // a demo, played while it's on screen; a project with one spans the whole row, the video beside the text
  video?: { src: string; poster: string; shape: "square" | "wide" | "phone" };
  stats?: readonly { value: number; suffix?: string; label: keyof (typeof text)["en"]["stats"] }[];
  inProgress?: boolean;
};

// Newest first — recruiters read top to bottom; the ones with a demo first, the thesis (still in progress) after them.
export const projects: readonly Project[] = [
  {
    key: "jobradar",
    tags: ["Python", "FastAPI", "Vue.js", "SQLite", "Android", "GitHub Actions"],
    github: links.jobradar,
    install: links.jobradarInstall,
    video: { src: "/projects/jobradar.mp4", poster: "/projects/jobradar-poster.jpg", shape: "square" },
    stats: [
      { value: 30, suffix: "+", label: "sites" },
      { value: 221, label: "tests" },
      { value: 4, label: "platforms" },
      { value: 19, label: "seconds" },
    ],
  },
  {
    key: "f3m",
    tags: ["React Native", "Node.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/MartimRedondo/F3M_APP",
    video: { src: "/projects/f3m.mp4", poster: "/projects/f3m-poster.jpg", shape: "phone" },
  },
  {
    key: "picturas",
    tags: ["Vue.js", "Kubernetes", "Helm"],
    github: "https://github.com/JoaoCoelho2003/PictuRas",
    video: { src: "/projects/picturas.mp4", poster: "/projects/picturas-poster.jpg", shape: "wide" },
  },
  {
    key: "thesis",
    tags: ["Python", "LLMs", "SQL", "ClickHouse"],
    inProgress: true,
  },
  {
    key: "li3",
    tags: ["C", "Data Structures"],
    github: "https://github.com/josevasconcelos2002/LI3-project",
  },
  {
    key: "so",
    tags: ["C", "Operating Systems"],
    github: "https://github.com/FuzzyLaDuzzy/SOTP-2024",
  },
];

export const education = [
  { key: "masters", from: "2024", to: null },
  { key: "bachelors", from: "2020", to: "2024" },
] as const;
