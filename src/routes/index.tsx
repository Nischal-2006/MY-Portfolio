import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { BootScreen } from "@/components/BootScreen";
import { StatusBar } from "@/components/StatusBar";
import { Panel, StatBar, GlitchText } from "@/components/ui-bits";
import { GuffadiTerminal, NeuralSkillMap } from "@/components/GuffadiTerminal";
import { ConnectionProtocol } from "@/components/ConnectionProtocol";
import avatar from "@/assets/avatar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nischal OS — Unstable Human System Interface" },
      {
        name: "description",
        content:
          "Nischal Panthi — BSc CSIT student from Nepal. A chaotic, talkative, idea-generating human system disguised as a portfolio.",
      },
      { property: "og:title", content: "Nischal OS — Unstable Human System Interface" },
      { property: "og:description", content: "A game-like cyberpunk OS interface portfolio of Nischal Panthi." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [booted, setBooted] = useState(false);
  return (
    <div className="min-h-screen relative">
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      <StatusBar />
      <main className="relative pt-16 pb-24">
        <Hero />
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-10 mt-16">
          <Identity />
          <MissionsAndBosses />
          <GuffadiTerminal />
          <NeuralSkillMap />
          <MemoryArchives />
          <Experiments />
          <Projects />
          <Guilds />
          <StatsPanel />
          <PhotoWall />
          <ConnectionProtocol />
          <FinalQuote />
        </div>
        <Footer />
      </main>
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative max-w-6xl mx-auto px-4 md:px-6 pt-12 md:pt-20">
      <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-xs text-neon-cyan uppercase tracking-[0.3em] mb-4"
          >
            // system entry — user:nischal
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
          >
            Hi, I’m <GlitchText className="gradient-text">Nischal</GlitchText> 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl"
          >
            A student from Nepal who talks a lot, thinks too much, builds sometimes,
            and accidentally makes things happen.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 text-base text-muted-foreground/80 max-w-xl"
          >
            I don’t follow one path. I explore, explain, start, pause,
            and somehow still move forward.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
            <HeroBtn color="purple" label="▶ Enter System (Risky)" />
            <HeroBtn color="cyan" label="📂 View Chaos Logs" />
            <HeroBtn color="warn" label="⚠ Continue Without Understanding" />
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px]">
            {[
              ["STATUS", "ACTIVE", "green"],
              ["MODE", "UNSTABLE", "warn"],
              ["CLASS", "GUFFADI", "purple"],
              ["ORIGIN", "GULMI→BTWL", "cyan"],
            ].map(([k, v, c]) => (
              <div key={k} className="glass rounded-md px-3 py-2">
                <div className="text-muted-foreground">{k}</div>
                <div
                  className="font-semibold"
                  style={{ color: `var(--neon-${c === "warn" ? "" : c})`, ...(c === "warn" ? { color: "var(--warning)" } : {}) }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative w-56 md:w-72 mx-auto"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden neon-border glow-purple">
            <img src={avatar} alt="Nischal Panthi avatar" className="w-full h-full object-cover" />
            <div className="absolute inset-0 scanlines pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background to-transparent p-3 font-mono text-[10px] uppercase tracking-wider">
              <div className="text-neon-cyan">avatar.exe — running</div>
            </div>
          </div>
          <div className="absolute -inset-2 rounded-2xl border border-neon-cyan/40 -z-10 blur-sm" />
        </motion.div>
      </div>
    </section>
  );
}

function HeroBtn({ color, label }: { color: "purple" | "cyan" | "warn"; label: string }) {
  const c = color === "warn" ? "var(--warning)" : `var(--neon-${color})`;
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="glitch-hover px-4 py-2.5 rounded-md font-semibold tracking-wide"
      style={{
        background: `color-mix(in oklab, ${c} 14%, transparent)`,
        border: `1px solid ${c}`,
        color: c,
        boxShadow: `0 0 16px color-mix(in oklab, ${c} 40%, transparent)`,
      }}
    >
      {label}
    </motion.button>
  );
}

/* ---------------- IDENTITY ---------------- */
function Identity() {
  const rows = [
    ["CLASS", "Explorer / Core Guffadi Hybrid"],
    ["PRIMARY TOOL", "Communication"],
    ["CORE STRENGTH", "Turning ideas into movement through people"],
    ["WEAKNESS", "Inconsistent execution cycles"],
    ["BEHAVIOR", "Starts systems through conversations"],
  ];
  return (
    <Panel title="Core Identity Module" tag="identity.sys" accent="purple">
      <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 font-mono text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-3 border-b border-border/40 py-2">
            <span className="w-32 shrink-0 text-muted-foreground uppercase text-xs">{k}</span>
            <span className="text-foreground">{v}</span>
          </div>
        ))}
      </div>
      <blockquote className="mt-6 pl-4 border-l-2 border-neon-cyan text-neon-cyan/90 italic">
        “He doesn’t always build things. He triggers them.”
      </blockquote>
    </Panel>
  );
}

