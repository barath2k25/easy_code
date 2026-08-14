/**
 * EditorPanel.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Right panel — Monaco code editor with file tabs (HTML / CSS / JS).
 * Includes settings popover and an Import button that opens a file picker.
 * The selected files are read, separated by language, and passed to the parent
 * via the `onImport` callback.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Code2, Palette, Cpu, Settings, FolderDown } from 'lucide-react';

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
  onImport,
}) {
  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState('on');
  const [editorTheme, setEditorTheme] = useState('vs-dark');

  // Import handling
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    let html = '', css = '', js = '';
    const fileTree = {};
    const addToTree = (pathParts, fileObj) => {
      let current = fileTree;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        if (!current[part]) current[part] = { type: 'directory', children: {} };
        current = current[part].children;
      }
      const name = pathParts[pathParts.length - 1];
      current[name] = { ...fileObj, type: 'file' };
    };
    for (const file of files) {
      const ext = file.name.split('.').pop().toLowerCase();
      const text = await file.text();
      const relativePath = file.webkitRelativePath || file.name;
      const pathParts = relativePath.split('/');
      addToTree(pathParts, { name: file.name, path: relativePath, ext, content: text });
      if (ext === 'html' && !html) html = text;
      if (ext === 'css') css += `\n/* ${file.name} */\n${text}`;
      if (ext === 'js') js += `\n// ${file.name}\n${text}`;
    }
    onImport?.({ html: html || '<!-- No HTML found -->', css, js, fileTree });
  };

  return (
    <>
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
        <div className="editor-controls" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="editor-import-btn" onClick={handleImportClick} title="Import files">
            <FolderDown size={15} />
          </button>
            <input
              type="file"
              multiple
              webkitdirectory="true"
              accept=".html,.css,.js,.json,image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          <button className="editor-config-btn" onClick={() => setShowSettings(!showSettings)} title="Editor preferences">
            <Settings size={15} />
          </button>
        </div>
        {showSettings && (
          <div className="settings-popover">
            <div className="settings-item">
              <label>Font Size</label>
              <select value={fontSize} onChange={e => setFontSize(Number(e.target.value))}>
                {[12,13,14,15,16,18,20].map(s => (
                  <option key={s} value={s}>{s}px</option>
                ))}
              </select>
            </div>
            <div className="settings-item">
              <label>Word Wrap</label>
              <select value={wordWrap} onChange={e => setWordWrap(e.target.value)}>
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
            </div>
            <div className="settings-item">
              <label>Editor Theme</label>
              <select value={editorTheme} onChange={e => setEditorTheme(e.target.value)}>
                <option value="vs-dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>
          </div>
        )}
      </div>
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
          loading={<div className="editor-placeholder">Spinning up code compiler module...</div>}
        />
      </div>
    </>
  );
}
