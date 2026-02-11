import { useMemo } from "react";
import { FilterTabs } from "../components/FilterTabs";
import { LeagueSection } from "../components/LeagueSection";
import { mockEvents } from "../data/mock";
import type { EventSummary } from "../types";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

function groupByLeague(events: EventSummary[]) {
  return events.reduce<Record<string, EventSummary[]>>((acc, event) => {
    acc[event.league] = acc[event.league] || [];
    acc[event.league].push(event);
    return acc;
  }, {});
}

export function Dashboard() {
  const data = mockEvents;
  const grouped = useMemo(() => groupByLeague(data), [data]);

  return (
    <div className="min-h-screen bg-[#14151E]">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:px-6">
        <h1 className="text-2xl font-bold text-white">Matches</h1>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-[#1B1C2A] px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          <button className="flex items-center justify-center text-white/80 hover:text-white transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="flex items-center gap-2 text-sm font-medium text-white/90">
            <CalendarDays className="h-5 w-5 text-white/70" />
            Today
          </span>
          <button className="flex items-center justify-center text-white/80 hover:text-white transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <FilterTabs />
        </div>

        <div className="mt-8 space-y-6">
          {Object.entries(grouped).map(([league, leagueEvents]) => (
            <LeagueSection key={league} title={league} events={leagueEvents} />
          ))}
        </div>
      </div>
    </div>
  );
}
