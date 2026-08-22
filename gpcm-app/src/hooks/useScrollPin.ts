import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

export type PinPhase = 'before' | 'pinned' | 'after';

/**
 * True zero-movement scroll pinning.
 *
 * Unlike position:sticky (which releases and starts drifting with the page
 * once its tall wrapper runs out of room), this keeps the pinned element on
 * position:fixed for the entire time its wrapper is taller than the
 * viewport, then parks it flush at the wrapper's bottom edge — exactly
 * where the next section begins — so it never visibly moves; it's simply
 * covered as the next section slides up over it, and un-covered again on
 * scroll back up.
 *
 * Usage:
 *   const { wrapperRef, pinStyle } = useScrollPin<HTMLElement>();
 *   <section ref={wrapperRef} className="relative h-[140vh]">
 *     <div style={pinStyle}>...video/content...</div>
 *   </section>
 */
export function useScrollPin<T extends HTMLElement>() {
  const wrapperRef = useRef<T>(null);
  const [phase, setPhase] = useState<PinPhase>('before');

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let ticking = false;

    const measure = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.top > 0) {
        setPhase('before');
      } else if (rect.bottom <= vh) {
        setPhase('after');
      } else {
        setPhase('pinned');
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const pinStyle: CSSProperties =
    phase === 'pinned'
      ? { position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh' }
      : phase === 'after'
      ? { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100vh' }
      : { position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' };

  return { wrapperRef, phase, pinStyle };
}
