// hero-loop.jsx — square, self-contained looping hero animation.
// Per job: inbox → attaches to the Medware hub → row 1 engages → rows roll →
// row 2 engages → ships to the delivered tray. Three jobs per full loop.

const SQ = 1080;
const CY = 13.2;                       // one job, seconds
const JOBS = [
  ['Symptom Tracker', 'pulse'],
  ['Video Invitation', 'mail'],
  ['3D Detail Aid', 'compass'],
];
const AGENT_ROWS = [
  [['Clinical', 'pulse'], ['Legal', 'scale'], ['Docs', 'book'], ['QA', 'bug']],
  [['Design', 'palette'], ['Training', 'graduation'], ['Back End', 'database'], ['Data', 'chart']],
  [['Security', 'shield'], ['Front End', 'code'], ['Strategy', 'compass'], ['Support', 'headset']],
];
const KNOWLEDGE = ['TGA', 'FDA', 'PBS', 'Guidelines', 'Medicines Australia', 'Legal', 'HIPAA', 'ISO'];
const DOC_PICKS = [['TGA', 'Guidelines', 'ISO'], ['PBS', 'Medicines Australia', 'Legal'], ['HIPAA', 'FDA', 'Guidelines']];

// ── Geometry ────────────────────────────────────────────────────────────────
const HUB = { x: 540, y: 408, r: 80 };
const BANK = { x: 168, y: 22, w: 744, h: 120 };
const IN = { x: 40, y: 330, w: 186, h: 130 };
const OUT = { x: 818, y: 372, w: 226, h: 192 };  // h = title + 3 chips + padding
const PIN = { x: 540, y: 268 };                   // where the job card sticks
const COLS = [175, 412, 668, 905];
const SLOTS = [
  { y: 700, scale: 1.0, op: 1 },
  { y: 828, scale: 0.8, op: 0.48 },
  { y: 928, scale: 0.66, op: 0.24 },
];

// ── Cycle phases ────────────────────────────────────────────────────────────
const P = {
  drop: [0.3, 1.5], travel: [1.7, 3.0], hit: [3.0, 3.5],
  lines1: [3.3, 4.6], checks1: [3.9, 5.2], clear1: [5.4, 5.9], roll1: [6.0, 7.2],
  lines2: [7.4, 8.7], checks2: [8.0, 9.3], clear2: [9.5, 10.0],
  docs: [3.6, 6.4], deliver: [10.2, 11.5], roll2: [11.6, 12.8],
};
const ph = (t, win, stagger = 0) => clamp((t - win[0] - stagger) / (win[1] - win[0] - stagger), 0, 1);
const inWin = (t, win) => t >= win[0] && t < win[1];
const qbez = (p, x0, y0, x1, y1, x2, y2) => {
  const m = 1 - p;
  return [m * m * x0 + 2 * m * p * x1 + p * p * x2, m * m * y0 + 2 * m * p * y1 + p * p * y2];
};

// ── Icons: real Lucide glyphs from the CDN UMD build ───────────────────────
const LUCIDE = {
  pulse: 'Activity', scale: 'Scale', book: 'Book', bug: 'Bug', palette: 'Palette',
  graduation: 'GraduationCap', database: 'Database', chart: 'BarChart3', shield: 'Shield',
  code: 'Code', compass: 'Compass', headset: 'Headset', library: 'Library', inbox: 'Inbox',
  file: 'FileText', check: 'Check', mail: 'Mail',
};
function LIcon({ name, size = 24, color = 'var(--acc1)', sw = 2, style = {} }) {
  const node = window.lucide && window.lucide.icons ? window.lucide.icons[LUCIDE[name]] : null;
  if (!node) return <Icon name={name} size={size} color={color} sw={sw} style={style}></Icon>;
  const kids = node[2] || [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {kids.map((k, i) => React.createElement(k[0], Object.assign({ key: i }, k[1])))}
    </svg>
  );
}

