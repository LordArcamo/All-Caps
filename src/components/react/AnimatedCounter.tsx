import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  /** Suffix like "/5" for "4.9/5" */
  duration?: number;
  className?: string;
}

/**
 * Parses a value like "07", "200", "4.9/5", or "✓" and animates digits up from 0
 * when the element scrolls into view. Non-digit suffixes (/5, %, $, etc.) are
 * preserved.
 */
export default function AnimatedCounter({
  value,
  duration = 1400,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const startedRef = useRef(false);

  // Parse numeric prefix from value
  const match = value.match(/^([\d.]+)(.*)$/);
  const isNumeric = !!match;
  const targetNum = isNumeric ? parseFloat(match![1]) : 0;
  const suffix = isNumeric ? match![2] : "";
  const decimals = isNumeric && match![1].includes(".") ? match![1].split(".")[1].length : 0;
  const padLength = isNumeric && !match![1].includes(".") ? match![1].length : 0;

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    setDisplay(padLength ? "0".padStart(padLength, "0") + suffix : `0${suffix}`);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(1, elapsed / duration);
              // ease out expo
              const eased = 1 - Math.pow(2, -10 * t);
              const current = targetNum * eased;
              let formatted: string;
              if (decimals > 0) {
                formatted = current.toFixed(decimals);
              } else {
                formatted = Math.floor(current).toString();
                if (padLength) formatted = formatted.padStart(padLength, "0");
              }
              setDisplay(formatted + suffix);
              if (t < 1) requestAnimationFrame(tick);
              else setDisplay(value);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, isNumeric, targetNum, suffix, decimals, padLength]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
