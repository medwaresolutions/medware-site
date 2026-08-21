// scenes-c.jsx — S8 AI Dev Team, S9 Token Hierarchy, S10 Task Flow

const DEPTS = [
  ['Project Mgmt', 'briefcase'], ['Customer Service', 'headset'], ['Clinical Advisory', 'pulse'],
  ['Security', 'shield'], ['Legal', 'scale'], ['Data Analytics', 'chart'], ['QA Testing', 'bug'],
  ['Back End', 'database'], ['Front End', 'code'], ['Design', 'palette'],
  ['Training', 'graduation'], ['Documentation', 'book'], ['Strategy', 'compass'], ['Business Ops', 'dollar'],
];

function DeptChip({ name, icon, lit = false, scale = 1 }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: 190 * scale,
      transform: `scale(${lit ? 1.06 : 1})`, transition: 'transform 300ms',
    }}>
      <div style={{
        width: 64 * scale, height: 64 * scale, borderRadius: 18,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: lit ? 'linear-gradient(135deg, var(--acc2), var(--acc1))' : 'rgba(255,255,255,0.07)',
        border: `1px solid ${lit ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)'}`,
        boxShadow: lit ? '0 0 34px rgba(56,189,248,0.55)' : 'none',
      }}>
        <Icon name={icon} size={30 * scale} color={lit ? '#fff' : '#7dd3fc'}></Icon>
      </div>
      <div style={{ fontFamily: FONT, fontSize: 20 * scale, fontWeight: 600, color: lit ? PAL.ink : PAL.body, textAlign: 'center', whiteSpace: 'nowrap' }}>{name}</div>
    </div>
  );
}

function AgentAvatar({ label, sub, size = 120, glow = false, color = 'sky' }) {
  const bg = color === 'gold'
    ? 'linear-gradient(135deg, #f59e0b, #fbbf24)'
    : color === 'plain'
      ? 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))'
      : 'linear-gradient(135deg, var(--acc2), var(--acc1))';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: bg,
        border: '2px solid rgba(255,255,255,0.4)',
        boxShadow: glow ? '0 0 60px rgba(56,189,248,0.55)' : '0 8px 28px rgba(0,0,0,0.35)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: FONT, fontSize: size * 0.3, fontWeight: 700, color: '#fff',
      }}>{label[0]}</div>
      <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 700, color: PAL.ink }}>{label}</div>
      {sub ? <div style={{ fontFamily: FONT, fontSize: 21, fontWeight: 500, color: PAL.body, marginTop: -6 }}>{sub}</div> : null}
    </div>
  );
}

