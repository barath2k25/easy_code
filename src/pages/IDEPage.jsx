/**
 * IDEPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Main IDE workspace — no auth required.
 * Split-pane: Live preview (left) + Monaco editor (right) + console.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react';
import Header from '../components/layout/Header';
import Toast from '../components/layout/Toast';
import PreviewPanel from '../components/preview/PreviewPanel';
import ConsolePanel from '../components/console/ConsolePanel';
import EditorPanel from '../components/editor/EditorPanel';
import useWorkspace from '../hooks/useWorkspace';
import useConsole from '../hooks/useConsole';
import useToast from '../hooks/useToast';
import { getFilesFromDataTransfer } from '../services/fileSystem';
import { FolderDown } from 'lucide-react';


export default function IDEPage() {
  const { toast, showToast } = useToast();

  const {
    workspace,
    activeTab,
    setActiveTab,
    isCompiling,
    iframeSrc,
    handleEditorChange,
    handleTemplateChange,
    handleReset,
    loadDroppedFiles,
  } = useWorkspace(showToast);

  const { consoleLogs, isConsoleCollapsed, clearLogs, toggleCollapsed, addSystemLog } = useConsole();

  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // ── Workspace Splitter Resizing ──
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const workspaceRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !workspaceRef.current) return;
      const rect = workspaceRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      if (newWidth >= 15 && newWidth <= 85) setLeftWidth(newWidth);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // ── Drag & Drop Files ──
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!isDraggingFile) setIsDraggingFile(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // Only set to false if leaving the main container
    if (e.target === e.currentTarget) setIsDraggingFile(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDraggingFile(false);

    const items = e.dataTransfer.items;
    if (!items) return;

    if (!isConsoleCollapsed) addSystemLog(`> Scanning dropped folder/files...`);
    const files = await getFilesFromDataTransfer(items);

    let htmlContent = '';
    let cssContent = '';
    let jsContent = '';
    let hasReact = false;

    // Process index.html first
    files.sort((a, b) => {
      if (a.name === 'index.html') return -1;
      if (b.name === 'index.html') return 1;
      return 0;
    });

    for (const file of files) {
      if (file.name === 'package.json' || file.name.endsWith('.jsx') || file.name.endsWith('.tsx')) {
        hasReact = true;
      }
      
      const ext = file.name.split('.').pop().toLowerCase();
      if (['html', 'css', 'js'].includes(ext)) {
        try {
          const text = await file.text();
          if (ext === 'html' && !htmlContent) {
            htmlContent = text;
            addSystemLog(`Loaded HTML: ${file.filepath}`);
          } else if (ext === 'css') {
            cssContent += `\n/* --- ${file.filepath} --- */\n${text}\n`;
            addSystemLog(`Loaded CSS: ${file.filepath}`);
          } else if (ext === 'js') {
            jsContent += `\n// --- ${file.filepath} --- \n${text}\n`;
            addSystemLog(`Loaded JS: ${file.filepath}`);
          }
        } catch (err) {
          addSystemLog(`Error reading ${file.filepath}`, true);
        }
      }
    }

    if (hasReact) {
      addSystemLog('WARNING: package.json or React files detected. This sandbox only supports static HTML/CSS/JS.', true);
    }

    if (!htmlContent && !cssContent && !jsContent) {
      addSystemLog('No valid HTML, CSS, or JS files found in drop.', true);
      return;
    }

    loadDroppedFiles(htmlContent || '<!-- No HTML found -->', cssContent, jsContent);
    addSystemLog(`> Successfully bundled and loaded project!`);
  };

  return (
    <div 
      className="app-container"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDraggingFile && (
        <div className="drop-overlay">
          <div className="drop-overlay-content">
            <FolderDown size={64} className="drop-icon" />
            <h2>Drop Project Folder</h2>
            <p>We'll magically bundle your HTML, CSS, and JS files.</p>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        workspace={workspace}
        onTemplateChange={handleTemplateChange}
        onReset={handleReset}
        showToast={showToast}
      />

      {/* Main Workspace Split Panels */}
      <main className="workspace" ref={workspaceRef}>
        {/* LEFT PANEL — Preview + Console */}
        <section className="preview-panel" style={{ width: `${leftWidth}%`, flex: 'none' }}>
          <PreviewPanel
            iframeSrc={iframeSrc}
            isCompiling={isCompiling}
            isDragging={isDragging}
          />
          <ConsolePanel
            consoleLogs={consoleLogs}
            isConsoleCollapsed={isConsoleCollapsed}
            onClear={clearLogs}
            onToggle={toggleCollapsed}
          />
        </section>

        {/* DRAGGABLE SPLITTER */}
        <div
          className={`workspace-resizer ${isDragging ? 'dragging' : ''}`}
          onMouseDown={handleMouseDown}
        />

        {/* RIGHT PANEL — Editor */}
        <section className="editor-panel" style={{ width: `${100 - leftWidth}%`, flex: 'none' }}>
          <EditorPanel
            workspace={workspace}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onEditorChange={handleEditorChange}
          />
        </section>
      </main>

      {/* Toast */}
      <Toast toast={toast} />
    </div>
  );
}
