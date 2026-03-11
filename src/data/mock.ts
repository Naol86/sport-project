import type { EventSummary, MatchDetail, MatchEvent, TeamLineup } from "../types";

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
  // UEFA Champions League
  {
    id: "1001",
    league: "UEFA Champions League",
    date: "2024-08-01",
    time: "20:00",
    status: "FT",
    home: { name: "Arsenal", badge: "/assets/arsenal.png", score: 2, aggScore: 2 },
    away: { name: "Valencia", badge: "/assets/valencia.png", score: 1, aggScore: 0 },
    note: "AGG",
    favorite: true,
  },
  {
    id: "1002",
    league: "UEFA Champions League",
    date: "2024-08-01",
    time: "20:00",
    status: "FT",
    home: { name: "Real Madrid", badge: "/assets/real-madrid.png", score: 1, aggScore: 3, redCard: true },
    away: { name: "Leicester City", badge: "/assets/leicester-city.png", score: 3, aggScore: 1 },
    note: "PEN",
  },
  {
    id: "1003",
    league: "UEFA Champions League",
    date: "2024-08-01",
    time: "20:00",
    status: "63'",
    minute: "63",
    home: { name: "Bayern Munich", badge: "/assets/placeholder.png", score: 2 },
    away: { name: "PSG", badge: "/assets/placeholder.png", score: 2 },
    favorite: true,
  },
  {
    id: "1004",
    league: "UEFA Champions League",
    date: "2024-08-01",
    time: "20:00",
    status: "HT",
    minute: "45",
    home: { name: "Inter Milan", badge: "/assets/placeholder.png", score: 1 },
    away: { name: "Benfica", badge: "/assets/placeholder.png", score: 0 },
  },

  // English Premier League
  {
    id: "2001",
    league: "English Premier League",
    date: "2024-08-01",
    time: "15:00",
    status: "FT",
    home: { name: "Manchester City", badge: "/assets/manchester-city.png", score: 3 },
    away: { name: "Burnley", badge: "/assets/placeholder.png", score: 0 },
  },
  {
    id: "2002",
    league: "English Premier League",
    date: "2024-08-01",
    time: "17:30",
    status: "78'",
    minute: "78",
    home: { name: "Arsenal", badge: "/assets/arsenal.png", score: 2 },
    away: { name: "Chelsea", badge: "/assets/chelsea.png", score: 1 },
    favorite: true,
  },
  {
    id: "2003",
    league: "English Premier League",
    date: "2024-08-01",
    time: "17:30",
    status: "HT",
    minute: "45",
    home: { name: "Newcastle United", badge: "/assets/newcastle-united.png", score: 0 },
    away: { name: "Liverpool", badge: "/assets/liverpool.png", score: 1 },
  },
  {
    id: "2004",
    league: "English Premier League",
    date: "2024-08-01",
    time: "20:00",
    status: "20:00",
    home: { name: "Southampton", badge: "/assets/placeholder.png" },
    away: { name: "Leicester City", badge: "/assets/leicester-city.png" },
  },
  {
    id: "2005",
    league: "English Premier League",
    date: "2024-08-01",
    time: "20:00",
    status: "20:00",
    home: { name: "Everton", badge: "/assets/placeholder.png" },
    away: { name: "Aston Villa", badge: "/assets/placeholder.png" },
  },

  // La Liga
  {
    id: "3001",
    league: "La Liga",
    date: "2024-08-01",
    time: "14:00",
    status: "FT",
    home: { name: "Barcelona", badge: "/assets/placeholder.png", score: 3 },
    away: { name: "Sevilla", badge: "/assets/placeholder.png", score: 1 },
  },
  {
    id: "3002",
    league: "La Liga",
    date: "2024-08-01",
    time: "16:15",
    status: "89'",
    minute: "89",
    home: { name: "Atletico Madrid", badge: "/assets/placeholder.png", score: 0 },
    away: { name: "Real Sociedad", badge: "/assets/placeholder.png", score: 0 },
    favorite: true,
  },
  {
    id: "3003",
    league: "La Liga",
    date: "2024-08-01",
    time: "21:00",
    status: "21:00",
    home: { name: "Real Madrid", badge: "/assets/real-madrid.png" },
    away: { name: "Villarreal", badge: "/assets/placeholder.png" },
    favorite: true,
  },
  {
    id: "3004",
    league: "La Liga",
    date: "2024-08-01",
    time: "21:00",
    status: "21:00",
    home: { name: "Valencia", badge: "/assets/valencia.png" },
    away: { name: "Athletic Bilbao", badge: "/assets/placeholder.png" },
  },

  // Serie A
  {
    id: "4001",
    league: "Serie A",
    date: "2024-08-01",
    time: "12:30",
    status: "FT",
    home: { name: "Juventus", badge: "/assets/placeholder.png", score: 1 },
    away: { name: "AC Milan", badge: "/assets/placeholder.png", score: 1 },
  },
  {
    id: "4002",
    league: "Serie A",
    date: "2024-08-01",
    time: "15:00",
    status: "33'",
    minute: "33",
    home: { name: "Napoli", badge: "/assets/placeholder.png", score: 2 },
    away: { name: "Roma", badge: "/assets/placeholder.png", score: 0 },
  },
  {
    id: "4003",
    league: "Serie A",
    date: "2024-08-01",
    time: "20:45",
    status: "20:45",
    home: { name: "Inter Milan", badge: "/assets/placeholder.png" },
    away: { name: "Lazio", badge: "/assets/placeholder.png" },
    favorite: true,
  },
  {
    id: "4004",
    league: "Serie A",
    date: "2024-08-01",
    time: "20:45",
    status: "20:45",
    home: { name: "Atalanta", badge: "/assets/placeholder.png" },
    away: { name: "Fiorentina", badge: "/assets/placeholder.png" },
  },

  // Bundesliga
  {
    id: "5001",
    league: "Bundesliga",
    date: "2024-08-01",
    time: "15:30",
    status: "FT",
    home: { name: "Bayern Munich", badge: "/assets/placeholder.png", score: 4 },
    away: { name: "Borussia Dortmund", badge: "/assets/placeholder.png", score: 2 },
  },
  {
    id: "5002",
    league: "Bundesliga",
    date: "2024-08-01",
    time: "18:30",
    status: "12'",
    minute: "12",
    home: { name: "RB Leipzig", badge: "/assets/placeholder.png", score: 0 },
    away: { name: "Bayer Leverkusen", badge: "/assets/placeholder.png", score: 1 },
  },
  {
    id: "5003",
    league: "Bundesliga",
    date: "2024-08-01",
    time: "18:30",
    status: "18:30",
    home: { name: "Eintracht Frankfurt", badge: "/assets/placeholder.png" },
    away: { name: "Wolfsburg", badge: "/assets/placeholder.png" },
  },
];


