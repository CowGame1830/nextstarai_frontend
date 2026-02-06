'use client';

import { useMemo } from 'react';
import { Heart, Users, Trash2 } from 'lucide-react';
import PlayerCard from '@/components/PlayerCard';
import { players as mockPlayers } from '@/app/data/players';
import { useFavorites } from '@/hooks/useFavorites';
import Link from 'next/link';
import { useThemeLang } from '@/components/Providers';
import { translations } from '@/lib/translations';

export default function FavoritesPage() {
    const { favorites, isLoaded, toggleFavorite, isFavorite, getFavoriteCount, clearAllFavorites } = useFavorites();
    const { lang } = useThemeLang();
    const t = translations[lang];

    const favoritePlayersList = useMemo(() => {
        if (!isLoaded) return [];
        return mockPlayers.filter(player => isFavorite(player.id));
    }, [favorites, isLoaded, isFavorite]);

    const totalFavoriteValue = favoritePlayersList.reduce(
        (sum, player) => sum + player.aiAnalysis.marketValue,
        0
    );

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--purple-primary)' }}></div>
                    <p style={{ color: 'var(--muted)' }}>Loading your favorites...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-12 text-center animate-fade-in">
                    <div className="flex items-center justify-center mb-4">
                        <h1 className="text-4xl md:text-5xl font-bold gradient-text">
                            My Favorite Players
                        </h1>
                    </div>
                    <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
                        Your personally curated Liverpool FC squad
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-24 h-1 bg-purple-gradient rounded-full"></div>
                    </div>
                </div>

                {favoritePlayersList.length > 0 ? (
                    <>
                        {/* Stats Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="rounded-2xl shadow-lg border p-6 text-center" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                                <Heart className="w-8 h-8 mx-auto mb-3 text-red-500" fill="currentColor" />
                                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                                    {getFavoriteCount()}
                                </div>
                                <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                                    Favorite Players
                                </div>
                            </div>

                            <div className="rounded-2xl shadow-lg border p-6 text-center" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                                <Users className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--purple-primary)' }} />
                                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                                    €{(totalFavoriteValue / 1000000).toFixed(0)}M
                                </div>
                                <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                                    Combined Value
                                </div>
                            </div>

                            <div className="rounded-2xl shadow-lg border p-6 text-center" style={{ background: 'var(--panel)', borderColor: 'var(--purple-accent)' }}>
                                <div className="w-8 h-8 mx-auto mb-3 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: 'var(--purple-primary)' }}>
                                    {favoritePlayersList.length > 0
                                        ? (favoritePlayersList.reduce((sum, player) => sum + player.stats.rating, 0) / favoritePlayersList.length).toFixed(1)
                                        : '0'
                                    }
                                </div>
                                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                                    Avg Rating
                                </div>
                                <div className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                                    Your Squad
                                </div>
                            </div>
                        </div>

                        {/* Clear All Button */}
                        <div className="mb-8 flex justify-between items-center">
                            <p className="text-lg" style={{ color: 'var(--muted)' }}>
                                Showing <span className="font-bold gradient-text">{favoritePlayersList.length}</span> favorite players
                            </p>
                            <button
                                onClick={clearAllFavorites}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
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
                                <Trash2 className="w-4 h-4" />
                                <span className="font-medium">Clear All</span>
                            </button>
                        </div>

                        {/* Favorites Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {favoritePlayersList.map((player) => (
                                <PlayerCard
                                    key={player.id}
                                    player={player}
                                    isFavorite={true}
                                    onToggleFavorite={toggleFavorite}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16 animate-fade-in">
                        <div className="mb-6">
                            <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--purple-light)' }}>
                                <Heart className="w-16 h-16 text-gray-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 gradient-text">No favorite players yet</h3>
                        <p className="text-lg max-w-md mx-auto mb-8" style={{ color: 'var(--muted)' }}>
                            Start building your dream Liverpool squad by adding players to your favorites!
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
                            style={{
                                backgroundColor: 'var(--purple-primary)',
                                color: 'white'
                            }}
                        >
                            <Users className="w-5 h-5" />
                            <span>Browse Players</span>
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}