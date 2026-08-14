/**
 * useWorkspace.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Manages the code workspace (HTML / CSS / JS), template switching,
 * debounced live compilation, and preview blob URL lifecycle.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from 'react';
import { templates } from '../data/templates';
import {
  loadWorkspace,
  saveWorkspace,
  compileToBlob,
  decodeShareHash,
} from '../services/workspaceService';

export default function useWorkspace(showToast) {
  // Initialise workspace: URL share → localStorage → first template
  const [workspace, setWorkspace] = useState(() => {
    const shared = decodeShareHash();
    if (shared) return { ...shared, templateId: shared.templateId || 'custom' };

    const saved = loadWorkspace();
    if (saved) return saved;

    const defaultTemplate = templates[0];
    return {
      html: defaultTemplate.html,
      css: defaultTemplate.css,
      js: defaultTemplate.js,
      templateId: defaultTemplate.id,
    };
  });

  const [activeTab, setActiveTab] = useState('html');
  const [isCompiling, setIsCompiling] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');

  const debounceRef = useRef(null);

  // Persist workspace to localStorage on every change
  useEffect(() => {
    saveWorkspace(workspace);
  }, [workspace]);

  // Debounced live compilation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsCompiling(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (iframeSrc) URL.revokeObjectURL(iframeSrc);
      const url = compileToBlob(workspace);
      setIframeSrc(url);
      setIsCompiling(false);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace.html, workspace.css, workspace.js]);

  /** Update the active tab's code */
  const handleEditorChange = (value) => {
    setWorkspace((prev) => ({ ...prev, [activeTab]: value }));
  };

  /** Switch to a different preset template */
  const handleTemplateChange = (e) => {
    const templateId = e.target.value;
    const selected = templates.find((t) => t.id === templateId);
    if (!selected) return;

    const activeTemplate = templates.find((t) => t.id === workspace.templateId);
    const hasModifications =
      (activeTemplate &&
        (workspace.html !== activeTemplate.html ||
          workspace.css !== activeTemplate.css ||
          workspace.js !== activeTemplate.js)) ||
      (!activeTemplate && workspace.templateId !== 'custom');

    if (hasModifications) {
      if (!confirm('Are you sure you want to load this template? Your unsaved custom modifications will be lost.')) {
        return;
      }
    }

    setWorkspace({
      html: selected.html,
      css: selected.css,
      js: selected.js,
      templateId: selected.id,
    });
    showToast(`Loaded ${selected.name} preset!`);
  };

  /** Load external files dragged and dropped */
  const loadDroppedFiles = (html, css, js) => {
    setWorkspace({
      html,
      css,
      js,
      templateId: 'custom',
    });
    showToast('Loaded external files!');
  };

  /** Reset workspace to template defaults */
  const handleReset = () => {
    const selected = templates.find((t) => t.id === workspace.templateId) || templates[0];
    if (confirm('Reset editor back to template defaults?')) {
      setWorkspace({
        html: selected.html,
        css: selected.css,
        js: selected.js,
        templateId: selected.id,
      });
      showToast('Workspace reset to template default!');
    }
  };

  return {
    workspace,
    activeTab,
    setActiveTab,
    isCompiling,
    iframeSrc,
    handleEditorChange,
    handleTemplateChange,
    handleReset,
    loadDroppedFiles,
  };
}
