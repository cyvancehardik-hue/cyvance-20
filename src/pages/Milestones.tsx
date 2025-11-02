import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Shield, Zap, Globe, Users, Award, Rocket, Target, Brain } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

// Minimal particle background - lightweight
const ParticleBackground = () => {
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
      size: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Only 30 particles for performance
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.y -= particle.speedY;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
        ctx.fill();
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

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
};

// Animated Timeline Connector
const TimelineConnector = () => {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden hidden md:block">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF88]/30 to-transparent" />
      <motion.div
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#00FF88] to-transparent"
        animate={{ y: ["0%", "600%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ filter: "blur(2px)" }}
      />
    </div>
  );
};

// Milestone Card Component
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="relative p-6 md:p-8 rounded-2xl bg-[#0E0E0E]/80 border border-[#00FF88]/20 hover:border-[#00FF88]/60 transition-all duration-500 backdrop-blur-sm">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00FF88]/0 to-[#00FF88]/0 group-hover:from-[#00FF88]/5 group-hover:to-[#00FF88]/0 transition-all duration-500" />
        
        <div className="relative z-10 flex items-start gap-6">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center group-hover:border-[#00FF88]/60 group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-500"
          >
            <Icon className="w-7 h-7 text-[#00FF88]" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-xl md:text-2xl font-bold text-[#EAEAEA] group-hover:text-[#00FF88] transition-colors duration-300">
                {title}
              </h3>
              <span className="flex-shrink-0 text-sm font-mono text-[#00FF88]/70 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20">
                {year}
              </span>
            </div>
            <p className="text-sm md:text-base text-[#AAAAAA] leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-[#00FF88]/0 group-hover:border-[#00FF88]/40 rounded-tl-2xl transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#00FF88]/0 group-hover:border-[#00FF88]/40 rounded-br-2xl transition-all duration-500" />
      </div>
    </motion.div>
  );
};

export default function Milestones() {
  const beginningRef = useRef(null);
  const isBeginningInView = useInView(beginningRef, { once: true, margin: "-50px" });

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
      title: "Industry Recognition",
      description: "Awarded 'Best Cybersecurity Innovation' for pioneering quantum-resistant encryption protocols.",
      icon: Award,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0E0E0E] overflow-hidden">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#101010]/50 to-[#0E0E0E]" />

        {/* Animated glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00FF88]/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main Headline with shimmer effect */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-[#EAEAEA] relative"
              style={{
                backgroundImage: "linear-gradient(90deg, #EAEAEA 0%, #00FF88 50%, #EAEAEA 100%)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              Every Breakthrough
              <br />
              Marks Our Path.
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-[#AAAAAA] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            From a spark of innovation to commanding digital intelligence — our evolution defines tomorrow's defense.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-[#00FF88]/40 flex items-start justify-center p-2 hover:border-[#00FF88] transition-colors cursor-pointer"
            >
              <motion.div
                animate={{
                  y: [0, 12, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[#00FF88]"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Milestones Timeline Section */}
      <section className="relative py-20 px-6">
        <div className="relative max-w-5xl mx-auto">
          <TimelineConnector />

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#EAEAEA] mb-4">
              Our Journey
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mx-auto" />
          </motion.div>

          {/* Milestone Cards */}
          <div className="space-y-8 relative">
            {milestones.map((milestone, index) => (
              <MilestoneCard key={milestone.year} {...milestone} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-[#EAEAEA] mb-4">
              Impact by Numbers
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Clients Protected", value: 500, icon: Users, suffix: "+" },
              { label: "Threats Neutralized", value: 1000000, icon: Shield, suffix: "+" },
              { label: "Global Presence", value: 25, icon: Globe, suffix: " Countries" },
            ].map((stat, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: "-100px" });

              return (
                <motion.div
                  key={stat.label}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="relative group"
                >
                  <div className="p-8 rounded-2xl bg-[#0E0E0E]/80 border border-[#00FF88]/20 hover:border-[#00FF88]/60 transition-all duration-500 backdrop-blur-sm text-center">
                    <div className="inline-flex p-4 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/30 mb-6 group-hover:shadow-[0_0_25px_rgba(0,255,136,0.3)] transition-all duration-500">
                      <stat.icon className="w-8 h-8 text-[#00FF88]" />
                    </div>

                    <div className="text-4xl md:text-5xl font-bold text-[#00FF88] mb-2 font-mono">
                      {isInView && <AnimatedCounter value={stat.value} />}
                      {stat.suffix}
                    </div>

                    <div className="text-[#AAAAAA] font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Beginning Section */}
      <section className="relative py-20 px-6">
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            ref={beginningRef}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={
              isBeginningInView
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={isBeginningInView ? { scale: 1 } : { scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-[#EAEAEA] mb-6">
                The Beginning
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent mx-auto mb-8" />
              
              <p className="text-lg md:text-xl text-[#AAAAAA] leading-relaxed max-w-3xl mx-auto">
                In 2019, a team of elite cybersecurity experts recognized a critical gap in digital
                defense. Traditional solutions were reactive, always one step behind. Cyvance was
                founded on a radical idea: predict, prevent, and protect before threats materialize.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isBeginningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 inline-flex items-center gap-2 text-[#00FF88] font-semibold group cursor-pointer"
              >
                <span>Continue the journey</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
