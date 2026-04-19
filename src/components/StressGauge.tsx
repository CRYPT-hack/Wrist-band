import { motion } from "framer-motion";
import { stateColor, stateFor, stateLabel } from "../lib/sensor";

export function StressGauge({ stress, risk }: { stress: number; risk: number }) {
  const state = stateFor(stress);
  const color = stateColor[state];
  const r = 86;
  const c = 2 * Math.PI * r;
  const offset = c - (stress / 100) * c;
  const riskOffset = c - (risk / 100) * c;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-[0_0_30px_rgba(139,92,246,0.25)]">
        <defs>
          <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0" stopColor="#FB7185" />
            <stop offset="1" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="110" r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="14" fill="none" />
        <motion.circle
          cx="110"
          cy="110"
          r={r}
          stroke="url(#g2)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={riskOffset}
          animate={{ strokeDashoffset: riskOffset }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          transform="rotate(-90 110 110)"
          opacity="0.35"
        />
        <motion.circle
          cx="110"
          cy="110"
          r={r}
          stroke="url(#g1)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          transform="rotate(-90 110 110)"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Stress index</div>
        <div className="font-display text-5xl font-bold mt-1">
          {Math.round(stress)}
        </div>
        <div
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full mt-2 border"
          style={{ color, borderColor: color + "55", background: color + "14" }}
        >
          {stateLabel[state]}
        </div>
      </div>
    </div>
  );
}
