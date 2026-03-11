import { CheckIcon, RedCardIcon } from "../ui/Icons";

export function TeamRow({
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
