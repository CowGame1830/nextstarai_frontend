import type { Player } from "../../types/player";

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
    aiAnalysis: {
      overallScore: 78,
      strengths: ["Pace", "Dribbling", "Crossing"],
      marketValue: 65000000,
    },
  },
];
