// src/utils/validators.js — Input validation utilities

import { SARCASTIC_PASSWORD_QUOTES } from "../data/quotes";

export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("At least 1 uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("At least 1 lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("At least 1 number");
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) errors.push("At least 1 special character");
  return errors;
};

export const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
  if (score <= 2) return { level: "Weak", color: "#ff4444" };
  if (score <= 4) return { level: "Fair", color: "#ffaa00" };
  if (score <= 5) return { level: "Good", color: "#88cc00" };
  return { level: "Strong", color: "#00cc66" };
};

export const getRandomSarcasticQuote = () => {
  const idx = Math.floor(Math.random() * SARCASTIC_PASSWORD_QUOTES.length);
  return SARCASTIC_PASSWORD_QUOTES[idx];
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default { validatePassword, getPasswordStrength, getRandomSarcasticQuote, validateEmail };
