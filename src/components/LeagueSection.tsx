import {
  ChevronRightIcon,
  ChevronRightIconSmall,
  MoreIcon,
  CheckIcon,
  RedCardIcon,
} from "../ui/Icons";
import { Icon } from "../ui/Icon";
import type { EventSummary } from "../types";
import { Link } from "react-router";

type MatchState = "LIVE" | "FT" | "UPCOMING";

function getMatchState(status: string): MatchState {
  if (status === "FT") return "FT";
  if (status === "HT" || status.includes("'")) return "LIVE";
  return "UPCOMING";
}

function TeamRow({
  name,
  badge,
  score,
  aggScore,
  note,
  redCard,
  showScores,
}: {
  name: string;
  badge?: string;
  score?: number;
  aggScore?: number;
  note?: string;
  redCard?: boolean;
  showScores: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-0.5">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2D2F44]">
        {badge ? (
            <img src={badge} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[#252740]" />
          )}
        </div>
        <span className="truncate text-sm font-medium text-white/95">{name}</span>
        {note ? (
          <span className="flex shrink-0 items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium text-[#24F0B5]">
            <CheckIcon />
            {note}
          </span>
        ) : null}
        {redCard ? (
          <span className="flex shrink-0">
            <RedCardIcon />
          </span>
        ) : null}
      </div>
      {showScores && (
        <div className="flex shrink-0 items-center gap-1">
          {typeof aggScore === "number" && (
            <span className="text-xs text-white/50">[{aggScore}]</span>
          )}
          <span className="text-sm font-semibold text-white/95">
            {typeof score === "number" ? score : "-"}
          </span>
        </div>
      )}
    </div>
  );
}

function MatchRow({ event }: { event: EventSummary }) {
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
        group relative flex items-stretch gap-4 overflow-hidden border-white/5 px-2 my-4 ml-4 last:border-b-0 transition-colors hover:bg-white/2
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

      <div className="flex flex-1 flex-col gap-3">
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

export function LeagueSection({
  title,
  events,
}: {
  title: string;
  events: EventSummary[];
}) {
  return (
    <section className="overflow-hidden rounded-xl bg-[#1B1C2A] shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-4">
        <h3 className="text-sm font-semibold text-white/95">{title}</h3>
        <Icon className="cursor-pointer text-white/60 hover:text-white">
          <ChevronRightIcon />
        </Icon>
      </div>
      <div>
        {events.map((event) => (
          <MatchRow key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
