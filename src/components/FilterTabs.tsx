import { HeartIcon, LiveIcon } from "../ui/Icons";
import { Icon } from "../ui/Icon";

const tabs = [
  { key: "all", label: "All", count: 6, active: true },
  { key: "live", label: "Live", count: 4, icon: <LiveIcon /> },
  { key: "fav", label: "Favorites", count: 2, icon: <HeartIcon /> },
];

export function FilterTabs() {
  return (
    <div className="flex gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={
            tab.active
              ? "flex items-center gap-2 rounded-full bg-[#24F0B5] px-4 py-2.5 text-sm font-semibold text-[#0E1D18]"
              : "flex items-center gap-2 rounded-full bg-[#202334] px-4 py-2.5 text-sm font-medium text-white/90"
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
