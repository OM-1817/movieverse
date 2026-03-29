// src/store/index.js — Redux store configuration

import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from "../utils/storage";

// ─── Auth Slice ───────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, initialized: false },
  reducers: {
    setUser: (state, action) => { state.user = action.payload; state.initialized = true; },
    clearUser: (state) => { state.user = null; },
    setInitialized: (state) => { state.initialized = true; },
  },
});

// ─── Theme Slice ──────────────────────────────────────────────────────────────
const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "dark" },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        storage.set("movieverse_theme", state.mode);
      }
    },
    setTheme: (state, action) => { state.mode = action.payload; },
  },
});

// ─── Watchlist Slice ──────────────────────────────────────────────────────────
const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { movieIds: [] },
  reducers: {
    setWatchlist: (state, action) => { state.movieIds = action.payload; },
    addToWatchlist: (state, action) => {
      if (!state.movieIds.includes(action.payload)) {
        state.movieIds.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.movieIds = state.movieIds.filter((id) => id !== action.payload);
    },
  },
});

// ─── Recently Viewed Slice ────────────────────────────────────────────────────
const recentSlice = createSlice({
  name: "recent",
  initialState: { movieIds: [] },
  reducers: {
    setRecent: (state, action) => { state.movieIds = action.payload; },
    addRecent: (state, action) => {
      const filtered = state.movieIds.filter((id) => id !== action.payload);
      state.movieIds = [action.payload, ...filtered].slice(0, 10);
    },
  },
});

// ─── UI Slice ─────────────────────────────────────────────────────────────────
const uiSlice = createSlice({
  name: "ui",
  initialState: { selectedMovie: null, compareMovies: [] },
  reducers: {
    setSelectedMovie: (state, action) => { state.selectedMovie = action.payload; },
    clearSelectedMovie: (state) => { state.selectedMovie = null; },
    addToCompare: (state, action) => {
      if (state.compareMovies.length < 2 && !state.compareMovies.find((m) => m.id === action.payload.id)) {
        state.compareMovies.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.compareMovies = state.compareMovies.filter((m) => m.id !== action.payload);
    },
    clearCompare: (state) => { state.compareMovies = []; },
  },
});

export const { setUser, clearUser, setInitialized } = authSlice.actions;
export const { toggleTheme, setTheme } = themeSlice.actions;
export const { setWatchlist, addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export const { setRecent, addRecent } = recentSlice.actions;
export const { setSelectedMovie, clearSelectedMovie, addToCompare, removeFromCompare, clearCompare } = uiSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
    watchlist: watchlistSlice.reducer,
    recent: recentSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
