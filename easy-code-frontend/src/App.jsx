/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Root application component — acts as a lightweight auth guard / router.
 *
 * ┌──────────────┐      ┌──────────────┐
 * │  LoginPage   │ ───▶ │   IDEPage    │
 * │  (unauthd)   │      │  (authd)     │
 * └──────────────┘      └──────────────┘
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import LoginPage from './pages/LoginPage';
import IDEPage from './pages/IDEPage';
import useAuth from './hooks/useAuth';

export default function App() {
  const {
    authUser,
    welcomeBanner,
    handleAuthSuccess,
    handleLogout,
    dismissBanner,
  } = useAuth();

  // Auth guard — show login if not authenticated
  if (!authUser) {
    return <LoginPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <IDEPage
      authUser={authUser}
      welcomeBanner={welcomeBanner}
      onLogout={handleLogout}
      onDismissBanner={dismissBanner}
    />
  );
}
