/**
 * ConsolePanel.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Developer console — resizable height via drag handle, shows real console
 * output from the user's code (log / warn / error). Auto-scrolls to latest.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ChevronUp, Trash2,
  Info, AlertTriangle, XCircle, Terminal,
} from 'lucide-react';

const LOG_COLORS = {
  log:   { border: '#6366f1', bg: 'rgba(99,102,241,0.06)',  text: '#c7d2fe' },
  warn:  { border: '#f59e0b', bg: 'rgba(245,158,11,0.07)', text: '#fde047' },
  error: { border: '#ec4899', bg: 'rgba(236,72,153,0.07)', text: '#fda4af' },
  info:  { border: '#06b6d4', bg: 'rgba(6,182,212,0.06)',  text: '#99f6e4' },
};

function LogIcon({ type }) {
  const s = { width: 13, height: 13, flexShrink: 0 };
  if (type === 'error') return <XCircle style={{ ...s, color: '#ec4899' }} />;
  if (type === 'warn')  return <AlertTriangle style={{ ...s, color: '#f59e0b' }} />;
  if (type === 'info')  return <Info style={{ ...s, color: '#06b6d4' }} />;
  return <Info style={{ ...s, color: '#6366f1' }} />;
}

export default function ConsolePanel({
  consoleLogs,
  isConsoleCollapsed,
  onClear,
  onToggle,
}) {
  const logListRef  = useRef(null);
  const dragRef     = useRef(null);
  const [height, setHeight]       = useState(200);
  const [isDragging, setIsDragging] = useState(false);
  const startY  = useRef(0);
  const startH  = useRef(200);

  // Auto-scroll to bottom on new log
  useEffect(() => {
    if (logListRef.current && !isConsoleCollapsed) {
      logListRef.current.scrollTop = logListRef.current.scrollHeight;
    }
  }, [consoleLogs, isConsoleCollapsed]);

  // ── Drag-to-resize ──
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    startY.current = e.clientY;
    startH.current = height;
    setIsDragging(true);
  }, [height]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => {
      const delta = startY.current - e.clientY; // drag up → taller
      const next  = Math.min(600, Math.max(80, startH.current + delta));
      setHeight(next);
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);

  const panelHeight = isConsoleCollapsed ? 38 : height;

  return (
    <div
      className="console-panel"
      style={{ height: panelHeight, transition: isConsoleCollapsed ? 'height 0.25s ease' : 'none' }}
    >
      {/* Drag handle — only when expanded */}
      {!isConsoleCollapsed && (
        <div
          ref={dragRef}
          className={`console-resize-handle ${isDragging ? 'dragging' : ''}`}
          onMouseDown={onMouseDown}
          title="Drag to resize console"
        />
      )}

      {/* Header bar */}
      <div className="console-header" onClick={onToggle}>
        <span className="console-title">
          <Terminal size={13} />
          Console
          {consoleLogs.length > 0 && (
            <span className="console-count">{consoleLogs.length}</span>
          )}
        </span>
        <div className="console-actions" onClick={(e) => e.stopPropagation()}>
          {consoleLogs.length > 0 && (
            <button className="btn-console-clear" onClick={onClear} title="Clear Console">
              <Trash2 size={12} />
            </button>
          )}
          <button className="btn-console-clear" title={isConsoleCollapsed ? 'Expand' : 'Collapse'}>
            {isConsoleCollapsed ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* Log list */}
      {!isConsoleCollapsed && (
        <div className="console-log-list" ref={logListRef}>
          {consoleLogs.length === 0 ? (
            <div className="console-empty">
              <Terminal size={22} style={{ opacity: 0.2, marginBottom: 8 }} />
              <div>No output yet.</div>
              <div style={{ fontSize: 11, marginTop: 4 }}>
                Use <code>console.log()</code> in your JS to see output here.
              </div>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {consoleLogs.map((log, idx) => {
                const c = LOG_COLORS[log.type] || LOG_COLORS.log;
                return (
                  <motion.div
                    key={idx}
                    className="log-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      borderLeftColor: c.border,
                      background: c.bg,
                      color: c.text,
                    }}
                  >
                    <span className="log-time">{log.timestamp}</span>
                    <LogIcon type={log.type} />
                    <span className="log-message">{log.message}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
}
