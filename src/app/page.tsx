"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isDiscordPopupOpen, setIsDiscordPopupOpen] = useState(false);
  const discordButtonRef = useRef<HTMLButtonElement>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [isPortuguese, setIsPortuguese] = useState(false); // State for language

  const openDiscordPopup = () => {
    setIsDiscordPopupOpen(true);
  };

  const closeDiscordPopup = () => {
    setIsDiscordPopupOpen(false);
  };

  const toggleLanguage = () => {
    setIsPortuguese(!isPortuguese);
  };

  useEffect(() => {
    if (isDiscordPopupOpen && discordButtonRef.current) {
      const buttonRect = discordButtonRef.current.getBoundingClientRect();
      setPopupPosition({
        x: buttonRect.right + 10,
        y: buttonRect.top - 10,
      });
    }
  }, [isDiscordPopupOpen]);

  // Animation variants for the name
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

  // Animation variants for the Discord popup
  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  // Text content based on language
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
      githubRepo: "GitHub Repo",
      education: "Education",
      bachelors: "[Bachelor's Degree] - [University of Minho]",
      masters: "[Master's Degree] - [University of Minho]",
      copyright: "© 2025 Flávio Silva. All rights reserved.",
      discordName: "fuzzymind",
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
      githubRepo: "Repositório GitHub",
      education: "Educação",
      bachelors: "[Licenciatura] - [Universidade do Minho]",
      masters: "[Mestrado] - [Universidade do Minho]",
      copyright: "© 2025 Flávio Silva. Todos os direitos reservados.",
      discordName: "fuzzymind",
    },
  };

  const currentLanguage = isPortuguese ? "pt" : "en";
  const currentText = textContent[currentLanguage];

  // Function to determine if it's a touch device
  const isTouchDevice = () => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 font-sans relative">
      {/* Language Toggle Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleLanguage}
          className="bg-black text-white border-2 border-white px-6 py-3 rounded-md hover:bg-gray-600"
        >
          {isPortuguese ? "English" : "Português"}
        </button>
      </div>
      {/* Discord Popup */}
      <AnimatePresence>
        {isDiscordPopupOpen && (
          <motion.div
            className="absolute bg-black p-4 rounded-md shadow-lg z-50 border-2 border-white"
            style={{
              top: popupPosition.y,
              left: popupPosition.x,
            }}
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              onClick={closeDiscordPopup}
              className="absolute top-1 right-1 text-white hover:text-gray-300"
            >
              X
            </button>
            <p className="text-2xl font-bold text-white">
              {currentText.discordName}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Profile Section */}
      <div className="profile-image-container w-80 h-80 overflow-hidden shadow-lg relative rounded-full">
        <Image
          src="/lebron.avif"
          alt={currentText.name}
          width={1000}
          height={1000}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Animated Name */}
      <motion.h1
        className="text-4xl font-bold"
        variants={nameVariants}
        initial="hidden"
        animate="visible"
      >
        {currentText.name}
      </motion.h1>
      <p className="text-lg text-gray-600">{currentText.title}</p>
      <div className="flex gap-4">
        <a
          href="https://github.com/FuzzyLaDuzzy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <Image src="/github.png" alt="GitHub" width={24} height={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/fl%C3%A3vio-silva-5a8423250/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          <Image src="/images.png" alt="LinkedIn" width={24} height={24} />
        </a>
        <button
          onClick={openDiscordPopup}
          className="hover:text-blue-500"
          ref={discordButtonRef}
        >
          <Image src="/discord.png" alt="Discord" width={24} height={24} />
        </button>
      </div>
      <div className="max-w-2xl text-center">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700">{currentText.aboutMe}</p>
      </div>

      {/* Experience Section */}
      <div className="max-w-2xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {currentText.experience}
        </h2>
        <div className="flex flex-col gap-4">
          {/* Example Experience Entry */}
          <div className="border p-4 rounded-md">
            <h3 className="font-semibold">None</h3>
            <p className="mt-2">{currentText.experienceNone}</p>
          </div>
          {/* Add more experience entries here */}
        </div>
      </div>
      {/* Skills Section */}
      <div className="max-w-2xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {currentText.skills}
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Example Skill */}
          <div
            className={`bg-black text-white border-3 border-white px-4 py-2 rounded-full ${
              isTouchDevice() ? "active:bg-gray-600" : "hover:bg-gray-600"
            }`}
          >
            C
          </div>
          <div
            className={`bg-black text-white border-3 border-white px-4 py-2 rounded-full ${
              isTouchDevice() ? "active:bg-gray-600" : "hover:bg-gray-600"
            }`}
          >
            Haskell
          </div>
          <div
            className={`bg-black text-white border-3 border-white px-4 py-2 rounded-full ${
              isTouchDevice() ? "active:bg-gray-600" : "hover:bg-gray-600"
            }`}
          >
            JavaScript
          </div>
          <div
            className={`bg-black text-white border-3 border-white px-4 py-2 rounded-full ${
              isTouchDevice() ? "active:bg-gray-600" : "hover:bg-gray-600"
            }`}
          >
            SQL
          </div>
          <div
            className={`bg-black text-white border-3 border-white px-4 py-2 rounded-full ${
              isTouchDevice() ? "active:bg-gray-600" : "hover:bg-gray-600"
            }`}
          >
            Python
          </div>
          <div
            className={`bg-black text-white border-3 border-white px-4 py-2 rounded-full ${
              isTouchDevice() ? "active:bg-gray-600" : "hover:bg-gray-600"
            }`}
          >
            HTML/CSS
          </div>
          {/* Add more skills here */}
        </div>
      </div>
      {/* Projects Section */}
      <div className="max-w-2xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {currentText.projects}
        </h2>
        <div className="flex flex-col gap-4">
          {/* Example Project Entry 1 */}
          <div className="border p-4 rounded-md">
            <h3 className="font-semibold">{currentText.project1Title}</h3>
            <div className="h-2"></div>
            <div className="text-gray-600">
              <p>{currentText.project1Desc1}</p>
              <p>{currentText.project1Desc2}</p>
              <p>{currentText.project1Desc3}</p>
            </div>
            <div className="mt-2 flex gap-2">
              <a
                href="https://github.com/FuzzyLaDuzzy/SOTP-2024"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {currentText.githubRepo}
              </a>
            </div>
          </div>
          {/* Example Project Entry 2 */}
          <div className="border p-4 rounded-md">
            <h3 className="font-semibold">{currentText.project2Title}</h3>
            <div className="h-2"></div>
            <div className="text-gray-600">
              <p>{currentText.project2Desc1}</p>
              <p>{currentText.project2Desc2}</p>
              <p>{currentText.project2Desc3}</p>
            </div>
            <div className="mt-2 flex gap-2">
              <a
                href="https://github.com/FuzzyLaDuzzy/li3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {currentText.githubRepo}
              </a>
            </div>
          </div>
          {/* Add more project entries here */}
        </div>
      </div>

      {/* Education Section */}
      <div className="max-w-2xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {currentText.education}
        </h2>
        <div className="flex flex-col gap-4">
          {/* Example Education Entry */}
          <div className="border p-4 rounded-md">
            <h3 className="font-semibold">{currentText.bachelors}</h3>
            <p className="text-gray-600">[2020] - [2024]</p>
          </div>
          {/* Add more education entries here */}
          <div className="border p-4 rounded-md">
            <h3 className="font-semibold">{currentText.masters}</h3>
            <p className="text-gray-600">[2024] - [Current]</p>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="w-full text-center mt-8 text-gray-500">
        <p>{currentText.copyright}</p>
      </div>
    </div>
  );
}
