/**
 * welcomeTips.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Random tips shown to the user after successful login / registration.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const WELCOME_TIPS = [
  '💡 Try the CSS Animation template to create stunning visual effects!',
  '🎨 Use the Glassmorphism template to master modern UI design!',
  '⚡ Switch between Desktop, Tablet & Mobile views to make responsive designs!',
  '🔗 Hit "Share" to generate a shareable link for your project!',
  '🗜️ Export your work as a ZIP file — ready to deploy anywhere!',
  '🖥️ Use console.log() in the JS tab and see live output in the console below!',
  '🌟 Explore all presets to jumpstart your next creative project!',
];

export function getRandomTip() {
  return WELCOME_TIPS[Math.floor(Math.random() * WELCOME_TIPS.length)];
}
