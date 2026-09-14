/* ============================================================
   VOID SYSTEMS v5.0 — Terminal / OS Simulator
   Author: MuncixOp
   ============================================================ */

/* ---------- OS DETECTION ---------- */
const ua = navigator.userAgent;
const os = (() => {
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Mac|Darwin/.test(ua)) return 'mac';
  if (/Win/.test(ua)) return 'win';
  if (/Linux/.test(ua)) return 'linux';
  return 'linux';
})();
const mob = os === 'ios' || os === 'android' || matchMedia('(max-width:700px)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;
document.body.classList.add('os-' + os);
if (mob) document.body.classList.add('mobile-eye');

/* ============================================================
   LINKS PROTEGIDOS
   ============================================================ */
const LINKS_DB = {
  curseforge: {
    name: 'CurseForge Projects',
    url: 'https://www.curseforge.com/members/muncixop/projects',
    icon: '[CF]',
    token: 'CF7X-MUNC1X0P-V01D',
    hint: 'El token de CurseForge empieza con CF7X-'
  },
  tiktok: {
    name: 'TikTok @muncixop',
    url: 'https://www.tiktok.com/@muncixop',
    icon: '[TT]',
    token: 'TT9-MUNCIX-2024',
    hint: 'El token de TikTok empieza con TT9-'
  },
  twitter: {
    name: 'X (Twitter) @MuncixOp',
    url: 'https://x.com/MuncixOp',
    icon: '[X]',
    token: 'X0-MUNCIXOP-ALPHA',
    hint: 'El token de X empieza con X0-'
  }
};

/* ============================================================
   OJO ASCII
   ============================================================ */
const EYE_ASCII = [
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@%%%%%####%#####%%%@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@%#*+***#%%@@@@@@%#####%%@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@#**++++#@@@@@@@@@@@@%**###%@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@%#+++=-=*@@@@@@@@@@@@@@@@#****##%@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@%**+===-=#@@@@@@@@@@@@@@@@@@#*****#%@@@@@@@@@@@@@@@',
  '@@@@@@@@@@#++=====*@@@@@@@*%@#@@@@@%@@@#**+**##%@@@@@@@@@@@@@',
  '@@@@@@@@@#*++====+#@@@@@@@@@@@@@@@@@@@@%*****#%%@@@@@@@@@@@@@',
  '@@@@@@@@%#*++++=++%@@@@@@@@@@@@@@@@@@@@%*****##%@@@@@@@@@@@@@',
  '@@@@@@@%%#****++++#@@@@@@@@@@@@@@@@@@@@##***###%%@@@%@@@@@@@@',
  '@@@@@@@@%%###**+++*%@@@@@@@@@@@@@@@@@@%########%%@@@@@%#%@@@@',
  '@@@@@@@@@%%%#*******%@@@@@@@@@@@@@@@@%##**#*##%%@@@@@@%@@@@@@',
  '@@@@@@@@@@%%##*******#%@@@@@@@@@@@@@%########%%@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@%%###*******%@@@@@@@@@%######%%%%@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@%%%#####**#*##%%%%##%%%%%%@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@%%%%%###%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
];

const EYE_ASCII_SMALL = [
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@%%%%%####%@@%%@@@@',
  '@@@@@@@@@@%#*+***#%%@@@@%###%%@',
  '@@@@@@@@%#*++++#@@@@@@@@@%**###',
  '@@@@@@%#+++=-=*@@@@@@@@@@@#****',
  '@@@@@@#*++====+#@@@@@@@*%@#@@@@',
  '@@@@@%#*++++=++%@@@@@@@@@@@@@@@',
  '@@@@%%#****++++#@@@@@@@@@@@@@@@',
  '@@@@%%###**+++*%@@@@@@@@@@@@@@@',
  '@@@@@%%%#*******%@@@@@@@@@@@@@@',
  '@@@@@@%%##*******#%@@@@@@@@@@@@',
  '@@@@@@@@%%###*******%@@@@@@@@@@',
  '@@@@@@@@@@%%%#####**#*##%%%@@@@',
  '@@@@@@@@@@@@@@@@%%%%%###%%@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
];

function getEye() { return mob ? EYE_ASCII_SMALL : EYE_ASCII; }

/* ============================================================
   STORAGE
   ============================================================ */
const HIST_KEY = 'void_history';
let cmdHistory = (() => {
  try { return JSON.parse(localStorage.getItem(HIST_KEY) || '[]'); }
  catch { return []; }
})();
function saveHistory() {
  try { localStorage.setItem(HIST_KEY, JSON.stringify(cmdHistory.slice(-200))); } catch {}
}

const ACH_KEY = 'void_achievements';
let achievements = (() => {
  try { return JSON.parse(localStorage.getItem(ACH_KEY) || '{}'); }
  catch { return {}; }
})();
function unlockAch(key, name) {
  if (achievements[key]) return;
  achievements[key] = { name, at: Date.now() };
  try { localStorage.setItem(ACH_KEY, JSON.stringify(achievements)); } catch {}
  showAchToast(name);
}
function showAchToast(name) {
  const toast = document.createElement('div');
  toast.className = 'ach-toast';
  toast.innerHTML = `
    <div class="ach-title">LOGRO DESBLOQUEADO</div>
    <div class="ach-desc">${escapeHTML(name)}</div>
    <div class="ach-meta">${new Date().toLocaleTimeString()}</div>
  `;
  document.body.appendChild(toast);
  playSuccess();
  setTimeout(() => {
    toast.style.animation = 'achIn .4s reverse forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3400);
}

const UNLOCKED_KEY = 'void_unlocked_links';
let unlockedLinks = (() => {
  try { return JSON.parse(localStorage.getItem(UNLOCKED_KEY) || '{}'); }
  catch { return {}; }
})();
function saveUnlocked() {
  try { localStorage.setItem(UNLOCKED_KEY, JSON.stringify(unlockedLinks)); } catch {}
}

/* ============================================================
   AUDIO ENGINE
   ============================================================ */
let actx = null;
let audioEnabled = true;

function audio() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  if (actx.state === 'suspended') actx.resume();
  return actx;
}
function noiseBuf(a, dur) {
  const b = a.createBuffer(1, a.sampleRate * dur, a.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}
function playKey() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain();
    o1.type = 'square'; o1.frequency.value = 600 + Math.random() * 600;
    o2.type = 'sawtooth'; o2.frequency.value = 1200 + Math.random() * 1200;
    g.gain.setValueAtTime(.02, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .03);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .03); o2.start(t); o2.stop(t + .03);
  } catch (e) {}
}
function playEnter() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), g = a.createGain();
    o1.type = 'square';
    o1.frequency.setValueAtTime(400, t);
    o1.frequency.exponentialRampToValueAtTime(1600, t + .06);
    g.gain.setValueAtTime(.05, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .1);
    o1.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .1);
  } catch (e) {}
}
function playError() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), g = a.createGain();
    o1.type = 'sawtooth';
    o1.frequency.setValueAtTime(300, t);
    o1.frequency.exponentialRampToValueAtTime(60, t + .3);
    g.gain.setValueAtTime(.07, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .35);
    o1.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .35);
  } catch (e) {}
}
function playSuccess() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    [500, 750, 1000, 1250].forEach((f, i) => {
      const o = a.createOscillator(), g = a.createGain();
      o.type = 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(.035, t + i * .05);
      g.gain.exponentialRampToValueAtTime(.001, t + i * .05 + .12);
      o.connect(g); g.connect(a.destination);
      o.start(t + i * .05); o.stop(t + i * .05 + .12);
    });
  } catch (e) {}
}
function playGlitch() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const n1 = a.createBufferSource(), g1 = a.createGain();
    n1.buffer = noiseBuf(a, .2);
    g1.gain.setValueAtTime(.08, t);
    g1.gain.exponentialRampToValueAtTime(.001, t + .2);
    n1.connect(g1); g1.connect(a.destination); n1.start(t); n1.stop(t + .2);
    const o = a.createOscillator(), g2 = a.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(2000, t);
    o.frequency.exponentialRampToValueAtTime(100, t + .15);
    g2.gain.setValueAtTime(.05, t);
    g2.gain.exponentialRampToValueAtTime(.001, t + .15);
    o.connect(g2); g2.connect(a.destination); o.start(t); o.stop(t + .15);
  } catch (e) {}
}
function playBoot() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain();
    o1.type = 'sine';
    o1.frequency.setValueAtTime(110, t);
    o1.frequency.exponentialRampToValueAtTime(440, t + .4);
    o2.type = 'square';
    o2.frequency.setValueAtTime(220, t);
    o2.frequency.exponentialRampToValueAtTime(880, t + .3);
    g.gain.setValueAtTime(.04, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .5);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .5); o2.start(t); o2.stop(t + .5);
  } catch (e) {}
}
function playTick(freq) {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'square';
    o.frequency.value = freq || (600 + Math.random() * 400);
    g.gain.setValueAtTime(.015, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .02);
    o.connect(g); g.connect(a.destination);
    o.start(t); o.stop(t + .02);
  } catch (e) {}
}
function playBeep(freq, dur) {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'sine';
    o.frequency.value = freq || 880;
    g.gain.setValueAtTime(.05, t);
    g.gain.exponentialRampToValueAtTime(.001, t + (dur || .1));
    o.connect(g); g.connect(a.destination);
    o.start(t); o.stop(t + (dur || .1));
  } catch (e) {}
}
function playWhoosh() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const n = a.createBufferSource(), g = a.createGain(), f = a.createBiquadFilter();
    n.buffer = noiseBuf(a, .5);
    f.type = 'lowpass';
    f.frequency.setValueAtTime(1200, t);
    f.frequency.exponentialRampToValueAtTime(200, t + .5);
    g.gain.setValueAtTime(.04, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .5);
    n.connect(f); f.connect(g); g.connect(a.destination);
    n.start(t); n.stop(t + .5);
  } catch (e) {}
}
function playImpact() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o = a.createOscillator(), g = a.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(80, t);
    o.frequency.exponentialRampToValueAtTime(30, t + .4);
    g.gain.setValueAtTime(.15, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .4);
    o.connect(g); g.connect(a.destination);
    o.start(t); o.stop(t + .4);
    const n = a.createBufferSource(), ng = a.createGain();
    n.buffer = noiseBuf(a, .15);
    ng.gain.setValueAtTime(.08, t);
    ng.gain.exponentialRampToValueAtTime(.001, t + .15);
    n.connect(ng); ng.connect(a.destination); n.start(t); n.stop(t + .15);
  } catch (e) {}
}
function playPowerUp() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    for (let i = 0; i < 5; i++) {
      const o = a.createOscillator(), g = a.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(300 + i * 200, t + i * .06);
      g.gain.setValueAtTime(.03, t + i * .06);
      g.gain.exponentialRampToValueAtTime(.001, t + i * .06 + .1);
      o.connect(g); g.connect(a.destination);
      o.start(t + i * .06); o.stop(t + i * .06 + .1);
    }
  } catch (e) {}
}

/* ============================================================
   MATRIX CANVAS (fondo)
   ============================================================ */
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W, H, cols, drops, fontSize = 14;
const chars = 'アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロ0123456789ABCDEF';

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  cols = Math.floor(W / fontSize);
  drops = new Array(cols).fill(0).map(() => Math.random() * H / fontSize);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let matrixActive = true;
