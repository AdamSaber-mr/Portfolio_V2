import { useLayoutEffect } from 'react';

/**
 * Reveals elements marked with [data-reveal] as they scroll into view, with a
 * small per-sibling stagger. Re-runs whenever `dep` changes (e.g. the page),
 * since each page mounts fresh data-reveal elements.
 */
export function useReveal(dep: unknown) {
  useLayoutEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    els.forEach((el) => {
      const sibs = Array.from(el.parentElement?.children ?? []).filter(
        (c) => c instanceof HTMLElement && c.hasAttribute('data-reveal'),
      );
      const idx = Math.max(0, sibs.indexOf(el));
      el.style.transitionDelay = Math.min(idx, 7) * 0.1 + 's';
      el.classList.remove('is-in');
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [dep]);
}
