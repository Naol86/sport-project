import { useTranslation } from "react-i18next";
import { HeartIcon, LiveIcon } from "../ui/Icons";
import { Icon } from "../ui/Icon";

export function FilterTabs() {
  const { t } = useTranslation();

  const tabs = [
    { key: "all", label: t("filter.all"), count: 6, active: true },
    { key: "live", label: t("filter.live"), count: 4, icon: <LiveIcon /> },
    {
      key: "fav",
      label: t("filter.favorites"),
      count: 2,
      icon: <HeartIcon />,
    },
  ];

  return (
    <div className="flex gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={
            tab.active
              ? "flex items-center gap-2 rounded-full bg-[#24F0B5] px-4 py-2.5 text-sm font-semibold text-[#0E1D18] cursor-pointer"
              : "flex items-center gap-2 rounded-full bg-[#202334] px-4 py-2.5 text-sm font-medium text-white/90 cursor-pointer"
          }
        >
          {tab.icon ? (
            <Icon
              className={
                tab.key === "live"
                  ? "animate-live-pulse"
                  : tab.key === "fav"
                    ? "text-[#E53935]"
                    : tab.active
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
              tab.active
                ? "font-bold text-[#0E1D18]"
                : "font-medium text-white/90"
            }
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
