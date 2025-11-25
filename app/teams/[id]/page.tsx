'use client';

import { useState, useMemo } from 'react';
import { ArrowLeft, Users, Trophy, Star, TrendingUp, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { players as mockPlayers } from '@/app/data/players';

interface TeamDetailProps {
  params: {
    id: string;
  };
}

const teamDetails = {
  "1": {
    id: "1",
    name: "Liverpool",
    league: "Premier League",
    country: "England",
    founded: 1892,
    logo: "/api/placeholder/120/120",
    description: "Liverpool Football Club is a professional football club based in Liverpool, England. Known for their passionate fanbase, high-intensity pressing, and attacking football under Arne Slot.",
    stadium: "Anfield",
    capacity: 54074,
    manager: "Arne Slot",
    stats: {
      players: 8,
      avgRating: 8.2,
      totalGoals: 46,
      totalAssists: 60,
      marketValue: 333000000
    },
    performance: {
      wins: 21,
      draws: 7,
      losses: 4,
      goalsFor: 78,
      goalsAgainst: 34,
      points: 70
    },
    recentForm: ['W', 'W', 'D', 'W', 'W'],
    achievements: {
      championsLeague: 6,
      premierLeague: 1,
      faCup: 8
    },
    chemistry: {
      teamCohesion: 92,
      communicationRating: 88,
      workRate: 95,
      discipline: 87,
      leadership: 90,
      mentality: 94
    },
    playingStyle: {
      formation: "4-3-3",
      style: "High-Intensity Pressing",
      tempo: "Fast",
      pressingIntensity: 94,
      possessionPercentage: 62,
      attackingMentality: "Aggressive",
      defensiveApproach: "High Line",
      keyTactics: [
        "Gegenpressing",
        "Wing-back overlaps",
        "Quick transitions",
        "Counter-attacking"
      ],
      strengths: [
        "High pressing",
        "Counter-attacks",
        "Set pieces",
        "Wing play"
      ],
      weaknesses: [
        "Defensive depth",
        "Squad rotation"
      ]
    }
  }
};

export default function TeamDetailPage({ params }: TeamDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const team = teamDetails[params.id as keyof typeof teamDetails];
  
  const teamPlayers = useMemo(() => {
    if (!team) return [];
    return mockPlayers.filter(player => player.team === team.name);
  }, [team]);

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Team not found</h1>
          <Link href="/teams" className="text-purple-400 hover:text-purple-300">
            ← Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'players', label: 'Squad', icon: Users },
    { id: 'chemistry', label: 'Chemistry', icon: Star },
    { id: 'tactics', label: 'Playing Style', icon: TrendingUp },
    { id: 'trophies', label: 'Trophies', icon: Trophy }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/teams" 
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover:scale-105 hover:translate-x-1 group"
            style={{ 
              color: 'var(--foreground)', 
              borderColor: 'var(--purple-accent)',
              backgroundColor: 'var(--panel)'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
              (e.currentTarget as HTMLElement).style.color = 'var(--purple-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--panel)';
              (e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
            }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:animate-bounce" />
            <span className="font-medium">Back to Teams</span>
          </Link>
        </div>

        {/* Team Header */}
        <div className="mb-8 p-8 rounded-2xl border-2 relative overflow-hidden group hover:shadow-2xl transition-all duration-300" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
          <div className="absolute inset-0 bg-purple-gradient opacity-10 group-hover:opacity-15 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-gradient opacity-5 rounded-full transform translate-x-32 -translate-y-32 group-hover:scale-110 transition-transform duration-500"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Image
                src={team.logo}
                alt={team.name}
                width={120}
                height={120}
                className="rounded-2xl border-4 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                style={{ borderColor: 'var(--purple-primary)' }}
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text group-hover:scale-105 transition-transform duration-300">{team.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4">
                <span className="px-4 py-2 rounded-lg font-semibold border-2 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-default" style={{ 
                  backgroundColor: 'var(--background)', 
                  color: 'var(--purple-primary)',
                  borderColor: 'var(--purple-accent)'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                }}>
                  {team.league}
                </span>
                <span className="px-4 py-2 rounded-lg font-semibold border-2 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-default" style={{ 
                  backgroundColor: 'var(--background)', 
                  color: 'var(--foreground)',
                  borderColor: 'var(--purple-accent)'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--purple-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
                }}>
                  🚩 {team.country}
                </span>
                <span className="px-4 py-2 rounded-lg font-semibold border-2 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-default" style={{ 
                  backgroundColor: 'var(--background)', 
                  color: 'var(--foreground)',
                  borderColor: 'var(--purple-accent)'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--purple-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
                }}>
                  Founded {team.founded}
                </span>
              </div>
              <p className="text-lg max-w-2xl" style={{ color: 'var(--muted)' }}>
                {team.description}
              </p>
            </div>
            
            <div className="shrink-0 text-center group-hover:scale-110 transition-transform duration-300">
              <div className="p-4 rounded-xl border-2 hover:shadow-lg transition-all duration-200" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                   onMouseEnter={(e) => {
                     (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                   }}
                   onMouseLeave={(e) => {
                     (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                   }}>
                <div className="text-3xl font-bold mb-2 gradient-text">
                  {team.performance.points}
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                  Season Points
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-2 rounded-xl border-2 hover:shadow-lg transition-shadow duration-200" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 group ${
                    activeTab === tab.id 
                      ? 'text-white shadow-lg transform scale-105' 
                      : 'hover:shadow-md hover:scale-105 hover:translate-y-1'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--purple-primary)' : 'var(--background)',
                    color: activeTab === tab.id ? 'white' : 'var(--foreground)',
                    borderColor: activeTab === tab.id ? 'var(--purple-primary)' : 'var(--purple-accent)'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--purple-primary)';
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1.05) translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--foreground)';
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateY(0)';
                    }
                  }}
                >
                  <Icon className={`w-4 h-4 ${activeTab !== tab.id ? 'group-hover:scale-110' : ''} transition-transform duration-200`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Stats */}
              <div className="p-6 rounded-2xl border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}
                   onMouseEnter={(e) => {
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                   }}
                   onMouseLeave={(e) => {
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                   }}>
                <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300" style={{ color: 'var(--foreground)' }}>Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg border hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <div className="text-2xl font-bold mb-2 gradient-text">{team.stats.avgRating}</div>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>Avg Rating</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <div className="text-2xl font-bold mb-2 gradient-text">€{(team.stats.marketValue / 1000000).toFixed(0)}M</div>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>Market Value</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <div className="text-2xl font-bold mb-2 gradient-text">{team.stats.totalGoals}</div>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>Total Goals</div>
                  </div>
                  <div className="text-center p-4 rounded-lg border hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <div className="text-2xl font-bold mb-2 gradient-text">{team.stats.totalAssists}</div>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>Total Assists</div>
                  </div>
                </div>
              </div>

              {/* Team Info */}
              <div className="p-6 rounded-2xl border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}
                   onMouseEnter={(e) => {
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                   }}
                   onMouseLeave={(e) => {
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                   }}>
                <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300" style={{ color: 'var(--foreground)' }}>Team Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg border hover:scale-105 hover:shadow-md transition-all duration-200" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <span style={{ color: 'var(--muted)' }}>Stadium</span>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{team.stadium}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border hover:scale-105 hover:shadow-md transition-all duration-200" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <span style={{ color: 'var(--muted)' }}>Capacity</span>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{team.capacity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border hover:scale-105 hover:shadow-md transition-all duration-200" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <span style={{ color: 'var(--muted)' }}>Manager</span>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{team.manager}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border hover:scale-105 hover:shadow-md transition-all duration-200" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <span style={{ color: 'var(--muted)' }}>Squad Size</span>
                    <span className="font-semibold" style={{ color: 'var(--foreground)' }}>{team.stats.players} players</span>
                  </div>
                </div>
              </div>

              {/* Recent Form */}
              <div className="p-6 rounded-2xl border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}
                   onMouseEnter={(e) => {
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                   }}
                   onMouseLeave={(e) => {
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                   }}>
                <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300" style={{ color: 'var(--foreground)' }}>Recent Form</h3>
                <div className="flex items-center space-x-2">
                  {team.recentForm.map((result, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white hover:scale-125 hover:shadow-lg transition-all duration-200 cursor-default ${
                        result === 'W' ? 'bg-green-500 hover:bg-green-400' :
                        result === 'D' ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-red-500 hover:bg-red-400'
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                  <span className="ml-4 text-sm group-hover:font-semibold transition-all duration-200" style={{ color: 'var(--muted)' }}>
                    (Most recent first)
                  </span>
                </div>
              </div>

              {/* Season Record */}
              <div className="p-6 rounded-2xl border-2 hover:shadow-xl hover:scale-105 transition-all duration-300 group" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}
                   onMouseEnter={(e) => {
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                   }}
                   onMouseLeave={(e) => {
                     (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                   }}>
                <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300" style={{ color: 'var(--foreground)' }}>Season Record</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-lg border hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <div className="text-3xl font-bold text-green-400 mb-2 hover:scale-110 transition-transform duration-200">{team.performance.wins}</div>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>Wins</div>
                  </div>
                  <div className="p-4 rounded-lg border hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <div className="text-3xl font-bold text-yellow-400 mb-2 hover:scale-110 transition-transform duration-200">{team.performance.draws}</div>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>Draws</div>
                  </div>
                  <div className="p-4 rounded-lg border hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-default" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}
                       onMouseEnter={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                       }}
                       onMouseLeave={(e) => {
                         (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--background)';
                         (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                       }}>
                    <div className="text-3xl font-bold text-red-400 mb-2 hover:scale-110 transition-transform duration-200">{team.performance.losses}</div>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>Losses</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'players' && (
            <div>
              <h3 className="text-2xl font-bold mb-6 gradient-text" style={{ color: 'var(--foreground)' }}>Squad Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamPlayers.map((player) => (
                  <Link 
                    key={player.id} 
                    href={`/players/${player.id}`}
                    className="p-6 rounded-2xl border-2 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-300 block group"
                    style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--panel)';
                    }}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={player.photo}
                        alt={player.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 object-cover group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
                        style={{ borderColor: 'var(--purple-primary)' }}
                      />
                      <div>
                        <h4 className="font-bold group-hover:gradient-text transition-all duration-300" style={{ color: 'var(--foreground)' }}>{player.name}</h4>
                        <p className="text-sm capitalize group-hover:font-semibold transition-all duration-200" style={{ color: 'var(--muted)' }}>{player.position}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: 'var(--muted)' }}>Rating</span>
                      <span className="font-bold text-lg px-3 py-1 rounded-lg text-white" style={{ background: 'var(--purple-primary)' }}>
                        {player.stats.rating}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Offensive Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <span style={{ color: 'var(--muted)' }}>Goals Scored</span>
                    <span className="font-bold text-green-400">{team.performance.goalsFor}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <span style={{ color: 'var(--muted)' }}>Goals per Game</span>
                    <span className="font-bold text-green-400">{(team.performance.goalsFor / 32).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <span style={{ color: 'var(--muted)' }}>Total Assists</span>
                    <span className="font-bold text-blue-400">{team.stats.totalAssists}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Defensive Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <span style={{ color: 'var(--muted)' }}>Goals Conceded</span>
                    <span className="font-bold text-red-400">{team.performance.goalsAgainst}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <span style={{ color: 'var(--muted)' }}>Goals Against per Game</span>
                    <span className="font-bold text-red-400">{(team.performance.goalsAgainst / 32).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <span style={{ color: 'var(--muted)' }}>Goal Difference</span>
                    <span className={`font-bold ${team.performance.goalsFor - team.performance.goalsAgainst > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {team.performance.goalsFor - team.performance.goalsAgainst > 0 ? '+' : ''}{team.performance.goalsFor - team.performance.goalsAgainst}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chemistry' && (
            <div className="space-y-8">
              {/* Team Chemistry Overview */}
              <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Team Chemistry Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center p-6 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-primary)' }}>
                      <span className="text-2xl">🤝</span>
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{team.chemistry.teamCohesion}%</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Team Cohesion</div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                      <div className="h-2 rounded-full" style={{ width: `${team.chemistry.teamCohesion}%`, backgroundColor: 'var(--purple-primary)' }}></div>
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-primary)' }}>
                      <span className="text-2xl">💬</span>
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{team.chemistry.communicationRating}%</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Communication</div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                      <div className="h-2 rounded-full" style={{ width: `${team.chemistry.communicationRating}%`, backgroundColor: 'var(--purple-primary)' }}></div>
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-primary)' }}>
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{team.chemistry.workRate}%</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Work Rate</div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                      <div className="h-2 rounded-full" style={{ width: `${team.chemistry.workRate}%`, backgroundColor: 'var(--purple-primary)' }}></div>
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-primary)' }}>
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{team.chemistry.discipline}%</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Discipline</div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                      <div className="h-2 rounded-full" style={{ width: `${team.chemistry.discipline}%`, backgroundColor: 'var(--purple-primary)' }}></div>
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-primary)' }}>
                      <span className="text-2xl">👑</span>
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{team.chemistry.leadership}%</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Leadership</div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                      <div className="h-2 rounded-full" style={{ width: `${team.chemistry.leadership}%`, backgroundColor: 'var(--purple-primary)' }}></div>
                    </div>
                  </div>
                  <div className="text-center p-6 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-primary)' }}>
                      <span className="text-2xl">🔥</span>
                    </div>
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{team.chemistry.mentality}%</div>
                    <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Mentality</div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mt-3">
                      <div className="h-2 rounded-full" style={{ width: `${team.chemistry.mentality}%`, backgroundColor: 'var(--purple-primary)' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tactics' && (
            <div className="space-y-8">
              {/* Playing Style Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                  <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Formation & Style</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: 'var(--muted)' }}>Formation</span>
                        <span className="text-2xl font-bold px-4 py-2 rounded-lg text-white" style={{ background: 'var(--purple-primary)' }}>
                          {team.playingStyle.formation}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: 'var(--muted)' }}>Playing Style</span>
                        <span className="font-bold" style={{ color: 'var(--foreground)' }}>{team.playingStyle.style}</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: 'var(--muted)' }}>Tempo</span>
                        <span className="font-bold" style={{ color: 'var(--foreground)' }}>{team.playingStyle.tempo}</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                      <div className="flex justify-between items-center mb-2">
                        <span style={{ color: 'var(--muted)' }}>Attacking Mentality</span>
                        <span className="font-bold" style={{ color: 'var(--foreground)' }}>{team.playingStyle.attackingMentality}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                  <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Tactical Metrics</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Pressing Intensity</span>
                        <span className="font-bold" style={{ color: 'var(--foreground)' }}>{team.playingStyle.pressingIntensity}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ width: `${team.playingStyle.pressingIntensity}%`, backgroundColor: 'var(--purple-primary)' }}></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Possession</span>
                        <span className="font-bold" style={{ color: 'var(--foreground)' }}>{team.playingStyle.possessionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-3">
                        <div className="h-3 rounded-full" style={{ width: `${team.playingStyle.possessionPercentage}%`, backgroundColor: 'var(--purple-primary)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Tactics and Strengths */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                  <h3 className="text-xl font-bold mb-6 text-green-600">Key Tactics</h3>
                  <div className="space-y-3">
                    {team.playingStyle.keyTactics.map((tactic, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-green-800 font-medium">{tactic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                  <h3 className="text-xl font-bold mb-6 text-blue-600">Tactical Strengths</h3>
                  <div className="space-y-3">
                    {team.playingStyle.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-800 font-medium">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trophies' && (
            <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Major Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(team.achievements).map(([trophy, count]) => (
                  <div key={trophy} className="text-center p-6 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                    <div className="text-3xl font-bold mb-2 text-yellow-400">{count}</div>
                    <div className="text-sm font-medium capitalize" style={{ color: 'var(--foreground)' }}>
                      {trophy.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}