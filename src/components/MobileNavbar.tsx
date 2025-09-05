import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, ShieldCheck, Scan, AlertTriangle, Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavbarProps {
  activeId?: string;
  onNavClick: (id: string) => (e: any) => void;
}

export const MobileNavbar = ({ activeId, onNavClick }: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { id: "services", label: "Services", icon: ShieldCheck },
    { id: "stats", label: "Impact", icon: Scan },
    { id: "testimonials", label: "Clients", icon: Network },
    { id: "contact", label: "Contact", icon: AlertTriangle }
  ];

  const handleMenuItemClick = (id: string) => (e: any) => {
    onNavClick(id)(e);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 p-2 rounded-lg bg-background border border-border hover:border-[hsl(var(--neon-blue)/0.5)] transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--neon-blue)/0.3)]"
        aria-label="Toggle mobile menu"
      >
        <div className="relative w-6 h-6">
          <Menu 
            className={cn(
              "absolute inset-0 transition-all duration-300 text-foreground",
              isOpen ? "rotate-180 opacity-0 scale-75" : "rotate-0 opacity-100 scale-100"
            )}
          />
          <X 
            className={cn(
              "absolute inset-0 transition-all duration-300 text-foreground",
              isOpen ? "rotate-0 opacity-100 scale-100" : "rotate-180 opacity-0 scale-75"
            )}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-all duration-500 ease-out",
          isOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-background backdrop-blur-xl transition-all duration-500",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Content */}
        <div 
          className={cn(
            "relative h-full flex flex-col bg-background backdrop-blur-xl shadow-xl transition-all duration-700 ease-out",
            isOpen 
              ? "translate-y-0 opacity-100" 
              : "-translate-y-8 opacity-0"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-background">
            <span className="font-display text-2xl tracking-widest text-glow">CYVANCE</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg bg-muted border border-border hover:border-[hsl(var(--neon-blue)/0.5)] transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--neon-blue)/0.3)]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-6 py-8 bg-background">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeId === item.id;
                
                return (
                  <li
                    key={item.id}
                    className={cn(
                      "transition-all duration-500 ease-out",
                      isOpen 
                        ? "translate-x-0 opacity-100" 
                        : "translate-x-8 opacity-0"
                    )}
                    style={{
                      transitionDelay: isOpen ? `${(index + 1) * 100}ms` : "0ms"
                    }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={handleMenuItemClick(item.id)}
                      className={cn(
                        "group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 bg-muted/50 border",
                        "hover:bg-gradient-to-r hover:from-[hsl(var(--neon-blue)/0.2)] hover:to-[hsl(var(--cyber-purple)/0.2)]",
                        "hover:border-[hsl(var(--neon-blue)/0.5)] hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)]",
                        isActive 
                          ? "bg-gradient-to-r from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--cyber-purple)/0.2)] border-[hsl(var(--neon-blue)/0.5)] text-foreground shadow-[0_0_20px_hsl(var(--neon-blue)/0.3)]" 
                          : "border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300",
                        "bg-gradient-to-br from-background to-muted border border-border",
                        "group-hover:border-[hsl(var(--neon-blue)/0.5)] group-hover:shadow-[0_0_15px_hsl(var(--neon-blue)/0.3)]",
                        "group-hover:scale-110",
                        isActive && "border-[hsl(var(--neon-blue)/0.5)] shadow-[0_0_15px_hsl(var(--neon-blue)/0.3)]"
                      )}>
                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <span className="font-medium text-lg tracking-wide transition-all duration-300 group-hover:translate-x-1">
                        {item.label}
                      </span>
                      <ArrowRight className="w-5 h-5 ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Actions */}
          <div 
            className={cn(
              "p-6 space-y-4 border-t border-border bg-background transition-all duration-700 ease-out",
              isOpen 
                ? "translate-y-0 opacity-100" 
                : "translate-y-8 opacity-0"
            )}
            style={{
              transitionDelay: isOpen ? "600ms" : "0ms"
            }}
          >
            <Button 
              variant="neon" 
              className="w-full justify-center group"
              onClick={() => setIsOpen(false)}
            >
              <Scan className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Sign In
            </Button>
            <Button 
              variant="hero" 
              className="w-full justify-center group"
              onClick={() => setIsOpen(false)}
            >
              Get Security Audit
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="h-2 w-2 rounded-full bg-[hsl(var(--electric-green))] animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground tracking-wider">
                SYSTEM SECURE
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};