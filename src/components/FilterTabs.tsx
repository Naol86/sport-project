import { useTranslation } from "react-i18next";
import { HeartIcon, LiveIcon } from "../ui/Icons";
import { Icon } from "../ui/Icon";

type FilterType = "all" | "live" | "fav";

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (value: FilterType) => void;
  counts: Record<FilterType, number>;
}

export function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  const { t } = useTranslation();

  const tabs: { key: FilterType; label: string; icon?: React.ReactNode }[] = [
    { key: "all", label: t("filter.all") },
    { key: "live", label: t("filter.live"), icon: <LiveIcon /> },
    { key: "fav", label: t("filter.favorites"), icon: <HeartIcon /> },
  ];

  return (
    <div className="flex gap-3">
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onFilterChange(tab.key)}
            className={
              isActive
                ? "flex items-center gap-2 rounded-full bg-[#24F0B5] px-4 py-2.5 text-sm font-semibold text-[#0E1D18] cursor-pointer transition-colors"
                : "flex items-center gap-2 rounded-full bg-[#202334] px-4 py-2.5 text-sm font-medium text-white/90 cursor-pointer hover:bg-[#202334]/80 hover:text-white transition-colors"
            }
          >
            {tab.icon ? (
              <Icon
                className={
                  tab.key === "live"
                    ? `animate-live-pulse ${isActive ? "text-[#0E1D18]" : ""}`
                    : tab.key === "fav" && !isActive
                      ? "text-[#E53935]"
                      : isActive
                        ? "text-[#0E1D18]"
                        : "text-white/90"
                }
              >
                {tab.icon}
              </Icon>
            ) : null}
            <span>{tab.label}</span>
            <span
              className={
                isActive
                  ? "ml-1 rounded-full bg-black/10 px-2 py-0.5 text-xs font-bold text-[#0E1D18]"
                  : "ml-1 rounded-full bg-black/20 px-2 py-0.5 text-xs font-medium text-white/90"
              }
            >
              {counts[tab.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
