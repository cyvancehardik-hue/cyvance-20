import { useEffect, useState } from "react";

const defaultOffset = 80;

export default function useScrollSpy(
  ids: readonly string[],
  offset: number = defaultOffset
) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY + offset + 1;
      let current: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (scrollY >= top) {
          current = id;
        }
      }
      setActiveId(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids.join(","), offset]);

  return activeId;
}
