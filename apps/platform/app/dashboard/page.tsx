import { PricingCard } from "../../components/PricingCard";

const quickAccess = [
  { 
    title: "SOP Library", 
    description: "经过实战验证的工作流，覆盖从需求到交付的全过程。",
    count: "15+",
    href: "/sops",
    icon: "📋"
  },
  { 
    title: "Resource Vault", 
    description: "模板、画布、Prompt 包，拿来即用。",
    count: "8",
    href: "/resources",
    icon: "📦"
  },
  { 
    title: "Source Code", 
    description: "可运行的实战源码，附带详细注释。",
    count: "3",
    href: "#",
    icon: "💻"
  }
];

const recentActivity = [
  { title: "小红书爆款 1:1 复刻流", type: "SOP", date: "2天前", status: "new" },
  { title: "ComfyUI 电商图自动化", type: "Workflow", date: "1周前", status: "updated" },
  { title: "Next.js 个人网站源码", type: "Code", date: "2周前", status: "popular" }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <div className="container py-12 md:py-16">
        {/* Header */}
        <header className="page-header">
          <p className="text-label text-coral-500">Dashboard</p>
          <h1 className="font-display mt-4">
            欢迎回来
          </h1>
          <p className="mt-3 max-w-2xl">
            你所有的资源、工作流和实战经验都在这里。开始探索吧。
          </p>
        </header>

        {/* Quick Access Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold text-text-primary">
              快速访问
            </h2>
            <a href="#" className="text-sm text-coral-500 hover:text-coral-400 transition-colors font-medium">
              查看全部 →
            </a>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {quickAccess.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="card group block no-underline"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="tag tag-primary text-[10px]">
                    {item.count}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-coral-500 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {item.description}
                </p>
                <div className="mt-4 flex items-center text-sm text-coral-500 font-medium">
                  进入
                  <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-semibold text-text-primary mb-6">
            最近更新
          </h2>
          
          <div className="space-y-3">
            {recentActivity.map((item, index) => (
              <div 
                key={item.title}
                className="flex items-center justify-between p-5 rounded-xl border-2 border-border-subtle bg-surface hover:border-coral-500/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-text-tertiary font-display text-sm">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="font-display text-lg font-medium text-text-primary group-hover:text-coral-500 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`tag ${item.status === 'new' ? 'tag-secondary' : 'tag-neutral'} text-[10px]`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-text-tertiary">{item.date}</span>
                      {item.status === 'new' && (
                        <span className="tag tag-primary text-[10px]">New</span>
                      )}
                    </div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-text-tertiary group-hover:text-coral-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </section>

        {/* Upgrade CTA */}
        <section>
          <PricingCard />
        </section>
      </div>
    </main>
  );
}
