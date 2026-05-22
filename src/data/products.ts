export type ProductCategory = "snapback" | "fitted" | "dad" | "beanie" | "trucker";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAt?: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  tagline: string;
  description: string;
  features: string[];
  materials: string[];
  drop: string;
  isNew?: boolean;
  isHot?: boolean;
  soldOut?: boolean;
  images: { src: string; alt: string }[];
  hero?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "void-runner",
    name: "VOID RUNNER",
    category: "snapback",
    price: 65,
    colors: [
      { name: "Jet", hex: "#0A0A0A" },
      { name: "Hype Yellow", hex: "#FFCC00" },
      { name: "Inferno", hex: "#FF2D2D" },
    ],
    sizes: ["One Size"],
    tagline: "The cap that started the riot.",
    description:
      "Six-panel structured snapback. Heavy-twill crown, flat brim, raised stitch logo. Built to be seen, made to last.",
    features: [
      "Heavy 100% cotton twill",
      "Structured 6-panel crown",
      "Flat brim with green undervisor",
      "Adjustable snap closure",
      "Raised silicone logo",
    ],
    materials: ["100% Cotton Twill", "Polyester Mesh Lining"],
    drop: "DROP 01",
    isHot: true,
    images: [
      { src: "/products/void-runner-1.png", alt: "Void Runner snapback front view" },
      { src: "/products/void-runner-2.webp", alt: "Void Runner snapback side view" },
      { src: "/products/void-runner-3.webp", alt: "Void Runner snapback back view" },
      { src: "/products/void-runner-4.webp", alt: "Void Runner snapback on model" },
    ],
  },
  {
    slug: "static-fitted",
    name: "STATIC FITTED",
    category: "fitted",
    price: 75,
    colors: [
      { name: "Jet", hex: "#0A0A0A" },
      { name: "Bone", hex: "#F5F5F0" },
    ],
    sizes: ["7", "7 1/8", "7 1/4", "7 3/8", "7 1/2", "7 5/8"],
    tagline: "Lock it in.",
    description:
      "Closed-back wool fitted. Old-school construction, modern silhouette. The cap your dad wishes he had.",
    features: [
      "100% wool felt",
      "Embroidered 3D logo",
      "Closed back, no adjustment",
      "Cotton sweatband",
      "Sized fit, 6 sizes",
    ],
    materials: ["100% Wool", "Cotton Sweatband"],
    drop: "DROP 01",
    isNew: true,
    images: [
      { src: "/products/static-fitted-1.webp", alt: "Static Fitted cap front" },
      { src: "/products/static-fitted-2.webp", alt: "Static Fitted cap angle" },
      { src: "/products/static-fitted-3.webp", alt: "Static Fitted cap detail" },
    ],
  },
  {
    slug: "dust-dad",
    name: "DUST DAD",
    category: "dad",
    price: 48,
    colors: [
      { name: "Sand", hex: "#D9C9A8" },
      { name: "Faded Black", hex: "#3A3A3A" },
      { name: "Olive", hex: "#5A6048" },
    ],
    sizes: ["One Size"],
    tagline: "Soft on top. Sharp underneath.",
    description:
      "Garment-washed cotton dad cap. Unstructured crown, curved brim, brass slide buckle. Made to look better the more you wear it.",
    features: [
      "Stone-washed cotton",
      "Unstructured 6-panel",
      "Curved brim",
      "Brass slide-buckle closure",
      "Tonal embroidered logo",
    ],
    materials: ["100% Garment-Washed Cotton"],
    drop: "DROP 01",
    images: [
      { src: "/products/dust-dad-1.webp", alt: "Dust Dad cap front" },
      { src: "/products/dust-dad-2.webp", alt: "Dust Dad cap on model" },
      { src: "/products/dust-dad-3.webp", alt: "Dust Dad cap detail" },
    ],
  },
  {
    slug: "shadow-beanie",
    name: "SHADOW BEANIE",
    category: "beanie",
    price: 38,
    compareAt: 48,
    colors: [
      { name: "Jet", hex: "#0A0A0A" },
      { name: "Bone", hex: "#F5F5F0" },
      { name: "Hype Yellow", hex: "#FFCC00" },
    ],
    sizes: ["One Size"],
    tagline: "Pull it down. Disappear.",
    description:
      "Heavyweight ribbed merino beanie. Double-folded cuff, woven brand tag. Cold weather, warm intentions.",
    features: [
      "100% merino wool",
      "Heavyweight 2x2 rib",
      "Double-folded cuff",
      "Woven side label",
    ],
    materials: ["100% Merino Wool"],
    drop: "WINTER",
    images: [
      { src: "/products/shadow-beanie-1.webp", alt: "Shadow Beanie front" },
      { src: "/products/shadow-beanie-2.webp", alt: "Shadow Beanie on model" },
    ],
  },
  {
    slug: "grid-trucker",
    name: "GRID TRUCKER",
    category: "trucker",
    price: 55,
    colors: [
      { name: "Black/Yellow", hex: "#FFCC00" },
      { name: "Black/Red", hex: "#FF2D2D" },
      { name: "Black/White", hex: "#F5F5F0" },
    ],
    sizes: ["One Size"],
    tagline: "Mesh meets menace.",
    description:
      "Classic 5-panel trucker with foam crown and breathable mesh back. Snap-back closure, raised PVC logo patch.",
    features: [
      "Foam front crown",
      "Mesh back panels",
      "5-panel construction",
      "PVC logo patch",
      "Plastic snap closure",
    ],
    materials: ["Polyester Foam", "Polyester Mesh"],
    drop: "DROP 02",
    isNew: true,
    images: [
      { src: "/products/grid-trucker-1.webp", alt: "Grid Trucker front" },
      { src: "/products/grid-trucker-2.webp", alt: "Grid Trucker side" },
      { src: "/products/grid-trucker-3.webp", alt: "Grid Trucker back mesh detail" },
    ],
  },
  {
    slug: "halo-snap",
    name: "HALO SNAP",
    category: "snapback",
    price: 70,
    colors: [
      { name: "Bone", hex: "#F5F5F0" },
      { name: "Jet", hex: "#0A0A0A" },
    ],
    sizes: ["One Size"],
    tagline: "Light up the lineup.",
    description:
      "Reflective-trim snapback with reactive 3M piping. Catches light, holds attention. Built for night ops.",
    features: [
      "3M reflective trim",
      "Embroidered halo logo",
      "Structured 6-panel",
      "Hidden inner pocket",
    ],
    materials: ["Cotton Twill", "3M Reflective Tape"],
    drop: "DROP 02",
    isHot: true,
    images: [
      { src: "/products/halo-snap-1.webp", alt: "Halo Snap front" },
      { src: "/products/halo-snap-2.webp", alt: "Halo Snap reflective detail" },
    ],
  },
  {
    slug: "iron-fitted",
    name: "IRON FITTED",
    category: "fitted",
    price: 80,
    colors: [{ name: "Gunmetal", hex: "#3A3F45" }],
    sizes: ["7", "7 1/8", "7 1/4", "7 3/8", "7 1/2"],
    tagline: "Forged. Not folded.",
    description:
      "Premium wool-blend fitted with metal-stamped side badge. Sized fit, structured shape, weight to it.",
    features: [
      "Wool/poly blend",
      "Metal-stamped side badge",
      "Closed back",
      "Cotton sweatband",
      "Sized fit",
    ],
    materials: ["80% Wool / 20% Polyester"],
    drop: "DROP 02",
    soldOut: true,
    images: [{ src: "/products/iron-fitted-1.webp", alt: "Iron Fitted cap" }],
  },
  {
    slug: "neon-trucker",
    name: "NEON TRUCKER",
    category: "trucker",
    price: 58,
    colors: [
      { name: "Hype Yellow", hex: "#FFCC00" },
      { name: "Inferno", hex: "#FF2D2D" },
    ],
    sizes: ["One Size"],
    tagline: "Loud out loud.",
    description:
      "Glow-on-arrival trucker. Hi-vis crown, black mesh back, oversized logo embroidery. Subtlety not included.",
    features: [
      "Hi-vis foam crown",
      "Black mesh back",
      "Oversized embroidered logo",
      "Snap closure",
    ],
    materials: ["Polyester Foam", "Polyester Mesh"],
    drop: "DROP 02",
    isNew: true,
    images: [
      { src: "/products/neon-trucker-1.webp", alt: "Neon Trucker front" },
      { src: "/products/neon-trucker-2.webp", alt: "Neon Trucker on model" },
    ],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category?: ProductCategory) {
  if (!category) return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}

export const CATEGORIES: { slug: ProductCategory; label: string }[] = [
  { slug: "snapback", label: "Snapbacks" },
  { slug: "fitted", label: "Fitteds" },
  { slug: "dad", label: "Dad Caps" },
  { slug: "beanie", label: "Beanies" },
  { slug: "trucker", label: "Truckers" },
];
