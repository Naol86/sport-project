import type { MatchEvent } from "../types";
import {
  GoalArrowIcon,
  SubIcon,
  CornerIcon,
  YellowCardIcon,
  RedCardIcon,
  InjuryIcon,
} from "../ui/Icons";

function parseMinute(m: string): number {
  const match = m.match(/(\d+)(?:\+(\d+))?/);
  if (!match) return 0;
  const base = parseInt(match[1], 10);
  const extra = match[2] ? parseInt(match[2], 10) : 0;
  return base * 100 + extra;
}

function EventIcon({
  type,
  detail,
}: {
  type: MatchEvent["type"];
  detail?: string;
}) {
  if (type === "goal") {
    return <GoalArrowIcon />;
  }
  if (type === "sub") {
    return <SubIcon />;
  }
  if (type === "corner") {
    return <CornerIcon />;
  }
  if (type === "card") {
    return detail === "Sent Off" ? <RedCardIcon /> : <YellowCardIcon />;
  }
  if (type === "note") {
    return <InjuryIcon />;
  }
  return <span className="h-2 w-2 rounded-full bg-white/40" />;
}

function MinuteDot({
  minute,
  isGoal,
  isRedCard,
}: {
  minute: string;
  isGoal?: boolean;
  isRedCard?: boolean;
}) {
  const bg = isRedCard
    ? "bg-[#E53935]"
    : isGoal
      ? "bg-[#22C55E]"
      : "bg-[#2D2F44]";
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${bg}`}
    >
      {minute}
    </div>
  );
}

export function MatchTimeline({ events }: { events: MatchEvent[] }) {
  const sorted = [...events].sort(
    (a, b) => parseMinute(b.minute) - parseMinute(a.minute)
  );

  return (
    <div className="overflow-hidden rounded-xl bg-[#1B1C2A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
      <div className="border-b border-white/5 px-6 py-4">
        <h3 className="text-base font-semibold text-white">Events</h3>
      </div>

      <div className="relative px-6 py-6">
        {/* Central timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-px bg-white/10" />

        <div className="space-y-0">
          {/* Fulltime marker */}
          <div className="flex justify-center py-6">
            <span className="text-sm font-medium text-white/90">Fulltime 2 - 1</span>
          </div>

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
                        {event.type === "sub" ? `↑ ${event.assist}` : `Assist: ${event.assist}`}
                      </span>
                    )}
                    {event.detail && event.type !== "card" && (
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

          {/* Halftime marker */}
          <div className="flex justify-center py-6">
            <span className="text-sm font-medium text-white/90">Halftime 1 - 0</span>
          </div>

          {/* Kick Off marker */}
          <div className="flex justify-center py-6">
            <span className="text-sm font-medium text-white/90">Kick Off -13:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
