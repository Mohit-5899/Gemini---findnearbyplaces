import { GoogleGenAI } from "@google/genai";
import type { Coordinates, GeminiResponse, GroundingChunk } from '../types';

export async function fetchLocalRecommendations(
  query: string,
  location: Coordinates
): Promise<GeminiResponse> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
        },
      },
    });

    const text = response.text;
    const groundingChunks: GroundingChunk[] | null =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || null;

    return { text, groundingChunks };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch recommendations from the AI model. Please check your connection or API key.");
  }
}
