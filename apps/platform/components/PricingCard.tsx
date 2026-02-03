export function PricingCard() {
  return (
    <div className="premium-cta relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-coral-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-mint-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔐</span>
          <p className="text-label text-coral-500">Member Gate</p>
        </div>
        
        <h3 className="font-display text-3xl font-bold text-text-primary">
          解锁完整知识库
        </h3>
        
        <p className="mt-3 text-text-secondary max-w-xl">
          成为付费会员，立即访问所有 SOP 文档、工作流模板、源码资源和 1 对 1 答疑服务。
        </p>
        
        {/* Feature List */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { icon: "📚", text: "全部 SOP 文档" },
            { icon: "⚙️", text: "可复用工作流" },
            { icon: "💻", text: "实战源码" },
            { icon: "🎯", text: "1 对 1 答疑" }
          ].map((feature) => (
            <div key={feature.text} className="flex items-center gap-3">
              <span className="text-xl">{feature.icon}</span>
              <span className="text-sm text-text-secondary">{feature.text}</span>
            </div>
          ))}
        </div>
        
        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button className="btn btn-primary">
            查看定价方案
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button className="btn btn-ghost">
            了解更多权益
          </button>
        </div>
        
        {/* Trust Badge */}
        <div className="mt-6 pt-6 border-t border-border-subtle">
          <div className="flex items-center gap-2 text-xs text-text-tertiary">
            <svg className="w-4 h-4 text-mint-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>安全支付 · 随时取消 · 7 天无理由退款</span>
          </div>
        </div>
      </div>
    </div>
  );
}
