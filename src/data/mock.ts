import type { EventSummary, MatchDetail, MatchEvent } from "../types";

/** Generic mock events for live/finished matches - varies by match */
const mockEventsByMatch: Record<string, MatchEvent[]> = {
  "1001": [
    { id: "e1", minute: "82'", team: "home", type: "goal", player: "Saka" },
    { id: "e2", minute: "71'", team: "away", type: "sub", player: "Duro", assist: "Lopez" },
    { id: "e3", minute: "58'", team: "home", type: "goal", player: "Odegaard" },
    { id: "e4", minute: "45'", team: "away", type: "sub", player: "Perez", assist: "Yaremchuk" },
    { id: "e5", minute: "34'", team: "away", type: "goal", player: "Yaremchuk" },
    { id: "e6", minute: "22'", team: "home", type: "card", player: "Saliba" },
    { id: "e7", minute: "8'", team: "home", type: "corner", player: "1st corner" },
  ],
  "1002": [
    { id: "e1", minute: "120'", team: "away", type: "goal", player: "Penalty" },
    { id: "e2", minute: "90+3'", team: "away", type: "card", player: "Fofana", detail: "Sent Off" },
    { id: "e3", minute: "78'", team: "home", type: "goal", player: "Vinicius Jr" },
    { id: "e4", minute: "65'", team: "away", type: "sub", player: "Ndidi", assist: "Winks" },
    { id: "e5", minute: "52'", team: "away", type: "goal", player: "Vardy" },
    { id: "e6", minute: "41'", team: "away", type: "card", player: "Faes" },
    { id: "e7", minute: "23'", team: "away", type: "goal", player: "Mavididi" },
  ],
  "1003": [
    { id: "e1", minute: "63'", team: "home", type: "goal", player: "Saka" },
    { id: "e2", minute: "58'", team: "away", type: "sub", player: "Alvarez", assist: "Haaland" },
    { id: "e3", minute: "55'", team: "home", type: "goal", player: "Odegaard" },
    { id: "e4", minute: "45'", team: "home", type: "sub", player: "Partey", assist: "Rice" },
    { id: "e5", minute: "34'", team: "away", type: "goal", player: "Foden" },
    { id: "e6", minute: "28'", team: "home", type: "card", player: "Saliba" },
    { id: "e7", minute: "12'", team: "home", type: "goal", player: "Martinelli" },
  ],
  "1004": [
    { id: "e1", minute: "45'", team: "away", type: "sub", player: "Mac Allister", assist: "Jones" },
    { id: "e2", minute: "38'", team: "away", type: "goal", player: "Salah" },
    { id: "e3", minute: "29'", team: "home", type: "card", player: "Guimaraes" },
    { id: "e4", minute: "18'", team: "home", type: "corner", player: "2nd corner" },
    { id: "e5", minute: "7'", team: "away", type: "corner", player: "1st corner" },
  ],
};

function isLiveOrFinished(status: string): boolean {
  return status === "FT" || status === "Finished" || status === "HT" || /^\d+['+]?$/.test(status);
}

export const mockEvents: EventSummary[] = [
  {
    id: "1001",
    league: "UEFA Champions League",
    date: "2024-08-01",
    time: "20:00",
    status: "FT",
    home: {
      name: "Arsenal",
      badge: "/assets/arsenal.png",
      score: 2,
      aggScore: 2,
    },
    away: {
      name: "Valencia",
      badge: "/assets/valencia.png",
      score: 1,
      aggScore: 0,
    },
    note: "AGG",
  },
  {
    id: "1002",
    league: "UEFA Champions League",
    date: "2024-08-01",
    time: "20:00",
    status: "FT",
    home: {
      name: "Real Madrid",
      badge: "/assets/real-madrid.png",
      score: 1,
      aggScore: 3,
      redCard: true,
    },
    away: {
      name: "Leicester City",
      badge: "/assets/leicester-city.png",
      score: 3,
      aggScore: 1,
    },
    note: "PEN",
  },
  {
    id: "1003",
    league: "English Premier League",
    date: "2024-08-01",
    time: "20:00",
    status: "63'",
    minute: "63",
    home: {
      name: "Arsenal",
      badge: "/assets/arsenal.png",
      score: 4,
    },
    away: {
      name: "Manchester City",
      badge: "/assets/manchester-city.png",
      score: 1,
    },
  },
  {
    id: "1004",
    league: "English Premier League",
    date: "2024-08-01",
    time: "20:00",
    status: "HT",
    minute: "45",
    home: {
      name: "Newcastle United",
      badge: "/assets/newcastle-united.png",
      score: 0,
    },
    away: {
      name: "Liverpool",
      badge: "/assets/liverpool.png",
      score: 1,
    },
  },
  {
    id: "1005",
    league: "English Premier League",
    date: "2024-08-01",
    time: "23:00",
    status: "23:00",
    home: {
      name: "Burnley",
      badge: "/assets/burnley.png",
    },
    away: {
      name: "Manchester City",
      badge: "/assets/manchester-city.png",
    },
  },
  {
    id: "1006",
    league: "English Premier League",
    date: "2024-08-01",
    time: "23:00",
    status: "23:00",
    home: {
      name: "Chelsea",
      badge: "/assets/chelsea.png",
    },
    away: {
      name: "Southampton",
      badge: "/assets/southampton.png",
    },
  },
];

/** Get match by ID from params; returns null if not found */
export function getMatchById(id: string | undefined): MatchDetail | null {
  if (!id) return null;
  const event = mockEvents.find((e) => e.id === id);
  if (!event) return null;

  const statusLabel = event.status === "FT" ? "Finished" : event.status;
  const detail: MatchDetail = {
    id: event.id,
    league: event.league,
    date: event.date,
    time: event.time,
    status: statusLabel,
    home: {
      name: event.home.name,
      badge: event.home.badge,
      score: event.home.score,
    },
    away: {
      name: event.away.name,
      badge: event.away.badge,
      score: event.away.score,
    },
    events: isLiveOrFinished(event.status)
      ? mockEventsByMatch[event.id] ?? []
      : [],
  };
  return detail;
}
