import { HockeyMatchDto, HockeyStreamDto } from "../types/hockey";

// Dynamically use the current host so it works across all LAN devices
const API_BASE = `http://${window.location.hostname}:3001`;

export async function getHockeyMatches(): Promise<HockeyMatchDto[]> {
  const response = await fetch(`${API_BASE}/v1/hockey/matches`);
  return response.json();
}

export async function getHockeyStreams(
  matchId: string,
): Promise<HockeyStreamDto[]> {
  const response = await fetch(`${API_BASE}/v1/hockey/matches/${matchId}/streams`);
  return response.json();
}
