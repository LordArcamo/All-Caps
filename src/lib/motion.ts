import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASE = {
  outExpo: "expo.out",
  inOutQuart: "power4.inOut",
  back: "back.out(1.7)",
  snap: "expo.inOut",
} as const;

export const DUR = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  long: 1.6,
} as const;

export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const;

export { gsap, ScrollTrigger };
