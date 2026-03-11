export default {
  // TopBar nav
  nav: {
    live: "Live",
    matches: "Matches",
    standings: "Standings",
    teams: "Teams",
    comparison: "Comparison",
    statistics: "Statistics",
    venues: "Venues",
  },
  topBar: {
    premierLeague: "Premier League",
    season: "2024/25",
    quickActions: "Quick actions",
  },
  // Filter tabs
  filter: {
    all: "All",
    live: "Live",
    favorites: "Favorites",
  },
  // Dashboard
  dashboard: {
    matches: "Matches",
    today: "Today",
    prevDay: "Previous day",
    nextDay: "Next day",
  },
  // Match details
  match: {
    details: "Details",
    odds: "Odds",
    lineups: "Lineups",
    events: "Events",
    stats: "Stats",
    standings: "Standings",
    notFound: "Match not found",
    notFoundDesc: "No match exists with ID \"{{id}}\"",
    backToDashboard: "Back to dashboard",
    noEvents: "No events yet. Match will start at {{time}}.",
  },
  // Match timeline
  timeline: {
    events: "Events",
    fulltime: "Fulltime",
    halftime: "Halftime",
    kickOff: "Kick Off",
    assist: "Assist",
  },
  // Language selector
  language: {
    en: "English",
    es: "Español",
  },
} as const;