// ── S8 · TEAM (103–128) ─────────────────────────────────────────────────────
function SceneTeam() {
  const [t0] = T.team;
  return (
    <Scene at={T.team}>
      {/* Beat 1: a whole company of agents, replicated */}
      <Scene at={[t0, t0 + 7.5]}><AgentCompany></AgentCompany></Scene>
      {/* Beat 2: org chart — me → Atlas → departments */}
      <Scene at={[t0 + 7.5, T.team[1]]}><OrgChart t0={t0 + 7.5}></OrgChart></Scene>
      <Scene at={[t0 + 0.8, t0 + 5.0]}><Caption text="An entire software company — every employee an *AI agent*."></Caption></Scene>
      <Scene at={[t0 + 5.2, t0 + 8.8]}><Caption text="Replicated *across all my projects*."></Caption></Scene>
      <Scene at={[t0 + 9.4, t0 + 14.2]}><Caption text="I talk to *one agent only*: Atlas."></Caption></Scene>
      <Scene at={[t0 + 18.0, T.team[1]]}><Caption text="…who speaks to the heads of *every department*."></Caption></Scene>
    </Scene>
  );
}
function AgentCompany() {
  const { localTime } = useSprite();
  const copies = [0, 1, 2];
  const count = localTime < 4.6 ? '' : localTime < 5.6 ? '×5' : localTime < 6.5 ? '×6' : '×11';
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {copies.map((c) => {
        const show = c === 0 ? 1 : Easing.easeOutCubic(clamp((localTime - (3.8 + c * 0.7)) / 0.6, 0, 1));
        if (show <= 0) return null;
        return (
          <div key={c} style={{
            position: 'absolute', left: 560 - c * 38, top: 240 - c * 34, opacity: c === 0 ? 1 : show * (0.5 - c * 0.12),
            transform: `scale(${0.96 + show * 0.04})`,
          }}>
            <Glass style={{ width: 800, height: 520, padding: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '34px 20px' }}>
                {Array.from({ length: 15 }, (_, i) => {
                  const p = c > 0 ? 1 : Easing.easeOutBack(clamp((localTime - (0.3 + i * 0.12)) / 0.4, 0, 1));
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: p, transform: `scale(${p})` }}>
                      <div style={{ width: 62, height: 62, borderRadius: '50%', background: 'rgba(56,189,248,0.16)', border: '1px solid rgba(56,189,248,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="users" size={26} color="#7dd3fc"></Icon>
                      </div>
                      <div style={{ width: 56, height: 7, borderRadius: 4, background: 'rgba(255,255,255,0.12)' }}></div>
                    </div>
                  );
                })}
              </div>
            </Glass>
          </div>
        );
      })}
      {count ? (
        <div style={{ position: 'absolute', left: 1430, top: 430, fontFamily: FONT, fontSize: 110, fontWeight: 700, color: 'var(--acc1)', textShadow: '0 0 50px rgba(56,189,248,0.5)' }}>{count}</div>
      ) : null}
    </div>
  );
}
function OrgChart() {
  const { localTime } = useSprite();
  const rows = [DEPTS.slice(0, 7), DEPTS.slice(7)];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        <DrawPath d="M 960 215 L 960 280" p={clamp((localTime - 1.6) / 0.5, 0, 1)}></DrawPath>
        {rows[0].map((d, i) => {
          const x = 300 + i * 220;
          return <DrawPath key={i} d={`M 960 480 C 960 560, ${x} 540, ${x} 600`} p={clamp((localTime - (6.2 + i * 0.16)) / 0.7, 0, 1)} color="rgba(125,211,252,0.22)"></DrawPath>;
        })}
      </svg>
      <FadeIn delay={0.3} dy={20} style={{ position: 'absolute', left: 960 - 60, top: 80, width: 120 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 24, fontWeight: 700, color: PAL.ink }}>me</div>
        </div>
      </FadeIn>
      <FadeIn delay={1.8} dy={26} scaleFrom={0.8} style={{ position: 'absolute', left: 960 - 90, top: 295, width: 180 }}>
        <AgentAvatar label="Atlas" size={150} glow={true}></AgentAvatar>
      </FadeIn>
      <FadeIn delay={4.2} dy={14} style={{ position: 'absolute', left: 1090, top: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 9999, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.4)', fontFamily: FONT, fontSize: 23, fontWeight: 600, color: '#fde68a' }}>
          <Icon name="sparkle" size={22} color={PAL.amber}></Icon>runs on Fable — the most powerful model
        </div>
      </FadeIn>
      {rows.map((row, r) => (
        <div key={r} style={{ position: 'absolute', left: 0, right: 0, top: 600 + r * 180, display: 'flex', justifyContent: 'center', gap: 30 }}>
          {row.map((d, i) => {
            const idx = r * 7 + i;
            const p = Easing.easeOutCubic(clamp((localTime - (6.6 + idx * 0.16)) / 0.5, 0, 1));
            return (
              <div key={d[0]} style={{ opacity: p, transform: `translateY(${(1 - p) * 24}px)` }}>
                <DeptChip name={d[0]} icon={d[1]} scale={0.92}></DeptChip>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── S9 · HIERARCHY (128–150) — tokens cost money ────────────────────────────
function SceneHierarchy() {
  const [t0] = T.hierarchy;
  const { showPrice } = React.useContext(VideoSettings);
  return (
    <Scene at={T.hierarchy}>
      <HierarchyTiers></HierarchyTiers>
      <Scene at={[t0 + 0.6, t0 + 4.5]}><Caption text="The hierarchy is deliberate — *tokens cost money*."></Caption></Scene>
      <Scene at={[t0 + 13.2, t0 + 17.0]}><Caption text="I control exactly *who burns the expensive tokens*."></Caption></Scene>
      <Scene at={[t0 + 17.4, T.hierarchy[1]]}><Caption text="Add an agent. Remove one. *Give anyone new skills.*"></Caption></Scene>
      {showPrice ? (
        <Scene at={[t0 + 13.6, T.hierarchy[1]]}>
          <FadeIn delay={0} dy={16} style={{ position: 'absolute', right: 90, top: 120 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 26px', borderRadius: 9999, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.4)', fontFamily: FONT, fontSize: 26, fontWeight: 600, color: PAL.emerald }}>
              <Icon name="dollar" size={26} color={PAL.emerald}></Icon>All of it: Claude Max — $300/month, flat
            </div>
          </FadeIn>
        </Scene>
      ) : null}
    </Scene>
  );
}
function HierarchyTiers() {
  const { localTime } = useSprite();
  const tiers = [
    { name: 'Atlas', sub: 'top model · speaks to me', d: 1.0, y: 170, cost: 3, color: 'sky', size: 130 },
    { name: 'Grace', sub: 'senior agent · top model', d: 4.5, y: 420, cost: 3, color: 'gold', size: 110 },
    { name: 'Oliver', sub: 'lowest model · the grunt work', d: 9.5, y: 660, cost: 1, color: 'plain', size: 92 },
  ];
  const ctrl = [
    { icon: 'plus', label: 'add agent', d: 17.6 },
    { icon: 'minus', label: 'remove', d: 18.2 },
    { icon: 'sparkle', label: 'new skills', d: 18.8 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {tiers.map((tr) => {
        const p = Easing.easeOutCubic(clamp((localTime - tr.d) / 0.7, 0, 1));
        const barP = Easing.easeOutCubic(clamp((localTime - tr.d - 0.6) / 0.8, 0, 1));
        return (
          <div key={tr.name} style={{ position: 'absolute', left: 480, top: tr.y, opacity: p, transform: `translateY(${(1 - p) * 30}px)`, display: 'flex', alignItems: 'center', gap: 60 }}>
            <div style={{ width: 320, display: 'flex', justifyContent: 'center' }}>
              <AgentAvatar label={tr.name} sub={tr.sub} size={tr.size} glow={tr.cost === 3} color={tr.color}></AgentAvatar>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ opacity: i < tr.cost ? barP : 0.12, transform: `scale(${i < tr.cost ? 0.6 + 0.4 * barP : 1})` }}>
                    <Icon name="dollar" size={36} color={i < tr.cost ? PAL.amber : PAL.dim}></Icon>
                  </div>
                ))}
              </div>
              <div style={{ width: 420, height: 16, borderRadius: 8, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                <div style={{ width: `${barP * (tr.cost === 3 ? 92 : 16)}%`, height: '100%', borderRadius: 8, background: tr.cost === 3 ? 'linear-gradient(90deg, var(--acc2), #fbbf24)' : 'rgba(148,163,184,0.6)' }}></div>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 21, fontWeight: 500, color: PAL.dim }}>{tr.cost === 3 ? 'token spend — expensive, deliberate' : 'token spend — cheap, high volume'}</div>
            </div>
          </div>
        );
      })}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <DrawPath d="M 800 330 L 800 410" p={clamp((localTime - 5.2) / 0.5, 0, 1)} dash={true}></DrawPath>
        <DrawPath d="M 800 580 L 800 650" p={clamp((localTime - 10.2) / 0.5, 0, 1)} dash={true}></DrawPath>
      </svg>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 880, display: 'flex', justifyContent: 'center', gap: 24 }}>
        {ctrl.map((c) => {
          const p = Easing.easeOutBack(clamp((localTime - c.d) / 0.5, 0, 1));
          if (p <= 0) return null;
          return (
            <div key={c.label} style={{ transform: `scale(${p})`, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 26px', borderRadius: 9999, background: PAL.glass, border: `1px solid ${PAL.glassBorder}`, fontFamily: FONT, fontSize: 24, fontWeight: 600, color: '#bae6fd' }}>
              <Icon name={c.icon} size={24} color="var(--acc1)"></Icon>{c.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── S10 · TASK FLOW (150–183) ───────────────────────────────────────────────
const FLOW_DEPTS = [
  ['Clinical', 'pulse'], ['Legal', 'scale'], ['Docs', 'book'], ['QA', 'bug'],
  ['Design', 'palette'], ['Training', 'graduation'], ['Back End', 'database'], ['Data', 'chart'],
];
const TASK_A_LIT = { Clinical: 6.6, Legal: 7.1, Docs: 7.6, QA: 8.1 };
const TASK_B_LIT = { Design: 22.0, Docs: 22.7, Training: 23.4, 'Back End': 24.1, Clinical: 24.8 };

function SceneTaskFlow() {
  const [t0] = T.taskFlow;
  return (
    <Scene at={T.taskFlow}>
      <TaskFlowDiagram></TaskFlowDiagram>
      <Scene at={[t0 + 0.8, t0 + 5.6]}><Caption text="Need a *TGA compliance audit pack*? Drop it in the inbox."></Caption></Scene>
      <Scene at={[t0 + 6.0, t0 + 9.8]}><Caption text="Straight to Atlas — the right departments *engage automatically*."></Caption></Scene>
      <Scene at={[t0 + 10.2, t0 + 15.8]}><Caption text="They pull from the Library. *Nothing gets lost.*"></Caption></Scene>
      <Scene at={[t0 + 17.2, t0 + 21.4]}><Caption text="Or drop in the *bulk PBS reimbursement* feature…"></Caption></Scene>
      <Scene at={[t0 + 21.8, t0 + 27.6]}><Caption text="…and it shows me exactly *who's involved*."></Caption></Scene>
      <Scene at={[t0 + 28.0, T.taskFlow[1]]}><Caption text="Off they go — costs kept *to a minimum*."></Caption></Scene>
    </Scene>
  );
}
function TaskFlowDiagram() {
  const { localTime } = useSprite();
  const litA = (name) => TASK_A_LIT[name] != null && localTime >= TASK_A_LIT[name] && localTime < 16;
  const litB = (name) => TASK_B_LIT[name] != null && localTime >= TASK_B_LIT[name];
  const atlasPulse = (localTime > 5.6 && localTime < 6.6) || (localTime > 21 && localTime < 22);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {/* inbox */}
      <FadeIn delay={0.2} dy={24} style={{ position: 'absolute', left: 190, top: 230 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Glass style={{ width: 290, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="inbox" size={64} color="var(--acc1)"></Icon>
          </Glass>
          <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 600, color: PAL.body }}>the inbox</div>
        </div>
      </FadeIn>
      {/* Atlas */}
      <FadeIn delay={0.5} dy={24} style={{ position: 'absolute', left: 880 - 75, top: 300 }}>
        <div style={{ transform: `scale(${atlasPulse ? 1.07 : 1})`, transition: 'transform 350ms' }}>
          <AgentAvatar label="Atlas" size={140} glow={true}></AgentAvatar>
        </div>
      </FadeIn>
      {/* Library */}
      <FadeIn delay={0.8} dy={24} style={{ position: 'absolute', left: 1430, top: 280 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Glass style={{ width: 270, height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center' }} glow={localTime > 10 && localTime < 15}>
            <Icon name="library" size={64} color={localTime > 10 && localTime < 15 ? '#fff' : 'var(--acc1)'}></Icon>
          </Glass>
          <div style={{ fontFamily: FONT, fontSize: 26, fontWeight: 600, color: PAL.body, textAlign: 'center' }}>the Library<br></br><span style={{ fontSize: 20, color: PAL.dim }}>shared knowledge base</span></div>
        </div>
      </FadeIn>
      {/* connection lines */}
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <DrawPath d="M 480 320 C 620 320, 700 360, 790 390" p={clamp((localTime - 1.6) / 0.8, 0, 1)} dash={true}></DrawPath>
        <DrawPath d="M 1430 380 C 1300 380, 1130 390, 1010 395" p={clamp((localTime - 9.8) / 0.8, 0, 1)} dash={true}></DrawPath>
        {FLOW_DEPTS.map(([name], i) => {
          const x = 300 + i * 190;
          const t = (TASK_A_LIT[name] != null && localTime < 16) ? TASK_A_LIT[name] - 0.3
            : TASK_B_LIT[name] != null ? TASK_B_LIT[name] - 0.3 : null;
          if (t == null) return null;
          return <DrawPath key={name + (localTime < 16 ? 'a' : 'b')} d={`M 880 510 C 880 640, ${x} 660, ${x} 740`} p={clamp((localTime - t) / 0.7, 0, 1)} glowing={true} color="rgba(56,189,248,0.55)"></DrawPath>;
        })}
      </svg>
      {/* doc chips flying from library to Atlas */}
      {[0, 1, 2].map((i) => {
        const p = Easing.easeInOutSine(clamp((localTime - (10.8 + i * 0.9)) / 1.2, 0, 1));
        if (p <= 0 || p >= 1) return null;
        return (
          <div key={i} style={{ position: 'absolute', left: 1430 - (1430 - 1000) * p, top: 360 + Math.sin(p * Math.PI) * -40 + i * 16, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 10, background: 'rgba(14,165,233,0.16)', border: '1px solid rgba(56,189,248,0.45)', fontFamily: FONT, fontSize: 19, fontWeight: 600, color: '#bae6fd' }}>
            <Icon name="file" size={18} color="var(--acc1)"></Icon>{['compliance', 'regulatory', 'PBS docs'][i]}
          </div>
        );
      })}
      {/* dept row */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', justifyContent: 'center', gap: 26 }}>
        {FLOW_DEPTS.map(([name, icon], i) => {
          const p = Easing.easeOutCubic(clamp((localTime - (1.2 + i * 0.12)) / 0.5, 0, 1));
          const lit = litA(name) || litB(name);
          return (
            <div key={name} style={{ opacity: p, transform: `translateY(${(1 - p) * 20}px)`, position: 'relative' }}>
              <DeptChip name={name} icon={icon} lit={lit} scale={0.85}></DeptChip>
              {lit ? (
                <div style={{ position: 'absolute', top: -16, right: 12, width: 30, height: 30, borderRadius: '50%', background: PAL.emerald, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(52,211,153,0.6)' }}>
                  <Icon name="check" size={18} color="#06281c" sw={3}></Icon>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {/* task cards */}
      <TaskCard label="TGA compliance audit pack" icon="shield" drop={1.0} move={4.6} fadeAt={15.2}></TaskCard>
      <TaskCard label="Bulk PBS reimbursement feature" icon="zap" drop={17.5} move={20.2} fadeAt={32.4}></TaskCard>
    </div>
  );
}
function TaskCard({ label, icon, drop, move, fadeAt }) {
  const { localTime } = useSprite();
  const dropP = Easing.easeOutBack(clamp((localTime - drop) / 0.9, 0, 1));
  const moveP = Easing.easeInOutCubic(clamp((localTime - move) / 1.4, 0, 1));
  const fade = clamp((fadeAt - localTime) / 0.5, 0, 1);
  if (dropP <= 0 || fade <= 0) return null;
  const x = 215 + (640 - 215) * moveP;
  const y = (-120 + (255 + 120) * dropP) + (205 - 255) * moveP; // parks above Atlas
  return (
    <div style={{
      position: 'absolute', left: x, top: y, opacity: Math.min(dropP * 2, 1) * fade,
      display: 'flex', alignItems: 'center', gap: 14, padding: '16px 26px', borderRadius: 18,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
      border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)',
      boxShadow: '0 14px 40px rgba(0,0,0,0.45), 0 0 30px rgba(56,189,248,0.2)',
      fontFamily: FONT, fontSize: 25, fontWeight: 600, color: PAL.ink, whiteSpace: 'nowrap',
    }}>
      <Icon name={icon} size={28} color="var(--acc1)"></Icon>{label}
    </div>
  );
}

Object.assign(window, { SceneTeam, SceneHierarchy, SceneTaskFlow, DeptChip, AgentAvatar });
