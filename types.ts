export interface MapChunk {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  maps: MapChunk;
}

export interface GeminiResponse {
  text: string;
  groundingChunks: GroundingChunk[] | null;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
