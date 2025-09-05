import { Shield, Radar, Clock, Building, Award, Lock, Eye, Zap } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

const complianceFrameworks = [
  { name: "SOC 2", icon: Shield, color: "neon-blue" },
  { name: "ISO 27001", icon: Lock, color: "cyber-purple" },
  { name: "NIST", icon: Award, color: "neon-cyan" },
  { name: "GDPR", icon: Eye, color: "electric-green" },
  { name: "HIPAA", icon: Shield, color: "neon-blue" },
  { name: "FedRAMP", icon: Lock, color: "cyber-purple" }
];

const enterpriseMetrics = [
  {
    icon: Shield,
    value: 99.9,
    suffix: "%",
    label: "Uptime SLA",
    description: "Enterprise-grade availability",
    color: "neon-blue"
  },
  {
    icon: Radar,
    value: 2000000000,
    suffix: "+",
    label: "Events Processed",
    description: "Real-time threat detection",
    color: "electric-green",
    format: "compact"
  },
  {
    icon: Clock,
    value: 45,
    suffix: "s",
    label: "Mean Response Time",
    description: "Lightning-fast incident response",
    color: "cyber-purple"
  },
  {
    icon: Building,
    value: 500,
    suffix: "+",
    label: "Enterprise Clients",
    description: "Trusted by industry leaders",
    color: "neon-cyan"
  }
];

