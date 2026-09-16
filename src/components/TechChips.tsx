import { sx } from '../lib/sx';
import { buildStackChips } from '../data';

interface Props {
  stack: string;
  justify?: string;
}

/** Renders a stack string ("React · TypeScript · Vite") as coloured tech chips. */
export default function TechChips({ stack, justify = 'flex-start' }: Props) {
  const chips = buildStackChips(stack);
  return (
    <div style={sx(`display:flex; flex-wrap:wrap; gap:7px; justify-content:${justify};`)}>
      {chips.map((c, i) => (
        <span key={i} style={sx(c.style)}>
          {c.icon && <img src={c.icon} alt="" loading="lazy" style={{ width: '14px', height: '14px', display: 'block', opacity: c.iconOpacity }} />}
          {c.label}
        </span>
      ))}
    </div>
  );
}
