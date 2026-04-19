import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useStore } from "../lib/store";

const PHASES = [
  { label: "Inhale", ms: 4000, scale: 1.6 },
  { label: "Hold", ms: 2000, scale: 1.6 },
  { label: "Exhale", ms: 6000, scale: 0.9 },
  { label: "Rest", ms: 2000, scale: 0.9 },
];

export function BreathingOverlay() {
  const { breathingOpen, setBreathingOpen } = useStore();
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!breathingOpen) return;
    const t = setTimeout(() => {
      const next = (phase + 1) % PHASES.length;
      setPhase(next);
      if (next === 0) setCycle((c) => c + 1);
    }, PHASES[phase].ms);
    return () => clearTimeout(t);
  }, [phase, breathingOpen]);

  useEffect(() => {
    if (!breathingOpen) {
      setPhase(0);
      setCycle(0);
    }
  }, [breathingOpen]);

  return (
    <AnimatePresence>
      {breathingOpen && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-6 backdrop-blur-2xl"
          style={{ background: "rgba(4,6,16,0.7)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute top-6 right-6 btn-ghost"
            onClick={() => setBreathingOpen(false)}
          >
            <X className="w-4 h-4" /> Close
          </button>

          <div className="text-center">
            <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
              Box-breath · cycle {cycle + 1}
            </div>
            <div className="font-display text-4xl font-bold mt-2">{PHASES[phase].label}</div>

            <div className="relative mt-10 grid place-items-center" style={{ width: 340, height: 340 }}>
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 280,
                  height: 280,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(139,92,246,0.5), rgba(34,211,238,0.2) 60%, transparent)",
                  filter: "blur(2px)",
                }}
                animate={{ scale: PHASES[phase].scale }}
                transition={{ duration: PHASES[phase].ms / 1000, ease: "easeInOut" }}
              />
              <motion.div
                className="relative w-40 h-40 rounded-full border border-white/20 bg-white/5 grid place-items-center shadow-glow"
                animate={{ scale: PHASES[phase].scale * 0.85 }}
                transition={{ duration: PHASES[phase].ms / 1000, ease: "easeInOut" }}
              >
                <span className="font-display text-xl">{PHASES[phase].label}</span>
              </motion.div>
            </div>

            <div className="text-slate-400 text-sm mt-8 max-w-sm mx-auto">
              Follow the orb. Breathe through the nose. Each 14-second cycle lowers HRV-to-HR
              coupling and shifts you back toward parasympathetic balance.
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
