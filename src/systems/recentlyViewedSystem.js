// src/systems/recentlyViewedSystem.js — Track recently viewed movies per user

import storage from "../utils/storage";

const MAX_RECENT = 10;
const getKey = (email) => `movieverse_recent_${email || "guest"}`;

export const recentlyViewedSystem = {
  getRecent: (email) => storage.get(getKey(email)) || [],

  addMovie: (email, movieId) => {
    const recent = recentlyViewedSystem.getRecent(email);
    const filtered = recent.filter((id) => id !== movieId);
    const updated = [movieId, ...filtered].slice(0, MAX_RECENT);
    storage.set(getKey(email), updated);
  },

  clearRecent: (email) => {
    storage.remove(getKey(email));
  },
};

export default recentlyViewedSystem;
