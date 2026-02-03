import { PricingCard } from "../../components/PricingCard";
import { isPaidMember } from "../../lib/access";

const sops = [
  { 
    title: "小红书爆款 1:1 复刻流", 
    level: "Advanced",
    category: "内容运营",
    description: "从选题到发布的完整 SOP，包含爆款标题公式、封面设计规范和发布时机策略。",
    tags: ["小红书", "内容创作", "增长"],
    updatedAt: "2024-01-15"
  },
  { 
    title: "Prompt QA 检查清单", 
    level: "Core",
    category: "AI 开发",
    description: "确保每个 Prompt 都经过质量检查，提升 AI 输出的一致性和准确性。",
    tags: ["Prompt Engineering", "AI", "质量控制"],
    updatedAt: "2024-01-10"
  },
  { 
    title: "Stakeholder 沟通循环", 
    level: "Core",
    category: "项目管理",
    description: "建立高效的利益相关者沟通机制，确保项目信息同步和决策透明。",
    tags: ["沟通", "项目管理", "协作"],
    updatedAt: "2024-01-08"
  },
  { 
    title: "产品发布准备清单", 
    level: "Advanced",
    category: "产品发布",
    description: "发布前的 48 小时检查清单，覆盖技术、运营、客服全链路。",
    tags: ["产品发布", "Go-to-Market", " checklist"],
    updatedAt: "2024-01-05"
  }
];

const levelColors: Record<string, string> = {
  "Core": "tag-secondary",
  "Advanced": "tag-primary"
};

export default function SopsPage() {
  const paid = isPaidMember();

  if (!paid) {
    return (
      <main className="min-h-screen">
        <div className="container py-12">
          <PricingCard />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container py-12 md:py-16">
        {/* Header */}
        <header className="page-header">
          <p className="text-label text-coral-500">Documentation</p>
          <h1 className="font-display mt-4">
            SOP Library
          </h1>
          <p className="mt-3 max-w-2xl">
            标准化的操作流程文档，每个都经过实战验证，可直接落地执行。
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm text-text-secondary">筛选:</span>
          {["全部", "Core", "Advanced", "内容运营", "AI 开发", "项目管理"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                filter === "全部" 
                  ? "bg-coral-500 text-slate-950" 
                  : "border-2 border-border-standard text-text-secondary hover:border-coral-500 hover:text-coral-500"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* SOP Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {sops.map((sop, index) => (
            <div 
              key={sop.title}
              className="card group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl text-text-tertiary">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <span className={`tag ${levelColors[sop.level]} text-[10px]`}>
                      {sop.level}
                    </span>
                    <p className="text-xs text-text-tertiary mt-1">{sop.category}</p>
                  </div>
                </div>
                <span className="text-xs text-text-tertiary">{sop.updatedAt}</span>
              </div>
              
              <h2 className="font-display text-xl font-semibold text-text-primary group-hover:text-coral-500 transition-colors">
                {sop.title}
              </h2>
              
              <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                {sop.description}
              </p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {sop.tags.map((tag) => (
                  <span key={tag} className="tag tag-neutral text-[10px]">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-sm text-coral-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  查看文档
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="flex items-center gap-1 text-text-tertiary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs">PDF</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State / Load More */}
        <div className="mt-12 text-center">
          <button className="btn btn-secondary">
            加载更多
          </button>
        </div>
      </div>
    </main>
  );
}
