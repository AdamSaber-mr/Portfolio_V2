import type { KeyboardEvent } from 'react';

/**
 * Makes a non-button element behave like a button: clickable with the mouse and
 * operable with Enter/Space, exposed to assistive tech as a button. Spread the
 * result onto the element, e.g. `<span {...clickable(onGo)} />`.
 */
export function clickable(onActivate: () => void, label?: string) {
  return {
    role: 'button' as const,
    tabIndex: 0,
    'aria-label': label,
    onClick: onActivate,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate();
      }
    },
  };
}
