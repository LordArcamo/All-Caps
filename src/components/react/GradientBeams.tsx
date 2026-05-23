import { useEffect, useRef } from "react";

interface Props {
  count?: number;
  colors?: string[];
  className?: string;
}

/**
 * Slow animated gradient beams traveling diagonally across the container.
 * Mix-blend screens on top of black for additive glow.
 */
export default function GradientBeams({
  count = 6,
  colors = ["#FFCC00", "#FF2D2D", "#FFFFFF"],
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const beams = Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    top: 8 + ((i * 23) % 70),
    delay: i * 1.8,
    duration: 14 + (i % 3) * 4,
    width: 100 + (i % 4) * 80,
    opacity: 0.1 + ((i * 0.06) % 0.18),
  }));

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {beams.map((b) => (
        <div
          key={b.id}
          className="absolute h-px"
          style={{
            top: `${b.top}%`,
            left: "-30%",
            width: `${b.width}px`,
            background: `linear-gradient(90deg, transparent 0%, ${b.color} 50%, transparent 100%)`,
            opacity: b.opacity,
            filter: "blur(1px)",
            animation: `beam-travel ${b.duration}s ${b.delay}s linear infinite`,
            mixBlendMode: "screen",
            boxShadow: `0 0 20px ${b.color}`,
          }}
        />
      ))}
      <style>{`
        @keyframes beam-travel {
          from { transform: translateX(0) translateY(0); }
          to { transform: translateX(160vw) translateY(20vh); }
        }
      `}</style>
    </div>
  );
}
