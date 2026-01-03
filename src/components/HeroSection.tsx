import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Server, Cloud, Lock, AlertTriangle, Database, FileText, Play, MessageSquare, Users } from "lucide-react";

// Floating security card - glass style
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
    initial={{ opacity: 0, y: 40, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={`absolute ${position} z-20 will-change-transform`}
    style={{ contain: 'layout' }}
  >
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut" }}
      className="w-44 h-44 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col items-center justify-center p-5 relative overflow-hidden"
      style={{ boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.35)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        {icons}
        {value && (
          <div className="px-5 py-1.5 rounded-full bg-[hsl(200_85%_48%)] text-white text-sm font-bold shadow-lg shadow-blue-500/30">
            {value}
          </div>
        )}
        {label && (
          <span className="text-white/70 text-xs font-medium tracking-wide">{label}</span>
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
    transition={{ duration: 0.8, delay, type: "spring", stiffness: 160 }}
    className={`absolute ${position} z-20 will-change-transform`}
    style={{ contain: 'layout' }}
  >
    <motion.div
      animate={{ y: [0, -10, 0], scale: [1, 1.04, 1] }}
      transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut" }}
      className={`rounded-2xl ${color} shadow-xl flex items-center justify-center`}
      style={{ 
        width: size, 
        height: size,
        boxShadow: glowColor ? `0 12px 45px -8px ${glowColor}` : '0 10px 30px -8px rgba(0,0,0,0.3)'
      }}
    >
      {icon}
    </motion.div>
  </motion.div>
);

// Center product showcase
const CenterShowcase = () => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="absolute left-1/2 bottom-[12%] -translate-x-1/2 z-30 hidden lg:block"
  >
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="w-52 h-60 rounded-3xl bg-[hsl(220_28%_10%)] shadow-2xl flex flex-col items-center justify-center border border-white/10"
      style={{ boxShadow: '0 35px 70px -15px rgba(0, 180, 216, 0.3)' }}
    >
      <div className="w-20 h-20 mb-5">
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
      <span className="text-white text-lg font-display tracking-[0.25em] font-medium">CYVANCE</span>
    </motion.div>
  </motion.div>
);

// SVG Connection lines for the network
const ConnectionLines = () => (
  <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-10" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    {/* Horizontal and diagonal connection lines */}
    <motion.line x1="58%" y1="48%" x2="82%" y2="32%" stroke="url(#lineGradient)" strokeWidth="1.5" 
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 1.2 }} />
    <motion.line x1="60%" y1="54%" x2="78%" y2="58%" stroke="url(#lineGradient)" strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 1.4 }} />
    <motion.line x1="64%" y1="46%" x2="76%" y2="42%" stroke="url(#lineGradient)" strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 1.6 }} />
    <motion.line x1="68%" y1="52%" x2="88%" y2="62%" stroke="url(#lineGradient)" strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 1.8 }} />
    <motion.line x1="72%" y1="38%" x2="85%" y2="28%" stroke="url(#lineGradient)" strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: 2.0 }} />
  </svg>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden overflow-x-hidden">
      {/* ===== FULL BLUE GRADIENT BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220_45%_8%)] via-[hsl(210_75%_28%)] to-[hsl(200_90%_52%)] -z-20 overflow-hidden" />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Soft ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,hsl(200_90%_50%/0.15)_0%,transparent_70%)] blur-3xl -z-10" />

      {/* Connection Lines */}
      <ConnectionLines />

      {/* ===== HERO CONTENT ===== */}
      <div className="relative z-20 container mx-auto pt-28 pb-8 lg:pt-36 lg:pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/8 backdrop-blur-md border border-white/15 text-sm shadow-lg shadow-black/10">
              <span className="px-2.5 py-1 rounded-full bg-[hsl(200_80%_50%)] text-white text-xs font-bold tracking-wide">Update</span>
              <span className="text-white/90 text-sm font-medium">AI-Powered Threat Detection is now live</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/60" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-display font-bold tracking-tight mb-6 leading-[1.08] text-white"
          >
            Secure your infrastructure
            <br />
            before it's exploited
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Advanced penetration testing, risk assessment, and continuous monitoring 
            for organizations that can't afford to be compromised.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg"
              className="h-13 px-9 text-base font-semibold bg-[hsl(200_85%_52%)] hover:bg-[hsl(200_85%_47%)] text-white rounded-xl shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
            >
              Get Security Assessment
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="h-13 px-7 text-base font-medium border-white/25 bg-white/8 hover:bg-white/15 text-white rounded-xl backdrop-blur-md transition-all duration-300"
            >
              Talk to founder
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ===== FLOATING SECURITY CARDS - Left Side ===== */}
      <SecurityCard
        icons={
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="w-10 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-12 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Database className="w-5 h-5 text-white" />
            </div>
          </div>
        }
        value="1,247"
        label="Threats Blocked"
        delay={0.7}
        position="left-[3%] top-[38%] hidden lg:block"
      />
      
      <SecurityCard
        icons={
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="w-11 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Play className="w-4 h-4 text-white" />
            </div>
            <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shadow-lg border border-white/10">
              <Server className="w-4 h-4 text-white" />
            </div>
          </div>
        }
        value="24,892"
        label="Scans Complete"
        delay={0.9}
        position="left-[12%] top-[62%] hidden lg:block"
      />

      <SecurityCard
        icons={
          <div className="flex gap-2 justify-center">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Lock className="w-5 h-5 text-white" />
            </div>
          </div>
        }
        value="99.9%"
        label="Uptime Protected"
        delay={1.1}
        position="left-[2%] bottom-[10%] hidden xl:block"
      />

      {/* ===== CENTER PRODUCT SHOWCASE ===== */}
      <CenterShowcase />

      {/* ===== NETWORK NODES - Right Side ===== */}
      <NetworkNode color="bg-cyan-400" size={56} delay={0.5} position="right-[20%] top-[32%] hidden lg:block" glowColor="rgba(34, 211, 238, 0.45)" />
      <NetworkNode color="bg-emerald-500" size={46} delay={0.6} position="right-[6%] top-[36%] hidden lg:block" glowColor="rgba(16, 185, 129, 0.45)" />
      <NetworkNode 
        color="bg-slate-700" 
        size={54} 
        delay={0.7} 
        position="right-[12%] top-[46%] hidden lg:block" 
        icon={<Play className="w-4 h-4 text-white" />}
      />
      <NetworkNode color="bg-violet-400" size={42} delay={0.8} position="right-[24%] top-[48%] hidden lg:block" glowColor="rgba(167, 139, 250, 0.45)" />
      <NetworkNode 
        color="bg-slate-600" 
        size={58} 
        delay={0.9} 
        position="right-[4%] top-[52%] hidden xl:block"
        icon={<MessageSquare className="w-5 h-5 text-white" />} 
      />
      <NetworkNode color="bg-green-400" size={50} delay={1.0} position="right-[16%] top-[58%] hidden lg:block" glowColor="rgba(74, 222, 128, 0.45)" />
      <NetworkNode color="bg-blue-500" size={44} delay={1.1} position="right-[5%] top-[66%] hidden lg:block" glowColor="rgba(59, 130, 246, 0.45)" />
      <NetworkNode color="bg-purple-300" size={38} delay={1.2} position="right-[26%] top-[64%] hidden lg:block" />
      <NetworkNode color="bg-slate-700" size={48} delay={1.3} position="right-[13%] top-[72%] hidden lg:block" icon={<Shield className="w-4 h-4 text-cyan-400" />} />
      <NetworkNode color="bg-red-400" size={42} delay={1.4} position="right-[3%] bottom-[20%] hidden xl:block" glowColor="rgba(248, 113, 113, 0.45)" />
      <NetworkNode color="bg-orange-400" size={38} delay={1.5} position="right-[22%] bottom-[18%] hidden lg:block" glowColor="rgba(251, 146, 60, 0.45)" />
      <NetworkNode color="bg-emerald-500" size={46} delay={1.6} position="right-[8%] bottom-[12%] hidden lg:block" glowColor="rgba(16, 185, 129, 0.45)" />
      <NetworkNode 
        color="bg-slate-600" 
        size={54} 
        delay={1.7} 
        position="right-[24%] bottom-[8%] hidden xl:block"
        icon={<Users className="w-5 h-5 text-white" />}
      />
      <NetworkNode color="bg-violet-400" size={40} delay={1.8} position="right-[2%] bottom-[6%] hidden xl:block" glowColor="rgba(167, 139, 250, 0.45)" />
      <NetworkNode color="bg-cyan-400" size={34} delay={1.9} position="right-[16%] bottom-[4%] hidden lg:block" glowColor="rgba(34, 211, 238, 0.45)" />

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent pointer-events-none z-30" />
    </section>
  );
};
