import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotSetter = { x: gsap.quickTo(dot, "x", { duration: 0.15, ease: "expo.out" }), y: gsap.quickTo(dot, "y", { duration: 0.15, ease: "expo.out" }) };
    const ringSetter = { x: gsap.quickTo(ring, "x", { duration: 0.55, ease: "expo.out" }), y: gsap.quickTo(ring, "y", { duration: 0.55, ease: "expo.out" }) };

    const onMove = (e: MouseEvent) => {
      dotSetter.x(e.clientX);
      dotSetter.y(e.clientY);
      ringSetter.x(e.clientX);
      ringSetter.y(e.clientY);
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 2, borderColor: "#FFCC00", duration: 0.35, ease: "expo.out" });
      gsap.to(dot, { scale: 0, duration: 0.2, ease: "expo.out" });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "#F5F5F0", duration: 0.35, ease: "expo.out" });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "expo.out" });
    };

    window.addEventListener("mousemove", onMove);
    const targets = document.querySelectorAll("[data-cursor='hover'], a, button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={ringRef}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-bone mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-yellow mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
