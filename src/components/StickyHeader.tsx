import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { MobileNavbar } from "./MobileNavbar";
import { scrollToId } from "@/lib/scroll";
import useScrollSpy from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

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

  const handleNavClick = (id: string) => (e: any) => {
    e.preventDefault();
    if (id.startsWith('/')) {
      // Handle route navigation
      window.location.href = id;
    } else {
      // Handle section scrolling
      const h = headerRef.current?.offsetHeight ?? 72;
      scrollToId(id, h, 800);
    }
    setMobileMenuOpen(false);
  };

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

  return (
    <header
      id="site-header"
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled 
          ? "backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-lg shadow-black/5" 
          : "backdrop-blur-sm bg-background/60",
        className
      )}
    >
      <nav className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <a 
          href="#" 
          className="font-display text-xl tracking-widest text-glow hover:scale-105 transition-transform duration-200"
        >
          CYVANCE
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {[
            { id: "services", label: "Services" },
            { id: "/our-process", label: "Our Process" },
            { id: "stats", label: "Impact" },
            { id: "testimonials", label: "Clients" },
            { id: "contact", label: "Contact" },
            { id: "dashboard", label: "Our Dashboard" },
            { id: "/about-us", label: "About Us" },
            { id: "why-us", label: "Why Us" },
            { id: "blogs", label: "Blogs" }
          ].map(({ id, label }) => {
            const isRoute = id.startsWith('/');
            const isActive = isRoute ? window.location.pathname === id : activeId === id;
            
            return (
              <a
                key={id}
                href={isRoute ? id : `#${id}`}
                onClick={handleNavClick(id)}
                className={cn(
                  "story-link relative transition-all duration-200 hover:text-foreground",
                  isActive 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground"
                )}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button 
            variant="neon" 
            className="hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)] transition-all duration-300"
          >
            Sign In
          </Button>
          <Button 
            variant="hero" 
            className="group hover:shadow-[0_0_30px_hsl(var(--neon-blue)/0.4)] transition-all duration-300"
          >
            Get Security Audit
            <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto py-4 space-y-4">
            {[
              { id: "services", label: "Services" },
              { id: "/our-process", label: "Our Process" },
              { id: "stats", label: "Impact" },
              { id: "testimonials", label: "Clients" },
              { id: "contact", label: "Contact" },
              { id: "dashboard", label: "Our Dashboard" },
              { id: "/about-us", label: "About Us" },
              { id: "why-us", label: "Why Us" },
              { id: "blogs", label: "Blogs" }
            ].map(({ id, label }) => {
              const isRoute = id.startsWith('/');
              const isActive = isRoute ? window.location.pathname === id : activeId === id;
              
              return (
                <a
                  key={id}
                  href={isRoute ? id : `#${id}`}
                  onClick={handleNavClick(id)}
                  className={cn(
                    "block py-2 text-sm transition-colors",
                    isActive 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {label}
                </a>
              );
            })}
            <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
              <Button variant="neon" className="w-full">
                Sign In
              </Button>
              <Button variant="hero" className="w-full group">
                Get Security Audit
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};