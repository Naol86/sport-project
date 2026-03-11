export function MinuteDot({
  minute,
  isGoal,
  isRedCard,
}: {
  minute: string;
  isGoal?: boolean;
  isRedCard?: boolean;
}) {
  const bg = isRedCard
    ? "bg-[#E53935]"
    : isGoal
      ? "bg-[#22C55E]"
      : "bg-[#2D2F44]";
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${bg}`}
    >
      {minute}
    </div>
  );
}
