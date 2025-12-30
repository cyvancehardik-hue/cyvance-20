import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock, Server, FileText, Users, Cloud, Database, Play, MessageSquare, File } from "lucide-react";

// Floating app card on the left side
const FloatingAppCard = ({ 
  icons,
  value, 
  delay,
  position,
  size = "default"
}: { 
  icons: React.ReactNode;
  value?: string; 
  delay: number;
  position: string;
  size?: "small" | "default" | "large";
}) => {
  const sizeClasses = {
    small: "w-24 h-24",
    default: "w-32 h-32",
    large: "w-36 h-36"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`absolute ${position} z-10`}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
        className={`${sizeClasses[size]} rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          {icons}
          {value && (
            <div className="px-3 py-1 rounded-full bg-[hsl(220_90%_40%)] text-white text-sm font-bold shadow-lg">
              {value}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Colorful network node
const ColorNode = ({ 
  color, 
  size,
  delay, 
  position,
  icon,
  hasGlow = false
}: { 
  color: string;
  size: number;
  delay: number; 
  position: string;
  icon?: React.ReactNode;
  hasGlow?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay, type: "spring", stiffness: 200 }}
    className={`absolute ${position}`}
  >
    <motion.div
      animate={{ y: [0, -6, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 4 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
      className={`rounded-2xl ${color} shadow-xl flex items-center justify-center`}
      style={{ 
        width: size, 
        height: size,
        boxShadow: hasGlow ? `0 8px 32px -4px ${color.includes('green') ? 'rgba(34, 197, 94, 0.4)' : color.includes('purple') ? 'rgba(168, 85, 247, 0.4)' : color.includes('red') ? 'rgba(239, 68, 68, 0.4)' : color.includes('orange') ? 'rgba(249, 115, 22, 0.4)' : 'rgba(59, 130, 246, 0.4)'}` : undefined
      }}
    >
      {icon}
    </motion.div>
  </motion.div>
);

// Center product showcase
const CenterShowcase = () => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="absolute left-1/2 bottom-[8%] -translate-x-1/2 z-20 hidden lg:block"
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-44 h-52 rounded-3xl bg-[hsl(220_30%_15%)] shadow-2xl flex flex-col items-center justify-center border border-white/10"
    >
      <div className="w-14 h-14 mb-3">
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <path 
            d="M32 8 L48 24 L32 24 L32 40 L48 40 L32 56 L16 40 L32 40 L32 24 L16 24 Z" 
            fill="url(#shieldGradient)"
          />
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(185, 96%, 52%)" />
              <stop offset="100%" stopColor="hsl(200, 100%, 60%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-white text-base font-display tracking-wider">CYVANCE</span>
    </motion.div>
  </motion.div>
);

// Connection lines SVG
const ConnectionLines = () => (
  <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    {/* Connection lines from center to nodes */}
    <motion.path
      d="M 50% 55% Q 65% 50% 75% 35%"
      stroke="url(#lineGrad1)"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 1 }}
    />
    <motion.path
      d="M 55% 58% Q 70% 55% 80% 50%"
      stroke="url(#lineGrad1)"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 1.2 }}
    />
    <motion.path
      d="M 55% 62% Q 68% 65% 78% 70%"
      stroke="url(#lineGrad1)"
      strokeWidth="1"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 1.4 }}
    />
  </svg>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden hero-blue-gradient">
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating App Cards - Left Side */}
      <FloatingAppCard
        icons={
          <div className="flex flex-wrap gap-1 justify-center">
            <div className="w-8 h-10 bg-green-500 rounded-md flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="w-8 h-10 bg-red-500 rounded-md flex items-center justify-center">
              <File className="w-5 h-5 text-white" />
            </div>
            <div className="w-8 h-10 bg-amber-800 rounded-md flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
          </div>
        }
        value="635"
        delay={0.2}
        position="left-[3%] top-[18%] hidden lg:block"
        size="large"
      />
      
      <FloatingAppCard
        icons={
          <div className="flex flex-wrap gap-1 justify-center">
            <div className="w-10 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">X</span>
            </div>
          </div>
        }
        value="14,782"
        delay={0.4}
        position="left-[12%] top-[42%] hidden lg:block"
        size="default"
      />

      <FloatingAppCard
        icons={
          <div className="flex gap-1 justify-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
          </div>
        }
        value="2,201"
        delay={0.6}
        position="left-[2%] bottom-[15%] hidden xl:block"
        size="default"
      />

      {/* Center Product Showcase */}
      <CenterShowcase />

      {/* Colorful Network Nodes - Right Side */}
      <ColorNode color="bg-blue-400" size={52} delay={0.3} position="right-[22%] top-[15%] hidden lg:block" hasGlow />
      <ColorNode color="bg-green-500" size={40} delay={0.4} position="right-[8%] top-[18%] hidden lg:block" hasGlow />
      <ColorNode 
        color="bg-slate-700" 
        size={48} 
        delay={0.5} 
        position="right-[12%] top-[28%] hidden lg:block" 
        icon={<Play className="w-4 h-4 text-white" />}
      />
      <ColorNode color="bg-purple-400" size={36} delay={0.6} position="right-[25%] top-[32%] hidden lg:block" />
      <ColorNode 
        color="bg-slate-600" 
        size={52} 
        delay={0.7} 
        position="right-[5%] top-[38%] hidden xl:block"
        icon={<MessageSquare className="w-5 h-5 text-white" />} 
      />
      <ColorNode color="bg-green-400" size={44} delay={0.8} position="right-[18%] top-[45%] hidden lg:block" hasGlow />
      <ColorNode color="bg-blue-500" size={38} delay={0.9} position="right-[8%] top-[52%] hidden lg:block" />
      <ColorNode color="bg-purple-300" size={32} delay={1.0} position="right-[28%] top-[55%] hidden lg:block" />
      <ColorNode color="bg-slate-700" size={42} delay={1.1} position="right-[15%] top-[62%] hidden lg:block" />
      <ColorNode color="bg-red-400" size={36} delay={1.2} position="right-[5%] bottom-[30%] hidden xl:block" hasGlow />
      <ColorNode color="bg-orange-400" size={32} delay={1.3} position="right-[22%] bottom-[28%] hidden lg:block" />
      <ColorNode color="bg-green-500" size={40} delay={1.4} position="right-[10%] bottom-[22%] hidden lg:block" hasGlow />
      <ColorNode 
        color="bg-slate-600" 
        size={48} 
        delay={1.5} 
        position="right-[25%] bottom-[18%] hidden xl:block"
        icon={<File className="w-5 h-5 text-white" />}
      />
      <ColorNode color="bg-purple-400" size={36} delay={1.6} position="right-[3%] bottom-[15%] hidden xl:block" />
      <ColorNode color="bg-green-400" size={28} delay={1.7} position="right-[18%] bottom-[12%] hidden lg:block" />

      {/* Connection Lines */}
      <ConnectionLines />

      {/* Main Content */}
      <div className="container mx-auto relative z-30 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-medium">Update</span>
              <span className="text-white/80">AI-Powered Security is now live</span>
              <ArrowRight className="w-3 h-3 text-white/60" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1] text-white"
          >
            Protect your business with
            <br />
            <span className="text-white">enterprise-grade security</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Advanced penetration testing, risk assessment, and cloud security 
            for organizations that can't afford to be compromised.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg"
              className="h-14 px-8 text-base font-semibold bg-[hsl(185_96%_45%)] hover:bg-[hsl(185_96%_40%)] text-slate-900 rounded-xl shadow-lg shadow-cyan-500/30"
            >
              Get Security Assessment
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-8 text-base font-medium border-white/30 bg-transparent hover:bg-white/10 text-white rounded-xl"
            >
              Talk to founder
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};