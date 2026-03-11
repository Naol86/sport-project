import { useTranslation } from "react-i18next";
import type { TeamLineup } from "../types";
import { PlayerRow } from "./PlayerRow";

export function TeamLineupColumn({
  lineup,
  teamName,
  isHome,
}: {
  lineup: TeamLineup;
  teamName: string;
  isHome: boolean;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Starting XI */}
      <div>
        <div className={`mb-4 flex items-center gap-2 ${isHome ? "justify-start" : "justify-start md:justify-end flex-row-reverse"}`}>
          <h4 className="text-sm font-bold text-white">{teamName}</h4>
          <span className="rounded bg-white/5 px-2 py-0.5 text-xs text-white/60">
            {lineup.formation}
          </span>
        </div>
        <div className="flex flex-col divide-y divide-white/5 rounded-xl bg-white/5 px-4 py-2">
          {lineup.startingXI.map((player) => (
            <PlayerRow key={player.id} player={player} isHome={isHome} />
          ))}
        </div>
      </div>

      {/* Substitutes */}
      <div>
        <h4 className={`mb-4 text-xs font-semibold uppercase tracking-wider text-white/50 ${isHome ? "text-left" : "text-left md:text-right"}`}>
          {t("match.substitutes", "Substitutes")}
        </h4>
        <div className="flex flex-col divide-y divide-white/5 rounded-xl bg-white/5 px-4 py-2">
          {lineup.substitutes.map((player) => (
            <PlayerRow key={player.id} player={player} isHome={isHome} />
          ))}
        </div>
      </div>

      {/* Coach */}
      <div>
        <h4 className={`mb-2 text-xs font-semibold uppercase tracking-wider text-white/50 ${isHome ? "text-left" : "text-left md:text-right"}`}>
          {t("match.coach", "Coach")}
        </h4>
        <div className={`flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 ${isHome ? "justify-start" : "justify-start md:justify-end"}`}>
          <span className="text-sm font-medium text-white">{lineup.coach}</span>
        </div>
      </div>
    </div>
  );
}
