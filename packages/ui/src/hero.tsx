import type { HTMLAttributes } from "react";
import { cn } from "@repo/utils";

type HeroProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle: string;
  eyebrow?: string;
};

export function Hero({ title, subtitle, eyebrow, className, ...props }: HeroProps) {
  return (
    <section
      className={cn("flex flex-col gap-6 text-center", className)}
      {...props}
    >
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.4em] text-black/50">{eyebrow}</p>
      ) : null}
      <h1 className="text-4xl font-semibold leading-tight text-black sm:text-6xl">
        {title}
      </h1>
      <p className="mx-auto max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg">
        {subtitle}
      </p>
    </section>
  );
}
