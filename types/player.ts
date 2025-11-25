export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  minutesPlayed: number;
  rating: number;
}

export interface AIAnalysis {
  overallScore: number;
  strengths: string[];
  marketValue: number;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  age: number;
  nationality: string;
  photo: string;
  height?: number; // Height in cm
  weight?: number; // Weight in kg
  stats: PlayerStats;
  aiAnalysis: AIAnalysis;
}