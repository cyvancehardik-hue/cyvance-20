import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

// Animated Grid Component
const AnimatedGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 170, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 170, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particleCount = 50;
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[hsl(var(--neon-blue))] rounded-full opacity-70"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Wave Gradient Animation
const WaveGradient = () => {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        background: [
          "radial-gradient(circle at 20% 50%, hsl(var(--neon-blue) / 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 80% 20%, hsl(var(--cyber-purple) / 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 40% 80%, hsl(var(--neon-cyan) / 0.1) 0%, transparent 50%)",
          "radial-gradient(circle at 20% 50%, hsl(var(--neon-blue) / 0.1) 0%, transparent 50%)",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Scanning Line Effect
const ScanLine = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--electric-green))] to-transparent absolute"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export const FuturisticBackground = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth) * 100;
      const yPercent = (clientY / innerHeight) * 100;
      
      containerRef.current.style.setProperty('--mouse-x', `${xPercent}%`);
      containerRef.current.style.setProperty('--mouse-y', `${yPercent}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-background"
    >
      {/* Animated Grid */}
      <AnimatedGrid />
      
      {/* Wave Gradient */}
      <WaveGradient />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Scan Line */}
      <ScanLine />
      
      {/* Mouse-following gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--neon-blue) / 0.05), transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};