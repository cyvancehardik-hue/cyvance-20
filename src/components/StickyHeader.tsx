import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import { MobileNavbar } from "./MobileNavbar";
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

  const companyMenuItems = [
    { id: "/our-process", label: "Our Process" },
    { id: "/about-us", label: "About Us" },
    { id: "why-us", label: "Why Us" },
    { id: "/milestones", label: "Milestones", special: true }
  ];

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled 
          ? "liquid-glass border-b border-border/30" 
          : "backdrop-blur-md bg-background/40",
        className
      )}
    >
      <nav className="container mx-auto flex items-center justify-between py-3.5 lg:py-4">
        {/* Logo */}
        <a 
          href="#" 
          className="font-display text-lg lg:text-xl tracking-[0.25em] text-foreground/90 hover:text-foreground transition-all duration-300 hover:tracking-[0.3em]"
        >
          CYVANCE
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-medium">
          {[
            { id: "services", label: "Services" },
            { id: "stats", label: "Impact" },
            { id: "testimonials", label: "Clients" },
            { id: "contact", label: "Contact" },
            { id: "dashboard", label: "Our Dashboard" },
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
                  "nav-link relative py-1 transition-all duration-300",
                  isActive 
                    ? "text-foreground" 
                    : "text-muted-foreground/80 hover:text-foreground"
                )}
              >
                {label}
                <span className={cn(
                  "absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-[hsl(var(--neon-blue)/0.8)] to-[hsl(var(--cyber-purple)/0.6)] rounded-full transition-transform duration-300 origin-left",
                  isActive ? "scale-x-100" : "scale-x-0"
                )} />
              </a>
            );
          })}
          
          {/* Company Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "nav-link relative py-1 transition-all duration-300 inline-flex items-center gap-1.5 outline-none group",
              companyMenuItems.some(item => 
                item.id.startsWith('/') 
                  ? window.location.pathname === item.id 
                  : activeId === item.id
              )
                ? "text-foreground" 
                : "text-muted-foreground/80 hover:text-foreground"
            )}>
              Company
              <ChevronDown className="h-3 w-3 transition-transform duration-300 group-data-[state=open]:rotate-180 opacity-60" />
              <span className={cn(
                "absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-[hsl(var(--neon-blue)/0.8)] to-[hsl(var(--cyber-purple)/0.6)] rounded-full transition-transform duration-300 origin-left",
                companyMenuItems.some(item => 
                  item.id.startsWith('/') 
                    ? window.location.pathname === item.id 
                    : activeId === item.id
                ) ? "scale-x-100" : "scale-x-0"
              )} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="dropdown-glass min-w-[160px] p-1.5">
              {companyMenuItems.map(({ id, label, special }) => {
                const isRoute = id.startsWith('/');
                const isActive = isRoute ? window.location.pathname === id : activeId === id;
                
                return (
                  <DropdownMenuItem 
                    key={id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 rounded-md text-[13px] focus:bg-accent/50",
                      special && "milestones-glitch-pulse",
                      isActive 
                        ? "bg-accent/40 text-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                    )}
                    onClick={handleNavClick(id)}
                  >
                    {label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-foreground text-[13px] font-medium h-9 px-4"
          >
            Sign In
          </Button>
          <Button 
            variant="premium" 
            size="sm"
            className="group h-9 px-5"
          >
            Get Security Audit
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
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
              { id: "stats", label: "Impact" },
              { id: "testimonials", label: "Clients" },
              { id: "contact", label: "Contact" },
              { id: "dashboard", label: "Our Dashboard" },
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
            
            {/* Company Section in Mobile */}
            <div className="border-t border-border/50 pt-4">
              <div className="text-sm font-medium text-foreground mb-2">Company</div>
              {companyMenuItems.map(({ id, label, special }) => {
                const isRoute = id.startsWith('/');
                const isActive = isRoute ? window.location.pathname === id : activeId === id;
                
                return (
                  <a
                    key={id}
                    href={isRoute ? id : `#${id}`}
                    onClick={handleNavClick(id)}
                    className={cn(
                      "block py-2 pl-4 text-sm transition-colors",
                      special && "milestones-glitch-pulse",
                      isActive 
                        ? "text-foreground font-medium" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
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