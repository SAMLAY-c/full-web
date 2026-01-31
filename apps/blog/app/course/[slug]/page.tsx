'use client';

import { useEffect, useState } from "react";
import { DiscussionArea } from "../../../components/business/DiscussionArea";
import { ResourceSidebar } from "../../../components/business/Sidebar";
import { VideoPlayer } from "../../../components/business/VideoPlayer";
import { FloatingBackground } from "../../../components/FloatingBackground";
import { HoverImageText } from "../../../components/HoverImageText";

type TranscriptItem = {
  time: string;
  text: string;
};

type CourseData = {
  title: string;
  videoUrl: string;
  transcript: TranscriptItem[];
  pdfUrl: string;
};

export default function CoursePage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟数据获取
    const courseData: CourseData = {
      title: "Remotion 实战：从零生成第一个视频",
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      transcript: [
        { time: "00:00", text: "大家好，欢迎来到这节 Remotion 实战课。" },
        { time: "00:15", text: "今天我们要讲的是环境配置..." },
        { time: "01:20", text: "核心概念是：视频即代码。" }
      ],
      pdfUrl: "/downloads/course-notes.pdf"
    };
    setData(courseData);
    setLoading(false);
  }, [params.slug]);

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
          <p className="text-neutral-400">加载中...</p>
        </div>
      </div>
    );
  }

  const highlights = data.transcript.slice(0, 3);

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white selection:bg-orange-500/20">
      <FloatingBackground />
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />

      <nav className="relative z-10 border-b border-white/10 bg-neutral-950/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-orange-300/80">
              Course Studio
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              {data.title}
            </h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              2h 12m
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              18 章节
            </span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/80">
            <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
            新课上线 · 2026
          </div>

          <div className="max-w-3xl space-y-4">
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
              用 Remotion 把想法变成{" "}
              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                可执行的视觉系统
              </span>
            </h2>
            <p className="text-lg text-neutral-300">
              这是一套偏工程师视角的课程路径：你会看到{" "}
              <HoverImageText
                text="UI 逻辑"
                imageSrc="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop"
              />{" "}
              如何与{" "}
              <HoverImageText
                text="渲染工作流"
                imageSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
              />{" "}
              结合，最终生成可复用的视频模板和工程化素材库。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={data.pdfUrl}
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 shadow-[0_18px_45px_rgba(249,115,22,0.35)] transition hover:bg-orange-400"
            >
              下载课件
            </a>
            <button className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-neutral-200 transition hover:border-orange-400/60 hover:text-white">
              加入学习计划
            </button>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="group relative flex h-full min-h-[420px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-neutral-900/60 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.12),_transparent_60%)] opacity-80" />
              <div className="relative z-10 h-full w-full p-4 sm:p-6">
                <div className="flex h-full items-center justify-center overflow-hidden rounded-2xl bg-black">
                  <VideoPlayer src={data.videoUrl} />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <ResourceSidebar transcript={data.transcript} pdfUrl={data.pdfUrl} />
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">课程高光片段</h3>
              <p className="mt-2 text-sm text-neutral-400">
                每一节都在靠近可复用的自动化模板。
              </p>
              <div className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <div
                    key={`${item.time}-${item.text}`}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-neutral-950/60 p-4"
                  >
                    <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-200">
                      {item.time}
                    </span>
                    <p className="text-sm text-neutral-200">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-900/80 via-neutral-950 to-neutral-900/70 p-6">
              <h3 className="text-lg font-semibold text-white">你将获得</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Remotion 工程模板",
                  "高复用片段库",
                  "课程实战项目",
                  "合成流程清单"
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-neutral-200"
                  >
                    <span className="text-orange-300">✦</span>
                    <span className="ml-3">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 max-w-4xl">
          <h3 className="text-lg font-semibold text-white">讨论区</h3>
          <p className="mt-2 text-sm text-neutral-400">
            记录你的实践笔记，和同学分享更高效的工作流。
          </p>
          <div className="mt-6">
            <DiscussionArea topicId={`course-${params.slug}`} />
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -24px, 0);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(12px, -18px, 0);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-8px, -16px, 0);
          }
        }
        .float-slow {
          animation: float-slow 16s ease-in-out infinite;
        }
        .float-medium {
          animation: float-medium 12s ease-in-out infinite;
        }
        .float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
