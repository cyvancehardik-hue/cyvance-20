import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Swords, ArrowRight, Zap, Target, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CyberGrid = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated grid */}
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 170, 255, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 170, 255, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
    
    {/* Red team glow */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-red-500/10 blur-[100px]"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    
    {/* Blue team glow */}
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[hsl(var(--neon-blue))]/10 blur-[100px]"
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.5, 0.3, 0.5],
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />

    {/* Scanning line */}
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--neon-cyan))] to-transparent"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const FloatingIcon = ({ icon: Icon, className, delay = 0 }: { icon: any; className: string; delay?: number }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
    }}
    transition={{ duration: 6, repeat: Infinity, delay }}
  >
    <div className="p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50">
      <Icon className="w-6 h-6" />
    </div>
  </motion.div>
);

export const RedBlueTeamSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <CyberGrid />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm"
            >
              <Swords className="w-4 h-4 text-red-500" />
              <span className="text-sm font-mono uppercase tracking-wider">New Feature</span>
              <Shield className="w-4 h-4 text-[hsl(var(--neon-blue))]" />
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
              <span className="text-red-500">Red Team</span>
              <span className="text-muted-foreground mx-4">/</span>
              <span className="text-[hsl(var(--neon-blue))]">Blue Team</span>
              <br />
              <span className="bg-gradient-to-r from-red-500 via-purple-500 to-[hsl(var(--neon-blue))] bg-clip-text text-transparent">
                Simulation Engine
              </span>
            </h2>

            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Experience real-world cyberattacks from the attacker's perspective, then instantly switch to see how our 
              elite defense systems neutralize every threat in real-time.
            </p>
          </motion.div>

          {/* Visual Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Red Team Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative p-8 rounded-2xl border border-red-500/30 bg-background/80 backdrop-blur-sm hover:border-red-500/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
                    <Swords className="w-8 h-8 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-red-500">Attack Mode</h3>
                    <p className="text-sm text-muted-foreground">Hacker's Perspective</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-red-500" />
                    Watch vulnerability exploitation unfold
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-red-500" />
                    See privilege escalation in action
                  </li>
                  <li className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-red-500" />
                    Understand attack methodologies
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Blue Team Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue))]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative p-8 rounded-2xl border border-[hsl(var(--neon-blue))]/30 bg-background/80 backdrop-blur-sm hover:border-[hsl(var(--neon-blue))]/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-[hsl(var(--neon-blue))]/20 border border-[hsl(var(--neon-blue))]/30">
                    <Shield className="w-8 h-8 text-[hsl(var(--neon-blue))]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display text-[hsl(var(--neon-blue))]">Defense Mode</h3>
                    <p className="text-sm text-muted-foreground">SOC Perspective</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Target className="w-4 h-4 text-[hsl(var(--neon-blue))]" />
                    Real-time threat detection
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-[hsl(var(--neon-blue))]" />
                    AI-powered response automation
                  </li>
                  <li className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-[hsl(var(--neon-blue))]" />
                    Complete attack neutralization
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Button
              onClick={() => navigate("/simulation")}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 via-purple-600 to-[hsl(var(--neon-blue))] text-white px-12 py-6 text-lg font-semibold rounded-xl hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter Simulation Lab
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] via-purple-600 to-red-500"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ opacity: 0.3 }}
              />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              No signup required • Interactive experience • Enterprise-grade simulation
            </p>
          </motion.div>
        </div>

        {/* Floating decorative icons */}
        <FloatingIcon icon={Shield} className="top-20 left-10 text-[hsl(var(--neon-blue))]" delay={0} />
        <FloatingIcon icon={Swords} className="top-32 right-16 text-red-500" delay={1} />
        <FloatingIcon icon={Zap} className="bottom-20 left-20 text-[hsl(var(--electric-green))]" delay={2} />
      </div>
    </section>
  );
};
