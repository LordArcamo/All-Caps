import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PRODUCTS, type Product } from "@/data/products";

interface Props {
  /** Slugs to feature; defaults to top 5 */
  slugs?: string[];
  autoplayMs?: number;
}

export default function CardStack3D({
  slugs,
  autoplayMs = 4500,
}: Props) {
  const items: Product[] = (slugs?.length
    ? (slugs.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean) as Product[])
    : PRODUCTS.slice(0, 5));
  const [idx, setIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Auto-rotate
  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [items.length, autoplayMs, hovering]);

  const next = () => setIdx((i) => (i + 1) % items.length);
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={wrapRef}
        className="relative h-[460px] w-full max-w-[420px] [perspective:1500px]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {items.map((p, i) => {
          const offset = (i - idx + items.length) % items.length;
          // 5 cards: 0 is active, others offset behind
          const visible = offset === 0;
          const behind = offset > 0 && offset < 3;
          const hidden = offset >= 3;
          const z = behind ? -offset * 100 : 0;
          const y = behind ? offset * 18 : 0;
          const rot = behind ? offset * -2 : 0;
          const scale = visible ? 1 : 1 - offset * 0.05;
          const opacity = hidden ? 0 : visible ? 1 : 0.7 - offset * 0.15;

          return (
            <div
              key={p.slug}
              className="absolute inset-0 transition-all duration-700 ease-out [transform-style:preserve-3d]"
              style={{
                transform: `translateY(${y}px) translateZ(${z}px) rotateX(${rot}deg) scale(${scale})`,
                opacity,
                pointerEvents: visible ? "auto" : "none",
                zIndex: items.length - offset,
              }}
            >
              <Card product={p} active={visible} />
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous"
          className="grid h-12 w-12 place-items-center rounded-full border border-bone/20 text-bone/70 transition-all hover:border-yellow hover:text-yellow"
          data-cursor="hover"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to ${i + 1}`}
              className={`block transition-all ${
                i === idx
                  ? "h-1.5 w-8 rounded-full bg-yellow"
                  : "h-1.5 w-1.5 rounded-full bg-bone/30 hover:bg-bone"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next"
          className="grid h-12 w-12 place-items-center rounded-full border border-bone/20 text-bone/70 transition-all hover:border-yellow hover:text-yellow"
          data-cursor="hover"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Active card meta */}
      <div className="text-center">
        <p className="font-mono text-[10px] tracking-widest text-bone/40">
          {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {items[idx]?.drop}
        </p>
      </div>
    </div>
  );
}

function Card({ product, active }: { product: Product; active: boolean }) {
  const color = product.colors[0]?.hex ?? "#FFCC00";
  const isReal = product.images[0]?.src.endsWith(".png");

  return (
    <a
      href={`/product/${product.slug}`}
      className={`group relative block h-full overflow-hidden rounded-3xl border-2 transition-all ${
        active
          ? "border-yellow shadow-[8px_8px_0_0_#0a0a0a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_0_#0a0a0a]"
          : "border-bone/10"
      }`}
      data-cursor="hover"
    >
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 30% 30%, ${color}50, #0a0a0a 70%)` }}
      />
      <div className="noise-overlay absolute inset-0 opacity-25" />

      {isReal ? (
        <img
          src={product.images[0].src}
          alt={product.images[0].alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 120 80" className="h-1/2 w-auto">
            <path d="M10 50 L30 15 L50 15 L70 50 Z" fill="#0A0A0A" />
            <path
              d="M30 50 Q60 60 110 50 Q100 65 60 70 Q25 65 10 55 Z"
              fill={color}
            />
            <text
              x="40"
              y="42"
              fontFamily="Anton, sans-serif"
              fontSize="28"
              fill={color}
              fontWeight="900"
              fontStyle="italic"
            >
              AC
            </text>
          </svg>
        </div>
      )}

      {/* Top tags */}
      <div className="absolute left-5 top-5 flex flex-col gap-2">
        {product.isHot && (
          <span className="rounded-full bg-red px-3 py-1 font-display text-[10px] tracking-widest text-bone">
            HOT
          </span>
        )}
        {product.isNew && (
          <span className="rounded-full bg-yellow px-3 py-1 font-display text-[10px] tracking-widest text-black">
            NEW
          </span>
        )}
      </div>

      {/* Footer info */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6">
        <p className="font-mono text-[10px] tracking-widest text-bone/60">
          {product.tagline}
        </p>
        <div className="mt-2 flex items-end justify-between">
          <h3
            className="font-display tracking-tight text-bone"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1 }}
          >
            {product.name}
          </h3>
          <span className="font-display text-3xl text-yellow">${product.price}</span>
        </div>
        <div
          className={`mt-4 flex items-center gap-2 rounded-full bg-yellow px-4 py-2 font-display text-xs tracking-widest text-black transition-all ${
            active ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>SHOP NOW</span>
          <ArrowUpRight size={12} />
        </div>
      </div>
    </a>
  );
}
