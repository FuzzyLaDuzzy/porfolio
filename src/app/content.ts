// All site text and data lives here, so updating the portfolio
// (new project, new job, new skill) never requires touching the layout code.

export type Lang = "en" | "pt";

export const links = {
  email: "silvaflavio820@gmail.com",
  github: "https://github.com/FuzzyLaDuzzy",
  githubUsername: "FuzzyLaDuzzy",
  linkedin: "https://www.linkedin.com/in/flávio-alex-silva/",
  instagram: "https://www.instagram.com/flavios.silva.dmwm/",
  cv: "/cv.pdf",
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
    downloadResume: "Download CV",
    contactMe: "Get in touch",
    aboutTitle: "About Me",
    aboutMe: [
      "I'm a Master's student in Software Engineering at the University of Minho in Braga, Portugal, currently finishing my thesis on creating an LLM framework for data quality generation.",
      "I enjoy working across the stack — from low-level systems in C to web and mobile apps with Vue.js, React Native and Node.js, and deploying them with Kubernetes.",
    ],
    skillsTitle: "Skills",
    skillGroups: {
      languages: "Languages",
      frameworks: "Frameworks & Libraries",
      tools: "Databases & Tools",
    },
    projectsTitle: "Projects",
    seeCode: "See code",
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
    downloadResume: "Descarregar CV",
    contactMe: "Entrar em contacto",
    aboutTitle: "Sobre Mim",
    aboutMe: [
      "Sou estudante de Mestrado em Engenharia Informática na Universidade do Minho, em Braga, e estou a terminar a minha tese sobre a criação de uma framework de LLMs para geração de qualidade de dados.",
      "Gosto de trabalhar em todas as camadas — desde sistemas de baixo nível em C até aplicações web e móveis com Vue.js, React Native e Node.js, com deploy em Kubernetes.",
    ],
    skillsTitle: "Competências",
    skillGroups: {
      languages: "Linguagens",
      frameworks: "Frameworks e Bibliotecas",
      tools: "Bases de Dados e Ferramentas",
    },
    projectsTitle: "Projetos",
    seeCode: "Ver código",
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
  ],
  tools: [
    { name: "PostgreSQL", icon: "/icons/postgresql.svg", link: "https://www.postgresql.org/" },
    { name: "Prisma", icon: "/icons/prisma.svg", mono: true, link: "https://www.prisma.io/" },
    { name: "Kubernetes", icon: "/icons/kubernetes.svg", link: "https://kubernetes.io/" },
    { name: "Helm", icon: "/icons/helm.svg", mono: true, link: "https://helm.sh/" },
    { name: "Git", icon: "/icons/git.svg", link: "https://git-scm.com/" },
  ],
};

// Newest first — recruiters read top to bottom.
export const projects = [
  {
    key: "f3m",
    tags: ["React Native", "Node.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/MartimRedondo/F3M_APP",
  },
  {
    key: "picturas",
    tags: ["Vue.js", "Kubernetes", "Helm"],
    github: "https://github.com/JoaoCoelho2003/PictuRas",
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
] as const;

export const education = [
  { key: "masters", from: "2024", to: null },
  { key: "bachelors", from: "2020", to: "2024" },
] as const;
