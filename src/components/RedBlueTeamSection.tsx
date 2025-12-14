import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Swords, ArrowRight, Zap, Target, Lock, Terminal, Radio, Cpu, Radar, Binary, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

// Advanced cyber grid with parallax
const AdvancedCyberGrid = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dynamic grid with mouse interaction */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 224, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 224, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`,
        }}
      />
      
      {/* Hexagonal overlay pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%2300e0ff' fill-opacity='0.3' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Massive red team energy core */}
      <motion.div
        className="absolute top-1/3 left-1/5 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Massive blue team energy core */}
      <motion.div
        className="absolute bottom-1/3 right-1/5 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 224, 255, 0.15) 0%, rgba(0, 224, 255, 0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.7, 0.4, 0.7],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central collision energy */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Multiple scanning lines */}
      {[0, 2, 4].map((delay) => (
        <motion.div
          key={delay}
          className="absolute left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0, 224, 255, 0.6) 20%, rgba(168, 85, 247, 0.6) 50%, rgba(239, 68, 68, 0.6) 80%, transparent 100%)",
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay }}
        />
      ))}

      {/* Vertical pulse lines */}
      <motion.div
        className="absolute top-0 bottom-0 w-px left-1/4"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(239, 68, 68, 0.4) 50%, transparent 100%)",
        }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-px right-1/4"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(0, 224, 255, 0.4) 50%, transparent 100%)",
        }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      {/* Floating data particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? "rgba(239, 68, 68, 0.6)" : "rgba(0, 224, 255, 0.6)",
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Animated stats counter
const AnimatedStat = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</div>
    </motion.div>
  );
};

// Scenario preview cards
const ScenarioPreview = ({ icon: Icon, title, color, delay }: { icon: any; title: string; color: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="relative group cursor-pointer"
  >
    <div className={`absolute inset-0 ${color} rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
    <div className="relative flex items-center gap-3 p-4 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-border transition-colors">
      <div className={`p-2 rounded-lg ${color.replace('bg-', 'bg-')}/20`}>
        <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-').replace('/50', '')}`} />
      </div>
      <span className="text-sm font-medium">{title}</span>
    </div>
  </motion.div>
);

