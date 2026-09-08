import { useEffect } from 'react';

/**
 * Onthult elementen met [data-reveal] zodra ze in beeld scrollen, met een kleine
 * stagger per groepje.
 *
 * Draait bewust in `useEffect` en niet in `useLayoutEffect`: layout-effects
 * blokkeren de eerste paint, en dit werk hoeft niet af te zijn voordat er iets op
 * het scherm staat.
 *
 * De MutationObserver is essentieel, niet decoratief: alle pagina's behalve Home
 * worden lazy geladen, dus op het moment dat dit effect draait bestaan hun
 * elementen nog niet. Zonder deze observer worden ze nooit geobserveerd en
 * blijven ze permanent op `opacity: 0` staan — een lege pagina dus.
 */
export function useReveal(dep: unknown) {
  useEffect(() => {
    const root = document.getElementById('main') ?? document.body;
    const known = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        // Alles wat in dezelfde batch binnenkomt krijgt oplopend wat vertraging,
        // zodat een rij kaarten na elkaar verschijnt in plaats van tegelijk.
        let i = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = Math.min(i++, 7) * 0.08 + 's';
          el.classList.add('is-in');
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );

    const scan = () => {
      for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
        if (known.has(el)) continue;
        known.add(el);
        el.classList.remove('is-in');
        io.observe(el);
      }
    };
    scan();

    // Samenvoegen per frame: bij het typen in het formulier verschijnen en
    // verdwijnen foutmeldingen, en dan hoeft er niet per mutatie gescand te worden.
    let frame = 0;
    const mo = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; scan(); });
    });
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      mo.disconnect();
      io.disconnect();
    };
  }, [dep]);
}
