export function CallToAction() {
  return (
    <div className="mt-10 rounded-2xl border border-brand-200 bg-brand-50 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Free Source</p>
      <h3 className="mt-3 text-2xl font-semibold text-brand-900">
        Want the full project files?
      </h3>
      <p className="mt-3 text-sm text-brand-800">
        Follow the public account and reply with “source” to unlock the repository.
      </p>
      <div className="mt-6 inline-flex items-center gap-4 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-brand-700 shadow-sm">
        <span className="h-10 w-10 rounded-lg bg-brand-100" />
        QR Code Placeholder
      </div>
    </div>
  );
}
