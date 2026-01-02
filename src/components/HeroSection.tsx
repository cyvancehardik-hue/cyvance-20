import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Server, Cloud, Lock, AlertTriangle, Database, FileText, Play, MessageSquare, Users } from "lucide-react";

// Floating security card
const SecurityCard = ({ 
  icons,
  value, 
  delay,
  position,
  label
}: { 
  icons: React.ReactNode;
  value?: string;
  label?: string;
  delay: number;
  position: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={`absolute ${position} z-20`}
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
      className="w-40 h-40 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        {icons}
        {value && (
          <div className="px-4 py-1.5 rounded-full bg-[hsl(200_90%_45%)] text-white text-sm font-bold shadow-lg">
            {value}
          </div>
        )}
        {label && (
          <span className="text-white/60 text-xs font-medium">{label}</span>
        )}
      </div>
    </motion.div>
  </motion.div>
);

// Network node with color
const NetworkNode = ({ 
  color, 
  size,
  delay, 
  position,
  icon,
  glowColor
}: { 
  color: string;
  size: number;
  delay: number; 
  position: string;
  icon?: React.ReactNode;
  glowColor?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7, delay, type: "spring", stiffness: 180 }}
    className={`absolute ${position} z-20`}
  >
    <motion.div
      animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }}
      transition={{ duration: 4.5 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
      className={`rounded-2xl ${color} shadow-xl flex items-center justify-center`}
      style={{ 
        width: size, 
        height: size,
        boxShadow: glowColor ? `0 10px 40px -8px ${glowColor}` : undefined
      }}
    >
      {icon}
    </motion.div>
  </motion.div>
);

// Center product showcase
const CenterShowcase = () => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="absolute left-1/2 bottom-[5%] -translate-x-1/2 z-30 hidden lg:block"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-48 h-56 rounded-3xl bg-[hsl(220_25%_12%)] shadow-2xl flex flex-col items-center justify-center border border-white/10"
      style={{ boxShadow: '0 30px 60px -12px rgba(0, 180, 216, 0.25)' }}
    >
      <div className="w-16 h-16 mb-4">
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <path 
            d="M32 8 L48 24 L32 24 L32 40 L48 40 L32 56 L16 40 L32 40 L32 24 L16 24 Z" 
            fill="url(#heroShieldGradient)"
          />
          <defs>
            <linearGradient id="heroShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(185, 96%, 55%)" />
              <stop offset="100%" stopColor="hsl(200, 100%, 65%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <span className="text-white text-base font-display tracking-widest">CYVANCE</span>
    </motion.div>
  </motion.div>
);

