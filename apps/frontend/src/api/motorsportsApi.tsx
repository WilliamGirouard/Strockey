import {
  MotorsportsMatchDto,
  MotorsportsStreamDto,
} from "../types/motorsports";

const API_BASE = "http://localhost:3001/v1";

export async function getMotorsportsMatches(): Promise<MotorsportsMatchDto[]> {
  const response = await fetch(`${API_BASE}/motorsports/matches`);
  return response.json();
}

export async function getMotorsportsStreams(
  matchId: string,
): Promise<MotorsportsStreamDto[]> {
  const response = await fetch(
    `${API_BASE}/motorsports/matches/${matchId}/streams`,
  );
  return response.json();
}
