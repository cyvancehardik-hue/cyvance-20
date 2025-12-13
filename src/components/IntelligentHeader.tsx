import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import useScrollSpy from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { easing, useScrollCamera } from "@/hooks/useIntelligentMotion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IntelligentHeaderProps {
  className?: string;
}

export const IntelligentHeader = ({ className }: IntelligentHeaderProps) => {
  const headerRef = useRef<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { progress, velocity, direction, isSettling } = useScrollCamera();
  
  const sections = ["services", "stats", "testimonials", "contact", "dashboard", "why-us", "blogs"] as const;
  const activeId = useScrollSpy(sections, 80);

  // Trust-based header visibility - fades as user scrolls deeper
  const trustOpacity = Math.max(0.4, 1 - progress * 0.6);
  const isScrolled = progress > 0.02;
  
  // Hide on fast scroll down, show on scroll up or settling
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (direction === 'down' && velocity > 5 && progress > 0.1) {
      setIsVisible(false);
    } else if (direction === 'up' || isSettling || progress < 0.05) {
      setIsVisible(true);
    }
  }, [direction, velocity, progress, isSettling]);

  const companyMenuItems = [
    { id: "/our-process", label: "Our Process" },
    { id: "/about-us", label: "About Us" },
    { id: "why-us", label: "Why Us" },
    { id: "/milestones", label: "Milestones" }
  ];

  const handleNavClick = (id: string) => (e: any) => {
    e.preventDefault();
    if (id.startsWith('/')) {
      window.location.href = id;
    } else {
      const h = headerRef.current?.offsetHeight ?? 72;
      scrollToId(id, h, 800);
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      id="site-header"
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        className
      )}
      initial={{ y: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: trustOpacity,
      }}
      transition={{ 
        y: { duration: 0.4, ease: easing.narrative },
        opacity: { duration: 0.6, ease: easing.ambient },
      }}
    >
      {/* Minimal glass effect - appears on scroll */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          backgroundColor: isScrolled 
            ? 'hsl(var(--background) / 0.85)' 
            : 'hsl(var(--background) / 0)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.5, ease: easing.settle }}
      />
      
      {/* Subtle border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-border"
        animate={{ opacity: isScrolled ? 0.3 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <nav className="container mx-auto flex items-center justify-between py-5 px-6">
        {/* Logo - refined typography */}
        <motion.a 
          href="#" 
          className="font-display text-lg tracking-[0.25em] text-foreground/90 hover:text-foreground transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          CYVANCE
        </motion.a>

        {/* Desktop Navigation - minimal, refined */}
        <div className="hidden md:flex items-center gap-10 text-sm">
          {[
            { id: "services", label: "Services" },
            { id: "stats", label: "Impact" },
            { id: "testimonials", label: "Clients" },
            { id: "contact", label: "Contact" },
            { id: "dashboard", label: "Dashboard" },
            { id: "blogs", label: "Insights" }
          ].map(({ id, label }) => {
            const isRoute = id.startsWith('/');
            const isActive = isRoute ? window.location.pathname === id : activeId === id;
            
            return (
              <motion.a
                key={id}
                href={isRoute ? id : `#${id}`}
                onClick={handleNavClick(id)}
                className={cn(
                  "relative py-1 transition-colors duration-300",
                  isActive 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                whileHover={{ y: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {label}
                <motion.span
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-foreground"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: easing.narrative }}
                />
              </motion.a>
            );
          })}
          
          {/* Company Dropdown - refined */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "relative py-1 transition-colors duration-300 inline-flex items-center gap-1.5 outline-none",
              "text-muted-foreground hover:text-foreground"
            )}>
              Company
              <ChevronDown className="h-3 w-3 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="bg-background/95 backdrop-blur-xl border-border/30 min-w-[140px] p-1"
            >
              {companyMenuItems.map(({ id, label }) => (
                <DropdownMenuItem 
                  key={id}
                  className="text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 cursor-pointer rounded-sm transition-colors"
                  onClick={handleNavClick(id)}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Actions - refined buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Button>
          <Button 
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 rounded-full px-5"
          >
            Get Started
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle mobile menu"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu - native feel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easing.narrative }}
          >
            <div className="container mx-auto py-6 px-6 space-y-1">
              {[
                { id: "services", label: "Services" },
                { id: "stats", label: "Impact" },
                { id: "testimonials", label: "Clients" },
                { id: "contact", label: "Contact" },
                { id: "dashboard", label: "Dashboard" },
                { id: "blogs", label: "Insights" }
              ].map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  href={id.startsWith('/') ? id : `#${id}`}
                  onClick={handleNavClick(id)}
                  className="block py-3 text-lg text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3, ease: easing.narrative }}
                >
                  {label}
                </motion.a>
              ))}
              
              <div className="pt-4 mt-4 border-t border-border/30 space-y-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-3">Company</div>
                {companyMenuItems.map(({ id, label }, i) => (
                  <motion.a
                    key={id}
                    href={id.startsWith('/') ? id : `#${id}`}
                    onClick={handleNavClick(id)}
                    className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.3, ease: easing.narrative }}
                  >
                    {label}
                  </motion.a>
                ))}
              </div>

              <motion.div 
                className="flex flex-col gap-3 pt-6 mt-4 border-t border-border/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Button variant="ghost" className="w-full justify-center">
                  Sign In
                </Button>
                <Button className="w-full bg-foreground text-background rounded-full">
                  Get Started
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
