import { useStore } from "../lib/store";
import { AlertTriangle, CheckCircle2, Trash2 } from "lucide-react";
import { formatTime } from "../lib/utils";

export function Alerts() {
  const { alerts, ack, clearAlerts } = useStore();

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <div className="metric-label">Event log</div>
            <div className="font-display text-2xl font-semibold">Alerts &amp; interventions</div>
            <div className="text-sm text-slate-400 mt-1">
              Early warnings fire before conscious stress — that's the point.
            </div>
          </div>
          <button className="btn-ghost text-xs" onClick={clearAlerts}>
            <Trash2 className="w-3.5 h-3.5" /> Clear all
          </button>
        </div>

        <ul className="mt-5 divide-y divide-white/5">
          {alerts.length === 0 && (
            <li className="py-10 text-center text-slate-400">
              No alerts yet. You're cruising — or the day hasn't started.
            </li>
          )}
          {alerts.map((a) => (
            <li key={a.id} className="py-4 flex items-start gap-3">
              <div
                className="mt-0.5 w-9 h-9 rounded-xl grid place-items-center border"
                style={{
                  borderColor: a.level === "critical" ? "rgba(251,113,133,0.4)" : "rgba(251,191,36,0.4)",
                  background: a.level === "critical" ? "rgba(251,113,133,0.1)" : "rgba(251,191,36,0.08)",
                }}
              >
                {a.acknowledged ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                ) : (
                  <AlertTriangle className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-sm">{a.title}</div>
                  <span className="chip text-[10px]">stress {Math.round(a.stress)}</span>
                  <span className="chip text-[10px]">risk {Math.round(a.risk)}</span>
                  <span className="ml-auto text-xs text-slate-400">{formatTime(new Date(a.t))}</span>
                </div>
                <div className="text-sm text-slate-300 mt-1">{a.detail}</div>
                {!a.acknowledged && (
                  <button className="btn-ghost text-[11px] mt-2 !py-1" onClick={() => ack(a.id)}>
                    Acknowledge
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
