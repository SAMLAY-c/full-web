import { PricingCard } from "../../components/PricingCard";

const tiles = [
  { title: "SOP Library", description: "Battle-tested workflows for every delivery phase." },
  { title: "Resource Vault", description: "Templates, canvases, and prompt packs." },
  { title: "Client Briefs", description: "Live briefs with status and deliverables." }
];

export default function DashboardPage() {
  return (
    <main className="px-6 pb-24 pt-10 sm:px-10">
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-ink/60">Dashboard</p>
          <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-5xl">
            Welcome back. Everything you ship lives here.
          </h1>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {tiles.map((tile) => (
            <div key={tile.title} className="rounded-2xl border border-black/10 bg-white p-6">
              <h2 className="text-xl font-semibold text-ink">{tile.title}</h2>
              <p className="mt-2 text-sm text-ink/70">{tile.description}</p>
            </div>
          ))}
        </div>
        <PricingCard />
      </div>
    </main>
  );
}
