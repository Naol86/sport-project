import {
  GlobeIcon,
  SoccerBallIcon,
  ChevronDownIcon,
  UKFlagIcon,
} from "../ui/Icons";
import { Icon } from "../ui/Icon";

const navItems = [
  "Live",
  "Matches",
  "Standings",
  "Teams",
  "Comparison",
  "Statistics",
  "Venues",
];

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-linear-to-r from-[#5B10FF] via-[#7413FF] to-[#5B10FF]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-10">
          <img
            src="/assets/logo.png"
            alt="statscore"
            className="h-10 w-auto"
          />

          <nav className="hidden lg:flex items-center gap-1">
            <button className="rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5">
              Live
            </button>
            <button className="rounded-md px-3 py-2 text-sm font-medium text-white bg-[#6B4EFF]/80 hover:bg-[#6B4EFF]">
              Matches
            </button>
            {navItems.slice(2).map((item) => (
              <button
                key={item}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Icon className="cursor-pointer text-white/80 hover:text-white">
            <GlobeIcon />
          </Icon>
          <Icon className="cursor-pointer text-white/80 hover:text-white">
            <SoccerBallIcon />
          </Icon>
          <button className="hidden md:flex items-center gap-2 rounded-lg bg-[#252740]/80 px-3 py-2 text-sm text-white/90 hover:bg-[#252740]">
            Premier League
            <ChevronDownIcon />
          </button>
          <button className="hidden md:flex items-center gap-2 rounded-lg bg-[#252740]/80 px-3 py-2 text-sm text-white/90 hover:bg-[#252740]">
            2024/25
            <ChevronDownIcon />
          </button>
          <Icon className="cursor-pointer">
            <UKFlagIcon />
          </Icon>
        </div>
      </div>
    </header>
  );
}
