/**
 * IDEPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The main workspace page — split-pane IDE with live preview on the left
 * and Monaco code editor on the right, plus a developer console.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/layout/Header';
import WelcomeBanner from '../components/layout/WelcomeBanner';
import Toast from '../components/layout/Toast';
import PreviewPanel from '../components/preview/PreviewPanel';
import ConsolePanel from '../components/console/ConsolePanel';
import EditorPanel from '../components/editor/EditorPanel';
import useWorkspace from '../hooks/useWorkspace';
import useConsole from '../hooks/useConsole';
import useToast from '../hooks/useToast';

export default function IDEPage({ authUser, welcomeBanner, onLogout, onDismissBanner }) {
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
  } = useWorkspace(showToast);

  const { consoleLogs, isConsoleCollapsed, clearLogs, toggleCollapsed } = useConsole();

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

  return (
    <div className="app-container">
      {/* Welcome Banner */}
      <WelcomeBanner banner={welcomeBanner} onDismiss={onDismissBanner} />

      {/* Top Header */}
      <Header
        workspace={workspace}
        authUser={authUser}
        onTemplateChange={handleTemplateChange}
        onReset={handleReset}
        onLogout={onLogout}
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
