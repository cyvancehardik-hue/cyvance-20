import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { StickyHeader } from "@/components/StickyHeader";
import { motion, useInView } from "framer-motion";
import { 
  Shield, 
  Search,
  FileText,
  Zap,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  TrendingUp,
  Lock,
  Eye,
  Target,
  Download,
  Play,
  ChevronRight
} from "lucide-react";

const processSteps = [
  {
    phase: "01",
    title: "Discovery & Assessment",
    subtitle: "Understanding Your Security Landscape",
    description: "Comprehensive analysis of your infrastructure, assets, and threat landscape to establish baseline security posture.",
    icon: Search,
    deliverables: [
      "Security posture assessment",
      "Asset inventory & classification",
      "Threat landscape analysis",
      "Compliance gap identification"
    ],
    timeline: "1-2 weeks",
    color: "neon-blue"
  },
  {
    phase: "02",
    title: "Strategic Planning",
    subtitle: "Architecting Your Defense",
    description: "Development of comprehensive security roadmap aligned with business objectives and regulatory requirements.",
    icon: FileText,
    deliverables: [
      "Custom security architecture",
      "Risk mitigation strategy",
      "Compliance roadmap",
      "Technology stack recommendations"
    ],
    timeline: "2-3 weeks",
    color: "cyber-purple"
  },
  {
    phase: "03",
    title: "Implementation",
    subtitle: "Building Your Fortress",
    description: "Deployment of advanced security controls, monitoring systems, and defense mechanisms across your infrastructure.",
    icon: Shield,
    deliverables: [
      "Security tool deployment",
      "Network segmentation",
      "Access control implementation",
      "Monitoring & logging setup"
    ],
    timeline: "4-8 weeks",
    color: "neon-cyan"
  },
  {
    phase: "04",
    title: "Testing & Validation",
    subtitle: "Proving Defense Effectiveness",
    description: "Rigorous penetration testing and security validation to ensure all controls function as designed.",
    icon: Target,
    deliverables: [
      "Penetration testing",
      "Vulnerability assessment",
      "Security control validation",
      "Remediation verification"
    ],
    timeline: "2-3 weeks",
    color: "electric-green"
  },
  {
    phase: "05",
    title: "Continuous Monitoring",
    subtitle: "24/7 Security Operations",
    description: "Around-the-clock threat monitoring, incident response, and continuous improvement of security posture.",
    icon: Eye,
    deliverables: [
      "24/7 SOC monitoring",
      "Threat intelligence feeds",
      "Incident response",
      "Quarterly security reviews"
    ],
    timeline: "Ongoing",
    color: "neon-blue"
  }
];

const stats = [
  { value: "99.9%", label: "Detection Rate", icon: Target },
  { value: "<15min", label: "Response Time", icon: Clock },
  { value: "24/7", label: "Monitoring", icon: Eye },
  { value: "100+", label: "Clients Protected", icon: Users }
];

const whyChooseUs = [
  {
    title: "Proven Methodology",
    description: "Battle-tested security framework refined through hundreds of enterprise engagements",
    icon: CheckCircle
  },
  {
    title: "Elite Expertise",
    description: "Team of certified security professionals with Fortune 500 experience",
    icon: Shield
  },
  {
    title: "Transparent Process",
    description: "Clear milestones, regular updates, and full visibility into security operations",
    icon: Eye
  },
  {
    title: "Measurable Results",
    description: "Data-driven approach with quantifiable security improvements and ROI",
    icon: TrendingUp
  }
];

