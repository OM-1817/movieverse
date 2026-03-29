// src/utils/helpers.js — General utility helpers

export const slugify = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const formatRuntime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export const getRatingColor = (rating) => {
  if (rating >= 8.5) return "#FFD700";
  if (rating >= 7.5) return "#90EE90";
  if (rating >= 6.5) return "#87CEEB";
  return "#FFA07A";
};

export const getGenreColor = (genre) => {
  const colors = {
    Action: "#FF6B6B", Adventure: "#4ECDC4", Animation: "#FFE66D",
    Biography: "#A8E6CF", Comedy: "#FFD93D", Crime: "#C44D58",
    Drama: "#6C63FF", Family: "#FF8B94", Fantasy: "#A29BFE",
    History: "#FDCB6E", Horror: "#E17055", Music: "#74B9FF",
    Mystery: "#A29BFE", Romance: "#FD79A8", "Sci-Fi": "#00CEC9",
    Thriller: "#E84393", War: "#636E72",
  };
  return colors[genre] || "#95A5A6";
};

export const truncateText = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export const getInitials = (name) => {
  if (!name) return "?";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
};

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default { slugify, formatRuntime, getRatingColor, getGenreColor, truncateText, getInitials, debounce, shuffle };
