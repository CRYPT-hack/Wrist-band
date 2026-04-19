import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function MetricCard({
  label,
  value,
  unit,
  icon,
  tint = "violet",
  spark,
  hint,
}: {
  label: string;
  value: number | string;
  unit?: string;
  icon?: ReactNode;
  tint?: "violet" | "cyan" | "amber" | "rose" | "lime";
  spark?: number[];
  hint?: string;
}) {
  const tints: Record<string, string> = {
    violet: "from-accent-violet/40 to-accent-violet/0",
    cyan: "from-accent-cyan/40 to-accent-cyan/0",
    amber: "from-accent-amber/40 to-accent-amber/0",
    rose: "from-accent-rose/40 to-accent-rose/0",
    lime: "from-accent-lime/40 to-accent-lime/0",
  };
  const stroke: Record<string, string> = {
    violet: "#8B5CF6",
    cyan: "#22D3EE",
    amber: "#FBBF24",
    rose: "#FB7185",
    lime: "#A3E635",
  };

  const max = spark && spark.length ? Math.max(...spark) : 1;
  const min = spark && spark.length ? Math.min(...spark) : 0;
  const range = max - min || 1;
  const points = spark
    ? spark
        .map((v, i) => `${(i / (spark.length - 1)) * 100},${30 - ((v - min) / range) * 26}`)
        .join(" ")
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card relative overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${tints[tint]} pointer-events-none opacity-70`} />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="metric-label">{label}</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <div className="font-display text-3xl font-bold">{value}</div>
            {unit && <div className="text-slate-400 text-sm">{unit}</div>}
          </div>
          {hint && <div className="text-[11px] text-slate-500 mt-1">{hint}</div>}
        </div>
        {icon && (
          <div className="w-9 h-9 rounded-xl grid place-items-center bg-white/5 border border-white/10">
            {icon}
          </div>
        )}
      </div>
      {spark && (
        <svg viewBox="0 0 100 30" className="w-full h-10 mt-3 relative">
          <polyline
            points={points}
            fill="none"
            stroke={stroke[tint]}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      )}
    </motion.div>
  );
}
