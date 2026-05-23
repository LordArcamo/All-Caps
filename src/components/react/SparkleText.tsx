import { useEffect, useMemo, useState } from "react";

interface Props {
  children: React.ReactNode;
  color?: string;
  count?: number;
  /** className passed to wrapper */
  className?: string;
}

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
};

let sparkleId = 0;

export default function SparkleText({
  children,
  color = "#FFCC00",
  count = 8,
  className = "",
}: Props) {
  const [sparkles, setSparkles] = useState<Sparkle[]>(() => makeSparkles(count));

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const survivor = prev.slice(1);
        return [...survivor, makeSparkles(1)[0]];
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="pointer-events-none absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animation: `sparkle-pop ${s.duration}ms ${s.delay}ms ease-out infinite`,
            zIndex: 0,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
          </svg>
        </span>
      ))}
      <span className="relative" style={{ zIndex: 1 }}>{children}</span>
      <style>{`
        @keyframes sparkle-pop {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
      `}</style>
    </span>
  );
}

function makeSparkles(n: number): Sparkle[] {
  return Array.from({ length: n }, () => ({
    id: sparkleId++,
    x: Math.random() * 110 - 5,
    y: Math.random() * 110 - 5,
    size: 8 + Math.random() * 14,
    delay: Math.random() * 1500,
    duration: 1500 + Math.random() * 1200,
  }));
}
