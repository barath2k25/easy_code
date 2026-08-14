/**
 * EditorPanel.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Right panel — Monaco code editor with file tabs (HTML / CSS / JS)
 * and a settings popover for font size, word wrap, and theme.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Code2, Palette, Cpu, Settings } from 'lucide-react';

const FILE_TABS = [
  { key: 'html', label: 'index.html', Icon: Code2, iconClass: 'html' },
  { key: 'css',  label: 'style.css',  Icon: Palette, iconClass: 'css' },
  { key: 'js',   label: 'script.js',  Icon: Cpu,     iconClass: 'js' },
];

export default function EditorPanel({
  workspace,
  activeTab,
  onTabChange,
  onEditorChange,
}) {
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState('on');
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  return (
    <>
      {/* Tab bar & settings toggle */}
      <div className="editor-header">
        <div className="editor-tabs">
          {FILE_TABS.map(({ key, label, Icon, iconClass }) => (
            <button
              key={key}
              className={`tab-btn ${activeTab === key ? 'active' : ''}`}
              onClick={() => onTabChange(key)}
            >
              <Icon size={14} className={`tab-icon ${iconClass}`} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="editor-settings" style={{ position: 'relative' }}>
          <button
            className="editor-config-btn"
            onClick={() => setShowSettings(!showSettings)}
            title="Editor preferences"
          >
            <Settings size={15} />
          </button>

          {showSettings && (
            <div className="settings-popover">
              <div className="settings-item">
                <label>Font Size</label>
                <select value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}>
                  {[12, 13, 14, 15, 16, 18, 20].map((s) => (
                    <option key={s} value={s}>{s}px</option>
                  ))}
                </select>
              </div>

              <div className="settings-item">
                <label>Word Wrap</label>
                <select value={wordWrap} onChange={(e) => setWordWrap(e.target.value)}>
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              </div>

              <div className="settings-item">
                <label>Editor Theme</label>
                <select value={editorTheme} onChange={(e) => setEditorTheme(e.target.value)}>
                  <option value="vs-dark">Dark Mode</option>
                  <option value="light">Light Mode</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="editor-inner">
        <Editor
          height="100%"
          language={activeTab === 'js' ? 'javascript' : activeTab}
          theme={editorTheme}
          value={workspace[activeTab]}
          onChange={onEditorChange}
          options={{
            fontSize,
            wordWrap,
            minimap: { enabled: false },
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
            automaticLayout: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            lineHeight: 22,
            padding: { top: 12, bottom: 12 },
            tabSize: 2,
          }}
          loading={
            <div className="editor-placeholder">Spinning up code compiler module...</div>
          }
        />
      </div>
    </>
  );
}
