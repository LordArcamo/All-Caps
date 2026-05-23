import { useEffect, useState } from "react";

interface Props {
  /** Total stock for this edition */
  total?: number;
  /** Seed for deterministic mock stock — use the product slug */
  seed: string;
  /** Override remaining if you want exact control */
  remaining?: number;
}

/** Generate a stable mock 'left' count from a slug seed (between 5 and 180). */
function mockRemaining(seed: string, total: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const norm = Math.abs(h) % 1000 / 1000;
  // Bias toward low stock for drama (most products 30-90% gone)
  const pct = 0.1 + norm * 0.65;
  return Math.max(3, Math.floor(total * (1 - pct)));
}

export default function StockIndicator({
  total = 200,
  seed,
  remaining,
}: Props) {
  const target = remaining ?? mockRemaining(seed, total);
  const [count, setCount] = useState(total);

  useEffect(() => {
    const start = performance.now();
    const dur = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(2, -10 * t);
      setCount(Math.round(total - (total - target) * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, total]);

  const pctSold = ((total - count) / total) * 100;
  const isLow = count <= 20;
  const isCritical = count <= 8;

  return (
    <div className="rounded-2xl border border-bone/10 bg-bone/[0.02] p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`block h-1.5 w-1.5 rounded-full ${
              isCritical
                ? "animate-pulse bg-red"
                : isLow
                ? "bg-red"
                : "bg-yellow"
            }`}
          />
          <span className="font-mono text-[10px] tracking-widest text-bone/60">
            {isCritical
              ? "ALMOST GONE"
              : isLow
              ? "LOW STOCK"
              : "LIMITED EDITION"}
          </span>
        </div>
        <span
          className={`font-display text-sm tracking-wide ${
            isLow ? "text-red" : "text-yellow"
          }`}
        >
          {count}{" "}
          <span className="text-bone/40">/ {total}</span>{" "}
          <span className="text-xs text-bone/40">LEFT</span>
        </span>
      </div>
      <div className="relative h-1.5 overflow-hidden rounded-full bg-bone/10">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isLow ? "bg-red" : "bg-yellow"
          }`}
          style={{ width: `${pctSold}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-widest text-bone/40">
        {Math.round(pctSold)}% SOLD · DROP CAPPED AT {total}
      </p>
    </div>
  );
}