/* ---------------- MISSIONS + BOSSES ---------------- */
function MissionsAndBosses() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Panel title="Active Life Missions" tag="side_quests" accent="purple">
        <div className="space-y-5">
          <StatBar label="🧠 Project Thinking" value={65} color="purple" hint="Trying to organize chaos that keeps updating itself" />
          <StatBar label="🤖 AI Exploration" value={60} color="cyan" hint="Talking to machines like they are teammates" />
          <StatBar label="🎬 Design + Editing" value={55} color="pink" hint="Knows what looks good, struggles to recreate it" />
          <StatBar label="🧑‍🤝‍🧑 Community Building" value={80} color="green" hint="Accidental leadership through conversation" />
          <StatBar label="🎨 Portfolio Evolution" value={90} color="warn" hint="Final boss refuses to be defeated" />
        </div>
      </Panel>

      <Panel title="Boss Fights" tag="enemies.detected" accent="pink">
        <div className="space-y-5">
          <BossRow name="⚔ Consistency" hp={40} note="Regenerates every time motivation resets" />
          <BossRow name="⚔ Overthinking" hp={100} note="Always active in background" infinite />
          <BossRow name="⚔ Self-Doubt" hp={60} note="Becomes stronger before important work" />
        </div>
      </Panel>
    </div>
  );
}

