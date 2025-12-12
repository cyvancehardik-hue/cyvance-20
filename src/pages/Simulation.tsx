import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StickyHeader } from "@/components/StickyHeader";
import { useNavigate } from "react-router-dom";
import { useSimulationFeedback } from "@/hooks/useSimulationFeedback";
import {
  Shield, Swords, ArrowRight, Zap, Target, Lock, Eye, Brain,
  AlertTriangle, Server, Cloud, User, Key, Mail, Network, Activity,
  CheckCircle, XCircle, Clock, Terminal, ChevronRight, Bug, Skull,
  PackageSearch, Fingerprint, Globe, Radiation, Volume2, VolumeX,
  Play, RotateCcw, Hexagon, Radio, Cpu, Database, Wifi, CircuitBoard,
  Crosshair, Scan, ShieldAlert, ShieldCheck, AlertOctagon
} from "lucide-react";

// Scenario data
const scenarios = [
  {
    id: "phishing",
    name: "Phishing Breach",
    icon: Mail,
    description: "Social engineering attack targeting employee credentials",
    severity: "High",
    category: "Social Engineering",
    attackSteps: [
      { step: "Reconnaissance", detail: "Gathering employee data from LinkedIn" },
      { step: "Payload Creation", detail: "Crafting convincing phishing email" },
      { step: "Delivery", detail: "Sending email with malicious link" },
      { step: "Credential Harvest", detail: "Capturing login credentials" },
      { step: "Lateral Movement", detail: "Accessing internal systems" },
    ],
    defenseSteps: [
      { step: "Email Filtering", detail: "AI-powered email analysis", module: "Email Gateway" },
      { step: "URL Sandboxing", detail: "Real-time link inspection", module: "Threat Intel" },
      { step: "MFA Challenge", detail: "Multi-factor authentication trigger", module: "Identity Manager" },
      { step: "Behavioral Alert", detail: "Anomaly detection triggered", module: "UEBA" },
      { step: "Account Lockdown", detail: "Automated response initiated", module: "SOAR" },
    ],
  },
  {
    id: "ransomware",
    name: "Ransomware Deployment",
    icon: Lock,
    description: "Advanced ransomware attack with lateral movement",
    severity: "Critical",
    category: "Malware",
    attackSteps: [
      { step: "Initial Access", detail: "Exploiting vulnerable RDP service" },
      { step: "Persistence", detail: "Installing backdoor malware" },
      { step: "Discovery", detail: "Mapping network and assets" },
      { step: "Encryption", detail: "Encrypting critical files" },
      { step: "Ransom Note", detail: "Demanding cryptocurrency payment" },
    ],
    defenseSteps: [
      { step: "Port Scanning Detection", detail: "Identifying RDP probe attempts", module: "NDR" },
      { step: "Endpoint Protection", detail: "Blocking malicious process", module: "EDR" },
      { step: "Network Segmentation", detail: "Isolating infected segment", module: "Firewall" },
      { step: "Backup Activation", detail: "Initiating recovery protocols", module: "Backup System" },
      { step: "Threat Hunting", detail: "SOC team investigation", module: "24/7 SOC" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud Misconfiguration",
    icon: Cloud,
    description: "Exploiting exposed S3 bucket with sensitive data",
    severity: "High",
    category: "Cloud Security",
    attackSteps: [
      { step: "Scanning", detail: "Automated cloud asset discovery" },
      { step: "Access Check", detail: "Testing bucket permissions" },
      { step: "Data Exfil", detail: "Downloading exposed files" },
      { step: "Analysis", detail: "Extracting valuable data" },
      { step: "Exploitation", detail: "Using data for further attacks" },
    ],
    defenseSteps: [
      { step: "CSPM Alert", detail: "Configuration drift detected", module: "Cloud Security" },
      { step: "Auto-Remediation", detail: "Bucket permissions locked", module: "CSPM" },
      { step: "Access Logging", detail: "Tracking unauthorized access", module: "CloudTrail" },
      { step: "Data Classification", detail: "Identifying exposed data", module: "DLP" },
      { step: "Incident Report", detail: "Compliance notification", module: "GRC" },
    ],
  },
  {
    id: "credential",
    name: "Credential Stuffing",
    icon: Key,
    description: "Automated attack using breached credentials",
    severity: "Medium",
    category: "Identity Attack",
    attackSteps: [
      { step: "Data Acquisition", detail: "Purchasing leaked credentials" },
      { step: "Bot Setup", detail: "Configuring attack infrastructure" },
      { step: "Mass Login", detail: "Automated login attempts" },
      { step: "Account Access", detail: "Successful credential match" },
      { step: "Account Takeover", detail: "Full account compromise" },
    ],
    defenseSteps: [
      { step: "Rate Limiting", detail: "Detecting abnormal login volume", module: "WAF" },
      { step: "Bot Detection", detail: "Identifying automated traffic", module: "Bot Manager" },
      { step: "Credential Check", detail: "Comparing against breach databases", module: "Identity" },
      { step: "CAPTCHA Challenge", detail: "Human verification required", module: "Access Control" },
      { step: "Account Alert", detail: "User notification sent", module: "Notification" },
    ],
  },
  {
    id: "insider",
    name: "Insider Privilege Escalation",
    icon: User,
    description: "Malicious insider abusing access privileges",
    severity: "Critical",
    category: "Insider Threat",
    attackSteps: [
      { step: "Access Abuse", detail: "Using legitimate credentials" },
      { step: "Privilege Request", detail: "Requesting elevated access" },
      { step: "Policy Bypass", detail: "Circumventing access controls" },
      { step: "Data Access", detail: "Viewing restricted information" },
      { step: "Exfiltration", detail: "Copying sensitive data" },
    ],
    defenseSteps: [
      { step: "Access Review", detail: "Automated privilege audit", module: "IAM" },
      { step: "Behavioral Analysis", detail: "Detecting unusual patterns", module: "UEBA" },
      { step: "DLP Alert", detail: "Data movement flagged", module: "DLP" },
      { step: "Session Recording", detail: "Activity captured", module: "PAM" },
      { step: "HR Notification", detail: "Escalation to management", module: "SOAR" },
    ],
  },
  {
    id: "supply-chain",
    name: "Supply Chain Attack",
    icon: PackageSearch,
    description: "Compromising trusted third-party software dependencies",
    severity: "Critical",
    category: "Advanced Persistent",
    attackSteps: [
      { step: "Vendor Reconnaissance", detail: "Identifying weak supply chain links" },
      { step: "Dependency Injection", detail: "Injecting malicious code into trusted package" },
      { step: "Distribution", detail: "Propagating through legitimate update channels" },
      { step: "Activation", detail: "Triggering payload on target systems" },
      { step: "C2 Establishment", detail: "Establishing command & control channel" },
      { step: "Data Harvesting", detail: "Exfiltrating sensitive data at scale" },
    ],
    defenseSteps: [
      { step: "SBOM Analysis", detail: "Software Bill of Materials verification", module: "Supply Chain Security" },
      { step: "Integrity Verification", detail: "Hash and signature validation", module: "Code Signing" },
      { step: "Behavioral Sandbox", detail: "Testing updates in isolated environment", module: "Sandbox" },
      { step: "Network Anomaly Detection", detail: "Identifying unusual C2 traffic", module: "NDR" },
      { step: "Zero Trust Enforcement", detail: "Blocking unauthorized lateral movement", module: "Zero Trust" },
      { step: "Threat Intelligence", detail: "Cross-referencing with global threat feeds", module: "Threat Intel" },
    ],
  },
  {
    id: "zero-day",
    name: "Zero-Day Exploit",
    icon: Bug,
    description: "Exploiting unknown vulnerability before patch availability",
    severity: "Critical",
    category: "Advanced Exploit",
    attackSteps: [
      { step: "Vulnerability Discovery", detail: "Identifying unpatched security flaw" },
      { step: "Exploit Development", detail: "Crafting weaponized exploit code" },
      { step: "Initial Compromise", detail: "Gaining foothold through exploit" },
      { step: "Privilege Escalation", detail: "Elevating to system-level access" },
      { step: "Persistence Installation", detail: "Deploying rootkit for long-term access" },
      { step: "Objective Execution", detail: "Achieving attack goals undetected" },
    ],
    defenseSteps: [
      { step: "Behavioral Analysis", detail: "Detecting anomalous process behavior", module: "XDR" },
      { step: "Memory Protection", detail: "Exploit mitigation technologies active", module: "Endpoint Protection" },
      { step: "Micro-Segmentation", detail: "Limiting blast radius of compromise", module: "Network Security" },
      { step: "Threat Hunting", detail: "Proactive hunting for IOCs", module: "24/7 SOC" },
      { step: "Virtual Patching", detail: "WAF rules blocking exploit attempts", module: "WAF" },
      { step: "Forensic Analysis", detail: "Deep investigation and attribution", module: "DFIR Team" },
    ],
  },
  {
    id: "apt",
    name: "APT Campaign Simulation",
    icon: Skull,
    description: "Nation-state level advanced persistent threat operation",
    severity: "Critical",
    category: "Nation State",
    attackSteps: [
      { step: "Strategic Targeting", detail: "Long-term intelligence gathering on target" },
      { step: "Spear Phishing", detail: "Highly targeted social engineering attack" },
      { step: "Custom Malware Deployment", detail: "Deploying bespoke RAT/backdoor" },
      { step: "Living Off the Land", detail: "Using legitimate tools to avoid detection" },
      { step: "Credential Harvesting", detail: "Extracting domain admin credentials" },
      { step: "Data Staging", detail: "Preparing data for covert exfiltration" },
      { step: "Covert Exfiltration", detail: "Slow data leak via encrypted channels" },
    ],
    defenseSteps: [
      { step: "Advanced Threat Detection", detail: "AI-powered APT behavioral detection", module: "XDR Platform" },
      { step: "Deception Technology", detail: "Honeypots detecting lateral movement", module: "Deception Grid" },
      { step: "Credential Protection", detail: "Privileged access management active", module: "PAM" },
      { step: "Network Traffic Analysis", detail: "Deep packet inspection for C2", module: "NDR" },
      { step: "Threat Intelligence Correlation", detail: "Matching IOCs to known APT groups", module: "Threat Intel" },
      { step: "Incident Response", detail: "Coordinated containment and eradication", module: "IR Team" },
      { step: "Recovery & Hardening", detail: "System restoration with enhanced controls", module: "Security Ops" },
    ],
  },
];

// Advanced Cyber Background with particles and effects
const AdvancedCyberBackground = ({ isDefenseMode }: { isDefenseMode: boolean }) => {
  const particlesRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDefenseMode
            ? "radial-gradient(ellipse 120% 80% at 50% 20%, hsl(var(--neon-blue) / 0.15) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 80% 80%, hsl(var(--cyber-purple) / 0.1) 0%, transparent 50%), hsl(var(--background))"
            : "radial-gradient(ellipse 120% 80% at 50% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 20% 80%, rgba(220, 38, 38, 0.1) 0%, transparent 50%), hsl(var(--background))",
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Animated grid with perspective */}
      <div className="absolute inset-0 perspective-1000">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(${isDefenseMode ? 'hsl(var(--neon-blue) / 0.08)' : 'rgba(239, 68, 68, 0.08)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDefenseMode ? 'hsl(var(--neon-blue) / 0.08)' : 'rgba(239, 68, 68, 0.08)'} 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: "rotateX(60deg) translateY(-50%)",
            transformOrigin: "center top",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating hexagons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <Hexagon 
            className={`w-16 h-16 ${isDefenseMode ? 'text-[hsl(var(--neon-blue))]' : 'text-red-500'}`}
            strokeWidth={0.5}
          />
        </motion.div>
      ))}

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${isDefenseMode ? 'hsl(var(--neon-blue))' : 'rgb(239, 68, 68)'} 50%, transparent 100%)`,
          boxShadow: `0 0 30px ${isDefenseMode ? 'hsl(var(--neon-blue))' : 'rgb(239, 68, 68)'}`,
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Corner brackets */}
      <div className={`absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 ${isDefenseMode ? 'border-[hsl(var(--neon-blue))]' : 'border-red-500'} opacity-30`} />
      <div className={`absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 ${isDefenseMode ? 'border-[hsl(var(--neon-blue))]' : 'border-red-500'} opacity-30`} />
      <div className={`absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 ${isDefenseMode ? 'border-[hsl(var(--neon-blue))]' : 'border-red-500'} opacity-30`} />
      <div className={`absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 ${isDefenseMode ? 'border-[hsl(var(--neon-blue))]' : 'border-red-500'} opacity-30`} />

      {/* Data stream lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute w-px"
          style={{
            left: `${5 + i * 12}%`,
            height: "100%",
            background: `linear-gradient(180deg, transparent, ${isDefenseMode ? 'hsl(var(--neon-blue) / 0.3)' : 'rgba(239, 68, 68, 0.3)'}, transparent)`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

// HUD Frame Component
const HUDFrame = ({ children, title, isDefenseMode, className = "" }: { 
  children: React.ReactNode; 
  title: string; 
  isDefenseMode: boolean;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    {/* Corner decorations */}
    <div className={`absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 ${isDefenseMode ? 'border-[hsl(var(--neon-blue))]' : 'border-red-500'}`} />
    <div className={`absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 ${isDefenseMode ? 'border-[hsl(var(--neon-blue))]' : 'border-red-500'}`} />
    <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 ${isDefenseMode ? 'border-[hsl(var(--neon-blue))]' : 'border-red-500'}`} />
    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 ${isDefenseMode ? 'border-[hsl(var(--neon-blue))]' : 'border-red-500'}`} />
    
    {/* Title bar */}
    <div className={`absolute -top-3 left-6 px-3 py-0.5 text-xs font-mono tracking-wider ${
      isDefenseMode ? 'bg-[hsl(var(--neon-blue))] text-background' : 'bg-red-500 text-white'
    }`}>
      {title}
    </div>
    
    {/* Content */}
    <div className={`border ${isDefenseMode ? 'border-[hsl(var(--neon-blue))]/30' : 'border-red-500/30'} bg-background/80 backdrop-blur-xl rounded-lg overflow-hidden`}>
      {children}
    </div>
  </div>
);

// Enhanced Scenario Card
const ScenarioCard = ({ 
  scenario, 
  isSelected, 
  onClick,
  isDefenseMode 
}: { 
  scenario: typeof scenarios[0]; 
  isSelected: boolean; 
  onClick: () => void;
  isDefenseMode: boolean;
}) => (
  <motion.button
    onClick={onClick}
    className={`relative w-full p-4 text-left transition-all duration-500 group overflow-hidden ${
      isSelected 
        ? isDefenseMode
          ? "bg-[hsl(var(--neon-blue))]/10"
          : "bg-red-500/10"
        : "bg-background/50 hover:bg-muted/30"
    }`}
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Selection indicator */}
    <motion.div
      className={`absolute left-0 top-0 bottom-0 w-1 ${
        isDefenseMode ? 'bg-[hsl(var(--neon-blue))]' : 'bg-red-500'
      }`}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: isSelected ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    />
    
    {/* Hover glow */}
    <motion.div
      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isDefenseMode 
          ? 'bg-gradient-to-r from-[hsl(var(--neon-blue))]/5 to-transparent'
          : 'bg-gradient-to-r from-red-500/5 to-transparent'
      }`}
    />

    <div className="relative flex items-start gap-3">
      <motion.div 
        className={`p-2.5 rounded-lg transition-all duration-300 ${
          isSelected 
            ? isDefenseMode 
              ? "bg-[hsl(var(--neon-blue))]/20 shadow-[0_0_15px_hsl(var(--neon-blue)/0.3)]" 
              : "bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            : "bg-muted/50"
        }`}
        animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <scenario.icon className={`w-5 h-5 transition-colors duration-300 ${
          isSelected 
            ? isDefenseMode ? "text-[hsl(var(--neon-blue))]" : "text-red-400"
            : "text-muted-foreground"
        }`} />
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className={`font-semibold text-sm truncate transition-colors duration-300 ${
            isSelected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
          }`}>
            {scenario.name}
          </h4>
        </div>
        <p className="text-[11px] text-muted-foreground/70 mt-0.5 line-clamp-2">{scenario.description}</p>
        
        <div className="flex items-center gap-2 mt-2">
          <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider rounded ${
            isDefenseMode ? 'bg-[hsl(var(--neon-blue))]/10 text-[hsl(var(--neon-blue))]' : 'bg-red-500/10 text-red-400'
          }`}>
            {scenario.category}
          </span>
          <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider rounded flex items-center gap-1 ${
            scenario.severity === "Critical" ? "bg-red-500/20 text-red-400" :
            scenario.severity === "High" ? "bg-orange-500/20 text-orange-400" :
            "bg-yellow-500/20 text-yellow-400"
          }`}>
            <AlertOctagon className="w-2.5 h-2.5" />
            {scenario.severity}
          </span>
        </div>
      </div>
      
      <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
        isSelected 
          ? isDefenseMode ? "text-[hsl(var(--neon-blue))] translate-x-1" : "text-red-400 translate-x-1"
          : "text-muted-foreground/30 group-hover:text-muted-foreground"
      }`} />
    </div>
  </motion.button>
);

// Enhanced Step Visualization with progress bar
const StepVisualization = ({ 
  steps, 
  isDefenseMode, 
  currentStep 
}: { 
  steps: any[]; 
  isDefenseMode: boolean; 
  currentStep: number;
}) => {
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 ${
            isDefenseMode 
              ? 'bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))]'
              : 'bg-gradient-to-r from-red-600 to-orange-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, progress)}%` }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className={`absolute inset-y-0 ${
            isDefenseMode ? 'bg-[hsl(var(--neon-blue))]' : 'bg-red-500'
          }`}
          style={{ width: "20px", filter: "blur(8px)" }}
          animate={{ left: `${Math.max(0, progress - 5)}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: isDefenseMode ? 30 : -30 }}
            animate={{ 
              opacity: 1,
              x: 0,
            }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className={`relative transition-all duration-500 ${
              index > currentStep ? 'opacity-40' : ''
            }`}
          >
            <div className={`relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-500 ${
              index === currentStep 
                ? isDefenseMode 
                  ? "border-[hsl(var(--neon-blue))] bg-[hsl(var(--neon-blue))]/10 shadow-[0_0_30px_hsl(var(--neon-blue)/0.2),inset_0_0_30px_hsl(var(--neon-blue)/0.05)]"
                  : "border-red-500 bg-red-500/10 shadow-[0_0_30px_rgba(239,68,68,0.2),inset_0_0_30px_rgba(239,68,68,0.05)]"
                : index < currentStep
                  ? "border-[hsl(var(--electric-green))]/40 bg-[hsl(var(--electric-green))]/5"
                  : "border-border/20 bg-background/30"
            }`}>
              {/* Active step indicator line */}
              {index === currentStep && (
                <motion.div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                    isDefenseMode ? 'bg-[hsl(var(--neon-blue))]' : 'bg-red-500'
                  }`}
                  layoutId="activeStep"
                />
              )}
              
              <div className="flex items-start gap-4">
                {/* Step number/icon */}
                <div className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-mono text-sm font-bold transition-all duration-500 ${
                  index === currentStep
                    ? isDefenseMode 
                      ? "bg-[hsl(var(--neon-blue))] text-background shadow-[0_0_20px_hsl(var(--neon-blue)/0.5)]" 
                      : "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                    : index < currentStep
                      ? "bg-[hsl(var(--electric-green))] text-background"
                      : "bg-muted/50 text-muted-foreground"
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : index === currentStep ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      {isDefenseMode ? <ShieldCheck className="w-5 h-5" /> : <Crosshair className="w-5 h-5" />}
                    </motion.div>
                  ) : (
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  )}
                  
                  {/* Pulse ring for active */}
                  {index === currentStep && (
                    <motion.div
                      className={`absolute inset-0 rounded-xl ${
                        isDefenseMode ? 'border-2 border-[hsl(var(--neon-blue))]' : 'border-2 border-red-500'
                      }`}
                      animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>
                
                {/* Step content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className={`font-display text-sm tracking-wide transition-colors duration-300 ${
                      index === currentStep ? 'text-foreground' : index < currentStep ? 'text-[hsl(var(--electric-green))]' : 'text-muted-foreground'
                    }`}>
                      {step.step}
                    </h4>
                    {isDefenseMode && step.module && (
                      <motion.span 
                        className="px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-full bg-[hsl(var(--neon-blue))]/20 text-[hsl(var(--neon-blue))] border border-[hsl(var(--neon-blue))]/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {step.module}
                      </motion.span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{step.detail}</p>
                </div>
                
                {/* Status indicator */}
                <div className="flex-shrink-0">
                  {index === currentStep && (
                    <motion.div
                      className={`w-3 h-3 rounded-full ${isDefenseMode ? "bg-[hsl(var(--neon-blue))]" : "bg-red-500"}`}
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  {index < currentStep && (
                    <CheckCircle className="w-4 h-4 text-[hsl(var(--electric-green))]" />
                  )}
                </div>
              </div>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className={`absolute left-[27px] top-full h-3 w-px transition-colors duration-500 ${
                index < currentStep 
                  ? 'bg-[hsl(var(--electric-green))]' 
                  : index === currentStep
                    ? isDefenseMode ? 'bg-[hsl(var(--neon-blue))]' : 'bg-red-500'
                    : 'bg-border/30'
              }`} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Live Log Panel
const LiveLogPanel = ({ 
  logs, 
  isDefenseMode 
}: { 
  logs: { time: string; message: string; type: "info" | "warning" | "success" | "error" }[];
  isDefenseMode: boolean;
}) => (
  <div className="h-full flex flex-col">
    {/* Header */}
    <div className={`flex items-center justify-between p-4 border-b ${
      isDefenseMode ? 'border-[hsl(var(--neon-blue))]/20' : 'border-red-500/20'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          isDefenseMode ? 'bg-[hsl(var(--neon-blue))]/10' : 'bg-red-500/10'
        }`}>
          <Terminal className={`w-4 h-4 ${
            isDefenseMode ? 'text-[hsl(var(--neon-blue))]' : 'text-red-400'
          }`} />
        </div>
        <div>
          <span className="text-sm font-display tracking-wider">LIVE EVENT LOG</span>
          <div className="flex items-center gap-2 mt-0.5">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className={`w-1.5 h-1.5 rounded-full ${
                isDefenseMode ? 'bg-[hsl(var(--electric-green))]' : 'bg-red-500'
              }`}
            />
            <span className="text-[10px] text-muted-foreground font-mono">STREAMING</span>
          </div>
        </div>
      </div>
      <div className="text-[10px] font-mono text-muted-foreground">
        {logs.length} events
      </div>
    </div>
    
    {/* Logs */}
    <div className="flex-1 overflow-auto p-3 space-y-1.5 font-mono text-[11px]">
      <AnimatePresence mode="popLayout">
        {logs.map((log, index) => (
          <motion.div
            key={`${log.time}-${index}`}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-3 p-2 rounded-lg ${
              log.type === "error" ? "bg-red-500/10" :
              log.type === "warning" ? "bg-orange-500/10" :
              log.type === "success" ? "bg-[hsl(var(--electric-green))]/10" :
              "bg-muted/20"
            }`}
          >
            <span className="text-muted-foreground/60 shrink-0 tabular-nums">[{log.time}]</span>
            <span className={
              log.type === "error" ? "text-red-400" :
              log.type === "warning" ? "text-orange-400" :
              log.type === "success" ? "text-[hsl(var(--electric-green))]" :
              "text-foreground/80"
            }>
              {log.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {logs.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground/50">
          <Radio className="w-8 h-8 mb-2 opacity-30" />
          <p className="text-xs">Awaiting simulation start...</p>
        </div>
      )}
    </div>
  </div>
);

// System Stats Display
const SystemStats = ({ isDefenseMode, isRunning }: { isDefenseMode: boolean; isRunning: boolean }) => {
  const stats = [
    { label: "CPU", value: isRunning ? "87%" : "12%", icon: Cpu },
    { label: "NET", value: isRunning ? "2.4GB/s" : "120MB/s", icon: Wifi },
    { label: "MEM", value: isRunning ? "94%" : "34%", icon: Database },
    { label: "THR", value: isRunning ? "156" : "0", icon: Activity },
  ];
  
  return (
    <div className="grid grid-cols-4 gap-2 p-3 bg-muted/20 rounded-lg border border-border/30">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <stat.icon className={`w-4 h-4 mx-auto mb-1 ${
            isDefenseMode ? 'text-[hsl(var(--neon-blue))]' : 'text-red-400'
          }`} />
          <motion.div
            className="text-sm font-mono font-bold"
            key={stat.value}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            {stat.value}
          </motion.div>
          <div className="text-[9px] text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

const Simulation = () => {
  const navigate = useNavigate();
  const feedback = useSimulationFeedback();
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [isDefenseMode, setIsDefenseMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<{ time: string; message: string; type: "info" | "warning" | "success" | "error" }[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const addLog = (message: string, type: "info" | "warning" | "success" | "error") => {
    setLogs(prev => [...prev.slice(-30), { time: getCurrentTime(), message, type }]);
  };

  const startSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setLogs([]);
    addLog(`[SYSTEM] Initializing ${isDefenseMode ? "DEFENSE" : "ATTACK"} simulation...`, "info");
    addLog(`[SYSTEM] Loading scenario: ${selectedScenario.name}`, "info");
    if (soundEnabled) {
      feedback.feedbackScan();
    }
  };

  useEffect(() => {
    if (!isRunning || currentStep < 0) return;

    const steps = isDefenseMode ? selectedScenario.defenseSteps : selectedScenario.attackSteps;
    
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      const prefix = isDefenseMode ? "[DEFENSE]" : "[ATTACK]";
      addLog(`${prefix} Executing: ${step.step}`, isDefenseMode ? "success" : "warning");
      setTimeout(() => addLog(`${prefix} ${step.detail}`, "info"), 500);
      
      if (soundEnabled) {
        if (selectedScenario.severity === "Critical") {
          feedback.feedbackCritical();
        } else {
          feedback.feedbackStep(isDefenseMode);
        }
      }
      
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2500);
      
      return () => clearTimeout(timer);
    } else {
      const finalMessage = isDefenseMode 
        ? "[SYSTEM] ✓ Threat successfully neutralized. All systems secure."
        : "[SYSTEM] ✗ Attack sequence complete. Target compromised.";
      addLog(finalMessage, isDefenseMode ? "success" : "error");
      setIsRunning(false);
      if (soundEnabled) {
        if (isDefenseMode) {
          feedback.feedbackSuccess();
        } else {
          feedback.feedbackError();
        }
      }
    }
  }, [currentStep, isRunning, isDefenseMode, selectedScenario, soundEnabled, feedback]);

  const toggleMode = () => {
    setIsDefenseMode(!isDefenseMode);
    setCurrentStep(-1);
    setIsRunning(false);
    addLog(`[SYSTEM] Mode switched to ${!isDefenseMode ? "DEFENSE" : "ATTACK"}`, "info");
    if (soundEnabled) {
      feedback.feedbackToggle();
    }
  };

  const resetSimulation = () => {
    setCurrentStep(-1);
    setIsRunning(false);
    setLogs([]);
  };

  const handleScenarioSelect = (scenario: typeof scenarios[0]) => {
    setSelectedScenario(scenario);
    resetSimulation();
    if (soundEnabled) {
      feedback.feedbackAlert();
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <StickyHeader />
      <AdvancedCyberBackground isDefenseMode={isDefenseMode} />
      
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Mode badge */}
            <motion.div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-6 ${
                isDefenseMode 
                  ? 'bg-[hsl(var(--neon-blue))]/10 text-[hsl(var(--neon-blue))] border border-[hsl(var(--neon-blue))]/30'
                  : 'bg-red-500/10 text-red-400 border border-red-500/30'
              }`}
              animate={{ 
                boxShadow: isDefenseMode 
                  ? ['0 0 20px hsl(var(--neon-blue) / 0.2)', '0 0 40px hsl(var(--neon-blue) / 0.4)', '0 0 20px hsl(var(--neon-blue) / 0.2)']
                  : ['0 0 20px rgba(239, 68, 68, 0.2)', '0 0 40px rgba(239, 68, 68, 0.4)', '0 0 20px rgba(239, 68, 68, 0.2)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isDefenseMode ? <ShieldCheck className="w-3.5 h-3.5" /> : <Crosshair className="w-3.5 h-3.5" />}
              {isDefenseMode ? "DEFENSE MODE ACTIVE" : "ATTACK MODE ACTIVE"}
            </motion.div>
            
            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4 tracking-tight">
              <motion.span
                className="inline-block"
                animate={{ 
                  color: isDefenseMode ? 'hsl(var(--neon-blue))' : 'rgb(239, 68, 68)',
                  textShadow: isDefenseMode 
                    ? '0 0 40px hsl(var(--neon-blue) / 0.5)'
                    : '0 0 40px rgba(239, 68, 68, 0.5)'
                }}
                transition={{ duration: 0.5 }}
              >
                {isDefenseMode ? "BLUE TEAM" : "RED TEAM"}
              </motion.span>
              <span className="text-muted-foreground mx-3">//</span>
              <span className="text-foreground">CYBER SIMULATION</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
              Experience real-world cyber scenarios. Toggle between attacker and defender perspectives 
              to understand complete threat lifecycles.
            </p>
            
            {/* Controls row */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* Sound toggle */}
              <motion.button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  soundEnabled 
                    ? "bg-[hsl(var(--electric-green))]/10 text-[hsl(var(--electric-green))] border border-[hsl(var(--electric-green))]/30"
                    : "bg-muted/20 text-muted-foreground border border-border/30"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {soundEnabled ? "Sound On" : "Sound Off"}
              </motion.button>
            </div>
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Scenario Selector */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <HUDFrame title="THREAT SCENARIOS" isDefenseMode={isDefenseMode} className="sticky top-24">
                <div className="divide-y divide-border/20 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {scenarios.map((scenario) => (
                    <ScenarioCard
                      key={scenario.id}
                      scenario={scenario}
                      isSelected={selectedScenario.id === scenario.id}
                      onClick={() => handleScenarioSelect(scenario)}
                      isDefenseMode={isDefenseMode}
                    />
                  ))}
                </div>
              </HUDFrame>
            </motion.div>

            {/* Simulation Area */}
            <motion.div
              className="lg:col-span-6 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Mode Toggle */}
              <div className="flex items-center justify-center gap-6 py-4">
                <motion.span 
                  className={`font-display text-sm tracking-wider transition-all duration-300 ${
                    !isDefenseMode ? "text-red-400" : "text-muted-foreground/50"
                  }`}
                  animate={{ scale: !isDefenseMode ? 1.05 : 1 }}
                >
                  ATTACK
                </motion.span>
                
                <motion.button
                  onClick={toggleMode}
                  className={`relative w-24 h-12 rounded-full transition-all duration-500 ${
                    isDefenseMode 
                      ? "bg-[hsl(var(--neon-blue))]/20 border-2 border-[hsl(var(--neon-blue))]" 
                      : "bg-red-500/20 border-2 border-red-500"
                  }`}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: isDefenseMode 
                      ? '0 0 30px hsl(var(--neon-blue) / 0.4)'
                      : '0 0 30px rgba(239, 68, 68, 0.4)'
                  }}
                >
                  <motion.div
                    className={`absolute top-1.5 w-8 h-8 rounded-full flex items-center justify-center ${
                      isDefenseMode ? 'bg-[hsl(var(--neon-blue))]' : 'bg-red-500'
                    }`}
                    animate={{ left: isDefenseMode ? "calc(100% - 38px)" : "6px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {isDefenseMode ? (
                      <Shield className="w-4 h-4 text-background" />
                    ) : (
                      <Swords className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                </motion.button>
                
                <motion.span 
                  className={`font-display text-sm tracking-wider transition-all duration-300 ${
                    isDefenseMode ? "text-[hsl(var(--neon-blue))]" : "text-muted-foreground/50"
                  }`}
                  animate={{ scale: isDefenseMode ? 1.05 : 1 }}
                >
                  DEFENSE
                </motion.span>
              </div>

              {/* Scenario Header */}
              <HUDFrame 
                title={isDefenseMode ? "DEFENSE PROTOCOL" : "ATTACK VECTOR"} 
                isDefenseMode={isDefenseMode}
              >
                <motion.div
                  key={selectedScenario.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className={`p-4 rounded-xl ${
                          isDefenseMode 
                            ? "bg-[hsl(var(--neon-blue))]/10 border border-[hsl(var(--neon-blue))]/30" 
                            : "bg-red-500/10 border border-red-500/30"
                        }`}
                        animate={{
                          boxShadow: isDefenseMode
                            ? ['0 0 20px hsl(var(--neon-blue) / 0.3)', '0 0 40px hsl(var(--neon-blue) / 0.5)', '0 0 20px hsl(var(--neon-blue) / 0.3)']
                            : ['0 0 20px rgba(239, 68, 68, 0.3)', '0 0 40px rgba(239, 68, 68, 0.5)', '0 0 20px rgba(239, 68, 68, 0.3)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <selectedScenario.icon className={`w-8 h-8 ${
                          isDefenseMode ? "text-[hsl(var(--neon-blue))]" : "text-red-400"
                        }`} />
                      </motion.div>
                      <div>
                        <h2 className="font-display text-xl tracking-wide">{selectedScenario.name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{selectedScenario.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                            selectedScenario.severity === "Critical" ? "bg-red-500/20 text-red-400" :
                            selectedScenario.severity === "High" ? "bg-orange-500/20 text-orange-400" :
                            "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {selectedScenario.severity} SEVERITY
                          </span>
                          <span className={`px-2 py-0.5 text-[10px] font-mono rounded ${
                            isDefenseMode ? 'bg-[hsl(var(--neon-blue))]/10 text-[hsl(var(--neon-blue))]' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {(isDefenseMode ? selectedScenario.defenseSteps : selectedScenario.attackSteps).length} STEPS
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {isRunning ? (
                        <Button
                          onClick={resetSimulation}
                          variant="outline"
                          className={`gap-2 ${
                            isDefenseMode 
                              ? 'border-[hsl(var(--neon-blue))]/30 hover:bg-[hsl(var(--neon-blue))]/10'
                              : 'border-red-500/30 hover:bg-red-500/10'
                          }`}
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reset
                        </Button>
                      ) : (
                        <Button
                          onClick={startSimulation}
                          className={`gap-2 ${
                            isDefenseMode 
                              ? "bg-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))]/80 text-background"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                        >
                          <Play className="w-4 h-4" />
                          Start Simulation
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* System stats */}
                  <div className="mt-4">
                    <SystemStats isDefenseMode={isDefenseMode} isRunning={isRunning} />
                  </div>
                </motion.div>
              </HUDFrame>

              {/* Steps Visualization */}
              <HUDFrame 
                title={isDefenseMode ? "DEFENSE SEQUENCE" : "ATTACK SEQUENCE"} 
                isDefenseMode={isDefenseMode}
              >
                <div className="p-6">
                  <StepVisualization
                    steps={isDefenseMode ? selectedScenario.defenseSteps : selectedScenario.attackSteps}
                    isDefenseMode={isDefenseMode}
                    currentStep={currentStep}
                  />
                </div>
              </HUDFrame>
            </motion.div>

            {/* Live Log Panel */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <HUDFrame title="EVENT LOG" isDefenseMode={isDefenseMode} className="sticky top-24">
                <div className="h-[600px]">
                  <LiveLogPanel logs={logs} isDefenseMode={isDefenseMode} />
                </div>
              </HUDFrame>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <div className="relative max-w-4xl mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-blue))]/10 via-[hsl(var(--cyber-purple))]/10 to-[hsl(var(--neon-blue))]/10 blur-3xl" />
              
              <div className="relative p-12 md:p-16 rounded-3xl border border-border/30 bg-background/80 backdrop-blur-xl text-center">
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[hsl(var(--neon-blue))]/50" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[hsl(var(--neon-blue))]/50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[hsl(var(--neon-blue))]/50" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[hsl(var(--neon-blue))]/50" />
                
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-6 bg-[hsl(var(--electric-green))]/10 text-[hsl(var(--electric-green))] border border-[hsl(var(--electric-green))]/30"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  READY FOR REAL PROTECTION?
                </motion.div>
                
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4 tracking-tight">
                  Test Your Own Security
                </h2>
                
                <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                  We simulate attacks. We prevent breaches. We protect your company.
                  <br />
                  <span className="text-foreground font-medium">Schedule your assessment today.</span>
                </p>
                
                <Button
                  onClick={() => navigate("/contact")}
                  size="lg"
                  className="gap-2 px-8 py-6 text-base bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] hover:shadow-[0_0_40px_hsl(var(--neon-blue)/0.5)] transition-all duration-300"
                >
                  Schedule Security Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[hsl(var(--electric-green))]" />
                    24/7 SOC Coverage
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[hsl(var(--electric-green))]" />
                    500+ Assessments
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[hsl(var(--electric-green))]" />
                    Zero Breaches
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Simulation;
