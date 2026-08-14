/**
 * WelcomeBanner.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Floating banner shown after login with a greeting and a random tip.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';

export default function WelcomeBanner({ banner, onDismiss }) {
  if (!banner) return null;

  return (
    <div className="welcome-banner">
      <button className="welcome-banner-close" onClick={onDismiss} title="Dismiss">✕</button>
      <div className="welcome-banner-title">👋 {banner.message}</div>
      <div className="welcome-banner-tip">💡 Tip: {banner.tip}</div>
    </div>
  );
}