function BossRow({ name, hp, note, infinite }: { name: string; hp: number; note: string; infinite?: boolean }) {
  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
      <div className="flex justify-between items-baseline font-mono text-sm">
        <span className="font-semibold">{name}</span>
        <span className="text-destructive">HP: {infinite ? "∞" : `${hp}/100`}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${infinite ? 100 : hp}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full"
          style={{
            background: "linear-gradient(90deg, var(--destructive), var(--neon-pink))",
            boxShadow: "0 0 12px var(--destructive)",
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground italic mt-2">“{note}”</p>
    </div>
  );
}

/* ---------------- MEMORY ARCHIVES ---------------- */
function MemoryArchives() {
  const saves = [
    ["Gulmi Roots", "Simple environment, curiosity-driven childhood"],
    ["CSIT Entry", "Expected clarity → received system confusion"],
    ["Butwal Solo Life", "Independence unlocked (single room, cooking, survival mode)"],
    ["Talk Phase", "Speaking more → accidentally influencing people"],
    ["Chaos Build Era", "Multiple ideas, systems, and experiments started simultaneously"],
  ];
  return (
    <Panel title="Memory Archives" tag="save_points" accent="cyan">
      <ol className="relative border-l border-neon-cyan/40 ml-3 space-y-6">
        {saves.map(([t, d], i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="pl-6"
          >
            <span className="absolute -left-[7px] mt-1 inline-block h-3 w-3 rounded-full bg-neon-cyan" style={{ boxShadow: "0 0 10px var(--neon-cyan)" }} />
            <div className="font-mono text-xs text-muted-foreground">SAVE_{String(i + 1).padStart(2, "0")}</div>
            <div className="font-semibold text-lg">💾 {t}</div>
            <p className="text-muted-foreground">{d}</p>
          </motion.li>
        ))}
      </ol>
    </Panel>
  );
}

/* ---------------- EXPERIMENT ZONE ---------------- */
function Experiments() {
  const items: { label: string; status: "ok" | "wip" | "no" }[] = [
    { label: "UI/UX Design — can explain good design clearly", status: "ok" },
    { label: "Web Development — build → break → rebuild cycles", status: "ok" },
    { label: "Event Organization — human coordination experience", status: "ok" },
    { label: "Idea Systems — constantly generating concepts", status: "ok" },
    { label: "AI Tools — ongoing experimentation", status: "wip" },
    { label: "Consistency — not installed yet", status: "no" },
  ];
  return (
    <Panel title="Things I Act Like I Know" tag="experiment_zone" accent="green">
      <div className="grid sm:grid-cols-2 gap-3 font-mono text-sm">
        {items.map((it) => {
          const c = it.status === "ok" ? "var(--neon-green)" : it.status === "wip" ? "var(--neon-cyan)" : "var(--destructive)";
          const icon = it.status === "ok" ? "✔" : it.status === "wip" ? "🔄" : "❌";
          return (
            <div key={it.label} className="flex items-start gap-3 rounded-md p-3 border" style={{ borderColor: `color-mix(in oklab, ${c} 35%, transparent)` }}>
              <span style={{ color: c }} className="text-lg leading-none">{icon}</span>
              <span>{it.label}</span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* ---------------- PROJECT VAULT ---------------- */
function Projects() {
  const projects = [
    {
      icon: "🧱",
      title: "UI/UX Design Era",
      tag: "ARCHIVED BRANCH",
      status: "❌ Archived (still occasionally revisited)",
      color: "pink" as const,
      bullets: [
        "Started with intention to become a designer",
        "Built multiple UI concepts, wireframes, layouts",
        "Learned design principles",
        "Eventually shifted focus away",
      ],
      quote: "Not my main path anymore, but shaped how I see everything.",
    },
    {
      icon: "🧱",
      title: "E-Commerce System",
      tag: "IN PROGRESS",
      status: "🔄 Partially alive",
      color: "cyan" as const,
      bullets: [
        "Built as learning + curiosity project",
        "Includes UI, flows, backend ideas",
        "Some parts functional, some unstable",
        "Frequently paused and resumed",
      ],
      quote: "It works when motivation is active.",
    },
    {
      icon: "🧱",
      title: "Portfolio Evolution Series (v1 → v5)",
      tag: "CONTINUOUS",
      status: "🔄 Continuous evolution",
      color: "purple" as const,
      bullets: [
        "Multiple attempts to define identity visually",
        "Each version improved technically",
        "Same internal question repeated: “what am I building?”",
      ],
      quote: "This version finally stopped pretending to be normal.",
    },
    {
      icon: "🧠",
      title: "Idea Prototypes (Unnamed Systems)",
      tag: "DRAFTS",
      status: "💡 Exist in notes, conversations, and memory",
      color: "green" as const,
      bullets: [
        "App ideas",
        "Event systems",
        "Community concepts",
        "Problem-solving tools",
      ],
      quote: "I don’t lose ideas. I delay them.",
    },
  ];
  return (
    <Panel title="Project Vault — Chaos Archive Mode" tag="vault.dir" accent="purple">
      <p className="text-muted-foreground mb-6 max-w-2xl">
        This is NOT a list of achievements. It is a collection of unfinished,
        evolving, or partially alive systems.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p) => {
          const c = `var(--neon-${p.color})`;
          return (
            <motion.div
              key={p.title}
              whileHover={{ y: -4 }}
              className="glass rounded-lg p-5 relative overflow-hidden"
              style={{ borderColor: `color-mix(in oklab, ${c} 40%, transparent)` }}
            >
              <div className="flex justify-between items-start mb-3 font-mono text-[11px] uppercase tracking-wider">
                <span style={{ color: c }}>{p.tag}</span>
                <span className="text-muted-foreground">{p.status}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{p.icon} {p.title}</h3>
              <ul className="space-y-1.5 text-sm text-foreground/85 list-disc list-inside marker:text-muted-foreground">
                {p.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <blockquote className="mt-4 pt-3 border-t border-border/40 italic text-sm text-muted-foreground">
                “{p.quote}”
              </blockquote>
            </motion.div>
          );
        })}
      </div>
    </Panel>
  );
}

/* ---------------- GUILDS ---------------- */
function Guilds() {
  return (
    <Panel title="Guild System" tag="affiliations" accent="green">
      <div className="grid md:grid-cols-2 gap-5">
        {[
          { icon: "🛡️", name: "CSIT Association of BMC", role: "Joint Secretary" },
          { icon: "🌍", name: "CodeForChange Network", role: "College Representative" },
        ].map((g) => (
          <div key={g.name} className="glass rounded-lg p-5 flex items-center gap-4">
            <div className="text-4xl">{g.icon}</div>
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-neon-green">Active</div>
              <div className="font-semibold text-lg">{g.name}</div>
              <div className="text-sm text-muted-foreground">{g.role}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted-foreground italic">
        Influence-based leadership roles through communication and coordination.
      </p>
    </Panel>
  );
}

/* ---------------- CHARACTER STATS ---------------- */
function StatsPanel() {
  const stats = [
    ["☕ Energy", "Unstable", "warn"],
    ["💡 Ideas", "Infinite loop", "purple"],
    ["🚀 Projects Started", "27+", "cyan"],
    ["🏁 Projects Finished", "Selectively completed", "green"],
    ["🗣️ Talking Power", "High influence", "pink"],
    ["🧠 Focus", "Intermittent spikes", "warn"],
    ["⚡ Execution", "Event-triggered", "cyan"],
    ["🎭 Public Perception", "“He jokes a lot, but things happen around him”", "purple"],
    ["⚠️ Reality", "More capable than he appears", "green"],
  ] as const;
  return (
    <Panel title="Character Stats Panel" tag="status.live" accent="cyan">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-sm">
        {stats.map(([k, v, c]) => {
          const col = c === "warn" ? "var(--warning)" : `var(--neon-${c})`;
          return (
            <div key={k} className="glass rounded-md p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{k}</div>
              <div className="font-semibold" style={{ color: col }}>{v}</div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* ---------------- PHOTO WALL ---------------- */
function PhotoWall() {
  const versions = [
    { label: "v0.1 — Childhood", hint: "This version had no idea what was coming next." },
    { label: "v0.4 — School Phase", hint: "Loud in class, quiet in notebooks." },
    { label: "v0.7 — Early CSIT", hint: "Expected clarity. Received confusion.exe" },
    { label: "v1.0 — Current Build", hint: "Unstable but somehow shipping." },
  ];
  return (
    <Panel title="Different Versions of Me" tag="photo_memory.wall" accent="pink">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {versions.map((v, i) => (
          <motion.div
            key={v.label}
            whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
            className="relative group rounded-lg overflow-hidden border border-neon-pink/30 aspect-[3/4]"
          >
            <div className="absolute inset-0 grid-bg" />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, color-mix(in oklab, var(--neon-purple) 30%, transparent), color-mix(in oklab, var(--neon-cyan) 25%, transparent))`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-60">👤</div>
            <div className="absolute inset-0 scanlines" />
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-background to-transparent font-mono text-[11px]">
              <div className="text-neon-pink">{v.label}</div>
            </div>
            <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition bg-background/85 text-xs text-foreground">
              <span>“{v.hint}”</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

/* ---------------- FINAL QUOTE ---------------- */
function FinalQuote() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative text-center py-16"
    >
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
        // final_transmission
      </div>
      <p className="text-2xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight">
        “I may look like I’m joking, but somehow{" "}
        <span className="gradient-text">things start moving</span> when I start talking.”
      </p>
      <div className="mt-6 font-mono text-sm text-neon-cyan blink">— nischal_os // end of log</div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-border/50 pt-6">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-wrap justify-between gap-3 font-mono text-xs text-muted-foreground">
        <span>© nischal_os v1.0 — built with chaos</span>
        <span className="text-neon-purple">status: still talking</span>
      </div>
    </footer>
  );
}
