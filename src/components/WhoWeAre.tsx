import { Target, Eye, Heart, Users, Shield, Zap, Award, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhoWeAre = () => {
  const coreValues = [
    {
      icon: Shield,
      title: "Trust",
      description: "Building unshakeable confidence through transparent practices and proven results.",
      color: "neon-blue"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pioneering tomorrow's security solutions with cutting-edge technology today.",
      color: "cyber-purple"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering exceptional quality in every solution, every interaction, every outcome.",
      color: "neon-cyan"
    },
    {
      icon: Globe,
      title: "Impact",
      description: "Creating meaningful change that protects and empowers organizations worldwide.",
      color: "electric-green"
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[hsl(var(--card)/0.02)] to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-[hsl(var(--cyber-purple)/0.1)] to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-32">
          {/* Text Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div data-reveal className="group">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-6 transition-all duration-700 group-hover:scale-105">
                <span className="block text-glow bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent relative">
                  Who we are!
                  <div className="absolute -inset-2 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
                </span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed transition-all duration-500 group-hover:text-foreground/90">
                We're not just another cybersecurity company. We're a team of passionate professionals who believe that 
                <span className="text-[hsl(var(--neon-cyan))] font-medium hover:text-[hsl(var(--neon-cyan)/0.8)] transition-colors duration-300 cursor-pointer relative group/keyword">
                  <span className="relative z-10"> innovation</span>
                  <span className="absolute inset-0 bg-[hsl(var(--neon-cyan)/0.1)] rounded opacity-0 group-hover/keyword:opacity-100 transition-opacity duration-300 -z-10"></span>
                </span>, 
                <span className="text-[hsl(var(--electric-green))] font-medium hover:text-[hsl(var(--electric-green)/0.8)] transition-colors duration-300 cursor-pointer relative group/keyword">
                  <span className="relative z-10"> trust</span>
                  <span className="absolute inset-0 bg-[hsl(var(--electric-green)/0.1)] rounded opacity-0 group-hover/keyword:opacity-100 transition-opacity duration-300 -z-10"></span>
                </span>, and 
                <span className="text-[hsl(var(--cyber-purple))] font-medium hover:text-[hsl(var(--cyber-purple)/0.8)] transition-colors duration-300 cursor-pointer relative group/keyword">
                  <span className="relative z-10"> excellence</span>
                  <span className="absolute inset-0 bg-[hsl(var(--cyber-purple)/0.1)] rounded opacity-0 group-hover/keyword:opacity-100 transition-opacity duration-300 -z-10"></span>
                </span> 
                should be at the heart of every digital defense strategy.
              </p>
            </div>
            
            <div data-reveal className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm hover:bg-[hsl(var(--card)/0.8)] hover:border-[hsl(var(--electric-green)/0.5)] hover:shadow-[0_0_20px_hsl(var(--electric-green)/0.3)] transition-all duration-500 cursor-pointer group">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--electric-green))] animate-pulse group-hover:animate-none group-hover:scale-125 transition-transform duration-300"></div>
                <span className="text-sm font-medium group-hover:text-[hsl(var(--electric-green))] transition-colors duration-300">24/7 Active Monitoring</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[hsl(var(--card)/0.5)] border border-[hsl(var(--border)/0.5)] backdrop-blur-sm hover:bg-[hsl(var(--card)/0.8)] hover:border-[hsl(var(--neon-blue)/0.5)] hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)] transition-all duration-500 cursor-pointer group">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--neon-blue))] animate-pulse group-hover:animate-none group-hover:scale-125 transition-transform duration-300"></div>
                <span className="text-sm font-medium group-hover:text-[hsl(var(--neon-blue))] transition-colors duration-300">AI-Powered Defense</span>
              </div>
            </div>

            {/* Animated More About Us Button */}
            <div data-reveal className="mt-8">
              <Link to="/about-us">
                <Button 
                  variant="hero" 
                  className="group relative overflow-hidden px-8 py-6 text-lg font-semibold transition-all duration-700 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.5)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    More About Us
                    <ArrowRight className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110" />
                  </span>
                  
                  {/* Animated background shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  
                  {/* Pulsing glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.4)] to-[hsl(var(--cyber-purple)/0.4)] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500"></div>
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="order-1 lg:order-2" data-reveal>
            <div className="relative group">
              {/* Main Visual Container */}
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden transition-all duration-700 group-hover:scale-105">
                {/* Glassmorphism Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--card)/0.3)] to-[hsl(var(--card)/0.1)] backdrop-blur-xl border border-[hsl(var(--border)/0.2)] group-hover:border-[hsl(var(--neon-blue)/0.3)] transition-all duration-500"></div>
                
                {/* Abstract 3D Shapes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 group-hover:scale-110 transition-transform duration-700">
                    {/* Floating Elements with enhanced animations */}
                    <div className="absolute top-8 left-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--neon-blue)/0.4)] to-[hsl(var(--neon-blue)/0.2)] rotate-12 animate-bounce hover:rotate-45 hover:scale-125 transition-all duration-500 cursor-pointer" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
                    <div className="absolute top-16 right-12 w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--cyber-purple)/0.4)] to-[hsl(var(--cyber-purple)/0.2)] animate-bounce hover:rotate-180 hover:scale-125 transition-all duration-500 cursor-pointer" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
                    <div className="absolute bottom-12 left-16 w-20 h-8 rounded-full bg-gradient-to-r from-[hsl(var(--neon-cyan)/0.4)] to-[hsl(var(--neon-cyan)/0.2)] rotate-45 animate-bounce hover:rotate-90 hover:scale-125 transition-all duration-500 cursor-pointer" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
                    <div className="absolute bottom-8 right-8 w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(var(--electric-green)/0.4)] to-[hsl(var(--electric-green)/0.2)] rotate-45 animate-bounce hover:rotate-0 hover:scale-125 transition-all duration-500 cursor-pointer" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
                    
                    {/* Central Hub with enhanced interactivity */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] shadow-[0_0_40px_hsl(var(--neon-blue)/0.5)] animate-pulse hover:animate-none hover:shadow-[0_0_60px_hsl(var(--neon-blue)/0.8)] hover:scale-125 transition-all duration-500 cursor-pointer group/hub">
                      <div className="absolute inset-2 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center group-hover/hub:bg-background/40 transition-all duration-300">
                        <Shield className="w-8 h-8 text-white group-hover/hub:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Glow Effects */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.2)] via-transparent to-[hsl(var(--cyber-purple)/0.2)] rounded-3xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700"></div>
              </div>
              
              {/* Interactive background particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[hsl(var(--neon-blue))] rounded-full animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[hsl(var(--cyber-purple))] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-[hsl(var(--neon-cyan))] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-20 lg:mb-32">
          <div className="text-center mb-16 group" data-reveal>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl mb-4 text-glow group-hover:scale-105 transition-all duration-500 relative">
              What Drives Us Forward
              <div className="absolute -inset-4 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.05)] via-[hsl(var(--cyber-purple)/0.05)] to-[hsl(var(--neon-cyan)/0.05)] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10"></div>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto group-hover:text-foreground/80 transition-colors duration-500">
              Our core values aren't just words on a wall—they're the foundation of every decision we make.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  data-reveal
                  className="group relative rounded-2xl p-6 lg:p-8 transition-all duration-700 hover:-translate-y-4 hover:rotate-1 cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Glassmorphism Card with enhanced effects */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--card)/0.6)] to-[hsl(var(--card)/0.3)] backdrop-blur-xl border border-[hsl(var(--border)/0.3)] transition-all duration-700 group-hover:border-[hsl(var(--${value.color})/0.8)] group-hover:shadow-[0_20px_60px_-12px_hsl(var(--${value.color})/0.4)] group-hover:bg-gradient-to-br group-hover:from-[hsl(var(--${value.color})/0.05)] group-hover:to-[hsl(var(--card)/0.3)]`}></div>
                  
                  {/* Animated border glow */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700`}>
                    <div className={`absolute inset-0 rounded-2xl border-2 border-[hsl(var(--${value.color})/0.6)] animate-pulse`}></div>
                  </div>

                  {/* Floating particles on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none">
                    <div className={`absolute top-4 right-4 w-1 h-1 bg-[hsl(var(--${value.color}))] rounded-full animate-pulse`} style={{ animationDelay: '0s' }}></div>
                    <div className={`absolute top-8 left-6 w-0.5 h-0.5 bg-[hsl(var(--${value.color}))] rounded-full animate-pulse`} style={{ animationDelay: '1s' }}></div>
                    <div className={`absolute bottom-6 right-8 w-1.5 h-1.5 bg-[hsl(var(--${value.color}))] rounded-full animate-pulse`} style={{ animationDelay: '2s' }}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="mb-6 transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-[hsl(var(--${value.color})/0.2)] to-[hsl(var(--${value.color})/0.1)] border border-[hsl(var(--${value.color})/0.3)] group-hover:border-[hsl(var(--${value.color})/0.8)] group-hover:shadow-[0_0_30px_hsl(var(--${value.color})/0.5)] transition-all duration-500 relative overflow-hidden`}>
                        <Icon className={`w-6 h-6 text-[hsl(var(--${value.color}))] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--${value.color}))]`} />
                        {/* Icon background shimmer effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--${value.color})/0.3)] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out`}></div>
                      </div>
                    </div>
                    
                    <h4 className={`font-display text-xl lg:text-2xl mb-3 transition-all duration-500 group-hover:text-[hsl(var(--${value.color}))] group-hover:drop-shadow-[0_0_8px_hsl(var(--${value.color})/0.5)] relative`}>
                      <span className="relative z-10">{value.title}</span>
                      {/* Text highlight effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-[hsl(var(--${value.color})/0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded -z-10`}></div>
                    </h4>
                    
                    <p className="text-muted-foreground leading-relaxed transition-all duration-500 group-hover:text-foreground/90 relative">
                      {value.description}
                      {/* Text glow on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                        <div className={`h-full w-full bg-gradient-to-r from-transparent via-[hsl(var(--${value.color})/0.1)] to-transparent blur-sm`}></div>
                      </div>
                    </p>
                  </div>

                  {/* Enhanced Hover Glow Effect with multiple layers */}
                  <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-r from-[hsl(var(--${value.color})/0.15)] via-[hsl(var(--${value.color})/0.1)] to-[hsl(var(--${value.color})/0.15)] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl`}></div>
                  <div className={`absolute -inset-1 rounded-2xl bg-[hsl(var(--${value.color})/0.05)] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl`}></div>
                  
                  {/* Morphing background shapes */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000">
                    <div className={`absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[hsl(var(--${value.color})/0.3)] to-transparent rounded-full blur-xl group-hover:scale-150 group-hover:rotate-90 transition-all duration-1000`}></div>
                    <div className={`absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-tr from-[hsl(var(--${value.color})/0.2)] to-transparent rounded-full blur-lg group-hover:scale-125 group-hover:-rotate-45 transition-all duration-1000`} style={{ transitionDelay: '200ms' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise Stats - Redesigned */}
        <div data-reveal className="relative">
          {/* Glassmorphism Container */}
          <div className="relative rounded-3xl p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--card)/0.7)] to-[hsl(var(--card)/0.4)] backdrop-blur-2xl border border-[hsl(var(--border)/0.3)]"></div>
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="cyber-grid h-full"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="font-display text-2xl lg:text-3xl mb-4 text-glow">
                  Trusted by Organizations Worldwide
                </h3>
                <p className="text-muted-foreground">
                  Numbers that reflect our commitment to excellence
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {[
                  { value: "15+", label: "Years of Expertise", color: "neon-blue" },
                  { value: "7+", label: "Security Professionals", color: "cyber-purple" },
                  { value: "24/7", label: "Global Coverage", color: "neon-cyan" },
                  { value: "99.9%", label: "Uptime Guarantee", color: "electric-green" }
                ].map((stat, index) => (
                  <div key={stat.label} className="text-center group">
                    <div className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display mb-2 text-glow group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <p className="text-sm lg:text-base text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] via-[hsl(var(--cyber-purple)/0.1)] to-[hsl(var(--neon-cyan)/0.1)] opacity-50 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;