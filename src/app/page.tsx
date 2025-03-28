"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
        }, 6000); // Pause for 3 seconds before starting the next title
      }
    }, 100); // Change each letter every 150ms
    return () => clearInterval(interval);
  }, [currentTitleIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 6000); // Change title every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleLanguage = () => {
    setIsPortuguese(!isPortuguese);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const nameVariants = {
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
    return `bg-black text-white border-3 border-white px-4 py-2 rounded-full ${
      isTouch ? "active:bg-gray-600" : "hover:bg-gray-600"
    }`;
  };

  useEffect(() => {
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
        <button
          onClick={toggleMenu}
          className="bg-black text-white border-2 border-white px-4 py-2 rounded-md"
        >
          ☰
        </button>
        {/* Mobile Menu */}
        {menuOpen && isMobile && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/90 text-white flex flex-col items-center justify-center z-30">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded-md"
            >
              ✕
            </button>
            <ul className="flex flex-col gap-4 text-center">
              <li className="text-xl">
                <button onClick={() => scrollToSection("experience")}>
                  {currentText.experience}
                </button>
              </li>
              <li className="text-xl">
                <button onClick={() => scrollToSection("skills")}>
                  {currentText.skills}
                </button>
              </li>
              <li className="text-xl">
                <button onClick={() => scrollToSection("projects")}>
                  {currentText.projects}
                </button>
              </li>
              <li className="text-xl">
                <button onClick={() => scrollToSection("education")}>
                  {currentText.education}
                </button>
              </li>
              <li className="text-xl">
                <button onClick={() => scrollToSection("contacts")}>
                  {currentText.contacts}
                </button>
              </li>
              {isMobile && (
                <li className="text-xl">
                  <button
                    onClick={() => {
                      toggleLanguage();
                      toggleMenu();
                    }}
                    className="bg-white text-black px-4 py-2 rounded-md"
                  >
                    {isPortuguese ? "English" : "Português"}
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
        {/* Desktop Menu */}
        {menuOpen && !isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-16 left-4 bg-black/90 text-white rounded-lg shadow-xl z-30 p-6 min-w-[220px]"
          >
            <ul className="flex flex-col gap-3">
              <li className="text-lg hover:underline">
                <button onClick={() => scrollToSection("experience")}>
                  {currentText.experience}
                </button>
              </li>
              <li className="text-lg hover:underline">
                <button onClick={() => scrollToSection("skills")}>
                  {currentText.skills}
                </button>
              </li>
              <li className="text-lg hover:underline">
                <button onClick={() => scrollToSection("projects")}>
                  {currentText.projects}
                </button>
              </li>
              <li className="text-lg hover:underline">
                <button onClick={() => scrollToSection("education")}>
                  {currentText.education}
                </button>
              </li>
              <li className="text-lg hover:underline">
                <button onClick={() => scrollToSection("contacts")}>
                  {currentText.contacts}
                </button>
              </li>
              <li className="text-lg">
                <button
                  onClick={() => {
                    toggleLanguage();
                    toggleMenu();
                  }}
                  className="bg-white text-black px-5 py-3 rounded-lg text-lg hover:bg-gray-200"
                >
                  {isPortuguese ? "English" : "Português"}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>

      {/* Language Toggle Button */}
      {!isMobile && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleLanguage}
            className="bg-black text-white border-2 border-white px-6 py-3 rounded-md hover:bg-gray-600"
          >
            {isPortuguese ? "English" : "Português"}
          </button>
        </div>
      )}

      {/* Profile Section */}
      <div className="profile-image-container w-64 h-80 sm:w-80 sm:h-100 overflow-hidden shadow-lg relative rounded-full z-10">
        <Image
          src="/profile.png"
          alt={currentText.name}
          width={1100}
          height={1200}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Animated Name */}
      <motion.h1
        className="text-4xl font-bold text-white z-10"
        variants={nameVariants}
        initial="hidden"
        animate="visible"
      >
        {currentText.name}
      </motion.h1>
      <p className="text-lg text-gray-300 z-10">{displayedTitle}</p>
      <div className="flex flex-col items-center gap-4 z-10">
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white border-2 border-white px-6 py-3 rounded-md hover:bg-gray-600"
        >
          {currentText.downloadResume}
        </a>
      </div>
      <div className="flex gap-4 z-10">
        <a
          href="https://github.com/FuzzyLaDuzzy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <Image src="/github.png" alt="GitHub" width={25} height={25} />
        </a>
        <a
          href="https://www.instagram.com/flavios.silva.dmwm/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <Image src="/insta.png" alt="Instagram" width={22} height={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/flávio-alex-silva/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <Image src="/linkedin2.png" alt="LinkedIn" width={25} height={24} />
        </a>
      </div>
      {/* Section Wrappers with Conditional Styling */}
      <div
        id="about"
        className={`w-full z-10 ${
          !isMobile ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          About Me
        </h2>
        <div className="border p-4 rounded-md bg-black/90 text-white">
          <p className="text-gray-300">{currentText.aboutMe}</p>
        </div>
      </div>

      {/* Experience Section */}
      <div
        id="experience"
        className={`w-full z-10 ${
          !isMobile ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          {currentText.experience}
        </h2>
        <div className="flex flex-col gap-4">
          {/* Example Experience Entry */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
            <h3 className="font-semibold">None</h3>
            <p className="mt-2">{currentText.experienceNone}</p>
          </div>
          {/* Add more experience entries here */}
        </div>
      </div>
      {/* Skills Section */}
      <div
        id="skills"
        className={`w-full z-10 ${
          !isMobile ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          {currentText.skills}
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Example Skill */}
          <div className={skillButtonStyle(isTouch)}>C</div>
          <div className={skillButtonStyle(isTouch)}>Haskell</div>
          <div className={skillButtonStyle(isTouch)}>JavaScript</div>
          <div className={skillButtonStyle(isTouch)}>SQL</div>
          <div className={skillButtonStyle(isTouch)}>Python</div>
          <div className={skillButtonStyle(isTouch)}>HTML/CSS</div>
          {/* Add more skills here */}
        </div>
      </div>
      {/* Projects Section */}
      <div
        id="projects"
        className={`w-full z-10 ${!isMobile ? "max-w-4xl" : "max-w-2xl"}`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          {currentText.projects}
        </h2>
        <div className="flex flex-col gap-4">
          {/* Example Project Entry 1 */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
            <h3 className="font-semibold">{currentText.project1Title}</h3>
            <div className="h-2"></div>
            <div className="text-gray-300">
              <p>{currentText.project1Desc1}</p>
              <p>{currentText.project1Desc2}</p>
              <p>{currentText.project1Desc3}</p>
            </div>
            <div className="h-4"></div> {/* Added space */}
            <div className={`mt-2 flex ${isMobile ? 'justify-center' : 'gap-2'}`}>
              <a
                href="https://github.com/FuzzyLaDuzzy/SOTP-2024"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={`bg-black text-white border-2 border-white px-4 py-2 rounded-md hover:bg-gray-600 ${isMobile ? 'px-8 py-3 text-lg' : ''}`}>
                  {currentText.githubRepo}
                </button>
              </a>
            </div>
          </div>
          {/* Example Project Entry 2 */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
            <h3 className="font-semibold">{currentText.project3Title}</h3>
            <div className="h-2"></div>
            <div className="text-gray-300">
              <p>{currentText.project3Desc1}</p>
              <p>{currentText.project3Desc2}</p>
              <p>{currentText.project3Desc3}</p>
            </div>
            <div className="h-4"></div> {/* Added space */}
            <div className={`mt-2 flex ${isMobile ? 'justify-center' : 'gap-2'}`}>
              <a
                href="https://github.com/JoaoCoelho2003/PictuRas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={`bg-black text-white border-2 border-white px-4 py-2 rounded-md hover:bg-gray-600 ${isMobile ? 'px-8 py-3 text-lg' : ''}`}>
                  {currentText.githubRepo}
                </button>
              </a>
            </div>
          </div>
          <div className="border p-4 rounded-md bg-black/90 text-white">
            <h3 className="font-semibold">{currentText.project2Title}</h3>
            <div className="h-2"></div>
            <div className="text-gray-300">
              <p>{currentText.project2Desc1}</p>
              <p>{currentText.project2Desc2}</p>
              <p>{currentText.project2Desc3}</p>
            </div>
            <div className="h-4"></div> {/* Added space */}
            <div className={`mt-2 flex ${isMobile ? 'justify-center' : 'gap-2'}`}>
              <a
                href="https://github.com/josevasconcelos2002/LI3-project"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={`bg-black text-white border-2 border-white px-4 py-2 rounded-md hover:bg-gray-600 ${isMobile ? 'px-8 py-3 text-lg' : ''}`}>
                  {currentText.githubRepo}
                </button>
              </a>
            </div>
          </div>
          {/* Add more project entries here */}
        </div>
      </div>


      {/* Education Section */}
      <div
        id="education"
        className={`w-full z-10 ${
          !isMobile ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          {currentText.education}
        </h2>
        <div className="flex flex-col gap-4">
          {/* Example Education Entry */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
            <h3 className="font-semibold">{currentText.bachelors}</h3>
            <p className="text-gray-300">[2020] - [2024]</p>
          </div>
          {/* Add more education entries here */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
            <h3 className="font-semibold">{currentText.masters}</h3>
            <p className="text-gray-300">[2024] - [Current]</p>
          </div>
        </div>
      </div>
      {/* Contacts Section */}
      {/* Contacts Section */}
      <div
        id="contacts"
        className={`w-full z-10 ${
          !isMobile ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          {currentText.contacts}
        </h2>
        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
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

          {/* Discord */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
            <h3 className="font-semibold">{currentText.discord}</h3>
            <p className="text-gray-300">{currentText.discordusername}</p>
          </div>

          {/* GitHub */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
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

          {/* LinkedIn */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
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

          {/* Instagram */}
          <div className="border p-4 rounded-md bg-black/90 text-white">
            <h3 className="font-semibold">Instagram</h3>
            <p className="text-gray-300">
              <a
                href={currentText.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {currentText.instagramUsername}
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="w-full text-center mt-8 text-gray-300 z-10">
        <p>{currentText.copyright}</p>
      </div>
    </div>
  );
}
