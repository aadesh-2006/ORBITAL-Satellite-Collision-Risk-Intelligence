import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 18,
  className = '',
  style,
  ...props
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPos }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, ...initialPos }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Cinematic smooth curve
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};
