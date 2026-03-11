import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  SoccerBallIcon,
  ChevronDownIcon,
  UKFlagIcon,
  SpanishFlagIcon,
} from "../ui/Icons";
import { Icon } from "../ui/Icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const navKeys = [
  "live",
  "matches",
  "standings",
  "teams",
  "comparison",
  "statistics",
  "venues",
] as const;

const flagComponents: Record<string, ReactNode> = {
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
            <button
              type="button"
              className="rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
            >
              {t("nav.live")}
            </button>
            <button
              type="button"
              className="rounded-md px-3 py-2 text-sm font-medium text-white bg-[#6B4EFF]/80 hover:bg-[#6B4EFF] cursor-pointer"
            >
              {t("nav.matches")}
            </button>
            {navKeys.slice(2).map((key) => (
              <button
                key={key}
                type="button"
                className="rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                {t(`nav.${key}`)}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={t("topBar.quickActions", "Quick actions")}
            className="rounded-md p-1 text-white/80 hover:text-white"
          >
            <Icon>
              <SoccerBallIcon />
            </Icon>
          </button>
          <button
            type="button"
            className="hidden md:flex items-center gap-2 rounded-lg bg-[#252740]/80 px-3 py-2 text-sm text-white/90 hover:bg-[#252740] cursor-pointer"
          >
            {t("topBar.season")}
            <ChevronDownIcon />
          </button>

          {/* Language selector */}
          <Select
            value={i18n.language}
            onValueChange={(val) => {
              if (val) i18n.changeLanguage(val);
            }}
          >
            <SelectTrigger className="w-[85px] h-9 bg-[#252740]/80 border-0 hover:bg-[#252740] text-white/90 rounded-lg cursor-pointer">
              <div className="flex flex-1 items-center gap-2">
                <span className="shrink-0">
                  {flagComponents[i18n.language] ?? flagComponents.en}
                </span>
                <span className="uppercase text-xs font-medium"><SelectValue /></span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#1B1C2A] border-white/10 text-white shadow-2xl z-[60] min-w-[120px]">
              <SelectItem value="en" className="focus:bg-[#6B4EFF]/20 focus:text-white text-white cursor-pointer px-3 py-2.5">
                <div className="flex items-center gap-3 w-full">
                  <span className="shrink-0"><UKFlagIcon /></span>
                  <span>{t("language.en")}</span>
                </div>
              </SelectItem>
              <SelectItem value="es" className="focus:bg-[#6B4EFF]/20 focus:text-white cursor-pointer px-3 py-2.5">
                <div className="flex items-center gap-3 w-full">
                  <span className="shrink-0"><SpanishFlagIcon /></span>
                  <span>{t("language.es")}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