// ── Square star-field backdrop ──────────────────────────────────────────────
function SquareBackdrop() {
  const stars = React.useMemo(() => {
    const r = seeded(19);
    return Array.from({ length: 90 }, () => ({
      x: r() * SQ, y: r() * SQ, s: 1 + r() * 2.1, o: 0.14 + r() * 0.48, d: r() * 6,
    }));
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(760px 700px at 46% 34%, #142744 0%, #0B1322 58%, #070d18 100%)' }}></div>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.55,
        backgroundImage: 'linear-gradient(rgba(125,211,252,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.055) 1px, transparent 1px)',
        backgroundSize: '54px 54px',
        maskImage: 'radial-gradient(ellipse 68% 62% at 50% 44%, black 28%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse 68% 62% at 50% 44%, black 28%, transparent 78%)',
      }}></div>
      {stars.map((st, i) => (
        <div key={i} style={{
          position: 'absolute', left: st.x, top: st.y, width: st.s, height: st.s,
          borderRadius: '50%', background: '#cfe9ff', opacity: st.o,
          animation: `twinkle 4.5s ease-in-out ${st.d}s infinite`,
        }}></div>
      ))}
      <div style={{ position: 'absolute', left: -160, top: -140, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(2,132,199,0.18), transparent 65%)', filter: 'blur(40px)', animation: 'drift 11s ease-in-out infinite' }}></div>
      <div style={{ position: 'absolute', right: -190, bottom: -170, width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.11), transparent 65%)', filter: 'blur(40px)', animation: 'drift 13s ease-in-out 2s infinite reverse' }}></div>
    </div>
  );
}

// ── Root ────────────────────────────────────────────────────────────────────
function HeroLoop() {
  const [t, setT] = React.useState(0);
  const [cycle, setCycle] = React.useState(0);
  const lastRef = React.useRef(0);
  React.useEffect(() => {
    let raf, t0 = performance.now();
    const tick = (now) => {
      const nt = ((now - t0) / 1000) % CY;
      setT(nt);
      if (nt < lastRef.current) setCycle((c) => c + 1);
      lastRef.current = nt;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const jobIdx = cycle % JOBS.length;
  const job = JOBS[jobIdx];
  const docs = DOC_PICKS[jobIdx];

  // rotations completed, and the roll currently animating
  const rotCount = cycle * 2 + (t >= P.roll1[1] ? 1 : 0) + (t >= P.roll2[1] ? 1 : 0);
  const rotP = inWin(t, P.roll1) ? Easing.easeInOutCubic(ph(t, P.roll1))
    : inWin(t, P.roll2) ? Easing.easeInOutCubic(ph(t, P.roll2)) : 0;

  const eng = inWin(t, [P.lines1[0], P.clear1[1]]) ? 1
    : inWin(t, [P.lines2[0], P.clear2[1]]) ? 2 : 0;
  const engWin = eng === 2
    ? { lines: P.lines2, checks: P.checks2, clear: P.clear2 }
    : { lines: P.lines1, checks: P.checks1, clear: P.clear1 };

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
      <SquareBackdrop></SquareBackdrop>
      <KnowledgeBank t={t}></KnowledgeBank>
      <Inbox t={t}></Inbox>
      <OutputTray t={t} jobIdx={jobIdx}></OutputTray>
      <Links t={t} eng={eng} engWin={engWin}></Links>
      <DocChips t={t} docs={docs}></DocChips>
      <Hub t={t}></Hub>
      <JobCard t={t} job={job}></JobCard>
      <AgentGrid t={t} rotCount={rotCount} rotP={rotP} eng={eng} engWin={engWin}></AgentGrid>
    </div>
  );
}

// ── Hub: the Medware logo ───────────────────────────────────────────────────
function Hub({ t }) {
  const hit = ph(t, P.hit);
  const pulse = Math.sin(hit * Math.PI);
  const attached = t >= P.hit[0] && t < P.deliver[1];
  return (
    <div style={{ position: 'absolute', left: HUB.x - HUB.r, top: HUB.y - HUB.r, width: HUB.r * 2, height: HUB.r * 2 }}>
      <div style={{
        position: 'absolute', inset: -26, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.28), transparent 70%)',
        opacity: 0.5 + pulse * 0.5, transform: `scale(${1 + pulse * 0.12})`,
      }}></div>
      {attached ? <div style={{ position: 'absolute', inset: -14, borderRadius: '50%', border: '1px solid rgba(125,211,252,0.4)', animation: 'pulse-ring 2.4s ease-out infinite' }}></div> : null}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 34, overflow: 'hidden',
        border: '2px solid rgba(125,211,252,0.45)',
        boxShadow: `0 0 ${34 + pulse * 46}px rgba(56,189,248,${0.35 + pulse * 0.4})`,
        transform: `scale(${1 + pulse * 0.05})`, background: '#0f1e33',
      }}>
        <img src="mwlogo.png" alt="Medware" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}></img>
      </div>
      <div style={{
        position: 'absolute', top: HUB.r * 2 + 18, left: '50%', transform: 'translateX(-50%)',
        fontFamily: FONT, fontSize: 29, fontWeight: 700, color: PAL.ink, whiteSpace: 'nowrap', letterSpacing: '-0.01em',
      }}>Medware</div>
    </div>
  );
}

