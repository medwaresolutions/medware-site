// scenes-d.jsx — S11 The Glue, S12 Reads-in/Writes-out, S13 Closing

// ── S11 · GLUE (183–199) end-to-end flow ────────────────────────────────────
const GLUE_NODES = [
  { icon: 'mail', label: 'Emails & comms', x: 280 },
  { icon: 'phone', label: 'Nebula', x: 745 },
  { icon: 'network', label: 'Constellation', x: 1210 },
  { icon: 'users', label: 'AI Dev Team', x: 1660 },
];
function SceneGlue() {
  const [t0] = T.glue;
  return (
    <Scene at={T.glue}>
      <GlueDiagram></GlueDiagram>
      <Scene at={[t0 + 0.6, t0 + 5.0]}><Caption text="The team talks to *Constellation* — it monitors every project."></Caption></Scene>
      <Scene at={[t0 + 5.4, t0 + 9.8]}><Caption text="Nebula talks to my *emails, comms and Constellation*."></Caption></Scene>
      <Scene at={[t0 + 10.2, T.glue[1]]}><Caption text="End to end, the system *updates itself*. I don't have to."></Caption></Scene>
    </Scene>
  );
}
function GlueDiagram() {
  const { localTime } = useSprite();
  const segs = [
    { a: 0, b: 1, hot: localTime >= 5.4 },                  // emails ↔ nebula
    { a: 1, b: 2, hot: localTime >= 5.4 },                  // nebula ↔ constellation
    { a: 2, b: 3, hot: localTime >= 0.8 },                  // constellation ↔ team
  ];
  const y = 470;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {segs.map((s, i) => (
          <DrawPath key={i} d={`M ${GLUE_NODES[s.a].x + 60} ${y} L ${GLUE_NODES[s.b].x - 60} ${y}`}
            p={clamp((localTime - (0.5 + i * 0.3)) / 0.8, 0, 1)}
            color={s.hot ? 'rgba(56,189,248,0.55)' : 'rgba(125,211,252,0.2)'} width={s.hot ? 3 : 2}></DrawPath>
        ))}
      </svg>
      {/* flowing dots, both directions, continuous */}
      {segs.map((s, i) => {
        if (!s.hot) return null;
        const x1 = GLUE_NODES[s.a].x + 60, x2 = GLUE_NODES[s.b].x - 60;
        return (
          <React.Fragment key={i}>
            <FlowDot x1={x1} y1={y} x2={x2} y2={y} t={(localTime * 0.45 + i * 0.33) % 1}></FlowDot>
            <FlowDot x1={x2} y1={y - 14} x2={x1} y2={y - 14} t={(localTime * 0.38 + i * 0.61) % 1} color="#7dd3fc"></FlowDot>
          </React.Fragment>
        );
      })}
      {GLUE_NODES.map((n, i) => (
        <FadeIn key={n.label} delay={0.2 + i * 0.25} dy={26} style={{ position: 'absolute', left: n.x - 110, top: y - 110, width: 220 }}>
          <NodeChip icon={n.icon} label={n.label} size={0.95} active={n.label === 'Constellation'}></NodeChip>
        </FadeIn>
      ))}
    </div>
  );
}

