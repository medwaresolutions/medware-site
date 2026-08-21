// scenes-a.jsx — S1 Hook, S2 Two Things, S3 Three Parts, S4 Nebula
// All Sprite windows use GLOBAL timeline seconds from window.T

// ── Camera helper: keyframed pan/zoom inside a scene ────────────────────────
function Cam({ kf, children }) {
  // kf: [[localT, x, y, scale], ...]
  const { localTime } = useSprite();
  const ts = kf.map((k) => k[0]);
  const x = interpolate(ts, kf.map((k) => k[1]), Easing.easeInOutSine)(localTime);
  const y = interpolate(ts, kf.map((k) => k[2]), Easing.easeInOutSine)(localTime);
  const s = interpolate(ts, kf.map((k) => k[3]), Easing.easeInOutSine)(localTime);
  return (
    <div style={{ position: 'absolute', inset: 0, transform: `translate(${x}px, ${y}px) scale(${s})`, transformOrigin: 'center', willChange: 'transform' }}>
      {children}
    </div>
  );
}

// ── S1 · HOOK (0–11.5) "Not long ago I had a team… now it's just me" ────────
function SceneHook() {
  const [t0] = T.hook;
  return (
    <Scene at={T.hook}>
      <Cam kf={[[0, 0, 0, 1], [11.5, 0, -10, 1.07]]}>
        <HookCluster></HookCluster>
      </Cam>
      <Scene at={[t0 + 0.8, t0 + 3.0]}><Caption text="Not long ago: a whole team." y={920}></Caption></Scene>
      <Scene at={[t0 + 3.4, t0 + 5.8]}><Caption text="Now it's *just me*." y={920}></Caption></Scene>
      <Scene at={[t0 + 6.2, T.hook[1]]}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26 }}>
          <FadeIn delay={0.1} dy={26}>
            <div style={{ fontFamily: FONT, fontSize: 88, fontWeight: 700, letterSpacing: '-0.02em', color: PAL.ink, textAlign: 'center' }}>
              Twenty-plus products. <span className="grad-text">One person.</span>
            </div>
          </FadeIn>
          <FadeIn delay={1.3} dy={14}>
            <div style={{
              fontFamily: FONT, fontSize: 28, fontWeight: 600, color: PAL.amber,
              border: '1px solid rgba(251,191,36,0.35)', background: 'rgba(251,191,36,0.08)',
              padding: '12px 30px', borderRadius: 9999,
            }}>…with a bit of ADHD thrown in</div>
          </FadeIn>
        </div>
      </Scene>
    </Scene>
  );
}

