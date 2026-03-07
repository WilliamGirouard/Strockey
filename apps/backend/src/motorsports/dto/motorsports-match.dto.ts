export class MotorsportsMatchDto {
  id: string;
  title: string;
  date: number;
  popular: boolean;
  poster?: string;
  homeTeam?: { name: string; badge: string };
  awayTeam?: { name: string; badge: string };
  primarySource?: { source: string; id: string };
}