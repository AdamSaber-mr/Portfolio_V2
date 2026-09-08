import { useEffect, useRef, useState } from 'react';
import { sx } from '../lib/sx';
import {
  FEATURED_TRACK, TRACKS_RECENT, spotifySearchUrl, fetchChartTracks, artUrl,
  type Track, type ChartTracks, type Strings,
} from '../data';

function PlayIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>;
}
function PauseIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>;
}

function fmt(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** Albumhoes in hetzelfde kader als de projectplaten, maar klein. */
function Art({ track, px }: { track: Track; px: number }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <span className="np-art" aria-hidden="true" />;
  return (
    <span className="np-art" aria-hidden="true">
      <img
        src={artUrl(track.art, px)}
        alt=""
        width={px}
        height={px}
        loading="lazy"
        decoding="async"
        onError={() => setOk(false)}
      />
    </span>
  );
}

/**
 * "Waar ik nu naar luister" — bewust teruggebracht tot metadata.
 *
 * Dit blok was het luidste van de hele homepage: een grote gekleurde kaart met
 * vier gekleurde rijen en witte cirkelknoppen, die visueel over de projecten heen
 * schreeuwde. Het is nu een gelijnde lijst naast de statusregels. De audio-preview
 * blijft werken — dat is een echt technisch detail, het hoefde alleen niet het
 * eerste te zijn wat je ziet.
 */
export default function NowPlaying({ s }: { s: Strings }) {
  const [chart, setChart] = useState<ChartTracks | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pas ophalen wanneer de browser niets beters te doen heeft: dit staat onderaan
  // de pagina en mag de eerste load niet vertragen.
  useEffect(() => {
    let active = true;
    const load = () => fetchChartTracks().then((c) => { if (active && c) setChart(c); });
    const idle = 'requestIdleCallback' in window;
    const handle = idle ? window.requestIdleCallback(load, { timeout: 3000 }) : window.setTimeout(load, 1200);
    return () => {
      active = false;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setElapsed(audio.currentTime);
    const onEnd = () => { setPlaying(null); setElapsed(0); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      audio.pause();
    };
  }, []);

  const featured = chart?.featured ?? FEATURED_TRACK;
  const list = (chart ? chart.recent : TRACKS_RECENT).slice(0, 4);

  const toggle = (t: Track) => {
    const audio = audioRef.current;
    if (!t.preview || !audio) { window.open(spotifySearchUrl(t), '_blank', 'noopener,noreferrer'); return; }
    if (playing === t.preview) { audio.pause(); setPlaying(null); return; }
    audio.src = t.preview;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setPlaying(t.preview);
    setElapsed(0);
  };

  const isPlaying = (t: Track) => !!t.preview && playing === t.preview;

  const row = (t: Track, px: number, lead = false) => (
    <button
      key={t.id || t.title}
      type="button"
      className={`np-line${lead ? ' np-line--lead' : ''}`}
      onClick={() => toggle(t)}
      aria-label={`${isPlaying(t) ? 'Pause' : 'Play'} ${t.title} — ${t.artist}`}
    >
      <Art track={t} px={px} />
      <span className="np-text">
        <span className="np-title">{t.title}</span>
        <span className="np-artist">{t.artist}</span>
      </span>
      <span className="np-dur">{isPlaying(t) ? fmt(elapsed) : t.dur}</span>
      <span className="np-icon">{isPlaying(t) ? <PauseIcon /> : <PlayIcon />}</span>
    </button>
  );

  return (
    <div>
      <audio ref={audioRef} preload="none" />
      <p className="strip-key" style={sx('margin-bottom:var(--s-4);')}>{s.spotifyTitle}</p>
      {row(featured, 96, true)}
      {list.map((t) => row(t, 72))}
    </div>
  );
}
