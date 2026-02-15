import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StickyHeader } from "@/components/StickyHeader";
import { 
  Search, 
  Shield, 
  Eye, 
  Zap, 
  ArrowRight, 
  ChevronDown, 
  CheckCircle, 
  Play,
  Target,
  Brain,
  Lock,
  AlertTriangle,
  Activity
} from "lucide-react";

const OurProcess = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const processSteps = [
    {
      id: 1,
      phase: "Discovery & Assessment",
      title: "Deep Security Reconnaissance",
      subtitle: "AI-Powered Vulnerability Discovery",
      description: "Our elite security engineers deploy advanced AI algorithms and military-grade scanning tools to conduct a comprehensive audit of your digital infrastructure.",
      icon: Search,
      duration: "2-3 weeks",
      deliverables: [
        "360° Security Posture Assessment",
        "Vulnerability Risk Matrix",
        "Compliance Gap Analysis", 
        "Executive Security Scorecard",
        "Threat Landscape Mapping"
      ],
      details: {
        methodology: "Zero-touch automated scanning combined with expert manual validation",
        tools: "Proprietary AI scanner, OWASP testing suite, custom penetration tools",
        outcome: "Complete visibility into security weaknesses and attack vectors"
      },
      color: "neon-blue",
      bgPattern: "assessment"
    },
    {
      id: 2,
      phase: "Strategy & Architecture",
      title: "Fortress Blueprint Design",
      subtitle: "Zero-Trust Security Architecture",
      description: "Design and architect a military-grade defense system tailored to your specific threat landscape and business requirements.",
      icon: Brain,
      duration: "1-2 weeks", 
      deliverables: [
        "Zero-Trust Architecture Design",
        "Security Technology Roadmap",
        "Implementation Strategy",
        "Risk Mitigation Framework",
        "Compliance Alignment Plan"
      ],
      details: {
        methodology: "Threat modeling combined with business impact analysis",
        tools: "Advanced threat modeling platforms, security architecture frameworks",
        outcome: "Comprehensive security blueprint ready for implementation"
      },
      color: "cyber-purple",
      bgPattern: "strategy"
    },
    {
      id: 3,
      phase: "Implementation & Deployment",
      title: "Fortress Activation",
      subtitle: "Multi-Layer Defense Deployment",
      description: "Deploy cutting-edge security controls with minimal business disruption using our proven phased implementation methodology.",
      icon: Shield,
      duration: "4-8 weeks",
      deliverables: [
        "Security Control Implementation",
        "Zero-Trust Network Setup",
        "Endpoint Protection Deployment",
        "Identity Management System",
        "Security Policy Configuration"
      ],
      details: {
        methodology: "Phased deployment with continuous validation and rollback capabilities",
        tools: "Automated deployment pipelines, configuration management, testing frameworks",
        outcome: "Fully operational security infrastructure with 99.9% uptime guarantee"
      },
      color: "electric-green",
      bgPattern: "implementation"
    },
    {
      id: 4,
      phase: "Monitoring & Intelligence",
      title: "Neural Defense Matrix",
      subtitle: "24/7 SOC Operations",
      description: "Activate continuous monitoring with our elite Security Operations Center, powered by AI threat intelligence and human expertise.",
      icon: Eye,
      duration: "Ongoing",
      deliverables: [
        "24/7 SOC Monitoring",
        "Real-time Threat Intelligence",
        "Behavioral Analytics Engine",
        "Automated Response System",
        "Executive Security Dashboards"
      ],
      details: {
        methodology: "AI-powered threat detection with human analyst validation",
        tools: "Next-gen SIEM, ML threat detection, custom analytics platform",
        outcome: "Proactive threat detection with sub-5 minute response times"
      },
      color: "neon-cyan",
      bgPattern: "monitoring"
    },
    {
      id: 5,
      phase: "Response & Evolution",
      title: "Adaptive Defense Protocol",
      subtitle: "Incident Response & Continuous Improvement",
      description: "Lightning-fast incident response with continuous security posture enhancement based on emerging threats and lessons learned.",
      icon: Zap,
      duration: "Continuous",
      deliverables: [
        "Incident Response Team",
        "Forensic Investigation",
        "Recovery Orchestration",
        "Threat Hunt Operations",
        "Security Posture Evolution"
      ],
      details: {
        methodology: "Rapid response protocols with post-incident learning integration",
        tools: "Incident response platform, forensic analysis tools, threat hunting suite",
        outcome: "Sub-15 minute incident containment with comprehensive recovery"
      },
      color: "electric-orange",
      bgPattern: "response"
    }
  ];

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
      'cyber-purple': {
        text: 'text-[hsl(var(--cyber-purple))]',
        bg: 'bg-[hsl(var(--cyber-purple))]',
        bgGradient: 'from-[hsl(var(--cyber-purple)/0.2)] to-[hsl(var(--cyber-purple)/0.05)]',
        border: 'border-[hsl(var(--cyber-purple)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--cyber-purple)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--cyber-purple))]'
      },
      'electric-green': {
        text: 'text-[hsl(var(--electric-green))]',
        bg: 'bg-[hsl(var(--electric-green))]',
        bgGradient: 'from-[hsl(var(--electric-green)/0.2)] to-[hsl(var(--electric-green)/0.05)]',
        border: 'border-[hsl(var(--electric-green)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--electric-green)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--electric-green))]'
      },
      'neon-cyan': {
        text: 'text-[hsl(var(--neon-cyan))]',
        bg: 'bg-[hsl(var(--neon-cyan))]',
        bgGradient: 'from-[hsl(var(--neon-cyan)/0.2)] to-[hsl(var(--neon-cyan)/0.05)]',
        border: 'border-[hsl(var(--neon-cyan)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--neon-cyan)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--neon-cyan))]'
      },
      'electric-orange': {
        text: 'text-[hsl(var(--electric-orange))]',
        bg: 'bg-[hsl(var(--electric-orange))]',
        bgGradient: 'from-[hsl(var(--electric-orange)/0.2)] to-[hsl(var(--electric-orange)/0.05)]',
        border: 'border-[hsl(var(--electric-orange)/0.3)]',
        shadow: 'shadow-[0_0_40px_hsl(var(--electric-orange)/0.4)]',
        glow: 'shadow-[0_0_12px_hsl(var(--electric-orange))]'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap['neon-blue'];
  };

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = parseInt(entry.target.getAttribute('data-step') || '0');
          setActiveStep(stepId);
        }
      });
    }, observerOptions);

    const stepElements = document.querySelectorAll('[data-step]');
    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative cyber-grid overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] blur-3xl animate-pulse"
              style={{
                left: `${mousePosition.x * 0.02}px`,
                top: `${mousePosition.y * 0.02}px`,
              }}
            />
            <div 
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-[hsl(var(--electric-green)/0.1)] to-[hsl(var(--neon-cyan)/0.1)] blur-2xl animate-pulse"
              style={{
                right: `${mousePosition.x * -0.01}px`,
                bottom: `${mousePosition.y * -0.01}px`,
                animationDelay: '1s'
              }}
            />
          </div>

          <div className="container mx-auto relative z-10 py-20 md:py-32">
            <div className="text-center space-y-8">
              <div data-reveal="scale" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] border border-[hsl(var(--neon-blue)/0.3)] text-sm font-mono uppercase tracking-wider">
                <Activity className="h-4 w-4 text-[hsl(var(--electric-green))] animate-pulse" />
                Security Process Framework
              </div>
              
              <h1 data-reveal="fade" className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-glow">
                Our Elite
                <br />
                <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent animate-pulse">
                  Security Process
                </span>
              </h1>
              
              <p data-reveal="slide-up" className="text-muted-foreground text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                Five-phase methodology that transforms your cybersecurity posture from reactive to proactive. 
                Military-grade processes refined through thousands of engagements across Fortune 500 enterprises.
              </p>

              <div data-reveal="slide-up" className="flex flex-wrap items-center justify-center gap-4 pt-6">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.4)] hover:scale-105 transition-all duration-300"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Your Assessment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-[hsl(var(--cyber-purple)/0.3)] text-[hsl(var(--cyber-purple))] hover:bg-[hsl(var(--cyber-purple)/0.1)] hover:shadow-[0_0_20px_hsl(var(--cyber-purple)/0.3)] transition-all duration-300"
                >
                  Download Process Guide
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Process Stats */}
          <div data-reveal="fade" className="container mx-auto relative z-10 pb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { metric: "5 Phases", label: "Security Methodology" },
                { metric: "99.9%", label: "Implementation Success" },
                { metric: "<15min", label: "Incident Response" },
                { metric: "24/7", label: "Elite Monitoring" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-[hsl(var(--card)/0.5)] to-[hsl(var(--card)/0.3)] backdrop-blur-sm border border-[hsl(var(--border)/0.5)] hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.2)] transition-all duration-300"
                >
                  <div className="font-display text-2xl text-[hsl(var(--neon-blue))] mb-1">{stat.metric}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto">
            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  data-step={step.id}
                  className={`group transition-all duration-1000 ${
                    activeStep === step.id 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-70 transform translate-y-8'
                  }`}
                >
                  {/* Process Step Card */}
                  <div className={`glow-card rounded-3xl overflow-hidden relative transition-all duration-500 hover:scale-[1.02] hover:${getColorClasses(step.color).shadow}`}>
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div 
                        className="w-full h-full"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, hsl(var(--${step.color})/0.1) 25%, transparent 25%), 
                            linear-gradient(-45deg, hsl(var(--${step.color})/0.1) 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, hsl(var(--${step.color})/0.1) 75%), 
                            linear-gradient(-45deg, transparent 75%, hsl(var(--${step.color})/0.1) 75%)
                          `,
                          backgroundSize: '30px 30px',
                          backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px',
                          animation: 'float 20s ease-in-out infinite'
                        }}
                      />
                    </div>

                    <div className="relative z-10 p-8 md:p-12">
                      <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Icon & Phase Info */}
                        <div className="lg:col-span-1 space-y-6">
                          {/* Icon */}
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getColorClasses(step.color).bgGradient} border ${getColorClasses(step.color).border} flex items-center justify-center group-hover:scale-110 group-hover:${getColorClasses(step.color).glow} transition-all duration-500`}>
                            <step.icon className={`w-10 h-10 ${getColorClasses(step.color).text}`} />
                          </div>

                          {/* Phase Badge */}
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getColorClasses(step.color).bgGradient} border ${getColorClasses(step.color).border} text-sm font-mono`}>
                            <span className="flex items-center gap-2">
                              <span className={`h-2 w-2 rounded-full ${getColorClasses(step.color).bg} animate-pulse`} />
                              Phase {step.id}
                            </span>
                          </div>

                          {/* Duration */}
                          <div className="text-sm text-muted-foreground">
                            <span className="font-semibold">Duration:</span> {step.duration}
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                          <div>
                            <h3 className="font-display text-2xl md:text-3xl mb-2 group-hover:text-glow transition-all duration-300">
                              {step.title}
                            </h3>
                            <p className={`text-lg ${getColorClasses(step.color).text} font-semibold mb-4`}>
                              {step.subtitle}
                            </p>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                              {step.description}
                            </p>
                          </div>

                          {/* Deliverables */}
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <CheckCircle className={`w-4 h-4 ${getColorClasses(step.color).text}`} />
                              Key Deliverables
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {step.deliverables.map((deliverable, idx) => (
                                <div 
                                  key={idx}
                                  className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--accent)/0.5)] hover:bg-[hsl(var(--accent))] transition-colors duration-300"
                                >
                                  <span className={`w-2 h-2 rounded-full ${getColorClasses(step.color).bg}`} />
                                  <span className="text-sm">{deliverable}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Expand Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                            className={`${getColorClasses(step.color).border} ${getColorClasses(step.color).text} hover:bg-gradient-to-r hover:${getColorClasses(step.color).bgGradient} group/btn`}
                          >
                            <span>View Detailed Process</span>
                            <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-300 ${
                              expandedStep === step.id ? 'rotate-180' : ''
                            }`} />
                          </Button>

                          {/* Expanded Details */}
                          {expandedStep === step.id && (
                            <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-[hsl(var(--card)/0.8)] to-[hsl(var(--card)/0.4)] border border-[hsl(var(--border)/0.5)] animate-fade-in">
                              <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                  <h5 className="font-semibold mb-2 text-[hsl(var(--neon-blue))]">Methodology</h5>
                                  <p className="text-sm text-muted-foreground">{step.details.methodology}</p>
                                </div>
                                <div>
                                  <h5 className="font-semibold mb-2 text-[hsl(var(--electric-green))]">Tools & Tech</h5>
                                  <p className="text-sm text-muted-foreground">{step.details.tools}</p>
                                </div>
                                <div>
                                  <h5 className="font-semibold mb-2 text-[hsl(var(--cyber-purple))]">Expected Outcome</h5>
                                  <p className="text-sm text-muted-foreground">{step.details.outcome}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Connector */}
                    {index < processSteps.length - 1 && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getColorClasses(step.color).bgGradient} border-2 ${getColorClasses(step.color).border} flex items-center justify-center transition-all duration-500 ${
                          activeStep === step.id ? 'scale-100 opacity-100' : 'scale-75 opacity-50'
                        }`}>
                          <ArrowRight className={`w-6 h-6 ${getColorClasses(step.color).text} rotate-90`} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue)/0.3)] to-transparent animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-[hsl(var(--cyber-purple)/0.3)] to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto text-center">
            <div data-reveal="scale" className="max-w-4xl mx-auto space-y-8">
              <h2 className="font-display text-3xl md:text-5xl text-glow">
                Ready to Start Your
                <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                  Security Transformation?
                </span>
              </h2>
              
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Join over 500+ enterprises who trust our proven methodology to secure their digital future.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Button 
                  size="lg" 
                  variant="hero"
                  className="group hover:shadow-[0_0_50px_hsl(var(--neon-blue)/0.5)] hover:scale-105 transition-all duration-300"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Begin Security Assessment
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-[hsl(var(--cyber-purple)/0.3)] text-[hsl(var(--cyber-purple))] hover:bg-[hsl(var(--cyber-purple)/0.1)] hover:shadow-[0_0_30px_hsl(var(--cyber-purple)/0.4)] transition-all duration-300"
                >
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OurProcess;