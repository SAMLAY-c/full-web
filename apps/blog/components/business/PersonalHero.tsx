"use client";

import { useState } from "react";

interface LatestNote {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}

interface PersonalHeroProps {
  latestNotes: LatestNote[];
}

export default function PersonalHero({ latestNotes }: PersonalHeroProps) {
  const [activeTab, setActiveTab] = useState<"roadmap" | "notes">("roadmap");

  return (
    <section className="relative min-h-[85vh] flex items-center bg-white">
      {/* 极简背景 - 只用细微纹理 */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 to-white" />
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 pt-28">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          
          {/* Left: Personal Story Area */}
          <div className="space-y-8">
            {/* Profile Section - 真实个人元素 */}
            <div className="flex items-start gap-5">
              {/* Avatar - 可以替换为真实头像 */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center text-2xl overflow-hidden">
                  👨‍💻
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-neutral-900">正在转型中</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full">
                    公开记录
                  </span>
                </div>
                <p className="text-sm text-neutral-500">
                  记录从传统 PM 到 AI PM 的真实历程
                </p>
              </div>
            </div>

            {/* Main Headline - 行动感文案 */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold text-neutral-900 leading-[1.15] tracking-tight">
                我在公开记录
                <br />
                <span className="text-neutral-400">PM → AI PM</span>
                <br />
                的转型过程
              </h1>
              
              <p className="text-base text-neutral-500 max-w-md leading-relaxed">
                分享学习笔记、工具实践、项目复盘。不画饼，只记录真实的成长轨迹。
              </p>
            </div>

            {/* Stats - 真实数据感 */}
            <div className="flex items-center gap-6 py-4 border-y border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 font-semibold">
                  30+
                </div>
                <div className="text-sm">
                  <div className="font-medium text-neutral-900">篇学习笔记</div>
                  <div className="text-neutral-400">持续更新中</div>
                </div>
              </div>
              <div className="w-px h-10 bg-neutral-100" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 font-semibold">
                  50+
                </div>
                <div className="text-sm">
                  <div className="font-medium text-neutral-900">个AI工具</div>
                  <div className="text-neutral-400">深度测评</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons - 减少橙色，用中性色 */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                开始学习
              </a>
              <a
                href="/course/roadmap"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-neutral-700 border border-neutral-200 rounded-xl font-medium hover:border-neutral-300 hover:bg-neutral-50 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                查看路线图
              </a>
            </div>

            {/* Learning Photos / Work Screenshots - 真实元素 */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2">
                {["💻", "📝", "🤖", "📊"].map((emoji, i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-xl bg-neutral-100 border-2 border-white flex items-center justify-center text-lg"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-400">
                真实学习场景 · 工作截图 · 代码记录
              </p>
            </div>
          </div>

          {/* Right: Interactive Card */}
          <div className="lg:sticky lg:top-24">
            {/* Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl mb-4">
              <button
                onClick={() => setActiveTab("roadmap")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === "roadmap"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                学习路线
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === "notes"
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500 hover:text-neutral-700"
                }`}
              >
                最新笔记
              </button>
            </div>

            {/* Content */}
            {activeTab === "roadmap" ? (
              <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">PM → AI PM 路线图</h3>
                  <span className="text-xs text-neutral-400">4 个阶段</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: "PM 基础能力梳理", status: "completed", articles: 8 },
                    { title: "AI 工具链搭建", status: "current", articles: 5 },
                    { title: "Prompt Engineering", status: "locked", articles: 0 },
                    { title: "AI 项目实战", status: "locked", articles: 0 },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        step.status === "completed" ? "bg-green-500 text-white" :
                        step.status === "current" ? "bg-orange-500 text-white" :
                        "bg-neutral-200 text-neutral-400"
                      }`}>
                        {step.status === "completed" ? "✓" : i + 1}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          step.status === "locked" ? "text-neutral-400" : "text-neutral-900"
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-neutral-400">
                          {step.articles > 0 ? `${step.articles} 篇文章` : "待开始"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <a 
                  href="/course/roadmap"
                  className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 text-sm font-medium text-neutral-600 bg-neutral-50 hover:bg-neutral-100 rounded-xl transition-colors"
                >
                  查看完整路线
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ) : (
              <div className="bg-neutral-900 rounded-2xl p-5 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">最新笔记</h3>
                  <a href="/blog" className="text-xs text-neutral-400 hover:text-white">全部 →</a>
                </div>
                
                <div className="space-y-3">
                  {(latestNotes || []).slice(0, 3).map((note, i) => (
                    <a
                      key={note.slug}
                      href={`/blog/${note.slug}`}
                      className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xs text-neutral-500 font-mono">0{i + 1}</span>
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{note.title}</p>
                          <p className="text-xs text-neutral-400 mt-1">{note.date}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
