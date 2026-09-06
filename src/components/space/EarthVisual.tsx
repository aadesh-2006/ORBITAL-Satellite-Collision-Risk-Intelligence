import React from 'react';
import { motion } from 'framer-motion';

interface EarthVisualProps {
  phase: number; // 1: hidden, 2: revealing, 3+: fully active
  parallaxX?: number;
  parallaxY?: number;
  isTransitioning?: boolean;
}

export const EarthVisual: React.FC<EarthVisualProps> = ({
  phase,
  parallaxX = 0,
  parallaxY = 0,
  isTransitioning = false,
}) => {
  // Phase 1: opacity 0, Phase 2+: gradual cinematic reveal
  const isVisible = phase >= 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: isVisible ? (isTransitioning ? 0.35 : 1) : 0,
        scale: isTransitioning ? 1.35 : 1,
        y: isTransitioning ? 120 : 0,
      }}
      transition={{
        opacity: { duration: 2.4, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
      }}
      style={{
        position: 'absolute',
        bottom: '-18%',
        left: '50%',
        transform: `translate(-50%, 0) translate3d(${parallaxX * -15}px, ${parallaxY * -15}px, 0)`,
        width: 'min(720px, 60vw)',
        height: 'min(720px, 60vw)',
        pointerEvents: 'none',
        zIndex: 2,
        willChange: 'transform, opacity',
      }}
    >
      <svg
        viewBox="0 0 800 800"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Subtle atmospheric haze glow */}
          <radialGradient id="earthAtmosphereGlow" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="#000000" stopOpacity="0" />
            <stop offset="92%" stopColor="rgba(180, 220, 255, 0.08)" />
            <stop offset="98%" stopColor="rgba(140, 200, 255, 0.28)" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Deep celestial body shading: subtle illuminated crescent with dark night side */}
          <radialGradient id="earthBodyGradient" cx="42%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#0e1724" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#070c14" stopOpacity="0.98" />
            <stop offset="65%" stopColor="#020408" stopOpacity="1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </radialGradient>

          {/* Atmospheric limb rim light */}
          <linearGradient id="earthRimLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(210, 235, 255, 0.45)" />
            <stop offset="30%" stopColor="rgba(140, 200, 255, 0.2)" />
            <stop offset="65%" stopColor="rgba(50, 90, 140, 0.05)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </linearGradient>

          {/* Night side shadow mask */}
          <radialGradient id="terminatorShadow" cx="60%" cy="65%" r="55%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Subtle continental texture pattern mask */}
          <clipPath id="earthClip">
            <circle cx="400" cy="400" r="320" />
          </clipPath>
        </defs>

        {/* Outer Atmospheric Corona */}
        <circle cx="400" cy="400" r="338" fill="url(#earthAtmosphereGlow)" />

        {/* Earth Planet Sphere */}
        <g clipPath="url(#earthClip)">
          {/* Base planetary sphere */}
          <circle cx="400" cy="400" r="320" fill="url(#earthBodyGradient)" />

          {/* Subtle continent silhouettes & terrain textures */}
          <g
            opacity="0.22"
            style={{
              animation: 'earthSlowRotate 160s linear infinite',
              transformOrigin: '400px 400px',
            }}
          >
            {/* North America / Eurasia abstract coastline traces */}
            <path
              d="M 280,260 Q 320,240 370,270 T 450,250 T 520,300 T 480,360 T 420,380 T 340,350 Z"
              fill="#182638"
            />
            <path
              d="M 220,340 Q 250,330 290,370 T 320,440 T 270,490 T 210,430 Z"
              fill="#141f2e"
            />
            <path
              d="M 430,360 Q 480,340 540,380 T 590,440 T 520,490 T 460,430 Z"
              fill="#162232"
            />
            {/* Minimal city cluster night lights (tiny restrained speckles) */}
            <circle cx="340" cy="290" r="1.2" fill="rgba(255, 235, 180, 0.45)" />
            <circle cx="380" cy="300" r="0.8" fill="rgba(255, 235, 180, 0.35)" />
            <circle cx="440" cy="280" r="1.0" fill="rgba(255, 235, 180, 0.4)" />
            <circle cx="490" cy="320" r="1.1" fill="rgba(255, 235, 180, 0.3)" />
            <circle cx="460" cy="360" r="0.9" fill="rgba(255, 235, 180, 0.45)" />
            <circle cx="300" cy="370" r="1.0" fill="rgba(255, 235, 180, 0.35)" />
          </g>

          {/* Terminator shadow overlay */}
          <circle cx="400" cy="400" r="320" fill="url(#terminatorShadow)" />

          {/* Thin cloud filament lines */}
          <path
            d="M 120,320 Q 260,290 400,320 T 680,300"
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="blur(4px)"
          />
          <path
            d="M 160,400 Q 300,380 440,410 T 660,390"
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="blur(6px)"
          />
        </g>

        {/* Razor-thin atmospheric limb crescent */}
        <circle
          cx="400"
          cy="400"
          r="320"
          fill="none"
          stroke="url(#earthRimLight)"
          strokeWidth="1.6"
        />
      </svg>
    </motion.div>
  );
};
