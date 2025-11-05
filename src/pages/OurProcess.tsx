import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { StickyHeader } from "@/components/StickyHeader";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { 
  Search, 
  Shield, 
  Eye, 
  Zap, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle, 
  Play,
  Target,
  Brain,
  Lock,
  AlertTriangle,
  Activity,
  Download,
  Sparkles,
  Network,
  Radar,
  TrendingUp
} from "lucide-react";

// Particle Background Component
const DataGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--neon-blue)/0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--neon-blue)/0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* Pulsing circuit lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue))] to-transparent"
          style={{
            top: `${20 + i * 20}%`,
            left: 0,
            right: 0,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
};

// Floating Particles
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[hsl(var(--neon-blue))] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
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

// Glitch Text Animation
const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: [
            '0 0 0px transparent',
            '2px 2px 8px hsl(var(--neon-blue)/0.8)',
            '0 0 0px transparent',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, variant = "hero", size = "lg", onClick }: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <Button
        ref={buttonRef}
        variant={variant}
        size={size}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className="group relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.3)] to-[hsl(var(--cyber-purple)/0.3)]"
          animate={{
            x: [-100, 100],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Button>
    </motion.div>
  );
};

// Animated Counter
const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) return;

    let start = 0;
    const duration = 2000;
    const increment = numericValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref}>
      {value.includes('%') ? `${count.toFixed(1)}%` : 
       value.includes('min') ? `<${Math.round(count)}min` :
       value === '24/7' ? '24/7' :
       Math.round(count)}
      {suffix}
    </div>
  );
};

