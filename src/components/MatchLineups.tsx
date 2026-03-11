import { useTranslation } from "react-i18next";
import type { TeamLineup } from "../types";
import { TeamLineupColumn } from "./TeamLineupColumn";

export function MatchLineups({
  homeName,
  awayName,
  lineups,
}: {
  homeName: string;
  awayName: string;
  lineups?: { home: TeamLineup; away: TeamLineup };
}) {
  const { t } = useTranslation();

  if (!lineups) {
    return (
      <div className="overflow-hidden rounded-xl bg-[#1B1C2A] px-6 py-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
        <h3 className="text-base font-semibold text-white">{t("match.lineups")}</h3>
        <p className="mt-4 text-sm text-white/60">
          {t("match.noLineups", "Lineups are not available for this match yet.")}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-[#1B1C2A] shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex flex-col md:flex-row gap-8 px-6 py-6 border border-white/5">
      <TeamLineupColumn lineup={lineups.home} teamName={homeName} isHome={true} />
      
      {/* Divider for desktop */}
      <div className="hidden w-px bg-white/5 md:block" />
      
      {/* Divider for mobile */}
      <div className="h-px w-full bg-white/5 md:hidden" />

      <TeamLineupColumn lineup={lineups.away} teamName={awayName} isHome={false} />
    </div>
  );
}
