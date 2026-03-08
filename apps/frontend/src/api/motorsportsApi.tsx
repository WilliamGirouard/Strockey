import {
  MotorsportsMatchDto,
  MotorsportsStreamDto,
} from "../types/motorsports";



export async function getMotorsportsMatches(): Promise<MotorsportsMatchDto[]> {
  const response = await fetch(`/v1/motorsports/matches`);
  return response.json();
}

export async function getMotorsportsStreams(
  matchId: string,
): Promise<MotorsportsStreamDto[]> {
  const response = await fetch(
    `/v1/motorsports/matches/${matchId}/streams`,
  );
  return response.json();
}
