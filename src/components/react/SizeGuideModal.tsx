import { useEffect, useState } from "react";
import { X, Ruler, ArrowUpRight } from "lucide-react";

type Unit = "in" | "cm";

const SIZE_DATA: { label: string; in: string; cm: string; type: string }[] = [
  { label: "7", in: "21 7/8", cm: "55.5", type: "FITTED · X-SMALL" },
  { label: "7 1/8", in: "22 1/4", cm: "56.5", type: "FITTED · SMALL" },
  { label: "7 1/4", in: "22 5/8", cm: "57.4", type: "FITTED · MEDIUM" },
  { label: "7 3/8", in: "23", cm: "58.4", type: "FITTED · LARGE" },
  { label: "7 1/2", in: "23 1/2", cm: "59.7", type: "FITTED · X-LARGE" },
  { label: "7 5/8", in: "23 7/8", cm: "60.6", type: "FITTED · XX-LARGE" },
  { label: "OS", in: "21 — 24", cm: "53 — 61", type: "SNAPBACK / DAD" },
];

export default function SizeGuideModal() {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<Unit>("in");

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("sizeguide:open", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("sizeguide:open", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[120] bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed inset-x-0 top-1/2 z-[121] mx-auto w-[92%] max-w-3xl -translate-y-1/2 transition-all duration-300 ${
          open
            ? "translate-y-[-50%] scale-100 opacity-100"
            : "pointer-events-none translate-y-[-46%] scale-95 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-3xl border border-bone/15 bg-ink shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-bone/10 px-6 py-5">
            <div className="flex items-center gap-3">
              <Ruler size={18} className="text-yellow" />
              <h3 className="font-display text-2xl tracking-tight">
                SIZE <span className="italic text-yellow">GUIDE.</span>
              </h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-bone/20 text-bone/60 hover:border-yellow hover:text-yellow"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="grid gap-8 p-6 md:grid-cols-5 md:p-8">
            {/* Diagram */}
            <div className="md:col-span-2">
              <h4 className="mb-3 font-mono text-[10px] tracking-widest text-bone/40">
                HOW TO MEASURE
              </h4>
              <p className="mb-5 text-sm text-bone/70">
                Wrap a soft tape around your head, right above the ears and
                across the brow. Snug, not tight.
              </p>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-graphite">
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 h-full w-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Head silhouette */}
                  <circle
                    cx="100"
                    cy="92"
                    r="48"
                    fill="none"
                    stroke="#F5F5F0"
                    strokeWidth="2"
                  />
                  <path
                    d="M65 140 Q100 165 135 140 L142 175 L58 175 Z"
                    fill="none"
                    stroke="#F5F5F0"
                    strokeWidth="2"
                  />
                  {/* Measuring tape (dashed circle) */}
                  <ellipse
                    cx="100"
                    cy="100"
                    rx="55"
                    ry="20"
                    fill="none"
                    stroke="#FFCC00"
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="36"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </ellipse>
                  {/* Tape arrows */}
                  <path
                    d="M40 100 L150 100"
                    stroke="#FFCC00"
                    strokeWidth="1.5"
                    strokeDasharray="2 3"
                  />
                  <polygon points="155,100 148,96 148,104" fill="#FFCC00" />
                  <polygon points="45,100 38,96 38,104" fill="#FFCC00" />
                </svg>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-yellow px-3 py-1 font-display text-[10px] tracking-widest text-black">
                  HEAD CIRCUMFERENCE
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="md:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-mono text-[10px] tracking-widest text-bone/40">
                  FIT CHART
                </h4>
                <div className="flex gap-1 rounded-full border border-bone/20 p-1">
                  {(["in", "cm"] as Unit[]).map((u) => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`rounded-full px-3 py-1 font-mono text-[10px] tracking-widest transition-colors ${
                        unit === u
                          ? "bg-yellow text-black"
                          : "text-bone/60 hover:text-bone"
                      }`}
                    >
                      {u.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-bone/10">
                <table className="w-full text-sm">
                  <thead className="bg-bone/[0.03]">
                    <tr className="font-mono text-[10px] uppercase tracking-widest text-bone/40">
                      <th className="px-4 py-3 text-left">SIZE</th>
                      <th className="px-4 py-3 text-right">
                        HEAD ({unit.toUpperCase()})
                      </th>
                      <th className="hidden px-4 py-3 text-right md:table-cell">
                        FITS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_DATA.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-t border-bone/5 transition-colors hover:bg-bone/[0.03] ${
                          i === SIZE_DATA.length - 1 ? "bg-yellow/[0.04]" : ""
                        }`}
                      >
                        <td className="px-4 py-3 font-display tracking-wide text-bone">
                          {row.label}
                        </td>
                        <td className="px-4 py-3 text-right font-mono text-bone/70">
                          {unit === "in" ? row[unit] + '"' : row[unit] + " cm"}
                        </td>
                        <td className="hidden px-4 py-3 text-right text-[10px] uppercase tracking-widest text-bone/40 md:table-cell">
                          {row.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-bone/50">
                Between sizes? Snapbacks/dads/truckers stretch — go down. Fitteds
                don't — go up.
              </p>
              <a
                href="/help/sizing"
                className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] tracking-widest text-yellow hover:underline"
              >
                READ THE FULL SIZING GUIDE <ArrowUpRight size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
