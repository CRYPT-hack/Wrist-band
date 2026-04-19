import { NavLink } from "react-router-dom";
import {
  Activity,
  Bell,
  Wind,
  Watch,
  History,
  Settings as SettingsIcon,
  Sparkles,
} from "lucide-react";
import { cn } from "../lib/utils";

const links = [
  { to: "/", label: "Dashboard", icon: Activity, end: true },
  { to: "/history", label: "History", icon: History },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/breathing", label: "Breathing", icon: Wind },
  { to: "/device", label: "Device", icon: Watch },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-2 w-64 shrink-0 p-4 border-r border-white/5 min-h-screen sticky top-0">
      <div className="flex items-center gap-2 px-2 py-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-violet to-accent-cyan grid place-items-center shadow-glow">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="font-display font-bold text-lg leading-none">PulseGuard</div>
          <div className="text-[11px] text-slate-400 tracking-wider uppercase mt-1">
            Predictive stress OS
          </div>
        </div>
      </div>

      <nav className="mt-4 flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                isActive
                  ? "bg-gradient-to-r from-white/10 to-white/[0.04] text-white border border-white/10 shadow-glow"
                  : "text-slate-300 hover:bg-white/5"
              )
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="card !p-4">
          <div className="text-xs text-slate-400">Clinician link</div>
          <div className="text-sm font-semibold mt-1">Dr. Mehta — Psych</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Reports auto-shared weekly
          </div>
          <button className="btn-ghost w-full text-xs mt-3">Open portal</button>
        </div>
      </div>
    </aside>
  );
}
