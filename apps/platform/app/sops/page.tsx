import { PricingCard } from "../../components/PricingCard";
import { isPaidMember } from "../../lib/access";

const sops = [
  { title: "Launch readiness", level: "Advanced" },
  { title: "Prompt QA checklist", level: "Core" },
  { title: "Stakeholder update loop", level: "Core" }
];

export default function SopsPage() {
  const paid = isPaidMember();

  if (!paid) {
    return (
      <main className="px-6 pb-24 pt-10 sm:px-10">
        <div className="mx-auto max-w-xl">
          <PricingCard />
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 pb-24 pt-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold text-ink">SOP Library</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sops.map((sop) => (
            <div key={sop.title} className="rounded-2xl border border-black/10 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">{sop.level}</p>
              <h2 className="mt-3 text-xl font-semibold text-ink">{sop.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
