/* ============================================================
   VOID SYSTEMS v7.1 — Terminal / OS Simulator
   Author: MuncixOp
   Sin wobbly windows. Input real. Asistencias móviles.
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

function haptic(pattern = 10) {
  if (!mob) return;
  if ('vibrate' in navigator) {
    try { navigator.vibrate(pattern); } catch (e) {}
  }
}

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
  haptic([20, 40, 20]);
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
   AUDIO
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
  } catch (e) {}
}
function playBoot() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), g = a.createGain();
    o1.type = 'sine';
    o1.frequency.setValueAtTime(110, t);
    o1.frequency.exponentialRampToValueAtTime(440, t + .4);
    g.gain.setValueAtTime(.04, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .5);
    o1.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .5);
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
   MATRIX CANVAS
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
   PARTICLES
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
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
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
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = pW; if (p.x > pW) p.x = 0;
    if (p.y < 0) p.y = pH; if (p.y > pH) p.y = 0;
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
  win.querySelector('.win-bar').addEventListener('dblclick', () => toggleMaximize(id));
  win.querySelector('.close').addEventListener('click', (e) => { e.stopPropagation(); closeWindow(id); });
  win.querySelector('.min').addEventListener('click', (e) => { e.stopPropagation(); minimizeWindow(id); });
  win.querySelector('.max').addEventListener('click', (e) => { e.stopPropagation(); toggleMaximize(id); });

  makeDraggable(win, win.querySelector('.win-bar'));
  makeResizable(win, win.querySelector('.rz'));
  makeSwipeGestures(win, win.querySelector('.win-bar'), id);

  return { id, el: win, body: win.querySelector('.win-body') };
}

function closeWindow(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.el.classList.add('closing');
  playGlitch();
  haptic(30);
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
  haptic(15);
}
function restoreWindow(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.minimized = false;
  entry.el.classList.remove('minimized');
  entry.el.style.zIndex = ++zIndex;
  updateDock();
  playKey();
  haptic(15);
}
function toggleMaximize(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.el.classList.toggle('maximized');
  playKey();
  haptic(20);
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

/* ============================================================
   DRAG — Simple, sin wobbly
   ============================================================ */
function makeDraggable(win, handle) {
  let sx, sy, ox, oy, dragging = false;
  const start = (e) => {
    if (win.classList.contains('maximized')) return;
    if (e.target.closest('.btn')) return;
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX; sy = p.clientY;
    ox = win.offsetLeft; oy = win.offsetTop;
    dragging = true;
    win.classList.add('dragging');
    win.style.zIndex = ++zIndex;
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
    dragging = false;
    win.classList.remove('dragging');
    document.removeEventListener('mousemove', move);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchend', end);
  };
  handle.addEventListener('mousedown', start);
  handle.addEventListener('touchstart', start, { passive: false });
}

/* ============================================================
   SWIPE GESTURES (móvil)
   ============================================================ */
function makeSwipeGestures(win, handle, id) {
  if (!mob) return;
  let startX = 0, startY = 0, startTime = 0;
  let tracking = false;

  handle.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    startTime = Date.now();
    tracking = true;
  }, { passive: true });

  handle.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    const dt = Date.now() - startTime;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (dt > 500) return;
    if (absX < 40 && absY < 40) return;
    if (absY > absX) {
      if (dy > 60) minimizeWindow(id);
      else if (dy < -60) toggleMaximize(id);
    } else if (absX > 120) {
      closeWindow(id);
    }
  }, { passive: true });
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

