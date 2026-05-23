import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { wishlist } from "@/lib/wishlist";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  size?: number;
  className?: string;
}

export default function WishlistHeart({
  product,
  size = 18,
  className = "",
}: Props) {
  const [active, setActive] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setActive(wishlist.has(product.slug));
    const onChange = () => setActive(wishlist.has(product.slug));
    window.addEventListener("wishlist:change", onChange);
    return () => window.removeEventListener("wishlist:change", onChange);
  }, [product.slug]);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const color = product.colors[0];
    if (!color) return;
    setPulse(true);
    setTimeout(() => setPulse(false), 500);
    wishlist.toggle({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: color.name,
      colorHex: color.hex,
      image: product.images[0]?.src ?? "",
      category: product.category,
    });
  };

  return (
    <button
      onClick={onClick}
      aria-label={active ? "Remove from wishlist" : "Save to wishlist"}
      className={`group relative grid place-items-center transition-all ${className}`}
      data-cursor="hover"
    >
      <Heart
        size={size}
        strokeWidth={2}
        className={`transition-all ${
          active
            ? "fill-red text-red"
            : "text-bone/70 group-hover:text-red"
        } ${pulse ? "scale-150" : "scale-100"}`}
      />
      {pulse && (
        <span
          className="absolute inset-0 rounded-full ring-2 ring-red"
          style={{ animation: "wishlist-ripple 0.5s ease-out forwards" }}
        />
      )}
      <style>{`
        @keyframes wishlist-ripple {
          from { transform: scale(0.6); opacity: 0.8; }
          to { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
