export type WishItem = {
  slug: string;
  name: string;
  price: number;
  color: string;
  colorHex: string;
  image: string;
  category?: string;
  addedAt: number;
};

const STORAGE_KEY = "allcaps:wishlist";

function load(): WishItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(items: WishItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("wishlist:change", { detail: { items } }));
  document.querySelectorAll("[data-wishlist-count]").forEach((el) => {
    (el as HTMLElement).textContent = String(items.length);
  });
}

export const wishlist = {
  get(): WishItem[] {
    return load();
  },
  has(slug: string): boolean {
    return load().some((i) => i.slug === slug);
  },
  toggle(item: Omit<WishItem, "addedAt">): boolean {
    const items = load();
    const idx = items.findIndex((i) => i.slug === item.slug);
    if (idx >= 0) {
      items.splice(idx, 1);
      save(items);
      window.dispatchEvent(
        new CustomEvent("toast:push", {
          detail: {
            id: Date.now(),
            kind: "info",
            title: `REMOVED FROM WISHLIST`,
            body: item.name,
            duration: 2800,
          },
        }),
      );
      return false;
    } else {
      items.push({ ...item, addedAt: Date.now() });
      save(items);
      window.dispatchEvent(
        new CustomEvent("toast:push", {
          detail: {
            id: Date.now(),
            kind: "success",
            title: `SAVED · ${item.name}`,
            body: "Added to wishlist",
            color: item.colorHex,
            href: "/wishlist",
            hrefLabel: "VIEW WISHLIST",
            duration: 3000,
          },
        }),
      );
      return true;
    }
  },
  remove(slug: string) {
    const items = load().filter((i) => i.slug !== slug);
    save(items);
  },
  clear() {
    save([]);
  },
  count(): number {
    return load().length;
  },
};
