import type { ButtonHTMLAttributes } from "react";
import { cn } from "@repo/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
};

export function Button({ className, variant = "solid", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition",
        variant === "solid"
          ? "bg-black text-white hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
          : "border border-black/20 text-black hover:border-black",
        className
      )}
      {...props}
    />
  );
}
