/**
 * App.jsx — Root with animated page transition between Splash and IDE
 */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashPage from './pages/SplashPage';
import IDEPage from './pages/IDEPage';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0 }}
        >
          <SplashPage onStart={() => setStarted(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="ide"
          initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column' }}
        >
          <IDEPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
