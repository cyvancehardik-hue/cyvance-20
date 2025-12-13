import { useCallback, useEffect, useRef, useState } from 'react';

// Post-human easing curves - no bounce, no overshoot
export const easing = {
  // Start slow, accelerate, vanish naturally
  narrative: [0.22, 0.03, 0.26, 1] as const,
  // Subtle intent detection
  intent: [0.32, 0, 0.24, 1] as const,
  // Ambient, barely noticeable
  ambient: [0.4, 0, 0.2, 1] as const,
  // Settling motion
  settle: [0.25, 0.1, 0.25, 1] as const,
  // Exit motion
  exit: [0.4, 0, 1, 1] as const,
};

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Device performance detection
export const useDevicePerformance = () => {
  const [performance, setPerformance] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 4;
    // Check device memory if available
    const memory = (navigator as any).deviceMemory || 8;
    
    if (cores <= 2 || memory <= 2) {
      setPerformance('low');
    } else if (cores <= 4 || memory <= 4) {
      setPerformance('medium');
    } else {
      setPerformance('high');
    }
  }, []);

  return performance;
};

// Intelligent scroll tracking
export const useScrollCamera = () => {
  const [scrollState, setScrollState] = useState({
    progress: 0,
    velocity: 0,
    direction: 'down' as 'up' | 'down',
    isSettling: false,
  });
  
  const lastScrollY = useRef(0);
  const velocityHistory = useRef<number[]>([]);
  const rafId = useRef<number>();
  const settleTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
        const delta = scrollY - lastScrollY.current;
        const velocity = delta;
        
        velocityHistory.current.push(Math.abs(velocity));
        if (velocityHistory.current.length > 5) {
          velocityHistory.current.shift();
        }
        
        const avgVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
        
        setScrollState({
          progress,
          velocity: avgVelocity,
          direction: delta >= 0 ? 'down' : 'up',
          isSettling: false,
        });
        
        lastScrollY.current = scrollY;
        
        // Detect settling
        if (settleTimeout.current) clearTimeout(settleTimeout.current);
        settleTimeout.current = setTimeout(() => {
          setScrollState(prev => ({ ...prev, isSettling: true, velocity: 0 }));
        }, 150);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
    };
  }, []);

  return scrollState;
};

// Magnetic button anticipation
export const useMagneticPull = (strength: number = 0.3) => {
  const elementRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      const pullRadius = Math.max(rect.width, rect.height) * 1.5;
      
      if (distance < pullRadius) {
        setIsNear(true);
        const pullStrength = (1 - distance / pullRadius) * strength;
        setOffset({
          x: distanceX * pullStrength,
          y: distanceY * pullStrength,
        });
      } else {
        setIsNear(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setIsNear(false);
      setOffset({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return { ref: elementRef, offset, isNear };
};

// Reading pace detection
export const useReadingPace = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const lastScrollTime = useRef(Date.now());
  const scrollDistances = useRef<number[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let pauseTimeout: NodeJS.Timeout;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const now = Date.now();
      const timeDelta = now - lastScrollTime.current;
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      
      if (timeDelta > 0) {
        const speed = scrollDelta / timeDelta;
        scrollDistances.current.push(speed);
        if (scrollDistances.current.length > 10) {
          scrollDistances.current.shift();
        }
        
        const avgSpeed = scrollDistances.current.reduce((a, b) => a + b, 0) / scrollDistances.current.length;
        
        if (avgSpeed < 0.3) {
          setReadingSpeed('slow');
        } else if (avgSpeed > 1.5) {
          setReadingSpeed('fast');
        } else {
          setReadingSpeed('normal');
        }
      }
      
      lastScrollY = window.scrollY;
      lastScrollTime.current = now;
      
      setIsPaused(false);
      clearTimeout(pauseTimeout);
      pauseTimeout = setTimeout(() => setIsPaused(true), 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(pauseTimeout);
    };
  }, []);

  return { isPaused, readingSpeed };
};

// Viewport intersection with intelligent timing
export const useNarrativeReveal = (options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [distanceFromCenter, setDistanceFromCenter] = useState(1);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (options?.once && hasRevealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setHasRevealed(true);
            
            // Calculate distance from viewport center
            const rect = entry.boundingClientRect;
            const viewportCenter = window.innerHeight / 2;
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(viewportCenter - elementCenter) / viewportCenter;
            setDistanceFromCenter(Math.max(0, Math.min(1, distance)));
          } else if (!options?.once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '-10% 0px -10% 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasRevealed, options?.once, options?.rootMargin, options?.threshold]);

  return { ref: elementRef, isVisible, hasRevealed, distanceFromCenter };
};
