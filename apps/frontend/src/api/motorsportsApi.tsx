import {
  MotorsportsMatchDto,
  MotorsportsStreamDto,
} from "../types/motorsports";

// Dynamically use the current host so it works across all LAN devices
const API_BASE = `http://${window.location.hostname}:3001`;

export async function getMotorsportsMatches(): Promise<MotorsportsMatchDto[]> {
  const response = await fetch(`${API_BASE}/v1/motorsports/matches`);
  return response.json();
}

export async function getMotorsportsStreams(
  matchId: string,
): Promise<MotorsportsStreamDto[]> {
  const response = await fetch(
    `${API_BASE}/v1/motorsports/matches/${matchId}/streams`,
  );
  return response.json();
}
