import { motion } from "framer-motion";
import { useStore } from "../lib/store";
import { stateColor, stateLabel } from "../lib/sensor";

export function WristbandHero() {
  const { samples, state } = useStore();
  const last = samples[samples.length - 1];
  const color = stateColor[state];

  return (
    <div className="card relative overflow-hidden">
      <div className="metric-label">Your band</div>
      <div className="font-display text-lg font-semibold">PulseGuard Band v2</div>
      <div className="text-xs text-slate-400">Senses before you do.</div>

      <div className="relative mt-4 h-56 grid place-items-center">
        <div className="absolute inset-0 opacity-50 pointer-events-none"
             style={{ background: `radial-gradient(300px 200px at 50% 50%, ${color}44, transparent)` }} />
        <motion.div
          className="relative w-40 h-40 rounded-full border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02] grid place-items-center shadow-glow"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          <span className="absolute inset-0 rounded-full animate-pulseRing"
                style={{ background: color, opacity: 0.18 }} />
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Now</div>
            <div className="font-display text-3xl font-bold">{Math.round(last?.hr ?? 0)}</div>
            <div className="text-[10px] text-slate-400">bpm</div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 text-center text-xs mt-2">
        <div>
          <div className="metric-label">State</div>
          <div className="font-semibold mt-0.5" style={{ color }}>{stateLabel[state]}</div>
        </div>
        <div>
          <div className="metric-label">EDA</div>
          <div className="font-semibold mt-0.5">{(last?.eda ?? 0).toFixed(1)} µS</div>
        </div>
        <div>
          <div className="metric-label">Skin T</div>
          <div className="font-semibold mt-0.5">{(last?.temp ?? 0).toFixed(1)}°C</div>
        </div>
      </div>
    </div>
  );
}
