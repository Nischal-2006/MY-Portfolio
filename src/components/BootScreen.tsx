import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "> initializing nischal_os v1.0 ...",
  "> mounting /chaos /ideas /guffadi ...",
  "> loading personality.dll ........... OK",
  "> loading consistency.dll ........... FAILED",
  "> retrying consistency.dll .......... STILL FAILED",
  "> bypassing consistency module ...... OK",
  "> status: ACTIVE (unstable behavior detected)",
  "> class: CORE GUFFADI / SOCIAL ENGINE / CHAOS NAVIGATOR",
  "> origin: GULMI → BUTWAL",
  '> warning: "this system appears unserious, but produces unexpected real-world outcomes."',
  "> press any key to enter ...",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (shown >= lines.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setShown((n) => n + 1), shown === 4 ? 700 : 280);
    return () => clearTimeout(t);
  }, [shown]);

  useEffect(() => {
    const handler = () => done && onDone();
    window.addEventListener("keydown", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("click", handler);
    };
  }, [done, onDone]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-background grid-bg overflow-hidden"
      >
        <div className="scan-line" />
        <div className="relative max-w-3xl mx-auto px-6 pt-24 font-mono text-sm md:text-base">
          <div className="mb-6 text-neon-purple text-glitch flicker">
            ╔══════════════════════════════════════╗
            <br />
            ║   NISCHAL_OS // BOOT SEQUENCE v1.0   ║
            <br />
            ╚══════════════════════════════════════╝
          </div>
          {lines.slice(0, shown).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={
                l.includes("FAILED")
                  ? "text-destructive"
                  : l.includes("warning")
                  ? "text-warning"
                  : l.includes("OK")
                  ? "text-neon-green"
                  : "text-neon-cyan/90"
              }
            >
              {l}
            </motion.div>
          ))}
          {done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-neon-pink blink"
            >
              [ press any key / click to continue ]
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