// ── Inbox: the company project ──────────────────────────────────────────────
function Inbox({ t }) {
  const hot = inWin(t, [P.drop[0], P.travel[1]]);
  return (
    <div style={{ position: 'absolute', left: IN.x, top: IN.y, width: IN.w }}>
      <Glass style={{ width: IN.w, height: IN.h, display: 'flex', alignItems: 'center', justifyContent: 'center' }} glow={hot}>
        <LIcon name="inbox" size={54} color={hot ? '#fff' : 'var(--acc1)'}></LIcon>
      </Glass>
      <div style={{ position: 'relative', marginTop: 12, height: 30 }}>
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontFamily: FONT, fontSize: 23, fontWeight: 600, color: PAL.body, whiteSpace: 'nowrap' }}>
          the company project
        </div>
      </div>
    </div>
  );
}

// ── Output: delivered tray, fills across the loop ───────────────────────────
function OutputTray({ t, jobIdx }) {
  const landed = Easing.easeOutBack(clamp((t - (P.deliver[1] - 0.35)) / 0.5, 0, 1));
  const shipped = JOBS.slice(0, jobIdx).map((j) => j[0]);
  if (t >= P.deliver[1] - 0.35) shipped.push(JOBS[jobIdx][0]);
  return (
    <div style={{ position: 'absolute', left: OUT.x, top: OUT.y, width: OUT.w }}>
      <Glass style={{ width: OUT.w, minHeight: OUT.h, boxSizing: 'border-box', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 10 }} glow={landed > 0.1 && landed < 1}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <LIcon name="check" size={24} color={PAL.emerald} sw={3}></LIcon>
          <div style={{ fontFamily: FONT, fontSize: 21, fontWeight: 700, color: PAL.ink }}>Shipped</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {shipped.map((s, i) => {
            const isNew = i === shipped.length - 1 && landed < 1;
            return (
              <div key={s} style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '7px 11px', borderRadius: 10,
                background: 'rgba(52,211,153,0.11)', border: '1px solid rgba(52,211,153,0.36)',
                fontFamily: FONT, fontSize: 15, fontWeight: 600, color: '#a7f3d0', whiteSpace: 'nowrap',
                transform: `scale(${isNew ? landed : 1})`, transformOrigin: 'left center',
              }}>
                <LIcon name="check" size={14} color={PAL.emerald} sw={3}></LIcon>{s}
              </div>
            );
          })}
        </div>
      </Glass>
      <div style={{ marginTop: 12, fontFamily: FONT, fontSize: 23, fontWeight: 600, color: PAL.body, textAlign: 'center' }}>
        delivered
      </div>
    </div>
  );
}

// ── Knowledge bank ──────────────────────────────────────────────────────────
function KnowledgeBank({ t }) {
  const hot = inWin(t, P.docs);
  return (
    <div style={{ position: 'absolute', left: BANK.x, top: BANK.y, width: BANK.w }}>
      <Glass style={{ width: BANK.w, height: BANK.h, boxSizing: 'border-box', padding: '0 22px', display: 'flex', alignItems: 'center', gap: 20 }} glow={hot}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <LIcon name="library" size={28} color={hot ? '#fff' : 'var(--acc1)'}></LIcon>
          <div style={{ fontFamily: FONT, fontSize: 21, fontWeight: 700, color: PAL.ink, lineHeight: 1.15 }}>Knowledge<br></br>bank</div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {KNOWLEDGE.map((k, i) => {
            const lit = hot && Math.floor((t - P.docs[0]) * 3.2) % KNOWLEDGE.length === i;
            return (
              <div key={k} style={{
                fontFamily: FONT, fontSize: 16, fontWeight: 600, padding: '5px 12px', borderRadius: 9999,
                background: lit ? 'rgba(56,189,248,0.3)' : 'rgba(14,165,233,0.1)',
                border: `1px solid ${lit ? 'rgba(125,211,252,0.75)' : 'rgba(56,189,248,0.3)'}`,
                color: lit ? '#e0f2fe' : '#bae6fd', transition: 'background 200ms, border-color 200ms',
              }}>{k}</div>
            );
          })}
        </div>
      </Glass>
    </div>
  );
}

