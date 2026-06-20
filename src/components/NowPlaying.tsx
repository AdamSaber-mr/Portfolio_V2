import { useEffect, useRef, useState } from 'react';
import { sx } from '../lib/sx';
import { clickable } from '../lib/a11y';
import {
  FEATURED_TRACK, TRACKS_RECENT, TRACKS_TOP, spotifySearchUrl, fetchChartTracks,
  type Track, type ChartTracks, type Strings,
} from '../data';

const SPOTIFY_ICON = 'https://cdn.simpleicons.org/spotify/ffffff';

function PlayIcon({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>;
}
function PauseIcon({ size = 15 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>;
}
function PlusIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function fmt(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** Album art that falls back to its tile colour if the image fails to load. */
function Art({ track, radius }: { track: Track; radius: number }) {
  const [ok, setOk] = useState(true);
  return (
    <div style={sx(`position:relative; width:100%; height:100%; border-radius:${radius}px; overflow:hidden; background:${track.color}; box-shadow:0 14px 34px -16px rgba(0,0,0,.7);`)}>
      {ok && (
        <img
          src={track.art}
          alt={`${track.title} — ${track.artist}`}
          loading="lazy"
          onError={() => setOk(false)}
          style={sx('position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block;')}
        />
      )}
    </div>
  );
}

export default function NowPlaying({ s }: { s: Strings }) {
  const [chart, setChart] = useState<ChartTracks | null>(null);
  const [tab, setTab] = useState<'recent' | 'top'>('recent');
  const [playing, setPlaying] = useState<string | null>(null); // preview URL of the active track
  const [progress, setProgress] = useState(0); // 0..1 of the active preview
  const [elapsed, setElapsed] = useState(0); // seconds into the active preview
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // pull popular tracks from the Apple chart feed; keep the static list as fallback
  useEffect(() => {
    let active = true;
    fetchChartTracks().then((c) => { if (active && c) setChart(c); });
    return () => { active = false; };
  }, []);

  // wire up the shared audio element once
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
      setElapsed(audio.currentTime);
    };
    const onEnd = () => { setPlaying(null); setProgress(0); setElapsed(0); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      audio.pause();
    };
  }, []);

  const featured = chart?.featured ?? FEATURED_TRACK;
  const list = chart ? (tab === 'recent' ? chart.recent : chart.top) : (tab === 'recent' ? TRACKS_RECENT : TRACKS_TOP);

  const toggle = (t: Track) => {
    const audio = audioRef.current;
    if (!t.preview || !audio) { window.open(spotifySearchUrl(t), '_blank', 'noopener,noreferrer'); return; }
    if (playing === t.preview) { audio.pause(); setPlaying(null); return; }
    audio.src = t.preview;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setPlaying(t.preview);
    setProgress(0);
    setElapsed(0);
  };

  const isPlaying = (t: Track) => !!t.preview && playing === t.preview;

  const tabBtn = (id: 'recent' | 'top', label: string) => (
    <span
      {...clickable(() => setTab(id))}
      style={sx(`padding:8px 16px; border-radius:30px; font-family:'JetBrains Mono',monospace; font-size:12.5px; font-weight:600; cursor:pointer; transition:background .2s,color .2s; ${
        tab === id ? 'background:var(--ink); color:var(--bg);' : 'color:var(--muted);'
      }`)}
    >
      {label}
    </span>
  );

  return (
    <div className="page-pad" style={sx('max-width:1440px; margin:0 auto; padding:36px 56px 56px;')}>
      <audio ref={audioRef} preload="none" />

      <div data-reveal="" style={sx('display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:24px;')}>
        <div style={sx('display:flex; align-items:center; gap:11px;')}>
          <img src="https://cdn.simpleicons.org/spotify/1DB954" alt="" width={22} height={22} style={sx('display:block;')} />
          <h2 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(22px,3vw,34px); font-weight:700; letter-spacing:-.02em;")}>{s.spotifyTitle}</h2>
        </div>
        <div style={sx('display:inline-flex; gap:4px; padding:4px; background:var(--surface); border:1px solid var(--line); border-radius:30px;')}>
          {tabBtn('recent', s.tabRecent)}
          {tabBtn('top', s.tabTop)}
        </div>
      </div>

      <div className="np-grid" data-reveal="" style={sx('display:grid; grid-template-columns:1.25fr 1fr; gap:20px; align-items:stretch;')}>

        {/* featured track */}
        <div style={sx(`position:relative; background:${featured.color}; border-radius:22px; padding:26px; display:flex; flex-direction:column; overflow:hidden; color:#fff;`)}>
          <div style={sx('position:absolute; inset:0; background:linear-gradient(160deg, rgba(255,255,255,.12), transparent 55%); pointer-events:none;')}></div>
          <img src={SPOTIFY_ICON} alt="Spotify" width={26} height={26} style={sx('position:absolute; top:22px; right:22px; opacity:.9;')} />
          <div style={sx('width:62%; max-width:230px; aspect-ratio:1/1; margin:14px auto 8px;')}>
            <Art track={featured} radius={14} />
          </div>
          <div style={sx('margin-top:auto;')}>
            <h3 style={sx("font-family:'Space Grotesk',sans-serif; font-size:clamp(22px,2.6vw,30px); font-weight:700; letter-spacing:-.01em; line-height:1.05; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;")}>{featured.title}</h3>
            <p style={sx('font-size:15px; margin-top:4px; color:rgba(255,255,255,.7);')}>{featured.artist}</p>
            <span
              {...clickable(() => window.open(spotifySearchUrl(featured), '_blank', 'noopener,noreferrer'))}
              style={sx('display:inline-flex; align-items:center; gap:9px; margin-top:16px; font-size:13.5px; font-weight:600; color:rgba(255,255,255,.92); cursor:pointer;')}
            >
              <span style={sx('display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; border-radius:50%; border:1.5px solid rgba(255,255,255,.7);')}><PlusIcon size={15} /></span>
              {s.saveSpotify}
            </span>
            <div style={sx('display:flex; align-items:center; gap:14px; margin-top:18px;')}>
              <div style={sx('flex:1; height:4px; border-radius:3px; background:rgba(255,255,255,.22); overflow:hidden;')}>
                <div style={sx(`width:${(isPlaying(featured) ? progress * 100 : 0).toFixed(1)}%; height:100%; background:rgba(255,255,255,.9); transition:width .25s linear;`)}></div>
              </div>
              <span style={sx("font-family:'JetBrains Mono',monospace; font-size:12px; color:rgba(255,255,255,.8);")}>{isPlaying(featured) ? fmt(elapsed) : featured.dur}</span>
              <span
                {...clickable(() => toggle(featured), `${isPlaying(featured) ? 'Pause' : 'Play'} ${featured.title}`)}
                className="np-play"
                style={sx('display:inline-flex; align-items:center; justify-content:center; width:46px; height:46px; border-radius:50%; background:#fff; color:#111; flex:none; cursor:pointer;')}
              >
                {isPlaying(featured) ? <PauseIcon size={17} /> : <PlayIcon size={17} />}
              </span>
            </div>
          </div>
        </div>

        {/* track list */}
        <div style={sx('display:flex; flex-direction:column; gap:12px;')}>
          {list.map((t, i) => (
            <div
              key={t.id || `${tab}-${i}`}
              {...clickable(() => toggle(t), `${isPlaying(t) ? 'Pause' : 'Play'} ${t.title} — ${t.artist}`)}
              className="np-row"
              style={sx(`display:flex; align-items:center; gap:14px; padding:11px 14px; border-radius:14px; background:${t.color}; border:1px solid rgba(255,255,255,.07); color:#fff; cursor:pointer; flex:1;`)}
            >
              <div style={sx('width:54px; height:54px; flex:none;')}>
                <Art track={t} radius={9} />
              </div>
              <div style={sx('flex:1; min-width:0;')}>
                <div style={sx("font-family:'Space Grotesk',sans-serif; font-size:15.5px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;")}>{t.title}</div>
                <div style={sx('font-size:13px; color:rgba(255,255,255,.62); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:2px;')}>{t.artist}</div>
                <div style={sx('display:flex; align-items:center; gap:9px; margin-top:8px;')}>
                  <div style={sx('flex:1; height:3px; border-radius:2px; background:rgba(255,255,255,.2); overflow:hidden;')}>
                    <div style={sx(`width:${(isPlaying(t) ? progress * 100 : 0).toFixed(1)}%; height:100%; border-radius:2px; background:rgba(255,255,255,.75); transition:width .25s linear;`)}></div>
                  </div>
                  <span style={sx("font-family:'JetBrains Mono',monospace; font-size:11.5px; color:rgba(255,255,255,.7);")}>{isPlaying(t) ? fmt(elapsed) : t.dur}</span>
                </div>
              </div>
              <span className="np-play" style={sx('display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:50%; background:#fff; color:#111; flex:none;')}>
                {isPlaying(t) ? <PauseIcon size={15} /> : <PlayIcon size={15} />}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