function drawMatrix() {
  if (matrixActive && !reducedMotion) {
    ctx.fillStyle = 'rgba(6,6,6,0.06)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = fontSize + 'px monospace';
    const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#3ddc84';
    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const y = drops[i] * fontSize;
      ctx.fillStyle = Math.random() > 0.98 ? accent : '#0f0';
      ctx.fillText(ch, i * fontSize, y);
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  requestAnimationFrame(drawMatrix);
}
if (!reducedMotion) drawMatrix();

/* ============================================================
   PARTICLE CANVAS (encima)
   ============================================================ */
const pcanvas = document.getElementById('p');
const pctx = pcanvas.getContext('2d');
let pW, pH;
function resizeParticles() {
  pW = pcanvas.width = window.innerWidth;
  pH = pcanvas.height = window.innerHeight;
}
resizeParticles();
window.addEventListener('resize', resizeParticles);

const particles = [];
const PARTICLE_COUNT = mob ? 20 : 50;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * (pW || window.innerWidth),
    y: Math.random() * (pH || window.innerHeight),
    vx: (Math.random() - .5) * .4,
    vy: (Math.random() - .5) * .4,
    size: Math.random() * 2 + .5,
    alpha: Math.random() * .5 + .2,
    char: Math.random() > .5 ? '·' : '˙',
  });
}

function drawParticles() {
  if (reducedMotion) { requestAnimationFrame(drawParticles); return; }
  pctx.clearRect(0, 0, pW, pH);
  const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#3ddc84';
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = pW;
    if (p.x > pW) p.x = 0;
    if (p.y < 0) p.y = pH;
    if (p.y > pH) p.y = 0;
    pctx.fillStyle = accent;
    pctx.globalAlpha = p.alpha;
    pctx.font = `${p.size * 4}px monospace`;
    pctx.fillText(p.char, p.x, p.y);
  });
  pctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ============================================================
   WINDOW SYSTEM
   ============================================================ */
const winsContainer = document.getElementById('wins');
const dock = document.getElementById('dock');
const launcher = document.getElementById('launcher');
let zIndex = 10;
const openWindows = new Map();

function createWindow(title, options = {}) {
  const id = 'w_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  const win = document.createElement('div');
  win.className = 'win';
  win.dataset.id = id;

  const w = options.width || 720;
  const h = options.height || 540;
  const x = options.x ?? Math.max(20, (window.innerWidth - w) / 2 + (Math.random() * 60 - 30));
  const y = options.y ?? Math.max(20, (window.innerHeight - h) / 2 - 40 + (Math.random() * 40 - 20));

  win.style.left = Math.max(10, Math.min(x, window.innerWidth - w - 10)) + 'px';
  win.style.top = Math.max(10, Math.min(y, window.innerHeight - 100)) + 'px';
  win.style.width = w + 'px';
  win.style.height = h + 'px';
  win.style.zIndex = ++zIndex;

  win.innerHTML = `
    <div class="win-bar">
      <div class="btns">
        <button class="btn close" aria-label="Cerrar"></button>
        <button class="btn min" aria-label="Minimizar"></button>
        <button class="btn max" aria-label="Maximizar"></button>
      </div>
      <div class="win-title">${title}</div>
      <div class="btns-r"></div>
    </div>
    <div class="win-body"></div>
    <div class="rz"></div>
  `;

  winsContainer.appendChild(win);
  openWindows.set(id, { el: win, title, minimized: false });
  updateLauncher();

  win.addEventListener('mousedown', () => { win.style.zIndex = ++zIndex; });

  // Double click title bar = maximize
  win.querySelector('.win-bar').addEventListener('dblclick', () => toggleMaximize(id));

  win.querySelector('.close').addEventListener('click', (e) => { e.stopPropagation(); closeWindow(id); });
  win.querySelector('.min').addEventListener('click', (e) => { e.stopPropagation(); minimizeWindow(id); });
  win.querySelector('.max').addEventListener('click', (e) => { e.stopPropagation(); toggleMaximize(id); });

  makeDraggable(win, win.querySelector('.win-bar'));
  makeResizable(win, win.querySelector('.rz'));

  // Custom event when window body is set up
  return { id, el: win, body: win.querySelector('.win-body') };
}

function closeWindow(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.el.classList.add('closing');
  playGlitch();
  setTimeout(() => {
    entry.el.remove();
    openWindows.delete(id);
    updateDock();
    updateLauncher();
  }, 380);
}
function minimizeWindow(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.minimized = true;
  entry.el.classList.add('minimized');
  updateDock();
  playKey();
}
function restoreWindow(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.minimized = false;
  entry.el.classList.remove('minimized');
  entry.el.style.zIndex = ++zIndex;
  updateDock();
  playKey();
}
function toggleMaximize(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.el.classList.toggle('maximized');
  playKey();
}
function updateDock() {
  dock.innerHTML = '';
  let hasMin = false;
  openWindows.forEach((entry, id) => {
    if (entry.minimized) {
      hasMin = true;
      const item = document.createElement('button');
      item.className = 'dock-item';
      item.textContent = entry.title;
      item.addEventListener('click', () => restoreWindow(id));
      dock.appendChild(item);
    }
  });
  dock.classList.toggle('on', hasMin);
}

function updateLauncher() {
  const shouldShow = openWindows.size === 0;
  launcher.classList.toggle('on', shouldShow);
}

function makeDraggable(win, handle) {
  let sx, sy, ox, oy, dragging = false;
  const start = (e) => {
    if (win.classList.contains('maximized')) return;
    if (e.target.closest('.btn')) return;
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX; sy = p.clientY; ox = win.offsetLeft; oy = win.offsetTop;
    dragging = true; win.classList.add('dragging'); win.style.zIndex = ++zIndex;
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('mouseup', end);
    document.addEventListener('touchend', end);
  };
  const move = (e) => {
    if (!dragging) return;
    if (e.cancelable) e.preventDefault();
    const p = e.touches ? e.touches[0] : e;
    let nx = ox + (p.clientX - sx);
    let ny = oy + (p.clientY - sy);
    nx = Math.max(-win.offsetWidth + 80, Math.min(nx, window.innerWidth - 80));
    ny = Math.max(0, Math.min(ny, window.innerHeight - 40));
    win.style.left = nx + 'px';
    win.style.top = ny + 'px';
  };
  const end = () => {
    dragging = false; win.classList.remove('dragging');
    document.removeEventListener('mousemove', move);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchend', end);
  };
  handle.addEventListener('mousedown', start);
  handle.addEventListener('touchstart', start, { passive: false });
}
function makeResizable(win, handle) {
  let sx, sy, ow, oh, resizing = false;
  const start = (e) => {
    if (win.classList.contains('maximized')) return;
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX; sy = p.clientY; ow = win.offsetWidth; oh = win.offsetHeight;
    resizing = true; win.classList.add('resizing');
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('mouseup', end);
    document.addEventListener('touchend', end);
  };
  const move = (e) => {
    if (!resizing) return;
    if (e.cancelable) e.preventDefault();
    const p = e.touches ? e.touches[0] : e;
    const nw = Math.max(280, ow + (p.clientX - sx));
    const nh = Math.max(180, oh + (p.clientY - sy));
    win.style.width = nw + 'px';
    win.style.height = nh + 'px';
  };
  const end = () => {
    resizing = false; win.classList.remove('resizing');
    document.removeEventListener('mousemove', move);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchend', end);
  };
  handle.addEventListener('mousedown', start);
  handle.addEventListener('touchstart', start, { passive: false });
}

function showError(title, message) {
  const pop = document.createElement('div');
  pop.className = 'err-pop';
  pop.innerHTML = `<h3>${title}</h3><p>${message}</p><button class="err-btn">Entendido</button>`;
  document.body.appendChild(pop);
  playError();
  const close = () => { pop.style.animation = 'errIn .3s reverse'; setTimeout(() => pop.remove(), 260); };
  pop.querySelector('.err-btn').addEventListener('click', close);
  setTimeout(() => { if (pop.parentNode) close(); }, 6000);
}

/* ============================================================
   EFFECTS HELPERS
   ============================================================ */
function effectRipple(x, y) {
  const r = document.createElement('div');
  r.className = 'ripple';
  r.style.left = x + 'px';
  r.style.top = y + 'px';
  r.style.width = '20px';
  r.style.height = '20px';
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 800);
}

function effectFlash(color) {
  const f = document.createElement('div');
  f.className = 'screen-flash';
  if (color) f.style.background = color;
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 320);
}

function effectQuake() {
  document.body.classList.remove('quake');
  void document.body.offsetWidth;
  document.body.classList.add('quake');
  playImpact();
  setTimeout(() => document.body.classList.remove('quake'), 700);
}

function effectGlitchSlice() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const s = document.createElement('div');
      s.className = 'glitch-slice';
      s.style.top = (Math.random() * window.innerHeight) + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 320);
    }, i * 60);
  }
}

function effectConfetti(count = 30) {
  const colors = ['#3ddc84', '#5eaaff', '#c77dff', '#ffcc00', '#ff5fa2', '#00ffff'];
  const glyphs = ['*', '+', '·', '×', '◆', '□', '■', '◇', '○', '●'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      c.style.left = Math.random() * 100 + 'vw';
      c.style.color = colors[Math.floor(Math.random() * colors.length)];
      c.style.fontSize = (Math.random() * 14 + 10) + 'px';
      c.style.animationDuration = (Math.random() * 2 + 2) + 's';
      c.style.animationDelay = '0s';
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 4200);
    }, i * 30);
  }
}