/* ============================================================
   EFFECTS
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
  haptic(50);
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
      if (i < original.length * progress) out += original[i];
      else out += chars[Math.floor(Math.random() * chars.length)];
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
  ];
  const termInterval = setInterval(() => {
    if (!running) return;
    if (Math.random() > .55) {
      const line = document.createElement('div');
      line.textContent = `[${new Date().toLocaleTimeString()}] ${randomFrom(termPhrases)}`;
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
      if (r > 0.92) line.innerHTML = `<span class="hash">0x${fakeHash}</span>  <span class="attempt">-> ${randomHex(16)}</span>  <span class="success">[MATCH?]</span>`;
      else if (r > 0.7) line.innerHTML = `<span class="hash">0x${fakeHash}</span>  <span class="attempt">-> ${randomHex(16)}</span>  <span class="fail">x</span>`;
      else line.innerHTML = `<span class="hash">0x${fakeHash}</span>  <span class="attempt">-> ${randomHex(16)}</span>`;
      displayEl.appendChild(line);
    }
    while (displayEl.children.length > 25) displayEl.removeChild(displayEl.firstChild);
    displayEl.scrollTop = displayEl.scrollHeight;

    const speed = Math.floor(Math.random() * 50000) + 20000;
    const progress = Math.min(attempts / maxAttempts * 100, 99.4);
    attEl.textContent = attempts.toLocaleString();
    speedEl.textContent = speed.toLocaleString();
    barEl.style.width = progress + '%';
    etaEl.textContent = Math.max(1, Math.floor((maxAttempts - attempts) / speed)) + 's';
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
  haptic([30, 40, 30, 40, 60]);
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
      </a>
    </div>
  `;
  body.appendChild(result);
  body.scrollTop = body.scrollHeight;

  result.querySelector('.copy-token').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    navigator.clipboard.writeText(btn.dataset.token).then(() => {
      btn.textContent = '[ Copiado ]';
      haptic(20);
      setTimeout(() => btn.textContent = '[ Copiar token ]', 1500);
    }).catch(() => {
      btn.textContent = '[ Error ]';
      setTimeout(() => btn.textContent = '[ Copiar token ]', 1500);
    });
  });
}

function blinkEye(body) {
  const eyeLines = body.querySelectorAll('.out.eye');
  if (!eyeLines.length) return;
  eyeLines.forEach(l => l.style.opacity = '0');
  playBeep(180, .04);
  setTimeout(() => { eyeLines.forEach(l => l.style.opacity = '1'); }, 110);
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
  help: { desc: 'Ayuda', run: (body) => {
    printLine(body, '+-- COMANDOS DISPONIBLES --------------------------+', 'accent');
    const cmds = [
      ['help', 'esta ayuda'], ['about', 'info'], ['projects', 'proyectos'],
      ['skills', 'habilidades'], ['contact', 'contacto'], ['social', 'redes'],
      ['links', 'paginas bloqueadas'], ['unlock <key> <token>', 'desbloquea'],
      ['hack <key>', 'bruteforce'], ['scan', 'escanear'], ['trace <host>', 'traceroute'],
      ['whois <host>', 'whois'], ['ping <host>', 'ping'], ['nmap <target>', 'puertos'],
      ['curl <url>', 'HTTP'], ['ps', 'procesos'], ['top', 'monitor'], ['tree', 'arbol'],
      ['ls', 'archivos'], ['pwd', 'ruta'], ['decrypt', 'minijuego'], ['cowsay <txt>', 'vaca'],
      ['fortune', 'frase'], ['weather [ciudad]', 'clima'], ['crypto [sym]', 'cripto'],
      ['dice', 'dados'], ['8ball <q>', 'bola'], ['random', 'dato'], ['countdown <n>', 'cuenta'],
      ['spinner', 'spinner'], ['type <txt>', 'typewriter'], ['rainbow <txt>', 'arcoiris'],
      ['scramble <txt>', 'scramble'], ['ascii <txt>', 'banner'], ['confetti', 'confetti'],
      ['theme <color>', 'tema'], ['cyberpunk', 'glitch'], ['hypnotize', 'hypno'],
      ['flash', 'flash'], ['quake', 'terremoto'], ['history', 'historial'],
      ['achievements', 'logros'], ['fastfetch', 'sistema'], ['neofetch', 'alias'],
      ['list', 'tokens'], ['whoami', 'quien'], ['date', 'fecha'], ['clear', 'limpiar'],
      ['matrix', 'toggle matrix'], ['glitch', 'glitch'], ['os <mac|win|linux>', 'tema SO'],
      ['sound', 'audio'], ['reset', 'borrar tokens'], ['reboot', 'reiniciar'],
      ['void', 'nueva terminal'], ['close', 'cerrar'], ['sudo', 'suerte'],
      ['banner', 'banner'], ['exit', 'salir'],
    ];
    cmds.forEach(([c, d]) => {
      printLine(body, `  <span class="ok">${padEnd(c, 32)}</span><span class="dim">${d}</span>`);
    });
    printLine(body, '+--------------------------------------------------+', 'accent');
  }},
  about: { desc: 'Sobre mi', run: (body) => {
    printLines(body, [
      ['',''],
      ['  ███╗   ███╗ ██████╗ ','accent'],
      ['  ████╗ ████║██╔═══██╗','accent'],
      ['  ██╔████╔██║██║   ██║','accent'],
      ['  ██║╚██╔╝██║██║   ██║','accent'],
      ['  ██║ ╚═╝ ██║╚██████╔╝','accent'],
      ['  ╚═╝     ╚═╝ ╚═════╝ ','accent'],
      ['',''],
      ['  Muncix_Op','h1'],
      ['  Creative Developer & UI Engineer','info'],
      ['',''],
      ['  Especialista en Roblox Studio (Jujutsu Shenanigans),',''],
      ['  Modelado 3D en Blockbench y Sistemas Web de Alto Rendimiento.',''],
    ]);
  }},
  projects: { desc: 'Proyectos', run: (body) => {
    printLine(body, ':: PROYECTOS DESTACADOS', 'accent');
    printLine(body, '');
    printLine(body, '  >> <span class="h1">Jujutsu Shenanigans Scripting</span>', 'ok');
    printLine(body, '     Sistemas avanzados de combate y mecanicas personalizadas en Roblox.', 'dim');
    printLine(body, '');
    printLine(body, '  >> <span class="h1">Blockbench 3D Asset Pipeline</span>', 'ok');
    printLine(body, '     Modelado y rigging de alta fidelidad optimizado para motores graficos.', 'dim');
  }},
  skills: { desc: 'Skills', run: (body) => {
    printLine(body, ':: HABILIDADES TECNICAS', 'accent');
    const skills = [
      ['Roblox Studio / Luau', 95], ['Blockbench / 3D Modeling', 90],
      ['JavaScript / TypeScript', 88], ['HTML / CSS / UI Design', 92],
      ['Node.js / Backend', 80], ['Python', 75], ['Blender / 3D Art', 70],
    ];
    skills.forEach(([name, pct]) => {
      const bar = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5));
      printLine(body, `  ${padEnd(name, 28)} <span class="ok">${bar}</span> ${pct}%`);
    });
  }},
  contact: { desc: 'Contacto', run: (body) => {
    printLine(body, ':: CONTACTO', 'accent');
    printLine(body, '  Usa <span class="ok">social</span> para ver los links.', 'info');
  }},
  social: { desc: 'Redes', run: (body) => {
    printLine(body, ':: REDES SOCIALES - ACCESO PROTEGIDO', 'accent');
    printLine(body, '');
    Object.entries(LINKS_DB).forEach(([key, link]) => {
      const isUnlocked = unlockedLinks[key];
      const status = isUnlocked ? '<span class="ok">[ABIERTO]</span>' : '<span class="err">[BLOQUEADO]</span>';
      printLine(body, `  <span class="h1">${escapeHTML(link.name)}</span>  ${status}`, '');
      if (isUnlocked) {
        const lnk = document.createElement('div');
        lnk.className = 'lnk';
        lnk.innerHTML = `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener"><span class="n">-></span>${escapeHTML(link.url)}</a>`;
        body.appendChild(lnk);
      } else {
        printLine(body, `     <span class="ok">hack ${key}</span>  o  <span class="ok">unlock ${key} TOKEN</span>`, 'dim');
      }
    });
  }},
  links: { desc: 'Links', run: (body) => {
    printLine(body, ':: PAGINAS PROTEGIDAS', 'accent');
    Object.entries(LINKS_DB).forEach(([key, link]) => {
      const u = unlockedLinks[key];
      printLine(body, `  <span class="ok">${padEnd(key, 12)}</span><span class="${u ? 'ok' : 'err'}">${u ? '[ABIERTO]' : '[LOCK]'}</span> ${link.name}`);
    });
  }},
  hack: { desc: 'Bruteforce', run: (body, win, args) => {
    const key = (args[0] || '').toLowerCase();
    if (!LINKS_DB[key]) { printLine(body, `Uso: hack <${Object.keys(LINKS_DB).join('|')}>`, 'warn'); return; }
    if (unlockedLinks[key]) { printLine(body, `[OK] Ya desbloqueado.`, 'ok'); return; }
    unlockAch('hacker', 'Hacker');
    launchBruteforce(win, key);
  }},
  unlock: { desc: 'Unlock', run: (body, win, args) => {
    const key = (args[0] || '').toLowerCase();
    const token = args.slice(1).join(' ').trim().toUpperCase();
    if (!LINKS_DB[key]) { printLine(body, `Uso: unlock <key> <TOKEN>`, 'warn'); return; }
    if (!token) { printLine(body, `Falta el token.`, 'warn'); return; }
    if (token === LINKS_DB[key].token) showUnlockResult(win, key);
    else {
      printLine(body, `x TOKEN INVALIDO`, 'err');
      playError();
      effectQuake();
    }
  }},
  list: { desc: 'Tokens', run: (body) => {
    const keys = Object.keys(LINKS_DB).filter(k => unlockedLinks[k]);
    if (!keys.length) { printLine(body, 'Nada desbloqueado.', 'warn'); return; }
    keys.forEach(k => printLine(body, `  <span class="ok">${padEnd(k, 12)}</span>${escapeHTML(LINKS_DB[k].token)}`));
  }},
  fastfetch: { desc: 'Sistema', run: (body) => {
    const eye = getEye();
    const uptime = Math.floor(performance.now() / 1000);
    eye.forEach(line => printLine(body, `<span class="eye">${escapeHTML(line)}</span>`, 'eye'));
    printLine(body, '', '');
    printLine(body, `  <span class="ok">muncixop</span><span class="dim">@</span><span class="ok">void</span>`, '');
    printLine(body, '  ' + '-'.repeat(30), 'dim');
    const info = [
      ['OS', 'VOID SYSTEMS v7.1'],
      ['Host', 'muncixop.github.io'],
      ['Kernel', 'glitch-6.6.6'],
      ['Shell', 'voidsh 7.1'],
      ['Uptime', uptime + 's'],
      ['CPU', 'Void Core (64)'],
      ['GPU', 'Phantom Renderer'],
      ['RAM', (40 + Math.random() * 10).toFixed(1) + 'GB / 128GB'],
    ];
    info.forEach(([k, v]) => printLine(body, `  <span class="ok">${padEnd(k, 10)}</span><span class="info">${escapeHTML(v)}</span>`, ''));
    setTimeout(() => blinkEye(body), 1200);
    unlockAch('first_fetch', 'El ojo te vio');
  }},
  neofetch: { desc: 'Alias', run: (body, w, a) => COMMANDS.fastfetch.run(body, w, a) },
  scan: { desc: 'Scan', run: async (body) => {
    printLine(body, ':: ESCANEO DE RED', 'accent');
    const hosts = [
      { ip: '192.168.1.1', mac: 'A4:2B:B0:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'router', port: '80,443' },
      { ip: '192.168.1.14', mac: 'F0:18:98:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'macbook', port: '22,5900' },
      { ip: '192.168.1.31', mac: 'D8:BB:C1:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'iphone', port: '62078' },
    ];
    for (const h of hosts) {
      await sleep(250);
      printLine(body, `  ${padEnd(h.ip, 16)}${padEnd(h.mac, 20)}${padEnd(h.name, 12)}${h.port}`);
      playTick(700);
    }
    printLine(body, '[OK] ' + hosts.length + ' hosts detectados.', 'ok');
    unlockAch('scanner', 'Escaneo');
  }},
  ping: { desc: 'Ping', run: async (body, w, args) => {
    const host = (args[0] || 'muncixop.github.io').toLowerCase();
    printLine(body, `PING ${escapeHTML(host)}`, 'accent');
    for (let i = 0; i < 4; i++) {
      await sleep(700);
      printLine(body, `64 bytes: icmp_seq=${i + 1} time=${(Math.random() * 30 + 8).toFixed(1)} ms`, 'ok');
    }
    unlockAch('pinger', 'Ping');
  }},
  trace: { desc: 'Trace', run: async (body, w, args) => {
    const host = (args[0] || 'void.systems').toLowerCase();
    printLine(body, `traceroute a ${escapeHTML(host)}`, 'accent');
    const hops = ['192.168.1.1','10.0.0.1','172.16.0.1','209.85.252.1','142.250.185.14','185.199.108.153'];
    for (let i = 0; i < hops.length; i++) {
      await sleep(250);
      printLine(body, `  ${padStart(i + 1, 2)}  ${padEnd(hops[i], 18)}${(Math.random() * 40 + 5).toFixed(2)} ms`, 'mono-dim');
    }
  }},
  whois: { desc: 'Whois', run: async (body, w, args) => {
    const host = (args[0] || 'muncixop.github.io').toLowerCase();
    printLine(body, `whois ${escapeHTML(host)}`, 'accent');
    await sleep(300);
    [['Registrar','GITHUB, INC.'],['Status','clientTransferProhibited'],['DNSSEC','unsigned']].forEach(([k,v]) => {
      printLine(body, `  <span class="ok">${padEnd(k, 14)}</span>${escapeHTML(v)}`);
    });
  }},
  nmap: { desc: 'Nmap', run: async (body, w, args) => {
    const target = (args[0] || '192.168.1.1').toLowerCase();
    printLine(body, `Nmap scan for ${escapeHTML(target)}`, 'accent');
    const ports = [['22/tcp','open','ssh'],['80/tcp','open','http'],['443/tcp','open','https'],['3306/tcp','closed','mysql']];
    for (const [p, s, svc] of ports) {
      await sleep(250);
      printLine(body, `${padEnd(p, 9)}<span class="${s === 'open' ? 'ok' : 'dim'}">${padEnd(s, 9)}</span>${svc}`);
    }
  }},
  curl: { desc: 'Curl', run: async (body, w, args) => {
    const url = args[0] || 'https://muncixop.github.io';
    printLine(body, `curl ${escapeHTML(url)}`, 'accent');
    await sleep(400);
    printLine(body, 'HTTP/2 200', 'ok');
    printLine(body, 'server: GitHub.com', '');
    printLine(body, '<!DOCTYPE html>...', 'mono-dim');
  }},
  ps: { desc: 'PS', run: (body) => {
    printLine(body, '  PID  USER      %CPU  COMMAND', 'info');
    [[1,'root',0.0,'/sbin/init'],[128,'muncixop',2.4,'voidsh'],[512,'muncixop',42.1,'matrix-daemon'],[2048,'muncixop',8.9,'node server.js']].forEach(p => {
      printLine(body, `  ${padStart(p[0],4)}  ${padEnd(p[1],9)} ${padStart(p[2].toFixed(1),5)}  ${p[3]}`);
    });
  }},
  top: { desc: 'Top', run: (body) => {
    printLine(body, 'top - ' + new Date().toLocaleTimeString(), 'accent');
    printLine(body, 'Tasks: 142 total, 2 running', 'dim');
    printLine(body, '%Cpu(s): ' + (5 + Math.random() * 15).toFixed(1) + ' us', 'dim');
  }},
  tree: { desc: 'Tree', run: (body) => {
    ['├── public/', '│   ├── index.html', '│   ├── style.css', '│   └── main.js', '├── projects/', '└── README.md'].forEach(l => printLine(body, l, 'mono-dim'));
  }},
  ls: { desc: 'LS', run: (body) => printLine(body, '<span class="info">public/</span>  <span class="info">assets/</span>  README.md  package.json', '') },
  pwd: { desc: 'PWD', run: (body) => printLine(body, '/home/muncixop/void-systems', 'info') },
  decrypt: { desc: 'Decrypt', run: async (body) => {
    printLine(body, ':: DESCIFRADO', 'accent');
    const target = randomFrom(['VOID','MUNCIXOP','GLITCH','MATRIX']);
    const cipher = '!@#$%^&*()_+-=[]{}|0123456789';
    const line = printLine(body, '', 'ok');
    for (let f = 0; f < 20; f++) {
      let s = '';
      for (let i = 0; i < target.length; i++) {
        s += (i < (f / 20) * target.length) ? target[i] : cipher[Math.floor(Math.random() * cipher.length)];
      }
      line.innerHTML = `  <span class="ok">${escapeHTML(s)}</span>`;
      playTick(300 + f * 30);
      await sleep(80);
    }
    printLine(body, `[OK] ${target}`, 'ok');
    playSuccess();
    unlockAch('decryptor', 'Descifrador');
  }},
  cowsay: { desc: 'Vaca', run: (body, w, args) => {
    const text = args.join(' ') || 'MuncixOp es el mejor';
    const maxLen = text.length;
    printLine(body, ' ' + '_'.repeat(maxLen + 2), 'dim');
    printLine(body, ` <span class="dim">&lt;</span> ${escapeHTML(text)} <span class="dim">&gt;</span>`, '');
    printLine(body, ' ' + '-'.repeat(maxLen + 2), 'dim');
    printLine(body, '        \\   ^__^');
    printLine(body, '         \\  (oo)\\_______');
    printLine(body, '            (__)\\       )\\/\\');
    printLine(body, '                ||----w |');
    unlockAch('cow', 'Vaca');
  }},
  fortune: { desc: 'Frase', run: (body) => {
    const f = ['El que madruga, encuentra todo cerrado.', 'No es un bug, es una feature.', 'Si funciona, no lo toques.', 'La simplicidad es la maxima sofisticacion.'];
    printLine(body, `"${escapeHTML(randomFrom(f))}"`, 'info');
    unlockAch('fortune', 'Sabio');
  }},
  weather: { desc: 'Clima', run: async (body, w, args) => {
    const city = args.join(' ') || 'Bogotá';
    printLine(body, `Clima para ${escapeHTML(city)}`, 'accent');
    await sleep(400);
    printLine(body, `  Temperatura    <span class="ok">${(15 + Math.random() * 20).toFixed(1)}°C</span>`);
    printLine(body, `  Humedad        ${(40 + Math.random() * 40).toFixed(0)}%`);
  }},
  crypto: { desc: 'Cripto', run: async (body, w, args) => {
    const sym = (args[0] || 'BTC').toUpperCase();
    printLine(body, `Consultando ${escapeHTML(sym)}`, 'accent');
    await sleep(400);
    printLine(body, `  Precio       <span class="ok">$${(Math.random() * 60000 + 10000).toLocaleString()}</span>`);
  }},
  dice: { desc: 'Dado', run: (body, w, args) => {
    const faces = parseInt(args[0]) || 6;
    const r = Math.floor(Math.random() * faces) + 1;
    printLine(body, `Tirando dado de ${faces} caras...`, 'dim');
    const line = printLine(body, '', '');
    scrambleText(line, `-> ${r}`, 400);
  }},
  '8ball': { desc: '8ball', run: (body, w, args) => {
    const q = args.join(' ') || '(sin pregunta)';
    const a = ['Si, definitivamente.', 'No lo creo.', 'Sin duda.', 'Pregunta otra vez.', 'No cuentes con eso.'];
    printLine(body, `Pregunta: ${escapeHTML(q)}`, 'dim');
    const line = printLine(body, '', '');
    scrambleText(line, randomFrom(a), 500);
  }},
  random: { desc: 'Random', run: (body) => {
    const f = ['El primer bug fue una polilla en 1947.', 'JavaScript se hizo en 10 dias.', 'Python se llama por Monty Python.', 'Linux empezo como hobby de Linus en 1991.'];
    printLine(body, `  ${escapeHTML(randomFrom(f))}`, 'info');
  }},
  countdown: { desc: 'Countdown', run: async (body, w, args) => {
    let n = Math.min(Math.max(parseInt(args[0]) || 5, 1), 20);
    for (let i = n; i > 0; i--) {
      printLine(body, `  ${i}...`, 'accent');
      playBeep(400 + i * 60, .15);
      haptic(20);
      await sleep(500);
    }
    printLine(body, '  DESPEGUE!', 'ok');
    effectConfetti(30);
    playPowerUp();
  }},
  spinner: { desc: 'Spinner', run: async (body) => {
    const fr = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];
    const line = printLine(body, '', 'accent');
    for (let i = 0; i < 40; i++) {
      line.textContent = `  ${fr[i % fr.length]}  Procesando...`;
      await sleep(60);
    }
    line.innerHTML = `  <span class="ok">[OK]</span> Listo.`;
  }},
  type: { desc: 'Type', run: async (body, w, args) => {
    const text = args.join(' ') || 'Hola mundo desde VOID SYSTEMS';
    const line = printLine(body, '', 'accent');
    for (let i = 0; i < text.length; i++) {
      line.textContent += text[i];
      if (i % 3 === 0) playTick(600 + Math.random() * 300);
      await sleep(40);
    }
  }},
  rainbow: { desc: 'Rainbow', run: (body, w, args) => {
    const text = args.join(' ') || 'MUNCIXOP';
    const colors = ['#ff0040','#ff8000','#ffff00','#00ff40','#00aaff','#8000ff','#ff00aa'];
    let html = '';
    for (let i = 0; i < text.length; i++) {
      const c = colors[i % colors.length];
      html += `<span style="color:${c};text-shadow:0 0 8px ${c}80">${escapeHTML(text[i])}</span>`;
    }
    printLine(body, html, '');
  }},
  scramble: { desc: 'Scramble', run: async (body, w, args) => {
    const text = args.join(' ') || 'VOID SYSTEMS';
    const line = printLine(body, '', 'accent');
    scrambleText(line, text, 800);
    playGlitch();
  }},
  ascii: { desc: 'ASCII', run: (body, w, args) => {
    const text = (args.join(' ') || 'VOID').toUpperCase().slice(0, 12);
    const font = {
      'A':['  ▄▄  ',' █  █ ',' ████ ',' █  █ ',' █  █ '],
      'V':[' █   █',' █   █',' █   █','  █ █ ','   █  '],
      'O':[' ▄▄▄  ','█   █ ','█   █ ','█   █ ',' ▀▀▀  '],
      'I':[' ███ ','  █  ','  █  ','  █  ',' ███ '],
      'D':[' ███  ',' █  █ ',' █  █ ',' █  █ ',' ███  '],
      'M':[' █▄ ▄█ ',' █ █ █ ',' █ █ █ ',' █   █ ',' █   █ '],
      'U':[' █  █ ',' █  █ ',' █  █ ',' █  █ ',' ▀▀▀▀ '],
      'C':[' ▄▄▄  ','█     ','█     ','█     ',' ▀▀▀  '],
      'X':[' █   █','  █ █ ','   █  ','  █ █ ',' █   █'],
      ' ':['     ','     ','     ','     ','     '],
    };
    for (let row = 0; row < 5; row++) {
      let l = '  ';
      for (const ch of text) l += (font[ch] ? font[ch][row] : font[' '][row]) + ' ';
      printLine(body, l, 'accent');
    }
  }},
  confetti: { desc: 'Confetti', run: (body) => {
    effectConfetti(60);
    playSuccess();
    haptic([20, 30, 20, 30, 60]);
    printLine(body, '[OK] Confetti!', 'ok');
    unlockAch('confetti', 'Fiestero');
  }},
  theme: { desc: 'Tema', run: (body, w, args) => {
    const valid = ['green','red','blue','purple','amber','cyan','pink','mono','rainbow'];
    const t = (args[0] || '').toLowerCase();
    if (!valid.includes(t)) { printLine(body, `Uso: theme <${valid.join('|')}>`, 'warn'); return; }
    document.body.className = document.body.className.replace(/\btheme-\w+/g, '').trim();
    if (t !== 'green') document.body.classList.add('theme-' + t);
    printLine(body, `[OK] Tema: ${t}`, 'ok');
    playSuccess();
    unlockAch('themer', 'Estilista');
  }},
  cyberpunk: { desc: 'Cyberpunk', run: (body) => {
    document.body.classList.toggle('cyberpunk');
    const on = document.body.classList.contains('cyberpunk');
    printLine(body, on ? '[!] CYBERPUNK ON' : '[OK] OFF', on ? 'err' : 'ok');
    playGlitch();
    effectGlitchSlice();
  }},
  hypnotize: { desc: 'Hypno', run: (body) => {
    document.body.classList.add('hypnotize');
    printLine(body, '[!] MIRAME...', 'warn');
    playBeep(300, .5);
    setTimeout(() => { document.body.classList.remove('hypnotize'); printLine(body, '[OK] Despierta.', 'ok'); }, 4000);
  }},
  flash: { desc: 'Flash', run: (body) => { effectFlash(); playBeep(1200, .05); printLine(body, '[!] Flash!', 'warn'); }},
  quake: { desc: 'Quake', run: (body) => { effectQuake(); printLine(body, '[!] TERREMOTO', 'err'); unlockAch('quake', 'Terremoto'); }},
  history: { desc: 'History', run: (body) => {
    if (!cmdHistory.length) { printLine(body, 'Vacio.', 'dim'); return; }
    printLine(body, ':: HISTORIAL', 'accent');
    cmdHistory.slice(-30).forEach((c, i) => printLine(body, `  ${padStart(i + 1, 4)}  ${escapeHTML(c)}`, 'mono-dim'));
  }},
  achievements: { desc: 'Logros', run: (body) => {
    const list = Object.entries(achievements);
    printLine(body, ':: LOGROS', 'accent');
    if (!list.length) { printLine(body, '  Ninguno.', 'dim'); return; }
    list.forEach(([k, v]) => printLine(body, `  <span class="ok">[+]</span> ${escapeHTML(v.name)}`, ''));
  }},
  whoami: { desc: 'Whoami', run: (body) => { printLine(body, 'muncixop', 'ok'); printLine(body, 'Creative Developer & UI Engineer.', 'dim'); }},
  date: { desc: 'Date', run: (body) => printLine(body, new Date().toString(), 'info') },
  clear: { desc: 'Clear', run: (body) => { body.innerHTML = ''; }},
  matrix: { desc: 'Matrix', run: (body) => {
    matrixActive = !matrixActive;
    printLine(body, matrixActive ? '[OK] Matrix ON' : '[!] OFF', matrixActive ? 'ok' : 'warn');
  }},
  glitch: { desc: 'Glitch', run: (body, win) => {
    document.body.classList.add('mx-hit');
    win.el.classList.add('corrupt-shake');
    playGlitch();
    effectGlitchSlice();
    effectQuake();
    printLine(body, '[!] SOBRECARGA...', 'err');
    setTimeout(() => {
      document.body.classList.remove('mx-hit');
      win.el.classList.remove('corrupt-shake');
      printLine(body, '[OK] Estabilizado.', 'ok');
    }, 900);
    unlockAch('glitch', 'Glitch Master');
  }},
  os: { desc: 'OS', run: (body, w, args) => {
    const t = (args[0] || '').toLowerCase();
    const valid = ['mac','win','linux','android','ios'];
    if (!valid.includes(t)) { printLine(body, `Uso: os <${valid.join('|')}>`, 'warn'); return; }
    document.body.className = document.body.className.replace(/\bos-\w+/g, '').trim();
    document.body.classList.add('os-' + t);
    printLine(body, `[OK] SO: ${t}`, 'ok');
    playSuccess();
  }},
  sound: { desc: 'Sound', run: (body) => {
    audioEnabled = !audioEnabled;
    printLine(body, audioEnabled ? '[ON]' : '[OFF]', audioEnabled ? 'ok' : 'warn');
  }},
  reset: { desc: 'Reset', run: (body) => {
    unlockedLinks = {}; saveUnlocked();
    printLine(body, '[OK] Tokens borrados.', 'ok');
  }},
  reboot: { desc: 'Reboot', run: (body) => {
    printLine(body, '[!] Reiniciando...', 'warn');
    playWhoosh();
    effectFlash();
    setTimeout(() => { body.innerHTML = ''; bootSequence(true); }, 800);
  }},
  void: { desc: 'Void', run: (body) => {
    printLine(body, '[OK] Nueva terminal...', 'ok');
    playSuccess();
    setTimeout(() => bootSequence(true), 300);
    unlockAch('void', 'Multi-terminal');
  }},
  close: { desc: 'Close', run: (body, win) => {
    printLine(body, 'Cerrando...', 'warn');
    setTimeout(() => closeWindow(win.id), 400);
  }},
  sudo: { desc: 'Sudo', run: (body) => {
    printLine(body, '[sudo] password: ', 'warn');
    setTimeout(() => { printLine(body, 'Nice try. Pero no.', 'err'); effectQuake(); }, 800);
  }},
  banner: { desc: 'Banner', run: (body) => {
    printLines(body, [
      ['  ██╗   ██╗ ██████╗ ██╗██████╗ ', 'ok'],
      ['  ██║   ██║██╔═══██╗██║██╔══██╗', 'ok'],
      ['  ██║   ██║██║   ██║██║██║  ██║', 'ok'],
      ['  ╚██╗ ██╔╝██║   ██║██║██║  ██║', 'ok'],
      ['   ╚████╔╝ ╚██████╔╝██║██████╔╝', 'ok'],
      ['    ╚═══╝   ╚═════╝ ╚═╝╚═════╝ ', 'ok'],
    ]);
  }},
  exit: { desc: 'Exit', run: (body, win) => {
    printLine(body, 'Cerrando...', 'warn');
    setTimeout(() => closeWindow(win.id), 400);
  }},
  echo: { desc: 'Echo', run: (body, w, args) => printLine(body, escapeHTML(args.join(' ') || '')) }
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
    ['VOID BIOS v7.1 - Inicializando...', 'dim', 100],
    ['  [OK] CPU Void Core x64 @ 3.20GHz', 'ok', 80],
    ['  [OK] Memoria ECC 128GB', 'ok', 80],
    ['  [OK] GPU Phantom Renderer', 'ok', 70],
    ['  [OK] Red local activa', 'ok', 70],
    ['  [OK] Asistencias moviles cargadas', 'ok', 60],
    ['', '', 60],
    ['Cargando VOID SYSTEMS v7.1...', 'info', 200],
    ['', '', 100],
  ];
  for (const [text, cls, delay] of bootLines) {
    printLine(body, text, cls);
    await sleep(delay);
  }

  printLines(body, [
    ['  ██████╗ ███████╗███████╗████████╗', 'ok'],
    ['  ██╔══██╗██╔════╝██╔════╝╚══██╔══╝', 'ok'],
    ['  ██████╔╝█████╗  █████╗     ██║   ', 'ok'],
    ['  ██╔══██╗██╔══╝  ██╔══╝     ██║   ', 'ok'],
    ['  ██║  ██║███████╗██║        ██║   ', 'ok'],
    ['  ╚═╝  ╚═╝╚══════╝╚═╝        ╚═╝   ', 'ok'],
    ['', ''],
    ['  Bienvenido a VOID SYSTEMS v7.1, muncixop.', 'accent'],
    ['  Escribe <span class="ok">help</span> para ver los comandos.', 'dim'],
    ['  Prueba <span class="ok">fastfetch</span> para ver el ojo.', 'dim'],
    ['', ''],
  ]);
  await sleep(200);

  startInput(term);
}

/* ============================================================
   INPUT LOOP v7.1 — Input real + asistencias
   ============================================================ */
