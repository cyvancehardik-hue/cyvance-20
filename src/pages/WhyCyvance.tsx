import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Globe, Users, TrendingUp, Award, Lock, Zap, Eye, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const visionValues = [
  {
    icon: Shield,
    title: "Security First",
    description: "Every decision we make prioritizes the protection of your digital assets"
  },
  {
    icon: Users,
    title: "Human-Centric",
    description: "Technology serves people, not the other way around"
  },
  {
    icon: TrendingUp,
    title: "Continuous Evolution",
    description: "We adapt and innovate to stay ahead of emerging threats"
  }
];

const achievements = [
  { number: "500+", label: "Enterprise Clients Protected", color: "from-blue-400 to-cyan-400" },
  { number: "99.9%", label: "Uptime Guarantee", color: "from-purple-400 to-blue-400" },
  { number: "15+", label: "Years of Excellence", color: "from-cyan-400 to-teal-400" },
  { number: "24/7", label: "Global Security Operations", color: "from-teal-400 to-green-400" }
];

const coreCapabilities = [
  {
    icon: Eye,
    title: "Advanced Threat Detection",
    description: "AI-powered detection systems that identify threats before they impact your business",
    features: ["Real-time monitoring", "Behavioral analysis", "Zero-day protection"]
  },
  {
    icon: Target,
    title: "Precision Response",
    description: "Automated response systems that neutralize threats with surgical precision",
    features: ["Automated containment", "Threat neutralization", "Recovery orchestration"]
  },
  {
    icon: Clock,
    title: "Proactive Defense",
    description: "Stay ahead of threats with predictive security intelligence and prevention",
    features: ["Threat intelligence", "Vulnerability assessment", "Risk prediction"]
  }
];

const WhyCyvance = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" });
  const capabilitiesInView = useInView(capabilitiesRef, { once: true, margin: "-100px" });

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

      {/* Hero Section - Palo Alto Inspired */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with space/tech theme */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--neon-blue)/0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--cyber-purple)/0.1),transparent_70%)]" />
          
          {/* Animated grid pattern */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }}
            animate={{ 
              backgroundPosition: ['0px 0px', '100px 100px'] 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>

        {/* Floating Cyvance Logo */}
        <motion.div
          className="absolute top-1/2 right-1/4 transform -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={heroInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] rounded-full blur-3xl opacity-30 scale-150" />
            {/* Logo placeholder - using geometric shape similar to Cyvance logo */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <motion.div
                className="w-32 h-32 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] transform rotate-45 rounded-2xl"
                animate={{ 
                  rotate: [45, 50, 45],
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
                  rotate: [45, 40, 45],
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                <span className="block text-foreground">Our vision is a</span>
                <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                  cyber-secure world
                </span>
                <span className="block text-foreground">where each day is</span>
                <span className="block bg-gradient-to-r from-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-blue))] bg-clip-text text-transparent">
                  safer and more
                </span>
                <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                  secure
                </span>
                <span className="block text-foreground">than the one before</span>
              </h1>
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              The cybersecurity partner of choice, transforming complex security challenges into clear, actionable solutions that protect what matters most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                variant="hero" 
                size="lg"
                className="px-8 py-4 text-lg font-semibold"
                onClick={() => navigate('/#contact')}
              >
                Start Your Security Journey
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section ref={visionRef} className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on principles that drive everything we do, from product development to customer relationships
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {visionValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  animate={visionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] p-0.5 mb-6">
                    <div className="flex items-center justify-center w-full h-full bg-background rounded-[11px]">
                      <IconComponent className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Achievements */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-xl border bg-card/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent mb-2`}>
                  {achievement.number}
                </div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section ref={capabilitiesRef} className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-muted/20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                Elite Security
              </span> Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced technologies and methodologies that set us apart in the cybersecurity landscape
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {coreCapabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  animate={capabilitiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="flex items-center justify-center w-full h-full bg-background rounded-[11px]">
                      <IconComponent className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[hsl(var(--neon-blue))] transition-colors duration-300">
                    {capability.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {capability.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {capability.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-4xl mx-auto p-12 rounded-3xl border bg-card/30 backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.05)] via-transparent to-[hsl(var(--cyber-purple)/0.05)]" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">Cyvance Excellence</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the ranks of industry leaders who trust Cyvance to protect their digital future
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => navigate('/#contact')}
                  className="px-8 py-4 text-lg font-semibold"
                >
                  Get Started Today
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/')}
                  className="px-8 py-4 text-lg font-semibold"
                >
                  Explore Our Services
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhyCyvance;