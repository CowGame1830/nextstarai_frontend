export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  minutesPlayed: number;
  rating: number;
}

export interface PlayerAttributes {
  // Physical
  pace: number;
  acceleration: number;
  sprintSpeed: number;
  stamina: number;
  strength: number;
  agility: number;
  balance: number;
  jumping: number;
  
  // Technical
  shooting: number;
  finishing: number;
  longShots: number;
  volleys: number;
  penalties: number;
  
  // Passing
  passing: number;
  shortPassing: number;
  longPassing: number;
  crossing: number;
  freeKicks: number;
  curve: number;
  
  // Defensive
  defending: number;
  interceptions: number;
  tacklingStanding: number;
  tacklingSliding: number;
  heading: number;
  
  // Mental
  positioning: number;
  vision: number;
  composure: number;
  reactions: number;
  workRate: number;
  
  // Goalkeeping (for GK positions)
  gkDiving?: number;
  gkHandling?: number;
  gkKicking?: number;
  gkPositioning?: number;
  gkReflexes?: number;
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
  attributes: PlayerAttributes;
  aiAnalysis: AIAnalysis;
}