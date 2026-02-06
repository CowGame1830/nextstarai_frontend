'use client';

import { useState, useMemo } from 'react';
import React from "react";
import PlayerCard from '@/components/PlayerCard';
import FilterBar from '@/components/FilterBar';
import { players as mockPlayers } from '@/app/data/players';
import { Player } from '@/types/player';
import { TrendingUp, Users, Target, Award, Shield, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { useThemeLang } from '@/components/Providers';
import { translations } from '@/lib/translations';

export default function Home() {
  const [positionFilter, setPositionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { favorites, isLoaded, toggleFavorite, isFavorite, getFavoriteCount } = useFavorites();
  const { lang } = useThemeLang();
  const t = translations[lang];

  // Filter and sort players
  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = mockPlayers;

    // Filter by position
    if (positionFilter !== 'all') {
      filtered = filtered.filter(player => player.position === positionFilter);
    }

    // Sort players
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.stats.rating - a.stats.rating;
        case 'aiScore':
          return b.aiAnalysis.overallScore - a.aiAnalysis.overallScore;
        case 'marketValue':
          return b.aiAnalysis.marketValue - a.aiAnalysis.marketValue;
        case 'age':
          return a.age - b.age;
        case 'goals':
          return b.stats.goals - a.stats.goals;
        case 'assists':
          return b.stats.assists - a.stats.assists;
        default:
          return 0;
      }
    });

    return filtered;
  }, [positionFilter, sortBy]);

  // Calculate dashboard stats
  const totalPlayers = mockPlayers.length;
  const avgRating = (mockPlayers.reduce((sum, player) => sum + player.stats.rating, 0) / totalPlayers).toFixed(1);
  const avgAIScore = Math.round(mockPlayers.reduce((sum, player) => sum + player.aiAnalysis.overallScore, 0) / totalPlayers);
  const totalMarketValue = mockPlayers.reduce((sum, player) => sum + player.aiAnalysis.marketValue, 0);
  const favoriteCount = getFavoriteCount();
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t.liverPoolDashboard}
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            {t.aiPoweredAnalytics}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-purple-gradient rounded-full"></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="rounded-2xl shadow-lg border p-6 card-hover animate-scale-in relative overflow-hidden" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-gradient opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>{t.totalPlayers}</p>
                <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>{totalPlayers}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-xs text-green-600 font-medium">+12% from last month</span>
                </div>
              </div>
              <div className="p-4 rounded-xl animate-float" style={{ backgroundColor: 'var(--purple-light)' }}>
                <Users className="w-7 h-7" style={{ color: 'var(--purple-primary)' }} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg border p-6 card-hover animate-scale-in relative overflow-hidden" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)', animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-gradient opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>{t.avgRating}</p>
                <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>{avgRating}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <span className="text-xs text-blue-600 font-medium">+5.2% from last month</span>
                </div>
              </div>
              <div className="p-4 rounded-xl animate-float" style={{ backgroundColor: 'var(--purple-light)', animationDelay: '0.5s' }}>
                <Award className="w-7 h-7" style={{ color: 'var(--purple-primary)' }} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg border p-6 card-hover animate-scale-in relative overflow-hidden" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)', animationDelay: '0.2s' }}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-gradient opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>{t.avgAIScore}</p>
                <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>{avgAIScore}</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  <span className="text-xs text-purple-600 font-medium">+8.1% from last month</span>
                </div>
              </div>
              <div className="p-4 rounded-xl animate-float" style={{ backgroundColor: 'var(--purple-light)', animationDelay: '1s' }}>
                <Target className="w-7 h-7" style={{ color: 'var(--purple-primary)' }} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg border p-6 card-hover animate-scale-in relative overflow-hidden" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)', animationDelay: '0.3s' }}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-gradient opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>{t.totalValue}</p>
                <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>€{(totalMarketValue / 1000000).toFixed(0)}M</p>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  <span className="text-xs text-emerald-600 font-medium">+15.3% from last month</span>
                </div>
              </div>
              <div className="p-4 rounded-xl animate-float" style={{ backgroundColor: 'var(--purple-light)', animationDelay: '1.5s' }}>
                <TrendingUp className="w-7 h-7" style={{ color: 'var(--purple-primary)' }} />
              </div>
            </div>
          </div>

          <Link href="/favorites" className="block">
            <div className="rounded-2xl shadow-lg border p-6 card-hover animate-scale-in relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)', animationDelay: '0.4s' }}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-gradient opacity-10 rounded-full -mr-10 -mt-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm font-medium mb-2 group-hover:text-purple-primary transition-colors duration-300" style={{ color: 'var(--muted)' }}>{t.favorites}</p>
                  <p className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300" style={{ color: 'var(--foreground)' }}>{isLoaded ? favoriteCount : '...'}</p>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="text-xs text-red-600 font-medium">
                      {favoriteCount > 0 ? `${favoriteCount} player${favoriteCount !== 1 ? 's' : ''} saved` : 'No favorites yet'}
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl animate-float group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: 'var(--purple-light)', animationDelay: '2s' }}>
                  <Heart className="w-7 h-7" style={{ color: 'var(--purple-primary)' }} />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Filter Bar */}
        <FilterBar
          onPositionFilter={setPositionFilter}
          onSortChange={setSortBy}
          onViewChange={setViewMode}
          currentView={viewMode}
        />

        {/* Squad Analysis Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold gradient-text mb-6">Squad Analysis</h2>
          
          {/* Results Count */}
          <div className="mb-6 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
            <p style={{ color: 'var(--muted)' }}>
              Showing <span className="font-semibold gradient-text">{filteredAndSortedPlayers.length}</span> of{' '}
              <span className="font-semibold">{totalPlayers}</span> Liverpool FC players
            </p>
          </div>
        </div>

        {/* Players Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {filteredAndSortedPlayers.map((player) => (
            <PlayerCard 
              key={player.id} 
              player={player}
              isFavorite={isFavorite(player.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedPlayers.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4" style={{ color: 'var(--muted)' }}>
              <Users className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--foreground)' }}>{t.noPlayersFound}</h3>
            <p style={{ color: 'var(--muted)' }}>{t.tryAdjustingFilters}</p>
          </div>
        )}
      </main>
    </div>
  );
}
