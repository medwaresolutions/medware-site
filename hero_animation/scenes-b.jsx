// scenes-b.jsx — S5 Constellation, S6 Views (day/table/mind-map), S7 Interlude

// ── Map data (shared by S5 + S6 mind-map) ───────────────────────────────────
const MAP_NODES = {
  hub: { x: 960, y: 480, label: 'Constellation', main: true },
  A:   { x: 1330, y: 330, label: 'Medware' },
  A1:  { x: 1570, y: 210, label: 'MedFlow' },
  A2:  { x: 1660, y: 390, label: 'Hub' },
  A3:  { x: 1505, y: 545, label: 'Metrics' },
  B:   { x: 600, y: 300, dim: true },
  B1:  { x: 395, y: 195, dim: true },
  B2:  { x: 330, y: 365, dim: true },
  C:   { x: 700, y: 700, dim: true },
  C1:  { x: 480, y: 800, dim: true },
  C2:  { x: 905, y: 825, dim: true },
};
const MAP_EDGES = [
  ['hub', 'A'], ['A', 'A1'], ['A', 'A2'], ['A', 'A3'],
  ['hub', 'B'], ['B', 'B1'], ['B', 'B2'],
  ['hub', 'C'], ['C', 'C1'], ['C', 'C2'],
];
function edgePath(a, b) {
  const n1 = MAP_NODES[a], n2 = MAP_NODES[b];
  const mx = (n1.x + n2.x) / 2, my = (n1.y + n2.y) / 2 - 18;
  return `M ${n1.x} ${n1.y} Q ${mx} ${my} ${n2.x} ${n2.y}`;
}
function MapNode({ node, appear = 1, pulse = 0 }) {
  const r = node.main ? 34 : node.dim ? 13 : 20;
  const s = Easing.easeOutBack(clamp(appear, 0, 1));
  if (s <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: node.x, top: node.y, transform: `translate(-50%, -50%) scale(${s})` }}>
      <div style={{
        width: r * 2, height: r * 2, borderRadius: '50%',
        background: node.main
          ? 'linear-gradient(135deg, var(--acc2), var(--acc1))'
          : node.dim ? 'rgba(148,163,184,0.35)' : 'rgba(56,189,248,0.9)',
        border: node.dim ? '1px solid rgba(148,163,184,0.4)' : '2px solid rgba(255,255,255,0.4)',
        boxShadow: node.dim ? 'none' : `0 0 ${22 + pulse * 36}px rgba(56,189,248,${0.35 + pulse * 0.5})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {node.main ? <Icon name="network" size={34} color="#fff"></Icon> : null}
      </div>
      {node.label ? (
        <div style={{
          position: 'absolute', top: r * 2 + 10, left: '50%', transform: 'translateX(-50%)',
          fontFamily: FONT, fontSize: node.main ? 30 : 24, fontWeight: node.main ? 700 : 600,
          color: node.main ? PAL.ink : '#bae6fd', whiteSpace: 'nowrap', textShadow: '0 2px 12px rgba(7,13,24,0.9)',
        }}>{node.label}</div>
      ) : null}
    </div>
  );
}
function UpdatedChip({ x, y, show }) {
  const s = Easing.easeOutBack(clamp(show, 0, 1));
  if (s <= 0) return null;
  return (
    <div style={{
      position: 'absolute', left: x + 22, top: y - 52, transform: `scale(${s})`, transformOrigin: 'bottom left',
      display: 'flex', alignItems: 'center', gap: 8, padding: '7px 16px', borderRadius: 9999,
      background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.45)',
      fontFamily: FONT, fontSize: 20, fontWeight: 600, color: PAL.emerald,
    }}>
      <Icon name="check" size={18} color={PAL.emerald}></Icon>updated
    </div>
  );
}

// ── S5 · CONSTELLATION (39.5–66) ────────────────────────────────────────────
function SceneConstellation() {
  const [t0] = T.constellation;
  return (
    <Scene at={T.constellation}>
      <Cam kf={[[0, 0, 40, 1.22], [7, 0, 0, 1], [14, -120, 30, 1.12], [20.5, 0, 0, 1], [26.5, 0, 0, 1.04]]}>
        <ConstellationMapAnim></ConstellationMapAnim>
      </Cam>
      <FadeIn delay={0.3} style={{ position: 'absolute', left: 0, right: 0, top: 110, textAlign: 'center' }}>
        <div style={{ fontFamily: FONT, fontSize: 38, fontWeight: 600, color: 'var(--acc1)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Part 2 · Constellation</div>
      </FadeIn>
      <Scene at={[t0 + 1.5, t0 + 6.5]}><Caption text="A complete map of *every project I run*."></Caption></Scene>
      <Scene at={[t0 + 7.0, t0 + 12.5]}><Caption text="Claude never opens the *wrong project* — local or GitHub."></Caption></Scene>
      <Scene at={[t0 + 13.5, t0 + 19.5]}><Caption text="Schedule. Facts. Done, doing, *flagged*."></Caption></Scene>
      <Scene at={[t0 + 20.5, T.constellation[1]]}><Caption text="Almost entirely maintained *by Claude*."></Caption></Scene>
    </Scene>
  );
}
function ConstellationMapAnim() {
  const { localTime } = useSprite();
  // comet waypoints (localTime, nodeKey)
  const wp = [[20, 'hub'], [21.3, 'A'], [22.5, 'A1'], [23.7, 'A2'], [24.8, 'hub'], [26.2, 'C']];
  const ts = wp.map((w) => w[0]);
  const cx = interpolate(ts, wp.map((w) => MAP_NODES[w[1]].x), Easing.easeInOutSine)(localTime);
  const cy = interpolate(ts, wp.map((w) => MAP_NODES[w[1]].y), Easing.easeInOutSine)(localTime);
  const cometOn = localTime >= 20 && localTime <= 26.4;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {MAP_EDGES.map(([a, b], i) => (
          <DrawPath key={i} d={edgePath(a, b)} p={clamp((localTime - (0.7 + i * 0.35)) / 0.9, 0, 1)}
            color={MAP_NODES[b].dim ? 'rgba(148,163,184,0.25)' : PAL.line}></DrawPath>
        ))}
      </svg>
      {Object.entries(MAP_NODES).map(([k, n], i) => (
        <MapNode key={k} node={n} appear={(localTime - (0.5 + i * 0.32)) / 0.5}
          pulse={cometOn && Math.hypot(cx - n.x, cy - n.y) < 60 ? 1 : 0}></MapNode>
      ))}
      {/* local / GitHub chips near hub */}
      {[['local ✓', 760, 560, 7.5], ['GitHub ✓', 1040, 575, 8.1]].map(([lab, x, y, d], i) => {
        const s = Easing.easeOutBack(clamp((localTime - d) / 0.5, 0, 1));
        const fade = clamp((13.5 - localTime) / 0.6, 0, 1);
        if (s <= 0 || fade <= 0) return null;
        return (
          <div key={i} style={{
            position: 'absolute', left: x, top: y, transform: `scale(${s})`, opacity: fade,
            padding: '8px 18px', borderRadius: 9999, fontFamily: FONT, fontSize: 21, fontWeight: 600,
            background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(56,189,248,0.4)', color: '#bae6fd',
          }}>{lab}</div>
        );
      })}
      {/* project facts card (beat B) */}
      <ProjectCard localTime={localTime}></ProjectCard>
      {/* Claude comet (beat C) */}
      {cometOn ? (
        <div style={{
          position: 'absolute', left: cx - 11, top: cy - 11, width: 22, height: 22, borderRadius: '50%',
          background: '#fff', boxShadow: '0 0 28px 8px rgba(56,189,248,0.85), 0 0 60px 20px rgba(56,189,248,0.4)',
        }}>
          <div style={{ position: 'absolute', inset: -18, borderRadius: '50%', border: '1px solid rgba(125,211,252,0.4)', animation: 'pulse-ring 1.2s ease-out infinite' }}></div>
        </div>
      ) : null}
      <UpdatedChip x={MAP_NODES.A1.x} y={MAP_NODES.A1.y} show={(localTime - 22.7) / 0.4}></UpdatedChip>
      <UpdatedChip x={MAP_NODES.A2.x} y={MAP_NODES.A2.y} show={(localTime - 23.9) / 0.4}></UpdatedChip>
      <UpdatedChip x={MAP_NODES.C.x} y={MAP_NODES.C.y} show={(localTime - 26.0) / 0.4}></UpdatedChip>
    </div>
  );
}
function ProjectCard({ localTime }) {
  const inT = Easing.easeOutCubic(clamp((localTime - 14) / 0.7, 0, 1));
  const outT = Easing.easeInCubic(clamp((localTime - 19.6) / 0.6, 0, 1));
  const op = inT * (1 - outT);
  if (op <= 0.01) return null;
  const rows = [
    { icon: 'check', c: PAL.emerald, text: 'Done — submission flow shipped', d: 15.0 },
    { icon: 'pulse', c: 'var(--acc1)', text: 'Doing — bulk PBS feature', d: 15.9 },
    { icon: 'flag', c: PAL.amber, text: 'Flagged — TGA audit due', d: 16.8 },
  ];
  return (
    <div style={{ position: 'absolute', left: 1240, top: 600, opacity: op, transform: `translateY(${(1 - inT) * 30}px)` }}>
      <Glass style={{ width: 470, padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 16 }} glow={true}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: FONT, fontSize: 28, fontWeight: 700, color: PAL.ink }}>MedFlow</div>
          <div style={{ fontFamily: FONT, fontSize: 19, fontWeight: 600, color: '#bae6fd', padding: '5px 14px', borderRadius: 9999, background: 'rgba(14,165,233,0.13)', border: '1px solid rgba(56,189,248,0.4)' }}>schedule · facts</div>
        </div>
        {rows.map((r, i) => {
          const rp = clamp((localTime - r.d) / 0.45, 0, 1);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: rp, transform: `translateX(${(1 - Easing.easeOutCubic(rp)) * 20}px)` }}>
              <Icon name={r.icon} size={26} color={r.c}></Icon>
              <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 500, color: '#cbd5e1' }}>{r.text}</div>
            </div>
          );
        })}
      </Glass>
    </div>
  );
}

// ── S6 · VIEWS (66–97.5): day / table / mind-map ────────────────────────────
function SceneViews() {
  const [t0] = T.views;
  return (
    <Scene at={T.views}>
      <Scene at={[t0, t0 + 11.5]}><DayView t0={t0}></DayView></Scene>
      <Scene at={[t0 + 11.5, t0 + 18.5]}><TableView t0={t0 + 11.5}></TableView></Scene>
      <Scene at={[t0 + 18.5, T.views[1]]}><MindMapView t0={t0 + 18.5}></MindMapView></Scene>
    </Scene>
  );
}

function ViewLabel({ text }) {
  return (
    <FadeIn delay={0.2} style={{ position: 'absolute', left: 0, right: 0, top: 96, textAlign: 'center' }}>
      <div style={{ fontFamily: FONT, fontSize: 36, fontWeight: 600, color: 'var(--acc1)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{text}</div>
    </FadeIn>
  );
}

function DayView() {
  const { localTime } = useSprite();
  const todos = [
    { text: 'Reply — PBS authority email', tick: 2.0 },
    { text: 'Review TGA audit pack draft', tick: 3.3 },
    { text: 'Approve Hub release notes', tick: 4.6 },
    { text: 'Train new clinic — 3:00 pm', tick: null, chip: '3:00 pm' },
  ];
  const spoken = 'call the pharmacy supplier, tomorrow 9am';
  const typedN = Math.floor(clamp((localTime - 6.4) / 2.2, 0, 1) * spoken.length);
  const newRowP = Easing.easeOutCubic(clamp((localTime - 9.4) / 0.6, 0, 1));
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <ViewLabel text="Nebula · Day view"></ViewLabel>
      <FadeIn delay={0.4} dy={36} style={{ position: 'absolute', left: 620, top: 200 }}>
        <Glass style={{ width: 680, padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 18 }} glow={true}>
          <div style={{ fontFamily: FONT, fontSize: 32, fontWeight: 700, color: PAL.ink, marginBottom: 4 }}>Today</div>
          {todos.map((td, i) => {
            const done = td.tick != null && localTime >= td.tick;
            const tickP = td.tick != null ? Easing.easeOutBack(clamp((localTime - td.tick) / 0.35, 0, 1)) : 0;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 18px', borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                  border: done ? 'none' : '2px solid rgba(148,163,184,0.5)',
                  background: done ? 'linear-gradient(135deg, var(--acc2), var(--acc1))' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${done ? 0.85 + 0.15 * tickP : 1})`,
                }}>
                  {done ? <Icon name="check" size={22} color="#fff" sw={3}></Icon> : null}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 500, color: done ? PAL.dim : '#e2e8f0', textDecoration: done ? 'line-through' : 'none' }}>{td.text}</div>
                {td.chip ? <div style={{ marginLeft: 'auto', fontFamily: FONT, fontSize: 20, fontWeight: 600, color: PAL.amber, padding: '5px 14px', borderRadius: 9999, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.35)' }}>{td.chip}</div> : null}
              </div>
            );
          })}
          {/* new row lands */}
          {newRowP > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 18px', borderRadius: 16, opacity: newRowP, transform: `translateY(${(1 - newRowP) * 24}px)`, background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(56,189,248,0.45)', boxShadow: '0 0 30px rgba(56,189,248,0.2)' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, border: '2px solid rgba(56,189,248,0.7)', flexShrink: 0 }}></div>
              <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 500, color: '#e0f2fe' }}>Call pharmacy supplier</div>
              <div style={{ marginLeft: 'auto', fontFamily: FONT, fontSize: 20, fontWeight: 600, color: '#bae6fd', padding: '5px 14px', borderRadius: 9999, background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(56,189,248,0.4)' }}>tomorrow 9:00</div>
            </div>
          ) : null}
        </Glass>
      </FadeIn>
      {/* voice pill */}
      {localTime >= 6.2 && localTime <= 9.6 ? (
        <div style={{ position: 'absolute', left: 660, top: 870, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 30px', borderRadius: 9999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(10px)', opacity: clamp((localTime - 6.2) / 0.4, 0, 1) * clamp((9.6 - localTime) / 0.4, 0, 1) }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--acc2), var(--acc1))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(56,189,248,0.5)' }}>
            <Icon name="mic" size={24} color="#fff"></Icon>
          </div>
          <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 500, color: '#e2e8f0', minWidth: 520 }}>
            “{spoken.slice(0, typedN)}<span style={{ opacity: Math.floor(localTime * 2.5) % 2 ? 1 : 0 }}>|</span>”
          </div>
        </div>
      ) : null}
      <Scene at={[T.views[0] + 1.0, T.views[0] + 5.8]}><Caption text="The day view tells me *exactly what to do*." y={1000} size={36}></Caption></Scene>
      <Scene at={[T.views[0] + 9.8, T.views[0] + 11.4]}><Caption text="Speak or type — it lands *in the right spot*." y={1000} size={36}></Caption></Scene>
    </div>
  );
}

