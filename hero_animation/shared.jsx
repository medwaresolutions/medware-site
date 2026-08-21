// shared.jsx — palette, timing, icons, shared components for "My Setup" video
// Theme: MedFlow palette on a dark "constellation" night sky.

// ── Timing map (seconds, synced to ElevenLabs VO ≈ 219s) ────────────────────
const T = {
  hook:          [0,    11.5],
  twoThings:     [11.5, 21.5],
  threeParts:    [21.5, 28.5],
  nebula:        [28.5, 39.5],
  constellation: [39.5, 66],
  views:         [66,   97.5],
  interlude:     [97.5, 103],
  team:          [103,  128],
  hierarchy:     [128,  150],
  taskFlow:      [150,  183],
  glue:          [183,  199],
  inOut:         [199,  215],
  closing:       [215,  219],
  duration: 219,
};

// ── Palette (MedFlow sky/slate, dark mode; accent via CSS vars for tweaks) ──
const PAL = {
  bg: '#0B1322',
  ink: '#f8fafc',
  body: '#94a3b8',
  dim: '#64748b',
  sky: 'var(--acc2)',     // #0ea5e9
  skyL: 'var(--acc1)',    // #38bdf8
  skyXL: 'var(--acc3)',   // #7dd3fc
  emerald: '#34d399',
  rose: '#fb7185',
  amber: '#fbbf24',
  glass: 'rgba(255,255,255,0.055)',
  glassBorder: 'rgba(255,255,255,0.13)',
  line: 'rgba(125,211,252,0.35)',
};
const FONT = "'Inter', system-ui, sans-serif";

// ── Video settings context (wired to Tweaks in the main file) ───────────────
const VideoSettings = React.createContext({ captions: true, showPrice: true });

// ── Icons (Lucide-style: 24×24, stroke 2, round caps) ───────────────────────
const ICON_PATHS = {
  mail: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M3 7l9 6 9-6',
  calendar: 'M4 5h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M3 10h18 M8 2v5 M16 2v5',
  check: 'M5 13l4 4L19 7',
  zap: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z',
  network: 'M12 3v5 M12 8a4 4 0 0 1 4 4 M12 8a4 4 0 0 0-4 4 M16 12l4 3 M8 12l-4 3 M12 8m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  phone: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M11 18h2',
  monitor: 'M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z M8 21h8 M12 17v4',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z M2.5 21v-1.5A5.5 5.5 0 0 1 8 14h2a5.5 5.5 0 0 1 5.5 5.5V21 M16.5 4.3a3.5 3.5 0 0 1 0 6.4 M19 14.2a5.5 5.5 0 0 1 2.5 4.6V21',
  shield: 'M12 2l8 3.5V12c0 4.8-3.4 8.3-8 10-4.6-1.7-8-5.2-8-10V5.5L12 2z',
  scale: 'M12 3v18 M8 21h8 M5 7l7-2 7 2 M5 7l-2.7 6a3 3 0 0 0 5.4 0L5 7z M19 7l-2.7 6a3 3 0 0 0 5.4 0L19 7z',
  chart: 'M5 21V11 M12 21V3 M19 21v-7',
  bug: 'M9 8a3 3 0 0 1 6 0v1H9V8z M7 9h10a2 2 0 0 1 2 2v4a7 7 0 0 1-14 0v-4a2 2 0 0 1 2-2z M3 13h2 M19 13h2 M12 9v11',
  code: 'M8 7l-5 5 5 5 M16 7l5 5-5 5',
  palette: 'M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.5 3.3c.6.7.2 2.7-2.5 2.7z M7.5 11.5h.01 M11 7.5h.01 M15.5 9.5h.01',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  briefcase: 'M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2 M3 13h18',
  inbox: 'M22 13h-5l-2 3h-6l-2-3H2 M4.5 5h15L22 13v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5L4.5 5z',
  mic: 'M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z M5 11a7 7 0 0 0 14 0 M12 18v4',
  dollar: 'M12 2v20 M16.5 6.5h-6a3 3 0 0 0 0 6h3a3 3 0 0 1 0 6h-6',
  refresh: 'M21 12a9 9 0 1 1-2.6-6.3 M21 3v5h-5',
  library: 'M5 3v18 M9 3v18 M13 4l5 1-3.5 16-5-1L13 4z',
  headset: 'M4 14v-2a8 8 0 0 1 16 0v2 M3 15a2 2 0 0 1 2-2h1v6H5a2 2 0 0 1-2-2v-2z M21 15a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2z',
  pulse: 'M3 12h4l2-7 4 14 2-7h6',
  database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M15.5 8.5l-2 5-5 2 2-5 5-2z',
  graduation: 'M12 4L2 9l10 5 10-5-10-5z M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5 M22 9v5',
  file: 'M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M14 2v5h5',
  flag: 'M5 21V4 M5 4c3-2 6 2 9 0s5-1 5-1v10s-2-1-5 1-6-2-9 0',
  plus: 'M12 5v14 M5 12h14',
  minus: 'M5 12h14',
  sparkle: 'M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z',
};
function Icon({ name, size = 24, color = PAL.skyL, sw = 2, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <path d={ICON_PATHS[name]} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}

// ── Seeded pseudo-random ────────────────────────────────────────────────────
function seeded(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 11) % 2147483647; return (s % 10000) / 10000; };
}

