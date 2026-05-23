export type ToastKind = "success" | "info" | "warn" | "error";

export type Toast = {
  id: number;
  kind: ToastKind;
  title: string;
  body?: string;
  image?: string;
  color?: string;
  href?: string;
  hrefLabel?: string;
  duration?: number;
};

let nextId = 1;

export const toast = {
  push(t: Omit<Toast, "id">) {
    if (typeof window === "undefined") return;
    const detail: Toast = { id: nextId++, duration: 4500, ...t };
    window.dispatchEvent(new CustomEvent("toast:push", { detail }));
  },
  success(title: string, opts: Partial<Toast> = {}) {
    this.push({ kind: "success", title, ...opts });
  },
  info(title: string, opts: Partial<Toast> = {}) {
    this.push({ kind: "info", title, ...opts });
  },
  warn(title: string, opts: Partial<Toast> = {}) {
    this.push({ kind: "warn", title, ...opts });
  },
  error(title: string, opts: Partial<Toast> = {}) {
    this.push({ kind: "error", title, ...opts });
  },
};
