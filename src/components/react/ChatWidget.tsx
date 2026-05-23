import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X, Sparkles, Mail, Phone } from "lucide-react";

type Message =
  | { id: number; from: "bot" | "agent"; text: string; ts: number }
  | { id: number; from: "user"; text: string; ts: number };

const INITIAL_BOT: Message[] = [
  {
    id: 1,
    from: "bot",
    text: "Hey. ALL CAPS support here. How can we help — sizing, drops, order status?",
    ts: Date.now(),
  },
];

const QUICK_ACTIONS = [
  { label: "Size guide", reply: "Heads vary a lot. Tap below for our full size chart →", href: "/sizing" },
  { label: "Track order", reply: "Drop your order # and email, we'll get you a status in under a minute." },
  { label: "Drop schedule", reply: "Drop 02 just landed. Drop 03 is locked for late June. Insiders get a 24-hour heads-up." },
  { label: "Returns", reply: "30-day no-questions returns on unworn caps. We email you a prepaid label." },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_BOT);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const [pulsed, setPulsed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Initial entrance pulse after 4s
  useEffect(() => {
    const t = setTimeout(() => setPulsed(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Mark unread when closed and bot/agent message arrives
  useEffect(() => {
    if (open) {
      setUnread(0);
      return;
    }
    const last = messages[messages.length - 1];
    if (last && last.from !== "user") {
      setUnread((u) => Math.min(9, u + 0));
    }
  }, [messages, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      from: "user",
      text,
      ts: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // Bot/agent reply after delay
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        from: "agent",
        text: smartReply(text),
        ts: Date.now(),
      };
      setMessages((m) => [...m, reply]);
      if (!open) setUnread((u) => u + 1);
    }, 900);
  };

  const onQuick = (action: (typeof QUICK_ACTIONS)[number]) => {
    send(action.label);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 2,
          from: "bot",
          text: action.reply,
          ts: Date.now(),
        },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`group fixed bottom-6 right-6 z-[90] grid h-14 w-14 place-items-center rounded-full bg-yellow text-black shadow-2xl shadow-yellow/30 transition-all duration-300 hover:scale-110 active:scale-95 lg:bottom-8 lg:right-8 lg:h-16 lg:w-16 ${
          open ? "rotate-90" : "rotate-0"
        } ${pulsed && !open ? "animate-[pulse_2s_ease-in-out_infinite]" : ""}`}
        aria-label={open ? "Close chat" : "Open chat"}
        data-cursor="hover"
      >
        {open ? (
          <X size={22} strokeWidth={2.5} />
        ) : (
          <MessageCircle size={22} strokeWidth={2.5} />
        )}
        {!open && unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-red font-display text-xs text-bone">
            {unread}
          </span>
        )}
        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 font-mono text-[10px] tracking-widest text-bone opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 lg:block">
            CHAT — INSTANT REPLY
          </span>
        )}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-4 z-[91] w-[min(92vw,400px)] origin-bottom-right transition-all duration-300 ease-out lg:bottom-28 lg:right-8 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
      >
        <div className="flex h-[560px] max-h-[80vh] flex-col overflow-hidden rounded-3xl border border-bone/15 bg-ink shadow-2xl">
          {/* Header */}
          <div className="relative overflow-hidden border-b border-bone/10 bg-black">
            <div
              className="pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full opacity-20 blur-[60px]"
              style={{ background: "radial-gradient(circle, #FFCC00, transparent 70%)" }}
            />
            <div className="relative flex items-center gap-3 px-5 py-4">
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-yellow text-black">
                <Sparkles size={16} />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink bg-[#5BD478]" />
              </span>
              <div>
                <h3 className="font-display text-lg tracking-tight text-bone">
                  ALL CAPS SUPPORT
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-bone/50">
                  <span className="text-[#5BD478]">●</span> Online · replies in
                  &lt;5 min
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto grid h-8 w-8 place-items-center rounded-full text-bone/60 hover:bg-bone/10 hover:text-yellow"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            data-lenis-prevent
            className="flex-1 space-y-3 overflow-y-auto px-4 py-5"
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </div>

          {/* Quick actions */}
          {messages.length <= 2 && (
            <div className="border-t border-bone/10 px-4 py-3">
              <p className="mb-2 font-mono text-[10px] tracking-widest text-bone/40">
                QUICK ACTIONS
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((a) => (
                  <button
                    key={a.label}
                    onClick={() => onQuick(a)}
                    className="rounded-full border border-bone/20 px-3 py-1.5 font-display text-xs tracking-wider text-bone/80 transition-colors hover:border-yellow hover:bg-yellow hover:text-black"
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-bone/10 bg-black/30 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-full border border-bone/15 bg-bone/5 px-4 py-2.5 text-sm text-bone placeholder:text-bone/40 focus:border-yellow focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="grid h-10 w-10 place-items-center rounded-full bg-yellow text-black transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
              aria-label="Send"
            >
              <Send size={14} />
            </button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-bone/10 bg-bone/[0.02] px-4 py-2.5">
            <a
              href="mailto:drop@allcaps.co"
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-bone/40 hover:text-yellow"
            >
              <Mail size={10} />
              EMAIL
            </a>
            <span className="font-mono text-[10px] tracking-widest text-bone/30">
              POWERED BY ALL CAPS
            </span>
            <a
              href="tel:+15552552277"
              className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-bone/40 hover:text-yellow"
            >
              <Phone size={10} />
              CALL
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser
            ? "rounded-br-md bg-yellow text-black"
            : "rounded-bl-md bg-bone/5 text-bone"
        }`}
      >
        {!isUser && (
          <div className="mb-0.5 font-mono text-[9px] tracking-widest text-bone/40">
            {message.from === "bot" ? "ALL CAPS BOT" : "AGENT · J"}
          </div>
        )}
        <p className="leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}

function smartReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("size") || t.includes("fit")) {
    return "For caps it's mostly head circumference. Pull up our size guide and measure right above your ears. Fitteds run true; snapbacks are one-size with a 6-22\" range.";
  }
  if (t.includes("ship") || t.includes("deliver")) {
    return "Standard ships in 2-3 business days, free over $75. Express is $15 — overnight to most US cities.";
  }
  if (t.includes("return") || t.includes("refund")) {
    return "30 days, unworn, original packaging. We email you a prepaid label and refund within 5 business days of receiving it.";
  }
  if (t.includes("drop") || t.includes("when") || t.includes("next")) {
    return "Drop 02 is live now. Drop 03 lands late June. Want a heads-up? Drop your email in the newsletter — insiders get 24h early access.";
  }
  if (t.includes("hi") || t.includes("hey") || t.includes("hello")) {
    return "Hey. What can we help with — sizing, an order, or just browsing?";
  }
  return "Got it — let me grab a human on this. Drop your email and we'll be back inside 5 minutes with a real answer.";
}
