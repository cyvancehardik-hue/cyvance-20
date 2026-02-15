import { Brain, Globe, Shield, Users } from "lucide-react";
import { useRef, useEffect } from "react";

const features = [
  {
    icon: Brain,
    title: "AI Defense",
    subtitle: "Neural Threat Detection",
    description: "Advanced machine learning algorithms identify and neutralize threats in real-time, adapting to new attack vectors with military precision.",
    color: "neon-blue",
    animation: "spin-slow"
  },
  {
    icon: Globe,
    title: "Global Intelligence",
    subtitle: "Worldwide Threat Network",
    description: "Access to the world's largest threat intelligence network, providing instant awareness of emerging global cybersecurity risks.",
    color: "neon-cyan",
    animation: "pulse-glow"
  },
  {
    icon: Shield,
    title: "Zero-Trust Architecture",
    subtitle: "Never Trust, Always Verify",
    description: "Industry-leading zero-trust security model that assumes no inherent trust and verifies every transaction and access request.",
    color: "cyber-purple",
    animation: "shield-pulse"
  },
  {
    icon: Users,
    title: "Elite SOC Team",
    subtitle: "Military-Grade Specialists",
    description: "24/7 monitoring by former military cybersecurity experts and elite threat hunters with decades of combined experience.",
    color: "electric-green",
    animation: "team-glow"
  }
];

export const FeatureHighlights = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating data packets
    const createDataPackets = () => {
      for (let i = 0; i < 20; i++) {
        const packet = document.createElement('div');
        packet.className = 'absolute w-2 h-2 bg-gradient-to-r from-[hsl(var(--neon-blue)/0.8)] to-[hsl(var(--cyber-purple)/0.6)] rounded-sm opacity-60 pointer-events-none';
        packet.style.left = `${Math.random() * 100}%`;
        packet.style.top = `${Math.random() * 100}%`;
        packet.style.animationDelay = `${Math.random() * 5}s`;
        packet.style.animation = `float-packet ${8 + Math.random() * 4}s linear infinite`;
        container.appendChild(packet);
      }
    };

    createDataPackets();

    return () => {
      // Cleanup packets
      const packets = container.querySelectorAll('.absolute.w-2.h-2');
      packets.forEach(packet => packet.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-glow">
          Elite Cybersecurity Arsenal
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Four pillars of unbreakable digital fortress protection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard 
            key={feature.title} 
            feature={feature} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      card.style.transform = 'scale(1.02) rotateY(5deg)';
      card.style.boxShadow = `0 20px 60px -10px hsl(var(--${feature.color})/0.4)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'scale(1) rotateY(0deg)';
      card.style.boxShadow = '';
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [feature.color]);

  return (
    <div
      ref={cardRef}
      className="hero-card rounded-2xl p-8 relative overflow-hidden group transition-all duration-500 transform-gpu"
      style={{ 
        animationDelay: `${index * 200}ms`,
        perspective: '1000px'
      }}
    >
      {/* Holographic Border Effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[hsl(var(--${feature.color})/0.1)] via-transparent to-[hsl(var(--${feature.color})/0.1)] pointer-events-none`} />
      
      {/* 3D Icon Container */}
      <div className="relative mb-6">
        <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[hsl(var(--${feature.color})/0.2)] to-[hsl(var(--${feature.color})/0.05)] border border-[hsl(var(--${feature.color})/0.3)] backdrop-blur-sm group-hover:scale-110 transition-all duration-500 ${getIconAnimation(feature.animation)}`}>
          <feature.icon className={`w-10 h-10 text-[hsl(var(--${feature.color}))] drop-shadow-[0_0_10px_hsl(var(--${feature.color}))]`} />
          
          {/* Pulsing Ring Effect */}
          <div className={`absolute inset-0 rounded-2xl border-2 border-[hsl(var(--${feature.color})/0.5)] animate-ping opacity-20 group-hover:opacity-40`} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-display font-bold mb-2 text-glow">
          {feature.title}
        </h3>
        <p className={`text-[hsl(var(--${feature.color}))] font-medium mb-4 text-sm uppercase tracking-wider`}>
          {feature.subtitle}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Interactive Elements */}
      <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
        <div className={`w-3 h-3 rounded-full bg-[hsl(var(--${feature.color}))] animate-pulse`} />
      </div>

      {/* Scanning Line Effect */}
      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--${feature.color}))] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500`} />
      
      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <defs>
          <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={`hsl(var(--${feature.color}))`} stopOpacity="0.6" />
            <stop offset="100%" stopColor={`hsl(var(--${feature.color}))`} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={`M20,20 Q${100 + index * 20},${80 + index * 10} ${200 + index * 30},${150 + index * 20}`}
          stroke={`url(#gradient-${index})`}
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

const getIconAnimation = (animation: string) => {
  switch (animation) {
    case 'spin-slow':
      return 'group-hover:animate-spin';
    case 'pulse-glow':
      return 'group-hover:animate-pulse';
    case 'shield-pulse':
      return 'group-hover:animate-bounce';
    case 'team-glow':
      return 'group-hover:animate-pulse';
    default:
      return '';
  }
};