import { Link } from "react-router";
import { ChevronRightIconSmall, MoreIcon } from "../ui/Icons";
import { Icon } from "../ui/Icon";
import type { EventSummary } from "../types";
import { TeamRow } from "./TeamRow";
import { isFinishedStatus, isLiveStatus } from "../lib/match";

type MatchState = "LIVE" | "FT" | "UPCOMING";

export function getMatchState(status: string): MatchState {
  if (isFinishedStatus(status)) return "FT";
  if (isLiveStatus(status)) return "LIVE";
  return "UPCOMING";
}

export function MatchRow({ event }: { event: EventSummary }) {
  const state = getMatchState(event.status);
  const isLive = state === "LIVE";
  const isFinished = state === "FT";
  const isUpcoming = state === "UPCOMING";
  const showScores = isLive || isFinished;

  const hasRowIndicator = true;
  const barColor = isLive ? "bg-[#28F2B6]" : isFinished ? "bg-[#FF6A5A]" : "bg-white/25";
  const rowGradient = isLive
    ? "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[7.5%] after:content-[''] after:bg-gradient-to-r after:from-[#28F2B6]/5 after:to-transparent after:pointer-events-none"
    : isFinished
      ? "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[7.5%] after:content-[''] after:bg-gradient-to-r after:from-[#FF6A5A]/5 after:to-transparent after:pointer-events-none"
      : "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[7.5%] after:content-[''] after:bg-gradient-to-r after:from-white/5 after:to-transparent after:pointer-events-none";
  const statusColor = isLive
    ? "text-[#28F2B6]"
    : isFinished
      ? "text-white"
      : "text-white/80";

  return (
    <Link
      to={`/match/${event.id}`}
      className={`
        group relative flex items-stretch gap-4 overflow-hidden px-2 my-2 ml-4 last:border-b-0 transition-colors hover:bg-white/5
        ${hasRowIndicator ? rowGradient : ""}
      `}
    >
      {hasRowIndicator && (
        <div className={`absolute left-0 top-0 bottom-0 w-0.5 shrink-0 ${barColor}`} />
      )}
      <div
        className={`
          relative flex w-14 shrink-0 flex-col items-center justify-center text-[11px] font-semibold
          ${statusColor}
        `}
      >
        <span>{event.status}</span>
        {isLive && (
          <span className="mt-1 h-0.5 w-3 rounded-full bg-[#28F2B6]" />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1 p-2">
        <TeamRow
          name={event.home.name}
          badge={event.home.badge}
          score={event.home.score}
          aggScore={event.home.aggScore}
          note={event.note === "AGG" ? "AGG" : undefined}
          redCard={event.home.redCard}
          showScores={showScores}
        />
        <TeamRow
          name={event.away.name}
          badge={event.away.badge}
          score={event.away.score}
          aggScore={event.away.aggScore}
          note={event.note === "PEN" ? "PEN" : undefined}
          redCard={event.away.redCard}
          showScores={showScores}
        />
      </div>


      <div className="flex shrink-0 items-center gap-2 text-white/60">
        <Icon className="opacity-70 group-hover:opacity-100">
          <MoreIcon />
        </Icon>
        {!isUpcoming && (
          <Icon className="opacity-70 group-hover:opacity-100">
            <ChevronRightIconSmall />
          </Icon>
        )}
      </div>
    </Link>
  );
}