let currentTerm = null;
let currentInputLineRef = null;
let globalKeydownInstalled = false;

function startInput(term) {
  currentTerm = term;
  const body = term.body;

  let currentLine = null;
  let typed = '';
  let histIdx = cmdHistory.length;
  let suggestBox = null;
  let suggestItems = [];
  let suggestIdx = 0;
  let idleTimer = null;

  const createInputLine = () => {
    if (currentLine && currentLine.parentNode) currentLine.remove();
    currentLine = document.createElement('div');
    currentLine.className = 'input-line idle';
    currentLine.style.position = 'relative';
    currentLine.innerHTML = getPromptHTML() + '<input class="ki" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Terminal input">';
    body.appendChild(currentLine);
    body.scrollTop = body.scrollHeight;
    currentInputLineRef = currentLine;

    const input = currentLine.querySelector('.ki');

    if (!mob) {
      setTimeout(() => {
        try { input.focus({ preventScroll: true }); } catch (e) {}
      }, 50);
    }

    input.addEventListener('input', () => {
      typed = input.value;
      updateSuggest();
      if (currentLine.classList.contains('idle')) currentLine.classList.remove('idle');
      resetIdleTimer();
      body.scrollTop = body.scrollHeight;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submit();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (suggestItems.length && suggestBox) {
          suggestIdx = Math.max(0, suggestIdx - 1);
          Array.from(suggestBox.children).forEach((el, i) => el.classList.toggle('active', i === suggestIdx));
          return;
        }
        if (cmdHistory.length) {
          histIdx = Math.max(0, histIdx - 1);
          input.value = cmdHistory[histIdx] || '';
          typed = input.value;
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (suggestItems.length && suggestBox) {
          suggestIdx = Math.min(suggestItems.length - 1, suggestIdx + 1);
          Array.from(suggestBox.children).forEach((el, i) => el.classList.toggle('active', i === suggestIdx));
          return;
        }
        if (histIdx < cmdHistory.length - 1) {
          histIdx++;
          input.value = cmdHistory[histIdx] || '';
        } else {
          histIdx = cmdHistory.length;
          input.value = '';
        }
        typed = input.value;
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (suggestItems.length && suggestBox) {
          typed = suggestItems[suggestIdx] + ' ';
          input.value = typed;
          updateSuggest();
          return;
        }
        const partial = typed.trim();
        if (!partial) return;
        const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
        if (matches.length === 1) { typed = matches[0] + ' '; input.value = typed; updateSuggest(); }
        else if (matches.length > 1) printLine(body, matches.join('  '), 'dim');
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        body.innerHTML = '';
        createInputLine();
      } else if (e.key.length === 1) {
        playKey();
        if (Math.random() > 0.85) {
          input.classList.add('glitch-flash');
          setTimeout(() => input.classList.remove('glitch-flash'), 80);
        }
      }
    });

    input.addEventListener('focus', () => {
      if (currentLine) currentLine.classList.remove('idle');
      if (mob) setTimeout(() => document.body.classList.add('kb-open'), 100);
    });
    input.addEventListener('blur', () => {
      if (mob) setTimeout(() => document.body.classList.remove('kb-open'), 100);
    });
  };

  const resetIdleTimer = () => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (currentLine && typed === '') currentLine.classList.add('idle');
    }, 3000);
  };

  const hideSuggest = () => {
    if (suggestBox && suggestBox.parentNode) suggestBox.remove();
    suggestBox = null;
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
        if (!currentLine) return;
        const input = currentLine.querySelector('.ki');
        typed = m + ' ';
        input.value = typed;
        input.focus();
        updateSuggest();
      });
      suggestBox.appendChild(item);
    });
    if (currentLine) currentLine.appendChild(suggestBox);
    suggestIdx = 0;
  };

  const submit = () => {
    if (!currentLine) return;
    const input = currentLine.querySelector('.ki');
    const cmd = (input.value || typed).trim();
    typed = '';
    hideSuggest();

    const cmdLine = document.createElement('div');
    cmdLine.className = 'out cmd';
    cmdLine.innerHTML = getPromptHTML() + escapeHTML(cmd);
    currentLine.replaceWith(cmdLine);
    currentLine = null;
    currentInputLineRef = null;

    if (cmd) {
      cmdHistory.push(cmd);
      saveHistory();
      histIdx = cmdHistory.length;
      playEnter();
      haptic(10);
      runCommand(cmd, body, term);
    }

    createInputLine();
    body.scrollTop = body.scrollHeight;
  };

  window._submitCurrent = submit;
  window._getCurrentInput = () => {
    if (!currentInputLineRef) return null;
    return currentInputLineRef.querySelector('.ki');
  };

  createInputLine();

  body.addEventListener('click', (e) => {
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) return;
    if (currentInputLineRef) {
      const input = currentInputLineRef.querySelector('.ki');
      if (input) {
        try { input.focus({ preventScroll: true }); } catch (err) {}
      }
    }
  });

  if (!globalKeydownInstalled) {
    globalKeydownInstalled = true;
    window.addEventListener('keydown', (e) => {
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        bootSequence(true);
      } else if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'w') {
        e.preventDefault();
        if (currentTerm) closeWindow(currentTerm.id);
      } else if (e.key === 'Escape' && document.body.classList.contains('cyberpunk')) {
        document.body.classList.remove('cyberpunk');
      }
    });
  }
}

