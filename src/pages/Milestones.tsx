import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Shield, Lock, Network, Zap, Globe, Users, Award, Rocket, Target, Brain, Server } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

// Cursor-reactive Particle Field
const CursorParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let mouseXVal = 0;
    let mouseYVal = 0;

    const unsubX = mouseX.on("change", (v) => (mouseXVal = v));
    const unsubY = mouseY.on("change", (v) => (mouseYVal = v));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Mouse attraction
        const dx = mouseXVal - particle.x;
        const dy = mouseYVal - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x += dx * force * 0.01;
          particle.y += dy * force * 0.01;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(138, 43, 226, ${0.2 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

// Cyber Grid Background
const CyberGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridPulse 4s ease-in-out infinite'
      }} />
    </div>
  );
};

// Cursor Trail Effect
const CursorTrail = () => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      setTrail((prev) => [...prev.slice(-8), newPoint]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            background: `radial-gradient(circle, rgba(0, 255, 255, ${0.6 - i * 0.07}) 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
};

// Typewriter Effect
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, delay + currentIndex * 50);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

// 3D Holographic Sphere
const HolographicSphere = () => {
  const sphereRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sphereRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  return (
    <div 
      ref={sphereRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full flex items-center justify-center"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative w-64 h-64 rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-500/30 animate-pulse-slow" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-purple-500/10 to-cyan-500/10 backdrop-blur-lg border border-purple-500/20" />
        <div className="absolute inset-8 rounded-full bg-gradient-to-bl from-cyan-500/5 to-purple-500/5 backdrop-blur-md border border-cyan-500/10 flex items-center justify-center">
          <Shield className="w-16 h-16 text-cyan-400 animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};

// Floating Glass Card
const FloatingGlassCard = ({ 
  title, 
  year, 
  description, 
  icon: Icon, 
  delay 
}: { 
  title: string; 
  year: string; 
  description: string; 
  icon: any; 
  delay: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isHovered ? { 
          background: [
            'radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.1), transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(138, 43, 226, 0.1), transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(0, 255, 255, 0.1), transparent 50%)',
          ]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="text-sm font-mono text-cyan-400/70 group-hover:text-cyan-400 transition-colors">
            {year}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-500 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-purple-500/0 group-hover:border-purple-500/50 transition-all duration-500 rounded-br-2xl" />
    </motion.div>
  );
};

// Animated Circuit Lines
const CircuitLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 0 200 L 200 200 L 200 400 L 400 400"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 800 100 L 600 100 L 600 300 L 400 300"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "linear" }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 255, 255, 0)" />
            <stop offset="50%" stopColor="rgba(0, 255, 255, 1)" />
            <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(138, 43, 226, 0)" />
            <stop offset="50%" stopColor="rgba(138, 43, 226, 1)" />
            <stop offset="100%" stopColor="rgba(138, 43, 226, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default function Milestones() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const milestones = [
    {
      year: "2019",
      title: "Foundation",
      description: "Cyvance Security was born from a vision to revolutionize digital defense with next-gen threat detection.",
      icon: Rocket,
    },
    {
      year: "2020",
      title: "First Major Client",
      description: "Secured our first enterprise partnership, protecting critical infrastructure across multiple continents.",
      icon: Users,
    },
    {
      year: "2021",
      title: "AI Integration",
      description: "Launched our proprietary AI-powered threat intelligence platform, detecting anomalies 10x faster.",
      icon: Brain,
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Opened offices in 5 countries, establishing Cyvance as a global cybersecurity leader.",
      icon: Globe,
    },
    {
      year: "2023",
      title: "Zero-Day Protection",
      description: "Developed advanced zero-day exploit detection, preventing attacks before they happen.",
      icon: Shield,
    },
    {
      year: "2024",
      title: "Quantum Security",
      description: "Pioneered quantum-resistant encryption protocols, future-proofing digital assets.",
      icon: Lock,
    },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      <CursorTrail />

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CyberGrid />
        <CursorParticleField />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-[#0a0a0f]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
              animate={{ 
                backgroundPosition: ['0% center', '200% center', '0% center'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              Every Innovation
              <br />
              <span className="inline-block animate-glitch">Left a Trace</span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 font-light"
          >
            From concept to command, we redefined digital defense.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-full border-2 border-cyan-400/50 hover:border-cyan-400 cursor-pointer backdrop-blur-sm bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors"
            >
              <Zap className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Origin Section */}
      <section className="relative min-h-screen flex items-center py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-purple-950/10 to-[#0a0a0f]" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-5xl font-bold text-white mb-8">
              The Beginning
            </h2>
            <div className="p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
              <p className="text-lg text-gray-300 leading-relaxed font-mono">
                <TypewriterText 
                  text="In 2019, a team of elite cybersecurity experts recognized a critical gap in digital defense. Traditional solutions were reactive, always one step behind. Cyvance was founded on a radical idea: predict, prevent, and protect before threats materialize. From a garage in Silicon Valley to global headquarters, our journey has been driven by one mission — making the digital world impenetrable."
                  delay={500}
                />
              </p>
            </div>
          </motion.div>

          {/* Right - 3D Holographic Sphere */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[500px]"
          >
            <HolographicSphere />
          </motion.div>
        </div>
      </section>

      {/* 3. Growth Section - Floating Cards */}
      <section className="relative min-h-screen py-24 px-6">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-purple-900/5 to-cyan-900/5"
          animate={{
            background: [
              'linear-gradient(135deg, rgba(0, 255, 255, 0.02) 0%, rgba(138, 43, 226, 0.02) 100%)',
              'linear-gradient(225deg, rgba(138, 43, 226, 0.02) 0%, rgba(0, 255, 255, 0.02) 100%)',
              'linear-gradient(135deg, rgba(0, 255, 255, 0.02) 0%, rgba(138, 43, 226, 0.02) 100%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">
              Building the Core
            </h2>
            <p className="text-xl text-gray-400">
              Every milestone strengthened our foundation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <FloatingGlassCard
                key={milestone.year}
                {...milestone}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Impact Section - Animated Stats */}
      <section className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-cyan-950/10 to-[#0a0a0f]" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L50 100 M0 50 L100 50' stroke='rgba(0,255,255,0.1)' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
            }}
            animate={{ y: [0, -100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-white mb-4">
              Securing the World
            </h2>
            <p className="text-xl text-gray-400">
              Real impact, measured in protection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Clients Protected", value: 500, icon: Users, suffix: "+" },
              { label: "Attacks Prevented", value: 1000000, icon: Shield, suffix: "+" },
              { label: "Networks Secured", value: 250, icon: Network, suffix: "+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                <div className="p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-cyan-500/5"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="relative z-10 text-center">
                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 mb-6">
                      <stat.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                    
                    <div className="text-5xl font-bold text-cyan-400 mb-2 font-mono">
                      <AnimatedCounter value={stat.value} />
                      {stat.suffix}
                    </div>
                    
                    <div className="text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Future Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CircuitLines />
        
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(0deg, rgba(0, 255, 255, 0.05) 0%, transparent 100%)',
              'linear-gradient(180deg, rgba(138, 43, 226, 0.05) 0%, transparent 100%)',
              'linear-gradient(0deg, rgba(0, 255, 255, 0.05) 0%, transparent 100%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
              The Future of Cyber Defense
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Is Still Loading...
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 mb-12"
            >
              Join us as we continue to push the boundaries of what's possible
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full overflow-hidden"
            >
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500"
                whileHover={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0.5, 0.8],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              
              <div className="relative z-10 flex items-center gap-2 text-white font-semibold">
                Explore the Next Chapter
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        </div>

        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
