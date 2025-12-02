import { Button } from "@/components/ui/button";
import HeroGlobe from "@/components/graphics/HeroGlobe";
import { ShieldCheck, Bug, Cloud, ArrowRight, Scan, AlertTriangle, Network, Brain, Eye, Lock, Shield } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TestimonialsMarquee } from "@/components/TestimonialsMarquee";
import { EnhancedThreatMetrics } from "@/components/EnhancedThreatMetrics";
import { SecurityBadges } from "@/components/SecurityBadges";
import { ClientLogos } from "@/components/ClientLogos";
import WhoWeAre from "@/components/WhoWeAre";
import IncidentSeverityChart from "@/components/IncidentSeverityChart";
import CustomerJourney from "@/components/CustomerJourney";
import { SecurityDashboard } from "@/components/SecurityDashboard";
import { EnhancedCTA } from "@/components/EnhancedCTA";
import { WhyChooseCyvance } from "@/components/WhyChooseCyvance";
import { StickyHeader } from "@/components/StickyHeader";
import BlogResourcesHub from "@/components/BlogResourcesHub";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyHeader />

      <main className="pt-16 depth-3d"> {/* Add padding-top to account for fixed header */}
        {/* Hero Section */}
        <section className="relative cyber-grid overflow-hidden">
          {/* Advanced Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-[hsl(var(--neon-blue)/0.15)] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[hsl(var(--cyber-purple)/0.15)] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[hsl(var(--neon-cyan)/0.1)] rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
              <div className="order-2 lg:order-1 space-y-8 parallax-layer" style={{ '--depth': '20px' } as React.CSSProperties}>
                <div className="space-y-6">
                  <div data-reveal="scale" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.15)] to-[hsl(var(--cyber-purple)/0.15)] border border-[hsl(var(--neon-blue)/0.4)] text-sm font-mono uppercase tracking-wider hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.4)] transition-all duration-500 hover:scale-105 backdrop-blur-xl energy-border">
                    <span className="relative">
                      <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--electric-green))] block" />
                      <span className="absolute inset-0 h-2.5 w-2.5 rounded-full bg-[hsl(var(--electric-green))] animate-ping" />
                    </span>
                    System Status: Secure
                  </div>
                  <h1 data-reveal="fade" className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight">
                    <span className="inline-block hover:scale-105 transition-transform duration-300">Enter the Digital</span>
                    <br />
                    <span className="holographic-text inline-block hover:scale-110 transition-transform duration-500 cursor-pointer">
                      Fortress
                    </span>
                  </h1>
                  <p data-reveal="slide-up" className="text-muted-foreground text-lg md:text-xl max-w-prose leading-relaxed hover:text-foreground transition-colors duration-300">
                    Military-grade cybersecurity that evolves with your threat landscape. AI-powered defense, real-time intelligence, and zero-trust architecture delivered seamlessly.
                  </p>
                </div>
                
                <div data-reveal="slide-up" className="flex flex-wrap items-center gap-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="group magnetic-button relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <Scan className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                      Start Security Audit
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </Button>
                  <Button 
                    variant="neon" 
                    size="lg" 
                    className="group magnetic-button relative overflow-hidden backdrop-blur-xl"
                  >
                    <span className="relative z-10 flex items-center">
                      Live Demo
                      <span className="ml-2 inline-block group-hover:animate-pulse">▶</span>
                    </span>
                  </Button>
                </div>

                <div data-reveal="slide-left" className="grid grid-cols-2 gap-6 pt-6">
                  <div className="premium-card flex items-center gap-3 p-4 rounded-xl group cursor-pointer">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[hsl(var(--electric-green)/0.3)] to-[hsl(var(--electric-green)/0.1)] border border-[hsl(var(--electric-green)/0.4)] flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:rotate-12">
                        <ShieldCheck className="h-6 w-6 text-[hsl(var(--electric-green))] group-hover:drop-shadow-[0_0_8px_hsl(var(--electric-green))]" />
                      </div>
                      <div className="absolute inset-0 bg-[hsl(var(--electric-green)/0.3)] rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold group-hover:text-glow transition-all duration-300">24/7 SOC</div>
                      <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Always Protected</div>
                    </div>
                  </div>
                  <div className="premium-card flex items-center gap-3 p-4 rounded-xl group cursor-pointer">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.3)] to-[hsl(var(--neon-cyan)/0.1)] border border-[hsl(var(--neon-cyan)/0.4)] flex items-center justify-center group-hover:scale-110 transition-all duration-500 group-hover:rotate-12">
                        <Network className="h-6 w-6 text-[hsl(var(--neon-cyan))] group-hover:drop-shadow-[0_0_8px_hsl(var(--neon-cyan))]" />
                      </div>
                      <div className="absolute inset-0 bg-[hsl(var(--neon-cyan)/0.3)] rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold group-hover:text-glow transition-all duration-300">Zero Trust</div>
                      <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Never Trust, Always Verify</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div data-reveal="scale" className="order-1 lg:order-2 relative parallax-layer" style={{ '--depth': '40px' } as React.CSSProperties}>
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--cyber-purple)/0.2)] rounded-3xl blur-[100px] animate-pulse" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 bg-gradient-to-l from-[hsl(var(--neon-cyan)/0.15)] to-[hsl(var(--electric-green)/0.1)] rounded-3xl blur-[120px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1.5s' }} />
                <div className="relative group cursor-pointer perspective-1000">
                  <div className="transition-all duration-700 group-hover:scale-105 group-hover:rotate-y-12 will-change-transform">
                    <HeroGlobe />
                  </div>
                  {/* Floating particles around globe */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-[hsl(var(--neon-blue))] rounded-full opacity-60 blur-sm"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animation: `particle-rise ${4 + Math.random() * 4}s ease-in-out infinite`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div data-reveal="fade" className="pb-12">
              <ClientLogos />
            </div>
          </div>
        </section>

        {/* Enhanced Threat Intelligence Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 data-reveal="fade" className="font-display text-3xl md:text-4xl mb-6">
                Real-Time Threat Intelligence
                <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                  Neural Defense Matrix
                </span>
              </h2>
              <p data-reveal="slide-up" className="text-muted-foreground max-w-2xl mx-auto text-lg">
                AI-driven metrics that position your organization ahead of emerging threats through predictive intelligence and quantum-encrypted monitoring systems.
              </p>
            </div>
            <div data-reveal="scale">
              <EnhancedThreatMetrics />
            </div>
          </div>
          
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated gradient waves */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue)/0.05)] via-transparent to-[hsl(var(--cyber-purple)/0.05)] animate-pulse" />
            
            {/* Moving grid pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 170, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 170, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                animation: "float 20s ease-in-out infinite",
              }}
            />
            
            {/* Floating data streams */}
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--neon-cyan))/0.6] to-transparent animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-[hsl(var(--electric-green))/0.6] to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="container mx-auto py-20 md:py-32">
          <div className="text-center mb-20">
            <h2 data-reveal="fade" className="font-display text-3xl md:text-5xl mb-6">
              Elite Security
              <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                Operations
              </span>
            </h2>
            <p data-reveal="slide-up" className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Military-grade solutions engineered for modern threats. AI-powered services backed by elite security operations that never sleep.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <article data-reveal="slide-up" className="premium-card rounded-2xl p-8 group cursor-pointer transform-gpu">
              <div className="scan-line mb-6 relative">
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--neon-blue)/0.3)] to-[hsl(var(--neon-blue)/0.1)] border-2 border-[hsl(var(--neon-blue)/0.4)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <ShieldCheck className="h-8 w-8 text-[hsl(var(--neon-blue))] group-hover:drop-shadow-[0_0_10px_hsl(var(--neon-blue))] transition-all" />
                </div>
                <div className="absolute inset-0 bg-[hsl(var(--neon-blue)/0.4)] rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300 group-hover:tracking-wide">Advanced Risk Assessment</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
                Continuous AI-driven risk analysis with predictive threat modeling and automated vulnerability discovery.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3 hover:text-foreground transition-all duration-300 hover:translate-x-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon-blue))] animate-pulse" />
                  Continuous security posture monitoring
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-all duration-300 hover:translate-x-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon-blue))] animate-pulse" style={{ animationDelay: '0.2s' }} />
                  Automated compliance reporting
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-all duration-300 hover:translate-x-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon-blue))] animate-pulse" style={{ animationDelay: '0.4s' }} />
                  Executive security scorecards
                </li>
              </ul>
            </article>
            
            <article data-reveal="slide-up" className="premium-card rounded-2xl p-8 group cursor-pointer transform-gpu" style={{ animationDelay: '0.1s' }}>
              <div className="scan-line mb-6 relative">
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--cyber-purple)/0.3)] to-[hsl(var(--cyber-purple)/0.1)] border-2 border-[hsl(var(--cyber-purple)/0.4)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <AlertTriangle className="h-8 w-8 text-[hsl(var(--cyber-purple))] group-hover:drop-shadow-[0_0_10px_hsl(var(--cyber-purple))] transition-all" />
                </div>
                <div className="absolute inset-0 bg-[hsl(var(--cyber-purple)/0.4)] rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300 group-hover:tracking-wide">Elite Penetration Testing</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
                Elite red team operations fusing human expertise with advanced automation to expose vulnerabilities before adversaries strike.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3 hover:text-foreground transition-all duration-300 hover:translate-x-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--cyber-purple))] animate-pulse" />
                  Advanced persistent threat simulation
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-all duration-300 hover:translate-x-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--cyber-purple))] animate-pulse" style={{ animationDelay: '0.2s' }} />
                  Social engineering assessments
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-all duration-300 hover:translate-x-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--cyber-purple))] animate-pulse" style={{ animationDelay: '0.4s' }} />
                  Zero-day vulnerability research
                </li>
              </ul>
            </article>
            
            <article data-reveal="slide-up" className="premium-card rounded-2xl p-8 group cursor-pointer transform-gpu" style={{ animationDelay: '0.2s' }}>
              <div className="scan-line mb-6 relative">
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.3)] to-[hsl(var(--neon-cyan)/0.1)] border-2 border-[hsl(var(--neon-cyan)/0.4)] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Cloud className="h-8 w-8 text-[hsl(var(--neon-cyan))] group-hover:drop-shadow-[0_0_10px_hsl(var(--neon-cyan))] transition-all" />
                </div>
                <div className="absolute inset-0 bg-[hsl(var(--neon-cyan)/0.4)] rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300 group-hover:tracking-wide">Cloud-Native Defense</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
                Next-generation cloud architecture with micro-segmentation and serverless protection across multi-cloud environments.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3 hover:text-foreground transition-all duration-300 hover:translate-x-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon-cyan))] animate-pulse" />
                  Kubernetes security hardening
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-all duration-300 hover:translate-x-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon-cyan))] animate-pulse" style={{ animationDelay: '0.2s' }} />
                  Multi-cloud compliance automation
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-all duration-300 hover:translate-x-2">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--neon-cyan))] animate-pulse" style={{ animationDelay: '0.4s' }} />
                  Infrastructure as Code security
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* Customer Journey */}
        <div data-reveal="fade">
          <CustomerJourney />
        </div>

        {/* Stats Section - Impact Dashboard */}
        <div id="stats" data-reveal="scale">
          <SecurityDashboard />
        </div>

        {/* Enterprise Security Dashboard */}
        <div id="dashboard" data-reveal="scale">
          <SecurityDashboard />
        </div>

        {/* Testimonials */}
        <section id="testimonials" className="container mx-auto py-16 md:py-24">
          <header className="mb-12">
            <h2 data-reveal="fade" className="font-display text-3xl md:text-4xl mb-4">Trusted by Innovators</h2>
            <p data-reveal="slide-up" className="text-muted-foreground text-lg">What security leaders say about Cyvance.</p>
          </header>
          <div data-reveal="slide-up">
            <TestimonialsMarquee />
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <div id="contact" data-reveal="scale">
          <EnhancedCTA />
        </div>

        {/* Incident Severity Dashboard */}
        <div data-reveal="fade">
          <IncidentSeverityChart />
        </div>

        {/* Who We Are */}
        <div data-reveal="slide-up">
          <WhoWeAre />
        </div>

        {/* Why Choose Cyvance - Advanced Cyber-themed Section */}
        <div id="why-us" data-reveal="scale">
          <WhyChooseCyvance />
        </div>

        {/* Blog & Resources Intelligence Hub */}
        <div id="blogs" data-reveal="fade">
          <BlogResourcesHub />
        </div>
      </main>

      <footer className="border-t border-border py-12 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto">
          <div data-reveal="fade" className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
            <p className="hover:text-foreground transition-colors">
              © {new Date().getFullYear()} Cyvance Security. All rights reserved.
            </p>
            <nav className="flex items-center gap-8">
              <a href="#" className="hover:text-foreground transition-colors hover:scale-105 transform duration-200">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors hover:scale-105 transform duration-200">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors hover:scale-105 transform duration-200">Status</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
