import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerChildren = 0.12,
  delayChildren = 0.1,
  className = '',
  style,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};
