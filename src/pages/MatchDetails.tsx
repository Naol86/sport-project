import { useState } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { MatchTimeline } from "../components/MatchTimeline";
import { MatchLineups } from "../components/MatchLineups";
import { ComingSoon } from "../components/ComingSoon";
import { getMatchById } from "../data/mock";
import { BackIcon } from "../ui/Icons";

const TAB_KEYS = ["details", "odds", "lineups", "events", "stats", "standings"] as const;
type TabKey = typeof TAB_KEYS[number];

export function MatchDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const data = getMatchById(id);
  const [activeTab, setActiveTab] = useState<TabKey>("events");

  if (!data) {
    return (
      <div className="min-h-screen bg-[#14151E]">
        <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:px-6">
          <div className="rounded-xl bg-[#1F2132] px-6 py-12 text-center">
            <p className="text-lg text-white/90">{t("match.notFound")}</p>
            <p className="mt-2 text-sm text-white/50">{t("match.notFoundDesc", { id })}</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <BackIcon />
              <span>{t("match.backToDashboard")}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasEvents = data.events.length > 0;

  const renderTabContent = () => {
    switch (activeTab) {
      case "events":
        return hasEvents ? (
          <MatchTimeline events={data.events} />
        ) : (
          <div className="overflow-hidden rounded-xl bg-[#1B1C2A] px-6 py-12 text-center shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <h3 className="text-base font-semibold text-white">{t("match.events")}</h3>
            <p className="mt-4 text-sm text-white/60">
              {t("match.noEvents", { time: data.time })}
            </p>
          </div>
        );
      case "lineups":
        return (
          <MatchLineups
            homeName={data.home.name}
            awayName={data.away.name}
            lineups={data.lineups}
          />
        );
      case "details":
      case "odds":
      case "stats":
      case "standings":
        return <ComingSoon featureName={t(`match.${activeTab}`)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#14151E]">
      <div className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:px-6">
        <div className="rounded-xl bg-[#1F2132] px-6 py-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
          <Link
            to="/"
            className="mb-6 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <BackIcon />
            <span>{data.league}</span>
          </Link>

          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative">
                <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center overflow-hidden rounded-full bg-[#2D2F44]">
                  {data.home.badge ? (
                    <img
                      src={data.home.badge}
                      alt={data.home.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded bg-[#FACC15] text-xs font-bold text-[#1a1a1a]">
                  {data.home.score ?? 0}
                </span>
              </div>
              <span className="text-base font-semibold text-white">{data.home.name}</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-white/50">{data.date}</span>
              <span className="text-2xl font-bold text-white">
                {data.home.score ?? 0} - {data.away.score ?? 0}
              </span>
              <span className="rounded bg-[#E53935] px-3 py-1 text-xs font-semibold text-white">
                {data.status}
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 md:gap-4">
              <span className="text-base font-semibold text-white">{data.away.name}</span>
              <div className="relative">
                <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center overflow-hidden rounded-full bg-[#2D2F44]">
                  {data.away.badge ? (
                    <img
                      src={data.away.badge}
                      alt={data.away.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <span className="absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded bg-[#FACC15] text-xs font-bold text-[#1a1a1a]">
                  {data.away.score ?? 0}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-1 border-t border-white/5 pt-6 overflow-auto pb-2">
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  key === activeTab
                    ? "bg-[#2A283B] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {t(`match.${key}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
