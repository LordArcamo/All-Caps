import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
}

export default function TiltGallery({ product }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const active = product.images[activeIdx] ?? product.images[0];

  useEffect(() => {
    const wrap = wrapRef.current;
    const tilt = tiltRef.current;
    if (!wrap || !tilt) return;

    const setX = gsap.quickTo(tilt, "rotationY", { duration: 0.7, ease: "expo.out" });
    const setY = gsap.quickTo(tilt, "rotationX", { duration: 0.7, ease: "expo.out" });

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setX(px * 18);
      setY(-py * 12);
    };

    const onLeave = () => {
      setX(0);
      setY(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!tiltRef.current) return;
    gsap.fromTo(
      tiltRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "expo.out" },
    );
  }, [activeIdx]);

  const primaryColor = product.colors[0]?.hex ?? "#FFCC00";
  const gradient = `radial-gradient(circle at 30% 30%, ${primaryColor}40, #0a0a0a 70%)`;
  const isRealImage = active?.src.endsWith(".png");

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={wrapRef}
        className="relative aspect-square w-full overflow-hidden rounded-3xl bg-graphite [perspective:1200px]"
      >
        <div className="absolute inset-0" style={{ background: gradient }} />
        <div className="noise-overlay absolute inset-0 opacity-30" />

        <div
          ref={tiltRef}
          className="absolute inset-0 grid place-items-center [transform-style:preserve-3d]"
          style={{ willChange: "transform" }}
        >
          {isRealImage ? (
            <img
              src={active.src}
              alt={active.alt}
              className="h-[88%] w-auto rounded-2xl object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
              style={{ transform: "translateZ(60px)" }}
            />
          ) : (
            <svg
              viewBox="0 0 120 80"
              className="h-1/2 w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              style={{ transform: "translateZ(60px)" }}
            >
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
          )}
        </div>

        <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] tracking-widest text-bone/60">
          {product.drop} · {String(activeIdx + 1).padStart(2, "0")} /{" "}
          {String(product.images.length).padStart(2, "0")}
        </div>
        <div className="pointer-events-none absolute bottom-6 right-6 font-display text-xs tracking-widest text-bone/60">
          HOVER TO ROTATE
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {product.images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActiveIdx(i)}
            className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
              i === activeIdx
                ? "border-yellow"
                : "border-bone/10 hover:border-bone/30"
            }`}
            style={{
              background: `radial-gradient(circle, ${
                product.colors[i % product.colors.length]?.hex ?? primaryColor
              }40, #0a0a0a 80%)`,
            }}
            aria-label={`View ${img.alt}`}
            data-cursor="hover"
          >
            <div className="absolute inset-0 grid place-items-center">
              <svg viewBox="0 0 120 80" className="h-1/2 w-auto opacity-90">
                <path d="M10 50 L30 15 L50 15 L70 50 Z" fill="#0A0A0A" />
                <path
                  d="M30 50 Q60 60 110 50 Q100 65 60 70 Q25 65 10 55 Z"
                  fill={
                    product.colors[i % product.colors.length]?.hex ??
                    primaryColor
                  }
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
