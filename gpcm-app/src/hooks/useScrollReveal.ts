import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver-based reveal.
 * - Entering viewport: items "fall in" with staggered delay
 * - Leaving (scroll away): they can "fly out" in reverse order when resetOnLeave is true
 */
export function useScrollReveal(itemCount: number, options?: { rootMargin?: string; threshold?: number }) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          // Reset so re-entry animates again (fall / fly cycle)
          setVisible(false);
        }
      },
      {
        root: null,
        rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
        threshold: options?.threshold ?? 0.12,
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.rootMargin, options?.threshold, itemCount]);

  return { containerRef, visible };
}

/** Stagger delay in ms for index i (enter) or reverse (exit feels sequential). */
export function staggerDelay(index: number, visible: boolean, total: number, step = 70): number {
  if (visible) return index * step;
  return (total - 1 - index) * step * 0.5;
}
