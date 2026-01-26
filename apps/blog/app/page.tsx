export default function BlogHome() {
  return (
    <main className="px-6 pb-24 pt-12 sm:px-10">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-brand-100 bg-white p-10 shadow-sm">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-600">Learning Hub</p>
          <h1 className="mt-6 text-4xl font-semibold text-brand-900 sm:text-6xl">
            从零开始：产品经理的 AI 转型之路
          </h1>
          <p className="mt-4 text-lg text-brand-800">
            记录 Visio、Git、Python 到 AI Agent 的学习全过程。
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex w-full items-center gap-3 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm text-brand-700">
              <span className="text-brand-400">🔍</span>
              搜索教程、工具或路线图
            </div>
            <a
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-200"
            >
              开始学习
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-brand-900">新手路线图</h2>
          <a className="text-xs font-semibold text-brand-600" href="/blog">
            查看全部
          </a>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "基础工具",
              items: "Visio / Git / VS Code 安装"
            },
            {
              title: "AI 初探",
              items: "API 调用 / Prompt 基础"
            },
            {
              title: "实战项目",
              items: "手写前端 / 自动化脚本"
            }
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-brand-900">{card.title}</h3>
              <p className="mt-3 text-sm text-brand-700">{card.items}</p>
              <p className="mt-6 text-xs font-semibold text-brand-600">进入分类</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold text-brand-900">最新更新</h2>
          <a className="text-xs font-semibold text-brand-600" href="/blog">
            更多文章
          </a>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            "今天我又踩了前端的一个坑",
            "推荐 3 个好用的 VS Code 插件",
            "Git 提交规范到底怎么落地"
          ].map((title) => (
            <article
              key={title}
              className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-sm"
            >
              <div className="h-40 bg-gradient-to-br from-brand-100 via-brand-50 to-white" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-brand-500">Latest</p>
                <h3 className="mt-3 text-lg font-semibold text-brand-900">{title}</h3>
                <p className="mt-3 text-sm text-brand-700">
                  快速记录实战细节，给你可复制的操作路径。
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-5xl">
        <div className="rounded-3xl border border-brand-200 bg-brand-50 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-600">The Hook</p>
              <h2 className="mt-4 text-2xl font-semibold text-brand-900">
                加入 AI 产品交流群 / 获取本站所有源码
              </h2>
              <p className="mt-3 text-sm text-brand-800">
                关注公众号，回复【源码】获取我开发的自动化脚本与模板。
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-brand-700 shadow-sm">
              <span className="h-14 w-14 rounded-xl bg-brand-100" />
              QR Code
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
