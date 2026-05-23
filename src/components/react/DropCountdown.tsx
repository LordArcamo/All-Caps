import { useEffect, useState } from "react";

interface Props {
  /** Target ISO string or Date */
  target: string | Date;
  label?: string;
  className?: string;
}

export default function DropCountdown({
  target,
  label = "NEXT DROP IN",
  className = "",
}: Props) {
  const [time, setTime] = useState(() => computeRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setTime(computeRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const expired = time.totalMs <= 0;

  return (
    <div className={`${className}`}>
      <div className="mb-3 flex items-center gap-3 font-mono text-xs tracking-widest text-bone/60">
        <span className="block h-px w-8 bg-yellow"></span>
        <span>{label}</span>
        <span
          className={`ml-2 block h-2 w-2 rounded-full ${
            expired ? "bg-red animate-pulse" : "bg-yellow"
          }`}
        />
      </div>
      {expired ? (
        <div className="font-display text-4xl tracking-tight text-red lg:text-6xl">
          DROP IS LIVE.
        </div>
      ) : (
        <div className="flex items-end gap-3 lg:gap-5">
          <CountdownUnit value={time.days} unit="DAYS" />
          <Sep />
          <CountdownUnit value={time.hours} unit="HRS" />
          <Sep />
          <CountdownUnit value={time.mins} unit="MIN" />
          <Sep />
          <CountdownUnit value={time.secs} unit="SEC" pulse />
        </div>
      )}
    </div>
  );
}

function CountdownUnit({
  value,
  unit,
  pulse = false,
}: {
  value: number;
  unit: string;
  pulse?: boolean;
}) {
  const str = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden">
        <span
          className={`block font-display tracking-tight text-bone tabular-nums ${
            pulse ? "text-yellow" : ""
          }`}
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.9 }}
        >
          {str}
        </span>
      </div>
      <span className="mt-1 font-mono text-[10px] tracking-widest text-bone/40">
        {unit}
      </span>
    </div>
  );
}

function Sep() {
  return (
    <span
      className="font-display text-bone/30"
      style={{ fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1 }}
    >
      :
    </span>
  );
}

function computeRemaining(target: string | Date) {
  const totalMs = +new Date(target) - Date.now();
  if (totalMs <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, totalMs: 0 };
  const days = Math.floor(totalMs / 86400000);
  const hours = Math.floor((totalMs % 86400000) / 3600000);
  const mins = Math.floor((totalMs % 3600000) / 60000);
  const secs = Math.floor((totalMs % 60000) / 1000);
  return { days, hours, mins, secs, totalMs };
}
