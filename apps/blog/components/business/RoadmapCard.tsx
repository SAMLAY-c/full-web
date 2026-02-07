"use client";

interface RoadmapStep {
  id: number;
  title: string;
  description?: string;
  status: "completed" | "in-progress" | "locked";
  completedArticles: number;
  totalArticles: number;
  estimatedHours: number;
  tags: string[];
}

const roadmapData: RoadmapStep[] = [
  {
    id: 1,
    title: "PM 基础能力梳理",
    description: "产品思维、需求分析、项目管理",
    status: "completed",
    completedArticles: 8,
    totalArticles: 8,
    estimatedHours: 20,
    tags: ["产品思维", "需求文档"],
  },
  {
    id: 2,
    title: "AI 工具链搭建",
    description: "Claude、Cursor、V0 等核心工具",
    status: "in-progress",
    completedArticles: 5,
    totalArticles: 12,
    estimatedHours: 30,
    tags: ["AI工具", "效率提升"],
  },
  {
    id: 3,
    title: "Prompt Engineering",
    description: "提示词设计、多轮对话、场景优化",
    status: "locked",
    completedArticles: 0,
    totalArticles: 10,
    estimatedHours: 25,
    tags: ["Prompt", "ChatGPT"],
  },
  {
    id: 4,
    title: "AI 项目实战",
    description: "从 0 到 1 搭建 AI 产品",
    status: "locked",
    completedArticles: 0,
    totalArticles: 6,
    estimatedHours: 40,
    tags: ["实战", "MVP"],
  },
];

export default function RoadmapCard() {
  const totalCompleted = roadmapData.reduce((sum, step) => sum + step.completedArticles, 0);
  const totalArticles = roadmapData.reduce((sum, step) => sum + step.totalArticles, 0);
  const overallProgress = Math.round((totalCompleted / totalArticles) * 100);

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-sm">
              🗺
            </span>
            学习路线图
          </h3>
          <p className="text-sm text-neutral-500 mt-1">
            PM → AI PM 转型路径
          </p>
        </div>
        <a 
          href="/course/roadmap" 
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          查看详情 →
        </a>
      </div>

      {/* Overall Progress */}
      <div className="mb-6 p-4 bg-neutral-50 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700">总体进度</span>
          <span className="text-sm font-semibold text-neutral-900">{overallProgress}%</span>
        </div>
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
          <span>已完成 {totalCompleted}/{totalArticles} 篇文章</span>
          <span>·</span>
          <span>预计 {roadmapData.reduce((sum, s) => sum + s.estimatedHours, 0)} 小时</span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {roadmapData.map((step, index) => {
          const stepProgress = Math.round((step.completedArticles / step.totalArticles) * 100);
          
          return (
            <div 
              key={step.id}
              className={`relative p-4 rounded-xl border transition-all ${
                step.status === "completed" 
                  ? "bg-green-50/50 border-green-100" 
                  : step.status === "in-progress"
                  ? "bg-white border-orange-200 shadow-sm"
                  : "bg-neutral-50 border-neutral-100"
              }`}
            >
              {/* Step Header */}
              <div className="flex items-start gap-3">
                {/* Status Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  step.status === "completed"
                    ? "bg-green-500 text-white"
                    : step.status === "in-progress"
                    ? "bg-orange-500 text-white"
                    : "bg-neutral-200 text-neutral-400"
                }`}>
                  {step.status === "completed" ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium text-sm truncate ${
                      step.status === "locked" ? "text-neutral-400" : "text-neutral-900"
                    }`}>
                      {step.title}
                    </h4>
                    {step.status === "in-progress" && (
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-medium rounded">
                        进行中
                      </span>
                    )}
                  </div>
                  
                  {step.description && (
                    <p className={`text-xs mb-2 ${
                      step.status === "locked" ? "text-neutral-400" : "text-neutral-500"
                    }`}>
                      {step.description}
                    </p>
                  )}

                  {/* Progress Bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          step.status === "completed"
                            ? "bg-green-500"
                            : step.status === "in-progress"
                            ? "bg-orange-500"
                            : "bg-neutral-300"
                        }`}
                        style={{ width: `${stepProgress}%` }}
                      />
                    </div>
                    <span className={`text-xs whitespace-nowrap ${
                      step.status === "locked" ? "text-neutral-400" : "text-neutral-600"
                    }`}>
                      {step.completedArticles}/{step.totalArticles}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {step.estimatedHours}h
                    </span>
                    {step.tags.map(tag => (
                      <span key={tag} className="text-neutral-400">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
