export class HockeyStreamDto {
  id: string;            // Unique stream ID
  streamNo: number;      // Stream index/number
  language: string;      // e.g., "English", "Spanish"
  hd: boolean;           // HD or not
  embedUrl: string;      // URL to embed the stream
  source: string;        // Source identifier (e.g., "alpha", "bravo")
}