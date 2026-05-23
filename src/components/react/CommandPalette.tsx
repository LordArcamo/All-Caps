import { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Search,
  ShoppingBag,
  BookOpen,
  Compass,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";

type ResultGroup = "PRODUCT" | "STORY" | "PAGE";

const STORIES = [
  { slug: "brooklyn-workshop", title: "Inside the Brooklyn workshop", date: "MAY 12, 2026" },
  { slug: "cap-is-the-new-tee", title: "The cap is the new t-shirt", date: "APR 28, 2026" },
  { slug: "drop-02-diary", title: "Drop 02 — the photo diary", date: "APR 18, 2026" },
  { slug: "mia-takeuchi", title: "Mia Takeuchi on Tokyo workshop culture", date: "APR 02, 2026" },
  { slug: "death-of-influencer-cap", title: "The death of the influencer cap", date: "MAR 19, 2026" },
  { slug: "heavy-twill-deep-dive", title: "What's in a heavy-twill cap that lasts ten years?", date: "MAR 05, 2026" },
];

const PAGES = [
  { href: "/", label: "HOME", desc: "Drop 02 hero" },
  { href: "/shop", label: "SHOP", desc: "All caps, all editions" },
  { href: "/stories", label: "STORIES", desc: "Field notes + journal" },
  { href: "/about", label: "ABOUT", desc: "The story behind ALL CAPS" },
  { href: "/lookbook", label: "LOOKBOOK", desc: "Volume 03" },
  { href: "/sizing", label: "SIZE GUIDE", desc: "How to measure your head" },
];

const SUGGESTED = [
  { label: "VOID RUNNER", href: "/product/void-runner", reason: "Best seller" },
  { label: "DROP 02", href: "/shop?drop=02", reason: "Just dropped" },
  { label: "STORIES", href: "/stories", reason: "Latest journal" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Open on ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Open from search button click
  useEffect(() => {
    const onTrigger = () => setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener("cmdk:open", onOpen);
    const triggers = document.querySelectorAll("[data-cmdk-trigger]");
    triggers.forEach((t) => t.addEventListener("click", onTrigger));
    return () => {
      window.removeEventListener("cmdk:open", onOpen);
      triggers.forEach((t) => t.removeEventListener("click", onTrigger));
    };
  }, []);

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      window.location.href = href;
    }, 80);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div
        className={`fixed inset-x-0 top-[15vh] z-[201] mx-auto w-[92%] max-w-2xl transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <Command
          label="Search ALL CAPS"
          className="overflow-hidden rounded-3xl border border-bone/15 bg-ink shadow-2xl shadow-yellow/5"
          shouldFilter
        >
          {/* Header bar */}
          <div className="flex items-center gap-3 border-b border-bone/10 px-5 py-4">
            <Search size={18} className="text-bone/40" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search caps, stories, anywhere…"
              className="flex-1 bg-transparent font-display text-xl tracking-wide text-bone placeholder:text-bone/30 focus:outline-none"
              autoFocus
            />
            <kbd className="hidden rounded-md border border-bone/20 bg-bone/5 px-2 py-0.5 font-mono text-[10px] tracking-widest text-bone/60 sm:block">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <Command.List
            data-lenis-prevent
            className="max-h-[60vh] overflow-y-auto px-2 py-2"
          >
            <Command.Empty>
              <EmptyState query={query} />
            </Command.Empty>

            {/* Suggested (when no query) */}
            {!query && (
              <Group label="SUGGESTED" icon={<Sparkles size={12} />}>
                {SUGGESTED.map((s) => (
                  <Command.Item
                    key={s.href}
                    value={`suggested ${s.label}`}
                    onSelect={() => go(s.href)}
                    className={itemClasses}
                  >
                    <span className="font-mono text-[10px] text-yellow">★</span>
                    <span className="flex-1 font-display tracking-wide">
                      {s.label}
                    </span>
                    <span className="text-xs text-bone/40">{s.reason}</span>
                    <ArrowUpRight size={14} className="text-bone/40" />
                  </Command.Item>
                ))}
              </Group>
            )}

            {/* Products */}
            <Group label="PRODUCTS" icon={<ShoppingBag size={12} />}>
              {PRODUCTS.map((p) => (
                <Command.Item
                  key={p.slug}
                  value={`product ${p.name} ${p.category} ${p.tagline} ${p.colors.map((c) => c.name).join(" ")}`}
                  onSelect={() => go(`/product/${p.slug}`)}
                  className={itemClasses}
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg"
                    style={{
                      background: `radial-gradient(circle, ${p.colors[0]?.hex ?? "#FFCC00"}40, #0a0a0a 80%)`,
                    }}
                  >
                    <svg viewBox="0 0 120 80" className="h-6 w-auto">
                      <path d="M10 50 L30 15 L50 15 L70 50 Z" fill="#0A0A0A" />
                      <path
                        d="M30 50 Q60 60 110 50 Q100 65 60 70 Q25 65 10 55 Z"
                        fill={p.colors[0]?.hex ?? "#FFCC00"}
                      />
                    </svg>
                  </span>
                  <span className="font-mono text-[10px] text-bone/40">
                    PRODUCT ·
                  </span>
                  <span className="flex-1 font-display tracking-wide">
                    {p.name}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-bone/50">
                    {p.category}
                  </span>
                  <span className="font-display text-sm text-yellow">
                    ${p.price}
                  </span>
                </Command.Item>
              ))}
            </Group>

            {/* Stories */}
            <Group label="STORIES" icon={<BookOpen size={12} />}>
              {STORIES.map((s) => (
                <Command.Item
                  key={s.slug}
                  value={`story ${s.title}`}
                  onSelect={() => go(`/stories/${s.slug}`)}
                  className={itemClasses}
                >
                  <span className="font-mono text-[10px] text-bone/40">
                    STORY ·
                  </span>
                  <span className="flex-1 truncate font-display tracking-wide">
                    {s.title}
                  </span>
                  <span className="font-mono text-[10px] text-bone/40">
                    {s.date}
                  </span>
                </Command.Item>
              ))}
            </Group>

            {/* Pages */}
            <Group label="PAGES" icon={<Compass size={12} />}>
              {PAGES.map((p) => (
                <Command.Item
                  key={p.href}
                  value={`page ${p.label} ${p.desc}`}
                  onSelect={() => go(p.href)}
                  className={itemClasses}
                >
                  <span className="font-mono text-[10px] text-bone/40">
                    PAGE ·
                  </span>
                  <span className="flex-1 font-display tracking-wide">
                    {p.label}
                  </span>
                  <span className="text-xs text-bone/40">{p.desc}</span>
                </Command.Item>
              ))}
            </Group>
          </Command.List>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-bone/10 bg-bone/[0.02] px-5 py-3">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-bone/40">
              <span className="flex items-center gap-1">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                NAVIGATE
              </span>
              <span className="flex items-center gap-1">
                <Kbd>↵</Kbd>
                SELECT
              </span>
              <span className="flex items-center gap-1">
                <Kbd>ESC</Kbd>
                CLOSE
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-widest text-bone/40">
              ALL CAPS · SEARCH
            </span>
          </div>
        </Command>
      </div>
    </>
  );
}

const itemClasses =
  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-bone/80 cursor-pointer data-[selected=true]:bg-yellow/10 data-[selected=true]:text-bone data-[selected=true]:ring-1 data-[selected=true]:ring-yellow/40 transition-colors";

function Group({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Command.Group
      heading={
        <div className="flex items-center gap-2 px-4 pb-1 pt-3 font-mono text-[10px] tracking-widest text-bone/40">
          {icon}
          <span>{label}</span>
        </div>
      }
    >
      {children}
    </Command.Group>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-bone/20 bg-bone/5 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-bone/70">
      {children}
    </kbd>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="grid place-items-center px-6 py-12 text-center">
      <div className="font-display text-3xl tracking-tight text-bone/40">
        NOTHING MATCHES "{query.toUpperCase()}"
      </div>
      <p className="mt-3 text-sm text-bone/50">
        Try a cap name, a city, or "drop".
      </p>
      <button
        onClick={() => (window.location.href = "/shop")}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-yellow/40 px-5 py-2 font-display text-xs tracking-widest text-yellow hover:bg-yellow hover:text-black"
      >
        BROWSE ALL CAPS <ArrowUpRight size={12} />
      </button>
    </div>
  );
}
