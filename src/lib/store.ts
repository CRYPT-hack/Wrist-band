import { create } from "zustand";
import { SensorEngine, stateFor } from "./sensor";
import type { SensorSample, StressState } from "./sensor";

export type AlertEvent = {
  id: string;
  t: number;
  level: "warning" | "critical";
  title: string;
  detail: string;
  stress: number;
  risk: number;
  acknowledged: boolean;
};

type Thresholds = {
  warning: number;
  critical: number;
  earlyWarning: number;
};

type Settings = {
  vibration: boolean;
  voiceCue: boolean;
  autoBreathing: boolean;
  shareWithClinician: boolean;
  name: string;
};

type Store = {
  engine: SensorEngine;
  samples: SensorSample[];
  connected: boolean;
  battery: number;
  state: StressState;
  alerts: AlertEvent[];
  thresholds: Thresholds;
  settings: Settings;
  running: boolean;
  breathingOpen: boolean;
  tick: () => void;
  setRunning: (v: boolean) => void;
  setConnected: (v: boolean) => void;
  setBreathingOpen: (v: boolean) => void;
  triggerSpike: (intensity?: number) => void;
  ack: (id: string) => void;
  clearAlerts: () => void;
  setThreshold: (k: keyof Thresholds, v: number) => void;
  setSetting: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
};

const engine = new SensorEngine(Math.random() * 3);
for (let i = 0; i < 120; i++) engine.step();

export const useStore = create<Store>((set, get) => ({
  engine,
  samples: engine.snapshot(),
  connected: true,
  battery: 78,
  state: "calm",
  alerts: [],
  thresholds: { warning: 60, critical: 82, earlyWarning: 55 },
  settings: {
    vibration: true,
    voiceCue: true,
    autoBreathing: true,
    shareWithClinician: false,
    name: "Shobhit",
  },
  running: true,
  breathingOpen: false,
  tick: () => {
    const { engine, running, alerts, thresholds, settings } = get();
    if (!running) return;
    const s = engine.step();
    const samples = engine.snapshot();
    const state = stateFor(s.stress);

    let nextAlerts = alerts;
    const last = alerts[0];
    const cooldownMs = 25000;
    const recent = last && Date.now() - last.t < cooldownMs;

    if (!recent) {
      if (s.risk >= thresholds.earlyWarning && s.stress < thresholds.warning) {
        const ev: AlertEvent = {
          id: `a-${Date.now()}`,
          t: Date.now(),
          level: "warning",
          title: "Early warning",
          detail:
            "Rising skin conductance and heart rate detected. Stress likely in ~60s. Pause and breathe.",
          stress: s.stress,
          risk: s.risk,
          acknowledged: false,
        };
        nextAlerts = [ev, ...alerts].slice(0, 50);
        if (settings.autoBreathing) set({ breathingOpen: true });
      } else if (s.stress >= thresholds.critical) {
        const ev: AlertEvent = {
          id: `a-${Date.now()}`,
          t: Date.now(),
          level: "critical",
          title: "Stress peak",
          detail:
            "Critical stress detected. Starting guided breathing. Tap to adjust.",
          stress: s.stress,
          risk: s.risk,
          acknowledged: false,
        };
        nextAlerts = [ev, ...alerts].slice(0, 50);
        if (settings.autoBreathing) set({ breathingOpen: true });
      }
    }

    const battery = Math.max(5, get().battery - 0.0008);

    set({ samples, state, alerts: nextAlerts, battery });
  },
  setRunning: (v) => set({ running: v }),
  setConnected: (v) => set({ connected: v }),
  setBreathingOpen: (v) => set({ breathingOpen: v }),
  triggerSpike: (intensity = 1) => get().engine.triggerSpike(intensity),
  ack: (id) =>
    set({
      alerts: get().alerts.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)),
    }),
  clearAlerts: () => set({ alerts: [] }),
  setThreshold: (k, v) => set({ thresholds: { ...get().thresholds, [k]: v } }),
  setSetting: (k, v) => set({ settings: { ...get().settings, [k]: v } }),
}));
