import type { CSSProperties } from 'react';

/**
 * Parse a CSS declaration string ("color:red; font-size:14px") into a React
 * style object. Lets us port the design's inline style strings verbatim.
 * Custom properties (--x) are preserved; other props are camel-cased.
 */
export function sx(css: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const decl of css.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const rawProp = decl.slice(0, i).trim();
    if (!rawProp) continue;
    const value = decl.slice(i + 1).trim();
    const prop = rawProp.startsWith('--')
      ? rawProp
      : rawProp.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[prop] = value;
  }
  return out as CSSProperties;
}
