import { PricingCard } from "../../components/PricingCard";
import { isPaidMember } from "../../lib/access";

const resources = [
  { 
    title: "Discovery Call 话术脚本", 
    type: "Doc",
    category: "销售",
    description: "完整的话术框架，从开场破冰到需求挖掘，再到下一步行动。",
    size: "12 KB",
    downloads: 128
  },
  { 
    title: "Roadmap 对齐画布", 
    type: "Template",
    category: "产品管理",
    description: "用于与团队和利益相关者对齐产品路线图的可视化模板。",
    size: "2.4 MB",
    downloads: 86
  },
  { 
    title: "Prompt Handoff 检查清单", 
    type: "PDF",
    category: "AI 开发",
    description: "Prompt 从开发到生产的交接检查清单，确保质量和一致性。",
    size: "890 KB",
    downloads: 234
  },
  { 
    title: "ComfyUI 工作流模板", 
    type: "JSON",
    category: "AI 工具",
    description: "电商图生成的 ComfyUI 完整工作流配置文件。",
    size: "156 KB",
    downloads: 312
  }
];

const typeIcons: Record<string, string> = {
  "Doc": "📝",
  "Template": "🎨",
  "PDF": "📄",
  "JSON": "⚙️"
};

const typeColors: Record<string, string> = {
  "Doc": "tag-neutral",
  "Template": "tag-secondary",
  "PDF": "tag-primary",
  "JSON": "tag-secondary"
};

export default function ResourcesPage() {
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
          <p className="text-label text-coral-500">Downloads</p>
          <h1 className="font-display mt-4">
            Resources
          </h1>
          <p className="mt-3 max-w-2xl">
            可直接使用的模板、脚本、检查清单，提升你的工作效率。
          </p>
        </header>

        {/* Resource List */}
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div 
              key={resource.title}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border-2 border-border-subtle bg-surface hover:border-coral-500/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-elevated border-2 border-border-standard flex items-center justify-center text-2xl">
                  {typeIcons[resource.type]}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-display text-lg font-semibold text-text-primary group-hover:text-coral-500 transition-colors">
                      {resource.title}
                    </h2>
                    <span className={`tag ${typeColors[resource.type]} text-[10px]`}>
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-tertiary">
                    <span>{resource.category}</span>
                    <span>•</span>
                    <span>{resource.size}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {resource.downloads} 次下载
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="btn btn-secondary flex-shrink-0 self-start md:self-center text-xs py-2 px-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载
              </button>
            </div>
          ))}
        </div>

        {/* Empty State / Load More */}
        <div className="mt-12 text-center">
          <button className="btn btn-secondary">
            加载更多资源
          </button>
        </div>
      </div>
    </main>
  );
}
