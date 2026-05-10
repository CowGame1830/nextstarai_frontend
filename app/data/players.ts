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
    
    // Shooting
    shooting: getRandomStat(isForward ? technicalBase + 10 : isGK ? 15 : technicalBase - 5),
    finishing: getRandomStat(isForward ? technicalBase + 8 : isGK ? 20 : technicalBase - 8),
    longShots: getRandomStat(isForward || isMidfielder ? technicalBase : isGK ? 25 : technicalBase - 10),
    volleys: getRandomStat(isForward ? technicalBase + 2 : isGK ? 30 : technicalBase - 5),
    penalties: getRandomStat(isForward ? technicalBase + 5 : technicalBase - 5),
    
    // Technical
    dribbling: getRandomStat(isForward || isMidfielder ? technicalBase + 8 : isGK ? 40 : technicalBase - 3),
    ballControl: getRandomStat(isForward || isMidfielder ? technicalBase + 5 : isGK ? 50 : technicalBase),
    firstTouch: getRandomStat(isForward || isMidfielder ? technicalBase + 3 : isGK ? 60 : technicalBase - 2),
    technique: getRandomStat(isForward || isMidfielder ? technicalBase + 6 : isGK ? 45 : technicalBase - 1),
    
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
    id: "3",
    name: "Adam Wharton",
    team: "Crystal Palace",
    position: "Midfield",
    age: 20,
    nationality: "England",
    photo: "/images/Adam2.jpg",
    height: 183, // 6'4"
    weight: 80, // 201 lbs
    stats: {
      appearances: 20,
      goals: 0,
      assists: 2,
      minutesPlayed: 1318,
      rating: 7.0,
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
      
      // Shooting
      shooting: 15,
      finishing: 20,
      longShots: 25,
      volleys: 30,
      penalties: 40,
      
      // Technical
      dribbling: 45,
      ballControl: 65,
      firstTouch: 75,
      technique: 70,
      
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
      overallScore: 70,
      strengths: ["Shot Stopping", "Distribution", "Positioning"],
      marketValue: 32000000,
    },
  },{
    id: "1",
    name: "Maxence Lacroix",
    team: "Crystal Palace",
    position: "Defender",
    age: 24,
    nationality: "French",
    photo: "/images/Lacroix.jpg",
    height: 190, // 6'6"
    weight: 88, // 196 lbs
    stats: {
      appearances: 35,
      goals: 1,
      assists: 1,
      minutesPlayed: 3116,
      rating: 7.1,
    },
    attributes: {
        // Physical
        pace: 88,
        acceleration: 86,
        sprintSpeed: 90,
        stamina: 82,
        strength: 86,
        agility: 78,
        balance: 80,
        jumping: 84,

        // Shooting (CB = very low output)
        shooting: 30,
        finishing: 25,
        longShots: 28,
        volleys: 30,
        penalties: 35,

        // Technical (decent ball-playing CB)
        dribbling: 68,
        ballControl: 74,
        firstTouch: 75,
        technique: 72,

        // Passing (solid buildup CB)
        passing: 78,
        shortPassing: 80,
        longPassing: 83,
        crossing: 60,
        freeKicks: 45,
        curve: 62,

        // Defensive (core strength)
        defending: 84,
        interceptions: 86,
        tacklingStanding: 85,
        tacklingSliding: 82,
        heading: 84,

        // Mental (high-level CB awareness)
        positioning: 85,
        vision: 72,
        composure: 82,
        reactions: 85,
        workRate: 83,

        // Goalkeeping (not applicable CB → minimal placeholder values)
        gkDiving: 10,
        gkHandling: 10,
        gkKicking: 15,
        gkPositioning: 10,
        gkReflexes: 10,
      },
    aiAnalysis: {
      overallScore: 69,
      strengths: [
    "Recovery",
    "Interceptions",
    "Progression"
  ],
      marketValue: 20000000,
    },
  },
  {
    id: "2",
    name: "Philippe Matetar",
    team: "Crystal Palace",
    position: "Forward",
    age: 27,
    nationality: "French",
    photo: "/images/Matetar.jpg",
    height: 192, // 6'6"
    weight: 88, // 196 lbs
    stats: {
      appearances: 35,
      goals: 14,
      assists: 2,
      minutesPlayed: 2648,
      rating: 7.6,
    },
    attributes: {
      // Physical
      pace: 84,
      acceleration: 83,
      sprintSpeed: 80,
      stamina: 99,
      strength: 88,
      agility: 72,
      balance: 75,
      jumping: 86,

      // Shooting (elite improvement season: 14 goals, high xG)
      shooting: 84,
      finishing: 86,
      longShots: 74,
      volleys: 80,
      penalties: 78,

      // Technical (solid but not elite dribbler)
      dribbling: 76,
      ballControl: 80,
      firstTouch: 82,
      technique: 78,

      // Passing (decent link-up striker)
      passing: 70,
      shortPassing: 72,
      longPassing: 65,
      crossing: 55,
      freeKicks: 50,
      curve: 68,

      // Defensive (pressing forward contribution)
      defending: 40,
      interceptions: 38,
      tacklingStanding: 35,
      tacklingSliding: 30,
      heading: 88,

      // Mental (big strength area)
      positioning: 88,
      vision: 74,
      composure: 85,
      reactions: 86,
      workRate: 86,

      // Goalkeeping (not applicable)
      gkDiving: 10,
      gkHandling: 10,
      gkKicking: 10,
      gkPositioning: 10,
      gkReflexes: 10,
    },
    aiAnalysis: {
      overallScore: 76,
      strengths: ["Physical Duels", "Aerial", "Hold-up Play"],
      marketValue: 20000000,
    },
  }
  
];