function TableView({ t0 }) {
  const { localTime } = useSprite();
  const rows = [
    ['MedFlow', 'On track', PAL.emerald, 'Ship bulk PBS feature'],
    ['Hub', 'Waiting', PAL.amber, 'Clinic feedback round'],
    ['Metrics', 'On track', PAL.emerald, 'Monthly PBS report'],
    ['Code Finder', 'Flagged', PAL.rose, 'TGA audit pack'],
    ['Patient App', 'On track', PAL.emerald, 'Reminder copy review'],
  ];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <ViewLabel text="Nebula · Table view"></ViewLabel>
      <FadeIn delay={0.3} dy={36} style={{ position: 'absolute', left: 340, top: 230 }}>
        <Glass style={{ width: 1240, padding: '34px 44px' }} glow={true}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 260px 1fr', gap: '0 30px', fontFamily: FONT, fontSize: 21, fontWeight: 600, color: PAL.dim, textTransform: 'uppercase', letterSpacing: '0.1em', paddingBottom: 18, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div>Project</div><div>Status</div><div>Next</div>
          </div>
          {rows.map((r, i) => {
            const p = Easing.easeOutCubic(clamp((localTime - (0.8 + i * 0.35)) / 0.5, 0, 1));
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '300px 260px 1fr', gap: '0 30px', alignItems: 'center', padding: '20px 0', borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', opacity: p, transform: `translateX(${(1 - p) * 30}px)` }}>
                <div style={{ fontFamily: FONT, fontSize: 27, fontWeight: 600, color: PAL.ink }}>{r[0]}</div>
                <div><span style={{ fontFamily: FONT, fontSize: 21, fontWeight: 600, color: r[2], padding: '6px 16px', borderRadius: 9999, background: 'rgba(255,255,255,0.05)', border: `1px solid ${r[2]}55` }}>{r[1]}</span></div>
                <div style={{ fontFamily: FONT, fontSize: 25, fontWeight: 500, color: '#cbd5e1' }}>{r[3]}</div>
              </div>
            );
          })}
        </Glass>
      </FadeIn>
      <Scene at={[t0 + 1.2, t0 + 6.8]}><Caption text="The table view is *the overview*." y={1000} size={36}></Caption></Scene>
    </div>
  );
}