/* ============================================================
   MOBILE ASSISTS
   ============================================================ */
function initMobileAssists() {
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      if (!cmd) return;
      haptic(12);
      const input = window._getCurrentInput ? window._getCurrentInput() : null;
      if (input) {
        input.value = cmd;
        input.focus();
        setTimeout(() => {
          if (window._submitCurrent) window._submitCurrent();
        }, 60);
      }
    });
  });

  document.querySelectorAll('.mb-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const action = btn.dataset.action;
      haptic(10);
      const input = window._getCurrentInput ? window._getCurrentInput() : null;
      if (!input) return;

      if (action === 'enter') {
        if (window._submitCurrent) window._submitCurrent();
      } else if (action === 'backspace') {
        input.value = input.value.slice(0, -1);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        playKey();
      } else if (action === 'tab') {
        const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        input.dispatchEvent(ev);
      } else if (action === 'up') {
        const ev = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true });
        input.dispatchEvent(ev);
      } else if (action === 'down') {
        const ev = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
        input.dispatchEvent(ev);
      } else if (action === 'esc') {
        input.blur();
        document.body.classList.remove('kb-open');
      }
      input.focus();
    });
  });

  if (window.visualViewport) {
    let baseHeight = window.visualViewport.height;
    window.visualViewport.addEventListener('resize', () => {
      const h = window.visualViewport.height;
      const isKeyboardOpen = h < baseHeight - 150;
      document.body.classList.toggle('kb-open', isKeyboardOpen);
    });
  }

  const observer = new MutationObserver(() => {
    const hasInput = document.querySelector('.input-line');
    const chips = document.getElementById('quick-chips');
    if (chips) {
      if (!hasInput) chips.classList.add('hidden');
      else chips.classList.remove('hidden');
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/* ============================================================
   RUN COMMAND
   ============================================================ */
function runCommand(input, body, win) {
  const parts = input.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const command = COMMANDS[cmd];
  if (!command) {
    printLine(body, `voidsh: comando no encontrado: ${escapeHTML(cmd)}`, 'err');
    printLine(body, `Escribe <span class="ok">help</span> para ver los comandos.`, 'dim');
    playError();
    effectGlitchSlice();
    return;
  }
  try {
    const r = command.run(body, win, args);
    if (r && typeof r.catch === 'function') r.catch(e => {
      printLine(body, `Error: ${escapeHTML(e.message)}`, 'err');
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
  setTimeout(initMobileAssists, 200);
});

document.addEventListener('click', (e) => {
  if (e.target.closest('.btn') || e.target.closest('.launcher') || e.target.closest('.copy-token') || e.target.closest('.err-btn') || e.target.closest('.chip') || e.target.closest('.mb-btn')) return;
  effectRipple(e.clientX, e.clientY);
});

launcher.addEventListener('click', () => {
  playSuccess();
  effectFlash('rgba(61,220,132,.15)');
  haptic(20);
  bootSequence(true);
});

let lastTouch = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, { passive: false });

const konamiSeq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
window.addEventListener('keydown', (e) => {
  if (e.key === konamiSeq[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konamiSeq.length) {
      konamiIdx = 0;
      document.body.classList.add('cyberpunk');
      effectConfetti(100);
      effectFlash('rgba(199,125,255,.4)');
      effectQuake();
      playPowerUp();
      unlockAch('konami', 'Codigo Konami');
      setTimeout(() => document.body.classList.remove('cyberpunk'), 8000);
    }
  } else {
    konamiIdx = 0;
  }
});

let longPressTimer = null;
document.addEventListener('touchstart', (e) => {
  const bar = e.target.closest('.win-bar');
  if (!bar) return;
  if (e.target.closest('.btn')) return;
  const win = bar.closest('.win');
  if (!win) return;
  longPressTimer = setTimeout(() => {
    haptic([30, 20, 30]);
    const id = win.dataset.id;
    const action = confirm('Acciones de ventana:\n\nAceptar = Maximizar/Restaurar\nCancelar = Cerrar ventana');
    if (action) toggleMaximize(id);
    else closeWindow(id);
  }, 700);
}, { passive: true });

document.addEventListener('touchend', () => {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
}, { passive: true });
document.addEventListener('touchmove', () => {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
}, { passive: true });

console.log('%c VOID SYSTEMS v7.1 ', 'background:#3ddc84;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px;font-size:14px');
console.log('%c Bienvenido, muncixop. ', 'color:#3ddc84;font-weight:bold;font-size:12px');
console.log('%c Sin wobbly. Input real. Estilo intacto. ', 'color:#5eaaff;font-style:italic');
