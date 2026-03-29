// src/systems/watchlistSystem.js — Per-user watchlist management

import storage from "../utils/storage";

const getKey = (email) => `movieverse_watchlist_${email}`;

export const watchlistSystem = {
  getWatchlist: (email) => {
    if (!email) return [];
    return storage.get(getKey(email)) || [];
  },

  addMovie: (email, movieId) => {
    if (!email) return;
    const list = watchlistSystem.getWatchlist(email);
    if (!list.includes(movieId)) {
      storage.set(getKey(email), [...list, movieId]);
    }
  },

  removeMovie: (email, movieId) => {
    if (!email) return;
    const list = watchlistSystem.getWatchlist(email);
    storage.set(getKey(email), list.filter((id) => id !== movieId));
  },

  isInWatchlist: (email, movieId) => {
    if (!email) return false;
    return watchlistSystem.getWatchlist(email).includes(movieId);
  },

  toggleMovie: (email, movieId) => {
    if (watchlistSystem.isInWatchlist(email, movieId)) {
      watchlistSystem.removeMovie(email, movieId);
      return false;
    } else {
      watchlistSystem.addMovie(email, movieId);
      return true;
    }
  },

  getCount: (email) => watchlistSystem.getWatchlist(email).length,
};

export default watchlistSystem;