// SVG Connection lines for the network
const ConnectionLines = () => (
  <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    {/* Horizontal and diagonal connection lines */}
    <motion.line x1="60%" y1="50%" x2="85%" y2="35%" stroke="url(#lineGradient)" strokeWidth="1" 
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.2 }} />
    <motion.line x1="62%" y1="55%" x2="80%" y2="60%" stroke="url(#lineGradient)" strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.4 }} />
    <motion.line x1="65%" y1="48%" x2="78%" y2="45%" stroke="url(#lineGradient)" strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.6 }} />
    <motion.line x1="70%" y1="55%" x2="90%" y2="65%" stroke="url(#lineGradient)" strokeWidth="1"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.8 }} />
  </svg>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex flex-col overflow-hidden">
      {/* ===== TOP SECTION: Dark background with hero text ===== */}
      <div className="relative z-20 pt-24 pb-8 lg:pt-32 lg:pb-12">
        {/* Dark background for text area */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_30%_5%)] via-[hsl(220_35%_8%)] to-transparent -z-10" />
        
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm">
                <span className="px-2 py-0.5 rounded-full bg-[hsl(200_80%_50%)] text-white text-xs font-semibold">Update</span>
                <span className="text-white/80 text-sm">AI-Powered Threat Detection is now live</span>
                <ArrowRight className="w-3 h-3 text-white/50" />
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl xl:text-[4.2rem] font-display font-bold tracking-tight mb-5 leading-[1.1] text-white"
            >
              Secure your infrastructure
              <br />
              before it's exploited
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-white/65 max-w-2xl mx-auto mb-8 leading-relaxed font-light"
            >
              Advanced penetration testing, risk assessment, and continuous monitoring 
              for organizations that can't afford to be compromised.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Button 
                size="lg"
                className="h-12 px-8 text-sm font-semibold bg-[hsl(200_85%_50%)] hover:bg-[hsl(200_85%_45%)] text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300"
              >
                Get Security Assessment
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="h-12 px-6 text-sm font-medium border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                Talk to founder
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== GAP: Smaller breathing space ===== */}
      <div className="h-4 lg:h-8" />

      {/* ===== BOTTOM SECTION: Blue gradient with floating visuals ===== */}
      <div className="relative flex-1 min-h-[55vh] lg:min-h-[60vh]">
        {/* Deep blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210_70%_20%)] via-[hsl(205_80%_38%)] to-[hsl(200_90%_50%)] -z-10" />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.06] -z-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Subtle wave pattern */}
        <div className="absolute inset-0 opacity-10 -z-5">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 400">
            <path 
              d="M0,100 Q300,50 600,100 T1200,100 L1200,400 L0,400 Z" 
              fill="url(#waveGradient)" 
            />
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Connection Lines */}
        <ConnectionLines />

        {/* ===== FLOATING SECURITY CARDS - Left Side ===== */}
        <SecurityCard
          icons={
            <div className="flex flex-wrap gap-1.5 justify-center">
              <div className="w-9 h-11 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="w-9 h-11 bg-red-500 rounded-lg flex items-center justify-center shadow-md">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div className="w-9 h-11 bg-amber-700 rounded-lg flex items-center justify-center shadow-md">
                <Database className="w-4 h-4 text-white" />
              </div>
            </div>
          }
          value="1,247"
          label="Threats Blocked"
          delay={0.6}
          position="left-[4%] top-[5%] hidden lg:block"
        />
        
        <SecurityCard
          icons={
            <div className="flex flex-wrap gap-1.5 justify-center">
              <div className="w-10 h-9 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
                <Play className="w-4 h-4 text-white" />
              </div>
              <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center shadow-md border border-white/10">
                <Server className="w-4 h-4 text-white" />
              </div>
            </div>
          }
          value="24,892"
          label="Scans Complete"
          delay={0.8}
          position="left-[12%] top-[45%] hidden lg:block"
        />

        <SecurityCard
          icons={
            <div className="flex gap-1.5 justify-center">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <Cloud className="w-4 h-4 text-white" />
              </div>
              <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                <Lock className="w-4 h-4 text-white" />
              </div>
            </div>
          }
          value="99.9%"
          label="Uptime Protected"
          delay={1.0}
          position="left-[3%] bottom-[8%] hidden xl:block"
        />

        {/* ===== CENTER PRODUCT SHOWCASE ===== */}
        <CenterShowcase />

        {/* ===== NETWORK NODES - Right Side ===== */}
        <NetworkNode color="bg-cyan-400" size={52} delay={0.5} position="right-[22%] top-[8%] hidden lg:block" glowColor="rgba(34, 211, 238, 0.4)" />
        <NetworkNode color="bg-emerald-500" size={42} delay={0.6} position="right-[8%] top-[12%] hidden lg:block" glowColor="rgba(16, 185, 129, 0.4)" />
        <NetworkNode 
          color="bg-slate-700" 
          size={50} 
          delay={0.7} 
          position="right-[14%] top-[24%] hidden lg:block" 
          icon={<Play className="w-4 h-4 text-white" />}
        />
        <NetworkNode color="bg-violet-400" size={38} delay={0.8} position="right-[26%] top-[28%] hidden lg:block" glowColor="rgba(167, 139, 250, 0.4)" />
        <NetworkNode 
          color="bg-slate-600" 
          size={54} 
          delay={0.9} 
          position="right-[5%] top-[35%] hidden xl:block"
          icon={<MessageSquare className="w-5 h-5 text-white" />} 
        />
        <NetworkNode color="bg-green-400" size={46} delay={1.0} position="right-[18%] top-[42%] hidden lg:block" glowColor="rgba(74, 222, 128, 0.4)" />
        <NetworkNode color="bg-blue-500" size={40} delay={1.1} position="right-[7%] top-[50%] hidden lg:block" glowColor="rgba(59, 130, 246, 0.4)" />
        <NetworkNode color="bg-purple-300" size={34} delay={1.2} position="right-[28%] top-[52%] hidden lg:block" />
        <NetworkNode color="bg-slate-700" size={44} delay={1.3} position="right-[15%] top-[60%] hidden lg:block" icon={<Shield className="w-4 h-4 text-cyan-400" />} />
        <NetworkNode color="bg-red-400" size={38} delay={1.4} position="right-[4%] bottom-[32%] hidden xl:block" glowColor="rgba(248, 113, 113, 0.4)" />
        <NetworkNode color="bg-orange-400" size={34} delay={1.5} position="right-[24%] bottom-[28%] hidden lg:block" glowColor="rgba(251, 146, 60, 0.4)" />
        <NetworkNode color="bg-emerald-500" size={42} delay={1.6} position="right-[10%] bottom-[22%] hidden lg:block" glowColor="rgba(16, 185, 129, 0.4)" />
        <NetworkNode 
          color="bg-slate-600" 
          size={50} 
          delay={1.7} 
          position="right-[26%] bottom-[16%] hidden xl:block"
          icon={<Users className="w-5 h-5 text-white" />}
        />
        <NetworkNode color="bg-violet-400" size={36} delay={1.8} position="right-[3%] bottom-[12%] hidden xl:block" glowColor="rgba(167, 139, 250, 0.4)" />
        <NetworkNode color="bg-cyan-400" size={30} delay={1.9} position="right-[18%] bottom-[8%] hidden lg:block" glowColor="rgba(34, 211, 238, 0.4)" />
      </div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-30" />
    </section>
  );
};
