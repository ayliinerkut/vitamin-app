// vitamin.interface.ts — TypeScript interface for a Vitamin object
// Defines the shape of vitamin data returned by the API.

export interface Vitamin {
  name: string;       // e.g. "Vitamin A"
  benefits: string;   // What it does for the body
  foods: string[];    // Foods that are rich in this vitamin
  deficiency: string; // What happens if you lack this vitamin
}

export interface RecommendResponse {
  input: string;      // The original user query
  vitamins: Vitamin[];
}