function MindMapView({ t0 }) {
  const { localTime } = useSprite();
  const notes = [
    { key: 'A1', text: 'audit pack — Fri', d: 4.5 },
    { key: 'A2', text: 'release 2.4 notes', d: 5.4 },
    { key: 'B', text: 'renew certificate', d: 3.4 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Cam kf={[[0, 320, 120, 1.45], [5, 320, 60, 1.3], [10, -260, 0, 1.32], [13, 0, 0, 1.0]]}>
        <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
          {MAP_EDGES.map(([a, b], i) => (
            <DrawPath key={i} d={edgePath(a, b)} p={1} color={MAP_NODES[b].dim ? 'rgba(148,163,184,0.25)' : PAL.line}></DrawPath>
          ))}
        </svg>
        {Object.entries(MAP_NODES).map(([k, n]) => (
          <MapNode key={k} node={n} appear={1} pulse={0}></MapNode>
        ))}
        {notes.map((nt, i) => {
          const n = MAP_NODES[nt.key];
          const p = Easing.easeOutCubic(clamp((localTime - nt.d) / 0.6, 0, 1));
          const flip = nt.key === 'A1' ? clamp((localTime - 8.2) / 0.5, 0, 1) : 0;
          if (p <= 0) return null;
          const dx = nt.key === 'A1' ? -300 : 28; // keep MedFlow note inside frame during pan
          return (
            <div key={i} style={{ position: 'absolute', left: n.x + dx, top: n.y + 30, opacity: p, transform: `translateY(${(1 - p) * 14}px) rotateX(${flip < 1 ? flip * 360 : 0}deg)` }}>
              <div style={{ width: 2, height: 22, background: 'rgba(125,211,252,0.4)', marginLeft: 18 }}></div>
              <div style={{ padding: '10px 18px', borderRadius: 12, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.35)', fontFamily: FONT, fontSize: 21, fontWeight: 600, color: '#fde68a' }}>
                {nt.key === 'A1' && flip >= 0.5 ? 'audit pack — done ✓' : nt.text}
              </div>
            </div>
          );
        })}
      </Cam>
      <ViewLabel text="Nebula · Mind map"></ViewLabel>
      <Scene at={[t0 + 0.8, t0 + 5.5]}><Caption text="Every company, every product — *every node connected*." y={1000} size={36}></Caption></Scene>
      <Scene at={[t0 + 6.0, t0 + 9.8]}><Caption text="Follow any arm. To-dos *hang off it*." y={1000} size={36}></Caption></Scene>
      <Scene at={[t0 + 10.2, T.views[1]]}><Caption text="Automatically updating. *Automatically reminding.*" y={1000} size={36}></Caption></Scene>
    </div>
  );
}

// ── S7 · INTERLUDE (97.5–103) ───────────────────────────────────────────────
function SceneInterlude() {
  const [t0] = T.interlude;
  return (
    <Scene at={T.interlude}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,8,16,0.55)' }}></div>
      <Scene at={[t0 + 0.2, t0 + 2.7]}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FadeIn delay={0} dy={20}>
            <div style={{ fontFamily: FONT, fontSize: 62, fontWeight: 700, color: PAL.ink, letterSpacing: '-0.02em', textAlign: 'center', maxWidth: 1400 }}>
              How does one person manage twenty-odd products?
            </div>
          </FadeIn>
        </div>
      </Scene>
      <Scene at={[t0 + 2.9, T.interlude[1]]}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FadeIn delay={0} dy={20}>
            <div style={{ fontFamily: FONT, fontSize: 72, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', color: PAL.ink }}>
              <span className="grad-text">The system manages them.</span><br></br>
              <span style={{ fontSize: 54, fontWeight: 600, color: PAL.body }}>I just track it.</span>
            </div>
          </FadeIn>
        </div>
      </Scene>
    </Scene>
  );
}

Object.assign(window, { SceneConstellation, SceneViews, SceneInterlude, MAP_NODES, MAP_EDGES, edgePath, MapNode });
