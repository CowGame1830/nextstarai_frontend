'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { players as mockPlayers } from '@/app/data/players';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp,
  TrendingDown,
  Star,
  Award,
  Activity,
  BarChart3,
  Zap,
  Shield,
  Heart,
  TextCursor,
  User
} from 'lucide-react';

export default function PlayerDetail() {
  const params = useParams();
  const playerId = params?.id as string;
  const player = mockPlayers.find(p => p.id === playerId);
  const [activeTab, setActiveTab] = useState('overview');

  if (!player) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--background)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-light)' }}>
              <span className="text-6xl">😕</span>
            </div>
            <h1 className="text-3xl font-bold mb-4 gradient-text">Player Not Found</h1>
            <p className="text-lg mb-8" style={{ color: 'var(--muted)' }}>
              The player you're looking for doesn't exist in our database.
            </p>
            <Link 
              href="/players" 
              className="inline-flex items-center space-x-2 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
              style={{ background: 'var(--purple-primary)' }}
            >
              <span>← Back to Players</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'ai-analysis', label: 'AI Analysis', icon: Zap },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/players"
          className="inline-flex items-center space-x-2 mb-8 px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:shadow-lg"
          style={{ 
            color: 'var(--foreground)', 
            borderColor: 'var(--purple-accent)',
            backgroundColor: 'var(--panel)'
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back to Players</span>
        </Link>

        {/* Player Header */}
        <div className="rounded-3xl shadow-xl border-2 overflow-hidden mb-8 animate-fade-in" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
          <div className="h-40 relative overflow-hidden" style={{ background: 'var(--purple-primary)' }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.1), transparent)' }}></div>
            <div className="absolute bottom-4 right-4 text-white/30 text-6xl font-bold">
              #{player.id}
            </div>
          </div>
          
          <div className="px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
              {/* Player Photo */}
              <div className="relative -mt-24 mb-6 lg:mb-0 shrink-0">
                <div className="absolute inset-0 bg-purple-gradient rounded-full opacity-20 animate-pulse"></div>
                <div className="relative">
                  <Image
                    src={player.photo}
                    alt={player.name}
                    width={160}
                    height={160}
                    className="rounded-full border-4 object-cover shadow-xl"
                    style={{ borderColor: 'var(--purple-primary)' }}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-opacity-30" style={{ borderColor: 'var(--purple-accent)' }}></div>
                </div>
                <div className="absolute -bottom-2 -right-2 text-white text-xl font-bold rounded-full w-14 h-14 flex items-center justify-center shadow-xl border-2" style={{ backgroundColor: 'var(--purple-primary)', borderColor: 'white' }}>
                  {player.stats.rating}
                </div>
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-3 gradient-text">{player.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-2 rounded-full font-semibold text-lg capitalize text-white" style={{ backgroundColor: 'var(--purple-primary)' }}>
                    {player.position}
                  </span>
                  <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                    <Users className="w-5 h-5 mr-2" />
                    <span className="font-medium">{player.team}</span>
                  </div>
                  <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="font-medium">{player.nationality}</span>
                  </div>
                  <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="font-medium">{player.age} years old</span>
                  </div>
                  {player.height && (
                    <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                      <User className="w-5 h-5 mr-4" />
                      <span className="font-medium">{player.height}cm</span>
                    </div>
                  )}
                  {player.weight && (
                    <div className="flex items-center" style={{ color: 'var(--muted)' }}>
                      <span className="font-medium">{player.weight}kg</span>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-xl relative overflow-hidden border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--purple-primary)' }}></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.stats.goals}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Goals</div>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl relative overflow-hidden border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--purple-primary)' }}></div>  
                    <div className="relative z-10">
                      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.stats.assists}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Assists</div>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl relative overflow-hidden border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--purple-primary)' }}></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.stats.appearances}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>Apps</div>
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-xl relative overflow-hidden border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                    <div className="absolute inset-0 opacity-10" style={{ background: 'var(--purple-primary)' }}></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.aiAnalysis.overallScore}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>AI Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Value */}
              <div className="lg:text-right mt-6 lg:mt-0">
                <div className="p-6 rounded-2xl text-center lg:text-right border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
                  <div className="text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Market Value</div>
                  <div className="text-4xl font-bold mb-2 gradient-text">
                    €{(player.aiAnalysis.marketValue / 1000000).toFixed(1)}M
                  </div>
                  <div className="flex items-center justify-center lg:justify-end text-green-400 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>+12% this month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="rounded-2xl shadow-lg border-2 mb-8 animate-slide-up" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
          <div className="border-b-2" style={{ borderColor: 'var(--purple-accent)' }}>
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-purple-primary text-purple-primary'
                        : 'border-transparent hover:border-purple-accent'
                    }`}
                    style={{
                      color: activeTab === tab.id ? 'var(--purple-primary)' : 'var(--muted)',
                      borderBottomColor: activeTab === tab.id ? 'var(--purple-primary)' : 'transparent'
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Season Performance */}
                <div>
                  <h3 className="text-xl font-bold mb-6 gradient-text">Season Performance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Minutes Played</span>
                      <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.minutesPlayed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Goals per Game</span>
                      <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{(player.stats.goals / player.stats.appearances).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Assists per Game</span>
                      <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{(player.stats.assists / player.stats.appearances).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Yellow Cards</span>
                      <span className="font-bold text-yellow-600">3</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <span style={{ color: 'var(--muted)' }}>Red Cards</span>
                      <span className="font-bold text-red-600">0</span>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div>
                  <h3 className="text-xl font-bold mb-6 gradient-text">AI Future Projection</h3>
                  <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl" style={{ backgroundColor: 'var(--purple-primary)' }}>
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--purple-primary)' }}>Projected Growth</h4>
                        <p style={{ color: 'var(--muted)' }}>
                          Based on current performance trends, this player is expected to improve their overall rating by 2-3 points over the next season, with particular growth in technical skills and match awareness.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Offensive Stats */}
                <div>
                  <h3 className="text-lg font-bold mb-6 gradient-text">Offensive</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Goals</span>
                        <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.goals}</span>
                      </div>
                      <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div 
                          className="bg-purple-gradient h-3 rounded-full"
                          style={{ width: `${Math.min(player.stats.goals * 4, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Assists</span>
                        <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.assists}</span>
                      </div>
                      <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div 
                          className="bg-purple-gradient h-3 rounded-full"
                          style={{ width: `${Math.min(player.stats.assists * 6, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div>
                  <h3 className="text-lg font-bold mb-6 gradient-text">Performance</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Rating</span>
                        <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.rating}</span>
                      </div>
                      <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div 
                          className="bg-purple-gradient h-3 rounded-full"
                          style={{ width: `${player.stats.rating}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Appearances</span>
                        <span className="font-bold" style={{ color: 'var(--purple-primary)' }}>{player.stats.appearances}</span>
                      </div>
                      <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div 
                          className="bg-purple-gradient h-3 rounded-full"
                          style={{ width: `${Math.min(player.stats.appearances * 2.5, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discipline Stats */}
                <div>
                  <h3 className="text-lg font-bold mb-6 gradient-text">Discipline</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Yellow Cards</span>
                        <span className="font-bold text-yellow-600">3</span>
                      </div>
                      <div className="text-center py-2">
                        <span className="text-4xl">🟨</span>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--purple-light)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span style={{ color: 'var(--muted)' }}>Red Cards</span>
                        <span className="font-bold text-red-600">0</span>
                      </div>
                      <div className="text-center py-2">
                        <span className="text-4xl">🟥</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-analysis' && (
              <div className="space-y-8">
                {/* Overall AI Score */}
                <div className="text-center p-12 rounded-3xl border-2 relative overflow-hidden" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
                  <div className="absolute inset-0 bg-purple-gradient opacity-5"></div>
                  <div className="relative z-10">
                    <div className="text-8xl font-bold mb-4 gradient-text">{player.aiAnalysis.overallScore}</div>
                    <div className="text-2xl mb-6" style={{ color: 'var(--muted)' }}>AI Overall Score</div>
                    <div className="max-w-2xl mx-auto">
                      <div className="w-full rounded-full h-4" style={{ backgroundColor: 'var(--purple-accent)' }}>
                        <div 
                          className="bg-purple-gradient h-4 rounded-full transition-all duration-1000"
                          style={{ width: `${player.aiAnalysis.overallScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths and Weaknesses */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Strengths */}
                  <div className="p-6 rounded-2xl border-2 border-green-200" style={{ backgroundColor: 'var(--purple-light)' }}>
                    <div className="flex items-center space-x-3 mb-6">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-green-700">Key Strengths</h3>
                    </div>
                    <div className="space-y-3">
                      {player.aiAnalysis.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-800 font-medium">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses - using placeholder data */}
                  <div className="p-6 rounded-2xl border-2 border-red-200" style={{ backgroundColor: 'var(--purple-light)' }}>
                    <div className="flex items-center space-x-3 mb-6">
                      <TrendingDown className="w-6 h-6 text-red-600" />
                      <h3 className="text-xl font-bold text-red-700">Areas for Improvement</h3>
                    </div>
                    <div className="space-y-3">
                      {['Aerial duels', 'Long passing accuracy', 'Defensive positioning'].map((weakness, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-red-800 font-medium">{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="p-8 rounded-2xl border-2" style={{ backgroundColor: 'var(--purple-light)', borderColor: 'var(--purple-accent)' }}>
                  <div className="flex items-center space-x-3 mb-6">
                    <Award className="w-6 h-6" style={{ color: 'var(--purple-primary)' }} />
                    <h3 className="text-xl font-bold" style={{ color: 'var(--purple-primary)' }}>AI Recommendations</h3>
                  </div>
                  <div className="grid gap-4">
                    {[
                      'Focus on improving aerial ability through targeted training sessions',
                      'Work on long-range passing accuracy with specialized drills',
                      'Enhance defensive positioning through tactical analysis sessions',
                      'Maintain current pace and technical skills which are excellent'
                    ].map((recommendation, index) => (
                      <div key={index} className="p-4 bg-white/50 rounded-xl border border-white/20">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: 'var(--purple-primary)' }}>
                            {index + 1}
                          </div>
                          <span style={{ color: 'var(--foreground)' }}>{recommendation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}