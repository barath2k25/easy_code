/**
 * Header.jsx — Top nav bar with motion hover effects. No auth/user section.
 */

import { motion } from 'framer-motion';
import { RotateCcw, Share2, Download, ChevronDown } from 'lucide-react';
import { templates } from '../../data/templates';
import { exportAsZip, generateShareLink } from '../../services/workspaceService';

export default function Header({ workspace, onTemplateChange, onReset, showToast }) {

  const handleDownloadZip = async () => {
    try {
      await exportAsZip(workspace);
      showToast('Project ZIP downloaded!');
    } catch {
      showToast('Failed to generate ZIP.');
    }
  };

  const handleShareProject = () => {
    try {
      generateShareLink(workspace);
      showToast('Shareable link copied to clipboard!');
    } catch {
      showToast('Failed to generate link.');
    }
  };

  return (
    <motion.header
      className="app-header"
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Brand */}
      <div className="logo-section">
        <motion.div
          className="logo-icon"
          whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
        >
          &lt;/&gt;
        </motion.div>
        <span className="logo-text">EASY CODE</span>
        <span className="logo-badge">IDE</span>
      </div>

      {/* Actions */}
      <div className="header-actions">
        {/* Template Selector */}
        <div className="template-selector">
          <label htmlFor="presets">Preset:</label>
          <div className="select-wrapper">
            <select
              id="presets"
              className="template-select"
              value={workspace.templateId}
              onChange={onTemplateChange}
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
              <option value="custom" disabled>✏ Custom</option>
            </select>
            <ChevronDown size={12} className="select-chevron" />
          </div>
        </div>

        {/* Reset */}
        <motion.button
          className="btn-action"
          onClick={onReset}
          title="Reset to template defaults"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94, rotate: -30 }}
        >
          <RotateCcw size={14} />
          <span className="mobile-hidden">Reset</span>
        </motion.button>

        {/* Share */}
        <motion.button
          className="btn-action"
          onClick={handleShareProject}
          title="Copy shareable link"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          <Share2 size={14} />
          <span className="mobile-hidden">Share</span>
        </motion.button>

        {/* Export ZIP */}
        <motion.button
          className="btn-action primary"
          onClick={handleDownloadZip}
          title="Download as ZIP"
          whileHover={{ scale: 1.05, boxShadow: '0 0 18px rgba(99,102,241,0.5)' }}
          whileTap={{ scale: 0.94 }}
        >
          <Download size={14} />
          <span className="mobile-hidden">Export ZIP</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
