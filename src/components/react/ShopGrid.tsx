import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown, Heart } from "lucide-react";
import { PRODUCTS, CATEGORIES, type Product, type ProductCategory } from "@/data/products";
import { cn } from "@/lib/cn";

type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export default function ShopGrid() {
  const [cat, setCat] = useState<ProductCategory | "all">("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxPrice, setMaxPrice] = useState(100);

  const filtered = useMemo(() => {
    let list: Product[] =
      cat === "all" ? [...PRODUCTS] : PRODUCTS.filter((p) => p.category === cat);
    list = list.filter((p) => p.price <= maxPrice);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
    }
    return list;
  }, [cat, sort, maxPrice]);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-28 z-30 -mx-6 mb-12 border-b border-bone/10 bg-black/80 px-6 py-4 backdrop-blur-xl lg:-mx-10 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            <FilterChip
              active={cat === "all"}
              onClick={() => setCat("all")}
              label={`ALL (${PRODUCTS.length})`}
            />
            {CATEGORIES.map((c) => {
              const count = PRODUCTS.filter((p) => p.category === c.slug).length;
              return (
                <FilterChip
                  key={c.slug}
                  active={cat === c.slug}
                  onClick={() => setCat(c.slug)}
                  label={`${c.label.toUpperCase()} (${count})`}
                />
              );
            })}
          </div>

          {/* Price + Sort */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-bone/40">
                MAX
              </span>
              <input
                type="range"
                min={30}
                max={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="h-1 w-32 cursor-pointer appearance-none rounded-full bg-bone/10 accent-yellow"
              />
              <span className="font-display text-sm text-yellow">${maxPrice}</span>
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-full border border-bone/20 bg-black px-5 py-2 pr-9 font-mono text-xs tracking-widest text-bone hover:border-yellow focus:border-yellow focus:outline-none"
              >
                <option value="featured">FEATURED</option>
                <option value="newest">NEWEST</option>
                <option value="price-asc">$ LOW → HIGH</option>
                <option value="price-desc">$ HIGH → LOW</option>
              </select>
              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-bone/60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest text-bone/40">
          SHOWING {filtered.length} OF {PRODUCTS.length} PIECES
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="grid place-items-center rounded-3xl border border-dashed border-bone/20 py-24 text-center">
          <div>
            <div className="font-display text-4xl text-bone/40">NOTHING TO SEE</div>
            <p className="mt-3 text-bone/60">Drop your filters and try again.</p>
            <button
              onClick={() => {
                setCat("all");
                setMaxPrice(100);
                setSort("featured");
              }}
              className="mt-6 rounded-full bg-yellow px-6 py-3 font-display text-xs tracking-widest text-black"
            >
              RESET FILTERS
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <ShopCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 font-mono text-xs tracking-widest transition-all",
        active
          ? "border-yellow bg-yellow text-black"
          : "border-bone/20 text-bone/70 hover:border-yellow hover:text-yellow",
      )}
      data-cursor="hover"
    >
      {label}
    </button>
  );
}

function ShopCard({ product, index }: { product: Product; index: number }) {
  const primaryColor = product.colors[0]?.hex ?? "#FFCC00";
  const heroSrc = product.images[0]?.src ?? "";
  const hasGeneratedHero = heroSrc.endsWith(".png");
  return (
    <a
      href={`/product/${product.slug}`}
      className="group relative block"
      data-cursor="hover"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-graphite">
        <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="rounded-full bg-yellow px-3 py-1 font-display text-[10px] tracking-widest text-black">
              NEW
            </span>
          )}
          {product.isHot && (
            <span className="rounded-full bg-red px-3 py-1 font-display text-[10px] tracking-widest text-bone">
              HOT
            </span>
          )}
          {product.soldOut && (
            <span className="rounded-full bg-black/80 px-3 py-1 font-display text-[10px] tracking-widest text-bone">
              SOLD OUT
            </span>
          )}
        </div>

        <button
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-bone/80 opacity-0 backdrop-blur transition-all hover:text-red group-hover:opacity-100"
          aria-label="Save to wishlist"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Heart size={14} />
        </button>

        {hasGeneratedHero ? (
          <img
            src={heroSrc}
            alt={product.images[0]?.alt ?? product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 transition-all duration-700 group-hover:scale-110"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${primaryColor}40, #0a0a0a 70%)`,
              }}
            />
            <div className="noise-overlay absolute inset-0 opacity-25"></div>

            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <svg viewBox="0 0 120 80" className="h-24 w-auto">
                <path d="M10 50 L30 15 L50 15 L70 50 Z" fill="#0A0A0A" />
                <path
                  d="M30 50 Q60 60 110 50 Q100 65 60 70 Q25 65 10 55 Z"
                  fill={primaryColor}
                />
                <text
                  x="40"
                  y="42"
                  fontFamily="Anton, Bebas Neue, sans-serif"
                  fontSize="28"
                  fill={primaryColor}
                  fontWeight="900"
                  fontStyle="italic"
                >
                  AC
                </text>
              </svg>
            </div>
          </>
        )}

        <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.hex}
              className="h-3 w-3 rounded-full border border-bone/30"
              style={{ background: c.hex }}
              title={c.name}
            />
          ))}
        </div>

        <div className="absolute inset-x-4 bottom-4 z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-between rounded-full bg-yellow px-4 py-2.5 font-display text-xs tracking-widest text-black">
            <span>QUICK VIEW</span>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg tracking-tight text-bone">
            {product.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-bone/50">
            {product.category} · {product.drop}
          </p>
        </div>
        <div className="text-right">
          {product.compareAt && (
            <span className="block text-xs text-bone/40 line-through">
              ${product.compareAt}
            </span>
          )}
          <span className="font-display text-xl text-yellow">
            ${product.price}
          </span>
        </div>
      </div>
    </a>
  );
}
