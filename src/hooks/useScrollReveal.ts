import { useEffect } from "react";

export type ScrollRevealOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};

export default function useScrollReveal(options: ScrollRevealOptions = {}) {
  useEffect(() => {
    const {
      rootMargin = "0px 0px -5% 0px",
      threshold = 0.1,
    } = options;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
    );
    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Add a small delay for staggered animations
            const delay = Array.from(entry.target.parentElement?.children || [])
              .indexOf(entry.target) * 50;
            
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay);
            
            observer.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    elements.forEach((el, index) => {
      // Performance optimizations
      el.style.contain = "layout style paint";
      el.style.willChange = "opacity, transform";
      
      // Stagger initial setup to prevent layout thrashing
      requestAnimationFrame(() => {
        obs.observe(el);
      });
    });

    return () => {
      obs.disconnect();
      // Clean up will-change on unmount
      elements.forEach(el => {
        el.style.willChange = "auto";
      });
    };
  }, [options.rootMargin, JSON.stringify(options.threshold)]);
}