const mockLineupsByMatch: Record<string, { home: TeamLineup; away: TeamLineup }> = {
  "1001": {
    home: {
      formation: "4-3-3",
      coach: "Mikel Arteta",
      startingXI: [
        { id: "p1", name: "Raya", number: 22, position: "GK" },
        { id: "p2", name: "White", number: 4, position: "DEF" },
        { id: "p3", name: "Saliba", number: 2, position: "DEF" },
        { id: "p4", name: "Gabriel", number: 6, position: "DEF" },
        { id: "p5", name: "Zinchenko", number: 35, position: "DEF" },
        { id: "p6", name: "Odegaard", number: 8, position: "MID" },
        { id: "p7", name: "Rice", number: 41, position: "MID" },
        { id: "p8", name: "Havertz", number: 29, position: "MID" },
        { id: "p9", name: "Saka", number: 7, position: "FWD" },
        { id: "p10", name: "Jesus", number: 9, position: "FWD" },
        { id: "p11", name: "Martinelli", number: 11, position: "FWD" },
      ],
      substitutes: [
        { id: "s1", name: "Ramsdale", number: 1, position: "GK" },
        { id: "s2", name: "Kiwior", number: 15, position: "DEF" },
        { id: "s3", name: "Partey", number: 5, position: "MID" },
        { id: "s4", name: "Trossard", number: 19, position: "FWD" },
      ],
    },
    away: {
      formation: "4-4-2",
      coach: "Rubén Baraja",
      startingXI: [
        { id: "p12", name: "Mamardashvili", number: 25, position: "GK" },
        { id: "p13", name: "Foulquier", number: 20, position: "DEF" },
        { id: "p14", name: "Diakhaby", number: 4, position: "DEF" },
        { id: "p15", name: "Mosquera", number: 3, position: "DEF" },
        { id: "p16", name: "Gaya", number: 14, position: "DEF" },
        { id: "p17", name: "Perez", number: 8, position: "MID" },
        { id: "p18", name: "Pepelu", number: 18, position: "MID" },
        { id: "p19", name: "Guerra", number: 15, position: "MID" },
        { id: "p20", name: "Lopez", number: 16, position: "MID" },
        { id: "p21", name: "Duro", number: 9, position: "FWD" },
        { id: "p22", name: "Yaremchuk", number: 17, position: "FWD" },
      ],
      substitutes: [
        { id: "s5", name: "Domenech", number: 1, position: "GK" },
        { id: "s6", name: "Tárrega", number: 27, position: "DEF" },
        { id: "s7", name: "Amallah", number: 19, position: "MID" },
        { id: "s8", name: "Marí", number: 22, position: "FWD" },
      ],
    },
  },
};

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
    lineups: mockLineupsByMatch[event.id],
  };
  return detail;
}
