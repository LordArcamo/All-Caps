import { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingBag, ArrowUpRight } from "lucide-react";
import { wishlist, type WishItem } from "@/lib/wishlist";
import { cart } from "@/lib/cart";
import { PRODUCTS } from "@/data/products";

export default function WishlistPage() {
  const [items, setItems] = useState<WishItem[]>([]);

  useEffect(() => {
    setItems(wishlist.get());
    const onChange = () => setItems(wishlist.get());
    window.addEventListener("wishlist:change", onChange);
    return () => window.removeEventListener("wishlist:change", onChange);
  }, []);

  const moveToBag = (item: WishItem) => {
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    if (!product) return;
    cart.add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: item.color,
      colorHex: item.colorHex,
      size: product.sizes[0] ?? "One Size",
      qty: 1,
      image: product.images[0]?.src ?? "",
    });
    wishlist.remove(item.slug);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="mb-8 inline-grid h-24 w-24 place-items-center rounded-full bg-bone/5">
          <Heart size={36} className="text-bone/30" />
        </div>
        <h2 className="font-display text-5xl tracking-tight lg:text-7xl">
          NOTHING <span className="italic text-yellow">SAVED.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-bone/60">
          Hit the heart on any cap you love. We'll keep it here.
        </p>
        <a
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-display text-sm tracking-widest text-black hover:scale-[1.02]"
        >
          START BROWSING <ArrowUpRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-xs tracking-widest text-bone/40">
          {items.length} {items.length === 1 ? "PIECE" : "PIECES"} SAVED
        </p>
        <button
          onClick={() => wishlist.clear()}
          className="font-mono text-[10px] tracking-widest text-bone/40 hover:text-red"
        >
          CLEAR ALL
        </button>
      </div>

      <ul className="grid gap-4">
        {items.map((item) => {
          const product = PRODUCTS.find((p) => p.slug === item.slug);
          return (
            <li
              key={item.slug}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 rounded-2xl border border-bone/10 bg-ink/60 p-4 transition-colors hover:border-yellow/40"
            >
              <a href={`/product/${item.slug}`} className="block">
                <div
                  className="relative h-24 w-24 overflow-hidden rounded-xl"
                  style={{
                    background: `radial-gradient(circle, ${item.colorHex}40, #0a0a0a 80%)`,
                  }}
                >
                  {item.image.endsWith(".png") ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <svg viewBox="0 0 120 80" className="h-2/3 w-auto">
                        <path
                          d="M10 50 L30 15 L50 15 L70 50 Z"
                          fill="#0A0A0A"
                        />
                        <path
                          d="M30 50 Q60 60 110 50 Q100 65 60 70 Q25 65 10 55 Z"
                          fill={item.colorHex}
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </a>

              <div className="min-w-0">
                <a
                  href={`/product/${item.slug}`}
                  className="font-display text-2xl tracking-tight transition-colors hover:text-yellow"
                >
                  {item.name}
                </a>
                <p className="mt-1 text-xs uppercase tracking-widest text-bone/40">
                  {item.color}
                  {product?.tagline ? ` · ${product.tagline}` : ""}
                </p>
                <p className="mt-1 font-display text-xl text-yellow">
                  ${item.price}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => moveToBag(item)}
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-yellow px-4 py-2 font-display text-xs tracking-widest text-black transition-all hover:scale-[1.05]"
                  disabled={product?.soldOut}
                >
                  {product?.soldOut ? "SOLD OUT" : "MOVE TO BAG"}
                  {!product?.soldOut && <ShoppingBag size={12} />}
                </button>
                <button
                  onClick={() => wishlist.remove(item.slug)}
                  className="inline-flex items-center gap-1.5 text-xs text-bone/40 hover:text-red"
                >
                  <Trash2 size={10} />
                  REMOVE
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
