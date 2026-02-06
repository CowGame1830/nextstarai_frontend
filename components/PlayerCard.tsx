"use client";

import { Player } from '../types/player';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useThemeLang } from './Providers';
import { translations } from '@/lib/translations';

interface PlayerCardProps {
  player: Player;
  isFavorite?: boolean;
  onToggleFavorite?: (playerId: string) => void;
}

export default function PlayerCard({ player, isFavorite = false, onToggleFavorite }: PlayerCardProps) {
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(player.id);
  };
  const { lang } = useThemeLang();
  const t = translations[lang];
  return (
    <div className="rounded-2xl shadow-lg card-hover overflow-hidden border relative group" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
      {/* Header with team colors */}
      <div className="h-3 bg-purple-gradient relative">
        <div className="absolute inset-0 transform -skew-x-12" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)' }}></div>
      </div>
      
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full border-2 backdrop-blur-sm transition-all duration-300 hover:scale-125 active:scale-95 ${
          isFavorite ? 'animate-pulse' : 'hover:animate-bounce'
        }`}
        style={{
          backgroundColor: isFavorite ? 'var(--purple-primary)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isFavorite ? 'var(--purple-primary)' : 'var(--purple-accent)',
          boxShadow: isFavorite 
            ? '0 8px 25px rgba(139, 92, 246, 0.4)' 
            : '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
        onMouseEnter={(e) => {
          if (!isFavorite) {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-primary)';
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-primary)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3)';
          } else {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 35px rgba(139, 92, 246, 0.6)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isFavorite) {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            (e.currentTarget as HTMLElement).style.borderColor = 'var(--purple-accent)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          } else {
            (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
          }
        }}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-300 ${
            isFavorite 
              ? 'text-white scale-110' 
              : 'text-gray-500 hover:text-white group-hover:scale-110'
          }`}
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke={isFavorite ? 'currentColor' : 'currentColor'}
          strokeWidth={isFavorite ? 1 : 2}
        />
      </button>
      
      {/* Decorative background elements */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-purple-gradient opacity-5 rounded-full transform group-hover:scale-110 transition-transform duration-500"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-gradient opacity-10 rounded-full transform group-hover:translate-x-2 transition-transform duration-500"></div>
      
      {/* Player Photo and Basic Info */}
      <div className="p-6 relative z-10">
        <div className="flex items-start space-x-4 mb-6 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-purple-gradient rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative">
              <Image
                src={player.photo}
                alt={player.name}
                width={90}
                height={90}
                className="rounded-full border-4 object-cover shadow-xl group-hover:scale-105 transition-transform duration-300"
                style={{ borderColor: 'var(--purple-primary)' }}
              />
              <div className="absolute inset-0 rounded-full border-2 border-opacity-30" style={{ borderColor: 'var(--purple-accent)' }}></div>
            </div>
            <div className="absolute -bottom-2 -right-2 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-xl border-2" style={{ backgroundColor: 'var(--purple-primary)', borderColor: 'white' }}>
              {player.stats.rating}
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.name}</h3>
            <div className="flex items-center space-x-2 text-sm mb-2" style={{ color: 'var(--muted)' }}>
              <span className="px-3 py-1 rounded-lg font-medium border" style={{ backgroundColor: 'var(--panel)', color: 'var(--purple-primary)', borderColor: 'var(--purple-accent)' }}>
                {player.position}
              </span>
              <span className="flex items-center">
                <span className="mr-1">🚩</span>
                {player.nationality}
              </span>
            </div>
            <div className="flex flex-col gap-1 text-sm" style={{ color: 'var(--muted)' }}>
              <div className="flex items-center space-x-1">
                <span>⚽</span>
                <span className="truncate">{player.team}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>📅</span>
                <span className="whitespace-nowrap">{player.age} {t.years}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 rounded-xl p-4 border-2 relative overflow-hidden" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
          <div className="absolute inset-0 bg-purple-gradient opacity-5 rounded-xl"></div>
          <div className="text-center relative z-10 group hover:scale-110 transition-transform duration-200 p-2 rounded-lg border" style={{ borderColor: 'var(--purple-accent)', backgroundColor: 'var(--panel)' }}>
            <div className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.stats.goals}</div>
            <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{t.goals}</div>
            <div className="w-full h-1 bg-purple-gradient rounded-full mt-2 opacity-80"></div>
          </div>
          <div className="text-center relative z-10 group hover:scale-110 transition-transform duration-200 p-2 rounded-lg border" style={{ borderColor: 'var(--purple-accent)', backgroundColor: 'var(--panel)' }}>
            <div className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.stats.assists}</div>
            <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{t.assists}</div>
            <div className="w-full h-1 bg-purple-gradient rounded-full mt-2 opacity-80"></div>
          </div>
          <div className="text-center relative z-10 group hover:scale-110 transition-transform duration-200 p-2 rounded-lg border" style={{ borderColor: 'var(--purple-accent)', backgroundColor: 'var(--panel)' }}>
            <div className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{player.stats.appearances}</div>
            <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{t.appearances}</div>
            <div className="w-full h-1 bg-purple-gradient rounded-full mt-2 opacity-80"></div>
          </div>
        </div>

        {/* AI Score */}
        <div className="mb-6 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold flex items-center" style={{ color: 'var(--foreground)' }}>
              AI Overall Score
            </span>
            <span className="text-sm px-3 py-1 rounded-xl font-bold text-white" style={{ background: 'var(--purple-primary)' }}>
              {player.aiAnalysis.overallScore}/100
            </span>
          </div>
          <div className="relative">
            <div className="w-full rounded-full h-4 shadow-inner border" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
              <div 
                className="bg-purple-gradient h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${player.aiAnalysis.overallScore}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-4 rounded-full pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.2), transparent)' }}></div>
          </div>
        </div>

        {/* Market Value */}
        <div className="flex items-center justify-between mb-4 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
          <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Market Value</span>
          <span className="text-sm font-bold px-3 py-1 rounded-lg text-white" style={{ background: 'var(--purple-primary)' }}>
            €{(player.aiAnalysis.marketValue / 1000000).toFixed(1)}M
          </span>
        </div>

        {/* Strengths Preview */}
        <div className="mb-4 p-4 rounded-xl border-2" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
          <div className="text-sm font-semibold mb-3" style={{ color: 'var(--foreground)' }}>Top Strengths</div>
          <div className="flex flex-wrap gap-2">
            {player.aiAnalysis.strengths.slice(0, 3).map((strength, index) => (
              <span 
                key={index}
                className="text-xs px-3 py-2 rounded-lg border font-medium"
                style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)', color: 'var(--purple-primary)' }}
              >
                {strength}
              </span>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <Link 
          href={`/players/${player.id}`}
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
          <span>{t.viewProfile}</span>
        </Link>
      </div>
    </div>
  );
}