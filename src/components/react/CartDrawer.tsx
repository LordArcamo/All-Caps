import { useEffect, useState } from "react";
import { X, Minus, Plus, ArrowUpRight } from "lucide-react";
import { cart, type CartItem } from "@/lib/cart";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(cart.get());

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as { items: CartItem[] };
      setItems(detail.items);
    };
    const onOpen = () => setOpen(true);
    const onTrigger = () => setOpen(true);

    window.addEventListener("cart:change", onChange);
    window.addEventListener("cart:open", onOpen);

    const triggers = document.querySelectorAll("[data-cart-trigger]");
    triggers.forEach((t) => t.addEventListener("click", onTrigger));

    return () => {
      window.removeEventListener("cart:change", onChange);
      window.removeEventListener("cart:open", onOpen);
      triggers.forEach((t) => t.removeEventListener("click", onTrigger));
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/70 backdrop-blur-md transition-opacity duration-500 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-[101] flex w-full max-w-md flex-col bg-ink shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
          <div>
            <h2 className="font-display text-2xl tracking-tight">YOUR BAG</h2>
            <p className="mt-0.5 font-mono text-[10px] tracking-widest text-bone/40">
              {items.length === 0
                ? "EMPTY"
                : `${items.reduce((s, i) => s + i.qty, 0)} ITEMS`}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-bone/20 text-bone/60 hover:border-yellow hover:text-yellow"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto" data-lenis-prevent>
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-10 text-center">
              <div className="font-display text-6xl text-bone/20">∅</div>
              <h3 className="mt-6 font-display text-2xl">NOTHING IN HERE.</h3>
              <p className="mt-3 text-sm text-bone/60">
                Your bag's a ghost. Time to fix that.
              </p>
              <a
                href="/shop"
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow px-6 py-3 font-display text-xs tracking-widest text-black hover:scale-[1.02]"
              >
                START SHOPPING <ArrowUpRight size={14} />
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-bone/10">
              {items.map((item) => (
                <CartRow
                  key={`${item.slug}:${item.color}:${item.size}`}
                  item={item}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-bone/10 px-6 py-6">
            <ProgressBar subtotal={subtotal} />

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between text-bone/60">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-bone/60">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-yellow">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="mt-2 flex justify-between border-t border-bone/10 pt-3 font-display text-lg">
                <span>TOTAL</span>
                <span className="text-yellow">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-yellow py-4 font-display text-sm tracking-widest text-black transition hover:scale-[1.02]">
              CHECKOUT <ArrowUpRight size={16} />
            </button>
            <p className="mt-3 text-center text-[10px] text-bone/40">
              Demo build — checkout disabled. Mock cart only.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

function CartRow({ item }: { item: CartItem }) {
  return (
    <li className="flex gap-4 px-6 py-5">
      <div
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl"
        style={{
          background: `radial-gradient(circle, ${item.colorHex}40, #0a0a0a 80%)`,
        }}
      >
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 120 80" className="h-2/3 w-auto">
            <path d="M10 50 L30 15 L50 15 L70 50 Z" fill="#0A0A0A" />
            <path
              d="M30 50 Q60 60 110 50 Q100 65 60 70 Q25 65 10 55 Z"
              fill={item.colorHex}
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <a
            href={`/product/${item.slug}`}
            className="font-display text-base tracking-tight hover:text-yellow"
          >
            {item.name}
          </a>
          <button
            onClick={() => cart.remove(item.slug, item.color, item.size)}
            className="text-bone/40 hover:text-red"
            aria-label="Remove"
          >
            <X size={14} />
          </button>
        </div>
        <span className="mt-0.5 text-xs text-bone/50">
          {item.color} · {item.size}
        </span>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full border border-bone/15">
            <button
              onClick={() =>
                cart.setQty(item.slug, item.color, item.size, item.qty - 1)
              }
              className="grid h-7 w-7 place-items-center text-bone/60 hover:text-yellow"
              aria-label="Decrease"
            >
              <Minus size={12} />
            </button>
            <span className="w-5 text-center font-display text-sm">
              {item.qty}
            </span>
            <button
              onClick={() =>
                cart.setQty(item.slug, item.color, item.size, item.qty + 1)
              }
              className="grid h-7 w-7 place-items-center text-bone/60 hover:text-yellow"
              aria-label="Increase"
            >
              <Plus size={12} />
            </button>
          </div>
          <span className="font-display text-base text-yellow">
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </div>
      </div>
    </li>
  );
}

function ProgressBar({ subtotal }: { subtotal: number }) {
  const target = 75;
  const pct = Math.min(100, (subtotal / target) * 100);
  const remaining = Math.max(0, target - subtotal);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-bone/60">
          {remaining > 0 ? (
            <>
              <span className="text-yellow">${remaining.toFixed(2)}</span> from
              free shipping
            </>
          ) : (
            <span className="text-yellow">✓ FREE SHIPPING UNLOCKED</span>
          )}
        </span>
        <span className="font-mono text-[10px] text-bone/40">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-bone/10">
        <div
          className="h-full rounded-full bg-yellow transition-all duration-500"
          style={{ width: `${pct}%` }}
        ></div>
      </div>
    </div>
  );
}
