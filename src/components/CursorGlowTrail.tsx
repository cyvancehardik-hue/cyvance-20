import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface CursorGlowTrailProps {
  trailLength?: number;
  glowColor?: string;
  glowSize?: number;
  fadeDelay?: number;
}

export const CursorGlowTrail = ({
  trailLength = 20,
  glowColor = "var(--neon-cyan)",
  glowSize = 24,
  fadeDelay = 150,
}: CursorGlowTrailProps) => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const idCounter = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  const addPoint = useCallback((x: number, y: number) => {
    const distance = Math.hypot(x - lastPosition.current.x, y - lastPosition.current.y);
    
    // Only add point if moved enough distance
    if (distance < 8) return;
    
    lastPosition.current = { x, y };
    
    const newPoint: TrailPoint = {
      id: idCounter.current++,
      x,
      y,
      timestamp: Date.now(),
    };

    setTrail((prev) => {
      const updated = [...prev, newPoint];
      return updated.slice(-trailLength);
    });
  }, [trailLength]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        addPoint(e.clientX, e.clientY);
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [addPoint, isVisible]);

  // Clean up old points
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((p) => now - p.timestamp < fadeDelay * 2));
    }, fadeDelay);

    return () => clearInterval(cleanup);
  }, [fadeDelay]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {trail.map((point, index) => {
          const age = (Date.now() - point.timestamp) / fadeDelay;
          const scale = Math.max(0.2, 1 - age * 0.4);
          const opacity = Math.max(0, 1 - age * 0.5);

          return (
            <motion.div
              key={point.id}
              className="absolute rounded-full"
              style={{
                left: point.x,
                top: point.y,
                width: glowSize * scale,
                height: glowSize * scale,
                background: `radial-gradient(circle, hsl(${glowColor} / ${opacity * 0.8}) 0%, hsl(${glowColor} / ${opacity * 0.4}) 40%, transparent 70%)`,
                boxShadow: `
                  0 0 ${glowSize * 0.5}px hsl(${glowColor} / ${opacity * 0.6}),
                  0 0 ${glowSize}px hsl(${glowColor} / ${opacity * 0.4}),
                  0 0 ${glowSize * 1.5}px hsl(${glowColor} / ${opacity * 0.2})
                `,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: opacity * 0.7,
                scale: scale,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.1,
                ease: "linear"
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Main cursor glow */}
      {isVisible && trail.length > 0 && (
        <motion.div
          className="absolute rounded-full mix-blend-screen"
          style={{
            left: lastPosition.current.x,
            top: lastPosition.current.y,
            width: glowSize * 1.5,
            height: glowSize * 1.5,
            background: `radial-gradient(circle, hsl(${glowColor} / 0.9) 0%, hsl(${glowColor} / 0.5) 30%, transparent 70%)`,
            boxShadow: `
              0 0 ${glowSize}px hsl(${glowColor} / 0.8),
              0 0 ${glowSize * 2}px hsl(${glowColor} / 0.5),
              0 0 ${glowSize * 3}px hsl(${glowColor} / 0.3)
            `,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: trail[trail.length - 1]?.x - lastPosition.current.x || 0,
            y: trail[trail.length - 1]?.y - lastPosition.current.y || 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
        />
      )}
    </div>
  );
};

// Minimal trail for performance-conscious usage
export const CursorGlowMinimal = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-40 mix-blend-screen"
          style={{
            left: position.x,
            top: position.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(var(--neon-cyan) / 0.8) 0%, hsl(var(--neon-cyan) / 0.4) 40%, transparent 70%)",
              boxShadow: `
                0 0 20px hsl(var(--neon-cyan) / 0.6),
                0 0 40px hsl(var(--neon-cyan) / 0.4),
                0 0 60px hsl(var(--neon-cyan) / 0.2)
              `,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CursorGlowTrail;
