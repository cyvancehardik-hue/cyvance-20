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

      <main className="pt-16"> {/* Add padding-top to account for fixed header */}
        {/* Hero Section */}
        <section className="relative cyber-grid overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
          <div className="container mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center py-20 md:py-32">
              <div className="order-2 lg:order-1 space-y-8">
                <div className="space-y-6">
                  <div data-reveal="scale" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] border border-[hsl(var(--neon-blue)/0.3)] text-sm font-mono uppercase tracking-wider hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.2)] transition-all duration-300">
                    <span className="h-2 w-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
                    System Status: Secure
                  </div>
                  <h1 data-reveal="fade" className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-glow">
                    Enter the Digital
                    <br />
                    <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent animate-pulse">
                      Fortress
                    </span>
                  </h1>
                  <p data-reveal="slide-up" className="text-muted-foreground text-lg md:text-xl max-w-prose leading-relaxed">
                    Military-grade cybersecurity that evolves with your threat landscape. AI-powered defense, real-time intelligence, and zero-trust architecture delivered seamlessly.
                  </p>
                </div>
                
                <div data-reveal="slide-up" className="flex flex-wrap items-center gap-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="group hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.4)] hover:scale-105 transition-all duration-300"
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Start Security Audit
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    variant="neon" 
                    size="lg" 
                    className="hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.3)] hover:scale-105 transition-all duration-300"
                  >
                    Live Demo
                  </Button>
                </div>

                <div data-reveal="slide-left" className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-300">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[hsl(var(--electric-green)/0.2)] to-[hsl(var(--electric-green)/0.05)] border border-[hsl(var(--electric-green)/0.3)] flex items-center justify-center hover:shadow-[0_0_15px_hsl(var(--electric-green)/0.3)] transition-all duration-300">
                      <ShieldCheck className="h-5 w-5 text-[hsl(var(--electric-green))]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">24/7 SOC</div>
                      <div className="text-xs text-muted-foreground">Always Protected</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-300">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.2)] to-[hsl(var(--neon-cyan)/0.05)] border border-[hsl(var(--neon-cyan)/0.3)] flex items-center justify-center hover:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)] transition-all duration-300">
                      <Network className="h-5 w-5 text-[hsl(var(--neon-cyan))]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Zero Trust</div>
                      <div className="text-xs text-muted-foreground">Never Trust, Always Verify</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div data-reveal="scale" className="order-1 lg:order-2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] rounded-2xl blur-3xl animate-pulse" />
                <div className="relative hover:scale-105 transition-transform duration-500">
                  <HeroGlobe />
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
            <article data-reveal="slide-up" className="glow-card rounded-2xl p-8 hover:shadow-[0_0_50px_hsl(var(--neon-blue)/0.3)] transition-all duration-500 group hover:-translate-y-3 hover:scale-105">
              <div className="scan-line mb-6">
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--neon-blue)/0.05)] border border-[hsl(var(--neon-blue)/0.3)] group-hover:shadow-[0_0_25px_hsl(var(--neon-blue)/0.4)] transition-all duration-300">
                  <ShieldCheck className="h-8 w-8 text-[hsl(var(--neon-blue))]" />
                </div>
              </div>
              <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300">Advanced Risk Assessment</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Continuous AI-driven risk analysis with predictive threat modeling and automated vulnerability discovery.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-blue))]" />
                  Continuous security posture monitoring
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-blue))]" />
                  Automated compliance reporting
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-blue))]" />
                  Executive security scorecards
                </li>
              </ul>
            </article>
            
            <article data-reveal="slide-up" className="glow-card rounded-2xl p-8 hover:shadow-[0_0_50px_hsl(var(--cyber-purple)/0.3)] transition-all duration-500 group hover:-translate-y-3 hover:scale-105">
              <div className="scan-line mb-6">
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--cyber-purple)/0.2)] to-[hsl(var(--cyber-purple)/0.05)] border border-[hsl(var(--cyber-purple)/0.3)] group-hover:shadow-[0_0_25px_hsl(var(--cyber-purple)/0.4)] transition-all duration-300">
                  <AlertTriangle className="h-8 w-8 text-[hsl(var(--cyber-purple))]" />
                </div>
              </div>
              <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300">Elite Penetration Testing</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Elite red team operations fusing human expertise with advanced automation to expose vulnerabilities before adversaries strike.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--cyber-purple))]" />
                  Advanced persistent threat simulation
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--cyber-purple))]" />
                  Social engineering assessments
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--cyber-purple))]" />
                  Zero-day vulnerability research
                </li>
              </ul>
            </article>
            
            <article data-reveal="slide-up" className="glow-card rounded-2xl p-8 hover:shadow-[0_0_50px_hsl(var(--neon-cyan)/0.3)] transition-all duration-500 group hover:-translate-y-3 hover:scale-105">
              <div className="scan-line mb-6">
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.2)] to-[hsl(var(--neon-cyan)/0.05)] border border-[hsl(var(--neon-cyan)/0.3)] group-hover:shadow-[0_0_25px_hsl(var(--neon-cyan)/0.4)] transition-all duration-300">
                  <Cloud className="h-8 w-8 text-[hsl(var(--neon-cyan))]" />
                </div>
              </div>
              <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300">Cloud-Native Defense</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Next-generation cloud architecture with micro-segmentation and serverless protection across multi-cloud environments.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-cyan))]" />
                  Kubernetes security hardening
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-cyan))]" />
                  Multi-cloud compliance automation
                </li>
                <li className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-cyan))]" />
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

        {/* Enterprise Security Dashboard */}
        <div id="stats" data-reveal="scale">
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
        <div data-reveal="scale">
          <WhyChooseCyvance />
        </div>

        {/* Blog & Resources Intelligence Hub */}
        <div data-reveal="fade">
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
