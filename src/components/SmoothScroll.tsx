import { useEffect } from "react";
import { initSmoothScroll, getLenis } from "@/lib/lenis-init";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = initSmoothScroll();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      lenis?.destroy();
      return;
    }

    return () => {
      getLenis()?.destroy();
    };
  }, []);

  return null;
}
