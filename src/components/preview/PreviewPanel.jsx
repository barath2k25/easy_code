/**
 * PreviewPanel.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Left panel — live preview iframe with viewport controls and refresh button.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useState } from 'react';
import { Play, Monitor, Tablet, Smartphone } from 'lucide-react';

export default function PreviewPanel({ iframeSrc, isCompiling, isDragging }) {
  const iframeRef = useRef(null);
  const [viewport, setViewport] = useState('desktop');

  return (
    <>
      {/* Preview Header */}
      <div className="preview-header">
        <div className="preview-title">
          <span className={`status-dot ${isCompiling ? 'compiling' : ''}`} />
          <span>Live Preview</span>
        </div>

        {/* Viewport Controls */}
        <div className="viewport-controls">
          {[
            { id: 'desktop', icon: Monitor, label: 'Desktop' },
            { id: 'tablet', icon: Tablet, label: 'Tablet' },
            { id: 'mobile', icon: Smartphone, label: 'Mobile' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`btn-viewport ${viewport === id ? 'active' : ''}`}
              onClick={() => setViewport(id)}
              title={`${label} View`}
            >
              <Icon size={14} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <button
          className="btn-action"
          onClick={() => { if (iframeRef.current) { const currentSrc = iframeRef.current.src; iframeRef.current.src = currentSrc; } }}
          title="Force reload preview frame"
          style={{ padding: '6px 10px', height: '32px' }}
        >
          <Play size={12} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Sandboxed iframe container */}
      <div className="preview-canvas-container">
        <div className={`device-frame ${viewport}`}>
          {iframeSrc ? (
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              className="preview-iframe"
              title="Easy Code Sandbox Preview"
              sandbox="allow-scripts allow-modals allow-same-origin"
              style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
            />
          ) : (
            <div style={{ padding: '20px', color: 'var(--text-muted)' }}>
              Initialising live environment...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
