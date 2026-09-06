import React from 'react';
import { motion } from 'framer-motion';

interface PresentationScreenProps {
  children: React.ReactNode;
}

export const PresentationScreen: React.FC<PresentationScreenProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1320px',
        minHeight: '82vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        zIndex: 10,
      }}
    >
      {children}
    </motion.div>
  );
};
