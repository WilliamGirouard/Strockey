import { HockeyMatchDto, HockeyStreamDto } from "../types/hockey";



export async function getHockeyMatches(): Promise<HockeyMatchDto[]> {
  const response = await fetch(`/v1/hockey/matches`);
  return response.json();
}

export async function getHockeyStreams(
  matchId: string,
): Promise<HockeyStreamDto[]> {
  const response = await fetch(`/v1/hockey/matches/${matchId}/streams`);
  return response.json();
}
