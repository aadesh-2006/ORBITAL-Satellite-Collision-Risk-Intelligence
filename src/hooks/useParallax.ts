import { useEffect, useRef, useState } from 'react';

export interface ParallaxOffset {
  x: number; // Normalized -1 to 1 (current smoothed)
  y: number; // Normalized -1 to 1 (current smoothed)
  rawX: number; // Raw target X
  rawY: number; // Raw target Y
}

/**
 * useParallax provides smooth, inertial mouse coordinates normalized to [-1, 1].
 * Uses linear interpolation (lerp) on RAF for cinematic aerospace camera sway.
 */
export function useParallax(damping = 0.05): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });

  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      targetRef.current = {
        x: (e.clientX - halfWidth) / halfWidth,
        y: (e.clientY - halfHeight) / halfHeight,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const halfWidth = window.innerWidth / 2;
        const halfHeight = window.innerHeight / 2;
        targetRef.current = {
          x: (touch.clientX - halfWidth) / halfWidth,
          y: (touch.clientY - halfHeight) / halfHeight,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let isRunning = true;
    const animate = () => {
      if (!isRunning) return;

      // Lerp smoothing
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * damping;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * damping;

      setOffset({
        x: currentRef.current.x,
        y: currentRef.current.y,
        rawX: targetRef.current.x,
        rawY: targetRef.current.y,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [damping]);

  return offset;
}
