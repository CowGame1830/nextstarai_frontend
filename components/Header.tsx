'use client';

import { Search, Bell, User } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onSidebarToggle: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {

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
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search players, teams..."
                className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-lg focus:ring-2 outline-none transition-all"
                style={{
                  '--tw-ring-color': 'var(--purple-primary)',
                  borderColor: 'var(--purple-accent)'
                } as React.CSSProperties}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--purple-primary)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--purple-accent)';
                  e.target.style.boxShadow = 'none';
                }}
              />
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