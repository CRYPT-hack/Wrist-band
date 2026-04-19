import { useStore } from "../lib/store";

function Toggle({
  checked,
  onChange,
  label,
  desc,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  desc: string;
}) {
  return (
    <label className="flex items-start justify-between gap-4 py-4 border-b border-white/5 cursor-pointer">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-slate-400 mt-0.5">{desc}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-all ${
          checked ? "bg-gradient-to-r from-accent-violet to-accent-cyan" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </label>
  );
}

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="py-4 border-b border-white/5">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-slate-400">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full mt-3 accent-violet-400"
      />
    </div>
  );
}

export function Settings() {
  const { settings, setSetting, thresholds, setThreshold } = useStore();
  return (
    <div className="max-w-[900px] mx-auto grid gap-4">
      <div className="card">
        <div className="metric-label">Profile</div>
        <div className="font-display text-2xl font-semibold">Your preferences</div>

        <div className="mt-4">
          <div className="text-sm font-medium">Display name</div>
          <input
            value={settings.name}
            onChange={(e) => setSetting("name", e.target.value)}
            className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-accent-violet"
          />
        </div>

        <div className="mt-4">
          <Toggle
            label="Wrist vibration on alert"
            desc="Short pulse pattern when early-warning fires."
            checked={settings.vibration}
            onChange={(v) => setSetting("vibration", v)}
          />
          <Toggle
            label="Voice cue"
            desc='Soft audio prompt: "slow down, breathe".'
            checked={settings.voiceCue}
            onChange={(v) => setSetting("voiceCue", v)}
          />
          <Toggle
            label="Auto-launch breathing"
            desc="When risk crosses threshold, open the guided overlay."
            checked={settings.autoBreathing}
            onChange={(v) => setSetting("autoBreathing", v)}
          />
          <Toggle
            label="Share summary with clinician"
            desc="Weekly anonymised HRV/stress report to your care team."
            checked={settings.shareWithClinician}
            onChange={(v) => setSetting("shareWithClinician", v)}
          />
        </div>
      </div>

      <div className="card">
        <div className="metric-label">Thresholds</div>
        <div className="font-display text-2xl font-semibold">Sensitivity</div>
        <div className="text-sm text-slate-400 mt-1">
          Lower thresholds = more warnings. Tune to your baseline.
        </div>
        <Slider
          label="Early-warning risk"
          value={thresholds.earlyWarning}
          onChange={(v) => setThreshold("earlyWarning", v)}
        />
        <Slider
          label="Warning stress"
          value={thresholds.warning}
          onChange={(v) => setThreshold("warning", v)}
        />
        <Slider
          label="Critical stress"
          value={thresholds.critical}
          onChange={(v) => setThreshold("critical", v)}
        />
      </div>
    </div>
  );
}