const OurProcess = () => {
  const [selectedLayout, setSelectedLayout] = useState<"horizontal" | "vertical" | "timeline">("vertical");
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isProcessInView = useInView(processRef, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      
      <main className="pt-16">
        {/* Hero Section - Clean & Professional */}
        <section ref={heroRef} className="relative py-20 md:py-32 overflow-hidden">
          {/* Subtle animated background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--neon-blue)),transparent_50%)]" />
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
                                 linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
              }}
              animate={{ backgroundPosition: ['0px 0px', '60px 60px'] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center space-y-6"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border backdrop-blur-sm"
              >
                <Lock className="w-4 h-4 text-[hsl(var(--neon-blue))]" />
                <span className="text-sm font-medium text-muted-foreground">Enterprise-Grade Security Process</span>
              </motion.div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Our Proven Security
                <span className="block bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
                  Process Framework
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                A systematic, transparent approach to building and maintaining enterprise security that delivers measurable results
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="group bg-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))]/90 text-primary-foreground">
                  Start Your Assessment
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="group border-border hover:bg-card/50">
                  <Download className="mr-2 w-4 h-4" />
                  Download Process Guide
                </Button>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-[hsl(var(--neon-blue))]/50 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-[hsl(var(--neon-blue))] mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Layout Selector */}
        <section className="py-8 border-y border-border bg-card/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">View Process Layout</h3>
                <p className="text-xs text-muted-foreground">Choose your preferred visualization</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedLayout === "vertical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLayout("vertical")}
                  className={selectedLayout === "vertical" ? "bg-[hsl(var(--neon-blue))]" : ""}
                >
                  Vertical Steps
                </Button>
                <Button
                  variant={selectedLayout === "horizontal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLayout("horizontal")}
                  className={selectedLayout === "horizontal" ? "bg-[hsl(var(--neon-blue))]" : ""}
                >
                  Horizontal Flow
                </Button>
                <Button
                  variant={selectedLayout === "timeline" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLayout("timeline")}
                  className={selectedLayout === "timeline" ? "bg-[hsl(var(--neon-blue))]" : ""}
                >
                  Timeline View
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps - Vertical Layout */}
        {selectedLayout === "vertical" && (
          <section ref={processRef} className="py-20 md:py-32">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Five-Phase Security Framework
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our systematic approach ensures comprehensive protection at every stage
                </p>
              </motion.div>

              <div className="max-w-5xl mx-auto space-y-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -40 }}
                    animate={isProcessInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group relative"
                  >
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-[hsl(var(--neon-blue))]/50 hover:shadow-[0_0_30px_-12px_hsl(var(--neon-blue))] transition-all duration-300">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Icon & Phase */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))]/20 to-[hsl(var(--cyber-purple))]/20 border border-[hsl(var(--neon-blue))]/30 flex items-center justify-center">
                              <step.icon className="w-8 h-8 text-[hsl(var(--neon-blue))]" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[hsl(var(--neon-blue))] flex items-center justify-center text-xs font-bold text-primary-foreground">
                              {step.phase}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-foreground mb-1">{step.title}</h3>
                              <p className="text-sm text-[hsl(var(--neon-blue))] font-medium">{step.subtitle}</p>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border text-sm text-muted-foreground w-fit">
                              <Clock className="w-4 h-4" />
                              {step.timeline}
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4">{step.description}</p>

                          {/* Deliverables */}
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-2">Key Deliverables:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {step.deliverables.map((item, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-[hsl(var(--electric-green))] flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-muted-foreground">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < processSteps.length - 1 && (
                      <div className="flex justify-center my-4">
                        <ChevronRight className="w-6 h-6 text-border rotate-90" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Process Steps - Horizontal Layout */}
        {selectedLayout === "horizontal" && (
          <section ref={processRef} className="py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Five-Phase Security Framework
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our systematic approach ensures comprehensive protection at every stage
                </p>
              </motion.div>

              <div className="relative">
                {/* Progress Line */}
                <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-border" />
                <div className="hidden lg:block absolute top-12 left-0 h-0.5 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))]"
                     style={{ width: '100%' }} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Step Number Badge */}
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-card border-2 border-[hsl(var(--neon-blue))] flex items-center justify-center relative z-10">
                            <step.icon className="w-10 h-10 text-[hsl(var(--neon-blue))]" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] flex items-center justify-center text-sm font-bold text-primary-foreground z-20">
                            {step.phase}
                          </div>
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="bg-card border border-border rounded-lg p-6 hover:border-[hsl(var(--neon-blue))]/50 transition-all duration-300 h-full">
                        <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-[hsl(var(--neon-blue))] font-medium mb-3">{step.subtitle}</p>
                        <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {step.timeline}
                        </div>
                      </div>

                      {/* Arrow connector */}
                      {index < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-12 -right-4 z-30">
                          <ChevronRight className="w-8 h-8 text-[hsl(var(--neon-blue))]" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Process Steps - Timeline Layout */}
        {selectedLayout === "timeline" && (
          <section ref={processRef} className="py-20 md:py-32">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                  Five-Phase Security Framework
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our systematic approach ensures comprehensive protection at every stage
                </p>
              </motion.div>

              <div className="max-w-6xl mx-auto relative">
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2" />
                <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-[hsl(var(--neon-blue))] via-[hsl(var(--cyber-purple))] to-[hsl(var(--neon-cyan))] transform -translate-x-1/2 opacity-50" />

                <div className="space-y-12">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                      animate={isProcessInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`flex flex-col md:flex-row items-center gap-8 ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Content */}
                      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        <div className="bg-card border border-border rounded-xl p-6 hover:border-[hsl(var(--neon-blue))]/50 hover:shadow-[0_0_30px_-12px_hsl(var(--neon-blue))] transition-all duration-300">
                          <div className="flex items-center gap-3 mb-3">
                            {index % 2 !== 0 && <step.icon className="w-6 h-6 text-[hsl(var(--neon-blue))]" />}
                            <span className="text-sm font-bold text-[hsl(var(--neon-blue))]">PHASE {step.phase}</span>
                            {index % 2 === 0 && <step.icon className="w-6 h-6 text-[hsl(var(--neon-blue))] ml-auto" />}
                          </div>
                          <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{step.timeline}</span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Node */}
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] border-4 border-background flex items-center justify-center shadow-lg">
                          <span className="text-lg font-bold text-primary-foreground">{step.phase}</span>
                        </div>
                      </div>

                      {/* Spacer for alignment */}
                      <div className="flex-1 hidden md:block" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Our Process */}
        <section className="py-20 bg-card/20 border-y border-border">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Our Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A proven framework built on expertise, transparency, and measurable outcomes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-[hsl(var(--neon-blue))]/50 transition-all duration-300"
                >
                  <item.icon className="w-10 h-10 text-[hsl(var(--neon-blue))] mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue))]/10 to-[hsl(var(--cyber-purple))]/10" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--neon-blue)),transparent_70%)]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--neon-blue))]/10 border border-[hsl(var(--neon-blue))]/30 backdrop-blur-sm mb-6">
                <Zap className="w-4 h-4 text-[hsl(var(--neon-blue))]" />
                <span className="text-sm font-medium text-[hsl(var(--neon-blue))]">Ready to Get Started?</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Start Your Security Transformation Today
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of enterprises that trust our proven process to protect their critical assets
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="group bg-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))]/90 text-primary-foreground">
                  <Play className="mr-2 w-5 h-5" />
                  Begin Security Assessment
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="group border-border hover:bg-card/50">
                  Schedule Consultation
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-12 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Assessments Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support Available</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OurProcess;
