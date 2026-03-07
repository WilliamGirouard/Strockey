
export class HockeyMatchDto {
    id: string;               // Match ID
    title: string;            // e.g., "Team A vs Team B"
    date: number;             // Unix timestamp
    popular: boolean;         // Marked as popular
    poster?: string;          // Optional poster image

    homeTeam?: {
        name: string;
        badge: string;
    };

    awayTeam?: {
        name: string;
        badge: string;
    };

    primarySource?: {
        source: string;
        id: string;
    };
}