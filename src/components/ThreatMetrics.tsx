import { Shield, Zap, Eye, Lock } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

const metrics = [
  {
    icon: Shield,
    value: 99.7,
    suffix: "%",
    label: "Threat Detection Rate",
    color: "neon-blue"
  },
  {
    icon: Zap,
    value: 18,
    suffix: "ms",
    label: "Average Response Time",
    color: "electric-green"
  },
  {
    icon: Eye,
    value: 247,
    suffix: "/7",
    label: "Active Monitoring",
    color: "cyber-purple"
  },
  {
    icon: Lock,
    value: 15,
    suffix: "M+",
    label: "Endpoints Protected",
    color: "neon-cyan"
  }
];

export const ThreatMetrics = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div 
          key={metric.label}
          data-reveal
          className="hero-card rounded-xl p-6 text-center group hover:scale-105 transition-all duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`h-12 w-12 mx-auto mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br from-[hsl(var(--${metric.color})/0.2)] to-[hsl(var(--${metric.color})/0.05)] border border-[hsl(var(--${metric.color})/0.3)] group-hover:shadow-[0_0_20px_hsl(var(--${metric.color})/0.3)] transition-all duration-300`}>
            <metric.icon className={`h-6 w-6 text-[hsl(var(--${metric.color}))]`} />
          </div>
          <div className="text-2xl font-display text-glow mb-1">
            <AnimatedCounter value={metric.value} />
            {metric.suffix}
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {metric.label}
          </p>
        </div>
      ))}
    </div>
  );
};