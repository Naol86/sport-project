import { ClockIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ComingSoon({ featureName }: { featureName: string }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden rounded-xl bg-[#1B1C2A] px-6 py-16 text-center shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
      <div className="mb-4 rounded-full bg-white/5 p-4 text-[#24F0B5]">
        <ClockIcon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-white">
        {featureName} {t("common.comingSoon", "Coming Soon")}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-white/60">
        {t(
          "common.comingSoonDesc",
          "We're working hard to bring you this feature. Check back later for updates!"
        )}
      </p>
    </div>
  );
}
