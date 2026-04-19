import { Heart, Droplets, Thermometer, Wind, Gauge, Activity } from "lucide-react";
import { useStore } from "../lib/store";
import { StressGauge } from "../components/StressGauge";
import { MetricCard } from "../components/MetricCard";
import { LiveChart } from "../components/LiveChart";
import { AlertBanner } from "../components/AlertBanner";
import { WristbandHero } from "../components/WristbandHero";

export function Dashboard() {
  const { samples, thresholds } = useStore();
  const last = samples[samples.length - 1];
  const tail = samples.slice(-40);

  const spark = (k: keyof typeof last) => tail.map((s) => s[k] as number);

  return (
    <div className="max-w-[1400px] mx-auto">
      <AlertBanner />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 card">
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-label">Current state</div>
              <div className="font-display text-2xl font-semibold">
                Predictive stress monitor
              </div>
              <div className="text-sm text-slate-400 mt-1 max-w-md">
                The band fuses heart, sweat and micro-temperature signals to warn you
                <span className="text-accent-cyan"> ~60 seconds before</span> a stress peak.
              </div>
            </div>
            <StressGauge stress={last?.stress ?? 0} risk={last?.risk ?? 0} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            <div className="glass p-3">
              <div className="metric-label">Risk (60s)</div>
              <div className="font-display text-2xl font-bold">{Math.round(last?.risk ?? 0)}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">early-warning index</div>
            </div>
            <div className="glass p-3">
              <div className="metric-label">HRV · RMSSD</div>
              <div className="font-display text-2xl font-bold">{(last?.hrv ?? 0).toFixed(0)}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">ms, parasympathetic</div>
            </div>
            <div className="glass p-3">
              <div className="metric-label">SpO₂</div>
              <div className="font-display text-2xl font-bold">{(last?.spo2 ?? 0).toFixed(0)}%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">oxygen sat</div>
            </div>
            <div className="glass p-3">
              <div className="metric-label">Motion</div>
              <div className="font-display text-2xl font-bold">{(last?.motion ?? 0).toFixed(2)}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">accelerometer g</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <WristbandHero />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <LiveChart samples={samples} warning={thresholds.warning} critical={thresholds.critical} />
        </div>

        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-3">
          <MetricCard
            label="Heart rate"
            value={Math.round(last?.hr ?? 0)}
            unit="bpm"
            icon={<Heart className="w-4 h-4 text-accent-rose" />}
            tint="rose"
            spark={spark("hr")}
            hint="resting baseline 68"
          />
          <MetricCard
            label="EDA (sweat)"
            value={(last?.eda ?? 0).toFixed(2)}
            unit="µS"
            icon={<Droplets className="w-4 h-4 text-accent-cyan" />}
            tint="cyan"
            spark={spark("eda")}
            hint="skin conductance"
          />
          <MetricCard
            label="Skin temp"
            value={(last?.temp ?? 0).toFixed(1)}
            unit="°C"
            icon={<Thermometer className="w-4 h-4 text-accent-amber" />}
            tint="amber"
            spark={spark("temp")}
          />
          <MetricCard
            label="Breath rate"
            value={Math.round(12 + (last?.motion ?? 0) * 4)}
            unit="/min"
            icon={<Wind className="w-4 h-4 text-accent-lime" />}
            tint="lime"
          />
        </div>

        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="card">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-accent-violet" />
              <div className="font-semibold">Today at a glance</div>
            </div>
            <div className="grid grid-cols-3 mt-4 gap-3 text-center">
              <div>
                <div className="metric-label">Peak</div>
                <div className="font-display text-xl font-bold mt-1">
                  {Math.round(Math.max(...samples.slice(-240).map((s) => s.stress)))}
                </div>
              </div>
              <div>
                <div className="metric-label">Average</div>
                <div className="font-display text-xl font-bold mt-1">
                  {Math.round(
                    samples.slice(-240).reduce((a, b) => a + b.stress, 0) /
                      Math.max(1, samples.slice(-240).length)
                  )}
                </div>
              </div>
              <div>
                <div className="metric-label">Calm mins</div>
                <div className="font-display text-xl font-bold mt-1">
                  {Math.round(samples.slice(-240).filter((s) => s.stress < 30).length / 4)}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent-cyan" />
              <div className="font-semibold">Behavioural nudge</div>
            </div>
            <div className="text-sm text-slate-300 mt-2">
              You tend to spike around <span className="text-accent-amber font-semibold">14:00–16:00</span>.
              Block a 5-minute reset at <span className="text-accent-cyan font-semibold">13:45</span>.
            </div>
            <button className="btn-primary text-xs mt-3">Add to calendar</button>
          </div>

          <div className="card">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent-rose" />
              <div className="font-semibold">Recovery</div>
            </div>
            <div className="text-sm text-slate-300 mt-2">
              HRV recovered <span className="text-accent-lime">+12%</span> since last night.
              Sleep window suggestion: <span className="text-white">10:50 PM</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
