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

type PcTier = "large" | "standard" | "compact" | "other";

type ViewportProfile = {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  pcTier: PcTier;
};

function getViewportProfile(): ViewportProfile {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isLandscapeMobile = width >= 768 && width <= 1023 && height <= 600;
  const isCompact = height <= 900 || (width >= 1280 && width <= 1439);
  const pcTier: PcTier = isCompact
    ? "compact"
    : width >= 1800 && height >= 901
      ? "large"
      : width >= 1440 && width <= 1799 && height >= 901
        ? "standard"
        : "other";

  return {
    width,
    height,
    isMobile: width <= 767 || isLandscapeMobile,
    isTablet: width >= 768 && width <= 1279 && !isLandscapeMobile,
    pcTier,
  };
}

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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playAttemptsRef = useRef(0);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/assets/hero/0713.mp4");
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => { const media = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => { const touchLandscape = window.innerWidth <= 1023 && window.innerHeight <= 600; const touchHero = window.innerWidth <= 767 || touchLandscape; const useMobileVideo = touchHero; setVideoSrc(useMobileVideo ? "/assets/hero/0713-mobile.mp4" : "/assets/hero/0713.mp4"); setVideoEnabled(!media.matches && (window.innerWidth >= 1024 || touchHero)); }; update(); media.addEventListener("change", update); window.addEventListener("resize", update); return () => { media.removeEventListener("change", update); window.removeEventListener("resize", update); }; }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoEnabled) return;
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.load();
  }, [videoEnabled, videoSrc]);
  useEffect(() => {
    playAttemptsRef.current = 0;
    const video = videoRef.current;
    if (!video || !videoEnabled) return;
    let cancelled = false;
    const tryPlay = (isRetry = false) => {
      if (cancelled || playAttemptsRef.current >= (isRetry ? 2 : 1)) return;
      playAttemptsRef.current += 1;
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      void video.play().then(() => {
        if (!cancelled) setVideoReady(true);
      }).catch(() => {
        if (!cancelled) setVideoReady(false);
      });
    };
    const retryAfterGesture = () => {
      if (playAttemptsRef.current >= 2) return;
      tryPlay(true);
      window.removeEventListener("pointerdown", retryAfterGesture);
    };
    const playFromEvent = () => tryPlay();
    const onPlaying = () => setVideoReady(true);
    const onError = () => setVideoReady(false);
    video.addEventListener("loadeddata", playFromEvent, { once: true });
    video.addEventListener("canplay", playFromEvent, { once: true });
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    window.addEventListener("pointerdown", retryAfterGesture, { once: true, passive: true });
    if (video.readyState >= 2) tryPlay();
    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", playFromEvent);
      video.removeEventListener("canplay", playFromEvent);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      window.removeEventListener("pointerdown", retryAfterGesture);
    };
  }, [videoEnabled, videoSrc]);
  return <section id="hero" className="motion-stage-section hero-motion"><div className="motion-stage hero-stage"><video ref={videoRef} className={`hero-video ${videoReady ? "is-ready" : ""}`} autoPlay={videoEnabled} muted loop playsInline preload={videoEnabled ? "auto" : "none"} poster="/assets/hero/0713-poster.jpg" tabIndex={-1} aria-hidden="true"><source src={videoSrc} type="video/mp4" /></video><div className="hero-video-overlay" aria-hidden="true" /><div className="hero-grid" aria-hidden="true" /><div className="hero-copy"><p className="eyebrow">AI ENGINEER / FDE</p><h1 aria-label="まだ言葉になっていない現場の課題を、AIで解決する。"><span className="hero-line" aria-hidden="true"><span>まだ言葉になっていない現場の課題を、</span></span><span className="hero-line hero-line-strong" aria-hidden="true"><span>AIで解決する。</span></span></h1></div><div className="hero-core-wrap"><AbstractCore className="hero-core" /><span className="hero-core-label">HUMAN / AI / PRODUCT</span></div><div className="hero-bridge-copy"><p className="eyebrow">THE STARTING POINT</p><p>問いをほどくと、<br /><strong>つくるべきものが見えてくる。</strong></p></div><div className="hero-footer-note"><span>SCROLL TO EXPLORE</span><i /></div><ScrollGuide /></div></section>;
}

