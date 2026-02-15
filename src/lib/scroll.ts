// Enhanced easing functions for natural scroll feel
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutQuart = (t: number) => 
  1 - Math.pow(1 - t, 4);

export const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

export const smoothScrollTo = (targetY: number, duration = 800) => {
  const startY = window.scrollY || window.pageYOffset;
  const diff = targetY - startY;
  const start = performance.now();

  // Use native smooth scrolling if supported and no custom duration
  if ('scrollBehavior' in document.documentElement.style && duration === 800) {
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    return;
  }

  const step = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutQuart(progress); // Use more natural easing
    window.scrollTo({ top: startY + diff * eased, left: 0 });
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

export const scrollToId = (id: string, offset = 80, duration = 800) => {
  const el = document.getElementById(id);
  if (!el) return;
  
  const rect = el.getBoundingClientRect();
  const targetY = rect.top + window.scrollY - offset;
  smoothScrollTo(targetY, duration);
};

// Enhanced scroll utilities for anchor links
export const initSmoothScrolling = () => {
  // Handle anchor links automatically
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (link && link.hash) {
      e.preventDefault();
      const id = link.hash.substring(1);
      scrollToId(id);
      
      // Update URL without triggering scroll
      if (history.pushState) {
        history.pushState(null, '', link.hash);
      }
    }
  }, { passive: false });
};

// Throttled scroll handler for performance
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
