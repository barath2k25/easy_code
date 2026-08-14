/**
 * SplashPage.jsx — Animated landing page with Framer Motion
 * Code/binary/hex rain scrolling UP and DOWN, rich brand, no login needed.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateMatrixColumns } from '../data/matrixSnippets';

const codeColumns = generateMatrixColumns(45);

// Column color themes — alternating for visual depth
const COL_COLORS = [
  '#6366f1', // indigo
  '#a855f7', // purple
  '#06b6d4', // cyan
  '#6366f1',
  '#ec4899', // pink (sparse)
];

export default function SplashPage({ onStart }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="splash-root">

      {/* ── Animated matrix columns background ── */}
      <div className="splash-bg">
        <div className="splash-grid" />

        <div className="splash-columns">
          {codeColumns.map((col, colIdx) => {
            const goesUp  = colIdx % 2 === 0;
            const speed   = 14 + (colIdx % 9) * 2.5;   // 14s – 34s
            const baseOpacity = 0.22 + (colIdx % 6) * 0.06; // 0.22 – 0.52
            const color   = COL_COLORS[colIdx % COL_COLORS.length];

            return (
              <div
                key={colIdx}
                className={`splash-col ${goesUp ? 'go-up' : 'go-down'}`}
                style={{
                  animationDuration: `${speed}s`,
                  animationDelay: `${-(colIdx * 0.7) % speed}s`,
                  opacity: baseOpacity,
                  color,
                }}
              >
                {[...col, ...col, ...col].map((line, i) => (
                  <div key={i} className="splash-col-line">{line}</div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Vignette — darkens edges */}
        <div className="splash-vignette" />
      </div>

      {/* ── Centre content with Framer Motion entrance ── */}
      <AnimatePresence>
        {ready && (
          <motion.div
            className="splash-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Pulsing logo mark */}
            <motion.div
              className="splash-logo-mark"
              animate={{ filter: [
                'drop-shadow(0 0 8px rgba(99,102,241,0.5))',
                'drop-shadow(0 0 24px rgba(168,85,247,0.9))',
                'drop-shadow(0 0 8px rgba(99,102,241,0.5))',
              ]}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="splash-bracket">&lt;</span>
              <span className="splash-slash">/</span>
              <span className="splash-bracket">&gt;</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="splash-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              EASY<span className="splash-title-accent"> CODE</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="splash-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Write · Preview · Export &nbsp;—&nbsp; instantly in your browser
            </motion.p>

            {/* Feature pills with staggered entrance */}
            <motion.div
              className="splash-pills"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } },
              }}
            >
              {['HTML', 'CSS', 'JavaScript', 'Live Preview', 'Export ZIP', 'Code Share'].map((pill) => (
                <motion.span
                  key={pill}
                  className="splash-pill"
                  variants={{
                    hidden: { opacity: 0, scale: 0.7 },
                    show:   { opacity: 1, scale: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.1, borderColor: 'rgba(99,102,241,0.9)' }}
                >
                  {pill}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.button
              id="btn-start-coding"
              className="splash-cta"
              onClick={onStart}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(168,85,247,0.7)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Start Coding</span>
              <motion.span
                className="splash-cta-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >→</motion.span>
            </motion.button>

            <motion.p
              className="splash-footer-note"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              No account needed · Works offline · Free forever
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
