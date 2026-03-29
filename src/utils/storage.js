// src/utils/storage.js — localStorage abstraction layer

export const storage = {
  get: (key) => {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("Storage get error:", e);
      return null;
    }
  },
  set: (key, value) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage set error:", e);
    }
  },
  remove: (key) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Storage remove error:", e);
    }
  },
  clear: () => {
    if (typeof window === "undefined") return;
    try {
      localStorage.clear();
    } catch (e) {
      console.error("Storage clear error:", e);
    }
  },
};

export default storage;
