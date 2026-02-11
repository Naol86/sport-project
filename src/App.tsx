import { Routes, Route } from "react-router";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./pages/Dashboard";
import { MatchDetails } from "./pages/MatchDetails";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-[#14151E] text-white">
      <TopBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/match/:id" element={<MatchDetails />} />
      </Routes>
    </div>
  );
}
