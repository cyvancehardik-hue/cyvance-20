import { useEffect, useRef } from "react";

export const AnimatedCounter = ({ value, duration = 1500 }: { value: number; duration?: number }) => {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const start = performance.now();
    const startVal = 0;
    const endVal = value;

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.floor(startVal + (endVal - startVal) * eased);
      el.textContent = current.toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span ref={elRef} className="tabular-nums" aria-live="polite" />;
};
