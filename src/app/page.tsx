"use client";

import Image from "next/image";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const primaryButtonClass =
  "bg-black/80 text-white border border-white/30 rounded-full backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-black";

const cardClass =
  "border border-white/10 p-5 rounded-xl bg-black/70 backdrop-blur-sm text-white shadow-lg transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-black/40";

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center mb-6">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="h-0.5 bg-white/70 mt-2 rounded-full"
      />
    </div>
  );
}

export default function Home() {
  const [isPortuguese, setIsPortuguese] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const titles = ["Web Developer", "Designer", "Software Engineer"];

  useEffect(() => {
    let charIndex = 0;
    const currentTitle = titles[currentTitleIndex];
    const interval = setInterval(() => {
      setDisplayedTitle((prev) => currentTitle.slice(0, charIndex + 1));
      charIndex++;
      if (charIndex === currentTitle.length) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 6000); // Pause for 6 seconds before starting the next title
      }
    }, 100); // Change each letter every 100ms
    return () => clearInterval(interval);
  }, [currentTitleIndex]);

  const toggleLanguage = () => {
    setIsPortuguese(!isPortuguese);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const nameVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const textContent = {
    en: {
      name: "Flávio Silva",
      title: "Web Developer | Designer | Software Engineer",
      aboutMe:
        "I am a first year Master's Degree student in Software Engineering at the University of Minho located in Braga, Portugal. I will be using this site to update my Projects and Experience status over time.",
      experience: "Experience",
      experienceNone:
        "Sadly, its the start of my career. We all got to start somewhere.",
      skills: "Skills",
      projects: "Projects",
      project1Title: "Server Client System | C",
      project1Desc1: "A Server/Client System designed using Pipes/Forks.",
      project1Desc2:
        "The System is designed to receive multiple Clients requests such as executing one or more Programs Concurrently or a status check to see if they are Scheduled or Completed.",
      project1Desc3:
        'This Server also uses a version of the command "mysystem" integrated into the C Library create by me from scratch using forks and execs.',
      project2Title: "Data Reader and Organizer | C",
      project2Desc1:
        "Program to store data, organize it and run a list of queries given by the user in a file.",
      project2Desc2:
        "The Storing and organization of the data is make with the use of HashTables and Structs.",
      project2Desc3:
        "Includes an interface that displays the info about each query given.",
      project3Title: "PictuRAS | Vue.js",
      project3Desc1: "A scalable web application designed to manage, edit, and showcase images effectively.",
      project3Desc2: "Includes a frontend for user interaction, an API for backend services, and integrated email management with Mailhog.",
      project3Desc3: "Users can apply various tools and filters to edit images directly within the application. The project is deployed using Kubernetes, leveraging tools like Minikube and Helm for orchestration and package management.",
      project4Title: "F3M | Medication Care App",
      project4Desc1: "A mobile app built for a university course project to help patients with mild to moderate dementia manage their medication.",
      project4Desc2: "Includes a caregiver support system so family members or caregivers can track and help with medication schedules.",
      project4Desc3: "Built with a React Native (Expo) frontend, a Node.js/Express/TypeScript backend, and a PostgreSQL database managed with Prisma.",
      githubRepo: "See Code",
      education: "Education",
      bachelors: "[Bachelor's Degree in Software Engineering] - [University of Minho]",
      masters: "[Master's Degree in Software Engineering] - [University of Minho]",
      copyright: "© 2025 Flávio Silva. All rights reserved.",
      discordName: "fuzzymind",
      contacts: "Contacts",
      email: "Email",
      emailAddress: "silvaflavio820@gmail.com",
      discord: "Discord",
      discordusername: "fuzzymind",
      downloadResume: "Download Resume",
      githubLink: "https://github.com/FuzzyLaDuzzy",
      githubUsername: "FuzzyLaDuzzy",
      linkedinLink: "https://www.linkedin.com/in/flávio-alex-silva/",
      linkedinUsername: "Flávio Silva",
      instagramLink: "https://www.instagram.com/flavios.silva.dmwm/",
      instagramUsername: "flavios.silva.dmwm",
    },
    pt: {
      name: "Flávio Silva",
      title: "Desenvolvedor Web | Designer | Engenheiro de Software",
      aboutMe:
        "Sou um estudante do primeiro ano do Mestrado em Engenharia de Software na Universidade do Minho, localizada em Braga, Portugal. Irei usar este site para atualizar o estado dos meus Projetos e Experiência ao longo do tempo.",
      experience: "Experiência",
      experienceNone:
        "Infelizmente, é o início da minha carreira. Todos temos que começar em algum lugar.",
      skills: "Habilidades",
      projects: "Projetos",
      project1Title: "Sistema Servidor Cliente | C",
      project1Desc1: "Um Sistema Servidor/Cliente projetado usando Pipes/Forks.",
      project1Desc2:
        "O Sistema é projetado para receber múltiplas solicitações de Clientes, como executar um ou mais Programas Concorrentemente ou uma verificação de status para ver se eles estão Agendados ou Concluídos.",
      project1Desc3:
        'Este Servidor também usa uma versão do comando "mysystem" integrado na Biblioteca C criada por mim do zero usando forks e execs.',
      project2Title: "Leitor e Organizador de Dados | C",
      project2Desc1:
        "Programa para armazenar dados, organizá-los e executar uma lista de consultas fornecidas pelo usuário em um arquivo.",
      project2Desc2:
        "O Armazenamento e organização dos dados são feitos com o uso de HashTables e Structs.",
      project2Desc3:
        "Inclui uma interface que exibe as informações sobre cada consulta fornecida.",
      project3Title: "PictuRAS | Vue.js",
      project3Desc1: "Uma aplicação web escalável projetada para gerir, editar e exibir imagens de forma eficaz.",
      project3Desc2: "Inclui um frontend para interação do utilizador, uma API para serviços de backend e gestão de email integrada com Mailhog.",
      project3Desc3: "Os utilizadores podem aplicar várias ferramentas e filtros para editar imagens diretamente na aplicação. O projeto é implementado usando Kubernetes, aproveitando ferramentas como Minikube e Helm para orquestração e gestão de pacotes.",
      project4Title: "F3M | App de Gestão de Medicação",
      project4Desc1: "Uma aplicação móvel desenvolvida no âmbito de um projeto universitário para ajudar pacientes com demência leve a moderada a gerir a sua medicação.",
      project4Desc2: "Inclui um sistema de suporte para cuidadores, permitindo que familiares acompanhem e ajudem na gestão dos horários de medicação.",
      project4Desc3: "Construída com um frontend em React Native (Expo), backend em Node.js/Express/TypeScript e base de dados PostgreSQL gerida com Prisma.",
      githubRepo: "Repositório GitHub",
      education: "Educação",
      bachelors: "[Licenciatura em Engenharia Informática] - [Universidade do Minho]",
      masters: "[Mestrado em Engenharia Informática] - [Universidade do Minho]",
      copyright: "© 2025 Flávio Silva. Todos os direitos reservados.",
      discordName: "fuzzymind",
      contacts: "Contactos",
      email: "Email",
      emailAddress: "silvaflavio820@gmail.com",
      discord: "Discord",
      discordusername: "fuzzymind",
      downloadResume: "Baixar Currículo",
      githubLink: "https://github.com/FuzzyLaDuzzy",
      githubUsername: "FuzzyLaDuzzy",
      linkedinLink: "https://www.linkedin.com/in/flávio-alex-silva/",
      linkedinUsername: "Flávio Silva",
      instagramLink: "https://www.instagram.com/flavios.silva.dmwm/",
      instagramUsername: "flavios.silva.dmwm",
    },
  };

  const currentLanguage = isPortuguese ? "pt" : "en";
  const currentText = textContent[currentLanguage];

  const isTouchDevice = () => {
    if (typeof window !== "undefined") {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    }
    return false;
  };

  const isMobileDevice = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  };

  const skillButtonStyle = (isTouch: boolean) => {
    return `bg-black/80 text-white border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-colors duration-300 ${
      isTouch ? "active:bg-white active:text-black" : "hover:bg-white hover:text-black"
    } flex items-center gap-2`;
  };

  useLayoutEffect(() => {
    setIsTouch(isTouchDevice());
    setIsMobile(isMobileDevice());

    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener("resize", handleResize);

    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const skills = [
    { name: "C", image: "/C.png", link: "https://en.wikipedia.org/wiki/C_(programming_language)" },
    { name: "Haskell", image: "/haskell.png", link: "https://www.haskell.org/" },
    { name: "JavaScript", image: "/javascript.png", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "SQL", image: "/sql.svg", link: "https://en.wikipedia.org/wiki/SQL" },
    { name: "Python", image: "/python.png", link: "https://www.python.org/" },
    { name: "Vue.js", image: "/vue.png", link: "https://vuejs.org/" },
  ];

  const projects = [
    {
      title: currentText.project1Title,
      desc: [currentText.project1Desc1, currentText.project1Desc2, currentText.project1Desc3],
      tech: "C",
      techIcon: "/C.png",
      github: "https://github.com/FuzzyLaDuzzy/SOTP-2024",
    },
    {
      title: currentText.project3Title,
      desc: [currentText.project3Desc1, currentText.project3Desc2, currentText.project3Desc3],
      tech: "Vue.js",
      techIcon: "/vue.png",
      github: "https://github.com/JoaoCoelho2003/PictuRas",
    },
    {
      title: currentText.project2Title,
      desc: [currentText.project2Desc1, currentText.project2Desc2, currentText.project2Desc3],
      tech: "C",
      techIcon: "/C.png",
      github: "https://github.com/josevasconcelos2002/LI3-project",
    },
    {
      title: currentText.project4Title,
      desc: [currentText.project4Desc1, currentText.project4Desc2, currentText.project4Desc3],
      tech: "React Native",
      techIcon: "/javascript.png",
      github: "https://github.com/MartimRedondo/F3M_APP",
    },
  ];

  const navItems: { id: string; label: string }[] = [
    { id: "experience", label: currentText.experience },
    { id: "skills", label: currentText.skills },
    { id: "projects", label: currentText.projects },
    { id: "education", label: currentText.education },
    { id: "contacts", label: currentText.contacts },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 font-sans relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] overflow-hidden opacity-30">
        <video
          ref={videoRef}
          className="min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/wavy.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-black/20"></div>

      {/* Hamburger Menu for All Devices */}
      <div className="absolute top-4 left-4 z-20">
        <motion.button
          onClick={toggleMenu}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className={`px-4 py-2 rounded-md text-lg ${primaryButtonClass}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              {menuOpen ? "✕" : "☰"}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {/* Mobile Menu */}
          {menuOpen && isMobile && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 w-full h-full bg-black/90 text-white flex flex-col items-center justify-center z-30"
            >
              <motion.button
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-md transition-colors duration-200"
              >
                ✕
              </motion.button>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6 text-center"
              >
                {navItems.map((item) => (
                  <motion.li key={item.id} variants={staggerItem} className="text-xl">
                    <button onClick={() => scrollToSection(item.id)}>{item.label}</button>
                  </motion.li>
                ))}
                {isMobile && (
                  <motion.li variants={staggerItem} className="text-xl">
                    <button
                      onClick={() => {
                        toggleLanguage();
                        toggleMenu();
                      }}
                      className="bg-white text-black px-4 py-2 rounded-md transition-colors duration-200"
                    >
                      {isPortuguese ? "English" : "Português"}
                    </button>
                  </motion.li>
                )}
              </motion.ul>
            </motion.div>
          )}

          {/* Desktop Menu */}
          {menuOpen && !isMobile && (
            <motion.div
              key="desktop-menu"
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-16 left-4 bg-black/90 text-white rounded-lg shadow-xl z-50 p-8 min-w-[250px]"
            >
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3"
              >
                {navItems.map((item) => (
                  <motion.li key={item.id} variants={staggerItem} className="text-lg group relative w-fit">
                    <button onClick={() => scrollToSection(item.id)}>{item.label}</button>
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.li>
                ))}
                <motion.li variants={staggerItem} className="text-lg">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      toggleLanguage();
                      toggleMenu();
                    }}
                    className="bg-white text-black px-5 py-3 rounded-lg text-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    {isPortuguese ? "English" : "Português"}
                  </motion.button>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Language Toggle Button */}
      {!isMobile && (
        <div className="absolute top-4 right-4 z-10">
          <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 ${primaryButtonClass}`}
          >
            {isPortuguese ? "English" : "Português"}
          </motion.button>
        </div>
      )}

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          scale: { duration: 0.8, ease: "easeOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
        }}
        whileHover={{ scale: 1.04 }}
        className="profile-image-container w-64 h-80 sm:w-80 sm:h-100 overflow-hidden shadow-lg relative rounded-full z-10 ring-2 ring-white/20 hover:ring-white/40 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.12)]"
      >
        <Image
          src="/profile4.jpg"
          alt={currentText.name}
          width={988}
          height={1123}
          className="object-cover w-full h-full"
          priority
        />
      </motion.div>
      {/* Animated Name */}
      <motion.h1
        className="text-4xl font-bold text-white z-10"
        variants={nameVariants}
        initial="hidden"
        animate="visible"
      >
        {currentText.name}
      </motion.h1>
      <p className="text-lg text-gray-300 z-10 min-h-[1.75rem]">
        {displayedTitle}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block w-[2px] h-5 bg-gray-300 ml-1 align-middle"
        />
      </p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col items-center gap-4 z-10"
      >
        <motion.a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 ${primaryButtonClass}`}
        >
          {currentText.downloadResume}
        </motion.a>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex gap-4 z-10"
      >
        <motion.a
          href="https://github.com/FuzzyLaDuzzy"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="hover:text-blue-500"
        >
          <Image src="/github.png" alt="GitHub" width={25} height={25} />
        </motion.a>
        <motion.a
          href="https://www.instagram.com/flavios.silva.dmwm/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="hover:text-blue-500"
        >
          <Image src="/insta.png" alt="Instagram" width={24} height={24} />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/flávio-alex-silva/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="hover:text-blue-500"
        >
          <Image src="/linkedin2.png" alt="LinkedIn" width={25} height={24} />
        </motion.a>
      </motion.div>
      {/* About Section */}
      <motion.div
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className={`w-full z-10 ${!isMobile ? "max-w-4xl" : "max-w-2xl"}`}
      >
        <SectionHeading title="About Me" />
        <div className={cardClass}>
          <p className="text-gray-300">{currentText.aboutMe}</p>
        </div>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className={`w-full z-10 ${!isMobile ? "max-w-4xl" : "max-w-2xl"}`}
      >
        <SectionHeading title={currentText.experience} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          <motion.div variants={staggerItem} whileHover={{ y: -4 }} className={cardClass}>
            <h3 className="font-semibold">None</h3>
            <p className="mt-2">{currentText.experienceNone}</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className={`w-full z-10 ${!isMobile ? "max-w-4xl" : "max-w-2xl"}`}
      >
        <SectionHeading title={currentText.skills} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {skills.map((skill) => (
            <motion.a
              key={skill.name}
              href={skill.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={skillButtonStyle(isTouch)}>
                <Image src={skill.image} alt={skill.name} width={24} height={24} />
                <span>{skill.name}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Projects Section */}
      <motion.div
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className={`w-full z-10 ${!isMobile ? "max-w-5xl" : "max-w-2xl"}`}
      >
        <SectionHeading title={currentText.projects} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className={`${cardClass} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-white/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-semibold text-lg leading-snug">{project.title}</h3>
                  </div>
                  <span className="shrink-0 flex items-center gap-1.5 text-xs uppercase tracking-wide bg-white/5 border border-white/15 text-gray-300 px-2.5 py-1 rounded-full">
                    <Image src={project.techIcon} alt={project.tech} width={12} height={12} />
                    {project.tech}
                  </span>
                </div>
                <div className="w-full h-px bg-white/10 mb-3" />
                <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                  {project.desc.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
              <div className={`mt-6 flex ${isMobile ? "justify-center" : ""}`}>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm ${primaryButtonClass} rounded-md ${
                    isMobile ? "px-8 py-3 text-base" : ""
                  }`}
                >
                  <Image src="/github.png" alt="" width={14} height={14} className="opacity-80" />
                  {currentText.githubRepo}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Education Section */}
      <motion.div
        id="education"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className={`w-full z-10 ${!isMobile ? "max-w-4xl" : "max-w-2xl"}`}
      >
        <SectionHeading title={currentText.education} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          <motion.div variants={staggerItem} whileHover={{ y: -4 }} className={cardClass}>
            <h3 className="font-semibold">{currentText.bachelors}</h3>
            <p className="text-gray-300">[2020] - [2024]</p>
          </motion.div>
          <motion.div variants={staggerItem} whileHover={{ y: -4 }} className={cardClass}>
            <h3 className="font-semibold">{currentText.masters}</h3>
            <p className="text-gray-300">[2024] - [Current]</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Contacts Section */}
      <motion.div
        id="contacts"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className={`w-full z-10 ${!isMobile ? "max-w-4xl" : "max-w-2xl"}`}
      >
        <SectionHeading title={currentText.contacts} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          {/* Email */}
          <motion.div
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className={`${cardClass} flex items-center gap-4`}
          >
            <Image src="/email.png" alt="Email" width={24} height={24} />
            <div>
              <h3 className="font-semibold">{currentText.email}</h3>
              <p className="text-gray-300">
                <a
                  href={`mailto:${currentText.emailAddress}`}
                  className="text-blue-500 hover:underline"
                >
                  {currentText.emailAddress}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Discord */}
          <motion.div
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className={`${cardClass} flex items-center gap-4`}
          >
            <Image src="/discord.png" alt="Discord" width={24} height={24} />
            <div>
              <h3 className="font-semibold">{currentText.discord}</h3>
              <p className="text-gray-300">{currentText.discordusername}</p>
            </div>
          </motion.div>

          {/* GitHub */}
          <motion.div
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className={`${cardClass} flex items-center gap-4`}
          >
            <Image src="/github.png" alt="GitHub" width={24} height={24} />
            <div>
              <h3 className="font-semibold">GitHub</h3>
              <p className="text-gray-300">
                <a
                  href={currentText.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {currentText.githubUsername}
                </a>
              </p>
            </div>
          </motion.div>

          {/* LinkedIn */}
          <motion.div
            variants={staggerItem}
            whileHover={{ y: -4 }}
            className={`${cardClass} flex items-center gap-4`}
          >
            <Image src="/linkedin2.png" alt="LinkedIn" width={24} height={24} />
            <div>
              <h3 className="font-semibold">LinkedIn</h3>
              <p className="text-gray-300">
                <a
                  href={currentText.linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {currentText.linkedinUsername}
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full text-center mt-8 text-gray-300 z-10"
      >
        <p>{currentText.copyright}</p>
      </motion.div>
    </div>
  );
}
