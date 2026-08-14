/**
 * useToast.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Simple toast notification state manager.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useCallback } from 'react';

export default function useToast(duration = 3000) {
  const [toast, setToast] = useState({ message: '', show: false });

  const showToast = useCallback(
    (message) => {
      setToast({ message, show: true });
      setTimeout(() => setToast({ message: '', show: false }), duration);
    },
    [duration]
  );

  return { toast, showToast };
}
