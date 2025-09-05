import { useState, useEffect, useRef, useCallback } from "react";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { AnimatedCounter } from "./AnimatedCounter";
import { Activity, Shield, Target, TrendingUp, Globe, Cpu, Database, AlertTriangle, Zap, Wifi, Lock } from "lucide-react";

// Sample data for charts
const threatTrendData = [
  { time: "00:00", threats: 45, blocked: 42 },
  { time: "04:00", threats: 52, blocked: 50 },
  { time: "08:00", threats: 38, blocked: 37 },
  { time: "12:00", threats: 67, blocked: 65 },
  { time: "16:00", threats: 41, blocked: 39 },
  { time: "20:00", threats: 55, blocked: 53 },
  { time: "24:00", threats: 48, blocked: 46 }
];

const threatCategoryData = [
  { name: "Malware", value: 35, color: "hsl(var(--neon-blue))" },
  { name: "Phishing", value: 28, color: "hsl(var(--cyber-purple))" },
  { name: "Intrusion", value: 22, color: "hsl(var(--electric-green))" },
  { name: "DDoS", value: 15, color: "hsl(var(--neon-cyan))" }
];

const incidentSeverityData = [
  { severity: "Critical", count: 3, color: "hsl(var(--neon-blue))" },
  { severity: "High", count: 12, color: "hsl(var(--cyber-purple))" },
  { severity: "Medium", count: 28, color: "hsl(var(--electric-green))" },
  { severity: "Low", count: 45, color: "hsl(var(--neon-cyan))" }
];

const networkNodes = [
  { id: 1, region: "North America", status: "secure", threats: 24, x: 20, y: 30 },
  { id: 2, region: "Europe", status: "monitoring", threats: 18, x: 55, y: 25 },
  { id: 3, region: "Asia Pacific", status: "secure", threats: 32, x: 75, y: 45 },
  { id: 4, region: "South America", status: "alert", threats: 8, x: 25, y: 70 },
  { id: 5, region: "Africa", status: "secure", threats: 12, x: 58, y: 60 }
];

