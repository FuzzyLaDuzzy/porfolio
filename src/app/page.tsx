"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { education, links, projects, skills, text, type Lang } from "./content";

/* ---------- animation presets ---------- */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ---------- shared styles ---------- */

const pillButton =
  "inline-flex items-center justify-center gap-2 bg-black/70 text-white border border-white/30 rounded-full backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-black active:bg-white active:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const solidButton =
  "inline-flex items-center justify-center gap-2 bg-white text-black border border-white rounded-full transition-colors duration-300 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const cardClass =
  "border border-white/10 p-5 sm:p-6 rounded-xl bg-black/70 backdrop-blur-sm text-white shadow-lg transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-black/40";

const SECTION_IDS = ["about", "skills", "projects", "education", "contacts"] as const;
type SectionId = (typeof SECTION_IDS)[number];

/* ---------- small components ---------- */

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center mb-6">
      <h2 className="text-2xl sm:text-3xl font-semibold text-white">{title}</h2>
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

function Section({
  id,
  title,
  wide,
  children,
}: {
  id: SectionId;
  title: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeInUp}
      className={`w-full z-10 scroll-mt-24 ${wide ? "max-w-5xl" : "max-w-4xl"}`}
    >
      <SectionHeading title={title} />
      {children}
    </motion.section>
  );
}

function CopyButton({ value, label, doneLabel }: { value: string; label: string; doneLabel: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard unavailable — ignore */
        }
      }}
      className={`${pillButton} px-3 py-1 text-xs shrink-0`}
      aria-live="polite"
    >
      {done ? doneLabel : label}
    </button>
  );
}

/* ---------- typing title ---------- */

function useTypewriter(words: readonly string[], disabled: boolean) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState("");

  useEffect(() => {
    setIndex(0);
  }, [words]);

  useEffect(() => {
    const word = words[index % words.length];
    if (disabled) {
      setShown(word);
      return;
    }
    let char = 0;
    let pause: ReturnType<typeof setTimeout> | undefined;
    const typing = setInterval(() => {
      char++;
      setShown(word.slice(0, char));
      if (char >= word.length) {
        clearInterval(typing);
        pause = setTimeout(() => setIndex((i) => (i + 1) % words.length), 3500);
      }
    }, 90);
    return () => {
      clearInterval(typing);
      if (pause) clearTimeout(pause);
    };
  }, [index, words, disabled]);

  return shown;
}

