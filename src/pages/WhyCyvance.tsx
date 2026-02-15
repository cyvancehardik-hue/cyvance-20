import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, Zap, Rocket, ChevronDown, Shield, Lock, Eye, Menu, X, Scan, ArrowRight, ShieldCheck, Network, AlertTriangle, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { StickyHeader } from "@/components/StickyHeader";
import { AnimatedCounter } from "@/components/AnimatedCounter";

const differentiators = [
  {
    icon: Search,
    title: "Clarity, Not Complexity",
    description: "We cut through jargon, give you clarity, not confusion.",
    gradient: "from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))]"
  },
  {
    icon: Zap,
    title: "Speed Meets Precision",
    description: "Instant response, zero wasted motion.",
    gradient: "from-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-blue))]"
  },
  {
    icon: Rocket,
    title: "Built for the Future",
    description: "Cloud-native, AI-powered, always ahead of threats.",
    gradient: "from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))]"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Assess",
    description: "Deep risk discovery",
    details: "Comprehensive analysis of your current security posture and threat landscape"
  },
  {
    step: "02", 
    title: "Defend",
    description: "Real defenses, no silver bullets",
    details: "Implementation of robust, multi-layered security measures tailored to your needs"
  },
  {
    step: "03",
    title: "Evolve", 
    description: "Continuous updates against new threats",
    details: "Adaptive security that evolves with the changing threat landscape"
  }
];

const stats = [
  { number: "50+", label: "Businesses Secured" },
  { number: "99%", label: "Response SLA" },
  { number: "24/7", label: "Coverage" }
];

