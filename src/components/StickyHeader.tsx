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

  const navItems = [
    { id: "services", label: "Solutions" },
    { id: "services", label: "Services" },
    { id: "stats", label: "Industries" },
    { id: "blogs", label: "Research" },
    { id: "blogs", label: "Blog" },
  ];

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
          ? "navbar-glass py-2" 
          : "bg-transparent py-4",
        className
      )}
    >
      <nav className="container mx-auto flex items-center justify-between">
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
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
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
        <div className="lg:hidden border-t border-border/30 mt-2 navbar-glass">
          <div className="container mx-auto py-6 space-y-4">
            {navItems.map(({ id, label }, index) => (
              <a
                key={`mobile-${id}-${index}`}
                href={`#${id}`}
                onClick={handleNavClick(id)}
                className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
            
            <div className="border-t border-border/30 pt-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-3">Company</div>
              {companyMenuItems.map(({ id, label }) => (
                <a
                  key={`mobile-company-${id}`}
                  href={id}
                  onClick={handleNavClick(id)}
                  className="block py-2 pl-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
            
            <div className="pt-4 border-t border-border/30">
              <Button variant="premium" className="w-full group">
                Request Security Audit
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};