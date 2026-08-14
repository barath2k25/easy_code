/**
 * SplashPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Animated landing page — code/number rain moving UP and DOWN in alternating
 * columns, with the EASY CODE brand and a "Start Coding" CTA.
 * No login. No backend. Pure vibe.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useState } from 'react';
import { generateMatrixColumns } from '../data/matrixSnippets';

const codeColumns = generateMatrixColumns(60);

export default function SplashPage({ onStart }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="splash-root">

      {/* ── Animated Matrix Rain Background ── */}
      <div className="splash-bg">
        <div className="splash-grid" />

        <div className="splash-columns">
          {codeColumns.map((col, colIdx) => {
            const goesUp = colIdx % 2 === 0;
            const speed  = 12 + (colIdx % 7) * 3; // 12s – 30s variety
            return (
              <div
                key={colIdx}
                className={`splash-col ${goesUp ? 'go-up' : 'go-down'}`}
                style={{
                  animationDuration: `${speed}s`,
                  animationDelay: `${-(colIdx * 0.6) % speed}s`,
                  opacity: 0.13 + (colIdx % 5) * 0.04,
                }}
              >
                {/* Duplicate content so scroll loops seamlessly */}
                {[...col, ...col, ...col].map((line, i) => (
                  <div key={i} className="splash-col-line">{line}</div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Radial dark vignette so centre is readable */}
        <div className="splash-vignette" />
      </div>

      {/* ── Centre Content ── */}
      <div className={`splash-content ${visible ? 'splash-visible' : ''}`}>

        {/* Logo mark */}
        <div className="splash-logo-mark">
          <span className="splash-bracket">&lt;</span>
          <span className="splash-slash">/</span>
          <span className="splash-bracket">&gt;</span>
        </div>

        {/* Brand name */}
        <h1 className="splash-title">
          EASY<span className="splash-title-accent"> CODE</span>
        </h1>

        {/* Tagline */}
        <p className="splash-tagline">
          Write · Preview · Export &nbsp;—&nbsp; instantly in your browser
        </p>

        {/* Feature pills */}
        <div className="splash-pills">
          <span className="splash-pill">HTML</span>
          <span className="splash-pill">CSS</span>
          <span className="splash-pill">JavaScript</span>
          <span className="splash-pill">Live Preview</span>
          <span className="splash-pill">Export ZIP</span>
        </div>

        {/* CTA */}
        <button
          id="btn-start-coding"
          className="splash-cta"
          onClick={onStart}
        >
          <span>Start Coding</span>
          <span className="splash-cta-arrow">→</span>
        </button>

        <p className="splash-footer-note">No account needed · Works offline · Free forever</p>
      </div>
    </div>
  );
}
