import { ChevronRightIcon } from "../ui/Icons";
import { Icon } from "../ui/Icon";
import type { EventSummary } from "../types";
import { MatchRow } from "./MatchRow";

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
        <h3 className="text-sm font-semibold text-white/95 cursor-pointer">{title}</h3>
        <button
          type="button"
          aria-label={`View ${title}`}
          className="text-white/60 hover:text-white"
        >
          <Icon>
            <ChevronRightIcon />
          </Icon>
        </button>
      </div>
      <div>
        {events.map((event) => (
          <div key={event.id} className="border-b border-white/5" >
            <MatchRow event={event} />
          </div>
        ))}
      </div>
    </section>
  );
}
