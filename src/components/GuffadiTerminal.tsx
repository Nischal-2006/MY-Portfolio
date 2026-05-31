import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Panel } from "./ui-bits";

type Line = { who: "user" | "nischal" | "system"; text: string };

const REPLIES = [
  "hmm interesting… give me 5 mins, I’ll think 50.",
  "okay but what if we built a whole system around this?",
  "bro that’s actually a startup idea, write it down, I’ll forget.",
  "let me overthink this for 3 days and come back with a Figma.",
  "we should make a community for this. and a logo. and stop.",
  "I could do this tonight. realistically — Sunday. realistically — never.",
  "wait wait wait. hear me out. *talks for 40 minutes*",
  "execution is loading… please reinstall motivation.dll",
  "I was going to finish it, but then I had a better idea.",
  "consistency.exe has stopped working. try again later.",
];

const PROMPTS = [
  "ask me anything",
  "give me an idea",
  "say something random",
  "type 'roast me'",
];

export function GuffadiTerminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { who: "system", text: "guffadi-shell v1.0 — connected to nischal.core" },
    { who: "system", text: "warning: responses may contain 87% talk, 13% action" },
    { who: "nischal", text: "namaste 👋 type something. I’ll definitely have an opinion." },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, typing]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setLines((l) => [...l, { who: "user", text: msg }]);
    setTyping(true);

    const lower = msg.toLowerCase();
    let reply = REPLIES[Math.floor(Math.random() * REPLIES.length)];
    if (lower.includes("roast")) reply = "you’re reading a portfolio at this hour. who’s roasting who?";
    else if (lower.includes("idea")) reply = "okay: AI that finishes the projects you start. I’d be its first customer.";
    else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) reply = "hello hello 🫡 dangerous to greet me, I will now talk.";
    else if (lower.includes("project")) reply = "I have 27 of them. 4 are alive. 2 talk back. don’t ask about the rest.";
    else if (lower.includes("nepal") || lower.includes("nepali")) reply = "नमस्ते! Nepal mai bata. Gulmi → Butwal → internet.";
    else if (lower.includes("ai")) reply = "AI is just a friend who never sleeps and never argues back. unfair advantage.";

    const delay = 600 + Math.min(1400, msg.length * 25);
    setTimeout(() => {
      setLines((l) => [...l, { who: "nischal", text: reply }]);
      setTyping(false);
    }, delay);
  }

  return (
    <Panel title="Guffadi Terminal — Talk to the System" tag="chat.live" accent="cyan">
      <div className="grid lg:grid-cols-[1fr_220px] gap-5">
        <div className="rounded-lg border border-neon-cyan/30 bg-background/60 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border/60 bg-card/80 font-mono text-[11px]">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning" />
            <span className="h-2.5 w-2.5 rounded-full bg-neon-green" />
            <span className="ml-2 text-muted-foreground">nischal@os: ~/guffadi</span>
            <span className="ml-auto text-neon-cyan">● live</span>
          </div>

          <div ref={scrollRef} className="h-80 md:h-96 overflow-y-auto p-4 font-mono text-sm space-y-2 scanlines">
            <AnimatePresence initial={false}>
              {lines.map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <span
                    className="shrink-0"
                    style={{
                      color:
                        l.who === "user"
                          ? "var(--neon-green)"
                          : l.who === "nischal"
                          ? "var(--neon-purple)"
                          : "var(--muted-foreground)",
                    }}
                  >
                    {l.who === "user" ? "you>" : l.who === "nischal" ? "nischal>" : "sys>"}
                  </span>
                  <span className={l.who === "system" ? "text-muted-foreground italic" : ""}>{l.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <div className="flex gap-2 text-neon-purple">
                <span>nischal&gt;</span>
                <span className="flex gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-purple animate-bounce" />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-purple animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-purple animate-bounce" style={{ animationDelay: "0.3s" }} />
                </span>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-border/60 px-3 py-2 bg-card/80"
          >
            <span className="font-mono text-neon-green text-sm">you&gt;</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type and press enter…"
              className="flex-1 bg-transparent outline-none font-mono text-sm placeholder:text-muted-foreground/60"
            />
            <button
              type="submit"
              className="font-mono text-xs px-3 py-1 rounded border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
            >
              SEND ▶
            </button>
          </form>
        </div>

        <div className="space-y-3">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            // quick prompts
          </div>
          {PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="w-full text-left glass rounded-md px-3 py-2 font-mono text-xs hover:border-neon-purple/60 border border-transparent transition"
            >
              ▸ {p}
            </button>
          ))}
          <div className="glass rounded-md p-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
            <div className="text-neon-pink mb-1">// disclaimer</div>
            this terminal is 100% offline and 100% chaotic. responses are
            simulated guffadi from a sleep-deprived CSIT student.
          </div>
        </div>
      </div>
    </Panel>
  );
}

