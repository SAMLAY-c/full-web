import { ProductCard } from "./product-card";

type Project = {
  title: string;
  description: string;
  tag: string;
};

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProductCard key={project.title} {...project} />
      ))}
    </div>
  );
}
