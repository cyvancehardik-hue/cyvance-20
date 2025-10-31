import { StickyHeader } from "@/components/StickyHeader";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Shield, Zap, Award, Target, TrendingUp, Users, Rocket, Globe, Lock, ArrowRight, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

// Particle background component
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.5,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 230, 255, 0.6)';
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 230, 255, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
};

// Timeline data
const foundingMilestones = [
  {
    year: "2019",
    title: "Cyvance Founded",
    description: "Started with a vision to revolutionize cybersecurity for modern businesses",
    icon: Users,
  },
  {
    year: "2020",
    title: "First Enterprise Client",
    description: "Secured our first Fortune 500 client, protecting critical infrastructure",
    icon: Shield,
  },
  {
    year: "2021",
    title: "Zero-Trust Launch",
    description: "Pioneered zero-trust security framework with 100% compliance rate",
    icon: Lock,
  },
];

const breakthroughs = [
  {
    year: "2022",
    title: "AI Threat Detection",
    description: "Launched AI-powered threat detection with 99.9% accuracy, preventing 50,000+ attacks",
    icon: Zap,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Awarded 'Best Cybersecurity Innovation' and 'Top Security Platform'",
    icon: Award,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Expanded to 25+ countries, protecting enterprises across 4 continents",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    year: "2025",
    title: "Quantum Security",
    description: "First to market with quantum-resistant encryption protocols",
    icon: Target,
    gradient: "from-orange-500 to-red-600",
  },
];

const futureGoals = [
  {
    title: "AI-Driven Autonomous Security",
    description: "Self-healing security systems powered by advanced AI",
    year: "2026",
  },
  {
    title: "Global Security Network",
    description: "Real-time threat intelligence sharing across continents",
    year: "2027",
  },
  {
    title: "Zero-Day Protection",
    description: "Predictive threat modeling to prevent attacks before they happen",
    year: "2028",
  },
];

