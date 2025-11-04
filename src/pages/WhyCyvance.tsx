import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Zap, Brain, Globe, Lock, Eye, Target, TrendingUp, Award, Users, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { StickyHeader } from "@/components/StickyHeader";
import { AnimatedCounter } from "@/components/AnimatedCounter";

// Cursor Glow Component
const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  
  return (
    <motion.div
      className="pointer-events-none fixed w-96 h-96 rounded-full opacity-30 blur-3xl"
      style={{
        background: "radial-gradient(circle, hsl(var(--neon-cyan)) 0%, transparent 70%)",
        left: mousePosition.x - 192,
        top: mousePosition.y - 192,
      }}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// Holographic Shield Component
const HolographicShield = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer rotating ring */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border-2 border-[hsl(var(--neon-cyan)/0.3)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[hsl(var(--neon-cyan))] rounded-full"
            style={{
              left: "50%",
              top: "50%",
              transform: `rotate(${i * 45}deg) translateY(-128px)`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.25,
            }}
          />
        ))}
      </motion.div>
      
      {/* Middle rotating ring */}
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-[hsl(var(--electric-green)/0.4)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner shield */}
      <motion.div
        className="relative z-10"
        animate={{
          rotateY: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Shield className="w-32 h-32 text-[hsl(var(--neon-cyan))]" strokeWidth={1.5} />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.3)] to-[hsl(var(--electric-green)/0.3)] blur-2xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      {/* Particle trails */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-[hsl(var(--electric-green))] rounded-full"
          style={{
            left: "50%",
            top: "50%",
          }}
          animate={{
            x: [0, Math.cos(i * 30 * Math.PI / 180) * 100],
            y: [0, Math.sin(i * 30 * Math.PI / 180) * 100],
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Cyber Rain Effect
const CyberRain = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px bg-gradient-to-b from-transparent via-[hsl(var(--neon-cyan)/0.5)] to-transparent"
          style={{
            left: `${i * 5}%`,
            height: "100px",
          }}
          animate={{
            y: ["-100px", "100vh"],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Layered Defense Visualization
const DefenseLayers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const layers = [
    { icon: Brain, label: "AI Threat Detection", color: "var(--neon-cyan)" },
    { icon: Shield, label: "Network Shield", color: "var(--electric-green)" },
    { icon: Eye, label: "Risk Intelligence", color: "var(--cyber-purple)" },
    { icon: Lock, label: "Data Encryption", color: "var(--neon-blue)" },
  ];
  
  return (
    <div ref={ref} className="relative h-96 flex items-center justify-center">
      {layers.map((layer, index) => {
        const Icon = layer.icon;
        const zIndex = layers.length - index;
        
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{ 
              z: -index * 100, 
              opacity: 0, 
              scale: 0.5,
              rotateX: -90 
            }}
            animate={isInView ? { 
              z: index * 50, 
              opacity: 1, 
              scale: 1,
              rotateX: 0,
            } : {}}
            transition={{ 
              delay: index * 0.3, 
              duration: 1,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{ 
              transformStyle: "preserve-3d",
              zIndex,
            }}
          >
            <motion.div
              className="relative w-64 h-64 rounded-2xl border border-[hsl(var(--border))] bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6 flex flex-col items-center justify-center"
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                rotateX: 10,
              }}
              style={{
                boxShadow: `0 0 40px hsl(${layer.color}/0.3), inset 0 0 20px hsl(${layer.color}/0.1)`,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, hsl(${layer.color}/0.1) 0%, transparent 100%)`,
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />
              
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <Icon 
                  className="w-16 h-16 mb-4" 
                  style={{ color: `hsl(${layer.color})` }}
                  strokeWidth={1.5}
                />
              </motion.div>
              
              <h3 className="text-lg font-bold text-center">{layer.label}</h3>
              
              {/* Connecting lines */}
              {index < layers.length - 1 && (
                <motion.div
                  className="absolute bottom-0 left-1/2 w-px h-12 bg-gradient-to-b from-[hsl(var(--neon-cyan))] to-transparent"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
                  transition={{ delay: (index + 1) * 0.3, duration: 0.5 }}
                  style={{ transformOrigin: "top" }}
                />
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Morphing Card Component
const MorphingCard = ({ icon: Icon, title, description, index }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]));
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };
  
  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ 
        opacity: 0,
        scale: 0,
        rotateX: -90,
      }}
      animate={isInView ? { 
        opacity: 1,
        scale: 1,
        rotateX: 0,
      } : {}}
      transition={{ 
        delay: index * 0.2, 
        duration: 1,
        type: "spring",
        bounce: 0.4,
      }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className="relative p-8 rounded-2xl border border-[hsl(var(--border))] bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl overflow-hidden"
        whileHover={{ 
          boxShadow: "0 0 50px hsl(var(--neon-cyan)/0.4), inset 0 0 30px hsl(var(--neon-cyan)/0.1)",
        }}
      >
        {/* Glitch effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.2)] to-transparent"
          animate={isHovered ? {
            x: [0, 2, -2, 0],
            opacity: [0, 0.5, 0],
          } : {}}
          transition={{
            duration: 0.3,
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 1,
          }}
        />
        
        {/* Icon with pulse */}
        <motion.div
          className="relative w-16 h-16 rounded-xl mb-6 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(var(--neon-cyan)/0.2) 0%, hsl(var(--electric-green)/0.1) 100%)",
            boxShadow: "0 0 20px hsl(var(--neon-cyan)/0.3)",
          }}
          animate={{
            boxShadow: [
              "0 0 20px hsl(var(--neon-cyan)/0.3)",
              "0 0 40px hsl(var(--neon-cyan)/0.6)",
              "0 0 20px hsl(var(--neon-cyan)/0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Icon className="w-8 h-8 text-[hsl(var(--neon-cyan))]" />
        </motion.div>
        
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </motion.div>
    </motion.div>
  );
};

// Data Matrix Stats
const DataMatrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const stats = [
    { value: 100, suffix: "%", label: "Zero Breach Record", icon: Shield },
    { value: 99.9, suffix: "%", label: "Threat Detection", icon: Target },
    { value: 24, suffix: "/7", label: "Active Monitoring", icon: Eye },
  ];
  
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={index}
            className="relative p-8 rounded-2xl border border-[hsl(var(--border))] bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl overflow-hidden group"
            initial={{ opacity: 0, y: 50, rotateX: -45 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -10 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Scan line effect */}
            <motion.div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--neon-cyan))] to-transparent"
              animate={{
                top: ["-100%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "linear",
              }}
            />
            
            {/* Spark effects */}
            <motion.div
              className="absolute top-4 right-4 w-2 h-2 bg-[hsl(var(--electric-green))] rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            />
            
            <Icon className="w-12 h-12 text-[hsl(var(--neon-cyan))] mb-6" />
            
            <div className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[hsl(var(--neon-cyan))] to-[hsl(var(--electric-green))] bg-clip-text text-transparent">
                {isInView && <AnimatedCounter value={stat.value} duration={2000} />}
                {stat.suffix}
              </span>
            </div>
            
            <p className="text-muted-foreground font-semibold">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

// Company Logo with Teleport Effect
const TeleportLogo = ({ name, index }: { name: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      className="relative p-6 rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-background/60 to-background/20 backdrop-blur-sm"
      initial={{ 
        opacity: 0,
        scale: 0,
        filter: "blur(20px)",
      }}
      animate={isInView ? { 
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      } : {}}
      transition={{ 
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 30px hsl(var(--neon-cyan)/0.4)",
      }}
    >
      {/* Holographic shine */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.2)] via-transparent to-[hsl(var(--electric-green)/0.2)]"
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.2,
        }}
      />
      
      <div className="relative text-center font-mono font-bold text-lg">
        {name}
      </div>
    </motion.div>
  );
};

// Global Network Map
const GlobalNetwork = () => {
  return (
    <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1000 500">
        {/* Connection lines */}
        {[...Array(15)].map((_, i) => {
          const x1 = Math.random() * 1000;
          const y1 = Math.random() * 500;
          const x2 = Math.random() * 1000;
          const y2 = Math.random() * 500;
          
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="hsl(var(--neon-cyan))"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          );
        })}
        
        {/* Nodes */}
        {[...Array(20)].map((_, i) => {
          const cx = Math.random() * 1000;
          const cy = Math.random() * 500;
          
          return (
            <motion.circle
              key={`node-${i}`}
              cx={cx}
              cy={cy}
              r="3"
              fill="hsl(var(--electric-green))"
              animate={{
                opacity: [0.3, 1, 0.3],
                r: [3, 5, 3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

const WhyCyvance = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const [displayText, setDisplayText] = useState("");
  const fullText = "We Reinvent Cyber Defense with Precision, Power, and Intelligence.";
  
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  
  // Letter-by-letter animation
  useEffect(() => {
    if (heroInView) {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= fullText.length) {
          setDisplayText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [heroInView]);
  
  const coreEdges = [
    {
      icon: Brain,
      title: "AI-Powered Defense",
      description: "Machine learning algorithms that predict and neutralize threats before they materialize.",
    },
    {
      icon: Zap,
      title: "Real-Time Response",
      description: "Automated incident response within milliseconds, not hours.",
    },
    {
      icon: Globe,
      title: "Global Intelligence",
      description: "Threat data from across the planet, processed in real-time.",
    },
  ];
  
  const companies = ["TechCorp", "SecureNet", "DataShield", "CyberFlow", "DefenseHub", "InfoGuard"];
  
  return (
    <div ref={containerRef} className="min-h-screen bg-[#0D1117]">
      <StickyHeader />
      <CursorGlow />
      
      {/* 1️⃣ HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-[#0D1117]/95 to-[#0D1117]" />
        
        <CyberRain />
        
        {/* Holographic Shield */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-96 h-96 hidden lg:block">
          <HolographicShield />
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                style={{
                  background: "linear-gradient(135deg, #00E0FF 0%, #8B5CF6 50%, #00FF88 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Defend Beyond Limits
              </motion.h1>
            </motion.div>
            
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed">
                {displayText}
                <motion.span
                  className="inline-block w-1 h-8 bg-[#00E0FF] ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] hover:scale-105 transition-all duration-300 group"
                style={{
                  boxShadow: "0 0 30px hsl(var(--neon-cyan)/0.5)",
                }}
                onClick={() => navigate("/#contact")}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Explore Our Defense
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold border-2 border-[#00E0FF] text-[#00E0FF] hover:bg-[#00E0FF]/10 hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/#contact")}
              >
                Schedule Demo
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-[#00E0FF]" />
        </motion.div>
      </section>
      
      {/* 2️⃣ LAYERED DEFENSE VISUALIZATION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-[#1a1f2e] to-[#0D1117]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00E0FF] to-[#00FF88] bg-clip-text text-transparent">
                Multi-Layered Protection
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Each layer builds upon the last, creating an impenetrable fortress of digital security.
            </p>
          </motion.div>
          
          <DefenseLayers />
        </div>
      </section>
      
      {/* 3️⃣ CORE EDGE ADVANTAGES */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[#0D1117]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#00E0FF] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#00FF88] bg-clip-text text-transparent">
                Our Core Edge
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Innovation meets execution. Technology meets trust.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreEdges.map((edge, index) => (
              <MorphingCard key={index} {...edge} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* 4️⃣ THE PROOF MATRIX */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1117] via-[#0a0e1a] to-[#0D1117]" />
        
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 224, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 224, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00FF88] to-[#00E0FF] bg-clip-text text-transparent">
                Proven Performance
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Numbers that speak louder than words.
            </p>
          </motion.div>
          
          <DataMatrix />
        </div>
      </section>
      
      {/* 5️⃣ TRUSTED BY GLOBAL FORCES */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-[#0D1117]" />
        <GlobalNetwork />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00E0FF] to-[#8B5CF6] bg-clip-text text-transparent">
                Trusted Globally
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Protecting enterprises across continents.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companies.map((company, index) => (
              <TeleportLogo key={index} name={company} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* 6️⃣ IMMERSIVE CTA */}
      <section className="relative py-32 overflow-hidden">
        {/* Neon wave sweep */}
        <motion.div
          className="absolute inset-0"
          initial={{ 
            background: "radial-gradient(circle at 0% 50%, #00E0FF 0%, transparent 50%)" 
          }}
          animate={{ 
            background: [
              "radial-gradient(circle at 0% 50%, #00E0FF 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, #8B5CF6 0%, transparent 50%)",
              "radial-gradient(circle at 100% 50%, #00FF88 0%, transparent 50%)",
            ]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Infinite data flow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-4 bg-[#00E0FF]"
              style={{
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: ["0vh", "100vh"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Let's Reinforce
              <br />
              <span className="bg-gradient-to-r from-[#00E0FF] to-[#00FF88] bg-clip-text text-transparent">
                Your Future
              </span>
            </h2>
            
            <p className="text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join the next generation of cyber defense.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="px-12 py-8 text-xl font-bold bg-white text-[#0D1117] hover:bg-white/90 group relative overflow-hidden"
                onClick={() => navigate("/#contact")}
                style={{
                  boxShadow: "0 0 60px rgba(255, 255, 255, 0.5)",
                }}
              >
                {/* Energy pulse effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                <span className="relative z-10 flex items-center">
                  <Zap className="mr-2 h-6 w-6" />
                  Activate Defense System
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhyCyvance;
