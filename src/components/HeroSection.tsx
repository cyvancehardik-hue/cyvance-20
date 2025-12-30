import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Server, AlertTriangle, Zap, Globe, Database } from "lucide-react";
import { ClientLogos } from "@/components/ClientLogos";

// Floating security card component
const FloatingCard = ({ 
  icon: Icon, 
  label, 
  value, 
  color, 
  delay,
  position 
}: { 
  icon: React.ElementType; 
  label: string; 
  value?: string; 
  color: string;
  delay: number;
  position: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={`absolute ${position} z-10`}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
      className="floating-card group"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} mb-2`}>
        <Icon className="w-5 h-5" />
      </div>
      {value && (
        <div className="text-lg font-bold text-foreground">{value}</div>
      )}
      <div className="text-xs text-muted-foreground">{label}</div>
    </motion.div>
  </motion.div>
);

// Network node component
const NetworkNode = ({ 
  size, 
  color, 
  delay, 
  position 
}: { 
  size: number; 
  color: string; 
  delay: number; 
  position: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`absolute ${position}`}
  >
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, delay: delay * 0.5 }}
      className={`rounded-xl ${color} backdrop-blur-sm border border-border/20 shadow-lg`}
      style={{ width: size, height: size }}
    />
  </motion.div>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200_100%_50%/0.08)] via-transparent to-transparent" />
        
        {/* Animated grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--neon-blue)/0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--neon-blue)/0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(200_100%_50%/0.12),transparent_70%)]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(270_92%_65%/0.08),transparent_70%)]" />
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(200 100% 60%)" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(200 100% 60%)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(200 100% 60%)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.line
            x1="10%" y1="30%" x2="30%" y2="50%"
            stroke="url(#lineGradient)" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.line
            x1="70%" y1="20%" x2="90%" y2="40%"
            stroke="url(#lineGradient)" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
          />
          <motion.line
            x1="80%" y1="60%" x2="95%" y2="80%"
            stroke="url(#lineGradient)" strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
        </svg>
      </div>

      {/* Floating Security Cards - Left Side */}
      <FloatingCard
        icon={Server}
        label="Protected Servers"
        value="2,847"
        color="bg-[hsl(200_100%_50%/0.15)] text-[hsl(var(--neon-blue))]"
        delay={0.3}
        position="left-[5%] top-[25%] hidden lg:block"
      />
      <FloatingCard
        icon={Shield}
        label="Threats Blocked"
        value="99.9%"
        color="bg-[hsl(120_100%_50%/0.15)] text-[hsl(var(--electric-green))]"
        delay={0.5}
        position="left-[8%] top-[55%] hidden lg:block"
      />
      <FloatingCard
        icon={Database}
        label="Data Secured"
        color="bg-[hsl(270_92%_65%/0.15)] text-[hsl(var(--cyber-purple))]"
        delay={0.7}
        position="left-[3%] bottom-[20%] hidden xl:block"
      />

      {/* Floating Network Nodes - Right Side */}
      <NetworkNode size={48} color="bg-[hsl(200_100%_50%/0.1)]" delay={0.4} position="right-[15%] top-[20%] hidden lg:block" />
      <NetworkNode size={36} color="bg-[hsl(270_92%_65%/0.1)]" delay={0.6} position="right-[8%] top-[35%] hidden lg:block" />
      <NetworkNode size={56} color="bg-[hsl(120_100%_50%/0.08)]" delay={0.8} position="right-[20%] top-[50%] hidden lg:block" />
      <NetworkNode size={40} color="bg-[hsl(185_96%_52%/0.1)]" delay={1} position="right-[5%] top-[55%] hidden xl:block" />
      <NetworkNode size={32} color="bg-[hsl(200_100%_50%/0.1)]" delay={1.2} position="right-[25%] top-[70%] hidden lg:block" />
      <NetworkNode size={44} color="bg-[hsl(270_92%_65%/0.08)]" delay={1.4} position="right-[12%] bottom-[20%] hidden xl:block" />

      {/* Alert indicator */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute right-[10%] top-[40%] hidden xl:block"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="floating-card !bg-[hsl(0_62%_30%/0.2)] !border-[hsl(0_62%_50%/0.3)]"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[hsl(0_62%_50%/0.2)] flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <div className="text-xs font-medium text-red-400">Threat Detected</div>
              <div className="text-[10px] text-muted-foreground">Blocked automatically</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto relative z-20 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="announcement-badge">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
                <span className="text-[hsl(var(--electric-green))]">New</span>
                <span className="text-muted-foreground">AI-Powered Threat Detection</span>
                <ArrowRight className="w-3 h-3 text-muted-foreground" />
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]"
          >
            <span className="text-foreground">Secure Your Systems</span>
            <br />
            <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] via-[hsl(var(--neon-cyan))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
              Before Hackers Find Them
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Enterprise-grade penetration testing, risk assessment, and cloud security 
            for organizations that can't afford to be compromised.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button 
              variant="premium" 
              size="lg"
              className="group h-14 px-8 text-base font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              Get Security Assessment
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-8 text-base font-medium border-border/50 bg-transparent hover:bg-accent/50"
            >
              <Globe className="w-4 h-4 mr-2" />
              Talk to Founder
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-xs text-muted-foreground/60 mb-6 uppercase tracking-widest">
              Trusted by modern enterprises worldwide
            </p>
            <ClientLogos />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};