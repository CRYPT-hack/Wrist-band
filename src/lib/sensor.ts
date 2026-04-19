import { clamp, lerp } from "./utils";

export type SensorSample = {
  t: number;
  hr: number;
  hrv: number;
  eda: number;
  temp: number;
  spo2: number;
  motion: number;
  stress: number;
  risk: number;
};

export type StressState = "calm" | "focused" | "elevated" | "high" | "critical";

export function stateFor(stress: number): StressState {
  if (stress < 25) return "calm";
  if (stress < 45) return "focused";
  if (stress < 65) return "elevated";
  if (stress < 85) return "high";
  return "critical";
}

export const stateColor: Record<StressState, string> = {
  calm: "#34D399",
  focused: "#22D3EE",
  elevated: "#FBBF24",
  high: "#FB923C",
  critical: "#FB7185",
};

export const stateLabel: Record<StressState, string> = {
  calm: "Calm",
  focused: "Focused",
  elevated: "Elevated",
  high: "High Stress",
  critical: "Critical",
};

/**
 * Deterministic-ish mock sensor engine with realistic noise, drift,
 * and occasional "spikes" to simulate stress events. Includes an
 * early-warning risk score: a short-horizon forecast of stress based
 * on first derivatives of EDA (sweat) and heart rate, combined with
 * HRV collapse — the physiological signature of sympathetic arousal
 * before conscious stress is felt.
 */
export class SensorEngine {
  private baseHR = 74;
  private baseHRV = 55;
  private baseEDA = 3.2;
  private baseTemp = 32.6;
  private baseSpO2 = 98;
  private stressBias = 20;
  private spikeFor = 0;
  private spikeIntensity = 0;
  private history: SensorSample[] = [];

  constructor(seed = 1) {
    this.baseHR += seed * 0.7;
  }

  triggerSpike(intensity = 1) {
    this.spikeFor = 40 + Math.floor(Math.random() * 30);
    this.spikeIntensity = intensity;
  }

  step(): SensorSample {
    const t = Date.now();

    if (this.spikeFor > 0) {
      this.stressBias = lerp(this.stressBias, 70 + 20 * this.spikeIntensity, 0.08);
      this.spikeFor -= 1;
    } else {
      this.stressBias = lerp(this.stressBias, 18 + Math.sin(t / 60000) * 8, 0.02);
    }

    const noise = () => (Math.random() - 0.5) * 2;

    const hr = clamp(
      this.baseHR + (this.stressBias - 20) * 0.9 + Math.sin(t / 800) * 1.4 + noise() * 2.2,
      52,
      170
    );
    const hrv = clamp(
      this.baseHRV - (this.stressBias - 20) * 0.55 + noise() * 2.5,
      12,
      110
    );
    const eda = clamp(
      this.baseEDA + (this.stressBias - 20) * 0.07 + Math.sin(t / 1400) * 0.2 + noise() * 0.15,
      0.5,
      18
    );
    const temp = clamp(
      this.baseTemp + (this.stressBias - 20) * 0.012 + noise() * 0.05,
      30,
      36
    );
    const spo2 = clamp(this.baseSpO2 + noise() * 0.6, 92, 100);
    const motion = clamp(0.3 + Math.random() * 0.4 + (this.stressBias - 20) * 0.01, 0, 2);

    const stress = clamp(this.stressBias + noise() * 3.5, 0, 100);

    // Early-warning risk: derivative-based predictor.
    // Rising EDA + rising HR + falling HRV strongly indicates a
    // sympathetic surge before the user consciously feels stress.
    const last = this.history[this.history.length - 1];
    let risk = stress * 0.3;
    if (last) {
      const dEda = eda - last.eda;
      const dHr = hr - last.hr;
      const dHrv = hrv - last.hrv;
      risk = clamp(
        stress * 0.35 + Math.max(0, dEda) * 80 + Math.max(0, dHr) * 2.5 + Math.max(0, -dHrv) * 1.8,
        0,
        100
      );
    }

    const sample: SensorSample = { t, hr, hrv, eda, temp, spo2, motion, stress, risk };
    this.history.push(sample);
    if (this.history.length > 600) this.history.shift();
    return sample;
  }

  snapshot(): SensorSample[] {
    return [...this.history];
  }
}
