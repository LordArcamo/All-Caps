export const SITE = {
  name: "ALL CAPS",
  tagline: "Premium caps. Pure attitude.",
  description:
    "ALL CAPS is a premium headwear label built for those who don't whisper. Snapbacks, fitteds, dad caps, beanies — all crafted, all loud.",
  url: "https://allcaps.example.com",
  email: "drop@allcaps.co",
  phone: "+1 (555) ALL-CAPS",
  address: "Brooklyn · Tokyo · Berlin",
  social: {
    instagram: "https://instagram.com/allcaps",
    tiktok: "https://tiktok.com/@allcaps",
    twitter: "https://twitter.com/allcaps",
    youtube: "https://youtube.com/@allcaps",
  },
} as const;

export const NAV = {
  primary: [
    { label: "Shop", href: "/shop" },
    { label: "Drops", href: "/drops" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Stories", href: "/stories" },
    { label: "About", href: "/about" },
  ] as const,
  account: [
    { label: "Account", href: "/account" },
    { label: "Wishlist", href: "/wishlist" },
  ] as const,
  shop: [
    { label: "All Caps", href: "/shop", featured: true },
    { label: "Snapbacks", href: "/shop?cat=snapback" },
    { label: "Fitteds", href: "/shop?cat=fitted" },
    { label: "Dad Caps", href: "/shop?cat=dad" },
    { label: "Beanies", href: "/shop?cat=beanie" },
    { label: "Trucker", href: "/shop?cat=trucker" },
  ],
  footer: {
    shop: [
      { label: "All Caps", href: "/shop" },
      { label: "New Drops", href: "/drops" },
      { label: "Best Sellers", href: "/shop?sort=best" },
      { label: "Sale", href: "/shop?sale=true" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Stories", href: "/stories" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Press", href: "/press" },
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Size Guide", href: "/sizing" },
    ],
  },
} as const;

export type NavItem = (typeof NAV.primary)[number];
