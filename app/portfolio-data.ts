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
    title: "業務を分解する",
    description: "現場の会話から、課題・制約・判断ポイントを見つけ、プロダクトにできる単位まで整理します。",
    accent: "mint",
  },
  {
    number: "02",
    title: "ワークフローに落とす",
    description: "誰が、いつ、何を見て、どう判断するか。AIと人の役割を分け、使い続けられる流れを設計します。",
    accent: "blue",
  },
  {
    number: "03",
    title: "触れる形で試す",
    description: "アイデアを画面にし、実際に触ってもらう。検証の速度を上げながら、価値の芯を見つけます。",
    accent: "violet",
  },
  {
    number: "04",
    title: "現場で育てる",
    description: "導入後のつまずきまで観察し、改善を積み重ねる。完成ではなく、定着までをプロダクトと考えます。",
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
