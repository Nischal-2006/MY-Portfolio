import { useState } from "react";
import { motion } from "framer-motion";
import { Panel } from "./ui-bits";

const CHANNELS = [
  { id: "email", icon: "✉", label: "Email", handle: "nischal.panthi@guffadi.os", href: "mailto:hello@example.com", color: "cyan", note: "fastest — I read these between overthinking sessions." },
  { id: "github", icon: "⌨", label: "GitHub", handle: "@nischal-panthi", href: "https://github.com", color: "purple", note: "where half-built ideas go to rest peacefully." },
  { id: "linkedin", icon: "🔗", label: "LinkedIn", handle: "in/nischal-panthi", href: "https://linkedin.com", color: "cyan", note: "formal version of me. wears a collar." },
  { id: "x", icon: "𝕏", label: "X / Twitter", handle: "@nischal_os", href: "https://x.com", color: "pink", note: "shitposts, ideas, occasional wisdom." },
  { id: "ig", icon: "◉", label: "Instagram", handle: "@nischal.exe", href: "https://instagram.com", color: "pink", note: "proof of life. mostly." },
  { id: "discord", icon: "✺", label: "Discord", handle: "nischal#0001", href: "#", color: "green", note: "best place for a 3am idea dump." },
];

const RULES = [
  { ok: true, t: "Send a weird idea. I will reply with three weirder ones." },
  { ok: true, t: "Want to collaborate? say what excites you, not your CV." },
  { ok: true, t: "Voice notes accepted. I talk more than I type anyway." },
  { ok: false, t: "“hi” with nothing after — system will respond with “.”" },
  { ok: false, t: "Asking me to be consistent. unsupported parameter." },
  { ok: false, t: "MLM pitches. immediately routed to /dev/null." },
];

export function ConnectionProtocol() {
  const [selected, setSelected] = useState(CHANNELS[0]);
  const c = (col: string) => (col === "warn" ? "var(--warning)" : `var(--neon-${col})`);

  return (
    <Panel title="Connection Protocol — Establish Link" tag="contact.handshake" accent="green">
      <div className="mb-6 rounded-lg border border-warning/40 bg-warning/5 p-4 font-mono text-sm flex gap-3">
        <span className="text-warning text-xl leading-none">⚠</span>
        <div>
          <div className="text-warning font-semibold">SYSTEM NOTICE</div>
          <p className="text-foreground/80 mt-1">
            You are about to initiate contact with a non-standard human. This is
            not a person you meet daily 😂 — expect long replies, sudden ideas,
            and occasional silence followed by a 3-page voice note.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3">
            // available channels — pick a frequency
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {CHANNELS.map((ch) => {
              const active = selected.id === ch.id;
              return (
                <motion.button
                  key={ch.id}
                  onClick={() => setSelected(ch)}
                  whileHover={{ y: -3 }}
                  className="glass rounded-lg p-4 text-left transition relative overflow-hidden"
                  style={{
                    borderColor: active ? c(ch.color) : "color-mix(in oklab, var(--border) 60%, transparent)",
                    boxShadow: active ? `0 0 18px color-mix(in oklab, ${c(ch.color)} 40%, transparent)` : "none",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-md grid place-items-center text-xl font-bold"
                      style={{
                        background: `color-mix(in oklab, ${c(ch.color)} 15%, transparent)`,
                        border: `1px solid ${c(ch.color)}`,
                        color: c(ch.color),
                      }}
                    >
                      {ch.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: c(ch.color) }}>
                        {ch.label}
                      </div>
                      <div className="font-mono text-sm truncate">{ch.handle}</div>
                    </div>
                    {active && (
                      <span className="font-mono text-[10px] blink" style={{ color: c(ch.color) }}>● LINKED</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-5 rounded-lg border border-neon-cyan/30 bg-background/60 p-4 font-mono text-sm">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">// active link</div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="text-neon-cyan">{selected.label}</span>
                <span className="text-muted-foreground"> → </span>
                <span style={{ color: c(selected.color) }}>{selected.handle}</span>
              </div>
              <a
                href={selected.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded border text-xs"
                style={{ borderColor: c(selected.color), color: c(selected.color) }}
              >
                OPEN CHANNEL ▶
              </a>
            </div>
            <p className="mt-2 text-xs text-muted-foreground italic">“{selected.note}”</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-lg p-4">
            <div className="font-mono text-[11px] uppercase tracking-wider text-neon-green mb-3">
              // handshake rules
            </div>
            <ul className="space-y-2 text-sm">
              {RULES.map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span style={{ color: r.ok ? "var(--neon-green)" : "var(--destructive)" }} className="font-mono">
                    {r.ok ? "✔" : "✖"}
                  </span>
                  <span className={r.ok ? "" : "text-muted-foreground line-through decoration-destructive/40"}>
                    {r.t}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-neon-purple/40 p-4 font-mono text-xs leading-relaxed bg-background/40">
            <div className="text-neon-purple mb-2">$ whoami</div>
            <pre className="text-foreground/85 whitespace-pre-wrap">{`> not a normal human
> chaotic neutral, talks a lot
> warning: ideas may auto-spawn
> response_time: depends on vibe
> timezone: UTC+5:45 (Nepal)
> availability: ████░░░░░░ 40%`}</pre>
            <div className="text-neon-green mt-2 blink">_</div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
