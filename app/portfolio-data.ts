export type Project = {
  id: string;
  slug: string;
  image: string;
  title: string;
  label: string;
  category: string;
  year: string;
  stack: string;
  technologies: string[];
  description: string;
  background: string;
  challenge: string;
  solution: string;
  result: string;
  featured?: boolean;
  variant: "wide" | "tall" | "offset";
};

export const workflowSteps = [
  {
    number: "01",
    title: "現場ヒアリング・課題特定",
    description: "現場の会話や実際の業務を丁寧に聞き、表面的な要望の奥にある不便・制約・判断ポイントを捉えます。",
    accent: "mint",
  },
  {
    number: "02",
    title: "業務を分解する",
    description: "誰が、いつ、何を確認し、どのように判断しているのか。業務を要素単位に分解し、人が担う部分とAIが担える部分を整理します。",
    accent: "blue",
  },
  {
    number: "03",
    title: "ワークフローに落とし込む",
    description: "人とAIの役割を分け、既存業務へ無理なく組み込める流れを設計します。",
    accent: "violet",
  },
  {
    number: "04",
    title: "実装する",
    description: "実際に触れられるシステムを素早く構築し、現場で検証・改善しながら、本当に使われる仕組みへ仕上げます。",
    accent: "orange",
  },
] as const;

export const projects: Project[] = [
  {
    id: "project-01",
    slug: "project-01",
    image: "/assets/projects/ai-literacy.png",
    title: "作品タイトル（仮）",
    label: "PROJECT 01 / 仮カテゴリ",
    category: "仮カテゴリ",
    year: "制作年：未設定",
    stack: "使用技術：後で設定",
    technologies: ["使用技術：後で設定"],
    description: "作品の背景・課題・成果は、情報受領後に差し替えます。",
    background: "制作背景は後で設定します。",
    challenge: "解決した課題は後で設定します。",
    solution: "実装内容は後で設定します。",
    result: "成果は後で設定します。",
    featured: true,
    variant: "wide",
  },
  {
    id: "project-02",
    slug: "project-02",
    image: "/assets/projects/ai-guideline.png",
    title: "作品タイトル（仮）",
    label: "PROJECT 02 / 仮カテゴリ",
    category: "仮カテゴリ",
    year: "制作年：未設定",
    stack: "使用技術：後で設定",
    technologies: ["使用技術：後で設定"],
    description: "作品の背景・課題・成果は、情報受領後に差し替えます。",
    background: "制作背景は後で設定します。",
    challenge: "解決した課題は後で設定します。",
    solution: "実装内容は後で設定します。",
    result: "成果は後で設定します。",
    variant: "offset",
  },
  {
    id: "project-03",
    slug: "project-03",
    image: "/assets/projects/gas-automation.png",
    title: "作品タイトル（仮）",
    label: "PROJECT 03 / 仮カテゴリ",
    category: "仮カテゴリ",
    year: "制作年：未設定",
    stack: "使用技術：後で設定",
    technologies: ["使用技術：後で設定"],
    description: "作品の背景・課題・成果は、情報受領後に差し替えます。",
    background: "制作背景は後で設定します。",
    challenge: "解決した課題は後で設定します。",
    solution: "実装内容は後で設定します。",
    result: "成果は後で設定します。",
    variant: "tall",
  },
  {
    id: "project-04",
    slug: "project-04",
    image: "/assets/projects/ai-foundation.png",
    title: "作品タイトル（仮）",
    label: "PROJECT 04 / 仮カテゴリ",
    category: "仮カテゴリ",
    year: "制作年：未設定",
    stack: "使用技術：後で設定",
    technologies: ["使用技術：後で設定"],
    description: "作品の背景・課題・成果は、情報受領後に差し替えます。",
    background: "制作背景は後で設定します。",
    challenge: "解決した課題は後で設定します。",
    solution: "実装内容は後で設定します。",
    result: "成果は後で設定します。",
    variant: "offset",
  },
  {
    id: "project-05",
    slug: "project-05",
    image: "/assets/projects/gas-system.png",
    title: "作品タイトル（仮）",
    label: "PROJECT 05 / 仮カテゴリ",
    category: "仮カテゴリ",
    year: "制作年：未設定",
    stack: "使用技術：後で設定",
    technologies: ["使用技術：後で設定"],
    description: "作品の背景・課題・成果は、情報受領後に差し替えます。",
    background: "制作背景は後で設定します。",
    challenge: "解決した課題は後で設定します。",
    solution: "実装内容は後で設定します。",
    result: "成果は後で設定します。",
    variant: "wide",
  },
];

export const skills = [
  "AI Product Development",
  "Business Automation",
  "AI Agent Development",
  "Web Application Development",
  "AI Education",
  "Project Direction",
] as const;
