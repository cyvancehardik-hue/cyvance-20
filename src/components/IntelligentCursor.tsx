import { motion, useSpring, useTransform } from 'framer-motion';
import { useIntelligentCursor } from '@/hooks/useIntelligentCursor';
import { prefersReducedMotion } from '@/hooks/useIntelligentMotion';

export const IntelligentCursor = () => {
  const cursor = useIntelligentCursor();
  
  // Don't render on touch devices or reduced motion
  if (typeof window !== 'undefined' && ('ontouchstart' in window || prefersReducedMotion())) {
    return null;
  }

  // Spring physics for smooth following
  const springConfig = { damping: 35, stiffness: 400, mass: 0.5 };
  const x = useSpring(cursor.x, springConfig);
  const y = useSpring(cursor.y, springConfig);

  // Size based on hover state
  const baseSize = cursor.isHovering ? 48 : 16;
  const size = cursor.isPressed ? baseSize * 0.85 : baseSize;

  // Opacity based on velocity - faster = more transparent
  const opacity = Math.max(0.4, 1 - cursor.velocity / 50);

  if (!cursor.isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size,
          height: size,
          opacity,
        }}
        transition={{
          width: { type: 'spring', damping: 30, stiffness: 300 },
          height: { type: 'spring', damping: 30, stiffness: 300 },
          opacity: { duration: 0.2 },
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-foreground/90"
          style={{
            transform: cursor.isPressed ? 'scale(0.85)' : 'scale(1)',
            transition: 'transform 0.1s cubic-bezier(0.32, 0, 0.24, 1)',
          }}
        />
      </motion.div>

      {/* Trailing ring for interactive states */}
      {cursor.isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[9998] rounded-full border border-foreground/20"
          style={{
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 16, height: 16, opacity: 0 }}
          animate={{
            width: 64,
            height: 64,
            opacity: 0.5,
          }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200,
          }}
        />
      )}
    </>
  );
};
