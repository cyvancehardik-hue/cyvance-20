import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Shield, Zap, Globe, Users, Award, Rocket, Target, Brain, Lock, Network } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

// Cursor glow effect component
const CursorGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-64 h-64 rounded-full"
      style={{
        left: mousePos.x - 128,
        top: mousePos.y - 128,
        background: "radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  );
};

// Floating particles background
const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${p.opacity})`;
        ctx.fill();
        
        // Draw connections
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />;
};

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 w-1 h-64 bg-border/30 rounded-full z-50 hidden md:block"
    >
      <motion.div
        className="w-full bg-gradient-to-b from-[hsl(var(--electric-green))] to-[hsl(var(--neon-cyan))] rounded-full origin-top"
        style={{ scaleY }}
      />
    </motion.div>
  );
};

// Timeline milestone card
const MilestoneCard = ({
  year,
  title,
  description,
  icon: Icon,
  index,
}: {
  year: string;
  title: string;
  description: string;
  icon: any;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -15 : 15 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, rotateY: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -15 : 15 }
      }
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex items-center gap-8 ${
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      }`}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[hsl(var(--electric-green))] border-4 border-background z-10 hidden md:block"
        animate={
          isInView
            ? {
                scale: [1, 1.5, 1],
                boxShadow: [
                  "0 0 0 0 rgba(0, 255, 136, 0.4)",
                  "0 0 0 20px rgba(0, 255, 136, 0)",
                  "0 0 0 0 rgba(0, 255, 136, 0)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, repeat: isInView ? Infinity : 0 }}
      />
      
      {/* Card */}
      <motion.div
        className={`w-full md:w-[calc(50%-3rem)] group ${
          index % 2 === 0 ? "md:pr-8" : "md:pl-8"
        }`}
        whileHover={{ scale: 1.02, z: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="glow-card p-8 rounded-2xl relative overflow-hidden">
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0, 255, 136, 0.1), transparent 70%)",
            }}
          />
          
          {/* Corner glow */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--electric-green))] opacity-0 group-hover:opacity-20 blur-3xl rounded-full transition-opacity duration-700"
            animate={isInView ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <div className="flex items-start gap-6 mb-4">
              <motion.div
                className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--electric-green)/0.2)] to-[hsl(var(--electric-green)/0.05)] border border-[hsl(var(--electric-green)/0.3)] flex items-center justify-center group-hover:shadow-[0_0_25px_hsl(var(--electric-green)/0.4)] transition-all duration-500"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-8 h-8 text-[hsl(var(--electric-green))]" />
              </motion.div>
              
              <div className="flex-1">
                <motion.span
                  className="inline-block text-sm font-mono text-[hsl(var(--electric-green)/0.8)] px-3 py-1 rounded-full bg-[hsl(var(--electric-green)/0.1)] border border-[hsl(var(--electric-green)/0.2)] mb-2"
                  animate={isInView ? { opacity: [0.7, 1, 0.7] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {year}
                </motion.span>
              </div>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-glow transition-all duration-300">
              {title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
          
          {/* Scan line effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--electric-green))] to-transparent opacity-0 group-hover:opacity-100"
            animate={isInView ? { x: ["-100%", "100%"] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Data flow animation on timeline
const TimelineFlow = () => {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 overflow-hidden hidden md:block">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent" />
      <motion.div
        className="absolute w-2 h-32 -left-0.75 bg-gradient-to-b from-transparent via-[hsl(var(--electric-green))] to-transparent blur-sm"
        animate={{
          y: ["-100%", "1000%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default function Milestones() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const genesisRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  
  const isGenesisInView = useInView(genesisRef, { once: true, margin: "-20%" });
  
  const milestones = [
    {
      year: "2019",
      title: "Foundation",
      description:
        "Cyvance Security was born from a vision to revolutionize digital defense with next-gen threat detection.",
      icon: Rocket,
    },
    {
      year: "2020",
      title: "First Major Client",
      description:
        "Secured our first enterprise partnership, protecting critical infrastructure across multiple continents.",
      icon: Users,
    },
    {
      year: "2021",
      title: "AI Integration",
      description:
        "Launched our proprietary AI-powered threat intelligence platform, detecting anomalies 10x faster.",
      icon: Brain,
    },
    {
      year: "2022",
      title: "Global Expansion",
      description:
        "Opened offices in 5 countries, establishing Cyvance as a global cybersecurity leader.",
      icon: Globe,
    },
    {
      year: "2023",
      title: "Zero-Day Protection",
      description:
        "Developed advanced zero-day exploit detection, preventing attacks before they happen.",
      icon: Shield,
    },
    {
      year: "2024",
      title: "Quantum Security",
      description:
        "Pioneered quantum-resistant encryption protocols, future-proofing digital assets.",
      icon: Lock,
    },
  ];
  
  return (
    <div ref={containerRef} className="relative min-h-screen bg-background overflow-hidden">
      <CursorGlow />
      <ScrollProgress />
      <FloatingParticles />
      
      {/* Entry Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        {/* Volumetric glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--electric-green)), transparent)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--neon-cyan)), transparent)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <motion.div
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, hsl(var(--foreground)) 0%, hsl(var(--electric-green)) 40%, hsl(var(--neon-cyan)) 60%, hsl(var(--foreground)) 100%)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              Every Breakthrough
              <br />
              Marks Our Path.
            </motion.h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            From spark to system, our evolution shaped the future of digital defense.
          </motion.p>
          
          {/* Waveform animation */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-2xl h-24 opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1 }}
          >
            <svg className="w-full h-full" viewBox="0 0 800 100" preserveAspectRatio="none">
              <motion.path
                d="M0,50 Q200,20 400,50 T800,50"
                stroke="url(#waveGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.2 }}
              />
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--electric-green))" />
                  <stop offset="50%" stopColor="hsl(var(--neon-cyan))" />
                  <stop offset="100%" stopColor="hsl(var(--electric-green))" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity } }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-[hsl(var(--electric-green)/0.4)] flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--electric-green))]"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Timeline Section */}
      <section className="relative py-32 px-6">
        <div className="relative max-w-6xl mx-auto">
          <TimelineFlow />
          
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold text-glow mb-4">
              The Core Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[hsl(var(--electric-green))] to-transparent mx-auto" />
          </motion.div>
          
          <div className="space-y-24 relative">
            {milestones.map((milestone, index) => (
              <MilestoneCard key={milestone.year} {...milestone} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Genesis Transition Section */}
      <section ref={genesisRef} className="relative py-32 px-6 overflow-hidden">
        {/* Light beam effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--electric-green)/0.1)] to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isGenesisInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
        />
        
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
          animate={
            isGenesisInView
              ? { opacity: 1, filter: "blur(0px)", scale: 1 }
              : { opacity: 0, filter: "blur(20px)", scale: 0.9 }
          }
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="font-display text-5xl md:text-7xl font-bold mb-8"
            style={{
              backgroundImage:
                "linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--electric-green)), hsl(var(--foreground)))",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            animate={isGenesisInView ? { backgroundPosition: ["0% center", "200% center"] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            The Beginning
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isGenesisInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            In 2019, a team of elite cybersecurity experts recognized a critical gap in digital
            defense. Traditional solutions were reactive, always one step behind. Cyvance was
            founded on a radical idea: predict, prevent, and protect before threats materialize.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isGenesisInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <div className="inline-flex items-center gap-2 text-[hsl(var(--electric-green))] font-semibold group cursor-pointer">
              <span>Every milestone is a code in our DNA</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Matrix-style particles */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-20 bg-gradient-to-b from-transparent via-[hsl(var(--electric-green))] to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
              }}
              animate={{
                y: ["0vh", "120vh"],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </section>
      
      {/* Ending Cinematic Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          {/* Pulsating waveform background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--electric-green)) 2px, hsl(var(--electric-green)) 4px)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "0% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="font-display text-4xl md:text-6xl font-bold mb-6"
            animate={{
              textShadow: [
                "0 0 20px hsl(var(--electric-green)/0.5)",
                "0 0 40px hsl(var(--electric-green)/0.8)",
                "0 0 20px hsl(var(--electric-green)/0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Innovation Never Ends —
            <br />
            It Evolves.
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Every milestone is a code in our DNA.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
