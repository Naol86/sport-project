export type TeamSide = "home" | "away";

export type EventSummary = {
  id: string;
  league: string;
  date: string;
  time: string;
  status: string;
  minute?: string;
  home: {
    name: string;
    badge?: string;
    score?: number;
    aggScore?: number;
    redCard?: boolean;
  };
  away: {
    name: string;
    badge?: string;
    score?: number;
    aggScore?: number;
    redCard?: boolean;
  };
  note?: string;
};

export type MatchEvent = {
  id: string;
  minute: string;
  team: TeamSide;
  type: "goal" | "card" | "sub" | "corner" | "note";
  player: string;
  assist?: string;
  detail?: string;
};

export type MatchDetail = {
  id: string;
  league: string;
  date: string;
  time: string;
  status: string;
  home: {
    name: string;
    badge?: string;
    score?: number;
  };
  away: {
    name: string;
    badge?: string;
    score?: number;
  };
  events: MatchEvent[];
};
