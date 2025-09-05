import { Shield, Users, Zap, Award, Globe, ArrowRight, Brain, Rocket, Target, TrendingUp, Lock, ShieldCheck, Network, Eye, Scan } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { StickyHeader } from "@/components/StickyHeader";
import useScrollReveal from "@/hooks/useScrollReveal";

const AboutUs = () => {
  // Initialize scroll reveal
  useScrollReveal();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const coreValues = [
    {
      icon: Brain,
      title: "AI-Driven Intelligence",
      description: "Leveraging cutting-edge AI to predict and neutralize threats before they materialize.",
      color: "neon-blue"
    },
    {
      icon: Shield,
      title: "Zero-Trust Architecture", 
      description: "Never trust, always verify. Every connection, every device, every user.",
      color: "cyber-purple"
    },
    {
      icon: Zap,
      title: "Real-Time Response",
      description: "Millisecond threat detection with automated response protocols.",
      color: "neon-cyan"
    },
    {
      icon: Rocket,
      title: "Infinite Scalability",
      description: "From startup to enterprise, our solutions grow with your ambitions.",
      color: "electric-green"
    }
  ];

  const expertise = [
    {
      icon: Target,
      title: "Precision Targeting",
      metric: "99.97%",
      description: "Threat detection accuracy"
    },
    {
      icon: TrendingUp,
      title: "Performance Excellence",
      metric: "<0.1ms",
      description: "Average response time"
    },
    {
      icon: Globe,
      title: "Global Reach",
      metric: "150+",
      description: "Countries protected"
    },
    {
      icon: Users,
      title: "Enterprise Trust",
      metric: "10M+",
      description: "Users secured daily"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <StickyHeader />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative cyber-grid overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
          <div className="container mx-auto relative">
            <div className="py-20 md:py-32 text-center">
              <div className="space-y-8 max-w-4xl mx-auto">
                <div data-reveal="scale" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] border border-[hsl(var(--neon-blue)/0.3)] text-sm font-mono uppercase tracking-wider hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.2)] transition-all duration-300">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
                  About Cyvance Security
                </div>
                
                <h1 data-reveal="fade" className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight text-glow">
                  Redefining Digital
                  <br />
                  <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent animate-pulse">
                    Security Excellence
                  </span>
                </h1>
                
                <p data-reveal="slide-up" className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  We don't just protect systems—we architect the future of cybersecurity. Where innovation meets impenetrable defense through AI-powered solutions and elite security operations.
                </p>
                
                <div data-reveal="slide-up" className="flex flex-wrap items-center justify-center gap-4 pt-6">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="group hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.4)] hover:scale-105 transition-all duration-300"
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Learn Our Story
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Link to="/">
                    <Button 
                      variant="neon" 
                      size="lg" 
                      className="hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.3)] hover:scale-105 transition-all duration-300"
                    >
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="container mx-auto py-20 md:py-32">
          <div className="text-center mb-20">
            <h2 data-reveal="fade" className="font-display text-3xl md:text-5xl mb-6">
              Built Different for
              <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                Elite Performance
              </span>
            </h2>
            <p data-reveal="slide-up" className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Four pillars of excellence that separate us from the rest—engineered for modern threats and tomorrow's challenges.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <article key={value.title} data-reveal="slide-up" className="glow-card rounded-2xl p-8 hover:shadow-[0_0_50px_hsl(var(--${value.color})/0.3)] transition-all duration-500 group hover:-translate-y-3 hover:scale-105">
                  <div className="scan-line mb-6">
                    <div className={`h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--${value.color})/0.2)] to-[hsl(var(--${value.color})/0.05)] border border-[hsl(var(--${value.color})/0.3)] group-hover:shadow-[0_0_25px_hsl(var(--${value.color})/0.4)] transition-all duration-300`}>
                      <Icon className={`h-8 w-8 text-[hsl(var(--${value.color}))]`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-display mb-4 group-hover:text-glow transition-all duration-300">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* Expertise Metrics */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 data-reveal="fade" className="font-display text-3xl md:text-4xl mb-6">
                Elite Performance
                <span className="block bg-gradient-to-r from-[hsl(var(--electric-green))] to-[hsl(var(--neon-cyan))] bg-clip-text text-transparent">
                  By the Numbers
                </span>
              </h2>
              <p data-reveal="slide-up" className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Metrics that matter. Results that speak for themselves in the cybersecurity landscape.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertise.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} data-reveal="scale" className="text-center">
                    <div className="glow-card p-8 rounded-2xl hover:shadow-[0_0_50px_hsl(var(--electric-green)/0.3)] transition-all duration-500 group hover:-translate-y-2">
                      <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--electric-green)/0.2)] to-[hsl(var(--neon-cyan)/0.1)] border border-[hsl(var(--electric-green)/0.3)] mx-auto mb-6 group-hover:shadow-[0_0_25px_hsl(var(--electric-green)/0.4)] transition-all duration-300">
                        <Icon className="h-8 w-8 text-[hsl(var(--electric-green))]" />
                      </div>
                      
                      <div className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--electric-green))] to-[hsl(var(--neon-cyan))] bg-clip-text text-transparent mb-2">
                        {item.metric}
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-glow transition-all duration-300">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated gradient waves */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--electric-green)/0.05)] via-transparent to-[hsl(var(--neon-cyan)/0.05)] animate-pulse" />
            
            {/* Moving grid pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
                animation: "float 20s ease-in-out infinite",
              }}
            />
          </div>
        </section>

        {/* Vision Statement */}
        <section className="container mx-auto py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <h2 data-reveal="fade" className="font-display text-3xl md:text-5xl mb-12 leading-tight">
              We don't follow trends—
              <br />
              <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] via-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-cyan))] bg-clip-text text-transparent">
                we create the future
              </span>
            </h2>

            <p data-reveal="slide-up" className="text-xl text-muted-foreground leading-relaxed mb-16 max-w-4xl mx-auto">
              Every line of code we write, every algorithm we develop, and every solution we deploy 
              is engineered to make the digital world a safer, more innovative place for everyone.
            </p>

            <div data-reveal="slide-up" className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { 
                  title: "Innovation First", 
                  description: "Pushing boundaries of what's possible in cybersecurity",
                  icon: Brain,
                  color: "neon-blue"
                },
                { 
                  title: "Human-Centric", 
                  description: "Technology that empowers people, not replaces them",
                  icon: Users,
                  color: "cyber-purple"
                },
                { 
                  title: "Global Impact", 
                  description: "Securing digital infrastructure worldwide",
                  icon: Globe,
                  color: "neon-cyan"
                }
              ].map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <article key={principle.title} className="glow-card p-8 rounded-2xl hover:shadow-[0_0_40px_hsl(var(--${principle.color})/0.3)] transition-all duration-500 group hover:-translate-y-2">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--${principle.color})/0.2)] to-[hsl(var(--${principle.color})/0.05)] border border-[hsl(var(--${principle.color})/0.3)] mb-6 group-hover:shadow-[0_0_20px_hsl(var(--${principle.color})/0.4)] transition-all duration-300`}>
                      <Icon className={`h-6 w-6 text-[hsl(var(--${principle.color}))]`} />
                    </div>
                    <h3 className={`text-lg font-bold mb-3 text-[hsl(var(--${principle.color}))] group-hover:text-glow transition-all duration-300`}>{principle.title}</h3>
                    <p className="text-muted-foreground">{principle.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 border-t border-border bg-gradient-to-b from-background to-background/50">
          <div className="container mx-auto text-center">
            <div data-reveal="fade" className="max-w-4xl mx-auto">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
                Ready to Experience
                <br />
                <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                  The Future?
                </span>
              </h2>

              <p data-reveal="slide-up" className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Join the companies already transforming their security posture with our next-generation solutions.
              </p>

              <div data-reveal="slide-up" className="flex flex-wrap items-center justify-center gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.4)] hover:scale-105 transition-all duration-300"
                >
                  <Scan className="mr-2 h-4 w-4" />
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Link to="/">
                  <Button 
                    variant="neon" 
                    size="lg" 
                    className="hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.3)] hover:scale-105 transition-all duration-300"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
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

export default AboutUs;