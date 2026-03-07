export interface MotorsportsMatchDto {
  id: string;
  title: string;
  date: number;
  popular: boolean;
  poster?: string;
  homeTeam?: { name: string; badge: string };
  awayTeam?: { name: string; badge: string };
  primarySource?: { source: string; id: string };
}

export interface MotorsportsStreamDto {
  id: string;
  streamNo: number;
  language: string;
  hd: boolean;
  embedUrl: string;
  source: string;
}