export const RedBlueTeamSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [100, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  const scenarios = [
    { icon: Fingerprint, title: "Phishing Attack", color: "bg-red-500/50" },
    { icon: Lock, title: "Ransomware", color: "bg-orange-500/50" },
    { icon: Cpu, title: "Zero-Day Exploit", color: "bg-yellow-500/50" },
    { icon: Radar, title: "APT Simulation", color: "bg-purple-500/50" },
  ];

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden">
      <AdvancedCyberGrid />
      
      <motion.div style={{ y, opacity, scale }} className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border/50 bg-background/50 backdrop-blur-md"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Swords className="w-4 h-4 text-red-500" />
              </motion.div>
              <span className="text-xs font-mono uppercase tracking-widest bg-gradient-to-r from-red-500 to-[hsl(var(--neon-blue))] bg-clip-text text-transparent font-semibold">
                Enterprise Simulation Platform
              </span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-4 h-4 text-[hsl(var(--neon-blue))]" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Title with Advanced Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-[0.9]">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-block text-red-500"
              >
                Red Team
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground/50 mx-3 md:mx-5"
              >
                /
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-block text-[hsl(var(--neon-blue))]"
              >
                Blue Team
              </motion.span>
            </h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <span className="font-display text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-red-500 via-purple-500 to-[hsl(var(--neon-blue))] bg-clip-text text-transparent">
                Simulation Engine
              </span>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Experience real-world cyberattacks from a hacker's perspective. 
            <span className="text-foreground font-medium"> Instantly switch</span> to see how our elite defense systems 
            <span className="text-[hsl(var(--neon-blue))] font-medium"> neutralize every threat</span> in real-time.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-8 md:gap-16 mb-16"
          >
            <AnimatedStat value={8} label="Attack Scenarios" suffix="+" />
            <AnimatedStat value={47} label="Defense Modules" suffix="+" />
            <AnimatedStat value={100} label="Interactive" suffix="%" />
          </motion.div>

          {/* Scenario Previews */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {scenarios.map((scenario, i) => (
              <ScenarioPreview key={scenario.title} {...scenario} delay={0.8 + i * 0.1} />
            ))}
          </motion.div>

          {/* Visual Cards - Attack vs Defense */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 mb-16">
            {/* Red Team Card */}
            <motion.div
              initial={{ opacity: 0, x: -80, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-red-600/20 to-transparent rounded-2xl blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative p-8 md:p-10 rounded-2xl border border-red-500/30 bg-background/90 backdrop-blur-md hover:border-red-500/60 transition-all duration-500 overflow-hidden">
                {/* Animated scan effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-transparent to-transparent"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div 
                      className="p-4 rounded-xl bg-red-500/20 border border-red-500/40"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Swords className="w-10 h-10 text-red-500" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-display text-red-500">Attack Mode</h3>
                      <p className="text-sm text-muted-foreground font-mono">OFFENSIVE_OPERATIONS</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 text-muted-foreground">
                    {[
                      { icon: Target, text: "Real-time vulnerability exploitation" },
                      { icon: Terminal, text: "Live attack chain visualization" },
                      { icon: Zap, text: "Privilege escalation pathways" },
                      { icon: Binary, text: "Payload delivery simulation" },
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-4 group/item"
                      >
                        <div className="p-2 rounded-lg bg-red-500/10 group-hover/item:bg-red-500/20 transition-colors">
                          <item.icon className="w-4 h-4 text-red-500" />
                        </div>
                        <span className="group-hover/item:text-foreground transition-colors">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Blue Team Card */}
            <motion.div
              initial={{ opacity: 0, x: 80, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue))]/30 via-[hsl(var(--neon-blue))]/20 to-transparent rounded-2xl blur-2xl"
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative p-8 md:p-10 rounded-2xl border border-[hsl(var(--neon-blue))]/30 bg-background/90 backdrop-blur-md hover:border-[hsl(var(--neon-blue))]/60 transition-all duration-500 overflow-hidden">
                {/* Animated shield effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-blue))]/10 via-transparent to-transparent"
                  animate={{ y: ["100%", "-100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <motion.div 
                      className="p-4 rounded-xl bg-[hsl(var(--neon-blue))]/20 border border-[hsl(var(--neon-blue))]/40"
                      animate={{ boxShadow: ["0 0 0px rgba(0, 224, 255, 0)", "0 0 20px rgba(0, 224, 255, 0.3)", "0 0 0px rgba(0, 224, 255, 0)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Shield className="w-10 h-10 text-[hsl(var(--neon-blue))]" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-display text-[hsl(var(--neon-blue))]">Defense Mode</h3>
                      <p className="text-sm text-muted-foreground font-mono">SOC_OPERATIONS</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 text-muted-foreground">
                    {[
                      { icon: Radar, text: "AI-powered threat detection" },
                      { icon: Radio, text: "Real-time response automation" },
                      { icon: Lock, text: "Complete attack neutralization" },
                      { icon: Cpu, text: "24/7 SOC monitoring system" },
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-4 group/item"
                      >
                        <div className="p-2 rounded-lg bg-[hsl(var(--neon-blue))]/10 group-hover/item:bg-[hsl(var(--neon-blue))]/20 transition-colors">
                          <item.icon className="w-4 h-4 text-[hsl(var(--neon-blue))]" />
                        </div>
                        <span className="group-hover/item:text-foreground transition-colors">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => navigate("/simulation")}
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-purple-600 to-[hsl(var(--neon-blue))] text-white px-14 py-7 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all duration-500"
              >
                <motion.span 
                  className="relative z-10 flex items-center gap-4"
                  whileHover={{ x: 5 }}
                >
                  <Terminal className="w-6 h-6" />
                  Enter Simulation Lab
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </motion.span>
                
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] via-purple-600 to-red-500"
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ opacity: 0.4 }}
                />
              </Button>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-sm text-muted-foreground flex items-center justify-center gap-6"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
                No signup required
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--neon-blue))] animate-pulse" />
                Enterprise-grade simulation
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                Real attack scenarios
              </span>
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
