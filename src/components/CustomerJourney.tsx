import { useState, useEffect } from "react";
import { Shield, Eye, Zap, AlertTriangle, ChevronRight, ArrowRight, Search, Users, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomerJourney = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Assess",
      subtitle: "Security Audit & Vulnerability Discovery",
      description: "Comprehensive analysis of your security posture with AI-powered vulnerability assessment and risk scoring.",
      icon: Search,
      features: [
        "360° Security Assessment",
        "Automated Vulnerability Scanning",
        "Compliance Gap Analysis",
        "Risk Prioritization Matrix"
      ],
      color: "neon-blue",
      delay: 0
    },
    {
      id: 2,
      title: "Protect",
      subtitle: "AI-Powered Defense & Zero-Trust Implementation",
      description: "Deploy military-grade protection with zero-trust architecture and intelligent threat prevention.",
      icon: Shield,
      features: [
        "Zero-Trust Network Access",
        "AI Threat Prevention",
        "Endpoint Protection",
        "Identity Management"
      ],
      color: "electric-green",
      delay: 200
    },
    {
      id: 3,
      title: "Monitor",
      subtitle: "24/7 SOC Operations & Live Threat Intelligence",
      description: "Continuous monitoring with elite security operations center and real-time threat intelligence.",
      icon: Eye,
      features: [
        "24/7 SOC Monitoring",
        "Real-time Threat Intel",
        "Behavioral Analytics",
        "Automated Response"
      ],
      color: "cyber-purple",
      delay: 400
    },
    {
      id: 4,
      title: "Respond",
      subtitle: "Rapid Incident Response & Resilience Building",
      description: "Lightning-fast incident response with comprehensive recovery and resilience building protocols.",
      icon: Zap,
      features: [
        "Incident Response Team",
        "Forensic Investigation",
        "Recovery Orchestration",
        "Resilience Planning"
      ],
      color: "neon-cyan",
      delay: 600
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0');
            setVisibleSteps(prev => new Set([...prev, stepIndex]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-10% 0px' }
    );

    const stepElements = document.querySelectorAll('[data-step]');
    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color: string) => {
    const colorMap = {
      'neon-blue': {
        text: 'text-[hsl(var(--neon-blue))]',
        bg: 'bg-[hsl(var(--neon-blue))]',
        bgGradient: 'from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--neon-blue)/0.05)]',
        border: 'border-[hsl(var(--neon-blue)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--neon-blue)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--neon-blue))]'
      },
      'electric-green': {
        text: 'text-[hsl(var(--electric-green))]',
        bg: 'bg-[hsl(var(--electric-green))]',
        bgGradient: 'from-[hsl(var(--electric-green)/0.2)] to-[hsl(var(--electric-green)/0.05)]',
        border: 'border-[hsl(var(--electric-green)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--electric-green)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--electric-green))]'
      },
      'cyber-purple': {
        text: 'text-[hsl(var(--cyber-purple))]',
        bg: 'bg-[hsl(var(--cyber-purple))]',
        bgGradient: 'from-[hsl(var(--cyber-purple)/0.2)] to-[hsl(var(--cyber-purple)/0.05)]',
        border: 'border-[hsl(var(--cyber-purple)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--cyber-purple)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--cyber-purple))]'
      },
      'neon-cyan': {
        text: 'text-[hsl(var(--neon-cyan))]',
        bg: 'bg-[hsl(var(--neon-cyan))]',
        bgGradient: 'from-[hsl(var(--neon-cyan)/0.2)] to-[hsl(var(--neon-cyan)/0.05)]',
        border: 'border-[hsl(var(--neon-cyan)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--neon-cyan)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--neon-cyan))]'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap['neon-blue'];
  };

  return (
    <section className="container mx-auto py-16 md:py-24 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <div data-reveal className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] border border-[hsl(var(--neon-blue)/0.3)] text-sm font-mono uppercase tracking-wider mb-6">
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
          Customer Journey
        </div>
        <h2 data-reveal className="font-display text-3xl md:text-5xl mb-6 text-glow">
          Your Path to
          <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
            Cyber Resilience
          </span>
        </h2>
        <p data-reveal className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Enterprise-grade cybersecurity delivered through our proven four-stage methodology. 
          From assessment to active defense, we secure your digital future.
        </p>
      </div>

      {/* Progress Tracker */}
      <div data-reveal className="flex justify-center mb-12 relative z-10">
        <div className="flex items-center space-x-4 bg-gradient-to-r from-[hsl(var(--card)/0.5)] to-[hsl(var(--card)/0.3)] backdrop-blur-sm rounded-full px-6 py-3 border border-[hsl(var(--border)/0.5)]">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  visibleSteps.has(step.id) 
                    ? `${getColorClasses(step.color).bg} ${getColorClasses(step.color).glow}`
                    : 'bg-muted'
                }`}
              />
              {index < steps.length - 1 && (
                <div 
                  className={`w-8 h-0.5 mx-2 transition-all duration-500 ${
                    visibleSteps.has(step.id) 
                      ? `bg-gradient-to-r ${getColorClasses(step.color).bgGradient}`
                      : 'bg-muted'
                  }`}
                  style={{ transitionDelay: `${step.delay}ms` }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Journey Steps - Desktop Horizontal Layout */}
      <div className="hidden lg:block relative z-10">
        <div className="relative">
          {/* Animated Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-[hsl(var(--neon-blue)/0.3)] via-[hsl(var(--cyber-purple)/0.3)] to-[hsl(var(--neon-cyan)/0.3)] transform -translate-y-1/2" />
          
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                data-step={step.id}
                className={`group relative transition-all duration-700 ${
                  visibleSteps.has(step.id) 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{ transitionDelay: `${step.delay}ms` }}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step Card */}
                <div className={`glow-card rounded-2xl p-6 text-center relative overflow-hidden transition-all duration-500 group-hover:scale-105 hover:${getColorClasses(step.color).shadow}`}>
                  {/* Animated Background Glow */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(step.color).bgGradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                  />
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${getColorClasses(step.color).bgGradient} border ${getColorClasses(step.color).border} flex items-center justify-center relative z-10`}>
                    <step.icon 
                      className={`w-8 h-8 ${getColorClasses(step.color).text} transition-all duration-300 ${
                        hoveredStep === step.id ? 'animate-pulse scale-110' : ''
                      }`} 
                    />
                    {/* Ripple Effect */}
                    {hoveredStep === step.id && (
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${getColorClasses(step.color).bgGradient} animate-[node-pulse_1s_ease-out]`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="font-display text-xl mb-2 group-hover:text-glow transition-all duration-300">
                      {step.title}
                    </h3>
                    <p className={`text-sm ${getColorClasses(step.color).text} font-semibold mb-3`}>
                      {step.subtitle}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 text-xs text-muted-foreground mb-4">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center gap-2">
                          <span className={`w-1 h-1 rounded-full ${getColorClasses(step.color).bg}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button - appears on hover */}
                    <div className={`transition-all duration-300 ${
                      hoveredStep === step.id 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-2'
                    }`}>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className={`${getColorClasses(step.color).border} ${getColorClasses(step.color).text} hover:bg-gradient-to-br hover:${getColorClasses(step.color).bgGradient}`}
                      >
                        Learn More
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] flex items-center justify-center text-xs font-mono">
                    {step.id}
                  </div>
                </div>

                {/* Connecting Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-4 z-20 transform -translate-y-1/2">
                    <div className={`w-8 h-8 rounded-full bg-[hsl(var(--background))] border-2 ${getColorClasses(step.color).border} flex items-center justify-center transition-all duration-500 ${
                      visibleSteps.has(step.id) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}>
                      <ArrowRight className={`w-4 h-4 ${getColorClasses(step.color).text}`} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Vertical Layout */}
      <div className="lg:hidden space-y-8 relative z-10">
        {steps.map((step, index) => (
          <div
            key={step.id}
            data-step={step.id}
            className={`transition-all duration-700 ${
              visibleSteps.has(step.id) 
                ? 'opacity-100 transform translate-x-0' 
                : 'opacity-0 transform translate-x-8'
            }`}
            style={{ transitionDelay: `${step.delay}ms` }}
          >
            <div className={`glow-card rounded-2xl p-6 relative overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:${getColorClasses(step.color).shadow}`}>
              {/* Mobile Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(step.color).bgGradient} opacity-50`} />
              
              <div className="flex items-start gap-4 relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getColorClasses(step.color).bgGradient} border ${getColorClasses(step.color).border} flex items-center justify-center flex-shrink-0`}>
                  <step.icon className={`w-6 h-6 ${getColorClasses(step.color).text}`} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display text-lg mb-1">
                    {step.title}
                  </h3>
                  <p className={`text-sm ${getColorClasses(step.color).text} font-semibold mb-2`}>
                    {step.subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {/* Mobile Features Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${getColorClasses(step.color).bg}`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Number */}
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] flex items-center justify-center text-sm font-mono flex-shrink-0">
                  {step.id}
                </div>
              </div>

              {/* Mobile Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute -bottom-4 left-1/2 w-px h-8 bg-gradient-to-b from-[hsl(var(--border))] to-transparent transform -translate-x-1/2" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div data-reveal className="mt-16 text-center space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            variant="hero"
            className="shadow-[0_0_30px_hsl(var(--neon-blue)/0.4)] hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.6)] transition-all duration-300 group"
          >
            <Target className="w-4 h-4 mr-2" />
            Start Your Security Audit
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            asChild
            className="border-[hsl(var(--cyber-purple)/0.3)] text-[hsl(var(--cyber-purple))] hover:bg-[hsl(var(--cyber-purple)/0.1)] hover:shadow-[0_0_20px_hsl(var(--cyber-purple)/0.3)] transition-all duration-300 group"
          >
            <a href="/our-process">
              <Eye className="w-4 h-4 mr-2" />
              Learn Our Whole Process
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CustomerJourney;