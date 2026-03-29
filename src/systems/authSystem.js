// src/systems/authSystem.js — Authentication management via localStorage

import storage from "../utils/storage";

const USERS_KEY = "movieverse_users";
const SESSION_KEY = "movieverse_session";

export const authSystem = {
  getUsers: () => storage.get(USERS_KEY) || {},

  saveUsers: (users) => storage.set(USERS_KEY, users),

  signup: ({ name, email, password }) => {
    const users = authSystem.getUsers();
    if (users[email])
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    users[email] = { name, email, password, createdAt: Date.now() };
    authSystem.saveUsers(users);
    authSystem.startSession({ name, email });
    return { success: true };
  },

  login: ({ email, password }) => {
    const users = authSystem.getUsers();
    const user = users[email];
    if (!user)
      return { success: false, error: "No account found with this email." };
    if (user.password !== password)
      return { success: false, error: "Incorrect password." };
    authSystem.startSession({ name: user.name, email });
    return { success: true, user: { name: user.name, email } };
  },

  startSession: (user) => {
    storage.set(SESSION_KEY, { ...user, loginAt: Date.now() });
  },

  logout: () => {
    storage.remove(SESSION_KEY);
  },

  getSession: () => storage.get(SESSION_KEY),

  isLoggedIn: () => !!storage.get(SESSION_KEY),
};

export default authSystem;
