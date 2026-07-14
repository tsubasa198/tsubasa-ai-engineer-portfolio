"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { projects, skills, workflowSteps } from "./portfolio-data";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "workflow", label: "WORKFLOW" },
  { id: "skills", label: "SKILLS" },
  { id: "works", label: "WORKS" },
  { id: "contact", label: "CONTACT" },
];

const galleryCards = [
  { id: "g01", projectId: "project-01", role: "featured", x: 22, y: -16, z: 80, r: -6, s: 1.05, finalX: -17, finalY: -18, sx: 0, sy: 0, sz: -520, ss: .42, enter: .08 },
  { id: "g02", projectId: "project-02", role: "detail", x: -30, y: 0, z: -90, r: 7, s: .78, finalX: 17, finalY: -18, sx: 0, sy: 0, sz: -620, ss: .38, enter: .18 },
  { id: "g03", projectId: "project-03", role: "browser", x: -22, y: 22, z: -180, r: 5, s: .66, finalX: -17, finalY: 18, sx: 0, sy: 0, sz: -720, ss: .34, enter: .26 },
  { id: "g04", projectId: "project-04", role: "image", x: 25, y: 24, z: -230, r: -9, s: .7, finalX: 17, finalY: 18, sx: 0, sy: 0, sz: -680, ss: .36, enter: .32 },
  { id: "g05", projectId: "project-05", role: "detail", x: -5, y: -34, z: -310, r: 8, s: .5, finalX: 0, finalY: 0, sx: 0, sy: 0, sz: -740, ss: .32, enter: .38 },
  { id: "g06", projectId: "project-02", role: "image", x: 49, y: 0, z: -420, r: -5, s: .46, finalX: 0, finalY: 0, sx: 0, sy: 0, sz: -800, ss: .3, enter: .43 },
  { id: "g07", projectId: "project-03", role: "browser", x: -48, y: -1, z: -520, r: 11, s: .43, finalX: 0, finalY: 0, sx: 0, sy: 0, sz: -860, ss: .28, enter: .47 },
  { id: "g08", projectId: "project-04", role: "image", x: 9, y: 34, z: -610, r: -6, s: .38, finalX: 0, finalY: 0, sx: 0, sy: 0, sz: -900, ss: .26, enter: .52 },
  { id: "g09", projectId: "project-05", role: "image", x: -61, y: 34, z: -700, r: 6, s: .34, finalX: 0, finalY: 0, sx: 0, sy: 0, sz: -940, ss: .24, enter: .56 },
  { id: "g10", projectId: "project-01", role: "detail", x: 62, y: 35, z: -760, r: -8, s: .32, finalX: 0, finalY: 0, sx: 0, sy: 0, sz: -980, ss: .22, enter: .6 },
] as const;

const featuredProject = projects.find((project) => project.featured) ?? projects[0];
const featuredCardId = galleryCards.find((card) => card.projectId === featuredProject.id)?.id ?? galleryCards[0].id;

