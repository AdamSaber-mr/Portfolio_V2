import { useEffect, useState } from 'react';

/** Zelfde grens als de CSS: onder 761px krijgt de bezoeker de mobiele opzet. */
export const MOBILE_QUERY = '(max-width: 760px)';

/**
 * Vertelt of we op een telefoonformaat zitten.
 *
 * Het mobiele ontwerp is niet alleen kleiner, het toont andere onderdelen: een
 * ingeklapte bio, kortere kaarten, een lopende statusregel. Dat kan CSS niet
 * alleen, dus leest dit de mediaquery uit en herrendert het bij draaien van het
 * toestel. Buiten de browser (build-tijd) is het simpelweg `false`.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(MOBILE_QUERY).matches
      : false,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
