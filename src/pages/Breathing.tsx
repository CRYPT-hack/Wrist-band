import { Wind } from "lucide-react";
import { useStore } from "../lib/store";

const TECHNIQUES = [
  {
    name: "Box breathing",
    time: "2 min",
    desc: "4-2-6-2. Slow sympathetic surge, reset vagal tone.",
    tint: "#8B5CF6",
  },
  {
    name: "Physiological sigh",
    time: "60 sec",
    desc: "Double inhale, long exhale. Fastest known calm-down.",
    tint: "#22D3EE",
  },
  {
    name: "4-7-8",
    time: "3 min",
    desc: "Dr. Weil's classic. Pre-sleep and pre-exam.",
    tint: "#FBBF24",
  },
  {
    name: "Coherence",
    time: "5 min",
    desc: "~5.5 breaths/min — peak HRV resonance.",
    tint: "#A3E635",
  },
];

export function Breathing() {
  const { setBreathingOpen } = useStore();
  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="card">
        <div className="metric-label">Reset library</div>
        <div className="font-display text-2xl font-semibold">Breathing &amp; regulation</div>
        <div className="text-sm text-slate-400 mt-1 max-w-2xl">
          Each technique targets a specific axis of the autonomic nervous system. PulseGuard
          auto-picks the right one based on your current state — you can override here.
        </div>

        <div className="grid md:grid-cols-2 gap-3 mt-6">
          {TECHNIQUES.map((t) => (
            <button
              key={t.name}
              onClick={() => setBreathingOpen(true)}
              className="text-left glass p-5 hover:bg-white/[0.08] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl grid place-items-center border border-white/10"
                  style={{ background: t.tint + "22" }}
                >
                  <Wind className="w-4 h-4" style={{ color: t.tint }} />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.time}</div>
                </div>
                <div className="ml-auto text-slate-400 group-hover:text-white transition-colors">→</div>
              </div>
              <div className="text-sm text-slate-300 mt-3">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
