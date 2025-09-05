import { useEffect } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { initSmoothScrolling } from "@/lib/scroll";

const ScrollRevealInit = () => {
  useScrollReveal();
  
  useEffect(() => {
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
  }, []);
  
  return null;
};

export default ScrollRevealInit;
