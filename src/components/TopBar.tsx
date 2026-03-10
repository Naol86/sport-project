import { useTranslation } from "react-i18next";
import {
  GlobeIcon,
  SoccerBallIcon,
  ChevronDownIcon,
  UKFlagIcon,
  SpanishFlagIcon,
} from "../ui/Icons";
import { Icon } from "../ui/Icon";

const navKeys = [
  "live",
  "matches",
  "standings",
  "teams",
  "comparison",
  "statistics",
  "venues",
] as const;

const flagComponents: Record<string, React.ReactNode> = {
  en: <UKFlagIcon />,
  es: <SpanishFlagIcon />,
};

export function TopBar() {
  const { t, i18n } = useTranslation();

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
              {t("nav.live")}
            </button>
            <button className="rounded-md px-3 py-2 text-sm font-medium text-white bg-[#6B4EFF]/80 hover:bg-[#6B4EFF]">
              {t("nav.matches")}
            </button>
            {navKeys.slice(2).map((key) => (
              <button
                key={key}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5"
              >
                {t(`nav.${key}`)}
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
            {t("topBar.premierLeague")}
            <ChevronDownIcon />
          </button>
          <button className="hidden md:flex items-center gap-2 rounded-lg bg-[#252740]/80 px-3 py-2 text-sm text-white/90 hover:bg-[#252740]">
            {t("topBar.season")}
            <ChevronDownIcon />
          </button>

          {/* Language selector */}
          <div className="relative flex items-center gap-2 rounded-lg bg-[#252740]/80 px-2.5 py-2">
            <span className="pointer-events-none shrink-0">
              {flagComponents[i18n.language] ?? flagComponents.en}
            </span>
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="cursor-pointer appearance-none bg-transparent text-xs font-medium uppercase text-white/90 outline-none pr-4"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
            <span className="pointer-events-none absolute right-2">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
