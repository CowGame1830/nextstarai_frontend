'use client';

import { Search, Bell, User, Users, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo, useRef, useEffect } from 'react';
import { players } from '@/app/data/players';

interface HeaderProps {
  onSidebarToggle: () => void;
}

interface SearchResult {
  id: string;
  name: string;
  type: 'player' | 'team';
  subtitle: string;
  href: string;
  image?: string;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock teams data (matches the one in teams page)
  const teams = [
    { id: "1", name: "Liverpool", league: "Premier League", country: "England", logo: "/api/placeholder/120/120" },
    { id: "2", name: "Manchester City", league: "Premier League", country: "England", logo: "/api/placeholder/120/120" },
    { id: "3", name: "Arsenal", league: "Premier League", country: "England", logo: "/api/placeholder/120/120" },
    { id: "4", name: "Chelsea", league: "Premier League", country: "England", logo: "/api/placeholder/120/120" },
    { id: "5", name: "Manchester United", league: "Premier League", country: "England", logo: "/api/placeholder/120/120" },
    { id: "6", name: "Barcelona", league: "La Liga", country: "Spain", logo: "/api/placeholder/120/120" },
    { id: "7", name: "Real Madrid", league: "La Liga", country: "Spain", logo: "/api/placeholder/120/120" },
    { id: "8", name: "Bayern Munich", league: "Bundesliga", country: "Germany", logo: "/api/placeholder/120/120" }
  ];

  // Search results logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const results: SearchResult[] = [];
    const query = searchQuery.toLowerCase();
    
    // Search players
    players.forEach(player => {
      if (player.name.toLowerCase().includes(query) || 
          player.position.toLowerCase().includes(query) ||
          player.team.toLowerCase().includes(query)) {
        results.push({
          id: player.id,
          name: player.name,
          type: 'player',
          subtitle: `${player.position} • ${player.team}`,
          href: `/players/${player.id}`,
          image: player.photo
        });
      }
    });
    
    // Search teams
    teams.forEach(team => {
      if (team.name.toLowerCase().includes(query) ||
          team.league.toLowerCase().includes(query) ||
          team.country.toLowerCase().includes(query)) {
        results.push({
          id: team.id,
          name: team.name,
          type: 'team',
          subtitle: `${team.league} • ${team.country}`,
          href: `/teams/${team.id}`,
          image: team.logo
        });
      }
    });
    
    // Limit results to 6
    return results.slice(0, 20);
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="backdrop-blur-md shadow-lg border-b sticky top-0 z-50" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4 group transition-all duration-300 hover:scale-105 relative">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Enhanced NextStarAI text */}
              <div className="relative flex flex-col">
                <span 
                  className="text-2xl font-black relative z-10 group-hover:scale-110 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 25%, #06b6d4 50%, #8b5cf6 75%, #a855f7 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient-shift 3s ease-in-out infinite'
                  }}
                >
                  NextStarAI
                </span>
                {/* Subtitle */}
                <span className="text-xs font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ color: 'var(--purple-primary)' }}>
                  AI Football Analytics
                </span>
                
                {/* Decorative underline */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                
                {/* Sparkle effects */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                <div className="absolute top-1 -left-1 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={(e) => {
                  setIsSearchOpen(true);
                  e.target.style.borderColor = 'var(--purple-primary)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--purple-accent)';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Search players, teams..."
                className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-lg focus:ring-2 outline-none transition-all"
                style={{
                  '--tw-ring-color': 'var(--purple-primary)',
                  borderColor: 'var(--purple-accent)',
                  background: 'var(--panel)',
                  color: 'var(--foreground)'
                } as React.CSSProperties}
              />
              
              {/* Search Results Dropdown */}
              {isSearchOpen && (searchQuery.trim() || searchResults.length > 0) && (
                <div 
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl border-2 shadow-2xl z-50 max-h-80 overflow-y-auto"
                  style={{ 
                    backgroundColor: 'var(--panel)', 
                    borderColor: 'var(--purple-accent)',
                    boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)'
                  }}
                >
                  {searchResults.length > 0 ? (
                    <>
                      <div className="p-3 border-b" style={{ borderColor: 'var(--purple-accent)' }}>
                        <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                          Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      {searchResults.map((result) => (
                        <Link
                          key={`${result.type}-${result.id}`}
                          href={result.href}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center space-x-3 p-3 hover:bg-opacity-80 transition-all duration-200 border-b last:border-b-0"
                          style={{ borderColor: 'var(--purple-accent)' }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                          }}
                        >
                          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 relative">
                            {result.image ? (
                              <Image
                                src={result.image}
                                alt={`${result.name} ${result.type}`}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div 
                                className="w-full h-full flex items-center justify-center"
                                style={{ backgroundColor: 'var(--purple-accent)' }}
                              >
                                {result.type === 'player' ? (
                                  <User className="w-4 h-4" style={{ color: 'var(--purple-primary)' }} />
                                ) : (
                                  <Users className="w-4 h-4" style={{ color: 'var(--purple-primary)' }} />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate" style={{ color: 'var(--foreground)' }}>
                              {result.name}
                            </p>
                            <p className="text-sm truncate" style={{ color: 'var(--muted)' }}>
                              {result.subtitle}
                            </p>
                          </div>
                          <div className="shrink-0">
                            <span 
                              className="text-xs px-2 py-1 rounded-full font-medium"
                              style={{ 
                                backgroundColor: result.type === 'player' ? 'var(--purple-light)' : 'var(--blue-light)',
                                color: result.type === 'player' ? 'var(--purple-primary)' : 'var(--blue-primary)'
                              }}
                            >
                              {result.type}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : searchQuery.trim() ? (
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-light)' }}>
                        <Search className="w-6 h-6" style={{ color: 'var(--purple-primary)' }} />
                      </div>
                      <p className="font-medium mb-1" style={{ color: 'var(--foreground)' }}>No results found</p>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        Try searching for player names, teams, or positions
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-3 rounded-xl transition-all duration-200 relative group" style={{ color: 'var(--muted)' }} onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
              (e.currentTarget as HTMLElement).style.color = 'var(--purple-primary)';
            }} onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
            }}>
              <Bell className="w-5 h-5 group-hover:animate-pulse" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              </span>
            </button>

            {/* Profile */}
            <button className="flex items-center space-x-2 p-2 rounded-lg transition-colors" style={{ color: 'var(--muted)' }} onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)'} onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-accent)' }}>
                <User className="w-4 h-4" style={{ color: 'var(--purple-primary)' }} />
              </div>
              <span className="hidden sm:block font-medium">Admin</span>
            </button>


          </div>
        </div>


      </div>
    </header>
  );
}