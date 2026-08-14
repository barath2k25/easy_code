/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Root component — shows a splash landing page first, then the IDE.
 * No auth required. Pure code viewer / playground.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import SplashPage from './pages/SplashPage';
import IDEPage from './pages/IDEPage';

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <SplashPage onStart={() => setStarted(true)} />;
  }

  return <IDEPage />;
}
