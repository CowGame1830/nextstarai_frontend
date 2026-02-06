'use client';

import { Filter, SortAsc, Grid, List } from 'lucide-react';
import { useState } from 'react';
import { useThemeLang } from './Providers';
import { translations } from '@/lib/translations';

interface FilterBarProps {
  onPositionFilter: (position: string) => void;
  onSortChange: (sort: string) => void;
  onViewChange: (view: 'grid' | 'list') => void;
  currentView: 'grid' | 'list';
}

export default function FilterBar({ onPositionFilter, onSortChange, onViewChange, currentView }: FilterBarProps) {
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedSort, setSelectedSort] = useState('rating');
  const { lang } = useThemeLang();
  const t = translations[lang];

  const positions = [
    { value: 'all', label: t.allPositions },
    { value: 'Goalkeeper', label: t.goalkeeper },
    { value: 'Defender', label: t.defender },
    { value: 'Midfielder', label: t.midfielder },
    { value: 'Forward', label: t.forward },
  ];

  const sortOptions = [
    { value: 'rating', label: t.rating },
    { value: 'aiScore', label: t.aiScore },
    { value: 'marketValue', label: t.marketValue },
    { value: 'age', label: t.age },
    { value: 'goals', label: t.goals },
    { value: 'assists', label: t.assists },
  ];

  const handlePositionChange = (position: string) => {
    setSelectedPosition(position);
    onPositionFilter(position);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    onSortChange(sort);
  };

  return (
    <div className="backdrop-blur-md rounded-2xl shadow-lg border p-6 mb-8 animate-slide-up" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left side - Filters */}
        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          {/* Position Filter */}
          <div className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg group-hover:bg-purple-light transition-colors duration-200" style={{ backgroundColor: 'var(--purple-light)' }}>
              <Filter className="w-5 h-5" style={{ color: 'var(--purple-primary)' }} />
            </div>
            <select
              value={selectedPosition}
              onChange={(e) => handlePositionChange(e.target.value)}
              className="border-2 rounded-xl px-4 py-3 focus:ring-2 outline-none min-w-44 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ 
                borderColor: 'var(--purple-accent)',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                '--tw-ring-color': 'var(--purple-primary)'
              } as React.CSSProperties}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--purple-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--purple-accent)';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {positions.map((position) => (
                <option key={position.value} value={position.value}>
                  {position.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg group-hover:bg-purple-light transition-colors duration-200" style={{ backgroundColor: 'var(--purple-light)' }}>
              <SortAsc className="w-5 h-5" style={{ color: 'var(--purple-primary)' }} />
            </div>
            <select
              value={selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border-2 rounded-xl px-4 py-3 focus:ring-2 outline-none min-w-40 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ 
                borderColor: 'var(--purple-accent)',
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                '--tw-ring-color': 'var(--purple-primary)'
              } as React.CSSProperties}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--purple-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--purple-accent)';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right side - View Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm mr-2" style={{ color: 'var(--muted)' }}>View:</span>
          <div className="flex rounded-lg p-1" style={{ backgroundColor: 'var(--background)' }}>
            <button
              onClick={() => onViewChange('grid')}
              className="p-2 rounded-md transition-colors"
              style={{
                backgroundColor: currentView === 'grid' ? 'var(--purple-primary)' : 'transparent',
                color: currentView === 'grid' ? 'white' : 'var(--muted)'
              }}
              onMouseEnter={(e) => {
                if (currentView !== 'grid') {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentView !== 'grid') {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }
              }}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewChange('list')}
              className="p-2 rounded-md transition-colors"
              style={{
                backgroundColor: currentView === 'list' ? 'var(--purple-primary)' : 'transparent',
                color: currentView === 'list' ? 'white' : 'var(--muted)'
              }}
              onMouseEnter={(e) => {
                if (currentView !== 'list') {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-light)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentView !== 'list') {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }
              }}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedPosition !== 'all' || selectedSort !== 'rating') && (
        <div className="mt-6">
          <div className="rounded-xl border-2 p-4" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--purple-accent)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--purple-primary)' }}></div>
              <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Active Filters</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedPosition !== 'all' && (
                <span className="text-sm px-4 py-2 rounded-lg border flex items-center gap-2 font-medium" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)', color: 'var(--purple-primary)' }}>
                  <span className="text-xs opacity-75">Position:</span>
                  <span>{positions.find(p => p.value === selectedPosition)?.label}</span>
                  <button 
                    onClick={() => handlePositionChange('all')}
                    className="ml-1 rounded-full w-5 h-5 flex items-center justify-center transition-all duration-200 text-xs font-bold hover:scale-110"
                    style={{ color: 'var(--purple-primary)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-primary)';
                      (e.currentTarget as HTMLElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = 'var(--purple-primary)';
                    }}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedSort !== 'rating' && (
                <span className="text-sm px-4 py-2 rounded-lg border flex items-center gap-2 font-medium" style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--purple-accent)', color: 'var(--purple-primary)' }}>
                  <span className="text-xs opacity-75">Sort:</span>
                  <span>{sortOptions.find(s => s.value === selectedSort)?.label}</span>
                  <button 
                    onClick={() => handleSortChange('rating')}
                    className="ml-1 rounded-full w-5 h-5 flex items-center justify-center transition-all duration-200 text-xs font-bold hover:scale-110"
                    style={{ color: 'var(--purple-primary)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--purple-primary)';
                      (e.currentTarget as HTMLElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = 'var(--purple-primary)';
                    }}
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}