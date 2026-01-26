import { Card } from "./card";

type ProductCardProps = {
  title: string;
  description: string;
  tag: string;
};

export function ProductCard({ title, description, tag }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between gap-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-black/50">{tag}</p>
        <h3 className="mt-4 text-xl font-semibold text-black">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-black/60">{description}</p>
      </div>
      <span className="text-xs font-semibold text-black/70">View case study</span>
    </Card>
  );
}