export const SecurityDashboard = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Animated Background with Data Streams */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[hsl(var(--card)/0.02)] to-background">
        {/* Circuit Grid Pattern */}
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        
        {/* Animated Data Streams */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Horizontal streams */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue)/0.5)] to-transparent animate-pulse"></div>
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--electric-green)/0.3)] to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--cyber-purple)/0.4)] to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Vertical streams */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[hsl(var(--neon-cyan)/0.3)] to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[hsl(var(--neon-blue)/0.2)] to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Floating Glow Orbs */}
        <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-[hsl(var(--electric-green)/0.08)] to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-1/5 w-56 h-56 bg-gradient-to-r from-[hsl(var(--cyber-purple)/0.06)] to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-16" data-reveal>
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--neon-blue)/0.3)] backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse"></div>
            <span className="text-sm font-medium text-[hsl(var(--electric-green))]">LIVE SECURITY OPERATIONS</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 text-glow">
            <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] via-[hsl(var(--neon-cyan))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
              Enterprise-Grade Security
            </span>
            <br />
            <span className="text-foreground">Command Center</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Battle-tested compliance frameworks and real-time performance metrics that Fortune 500 companies trust for their critical operations.
          </p>
        </div>

        {/* Compliance Frameworks Grid */}
        <div className="mb-20" data-reveal>
          <h3 className="text-2xl lg:text-3xl font-display text-center mb-12 text-glow">
            <span className="text-[hsl(var(--neon-cyan))]">Compliance</span> Ready
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {complianceFrameworks.map((framework, index) => {
              const Icon = framework.icon;
              return (
                <div
                  key={framework.name}
                  data-reveal
                  className="group relative aspect-square"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Glowing Card Container */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--card)/0.8)] to-[hsl(var(--card)/0.4)] backdrop-blur-xl border border-[hsl(var(--border)/0.3)] transition-all duration-500 group-hover:border-[hsl(var(--${framework.color})/0.8)] group-hover:shadow-[0_0_40px_hsl(var(--${framework.color})/0.4)] group-hover:-translate-y-2 group-hover:scale-105">
                    {/* Holographic border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[hsl(var(--${framework.color})/0.2)] via-transparent to-[hsl(var(--${framework.color})/0.1)] opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                    <div className="mb-3 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--${framework.color})/0.3)] to-[hsl(var(--${framework.color})/0.1)] border border-[hsl(var(--${framework.color})/0.4)] group-hover:shadow-[0_0_20px_hsl(var(--${framework.color})/0.6)] transition-all duration-500`}>
                        <Icon className={`w-5 h-5 lg:w-6 lg:h-6 text-[hsl(var(--${framework.color}))] group-hover:drop-shadow-[0_0_8px_hsl(var(--${framework.color}))] transition-all duration-300`} />
                      </div>
                    </div>
                    
                    <h4 className={`text-xs lg:text-sm font-bold transition-all duration-500 group-hover:text-[hsl(var(--${framework.color}))] group-hover:drop-shadow-[0_0_8px_hsl(var(--${framework.color})/0.5)]`}>
                      {framework.name}
                    </h4>
                  </div>

                  {/* Rotating background pattern */}
                  <div className="absolute inset-2 rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-1000">
                    <div className={`w-full h-full bg-gradient-to-r from-[hsl(var(--${framework.color})/0.1)] to-transparent rounded-xl animate-spin`} style={{ animationDuration: '8s' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise Metrics Dashboard */}
        <div className="mb-16" data-reveal>
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-display mb-4 text-glow">
              <span className="text-[hsl(var(--electric-green))]">Live</span> Performance Metrics
            </h3>
            <p className="text-muted-foreground">Real-time insights from our security operations center</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {enterpriseMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  data-reveal
                  className="group relative"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Glassmorphism Card */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--card)/0.9)] to-[hsl(var(--card)/0.6)] backdrop-blur-2xl border border-[hsl(var(--border)/0.3)] transition-all duration-700 group-hover:border-[hsl(var(--${metric.color})/0.6)] group-hover:shadow-[0_20px_60px_-12px_hsl(var(--${metric.color})/0.4)] group-hover:-translate-y-2"></div>
                  
                  {/* Animated Border Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className={`absolute inset-0 rounded-2xl border border-[hsl(var(--${metric.color})/0.8)] animate-pulse`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 lg:p-8 text-center">
                    {/* Icon */}
                    <div className="mb-6 transform transition-all duration-500 group-hover:scale-125">
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-[hsl(var(--${metric.color})/0.2)] to-[hsl(var(--${metric.color})/0.05)] border border-[hsl(var(--${metric.color})/0.3)] group-hover:border-[hsl(var(--${metric.color})/0.8)] group-hover:shadow-[0_0_30px_hsl(var(--${metric.color})/0.5)] transition-all duration-500 scan-line`}>
                        <Icon className={`w-8 h-8 text-[hsl(var(--${metric.color}))] group-hover:drop-shadow-[0_0_12px_hsl(var(--${metric.color}))] transition-all duration-300`} />
                      </div>
                    </div>

                    {/* Animated Counter */}
                    <div className="mb-4">
                      <div className={`text-3xl lg:text-4xl xl:text-5xl font-display text-glow group-hover:scale-110 transition-all duration-300 group-hover:text-[hsl(var(--${metric.color}))]`}>
                        {metric.format === "compact" ? (
                          <>
                            <AnimatedCounter value={2} />
                            B{metric.suffix}
                          </>
                        ) : (
                          <>
                            <AnimatedCounter value={metric.value} />
                            {metric.suffix}
                          </>
                        )}
                      </div>
                      <h4 className="text-sm lg:text-base font-bold uppercase tracking-wider mb-2 transition-all duration-500 group-hover:text-[hsl(var(--${metric.color}))]">
                        {metric.label}
                      </h4>
                      <p className="text-xs lg:text-sm text-muted-foreground transition-all duration-500 group-hover:text-foreground/90">
                        {metric.description}
                      </p>
                    </div>

                    {/* Live Indicator */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className={`w-2 h-2 rounded-full bg-[hsl(var(--${metric.color}))] animate-pulse`}></div>
                      <span className="text-xs text-[hsl(var(--${metric.color}))] font-medium">LIVE</span>
                    </div>
                  </div>

                  {/* Background Data Flow Animation */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                    <div className={`absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--${metric.color})/0.6)] to-transparent animate-pulse`} style={{ animationDelay: `${index * 0.5}s` }}></div>
                    <div className={`absolute bottom-1/3 right-0 w-full h-px bg-gradient-to-l from-transparent via-[hsl(var(--${metric.color})/0.4)] to-transparent animate-pulse`} style={{ animationDelay: `${index * 0.3}s` }}></div>
                  </div>

                  {/* Enhanced Glow Effect */}
                  <div className={`absolute -inset-4 rounded-2xl bg-gradient-to-r from-[hsl(var(--${metric.color})/0.1)] via-[hsl(var(--${metric.color})/0.05)] to-[hsl(var(--${metric.color})/0.1)] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Battle-Tested Badge */}
        <div className="text-center" data-reveal>
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-[hsl(var(--card)/0.8)] to-[hsl(var(--card)/0.6)] backdrop-blur-xl border border-[hsl(var(--neon-blue)/0.3)] hover:border-[hsl(var(--neon-blue)/0.8)] hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.3)] transition-all duration-700 group cursor-pointer">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-[hsl(var(--neon-blue))] group-hover:drop-shadow-[0_0_8px_hsl(var(--neon-blue))] animate-pulse" />
              <span className="text-lg font-display text-glow group-hover:text-[hsl(var(--neon-blue))] transition-colors duration-500">
                Battle-Tested Security
              </span>
            </div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-[hsl(var(--border))] to-transparent"></div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground/90 transition-colors duration-500">
              Trusted by Fortune 500 Companies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};