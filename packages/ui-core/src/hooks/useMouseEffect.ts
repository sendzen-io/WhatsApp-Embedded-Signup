import { useEffect } from 'react';
import { initializeMouseEffect } from '../lib/mouse-effect';

/**
 * React hook to initialize the mouse move effect for background grid
 * @param enabled - Whether to enable the mouse effect (default: true)
 */
export function useMouseEffect(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const cleanup = initializeMouseEffect();
    
    return cleanup;
  }, [enabled]);
}

