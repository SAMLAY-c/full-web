export function DiscussionArea({ topicId }: { topicId: string }) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur"
      data-topic={topicId}
    >
      <div className="mb-6">
        <textarea
          className="w-full rounded-2xl border border-white/10 bg-neutral-950/70 p-4 text-sm text-neutral-200 outline-none transition focus:border-orange-400/60 focus:ring-2 focus:ring-orange-500/20"
          placeholder="写下你的想法..."
          rows={3}
        />
        <div className="mt-4 flex justify-end">
          <button className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-orange-400">
            发布评论
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 font-bold text-orange-200">
            U
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-100">User123</span>
              <span className="text-xs text-neutral-500">2小时前</span>
            </div>
            <p className="mt-1 text-sm text-neutral-300">
              非常有帮助，终于搞懂了 Remotion 的原理！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