// ── Rails + fan-out lines ───────────────────────────────────────────────────
function Links({ t, eng, engWin }) {
  const rail = clamp(t / 0.9, 0, 1);
  const bankFeed = clamp((t - 0.4) / 1.0, 0, 1);
  const fade = 1 - Easing.easeInCubic(ph(t, engWin.clear));
  return (
    <svg width={SQ} height={SQ} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <DrawPath d={`M ${IN.x + IN.w} ${IN.y + IN.h / 2} C 320 382, 388 398, ${HUB.x - HUB.r} 402`} p={rail} dash={true}></DrawPath>
      <DrawPath d={`M ${HUB.x + HUB.r} 402 C 700 396, 762 372, ${OUT.x} ${OUT.y + 78}`} p={rail} dash={true}></DrawPath>
      <DrawPath d={`M 700 ${BANK.y + BANK.h} C 686 236, 640 298, ${HUB.x + 52} ${HUB.y - HUB.r}`} p={bankFeed} dash={true} color="rgba(125,211,252,0.5)"></DrawPath>
      <DrawPath d={`M 400 ${BANK.y + BANK.h} C 410 236, 452 298, ${HUB.x - 52} ${HUB.y - HUB.r}`} p={bankFeed} dash={true} color="rgba(125,211,252,0.5)"></DrawPath>
      {eng ? COLS.map((x, i) => (
        <DrawPath key={i}
          d={`M ${HUB.x} ${HUB.y + HUB.r + 72} C ${HUB.x} ${HUB.y + 236}, ${x} ${SLOTS[0].y - 118}, ${x} ${SLOTS[0].y - 36}`}
          p={Easing.easeOutCubic(ph(t, engWin.lines, i * 0.2)) * fade}
          color="rgba(56,189,248,0.6)" width={2.5} glowing={true}></DrawPath>
      )) : null}
    </svg>
  );
}

// ── Doc chips: knowledge bank → hub ─────────────────────────────────────────
function DocChips({ t, docs }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {docs.map((d, i) => {
        const p = Easing.easeInOutSine(clamp((t - (P.docs[0] + i * 0.78)) / 1.15, 0, 1));
        if (p <= 0.02 || p >= 0.99) return null;
        const [x, y] = qbez(p, 742, BANK.y + BANK.h, 860, 260, 660, 330);
        return (
          <div key={i} style={{
            position: 'absolute', left: x, top: y, opacity: Math.sin(p * Math.PI) * 1.5,
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 9,
            background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(56,189,248,0.5)',
            fontFamily: FONT, fontSize: 15, fontWeight: 600, color: '#bae6fd', whiteSpace: 'nowrap',
          }}>
            <LIcon name="file" size={14} color="var(--acc1)"></LIcon>{d}
          </div>
        );
      })}
    </div>
  );
}

// ── Job card: inbox → sticks to the hub → ships to the tray ─────────────────
function JobCard({ t, job }) {
  const drop = Easing.easeOutBack(ph(t, P.drop));
  const travel = Easing.easeInOutCubic(ph(t, P.travel));
  const send = Easing.easeInOutCubic(ph(t, P.deliver));
  if (drop <= 0) return null;

  const inC = IN.x + IN.w / 2;
  const outC = OUT.x + OUT.w / 2;
  const bob = Math.sin(t * 2.1) * 3 * (travel >= 1 && send <= 0 ? 1 : 0);

  const ARRIVE_S = 0.74;                 // sized to the inbox tile, clears the left edge
  let cx, cy, s, op;
  if (send > 0) {
    cx = PIN.x + (outC - PIN.x) * send;
    cy = PIN.y + (OUT.y + 62 - PIN.y) * send;
    s = 1 - send * 0.42;
    op = 1 - clamp((send - 0.68) / 0.32, 0, 1);
  } else {
    // falls in BELOW the knowledge bank (bottom edge 142) and docks onto the inbox tile
    const DOCK_Y = 308;
    cx = inC + (PIN.x - inC) * travel;
    cy = 190 + (DOCK_Y - 190) * drop + (PIN.y - DOCK_Y) * travel + bob;
    s = ARRIVE_S + (1 - ARRIVE_S) * travel;
    op = Math.min(drop * 2.2, 1);
  }
  const stuck = travel >= 1 && send <= 0;
  return (
    <React.Fragment>
      {stuck ? (
        <svg width={SQ} height={SQ} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <DrawPath d={`M ${PIN.x} ${PIN.y + 26} L ${PIN.x} ${HUB.y - HUB.r}`} p={1} dash={true} color="rgba(125,211,252,0.55)"></DrawPath>
        </svg>
      ) : null}
      <div style={{
        position: 'absolute', left: cx, top: cy, opacity: op,
        transform: `translate(-50%, -50%) scale(${s})`,
        display: 'flex', alignItems: 'center', gap: 12, padding: '13px 22px', borderRadius: 15,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05))',
        border: `1px solid ${stuck ? 'rgba(125,211,252,0.6)' : 'rgba(255,255,255,0.32)'}`,
        backdropFilter: 'blur(10px)', whiteSpace: 'nowrap',
        boxShadow: stuck
          ? '0 14px 40px rgba(0,0,0,0.45), 0 0 36px rgba(56,189,248,0.35)'
          : '0 14px 40px rgba(0,0,0,0.45), 0 0 24px rgba(56,189,248,0.2)',
        fontFamily: FONT, fontSize: 24, fontWeight: 600, color: PAL.ink,
      }}>
        <LIcon name={job[1]} size={25} color="var(--acc1)"></LIcon>{job[0]}
      </div>
    </React.Fragment>
  );
}

