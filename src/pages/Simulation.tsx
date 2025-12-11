import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StickyHeader } from "@/components/StickyHeader";
import { useNavigate } from "react-router-dom";
import {
  Shield, Swords, ArrowRight, Zap, Target, Lock, Eye, Brain,
  AlertTriangle, Server, Cloud, User, Key, Mail, Network, Activity,
  CheckCircle, XCircle, Clock, Terminal, ChevronRight
} from "lucide-react";

// Scenario data
const scenarios = [
  {
    id: "phishing",
    name: "Phishing Breach",
    icon: Mail,
    description: "Social engineering attack targeting employee credentials",
    severity: "High",
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
];

// Cyber background
const CyberBackground = ({ isDefenseMode }: { isDefenseMode: boolean }) => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute inset-0"
      animate={{
        background: isDefenseMode
          ? "radial-gradient(ellipse at center, hsl(var(--neon-blue) / 0.1) 0%, transparent 70%)"
          : "radial-gradient(ellipse at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)",
      }}
      transition={{ duration: 0.8 }}
    />
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(${isDefenseMode ? 'rgba(0, 170, 255, 0.2)' : 'rgba(239, 68, 68, 0.2)'} 1px, transparent 1px),
          linear-gradient(90deg, ${isDefenseMode ? 'rgba(0, 170, 255, 0.2)' : 'rgba(239, 68, 68, 0.2)'} 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
    <motion.div
      className="absolute left-0 right-0 h-px"
      style={{
        background: `linear-gradient(90deg, transparent, ${isDefenseMode ? 'hsl(var(--neon-blue))' : 'rgb(239, 68, 68)'}, transparent)`,
      }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Scenario Card
const ScenarioCard = ({ scenario, isSelected, onClick }: { scenario: typeof scenarios[0]; isSelected: boolean; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className={`relative w-full p-4 rounded-xl border text-left transition-all duration-300 ${
      isSelected 
        ? "border-[hsl(var(--neon-blue))] bg-[hsl(var(--neon-blue))]/10" 
        : "border-border/50 bg-background/50 hover:border-border"
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${isSelected ? "bg-[hsl(var(--neon-blue))]/20" : "bg-muted/50"}`}>
        <scenario.icon className={`w-5 h-5 ${isSelected ? "text-[hsl(var(--neon-blue))]" : "text-muted-foreground"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate">{scenario.name}</h4>
        <p className="text-xs text-muted-foreground truncate">{scenario.description}</p>
      </div>
      <span className={`px-2 py-1 text-xs rounded-full ${
        scenario.severity === "Critical" ? "bg-red-500/20 text-red-400" :
        scenario.severity === "High" ? "bg-orange-500/20 text-orange-400" :
        "bg-yellow-500/20 text-yellow-400"
      }`}>
        {scenario.severity}
      </span>
    </div>
  </motion.button>
);

// Step Visualization
const StepVisualization = ({ steps, isDefenseMode, currentStep }: { steps: any[]; isDefenseMode: boolean; currentStep: number }) => (
  <div className="space-y-3">
    {steps.map((step, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: isDefenseMode ? 20 : -20 }}
        animate={{ 
          opacity: index <= currentStep ? 1 : 0.3,
          x: 0,
        }}
        transition={{ delay: index * 0.1 }}
        className={`relative p-4 rounded-xl border transition-all duration-300 ${
          index === currentStep 
            ? isDefenseMode 
              ? "border-[hsl(var(--neon-blue))] bg-[hsl(var(--neon-blue))]/10 shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)]"
              : "border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
            : index < currentStep
              ? "border-[hsl(var(--electric-green))]/50 bg-[hsl(var(--electric-green))]/5"
              : "border-border/30 bg-background/30"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            index === currentStep
              ? isDefenseMode ? "bg-[hsl(var(--neon-blue))] text-white" : "bg-red-500 text-white"
              : index < currentStep
                ? "bg-[hsl(var(--electric-green))] text-white"
                : "bg-muted text-muted-foreground"
          }`}>
            {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{step.step}</h4>
              {isDefenseMode && step.module && (
                <span className="px-2 py-1 text-xs rounded-full bg-[hsl(var(--neon-blue))]/20 text-[hsl(var(--neon-blue))]">
                  {step.module}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{step.detail}</p>
          </div>
          {index === currentStep && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className={`w-2 h-2 rounded-full ${isDefenseMode ? "bg-[hsl(var(--neon-blue))]" : "bg-red-500"}`}
            />
          )}
        </div>
      </motion.div>
    ))}
  </div>
);

// Live Log Panel
const LiveLogPanel = ({ logs }: { logs: { time: string; message: string; type: "info" | "warning" | "success" | "error" }[] }) => (
  <div className="h-full flex flex-col">
    <div className="flex items-center gap-2 p-3 border-b border-border/50">
      <Terminal className="w-4 h-4 text-[hsl(var(--electric-green))]" />
      <span className="text-sm font-mono">Live Event Log</span>
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-2 h-2 rounded-full bg-[hsl(var(--electric-green))]"
      />
    </div>
    <div className="flex-1 overflow-auto p-3 space-y-2 font-mono text-xs">
      <AnimatePresence>
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2"
          >
            <span className="text-muted-foreground shrink-0">{log.time}</span>
            <span className={
              log.type === "error" ? "text-red-400" :
              log.type === "warning" ? "text-yellow-400" :
              log.type === "success" ? "text-[hsl(var(--electric-green))]" :
              "text-foreground"
            }>
              {log.message}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);

const Simulation = () => {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [isDefenseMode, setIsDefenseMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<{ time: string; message: string; type: "info" | "warning" | "success" | "error" }[]>([]);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  const addLog = (message: string, type: "info" | "warning" | "success" | "error") => {
    setLogs(prev => [...prev.slice(-20), { time: getCurrentTime(), message, type }]);
  };

  const startSimulation = () => {
    setIsRunning(true);
    setCurrentStep(0);
    setLogs([]);
    addLog(`Starting ${isDefenseMode ? "Defense" : "Attack"} simulation...`, "info");
  };

  useEffect(() => {
    if (!isRunning || currentStep < 0) return;

    const steps = isDefenseMode ? selectedScenario.defenseSteps : selectedScenario.attackSteps;
    
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      addLog(`[${isDefenseMode ? "DEFENSE" : "ATTACK"}] ${step.step}: ${step.detail}`, isDefenseMode ? "success" : "warning");
      
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      addLog(isDefenseMode ? "Threat successfully neutralized!" : "Attack sequence complete.", isDefenseMode ? "success" : "error");
      setIsRunning(false);
    }
  }, [currentStep, isRunning, isDefenseMode, selectedScenario]);

  const toggleMode = () => {
    setIsDefenseMode(!isDefenseMode);
    setCurrentStep(-1);
    setIsRunning(false);
    addLog(`Switching to ${!isDefenseMode ? "Defense" : "Attack"} Mode`, "info");
  };

  const resetSimulation = () => {
    setCurrentStep(-1);
    setIsRunning(false);
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <StickyHeader />
      <CyberBackground isDefenseMode={isDefenseMode} />
      
      <main className="pt-20 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
              <span className={isDefenseMode ? "text-[hsl(var(--neon-blue))]" : "text-red-500"}>
                {isDefenseMode ? "Blue Team" : "Red Team"}
              </span>
              <span className="text-muted-foreground"> / </span>
              <span className={!isDefenseMode ? "text-[hsl(var(--neon-blue))]" : "text-red-500"}>
                {!isDefenseMode ? "Blue Team" : "Red Team"}
              </span>
              <br />
              <span className="text-foreground">Cyber Simulation</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience real-world cyber scenarios from both perspectives. Toggle between attack and defense modes to understand complete threat lifecycles.
            </p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Scenario Selector */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                  Select Threat Scenario
                </h3>
                <div className="space-y-2">
                  {scenarios.map((scenario) => (
                    <ScenarioCard
                      key={scenario.id}
                      scenario={scenario}
                      isSelected={selectedScenario.id === scenario.id}
                      onClick={() => {
                        setSelectedScenario(scenario);
                        resetSimulation();
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Simulation Area */}
            <div className="lg:col-span-6">
              {/* Mode Toggle */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className={`font-semibold ${!isDefenseMode ? "text-red-500" : "text-muted-foreground"}`}>
                  Attack Mode
                </span>
                <motion.button
                  onClick={toggleMode}
                  className={`relative w-20 h-10 rounded-full transition-colors duration-300 ${
                    isDefenseMode ? "bg-[hsl(var(--neon-blue))]" : "bg-red-500"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute top-1 w-8 h-8 rounded-full bg-white flex items-center justify-center"
                    animate={{ left: isDefenseMode ? "calc(100% - 36px)" : "4px" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {isDefenseMode ? (
                      <Shield className="w-4 h-4 text-[hsl(var(--neon-blue))]" />
                    ) : (
                      <Swords className="w-4 h-4 text-red-500" />
                    )}
                  </motion.div>
                </motion.button>
                <span className={`font-semibold ${isDefenseMode ? "text-[hsl(var(--neon-blue))]" : "text-muted-foreground"}`}>
                  Defense Mode
                </span>
              </div>

              {/* Scenario Header */}
              <motion.div
                key={selectedScenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border mb-6 ${
                  isDefenseMode 
                    ? "border-[hsl(var(--neon-blue))]/30 bg-[hsl(var(--neon-blue))]/5"
                    : "border-red-500/30 bg-red-500/5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      isDefenseMode ? "bg-[hsl(var(--neon-blue))]/20" : "bg-red-500/20"
                    }`}>
                      <selectedScenario.icon className={`w-8 h-8 ${
                        isDefenseMode ? "text-[hsl(var(--neon-blue))]" : "text-red-500"
                      }`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-display">{selectedScenario.name}</h2>
                      <p className="text-sm text-muted-foreground">{selectedScenario.description}</p>
                    </div>
                  </div>
                  <Button
                    onClick={isRunning ? resetSimulation : startSimulation}
                    className={
                      isDefenseMode 
                        ? "bg-[hsl(var(--neon-blue))] hover:bg-[hsl(var(--neon-blue))]/80"
                        : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {isRunning ? "Reset" : "Start Simulation"}
                  </Button>
                </div>
              </motion.div>

              {/* Steps Visualization */}
              <StepVisualization
                steps={isDefenseMode ? selectedScenario.defenseSteps : selectedScenario.attackSteps}
                isDefenseMode={isDefenseMode}
                currentStep={currentStep}
              />
            </div>

            {/* Live Log Panel */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 h-[600px] rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm overflow-hidden">
                <LiveLogPanel logs={logs} />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="max-w-3xl mx-auto p-12 rounded-3xl border border-border/50 bg-gradient-to-br from-background via-background to-[hsl(var(--neon-blue))]/5">
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Ready to Test Your Own Security?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                We simulate attacks. We prevent breaches. We protect your company.
              </p>
              <Button
                onClick={() => navigate("/contact")}
                size="lg"
                className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.5)] transition-all duration-300 px-8"
              >
                Schedule Security Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Simulation;