// ── Backdrop: night sky, stars, grid, orbs (persistent across scenes) ──────
function Backdrop() {
  const stars = React.useMemo(() => {
    const r = seeded(42);
    return Array.from({ length: 110 }, (_, i) => ({
      x: r() * 1920, y: r() * 1080, s: 1 + r() * 2.2, o: 0.15 + r() * 0.5, d: r() * 6,
    }));
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(1200px 800px at 30% 20%, #11203a 0%, #0B1322 55%, #070d18 100%)' }}></div>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.5,
        backgroundImage: 'linear-gradient(rgba(125,211,252,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 75%)',
      }}></div>
      {stars.map((st, i) => (
        <div key={i} style={{
          position: 'absolute', left: st.x, top: st.y, width: st.s, height: st.s,
          borderRadius: '50%', background: '#cfe9ff', opacity: st.o,
          animation: `twinkle 4.5s ease-in-out ${st.d}s infinite`,
        }}></div>
      ))}
      <div className="orb" style={{ position: 'absolute', left: -200, top: -150, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(2,132,199,0.16), transparent 65%)', filter: 'blur(40px)', animation: 'drift 11s ease-in-out infinite' }}></div>
      <div className="orb" style={{ position: 'absolute', right: -250, bottom: -200, width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.1), transparent 65%)', filter: 'blur(40px)', animation: 'drift 13s ease-in-out 2s infinite reverse' }}></div>
    </div>
  );
}

// ── Scene: Sprite + fade envelope ───────────────────────────────────────────
function SceneInner({ children, fade }) {
  const { localTime, duration } = useSprite();
  const op = Math.min(1, localTime / fade, Math.max(0, (duration - localTime) / fade));
  return <div style={{ position: 'absolute', inset: 0, opacity: clamp(op, 0, 1) }}>{children}</div>;
}
function Scene({ at, fade = 0.4, children }) {
  return (
    <Sprite start={at[0]} end={at[1]}>
      <SceneInner fade={fade}>{children}</SceneInner>
    </Sprite>
  );
}

// ── Entry helper: fade-up driven by scene localTime ─────────────────────────
function FadeIn({ delay = 0, dur = 0.55, dy = 22, scaleFrom = 1, children, style = {} }) {
  const { localTime } = useSprite();
  const t = clamp((localTime - delay) / dur, 0, 1);
  const e = Easing.easeOutCubic(t);
  return (
    <div style={{
      opacity: e, transform: `translateY(${(1 - e) * dy}px) scale(${scaleFrom + (1 - scaleFrom) * e})`,
      willChange: 'transform, opacity', ...style,
    }}>{children}</div>
  );
}

// ── Caption: bottom pull-quote; *word* → gradient accent ────────────────────
function renderAccented(text) {
  const parts = String(text).split('*');
  return parts.map((p, i) => i % 2 === 1
    ? <span key={i} className="grad-text">{p}</span>
    : <span key={i}>{p}</span>);
}
function Caption({ text, delay = 0, size = 44, y = 952 }) {
  const { captions } = React.useContext(VideoSettings);
  if (!captions) return null;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <FadeIn delay={delay} dy={16}>
        <div style={{
          fontFamily: FONT, fontSize: size, fontWeight: 600, letterSpacing: '-0.02em',
          color: '#e2e8f0', textAlign: 'center', maxWidth: 1500, lineHeight: 1.2,
          textShadow: '0 2px 24px rgba(7,13,24,0.9)',
        }}>{renderAccented(text)}</div>
      </FadeIn>
    </div>
  );
}

// ── Glass card ───────────────────────────────────────────────────────────────
function Glass({ children, style = {}, glow = false }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))',
      border: `1px solid ${PAL.glassBorder}`,
      borderRadius: 24,
      backdropFilter: 'blur(14px)',
      boxShadow: glow
        ? '0 8px 40px rgba(2,132,199,0.28), inset 0 1px 0 rgba(255,255,255,0.14)'
        : '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
      ...style,
    }}>{children}</div>
  );
}

