import type { CSSProperties } from 'react';
import { asset } from '../lib/asset';

interface Props {
  /** Pad zonder extensie, bv. `assets/projects/nike`. */
  src: string;
  alt: string;
  /**
   * Intrinsieke afmetingen. Alleen nodig waar de container zelf geen
   * `aspect-ratio` afdwingt; anders bepaalt de container de ruimte al en zou een
   * afwijkende verhouding hier juist misleidend zijn.
   */
  width?: number;
  height?: number;
  /** Zet aan voor het beeld dat direct in beeld staat (de hero). */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Afbeelding met WebP en een JPEG-fallback.
 *
 * `npm run images` genereert van elke bron een `.webp` en een `.jpg`, dus hier
 * wordt alleen het pad zonder extensie doorgegeven. De `<picture>` staat op
 * `display:contents` (zie styles.css), zodat hij geen enkele invloed heeft op de
 * omliggende layout en de `<img>` zich precies gedraagt als voorheen.
 */
export default function Img({ src, alt, width, height, priority = false, className, style }: Props) {
  const base = asset(src);
  return (
    <picture>
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={`${base}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
        style={style}
      />
    </picture>
  );
}
