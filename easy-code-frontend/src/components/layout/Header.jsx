/**
 * Header.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Top navigation bar — no user/logout since auth is removed.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { RotateCcw, Share2, Download } from 'lucide-react';
import { templates } from '../../data/templates';
import { exportAsZip, generateShareLink } from '../../services/workspaceService';

export default function Header({
  workspace,
  onTemplateChange,
  onReset,
  showToast,
}) {
  const handleDownloadZip = async () => {
    try {
      await exportAsZip(workspace);
      showToast('Project ZIP downloaded successfully!');
    } catch (e) {
      console.error(e);
      showToast('Failed to generate ZIP project.');
    }
  };

  const handleShareProject = () => {
    try {
      generateShareLink(workspace);
      showToast('Shareable link copied to clipboard!');
    } catch (e) {
      console.error(e);
      showToast('Failed to generate shareable link.');
    }
  };

  return (
    <header className="app-header">
      {/* Brand */}
      <div className="logo-section">
        <div className="logo-icon">&lt;/&gt;</div>
        <span className="logo-text">EASY CODE</span>
      </div>

      {/* Actions */}
      <div className="header-actions">
        {/* Template Selector */}
        <div className="template-selector">
          <label htmlFor="presets">Preset:</label>
          <select
            id="presets"
            className="template-select"
            value={workspace.templateId}
            onChange={onTemplateChange}
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
            <option value="custom" disabled>Custom Workspace</option>
          </select>
        </div>

        {/* Reset */}
        <button className="btn-action" onClick={onReset} title="Reset to template defaults">
          <RotateCcw size={14} />
          <span className="mobile-hidden">Reset</span>
        </button>

        {/* Share */}
        <button className="btn-action" onClick={handleShareProject} title="Copy share link">
          <Share2 size={14} />
          <span className="mobile-hidden">Share</span>
        </button>

        {/* Export */}
        <button className="btn-action primary" onClick={handleDownloadZip} title="Download ZIP">
          <Download size={14} />
          <span className="mobile-hidden">Export ZIP</span>
        </button>
      </div>
    </header>
  );
}
