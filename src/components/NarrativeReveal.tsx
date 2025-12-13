import { motion, Variants } from 'framer-motion';
import { useNarrativeReveal, easing, prefersReducedMotion } from '@/hooks/useIntelligentMotion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface NarrativeRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'fade' | 'slide' | 'scale' | 'blur';
  once?: boolean;
  stagger?: number;
}

export const NarrativeReveal = ({
  children,
  className,
  delay = 0,
  duration = 0.8,
  type = 'fade',
  once = true,
  stagger,
}: NarrativeRevealProps) => {
  const { ref, isVisible, distanceFromCenter } = useNarrativeReveal({ once });
  
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  const variants: Record<string, Variants> = {
    fade: {
      hidden: { opacity: 0, y: 24 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration,
          delay,
          ease: easing.narrative,
        }
      },
    },
    slide: {
      hidden: { opacity: 0, x: -32 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: {
          duration,
          delay,
          ease: easing.narrative,
        }
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration,
          delay,
          ease: easing.settle,
        }
      },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(8px)' },
      visible: { 
        opacity: 1, 
        filter: 'blur(0px)',
        transition: {
          duration: duration * 1.2,
          delay,
          ease: easing.narrative,
        }
      },
    },
  };

  return (
    <motion.div
      ref={ref as any}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants[type]}
    >
      {children}
    </motion.div>
  );
};

// Staggered children reveal
export const StaggerReveal = ({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  const { ref, isVisible } = useNarrativeReveal({ once: true });

  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref as any}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: easing.narrative,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