const WhyCyvance = () => {
  const navigate = useNavigate();
  const [typewriterText, setTypewriterText] = useState("");
  const [showSubheadline, setShowSubheadline] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const differentiatorRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const proofRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" });
  const differentiatorInView = useInView(differentiatorRef, { once: true, margin: "-100px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });
  const proofInView = useInView(proofRef, { once: true, margin: "-100px" });

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (heroInView) {
      const text = "Because security shouldn't be complicated — it should be trusted.";
      let i = 0;
      const typewriter = setInterval(() => {
        if (i < text.length) {
          setTypewriterText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typewriter);
          setTimeout(() => setShowSubheadline(true), 500);
        }
      }, 50);
      return () => clearInterval(typewriter);
    }
  }, [heroInView]);

  return (
    <div className="min-h-screen bg-background">
      {/* Use the same header as main page */}
      <StickyHeader />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid pt-16">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        
        {/* Interactive Background Grid */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(var(--neon-blue-rgb)/0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(var(--neon-blue-rgb)/0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
          animate={{ 
            backgroundPosition: ['0px 0px', '60px 60px'] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] rounded-full opacity-60"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Animated Cyvance Logo */}
        <motion.div
          className="absolute top-1/2 right-1/4 transform -translate-y-1/2 hidden lg:block"
          initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
          animate={heroInView ? { 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
          } : {}}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Pulsing glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] rounded-full blur-3xl opacity-50"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            {/* Logo representation */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <motion.div
                className="w-32 h-32 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] transform rotate-45 rounded-2xl"
                animate={{ 
                  rotateZ: [45, 50, 45],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <motion.div
                className="absolute w-20 h-20 bg-gradient-to-r from-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-blue))] transform rotate-45 rounded-xl"
                animate={{ 
                  rotateZ: [45, 40, 45],
                  scale: [1, 0.95, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              {/* Status Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] border border-[hsl(var(--neon-blue)/0.3)] text-sm font-mono uppercase tracking-wider"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 }}
              >
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
                Advanced Security Platform
              </motion.div>

              {/* Typewriter Headline */}
              <div>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-glow">
                  {typewriterText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-[hsl(var(--neon-blue))]"
                  >
                    |
                  </motion.span>
                </h1>
              </div>

              {/* Animated Subheadline */}
              <motion.p 
                className="text-muted-foreground text-lg md:text-xl max-w-prose leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={showSubheadline ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                Protecting your people, your data, and your future with military-grade cybersecurity that evolves with your threat landscape.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={showSubheadline ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Button 
                  variant="hero" 
                  size="lg"
                  className="group hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.4)] hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('/#contact')}
                >
                  <Scan className="mr-2 h-4 w-4" />
                  Discover Why Cyvance
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="neon" 
                  size="lg"
                  className="hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.3)] hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('/#contact')}
                >
                  Talk to Us
                </Button>
              </motion.div>

              {/* Feature Highlights */}
              <motion.div 
                className="grid grid-cols-2 gap-6 pt-6"
                initial={{ opacity: 0, y: 30 }}
                animate={showSubheadline ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-300">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[hsl(var(--electric-green)/0.2)] to-[hsl(var(--electric-green)/0.05)] border border-[hsl(var(--electric-green)/0.3)] flex items-center justify-center hover:shadow-[0_0_15px_hsl(var(--electric-green)/0.3)] transition-all duration-300">
                    <ShieldCheck className="h-5 w-5 text-[hsl(var(--electric-green))]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">24/7 SOC</div>
                    <div className="text-xs text-muted-foreground">Always Protected</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-300">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.2)] to-[hsl(var(--neon-cyan)/0.05)] border border-[hsl(var(--neon-cyan)/0.3)] flex items-center justify-center hover:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)] transition-all duration-300">
                    <Network className="h-5 w-5 text-[hsl(var(--neon-cyan))]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Zero Trust</div>
                    <div className="text-xs text-muted-foreground">Never Trust, Always Verify</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right: Enhanced Logo Animation */}
            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
              animate={heroInView ? { 
                opacity: 1, 
                scale: 1, 
                rotateY: 0,
              } : {}}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] rounded-2xl blur-3xl animate-pulse" />
              <div className="relative hover:scale-105 transition-transform duration-500">
                <div className="relative w-full max-w-md mx-auto">
                  {/* Pulsing glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] rounded-full blur-3xl opacity-50"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                  {/* Logo representation */}
                  <div className="relative w-64 h-64 flex items-center justify-center mx-auto">
                    <motion.div
                      className="w-32 h-32 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] transform rotate-45 rounded-2xl"
                      animate={{ 
                        rotateZ: [45, 50, 45],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                    <motion.div
                      className="absolute w-20 h-20 bg-gradient-to-r from-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-blue))] transform rotate-45 rounded-xl"
                      animate={{ 
                        rotateZ: [45, 40, 45],
                        scale: [1, 0.95, 1]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={showSubheadline ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Why Section - Enhanced with Parallax & Scroll Animations */}
      <section ref={visionRef} className="py-20 md:py-32 relative overflow-hidden">
        {/* Enhanced Background Effects with Parallax */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{
            y: visionInView ? 0 : 100,
            opacity: visionInView ? 1 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue)/0.08)] via-transparent to-[hsl(var(--cyber-purple)/0.08)]"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 170, 255, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 170, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
            animate={{
              backgroundPosition: ['0px 0px', '80px 80px']
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          {/* Animated scan lines */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--neon-cyan))] to-transparent"
            initial={{ x: '-100%', opacity: 0 }}
            animate={visionInView ? { 
              x: '100%',
              opacity: [0, 1, 1, 0]
            } : {}}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-[hsl(var(--electric-green))] to-transparent"
            initial={{ x: '100%', opacity: 0 }}
            animate={visionInView ? { 
              x: '-100%',
              opacity: [0, 1, 1, 0]
            } : {}}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              repeatDelay: 3,
              delay: 1.25,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story Copy with Staggered Animation */}
            <motion.div
              initial={{ opacity: 0, x: -80, scale: 0.95 }}
              animate={visionInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ 
                duration: 1, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] border border-[hsl(var(--neon-blue)/0.3)] text-xs font-mono uppercase tracking-wider mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
                  Our Mission
                </div>
              </motion.div>

              <motion.h2 
                className="font-display text-4xl md:text-5xl mb-6 text-glow"
                initial={{ opacity: 0, y: 30 }}
                animate={visionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Our Vision Story
                <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                  The Future of Security
                </span>
              </motion.h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p className="text-xl font-semibold text-foreground">
                  Cybersecurity isn't just about firewalls and patches.
                </p>
                <p>
                  It's about <strong className="text-[hsl(var(--neon-blue))]">trust</strong>, <strong className="text-[hsl(var(--cyber-purple))]">clarity</strong>, and <strong className="text-[hsl(var(--electric-green))]">resilience</strong>.
                </p>
                <p>
                  Cyvance exists to turn uncertainty into confidence, complexity into clarity, and reactive measures into proactive protection that evolves with tomorrow's threats.
                </p>
              </div>
            </motion.div>

            {/* Right: Animated Shield/Lock */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-64 h-64">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <Shield className="w-32 h-32 text-[hsl(var(--neon-blue))]" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    scale: [1.1, 1, 1.1],
                    rotate: [0, -5, 0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 3 
                  }}
                >
                  <Lock className="w-16 h-16 text-[hsl(var(--cyber-purple))]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Differentiators Grid */}
      <section ref={differentiatorRef} className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={differentiatorInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-5xl mb-6">
              Differentiators Grid
              <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                Our Promise
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Military-grade solutions engineered for modern threats. AI-powered capabilities that define the future of cybersecurity.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.article
                  key={index}
                  className="glow-card rounded-2xl p-8 hover:shadow-[0_0_50px_hsl(var(--neon-blue)/0.3)] transition-all duration-500 group hover:-translate-y-3 hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  animate={differentiatorInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: 5
                  }}
                  style={{ perspective: 1000 }}
                >
                  <div className="scan-line mb-6">
                    <div className={`h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--neon-blue)/0.05)] border border-[hsl(var(--neon-blue)/0.3)] group-hover:shadow-[0_0_25px_hsl(var(--neon-blue)/0.4)] transition-all duration-300`}>
                      <IconComponent className="h-8 w-8 text-[hsl(var(--neon-blue))]" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-blue))]" />
                      Advanced threat detection
                    </li>
                    <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-blue))]" />
                      Real-time response automation
                    </li>
                    <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-blue))]" />
                      Enterprise-grade security
                    </li>
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section ref={processRef} className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-5xl mb-6">
              The Cyvance Way
              <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                Process & Flow
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Horizontal 3-step process with interactive hover states and glowing progress indicators.
            </p>
          </motion.div>

          <div className="relative">
            {/* Enhanced Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/30 rounded-full hidden md:block">
              <motion.div
                className="h-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] rounded-full shadow-[0_0_20px_hsl(var(--neon-blue)/0.4)]"
                initial={{ width: "0%" }}
                animate={processInView ? { width: `${((currentStep + 1) / processSteps.length) * 100}%` } : {}}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative text-center group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.3, duration: 0.8 }}
                  onHoverStart={() => setCurrentStep(index)}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  {/* Enhanced Step Circle */}
                  <motion.div
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] p-1 group-hover:scale-110 transition-transform duration-300 relative z-10"
                    whileHover={{ 
                      boxShadow: "0 0 40px hsl(var(--neon-blue)/0.6), 0 0 80px hsl(var(--cyber-purple)/0.3)" 
                    }}
                  >
                    <div className="flex items-center justify-center w-full h-full bg-background rounded-full">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                        {step.step}
                      </span>
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-display mb-3 group-hover:text-glow transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-lg font-medium text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.details}
                  </p>

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof of Trust Section */}
      <section ref={proofRef} className="py-20 md:py-32 relative overflow-hidden">
        {/* Floating client logos background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-lg bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] border border-[hsl(var(--neon-blue)/0.2)] backdrop-blur-sm flex items-center justify-center text-sm font-mono opacity-60"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                x: [-5, 5, -5],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            >
              {i < 3 ? 'SEC' : i < 6 ? 'ENT' : 'TEC'}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              Proof of Trust
              <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                Social Validation
              </span>
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              "Trusted by innovators, startups, and enterprises across industries."
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="glow-card text-center p-8 rounded-2xl group hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.3)] transition-all duration-500"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="scan-line mb-4">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent mb-2">
                    <AnimatedCounter value={stat.number === "50+" ? 50 : stat.number === "99%" ? 99 : 24} />{stat.number.includes("+") ? "+" : stat.number.includes("%") ? "%" : stat.number.includes("/") ? "/7" : ""}
                  </div>
                </div>
                <div className="text-muted-foreground text-lg font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))]" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "float 15s ease-in-out infinite",
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Ready for security that works 
              <br />
              <span className="text-white/80">with you, not against you?</span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-white text-[hsl(var(--neon-blue))] hover:bg-white/90 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                onClick={() => navigate('/#contact')}
              >
                <Scan className="mr-2 h-5 w-5" />
                Get Started with Cyvance
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-[hsl(var(--neon-blue))] hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/#services')}
              >
                Learn More About Our Approach
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhyCyvance;