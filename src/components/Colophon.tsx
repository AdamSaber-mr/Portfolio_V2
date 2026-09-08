import { sx } from '../lib/sx';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../data';

/**
 * De afsluitende regel onderaan elke pagina.
 *
 * Bewust één mono-regel tussen haarlijnen in plaats van een voettekstblok: op
 * papier sluit een colofon een uitgave af, hij begint geen nieuwe sectie.
 */
export default function Colophon() {
  return (
    <footer className="colophon">
      <span>Adam Saber</span>
      <span>Rotterdam</span>
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      <a href="https://github.com/adamsaber-mr" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
      {LINKEDIN_URL && (
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
      )}
      <span style={sx('margin-left:auto;')}>© 2026</span>
    </footer>
  );
}
