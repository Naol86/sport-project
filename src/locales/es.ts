export default {
  // TopBar nav
  nav: {
    live: "En Vivo",
    matches: "Partidos",
    standings: "Clasificación",
    teams: "Equipos",
    comparison: "Comparación",
    statistics: "Estadísticas",
    venues: "Estadios",
  },
  topBar: {
    premierLeague: "Premier League",
    season: "2024/25",
  },
  // Filter tabs
  filter: {
    all: "Todos",
    live: "En Vivo",
    favorites: "Favoritos",
  },
  // Dashboard
  dashboard: {
    matches: "Partidos",
    today: "Hoy",
  },
  // Match details
  match: {
    details: "Detalles",
    odds: "Cuotas",
    lineups: "Alineaciones",
    events: "Eventos",
    stats: "Estadísticas",
    standings: "Clasificación",
    notFound: "Partido no encontrado",
    notFoundDesc: "No existe un partido con ID \"{{id}}\"",
    backToDashboard: "Volver al inicio",
    noEvents: "Aún no hay eventos. El partido comienza a las {{time}}.",
  },
  // Match timeline
  timeline: {
    events: "Eventos",
    fulltime: "Final",
    halftime: "Medio Tiempo",
    kickOff: "Inicio",
    assist: "Asistencia",
  },
  // Language selector
  language: {
    en: "English",
    es: "Español",
  },
} as const;
