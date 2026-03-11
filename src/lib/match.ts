const LIVE_MINUTE_REGEX = /^\d+(?:\+\d+)?'?$/;

export function isLiveStatus(status: string): boolean {
  return status === "HT" || LIVE_MINUTE_REGEX.test(status);
}

export function isFinishedStatus(status: string): boolean {
  return status === "FT" || status === "Finished";
}

export function isUpcomingStatus(status: string): boolean {
  return !isLiveStatus(status) && !isFinishedStatus(status);
}