function AboutSection() {
  return <section id="about" className="motion-stage-section about-motion"><div className="motion-stage about-stage"><div className="about-grid" aria-hidden="true" /><div className="about-bridge-core"><AbstractCore className="bridge-core" /></div><div className="about-layout"><div className="about-visual"><div className="about-visual-glow" aria-hidden="true" /><Image className="about-portrait" src="/assets/tsubasa-avatar-cutout.png" alt="AIエンジニア Tsubasaのイラスト" width={1024} height={1536} sizes="(max-width: 767px) 74vw, 38vw" priority /><span className="about-visual-node node-one" aria-hidden="true" /><span className="about-visual-node node-two" aria-hidden="true" /><span className="about-visual-caption">Tsubasa / AI Engineer / FDE</span></div><div className="about-copy"><p className="eyebrow">ABOUT TSUBASA</p><h2>現場の課題から、<br /><strong>使われ続ける仕組みをつくる。</strong></h2><p>生成AIコースの立ち上げ・運営、企業向けのAI導入支援、業務自動化、Webシステム開発に取り組んできました。</p><p>技術ありきで考えるのではなく、まずは現場の業務や会話を理解し、課題・制約・判断ポイントを整理することを大切にしています。</p><p>表面的な要望だけでなく、まだ言葉になっていない不便まで見つけ出し、人とAIの役割を設計して、実際に使える仕組みへ落とし込みます。</p><div className="about-tags"><span>業務分解</span><span>AI導入支援</span><span>業務自動化</span><span>Webシステム開発</span></div></div></div><div className="about-to-workflow"><span>THE NEXT STEP</span><i /></div></div></section>;
}

function WorkflowCard({ step, active = false, cardRef }: { step: (typeof workflowSteps)[number]; active?: boolean; cardRef?: (node: HTMLElement | null) => void }) {
  return <article ref={cardRef} className={`workflow-card workflow-${step.accent} ${active ? "is-active" : ""}`} data-workflow-index={step.number} aria-current={active ? "step" : undefined}><div className="workflow-card-top"><span>{step.number}</span><i /></div><div className="workflow-graphic" aria-hidden="true"><span className="graphic-ring ring-one" /><span className="graphic-ring ring-two" /><span className="graphic-dot" /><span className="graphic-stem" /><span className="graphic-mini-dot dot-one" /><span className="graphic-mini-dot dot-two" /></div><div className="workflow-card-copy"><h3>{step.title}</h3><p>{step.description}</p></div><div className="workflow-accent" /></article>;
}

function WorkflowSection() {
  const [activeStep, setActiveStep] = useState("00");
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

  return <section id="workflow" className="motion-stage-section workflow-motion"><div className="motion-stage workflow-stage"><div className="workflow-grid" aria-hidden="true" /><div className="workflow-heading"><p className="eyebrow">HOW I WORK</p><h2>現場に入り込み、<strong>課題の発見から実装まで。</strong></h2><p className="workflow-support">ヒアリングで見えない課題を捉え、業務を分解し、使われる仕組みへ落とし込みます。</p></div><div className="workflow-track"><div className="workflow-track-line" aria-hidden="true" /><div className="workflow-connector connector-1" aria-hidden="true" /><div className="workflow-connector connector-2" aria-hidden="true" /><div className="workflow-connector connector-3" aria-hidden="true" /><div className="workflow-moving-dot" aria-hidden="true" />{workflowSteps.map((step) => <WorkflowCard key={step.number} step={step} active={activeStep === step.number} cardRef={(node) => { cardRefs.current[step.number] = node; }} />)}</div><p className="workflow-complete">ヒアリングから実装まで、現場のそばで一貫して伴走する。</p><div className="workflow-to-skills" aria-hidden="true"><span /><i /><b /></div></div></section>;
}

