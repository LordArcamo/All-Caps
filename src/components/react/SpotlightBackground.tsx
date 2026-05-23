import { useEffect, useRef } from "react";

interface Props {
  /** Color of the spotlight glow */
  color?: string;
  /** Radius of the spotlight in px */
  size?: number;
  /** Dot grid size in px */
  gridSize?: number;
  /** Dot opacity 0-1 */
  dotOpacity?: number;
  /** Spotlight intensity 0-1 */
  intensity?: number;
}

export default function SpotlightBackground({
  color = "#FFCC00",
  size = 600,
  gridSize = 32,
  dotOpacity = 0.06,
  intensity = 0.35,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const setPos = (x: number, y: number) => {
      tx = x;
      ty = y;
    };

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      setPos(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onEnter = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      cx = e.clientX - rect.left;
      cy = e.clientY - rect.top;
      setPos(cx, cy);
      wrap.style.setProperty("--spot-opacity", "1");
    };

    const onLeave = () => {
      wrap.style.setProperty("--spot-opacity", "0");
    };

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      wrap.style.setProperty("--mx", `${cx}px`);
      wrap.style.setProperty("--my", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const dotColor = `rgba(255,255,255,${dotOpacity})`;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--spot-opacity": "0",
          "--spot-color": color,
          "--spot-size": `${size}px`,
          "--spot-intensity": intensity,
          "--grid-size": `${gridSize}px`,
          "--dot-color": dotColor,
        } as React.CSSProperties
      }
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, var(--dot-color) 1px, transparent 1px)`,
          backgroundSize: `var(--grid-size) var(--grid-size)`,
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--spot-opacity)",
          background:
            "radial-gradient(var(--spot-size) circle at var(--mx) var(--my), color-mix(in oklab, var(--spot-color) calc(var(--spot-intensity) * 100%), transparent), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Bright dots in the spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--spot-opacity)",
          backgroundImage: `radial-gradient(circle, var(--spot-color) 1px, transparent 1.4px)`,
          backgroundSize: `var(--grid-size) var(--grid-size)`,
          maskImage:
            "radial-gradient(var(--spot-size) circle at var(--mx) var(--my), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
          WebkitMaskImage:
            "radial-gradient(var(--spot-size) circle at var(--mx) var(--my), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
    </div>
  );
}
