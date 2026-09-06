import { useEffect, useRef } from 'react';

export function useAnimationFrame(callback: (deltaTime: number, elapsedTime: number) => void, active = true) {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return;

    const animate = (time: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = time;
      }
      if (previousTimeRef.current !== null) {
        const deltaTime = (time - previousTimeRef.current) / 1000;
        const elapsedTime = (time - startTimeRef.current) / 1000;
        callbackRef.current(deltaTime, elapsedTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      previousTimeRef.current = null;
      startTimeRef.current = null;
    };
  }, [active]);
}
