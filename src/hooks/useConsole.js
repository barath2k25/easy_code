/**
 * useConsole.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Listens for postMessage events from the preview iframe and maintains
 * a log list consumable by the ConsolePanel component.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';

export default function useConsole() {
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [isConsoleCollapsed, setIsConsoleCollapsed] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'CONSOLE_LOG') {
        const { logType, message } = event.data;
        setConsoleLogs((prev) => [
          ...prev,
          {
            type: logType,
            message,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          },
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const clearLogs = () => setConsoleLogs([]);
  const toggleCollapsed = () => setIsConsoleCollapsed((c) => !c);

  const addSystemLog = (message, isError = false) => {
    setConsoleLogs((prev) => [
      ...prev,
      {
        type: isError ? 'error' : 'system',
        message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      },
    ]);
  };

  return { consoleLogs, isConsoleCollapsed, clearLogs, toggleCollapsed, addSystemLog };
}