function HookCluster() {
  const { localTime } = useSprite();
  const dots = React.useMemo(() => {
    const r = seeded(7);
    return Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2 + r() * 0.5;
      const rad = 170 + r() * 130;
      return { x: 960 + Math.cos(a) * rad * 1.45, y: 420 + Math.sin(a) * rad * 0.78, j: r() };
    });
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {dots.map((d, i) => {
        const inT = clamp((localTime - (0.3 + i * 0.07)) / 0.4, 0, 1);
        const outStart = 3.4 + i * 0.17;
        const outT = clamp((localTime - outStart) / 0.5, 0, 1);
        const op = Easing.easeOutCubic(inT) * (1 - Easing.easeInCubic(outT));
        if (op <= 0.01) return null;
        return (
          <div key={i} style={{
            position: 'absolute', left: d.x - 33, top: d.y - 33, width: 66, height: 66,
            borderRadius: '50%', opacity: op, transform: `scale(${0.7 + 0.3 * inT - 0.3 * outT})`,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
            border: `1px solid ${PAL.glassBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="users" size={28} color={PAL.dim}></Icon>
          </div>
        );
      })}
      {/* the one who stays */}
      <MeDot localTime={localTime}></MeDot>
    </div>
  );
}
function MeDot({ localTime }) {
  const inT = Easing.easeOutBack(clamp((localTime - 0.2) / 0.6, 0, 1));
  const glow = Easing.easeInOutSine(clamp((localTime - 4.6) / 1.4, 0, 1));
  const rise = Easing.easeInOutSine(clamp((localTime - 5.6) / 1.6, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: 960 - 56, top: 420 - 56 - rise * 60, width: 112, height: 112,
      borderRadius: '50%', transform: `scale(${0.6 + 0.4 * inT + glow * 0.18})`, opacity: inT,
      background: 'linear-gradient(135deg, var(--acc2), var(--acc1))',
      border: '2px solid rgba(255,255,255,0.45)',
      boxShadow: `0 0 ${20 + glow * 70}px rgba(56,189,248,${0.25 + glow * 0.55})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT, fontSize: 34, fontWeight: 700, color: '#fff',
    }}>me</div>
  );
}

// ── S2 · TWO THINGS (11.5–21.5) ─────────────────────────────────────────────
function SceneTwoThings() {
  const [t0] = T.twoThings;
  return (
    <Scene at={T.twoThings}>
      <FadeIn delay={0.3} style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center' }}>
        <div style={{ fontFamily: FONT, fontSize: 40, fontWeight: 600, color: PAL.body, letterSpacing: '0.16em', textTransform: 'uppercase' }}>Two things</div>
      </FadeIn>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', gap: 70 }}>
        <FadeIn delay={1.4} dy={34} scaleFrom={0.95}>
          <BigThing icon="zap" n="1" title="AI does the heavy lifting" sub="Claude builds, fixes, and files"></BigThing>
        </FadeIn>
        <FadeIn delay={3.4} dy={34} scaleFrom={0.95}>
          <BigThing icon="network" n="2" title="Everything arranged visually" sub="Maps, not lists in my head"></BigThing>
        </FadeIn>
      </div>
      <Scene at={[t0 + 5.6, T.twoThings[1]]}>
        <SyncRow></SyncRow>
      </Scene>
    </Scene>
  );
}
function BigThing({ icon, n, title, sub }) {
  return (
    <Glass style={{ width: 560, height: 380, padding: 50, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 28 }} glow={true}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, width: '100%' }}>
        <div style={{
          width: 96, height: 96, borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--acc2), var(--acc1))', boxShadow: '0 0 40px rgba(56,189,248,0.35)',
        }}>
          <Icon name={icon} size={48} color="#fff"></Icon>
        </div>
        <div style={{ marginLeft: 'auto', fontFamily: FONT, fontSize: 100, fontWeight: 700, color: 'rgba(125,211,252,0.18)', lineHeight: 1 }}>{n}</div>
      </div>
      <div style={{ fontFamily: FONT, fontSize: 46, fontWeight: 700, color: PAL.ink, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{title}</div>
      <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 500, color: PAL.body }}>{sub}</div>
    </Glass>
  );
}
function SyncRow() {
  const { localTime } = useSprite();
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 820, display: 'flex', justifyContent: 'center' }}>
      <FadeIn delay={0} dy={18}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20, padding: '20px 40px', borderRadius: 9999,
          background: PAL.glass, border: `1px solid ${PAL.glassBorder}`, backdropFilter: 'blur(12px)',
        }}>
          <div style={{ transform: `rotate(${localTime * 120}deg)`, display: 'flex' }}>
            <Icon name="refresh" size={34} color="var(--acc1)"></Icon>
          </div>
          <div style={{ fontFamily: FONT, fontSize: 32, fontWeight: 600, color: '#e2e8f0' }}>
            Claude updates the files after <span className="grad-text">every task</span> — nothing falls out of date
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

// ── S3 · THREE PARTS (21.5–28.5) ────────────────────────────────────────────
function SceneThreeParts() {
  const [t0] = T.threeParts;
  const parts = [
    { icon: 'phone', label: 'Nebula', sub: 'my day-to-day app', d: 1.4, x: 420 },
    { icon: 'network', label: 'Constellation', sub: 'the map of everything I run', d: 3.0, x: 960 },
    { icon: 'users', label: 'AI Dev Team', sub: 'an entire software company', d: 4.6, x: 1500 },
  ];
  return (
    <Scene at={T.threeParts}>
      <FadeIn delay={0.2} style={{ position: 'absolute', left: 0, right: 0, top: 170, textAlign: 'center' }}>
        <div style={{ fontFamily: FONT, fontSize: 64, fontWeight: 700, color: PAL.ink, letterSpacing: '-0.02em' }}>
          The system has <span className="grad-text">three parts</span>
        </div>
      </FadeIn>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <Sprite start={t0 + 2.4} end={T.threeParts[1]} keepMounted={false}>
          {({ localTime }) => (
            <g>
              <DrawPath d="M 530 560 C 700 480, 820 480, 850 555" p={clamp(localTime / 1.0, 0, 1)}></DrawPath>
              <DrawPath d="M 1070 555 C 1100 480, 1220 480, 1390 560" p={clamp((localTime - 1.4) / 1.0, 0, 1)}></DrawPath>
            </g>
          )}
        </Sprite>
      </svg>
      {parts.map((p) => (
        <FadeIn key={p.label} delay={p.d} dy={30} scaleFrom={0.85} style={{ position: 'absolute', left: p.x - 130, top: 460, width: 260 }}>
          <NodeChip icon={p.icon} label={p.label} sub={p.sub} size={1.18} active={p.label === 'Constellation'}></NodeChip>
        </FadeIn>
      ))}
    </Scene>
  );
}

