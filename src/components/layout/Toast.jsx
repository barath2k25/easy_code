/**
 * Toast.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Global toast notification popup (bottom-right corner).
 * ─────────────────────────────────────────────────────────────────────────────
 */


import { Check } from 'lucide-react';

export default function Toast({ toast }) {
  if (!toast.show) return null;

  return (
    <div className="toast-container">
      <div className="toast">
        <Check size={14} style={{ color: 'var(--accent-cyan)' }} />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
