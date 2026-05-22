import { useState } from "react";
import { ArrowUpRight, Heart, ShieldCheck, Truck, Undo2 } from "lucide-react";
import type { Product } from "@/data/products";
import { cart } from "@/lib/cart";

interface Props {
  product: Product;
}

export default function BuyBox({ product }: Props) {
  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const [bumped, setBumped] = useState(false);

  const color = product.colors[colorIdx];

  const onAdd = () => {
    if (product.soldOut || !color) return;
    cart.add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: color.name,
      colorHex: color.hex,
      size,
      qty,
      image: product.images[0]?.src ?? "",
    });
    setBumped(true);
    setTimeout(() => setBumped(false), 1200);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-bone/60">
          <span className="block h-px w-12 bg-yellow"></span>
          <span>{product.drop}</span>
          {product.isNew && (
            <span className="rounded-full bg-yellow px-2 py-0.5 text-black">
              NEW
            </span>
          )}
          {product.isHot && (
            <span className="rounded-full bg-red px-2 py-0.5 text-bone">
              HOT
            </span>
          )}
        </div>
        <h1
          className="mt-4 font-display tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 0.9 }}
        >
          {product.name}
        </h1>
        <p className="mt-3 text-lg text-bone/60">{product.tagline}</p>
      </div>

      <div className="flex items-end gap-4">
        <span className="font-display text-5xl text-yellow">
          ${product.price}
        </span>
        {product.compareAt && (
          <span className="mb-2 text-bone/40 line-through">
            ${product.compareAt}
          </span>
        )}
        {product.soldOut && (
          <span className="mb-2 rounded-full bg-bone/10 px-3 py-1 font-display text-xs tracking-widest text-bone/60">
            SOLD OUT
          </span>
        )}
      </div>

      <p className="max-w-md text-sm leading-relaxed text-bone/70">
        {product.description}
      </p>

      {/* Color picker */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-xs tracking-widest text-bone/60">
            COLOR
          </span>
          <span className="text-xs text-bone">{color?.name}</span>
        </div>
        <div className="flex gap-2">
          {product.colors.map((c, i) => (
            <button
              key={c.hex}
              onClick={() => setColorIdx(i)}
              className={`relative h-12 w-12 rounded-full border-2 transition-all ${
                i === colorIdx
                  ? "border-yellow scale-110"
                  : "border-bone/20 hover:border-bone/60"
              }`}
              style={{ background: c.hex }}
              aria-label={`Select color ${c.name}`}
              data-cursor="hover"
            >
              {i === colorIdx && (
                <span className="absolute -inset-2 rounded-full border border-yellow/40" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size picker */}
      {product.sizes.length > 1 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="font-display text-xs tracking-widest text-bone/60">
              SIZE
            </span>
            <a href="/sizing" className="text-xs text-yellow hover:underline">
              Size guide →
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-full border py-3 font-display text-sm tracking-wider transition-all ${
                  size === s
                    ? "border-yellow bg-yellow text-black"
                    : "border-bone/20 text-bone hover:border-yellow"
                }`}
                data-cursor="hover"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Qty + Add */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="flex items-center gap-3 rounded-full border border-bone/20 px-2">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-12 w-12 place-items-center text-bone/60 hover:text-yellow"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-6 text-center font-display text-lg">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-12 w-12 place-items-center text-bone/60 hover:text-yellow"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          onClick={onAdd}
          disabled={product.soldOut}
          className={`group flex flex-1 items-center justify-center gap-2 rounded-full px-8 font-display text-sm tracking-widest transition-all ${
            product.soldOut
              ? "cursor-not-allowed bg-bone/10 text-bone/40"
              : bumped
                ? "bg-yellow text-black"
                : "bg-yellow text-black hover:scale-[1.02] active:scale-[0.98]"
          }`}
          data-cursor="hover"
        >
          {product.soldOut ? "SOLD OUT" : bumped ? "ADDED ✓" : "ADD TO BAG"}
          {!product.soldOut && !bumped && (
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          )}
        </button>

        <button
          className="grid h-12 w-12 place-items-center rounded-full border border-bone/20 text-bone/60 transition-all hover:border-yellow hover:text-yellow"
          aria-label="Save to wishlist"
        >
          <Heart size={18} />
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 border-t border-bone/10 pt-6 text-xs text-bone/60">
        <div className="flex flex-col items-center gap-1 text-center">
          <Truck size={18} className="text-yellow" />
          <span>Free over $75</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <Undo2 size={18} className="text-yellow" />
          <span>30-day returns</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <ShieldCheck size={18} className="text-yellow" />
          <span>2-yr warranty</span>
        </div>
      </div>
    </div>
  );
}
