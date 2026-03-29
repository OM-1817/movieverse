// src/components/ThemeToggle.jsx
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store";
import { Tooltip, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggle({ size = "medium" }) {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);

  return (
    <Tooltip title={mode === "dark" ? "Switch to Light" : "Switch to Dark"} arrow>
      <IconButton
        onClick={() => dispatch(toggleTheme())}
        size={size}
        data-cursor-hover
        sx={{
          color: "var(--text-secondary)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "50%",
          width: 40,
          height: 40,
          transition: "all 0.25s ease",
          "&:hover": {
            color: "var(--accent-gold)",
            borderColor: "var(--accent-gold)",
            background: "rgba(232,196,74,0.08)",
            transform: "rotate(20deg)",
          },
        }}
      >
        {mode === "dark" ? (
          <LightModeIcon sx={{ fontSize: 18 }} />
        ) : (
          <DarkModeIcon sx={{ fontSize: 18 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
