export function PricingCard() {
  return (
    <div className="rounded-3xl border border-ember/30 bg-white p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.3em] text-ember">Member Gate</p>
      <h3 className="mt-4 text-2xl font-semibold text-ink">Unlock the library</h3>
      <p className="mt-2 text-sm text-ink/70">
        Become a paid member to access SOPs, templates, and resource drops.
      </p>
      <button className="mt-6 rounded-full bg-ember px-5 py-2 text-sm font-semibold text-white">
        View pricing
      </button>
    </div>
  );
}