function SkillsSection() {
  return <section id="skills" className="motion-stage-section skills-motion"><div className="motion-stage skills-stage"><div className="skills-heading"><p className="eyebrow">CAPABILITIES</p><h2>課題を解決する<strong>プロダクトを。</strong></h2><p className="skills-support">業務設計、AI、自動化、Web開発。必要な技術を組み合わせ、現場で機能する形までつくります。</p></div><div className="skills-network" aria-hidden="true"><span className="network-ring ring-1" /><span className="network-ring ring-2" /><span className="network-ring ring-3" /><span className="network-node node-1" /><span className="network-node node-2" /><span className="network-node node-3" /><span className="network-node node-4" /><span className="network-node node-5" /><span className="network-line n-line-1" /><span className="network-line n-line-2" /><span className="network-line n-line-3" /><span className="network-line n-line-4" /></div><div className="skills-number" aria-hidden="true">01</div><div className="skills-panels">{skills.map((skill, index) => <div key={skill} className="skill-panel"><p>0{index + 1} / CAPABILITY</p><h3>{skill}</h3><span>課題と技術をつなぎ、実装まで進める。</span></div>)}</div><div className="skills-to-works"><span>FROM SYSTEM TO WORKS</span><i /></div></div></section>;
}

function WorksTransitionSection() {
  return <section id="works" className="motion-stage-section works-transition-motion"><div className="motion-stage works-transition-stage"><div className="works-transition-grid" aria-hidden="true" /><div className="works-transition-heading"><p className="eyebrow">SELECTED WORKS</p><h2 aria-label="現場の不便を、使われるプロダクトへ。"><span className="works-line" aria-hidden="true">現場の不便を、</span><span className="works-line works-line-strong" aria-hidden="true">使われるプロダクトへ。</span></h2></div><div className="works-seed" aria-hidden="true"><span /><span /><span /><span /></div><div className="gallery-camera">{galleryCards.map((card) => <GalleryCard key={card.id} card={card} />)}</div></div></section>;
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
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.dataset.motionMode = "reduced";
      return () => { delete root.dataset.motionMode; };
    }
    let disposed = false;
    let activeProfile = getViewportProfile();
    let resizeTimer = 0;
    let rebuildTimer = 0;
    let motionContext: gsap.Context | null = null;
    let pageTriggers: ScrollTrigger[] = [];
    let pageTimelines: gsap.core.Timeline[] = [];
    const lenis = activeProfile.isMobile || activeProfile.isTablet
      ? null
      : new Lenis({ lerp: .08, smoothWheel: true, syncTouch: false });
    const raf = (time: number) => { lenis?.raf(time * 1000); };
    if (lenis) gsap.ticker.add(raf);
    const onLenisScroll = () => { ScrollTrigger.update(); };
    lenis?.on("scroll", onLenisScroll);

    const restoreMotionStyles = () => {
      const resetTargets = root.querySelectorAll<HTMLElement>([
        ".hero-video-overlay", ".hero-copy", ".hero-copy .eyebrow", ".hero-copy .hero-line > span", ".hero-core-wrap", ".hero-core", ".hero-core .core-orbit", ".hero-bridge-copy",
        ".about-motion .bridge-core", ".about-motion .bridge-core .core-orbit", ".about-motion .about-copy", ".about-motion .about-copy .eyebrow", ".about-motion .about-copy h2", ".about-motion .about-copy > p:not(.eyebrow)", ".about-motion .about-tags", ".about-motion .about-visual", ".about-motion .about-visual-glow", ".about-motion .about-portrait", ".about-motion .about-visual-node", ".about-motion .about-visual-caption",
        ".workflow-motion .workflow-card", ".workflow-motion .graphic-ring", ".workflow-motion .graphic-dot", ".workflow-motion .workflow-connector", ".workflow-motion .workflow-complete", ".workflow-motion .workflow-to-skills",
        ".skills-motion .skill-panel", ".skills-motion .skills-number", ".skills-motion .network-ring", ".skills-motion .skills-network", ".skills-motion .skills-heading", ".skills-motion .skills-heading .eyebrow", ".skills-motion .skills-heading h2", ".skills-motion .skills-support", ".skills-motion .skills-to-works",
        ".works-transition-motion .works-line", ".works-transition-motion .works-transition-heading", ".works-transition-motion .works-seed", ".works-transition-motion .gallery-camera",
      ].join(","));
      gsap.set(resetTargets, { clearProps: "all" });
      galleryCards.forEach((card) => {
        const element = root.querySelector<HTMLElement>(`[data-gallery-card="${card.id}"]`);
        if (!element) return;
        gsap.set(element, { clearProps: "all" });
        gsap.set(element, { "--gx": card.x, "--gy": card.y, "--gz": card.z, "--gr": card.r, "--gs": card.s });
      });
    };

    const cleanupMotion = () => {
      pageTriggers.forEach((trigger) => trigger.kill());
      pageTriggers = [];
      pageTimelines.forEach((timeline) => timeline.kill());
      pageTimelines = [];
      motionContext?.revert();
      motionContext = null;
      restoreMotionStyles();
    };

    const buildMotion = (profile: ViewportProfile) => {
      root.dataset.pcTier = profile.pcTier;
      root.dataset.motionMode = profile.isMobile ? "mobile" : profile.isTablet ? "tablet" : "pc";
      if (profile.isMobile || profile.isTablet) return;
      motionContext = gsap.context(() => {
        const pin = (section: string, stage: string, animation: gsap.core.Timeline) => {
          const trigger = ScrollTrigger.create({ trigger: section, start: "top top", end: "bottom bottom", pin: stage, scrub: profile.isTablet ? .75 : .9, animation, invalidateOnRefresh: true });
          pageTriggers.push(trigger);
          return trigger;
        };

        if (profile.isMobile) {
        gsap.set(".hero-motion .hero-copy", { opacity: 1, y: 0 });
        gsap.set(".hero-motion .hero-copy .eyebrow, .hero-motion .hero-copy .hero-line > span", { opacity: 1, y: 0 });
        gsap.set(".hero-motion .hero-core-wrap", { opacity: .72, scale: .84 });
        } else {
        gsap.set(".hero-motion .hero-copy", { opacity: 0, y: 24 });
        gsap.set(".hero-motion .hero-copy .eyebrow", { opacity: 0, y: 15 });
        gsap.set(".hero-motion .hero-copy .hero-line > span", { opacity: 0, y: "105%" });
        gsap.set(".hero-motion .hero-core-wrap", { opacity: .08, scale: .88 });
        const hero = gsap.timeline().addLabel("video", 0).to(".hero-motion .hero-video-overlay", { opacity: .52, duration: .2 }, .2).addLabel("label-visible", .3).to(".hero-motion .hero-copy", { opacity: 1, y: 0, duration: .01 }, .29).to(".hero-motion .hero-copy .eyebrow", { opacity: 1, y: 0, letterSpacing: ".22em", duration: .14 }, .3).to(".hero-motion .hero-copy .hero-line > span", { opacity: 1, y: "0%", duration: .18, stagger: .08, ease: "power3.out" }, .38).addLabel("headline-visible", .74).to(".hero-motion .hero-core-wrap", { opacity: 1, scale: 1, duration: .35 }, .64).to(".hero-motion .hero-core", { x: "-18vw", y: "8vh", scale: .75, duration: .55 }, .72).to(".hero-motion .core-orbit", { rotation: "+=55", scale: 1.18, stagger: .05, duration: .55 }, .72).addLabel("hero-exit", .9).to(".hero-motion .hero-copy", { x: "-8vw", opacity: 0, duration: .2 }, .9).fromTo(".hero-motion .hero-bridge-copy", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: .18 }, .94).addLabel("hero-complete");
        pageTimelines.push(hero);
        pin(".hero-motion", ".hero-stage", hero);
        }

        if (profile.isMobile) {
        gsap.set(".about-motion .about-visual, .about-motion .about-copy", { opacity: 1, y: 0 });
        } else {
        gsap.set(".about-motion .about-visual", { opacity: 0, y: 20 });
        gsap.set(".about-motion .about-visual-glow", { opacity: 0, scale: .9 });
        gsap.set(".about-motion .about-portrait", { opacity: 0, y: 24 });
        gsap.set(".about-motion .about-visual-node, .about-motion .about-visual-caption", { opacity: 0, y: 10 });
        gsap.set(".about-motion .about-copy", { autoAlpha: 1, y: 0 });
        gsap.set(".about-motion .about-copy .eyebrow", { opacity: 0, y: 12 });
        gsap.set(".about-motion .about-copy h2", { opacity: 0, y: 18 });
        gsap.set(".about-motion .about-copy > p:not(.eyebrow)", { opacity: 0, y: 16 });
        gsap.set(".about-motion .about-tags", { opacity: 0, y: 10 });
        const about = gsap.timeline().to(".about-motion .about-copy .eyebrow", { autoAlpha: 1, y: 0, duration: .12 }, .14).to(".about-motion .about-copy h2", { autoAlpha: 1, y: 0, duration: .16 }, .22).to(".about-motion .about-visual", { autoAlpha: 1, y: 0, duration: .12 }, .26).to(".about-motion .about-visual-glow", { autoAlpha: 1, scale: 1, duration: .16 }, .28).to(".about-motion .about-portrait", { autoAlpha: 1, y: 0, duration: .18 }, .34).to(".about-motion .about-copy > p:not(.eyebrow)", { autoAlpha: 1, y: 0, duration: .18, stagger: .04 }, .42).to(".about-motion .about-visual-node, .about-motion .about-visual-caption", { autoAlpha: 1, y: 0, duration: .14, stagger: .03 }, .5).to(".about-motion .about-tags", { autoAlpha: 1, y: 0, duration: .14 }, .56).to(".about-motion .bridge-core", { x: "-12vw", y: "-8vh", scale: .72, duration: .35 }, 0).to(".about-motion .bridge-core .core-orbit", { rotation: "+=70", stagger: .06, duration: .5 }, 0).to(".about-motion .bridge-core .node-a", { x: "-10vw", y: "-7vh", duration: .22 }, .45).to(".about-motion .bridge-core .node-b", { x: "10vw", y: "7vh", duration: .22 }, .45);
        pageTimelines.push(about);
        pin(".about-motion", ".about-stage", about);
        }

      const workflowCards = gsap.utils.toArray<HTMLElement>(".workflow-motion .workflow-card");
      const workflowRings = workflowCards.map((card) => gsap.utils.toArray<HTMLElement>(".graphic-ring", card));
      const workflowDots = workflowCards.map((card) => card.querySelector<HTMLElement>(".graphic-dot"));
      if (profile.isMobile) {
        gsap.set(workflowCards, { opacity: 1, scale: 1, y: 0 });
        gsap.set(workflowRings.flat(), { scale: 1, opacity: 1, transformOrigin: "center center" });
        gsap.set(workflowDots.filter(Boolean), { opacity: 1, scale: 1, transformOrigin: "center center" });
      } else {
        const workflowTl = gsap.timeline();
        workflowTl.addLabel("step-01", .1).addLabel("step-02", .38).addLabel("step-03", .69).addLabel("step-04", 1.02);
        gsap.set(workflowCards, { opacity: .4, scale: 1, y: 0 });
        gsap.set(workflowRings.flat(), { scale: .96, opacity: .42, transformOrigin: "center center" });
        gsap.set(workflowDots.filter(Boolean), { opacity: 0, scale: .72, transformOrigin: "center center" });
        gsap.set(workflowRings[0], { scale: 1, opacity: .55 });
        gsap.set(".workflow-motion .workflow-connector", { scaleX: 0, transformOrigin: "left center" });
        workflowTl.to(workflowCards[0], { opacity: 1, scale: 1.025, duration: .08, ease: "power2.out" }, .06).to(workflowRings[0], { scale: 1.08, opacity: 1, duration: .08, ease: "power2.out" }, .08).to(workflowDots[0], { opacity: 1, scale: 1.12, duration: .08, ease: "power2.out" }, .08).to(".workflow-motion .connector-1", { scaleX: 1, duration: .14 }, .2).to(workflowRings[0], { scale: 1, opacity: .42, duration: .12 }, .28).to(workflowDots[0], { opacity: 0, scale: .72, duration: .12 }, .28).to(workflowCards[0], { opacity: .58, scale: 1, duration: .11 }, .32).to(workflowCards[1], { opacity: 1, scale: 1.025, y: 0, duration: .15 }, .32).to(workflowRings[1], { scale: 1.08, opacity: 1, duration: .15 }, .34).to(workflowDots[1], { opacity: 1, scale: 1.12, duration: .12 }, .36).to(".workflow-motion .connector-2", { scaleX: 1, duration: .14 }, .51).to(workflowRings[1], { scale: 1, opacity: .42, duration: .12 }, .59).to(workflowDots[1], { opacity: 0, scale: .72, duration: .12 }, .59).to(workflowCards[1], { opacity: .58, scale: 1, duration: .11 }, .63).to(workflowCards[2], { opacity: 1, scale: 1.025, y: 0, duration: .15 }, .63).to(workflowRings[2], { scale: 1.08, opacity: 1, duration: .15 }, .65).to(workflowDots[2], { opacity: 1, scale: 1.12, duration: .12 }, .67).to(".workflow-motion .connector-3", { scaleX: 1, duration: .14 }, .82).to(workflowRings[2], { scale: 1, opacity: .42, duration: .12 }, .9).to(workflowDots[2], { opacity: 0, scale: .72, duration: .12 }, .9).to(workflowCards[2], { opacity: .58, scale: 1, duration: .11 }, .94).to(workflowCards[3], { opacity: 1, scale: 1.025, y: 0, duration: .15 }, .94).to(workflowRings[3], { scale: 1.08, opacity: 1, duration: .15 }, .96).to(workflowDots[3], { opacity: 1, scale: 1.12, duration: .12 }, .98).to(workflowCards, { opacity: 1, scale: 1, y: 0, duration: .18, stagger: .03 }, 1.22).to(workflowCards[3], { opacity: 1, duration: .08 }, 1.4).fromTo(".workflow-motion .workflow-complete", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .16 }, 1.34).to(workflowCards, { opacity: .82, duration: .1 }, 1.32).to(".workflow-motion .workflow-complete", { opacity: .82, duration: .1 }, 1.32).to(".workflow-motion .workflow-to-skills", { opacity: 1, scale: 1, duration: .18 }, 1.42).addLabel("workflow-complete");
        pageTimelines.push(workflowTl);
        pin(".workflow-motion", ".workflow-stage", workflowTl);
      }

      const skillPanels = gsap.utils.toArray<HTMLElement>(".skills-motion .skill-panel");
      if (profile.isMobile) {
        gsap.set(skillPanels, { opacity: 1, y: 0, scale: 1 });
      } else {
        const skillsTl = gsap.timeline();
        gsap.set(skillPanels, { autoAlpha: 0, pointerEvents: "none", y: 25, scale: .92 });
        gsap.set(".skills-motion .skills-heading .eyebrow, .skills-motion .skills-heading h2, .skills-motion .skills-support", { opacity: 0, y: 12 });
        gsap.set(".skills-motion .skills-number", { opacity: 0 });
        gsap.set(".skills-motion .skills-network", { opacity: 0, scale: .96 });
        skillsTl.to(".skills-motion .skills-heading .eyebrow", { opacity: 1, y: 0, duration: .08 }, .04).to(".skills-motion .skills-heading h2", { opacity: 1, y: 0, duration: .1 }, .08).to(".skills-motion .skills-support", { opacity: 1, y: 0, duration: .1 }, .12).to(".skills-motion .skills-network", { opacity: 1, scale: 1, duration: .14 }, .2).to(".skills-motion .skills-number", { opacity: 1, duration: .08 }, .24);
        skillPanels.forEach((panel, index) => { const start = .32 + index * .1; skillsTl.addLabel(`capability-${String(index + 1).padStart(2, "0")}`, start + .08).set(skillPanels, { autoAlpha: 0, pointerEvents: "none" }, start).to(".skills-motion .skills-number", { textContent: String(index + 1).padStart(2, "0"), duration: .01 }, start).to(panel, { autoAlpha: 1, pointerEvents: "auto", y: 0, scale: 1, duration: .06 }, start + .02).to(`.skills-motion .network-ring:nth-of-type(${(index % 3) + 1})`, { rotation: "+=55", scale: 1.12 + index * .03, duration: .16 }, start); });
        skillsTl.to(".skills-motion .skills-network", { scale: .58, x: 0, y: "-18vh", duration: .2 }, .88).to(".skills-motion .skills-heading", { opacity: 0, y: "-2vh", duration: .16 }, .88).to(".skills-motion .skills-to-works", { opacity: 1, y: 0, duration: .16 }, .92).addLabel("skills-complete");
        pageTimelines.push(skillsTl);
        pin(".skills-motion", ".skills-stage", skillsTl);
      }

      const galleryCardsEls = gsap.utils.toArray<HTMLElement>("[data-gallery-card]");
      const supportCardsEls = galleryCardsEls.filter((element) => element.classList.contains("support-work-card"));
      if (profile.isMobile) {
        gsap.set(galleryCardsEls, { opacity: 1, visibility: "visible", clearProps: "transform" });
        gsap.set(".works-transition-motion .works-transition-heading", { opacity: 1 });
      } else {
        const galleryTl = gsap.timeline();
        galleryTl.addLabel("works-heading", 0).addLabel("heading-split", .2).addLabel("projects-appear", .34).addLabel("projects-spread", .62).addLabel("projects-aligned", .8);
        gsap.set(galleryCardsEls, { opacity: 0, visibility: "hidden" });
        gsap.set(".works-transition-motion .works-line", { opacity: 0, y: 0 });
        gsap.set(".works-transition-motion .works-transition-heading", { opacity: 1 });
        gsap.set(".works-transition-motion .works-transition-heading .eyebrow", { opacity: 0, y: 10 });
        gsap.set(".works-transition-motion .works-seed", { opacity: 0, scale: .72 });
        galleryCards.forEach((card) => { const element = root.querySelector<HTMLElement>(`[data-gallery-card="${card.id}"]`); if (!element) return; const revealAt = .34 + card.enter * .6; gsap.set(element, { "--gx": card.sx, "--gy": card.sy, "--gz": card.sz, "--gs": card.ss, borderRadius: "18px" }); galleryTl.set(element, { visibility: "visible" }, revealAt).to(element, { opacity: card.role === "image" ? .74 : .88, "--gx": card.x, "--gy": card.y, "--gz": card.z, "--gr": card.r, "--gs": card.s, duration: .18, ease: "power2.out" }, revealAt); });
        galleryTl.to(".works-transition-motion .works-transition-heading .eyebrow", { opacity: 1, y: 0, duration: .08 }, .04).to(".works-transition-motion .works-line:first-child", { opacity: 1, duration: .1 }, .08).to(".works-transition-motion .works-line-strong", { opacity: 1, duration: .1 }, .12).to(".works-transition-motion .works-line:first-child", { y: "-19vh", x: "-2vw", opacity: 1, duration: .18, ease: "power3.inOut" }, .24).to(".works-transition-motion .works-line-strong", { y: "19vh", x: "2vw", opacity: 1, duration: .18, ease: "power3.inOut" }, .24).to(".works-transition-motion .works-line", { opacity: .86, duration: .1, ease: "power2.out" }, .4).to(".works-transition-motion .works-line", { opacity: .66, duration: .1, ease: "power2.out" }, .46).to(".works-transition-motion .works-line", { opacity: .4, duration: .1, ease: "power2.out" }, .52).to(".works-transition-motion .works-line", { opacity: .08, duration: .12, ease: "power2.out" }, .58).to(".works-transition-motion .works-transition-heading .eyebrow", { opacity: 0, duration: .12 }, .23).to(".works-transition-motion .works-seed", { opacity: .7, scale: 1.2, rotation: 90, duration: .18 }, .31).to(".works-transition-motion .gallery-camera", { x: "-2vw", y: "-2vh", scale: 1.06, duration: .26, ease: "power2.inOut" }, .62).to(supportCardsEls, { opacity: 0, visibility: "hidden", "--gz": -980, "--gs": .24, duration: .2, stagger: .015, ease: "power2.in" }, .72);
        galleryCards.slice(0, 4).forEach((card, index) => {
          const element = root.querySelector<HTMLElement>(`[data-gallery-card="${card.id}"]`);
          if (!element) return;
          const finalScale = profile.isTablet ? .74 : .82;
          const finalX = () => Math.sign(card.finalX) * ((element.offsetWidth * finalScale + Math.min(32, window.innerWidth * .02)) / 2 / window.innerWidth * 100);
          const finalY = () => Math.sign(card.finalY) * ((element.offsetHeight * finalScale + Math.min(28, window.innerHeight * .035)) / 2 / window.innerHeight * 100);
          galleryTl.to(element, { "--gx": finalX, "--gy": finalY, "--gz": 0, "--gr": 0, "--gs": finalScale, opacity: 1, borderRadius: "14px", duration: .24, ease: "power3.inOut" }, .78 + index * .035);
        });
        galleryTl.to(".works-transition-motion .gallery-camera", { x: 0, y: 0, scale: 1, duration: .24, ease: "power2.inOut" }, .78).to(".works-transition-motion .works-transition-heading", { opacity: 0, duration: .16 }, .8).addLabel("works-complete");
        pageTimelines.push(galleryTl);
        pin(".works-transition-motion", ".works-transition-stage", galleryTl);
      }

      }, root);
    };

    const rebuildMotion = (profile: ViewportProfile) => {
      if (disposed) return;
      cleanupMotion();
      activeProfile = profile;
      buildMotion(activeProfile);
      if (!profile.isMobile && !profile.isTablet) ScrollTrigger.refresh();
    };

    const scheduleRebuild = () => {
      window.clearTimeout(rebuildTimer);
      rebuildTimer = window.setTimeout(() => rebuildMotion(getViewportProfile()), 90);
    };

    buildMotion(activeProfile);
    if (!activeProfile.isMobile && !activeProfile.isTablet) ScrollTrigger.refresh();

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const nextProfile = getViewportProfile();
        if (nextProfile.width !== activeProfile.width || nextProfile.height !== activeProfile.height || nextProfile.pcTier !== activeProfile.pcTier || nextProfile.isMobile !== activeProfile.isMobile || nextProfile.isTablet !== activeProfile.isTablet) rebuildMotion(nextProfile);
      }, 140);
    };
    window.addEventListener("resize", onResize);

    const images = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
    const onImageLoad = () => scheduleRebuild();
    images.filter((image) => !image.complete).forEach((image) => image.addEventListener("load", onImageLoad));
    const onFontsReady = () => scheduleRebuild();
    if (document.fonts && document.fonts.status !== "loaded") void document.fonts.ready.then(onFontsReady);

    return () => {
      disposed = true;
      window.clearTimeout(resizeTimer);
      window.clearTimeout(rebuildTimer);
      window.removeEventListener("resize", onResize);
      images.forEach((image) => image.removeEventListener("load", onImageLoad));
      lenis?.off("scroll", onLenisScroll);
      if (lenis) gsap.ticker.remove(raf);
      lenis?.destroy();
      cleanupMotion();
      delete root.dataset.pcTier;
      delete root.dataset.motionMode;
    };
  }, []);

  return <main ref={rootRef} className="animated-portfolio"><Header /><ScrollProgress progress={progress} /><ScrollDial progress={progress} isScrolling={isScrolling} /><HeroSection /><AboutSection /><WorkflowSection /><SkillsSection /><WorksTransitionSection /><ContactSection /><footer className="site-footer"><span>Tsubasa&apos;s Portfolio</span><span>AI ENGINEER / PRODUCT BUILDER</span><span>© 2026 Tsubasa</span></footer></main>;
}
