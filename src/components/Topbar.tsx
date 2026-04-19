import { Bluetooth, BatteryFull, Activity, Zap } from "lucide-react";
import { useStore } from "../lib/store";
import { stateLabel } from "../lib/sensor";
import { cn } from "../lib/utils";

export function Topbar() {
  const { connected, battery, samples, state, triggerSpike, settings } = useStore();
  const last = samples[samples.length - 1];

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-ink-950/60 border-b border-white/5">
      <div className="px-4 lg:px-8 py-4 flex items-center gap-3">
        <div>
          <div className="text-[11px] text-slate-400 uppercase tracking-[0.2em]">
            Hello, {settings.name}
          </div>
          <div className="font-display text-xl font-semibold">
            Your body is {stateLabel[state].toLowerCase()} right now
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="btn-ghost text-xs"
            onClick={() => triggerSpike(1)}
            title="Simulate an acute stress event"
          >
            <Zap className="w-3.5 h-3.5" />
            Simulate stress
          </button>
          <div className={cn(
            "chip",
            connected ? "text-emerald-300 border-emerald-400/30" : "text-slate-400"
          )}>
            <Bluetooth className="w-3.5 h-3.5" />
            {connected ? "Band v2 · Connected" : "Disconnected"}
          </div>
          <div className="chip">
            <BatteryFull className="w-3.5 h-3.5 text-emerald-300" />
            {Math.round(battery)}%
          </div>
          <div className="chip">
            <Activity className="w-3.5 h-3.5 text-accent-cyan" />
            {Math.round(last?.hr ?? 0)} bpm
          </div>
        </div>
      </div>
    </header>
  );
}
