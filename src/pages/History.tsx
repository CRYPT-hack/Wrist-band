import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { useMemo } from "react";
import { useStore } from "../lib/store";
import { stateColor, stateFor } from "../lib/sensor";

function synthesizeDays() {
  const out = [];
  for (let d = 13; d >= 0; d--) {
    const date = new Date();
    date.setDate(date.getDate() - d);
    const peak = 30 + Math.random() * 60;
    const avg = 20 + Math.random() * 30;
    out.push({
      label: date.toLocaleDateString([], { month: "short", day: "numeric" }),
      peak: +peak.toFixed(0),
      avg: +avg.toFixed(0),
      alerts: Math.floor(Math.random() * 4),
    });
  }
  return out;
}

export function History() {
  const { samples } = useStore();
  const days = useMemo(synthesizeDays, []);

  const hourly = useMemo(() => {
    const bucket = Array.from({ length: 12 }, (_, i) => ({
      hour: `${(new Date().getHours() - 11 + i + 24) % 24}:00`,
      stress: 0,
      count: 0,
    }));
    samples.forEach((s, i) => {
      const idx = Math.floor((i / samples.length) * 12);
      bucket[idx].stress += s.stress;
      bucket[idx].count++;
    });
    return bucket.map((b) => ({ ...b, stress: b.count ? +(b.stress / b.count).toFixed(1) : 0 }));
  }, [samples]);

  return (
    <div className="max-w-[1400px] mx-auto grid gap-4">
      <div className="card">
        <div className="metric-label">Last 14 days</div>
        <div className="font-display text-2xl font-semibold">Daily stress profile</div>
        <div className="h-72 mt-4">
          <ResponsiveContainer>
            <BarChart data={days}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="label" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "rgba(7,11,24,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="peak" radius={[8, 8, 0, 0]}>
                {days.map((d, i) => (
                  <Cell key={i} fill={stateColor[stateFor(d.peak)]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="card col-span-12 lg:col-span-7">
          <div className="metric-label">Last 12 hours</div>
          <div className="font-display text-xl font-semibold">Circadian pattern</div>
          <div className="h-64 mt-4">
            <ResponsiveContainer>
              <BarChart data={hourly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(7,11,24,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="stress" radius={[6, 6, 0, 0]} fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card col-span-12 lg:col-span-5">
          <div className="metric-label">Triggers detected (auto-tagged)</div>
          <div className="font-display text-xl font-semibold">What's setting you off</div>
          <ul className="mt-4 space-y-3">
            {[
              { tag: "Meetings", pct: 62, tint: "#FB7185" },
              { tag: "Commute", pct: 44, tint: "#FBBF24" },
              { tag: "Late-night screens", pct: 31, tint: "#22D3EE" },
              { tag: "Caffeine > 3pm", pct: 22, tint: "#A3E635" },
            ].map((t) => (
              <li key={t.tag} className="flex items-center gap-3">
                <div className="text-sm w-44">{t.tag}</div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: `${t.pct}%`, background: t.tint }} />
                </div>
                <div className="text-xs text-slate-400 w-8 text-right">{t.pct}%</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