export const DashboardSection = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [pulseNodes, setPulseNodes] = useState<number[]>([]);
  const [showCurrentTimePulse, setShowCurrentTimePulse] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [chartProgress, setChartProgress] = useState(0);
  const [ambientSoundInterval, setAmbientSoundInterval] = useState<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  // Initialize Web Audio API
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, []);

  // Enhanced cyber sound effects
  const playDataPulse = useCallback(() => {
    if (!audioContextRef.current || !isInView) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.15);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.15);
  }, [isInView]);

  const playSystemBeep = useCallback(() => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(1200, audioContextRef.current.currentTime);
    oscillator.frequency.setValueAtTime(1000, audioContextRef.current.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.08);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.08);
  }, []);

  const playThreatAlert = useCallback(() => {
    if (!audioContextRef.current || !isInView) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(600, audioContextRef.current.currentTime);
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(600, audioContextRef.current.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.04, audioContextRef.current.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.25);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.25);
  }, [isInView]);

  const playAmbientPulse = useCallback(() => {
    if (!audioContextRef.current || !isInView) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(300, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContextRef.current.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.02, audioContextRef.current.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.3);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.3);
  }, [isInView]);

  // Speak system message
  const speakSystemMessage = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Realtime security metrics initialized. Monitoring active.");
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      utterance.volume = 0.7;
      
      const voices = speechSynthesis.getVoices();
      const robotVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('daniel') || 
        voice.name.toLowerCase().includes('alex') ||
        voice.name.toLowerCase().includes('samantha')
      );
      
      if (robotVoice) {
        utterance.voice = robotVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  }, []);

  // Enhanced Intersection Observer for activation and ambient sounds
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          
          if (entry.isIntersecting && !isActivated) {
            setIsActivated(true);
            initAudio();
            
            // Enhanced staggered activation sequence
            setTimeout(() => {
              playSystemBeep();
              speakSystemMessage();
            }, 500);

            // Progressive chart drawing animation
            setTimeout(() => {
              setChartProgress(25);
              playDataPulse();
            }, 800);
            
            setTimeout(() => {
              setChartProgress(50);
              playDataPulse();
            }, 1200);
            
            setTimeout(() => {
              setChartProgress(75);
              playDataPulse();
            }, 1600);
            
            setTimeout(() => {
              setChartProgress(100);
              playThreatAlert();
            }, 2000);

            // Start ambient sound loop when in view
            const ambientInterval = setInterval(() => {
              if (Math.random() > 0.3) {
                playAmbientPulse();
              }
            }, 4000 + Math.random() * 2000);
            
            setAmbientSoundInterval(ambientInterval);
          }
          
          // Stop ambient sounds when out of view
          if (!entry.isIntersecting && ambientSoundInterval) {
            clearInterval(ambientSoundInterval);
            setAmbientSoundInterval(null);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (ambientSoundInterval) {
        clearInterval(ambientSoundInterval);
      }
    };
  }, [isActivated, initAudio, playSystemBeep, playDataPulse, playThreatAlert, playAmbientPulse, speakSystemMessage, ambientSoundInterval]);

  // Enhanced network node pulsing with sequential regional lighting
  useEffect(() => {
    if (!isActivated) return;

    // Sequential region lighting on activation
    networkNodes.forEach((node, index) => {
      setTimeout(() => {
        setPulseNodes(prev => [...prev, node.id]);
        playDataPulse();
        setTimeout(() => {
          setPulseNodes(current => current.filter(id => id !== node.id));
        }, 2000);
      }, index * 400);
    });

    // Ongoing random pulsing
    const interval = setInterval(() => {
      setPulseNodes(prev => {
        const newNodes = [...prev];
        const randomNode = Math.floor(Math.random() * networkNodes.length) + 1;
        if (!newNodes.includes(randomNode)) {
          newNodes.push(randomNode);
          if (Math.random() > 0.7) playDataPulse();
          setTimeout(() => {
            setPulseNodes(current => current.filter(id => id !== randomNode));
          }, 1500);
        }
        return newNodes;
      });
    }, 2000 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, [isActivated, playDataPulse]);

  // Current time pulse on chart
  useEffect(() => {
    if (!isActivated) return;

    const interval = setInterval(() => {
      setShowCurrentTimePulse(true);
      setTimeout(() => setShowCurrentTimePulse(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [isActivated]);

  return (
    <section 
      ref={sectionRef}
      className={`relative py-12 sm:py-16 md:py-24 lg:py-32 bg-background overflow-hidden transition-all duration-1000 ${
        isActivated ? 'opacity-100' : 'opacity-90'
      }`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--neon-blue)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--electric-green)/0.08),transparent_50%)]" />
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      {/* Activation Scanner Lines */}
      {isActivated && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--neon-blue))] to-transparent animate-pulse" 
               style={{ top: '20%', animationDelay: '0.5s' }} />
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--electric-green))] to-transparent animate-pulse" 
               style={{ top: '80%', animationDelay: '1s' }} />
        </div>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className={`transition-all duration-1000 ${isActivated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-foreground">
              Performance Metrics Dashboard
            </h2>
          </div>
          <div className={`transition-all duration-1000 delay-300 ${isActivated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-4">
              Your Security, Always Visible. Always Live.
            </p>
            {isActivated && (
              <div className="flex items-center justify-center gap-2 text-primary text-xs sm:text-sm uppercase tracking-wider">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                System Status: Online
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Enhanced KPI Metrics Cards with Neon Glow Pulses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
          {[
            { icon: Shield, value: 12450, suffix: "+", label: "Threats Neutralized", color: "neon-blue", delay: 0 },
            { icon: Zap, value: 2.1, suffix: " mins", label: "Average Response Time", color: "electric-green", delay: 150 },
            { icon: Database, value: 1.2, suffix: "M", label: "Events Monitored", color: "cyber-purple", delay: 300 },
            { icon: TrendingUp, value: 99.7, suffix: "%", label: "Protection Effectiveness", color: "neon-cyan", delay: 450 }
          ].map((metric, index) => (
             <div 
               key={index}
               className={`group glow-card bg-card backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 relative overflow-hidden ${
                 isActivated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
               }`}
               style={{ 
                 transitionDelay: `${500 + metric.delay}ms`,
                 animationDelay: `${500 + metric.delay}ms`
               }}
             >
              {/* Animated neon glow effect */}
              {isActivated && (
                <div className="absolute inset-0 rounded-2xl opacity-30 animate-pulse">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[hsl(var(--${metric.color})/0.1)] to-transparent`} 
                       style={{ animationDelay: `${metric.delay}ms` }} />
                </div>
              )}
              
               <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 relative z-10">
                 <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center transition-all duration-300">
                   <metric.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                 </div>
                 <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
               </div>
               
               <div className="text-2xl sm:text-3xl font-display text-foreground mb-2 relative z-10">
                 {isActivated ? <AnimatedCounter value={metric.value} duration={2000} /> : 0}
                 <span className="text-primary">{metric.suffix}</span>
               </div>
               
               <p className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider relative z-10">{metric.label}</p>
              
              {/* Scanning line effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--${metric.color}))] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-[scan_2s_linear_infinite]`} />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-16">
          {/* Enhanced Threat Trends Line Chart */}
          <div className={`glow-card bg-card backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border transition-all duration-1000 ${
            isActivated ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`} style={{ transitionDelay: '800ms' }}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-foreground font-display text-base sm:text-lg">Attack Trends (24h)</h3>
              <div className="ml-auto flex items-center gap-2">
                {showCurrentTimePulse && (
                  <div className="h-3 w-3 rounded-full bg-primary animate-ping" />
                )}
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
            </div>
            <div className="h-48 sm:h-56 md:h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={threatTrendData}>
                  <defs>
                    <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="hsl(var(--neon-blue))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--electric-green))" stopOpacity={0.6}/>
                      <stop offset="100%" stopColor="hsl(var(--electric-green))" stopOpacity={0.1}/>
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="strongGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="threats"
                    stroke="hsl(var(--neon-blue))"
                    strokeWidth={3}
                    fill="url(#threatGradient)"
                    filter="url(#glow)"
                    animationBegin={800}
                    animationDuration={2000}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="blocked" 
                    stroke="hsl(var(--electric-green))" 
                    strokeWidth={2} 
                    dot={false}
                    filter="url(#strongGlow)"
                    animationBegin={1200}
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
              
              {/* Live data pulse indicator */}
              {showCurrentTimePulse && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[hsl(var(--neon-blue))] animate-ping" />
                    <span className="text-xs text-white/80 font-mono">LIVE</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Threat Categories Pie Chart */}
          <div className={`glow-card bg-gradient-to-br from-[hsl(var(--card)/0.8)] to-[hsl(var(--card)/0.4)] backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-1000 ${
            isActivated ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`} style={{ transitionDelay: '1000ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--cyber-purple)/0.3)] to-[hsl(var(--cyber-purple)/0.1)] border border-[hsl(var(--cyber-purple)/0.4)] flex items-center justify-center">
                <Target className="h-4 w-4 text-[hsl(var(--cyber-purple))]" />
              </div>
              <h3 className="text-white font-display text-lg">Threat Categories</h3>
              <div className="ml-auto h-2 w-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
            </div>
            <div className="h-64 flex items-center relative">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="pieGlow">
                      <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="currentColor"/>
                    </filter>
                  </defs>
                  <Pie
                    data={threatCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    animationBegin={1000}
                    animationDuration={2500}
                    filter="url(#pieGlow)"
                  >
                    {threatCategoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={entry.color}
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="ml-4 space-y-3 flex-1">
                {threatCategoryData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-all duration-200">
                    <div 
                      className="h-3 w-3 rounded-full transition-all duration-200 group-hover:shadow-[0_0_12px_currentColor] group-hover:scale-110" 
                      style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}30` }} 
                    />
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors flex-1">{item.name}</span>
                    <span className="text-white text-sm font-mono bg-black/20 px-2 py-1 rounded">{item.value}%</span>
                  </div>
                ))}
              </div>
              
              {/* Rotating scanner effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                <div className="absolute top-1/2 left-1/4 w-32 h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--cyber-purple))] to-transparent opacity-30 animate-spin origin-left"
                     style={{ animationDuration: '8s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Network Map and Incident Severity */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Network Map Visualization */}
          <div className={`lg:col-span-2 glow-card bg-gradient-to-br from-[hsl(var(--card)/0.8)] to-[hsl(var(--card)/0.4)] backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-1000 ${
            isActivated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`} style={{ transitionDelay: '1200ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--electric-green)/0.3)] to-[hsl(var(--electric-green)/0.1)] border border-[hsl(var(--electric-green)/0.4)] flex items-center justify-center">
                <Globe className="h-4 w-4 text-[hsl(var(--electric-green))]" />
              </div>
              <h3 className="text-white font-display text-lg">Global Security Network</h3>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-white/60 text-xs uppercase tracking-wider">Live Status</span>
                <div className="h-2 w-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
              </div>
            </div>
            <div className="relative h-80 bg-gradient-to-br from-black/50 to-transparent rounded-xl border border-white/10 overflow-hidden">
              {/* Enhanced World Map Background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  <path d="M150,200 Q300,150 450,200 T750,200" stroke="hsl(var(--neon-blue))" strokeWidth="1" fill="none" opacity="0.3">
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite" />
                  </path>
                  <path d="M100,300 Q400,250 700,300" stroke="hsl(var(--cyber-purple))" strokeWidth="1" fill="none" opacity="0.3">
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite" />
                  </path>
                  <path d="M200,350 Q500,320 800,350" stroke="hsl(var(--neon-cyan))" strokeWidth="1" fill="none" opacity="0.3">
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="5s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
              
              {/* Enhanced Network Nodes */}
              {networkNodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <div className={`relative ${pulseNodes.includes(node.id) ? 'animate-ping' : ''}`}>
                    <div className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${
                      node.status === 'secure' ? 'bg-[hsl(var(--electric-green))] border-[hsl(var(--electric-green))]' :
                      node.status === 'monitoring' ? 'bg-[hsl(var(--neon-blue))] border-[hsl(var(--neon-blue))]' :
                      'bg-[hsl(var(--cyber-purple))] border-[hsl(var(--cyber-purple))]'
                    } shadow-[0_0_10px_currentColor] group-hover:shadow-[0_0_20px_currentColor] group-hover:scale-125`} />
                    {pulseNodes.includes(node.id) && (
                      <div className="absolute inset-0 h-4 w-4 rounded-full bg-current opacity-75 animate-ping" />
                    )}
                    
                    {/* Blinking status indicator */}
                    <div className={`absolute -top-1 -right-1 h-2 w-2 rounded-full ${
                      node.status === 'secure' ? 'bg-[hsl(var(--electric-green))] animate-pulse' :
                      node.status === 'monitoring' ? 'bg-[hsl(var(--neon-blue))] animate-ping' :
                      'bg-[hsl(var(--cyber-purple))] animate-bounce'
                    }`} />
                  </div>
                  
                  {/* Enhanced Tooltip */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-white/20 group-hover:scale-110">
                    <div className="text-white text-sm font-semibold">{node.region}</div>
                    <div className="text-white/70 text-xs">{node.threats} threats blocked</div>
                    <div className={`text-xs font-bold ${
                      node.status === 'secure' ? 'text-[hsl(var(--electric-green))]' :
                      node.status === 'monitoring' ? 'text-[hsl(var(--neon-blue))]' :
                      'text-[hsl(var(--cyber-purple))]'
                    }`}>
                      ● {node.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Enhanced Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--neon-blue))" stopOpacity="0" />
                    <stop offset="50%" stopColor="hsl(var(--neon-blue))" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="hsl(var(--neon-blue))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {networkNodes.map((node, index) => 
                  networkNodes.slice(index + 1).map((otherNode, otherIndex) => (
                    <line
                      key={`${node.id}-${otherNode.id}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${otherNode.x}%`}
                      y2={`${otherNode.y}%`}
                      stroke="url(#connectionGradient)"
                      strokeWidth="1"
                      opacity="0.3"
                      className="animate-pulse"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    />
                  ))
                )}
              </svg>
            </div>
          </div>

          {/* Enhanced Incident Severity Bar Chart */}
          <div className={`glow-card bg-gradient-to-br from-[hsl(var(--card)/0.8)] to-[hsl(var(--card)/0.4)] backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-1000 ${
            isActivated ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`} style={{ transitionDelay: '1400ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.3)] to-[hsl(var(--neon-cyan)/0.1)] border border-[hsl(var(--neon-cyan)/0.4)] flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-[hsl(var(--neon-cyan))]" />
              </div>
              <h3 className="text-white font-display text-lg">Incident Severity</h3>
              <div className="ml-auto">
                <div className="text-xs text-white/60 uppercase tracking-wider">Risk Level: 0.3</div>
                <div className="w-16 h-1 bg-black/50 rounded-full mt-1">
                  <div className="w-[30%] h-full bg-gradient-to-r from-[hsl(var(--electric-green))] to-[hsl(var(--neon-blue))] rounded-full" />
                </div>
              </div>
            </div>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentSeverityData} layout="horizontal" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                  <defs>
                    <filter id="barGlow">
                      <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="currentColor"/>
                    </filter>
                  </defs>
                  <XAxis 
                    type="number" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
                    domain={[0, 50]}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="severity" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }} 
                    width={65}
                  />
                  <Bar 
                    dataKey="count" 
                    radius={[0, 6, 6, 0]} 
                    animationBegin={1400} 
                    animationDuration={1500}
                    filter="url(#barGlow)"
                  >
                    {incidentSeverityData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={entry.color}
                        strokeWidth={1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              {/* Animated risk level indicator */}
              <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-lg p-2">
                <div className="text-xs text-white/80 font-mono mb-1">TOTAL INCIDENTS</div>
                <div className="text-lg font-display text-white">
                  <AnimatedCounter value={88} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};