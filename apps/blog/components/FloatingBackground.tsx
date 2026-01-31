const squares = [
  { size: 120, x: "8%", y: "18%", blur: "blur-3xl", opacity: "0.35", animation: "float-slow" },
  { size: 180, x: "78%", y: "10%", blur: "blur-[60px]", opacity: "0.25", animation: "float-medium" },
  { size: 90, x: "18%", y: "72%", blur: "blur-2xl", opacity: "0.3", animation: "float-fast" },
  { size: 140, x: "68%", y: "70%", blur: "blur-[70px]", opacity: "0.2", animation: "float-medium" },
  { size: 70, x: "48%", y: "38%", blur: "blur-2xl", opacity: "0.25", animation: "float-fast" }
];

export function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {squares.map((square) => (
        <div
          key={`${square.x}-${square.y}-${square.size}`}
          className={`absolute rounded-[32px] bg-orange-500/20 ${square.blur} ${square.animation}`}
          style={{
            width: square.size,
            height: square.size,
            left: square.x,
            top: square.y,
            opacity: square.opacity
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(15,23,42,0.65),_transparent_60%)]" />
    </div>
  );
}
