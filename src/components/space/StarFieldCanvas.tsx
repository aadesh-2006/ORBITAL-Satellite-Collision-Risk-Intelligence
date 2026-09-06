import React, { useEffect, useRef } from 'react';
import { SpaceAtmosphere } from '../../types/story';

interface StarFieldCanvasProps {
  atmosphere?: SpaceAtmosphere;
  parallaxX?: number; // -1 to 1
  parallaxY?: number; // -1 to 1
}

interface Star {
  x: number;
  y: number;
  z: number; // depth layer (1: distant, 2: mid, 3: near)
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
}

interface CosmicDust {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
}

export const StarFieldCanvas: React.FC<StarFieldCanvasProps> = ({
  atmosphere = 'deep-space',
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const dustRef = useRef<CosmicDust[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize stars and dust particles
  useEffect(() => {
    const starCount = 280;
    const dustCount = 35;
    const stars: Star[] = [];
    const dust: CosmicDust[] = [];

    // Distant subtle stars across 3 depth strata
    for (let i = 0; i < starCount; i++) {
      const z = Math.random() < 0.65 ? 1 : Math.random() < 0.88 ? 2 : 3;
      stars.push({
        x: Math.random(),
        y: Math.random(),
        z,
        size: z === 1 ? 0.6 + Math.random() * 0.5 : z === 2 ? 1.0 + Math.random() * 0.6 : 1.6 + Math.random() * 0.8,
        baseAlpha: z === 1 ? 0.15 + Math.random() * 0.25 : z === 2 ? 0.35 + Math.random() * 0.35 : 0.6 + Math.random() * 0.35,
        twinkleSpeed: 0.5 + Math.random() * 2.0,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.000015,
        vy: (Math.random() - 0.5) * 0.000015,
      });
    }

    // Sparse cosmic dust / micrometeoroid particles
    for (let i = 0; i < dustCount; i++) {
      dust.push({
        x: Math.random(),
        y: Math.random(),
        size: 0.8 + Math.random() * 1.4,
        alpha: 0.08 + Math.random() * 0.18,
        vx: (Math.random() - 0.5) * 0.00004,
        vy: -0.00002 - Math.random() * 0.00003,
      });
    }

    starsRef.current = stars;
    dustRef.current = dust;
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let prevTime = performance.now();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - prevTime) / 1000, 0.1);
      prevTime = currentTime;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Clear with pure transparent canvas over pure black DOM bg
      ctx.clearRect(0, 0, w, h);

      // Atmosphere tuning
      const atmosphereMultiplier =
        atmosphere === 'deep-space' ? 1.0 :
        atmosphere === 'orbital' ? 0.85 :
        atmosphere === 'trajectories' ? 0.75 : 0.65;

      // Render Stars
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Drift
        star.x = (star.x + star.vx * dt * 60 + 1) % 1;
        star.y = (star.y + star.vy * dt * 60 + 1) % 1;

        // Parallax offset based on depth z
        const depthFactor = star.z * 12; // pixels of max parallax
        const px = star.x * w + parallaxX * depthFactor;
        const py = star.y * h + parallaxY * depthFactor;

        // Twinkle calculation
        const twinkle = Math.sin(currentTime * 0.001 * star.twinkleSpeed + star.twinklePhase);
        const currentAlpha = Math.max(
          0.05,
          (star.baseAlpha + twinkle * 0.12) * atmosphereMultiplier
        );

        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Dust Particles
      const dust = dustRef.current;
      for (let i = 0; i < dust.length; i++) {
        const p = dust[i];
        p.x = (p.x + p.vx * dt * 60 + 1) % 1;
        p.y = (p.y + p.vy * dt * 60 + 1) % 1;

        const px = p.x * w + parallaxX * 24;
        const py = p.y * h + parallaxY * 24;

        ctx.fillStyle = `rgba(220, 230, 240, ${(p.alpha * atmosphereMultiplier).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [atmosphere, parallaxX, parallaxY]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};
