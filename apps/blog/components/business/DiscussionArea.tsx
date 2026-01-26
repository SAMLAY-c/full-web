export function DiscussionArea({ topicId }: { topicId: string }) {
  return (
    <div className="rounded-xl bg-brand-50 p-6" data-topic={topicId}>
      <div className="mb-4">
        <textarea
          className="w-full rounded-lg border border-brand-200 p-4 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
          placeholder="写下你的想法..."
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          <button className="rounded-lg bg-brand-600 px-6 py-2 font-medium text-white transition hover:bg-brand-700">
            发布评论
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-200 font-bold text-brand-700">
            U
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-brand-900">User123</span>
              <span className="text-xs text-brand-400">2小时前</span>
            </div>
            <p className="mt-1 text-brand-700">
              非常有帮助，终于搞懂了 Remotion 的原理！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
