import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Flame, Sparkles, Tag } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/products";

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const openTimer = useRef<number | null>(null);

  const onTriggerEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    openTimer.current = window.setTimeout(() => setOpen(true), 80);
  };

  const onTriggerLeave = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    closeTimer.current = window.setTimeout(() => setOpen(false), 240);
  };

  const onPanelEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const featured = PRODUCTS.find((p) => p.isHot) ?? PRODUCTS[0];
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 3);
  const featuredColor = featured?.colors[0]?.hex ?? "#FFCC00";

  // Preview product based on hovered category
  const previewProduct =
    hoveredCat
      ? PRODUCTS.find((p) => p.category === hoveredCat) ?? featured
      : featured;
  const previewColor = previewProduct?.colors[0]?.hex ?? "#FFCC00";

  return (
    <div
      className="relative"
      onMouseEnter={onTriggerEnter}
      onMouseLeave={onTriggerLeave}
    >
      {/* The trigger link */}
      <a
        href="/shop"
        className="group relative block px-5 py-2 font-display text-sm uppercase tracking-wider text-bone/80 transition-colors hover:text-bone"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="relative z-10">Shop</span>
        <span
          className={`absolute inset-x-5 bottom-1 h-px origin-left bg-yellow transition-transform duration-500 ${
            open ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </a>

      {/* Panel */}
      <div
        className={`absolute left-1/2 top-full z-40 mt-3 w-screen max-w-[1100px] -translate-x-1/2 transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        onMouseEnter={onPanelEnter}
        onMouseLeave={onTriggerLeave}
      >
        <div className="overflow-hidden rounded-3xl border border-bone/10 bg-ink/95 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-12 gap-0">
            {/* Col 1-3: Categories */}
            <div className="col-span-3 border-r border-bone/10 p-6">
              <h4 className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-bone/40">
                <span className="block h-px w-6 bg-yellow"></span>
                CATEGORIES
              </h4>
              <ul className="space-y-1">
                <CategoryItem
                  label="ALL CAPS"
                  count={PRODUCTS.length}
                  href="/shop"
                  onHover={() => setHoveredCat(null)}
                  highlight
                />
                {CATEGORIES.map((c) => (
                  <CategoryItem
                    key={c.slug}
                    label={c.label.toUpperCase()}
                    count={PRODUCTS.filter((p) => p.category === c.slug).length}
                    href={`/shop?cat=${c.slug}`}
                    onHover={() => setHoveredCat(c.slug)}
                  />
                ))}
              </ul>

              <div className="mt-8">
                <h4 className="mb-3 font-mono text-[10px] tracking-widest text-bone/40">
                  QUICK FILTERS
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  <Chip href="/shop?sort=newest" label="NEW" />
                  <Chip href="/shop?sort=best" label="BESTSELLERS" />
                  <Chip href="/shop?sale=true" label="SALE" />
                  <Chip href="/shop?drop=02" label="DROP 02" />
                </div>
              </div>
            </div>

            {/* Col 4-7: Featured drop card with preview swap */}
            <div className="col-span-5 border-r border-bone/10 p-6">
              <h4 className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-bone/40">
                <Flame size={11} className="text-red" />
                FEATURED — {previewProduct?.drop}
              </h4>
              <a
                href={`/product/${previewProduct?.slug}`}
                className="group block overflow-hidden rounded-2xl bg-graphite"
                data-cursor="hover"
              >
                <div
                  className="relative aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${previewColor}50, #0a0a0a 70%)`,
                  }}
                >
                  <div className="absolute inset-0 grid place-items-center">
                    <svg viewBox="0 0 120 80" className="h-1/2 w-auto">
                      <path d="M10 50 L30 15 L50 15 L70 50 Z" fill="#0A0A0A" />
                      <path
                        d="M30 50 Q60 60 110 50 Q100 65 60 70 Q25 65 10 55 Z"
                        fill={previewColor}
                      />
                      <text
                        x="40"
                        y="42"
                        fontFamily="Anton, sans-serif"
                        fontSize="28"
                        fill={previewColor}
                        fontWeight="900"
                        fontStyle="italic"
                      >
                        AC
                      </text>
                    </svg>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-bone/60">
                          {previewProduct?.tagline}
                        </p>
                        <h3 className="mt-1 font-display text-3xl tracking-tight text-bone">
                          {previewProduct?.name}
                        </h3>
                      </div>
                      <span className="font-display text-2xl text-yellow">
                        ${previewProduct?.price}
                      </span>
                    </div>
                  </div>
                  {previewProduct?.isHot && (
                    <span className="absolute left-5 top-5 rounded-full bg-red px-3 py-1 font-display text-[10px] tracking-widest text-bone">
                      HOT
                    </span>
                  )}
                  {previewProduct?.isNew && (
                    <span className="absolute left-5 top-5 rounded-full bg-yellow px-3 py-1 font-display text-[10px] tracking-widest text-black">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between bg-black/30 px-5 py-3 text-xs text-bone/70 transition-colors group-hover:text-yellow">
                  <span className="font-mono tracking-widest">VIEW PRODUCT</span>
                  <ArrowUpRight size={14} />
                </div>
              </a>
            </div>

            {/* Col 8-10: New Arrivals */}
            <div className="col-span-4 p-6">
              <h4 className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-bone/40">
                <Sparkles size={11} className="text-yellow" />
                NEW ARRIVALS
              </h4>
              <ul className="space-y-3">
                {newArrivals.map((p) => (
                  <li key={p.slug}>
                    <a
                      href={`/product/${p.slug}`}
                      className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-bone/5"
                      data-cursor="hover"
                    >
                      <span
                        className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg"
                        style={{
                          background: `radial-gradient(circle, ${p.colors[0]?.hex ?? "#FFCC00"}40, #0a0a0a 80%)`,
                        }}
                      >
                        <svg viewBox="0 0 120 80" className="h-8 w-auto">
                          <path d="M10 50 L30 15 L50 15 L70 50 Z" fill="#0A0A0A" />
                          <path
                            d="M30 50 Q60 60 110 50 Q100 65 60 70 Q25 65 10 55 Z"
                            fill={p.colors[0]?.hex ?? "#FFCC00"}
                          />
                        </svg>
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-sm tracking-wide text-bone transition-colors group-hover:text-yellow">
                          {p.name}
                        </p>
                        <p className="truncate text-xs text-bone/40">
                          {p.tagline}
                        </p>
                      </div>
                      <span className="font-display text-sm text-yellow">
                        ${p.price}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Sale strip */}
              <a
                href="/shop?sale=true"
                className="group mt-6 flex items-center justify-between rounded-xl border border-red/30 bg-red/5 px-4 py-3 transition-all hover:border-red/60 hover:bg-red/10"
                data-cursor="hover"
              >
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-red" />
                  <span className="font-display text-sm tracking-widest text-red">
                    DROP 01 OUTLET
                  </span>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-red transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>

          {/* Footer strip */}
          <div className="flex items-center justify-between border-t border-bone/10 bg-black/40 px-6 py-3 text-xs">
            <span className="font-mono tracking-widest text-bone/50">
              200 PER DROP · HAND-FINISHED · BROOKLYN · TOKYO · BERLIN
            </span>
            <a
              href="/shop"
              className="font-display tracking-widest text-bone/70 transition-colors hover:text-yellow"
            >
              SEE FULL SHOP →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryItem({
  label,
  count,
  href,
  onHover,
  highlight,
}: {
  label: string;
  count: number;
  href: string;
  onHover: () => void;
  highlight?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        onMouseEnter={onHover}
        className={`group flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
          highlight
            ? "text-bone hover:bg-yellow/10 hover:text-yellow"
            : "text-bone/70 hover:bg-bone/5 hover:text-yellow"
        }`}
        data-cursor="hover"
      >
        <span className="font-display text-base tracking-wide">{label}</span>
        <span className="font-mono text-[10px] text-bone/40 transition-colors group-hover:text-yellow/60">
          {String(count).padStart(2, "0")}
        </span>
      </a>
    </li>
  );
}

function Chip({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-full border border-bone/15 px-3 py-1 font-mono text-[10px] tracking-widest text-bone/60 transition-colors hover:border-yellow hover:text-yellow"
      data-cursor="hover"
    >
      {label}
    </a>
  );
}
