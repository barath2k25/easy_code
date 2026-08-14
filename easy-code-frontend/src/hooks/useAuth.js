/**
 * useAuth.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom React hook that manages the full authentication lifecycle:
 *  – reads persisted session on mount
 *  – provides login / register / logout handlers
 *  – exposes { authUser, welcomeBanner, handleAuthSuccess, handleLogout,
 *              dismissBanner }
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { readSession, clearSession } from '../services/authService';

export default function useAuth() {
  const [authUser, setAuthUser] = useState(() => {
    const session = readSession();
    return session ? session.user : null;
  });

  const [welcomeBanner, setWelcomeBanner] = useState(null);

  /** Called by LoginPage after a successful login / register response */
  const handleAuthSuccess = ({ username, email, message, tip }) => {
    setAuthUser({ username, email });
    setWelcomeBanner({ message, tip });
    setTimeout(() => setWelcomeBanner(null), 7000);
  };

  /** Sign out – clears token, user data and resets state */
  const handleLogout = () => {
    clearSession();
    setAuthUser(null);
    setWelcomeBanner(null);
  };

  /** Dismiss the welcome banner manually */
  const dismissBanner = () => setWelcomeBanner(null);

  return {
    authUser,
    welcomeBanner,
    handleAuthSuccess,
    handleLogout,
    dismissBanner,
  };
}
