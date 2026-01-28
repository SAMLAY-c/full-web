export type GlobalConfig = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  hookTitle: string;
  hookDescription: string;
  hookQrCode: string | null;
};

export type Category = {
  name: string;
  skillsList: string;
  slug: string;
  order: number;
};

export const globalConfig: GlobalConfig = {
  heroTitle: "从零开始：产品经理的 AI 转型之路",
  heroSubtitle: "记录 Visio、Git、Python 到 AI Agent 的学习全过程。",
  heroCtaText: "开始学习",
  hookTitle: "加入 AI 产品交流群 / 获取本站所有源码",
  hookDescription: "关注公众号，回复【源码】获取我开发的自动化脚本与模板。",
  hookQrCode: null
};

export const categories: Category[] = [
  {
    name: "基础工具",
    skillsList: "Visio / Git / VS Code 安装",
    slug: "basic-tools",
    order: 1
  },
  {
    name: "AI 初探",
    skillsList: "API 调用 / Prompt 基础",
    slug: "ai-intro",
    order: 2
  },
  {
    name: "实战项目",
    skillsList: "手写前端 / 自动化脚本",
    slug: "projects",
    order: 3
  }
];

export function getCategories() {
  return [...categories].sort((a, b) => a.order - b.order);
}
