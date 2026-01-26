export default function PlatformHome() {
  return (
    <main className="px-6 pb-24 pt-10 sm:px-10">
      <section className="mx-auto max-w-5xl">
        <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">The Insider Library</p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-6xl">
              X 的私密知识库
            </h1>
            <p className="mt-4 text-base text-white/70">
              已更新 15+ SOP，收录 5 个完整工作流，3 个实战源码。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold text-white/70"
            >
              登录
            </a>
            <a
              href="/dashboard"
              className="rounded-full bg-gradient-to-r from-[#6d5cff] to-[#3ee6ff] px-6 py-2 text-xs font-semibold text-black"
            >
              Upgrade
            </a>
          </div>
        </header>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { label: "SOPs", value: "15+" },
            { label: "Workflows", value: "5" },
            { label: "Source Code", value: "3" }
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-5xl">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-white">Resource Grid</h2>
          <span className="text-xs uppercase tracking-[0.3em] text-white/50">
            Premium only
          </span>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "小红书爆款 1:1 复刻流",
              tags: ["SOP", "含脚本"]
            },
            {
              title: "ComfyUI 电商图自动化流",
              tags: ["JSON", "工作流"]
            },
            {
              title: "全栈个人网站源码 (Next.js + Tailwind)",
              tags: ["Source Code", "Agent Blueprint"]
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(62,230,255,0.08)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.3em] text-[#3ee6ff]">🔒 Locked</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
                  Premium
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Membership</p>
          <h2 className="mt-4 text-2xl font-semibold text-white">会员权益</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["1 对 1 答疑", "每周直播拆解", "源码持续更新"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
