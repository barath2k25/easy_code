/**
 * ConsolePanel.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Developer console terminal that displays logs forwarded from the preview
 * iframe via postMessage.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  Info,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

function getLogIcon(type) {
  switch (type) {
    case 'error':
      return <XCircle className="tab-icon" style={{ color: 'var(--accent-pink)' }} />;
    case 'warn':
      return <AlertTriangle className="tab-icon" style={{ color: '#f59e0b' }} />;
    default:
      return <Info className="tab-icon" style={{ color: 'var(--accent-cyan)' }} />;
  }
}

export default function ConsolePanel({
  consoleLogs,
  isConsoleCollapsed,
  onClear,
  onToggle,
}) {
  return (
    <div className={`console-panel ${isConsoleCollapsed ? 'collapsed' : ''}`}>
      <div className="console-header" onClick={onToggle}>
        <span className="console-title">
          {isConsoleCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          Developer Console ({consoleLogs.length})
        </span>
        <div className="console-actions" onClick={(e) => e.stopPropagation()}>
          {consoleLogs.length > 0 && (
            <button className="btn-console-clear" onClick={onClear} title="Clear Console Terminal">
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      {!isConsoleCollapsed && (
        <div className="console-log-list">
          {consoleLogs.length === 0 ? (
            <div className="console-empty">
              No console log outputs. Use console.log() in script.js to output statements here.
            </div>
          ) : (
            consoleLogs.map((log, index) => (
              <div key={index} className={`log-item log-${log.type}`}>
                <span className="log-time">[{log.timestamp}]</span>
                {getLogIcon(log.type)}
                <span style={{ marginLeft: '6px' }}>{log.message}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
