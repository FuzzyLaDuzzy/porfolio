"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { asset, education, links, projects, skills, text, type Lang } from "./content";

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

// Show a block as soon as its top is 80px into the screen. A share of its height ("amount") grows with
// the block: the tall Projects section needed most of a phone screen of it in view before showing.
const reveal = { once: true, margin: "0px 0px -80px 0px" } as const;

/* ---------- shared styles ---------- */

const pillButton =
  "inline-flex items-center justify-center gap-2 bg-black/70 text-white border border-white/30 rounded-full backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-black active:bg-white active:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const solidButton =
  "inline-flex items-center justify-center gap-2 bg-white text-black border border-white rounded-full transition-colors duration-300 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// spotlight: the light that follows the mouse (globals.css)
const cardClass =
  "spotlight relative border border-white/10 p-5 sm:p-6 rounded-xl bg-black/70 backdrop-blur-sm text-white shadow-lg transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-black/40";

// Projects with a demo take a whole row, the others go two to a row. One left alone in its row (the next
// project has a demo, or there is none) takes the whole row too, so there's no empty space beside it
const aloneInRow = new Set<string>();
{
  let besidePrevious = false;
  projects.forEach((project, i) => {
    if (project.video) {
      besidePrevious = false;
      return;
    }
    const next = projects[i + 1];
    if (!besidePrevious && (!next || next.video)) aloneInRow.add(project.key);
    besidePrevious = !besidePrevious;
  });
}

// The Projects filter: the languages and frameworks from Skills that some project lists in its tags
const projectTechs = [...skills.languages, ...skills.frameworks]
  .map((skill) => skill.name)
  .filter((name) => projects.some((project) => project.tags.includes(name)));

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
        className="h-0.5 bg-accent mt-2 rounded-full"
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
      viewport={reveal}
      variants={fadeInUp}
      className={`w-full z-10 scroll-mt-24 ${wide ? "max-w-5xl" : "max-w-4xl"}`}
    >
      <SectionHeading title={title} />
      {children}
    </motion.section>
  );
}

function CopyButton({
  value,
  label,
  doneLabel,
  className = "px-3 py-1 text-xs",
}: {
  value: string;
  label: string;
  doneLabel: string;
  className?: string;
}) {
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
      className={`${pillButton} ${className} shrink-0`}
      aria-live="polite"
    >
      {done ? doneLabel : label}
    </button>
  );
}

/* ---------- a number that counts up the first time it's on screen ---------- */

function CountUp({ value, suffix = "", reduceMotion }: { value: number; suffix?: string; reduceMotion: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [shown, setShown] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setShown(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduceMotion ? value : shown}
      {suffix}
    </span>
  );
}

/* ---------- a project's demo: plays only while it's on screen ---------- */

type ProjectVideoProps = { src: string; poster: string; label: string; enlargeLabel: string; reduceMotion: boolean; className: string };

function ProjectVideo({ src, poster, label, enlargeLabel, reduceMotion, className }: ProjectVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    const video = ref.current;
    if (!video || reduceMotion) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView, reduceMotion]);

  // full screen to read the details; iPhones only have their own video player for it
  const enlarge = () => {
    const video = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
    else video.webkitEnterFullscreen?.();
    video.play().catch(() => {});
  };

  return (
    <>
      <video
        ref={ref}
        className={`border border-white/10 bg-black cursor-zoom-in [&:fullscreen]:object-contain [&:fullscreen]:rounded-none [&:fullscreen]:cursor-zoom-out ${className}`}
        src={asset(src)}
        poster={asset(poster)}
        muted
        loop
        playsInline
        preload="metadata"
        controls={reduceMotion}
        aria-label={label}
        onClick={enlarge}
      />
      <button
        type="button"
        onClick={enlarge}
        className="absolute right-2 bottom-2 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/75 px-3 py-1 text-xs text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white"
      >
        <span aria-hidden>⤢</span>
        {enlargeLabel}
      </button>
    </>
  );
}

