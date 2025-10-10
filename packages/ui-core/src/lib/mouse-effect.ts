/**
 * Mouse move effect for background grid
 * Tracks mouse position and updates CSS custom properties for the shimmer effect
 */

export function initializeMouseEffect() {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Initialize mouse position variables
  document.documentElement.style.setProperty('--mouse-x', '50%');
  document.documentElement.style.setProperty('--mouse-y', '50%');

  // Add mouse move event listener
  window.addEventListener('mousemove', e => {
    // Use requestAnimationFrame for performance
    requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
    });
  });

  // Cleanup function
  return () => {
    window.removeEventListener('mousemove', () => {});
  };
}

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  initializeMouseEffect();
}

