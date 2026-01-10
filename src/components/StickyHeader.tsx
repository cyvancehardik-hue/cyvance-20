import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, ChevronDown, Shield, Scan, Network, AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import useScrollSpy from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StickyHeaderProps {
  className?: string;
}

export const StickyHeader = ({ className }: StickyHeaderProps) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const sections = ["services", "stats", "testimonials", "contact", "dashboard", "why-us", "blogs"] as const;
  const activeId = useScrollSpy(sections, 80);

  const navItems = [
    { id: "services", label: "Solutions", icon: Shield },
    { id: "services", label: "Services", icon: ShieldCheck },
    { id: "stats", label: "Industries", icon: Network },
    { id: "blogs", label: "Research", icon: Scan },
    { id: "blogs", label: "Blog", icon: Zap },
  ];

  const companyMenuItems = [
    { id: "/our-process", label: "Our Process", icon: AlertTriangle },
    { id: "/about-us", label: "About Us", icon: ShieldCheck },
    { id: "why-us", label: "Why Us", icon: Shield },
    { id: "/milestones", label: "Milestones", icon: Network }
  ];

  const handleNavClick = (id: string) => (e: any) => {
    e.preventDefault();
    if (id.startsWith('/')) {
      window.location.href = id;
    } else {
      const h = headerRef.current?.offsetHeight ?? 72;
      scrollToId(id, h, 1000);
    }
    setMobileMenuOpen(false);
  };

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 20;
      const visible = scrollY < lastScrollY || scrollY < 100;

      setIsScrolled(scrolled);
      setIsVisible(visible);
      setLastScrollY(scrollY);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // Menu animation variants
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <>
      <header
        id="site-header"
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled 
            ? "navbar-glass py-2" 
            : "bg-transparent py-4",
          className
        )}
      >
        <nav className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <a 
            href="#" 
            className="font-display text-xl tracking-[0.2em] text-foreground hover:text-foreground/80 transition-colors duration-300"
          >
            CYVANCE
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map(({ id, label }, index) => {
              const isActive = activeId === id;
              
              return (
                <a
                  key={`${id}-${index}`}
                  href={`#${id}`}
                  onClick={handleNavClick(id)}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative py-1",
                    isActive 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </a>
              );
            })}
            
            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "text-sm font-medium transition-all duration-300 inline-flex items-center gap-1 outline-none",
                "text-muted-foreground hover:text-foreground"
              )}>
                About
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="navbar-dropdown min-w-[180px]">
                {companyMenuItems.map(({ id, label }) => (
                  <DropdownMenuItem 
                    key={id}
                    className="cursor-pointer text-sm py-2.5 px-3 focus:bg-accent/50 rounded-md"
                    onClick={handleNavClick(id)}
                  >
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="premium" 
              size="sm"
              className="group h-10 px-5 font-medium"
            >
              Request Security Audit
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative z-[60] p-2.5 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 hover:border-[hsl(var(--neon-blue)/0.5)] transition-all duration-300"
            aria-label="Toggle mobile menu"
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-5 h-5">
              <motion.div
                animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1 left-0 w-5 h-0.5 bg-foreground rounded-full"
              />
              <motion.div
                animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[9px] left-0 w-5 h-0.5 bg-foreground rounded-full"
              />
              <motion.div
                animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-1 left-0 w-5 h-0.5 bg-foreground rounded-full"
              />
            </div>
          </motion.button>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-[56] w-[85%] max-w-[380px] bg-background/95 backdrop-blur-2xl border-l border-border/30 lg:hidden overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-[hsl(var(--neon-blue)/0.1)] to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-[hsl(var(--cyber-purple)/0.1)] to-transparent pointer-events-none" />
              
              <div className="relative h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/30">
                  <span className="font-display text-xl tracking-[0.15em] bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">CYVANCE</span>
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-muted/50 border border-border/50 hover:border-[hsl(var(--neon-blue)/0.5)] transition-all duration-300"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </motion.button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = activeId === item.id;
                      
                      return (
                        <motion.li
                          key={`${item.id}-${index}`}
                          custom={index}
                          variants={itemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <a
                            href={`#${item.id}`}
                            onClick={handleNavClick(item.id)}
                            className={cn(
                              "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                              "hover:bg-gradient-to-r hover:from-[hsl(var(--neon-blue)/0.15)] hover:to-transparent",
                              isActive 
                                ? "bg-gradient-to-r from-[hsl(var(--neon-blue)/0.2)] to-transparent border-l-2 border-[hsl(var(--neon-blue))]" 
                                : "border-l-2 border-transparent"
                            )}
                          >
                            <div className={cn(
                              "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300",
                              "bg-gradient-to-br from-muted to-muted/50 border border-border/50",
                              "group-hover:border-[hsl(var(--neon-blue)/0.5)] group-hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.2)]",
                              isActive && "border-[hsl(var(--neon-blue)/0.5)] shadow-[0_0_20px_hsl(var(--neon-blue)/0.2)]"
                            )}>
                              <Icon className={cn(
                                "w-5 h-5 transition-all duration-300",
                                isActive ? "text-[hsl(var(--neon-blue))]" : "text-muted-foreground group-hover:text-foreground"
                              )} />
                            </div>
                            <span className={cn(
                              "font-medium text-base tracking-wide transition-all duration-300",
                              isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                            )}>
                              {item.label}
                            </span>
                            <ArrowRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0 text-muted-foreground" />
                          </a>
                        </motion.li>
                      );
                    })}
                  </ul>

                  {/* Company Section */}
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <motion.p 
                      custom={navItems.length}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      className="px-4 text-xs uppercase tracking-wider text-muted-foreground/60 mb-3"
                    >
                      Company
                    </motion.p>
                    <ul className="space-y-1">
                      {companyMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        const isRoute = item.id.startsWith('/');
                        const isActive = isRoute ? window.location.pathname === item.id : activeId === item.id;
                        
                        return (
                          <motion.li
                            key={item.id}
                            custom={navItems.length + index + 1}
                            variants={itemVariants}
                            initial="closed"
                            animate="open"
                          >
                            <a
                              href={isRoute ? item.id : `#${item.id}`}
                              onClick={handleNavClick(item.id)}
                              className={cn(
                                "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                                "hover:bg-muted/50",
                                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-sm font-medium">{item.label}</span>
                            </a>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                </nav>

                {/* Footer Actions */}
                <motion.div 
                  custom={navItems.length + companyMenuItems.length + 1}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  className="p-6 space-y-3 border-t border-border/30 bg-gradient-to-t from-muted/30 to-transparent"
                >
                  <Button 
                    variant="premium" 
                    className="w-full h-12 justify-center group text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Security Audit
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <motion.div 
                      className="h-2 w-2 rounded-full bg-[hsl(var(--electric-green))]"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs font-mono text-muted-foreground/70 tracking-wider">
                      SYSTEM SECURE
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
