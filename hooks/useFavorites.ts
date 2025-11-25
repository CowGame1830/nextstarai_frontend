'use client';

import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('liverpool-player-favorites');
      if (savedFavorites) {
        const favoritesArray = JSON.parse(savedFavorites);
        setFavorites(new Set(favoritesArray));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (isLoaded) {
      try {
        const favoritesArray = Array.from(favorites);
        localStorage.setItem('liverpool-player-favorites', JSON.stringify(favoritesArray));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    }
  }, [favorites, isLoaded]);

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

  const isFavorite = (playerId: string) => favorites.has(playerId);

  const getFavoriteCount = () => favorites.size;

  const getAllFavorites = () => Array.from(favorites);

  const clearAllFavorites = () => {
    setFavorites(new Set());
  };

  return {
    favorites,
    isLoaded,
    toggleFavorite,
    isFavorite,
    getFavoriteCount,
    getAllFavorites,
    clearAllFavorites
  };
}