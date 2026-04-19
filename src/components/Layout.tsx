import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BreathingOverlay } from "./BreathingOverlay";
import { useStore } from "../lib/store";

export function Layout() {
  const tick = useStore((s) => s.tick);

  useEffect(() => {
    const i = setInterval(() => tick(), 1000);
    return () => clearInterval(i);
  }, [tick]);

  return (
    <div className="min-h-screen flex text-slate-100">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <div className="p-4 lg:p-8 flex-1">
          <Outlet />
        </div>
      </main>
      <BreathingOverlay />
    </div>
  );
}
