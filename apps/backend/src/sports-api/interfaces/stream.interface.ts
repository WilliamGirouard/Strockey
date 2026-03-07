export interface Stream {
    id: string;        // Unique identifier for the stream
    streamNo: number;  // Stream number/index
    language: string;  // Stream language (e.g., "English", "Spanish")
    hd: boolean;       // Whether the stream is in HD quality
    embedUrl: string;  // URL that can be used to embed the stream
    source: string;    // Source identifier (e.g., "alpha", "bravo")
}