import type { MatchEvent } from "../types";
import {
  GoalArrowIcon,
  SubIcon,
  CornerIcon,
  YellowCardIcon,
  RedCardIcon,
  InjuryIcon,
} from "../ui/Icons";

export function EventIcon({
  type,
  detail,
}: {
  type: MatchEvent["type"];
  detail?: string;
}) {
  if (type === "goal") {
    return <GoalArrowIcon />;
  }
  if (type === "sub") {
    return <SubIcon />;
  }
  if (type === "corner") {
    return <CornerIcon />;
  }
  if (type === "card") {
    return detail === "Sent Off" ? <RedCardIcon /> : <YellowCardIcon />;
  }
  if (type === "note") {
    return <InjuryIcon />;
  }
  return <span className="h-2 w-2 rounded-full bg-white/40" />;
}
