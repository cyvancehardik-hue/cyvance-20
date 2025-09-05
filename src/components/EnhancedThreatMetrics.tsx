import { Shield, Zap, Eye, Lock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Enhanced Animated Counter with scroll trigger
const ScrollTriggeredCounter = ({ 
  value, 
  suffix = "", 
  duration = 2000,
  inView 
}: { 
  value: number; 
  suffix?: string; 
  duration?: number;
  inView: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    
    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;
    
    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutCubic);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    
    requestAnimationFrame(updateValue);
  }, [value, duration, inView]);

  return (
    <span className="tabular-nums font-display text-glow">
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const metrics = [
  {
    icon: Shield,
    value: 99.7,
    suffix: "%",
    label: "Threat Detection Rate",
    color: "neon-blue",
    delay: 0
  },
  {
    icon: Zap,
    value: 18,
    suffix: "ms",
    label: "Average Response Time",
    color: "electric-green",
    delay: 0.1
  },
  {
    icon: Eye,
    value: 247,
    suffix: "/7",
    label: "Active Monitoring",
    color: "cyber-purple",
    delay: 0.2
  },
  {
    icon: Lock,
    value: 15,
    suffix: "M+",
    label: "Endpoints Protected",
    color: "neon-cyan",
    delay: 0.3
  }
];

export const EnhancedThreatMetrics = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ 
            opacity: 0, 
            y: 50,
            scale: 0.8,
            rotateX: -15
          }}
          animate={inView ? { 
            opacity: 1, 
            y: 0,
            scale: 1,
            rotateX: 0
          } : {}}
          transition={{
            duration: 0.8,
            delay: metric.delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{
            scale: 1.05,
            y: -10,
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          className="group relative perspective-1000"
        >
          {/* Holographic backdrop */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-white/10"
            whileHover={{
              background: `linear-gradient(135deg, hsl(var(--${metric.color}) / 0.1), hsl(var(--background) / 0.8))`,
              borderColor: `hsl(var(--${metric.color}) / 0.3)`,
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at center, hsl(var(--${metric.color}) / 0.2) 0%, transparent 70%)`,
              filter: "blur(20px)",
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Card content */}
          <div className="relative p-6 text-center">
            {/* Icon container with enhanced animation */}
            <motion.div
              className={`h-12 w-12 mx-auto mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br from-[hsl(var(--${metric.color})/0.2)] to-[hsl(var(--${metric.color})/0.05)] border border-[hsl(var(--${metric.color})/0.3)]`}
              whileHover={{
                boxShadow: `0 0 30px hsl(var(--${metric.color}) / 0.4)`,
                scale: 1.1,
                rotate: 360,
              }}
              transition={{ 
                rotate: { duration: 0.6, ease: "easeInOut" },
                scale: { duration: 0.2 },
                boxShadow: { duration: 0.3 }
              }}
            >
              <metric.icon className={`h-6 w-6 text-[hsl(var(--${metric.color}))]`} />
            </motion.div>
            
            {/* Animated value */}
            <motion.div 
              className="text-2xl font-display mb-1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: metric.delay + 0.2,
                ease: "backOut"
              }}
            >
              <ScrollTriggeredCounter 
                value={metric.value} 
                suffix={metric.suffix}
                inView={inView}
              />
            </motion.div>
            
            {/* Label with typing effect */}
            <motion.p 
              className="text-xs text-muted-foreground uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: metric.delay + 0.4
              }}
            >
              {metric.label}
            </motion.p>
          </div>
          
          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--${metric.color}))] to-transparent absolute`}
              animate={{
                top: ["-2px", "100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};