// ── S4 · NEBULA (28.5–39.5) phone + desktop, 4 inboxes, calendars ───────────
function SceneNebula() {
  const [t0] = T.nebula;
  return (
    <Scene at={T.nebula}>
      <Cam kf={[[0, 0, 0, 1], [11, 0, 6, 1.05]]}>
        <FadeIn delay={0.2} style={{ position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center' }}>
          <div style={{ fontFamily: FONT, fontSize: 38, fontWeight: 600, color: 'var(--acc1)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Part 1 · Nebula</div>
        </FadeIn>
        {/* Phone */}
        <FadeIn delay={0.8} dy={40} style={{ position: 'absolute', left: 430, top: 250 }}>
          <PhoneMock></PhoneMock>
        </FadeIn>
        {/* Desktop */}
        <FadeIn delay={1.6} dy={40} style={{ position: 'absolute', left: 780, top: 295 }}>
          <DesktopMock></DesktopMock>
        </FadeIn>
        {/* Inbound: 4 mail accounts + calendar */}
        <InboundBadges t0Local={3.0}></InboundBadges>
        {/* dashed link to Constellation */}
        <ConstellationLink t0Local={7.6}></ConstellationLink>
      </Cam>
      <Scene at={[t0 + 2.6, t0 + 7.2]}><Caption text="Phone and desktop. *Four inboxes*, all my calendars, my notes."></Caption></Scene>
      <Scene at={[t0 + 7.6, T.nebula[1]]}><Caption text="Behind the scenes, it reads *Constellation*."></Caption></Scene>
    </Scene>
  );
}
function PhoneMock() {
  return (
    <Glass style={{ width: 260, height: 520, borderRadius: 40, padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }} glow={true}>
      <div style={{ width: 80, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.18)', alignSelf: 'center' }}></div>
      <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 700, color: PAL.ink, padding: '8px 6px 0' }}>Nebula</div>
      {[68, 52, 60, 46, 56].map((h, i) => (
        <div key={i} style={{ height: h, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}></div>
      ))}
    </Glass>
  );
}
function DesktopMock() {
  return (
    <Glass style={{ width: 720, height: 430, borderRadius: 22, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {[PAL.rose, PAL.amber, PAL.emerald].map((c, i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: c, opacity: 0.8 }}></div>
        ))}
        <div style={{ marginLeft: 14, fontFamily: FONT, fontSize: 20, fontWeight: 600, color: PAL.body }}>Nebula — desktop</div>
      </div>
      <div style={{ display: 'flex', gap: 14, flex: 1 }}>
        <div style={{ width: 170, borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}></div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}></div>
          ))}
        </div>
      </div>
    </Glass>
  );
}
function InboundBadges({ t0Local }) {
  const { localTime } = useSprite();
  const items = [
    { icon: 'mail', label: 'work', x0: 120, y0: 200 },
    { icon: 'mail', label: 'personal', x0: 90, y0: 420 },
    { icon: 'mail', label: 'clinic', x0: 140, y0: 620 },
    { icon: 'mail', label: 'admin', x0: 110, y0: 820 },
    { icon: 'calendar', label: 'calendars', x0: 230, y0: 940 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {items.map((it, i) => {
        const p = Easing.easeInOutCubic(clamp((localTime - (t0Local + i * 0.55)) / 1.1, 0, 1));
        if (p <= 0) return null;
        const tx = it.x0 + (560 - it.x0) * p;
        const ty = it.y0 + (490 - it.y0) * p;
        const fade = p > 0.88 ? (1 - p) / 0.12 : 1;
        return (
          <div key={i} style={{
            position: 'absolute', left: tx, top: ty, opacity: fade,
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 9999,
            background: 'rgba(14,165,233,0.14)', border: '1px solid rgba(56,189,248,0.35)',
            fontFamily: FONT, fontSize: 22, fontWeight: 600, color: '#bae6fd',
            boxShadow: '0 0 24px rgba(56,189,248,0.25)',
          }}>
            <Icon name={it.icon} size={24} color="var(--acc1)"></Icon>{it.label}
          </div>
        );
      })}
    </div>
  );
}
function ConstellationLink({ t0Local }) {
  const { localTime } = useSprite();
  const p = clamp((localTime - t0Local) / 1.4, 0, 1);
  const nodeIn = Easing.easeOutBack(clamp((localTime - t0Local - 1.0) / 0.6, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <DrawPath d="M 1510 510 C 1590 510, 1620 500, 1680 480" p={p} dash={true} color="rgba(125,211,252,0.7)"></DrawPath>
      </svg>
      {nodeIn > 0 ? (
        <div style={{ position: 'absolute', left: 1610, top: 360, opacity: nodeIn, transform: `scale(${nodeIn})` }}>
          <NodeChip icon="network" label="Constellation" size={0.78} active={true}></NodeChip>
        </div>
      ) : null}
    </div>
  );
}

Object.assign(window, { Cam, SceneHook, SceneTwoThings, SceneThreeParts, SceneNebula });
