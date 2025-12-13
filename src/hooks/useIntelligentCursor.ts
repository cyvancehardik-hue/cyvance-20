import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './useIntelligentMotion';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  hoverType: 'default' | 'link' | 'button' | 'text' | 'interactive';
  isPressed: boolean;
  isVisible: boolean;
  velocity: number;
}

export const useIntelligentCursor = () => {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    hoverType: 'default',
    isPressed: false,
    isVisible: false,
    velocity: 0,
  });

  const lastPosition = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();
  const velocityHistory = useRef<number[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        const dx = e.clientX - lastPosition.current.x;
        const dy = e.clientY - lastPosition.current.y;
        const velocity = Math.sqrt(dx ** 2 + dy ** 2);
        
        velocityHistory.current.push(velocity);
        if (velocityHistory.current.length > 5) {
          velocityHistory.current.shift();
        }
        const avgVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;

        // Detect hover target type
        const target = e.target as HTMLElement;
        let hoverType: CursorState['hoverType'] = 'default';
        
        if (target.closest('a, [role="link"]')) {
          hoverType = 'link';
        } else if (target.closest('button, [role="button"], input[type="submit"]')) {
          hoverType = 'button';
        } else if (target.closest('input, textarea, [contenteditable="true"]')) {
          hoverType = 'text';
        } else if (target.closest('[data-interactive], .interactive')) {
          hoverType = 'interactive';
        }

        setCursor(prev => ({
          ...prev,
          x: e.clientX,
          y: e.clientY,
          hoverType,
          isHovering: hoverType !== 'default',
          velocity: avgVelocity,
          isVisible: true,
        }));

        lastPosition.current = { x: e.clientX, y: e.clientY };
      });
    };

    const handleMouseDown = () => {
      setCursor(prev => ({ ...prev, isPressed: true }));
    };

    const handleMouseUp = () => {
      setCursor(prev => ({ ...prev, isPressed: false }));
    };

    const handleMouseLeave = () => {
      setCursor(prev => ({ ...prev, isVisible: false }));
    };

    const handleMouseEnter = () => {
      setCursor(prev => ({ ...prev, isVisible: true }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return cursor;
};
