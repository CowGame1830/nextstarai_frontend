"use client";

import React, { useMemo, useState } from "react";
import PlayerCard from "../../components/PlayerCard";
import { players as allPlayers } from "../data/players";

export default function PlayersPage() {
  const [q, setQ] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (playerId: string) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(playerId)) {
        newFavorites.delete(playerId);
      } else {
        newFavorites.add(playerId);
      }
      return newFavorites;
    });
  };

  const filtered = useMemo(() => {
    let players = allPlayers;
    
    // Filter by search query
    if (q) {
      players = players.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    }
    
    // Sort by favorites first, then alphabetically
    return players.sort((a, b) => {
      const aIsFavorite = favorites.has(a.id);
      const bIsFavorite = favorites.has(b.id);
      
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      
      return a.name.localeCompare(b.name);
    });
  }, [q, favorites]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Liverpool Players
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Explore detailed profiles and analytics for Liverpool FC squad
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-purple-gradient rounded-full"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search players by name..."
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
            Found <span className="font-bold text-2xl gradient-text">{filtered.length}</span> players
            {favorites.size > 0 && (
              <span className="ml-4 px-3 py-1 rounded-full text-sm font-medium border-2" style={{ 
                backgroundColor: 'var(--panel)', 
                color: 'var(--purple-primary)', 
                borderColor: 'var(--purple-primary)' 
              }}>
                ❤️ {favorites.size} favorite{favorites.size !== 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {filtered.map((p) => (
            <PlayerCard 
              key={p.id} 
              player={p} 
              isFavorite={favorites.has(p.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-6" style={{ color: 'var(--muted)' }}>
              <div className="w-24 h-24 mx-auto bg-purple-light rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">No players found</h3>
            <p className="text-lg max-w-md mx-auto" style={{ color: 'var(--muted)' }}>
              Try adjusting your search to find the player you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