/* ---------- page ---------- */

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const t = text[lang];
  const typed = useTypewriter(t.titles, reduceMotion);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Language: remember choice, otherwise follow the browser (pt-PT / pt-BR → PT)
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    if (saved === "en" || saved === "pt") setLang(saved);
    else if (navigator.language?.toLowerCase().startsWith("pt")) setLang("pt");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-PT" : "en";
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const toggleLanguage = () => setLang((l) => (l === "en" ? "pt" : "en"));

  // Nav background on scroll + highlight the section in view
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Close mobile menu with Escape and lock page scroll while it is open
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const navItems = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));

  const socials = [
    { href: links.github, icon: "/github.png", label: "GitHub", invert: true },
    { href: links.linkedin, icon: "/linkedin2.png", label: "LinkedIn" },
    { href: links.instagram, icon: "/insta.png", label: "Instagram" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-8 pb-10 gap-20 sm:gap-24 font-sans relative isolate overflow-x-hidden">
      {/* Skip link for keyboard users */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>

      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-white/80 origin-left z-[55]"
      />

      {/* Video background (compressed 3 MB loop + poster for instant paint) */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-30" aria-hidden>
        {reduceMotion ? (
          <Image src="/wavy-poster.jpg" alt="" fill className="object-cover" priority />
        ) : (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/wavy-poster.jpg"
          >
            <source src="/wavy-bg.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/10 via-black/30 to-black/60" aria-hidden />

      {/* ---------- Top navigation ---------- */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/60 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-8 h-16" aria-label="Main">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
            className="font-semibold tracking-tight text-white text-lg"
          >
            FS<span className="text-white/40">.</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`text-sm transition-colors ${
                    active === item.id ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
                {active === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-1.5 h-0.5 bg-white rounded-full"
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              aria-label={t.switchLangLabel}
              title={t.switchLangLabel}
              className={`${pillButton} px-4 py-1.5 text-sm font-medium`}
            >
              {t.switchLang}
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? t.closeMenu : t.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={`md:hidden ${pillButton} w-10 h-10 text-lg`}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-md text-white flex flex-col items-center justify-center z-40"
          >
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-7 text-center"
            >
              {navItems.map((item) => (
                <motion.li key={item.id} variants={staggerItem}>
                  <button onClick={() => scrollTo(item.id)} className="text-2xl">
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Hero ---------- */}
      <section className="min-h-[100svh] w-full flex flex-col items-center justify-center gap-5 pt-20 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.8, ease: "easeOut" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
          }}
          className="w-48 h-60 sm:w-64 sm:h-80 overflow-hidden relative rounded-full ring-2 ring-white/20 hover:ring-white/40 transition-[box-shadow] duration-300 shadow-[0_0_40px_rgba(255,255,255,0.12)]"
        >
          <Image
            src="/profile4.jpg"
            alt={`Photo of ${t.name}`}
            width={988}
            height={1123}
            sizes="(min-width: 640px) 256px, 192px"
            className="object-cover w-full h-full"
            priority
          />
        </motion.div>


        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-4xl sm:text-6xl font-bold text-white tracking-tight"
        >
          {t.name}
        </motion.h1>

        <p className="text-lg sm:text-xl text-gray-200 min-h-[1.75rem]" aria-label={t.titles.join(", ")}>
          <span aria-hidden>{typed}</span>
          <motion.span
            aria-hidden
            animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block w-[2px] h-5 bg-gray-300 ml-1 align-middle"
          />
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl text-gray-300 text-sm sm:text-base leading-relaxed"
        >
          {t.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-1"
        >
          <motion.a
            href={links.cv}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`${solidButton} px-6 py-3 font-medium`}
          >
            {t.downloadResume}
          </motion.a>
          <motion.button
            onClick={() => scrollTo("contacts")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`${pillButton} px-6 py-3 font-medium`}
          >
            {t.contactMe}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-3"
        >
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              title={s.label}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors"
            >
              <Image src={s.icon} alt="" width={22} height={22} className={s.invert ? "invert" : ""} />
            </motion.a>
          ))}
        </motion.div>

        <motion.button
          onClick={() => scrollTo("about")}
          aria-label={t.nav.about}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-white/50 hover:text-white transition-colors"
        >
          <motion.svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.button>
      </section>

      {/* ---------- About ---------- */}
      <Section id="about" title={t.aboutTitle}>
        <div className={`${cardClass} space-y-3`}>
          {t.aboutMe.map((p, i) => (
            <p key={i} className="text-gray-300 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* ---------- Skills ---------- */}
      <Section id="skills" title={t.skillsTitle}>
        <div className="grid gap-4 md:grid-cols-3">
          {(Object.keys(skills) as (keyof typeof skills)[]).map((group) => (
            <div key={group} className={cardClass}>
              <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-4">{t.skillGroups[group]}</h3>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {skills[group].map((skill) => (
                  <motion.li key={skill.name} variants={staggerItem}>
                    <motion.a
                      href={skill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className={`${pillButton} group px-3 py-1.5 text-sm`}
                    >
                      {skill.icon ? (
                        <Image
                          src={skill.icon}
                          alt=""
                          width={16}
                          height={16}
                          className={`w-4 h-4 object-contain ${skill.mono ? "group-hover:invert group-active:invert" : ""}`}
                        />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                      )}
                      {skill.name}
                    </motion.a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Projects ---------- */}
      <Section id="projects" title={t.projectsTitle} wide>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
        >
          {projects.map((project, index) => {
            const p = t.projects[project.key];
            return (
              <motion.article
                key={project.key}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className={`${cardClass} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xs font-mono text-white/40">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="font-semibold text-lg leading-snug">{p.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="text-[11px] uppercase tracking-wide bg-white/5 border border-white/15 text-gray-300 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="w-full h-px bg-white/10 mb-4" />
                  <ul className="text-gray-300 text-sm leading-relaxed space-y-2 list-disc pl-4 marker:text-white/30">
                    {p.desc.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${pillButton} px-4 py-2 text-sm w-full sm:w-auto group`}
                  >
                    <Image src="/github.png" alt="" width={14} height={14} />
                    {t.seeCode}
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </Section>

      {/* ---------- Education ---------- */}
      <Section id="education" title={t.educationTitle}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          {education.map((e) => (
            <motion.div
              key={e.key}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className={`${cardClass} flex flex-wrap items-center justify-between gap-2`}
            >
              <div>
                <h3 className="font-semibold">{t[e.key]}</h3>
                <p className="text-gray-400 text-sm">{lang === "pt" ? "Universidade do Minho" : "University of Minho"}</p>
              </div>
              <span className="text-sm font-mono text-gray-300">
                {e.from} – {e.to ?? t.present}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ---------- Contact ---------- */}
      <Section id="contacts" title={t.contactsTitle}>
        <p className="text-center text-gray-300 mb-6">{t.contactIntro}</p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <motion.div variants={staggerItem} className={`${cardClass} flex items-center gap-4 sm:col-span-2`}>
            <span className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center">
              <Image src="/email.png" alt="" width={20} height={20} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold">Email</h3>
              <a href={`mailto:${links.email}`} className="text-sky-400 hover:underline break-all text-sm sm:text-base">
                {links.email}
              </a>
            </div>
            <CopyButton value={links.email} label={t.copy} doneLabel={t.copied} />
          </motion.div>

          <motion.a
            variants={staggerItem}
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardClass} flex items-center gap-4`}
          >
            <span className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center">
              <Image src="/linkedin2.png" alt="" width={20} height={20} />
            </span>
            <div>
              <h3 className="font-semibold">LinkedIn</h3>
              <p className="text-sky-400">{t.name}</p>
            </div>
          </motion.a>

          <motion.a
            variants={staggerItem}
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardClass} flex items-center gap-4`}
          >
            <span className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center">
              <Image src="/github.png" alt="" width={20} height={20} className="invert" />
            </span>
            <div>
              <h3 className="font-semibold">GitHub</h3>
              <p className="text-sky-400">{links.githubUsername}</p>
            </div>
          </motion.a>

        </motion.div>
      </Section>

      {/* ---------- Footer ---------- */}
      <footer className="w-full max-w-4xl z-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} {t.name}. {t.rights}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
          className="hover:text-white transition-colors"
        >
          ↑ {t.backToTop}
        </button>
      </footer>
    </div>
  );
}
