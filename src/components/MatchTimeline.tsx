import { useTranslation } from "react-i18next";
import type { MatchEvent } from "../types";
import { isFinishedStatus } from "../lib/match";
import { EventIcon } from "./EventIcon";
import { MinuteDot } from "./MinuteDot";

function parseMinute(m: string): number {
  const match = m.match(/(\d+)(?:\+(\d+))?/);
  if (!match) return 0;
  const base = parseInt(match[1], 10);
  const extra = match[2] ? parseInt(match[2], 10) : 0;
  return base * 100 + extra;
}

function formatScore(value?: number) {
  return typeof value === "number" ? String(value) : "-";
}

export function MatchTimeline({
  events,
  homeScore,
  awayScore,
  status,
  kickoffTime,
}: {
  events: MatchEvent[];
  homeScore?: number;
  awayScore?: number;
  status?: string;
  kickoffTime?: string;
}) {
  const { t } = useTranslation();
  const sorted = [...events].sort(
    (a, b) => parseMinute(b.minute) - parseMinute(a.minute)
  );
  const showFulltime = status ? isFinishedStatus(status) : false;
  const showHalftime = status ? status === "HT" : false;
  const scoreLine = `${formatScore(homeScore)} - ${formatScore(awayScore)}`;

  return (
    <div className="overflow-hidden rounded-xl bg-[#1B1C2A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
      <div className="border-b border-white/5 px-6 py-4">
        <h3 className="text-base font-semibold text-white">{t("timeline.events")}</h3>
      </div>

      <div className="relative px-6 py-6">
        {/* Central timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-px bg-white/10" />

        <div className="space-y-0">
          {showFulltime && (
            <div className="flex justify-center py-6">
              <span className="text-sm font-medium text-white/90">
                {t("timeline.fulltime")} {scoreLine}
              </span>
            </div>
          )}

          {sorted.map((event) => {
            const isHome = event.team === "home";
            const isGoal = event.type === "goal";
            const isRedCard = event.type === "card" && event.detail === "Sent Off";

            return (
              <div
                key={event.id}
                className={`flex items-start gap-4 py-4 ${
                  isHome ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`flex flex-1 items-start ${
                    isHome ? "justify-end pr-4" : "justify-start pl-4"
                  }`}
                >
                  <div className={`flex max-w-[220px] flex-col ${isHome ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-2">
                      <EventIcon type={event.type} detail={event.detail} />
                      <span className="text-sm font-medium text-white">{event.player}</span>
                    </div>
                    {event.assist && (
                      <span className={`mt-1 text-xs text-white/50 ${isHome ? "text-right" : "text-left"}`}>
                        {event.type === "sub" ? `${event.assist}` : `${t("timeline.assist")}: ${event.assist}`}
                      </span>
                    )}
                    {event.detail && (
                      <span className={`mt-1 text-xs text-white/50 ${isHome ? "text-right" : "text-left"}`}>
                        {event.detail}
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative z-10 flex shrink-0">
                  <MinuteDot
                    minute={event.minute}
                    isGoal={isGoal}
                    isRedCard={isRedCard}
                  />
                </div>

                <div className="flex-1" />
              </div>
            );
          })}

          {showHalftime && (
            <div className="flex justify-center py-6">
              <span className="text-sm font-medium text-white/90">
                {t("timeline.halftime")} {scoreLine}
              </span>
            </div>
          )}

          {kickoffTime && (
            <div className="flex justify-center py-6">
              <span className="text-sm font-medium text-white/90">
                {t("timeline.kickOff")} {kickoffTime}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
