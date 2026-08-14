/**
 * Header.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Top navigation bar with logo, preset selector, action buttons,
 * user info, and logout.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import {
  RotateCcw,
  Share2,
  Download,
  User,
  LogOut,
} from 'lucide-react';
import { templates } from '../../data/templates';
import { exportAsZip, generateShareLink } from '../../services/workspaceService';

export default function Header({
  workspace,
  authUser,
  onTemplateChange,
  onReset,
  onLogout,
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

        {/* User / Logout */}
        <div className="header-user-section">
          <div className="header-user-info">
            <User size={14} style={{ color: 'var(--primary)' }} />
            <span className="header-username">{authUser.username}</span>
          </div>
          <button
            className="btn-action"
            onClick={onLogout}
            title="Sign out"
            style={{ padding: '6px 12px', height: '32px', gap: '6px' }}
          >
            <LogOut size={13} />
            <span className="mobile-hidden">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
