import React, { useState, useEffect, useRef } from 'react';
import { useBeepSound } from "@/hooks/useBeepSound";
import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
  Legend
} from 'recharts';
import { AlertTriangle, Shield, Zap, Activity, TrendingUp, BarChart3, PieChart as PieChartIcon, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const IncidentSeverityChart = () => {
  const [animatedData, setAnimatedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Use beep sound hook - only play when section is in view with 2 second interval
  useBeepSound(isInView, 2000);

  // Enterprise-grade severity data with proper color coding
  const severityData = [
    {
      severity: 'Critical',
      count: 23,
      resolved: 18,
      pending: 5,
      color: 'hsl(0 84% 60%)', // Red for critical
      bgColor: 'hsl(0 84% 60% / 0.1)',
      borderColor: 'hsl(0 84% 60% / 0.3)',
      glowColor: 'hsl(0 84% 60% / 0.4)',
      description: 'Immediate action required',
      icon: AlertTriangle
    },
    {
      severity: 'High',
      count: 47,
      resolved: 35,
      pending: 12,
      color: 'hsl(25 95% 53%)', // Orange for high
      bgColor: 'hsl(25 95% 53% / 0.1)',
      borderColor: 'hsl(25 95% 53% / 0.3)',
      glowColor: 'hsl(25 95% 53% / 0.4)',
      description: 'Priority response needed',
      icon: Zap
    },
    {
      severity: 'Medium',
      count: 89,
      resolved: 72,
      pending: 17,
      color: 'hsl(45 93% 47%)', // Yellow for medium
      bgColor: 'hsl(45 93% 47% / 0.1)',
      borderColor: 'hsl(45 93% 47% / 0.3)',
      glowColor: 'hsl(45 93% 47% / 0.4)',
      description: 'Standard monitoring',
      icon: Activity
    },
    {
      severity: 'Low',
      count: 156,
      resolved: 142,
      pending: 14,
      color: 'hsl(142 76% 36%)', // Green for low
      bgColor: 'hsl(142 76% 36% / 0.1)',
      borderColor: 'hsl(142 76% 36% / 0.3)',
      glowColor: 'hsl(142 76% 36% / 0.4)',
      description: 'Routine maintenance',
      icon: Shield
    }
  ];

  // Time series data for trend analysis
  const trendData = [
    { time: '00:00', critical: 12, high: 28, medium: 45, low: 89 },
    { time: '04:00', critical: 15, high: 32, medium: 52, low: 94 },
    { time: '08:00', critical: 23, high: 47, medium: 67, low: 121 },
    { time: '12:00', critical: 19, high: 41, medium: 89, low: 156 },
    { time: '16:00', critical: 21, high: 44, medium: 78, low: 134 },
    { time: '20:00', critical: 18, high: 39, medium: 71, low: 127 },
    { time: '23:59', critical: 23, high: 47, medium: 89, low: 156 }
  ];

  // Animate data on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(severityData);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for beep sound
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-lg border border-border/50 p-4 rounded-lg shadow-2xl ring-1 ring-primary/20">
          <p className="text-foreground font-semibold mb-3 text-sm tracking-wide">{label}</p>
          <div className="space-y-2">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground capitalize">
                    {entry.dataKey}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {entry.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Enhanced metric calculations
  const totalIncidents = severityData.reduce((sum, item) => sum + item.count, 0);
  const totalResolved = severityData.reduce((sum, item) => sum + item.resolved, 0);
  const overallResolutionRate = Math.round((totalResolved / totalIncidents) * 100);
  const avgResponseTime = "4.2 min";
  const activeThreats = totalIncidents - totalResolved;

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Enhanced beep indicator */}
      {isInView && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-primary">ACTIVE SOC</span>
        </div>
      )}
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div data-reveal className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-6">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary tracking-wide">ENTERPRISE SOC</span>
          </div>
          
          <h2 
            data-reveal 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 text-glow bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            Incident Severity Dashboard
          </h2>
          
          <p 
            data-reveal 
            className="text-muted-foreground text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8"
          >
            Advanced threat intelligence and incident response orchestration platform
          </p>

          {/* Key Metrics Overview */}
          <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
            <div className="group glow-card p-4 sm:p-6 rounded-xl text-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.4)] hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue)/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-primary/20 rounded-lg group-hover:bg-[hsl(var(--neon-blue)/0.3)] group-hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.5)] transition-all duration-300 group-hover:scale-110">
                  <AlertCircle className="h-6 w-6 text-primary group-hover:text-[hsl(var(--neon-blue))] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--neon-blue))]" />
                </div>
                <div className="text-2xl sm:text-3xl font-display text-glow mb-1 group-hover:scale-110 transition-transform duration-300">{totalIncidents}</div>
                <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Total Incidents</div>
              </div>
            </div>
            
            <div className="group glow-card p-4 sm:p-6 rounded-xl text-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--electric-green)/0.4)] hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--electric-green)/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-primary/20 rounded-lg group-hover:bg-[hsl(var(--electric-green)/0.3)] group-hover:shadow-[0_0_20px_hsl(var(--electric-green)/0.5)] transition-all duration-300 group-hover:scale-110">
                  <CheckCircle className="h-6 w-6 text-primary group-hover:text-[hsl(var(--electric-green))] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--electric-green))]" />
                </div>
                <div className="text-2xl sm:text-3xl font-display text-glow mb-1 group-hover:scale-110 transition-transform duration-300">{overallResolutionRate}%</div>
                <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Resolution Rate</div>
              </div>
            </div>
            
            <div className="group glow-card p-4 sm:p-6 rounded-xl text-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--cyber-purple)/0.4)] hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--cyber-purple)/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-primary/20 rounded-lg group-hover:bg-[hsl(var(--cyber-purple)/0.3)] group-hover:shadow-[0_0_20px_hsl(var(--cyber-purple)/0.5)] transition-all duration-300 group-hover:scale-110">
                  <Clock className="h-6 w-6 text-primary group-hover:text-[hsl(var(--cyber-purple))] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--cyber-purple))]" />
                </div>
                <div className="text-2xl sm:text-3xl font-display text-glow mb-1 group-hover:scale-110 transition-transform duration-300">{avgResponseTime}</div>
                <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Avg Response</div>
              </div>
            </div>
            
            <div className="group glow-card p-4 sm:p-6 rounded-xl text-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--neon-cyan)/0.4)] hover:-translate-y-2 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-cyan)/0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-primary/20 rounded-lg group-hover:bg-[hsl(var(--neon-cyan)/0.3)] group-hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.5)] transition-all duration-300 group-hover:scale-110">
                  <Users className="h-6 w-6 text-primary group-hover:text-[hsl(var(--neon-cyan))] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_hsl(var(--neon-cyan))]" />
                </div>
                <div className="text-2xl sm:text-3xl font-display text-glow mb-1 group-hover:scale-110 transition-transform duration-300">{activeThreats}</div>
                <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Active Threats</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs with shadcn/ui */}
        <div data-reveal className="max-w-7xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 sm:mb-12 h-12 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Trends</span>
              </TabsTrigger>
              <TabsTrigger value="distribution" className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <PieChartIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Distribution</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {/* Enterprise-Grade Incident Severity Cards */}
                {severityData.map((item, index) => {
                  const Icon = item.icon;
                  const resolutionRate = Math.round((item.resolved / item.count) * 100);
                  const circumference = 2 * Math.PI * 16; // Smaller circle for cleaner look
                  const strokeDashoffset = circumference - (resolutionRate / 100) * circumference;
                  
                  return (
                    <div
                      key={item.severity}
                      className="group relative bg-card/40 backdrop-blur-xl rounded-2xl border border-border/30 hover:border-border/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer overflow-hidden h-[280px]"
                      style={{
                        boxShadow: `0 4px 20px -4px ${item.glowColor}, 0 0 0 1px ${item.borderColor}`,
                      }}
                    >
                      {/* Subtle gradient overlay */}
                      <div 
                        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                        style={{
                          background: `linear-gradient(135deg, ${item.bgColor} 0%, transparent 70%)`
                        }}
                      />
                      
                      {/* Content Container */}
                      <div className="relative h-full p-6 flex flex-col">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            {/* Minimalistic Icon */}
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                              style={{
                                backgroundColor: item.bgColor,
                                border: `1px solid ${item.borderColor}`,
                              }}
                            >
                              <Icon 
                                className="w-6 h-6 transition-colors duration-300" 
                                style={{ color: item.color }}
                              />
                            </div>
                            
                            {/* Hierarchical Typography */}
                            <div>
                              <h3 
                                className="text-xl font-display font-bold tracking-tight mb-1 transition-colors duration-300"
                                style={{ color: item.color }}
                              >
                                {item.severity}
                              </h3>
                              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          
                          {/* Live Status Indicator */}
                          <div className="flex flex-col items-end gap-1">
                            <div 
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[10px] font-mono text-muted-foreground/70 uppercase">
                              LIVE
                            </span>
                          </div>
                        </div>

                        {/* Main Metric Display */}
                        <div className="flex-1 flex flex-col justify-center mb-6">
                          <div className="text-center">
                            <div 
                              className="text-4xl font-display font-black mb-2 transition-all duration-500 group-hover:scale-105"
                              style={{ 
                                color: item.color,
                                textShadow: `0 0 15px ${item.color}30`
                              }}
                            >
                              {item.count}
                            </div>
                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                              Total Incidents
                            </p>
                          </div>
                        </div>

                        {/* Status Breakdown */}
                        <div className="flex items-center justify-between text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-green-400 font-semibold">{item.resolved}</span>
                            <span className="text-muted-foreground/80">resolved</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="text-amber-400 font-semibold">{item.pending}</span>
                            <span className="text-muted-foreground/80">pending</span>
                          </div>
                        </div>

                        {/* Bottom Section - Resolution Progress */}
                        <div className="flex items-center justify-between">
                          {/* Compact Progress Ring */}
                          <div className="relative">
                            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
                              <circle
                                cx="20"
                                cy="20"
                                r="16"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="transparent"
                                className="text-muted/30"
                              />
                              <circle
                                cx="20"
                                cy="20"
                                r="16"
                                stroke={item.color}
                                strokeWidth="3"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                                style={{
                                  filter: `drop-shadow(0 0 4px ${item.color}40)`
                                }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span 
                                className="text-xs font-bold"
                                style={{ color: item.color }}
                              >
                                {resolutionRate}%
                              </span>
                            </div>
                          </div>
                          
                          {/* Resolution Status */}
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                              Resolution Rate
                            </p>
                            <div className="flex items-center gap-1">
                              {resolutionRate >= 85 ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : resolutionRate >= 70 ? (
                                <Clock className="w-4 h-4 text-amber-500" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                              )}
                              <span 
                                className="text-sm font-semibold"
                                style={{ color: item.color }}
                              >
                                {resolutionRate >= 85 ? 'Excellent' : resolutionRate >= 70 ? 'Good' : 'Needs Attention'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Hover Enhancement Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                        
                        {/* Scanning Line Effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-60 transition-all duration-300 animate-pulse" 
                             style={{ color: item.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Status Overview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Real-time Activity Feed */}
                <Card className="glow-card border-0 bg-card/30 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display text-glow flex items-center gap-3">
                      <Activity className="h-6 w-6 text-primary animate-pulse" />
                      Live Activity Stream
                    </CardTitle>
                    <CardDescription>
                      Real-time incident updates and system responses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { type: 'resolved', severity: 'Critical', time: '2s ago', color: 'hsl(var(--electric-green))' },
                      { type: 'detected', severity: 'High', time: '15s ago', color: 'hsl(var(--neon-blue))' },
                      { type: 'escalated', severity: 'Medium', time: '1m ago', color: 'hsl(var(--cyber-purple))' },
                      { type: 'investigating', severity: 'Low', time: '3m ago', color: 'hsl(var(--neon-cyan))' },
                    ].map((activity, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg bg-card/50 hover:bg-card/70 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
                      >
                        <div 
                          className="h-3 w-3 rounded-full animate-pulse"
                          style={{ backgroundColor: activity.color }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-foreground capitalize">
                              {activity.type}
                            </span>
                            <span 
                              className="text-xs px-2 py-1 rounded-full font-medium"
                              style={{ 
                                backgroundColor: `${activity.color}20`,
                                color: activity.color,
                                border: `1px solid ${activity.color}30`
                              }}
                            >
                              {activity.severity}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Incident {activity.type} - automated response triggered
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card className="glow-card border-0 bg-card/30 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display text-glow flex items-center gap-3">
                      <TrendingUp className="h-6 w-6 text-primary" />
                      System Performance
                    </CardTitle>
                    <CardDescription>
                      Key operational metrics and system health indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { label: 'Response Time', value: '2.4s', change: '-12%', good: true },
                        { label: 'Detection Rate', value: '99.7%', change: '+0.3%', good: true },
                        { label: 'False Positives', value: '0.8%', change: '-45%', good: true },
                        { label: 'System Load', value: '67%', change: '+5%', good: false },
                      ].map((metric, index) => (
                        <div 
                          key={index}
                          className="p-4 rounded-xl bg-gradient-to-br from-card/50 to-card/20 border border-border/30 hover:border-primary/30 transition-all duration-500 hover:scale-105 cursor-pointer group"
                        >
                          <div className="mb-2">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">
                              {metric.label}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-display font-bold text-glow">
                              {metric.value}
                            </span>
                            <div className="flex items-center gap-1">
                              {metric.good ? (
                                <TrendingUp className="h-4 w-4 text-[hsl(var(--electric-green))]" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-[hsl(var(--destructive))]" />
                              )}
                              <span 
                                className={`text-sm font-semibold ${
                                  metric.good ? 'text-[hsl(var(--electric-green))]' : 'text-[hsl(var(--destructive))]'
                                }`}
                              >
                                {metric.change}
                              </span>
                            </div>
                          </div>
                          
                          {/* Progress indicator */}
                          <div className="mt-3 h-1 bg-muted/30 rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all duration-1000 ease-out rounded-full"
                              style={{
                                width: `${parseFloat(metric.value)}%`,
                                backgroundColor: metric.good ? 'hsl(var(--electric-green))' : 'hsl(var(--destructive))',
                                boxShadow: `0 0 8px ${metric.good ? 'hsl(var(--electric-green))' : 'hsl(var(--destructive))'}40`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="mt-0">
              <Card className="glow-card border-0 bg-card/50 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-display text-glow flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    24-Hour Incident Trends
                  </CardTitle>
                  <CardDescription>
                    Continuous monitoring of incident patterns and threat evolution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={450}>
                    <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                      <defs>
                        <linearGradient id="criticalTrendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={0.9}/>
                          <stop offset="50%" stopColor="hsl(0 84% 60%)" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="highTrendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.9}/>
                          <stop offset="50%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="hsl(var(--neon-blue))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="mediumTrendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--cyber-purple))" stopOpacity={0.9}/>
                          <stop offset="50%" stopColor="hsl(var(--cyber-purple))" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="hsl(var(--cyber-purple))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="lowTrendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--electric-green))" stopOpacity={0.9}/>
                          <stop offset="50%" stopColor="hsl(var(--electric-green))" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="hsl(var(--electric-green))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="time" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13 }}
                        stroke="hsl(var(--border))"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13 }}
                        stroke="hsl(var(--border))"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend 
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="rect"
                      />
                      <Area
                        type="monotone"
                        dataKey="critical"
                        stackId="1"
                        stroke="hsl(0 84% 60%)"
                        strokeWidth={2}
                        fill="url(#criticalTrendGradient)"
                        animationDuration={1500}
                        name="Critical"
                      />
                      <Area
                        type="monotone"
                        dataKey="high"
                        stackId="1"
                        stroke="hsl(var(--neon-blue))"
                        strokeWidth={2}
                        fill="url(#highTrendGradient)"
                        animationDuration={1700}
                        name="High"
                      />
                      <Area
                        type="monotone"
                        dataKey="medium"
                        stackId="1"
                        stroke="hsl(var(--cyber-purple))"
                        strokeWidth={2}
                        fill="url(#mediumTrendGradient)"
                        animationDuration={1900}
                        name="Medium"
                      />
                      <Area
                        type="monotone"
                        dataKey="low"
                        stackId="1"
                        stroke="hsl(var(--electric-green))"
                        strokeWidth={2}
                        fill="url(#lowTrendGradient)"
                        animationDuration={2100}
                        name="Low"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="distribution" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <Card className="glow-card border-0 bg-card/50 backdrop-blur-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display text-glow flex items-center gap-3">
                      <PieChartIcon className="h-6 w-6 text-primary" />
                      Severity Distribution
                    </CardTitle>
                    <CardDescription>
                      Proportional analysis of incident severity levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <defs>
                          {severityData.map((item, index) => (
                            <linearGradient key={`gradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor={item.color} stopOpacity={1}/>
                              <stop offset="100%" stopColor={item.color} stopOpacity={0.8}/>
                            </linearGradient>
                          ))}
                        </defs>
                        <Pie
                          data={severityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={140}
                          paddingAngle={3}
                          dataKey="count"
                          animationDuration={1200}
                        >
                          {severityData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={`url(#pieGradient-${index})`}
                              stroke={entry.color}
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend 
                          verticalAlign="bottom" 
                          height={40}
                          iconType="rect"
                          wrapperStyle={{ paddingTop: '20px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="glow-card border-0 bg-card/50 backdrop-blur-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display text-glow flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-primary" />
                      Resolution Metrics
                    </CardTitle>
                    <CardDescription>
                      Performance indicators and resolution efficiency
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {severityData.map((item, index) => {
                      const resolutionRate = Math.round((item.resolved / item.count) * 100);
                      return (
                        <div key={item.severity} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="font-medium" style={{ color: item.color }}>
                                {item.severity}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold" style={{ color: item.color }}>
                                {resolutionRate}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.resolved}/{item.count}
                              </div>
                            </div>
                          </div>
                          <div className="h-4 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
                            <div 
                              className="h-full transition-all duration-1500 ease-out rounded-full relative overflow-hidden"
                              style={{ 
                                width: `${resolutionRate}%`,
                                backgroundColor: item.color,
                                boxShadow: `0 0 12px ${item.color}40`,
                                background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`
                              }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default IncidentSeverityChart;