// ── Rolling agent grid ──────────────────────────────────────────────────────
function AgentGrid({ t, rotCount, rotP, eng, engWin }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {AGENT_ROWS.map((row, g) => {
        const from = ((g - rotCount) % 3 + 3) % 3;
        const wrap = from === 0 && rotP > 0;
        let slot, op;
        if (wrap) {
          const a = SLOTS[0], b = SLOTS[2];
          if (rotP < 0.5) {
            const k = rotP / 0.5;
            slot = { y: a.y + k * 168, scale: a.scale * (1 + k * 0.16) };
            op = Math.pow(1 - k, 2.2);
          } else {
            const k = (rotP - 0.5) / 0.5;
            slot = { y: b.y - (1 - k) * 30, scale: b.scale };
            op = Math.pow(k, 2) * b.op;
          }
        } else {
          const to = ((from - 1) % 3 + 3) % 3;
          const a = SLOTS[from], b = rotP > 0 ? SLOTS[to] : SLOTS[from];
          const rp = Easing.easeInOutCubic(clamp((rotP - 0.22) / 0.78, 0, 1));
          slot = { y: a.y + (b.y - a.y) * rp, scale: a.scale + (b.scale - a.scale) * rp };
          op = a.op + (b.op - a.op) * rp;
        }
        const activeRow = from === 0 && rotP === 0 && eng > 0;
        return row.map(([name, icon], i) => {
          const lit = activeRow && ph(t, engWin.lines, i * 0.2) > 0.72;
          const checkP = activeRow
            ? Easing.easeOutBack(ph(t, engWin.checks, i * 0.34)) * (1 - Easing.easeInCubic(ph(t, engWin.clear)))
            : 0;
          return (
            <div key={g + '-' + name} style={{
              position: 'absolute', left: COLS[i], top: slot.y,
              transform: `translate(-50%, -50%) scale(${slot.scale})`, opacity: op,
            }}>
              <AgentChip name={name} icon={icon} lit={lit} check={checkP}></AgentChip>
            </div>
          );
        });
      })}
    </div>
  );
}

function AgentChip({ name, icon, lit, check }) {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 190 }}>
      <div style={{
        width: 72, height: 72, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: lit ? 'linear-gradient(135deg, var(--acc2), var(--acc1))' : 'rgba(255,255,255,0.07)',
        border: `1px solid ${lit ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.13)'}`,
        boxShadow: lit ? '0 0 36px rgba(56,189,248,0.55)' : 'none',
        transform: `scale(${lit ? 1.06 : 1})`, transition: 'transform 300ms, background 300ms, box-shadow 300ms',
      }}>
        <LIcon name={icon} size={34} color={lit ? '#fff' : '#7dd3fc'}></LIcon>
      </div>
      <div style={{ fontFamily: FONT, fontSize: 22, fontWeight: 600, color: lit ? PAL.ink : PAL.body, whiteSpace: 'nowrap' }}>{name}</div>
      {check > 0.02 ? (
        <div style={{
          position: 'absolute', top: -10, right: 42, width: 32, height: 32, borderRadius: '50%',
          background: PAL.emerald, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${check})`, boxShadow: '0 0 18px rgba(52,211,153,0.6)',
        }}>
          <LIcon name="check" size={19} color="#06281c" sw={3}></LIcon>
        </div>
      ) : null}
    </div>
  );
}

Object.assign(window, { HeroLoop, SquareBackdrop, CY, SQ });
