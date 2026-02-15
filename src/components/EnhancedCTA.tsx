import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scan, Shield, Sparkles } from "lucide-react";

export const EnhancedCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const particles = particlesRef.current;
    
    if (!section || !particles) return;

    // Parallax effect
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollPercent = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      
      section.style.transform = `translateY(${(1 - scrollPercent) * 20}px)`;
      particles.style.transform = `translateY(${(1 - scrollPercent) * -40}px) scale(${0.8 + scrollPercent * 0.2})`;
    };

    // Particle animation
    const createFloatingParticles = () => {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] rounded-full opacity-60';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 4}s`;
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite alternate`;
        particles.appendChild(particle);
      }
    };

    createFloatingParticles();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ willChange: 'transform' }}
    >
      {/* Holographic Background Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--background))] via-[hsl(var(--card)/0.05)] to-[hsl(var(--background))]" />
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      {/* Animated Shield Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
        <Shield className="w-full h-full text-[hsl(var(--neon-blue))] animate-glow-pulse" />
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Animated Data Streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[hsl(var(--neon-cyan)/0.3)] to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[hsl(var(--cyber-purple)/0.3)] to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue)/0.3)] to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glassmorphic Card Container */}
          <div className="glow-card rounded-3xl p-8 md:p-16 backdrop-blur-2xl bg-gradient-to-br from-[hsl(var(--card)/0.1)] via-[hsl(var(--card)/0.05)] to-transparent border border-[hsl(var(--border)/0.2)] shadow-[0_20px_60px_-20px_hsl(var(--neon-blue)/0.2)]">
            
            {/* Animated Headline with Cyber Matrix Effect */}
            <div className="mb-8 relative" data-reveal>
              {/* Background Matrix Pattern */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="cyber-grid opacity-30 transform scale-150 animate-grid-float" />
                </div>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 relative z-10">
                <span className="relative inline-block group">
                  <span className="relative z-10">Ready to</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                </span>
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] via-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-cyan))] bg-clip-text text-transparent text-glow font-bold tracking-wide">
                    Secure Your Enterprise?
                  </span>
                  {/* Animated underline */}
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[hsl(var(--neon-blue))] via-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-cyan))] opacity-60">
                    <div className="scan-line h-full" />
                  </div>
                  {/* Floating accent */}
                  <Shield className="absolute -top-4 -right-8 w-8 h-8 text-[hsl(var(--neon-blue))] opacity-60 animate-float" />
                </span>
              </h1>
            </div>

            {/* Enhanced Subheadline with Data Stream Effect */}
            <div className="mb-12 relative" data-reveal style={{ animationDelay: '0.2s' }}>
              {/* Subtle data stream background */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-[hsl(var(--neon-cyan)/0.2)] to-transparent opacity-50" />
              
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-3xl mx-auto relative z-10">
                Join <span className="text-foreground font-semibold bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">thousands of organizations</span> that trust Cyvance with their cybersecurity
                <br className="hidden md:block" />
                <span className="inline-block mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-[hsl(var(--card)/0.5)] to-[hsl(var(--card)/0.3)] border border-[hsl(var(--border)/0.3)] backdrop-blur-sm">
                  <Sparkles className="inline w-4 h-4 mr-2 text-[hsl(var(--neon-cyan))]" />
                  <span className="text-sm font-medium">Enterprise-grade protection starts here</span>
                </span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mb-8" data-reveal style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group relative overflow-hidden hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.6)] hover:scale-105 transform-gpu transition-all duration-300 min-w-[280px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))] via-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-blue))] opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse" />
                  <Scan className="mr-3 h-5 w-5 group-hover:animate-spin transition-all duration-300" />
                  <span className="relative z-10">Start Security Assessment</span>
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2 duration-300" />
                </Button>
                
                <Button 
                  variant="neon" 
                  size="lg" 
                  className="group relative overflow-hidden hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.4)] hover:scale-105 transform-gpu transition-all duration-300 min-w-[240px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue)/0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">Schedule Consultation</span>
                </Button>
              </div>
            </div>

            {/* Trust Microcopy with Shimmer Effect */}
            <div className="text-center" data-reveal style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-muted-foreground relative">
                <span className="story-link">Free initial assessment</span>
                <span className="mx-2">•</span>
                <span className="story-link">No commitment required</span>
                <span className="mx-2">•</span>
                <span className="story-link">Enterprise-grade security consultation</span>
              </p>
            </div>

            {/* Connecting Lines Animation */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue)/0.3)] to-transparent animate-pulse opacity-30" />
          </div>

          {/* Additional Visual Elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue)/0.2)] to-transparent blur-xl animate-float" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-tl from-[hsl(var(--cyber-purple)/0.2)] to-transparent blur-xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </section>
  );
};