// Vertical Progress Indicator
const VerticalProgressIndicator = ({ steps, activeStep }: { steps: number; activeStep: number | null }) => {
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col gap-4">
        {[...Array(steps)].map((_, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className={`w-2 h-2 rounded-full border-2 transition-all duration-300 ${
                activeStep === i + 1
                  ? 'border-[hsl(var(--neon-blue))] bg-[hsl(var(--neon-blue))] shadow-[0_0_20px_hsl(var(--neon-blue))]'
                  : 'border-[hsl(var(--border))] bg-transparent'
              }`}
              animate={activeStep === i + 1 ? {
                scale: [1, 1.5, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            {i < steps - 1 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-[hsl(var(--border))] to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const OurProcess = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const processSteps = [
    {
      id: 1,
      phase: "Discovery & Assessment",
      title: "Deep Security Reconnaissance",
      subtitle: "AI-Powered Vulnerability Discovery",
      description: "Our elite security engineers deploy advanced AI algorithms and military-grade scanning tools to conduct a comprehensive audit of your digital infrastructure.",
      icon: Search,
      duration: "2-3 weeks",
      deliverables: [
        "360° Security Posture Assessment",
        "Vulnerability Risk Matrix",
        "Compliance Gap Analysis", 
        "Executive Security Scorecard",
        "Threat Landscape Mapping"
      ],
      details: {
        methodology: "Zero-touch automated scanning combined with expert manual validation",
        tools: "Proprietary AI scanner, OWASP testing suite, custom penetration tools",
        outcome: "Complete visibility into security weaknesses and attack vectors"
      },
      color: "neon-blue",
      bgPattern: "assessment"
    },
    {
      id: 2,
      phase: "Strategy & Architecture",
      title: "Fortress Blueprint Design",
      subtitle: "Zero-Trust Security Architecture",
      description: "Design and architect a military-grade defense system tailored to your specific threat landscape and business requirements.",
      icon: Brain,
      duration: "1-2 weeks", 
      deliverables: [
        "Zero-Trust Architecture Design",
        "Security Technology Roadmap",
        "Implementation Strategy",
        "Risk Mitigation Framework",
        "Compliance Alignment Plan"
      ],
      details: {
        methodology: "Threat modeling combined with business impact analysis",
        tools: "Advanced threat modeling platforms, security architecture frameworks",
        outcome: "Comprehensive security blueprint ready for implementation"
      },
      color: "cyber-purple",
      bgPattern: "strategy"
    },
    {
      id: 3,
      phase: "Implementation & Deployment",
      title: "Fortress Activation",
      subtitle: "Multi-Layer Defense Deployment",
      description: "Deploy cutting-edge security controls with minimal business disruption using our proven phased implementation methodology.",
      icon: Shield,
      duration: "4-8 weeks",
      deliverables: [
        "Security Control Implementation",
        "Zero-Trust Network Setup",
        "Endpoint Protection Deployment",
        "Identity Management System",
        "Security Policy Configuration"
      ],
      details: {
        methodology: "Phased deployment with continuous validation and rollback capabilities",
        tools: "Automated deployment pipelines, configuration management, testing frameworks",
        outcome: "Fully operational security infrastructure with 99.9% uptime guarantee"
      },
      color: "electric-green",
      bgPattern: "implementation"
    },
    {
      id: 4,
      phase: "Monitoring & Intelligence",
      title: "Neural Defense Matrix",
      subtitle: "24/7 SOC Operations",
      description: "Activate continuous monitoring with our elite Security Operations Center, powered by AI threat intelligence and human expertise.",
      icon: Eye,
      duration: "Ongoing",
      deliverables: [
        "24/7 SOC Monitoring",
        "Real-time Threat Intelligence",
        "Behavioral Analytics Engine",
        "Automated Response System",
        "Executive Security Dashboards"
      ],
      details: {
        methodology: "AI-powered threat detection with human analyst validation",
        tools: "Next-gen SIEM, ML threat detection, custom analytics platform",
        outcome: "Proactive threat detection with sub-5 minute response times"
      },
      color: "neon-cyan",
      bgPattern: "monitoring"
    },
    {
      id: 5,
      phase: "Response & Evolution",
      title: "Adaptive Defense Protocol",
      subtitle: "Incident Response & Continuous Improvement",
      description: "Lightning-fast incident response with continuous security posture enhancement based on emerging threats and lessons learned.",
      icon: Zap,
      duration: "Continuous",
      deliverables: [
        "Incident Response Team",
        "Forensic Investigation",
        "Recovery Orchestration",
        "Threat Hunt Operations",
        "Security Posture Evolution"
      ],
      details: {
        methodology: "Rapid response protocols with post-incident learning integration",
        tools: "Incident response platform, forensic analysis tools, threat hunting suite",
        outcome: "Sub-15 minute incident containment with comprehensive recovery"
      },
      color: "electric-orange",
      bgPattern: "response"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      'neon-blue': {
        text: 'text-[hsl(var(--neon-blue))]',
        bg: 'bg-[hsl(var(--neon-blue))]',
        bgGradient: 'from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--neon-blue)/0.05)]',
        border: 'border-[hsl(var(--neon-blue)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--neon-blue)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--neon-blue))]'
      },
      'cyber-purple': {
        text: 'text-[hsl(var(--cyber-purple))]',
        bg: 'bg-[hsl(var(--cyber-purple))]',
        bgGradient: 'from-[hsl(var(--cyber-purple)/0.2)] to-[hsl(var(--cyber-purple)/0.05)]',
        border: 'border-[hsl(var(--cyber-purple)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--cyber-purple)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--cyber-purple))]'
      },
      'electric-green': {
        text: 'text-[hsl(var(--electric-green))]',
        bg: 'bg-[hsl(var(--electric-green))]',
        bgGradient: 'from-[hsl(var(--electric-green)/0.2)] to-[hsl(var(--electric-green)/0.05)]',
        border: 'border-[hsl(var(--electric-green)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--electric-green)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--electric-green))]'
      },
      'neon-cyan': {
        text: 'text-[hsl(var(--neon-cyan))]',
        bg: 'bg-[hsl(var(--neon-cyan))]',
        bgGradient: 'from-[hsl(var(--neon-cyan)/0.2)] to-[hsl(var(--neon-cyan)/0.05)]',
        border: 'border-[hsl(var(--neon-cyan)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--neon-cyan)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--neon-cyan))]'
      },
      'electric-orange': {
        text: 'text-[hsl(var(--electric-orange))]',
        bg: 'bg-[hsl(var(--electric-orange))]',
        bgGradient: 'from-[hsl(var(--electric-orange)/0.2)] to-[hsl(var(--electric-orange)/0.05)]',
        border: 'border-[hsl(var(--electric-orange)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--electric-orange)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--electric-orange))]'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap['neon-blue'];
  };

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = parseInt(entry.target.getAttribute('data-step') || '0');
          setActiveStep(stepId);
        }
      });
    }, observerOptions);

    const stepElements = document.querySelectorAll('[data-step]');
    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StickyHeader />
      
      {/* Vertical Progress Indicator */}
      <VerticalProgressIndicator steps={processSteps.length} activeStep={activeStep} />
      
      <main className="pt-16">
        {/* Hero Section - Cinematic Intro */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Data Grid Background */}
          <DataGridBackground />
          
          {/* Floating Particles */}
          <FloatingParticles />
          
          {/* Depth Lighting */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/30 to-background pointer-events-none" />
          
          {/* Dynamic Gradient Orbs */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(var(--neon-blue)) 0%, transparent 70%)',
            }}
            animate={{
              x: [mousePosition.x * 0.05, mousePosition.x * 0.03],
              y: [mousePosition.y * 0.05, mousePosition.y * 0.03],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(circle, hsl(var(--cyber-purple)) 0%, transparent 70%)',
            }}
            animate={{
              x: [-mousePosition.x * 0.03, -mousePosition.x * 0.05],
              y: [-mousePosition.y * 0.03, -mousePosition.y * 0.05],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <div className="container mx-auto relative z-10 px-4">
            <div className="text-center space-y-12">
              {/* Badge with Glitch */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.15)] to-[hsl(var(--cyber-purple)/0.15)] border border-[hsl(var(--neon-blue)/0.4)] backdrop-blur-xl"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-5 w-5 text-[hsl(var(--electric-green))]" />
                </motion.div>
                <span className="text-sm font-mono uppercase tracking-wider font-semibold">
                  Security Process Framework
                </span>
              </motion.div>
              
              {/* Hero Title with Scan-in Animation */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <GlitchText className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight font-bold">
                    Elite Cyber Defense
                  </GlitchText>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="relative"
                >
                  <motion.h2
                    className="font-display text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[hsl(var(--neon-blue))] via-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-cyan))] bg-clip-text text-transparent font-bold"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    style={{
                      backgroundSize: '200% auto',
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                    }}
                  >
                    Process Architecture
                  </motion.h2>
                  {/* Neon Sweep Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue)/0.3)] to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-muted-foreground text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed"
              >
                Five-phase methodology transforming Fortune 500 enterprises from reactive to{' '}
                <span className="text-[hsl(var(--neon-blue))] font-semibold">proactive defense.</span>
                <br />
                Military-grade processes refined through elite operations.
              </motion.p>

              {/* CTA Buttons with Magnetic Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-wrap items-center justify-center gap-6 pt-8"
              >
                <MagneticButton variant="hero" size="lg">
                  <Play className="h-5 w-5" />
                  Start Your Assessment
                  <ArrowRight className="h-5 w-5" />
                </MagneticButton>
                
                <MagneticButton variant="outline" size="lg">
                  <Download className="h-5 w-5" />
                  Download Process Guide
                </MagneticButton>
              </motion.div>
            </div>
          </div>

          {/* Animated Stats Row with Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute bottom-12 left-0 right-0 z-10"
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {[
                  { metric: "5", label: "Security Phases", icon: Target },
                  { metric: "99.9%", label: "Success Rate", icon: TrendingUp },
                  { metric: "<15min", label: "Response Time", icon: Zap },
                  { metric: "24/7", label: "Elite SOC", icon: Shield }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    className="relative group"
                  >
                    <div className="relative text-center p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--card)/0.6)] to-[hsl(var(--card)/0.3)] backdrop-blur-xl border border-[hsl(var(--border)/0.5)] overflow-hidden">
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue)/0.1)] to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 5,
                          delay: index * 0.2,
                        }}
                      />
                      
                      <div className="relative z-10 space-y-2">
                        <stat.icon className="w-6 h-6 text-[hsl(var(--neon-blue))] mx-auto opacity-60" />
                        <motion.div
                          className="font-display text-3xl md:text-4xl text-[hsl(var(--neon-blue))] font-bold"
                          whileHover={{ scale: 1.1 }}
                        >
                          <AnimatedCounter value={stat.metric} />
                        </motion.div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                      
                      {/* Pulse Glow on Hover */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          boxShadow: '0 0 30px hsl(var(--neon-blue)/0.3)',
                        }}
                      />
                    </div>
                    
                    {/* Connector Line */}
                    {index < 3 && (
                      <motion.div
                        className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-[hsl(var(--neon-blue))] to-transparent"
                        animate={{
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3D Timeline Section */}
        <section className="py-32 relative overflow-hidden">
          {/* Section Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(var(--card)/0.1)] to-background" />
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.h2
                className="font-display text-4xl md:text-6xl font-bold mb-6"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--foreground)), hsl(var(--neon-blue)), hsl(var(--cyber-purple)), hsl(var(--foreground)))',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                }}
              >
                Five-Phase Security Architecture
              </motion.h2>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
                Scroll-activated defense system revealing our elite methodology
              </p>
            </motion.div>

            {/* 3D Timeline Cards */}
            <div className="space-y-32 max-w-6xl mx-auto">
              {processSteps.map((step, index) => {
                const stepRef = useRef<HTMLDivElement>(null);
                const isInView = useInView(stepRef, { once: false, margin: "-20%" });
                
                return (
                  <motion.div
                    key={step.id}
                    ref={stepRef}
                    data-step={step.id}
                    initial={{ opacity: 0, y: 100 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      y: 0,
                      rotateX: 0,
                    } : {
                      opacity: 0.3,
                      y: 50,
                      rotateX: 10,
                    }}
                    transition={{ 
                      duration: 0.8,
                      type: "spring",
                      bounce: 0.3
                    }}
                    className="relative"
                    style={{ perspective: '1000px' }}
                  >
                    {/* Holographic Fade Effect */}
                    <motion.div
                      className="absolute -inset-4 rounded-3xl opacity-0"
                      animate={isInView ? {
                        opacity: [0, 0.5, 0],
                        scale: [0.95, 1.05, 0.95],
                      } : {}}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      style={{
                        background: `radial-gradient(circle at center, hsl(var(--${step.color})/0.3) 0%, transparent 70%)`,
                        filter: 'blur(20px)',
                      }}
                    />

                    {/* Main 3D Card */}
                    <motion.div
                      className="relative bg-gradient-to-br from-[hsl(var(--card)/0.8)] to-[hsl(var(--card)/0.4)] backdrop-blur-xl border border-[hsl(var(--border)/0.5)] rounded-3xl overflow-hidden"
                      whileHover={{
                        scale: 1.02,
                        rotateY: 2,
                        rotateX: -2,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: isInView 
                          ? `0 20px 60px -10px hsl(var(--${step.color})/0.4)`
                          : 'none',
                      }}
                    >
                      {/* Animated Mesh Background */}
                      <div className="absolute inset-0 opacity-5">
                        <motion.div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `
                              repeating-linear-gradient(0deg, hsl(var(--${step.color})) 0px, transparent 1px, transparent 40px),
                              repeating-linear-gradient(90deg, hsl(var(--${step.color})) 0px, transparent 1px, transparent 40px)
                            `,
                          }}
                          animate={{
                            backgroundPosition: ['0px 0px', '40px 40px'],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </div>

                      {/* Light Scan Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue)/0.1)] to-transparent"
                        animate={{
                          x: isInView ? ['-100%', '200%'] : '-100%',
                        }}
                        transition={{
                          duration: 2,
                          delay: index * 0.3,
                          repeat: isInView ? Infinity : 0,
                          repeatDelay: 5,
                        }}
                      />

                      <div className="relative z-10 p-8 md:p-12">
                        <div className="grid lg:grid-cols-3 gap-10">
                          {/* Left: Icon & Phase */}
                          <div className="lg:col-span-1 space-y-6">
                            {/* Floating Icon */}
                            <motion.div
                              className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getColorClasses(step.color).bgGradient} border-2 ${getColorClasses(step.color).border} flex items-center justify-center relative`}
                              animate={isInView ? {
                                y: [0, -10, 0],
                                boxShadow: [
                                  `0 0 0px hsl(var(--${step.color})/0)`,
                                  `0 20px 40px hsl(var(--${step.color})/0.5)`,
                                  `0 0 0px hsl(var(--${step.color})/0)`,
                                ],
                              } : {}}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                              }}
                            >
                              <step.icon className={`w-12 h-12 ${getColorClasses(step.color).text}`} />
                              
                              {/* Orbiting Particles */}
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className={`absolute w-2 h-2 rounded-full ${getColorClasses(step.color).bg}`}
                                  animate={{
                                    rotate: [0, 360],
                                  }}
                                  transition={{
                                    duration: 3 + i,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                  style={{
                                    transformOrigin: `${30 + i * 10}px 0px`,
                                  }}
                                />
                              ))}
                            </motion.div>

                            {/* Phase Badge with Precision Line */}
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: '100%' } : { width: 0 }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="space-y-2"
                            >
                              <div className={`h-px bg-gradient-to-r from-${step.color} to-transparent`} />
                              <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r ${getColorClasses(step.color).bgGradient} border ${getColorClasses(step.color).border} text-sm font-mono font-semibold`}>
                                <motion.span
                                  className={`h-2 w-2 rounded-full ${getColorClasses(step.color).bg}`}
                                  animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [1, 0.5, 1],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                  }}
                                />
                                Phase {step.id}
                              </div>
                            </motion.div>

                            {/* Duration */}
                            <div className="text-sm text-muted-foreground font-mono">
                              <span className="font-semibold">Timeline:</span> {step.duration}
                            </div>
                          </div>

                          {/* Right: Content */}
                          <div className="lg:col-span-2 space-y-6">
                            {/* Title with Data-Beam Effect */}
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                              transition={{ delay: 0.3 }}
                            >
                              <h3 className="font-display text-3xl md:text-4xl font-bold mb-3 relative">
                                {step.title}
                                <motion.div
                                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-transparent"
                                  initial={{ width: 0 }}
                                  animate={isInView ? { width: '60%' } : { width: 0 }}
                                  transition={{ duration: 0.8, delay: 0.5 }}
                                />
                              </h3>
                              <p className={`text-xl ${getColorClasses(step.color).text} font-semibold mb-4`}>
                                {step.subtitle}
                              </p>
                              <p className="text-muted-foreground leading-relaxed text-lg">
                                {step.description}
                              </p>
                            </motion.div>

                            {/* Deliverables with Floating Icons */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              <h4 className="font-semibold mb-4 flex items-center gap-2 text-lg">
                                <Network className={`w-5 h-5 ${getColorClasses(step.color).text}`} />
                                Key Deliverables
                              </h4>
                              <div className="grid md:grid-cols-2 gap-3">
                                {step.deliverables.map((deliverable, idx) => (
                                  <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    transition={{ delay: 0.7 + idx * 0.1 }}
                                    className="group/item flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[hsl(var(--card)/0.8)] to-[hsl(var(--card)/0.4)] border border-[hsl(var(--border)/0.3)] hover:border-[hsl(var(--neon-blue)/0.5)] transition-all duration-300 cursor-default"
                                  >
                                    <motion.span 
                                      className={`w-2 h-2 rounded-full ${getColorClasses(step.color).bg}`}
                                      whileHover={{ scale: 1.5 }}
                                    />
                                    <span className="text-sm font-medium group-hover/item:text-[hsl(var(--neon-blue))] transition-colors">
                                      {deliverable}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>

                            {/* View Details - Elegant Hover */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                              transition={{ delay: 1 }}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                                className={`group/btn relative ${getColorClasses(step.color).text} hover:bg-transparent`}
                              >
                                {/* Glowing Contour */}
                                <motion.div
                                  className="absolute inset-0 rounded-md border opacity-0 group-hover/btn:opacity-100"
                                  style={{
                                    borderColor: `hsl(var(--${step.color}))`,
                                  }}
                                  animate={{
                                    boxShadow: [
                                      `0 0 0px hsl(var(--${step.color})/0)`,
                                      `0 0 20px hsl(var(--${step.color})/0.5)`,
                                      `0 0 0px hsl(var(--${step.color})/0)`,
                                    ],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                  }}
                                />
                                <span className="relative z-10 flex items-center gap-2">
                                  View Detailed Methodology
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                                    expandedStep === step.id ? 'rotate-180' : ''
                                  }`} />
                                </span>
                              </Button>
                            </motion.div>

                            {/* Expanded Details */}
                            {expandedStep === step.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 p-8 rounded-2xl bg-gradient-to-br from-[hsl(var(--card)/0.9)] to-[hsl(var(--card)/0.5)] border border-[hsl(var(--border)/0.5)] backdrop-blur-xl overflow-hidden"
                              >
                                <div className="grid md:grid-cols-3 gap-8">
                                  <div>
                                    <h5 className="font-semibold mb-3 text-[hsl(var(--neon-blue))] text-lg flex items-center gap-2">
                                      <Brain className="w-5 h-5" />
                                      Methodology
                                    </h5>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.details.methodology}</p>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold mb-3 text-[hsl(var(--electric-green))] text-lg flex items-center gap-2">
                                      <Zap className="w-5 h-5" />
                                      Tools & Tech
                                    </h5>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.details.tools}</p>
                                  </div>
                                  <div>
                                    <h5 className="font-semibold mb-3 text-[hsl(var(--cyber-purple))] text-lg flex items-center gap-2">
                                      <CheckCircle className="w-5 h-5" />
                                      Expected Outcome
                                    </h5>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.details.outcome}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Progress Connector */}
                    {index < processSteps.length - 1 && (
                      <motion.div
                        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-20"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${getColorClasses(step.color).bgGradient} border-2 ${getColorClasses(step.color).border} flex items-center justify-center`}
                          animate={{
                            y: [0, 10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <ArrowRight className={`w-5 h-5 ${getColorClasses(step.color).text} rotate-90`} />
                        </motion.div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue)/0.3)] to-transparent animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-[hsl(var(--cyber-purple)/0.3)] to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </section>

        {/* Cinematic CTA Section - 3D Shield Formation */}
        <section className="py-40 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-[hsl(var(--neon-blue)/0.1)] via-transparent to-transparent"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
            />
            
            {/* Rotating Data Ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 border border-[hsl(var(--neon-blue)/0.2)] rounded-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-[hsl(var(--neon-blue))]"
                  style={{
                    top: '50%',
                    left: '50%',
                    marginTop: '-6px',
                    marginLeft: '-6px',
                  }}
                  animate={{
                    rotate: [i * 45, i * 45 + 360],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
            
            {/* Radar Sweep Effect */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, hsl(var(--neon-blue)/0.3) 10%, transparent 20%)',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* 3D Shield Formation */}
              <motion.div
                className="mb-12 relative"
                initial={{ scale: 0, rotateY: 180 }}
                whileInView={{ scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  duration: 1.5,
                  bounce: 0.3,
                }}
                style={{
                  perspective: '1000px',
                }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-32 h-32 relative"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Shield with Particles */}
                  <Shield className="w-24 h-24 text-[hsl(var(--neon-blue))]" strokeWidth={1.5} />
                  
                  {/* Orbiting Data Particles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-[hsl(var(--electric-green))]"
                      style={{
                        top: '50%',
                        left: '50%',
                      }}
                      animate={{
                        x: [
                          Math.cos((i / 12) * Math.PI * 2) * 60,
                          Math.cos((i / 12) * Math.PI * 2 + Math.PI * 2) * 60,
                        ],
                        y: [
                          Math.sin((i / 12) * Math.PI * 2) * 60,
                          Math.sin((i / 12) * Math.PI * 2 + Math.PI * 2) * 60,
                        ],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>

              {/* Grand Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                <span className="block text-foreground mb-2">
                  Ready to Reinforce
                </span>
                <motion.span
                  className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] via-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-cyan))] bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  style={{
                    backgroundSize: '200% auto',
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                >
                  Your Digital Future?
                </motion.span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-muted-foreground text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto"
              >
                Join <span className="text-[hsl(var(--neon-blue))] font-semibold">500+ elite enterprises</span> who trust our battle-tested methodology to defend their digital empires.
              </motion.p>

              {/* Premium CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                {/* Primary CTA with Neon Trail */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] opacity-30 blur-lg"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <MagneticButton variant="hero" size="lg">
                    <Target className="h-5 w-5" />
                    Begin Security Assessment
                    <ArrowRight className="h-5 w-5" />
                  </MagneticButton>
                </motion.div>

                {/* Secondary CTA with Border Glow */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="absolute -inset-0.5 rounded-lg border-2 opacity-0"
                    whileHover={{
                      opacity: [0, 1, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                    style={{
                      borderColor: 'hsl(var(--cyber-purple))',
                      boxShadow: '0 0 30px hsl(var(--cyber-purple)/0.5)',
                    }}
                  />
                  <MagneticButton variant="outline" size="lg">
                    <Radar className="h-5 w-5" />
                    Schedule Consultation
                  </MagneticButton>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="mt-16 pt-12 border-t border-[hsl(var(--border)/0.3)]"
              >
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                  {[
                    { label: "Fortune 500 Clients", value: "200+" },
                    { label: "Security Experts", value: "500+" },
                    { label: "Client Satisfaction", value: "99.9%" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-display font-bold text-[hsl(var(--neon-blue))] mb-2">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OurProcess;