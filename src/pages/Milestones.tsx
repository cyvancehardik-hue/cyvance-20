import { StickyHeader } from "@/components/StickyHeader";
import { motion } from "framer-motion";
import { Shield, Zap, Award, Target, TrendingUp, Users } from "lucide-react";

const milestones = [
  {
    year: "2024",
    title: "Advanced Threat Detection",
    description: "Launched AI-powered threat detection system with 99.9% accuracy rate",
    icon: Shield,
    metrics: ["500+ Threats Blocked", "24/7 Monitoring"]
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Expanded operations to 15 countries across 4 continents",
    icon: TrendingUp,
    metrics: ["15 Countries", "1000+ Clients"]
  },
  {
    year: "2022",
    title: "Industry Recognition",
    description: "Awarded 'Best Cybersecurity Solution' by Tech Innovation Awards",
    icon: Award,
    metrics: ["5 Awards", "Top Rated"]
  },
  {
    year: "2021",
    title: "Zero-Trust Architecture",
    description: "Pioneered zero-trust security framework for enterprise clients",
    icon: Target,
    metrics: ["100% Compliance", "Zero Breaches"]
  },
  {
    year: "2020",
    title: "Rapid Response Team",
    description: "Established 24/7 incident response team with <15min response time",
    icon: Zap,
    metrics: ["<15min Response", "99% Resolution"]
  },
  {
    year: "2019",
    title: "Company Founded",
    description: "Started with a vision to revolutionize cybersecurity for modern businesses",
    icon: Users,
    metrics: ["5 Team Members", "10 Clients"]
  }
];

const Milestones = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--neon-blue)/0.05)] to-transparent" />
        <div className="cyber-grid absolute inset-0 opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Our <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">Milestones</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A journey of innovation, excellence, and relentless commitment to cybersecurity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative mb-16 last:mb-0"
                >
                  {/* Timeline line */}
                  {index !== milestones.length - 1 && (
                    <div className="absolute left-1/2 top-20 w-0.5 h-full bg-gradient-to-b from-[hsl(var(--neon-blue)/0.5)] to-transparent -translate-x-1/2 hidden md:block" />
                  )}
                  
                  <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className="flex-1 group">
                      <div className="glow-card p-8 hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.2)] transition-all duration-500">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--cyber-purple)/0.2)] border border-[hsl(var(--neon-blue)/0.3)]">
                            <Icon className="w-6 h-6 text-[hsl(var(--neon-blue))]" />
                          </div>
                          <span className="text-3xl font-display font-bold text-glow">{milestone.year}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{milestone.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {milestone.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {milestone.metrics.map((metric, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-sm rounded-full bg-[hsl(var(--neon-blue)/0.1)] border border-[hsl(var(--neon-blue)/0.3)] text-[hsl(var(--neon-blue))]"
                            >
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Year marker */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] p-1 shadow-[0_0_30px_hsl(var(--neon-blue)/0.5)]">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] animate-pulse" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--neon-blue)/0.05)] to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Join Us on Our Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Be part of the next milestone in cybersecurity innovation
            </p>
            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] text-foreground font-semibold hover:opacity-90 transition-opacity shadow-[0_0_40px_hsl(var(--neon-blue)/0.3)]">
              Start Your Security Journey
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Milestones;
