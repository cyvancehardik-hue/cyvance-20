import { Button } from "@/components/ui/button";
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
import { RedBlueTeamSection } from "@/components/RedBlueTeamSection";
import { VulnerabilityIntelligenceCTA } from "@/components/VulnerabilityIntelligenceCTA";
import { HeroSection } from "@/components/HeroSection";
import { ScrollReveal, StaggerReveal, StaggerGrid, StaggerList, StaggerText } from "@/components/ScrollReveal";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <StickyHeader />
      <ScrollToTop />

      <main className="overflow-x-hidden">
        {/* Premium Hero Section */}
        <HeroSection />

        {/* Enhanced Threat Intelligence Section */}
        <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <ScrollReveal direction="fade">
                <h2 className="font-display text-3xl md:text-4xl mb-6">
                  Real-Time Threat Intelligence
                  <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                    Neural Defense Matrix
                  </span>
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  AI-driven metrics that position your organization ahead of emerging threats through predictive intelligence and quantum-encrypted monitoring systems.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal direction="scale" delay={0.2}>
              <EnhancedThreatMetrics />
            </ScrollReveal>
          </div>
          
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue)/0.05)] via-transparent to-[hsl(var(--cyber-purple)/0.05)] animate-pulse" />
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
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--neon-cyan))/0.6] to-transparent animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-[hsl(var(--electric-green))/0.6] to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="container mx-auto py-20 md:py-32">
          <div className="text-center mb-20">
            <ScrollReveal direction="fade">
              <h2 className="font-display text-3xl md:text-5xl mb-6">
                Elite Security
                <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                  Operations
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Military-grade solutions engineered for modern threats. AI-powered services backed by elite security operations that never sleep.
              </p>
            </ScrollReveal>
          </div>
          
          <StaggerGrid staggerDelay={0.15} className="grid lg:grid-cols-3 gap-8">
            <article className="glow-card rounded-2xl p-8 hover:shadow-[0_0_50px_hsl(var(--neon-blue)/0.3)] transition-all duration-500 group hover:-translate-y-3 hover:scale-105">
              <div className="scan-line mb-6">
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--neon-blue)/0.05)] border border-[hsl(var(--neon-blue)/0.3)] group-hover:shadow-[0_0_25px_hsl(var(--neon-blue)/0.4)] transition-all duration-300">
                  <ShieldCheck className="h-8 w-8 text-[hsl(var(--neon-blue))]" />
                </div>
              </div>
              <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300">Advanced Risk Assessment</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Continuous AI-driven risk analysis with predictive threat modeling and automated vulnerability discovery.
              </p>
              <StaggerList className="space-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-blue))]" />
                  Continuous security posture monitoring
                </span>
                <span className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-blue))]" />
                  Automated compliance reporting
                </span>
                <span className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-blue))]" />
                  Executive security scorecards
                </span>
              </StaggerList>
            </article>
            
            <article className="glow-card rounded-2xl p-8 hover:shadow-[0_0_50px_hsl(var(--cyber-purple)/0.3)] transition-all duration-500 group hover:-translate-y-3 hover:scale-105">
              <div className="scan-line mb-6">
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--cyber-purple)/0.2)] to-[hsl(var(--cyber-purple)/0.05)] border border-[hsl(var(--cyber-purple)/0.3)] group-hover:shadow-[0_0_25px_hsl(var(--cyber-purple)/0.4)] transition-all duration-300">
                  <AlertTriangle className="h-8 w-8 text-[hsl(var(--cyber-purple))]" />
                </div>
              </div>
              <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300">Elite Penetration Testing</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Elite red team operations fusing human expertise with advanced automation to expose vulnerabilities before adversaries strike.
              </p>
              <StaggerList className="space-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--cyber-purple))]" />
                  Advanced persistent threat simulation
                </span>
                <span className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--cyber-purple))]" />
                  Social engineering assessments
                </span>
                <span className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--cyber-purple))]" />
                  Zero-day vulnerability research
                </span>
              </StaggerList>
            </article>
            
            <article className="glow-card rounded-2xl p-8 hover:shadow-[0_0_50px_hsl(var(--neon-cyan)/0.3)] transition-all duration-500 group hover:-translate-y-3 hover:scale-105">
              <div className="scan-line mb-6">
                <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.2)] to-[hsl(var(--neon-cyan)/0.05)] border border-[hsl(var(--neon-cyan)/0.3)] group-hover:shadow-[0_0_25px_hsl(var(--neon-cyan)/0.4)] transition-all duration-300">
                  <Cloud className="h-8 w-8 text-[hsl(var(--neon-cyan))]" />
                </div>
              </div>
              <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300">Cloud-Native Defense</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Next-generation cloud architecture with micro-segmentation and serverless protection across multi-cloud environments.
              </p>
              <StaggerList className="space-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-cyan))]" />
                  Kubernetes security hardening
                </span>
                <span className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-cyan))]" />
                  Multi-cloud compliance automation
                </span>
                <span className="flex items-center gap-3 hover:text-foreground transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon-cyan))]" />
                  Infrastructure as Code security
                </span>
              </StaggerList>
            </article>
          </StaggerGrid>
        </section>

        {/* Customer Journey */}
        <ScrollReveal direction="up">
          <CustomerJourney />
        </ScrollReveal>

        {/* Enterprise Security Dashboard */}
        <ScrollReveal direction="scale" delay={0.1}>
          <div id="dashboard">
            <SecurityDashboard />
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <section id="testimonials" className="container mx-auto py-16 md:py-24">
          <header className="mb-12">
            <ScrollReveal direction="fade">
              <h2 className="font-display text-3xl md:text-4xl mb-4">Trusted by Innovators</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <p className="text-muted-foreground text-lg">What security leaders say about Cyvance.</p>
            </ScrollReveal>
          </header>
          <ScrollReveal direction="left" delay={0.2}>
            <TestimonialsMarquee />
          </ScrollReveal>
        </section>

        {/* Enhanced CTA Section */}
        <ScrollReveal direction="scale">
          <div id="contact">
            <EnhancedCTA />
          </div>
        </ScrollReveal>

        {/* Incident Severity Dashboard */}
        <ScrollReveal direction="up" delay={0.1}>
          <IncidentSeverityChart />
        </ScrollReveal>

        {/* Who We Are */}
        <ScrollReveal direction="right">
          <WhoWeAre />
        </ScrollReveal>

        {/* Why Choose Cyvance - Advanced Cyber-themed Section */}
        <ScrollReveal direction="scale">
          <div id="why-us">
            <WhyChooseCyvance />
          </div>
        </ScrollReveal>

        {/* Red Team / Blue Team Simulation Section */}
        <ScrollReveal direction="up">
          <RedBlueTeamSection />
        </ScrollReveal>

        {/* Vulnerability Intelligence CTA Section */}
        <ScrollReveal direction="scale" delay={0.1}>
          <VulnerabilityIntelligenceCTA />
        </ScrollReveal>

        {/* Blog & Resources Intelligence Hub */}
        <ScrollReveal direction="fade">
          <div id="blogs">
            <BlogResourcesHub />
          </div>
        </ScrollReveal>
      </main>

      <footer className="border-t border-border py-12 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto">
          <ScrollReveal direction="fade">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
              <p className="hover:text-foreground transition-colors">
                © {new Date().getFullYear()} Cyvance Security. All rights reserved.
              </p>
              <nav className="flex items-center gap-8">
                <a href="#" className="hover:text-foreground transition-colors hover:scale-105 transform duration-200">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors hover:scale-105 transform duration-200">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors hover:scale-105 transform duration-200">Status</a>
              </nav>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  );
};

export default Index;
