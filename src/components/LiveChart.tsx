import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import type { SensorSample } from "../lib/sensor";
import { formatTime } from "../lib/utils";

export function LiveChart({
  samples,
  warning,
  critical,
}: {
  samples: SensorSample[];
  warning: number;
  critical: number;
}) {
  const data = samples.slice(-120).map((s) => ({
    time: formatTime(new Date(s.t)),
    stress: +s.stress.toFixed(1),
    risk: +s.risk.toFixed(1),
    hr: +s.hr.toFixed(1),
  }));

  return (
    <div className="card h-[340px]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="metric-label">Live signal</div>
          <div className="font-display text-lg font-semibold">Stress &amp; early-warning risk</div>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-300">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-violet" />Stress</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-cyan" />Risk</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent-amber" />HR</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="stressFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="hrFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} minTickGap={40} />
          <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 160]} />
          <Tooltip
            contentStyle={{
              background: "rgba(7,11,24,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              fontSize: 12,
            }}
            labelStyle={{ color: "#cbd5e1" }}
          />
          <ReferenceLine y={warning} stroke="#FBBF24" strokeDasharray="4 4" strokeOpacity={0.5} />
          <ReferenceLine y={critical} stroke="#FB7185" strokeDasharray="4 4" strokeOpacity={0.5} />
          <Area dataKey="hr" stroke="#FBBF24" fill="url(#hrFill)" strokeWidth={1.5} />
          <Area dataKey="risk" stroke="#22D3EE" fill="url(#riskFill)" strokeWidth={2} />
          <Area dataKey="stress" stroke="#8B5CF6" fill="url(#stressFill)" strokeWidth={2.4} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
