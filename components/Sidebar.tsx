'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  Home, 
  Users, 
  BarChart3, 
  Shield, 
  Settings, 
  Trophy,
  TrendingUp,
  Calendar,
  FileText,
  HelpCircle,
  Heart,
  Activity
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: Users, label: 'Players', href: '/players' },
    { icon: Shield, label: 'Teams', href: '/teams' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full backdrop-blur-md border-r z-50 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      }`}
      style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--purple-accent)' }}>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg"
            style={{ color: 'var(--purple-primary)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {isOpen && (
            <Link href="/" className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105 relative">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Enhanced NextStarAI text */}
              <div className="relative flex flex-col">
                <span 
                  className="text-xl font-black relative z-10 group-hover:scale-110 transition-all duration-300"
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
                  Football Analytics
                </span>
                
                {/* Decorative underline */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                
                {/* Sparkle effects */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
              </div>
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-3 rounded-lg transition-all duration-200 group hover:bg-purple-light hover:shadow-md hover:scale-105 hover:translate-x-1"
                  style={{ color: 'var(--muted)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--purple-primary)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.05) translateX(4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(167, 139, 250, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1) translateX(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <Icon className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  {isOpen && (
                    <span className="ml-3 font-medium transition-all duration-200 group-hover:font-semibold">
                      {item.label}
                    </span>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="absolute left-16 px-3 py-2 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 whitespace-nowrap shadow-xl border animate-pulse"
                         style={{ 
                           background: 'linear-gradient(135deg, var(--purple-primary), var(--purple-accent))',
                           borderColor: 'var(--purple-light)'
                         }}>
                      <span className="font-medium">{item.label}</span>
                      <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent" 
                           style={{ borderRightColor: 'var(--purple-primary)' }}></div>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom section */}
        {isOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 bg-purple-gradient rounded-lg text-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <h4 className="font-semibold text-sm mb-2 group-hover:scale-105 transition-transform duration-200">Premium Features</h4>
              <p className="text-xs opacity-90 mb-3 group-hover:opacity-100 transition-opacity duration-200">
                Unlock advanced analytics and AI insights
              </p>
              <button className="w-full py-2 px-3 bg-white/20 rounded-lg text-xs font-medium hover:bg-white/40 hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-95">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}