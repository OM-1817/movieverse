// src/pages/_app.js
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store, { setUser, setInitialized, setTheme, setWatchlist, setRecent } from "../store";
import { authSystem } from "../systems/authSystem";
import { watchlistSystem } from "../systems/watchlistSystem";
import { recentlyViewedSystem } from "../systems/recentlyViewedSystem";
import storage from "../utils/storage";
import NavbarDock from "../components/NavbarDock";
import CursorGlow from "../components/CursorGlow";
import MovieModal from "../components/MovieModal";
import MovieComparison from "../components/MovieComparison";
import Footer from "../components/Footer";
import "../styles/global.css";
import "../styles/animations.css";

function AppInner({ Component, pageProps }) {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);

  useEffect(() => {
    // Restore theme
    const savedTheme = storage.get("movieverse_theme");
    if (savedTheme) dispatch(setTheme(savedTheme));

    // Restore session
    const session = authSystem.getSession();
    if (session) {
      dispatch(setUser(session));
      // Restore watchlist
      const wl = watchlistSystem.getWatchlist(session.email);
      dispatch(setWatchlist(wl));
      // Restore recently viewed
      const recent = recentlyViewedSystem.getRecent(session.email);
      dispatch(setRecent(recent));
    } else {
      const guestRecent = recentlyViewedSystem.getRecent(null);
      dispatch(setRecent(guestRecent));
    }
    dispatch(setInitialized());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const muiTheme = createTheme({
    palette: {
      mode,
      primary: { main: "#e8c44a" },
      secondary: { main: "#4a9eff" },
      background: {
        default: mode === "dark" ? "#0a0a0f" : "#f4f4f8",
        paper: mode === "dark" ? "#16161e" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#f0f0f8" : "#111118",
        secondary: mode === "dark" ? "#9999bb" : "#44446a",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            background: mode === "dark" ? "#1e1e2a" : "#2a2a3a",
            color: "#f0f0f8",
            fontSize: "0.75rem",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          arrow: {
            color: mode === "dark" ? "#1e1e2a" : "#2a2a3a",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <CursorGlow />
      <NavbarDock />
      <main className="page-container page-enter">
        <Component {...pageProps} />
      </main>
      <Footer />
      <MovieModal />
      <MovieComparison />
    </ThemeProvider>
  );
}

export default function App(props) {
  return (
    <Provider store={store}>
      <AppInner {...props} />
    </Provider>
  );
}
