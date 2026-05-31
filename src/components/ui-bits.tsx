import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function StatBar({
  label,
  value,
  hint,
  color = "purple",
  max = 100,
}: {
  label: string;
  value: number | string;
  hint?: string;
  color?: "purple" | "cyan" | "green" | "pink" | "warn";
  max?: number;
}) {
  const isNum = typeof value === "number";
  const pct = isNum ? Math.min(100, (value / max) * 100) : 100;
  const colorVar = {
    purple: "var(--neon-purple)",
    cyan: "var(--neon-cyan)",
    green: "var(--neon-green)",
    pink: "var(--neon-pink)",
    warn: "var(--warning)",
  }[color];

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-wider">
        <span className="text-foreground/80">{label}</span>
        <span style={{ color: colorVar }}>
          {isNum ? `${value}/${max}` : value}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${colorVar}, color-mix(in oklab, ${colorVar} 40%, transparent))`,
            boxShadow: `0 0 12px ${colorVar}`,
          }}
        />
      </div>
      {hint && (
        <p className="text-xs text-muted-foreground italic">“{hint}”</p>
      )}
    </div>
  );
}

export function GlitchText({ children, className = "" }: { children: string; className?: string }) {
  const [, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(i);
  }, []);
  return (
    <span className={`relative inline-block text-glitch ${className}`}>
      {children}
    </span>
  );
}

export function Panel({
  title,
  tag,
  children,
  accent = "purple",
}: {
  title: string;
  tag?: string;
  children: React.ReactNode;
  accent?: "purple" | "cyan" | "green" | "pink";
}) {
  const colorVar = {
    purple: "var(--neon-purple)",
    cyan: "var(--neon-cyan)",
    green: "var(--neon-green)",
    pink: "var(--neon-pink)",
  }[accent];
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="glass rounded-xl p-6 md:p-8 relative overflow-hidden"
      style={{ borderColor: `color-mix(in oklab, ${colorVar} 35%, transparent)` }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${colorVar}, transparent)` }}
      />
      <header className="flex items-center justify-between mb-6 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: colorVar, boxShadow: `0 0 8px ${colorVar}` }} />
          <span className="uppercase tracking-[0.2em] text-muted-foreground">{tag ?? "module"}</span>
        </div>
        <span className="text-muted-foreground/60">// {Math.random().toString(16).slice(2, 8)}</span>
      </header>
      <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: colorVar }}>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}
