import { HockeyMatchDto, HockeyStreamDto } from "../types/hockey";

const API_BASE = "http://localhost:3001/v1";

export async function getHockeyMatches(): Promise<HockeyMatchDto[]> {
  const response = await fetch(`${API_BASE}/hockey/matches`);
  return response.json();
}

export async function getHockeyStreams(
  matchId: string,
): Promise<HockeyStreamDto[]> {
  const response = await fetch(`${API_BASE}/hockey/matches/${matchId}/streams`);
  return response.json();
}
