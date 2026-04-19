import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { History } from "./pages/History";
import { Alerts } from "./pages/Alerts";
import { Breathing } from "./pages/Breathing";
import { Device } from "./pages/Device";
import { Settings } from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/breathing" element={<Breathing />} />
          <Route path="/device" element={<Device />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
