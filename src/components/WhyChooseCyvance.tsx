import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Users, Zap, Award, Lock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const valuePropositions = [
  {
    id: 1,
    icon: Shield,
    title: "Security First",
    description: "Military-grade encryption and advanced threat detection powered by AI to protect your most critical assets.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    icon: Users,
    title: "Enterprise-Grade Support",
    description: "24/7 dedicated support team with average response time under 2 minutes for critical security incidents.",
    gradient: "from-purple-500 to-blue-500"
  },
  {
    id: 3,
    icon: Zap,
    title: "Scalable Solutions",
    description: "Seamlessly scales from startup to Fortune 500, handling millions of security events per second.",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    id: 4,
    icon: Award,
    title: "Proven Expertise",
    description: "Trusted by 95% of Fortune 500 companies with over 15 years of cybersecurity excellence.",
    gradient: "from-teal-500 to-green-500"
  },
  {
    id: 5,
    icon: Lock,
    title: "Zero Trust Architecture",
    description: "Advanced zero-trust security model ensuring every access attempt is verified and authenticated.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "Continuous Innovation",
    description: "Constantly evolving platform with quarterly updates and next-generation security technologies.",
    gradient: "from-orange-500 to-red-500"
  }
];

export const WhyChooseCyvance = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        damping: 20,
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  return (
    <section className="relative min-h-screen py-20 md:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.03),transparent_50%)]" />
        
        {/* Subtle geometric patterns */}
        <motion.div 
          className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-20 w-1 h-1 bg-primary/30 rounded-full"
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-primary/15 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.15, 0.4, 0.15] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </div>

      <div ref={containerRef} className="container mx-auto relative z-10 px-4 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider border border-primary/20 rounded-full px-4 py-2 bg-primary/5">
              Enterprise Security Excellence
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Why Choose Cyvance
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Trusted by industry leaders worldwide, we deliver unmatched cybersecurity solutions 
            that scale with your business and adapt to evolving threats.
          </p>
        </motion.div>

        {/* Value Propositions Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {valuePropositions.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  rotateY: 5,
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 overflow-hidden">
                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500 -z-10`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div 
                      className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${item.gradient} p-0.5 mb-6`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center justify-center w-full h-full bg-background rounded-[10px]">
                        <IconComponent className="w-6 h-6 text-foreground" />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient} w-0 group-hover:w-full transition-all duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="relative max-w-2xl mx-auto p-8 rounded-2xl border bg-card/30 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Secure Your Enterprise?
              </h3>
              <p className="text-muted-foreground mb-8">
                Join thousands of organizations that trust Cyvance with their cybersecurity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero"
                  size="lg"
                  onClick={() => navigate('/why-cyvance')}
                  className="px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Learn More About Cyvance
                </Button>
                <motion.button 
                  className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule Demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};