/* ---------------- NEURAL SKILL MAP ---------------- */

const NODES = [
  { id: "core", label: "NISCHAL.CORE", x: 50, y: 50, size: 70, color: "purple" },
  { id: "talk", label: "Communication", x: 18, y: 22, size: 52, color: "cyan" },
  { id: "ideas", label: "Idea Engine", x: 82, y: 24, size: 56, color: "pink" },
  { id: "ai", label: "AI Tinkering", x: 88, y: 60, size: 46, color: "green" },
  { id: "ux", label: "UI / UX", x: 70, y: 86, size: 44, color: "pink" },
  { id: "web", label: "Web Dev", x: 30, y: 82, size: 48, color: "cyan" },
  { id: "lead", label: "Leadership", x: 10, y: 60, size: 50, color: "purple" },
  { id: "chaos", label: "Chaos Mgmt", x: 50, y: 12, size: 40, color: "warn" },
];

const EDGES: [string, string][] = [
  ["core", "talk"], ["core", "ideas"], ["core", "ai"], ["core", "ux"],
  ["core", "web"], ["core", "lead"], ["core", "chaos"],
  ["talk", "lead"], ["ideas", "ai"], ["web", "ux"], ["ideas", "chaos"],
];

export function NeuralSkillMap() {
  const [active, setActive] = useState<string>("core");
  const node = NODES.find((n) => n.id === active)!;
  const color = (c: string) => (c === "warn" ? "var(--warning)" : `var(--neon-${c})`);

  return (
    <Panel title="Neural Skill Map" tag="brain.net" accent="purple">
      <p className="text-muted-foreground mb-5 max-w-2xl text-sm">
        Live render of the internal wiring. Tap nodes to scan. Some connections
        are still being calibrated. Some never will be.
      </p>
      <div className="grid lg:grid-cols-[1fr_260px] gap-5 items-stretch">
        <div className="relative aspect-square w-full max-w-[640px] mx-auto rounded-xl border border-neon-purple/30 bg-background/60 overflow-hidden grid-bg">
          <div className="absolute inset-0 scanlines pointer-events-none" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {EDGES.map(([a, b], i) => {
              const na = NODES.find((n) => n.id === a)!;
              const nb = NODES.find((n) => n.id === b)!;
              const isActive = active === a || active === b;
              return (
                <line
                  key={i}
                  x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                  stroke={isActive ? "var(--neon-cyan)" : "color-mix(in oklab, var(--neon-purple) 35%, transparent)"}
                  strokeWidth={isActive ? 0.5 : 0.2}
                  strokeDasharray={isActive ? "0" : "1 1"}
                />
              );
            })}
          </svg>
          {NODES.map((n) => {
            const isActive = active === n.id;
            return (
              <motion.button
                key={n.id}
                onClick={() => setActive(n.id)}
                animate={{ scale: isActive ? 1.15 : 1 }}
                whileHover={{ scale: 1.2 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-mono text-[9px] md:text-[10px] text-center px-1 leading-tight"
                style={{
                  left: `${n.x}%`,
                  top: `${n.y}%`,
                  width: n.size,
                  height: n.size,
                  background: `radial-gradient(circle, color-mix(in oklab, ${color(n.color)} 35%, transparent), transparent 70%)`,
                  border: `1px solid ${color(n.color)}`,
                  color: color(n.color),
                  boxShadow: isActive ? `0 0 24px ${color(n.color)}` : `0 0 8px color-mix(in oklab, ${color(n.color)} 40%, transparent)`,
                }}
              >
                {n.label}
              </motion.button>
            );
          })}
        </div>

        <div className="glass rounded-lg p-4 font-mono text-sm flex flex-col">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">// node scan</div>
          <div className="text-xl font-bold mt-1" style={{ color: color(node.color) }}>
            {node.label}
          </div>
          <div className="text-xs text-muted-foreground mt-1">id: {node.id}.module</div>
          <div className="mt-4 space-y-2 text-xs">
            <Row k="status" v={node.id === "chaos" ? "OVERCLOCKED" : "ONLINE"} c={node.color} />
            <Row k="load" v={`${Math.min(99, node.size + 20)}%`} c="cyan" />
            <Row k="links" v={String(EDGES.filter((e) => e.includes(node.id)).length)} c="purple" />
            <Row k="stability" v={node.id === "chaos" ? "low" : node.id === "core" ? "variable" : "ok"} c="green" />
          </div>
          <div className="mt-auto pt-4 text-xs text-muted-foreground italic">
            “every node here exists. some just need more electricity.”
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Row({ k, v, c }: { k: string; v: string; c: string }) {
  const col = c === "warn" ? "var(--warning)" : `var(--neon-${c})`;
  return (
    <div className="flex justify-between border-b border-border/40 pb-1">
      <span className="text-muted-foreground uppercase text-[10px]">{k}</span>
      <span style={{ color: col }}>{v}</span>
    </div>
  );
}
