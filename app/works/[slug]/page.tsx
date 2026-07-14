import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../portfolio-data";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project ? `${project.title} | Tsubasa's Portfolio` : "Works | Tsubasa's Portfolio",
    description: project?.description ?? "AIエンジニア / プロダクトビルダーの作品詳細です。",
  };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="work-detail-page">
      <header className="work-detail-header">
        <Link href="/#works" className="work-detail-back">← Worksへ戻る</Link>
        <span>TSUBASA / WORKS</span>
      </header>
      <div className="work-detail-hero">
        <div className="work-detail-hero-copy">
          <p className="eyebrow">{project.label}</p>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="work-detail-meta"><span>{project.category}</span><span>{project.year}</span></div>
        </div>
        <div className="work-detail-image"><Image src={project.image} alt={`${project.title}のメインビジュアル`} width={1672} height={941} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 60vw" priority unoptimized /></div>
      </div>
      <div className="work-detail-body">
        <section><p className="eyebrow">01 / BACKGROUND</p><h2>制作背景</h2><p>{project.background}</p></section>
        <section><p className="eyebrow">02 / CHALLENGE</p><h2>課題</h2><p>{project.challenge}</p></section>
        <section><p className="eyebrow">03 / IMPLEMENTATION</p><h2>実装内容</h2><p>{project.solution}</p></section>
        <section><p className="eyebrow">04 / RESULT</p><h2>成果</h2><p>{project.result}</p></section>
        <section className="work-detail-tech"><p className="eyebrow">05 / TECHNOLOGIES</p><h2>使用技術</h2><div>{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></section>
        <section className="work-detail-placeholder"><p className="eyebrow">06 / SUPPORTING VISUAL</p><h2>補足画像</h2><p>補足画像は後で追加できます。</p></section>
      </div>
      <nav className="work-detail-next" aria-label="次の作品">
        <span>NEXT PROJECT</span>
        <Link href={`/works/${nextProject.slug}`}><strong>{nextProject.title}</strong><span>次の作品を見る ↗</span></Link>
      </nav>
      <footer className="work-detail-footer"><Link href="/#contact" className="contact-button">お問い合わせはこちら <span>↗</span></Link><span>Tsubasa&apos;s Portfolio / 2026</span></footer>
    </main>
  );
}
