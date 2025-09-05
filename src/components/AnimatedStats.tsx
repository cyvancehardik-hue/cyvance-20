import { useEffect, useRef, useState } from "react";
import { Shield, Zap, Globe, Users, TrendingUp, Lock } from "lucide-react";

const statsData = [
  {
    value: 99,
    suffix: "%",
    label: "Threat Detection Rate",
    icon: Shield,
    color: "neon-blue",
    description: "Industry-leading accuracy"
  },
  {
    value: 2.5,
    suffix: "B+",
    label: "Events Daily",
    icon: TrendingUp,
    color: "cyber-purple",
    description: "Real-time processing"
  },
  {
    value: 60,
    suffix: "s",
    prefix: "<",
    label: "Response Time",
    icon: Zap,
    color: "neon-cyan",
    description: "Lightning-fast mitigation"
  },
  {
    value: 150,
    suffix: "+",
    label: "Countries Protected",
    icon: Globe,
    color: "electric-green",
    description: "Global threat intelligence"
  },
  {
    value: 247,
    suffix: "/7",
    label: "Elite SOC Monitoring",
    icon: Users,
    color: "neon-blue",
    description: "Military-grade expertise"
  },
  {
    value: 100,
    suffix: "%",
    label: "Zero-Trust Architecture",
    icon: Lock,
    color: "cyber-purple",
    description: "Never trust, always verify"
  }
];

export const AnimatedStats = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {statsData.map((stat, index) => (
        <StatCard 
          key={stat.label} 
          stat={stat} 
          index={index} 
          animate={inView} 
        />
      ))}
    </div>
  );
};

interface StatCardProps {
  stat: typeof statsData[0];
  index: number;
  animate: boolean;
}

const StatCard = ({ stat, index, animate }: StatCardProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;

    const duration = 2000 + (index * 200); // Stagger animations
    const steps = 60;
    const increment = stat.value / steps;
    const progressIncrement = 100 / steps;
    let current = 0;
    let currentProgress = 0;

    const timer = setInterval(() => {
      current += increment;
      currentProgress += progressIncrement;
      
      if (current >= stat.value) {
        current = stat.value;
        currentProgress = 100;
        clearInterval(timer);
        
        // Particle explosion effect
        if (cardRef.current) {
          createParticleExplosion(cardRef.current);
        }
      }
      
      setCurrentValue(current);
      setProgress(currentProgress);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [animate, stat.value, index]);

  const createParticleExplosion = (element: HTMLElement) => {
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.className = `absolute w-2 h-2 bg-[hsl(var(--${stat.color}))] rounded-full pointer-events-none`;
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.animation = `particle-explode 0.8s ease-out forwards`;
      particle.style.setProperty('--angle', `${(360 / 12) * i}deg`);
      element.appendChild(particle);
      
      setTimeout(() => particle.remove(), 800);
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative group"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Enhanced Holographic Glass Panel */}
      <div className="relative rounded-3xl p-8 text-center overflow-hidden group-hover:scale-[1.02] transform-gpu transition-all duration-700 bg-gradient-to-br from-[hsl(var(--card)/0.15)] via-[hsl(var(--card)/0.08)] to-transparent border border-[hsl(var(--border)/0.2)] backdrop-blur-xl">
        
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute inset-0 bg-gradient-to-br from-[hsl(var(--${stat.color})/0.05)] via-transparent to-[hsl(var(--${stat.color})/0.02)]`} />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <defs>
              <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill={`hsl(var(--${stat.color}))`} fillOpacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pattern-${index})`} />
          </svg>
        </div>

        {/* Enhanced Circular Progress with Dual Ring */}
        <div className="relative w-36 h-36 mx-auto mb-8">
          {/* Outer Glow Ring */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-[hsl(var(--${stat.color})/0.2)] to-[hsl(var(--${stat.color})/0.1)] blur-sm animate-pulse`} />
          
          {/* Background Circles */}
          <div className="absolute inset-2 rounded-full border-2 border-[hsl(var(--border)/0.2)]" />
          <div className="absolute inset-4 rounded-full border border-[hsl(var(--border)/0.1)]" />
          
          {/* Animated Progress Circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
            <circle
              cx="72"
              cy="72"
              r="66"
              fill="none"
              stroke={`hsl(var(--${stat.color}))`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 66}`}
              strokeDashoffset={`${2 * Math.PI * 66 * (1 - progress / 100)}`}
              className="transition-all duration-1500 ease-out"
              style={{
                filter: `drop-shadow(0 0 12px hsl(var(--${stat.color})/0.6))`
              }}
            />
            {/* Inner accent circle */}
            <circle
              cx="72"
              cy="72"
              r="50"
              fill="none"
              stroke={`hsl(var(--${stat.color}))`}
              strokeWidth="1"
              strokeOpacity="0.3"
              strokeDasharray="4 8"
              className="animate-spin"
              style={{ animationDuration: '8s' }}
            />
          </svg>
          
          {/* Enhanced Icon Container */}
          <div className={`absolute inset-0 flex items-center justify-center`}>
            <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--${stat.color})/0.25)] via-[hsl(var(--${stat.color})/0.15)] to-[hsl(var(--${stat.color})/0.05)] border border-[hsl(var(--${stat.color})/0.4)] backdrop-blur-sm group-hover:scale-110 transition-all duration-500 flex items-center justify-center`}>
              <stat.icon className={`w-8 h-8 text-[hsl(var(--${stat.color}))] drop-shadow-[0_0_8px_hsl(var(--${stat.color})/0.8)]`} />
              
              {/* Pulsing Rings */}
              <div className={`absolute inset-0 rounded-2xl border border-[hsl(var(--${stat.color})/0.6)] animate-ping opacity-20`} />
              <div className={`absolute inset-0 rounded-2xl border border-[hsl(var(--${stat.color})/0.4)] animate-ping opacity-30`} style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* Enhanced Value Display */}
        <div className="relative z-10 mb-6">
          <div className={`text-5xl font-display font-black mb-3 bg-gradient-to-br from-[hsl(var(--${stat.color}))] via-[hsl(var(--foreground))] to-[hsl(var(--${stat.color}))] bg-clip-text text-transparent`}
               style={{ textShadow: `0 0 30px hsl(var(--${stat.color})/0.5)` }}>
            {stat.prefix}
            {stat.value < 10 ? currentValue.toFixed(1) : Math.floor(currentValue)}
            {stat.suffix}
          </div>
          
          <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-glow transition-all duration-300">
            {stat.label}
          </h3>
          
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            {stat.description}
          </p>
        </div>

        {/* Status Indicator */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-[hsl(var(--${stat.color}))] animate-pulse`} />
          <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">LIVE</div>
        </div>

        {/* Enhanced Hover Glow */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[hsl(var(--${stat.color})/0.1)] via-transparent to-[hsl(var(--${stat.color})/0.05)] pointer-events-none`} />
        
        {/* Scanning Line Effect */}
        <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--${stat.color}))] to-transparent opacity-0 group-hover:opacity-80 group-hover:animate-pulse transition-opacity duration-500`} />
        
        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-1.5 bg-gradient-to-r from-[hsl(var(--${stat.color}))] to-[hsl(var(--${stat.color})/0.5)] rounded-full opacity-40`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animation: `float ${3 + Math.random() * 3}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>

        {/* Corner Accent Lines */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[hsl(var(--${stat.color})/0.5)] rounded-tl-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[hsl(var(--${stat.color})/0.5)] rounded-br-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
      </div>
      
      {/* External Glow Effect */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-[hsl(var(--${stat.color})/0.1)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-xl pointer-events-none -z-10`} />
    </div>
  );
};