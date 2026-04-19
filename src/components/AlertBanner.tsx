import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Wind, X } from "lucide-react";
import { useStore } from "../lib/store";

export function AlertBanner() {
  const { alerts, ack, setBreathingOpen } = useStore();
  const active = alerts.find((a) => !a.acknowledged);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative overflow-hidden rounded-2xl border p-4 mb-4"
          style={{
            borderColor: active.level === "critical" ? "rgba(251,113,133,0.6)" : "rgba(251,191,36,0.5)",
            background:
              active.level === "critical"
                ? "linear-gradient(90deg, rgba(251,113,133,0.15), rgba(251,113,133,0.03))"
                : "linear-gradient(90deg, rgba(251,191,36,0.14), rgba(251,191,36,0.02))",
          }}
        >
          <div className="absolute -inset-10 opacity-30 blur-3xl pointer-events-none"
               style={{ background: active.level === "critical" ? "#FB7185" : "#FBBF24" }} />
          <div className="relative flex items-start gap-3">
            <div className="mt-0.5">
              <span className="relative flex w-9 h-9 items-center justify-center rounded-xl bg-white/10 border border-white/15">
                <AlertTriangle className="w-4 h-4" />
                <span className="absolute inline-flex w-full h-full rounded-xl animate-pulseRing"
                      style={{ background: active.level === "critical" ? "#FB7185" : "#FBBF24", opacity: 0.4 }} />
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">
                {active.title} · risk {Math.round(active.risk)} · stress {Math.round(active.stress)}
              </div>
              <div className="text-sm text-slate-300 mt-0.5">{active.detail}</div>
              <div className="mt-3 flex items-center gap-2">
                <button className="btn-primary text-xs !py-1.5" onClick={() => setBreathingOpen(true)}>
                  <Wind className="w-3.5 h-3.5" /> Start breathing
                </button>
                <button className="btn-ghost text-xs !py-1.5" onClick={() => ack(active.id)}>
                  Dismiss
                </button>
              </div>
            </div>
            <button className="text-slate-400 hover:text-white" onClick={() => ack(active.id)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