function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const panel = menuPanelRef.current;
    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = panel?.querySelectorAll<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])");
    focusable?.[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#hero" aria-label="トップへ戻る"><span>TSUBASA</span><small>AI ENGINEER / FDE</small></a>
      <div className="header-actions"><span className="header-label">PORTFOLIO / 2026</span><button ref={menuButtonRef} className={`menu-button ${open ? "is-open" : ""}`} onClick={() => setOpen((value) => !value)} aria-label={open ? "メニューを閉じる" : "メニューを開く"} aria-expanded={open} aria-controls="site-menu"><span /><span /></button></div>
      <nav ref={menuPanelRef} id="site-menu" className={`menu-panel ${open ? "is-open" : ""}`} aria-hidden={!open} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><p className="eyebrow">INDEX</p>{navItems.map((item, index) => <a key={item.id} href={`#${item.id}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</a>)}<p className="menu-panel-note">現場の「こうだったらいいのに」を、プロダクトとして実現する。</p></nav>
    </header>
  );
}

function ScrollProgress({ progress }: { progress: number }) {
  return <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>;
}

function ScrollDial({ progress, isScrolling }: { progress: number; isScrolling: boolean }) {
  const dialRef = useRef<HTMLDivElement | null>(null);
  const scrollingRef = useRef(isScrolling);

  useEffect(() => {
    scrollingRef.current = isScrolling;
  }, [isScrolling]);

  useEffect(() => {
    let rotation = 0;
    let previous = performance.now();
    let frame = 0;
    const tick = (time: number) => {
      const delta = Math.min(time - previous, 48);
      previous = time;
      rotation += delta * (scrollingRef.current ? 0.085 : 0.012);
      dialRef.current?.style.setProperty("--dial-rotation", `${rotation}deg`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div ref={dialRef} className={`scroll-dial ${isScrolling ? "is-scrolling" : ""}`} style={{ "--dial-progress": progress } as CSSProperties} aria-hidden="true"><div className="scroll-dial-ring dial-ring-outer" /><div className="scroll-dial-ring dial-ring-ticks" /><div className="scroll-dial-core"><span>AI</span></div><i className="scroll-dial-marker" /></div>;
}

function ScrollGuide() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    const showTimer = window.setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 800);
    const hideTimer = window.setTimeout(() => setVisible(false), 3800);
    const dismiss = () => {
      dismissed = true;
      setVisible(false);
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("scroll", dismiss);
    };
    window.addEventListener("scroll", dismiss, { passive: true, once: true });
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("scroll", dismiss);
    };
  }, []);

  return <div className={`scroll-guide ${visible ? "is-visible" : ""}`} aria-hidden="true"><span>SCROLL</span><i><b /></i></div>;
}

function AbstractCore({ className = "" }: { className?: string }) {
  return <div className={`abstract-core ${className}`} aria-hidden="true"><span className="core-orbit orbit-a" /><span className="core-orbit orbit-b" /><span className="core-orbit orbit-c" /><span className="core-node node-main" /><span className="core-node node-a" /><span className="core-node node-b" /><span className="core-line line-a" /><span className="core-line line-b" /></div>;
}

function HeroSection() {
  const [videoEnabled, setVideoEnabled] = useState(false);
  useEffect(() => { const media = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setVideoEnabled(!media.matches && window.innerWidth > 767); update(); media.addEventListener("change", update); window.addEventListener("resize", update); return () => { media.removeEventListener("change", update); window.removeEventListener("resize", update); }; }, []);
  return <section id="hero" className="motion-stage-section hero-motion"><div className="motion-stage hero-stage"><video className="hero-video" autoPlay={videoEnabled} muted loop playsInline preload={videoEnabled ? "metadata" : "none"} poster="/assets/hero/0713-poster.jpg" tabIndex={-1} aria-hidden="true"><source src="/assets/hero/0713.mp4" type="video/mp4" /></video><div className="hero-video-overlay" aria-hidden="true" /><div className="hero-grid" aria-hidden="true" /><div className="hero-copy"><p className="eyebrow">AI ENGINEER / FDE</p><h1 aria-label="まだ言葉になっていない現場の課題を、AIで使われる仕組みに変える。"><span className="hero-line" aria-hidden="true"><span>まだ言葉になっていない</span></span><span className="hero-line" aria-hidden="true"><span>現場の課題を、</span></span><span className="hero-line hero-line-strong" aria-hidden="true"><span>AIで使われる仕組みに変える。</span></span></h1><p className="hero-lead">現場に入り込み、業務と判断の流れを理解する。<br />表面的な要望だけでなく、見過ごされていた不便まで拾い上げ、<br />設計・実装・改善まで一貫して担います。</p></div><div className="hero-core-wrap"><AbstractCore className="hero-core" /><span className="hero-core-label">HUMAN / AI / PRODUCT</span></div><div className="hero-bridge-copy"><p className="eyebrow">THE STARTING POINT</p><p>問いをほどくと、<br /><strong>つくるべきものが見えてくる。</strong></p></div><div className="hero-footer-note"><span>SCROLL TO EXPLORE</span><i /></div><ScrollGuide /></div></section>;
}

function AboutSection() {
  return <section id="about" className="motion-stage-section about-motion"><div className="motion-stage about-stage"><div className="about-grid" aria-hidden="true" /><div className="about-bridge-core"><AbstractCore className="bridge-core" /></div><div className="about-layout"><div className="about-visual"><div className="about-visual-glow" aria-hidden="true" /><div className="about-visual-line" aria-hidden="true" /><Image className="about-portrait" src="/assets/tsubasa-avatar-cutout.png" alt="AIエンジニア Tsubasaのイラスト" width={1024} height={1536} sizes="(max-width: 767px) 74vw, 38vw" priority /><span className="about-visual-node node-one" aria-hidden="true" /><span className="about-visual-node node-two" aria-hidden="true" /><span className="about-visual-caption">Tsubasa / AI Engineer / FDE</span></div><div className="about-copy"><p className="eyebrow">ABOUT TSUBASA</p><h2>現場の中から課題を見つけ、<br /><strong>使われ続ける仕組みを構築する。</strong></h2><p>生成AIコースの立ち上げ・運営、企業向けのAI導入支援、業務自動化、Webシステム開発に取り組んできました。</p><p>技術ありきでシステムをつくるのではなく、まずは現場の業務や会話を理解し、課題・制約・判断ポイントを整理することを大切にしています。</p><p>表面的な要望だけでなく、現場自身もまだ言葉にできていない不便まで見つけ出す。</p><p>人とAIの役割を設計し、素早く形にして、実際に使いながら改善する。</p><p>構想や開発だけで終わらせず、現場に定着し、使われ続けるところまでをプロダクト開発だと考えています。</p><div className="about-tags"><span>業務分解</span><span>AI導入支援</span><span>業務自動化</span><span>Webシステム開発</span></div></div></div><div className="about-to-workflow"><span>THE NEXT STEP</span><i /></div></div></section>;
}

function WorkflowCard({ step, active = false, cardRef }: { step: (typeof workflowSteps)[number]; active?: boolean; cardRef?: (node: HTMLElement | null) => void }) {
  return <article ref={cardRef} className={`workflow-card workflow-${step.accent} ${active ? "is-active" : ""}`} data-workflow-index={step.number} aria-current={active ? "step" : undefined}><div className="workflow-card-top"><span>{step.number}</span><i /></div><div className="workflow-graphic" aria-hidden="true"><span className="graphic-ring ring-one" /><span className="graphic-ring ring-two" /><span className="graphic-dot" /><span className="graphic-stem" /><span className="graphic-mini-dot dot-one" /><span className="graphic-mini-dot dot-two" /></div><div className="workflow-card-copy"><h3>{step.title}</h3><p>{step.description}</p></div><div className="workflow-accent" /></article>;
}

function WorkflowSection() {
  const [activeStep, setActiveStep] = useState("01");
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const number = visible?.target.getAttribute("data-workflow-index");
      if (number) setActiveStep(number);
    }, { rootMargin: "-32% 0px -48% 0px", threshold: [0.2, 0.5, 0.8] });
    workflowSteps.forEach((step) => {
      const card = cardRefs.current[step.number];
      if (card) observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);

  return <section id="workflow" className="motion-stage-section workflow-motion"><div className="motion-stage workflow-stage"><div className="workflow-grid" aria-hidden="true" /><div className="workflow-heading"><p className="eyebrow">HOW I WORK</p><h2>現場に入り込み、<br /><strong>課題の発見から実装まで。</strong></h2><p className="workflow-support">ヒアリングで見えない課題を捉え、業務を分解し、使われる仕組みへ落とし込みます。</p></div><div className="workflow-track"><div className="workflow-track-line" aria-hidden="true" /><div className="workflow-connector connector-1" aria-hidden="true" /><div className="workflow-connector connector-2" aria-hidden="true" /><div className="workflow-connector connector-3" aria-hidden="true" /><div className="workflow-moving-dot" aria-hidden="true" />{workflowSteps.map((step) => <WorkflowCard key={step.number} step={step} active={activeStep === step.number} cardRef={(node) => { cardRefs.current[step.number] = node; }} />)}</div><p className="workflow-complete">ヒアリングから実装まで、現場のそばで一貫して伴走する。</p><div className="workflow-to-skills" aria-hidden="true"><span /><i /><b /></div></div></section>;
}

function SkillsSection() {
  return <section id="skills" className="motion-stage-section skills-motion"><div className="motion-stage skills-stage"><div className="skills-heading"><p className="eyebrow">CAPABILITIES</p><h2>課題を解決する、<br /><strong>プロダクトを。</strong></h2><p className="skills-support">業務設計、AI、自動化、Web開発。必要な技術を組み合わせ、現場で機能する形までつくります。</p></div><div className="skills-network" aria-hidden="true"><span className="network-ring ring-1" /><span className="network-ring ring-2" /><span className="network-ring ring-3" /><span className="network-node node-1" /><span className="network-node node-2" /><span className="network-node node-3" /><span className="network-node node-4" /><span className="network-node node-5" /><span className="network-line n-line-1" /><span className="network-line n-line-2" /><span className="network-line n-line-3" /><span className="network-line n-line-4" /></div><div className="skills-number" aria-hidden="true">01</div><div className="skills-panels">{skills.map((skill, index) => <div key={skill} className="skill-panel"><p>0{index + 1} / CAPABILITY</p><h3>{skill}</h3><span>課題と技術をつなぎ、実装まで進める。</span></div>)}</div><div className="skills-to-works"><span>FROM SYSTEM TO WORKS</span><i /></div></div></section>;
}

function WorksTransitionSection() {
  return <section id="works" className="motion-stage-section works-transition-motion"><div className="motion-stage works-transition-stage"><div className="works-transition-grid" aria-hidden="true" /><div className="works-transition-heading"><p className="eyebrow">SELECTED WORKS</p><h2 aria-label="現場の不便を、使われるプロダクトへ。"><span className="works-line" aria-hidden="true">現場の不便を、</span><span className="works-line works-line-strong" aria-hidden="true">使われるプロダクトへ。</span></h2></div><div className="works-seed" aria-hidden="true"><span /><span /><span /><span /></div><div className="gallery-camera">{galleryCards.map((card) => <GalleryCard key={card.id} card={card} />)}</div><div className="works-transition-meta"><span>WORKS</span><strong>04</strong></div></div></section>;
}

function GalleryCard({ card }: { card: (typeof galleryCards)[number] }) {
  const project = projects.find((item) => item.id === card.projectId) ?? projects[0];
  const isMajor = Number(card.id.slice(1)) <= 4;
  return <Link href={`/works/${project.slug}`} className={`gallery-card gallery-role-${card.role} ${isMajor ? "major-work-card" : "support-work-card"}`} data-gallery-card={card.id} data-featured={card.id === featuredCardId ? "true" : undefined} style={{ "--gx": card.x, "--gy": card.y, "--gz": card.z, "--gr": card.r, "--gs": card.s } as CSSProperties} aria-label={`${project.title}の詳細を見る`}><div className="gallery-card-image"><Image src={project.image} alt={`${project.title}のサムネイル`} width={1672} height={941} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 44vw, 44vw" unoptimized /></div><div className="gallery-card-info"><span>{project.category}</span><strong>{project.title}</strong><small>{project.stack}</small><span className="gallery-card-link-label">詳しく見る ↗</span></div></Link>;
}

function ContactSection() {
  return <section id="contact" className="contact-section content-section"><div className="section-kicker"><span>08</span><span>CONTACT</span></div><AbstractCore className="contact-core" /><div className="contact-copy"><p className="eyebrow">LET&apos;S MAKE IT USEFUL</p><h2>その「こうだったらいいのに」を、<br /><strong>聞かせてください。</strong></h2><p>まだ輪郭のない相談でも大丈夫です。課題を一緒に整理し、最初の一歩をつくります。</p><a href="mailto:hello@example.com" className="contact-button">お問い合わせはこちら <span>↗</span></a></div></section>;
}

export default function Home() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => { let stopTimer = 0; const onScroll = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0); setIsScrolling(true); window.clearTimeout(stopTimer); stopTimer = window.setTimeout(() => setIsScrolling(false), 180); }; onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => { window.clearTimeout(stopTimer); window.removeEventListener("scroll", onScroll); }; }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const responsive = gsap.matchMedia();
    let isMobile = false;
    let isTablet = false;
    responsive.add({ mobile: "(max-width: 767px)", tablet: "(min-width: 768px) and (max-width: 1023px)", desktop: "(min-width: 1024px)" }, ({ conditions }) => {
      isMobile = Boolean(conditions?.mobile);
      isTablet = Boolean(conditions?.tablet);
    });
    const lenis = new Lenis({ lerp: isMobile ? .12 : .08, smoothWheel: !isMobile, syncTouch: isMobile });
    const raf = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    let snapTimer = 0;
    let onUserWheel: (() => void) | undefined;
    let onLenisScroll: (() => void) | undefined;
    const ctx = gsap.context(() => {
      const snap = { snapTo: "labelsDirectional" as const, delay: isTablet ? .18 : .12, duration: { min: isTablet ? .2 : .25, max: isTablet ? .5 : .65 }, ease: "power2.inOut", inertia: false };
      const snapTriggers: ReturnType<typeof ScrollTrigger.create>[] = [];
      const pin = (section: string, stage: string, animation: gsap.core.Timeline, snapEnabled = false) => { const trigger = ScrollTrigger.create({ trigger: section, start: "top top", end: "bottom bottom", pin: stage, scrub: isTablet ? .75 : .9, animation, ...(!isMobile && snapEnabled ? { snap } : {}), invalidateOnRefresh: true }); if (!isMobile && snapEnabled) snapTriggers.push(trigger); return trigger; };
      let hasUserScrolled = false;
      let isLenisSnapping = false;
      let lastObservedScroll = window.scrollY;
      let scrollDirection = 1;
      const clearSnap = () => { window.clearTimeout(snapTimer); if (isLenisSnapping) lenis.scrollTo(window.scrollY, { immediate: true }); isLenisSnapping = false; };
      const snapLenisToLabel = () => {
        if (!hasUserScrolled || isLenisSnapping) return;
        const trigger = snapTriggers.find((item) => item.isActive && item.animation);
        if (!trigger?.animation) return;
        const animation = trigger.animation as gsap.core.Timeline;
        const duration = animation.duration();
        const currentTime = duration * animation.totalProgress();
        const labelTimes = Object.values(animation.labels).sort((a, b) => a - b);
        const direction = scrollDirection;
        const epsilon = duration * .025;
        const nextLabel = direction >= 0 ? labelTimes.find((time) => time > currentTime + epsilon) : [...labelTimes].reverse().find((time) => time < currentTime - epsilon);
        const targetTime = nextLabel ?? (direction >= 0 ? labelTimes[labelTimes.length - 1] : labelTimes[0]);
        if (targetTime === undefined) return;
        const targetProgress = targetTime / duration;
        const targetScroll = trigger.start + (trigger.end - trigger.start) * targetProgress;
        if (Math.abs(targetScroll - window.scrollY) < 10) return;
        isLenisSnapping = true;
        lenis.scrollTo(targetScroll, { duration: isMobile ? .28 : .55, easing: (value) => 1 - Math.pow(1 - value, 3), onComplete: () => { isLenisSnapping = false; ScrollTrigger.update(); } });
        window.setTimeout(() => { isLenisSnapping = false; }, isMobile ? 550 : 950);
      };
      onLenisScroll = () => { const currentScroll = window.scrollY; if (Math.abs(currentScroll - lastObservedScroll) > 1) scrollDirection = currentScroll >= lastObservedScroll ? 1 : -1; lastObservedScroll = currentScroll; ScrollTrigger.update(); if (!hasUserScrolled || isLenisSnapping) return; window.clearTimeout(snapTimer); snapTimer = window.setTimeout(snapLenisToLabel, isMobile ? 190 : 145); };
      onUserWheel = () => { hasUserScrolled = true; clearSnap(); };
      lenis.on("scroll", onLenisScroll);
      window.addEventListener("wheel", onUserWheel, { passive: true });
      window.addEventListener("touchstart", onUserWheel, { passive: true });

      if (isMobile) {
        gsap.set(".hero-motion .hero-copy", { opacity: 1, y: 0 });
        gsap.set(".hero-motion .hero-copy .eyebrow, .hero-motion .hero-copy .hero-lead, .hero-motion .hero-copy .hero-line > span", { opacity: 1, y: 0 });
        gsap.set(".hero-motion .hero-core-wrap", { opacity: .72, scale: .84 });
      } else {
        gsap.set(".hero-motion .hero-copy", { opacity: 0, y: 24 });
        gsap.set(".hero-motion .hero-copy .eyebrow, .hero-motion .hero-copy .hero-lead", { opacity: 0, y: 15 });
        gsap.set(".hero-motion .hero-copy .hero-line > span", { opacity: 0, y: "105%" });
        gsap.set(".hero-motion .hero-core-wrap", { opacity: .08, scale: .88 });
        const hero = gsap.timeline().addLabel("video", 0).to(".hero-motion .hero-video-overlay", { opacity: .52, duration: .2 }, .2).addLabel("label-visible", .3).to(".hero-motion .hero-copy", { opacity: 1, y: 0, duration: .01 }, .29).to(".hero-motion .hero-copy .eyebrow", { opacity: 1, y: 0, letterSpacing: ".22em", duration: .14 }, .3).to(".hero-motion .hero-copy .hero-line > span", { opacity: 1, y: "0%", duration: .18, stagger: .08, ease: "power3.out" }, .38).addLabel("headline-visible", .74).to(".hero-motion .hero-copy .hero-lead", { opacity: 1, y: 0, duration: .17 }, .58).addLabel("hero-complete", .82).to(".hero-motion .hero-core-wrap", { opacity: 1, scale: 1, duration: .35 }, .64).to(".hero-motion .hero-core", { x: "-18vw", y: "8vh", scale: .75, duration: .55 }, .72).to(".hero-motion .core-orbit", { rotation: "+=55", scale: 1.18, stagger: .05, duration: .55 }, .72).addLabel("hero-exit", .9).to(".hero-motion .hero-copy", { x: "-8vw", opacity: 0, duration: .2 }, .9).fromTo(".hero-motion .hero-bridge-copy", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .18 }, .94);
        pin(".hero-motion", ".hero-stage", hero, true);
      }

      if (isMobile) {
        gsap.set(".about-motion .about-copy", { opacity: 1, y: 0 });
        gsap.set(".about-motion .about-visual-line", { scaleY: 1 });
      } else {
        const about = gsap.timeline().to(".about-motion .bridge-core", { x: "-12vw", y: "-8vh", scale: .72, duration: .35 }, 0).to(".about-motion .bridge-core .core-orbit", { rotation: "+=70", stagger: .06, duration: .5 }, 0).fromTo(".about-motion .about-copy", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .25 }, .22).fromTo(".about-motion .about-visual-line", { scaleY: 0 }, { scaleY: 1, duration: .2 }, .42).to(".about-motion .bridge-core .node-a", { x: "-10vw", y: "-7vh", duration: .22 }, .45).to(".about-motion .bridge-core .node-b", { x: "10vw", y: "7vh", duration: .22 }, .45);
        pin(".about-motion", ".about-stage", about);
      }

      const workflowCards = gsap.utils.toArray<HTMLElement>(".workflow-motion .workflow-card");
      const workflowRings = workflowCards.map((card) => gsap.utils.toArray<HTMLElement>(".graphic-ring", card));
      const workflowDots = workflowCards.map((card) => card.querySelector<HTMLElement>(".graphic-dot"));
      if (isMobile) {
        gsap.set(workflowCards, { opacity: 1, scale: 1, y: 0 });
        gsap.set(workflowRings.flat(), { scale: 1, opacity: 1, transformOrigin: "center center" });
        gsap.set(workflowDots.filter(Boolean), { opacity: 1, scale: 1, transformOrigin: "center center" });
      } else {
        const workflowTl = gsap.timeline();
        workflowTl.addLabel("step-01", .1).addLabel("step-02", .38).addLabel("step-03", .69).addLabel("step-04", 1.02).addLabel("workflow-complete", 1.36);
        gsap.set(workflowCards, { opacity: .2, scale: .94, y: 18 });
        gsap.set(workflowCards[0], { opacity: 1, scale: 1.035, y: 0 });
        gsap.set(workflowRings.flat(), { scale: .96, opacity: .42, transformOrigin: "center center" });
        gsap.set(workflowDots.filter(Boolean), { opacity: 0, scale: .72, transformOrigin: "center center" });
        gsap.set(workflowRings[0], { scale: 1.12, opacity: 1 });
        gsap.set(workflowDots[0], { opacity: 1, scale: 1.2 });
        gsap.set(".workflow-motion .workflow-connector", { scaleX: 0, transformOrigin: "left center" });
        workflowTl.to(".workflow-motion .connector-1", { scaleX: 1, duration: .14 }, .2).to(workflowRings[0], { scale: 1, opacity: .42, duration: .12 }, .28).to(workflowDots[0], { opacity: 0, scale: .72, duration: .12 }, .28).to(workflowCards[0], { opacity: .22, scale: .96, duration: .11 }, .32).to(workflowCards[1], { opacity: 1, scale: 1.035, y: 0, duration: .15 }, .32).to(workflowRings[1], { scale: 1.12, opacity: 1, duration: .15 }, .34).to(workflowDots[1], { opacity: 1, scale: 1.2, duration: .12 }, .36).to(".workflow-motion .connector-2", { scaleX: 1, duration: .14 }, .51).to(workflowRings[1], { scale: 1, opacity: .42, duration: .12 }, .59).to(workflowDots[1], { opacity: 0, scale: .72, duration: .12 }, .59).to(workflowCards[1], { opacity: .22, scale: .96, duration: .11 }, .63).to(workflowCards[2], { opacity: 1, scale: 1.035, y: 0, duration: .15 }, .63).to(workflowRings[2], { scale: 1.12, opacity: 1, duration: .15 }, .65).to(workflowDots[2], { opacity: 1, scale: 1.2, duration: .12 }, .67).to(".workflow-motion .connector-3", { scaleX: 1, duration: .14 }, .82).to(workflowRings[2], { scale: 1, opacity: .42, duration: .12 }, .9).to(workflowDots[2], { opacity: 0, scale: .72, duration: .12 }, .9).to(workflowCards[2], { opacity: .22, scale: .96, duration: .11 }, .94).to(workflowCards[3], { opacity: 1, scale: 1.035, y: 0, duration: .15 }, .94).to(workflowRings[3], { scale: 1.12, opacity: 1, duration: .15 }, .96).to(workflowDots[3], { opacity: 1, scale: 1.2, duration: .12 }, .98).to(workflowCards, { opacity: 1, scale: 1, y: 0, duration: .18, stagger: .03 }, 1.22).to(workflowCards[3], { opacity: 1, duration: .08 }, 1.4).fromTo(".workflow-motion .workflow-complete", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .16 }, 1.34).to(".workflow-motion .workflow-to-skills", { opacity: 1, scale: 1, duration: .18 }, 1.42);
        pin(".workflow-motion", ".workflow-stage", workflowTl, true);
      }

      const skillPanels = gsap.utils.toArray<HTMLElement>(".skills-motion .skill-panel");
      if (isMobile) {
        gsap.set(skillPanels, { opacity: 1, y: 0, scale: 1 });
      } else {
        const skillsTl = gsap.timeline();
        gsap.set(skillPanels, { opacity: 0, y: 25, scale: .92 });
        gsap.set(skillPanels[0], { opacity: 1, y: 0, scale: 1 });
        skillPanels.forEach((panel, index) => { const start = index / skillPanels.length; const others = skillPanels.filter((_, i) => i !== index); skillsTl.addLabel(`capability-${String(index + 1).padStart(2, "0")}`, start + .08).to(".skills-motion .skills-number", { textContent: String(index + 1).padStart(2, "0"), duration: .01 }, start).to(others, { opacity: 0, y: -15, scale: .92, duration: .04 }, start).to(panel, { opacity: 1, y: 0, scale: 1, duration: .09 }, start + .04).to(`.skills-motion .network-ring:nth-of-type(${(index % 3) + 1})`, { rotation: "+=55", scale: 1.12 + index * .03, duration: .16 }, start); });
        skillsTl.addLabel("skills-complete", .9);
        skillsTl.to(".skills-motion .skills-network", { scale: .58, x: 0, y: "-18vh", duration: .2 }, .88).to(".skills-motion .skills-heading", { opacity: 0, y: "-2vh", duration: .16 }, .88).to(".skills-motion .skills-to-works", { opacity: 1, y: 0, duration: .16 }, .92);
        pin(".skills-motion", ".skills-stage", skillsTl, true);
      }

      const galleryCardsEls = gsap.utils.toArray<HTMLElement>("[data-gallery-card]");
      const supportCardsEls = galleryCardsEls.filter((element) => element.classList.contains("support-work-card"));
      if (isMobile) {
        gsap.set(galleryCardsEls, { opacity: 1, visibility: "visible", clearProps: "transform" });
        gsap.set(".works-transition-motion .works-transition-heading", { opacity: 1 });
      } else {
        const galleryTl = gsap.timeline();
        galleryTl.addLabel("works-heading", 0).addLabel("heading-split", .2).addLabel("projects-appear", .34).addLabel("projects-spread", .62).addLabel("projects-aligned", .8);
        gsap.set(galleryCardsEls, { opacity: 0, visibility: "hidden" });
        gsap.set(".works-transition-motion .works-line", { opacity: 1, y: 0 });
        gsap.set(".works-transition-motion .works-transition-heading", { opacity: 1 });
        gsap.set(".works-transition-motion .works-seed", { opacity: 0, scale: .72 });
        galleryCards.forEach((card) => { const element = root.querySelector(`[data-gallery-card="${card.id}"]`); if (!element) return; const revealAt = .34 + card.enter * .6; gsap.set(element, { "--gx": card.sx, "--gy": card.sy, "--gz": card.sz, "--gs": card.ss, borderRadius: "18px" }); galleryTl.set(element, { visibility: "visible" }, revealAt).to(element, { opacity: card.role === "image" ? .74 : .88, "--gx": card.x, "--gy": card.y, "--gz": card.z, "--gr": card.r, "--gs": card.s, duration: .18, ease: "power2.out" }, revealAt); });
        galleryTl.to(".works-transition-motion .works-line:first-child", { y: "-19vh", x: "-2vw", opacity: .08, duration: .2, ease: "power3.inOut" }, .2).to(".works-transition-motion .works-line-strong", { y: "19vh", x: "2vw", opacity: .08, duration: .2, ease: "power3.inOut" }, .2).to(".works-transition-motion .works-transition-heading .eyebrow", { opacity: 0, duration: .12 }, .23).to(".works-transition-motion .works-seed", { opacity: .7, scale: 1.2, rotation: 90, duration: .18 }, .31).to(".works-transition-motion .gallery-camera", { x: "-2vw", y: "-2vh", scale: 1.06, duration: .26, ease: "power2.inOut" }, .62).to(supportCardsEls, { opacity: 0, visibility: "hidden", "--gz": -980, "--gs": .24, duration: .2, stagger: .015, ease: "power2.in" }, .72);
        galleryCards.slice(0, 4).forEach((card, index) => { const element = root.querySelector(`[data-gallery-card="${card.id}"]`); if (!element) return; const finalScale = isTablet ? .74 : .82; const gapX = Math.min(32, window.innerWidth * .02); const gapY = Math.min(28, window.innerHeight * .035); const finalX = Math.sign(card.finalX) * ((element.offsetWidth * finalScale + gapX) / 2 / window.innerWidth * 100); const finalY = Math.sign(card.finalY) * ((element.offsetHeight * finalScale + gapY) / 2 / window.innerHeight * 100); galleryTl.to(element, { "--gx": finalX, "--gy": finalY, "--gz": 0, "--gr": 0, "--gs": finalScale, opacity: 1, borderRadius: "14px", duration: .24, ease: "power3.inOut" }, .78 + index * .035); });
        galleryTl.to(".works-transition-motion .gallery-camera", { x: 0, y: 0, scale: 1, duration: .24, ease: "power2.inOut" }, .78).to(".works-transition-motion .works-transition-heading", { opacity: 0, duration: .16 }, .8).to(".works-transition-motion .works-transition-note, .works-transition-motion .works-transition-meta", { opacity: 0, duration: .1 }, .82);
        pin(".works-transition-motion", ".works-transition-stage", galleryTl, true);
      }
    }, root);
    ScrollTrigger.refresh();
    return () => { window.clearTimeout(snapTimer); gsap.ticker.remove(raf); if (onUserWheel) { window.removeEventListener("wheel", onUserWheel); window.removeEventListener("touchstart", onUserWheel); } if (onLenisScroll) lenis.off("scroll", onLenisScroll); lenis.destroy(); ctx.revert(); responsive.revert(); };
  }, []);

  return <main ref={rootRef} className="animated-portfolio"><Header /><ScrollProgress progress={progress} /><ScrollDial progress={progress} isScrolling={isScrolling} /><HeroSection /><AboutSection /><WorkflowSection /><SkillsSection /><WorksTransitionSection /><ContactSection /><footer className="site-footer"><span>Tsubasa&apos;s Portfolio</span><span>AI ENGINEER / PRODUCT BUILDER</span><span>© 2026 Tsubasa</span></footer></main>;
}