// ── Node chip (icon tile + label) ───────────────────────────────────────────
function NodeChip({ icon, label, sub, size = 1, active = false, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 * size, ...style }}>
      <div style={{
        width: 92 * size, height: 92 * size, borderRadius: 24 * size,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active
          ? 'linear-gradient(135deg, var(--acc2), var(--acc1))'
          : 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
        border: `1px solid ${active ? 'rgba(255,255,255,0.35)' : PAL.glassBorder}`,
        boxShadow: active ? '0 0 50px rgba(56,189,248,0.45)' : '0 8px 28px rgba(0,0,0,0.35)',
      }}>
        <Icon name={icon} size={44 * size} color={active ? '#fff' : 'var(--acc1)'}></Icon>
      </div>
      <div style={{ textAlign: 'center', fontFamily: FONT }}>
        <div style={{ fontSize: 30 * size, fontWeight: 700, color: PAL.ink, letterSpacing: '-0.02em' }}>{label}</div>
        {sub ? <div style={{ fontSize: 20 * size, fontWeight: 500, color: PAL.body, marginTop: 4 }}>{sub}</div> : null}
      </div>
    </div>
  );
}

// ── SVG line that draws itself (progress 0..1) ──────────────────────────────
function DrawPath({ d, p = 1, color = PAL.line, width = 2.5, dash = false, glowing = false }) {
  return (
    <path d={d} pathLength="1" fill="none"
      stroke={color} strokeWidth={width} strokeLinecap="round"
      strokeDasharray={dash ? '0.02 0.018' : '1'}
      strokeDashoffset={dash ? 0 : 1 - clamp(p, 0, 1)}
      style={{ opacity: dash ? clamp(p, 0, 1) : 1, filter: glowing ? 'drop-shadow(0 0 6px rgba(56,189,248,0.8))' : 'none' }}></path>
  );
}

// ── Dot travelling along a straight segment ────────────────────────────────
function FlowDot({ x1, y1, x2, y2, t, size = 9, color = 'var(--acc1)' }) {
  const p = clamp(t, 0, 1);
  return (
    <div style={{
      position: 'absolute',
      left: x1 + (x2 - x1) * p - size / 2,
      top: y1 + (y2 - y1) * p - size / 2,
      width: size, height: size, borderRadius: '50%',
      background: color, boxShadow: `0 0 14px ${color === 'var(--acc1)' ? 'rgba(56,189,248,0.9)' : color}`,
      opacity: p > 0 && p < 1 ? 1 : 0,
    }}></div>
  );
}

// ── Audio sync: audio element follows / leads the Stage timeline ────────────
function AudioSync({ src }) {
  const { time, playing, setTime, setPlaying } = useTimeline();
  const ref = React.useRef(null);

  React.useEffect(() => {
    const a = ref.current; if (!a) return;
    if (playing) { a.play().catch(() => setPlaying(false)); }
    else { a.pause(); }
  }, [playing]);

  // Seek audio when timeline jumps (scrub) — generous threshold while playing
  React.useEffect(() => {
    const a = ref.current; if (!a || !isFinite(a.duration)) return;
    const thr = playing ? 0.6 : 0.05;
    if (Math.abs(a.currentTime - time) > thr) {
      a.currentTime = clamp(time, 0, Math.max(0, a.duration - 0.05));
    }
  }, [time, playing]);

  // While playing, audio is the master clock (kills rAF drift)
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const a = ref.current;
      if (!a || a.paused || a.seeking) return;
      setTime(a.currentTime);
    }, 300);
    return () => clearInterval(id);
  }, [playing]);

  return <audio ref={ref} src={src} preload="auto"></audio>;
}

// ── data-screen-label timecode on the canvas root ───────────────────────────
function TimecodeLabel() {
  const { time, setTime, setPlaying } = useTimeline();
  const ref = React.useRef(null);
  const sec = Math.floor(time);
  React.useEffect(() => {
    window.__seek = setTime;
    window.__setPlaying = setPlaying;
  }, [setTime, setPlaying]);
  React.useEffect(() => {
    const root = ref.current ? ref.current.parentElement : null;
    if (root) root.setAttribute('data-screen-label', `t=${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`);
  }, [sec]);
  return <div ref={ref} style={{ display: 'none' }}></div>;
}

Object.assign(window, {
  T, PAL, FONT, VideoSettings, Icon, ICON_PATHS, seeded,
  Backdrop, Scene, FadeIn, Caption, renderAccented, Glass, NodeChip,
  DrawPath, FlowDot, AudioSync, TimecodeLabel,
});
