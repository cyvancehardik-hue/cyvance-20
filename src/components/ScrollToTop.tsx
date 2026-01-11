import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/scroll";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(progress);
      setIsVisible(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollTo("top");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Scroll to top"
        >
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] opacity-20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              className="opacity-30"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={150.8}
              strokeDashoffset={150.8 - (150.8 * scrollProgress) / 100}
              className="drop-shadow-[0_0_6px_hsl(var(--neon-blue))]"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--neon-blue))" />
                <stop offset="100%" stopColor="hsl(var(--cyber-purple))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Button */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--card))] to-[hsl(var(--background))] border border-[hsl(var(--border)/0.5)] backdrop-blur-xl flex items-center justify-center shadow-lg group-hover:border-[hsl(var(--neon-blue)/0.5)] transition-all duration-300 group-hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.3)]">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowUp className="w-5 h-5 text-[hsl(var(--neon-blue))] group-hover:text-[hsl(var(--foreground))] transition-colors" />
            </motion.div>
          </div>

          {/* Hover tooltip */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border)/0.5)] text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Back to top
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