const Milestones = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      <StickyHeader />

      {/* 1️⃣ HERO SECTION */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated particle background */}
        <ParticleField />
        
        {/* Cyber grid overlay */}
        <div className="absolute inset-0 cyber-grid opacity-10" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-display font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              The Evolution of{" "}
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Cyvance Security
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Every step we took built the shield that protects tomorrow
            </motion.p>

            {/* Glowing scroll indicator */}
            <motion.div
              className="inline-flex flex-col items-center gap-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm text-cyan-400 font-medium">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 text-cyan-400 animate-pulse" />
            </motion.div>
          </motion.div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: "1s" }} />
      </motion.section>

      {/* 2️⃣ FOUNDING SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Where It All{" "}
              <span className="text-glow bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Began
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The foundation of excellence in cybersecurity
            </p>
          </motion.div>

          {/* Vertical Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Glowing vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-transparent -translate-x-1/2 hidden md:block">
              <motion.div
                className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-400 to-transparent"
                animate={{ y: [0, 300, 600, 900] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="space-y-16">
              {foundingMilestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <TimelineCard
                    key={milestone.year}
                    milestone={milestone}
                    index={index}
                    Icon={Icon}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ BREAKTHROUGHS SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Defining{" "}
              <span className="text-glow bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Moments
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Milestones that shaped the future of security
            </p>
          </motion.div>

          {/* Horizontal scroll cards */}
          <div className="overflow-x-auto scrollbar-hide pb-8">
            <div className="flex gap-8 min-w-max px-4 md:justify-center">
              {breakthroughs.map((breakthrough, index) => (
                <BreakthroughCard key={breakthrough.year} breakthrough={breakthrough} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Data stream animation */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
          <motion.div
            className="h-full w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </section>

      {/* 4️⃣ GROWTH SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          {/* World map with glowing nodes */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,230,255,0.8)]" />
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,230,255,0.8)]" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,230,255,0.8)]" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,230,255,0.8)]" style={{ animationDelay: "1.5s" }} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              Expanding Our{" "}
              <span className="text-glow bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Global reach, unmatched protection
            </p>
          </motion.div>

          {/* Animated counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StatsCard
              end={10000}
              suffix="+"
              label="Clients Protected"
              delay={0}
            />
            <StatsCard
              end={500000}
              suffix="+"
              label="Threats Blocked"
              delay={0.2}
            />
            <StatsCard
              end={50}
              suffix=" PB"
              label="Data Secured"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* 5️⃣ FUTURE VISION SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]" />
        
        {/* Animated sparks */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">
              What's{" "}
              <span className="text-glow bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Next
              </span>
            </h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              The Future is Always Encrypting
            </motion.p>
          </motion.div>

          {/* Future roadmap */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {futureGoals.map((goal, index) => (
              <FutureCard key={goal.title} goal={goal} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-[0_0_40px_rgba(0,230,255,0.4)] hover:shadow-[0_0_60px_rgba(0,230,255,0.6)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Join Our Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Timeline Card Component
const TimelineCard = ({ milestone, index, Icon }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className="flex-1">
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          className="glass-card p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(0,230,255,0.2)] transition-all duration-500 group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 group-hover:shadow-[0_0_20px_rgba(0,230,255,0.4)] transition-all duration-300">
              <Icon className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-4xl font-display font-bold text-glow text-cyan-400">{milestone.year}</span>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">{milestone.title}</h3>
          <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
        </motion.div>
      </div>

      {/* Center node */}
      <div className="relative flex-shrink-0 hidden md:block">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 p-1 shadow-[0_0_30px_rgba(0,230,255,0.6)]"
        >
          <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

// Breakthrough Card Component
const BreakthroughCard = ({ breakthrough, index }: any) => {
  const Icon = breakthrough.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        z: 50,
      }}
      className="w-80 flex-shrink-0"
      style={{ perspective: 1000 }}
    >
      <div className="glass-card p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-all duration-500 h-full group">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${breakthrough.gradient} p-3 mb-6 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300`}>
          <Icon className="w-full h-full text-white" />
        </div>
        
        <div className="text-3xl font-display font-bold text-purple-400 mb-3">{breakthrough.year}</div>
        <h3 className="text-2xl font-bold mb-4 text-white">{breakthrough.title}</h3>
        <p className="text-gray-400 leading-relaxed">{breakthrough.description}</p>
      </div>
    </motion.div>
  );
};

// Stats Card Component
const StatsCard = ({ end, suffix, label, delay }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="glass-card p-10 rounded-2xl backdrop-blur-xl bg-white/5 border border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500 text-center group"
    >
      <div className="text-5xl md:text-6xl font-display font-bold mb-4">
        {isInView && (
          <span className="text-glow bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            <AnimatedCounter value={end} duration={2000} />
            {suffix}
          </span>
        )}
      </div>
      <div className="text-lg text-gray-400 font-medium">{label}</div>
    </motion.div>
  );
};

// Future Card Component  
const FutureCard = ({ goal, index }: any) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onHoverStart={() => setIsRevealed(true)}
      onHoverEnd={() => setIsRevealed(false)}
      whileHover={{ scale: 1.03 }}
      className="glass-card p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-cyan-500/20 hover:border-cyan-500/60 hover:shadow-[0_0_50px_rgba(0,230,255,0.3)] transition-all duration-500 relative overflow-hidden group"
    >
      {/* Glowing border animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,230,255,0.4), transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={isRevealed ? {
          backgroundPosition: ["0% 0%", "200% 0%"],
        } : {}}
        transition={{ duration: 1.5, ease: "linear" }}
      />

      <div className="relative z-10">
        <div className="text-3xl font-display font-bold text-cyan-400 mb-3">{goal.year}</div>
        <h3 className="text-xl font-bold mb-3 text-white">{goal.title}</h3>
        
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isRevealed ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-gray-400 leading-relaxed pt-2 border-t border-cyan-500/20">
            {goal.description}
          </p>
        </motion.div>

        {!isRevealed && (
          <motion.div
            className="absolute bottom-4 right-4 text-cyan-400/50 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Hover to reveal
          </motion.div>
        )}
      </div>

      {/* Spark animation on hover */}
      {isRevealed && (
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      )}
    </motion.div>
  );
};

export default Milestones;
