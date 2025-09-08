import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, Zap, Rocket, ChevronDown, Shield, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent"
          >
            CYVANCE
          </button>
          <Button variant="ghost" onClick={() => navigate('/')}>
            ← Back to Home
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Cyber Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-background" />
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--neon-blue)/0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--neon-blue)/0.3) 1px, transparent 1px),
                radial-gradient(circle at 20% 50%, hsl(var(--cyber-purple)/0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, hsl(var(--neon-blue)/0.3) 0%, transparent 50%)
              `,
              backgroundSize: '100px 100px, 100px 100px, 800px 800px, 800px 800px'
            }}
            animate={{ 
              backgroundPosition: ['0px 0px, 0px 0px, 0px 0px, 0px 0px', '100px 100px, 100px 100px, 400px 400px, -400px -400px'] 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
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
          <div className="max-w-5xl">
            {/* Typewriter Headline */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground min-h-[200px] md:min-h-[300px]">
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
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={showSubheadline ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              Protecting your people, your data, and your future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={showSubheadline ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Button 
                variant="hero" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold relative overflow-hidden group"
                onClick={() => navigate('/#contact')}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Discover Why Cyvance</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))] hover:text-background"
                onClick={() => navigate('/#contact')}
              >
                Talk to Us
              </Button>
            </motion.div>

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
        </div>
      </section>

      {/* Our Why Section */}
      <section ref={visionRef} className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Story Copy */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                  Our Why
                </span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p className="text-xl font-semibold text-foreground">
                  Cybersecurity isn't just about firewalls and patches.
                </p>
                <p>
                  It's about <strong className="text-[hsl(var(--neon-blue))]">trust</strong>, <strong className="text-[hsl(var(--cyber-purple))]">clarity</strong>, and <strong className="text-[hsl(var(--neon-blue))]">resilience</strong>.
                </p>
                <p>
                  Cyvance exists to turn uncertainty into confidence, complexity into clarity, and reactive measures into proactive protection.
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
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={differentiatorInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                Our Promise
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={differentiatorInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: 5
                  }}
                  style={{ perspective: 1000 }}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${item.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="flex items-center justify-center w-full h-full bg-background rounded-[11px]">
                      <IconComponent className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[hsl(var(--neon-blue))] transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section ref={processRef} className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">Cyvance Way</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border hidden md:block">
              <motion.div
                className="h-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))]"
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
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Step Circle */}
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] p-0.5 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ 
                      boxShadow: "0 0 30px hsl(var(--neon-blue)/0.5)" 
                    }}
                  >
                    <div className="flex items-center justify-center w-full h-full bg-background rounded-full">
                      <span className="text-xl font-bold text-foreground">
                        {step.step}
                      </span>
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[hsl(var(--neon-blue))] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-lg font-medium text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.details}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof of Trust */}
      <section ref={proofRef} className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-muted/10 to-background" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                Trusted by innovators
              </span>, startups, and enterprises across industries.
            </h2>
          </motion.div>

          {/* Stats Counter */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border bg-card/30 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px hsl(var(--neon-blue)/0.2)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Full gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))]" />
        <div className="absolute inset-0 bg-background/90" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Ready for security that works 
              <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                with you, not against you?
              </span>
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('/#contact')}
                className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] text-white border-0 hover:scale-105 transition-transform duration-300"
              >
                Get Started with Cyvance
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/')}
                className="px-8 py-4 text-lg font-semibold border-[hsl(var(--neon-blue))] text-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))] hover:text-background"
              >
                Learn More About Our Approach
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhyCyvance;