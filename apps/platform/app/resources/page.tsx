import { PricingCard } from "../../components/PricingCard";
import { isPaidMember } from "../../lib/access";

const resources = [
  { title: "Discovery call script", type: "Doc" },
  { title: "Roadmap alignment canvas", type: "Template" },
  { title: "Prompt handoff checklist", type: "PDF" }
];

export default function ResourcesPage() {
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
        <h1 className="text-3xl font-semibold text-ink">Resources</h1>
        <div className="mt-8 space-y-4">
          {resources.map((resource) => (
            <div key={resource.title} className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-6">
              <div>
                <h2 className="text-lg font-semibold text-ink">{resource.title}</h2>
                <p className="text-xs uppercase tracking-[0.3em] text-ink/50">{resource.type}</p>
              </div>
              <button className="rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold text-ink">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
