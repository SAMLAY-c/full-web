export default function PlatformHome() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <header className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-label text-coral-500">The Insider Library</p>
            <h1 className="font-display mt-6 text-4xl font-bold text-text-primary sm:text-5xl md:text-6xl">
              X 的私密知识库
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              已更新 <strong className="text-coral-500">15+ SOP</strong>，收录 <strong className="text-mint-500">5 个完整工作流</strong>，<strong className="text-coral-500">3 个实战源码</strong>。
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="btn btn-secondary"
            >
              登录
            </a>
            <a
              href="/dashboard"
              className="btn btn-primary"
            >
              Upgrade
            </a>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            { label: "SOPs", value: "15+", color: "coral" },
            { label: "Workflows", value: "5", color: "mint" },
            { label: "Source Code", value: "3", color: "coral" }
          ].map((stat) => (
            <div
              key={stat.label}
              className="stat-card group cursor-pointer"
            >
              <p className="stat-label group-hover:text-coral-500 transition-colors">
                {stat.label}
              </p>
              <p className={`stat-value mt-2 text-${stat.color}-500`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Section */}
      <section className="container py-12">
        <div className="flex items-end justify-between border-b-2 border-border-subtle pb-6">
          <div>
            <p className="text-label text-text-tertiary">精选资源</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-text-primary">
              Resource Grid
            </h2>
          </div>
          <span className="tag tag-primary">
            Premium Only
          </span>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "小红书爆款 1:1 复刻流",
              tags: ["SOP", "含脚本"],
              status: "locked"
            },
            {
              title: "ComfyUI 电商图自动化流",
              tags: ["JSON", "工作流"],
              status: "locked"
            },
            {
              title: "全栈个人网站源码",
              subtitle: "Next.js + Tailwind",
              tags: ["Source Code", "Blueprint"],
              status: "locked"
            }
          ].map((item) => (
            <div
              key={item.title}
              className="resource-card locked group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-coral-500 shadow-[0_0_8px_#ff6b6b]" />
                  <span className="text-xs uppercase tracking-[0.2em] text-coral-500 font-semibold">
                    Locked
                  </span>
                </div>
                <span className="tag tag-neutral text-[10px]">
                  Premium
                </span>
              </div>
              
              <h3 className="font-display text-xl font-semibold text-text-primary group-hover:text-coral-500 transition-colors">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="mt-1 text-sm text-text-tertiary">{item.subtitle}</p>
              )}
              
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag tag-neutral"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Membership CTA */}
      <section className="container py-12">
        <div className="premium-cta">
          <div className="relative z-10">
            <p className="text-label text-coral-500">Membership</p>
            <h2 className="font-display mt-4 text-3xl font-semibold text-text-primary">
              解锁全部权益
            </h2>
            <p className="mt-3 text-text-secondary max-w-xl">
              成为付费会员，访问全部 SOP、工作流模板和源码资源。
            </p>
            
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { icon: "💬", title: "1 对 1 答疑", desc: "专属咨询通道" },
                { icon: "📺", title: "每周直播", desc: "实战拆解分享" },
                { icon: "🔄", title: "持续更新", desc: "源码与时俱进" }
              ].map((benefit) => (
                <div 
                  key={benefit.title}
                  className="rounded-2xl border-2 border-border-standard bg-surface-elevated/50 p-5 backdrop-blur-sm"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <h3 className="font-display mt-3 text-lg font-semibold text-text-primary">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">{benefit.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <a href="/dashboard" className="btn btn-primary inline-flex">
                立即加入
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-border-subtle mt-16">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-tertiary">
              © 2024 The Insider Library. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-text-secondary hover:text-coral-500 transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-sm text-text-secondary hover:text-coral-500 transition-colors">
                服务条款
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
