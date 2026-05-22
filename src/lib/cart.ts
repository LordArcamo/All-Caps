export type CartItem = {
  slug: string;
  name: string;
  price: number;
  color: string;
  colorHex: string;
  size: string;
  qty: number;
  image: string;
};

const STORAGE_KEY = "allcaps:cart";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart:change", { detail: { items } }));
  const count = items.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    (el as HTMLElement).textContent = String(count);
  });
}

export const cart = {
  get(): CartItem[] {
    return load();
  },
  add(item: Omit<CartItem, "qty"> & { qty?: number }) {
    const items = load();
    const key = `${item.slug}:${item.color}:${item.size}`;
    const existing = items.find(
      (i) => `${i.slug}:${i.color}:${i.size}` === key,
    );
    if (existing) {
      existing.qty += item.qty ?? 1;
    } else {
      items.push({ ...item, qty: item.qty ?? 1 });
    }
    save(items);
    window.dispatchEvent(new CustomEvent("cart:open"));
  },
  remove(slug: string, color: string, size: string) {
    const items = load().filter(
      (i) => !(i.slug === slug && i.color === color && i.size === size),
    );
    save(items);
  },
  setQty(slug: string, color: string, size: string, qty: number) {
    const items = load();
    const item = items.find(
      (i) => i.slug === slug && i.color === color && i.size === size,
    );
    if (item) {
      item.qty = Math.max(1, qty);
      save(items);
    }
  },
  clear() {
    save([]);
  },
  subtotal(): number {
    return load().reduce((s, i) => s + i.price * i.qty, 0);
  },
  count(): number {
    return load().reduce((s, i) => s + i.qty, 0);
  },
};
