import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState("");
  const [cpu, setCpu] = useState(42);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-GB"));
      setCpu(30 + Math.floor(Math.random() * 50));
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-neon-green" style={{ boxShadow: "0 0 8px var(--neon-green)" }} />
          <span className="text-neon-green">nischal_os</span>
          <span className="text-muted-foreground hidden sm:inline">// v1.0 unstable</span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="hidden md:inline">cpu:<span className="text-neon-cyan ml-1">{cpu}%</span></span>
          <span className="hidden md:inline">guffadi:<span className="text-neon-purple ml-1">∞</span></span>
          <span className="text-neon-cyan">{time}</span>
        </div>
      </div>
    </div>
  );
}
