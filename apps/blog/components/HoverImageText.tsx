"use client";

import { useRef, useState } from "react";

type HoverImageTextProps = {
  text: string;
  imageSrc: string;
};

export function HoverImageText({ text, imageSrc }: HoverImageTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const latest = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    latest.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    if (frame.current) {
      return;
    }

    frame.current = window.requestAnimationFrame(() => {
      setPosition(latest.current);
      frame.current = null;
    });
  };

  return (
    <span
      className="relative inline-flex cursor-pointer items-center gap-2 font-semibold text-orange-400 underline decoration-orange-500/40 underline-offset-4 transition hover:text-orange-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {text}
      <span
        className={`pointer-events-none absolute left-0 top-0 w-48 overflow-hidden rounded-2xl border border-orange-500/30 bg-neutral-900/90 shadow-2xl shadow-orange-500/20 transition duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(16px, -60%)`,
          filter: isHovered ? "saturate(1.05)" : "saturate(0.9)"
        }}
      >
        <img src={imageSrc} alt="Preview" className="h-28 w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-transparent" />
      </span>
    </span>
  );
}
