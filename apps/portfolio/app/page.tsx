"use client";

import { useState } from "react";
import { ResumeButton } from "@repo/ui";

const content = {
  zh: {
    name: "Rye Chen",
    tagline: "连接商业与大模型的产品经理。",
    nav: {
      about: "About",
      projects: "Projects",
      resume: "Resume"
    },
    selectedWork: "Selected Work",
    caseCount: "03 Case Studies",
    thinking: "Thinking",
    projects: [
      {
        title: "AI 辅助编程助手",
        problem: "独立开发",
        result: "提升编码效率 40% (GitHub Star 100+)"
      },
      {
        title: "行业数据分析 Agent",
        problem: "黑客松金奖",
        result: "使得数据查询从 30 分钟降至 1 分钟"
      },
      {
        title: "增长实验平台",
        problem: "增长负责人",
        result: "连续 3 个季度增长 18%+"
      }
    ],
    writings: [
      "从 Perplexity 看 AI 搜索的商业化路径",
      "关于 AI Native 产品交互逻辑的思考",
      "从多模态看下一代产品体验"
    ],
    email: "hello@example.com"
  },
  en: {
    name: "Rye Chen",
    tagline: "Product Manager bridging Business & LLMs.",
    nav: {
      about: "About",
      projects: "Projects",
      resume: "Resume"
    },
    selectedWork: "Selected Work",
    caseCount: "03 Case Studies",
    thinking: "Thinking",
    projects: [
      {
        title: "AI Pair Programming Assistant",
        problem: "Solo build",
        result: "40% faster coding (100+ GitHub stars)"
      },
      {
        title: "Industry Analytics Agent",
        problem: "Hackathon Gold",
        result: "Queries cut from 30 mins to 1 min"
      },
      {
        title: "Growth Experimentation Hub",
        problem: "Growth lead",
        result: "18%+ QoQ growth for 3 quarters"
      }
    ],
    writings: [
      "Commercial paths for AI search through the Perplexity lens",
      "Rethinking AI-native product interaction logic",
      "How multimodal systems reshape product experience"
    ],
    email: "hello@example.com"
  }
};

export default function PortfolioHome() {
  const [language, setLanguage] = useState<"zh" | "en">("en");
  const copy = content[language];

  return (
    <main className="min-h-screen px-6 pb-20 pt-10 sm:px-12">
      <header className="flex items-start justify-between gap-6 text-sm">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {copy.name}
          </h1>
          <p className="text-base text-black/70">{copy.tagline}</p>
        </div>
        <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center">
          <nav className="flex items-center gap-6 text-sm text-black/60">
            <a className="hover:text-black" href="#about">
              {copy.nav.about}
            </a>
            <a className="hover:text-black" href="#projects">
              {copy.nav.projects}
            </a>
            <a className="hover:text-black" href="/resume.pdf">
              {copy.nav.resume}
            </a>
          </nav>
          <button
            type="button"
            className="rounded-full border border-black/20 px-4 py-2 text-xs font-semibold text-black/70 hover:border-black"
            onClick={() => setLanguage(language === "en" ? "zh" : "en")}
          >
            {language === "en" ? "中文" : "English"}
          </button>
          <ResumeButton label="Download Resume" />
        </div>
      </header>

      <section id="projects" className="mt-16">
        <div className="flex items-end justify-between border-b border-black/10 pb-4">
          <h2 className="text-xl font-semibold text-black">{copy.selectedWork}</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-black/50">
            {copy.caseCount}
          </span>
        </div>
        <div className="divide-y divide-black/10">
          {copy.projects.map((project) => (
            <div key={project.title} className="py-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-black">{project.title}</h3>
                  <p className="text-sm text-black/60">{project.problem}</p>
                </div>
                <span className="inline-flex items-center rounded-full border border-black/20 px-4 py-1 text-xs font-semibold text-black/70">
                  {project.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="mt-16">
        <h2 className="text-xl font-semibold text-black">{copy.thinking}</h2>
        <ul className="mt-6 space-y-3 text-sm text-black/70">
          {copy.writings.map((title) => (
            <li key={title} className="border-b border-black/10 pb-3">
              {title}
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-6 text-sm text-black/60 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <a className="hover:text-black" href={`mailto:${copy.email}`}>
            {copy.email}
          </a>
          <a className="hover:text-black" href="https://linkedin.com">
            LinkedIn
          </a>
          <a className="hover:text-black" href="https://github.com">
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
