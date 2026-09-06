import React, { useEffect, useState, useRef } from 'react';

interface TelemetryTextProps {
  text: string;
  speed?: number; // ms per step
  delay?: number; // ms delay before starting
  className?: string;
  scrambleChars?: string;
  onComplete?: () => void;
}

const DEFAULT_CHARS = '0123456789ABCDEFXYZ#<>_/-';

export const TelemetryText: React.FC<TelemetryTextProps> = ({
  text,
  speed = 22,
  delay = 0,
  className = '',
  scrambleChars = DEFAULT_CHARS,
  onComplete,
}) => {
  const [displayText, setDisplayText] = useState('');
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let iteration = 0;
    const maxIterations = text.length;

    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            })
            .join('')
        );

        iteration += 1 / 2; // Scramble twice per character
        if (iteration >= maxIterations) {
          setDisplayText(text);
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (onComplete) onComplete();
        }
      }, speed);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, delay, scrambleChars, onComplete]);

  return <span className={className}>{displayText || '\u00A0'}</span>;
};
