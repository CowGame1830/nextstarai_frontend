'use client';

import { useState, useMemo } from 'react';
import { Users, Trophy, Star, TrendingUp, MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Team {
  id: string;
  name: string;
  league: string;
  country: string;
  founded: number;
  logo: string;
  stats: {
    players: number;
    avgRating: number;
    totalGoals: number;
    totalAssists: number;
    marketValue: number;
  };
  performance: {
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  chemistry: {
    teamCohesion: number;
    communicationRating: number;
    workRate: number;
    discipline: number;
  };
  playingStyle: {
    formation: string;
    style: string;
    tempo: string;
    pressingIntensity: number;
    possessionPercentage: number;
    attackingMentality: string;
    defensiveApproach: string;
  };
}

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Liverpool",
    league: "Premier League",
    country: "England",
    founded: 1892,
    logo: "/api/placeholder/100/100",
    stats: {
      players: 15,
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
      goalsAgainst: 34
    },
    chemistry: {
      teamCohesion: 92,
      communicationRating: 88,
      workRate: 95,
      discipline: 87
    },
    playingStyle: {
      formation: "4-3-3",
      style: "High-Intensity Pressing",
      tempo: "Fast",
      pressingIntensity: 94,
      possessionPercentage: 62,
      attackingMentality: "Aggressive",
      defensiveApproach: "High Line"
    }
  }
];

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTeams = useMemo(() => {
    if (!searchQuery) return mockTeams;
    return mockTeams.filter(team => 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.league.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Liverpool FC
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Explore team chemistry, playing style, and comprehensive analysis
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-purple-gradient rounded-full"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teams by name, league, or country..."
              className="w-full rounded-2xl py-4 px-6 border-2 backdrop-blur-sm focus:ring-2 outline-none transition-all duration-200 shadow-lg hover:shadow-xl"
              style={{ 
                '--tw-ring-color': 'var(--purple-primary)',
                color: 'var(--foreground)',
                background: 'var(--panel)',
                borderColor: 'var(--purple-accent)'
              } as React.CSSProperties}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--purple-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1), 0 10px 40px rgba(139, 92, 246, 0.15)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--purple-accent)';
                e.target.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
              <div className="w-2 h-2 bg-purple-gradient rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            Found <span className="font-bold text-2xl gradient-text">{filteredTeams.length}</span> teams
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {filteredTeams.map((team) => (
            <div key={team.id} className="rounded-2xl shadow-lg card-hover overflow-hidden border relative group" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
              {/* Header with team colors */}
              <div className="h-3 bg-purple-gradient relative">
                <div className="absolute inset-0 transform -skew-x-12" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }}></div>
              </div>
              
              {/* Decorative background elements */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-purple-gradient opacity-5 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="p-6 relative z-10">
                {/* Team Header */}
                <div className="flex items-center space-x-4 mb-6 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                  <div className="relative shrink-0">
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={80}
                      height={80}
                      className="rounded-xl border-4 object-cover shadow-xl group-hover:scale-105 transition-transform duration-300"
                      style={{ borderColor: 'var(--purple-primary)' }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{team.name}</h3>
                    <div className="flex items-center space-x-2 text-sm mb-2" style={{ color: 'var(--muted)' }}>
                      <span className="px-3 py-1 rounded-lg font-medium border" style={{ backgroundColor: 'var(--panel)', color: 'var(--purple-primary)', borderColor: 'var(--purple-accent)' }}>
                        {team.league}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">🚩</span>
                        {team.country}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm" style={{ color: 'var(--muted)' }}>
                      <Calendar className="w-4 h-4" />
                      <span>Founded {team.founded}</span>
                    </div>
                  </div>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6 rounded-xl p-4 border-2 relative overflow-hidden" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                  <div className="absolute inset-0 bg-purple-gradient opacity-5 rounded-xl"></div>
                  <div className="text-center relative z-10 p-2 rounded-lg border" style={{ borderColor: 'var(--purple-accent)', backgroundColor: 'var(--panel)' }}>
                    <div className="text-lg font-bold mb-1" style={{ color: 'var(--foreground)' }}>{team.stats.players}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Players</div>
                  </div>
                  <div className="text-center relative z-10 p-2 rounded-lg border" style={{ borderColor: 'var(--purple-accent)', backgroundColor: 'var(--panel)' }}>
                    <div className="text-lg font-bold mb-1" style={{ color: 'var(--foreground)' }}>{team.stats.avgRating}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Avg Rating</div>
                  </div>
                  <div className="text-center relative z-10 p-2 rounded-lg border" style={{ borderColor: 'var(--purple-accent)', backgroundColor: 'var(--panel)' }}>
                    <div className="text-lg font-bold mb-1" style={{ color: 'var(--foreground)' }}>{team.stats.totalGoals}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Goals</div>
                  </div>
                  <div className="text-center relative z-10 p-2 rounded-lg border" style={{ borderColor: 'var(--purple-accent)', backgroundColor: 'var(--panel)' }}>
                    <div className="text-lg font-bold mb-1" style={{ color: 'var(--foreground)' }}>{team.stats.totalAssists}</div>
                    <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Assists</div>
                  </div>
                </div>

                {/* Performance Record */}
                <div className="mb-6 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                  <div className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Season Record</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-400">{team.performance.wins}</div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>Wins</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-yellow-400">{team.performance.draws}</div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>Draws</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-400">{team.performance.losses}</div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>Losses</div>
                    </div>
                  </div>
                </div>

                {/* Market Value */}
                <div className="flex items-center justify-between mb-4 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                  <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Market Value</span>
                  <span className="text-xl font-bold px-3 py-1 rounded-lg text-white" style={{ background: 'var(--purple-primary)' }}>
                    €{(team.stats.marketValue / 1000000).toFixed(0)}M
                  </span>
                </div>

                {/* Team Chemistry */}
                <div className="mb-4 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                  <div className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Team Chemistry</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold mb-1" style={{ color: 'var(--foreground)' }}>{team.chemistry.teamCohesion}%</div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>Cohesion</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold mb-1" style={{ color: 'var(--foreground)' }}>{team.chemistry.workRate}%</div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>Work Rate</div>
                    </div>
                  </div>
                </div>

                {/* Playing Style */}
                <div className="mb-6 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                  <div className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Playing Style</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>Formation</span>
                      <span className="text-sm font-bold px-2 py-1 rounded-lg text-white" style={{ background: 'var(--purple-primary)' }}>
                        {team.playingStyle.formation}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>Style</span>
                      <span className="text-xs font-medium px-2 py-1 rounded-lg border" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)', color: 'var(--purple-primary)' }}>
                        {team.playingStyle.style}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>Pressing</span>
                      <span className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>
                        {team.playingStyle.pressingIntensity}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <Link 
                  href={`/teams/${team.id}`}
                  className="w-full bg-purple-gradient text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 group hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)'
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)';
                  }}
                >
                  <span>View Team Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-6" style={{ color: 'var(--muted)' }}>
              <div className="w-24 h-24 mx-auto bg-purple-light rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">No teams found</h3>
            <p className="text-lg max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              Try adjusting your search to find the team you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}