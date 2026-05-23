import { useEffect, useState } from "react";
import { Check, Info, AlertTriangle, X, ArrowUpRight } from "lucide-react";
import type { Toast } from "@/lib/toast";

const ICONS = {
  success: <Check size={14} strokeWidth={3} />,
  info: <Info size={14} />,
  warn: <AlertTriangle size={14} />,
  error: <X size={14} strokeWidth={3} />,
};

const ACCENT = {
  success: "bg-yellow text-black",
  info: "bg-bone/10 text-bone",
  warn: "bg-yellow text-black",
  error: "bg-red text-bone",
};

export default function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const onPush = (e: Event) => {
      const t = (e as CustomEvent<Toast>).detail;
      setToasts((prev) => [...prev, t].slice(-5));
      if (t.duration && t.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((x) => x.id !== t.id));
        }, t.duration);
      }
    };
    window.addEventListener("toast:push", onPush);
    return () => window.removeEventListener("toast:push", onPush);
  }, []);

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="pointer-events-none fixed top-24 right-4 z-[150] flex w-[min(92vw,380px)] flex-col gap-2 lg:right-8">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto group relative overflow-hidden rounded-2xl border border-bone/15 bg-ink shadow-2xl animate-[slide-in_0.45s_cubic-bezier(0.22,1,0.36,1)]"
          style={{ animationFillMode: "both" }}
        >
          {/* Accent stripe */}
          <span
            className="absolute inset-y-0 left-0 w-1"
            style={{
              background: t.color ?? (t.kind === "error" ? "#FF2D2D" : "#FFCC00"),
            }}
          />

          <div className="flex items-start gap-3 p-4 pl-5">
            {t.image ? (
              <span
                className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl"
                style={{
                  background: `radial-gradient(circle, ${t.color ?? "#FFCC00"}40, #0a0a0a 80%)`,
                }}
              >
                <svg viewBox="0 0 120 80" className="h-7 w-auto">
                  <path d="M10 50 L30 15 L50 15 L70 50 Z" fill="#0A0A0A" />
                  <path
                    d="M30 50 Q60 60 110 50 Q100 65 60 70 Q25 65 10 55 Z"
                    fill={t.color ?? "#FFCC00"}
                  />
                </svg>
              </span>
            ) : (
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                  ACCENT[t.kind]
                }`}
              >
                {ICONS[t.kind]}
              </span>
            )}

            <div className="min-w-0 flex-1">
              <p className="font-display text-sm tracking-wide text-bone">
                {t.title}
              </p>
              {t.body && (
                <p className="mt-0.5 text-xs leading-relaxed text-bone/60">
                  {t.body}
                </p>
              )}
              {t.href && (
                <a
                  href={t.href}
                  className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] tracking-widest text-yellow hover:underline"
                >
                  {t.hrefLabel ?? "OPEN"} <ArrowUpRight size={10} />
                </a>
              )}
            </div>

            <button
              onClick={() => dismiss(t.id)}
              className="ml-auto grid h-6 w-6 place-items-center rounded-full text-bone/40 hover:bg-bone/10 hover:text-bone"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
          </div>

          {/* Progress bar */}
          {t.duration && t.duration > 0 && (
            <span
              className="absolute inset-x-0 bottom-0 h-px origin-left bg-yellow/40"
              style={{
                animation: `toast-progress ${t.duration}ms linear forwards`,
              }}
            />
          )}
        </div>
      ))}

      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(40px) scale(0.96); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toast-progress {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>
  );
}
