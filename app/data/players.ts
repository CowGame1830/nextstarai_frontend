import type { Player, PlayerAttributes } from "../../types/player";

// Utility function to generate realistic attributes based on position and overall rating
const generateAttributes = (position: string, overallRating: number): PlayerAttributes => {
  const baseVariation = Math.floor(overallRating * 0.1); // 10% variation
  const getRandomStat = (base: number, variation: number = baseVariation) => 
    Math.max(30, Math.min(99, base + Math.floor(Math.random() * variation * 2) - variation));

  const isGK = position === "Goalkeeper";
  const isDefender = position === "Defender";
  const isMidfielder = position === "Midfielder";
  const isForward = position === "Forward";

  const physicalBase = isGK ? overallRating - 20 : overallRating - 5;
  const technicalBase = isForward ? overallRating + 5 : overallRating - 10;
  const passingBase = isMidfielder ? overallRating + 5 : overallRating - 15;
  const defensiveBase = isDefender ? overallRating + 5 : isGK ? overallRating - 30 : overallRating - 25;
  const mentalBase = overallRating - 5;

  return {
    // Physical
    pace: getRandomStat(isGK ? 45 : physicalBase),
    acceleration: getRandomStat(isGK ? 50 : physicalBase + 2),
    sprintSpeed: getRandomStat(isGK ? 40 : physicalBase - 2),
    stamina: getRandomStat(physicalBase + 5),
    strength: getRandomStat(isGK || isDefender ? physicalBase + 10 : physicalBase),
    agility: getRandomStat(isGK ? physicalBase - 5 : physicalBase + 5),
    balance: getRandomStat(physicalBase),
    jumping: getRandomStat(isDefender ? physicalBase + 10 : physicalBase),
    
    // Technical
    shooting: getRandomStat(isForward ? technicalBase + 10 : isGK ? 15 : technicalBase - 5),
    finishing: getRandomStat(isForward ? technicalBase + 8 : isGK ? 20 : technicalBase - 8),
    longShots: getRandomStat(isForward || isMidfielder ? technicalBase : isGK ? 25 : technicalBase - 10),
    volleys: getRandomStat(isForward ? technicalBase + 2 : isGK ? 30 : technicalBase - 5),
    penalties: getRandomStat(isForward ? technicalBase + 5 : technicalBase - 5),
    
    // Passing
    passing: getRandomStat(isMidfielder || isGK ? passingBase + 15 : passingBase + 5),
    shortPassing: getRandomStat(isMidfielder || isGK ? passingBase + 18 : passingBase + 8),
    longPassing: getRandomStat(isGK ? passingBase + 20 : isMidfielder ? passingBase + 12 : passingBase),
    crossing: getRandomStat(isMidfielder || isForward ? passingBase + 5 : passingBase - 10),
    freeKicks: getRandomStat(passingBase - 5),
    curve: getRandomStat(passingBase),
    
    // Defensive
    defending: getRandomStat(isDefender ? defensiveBase + 25 : isGK ? 40 : defensiveBase),
    interceptions: getRandomStat(isDefender || isMidfielder ? defensiveBase + 20 : defensiveBase - 5),
    tacklingStanding: getRandomStat(isDefender ? defensiveBase + 25 : isGK ? 35 : defensiveBase),
    tacklingSliding: getRandomStat(isDefender ? defensiveBase + 20 : isGK ? 30 : defensiveBase - 5),
    heading: getRandomStat(isDefender || isForward ? defensiveBase + 20 : defensiveBase + 5),
    
    // Mental
    positioning: getRandomStat(mentalBase + 8),
    vision: getRandomStat(isMidfielder || isGK ? mentalBase + 10 : mentalBase),
    composure: getRandomStat(mentalBase + 5),
    reactions: getRandomStat(isGK ? mentalBase + 15 : mentalBase + 3),
    workRate: getRandomStat(mentalBase),
    
    // Goalkeeping (only for GK)
    ...(isGK && {
      gkDiving: getRandomStat(overallRating + 8),
      gkHandling: getRandomStat(overallRating + 5),
      gkKicking: getRandomStat(overallRating),
      gkPositioning: getRandomStat(overallRating + 7),
      gkReflexes: getRandomStat(overallRating + 6),
    }),
  };
};

