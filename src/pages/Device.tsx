import { Bluetooth, Cpu, Droplets, Heart, Thermometer, Zap, Radio } from "lucide-react";
import { useStore } from "../lib/store";

export function Device() {
  const { connected, setConnected, battery } = useStore();

  const sensors = [
    { icon: Heart, name: "Optical PPG", detail: "Heart rate · HRV · pulse morphology", tint: "#FB7185" },
    { icon: Droplets, name: "EDA array", detail: "Skin conductance · sweat burst detection", tint: "#22D3EE" },
    { icon: Thermometer, name: "IR skin thermistor", detail: "0.01°C resolution, 4 Hz", tint: "#FBBF24" },
    { icon: Zap, name: "Accelerometer", detail: "6-axis IMU, tremor + posture", tint: "#A3E635" },
    { icon: Cpu, name: "Edge ML", detail: "On-device LSTM, 60 s forecast window", tint: "#8B5CF6" },
    { icon: Radio, name: "BLE 5.3", detail: "Encrypted stream · 12 h battery", tint: "#F472B6" },
  ];

  return (
    <div className="max-w-[1100px] mx-auto grid gap-4">
      <div className="card flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="flex-1">
          <div className="metric-label">Device</div>
          <div className="font-display text-2xl font-semibold">PulseGuard Band v2</div>
          <div className="text-sm text-slate-400 mt-1">
            Firmware 2.4.1 · last synced just now
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <span className="chip text-emerald-300 border-emerald-400/30">
              <Bluetooth className="w-3.5 h-3.5" /> {connected ? "Connected" : "Disconnected"}
            </span>
            <span className="chip">Battery {Math.round(battery)}%</span>
            <span className="chip">Serial · PG-28A-0091</span>
          </div>

          <div className="flex gap-2 mt-5">
            <button className="btn-primary text-xs" onClick={() => setConnected(!connected)}>
              {connected ? "Disconnect" : "Reconnect"}
            </button>
            <button className="btn-ghost text-xs">Update firmware</button>
            <button className="btn-ghost text-xs">Export session</button>
          </div>
        </div>

        <div className="relative w-56 h-56 shrink-0 grid place-items-center">
          <div className="absolute inset-0 rounded-full" style={{
            background: "radial-gradient(180px 120px at 50% 50%, rgba(139,92,246,0.4), transparent)"
          }} />
          <div className="relative w-44 h-28 rounded-[28px] border border-white/15 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-glow grid place-items-center animate-floaty">
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3 h-14 rounded-l-xl bg-white/10 border-l border-white/10" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-14 rounded-r-xl bg-white/10 border-r border-white/10" />
            <div className="w-24 h-16 rounded-xl bg-gradient-to-br from-accent-violet/60 to-accent-cyan/50 grid place-items-center">
              <span className="font-display font-semibold">PG</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="metric-label">Inside the band</div>
        <div className="font-display text-xl font-semibold">Sensor suite</div>
        <div className="grid md:grid-cols-3 gap-3 mt-5">
          {sensors.map((s) => (
            <div key={s.name} className="glass p-4">
              <div className="w-9 h-9 rounded-xl grid place-items-center border border-white/10"
                   style={{ background: s.tint + "22" }}>
                <s.icon className="w-4 h-4" style={{ color: s.tint }} />
              </div>
              <div className="font-semibold mt-3">{s.name}</div>
              <div className="text-xs text-slate-400 mt-1">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
