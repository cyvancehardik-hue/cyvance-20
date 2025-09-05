import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NeonCursor, useNeonCursor } from "./NeonCursor";
import { Zap, Circle, Target } from "lucide-react";

export const NeonCursorDemo = () => {
  const { isExpanded, expand, toggle } = useNeonCursor();
  const [clickCount, setClickCount] = useState(0);

  const handleExpand = () => {
    expand();
    setClickCount(prev => prev + 1);
  };

  const handleToggle = () => {
    toggle();
    setClickCount(prev => prev + 1);
  };

  return (
    <section className="container mx-auto py-20 md:py-32 relative overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2 
          className="font-display text-3xl md:text-4xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Interactive Neon
          <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
            Cursor Experience
          </span>
        </motion.h2>
        <motion.p 
          className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experience our premium neon cursor that follows your mouse and creates spectacular visual effects when you interact with elements.
        </motion.p>
      </div>

      {/* Demo Area */}
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="glow-card rounded-2xl p-12 text-center space-y-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {/* Expand Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleExpand}
                variant="hero"
                size="lg"
                className="w-full h-20 text-lg group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--cyber-purple)/0.2)]"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <Zap className="mr-2 h-6 w-6" />
                Expand Cursor
              </Button>
            </motion.div>

            {/* Toggle Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleToggle}
                variant="neon"
                size="lg"
                className="w-full h-20 text-lg group"
              >
                <Circle className="mr-2 h-6 w-6" />
                Toggle Mode
              </Button>
            </motion.div>

            {/* Target Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                onClick={handleExpand}
                variant="outline"
                size="lg"
                className="w-full h-20 text-lg group border-2 border-[hsl(var(--neon-cyan)/0.5)] hover:border-[hsl(var(--neon-cyan))] hover:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.4)]"
              >
                <Target className="mr-2 h-6 w-6" />
                Target Effect
              </Button>
              
              {/* Pulsing rings around target button */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-[hsl(var(--neon-cyan)/0.3)] pointer-events-none"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            className="flex justify-center items-center gap-8 pt-8 border-t border-border/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-2xl font-display text-glow">
                {clickCount}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Interactions
              </div>
            </div>
            <div className="h-8 w-px bg-border/50" />
            <div className="text-center">
              <div className="text-2xl font-display text-glow">
                {isExpanded ? "ON" : "OFF"}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                Enhanced Mode
              </div>
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div 
            className="text-sm text-muted-foreground space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>Move your mouse around to see the neon cursor in action</p>
            <p>Click any button to trigger expansion effects</p>
            <p className="text-[hsl(var(--neon-blue))]">Experience premium interactive design</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Neon Cursor Component */}
      <NeonCursor isExpanded={isExpanded} onExpand={handleExpand} />

      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[hsl(var(--neon-blue)/0.1)] blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-[hsl(var(--cyber-purple)/0.1)] blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
};