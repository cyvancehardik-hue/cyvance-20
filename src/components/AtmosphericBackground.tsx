import { motion } from 'framer-motion';
import { useScrollCamera, prefersReducedMotion } from '@/hooks/useIntelligentMotion';
import { useEffect, useState } from 'react';

export const AtmosphericBackground = () => {
  const { progress, isSettling } = useScrollCamera();
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (prefersReducedMotion()) {
    return (
      <div className="fixed inset-0 -z-10 bg-background" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base layer */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Atmospheric gradient - reacts to mouse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(ellipse 80% 50% at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--muted) / 0.15) 0%, transparent 50%)`,
        }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Depth layers - move with scroll */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 30% 20%, hsl(var(--accent) / 0.08) 0%, transparent 60%)',
        }}
        animate={{
          y: progress * -100,
        }}
        transition={{ duration: 0, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 70% 80%, hsl(var(--muted) / 0.1) 0%, transparent 50%)',
        }}
        animate={{
          y: progress * -50,
        }}
        transition={{ duration: 0, ease: 'linear' }}
      />

      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 0%, hsl(var(--background)) 100%)',
          opacity: 0.4,
        }}
      />
    </div>
  );
};