/* ---------- the name comes in letter by letter, out of a blur ---------- */

function RevealName({ name, reduceMotion }: { name: string; reduceMotion: boolean }) {
  if (reduceMotion) return <>{name}</>;
  let order = 0; // position of the letter in the whole name, for its delay
  return (
    <span aria-hidden>
      {name.split(" ").map((word, w) => (
        // words don't break inside; the space between them is outside, where a line may break
        <span key={w}>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {[...word].map((letter, l) => (
              <motion.span
                key={l}
                initial={{ opacity: 0, y: "0.35em", filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.15 + order++ * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ---------- moves a little slower than the page as it scrolls by, for depth ---------- */

function Parallax({ reduceMotion, className, children }: { reduceMotion: boolean; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [14, -14]);
  return (
    <motion.div ref={ref} style={reduceMotion ? undefined : { y }} className={className}>
      {children}
    </motion.div>
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
  const navClicked = useRef(false); // after a nav click, keep that link lit until the user scrolls by hand
  // The built HTML is the full-motion page (the build can't know the visitor's setting): switching to the
  // reduced one only after the first render keeps that render the same as the HTML, which React requires
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const reduceMotion = mounted && prefersReducedMotion;

  const t = text[lang];
  const typed = useTypewriter(t.titles, reduceMotion);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Scrolling away from the hero, it sinks a little slower than the page and fades out
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrolled } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScrolled, [0, 0.75], [1, 0]);
  const heroScale = useTransform(heroScrolled, [0, 1], [1, 0.9]);
  const heroY = useTransform(heroScrolled, [0, 1], [0, 120]);

  // Education's timeline line draws itself down as its entries scroll up the screen
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineScrolled } = useScroll({ target: timelineRef, offset: ["start 85%", "end 55%"] });
  const timelineLine = useSpring(timelineScrolled, { stiffness: 120, damping: 30 });

  // Projects: the technology picked in the filter, null for all
  const [tech, setTech] = useState<string | null>(null);

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

  // Nav background on scroll + highlight the section in view: the last one whose top has
  // passed a line just under the bar. Near the end of the page the line slides down to the
  // bottom of the screen, so the last short sections, which can't scroll up to the bar,
  // still get their turn (a fixed line in the middle of a tall screen skipped them)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (navClicked.current) return;
      const toBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      const line = 120 + Math.max(0, window.innerHeight - 120 - toBottom);
      let current: SectionId | null = null;
      for (const id of SECTION_IDS) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = id;
      }
      setActive(current);
    };
    const byHand = () => {
      navClicked.current = false;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // pointerdown comes before a nav button's click, so the click locks again right after
    const handEvents = ["wheel", "pointerdown", "keydown"] as const;
    handEvents.forEach((e) => window.addEventListener(e, byHand, { passive: true }));

    return () => {
      window.removeEventListener("scroll", onScroll);
      handEvents.forEach((e) => window.removeEventListener(e, byHand));
    };
  }, []);

  // The card under the mouse learns where the mouse is, for its spotlight (globals.css)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const box = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${e.clientX - box.left}px`);
      card.style.setProperty("--spot-y", `${e.clientY - box.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
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

  const scrollTo = (id: SectionId) => {
    setMenuOpen(false);
    navClicked.current = true;
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  const navItems = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));

  const socials = [
    { href: links.github, icon: "/github.png", label: "GitHub", invert: true },
    { href: links.linkedin, icon: "/linkedin2.png", label: "LinkedIn" },
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
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-[55]"
      />

      {/* Video background (compressed 3 MB loop + poster for instant paint) */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-30" aria-hidden>
        {reduceMotion ? (
          <Image src={asset("/wavy-poster.jpg")} alt="" fill className="object-cover" priority />
        ) : (
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={asset("/wavy-poster.jpg")}
          >
            <source src={asset("/wavy-bg.mp4")} type="video/mp4" />
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
            FS<span className="text-accent">.</span>
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
                    className="absolute left-0 right-0 -bottom-1.5 h-0.5 bg-accent rounded-full"
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
      <section ref={heroRef} className="min-h-[100svh] w-full flex flex-col items-center justify-center pt-20 z-10 text-center">
        <motion.div
          style={reduceMotion ? undefined : { opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="flex flex-col items-center gap-5"
        >
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
              src={asset("/profile4.jpg")}
              alt={`Photo of ${t.name}`}
              width={988}
              height={1123}
              sizes="(min-width: 640px) 256px, 192px"
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>


          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs sm:text-sm text-accent-soft"
          >
            <span className="relative flex w-2 h-2">
              {!reduceMotion && <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />}
              <span className="relative inline-flex w-2 h-2 rounded-full bg-accent" />
            </span>
            {t.openToWork}
          </motion.span>

          <h1 aria-label={t.name} className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
            <RevealName name={t.name} reduceMotion={reduceMotion} />
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 min-h-[1.75rem]" aria-label={t.titles.join(", ")}>
            <span aria-hidden>{typed}</span>
            <motion.span
              aria-hidden
              animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block w-[2px] h-5 bg-accent ml-1 align-middle"
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
                <Image src={asset(s.icon)} alt="" width={22} height={22} className={s.invert ? "invert" : ""} />
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
        </motion.div>
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
                viewport={reveal}
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
                        <span className="flex gap-1">
                          {[skill.icon].flat().map((icon) => (
                            <Image
                              key={icon}
                              src={asset(icon)}
                              alt=""
                              width={16}
                              height={16}
                              className={`w-4 h-4 object-contain ${skill.mono ? "group-hover:invert group-active:invert" : ""}`}
                            />
                          ))}
                        </span>
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
        {/* Pick a technology to light up the projects that use it; the others fade back */}
        <div role="group" aria-label={t.filterLabel} className="flex flex-wrap justify-center gap-2 mb-6">
          {[null, ...projectTechs].map((name) => {
            const on = tech === name;
            return (
              <button
                key={name ?? "all"}
                type="button"
                aria-pressed={on}
                onClick={() => setTech(name)}
                className={`relative rounded-full border px-3 py-1 text-xs transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  on ? "border-accent text-black" : "border-white/20 bg-black/50 text-gray-300 hover:border-white/50 hover:text-white"
                }`}
              >
                {/* the white background slides over to the picked chip */}
                {on && (
                  <motion.span
                    layoutId="tech-filter"
                    transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-accent"
                  />
                )}
                <span className="relative">{name ?? t.allProjects}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={reveal}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
        >
          {projects.map((project, index) => {
            const p = t.projects[project.key];
            const { video } = project;
            const faded = tech !== null && !project.tags.includes(tech);
            const fade = `transition-opacity duration-500 ${faded ? "opacity-25" : ""}`;
            return (
              <motion.article
                key={project.key}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                className={`${cardClass} flex flex-col justify-between ${tech !== null && !faded ? "border-accent/60!" : ""} ${
                  !video ? (aloneInRow.has(project.key) ? "md:col-span-2" : "") : `md:col-span-2 md:grid md:gap-6 ${video.shape === "wide" ? "md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"}`
                }`}
              >
                {video && (
                  // a phone app shows as a phone screen, on a soft backdrop. The others keep the video's own
                  // height (self-start): stretched to a taller text column, the Enlarge button fell below the video
                  <Parallax
                    reduceMotion={reduceMotion}
                    className={`relative mb-5 md:mb-0 ${fade} ${
                      video.shape === "phone"
                        ? "aspect-[4/5] min-h-0 overflow-hidden flex justify-center rounded-lg border border-white/10 bg-gradient-to-b from-accent/15 via-white/5 to-transparent py-3"
                        : "md:self-start"
                    }`}
                  >
                    <ProjectVideo
                      src={video.src}
                      poster={video.poster}
                      label={p.title}
                      enlargeLabel={t.enlarge}
                      reduceMotion={reduceMotion}
                      className={
                        video.shape === "phone"
                          ? "h-full w-auto rounded-2xl shadow-2xl shadow-black/60"
                          : `w-full object-cover rounded-lg ${video.shape === "wide" ? "aspect-[16/10]" : "aspect-square"}`
                      }
                    />
                  </Parallax>
                )}
                <div className={`flex flex-1 flex-col justify-between ${fade}`}>
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
                  {project.stats && (
                    <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                      {project.stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                          <dt className="sr-only">{t.stats[stat.label]}</dt>
                          <dd className="text-2xl font-semibold text-white">
                            <CountUp value={stat.value} suffix={stat.suffix} reduceMotion={reduceMotion} />
                          </dd>
                          <dd aria-hidden className="text-[11px] uppercase tracking-wide text-gray-400">{t.stats[stat.label]}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${pillButton} px-4 py-2 text-sm w-full sm:w-auto group`}
                    >
                      <Image src={asset("/github.png")} alt="" width={14} height={14} />
                      {t.seeCode}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                  )}
                  {project.install && (
                    <a
                      href={project.install}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${solidButton} px-4 py-2 text-sm w-full sm:w-auto group`}
                    >
                      ⬇ {t.install}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </a>
                  )}
                  {project.inProgress && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-sm text-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                      {t.inProgress}
                    </span>
                  )}
                </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </Section>

      {/* ---------- Education ---------- */}
      <Section id="education" title={t.educationTitle}>
        {/* A timeline: a faint line, the bright one drawing itself over it as the page scrolls, and a dot
            per degree — green and pulsing for the one in progress */}
        <div ref={timelineRef} className="relative pl-8">
          <span aria-hidden className="absolute left-3 top-0 bottom-0 w-px bg-white/10" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduceMotion ? 1 : timelineLine }}
            className="absolute left-3 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-accent to-accent/20"
          />
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={reveal}
            className="flex flex-col gap-4"
          >
            {education.map((e) => (
              <motion.li key={e.key} variants={staggerItem} className="relative">
                <span aria-hidden className="absolute -left-5 top-1/2 flex w-3 h-3 -translate-x-1/2 -translate-y-1/2">
                  {!e.to && !reduceMotion && (
                    <span className="absolute inline-flex w-full h-full rounded-full bg-accent opacity-75 animate-ping" />
                  )}
                  <span className={`relative inline-flex w-3 h-3 rounded-full ring-4 ring-black ${e.to ? "bg-white/70" : "bg-accent"}`} />
                </span>
                <motion.div
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
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Section>

      {/* ---------- Contact ---------- */}
      <Section id="contacts" title={t.contactsTitle}>
        {/* The page ends on a big invitation, with the email as its main button */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={reveal}
          className="flex flex-col items-center text-center"
        >
          <motion.p variants={staggerItem} className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {t.contactHeadline}
            <span className="text-accent">.</span>
          </motion.p>
          <motion.p variants={staggerItem} className="mt-4 max-w-xl text-gray-300">
            {t.contactIntro}
          </motion.p>
          <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href={`mailto:${links.email}`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 sm:px-8 sm:py-5 text-base sm:text-xl font-semibold text-black shadow-[0_0_48px_-12px_var(--accent)] transition-colors hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {links.email}
            </motion.a>
            <CopyButton value={links.email} label={t.copy} doneLabel={t.copied} className="px-5 py-3 text-sm" />
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={reveal}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          <motion.a
            variants={staggerItem}
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardClass} flex items-center gap-4`}
          >
            <span className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center">
              <Image src={asset("/linkedin2.png")} alt="" width={20} height={20} />
            </span>
            <div>
              <h3 className="font-semibold">LinkedIn</h3>
              <p className="text-accent">{t.name}</p>
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
              <Image src={asset("/github.png")} alt="" width={20} height={20} className="invert" />
            </span>
            <div>
              <h3 className="font-semibold">GitHub</h3>
              <p className="text-accent">{links.githubUsername}</p>
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
