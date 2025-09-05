import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NeonCursorProps {
  isExpanded?: boolean;
  onExpand?: () => void;
}

export const NeonCursor = ({ isExpanded = false, onExpand }: NeonCursorProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      onExpand?.();
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [onExpand]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={cursorRef}
          className="fixed pointer-events-none z-50 mix-blend-screen"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: isExpanded ? 3 : isClicking ? 0.8 : 1,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
            opacity: { duration: 0.2 }
          }}
        >
          {/* Outer Glow Ring */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: isExpanded ? [1, 1.5, 1] : [1, 1.1, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
          >
            <div 
              className="w-12 h-12 rounded-full border-2"
              style={{
                borderImage: "linear-gradient(45deg, hsl(var(--neon-blue)), hsl(var(--cyber-purple)), hsl(var(--neon-cyan)), hsl(var(--electric-green))) 1",
                filter: "blur(1px)",
                boxShadow: `
                  0 0 20px hsl(var(--neon-blue) / 0.6),
                  0 0 40px hsl(var(--cyber-purple) / 0.4),
                  0 0 60px hsl(var(--neon-cyan) / 0.3)
                `
              }}
            />
          </motion.div>

          {/* Inner Core */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: isExpanded ? [1, 0.5, 1] : [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div 
              className="w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))]"
              style={{
                boxShadow: `
                  inset 0 0 10px hsl(var(--neon-cyan) / 0.8),
                  0 0 15px hsl(var(--neon-blue) / 0.8),
                  0 0 30px hsl(var(--cyber-purple) / 0.6)
                `
              }}
            />
          </motion.div>

          {/* Particle Effects */}
          {isExpanded && (
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[hsl(var(--electric-green))] rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 40],
                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 40],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}

          {/* Ripple Effect on Click */}
          {isClicking && (
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 border-2 border-[hsl(var(--electric-green))] rounded-full"
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ 
                width: 100, 
                height: 100, 
                opacity: 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing cursor expansion state
export const useNeonCursor = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expand = () => {
    setIsExpanded(true);
    setTimeout(() => setIsExpanded(false), 2000); // Auto-collapse after 2 seconds
  };

  const toggle = () => {
    setIsExpanded(prev => !prev);
  };

  return { isExpanded, expand, toggle };
};