function scrambleText(el, target, duration = 500) {
  const chars = '!@#$%^&*()_+-=[]{}|;:<>?/\\`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const start = performance.now();
  const original = target;
  function frame() {
    const elapsed = performance.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    let out = '';
    for (let i = 0; i < original.length; i++) {
      if (i < original.length * progress) {
        out += original[i];
      } else {
        out += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = out;
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = original;
  }
  frame();
}

/* ============================================================
   HELPERS
   ============================================================ */
const PROMPT_USER = 'muncixop';
const PROMPT_HOST = 'void';
const PROMPT_PATH = '~';

function getPromptHTML() {
  return `<span class="pr">${PROMPT_USER}@${PROMPT_HOST}:<span class="path">${PROMPT_PATH}</span>$&nbsp;</span>`;
}
function printLine(body, text, cls = '') {
  const line = document.createElement('div');
  line.className = 'out ' + cls;
  line.innerHTML = text;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;
  return line;
}
function printLines(body, lines) {
  lines.forEach(([text, cls]) => printLine(body, text, cls || ''));
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function randomHex(len) {
  let s = '';
  const h = '0123456789ABCDEF';
  for (let i = 0; i < len; i++) s += h[Math.floor(Math.random() * 16)];
  return s;
}
function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function padEnd(s, n, c = ' ') { s = String(s); while (s.length < n) s += c; return s; }
function padStart(s, n, c = ' ') { s = String(s); while (s.length < n) s = c + s; return s; }

/* ============================================================
   BRUTEFORCE
   ============================================================ */
function launchBruteforce(win, linkKey) {
  const link = LINKS_DB[linkKey];
  if (!link) return;

  const body = win.body;
  printLine(body, '');
  printLine(body, `:: INICIANDO PROTOCOLO DE FUERZA BRUTA sobre ${escapeHTML(link.name)}`, 'accent');
  printLine(body, `:: Objetivo: ${escapeHTML(link.url)}`, 'dim');
  printLine(body, `:: Pista: ${escapeHTML(link.hint)}`, 'warn');
  printLine(body, `:: Escribe: unlock ${linkKey} TOKEN`, 'dim');
  printLine(body, '');
  effectGlitchSlice();

  const panel = document.createElement('div');
  panel.className = 'brute-panel';
  panel.innerHTML = `
    <div class="brute-header"><span class="lock">[LOCK]</span> BRUTEFORCE ACTIVE - TARGET: ${escapeHTML(link.name)}</div>
    <div class="brute-target">
      <span class="label">URL  </span> <span class="val">${escapeHTML(link.url)}</span><br>
      <span class="label">HASH </span> <span class="val" id="brute-hash-${linkKey}">${randomHex(32)}</span>
    </div>
    <div class="brute-display" id="brute-display-${linkKey}"></div>
    <div class="brute-progress"><div class="brute-progress-bar" id="brute-bar-${linkKey}"></div></div>
    <div class="brute-stats">
      <span>INTENTOS: <span class="stat-val" id="brute-attempts-${linkKey}">0</span></span>
      <span>VELOCIDAD: <span class="stat-val" id="brute-speed-${linkKey}">0</span> H/s</span>
      <span>ETA: <span class="stat-val" id="brute-eta-${linkKey}">--</span></span>
    </div>
    <div class="brute-terminal" id="brute-term-${linkKey}"></div>
  `;
  body.appendChild(panel);
  body.scrollTop = body.scrollHeight;

  const displayEl = panel.querySelector(`#brute-display-${linkKey}`);
  const barEl = panel.querySelector(`#brute-bar-${linkKey}`);
  const attEl = panel.querySelector(`#brute-attempts-${linkKey}`);
  const speedEl = panel.querySelector(`#brute-speed-${linkKey}`);
  const etaEl = panel.querySelector(`#brute-eta-${linkKey}`);
  const termEl = panel.querySelector(`#brute-term-${linkKey}`);
  const hashEl = panel.querySelector(`#brute-hash-${linkKey}`);

  let attempts = 0;
  let running = true;
  const maxAttempts = 99999;
  const termPhrases = [
    '[+] Estableciendo conexion con el objetivo...',
    '[+] Evadiendo firewall perimetral...',
    '[+] Inyectando payload en el handshake...',
    '[+] Analizando entropia del token...',
    '[+] Correlacionando patrones debiles...',
    '[+] Fuerza bruta paralela iniciada (64 hilos)...',
    '[!] Bloqueo temporal detectado, rotando proxy...',
    '[+] Consultando rainbow tables...',
    '[+] Reduciendo espacio de busqueda...',
    '[!] Servidor respondiendo lento, aumentando timeout...',
    '[+] Descifrando handshake TLS...',
    '[+] Interceptando paquetes en la subred...',
    '[+] Inyectando payload en el handshake...',
    '[!] Sobrecalentando GPU, bajando intensidad...',
    '[+] Corrompiendo checksum del servidor...',
  ];

  const termInterval = setInterval(() => {
    if (!running) return;
    if (Math.random() > .55) {
      const p = randomFrom(termPhrases);
      const line = document.createElement('div');
      line.textContent = `[${new Date().toLocaleTimeString()}] ${p}`;
      termEl.appendChild(line);
      termEl.scrollTop = termEl.scrollHeight;
      if (termEl.children.length > 30) termEl.removeChild(termEl.firstChild);
    }
  }, 900);

  function attempt() {
    if (!running) return;
    attempts += Math.floor(Math.random() * 800) + 200;

    for (let i = 0; i < 2; i++) {
      const fakeHash = randomHex(12);
      const line = document.createElement('div');
      line.className = 'brute-line';
      const r = Math.random();
      if (r > 0.92) {
        line.innerHTML = `<span class="hash">0x${fakeHash}</span>  <span class="attempt">-> ${randomHex(16)}</span>  <span class="success">[MATCH?]</span>`;
      } else if (r > 0.7) {
        line.innerHTML = `<span class="hash">0x${fakeHash}</span>  <span class="attempt">-> ${randomHex(16)}</span>  <span class="fail">x</span>`;
      } else {
        line.innerHTML = `<span class="hash">0x${fakeHash}</span>  <span class="attempt">-> ${randomHex(16)}</span>`;
      }
      displayEl.appendChild(line);
    }
    while (displayEl.children.length > 25) displayEl.removeChild(displayEl.firstChild);
    displayEl.scrollTop = displayEl.scrollHeight;

    const speed = Math.floor(Math.random() * 50000) + 20000;
    const progress = Math.min(attempts / maxAttempts * 100, 99.4);
    attEl.textContent = attempts.toLocaleString();
    speedEl.textContent = speed.toLocaleString();
    barEl.style.width = progress + '%';
    const etaSec = Math.max(1, Math.floor((maxAttempts - attempts) / speed));
    etaEl.textContent = etaSec + 's';
    hashEl.textContent = randomHex(32);

    if (Math.random() > .7) playTick(600 + Math.random() * 400);
    setTimeout(attempt, 250 + Math.random() * 400);
  }
  attempt();

  body._bruteforce = body._bruteforce || {};
  body._bruteforce[linkKey] = {
    stop: () => { running = false; clearInterval(termInterval); }
  };
}

function showUnlockResult(win, linkKey) {
  const link = LINKS_DB[linkKey];
  const body = win.body;

  if (body._bruteforce && body._bruteforce[linkKey]) {
    body._bruteforce[linkKey].stop();
    delete body._bruteforce[linkKey];
  }

  unlockedLinks[linkKey] = true;
  saveUnlocked();
  playSuccess();
  effectConfetti(40);
  effectFlash('rgba(61,220,132,.3)');
  unlockAch('first_unlock', 'Primer desbloqueo');

  printLine(body, '');
  printLine(body, '=========================================', 'ok');
  printLine(body, '=   [OK] TOKEN VALIDO - ACCESO CONCEDIDO  =', 'ok');
  printLine(body, '=========================================', 'ok');

  const result = document.createElement('div');
  result.className = 'unlock-result';
  result.innerHTML = `
    <div class="header">${escapeHTML(link.name)} - DESBLOQUEADO</div>
    <div class="token-box">TOKEN: ${escapeHTML(link.token)}</div>
    <button class="copy-token" data-token="${escapeHTML(link.token)}">[ Copiar token ]</button>
    <div class="lnk">
      <a href="${escapeHTML(link.url)}" target="_blank" rel="noopener">
        <span class="n">-></span>${escapeHTML(link.icon)} ${escapeHTML(link.name)}
        <span class="dim">(${escapeHTML(link.url)})</span>
      </a>
    </div>
  `;
  body.appendChild(result);
  body.scrollTop = body.scrollHeight;

  result.querySelector('.copy-token').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    navigator.clipboard.writeText(btn.dataset.token).then(() => {
      btn.textContent = '[ Copiado ]';
      setTimeout(() => btn.textContent = '[ Copiar token ]', 1500);
    }).catch(() => {
      btn.textContent = '[ Error ]';
      setTimeout(() => btn.textContent = '[ Copiar token ]', 1500);
    });
  });
}

/* ============================================================
   BLINK DEL OJO
   ============================================================ */
function blinkEye(body) {
  const eyeLines = body.querySelectorAll('.out.eye');
  if (!eyeLines.length) return;
  eyeLines.forEach(l => l.style.opacity = '0');
  playBeep(180, .04);
  setTimeout(() => {
    eyeLines.forEach(l => l.style.opacity = '1');
  }, 110);
  if (Math.random() > .5) {
    setTimeout(() => {
      eyeLines.forEach(l => l.style.opacity = '0');
      setTimeout(() => eyeLines.forEach(l => l.style.opacity = '1'), 70);
    }, 180);
  }
}
/* ============================================================
   COMANDOS
   ============================================================ */
const COMMANDS = {
  help: {
    desc: 'Muestra los comandos disponibles',
    run: (body) => {
      printLine(body, '+-- COMANDOS DISPONIBLES --------------------------+', 'accent');
      const cmds = [
        ['help', 'esta ayuda'],
        ['about', 'informacion sobre mi'],
        ['projects', 'proyectos destacados'],
        ['skills', 'habilidades tecnicas'],
        ['contact', 'formas de contacto'],
        ['social', 'redes y paginas (con desbloqueo)'],
        ['links', 'lista de paginas bloqueadas'],
        ['unlock <key> <token>', 'desbloquea una pagina con token'],
        ['hack <key>', 'inicia bruteforce visual'],
        ['scan', 'escaneo de red visual'],
        ['trace <host>', 'traceroute simulado'],
        ['whois <host>', 'informacion whois simulada'],
        ['ping <host>', 'ping simulado'],
        ['nmap <target>', 'escaneo de puertos'],
        ['curl <url>', 'HTTP GET simulado'],
        ['ps', 'procesos en ejecucion'],
        ['top', 'monitor de recursos'],
        ['tree', 'arbol de directorios'],
        ['ls', 'lista archivos'],
        ['pwd', 'directorio actual'],
        ['decrypt', 'minijuego de descifrado'],
        ['cowsay <texto>', 'vaca que dice cosas'],
        ['fortune', 'frase aleatoria'],
        ['weather [ciudad]', 'clima simulado'],
        ['crypto [symbol]', 'precios de cripto simulados'],
        ['dice [caras]', 'tira los dados'],
        ['8ball <pregunta>', 'bola magica'],
        ['random', 'dato aleatorio'],
        ['countdown <n>', 'cuenta atras'],
        ['spinner', 'spinner animado'],
        ['type <texto>', 'efecto typewriter'],
        ['rainbow <texto>', 'texto arcoiris'],
        ['scramble <texto>', 'efecto scramble'],
        ['ascii <texto>', 'banner ASCII'],
        ['confetti', 'lluvia de confetti'],
        ['theme <color>', 'cambia el color de acento'],
        ['cyberpunk', 'modo glitch extremo'],
        ['hypnotize', 'efecto hipnotico'],
        ['flash', 'flash de pantalla'],
        ['quake', 'terremoto visual'],
        ['history', 'historial de comandos'],
        ['achievements', 'logros desbloqueados'],
        ['fastfetch', 'info del sistema (con ojo)'],
        ['neofetch', 'alias de fastfetch'],
        ['list', 'muestra tokens ya desbloqueados'],
        ['whoami', 'quien eres'],
        ['date', 'fecha y hora actual'],
        ['clear', 'limpia la pantalla'],
        ['matrix', 'activa/desactiva fondo Matrix'],
        ['glitch', 'efecto glitch'],
        ['os <mac|win|linux|android|ios>', 'cambia el tema de SO'],
        ['sound', 'activa/desactiva audio'],
        ['reset', 'borra tokens guardados'],
        ['reboot', 'reinicia la terminal'],
        ['void', 'abre una nueva terminal'],
        ['close', 'cierra la terminal'],
        ['sudo', 'prueba suerte'],
        ['banner', 'muestra el banner'],
        ['exit', 'cierra la ventana'],
      ];
      cmds.forEach(([c, d]) => {
        printLine(body, `  <span class="ok">${padEnd(c, 32)}</span><span class="dim">${d}</span>`);
      });
      printLine(body, '+--------------------------------------------------+', 'accent');
    }
  },

  about: {
    desc: 'Sobre MuncixOp',
    run: (body) => {
      printLines(body, [
        ['', ''],
        ['  ███╗   ███╗ ██████╗ ', 'accent'],
        ['  ████╗ ████║██╔═══██╗', 'accent'],
        ['  ██╔████╔██║██║   ██║', 'accent'],
        ['  ██║╚██╔╝██║██║   ██║', 'accent'],
        ['  ██║ ╚═╝ ██║╚██████╔╝', 'accent'],
        ['  ╚═╝     ╚═╝ ╚═════╝ ', 'accent'],
        ['', ''],
        ['  Muncix_Op', 'h1'],
        ['  Creative Developer & UI Engineer', 'info'],
        ['', ''],
        ['  Especialista en Roblox Studio (Jujutsu Shenanigans),', ''],
        ['  Modelado 3D en Blockbench y Sistemas Web de Alto Rendimiento.', ''],
        ['', ''],
        ['  Escribe <span class="ok">projects</span> o <span class="ok">skills</span> para mas info.', 'dim'],
      ]);
    }
  },

  projects: {
    desc: 'Proyectos destacados',
    run: (body) => {
      printLine(body, ':: PROYECTOS DESTACADOS', 'accent');
      printLine(body, '');
      printLine(body, '  >> <span class="h1">Jujutsu Shenanigans Scripting</span>', 'ok');
      printLine(body, '     Sistemas avanzados de combate y mecanicas personalizadas en Roblox.', 'dim');
      printLine(body, '');
      printLine(body, '  >> <span class="h1">Blockbench 3D Asset Pipeline</span>', 'ok');
      printLine(body, '     Modelado y rigging de alta fidelidad optimizado para motores graficos.', 'dim');
      printLine(body, '');
      printLine(body, '  Escribe <span class="ok">social</span> para ver paginas protegidas.', 'warn');
    }
  },

  skills: {
    desc: 'Habilidades tecnicas',
    run: (body) => {
      printLine(body, ':: HABILIDADES TECNICAS', 'accent');
      const skills = [
        ['Roblox Studio / Luau', 95],
        ['Blockbench / 3D Modeling', 90],
        ['JavaScript / TypeScript', 88],
        ['HTML / CSS / UI Design', 92],
        ['Node.js / Backend', 80],
        ['Python', 75],
        ['Blender / 3D Art', 70],
      ];
      skills.forEach(([name, pct]) => {
        const bars = Math.round(pct / 5);
        const bar = '█'.repeat(bars) + '░'.repeat(20 - bars);
        printLine(body, `  ${padEnd(name, 28)} <span class="ok">${bar}</span> ${pct}%`);
      });
    }
  },

  contact: {
    desc: 'Informacion de contacto',
    run: (body) => {
      printLine(body, ':: CONTACTO', 'accent');
      printLine(body, '');
      printLine(body, '  Usa <span class="ok">social</span> para ver los links protegidos.', 'info');
      printLine(body, '  Cada pagina requiere desbloquear con un token.', 'dim');
    }
  },

  social: {
    desc: 'Redes sociales (con desbloqueo)',
    run: (body) => {
      printLine(body, ':: REDES SOCIALES - ACCESO PROTEGIDO', 'accent');
      printLine(body, '');
      Object.entries(LINKS_DB).forEach(([key, link]) => {
        const isUnlocked = unlockedLinks[key];
        const status = isUnlocked ? '<span class="ok">[ABIERTO]</span>' : '<span class="err">[BLOQUEADO]</span>';
        printLine(body, `  <span class="h1">${escapeHTML(link.name)}</span>  ${status}`, '');
        if (isUnlocked) {
          const lnk = document.createElement('div');
          lnk.className = 'lnk';
          lnk.innerHTML = `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener">
            <span class="n">-></span>${escapeHTML(link.icon)} ${escapeHTML(link.url)}
          </a>`;
          body.appendChild(lnk);
        } else {
          printLine(body, `     Usa: <span class="ok">hack ${key}</span>  o  <span class="ok">unlock ${key} TOKEN</span>`, 'dim');
        }
        printLine(body, '');
      });
      body.scrollTop = body.scrollHeight;
    }
  },

  links: {
    desc: 'Lista de paginas bloqueadas',
    run: (body) => {
      printLine(body, ':: PAGINAS PROTEGIDAS', 'accent');
      printLine(body, '');
      Object.entries(LINKS_DB).forEach(([key, link]) => {
        const isUnlocked = unlockedLinks[key];
        printLine(body,
          `  <span class="ok">${padEnd(key, 12)}</span>` +
          `<span class="${isUnlocked ? 'ok' : 'err'}">${isUnlocked ? '[ABIERTO]' : '[LOCK]'} ${escapeHTML(link.name)}</span>`
        );
      });
      printLine(body, '');
      printLine(body, '  Usa <span class="ok">hack &lt;key&gt;</span> o <span class="ok">unlock &lt;key&gt; &lt;token&gt;</span>', 'dim');
    }
  },

  hack: {
    desc: 'Inicia bruteforce visual',
    run: (body, win, args) => {
      const key = (args[0] || '').toLowerCase();
      if (!LINKS_DB[key]) {
        printLine(body, `Uso: hack <${Object.keys(LINKS_DB).join('|')}>`, 'warn');
        return;
      }
      if (unlockedLinks[key]) {
        printLine(body, `[OK] "${key}" ya esta desbloqueado.`, 'ok');
        return;
      }
      unlockAch('hacker', 'Hacker');
      launchBruteforce(win, key);
    }
  },

  unlock: {
    desc: 'Desbloquea con token',
    run: (body, win, args) => {
      const key = (args[0] || '').toLowerCase();
      const token = args.slice(1).join(' ').trim().toUpperCase();
      if (!LINKS_DB[key]) {
        printLine(body, `Uso: unlock <${Object.keys(LINKS_DB).join('|')}> <TOKEN>`, 'warn');
        return;
      }
      if (!token) {
        printLine(body, `Falta el token. Pista: ${LINKS_DB[key].hint}`, 'warn');
        return;
      }
      if (token === LINKS_DB[key].token) {
        showUnlockResult(win, key);
      } else {
        printLine(body, `x TOKEN INVALIDO: ${escapeHTML(token)}`, 'err');
        printLine(body, `  Pista: ${escapeHTML(LINKS_DB[key].hint)}`, 'dim');
        playError();
        effectQuake();
        win.el.classList.add('corrupt-shake');
        setTimeout(() => win.el.classList.remove('corrupt-shake'), 800);
      }
    }
  },

  list: {
    desc: 'Muestra tokens ya desbloqueados',
    run: (body) => {
      const keys = Object.keys(LINKS_DB).filter(k => unlockedLinks[k]);
      if (!keys.length) {
        printLine(body, 'Aun no has desbloqueado ninguna pagina.', 'warn');
        return;
      }
      printLine(body, ':: TOKENS EN TU SESION:', 'accent');
      keys.forEach(k => {
        printLine(body, `  <span class="ok">${padEnd(k, 12)}</span>${escapeHTML(LINKS_DB[k].token)}`, '');
      });
    }
  },

  /* ============================================================
     FASTFETCH
     ============================================================ */
  fastfetch: {
    desc: 'Info del sistema (con ojo)',
    run: (body) => {
      const eye = getEye();
      const unlocked = Object.keys(unlockedLinks).length;
      const total = Object.keys(LINKS_DB).length;
      const uptime = Math.floor(performance.now() / 1000);
      const mem = (40 + Math.random() * 10).toFixed(1);
      const lat = (Math.random() * 0.05).toFixed(3);

      eye.forEach(line => {
        printLine(body, `<span class="eye">${escapeHTML(line)}</span>`, 'eye');
      });

      printLine(body, '', '');

      printLine(body, `  <span class="ok">muncixop</span><span class="dim">@</span><span class="ok">void</span>`, '');
      printLine(body, '  ' + '-'.repeat(30), 'dim');

      const info = [
        ['OS',       'VOID SYSTEMS v5.0'],
        ['Host',     'muncixop.github.io'],
        ['Kernel',   'glitch-6.6.6-x64'],
        ['Shell',    'voidsh 5.0'],
        ['Uptime',   uptime + 's'],
        ['CPU',      'Void Core (64) @ 3.20GHz'],
        ['GPU',      'Phantom Renderer'],
        ['RAM',      mem + 'GB / 128GB'],
        ['Latencia', lat + ' ms'],
        ['Theme',    (document.body.className.match(/theme-\w+/)?.[0] || 'glitch-cyberpunk').replace('theme-', '')],
        ['Links',    unlocked + '/' + total + ' desbloqueados'],
        ['User',     achievements.first_unlock ? 'hacker' : 'guest'],
        ['Mode',     document.body.classList.contains('cyberpunk') ? 'CYBERPUNK' : 'normal'],
      ];

      info.forEach(([k, v]) => {
        printLine(body, `  <span class="ok">${padEnd(k, 10)}</span><span class="info">${escapeHTML(v)}</span>`, '');
      });

      printLine(body, '');

      setTimeout(() => blinkEye(body), 1200);
      setTimeout(() => blinkEye(body), 5500);
      setTimeout(() => blinkEye(body), 11000);

      unlockAch('first_fetch', 'El ojo te vio');
    }
  },

  neofetch: {
    desc: 'Alias de fastfetch',
    run: (body, win, args) => COMMANDS.fastfetch.run(body, win, args)
  },

  /* ============================================================
     SCAN
     ============================================================ */
  scan: {
    desc: 'Escaneo de red visual',
    run: async (body) => {
      printLine(body, ':: INICIANDO ESCANEO DE RED...', 'accent');
      printLine(body, ':: Interfaz: eth0 (192.168.1.0/24)', 'dim');
      printLine(body, '');
      playWhoosh();
      effectGlitchSlice();

      const hosts = [
        { ip: '192.168.1.1',  mac: 'A4:2B:B0:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'router.local',      port: '80,443' },
        { ip: '192.168.1.14', mac: 'F0:18:98:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'macbook-pro',       port: '22,5900' },
        { ip: '192.168.1.22', mac: '5C:F9:38:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'raspberry-pi',      port: '22,8080' },
        { ip: '192.168.1.31', mac: 'D8:BB:C1:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'iphone-muncixop',   port: '62078' },
        { ip: '192.168.1.42', mac: '00:1B:44:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'unknown-device',    port: '?' },
      ];

      printLine(body, '  <span class="ok">IP</span>              <span class="ok">MAC</span>                 <span class="ok">HOSTNAME</span>          <span class="ok">PUERTOS</span>', 'dim');
      printLine(body, '  ' + '-'.repeat(66), 'dim');

      for (const h of hosts) {
        await sleep(200 + Math.random() * 300);
        const line = printLine(body, `  ${padEnd(h.ip, 16)}${padEnd(h.mac, 20)}${padEnd(h.name, 18)}${h.port}`);
        line.style.animation = 'lineIn .2s ease';
        playTick(700 + Math.random() * 500);
      }

      printLine(body, '');
      printLine(body, '[OK] Escaneo completado. 5 hosts detectados.', 'ok');
      effectFlash('rgba(61,220,132,.15)');
      unlockAch('scanner', 'Escaneo completo');
    }
  },

  /* ============================================================
     TRACE
     ============================================================ */
  trace: {
    desc: 'Traceroute simulado',
    run: async (body, win, args) => {
      const host = (args[0] || 'void.systems').toLowerCase();
      printLine(body, `:: traceroute a ${escapeHTML(host)}, 30 saltos max`, 'accent');
      printLine(body, '');
      const hops = [
        { ip: '192.168.1.1',       name: 'router.local' },
        { ip: '10.0.0.1',          name: 'isp-gateway' },
        { ip: '172.16.0.1',        name: 'backbone-core-1' },
        { ip: '209.85.252.1',      name: 'edge-router' },
        { ip: '142.250.185.14',    name: 'cloudflare-node' },
        { ip: '104.16.132.229',    name: 'cdn-edge' },
        { ip: '185.199.108.153',   name: 'github-pages' },
        { ip: '185.199.108.153',   name: host },
      ];
      for (let i = 0; i < hops.length; i++) {
        await sleep(250 + Math.random() * 250);
        const h = hops[i];
        const ms1 = (Math.random() * 40 + 5).toFixed(2);
        const ms2 = (Math.random() * 40 + 5).toFixed(2);
        const ms3 = (Math.random() * 40 + 5).toFixed(2);
        printLine(body, `  ${padStart(i + 1, 2)}  ${padEnd(h.ip, 18)}${padEnd(ms1 + ' ms', 10)}${padEnd(ms2 + ' ms', 10)}${padEnd(ms3 + ' ms', 10)}${h.name}`, 'mono-dim');
      }
      printLine(body, '');
      printLine(body, `[OK] Ruta completa hacia ${escapeHTML(host)} en ${hops.length} saltos.`, 'ok');
      unlockAch('tracer', 'Rastreador');
    }
  },

  /* ============================================================
     WHOIS
     ============================================================ */
  whois: {
    desc: 'Whois simulado',
    run: async (body, win, args) => {
      const host = (args[0] || 'muncixop.github.io').toLowerCase();
      printLine(body, `:: whois ${escapeHTML(host)}`, 'accent');
      printLine(body, '');
      await sleep(300);
      const fields = [
        ['Domain Name',    host.toUpperCase()],
        ['Registrar',      'GITHUB, INC.'],
        ['Creation Date',  '2023-08-' + (10 + Math.floor(Math.random() * 15)) + 'T12:00:00Z'],
        ['Updated Date',   '2025-0' + (1 + Math.floor(Math.random() * 9)) + '-01T00:00:00Z'],
        ['Registry Expiry','2027-08-15T12:00:00Z'],
        ['Name Server',    'NS-1621.AWSDNS-10.ORG'],
        ['Name Server',    'NS-2020.AWSDNS-60.CO.UK'],
        ['DNSSEC',         'unsigned'],
        ['Status',         'clientTransferProhibited'],
        ['Owner',          'REDACTED FOR PRIVACY'],
      ];
      for (const [k, v] of fields) {
        await sleep(80 + Math.random() * 100);
        printLine(body, `  <span class="ok">${padEnd(k, 18)}</span><span class="info">${escapeHTML(v)}</span>`, '');
      }
      printLine(body, '');
      printLine(body, '[OK] Consulta completada.', 'ok');
    }
  },

  /* ============================================================
     PING
     ============================================================ */
  ping: {
    desc: 'Ping simulado',
    run: async (body, win, args) => {
      const host = (args[0] || 'muncixop.github.io').toLowerCase();
      printLine(body, `PING ${escapeHTML(host)} (185.199.108.153) 56(84) bytes of data.`, 'accent');
      printLine(body, '');
      let min = Infinity, max = 0, sum = 0;
      const n = 4;
      for (let i = 0; i < n; i++) {
        await sleep(700 + Math.random() * 300);
        const t = (Math.random() * 30 + 8).toFixed(1);
        min = Math.min(min, parseFloat(t));
        max = Math.max(max, parseFloat(t));
        sum += parseFloat(t);
        printLine(body, `64 bytes from ${escapeHTML(host)}: icmp_seq=${i + 1} ttl=57 time=${t} ms`, 'ok');
        playTick(800 + Math.random() * 300);
      }
      printLine(body, '');
      printLine(body, `--- ${escapeHTML(host)} ping statistics ---`, 'dim');
      printLine(body, `${n} packets transmitted, ${n} received, 0% packet loss, time ${(n * 800)}ms`, 'dim');
      printLine(body, `rtt min/avg/max/mdev = ${min.toFixed(1)}/${(sum / n).toFixed(1)}/${max.toFixed(1)}/${(Math.random() * 5 + 1).toFixed(1)} ms`, 'info');
      unlockAch('pinger', 'Ping Master');
    }
  },

  /* ============================================================
     NMAP
     ============================================================ */
  nmap: {
    desc: 'Escaneo de puertos',
    run: async (body, win, args) => {
      const target = (args[0] || '192.168.1.1').toLowerCase();
      printLine(body, `Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`, 'accent');
      printLine(body, `Nmap scan report for ${escapeHTML(target)}`, '');
      printLine(body, `Host is up (0.0${Math.floor(Math.random() * 9) + 1}s latency).`, 'dim');
      printLine(body, '');
      printLine(body, 'PORT     STATE    SERVICE       VERSION', 'info');
      const ports = [
        ['22/tcp',   'open',   'ssh',     'OpenSSH 9.0'],
        ['80/tcp',   'open',   'http',    'nginx 1.24'],
        ['443/tcp',  'open',   'https',   'nginx 1.24 (TLS 1.3)'],
        ['3306/tcp', 'closed', 'mysql',   ''],
        ['5432/tcp', 'filtered', 'postgresql', ''],
        ['8080/tcp', 'open',   'http-proxy', 'Void Proxy 1.0'],
        ['9000/tcp', 'open',   'cslistener', 'Phantom Server'],
      ];
      for (const [p, s, svc, ver] of ports) {
        await sleep(250 + Math.random() * 200);
        const stateCls = s === 'open' ? 'ok' : (s === 'closed' ? 'dim' : 'warn');
        printLine(body, `${padEnd(p, 9)}<span class="${stateCls}">${padEnd(s, 9)}</span>${padEnd(svc, 14)}${ver}`, '');
        playTick(500 + Math.random() * 500);
      }
      printLine(body, '');
      printLine(body, `Nmap done: 1 IP address (1 host up) scanned in ${(Math.random() * 5 + 1).toFixed(2)} seconds`, 'dim');
      effectGlitchSlice();
      unlockAch('nmap', 'Puertos Abiertos');
    }
  },

  /* ============================================================
     CURL
     ============================================================ */
  curl: {
    desc: 'HTTP GET simulado',
    run: async (body, win, args) => {
      const url = args[0] || 'https://muncixop.github.io';
      printLine(body, `:: curl -i ${escapeHTML(url)}`, 'accent');
      await sleep(400);
      printLine(body, 'HTTP/2 200', 'ok');
      printLine(body, 'content-type: text/html; charset=utf-8', '');
      printLine(body, 'server: GitHub.com', '');
      printLine(body, `date: ${new Date().toUTCString()}`, '');
      printLine(body, 'cache-control: max-age=600', '');
      printLine(body, 'content-length: ' + (Math.floor(Math.random() * 50000) + 1000), '');
      printLine(body, 'x-github-request-id: ' + randomHex(8) + ':' + randomHex(8) + ':' + randomHex(8) + ':' + randomHex(4), 'dim');
      printLine(body, '');
      printLine(body, '<!DOCTYPE html>', 'mono-dim');
      printLine(body, '<html lang="es">', 'mono-dim');
      printLine(body, '<head><title>Muncix_Op</title></head>', 'mono-dim');
      printLine(body, '<body>... [truncado] ...</body>', 'mono-dim');
      printLine(body, '</html>', 'mono-dim');
      printLine(body, '');
      printLine(body, '[OK] Respuesta recibida.', 'ok');
      unlockAch('curler', 'HTTP Client');
    }
  },

  /* ============================================================
     PS
     ============================================================ */
  ps: {
    desc: 'Procesos en ejecucion',
    run: (body) => {
      printLine(body, '  PID  USER      %CPU  %MEM  COMMAND', 'info');
      printLine(body, '  ' + '-'.repeat(56), 'dim');
      const procs = [
        [1,    'root',     0.0, 0.1, '/sbin/init'],
        [42,   'root',     0.1, 0.2, '/usr/lib/systemd/systemd-journald'],
        [128,  'muncixop', 2.4, 1.8, 'voidsh --session main'],
        [256,  'muncixop', 15.3, 8.7, '/usr/bin/phantom-renderer'],
        [512,  'muncixop', 42.1, 12.4, 'matrix-daemon --intensity high'],
        [1024, 'root',     0.0, 0.0, '[kworker/0:2]'],
        [2048, 'muncixop', 8.9, 4.2, 'node /opt/void/server.js'],
        [4096, 'muncixop', 0.3, 0.8, 'git status --porcelain'],
        [8192, 'muncixop', 1.2, 2.1, 'cowsay "moo"'],
      ];
      procs.forEach(p => {
        printLine(body, `  ${padStart(p[0], 4)}  ${padEnd(p[1], 9)} ${padStart(p[2].toFixed(1), 5)} ${padStart(p[3].toFixed(1), 5)}  ${p[4]}`, '');
      });
    }
  },

  /* ============================================================
     TOP
     ============================================================ */
  top: {
    desc: 'Monitor de recursos',
    run: async (body) => {
      printLine(body, 'top - ' + new Date().toLocaleTimeString() + ' up 5 days, 3:21, 1 user, load average: 0.42, 0.38, 0.31', 'accent');
      printLine(body, '');
      printLine(body, 'Tasks: 142 total,   2 running, 140 sleeping,   0 stopped,   0 zombie', 'dim');
      printLine(body, '%Cpu(s):  ' + (5 + Math.random() * 15).toFixed(1) + ' us,  ' + (Math.random() * 3).toFixed(1) + ' sy,  0.0 ni, ' + (80 + Math.random() * 10).toFixed(1) + ' id', 'dim');
      printLine(body, 'MiB Mem : 131072.0 total,  ' + (40000 + Math.random() * 10000).toFixed(1) + ' free,  ' + (45000 + Math.random() * 10000).toFixed(1) + ' used,  ' + (20000 + Math.random() * 5000).toFixed(1) + ' buff/cache', 'dim');
      printLine(body, '');
      printLine(body, '  PID USER      PR  NI    VIRT    RES  %CPU  %MEM     TIME+ COMMAND', 'info');
      const procs = [
        [512,  'muncixop', 20, 0, '12.4g', '2.1g', 42.1, 1.7, '128:42.11', 'matrix-daemon'],
        [256,  'muncixop', 20, 0, '4.8g',  '1.2g', 15.3, 0.9, '42:18.02',  'phantom-renderer'],
        [2048, 'muncixop', 20, 0, '892m',  '342m', 8.9,  0.3, '18:04.55',  'node server.js'],
        [128,  'muncixop', 20, 0, '124m',  '42m',  2.4,  0.1, '4:22.01',   'voidsh'],
        [1,    'root',     20, 0, '168m',  '12m',  0.1,  0.0, '0:24.18',   'systemd'],
      ];
      procs.forEach((p, i) => {
        printLine(body, `  ${padStart(p[0], 4)} ${padEnd(p[1], 8)} ${padStart(p[2], 4)} ${padStart(p[3], 3)} ${padStart(p[4], 6)} ${padStart(p[5], 6)} ${padStart(p[6].toFixed(1), 5)} ${padStart(p[7].toFixed(1), 5)} ${padStart(p[8], 10)} ${p[9]}`, i === 0 ? 'ok' : '');
      });
      printLine(body, '');
      printLine(body, 'Monitor en vivo - presiona otra tecla para salir', 'dim');
    }
  },

  /* ============================================================
     TREE
     ============================================================ */
  tree: {
    desc: 'Arbol de directorios',
    run: (body) => {
      printLine(body, '.', 'info');
      const lines = [
        '├── public/',
        '│   ├── index.html',
        '│   ├── style.css',
        '│   ├── main.js',
        '│   └── favicon.ico',
        '├── assets/',
        '│   ├── eye.ascii',
        '│   ├── matrix.js',
        '│   └── sounds/',
        '│       ├── boot.wav',
        '│       └── glitch.wav',
        '├── projects/',
        '│   ├── jujutsu-shenanigans/',
        '│   │   ├── combat.lua',
        '│   │   └── abilities.lua',
        '│   └── blockbench-pipeline/',
        '│       ├── models/',
        '│       └── scripts/',
        '├── .gitignore',
        '├── package.json',
        '└── README.md',
      ];
      lines.forEach(l => printLine(body, l, 'mono-dim'));
      printLine(body, '');
      printLine(body, '4 directories, 15 files', 'dim');
    }
  },

  /* ============================================================
     LS / PWD
     ============================================================ */
  ls: {
    desc: 'Lista archivos',
    run: (body) => {
      printLine(body, '<span class="info">public/</span>   <span class="info">assets/</span>   <span class="info">projects/</span>   README.md   package.json   .gitignore', '');
    }
  },

  pwd: {
    desc: 'Directorio actual',
    run: (body) => printLine(body, '/home/muncixop/void-systems', 'info')
  },

  /* ============================================================
     DECRYPT
     ============================================================ */
  decrypt: {
    desc: 'Minijuego de descifrado',
    run: async (body) => {
      printLine(body, ':: PROTOCOLO DE DESCIFRADO', 'accent');
      printLine(body, '');
      const target = randomFrom(['VOID', 'MUNCIXOP', 'GLITCH', 'PHRASE', 'MATRIX', 'SHADOW', 'CIPHER']);
      const cipher = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789';
      let current = '';
      for (let i = 0; i < target.length; i++) current += cipher[Math.floor(Math.random() * cipher.length)];
      printLine(body, `  Objetivo cifrado: <span class="warn">${escapeHTML(current)}</span>`, '');
      printLine(body, `  Longitud: ${target.length} caracteres`, 'dim');
      printLine(body, '');
      await sleep(400);

      const line = printLine(body, '', 'ok');
      for (let frame = 0; frame < 22; frame++) {
        let s = '';
        for (let i = 0; i < target.length; i++) {
          const resolved = Math.floor((frame / 22) * target.length);
          s += i < resolved ? target[i] : cipher[Math.floor(Math.random() * cipher.length)];
        }
        line.innerHTML = `  <span class="ok">${escapeHTML(s)}</span>`;
        playTick(300 + frame * 30);
        await sleep(80);
      }
      printLine(body, '');
      printLine(body, `[OK] Descifrado: <span class="ok">${escapeHTML(target)}</span>`, 'ok');
      playSuccess();
      effectFlash('rgba(61,220,132,.2)');
      unlockAch('decryptor', 'Descifrador');
    }
  },

  /* ============================================================
     COWSAY
     ============================================================ */
  cowsay: {
    desc: 'La vaca que dice cosas',
    run: (body, win, args) => {
      const text = args.join(' ') || 'MuncixOp es el mejor';
      const maxLen = Math.max(...text.split('\n').map(l => l.length), 0);
      const top = ' ' + '_'.repeat(maxLen + 2);
      const bottom = ' ' + '-'.repeat(maxLen + 2);
      printLine(body, top, 'dim');
      text.split('\n').forEach(l => {
        printLine(body, ` <span class="dim">&lt;</span> ${escapeHTML(l)}${' '.repeat(maxLen - l.length)} <span class="dim">&gt;</span>`, '');
      });
      printLine(body, bottom, 'dim');
      printLine(body, '        \\   ^__^');
      printLine(body, '         \\  (oo)\\_______');
      printLine(body, '            (__)\\       )\\/\\');
      printLine(body, '                ||----w |');
      printLine(body, '                ||     ||');
      unlockAch('cow', 'Vaca filosofa');
    }
  },

  /* ============================================================
     FORTUNE
     ============================================================ */
  fortune: {
    desc: 'Frase aleatoria',
    run: (body) => {
      const fortunes = [
        'El que madruga, encuentra todo cerrado.',
        'No es un bug, es una feature no documentada.',
        'Si funciona, no lo toques.',
        'La mejor forma de predecir el futuro es programarlo.',
        'Hay dos formas de escribir codigo sin errores: no escribirlo, o hacerlo tan simple que no haya errores obvios.',
        'La programacion es el arte de decirle a un tonto como hacer algo.',
        'El codigo que escribes hoy sera el legado que maldigas manana.',
        'Un buen programador resuelve problemas. Un gran programador los evita.',
        'La unica constante en el desarrollo es el cambio.',
        'No cuentes los dias, haz que los dias cuenten.',
        'Habla poco, programa mucho.',
        'La simplicidad es la maxima sofisticacion.',
        'Si no puedes explicarlo simple, no lo entiendes bien.',
        'Los comentarios mienten. El codigo no.',
        'Piensa. Programa. Repite.',
        'El unico modo de aprender un lenguaje nuevo es escribir un programa en el.',
        'La depuracion es el doble de dificil que escribir el codigo. Si escribes el codigo lo mas inteligente que puedes, por definicion no eres lo suficientemente inteligente para depurarlo.',
        'Antes de que el software sea reutilizable, primero tiene que ser utilizable.',
        'La perfeccion se alcanza no cuando no hay nada que agregar, sino cuando no hay nada que quitar.',
      ];
      printLine(body, ':: FORTUNE', 'accent');
      printLine(body, '');
      printLine(body, `  "${escapeHTML(randomFrom(fortunes))}"`, 'info');
      unlockAch('fortune', 'Sabio');
    }
  },

  /* ============================================================
     WEATHER
     ============================================================ */
  weather: {
    desc: 'Clima simulado',
    run: async (body, win, args) => {
      const city = args.join(' ') || 'Bogotá';
      printLine(body, `:: Consultando clima para ${escapeHTML(city)}...`, 'accent');
      await sleep(500);
      const temp = (15 + Math.random() * 20).toFixed(1);
      const feels = (parseFloat(temp) - 2 + Math.random() * 4).toFixed(1);
      const hum = (40 + Math.random() * 40).toFixed(0);
      const wind = (2 + Math.random() * 15).toFixed(1);
      const conds = ['Despejado', 'Parcialmente nublado', 'Nublado', 'Lluvia ligera', 'Tormenta', 'Neblina'];
      const cond = randomFrom(conds);
      printLine(body, '');
      printLine(body, `  Ciudad         ${escapeHTML(city)}`, '');
      printLine(body, `  Temperatura    <span class="ok">${temp}°C</span>`, '');
      printLine(body, `  Sensacion      ${feels}°C`, '');
      printLine(body, `  Condicion      ${cond}`, '');
      printLine(body, `  Humedad        ${hum}%`, '');
      printLine(body, `  Viento         ${wind} km/h`, '');
      printLine(body, '');
      printLine(body, '  [simulado - no hay API real]', 'dim');
    }
  },

  /* ============================================================
     CRYPTO
     ============================================================ */
  crypto: {
    desc: 'Precios de cripto simulados',
    run: async (body, win, args) => {
      const symbol = (args[0] || 'BTC').toUpperCase();
      printLine(body, `:: Consultando ${escapeHTML(symbol)}...`, 'accent');
      await sleep(400);
      const base = {
        BTC: 67420, ETH: 3520, SOL: 178, BNB: 605, XRP: 0.62,
        DOGE: 0.16, ADA: 0.48, AVAX: 38, DOT: 7.2, MATIC: 0.72
      };
      const price = base[symbol] || (Math.random() * 1000);
      const change = (Math.random() * 10 - 5).toFixed(2);
      const changeColor = parseFloat(change) >= 0 ? 'ok' : 'err';
      const sign = parseFloat(change) >= 0 ? '+' : '';
      printLine(body, '');
      printLine(body, `  Par          ${escapeHTML(symbol)}/USDT`, '');
      printLine(body, `  Precio       <span class="ok">$${price.toLocaleString()}</span>`, '');
      printLine(body, `  Cambio 24h   <span class="${changeColor}">${sign}${change}%</span>`, '');
      printLine(body, `  Volumen      $${(Math.random() * 5e9).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, '');
      printLine(body, '');
      printLine(body, '  [simulado - no hay API real]', 'dim');
    }
  },

  /* ============================================================
     DICE / 8BALL / RANDOM
     ============================================================ */
  dice: {
    desc: 'Tira los dados',
    run: (body, win, args) => {
      const faces = parseInt(args[0]) || 6;
      const r = Math.floor(Math.random() * faces) + 1;
      printLine(body, `Tirando dado de ${faces} caras...`, 'dim');
      const line = printLine(body, '', '');
      scrambleText(line, `-> ${r}`, 400);
      setTimeout(() => { line.className = 'out ok'; }, 400);
    }
  },

  '8ball': {
    desc: 'Bola magica',
    run: (body, win, args) => {
      const q = args.join(' ') || '(sin pregunta)';
      const answers = [
        'Si, definitivamente.', 'No lo creo.', 'Sin duda.', 'Pregunta otra vez.',
        'No cuentes con eso.', 'Es seguro.', 'Muy dudoso.', 'Las señales apuntan a si.',
        'Concéntrate y pregunta de nuevo.', 'No.', 'Probablemente.', 'El futuro es incierto.'
      ];
      printLine(body, `Pregunta: ${escapeHTML(q)}`, 'dim');
      const line = printLine(body, '', '');
      scrambleText(line, randomFrom(answers), 500);
      setTimeout(() => { line.className = 'out accent'; }, 500);
    }
  },

  random: {
    desc: 'Dato aleatorio',
    run: (body) => {
      const facts = [
        'El primer bug informático real fue una polilla atrapada en un relé en 1947.',
        'El código más antiguo aún en uso es COBOL, de 1959.',
        'Un byte son 8 bits, un nibble son 4 bits, un bit es un bit.',
        'El primer videojuego fue "Tennis for Two" (1958).',
        'La primera programadora fue Ada Lovelace (1843).',
        'Linux empezó como un proyecto personal de Linus Torvalds en 1991.',
        'JavaScript se hizo en 10 días.',
        'Python se llama así por Monty Python, no por la serpiente.',
        'El código de la NASA tiene menos de 1 bug por cada 400,000 líneas.',
        'El 90% del código del mundo es COBOL.',
      ];
      printLine(body, ':: DATO ALEATORIO', 'accent');
      printLine(body, '');
      printLine(body, `  ${escapeHTML(randomFrom(facts))}`, 'info');
    }
  },

  /* ============================================================
     COUNTDOWN
     ============================================================ */
  countdown: {
    desc: 'Cuenta atras',
    run: async (body, win, args) => {
      let n = parseInt(args[0]) || 5;
      n = Math.min(Math.max(n, 1), 20);
      for (let i = n; i > 0; i--) {
        const line = printLine(body, `  ${i}...`, 'accent');
        playBeep(400 + i * 60, .15);
        effectFlash('rgba(61,220,132,.05)');
        await sleep(500);
      }
      const line = printLine(body, '  DESPEGUE!', 'ok');
      line.classList.add('glitch');
      effectConfetti(30);
      playPowerUp();
    }
  },

  /* ============================================================
     SPINNER
     ============================================================ */
  spinner: {
    desc: 'Spinner animado',
    run: async (body) => {
      const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
      const line = printLine(body, '', 'accent');
      for (let i = 0; i < 40; i++) {
        line.textContent = `  ${frames[i % frames.length]}  Procesando...`;
        await sleep(60);
      }
      line.innerHTML = `  <span class="ok">[OK]</span> Procesado completo.`;
    }
  },

  /* ============================================================
     TYPE
     ============================================================ */
  type: {
    desc: 'Efecto typewriter',
    run: async (body, win, args) => {
      const text = args.join(' ') || 'Hola mundo desde VOID SYSTEMS';
      const line = printLine(body, '', 'accent');
      for (let i = 0; i < text.length; i++) {
        line.textContent += text[i];
        if (i % 3 === 0) playTick(600 + Math.random() * 300);
        await sleep(40);
      }
    }
  },

  /* ============================================================
     RAINBOW
     ============================================================ */
  rainbow: {
    desc: 'Texto arcoiris',
    run: (body, win, args) => {
      const text = args.join(' ') || 'MUNCIXOP';
      const colors = ['#ff0040', '#ff8000', '#ffff00', '#00ff40', '#00aaff', '#8000ff', '#ff00aa'];
      let html = '';
      for (let i = 0; i < text.length; i++) {
        const c = colors[i % colors.length];
        html += `<span style="color:${c};text-shadow:0 0 8px ${c}80">${escapeHTML(text[i])}</span>`;
      }
      printLine(body, html, '');
      playSuccess();
    }
  },

  /* ============================================================
     SCRAMBLE
     ============================================================ */
  scramble: {
    desc: 'Efecto scramble',
    run: async (body, win, args) => {
      const text = args.join(' ') || 'VOID SYSTEMS';
      const line = printLine(body, '', 'accent');
      scrambleText(line, text, 800);
      playGlitch();
    }
  },

  /* ============================================================
     ASCII (banner)
     ============================================================ */
  ascii: {
    desc: 'Banner ASCII simple',
    run: (body, win, args) => {
      const text = (args.join(' ') || 'VOID').toUpperCase().slice(0, 12);
      const font = {
        'A': ['  ▄▄  ', ' █  █ ', ' ████ ', ' █  █ ', ' █  █ '],
        'B': [' ███  ', ' █  █ ', ' ███  ', ' █  █ ', ' ███  '],
        'C': [' ▄▄▄  ', '█     ', '█     ', '█     ', ' ▀▀▀  '],
        'D': [' ███  ', ' █  █ ', ' █  █ ', ' █  █ ', ' ███  '],
        'E': [' ████ ', ' █    ', ' ███  ', ' █    ', ' ████ '],
        'F': [' ████ ', ' █    ', ' ███  ', ' █    ', ' █    '],
        'G': [' ▄▄▄  ', '█     ', '█  ██ ', '█   █ ', ' ▀▀▀▀ '],
        'H': [' █  █ ', ' █  █ ', ' ████ ', ' █  █ ', ' █  █ '],
        'I': [' ███ ', '  █  ', '  █  ', '  █  ', ' ███ '],
        'J': ['  ███', '   █ ', '   █ ', '█  █ ', ' ▀▀  '],
        'K': [' █  █ ', ' █ █  ', ' ██   ', ' █ █  ', ' █  █ '],
        'L': [' █    ', ' █    ', ' █    ', ' █    ', ' ████ '],
        'M': [' █▄ ▄█ ', ' █ █ █ ', ' █ █ █ ', ' █   █ ', ' █   █ '],
        'N': [' █▄  █ ', ' █ █ █ ', ' █  ██ ', ' █   █ ', ' █   █ '],
        'O': [' ▄▄▄  ', '█   █ ', '█   █ ', '█   █ ', ' ▀▀▀  '],
        'P': [' ███  ', ' █  █ ', ' ███  ', ' █    ', ' █    '],
        'Q': [' ▄▄▄  ', '█   █ ', '█   █ ', '█  ██ ', ' ▀▀██ '],
        'R': [' ███  ', ' █  █ ', ' ███  ', ' █ █  ', ' █  █ '],
        'S': [' ▄▄▄▄ ', '█     ', ' ▀▀▀▄ ', '    █ ', ' ▀▀▀▀ '],
        'T': [' █████', '   █  ', '   █  ', '   █  ', '   █  '],
        'U': [' █  █ ', ' █  █ ', ' █  █ ', ' █  █ ', ' ▀▀▀▀ '],
        'V': [' █   █', ' █   █', ' █   █', '  █ █ ', '   █  '],
        'W': [' █   █ ', ' █   █ ', ' █ █ █ ', ' █ █ █ ', ' ▀▀ ▀▀ '],
        'X': [' █   █', '  █ █ ', '   █  ', '  █ █ ', ' █   █'],
        'Y': [' █   █', '  █ █ ', '   █  ', '   █  ', '   █  '],
        'Z': [' █████', '   █  ', '  █   ', ' █    ', ' █████'],
        ' ': ['     ', '     ', '     ', '     ', '     '],
      };
      for (let row = 0; row < 5; row++) {
        let line = '  ';
        for (const ch of text) {
          line += (font[ch] ? font[ch][row] : font[' '][row]) + ' ';
        }
        printLine(body, line, 'accent');
      }
    }
  },

  /* ============================================================
     CONFETTI
     ============================================================ */
  confetti: {
    desc: 'Lluvia de confetti',
    run: (body) => {
      effectConfetti(60);
      playSuccess();
      printLine(body, '[OK] Confetti lanzado!', 'ok');
      unlockAch('confetti', 'Fiestero');
    }
  },

  /* ============================================================
     THEME
     ============================================================ */
  theme: {
    desc: 'Cambia el color de acento',
    run: (body, win, args) => {
      const valid = ['green', 'red', 'blue', 'purple', 'amber', 'cyan', 'pink', 'mono', 'rainbow'];
      const target = (args[0] || '').toLowerCase();
      if (!target) {
        printLine(body, `Uso: theme <${valid.join('|')}>`, 'warn');
        printLine(body, `Actual: ${(document.body.className.match(/theme-\w+/)?.[0] || 'theme-green (default)').replace('theme-', '')}`, 'dim');
        return;
      }
      if (!valid.includes(target)) {
        printLine(body, `Tema no valido: ${target}`, 'err');
        printLine(body, `Disponibles: ${valid.join(', ')}`, 'dim');
        return;
      }
      document.body.className = document.body.className.replace(/\btheme-\w+/g, '').trim();
      if (target !== 'green') document.body.classList.add('theme-' + target);
      printLine(body, `[OK] Tema cambiado a: ${target}`, 'ok');
      playSuccess();
      effectFlash('rgba(61,220,132,.1)');
      unlockAch('themer', 'Estilista');
      if (target === 'rainbow') unlockAch('rainbow', 'Arcoiris');
    }
  },

  /* ============================================================
     CYBERPUNK
     ============================================================ */
  cyberpunk: {
    desc: 'Modo glitch extremo',
    run: (body) => {
      document.body.classList.toggle('cyberpunk');
      const on = document.body.classList.contains('cyberpunk');
      printLine(body, on ? '[!] CYBERPUNK MODE ON' : '[OK] Cyberpunk mode off', on ? 'err' : 'ok');
      playGlitch();
      effectGlitchSlice();
      if (on) unlockAch('cyberpunk', 'Cyberpunk');
    }
  },

  /* ============================================================
     HYPNOTIZE
     ============================================================ */
  hypnotize: {
    desc: 'Efecto hipnotico',
    run: (body) => {
      document.body.classList.add('hypnotize');
      printLine(body, '[!] MIRAME A LOS OJOS...', 'warn');
      playBeep(300, .5);
      setTimeout(() => {
        document.body.classList.remove('hypnotize');
        printLine(body, '[OK] Despierta.', 'ok');
      }, 4000);
    }
  },

  /* ============================================================
     FLASH
     ============================================================ */
  flash: {
    desc: 'Flash de pantalla',
    run: (body) => {
      effectFlash();
      playBeep(1200, .05);
      printLine(body, '[!] Flash!', 'warn');
    }
  },

  /* ============================================================
     QUAKE
     ============================================================ */
  quake: {
    desc: 'Terremoto visual',
    run: (body) => {
      effectQuake();
      printLine(body, '[!] TERREMOTO DETECTADO', 'err');
      unlockAch('quake', 'Terremoto');
    }
  },

  /* ============================================================
     HISTORY
     ============================================================ */
  history: {
    desc: 'Historial de comandos',
    run: (body) => {
      if (!cmdHistory.length) {
        printLine(body, 'Sin comandos en el historial.', 'dim');
        return;
      }
      printLine(body, ':: HISTORIAL DE COMANDOS', 'accent');
      cmdHistory.slice(-30).forEach((c, i) => {
        const n = cmdHistory.length - 30 + i + 1;
        if (n > 0) printLine(body, `  ${padStart(n, 4)}  ${escapeHTML(c)}`, 'mono-dim');
      });
    }
  },

  /* ============================================================
     ACHIEVEMENTS
     ============================================================ */
  achievements: {
    desc: 'Logros desbloqueados',
    run: (body) => {
      const list = Object.entries(achievements);
      printLine(body, ':: LOGROS', 'accent');
      printLine(body, '');
      if (!list.length) {
        printLine(body, '  Aun no has desbloqueado ninguno.', 'dim');
        return;
      }
      list.forEach(([k, v]) => {
        printLine(body, `  <span class="ok">[+]</span> ${escapeHTML(v.name)}`, '');
      });
      printLine(body, '');
      printLine(body, `  Total: ${list.length} logros`, 'dim');
    }
  },

  whoami: {
    desc: 'Quien eres',
    run: (body) => {
      printLine(body, 'muncixop', 'ok');
      printLine(body, 'Creative Developer & UI Engineer.', 'dim');
    }
  },

  date: {
    desc: 'Fecha actual',
    run: (body) => printLine(body, new Date().toString(), 'info')
  },

  clear: {
    desc: 'Limpia la pantalla',
    run: (body) => { body.innerHTML = ''; }
  },

  matrix: {
    desc: 'Toggle fondo Matrix',
    run: (body) => {
      matrixActive = !matrixActive;
      printLine(body, matrixActive ? '[OK] Matrix activado' : '[!] Matrix desactivado', matrixActive ? 'ok' : 'warn');
    }
  },

  glitch: {
    desc: 'Efecto glitch',
    run: (body, win) => {
      document.body.classList.add('mx-hit');
      win.el.classList.add('corrupt-shake');
      playGlitch();
      effectGlitchSlice();
      effectQuake();
      printLine(body, '[!] SOBRECARGA DE SENAL DETECTADA...', 'err');
      setTimeout(() => {
        document.body.classList.remove('mx-hit');
        win.el.classList.remove('corrupt-shake');
        printLine(body, '[OK] Sistema estabilizado.', 'ok');
      }, 900);
      unlockAch('glitch', 'Glitch Master');
    }
  },

  os: {
    desc: 'Cambia el tema del SO',
    run: (body, win, args) => {
      const target = (args[0] || '').toLowerCase();
      const valid = ['mac', 'win', 'linux', 'android', 'ios'];
      if (!target) { printLine(body, `Uso: os <${valid.join('|')}>`, 'warn'); return; }
      if (!valid.includes(target)) { printLine(body, `SO no valido: ${target}`, 'err'); return; }
      document.body.className = document.body.className.replace(/\bos-\w+/g, '').trim();
      document.body.classList.add('os-' + target);
      printLine(body, `[OK] SO cambiado a: ${target}`, 'ok');
      playSuccess();
    }
  },

  sound: {
    desc: 'Toggle audio',
    run: (body) => {
      audioEnabled = !audioEnabled;
      printLine(body, audioEnabled ? '[ON] Audio activado' : '[OFF] Audio desactivado', audioEnabled ? 'ok' : 'warn');
    }
  },

  reset: {
    desc: 'Borra tokens guardados',
    run: (body) => {
      unlockedLinks = {};
      saveUnlocked();
      printLine(body, '[OK] Tokens locales borrados. Todas las paginas vuelven a bloquearse.', 'ok');
    }
  },

  reboot: {
    desc: 'Reinicia la terminal',
    run: (body) => {
      printLine(body, '[!] Reiniciando sistema...', 'warn');
      playWhoosh();
      effectFlash();
      setTimeout(() => {
        body.innerHTML = '';
        bootSequence(true);
      }, 800);
    }
  },

  /* ============================================================
     VOID / CLOSE — abrir y cerrar terminal
     ============================================================ */
  void: {
    desc: 'Abre una nueva terminal',
    run: (body) => {
      printLine(body, '[OK] Abriendo nueva terminal...', 'ok');
      playSuccess();
      setTimeout(() => {
        bootSequence(true);
      }, 300);
      unlockAch('void', 'Multi-terminal');
    }
  },

  close: {
    desc: 'Cierra la terminal',
    run: (body, win) => {
      printLine(body, 'Cerrando sesion...', 'warn');
      setTimeout(() => closeWindow(win.id), 400);
    }
  },

  sudo: {
    desc: 'Intenta escalar privilegios',
    run: (body) => {
      printLine(body, '[sudo] password for muncixop: ', 'warn');
      setTimeout(() => {
        printLine(body, 'Nice try. Pero no.', 'err');
        effectQuake();
      }, 800);
    }
  },

  banner: {
    desc: 'Muestra el banner',
    run: (body) => {
      printLines(body, [
        ['  ██╗   ██╗ ██████╗ ██╗██████╗ ', 'ok'],
        ['  ██║   ██║██╔═══██╗██║██╔══██╗', 'ok'],
        ['  ██║   ██║██║   ██║██║██║  ██║', 'ok'],
        ['  ╚██╗ ██╔╝██║   ██║██║██║  ██║', 'ok'],
        ['   ╚████╔╝ ╚██████╔╝██║██████╔╝', 'ok'],
        ['    ╚═══╝   ╚═════╝ ╚═╝╚═════╝ ', 'ok'],
        ['  --- VOID SYSTEMS v5.0 ---', 'accent'],
      ]);
    }
  },

  exit: {
    desc: 'Cierra la ventana',
    run: (body, win) => {
      printLine(body, 'Cerrando sesion...', 'warn');
      setTimeout(() => closeWindow(win.id), 400);
    }
  },

  echo: {
    desc: 'Repite texto',
    run: (body, win, args) => printLine(body, escapeHTML(args.join(' ') || ''))
  }
};

/* ============================================================
   BOOT SEQUENCE
   ============================================================ */
let booted = false;
async function bootSequence(isReboot = false) {
  if (booted && !isReboot) return;
  if (!isReboot) booted = true;

  const term = createWindow('voidsh - ~', { width: 740, height: 580 });
  const body = term.body;
  body.style.minHeight = '100%';

  if (!isReboot) playBoot();
  else playPowerUp();

  const bootLines = [
    ['VOID BIOS v6.6.6 - Inicializando...', 'dim', 120],
    ['  [OK] CPU Void Core x64 @ 3.20GHz', 'ok', 90],
    ['  [OK] Memoria ECC 128GB verificada', 'ok', 90],
    ['  [OK] GPU Phantom Renderer', 'ok', 80],
    ['  [OK] Dispositivos de entrada', 'ok', 70],
    ['  [OK] Red eth0 192.168.1.42/24', 'ok', 70],
    ['  [OK] Modulo de audio sintetizado', 'ok', 60],
    ['  [OK] Motor de glitch cargado', 'ok', 60],
    ['', '', 60],
    ['Cargando VOID SYSTEMS v5.0...', 'info', 220],
    ['', '', 100],
  ];
  for (const [text, cls, delay] of bootLines) {
    printLine(body, text, cls);
    await sleep(delay);
  }

  // Banner con scramble
  const banner1 = printLine(body, '  ██████╗ ███████╗███████╗████████╗', 'ok');
  await sleep(80);
  const banner2 = printLine(body, '  ██╔══██╗██╔════╝██╔════╝╚══██╔══╝', 'ok');
  await sleep(80);
  const banner3 = printLine(body, '  ██████╔╝█████╗  █████╗     ██║   ', 'ok');
  await sleep(80);
  const banner4 = printLine(body, '  ██╔══██╗██╔══╝  ██╔══╝     ██║   ', 'ok');
  await sleep(80);
  const banner5 = printLine(body, '  ██║  ██║███████╗██║        ██║   ', 'ok');
  await sleep(80);
  const banner6 = printLine(body, '  ╚═╝  ╚═╝╚══════╝╚═╝        ╚═╝   ', 'ok');
  await sleep(80);

  printLines(body, [
    ['', ''],
    ['  Bienvenido a VOID SYSTEMS v5.0, muncixop.', 'accent'],
    ['  Escribe <span class="ok">help</span> para ver los comandos.', 'dim'],
    ['  Prueba <span class="ok">fastfetch</span> para ver el ojo.', 'dim'],
    ['  Prueba <span class="ok">social</span> para ver paginas bloqueadas.', 'dim'],
    ['  Prueba <span class="ok">confetti</span>, <span class="ok">rainbow</span>, <span class="ok">cyberpunk</span>...', 'dim'],
    ['', ''],
  ]);
  await sleep(200);

  startInput(term);
}

/* ============================================================
   INPUT LOOP
   ============================================================ */
function startInput(term) {
  const body = term.body;
  const ki = document.getElementById('ki');

  let currentLine = null;
  let typed = '';
  let histIdx = cmdHistory.length;
  let isMobileInput = false;
  let suggestBox = null;
  let suggestItems = [];
  let suggestIdx = 0;
  let idleTimer = null;
  let lastKeyTime = 0;
  let typingBurst = 0;

  const createInputLine = () => {
    if (currentLine) currentLine.remove();
    currentLine = document.createElement('div');
    currentLine.className = 'input-line idle';
    currentLine.style.position = 'relative';
    currentLine.innerHTML = getPromptHTML() + '<span class="typed"></span><span class="cur">_</span>';
    body.appendChild(currentLine);
    body.scrollTop = body.scrollHeight;
    resetIdleTimer();
    updateSuggest();
  };

  const renderTyped = () => {
    if (!currentLine) return;
    currentLine.querySelector('.typed').textContent = typed;
    body.scrollTop = body.scrollHeight;
    updateSuggest();
    if (currentLine.classList.contains('idle')) currentLine.classList.remove('idle');
    resetIdleTimer();
  };

  const resetIdleTimer = () => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (currentLine && typed === '') {
        currentLine.classList.add('idle');
      }
    }, 3000);
  };

  /* --- SUGGESTIONS --- */
  const hideSuggest = () => {
    if (suggestBox) { suggestBox.remove(); suggestBox = null; }
    suggestItems = [];
    suggestIdx = 0;
  };
  const updateSuggest = () => {
    hideSuggest();
    const partial = typed.split(/\s+/)[0].trim();
    if (!partial || typed.includes(' ')) return;
    const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
    if (matches.length < 2) return;
    suggestBox = document.createElement('div');
    suggestBox.className = 'suggest on';
    suggestItems = matches;
    matches.forEach((m, i) => {
      const item = document.createElement('div');
      item.className = 'suggest-item' + (i === 0 ? ' active' : '');
      item.innerHTML = `<span class="key">${escapeHTML(m)}</span><span class="desc">${escapeHTML(COMMANDS[m].desc)}</span>`;
      item.addEventListener('click', () => {
        typed = m + ' ';
        ki.value = typed;
        renderTyped();
      });
      suggestBox.appendChild(item);
    });
    if (currentLine) currentLine.appendChild(suggestBox);
    suggestIdx = 0;
  };

  const submit = () => {
    const cmd = typed.trim();
    ki.value = '';
    typed = '';
    hideSuggest();

    if (currentLine) {
      const cmdLine = document.createElement('div');
      cmdLine.className = 'out cmd';
      cmdLine.innerHTML = getPromptHTML() + escapeHTML(cmd);
      currentLine.replaceWith(cmdLine);
      currentLine = null;
    }

    if (cmd) {
      cmdHistory.push(cmd);
      saveHistory();
      histIdx = cmdHistory.length;
      playEnter();
      runCommand(cmd, body, term);
    }

    setTimeout(() => createInputLine(), 10);
    body.scrollTop = body.scrollHeight;
  };

  createInputLine();

  /* --- TECLADO FÍSICO --- */
  document.addEventListener('keydown', (e) => {
    // Atajos globales primero
    if (e.ctrlKey && e.shiftKey && (e.key === 'T' || e.key === 't')) {
      e.preventDefault();
      bootSequence(true);
      return;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'W' || e.key === 'w')) {
      e.preventDefault();
      closeWindow(term.id);
      return;
    }
    if (e.key === 'Escape') {
      if (document.body.classList.contains('cyberpunk')) {
        document.body.classList.remove('cyberpunk');
      }
    }

    if (document.activeElement === ki) return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 'Enter') { e.preventDefault(); submit(); return; }
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (typed.length > 0) { typed = typed.slice(0, -1); renderTyped(); playKey(); }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestItems.length) {
        suggestIdx = Math.max(0, suggestIdx - 1);
        Array.from(suggestBox.children).forEach((el, i) => el.classList.toggle('active', i === suggestIdx));
        return;
      }
      if (cmdHistory.length) {
        histIdx = Math.max(0, histIdx - 1);
        typed = cmdHistory[histIdx] || '';
        renderTyped();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestItems.length) {
        suggestIdx = Math.min(suggestItems.length - 1, suggestIdx + 1);
        Array.from(suggestBox.children).forEach((el, i) => el.classList.toggle('active', i === suggestIdx));
        return;
      }
      if (histIdx < cmdHistory.length - 1) {
        histIdx++;
        typed = cmdHistory[histIdx] || '';
      } else {
        histIdx = cmdHistory.length;
        typed = '';
      }
      renderTyped();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestItems.length) {
        typed = suggestItems[suggestIdx] + ' ';
        ki.value = typed;
        renderTyped();
        return;
      }
      const partial = typed.trim();
      if (!partial) return;
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
      if (matches.length === 1) { typed = matches[0] + ' '; renderTyped(); }
      else if (matches.length > 1) printLine(body, matches.join('  '), 'dim');
      return;
    }
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      body.innerHTML = '';
      currentLine = null;
      createInputLine();
      return;
    }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      const now = performance.now();
      if (now - lastKeyTime < 90) {
        typingBurst++;
        if (typingBurst > 6) {
          body.classList.add('typing-hard');
          setTimeout(() => body.classList.remove('typing-hard'), 150);
          typingBurst = 0;
        }
      } else {
        typingBurst = 0;
      }
      lastKeyTime = now;

      typed += e.key;
      renderTyped();
      playKey();
      if (Math.random() > 0.85) {
        const t = currentLine.querySelector('.typed');
        t.classList.add('glitch-flash');
        setTimeout(() => t.classList.remove('glitch-flash'), 80);
      }
    }
  });

  /* --- INPUT MÓVIL --- */
  ki.addEventListener('input', () => {
    if (!isMobileInput) return;
    typed = ki.value;
    renderTyped();
  });

  ki.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
      ki.blur();
      isMobileInput = false;
    } else if (e.key === 'Escape') {
      ki.blur();
      isMobileInput = false;
    }
  });

  ki.addEventListener('blur', () => {
    isMobileInput = false;
    if (ki.value !== typed) {
      typed = ki.value;
      renderTyped();
    }
  });

  const focusKI = () => {
    isMobileInput = true;
    ki.value = typed;
    ki.focus({ preventScroll: true });
  };
  body.addEventListener('click', focusKI);
  body.addEventListener('touchstart', focusKI, { passive: true });

  setTimeout(() => {
    try { ki.focus({ preventScroll: true }); isMobileInput = true; } catch (e) {}
  }, 100);
}

/* ---------- RUN COMMAND ---------- */
function runCommand(input, body, win) {
  const parts = input.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const command = COMMANDS[cmd];
  if (!command) {
    printLine(body, `voidsh: comando no encontrado: ${escapeHTML(cmd)}`, 'err');
    printLine(body, `Escribe <span class="ok">help</span> para ver los comandos disponibles.`, 'dim');
    playError();
    effectGlitchSlice();
    return;
  }
  try {
    const r = command.run(body, win, args);
    if (r && typeof r.catch === 'function') r.catch(e => {
      printLine(body, `Error asincrono: ${escapeHTML(e.message)}`, 'err');
    });
  } catch (e) {
    printLine(body, `Error al ejecutar "${cmd}": ${escapeHTML(e.message)}`, 'err');
    playError();
  }
}

/* ============================================================
   GLOBAL EVENTS
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(bootSequence, 300);
});

// Ripple global en clicks
document.addEventListener('click', (e) => {
  if (e.target.closest('.btn') || e.target.closest('.launcher') || e.target.closest('.copy-token') || e.target.closest('.err-btn')) return;
  effectRipple(e.clientX, e.clientY);
});

// Launcher → abrir nueva terminal
launcher.addEventListener('click', () => {
  playSuccess();
  effectFlash('rgba(61,220,132,.15)');
  bootSequence(true);
});

// Prevenir zoom en doble tap
let lastTouch = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, { passive: false });

// Konami code easter egg
const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === konamiSeq[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konamiSeq.length) {
      konamiIdx = 0;
      // Activar efectos extremos
      document.body.classList.add('cyberpunk');
      effectConfetti(100);
      effectFlash('rgba(199,125,255,.4)');
      effectQuake();
      playPowerUp();
      unlockAch('konami', 'Codigo Konami');
      // Mostrar toast personalizado
      const toast = document.createElement('div');
      toast.className = 'ach-toast';
      toast.innerHTML = `
        <div class="ach-title">KONAMI CODE</div>
        <div class="ach-desc">30 vidas desbloqueadas (mentira)</div>
        <div class="ach-meta">EASTER EGG</div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.animation = 'achIn .4s reverse forwards';
        setTimeout(() => toast.remove(), 400);
      }, 4000);
      // Desactivar cyberpunk después de 8s
      setTimeout(() => document.body.classList.remove('cyberpunk'), 8000);
    }
  } else {
    konamiIdx = 0;
  }
});

console.log('%c VOID SYSTEMS v5.0 ', 'background:#3ddc84;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px;font-size:14px');
console.log('%c Bienvenido, muncixop. ', 'color:#3ddc84;font-weight:bold;font-size:12px');
console.log('%c Prueba el codigo Konami: ↑ ↑ ↓ ↓ ← → ← → B A ', 'color:#5eaaff;font-style:italic');
