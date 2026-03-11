import type { Player } from "../types";

export function PlayerRow({ player, isHome }: { player: Player; isHome: boolean }) {
  const content = (
    <>
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#2D2F44] text-[11px] font-bold text-white">
        {player.number}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">{player.name}</span>
        <span className="text-[10px] text-white/50">{player.position}</span>
      </div>
    </>
  );

  return (
    <div className={`flex items-center gap-3 py-2 ${isHome ? "justify-start" : "justify-start md:justify-end flex-row-reverse"}`}>
      {content}
    </div>
  );
}
