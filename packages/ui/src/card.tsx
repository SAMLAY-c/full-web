import type { HTMLAttributes } from "react";
import { cn } from "@repo/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-black/10 bg-white p-6 shadow-[0_18px_60px_rgba(15,15,15,0.08)]",
        className
      )}
      {...props}
    />
  );
}
