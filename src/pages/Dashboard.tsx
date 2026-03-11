import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FilterTabs } from "../components/FilterTabs";
import { LeagueSection } from "../components/LeagueSection";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { mockEvents } from "../data/mock";
import type { EventSummary } from "../types";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

type FilterType = "all" | "live" | "fav";

function isLive(status: string) {
  return status === "HT" || /^\d+['+]?$/.test(status);
}

function groupByLeague(events: EventSummary[]) {
  return events.reduce<Record<string, EventSummary[]>>((acc, event) => {
    acc[event.league] = acc[event.league] || [];
    acc[event.league].push(event);
    return acc;
  }, {});
}

export function Dashboard() {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handlePrevDay = () => setSelectedDate((d) => new Date(d.getTime() - 86400000));
  const handleNextDay = () => setSelectedDate((d) => new Date(d.getTime() + 86400000));

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const dateDisplay = isToday
    ? t("dashboard.today")
    : selectedDate.toLocaleDateString(i18n.language === "es" ? "es-ES" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  const counts = useMemo(() => {
    return {
      all: mockEvents.length,
      live: mockEvents.filter((e) => isLive(e.status)).length,
      fav: mockEvents.filter((e) => e.favorite).length,
    };
  }, []);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "live") {
      return mockEvents.filter((e) => isLive(e.status));
    }
    if (activeFilter === "fav") {
      return mockEvents.filter((e) => e.favorite);
    }
    return mockEvents;
  }, [activeFilter]);

  const grouped = useMemo(() => groupByLeague(filteredEvents), [filteredEvents]);

  return (
    <div className="min-h-screen bg-[#14151E]">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:px-6">
        <h1 className="text-2xl font-bold text-white">{t("dashboard.matches")}</h1>

        <div className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-[#1B1C2A] px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          <button
            onClick={handlePrevDay}
            className="flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger>
              <button className="flex items-center gap-2 text-sm font-medium text-white/90 cursor-pointer hover:text-white transition-colors">
                <CalendarDays className="h-5 w-5 text-white/70" />
                <span>{dateDisplay}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-white/10 bg-[#1B1C2A] text-white shadow-2xl z-[60]" align="center">
              <Calendar
                mode="single"
                defaultMonth={selectedDate}
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setIsCalendarOpen(false);
                  }
                }}
                className="bg-red-700 text-white rounded-xl"
              />
            </PopoverContent>
          </Popover>

          <button
            onClick={handleNextDay}
            className="flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6">
          <FilterTabs 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
            counts={counts} 
          />
        </div>

        <div className="mt-8 space-y-6">
          {Object.keys(grouped).length === 0 ? (
            <div className="text-center text-white/50 py-10">
              No matches found for this filter.
            </div>
          ) : (
            Object.entries(grouped).map(([league, leagueEvents]) => (
              <LeagueSection key={league} title={league} events={leagueEvents} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
