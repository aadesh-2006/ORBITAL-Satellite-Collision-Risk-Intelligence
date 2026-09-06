import { useEffect, useState } from 'react';

export interface WindowSize {
  width: number;
  height: number;
  dpr: number;
  aspectRatio: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    dpr: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
    aspectRatio: typeof window !== 'undefined' ? window.innerWidth / (window.innerHeight || 1) : 16 / 9,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setSize({
        width,
        height,
        dpr: window.devicePixelRatio || 1,
        aspectRatio: width / (height || 1),
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