export const players: Player[] = [
  {
    id: "1",
    name: "Alisson Becker",
    team: "Liverpool",
    position: "Goalkeeper",
    age: 33,
    nationality: "Brazil",
    photo: "/api/placeholder/150/150",
    height: 193, // 6'4"
    weight: 91, // 201 lbs
    stats: {
      appearances: 6,
      goals: 0,
      assists: 0,
      minutesPlayed: 540,
      rating: 8.0,
    },
    attributes: {
      // Physical
      pace: 45,
      acceleration: 50,
      sprintSpeed: 40,
      stamina: 80,
      strength: 85,
      agility: 75,
      balance: 80,
      jumping: 88,
      
      // Technical
      shooting: 15,
      finishing: 20,
      longShots: 25,
      volleys: 30,
      penalties: 40,
      
      // Passing
      passing: 85,
      shortPassing: 88,
      longPassing: 90,
      crossing: 70,
      freeKicks: 60,
      curve: 65,
      
      // Defensive
      defending: 40,
      interceptions: 45,
      tacklingStanding: 35,
      tacklingSliding: 30,
      heading: 75,
      
      // Mental
      positioning: 85,
      vision: 82,
      composure: 92,
      reactions: 90,
      workRate: 85,
      
      // Goalkeeping
      gkDiving: 92,
      gkHandling: 88,
      gkKicking: 85,
      gkPositioning: 90,
      gkReflexes: 89,
    },
    aiAnalysis: {
      overallScore: 80,
      strengths: ["Shot Stopping", "Distribution", "Positioning"],
      marketValue: 35000000,
    },
  },
  {
    id: "25",
    name: "Giorgi Mamardashvili",
    team: "Liverpool",
    position: "Goalkeeper",
    age: 25,
    nationality: "Georgia",
    photo: "/api/placeholder/150/150",
    height: 198, // 6'6"
    weight: 89, // 196 lbs
    stats: {
      appearances: 3,
      goals: 0,
      assists: 0,
      minutesPlayed: 270,
      rating: 8.2,
    },
    attributes: generateAttributes("Goalkeeper", 82),
    aiAnalysis: {
      overallScore: 82,
      strengths: ["Shot Stopping", "Distribution", "Height"],
      marketValue: 40000000,
    },
  },
  {
    id: "4",
    name: "Virgil van Dijk",
    team: "Liverpool",
    position: "Defender",
    age: 34,
    nationality: "Netherlands",
    photo: "/api/placeholder/150/150",
    height: 196, // 6'5"
    weight: 92, // 203 lbs
    stats: {
      appearances: 9,
      goals: 0,
      assists: 0,
      minutesPlayed: 810,
      rating: 8.3,
    },
    attributes: {
      // Physical
      pace: 65,
      acceleration: 68,
      sprintSpeed: 62,
      stamina: 88,
      strength: 95,
      agility: 70,
      balance: 85,
      jumping: 93,
      
      // Technical
      shooting: 60,
      finishing: 65,
      longShots: 70,
      volleys: 68,
      penalties: 75,
      
      // Passing
      passing: 88,
      shortPassing: 90,
      longPassing: 92,
      crossing: 75,
      freeKicks: 65,
      curve: 70,
      
      // Defensive
      defending: 95,
      interceptions: 92,
      tacklingStanding: 93,
      tacklingSliding: 88,
      heading: 96,
      
      // Mental
      positioning: 94,
      vision: 85,
      composure: 96,
      reactions: 90,
      workRate: 90,
    },
    aiAnalysis: {
      overallScore: 83,
      strengths: ["Defending", "Aerial", "Leadership"],
      marketValue: 35000000,
    },
  },
  {
    id: "5",
    name: "Ibrahima Konaté",
    team: "Liverpool",
    position: "Defender",
    age: 26,
    nationality: "France",
    photo: "/api/placeholder/150/150",
    height: 193, // 6'4"
    weight: 94, // 207 lbs
    stats: {
      appearances: 9,
      goals: 0,
      assists: 0,
      minutesPlayed: 810,
      rating: 8.1,
    },
    attributes: generateAttributes("Defender", 81),
    aiAnalysis: {
      overallScore: 81,
      strengths: ["Aerial", "Pace", "Defending"],
      marketValue: 60000000,
    },
  },
  {
    id: "6",
    name: "Milos Kerkez",
    team: "Liverpool",
    position: "Defender",
    age: 21,
    nationality: "Hungary",
    photo: "/api/placeholder/150/150",
    height: 180, // 5'11"
    weight: 71, // 157 lbs
    stats: {
      appearances: 9,
      goals: 1,
      assists: 0,
      minutesPlayed: 810,
      rating: 7.8,
    },
    attributes: generateAttributes("Defender", 78),
    aiAnalysis: {
      overallScore: 78,
      strengths: ["Pace", "Crossing", "Youth"],
      marketValue: 30000000,
    },
  },
  {
    id: "12",
    name: "Conor Bradley",
    team: "Liverpool",
    position: "Defender",
    age: 22,
    nationality: "Northern Ireland",
    photo: "/api/placeholder/150/150",
    height: 180, // 5'11"
    weight: 63, // 139 lbs
    stats: {
      appearances: 7,
      goals: 0,
      assists: 0,
      minutesPlayed: 630, // Updated for 7 appearances + 2 sub appearances
      rating: 7.4,
    },
    attributes: generateAttributes("Defender", 74),
    aiAnalysis: {
      overallScore: 74,
      strengths: ["Pace", "Crossing", "Potential"],
      marketValue: 25000000,
    },
  },
  {
    id: "26",
    name: "Andrew Robertson",
    team: "Liverpool",
    position: "Defender",
    age: 31,
    nationality: "Scotland",
    photo: "/api/placeholder/150/150",
    height: 178, // 5'10"
    weight: 63, // 139 lbs
    stats: {
      appearances: 4,
      goals: 0,
      assists: 0,
      minutesPlayed: 360, // Updated for 4 appearances + 4 sub appearances
      rating: 7.6,
    },
    attributes: generateAttributes("Defender", 76),
    aiAnalysis: {
      overallScore: 76,
      strengths: ["Crossing", "Stamina", "Experience"],
      marketValue: 20000000,
    },
  },
  {
    id: "7",
    name: "Florian Wirtz",
    team: "Liverpool",
    position: "Midfielder",
    age: 22,
    nationality: "Germany",
    photo: "/api/placeholder/150/150",
    height: 175, // 5'9"
    weight: 69, // 152 lbs
    stats: {
      appearances: 9,
      goals: 0,
      assists: 0,
      minutesPlayed: 900, // 9 appearances + 3 sub appearances
      rating: 8.5,
    },
    attributes: generateAttributes("Midfielder", 85),
    aiAnalysis: {
      overallScore: 85,
      strengths: ["Creativity", "Passing", "Vision"],
      marketValue: 95000000,
    },
  },
  {
    id: "38",
    name: "Ryan Gravenberch",
    team: "Liverpool",
    position: "Midfielder",
    age: 23,
    nationality: "Netherlands",
    photo: "/api/placeholder/150/150",
    height: 191, // 6'3"
    weight: 83, // 183 lbs
    stats: {
      appearances: 7,
      goals: 2,
      assists: 1,
      minutesPlayed: 630,
      rating: 7.8,
    },
    attributes: generateAttributes("Midfielder", 78),
    aiAnalysis: {
      overallScore: 78,
      strengths: ["Passing", "Dribbling", "Youth"],
      marketValue: 50000000,
    },
  },
  {
    id: "10",
    name: "Alexis Mac Allister",
    team: "Liverpool",
    position: "Midfielder",
    age: 26,
    nationality: "Argentina",
    photo: "/api/placeholder/150/150",
    height: 175, // 5'9"
    weight: 68, // 150 lbs
    stats: {
      appearances: 8,
      goals: 0,
      assists: 1,
      minutesPlayed: 810, // 8 appearances + 1 sub
      rating: 8.0,
    },
    attributes: generateAttributes("Midfielder", 80),
    aiAnalysis: {
      overallScore: 80,
      strengths: ["Passing", "Work Rate", "Versatility"],
      marketValue: 70000000,
    },
  },
  {
    id: "17",
    name: "Curtis Jones",
    team: "Liverpool",
    position: "Midfielder",
    age: 24,
    nationality: "England",
    photo: "/api/placeholder/150/150",
    height: 185, // 6'1"
    weight: 78, // 172 lbs
    stats: {
      appearances: 8,
      goals: 0,
      assists: 0,
      minutesPlayed: 800, // 8 appearances + 6 sub appearances
      rating: 7.6,
    },
    attributes: generateAttributes("Midfielder", 76),
    aiAnalysis: {
      overallScore: 76,
      strengths: ["Dribbling", "Creativity", "Youth"],
      marketValue: 40000000,
    },
  },
  {
    id: "8",
    name: "Dominik Szoboszlai",
    team: "Liverpool",
    position: "Midfielder",
    age: 25,
    nationality: "Hungary",
    photo: "/api/placeholder/150/150",
    height: 185, // 6'1"
    weight: 73, // 161 lbs
    stats: {
      appearances: 9,
      goals: 1,
      assists: 1,
      minutesPlayed: 810,
      rating: 7.7,
    },
    attributes: generateAttributes("Midfielder", 77),
    aiAnalysis: {
      overallScore: 77,
      strengths: ["Shooting", "Passing", "Set Pieces"],
      marketValue: 60000000,
    },
  },
  {
    id: "9",
    name: "Alexander Isak",
    team: "Liverpool",
    position: "Forward",
    age: 26,
    nationality: "Sweden",
    photo: "/api/placeholder/150/150",
    height: 193, // 6'4"
    weight: 77, // 170 lbs
    stats: {
      appearances: 4,
      goals: 0,
      assists: 1,
      minutesPlayed: 405, // 4 appearances + 1 sub
      rating: 8.1,
    },
    attributes: generateAttributes("Forward", 81),
    aiAnalysis: {
      overallScore: 81,
      strengths: ["Finishing", "Pace", "Clinical"],
      marketValue: 85000000,
    },
  },
  {
    id: "11",
    name: "Mohamed Salah",
    team: "Liverpool",
    position: "Forward",
    age: 33,
    nationality: "Egypt",
    photo: "/api/placeholder/150/150",
    height: 175, // 5'9"
    weight: 71, // 157 lbs
    stats: {
      appearances: 9,
      goals: 3,
      assists: 2,
      minutesPlayed: 810,
      rating: 8.4,
    },
    attributes: {
      // Physical
      pace: 90,
      acceleration: 93,
      sprintSpeed: 87,
      stamina: 85,
      strength: 75,
      agility: 88,
      balance: 82,
      jumping: 78,
      
      // Technical
      shooting: 88,
      finishing: 90,
      longShots: 85,
      volleys: 82,
      penalties: 80,
      
      // Passing
      passing: 82,
      shortPassing: 85,
      longPassing: 78,
      crossing: 80,
      freeKicks: 75,
      curve: 85,
      
      // Defensive
      defending: 45,
      interceptions: 50,
      tacklingStanding: 35,
      tacklingSliding: 30,
      heading: 70,
      
      // Mental
      positioning: 92,
      vision: 85,
      composure: 88,
      reactions: 90,
      workRate: 88,
    },
    aiAnalysis: {
      overallScore: 84,
      strengths: ["Pace", "Finishing", "Dribbling"],
      marketValue: 50000000,
    },
  },
  {
    id: "18",
    name: "Cody Gakpo",
    team: "Liverpool",
    position: "Forward",
    age: 26,
    nationality: "Netherlands",
    photo: "/api/placeholder/150/150",
    height: 193, // 6'4"
    weight: 76, // 168 lbs
    stats: {
      appearances: 9,
      goals: 3,
      assists: 2,
      minutesPlayed: 855, // 9 appearances + 1 sub
      rating: 7.9,
    },
    attributes: generateAttributes("Forward", 79),
    aiAnalysis: {
      overallScore: 79,
      strengths: ["Pace", "Finishing", "Versatility"],
      marketValue: 60000000,
    },
  },
  {
    id: "20",
    name: "Luis Díaz",
    team: "Liverpool",
    position: "Forward",
    age: 28,
    nationality: "Colombia",
    photo: "/api/placeholder/150/150",
    stats: {
      appearances: 9,
      goals: 1,
      assists: 1,
      minutesPlayed: 810,
      rating: 7.8,
    },
    attributes: generateAttributes("Forward", 78),
    aiAnalysis: {
      overallScore: 78,
      strengths: ["Pace", "Dribbling", "Crossing"],
      marketValue: 65000000,
    },
  },
];