// ── S12 · READS IN / WRITES OUT (199–215) ───────────────────────────────────
function SceneInOut() {
  const [t0] = T.inOut;
  return (
    <Scene at={T.inOut}>
      {/* beat 1: wide constellation, slow drift */}
      <Scene at={[t0, t0 + 9.2]}>
        <WideConstellation></WideConstellation>
        <Scene at={[t0 + 0.7, t0 + 4.8]}><Caption text="Yes — it took *a lot* to build. Still tuning."></Caption></Scene>
        <Scene at={[t0 + 5.2, t0 + 9.0]}><Caption text="But keeping it up to date takes *nothing*."></Caption></Scene>
      </Scene>
      {/* beat 2: agent passes through a project */}
      <Scene at={[t0 + 9.2, T.inOut[1]]}>
        <ReadWritePass></ReadWritePass>
      </Scene>
    </Scene>
  );
}
function WideConstellation() {
  const { localTime } = useSprite();
  return (
    <Cam kf={[[0, 0, 0, 0.92], [9.2, 0, 0, 1.0]]}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {MAP_EDGES.map(([a, b], i) => (
          <DrawPath key={i} d={edgePath(a, b)} p={1} color={MAP_NODES[b].dim ? 'rgba(148,163,184,0.22)' : 'rgba(125,211,252,0.3)'}></DrawPath>
        ))}
      </svg>
      {Object.entries(MAP_NODES).map(([k, n]) => (
        <MapNode key={k} node={n} appear={1} pulse={Math.sin(localTime * 1.8 + n.x) > 0.93 ? 1 : 0}></MapNode>
      ))}
    </Cam>
  );
}
function ReadWritePass() {
  const { localTime } = useSprite();
  // agent x: enters 0.5–2.2 (left → project), pauses, exits 3.4–5.2 (project → right)
  const ax = interpolate([0.5, 2.2, 3.4, 5.2], [-80, 850, 1070, 2000], Easing.easeInOutSine)(localTime);
  const inside = ax > 800 && ax < 1120;
  const readP = clamp((localTime - 0.8) / 1.6, 0, 1);
  const writeP = clamp((localTime - 3.4) / 1.8, 0, 1);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* project node */}
      <div style={{ position: 'absolute', left: 960 - 130, top: 380 }}>
        <Glass style={{ width: 260, height: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }} glow={inside}>
          <Icon name="file" size={58} color="var(--acc1)"></Icon>
          <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 700, color: PAL.ink }}>a project</div>
        </Glass>
      </div>
      {/* read lines streaming toward agent on entry */}
      {[0, 1, 2].map((i) => {
        const p = (readP * 1.4 + i * 0.33) % 1;
        if (readP <= 0 || localTime > 2.6) return null;
        return <FlowDot key={'r' + i} x1={830} y1={430 + i * 50} x2={ax + 30} y2={490} t={p} color="#7dd3fc"></FlowDot>;
      })}
      {/* write lines streaming back on exit */}
      {[0, 1, 2].map((i) => {
        const p = (writeP * 1.4 + i * 0.33) % 1;
        if (writeP <= 0 || writeP >= 1) return null;
        return <FlowDot key={'w' + i} x1={ax - 30} y1={490} x2={1090} y2={430 + i * 50} t={p} color={PAL.emerald}></FlowDot>;
      })}
      {/* the agent */}
      <div style={{ position: 'absolute', left: ax - 30, top: 460, width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, var(--acc2), var(--acc1))', border: '2px solid rgba(255,255,255,0.5)', boxShadow: '0 0 36px rgba(56,189,248,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="zap" size={28} color="#fff"></Icon>
      </div>
      {/* labels */}
      <Scene at={[T.inOut[0] + 9.2 + 0.9, T.inOut[0] + 9.2 + 3.3]}>
        <FadeIn delay={0} dy={14} style={{ position: 'absolute', left: 380, top: 660 }}>
          <div style={{ fontFamily: FONT, fontSize: 38, fontWeight: 600, color: '#bae6fd' }}>reads on the way in →</div>
        </FadeIn>
      </Scene>
      <Scene at={[T.inOut[0] + 9.2 + 3.5, T.inOut[1]]}>
        <FadeIn delay={0} dy={14} style={{ position: 'absolute', left: 1080, top: 660 }}>
          <div style={{ fontFamily: FONT, fontSize: 38, fontWeight: 600, color: PAL.emerald }}>→ writes its updates on the way out</div>
        </FadeIn>
      </Scene>
    </div>
  );
}

// ── S13 · CLOSING (215–219) ─────────────────────────────────────────────────
function SceneClosing() {
  const [t0] = T.closing;
  return (
    <Scene at={T.closing} fade={0.5}>
      <ClosingLines></ClosingLines>
    </Scene>
  );
}
function ClosingLines() {
  const { localTime } = useSprite();
  const lines = [
    { text: 'One person.', d: 0.25, size: 76, cls: '' },
    { text: 'Twenty products.', d: 1.0, size: 76, cls: '' },
    { text: 'An entire software company.', d: 1.8, size: 86, cls: 'grad-text' },
  ];
  const drift = 1 + localTime * 0.006;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 34, transform: `scale(${drift})` }}>
      {lines.map((l, i) => {
        const p = Easing.easeOutCubic(clamp((localTime - l.d) / 0.6, 0, 1));
        return (
          <div key={i} className={l.cls} style={{
            fontFamily: FONT, fontSize: l.size, fontWeight: 700, letterSpacing: '-0.02em',
            color: l.cls ? undefined : PAL.ink,
            opacity: p, transform: `translateY(${(1 - p) * 28}px)`,
          }}>{l.text}</div>
        );
      })}
    </div>
  );
}

Object.assign(window, { SceneGlue, SceneInOut, SceneClosing });
