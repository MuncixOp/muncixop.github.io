/* ============================================================
   VOID SYSTEMS v3.0 — Terminal / OS Simulator
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
   OJO ASCII — MuncixOp (61 chars, 32 lineas)
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
  toast.innerHTML = `<div class="ach-title">LOGRO DESBLOQUEADO</div><div class="ach-desc">${escapeHTML(name)}</div>`;
  document.body.appendChild(toast);
  playSuccess();
  setTimeout(() => {
    toast.style.animation = 'achIn .4s reverse forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
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
    n1.buffer = noiseBuf(a, .15);
    g1.gain.setValueAtTime(.06, t);
    g1.gain.exponentialRampToValueAtTime(.001, t + .15);
    n1.connect(g1); g1.connect(a.destination); n1.start(t); n1.stop(t + .15);
    const o = a.createOscillator(), g2 = a.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(2000, t);
    o.frequency.exponentialRampToValueAtTime(100, t + .1);
    g2.gain.setValueAtTime(.04, t);
    g2.gain.exponentialRampToValueAtTime(.001, t + .1);
    o.connect(g2); g2.connect(a.destination); o.start(t); o.stop(t + .1);
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

/* ---------- MATRIX CANVAS ---------- */
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

/* ---------- WINDOW SYSTEM ---------- */
const winsContainer = document.getElementById('wins');
const dock = document.getElementById('dock');
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

  win.addEventListener('mousedown', () => { win.style.zIndex = ++zIndex; });

  win.querySelector('.close').addEventListener('click', (e) => { e.stopPropagation(); closeWindow(id); });
  win.querySelector('.min').addEventListener('click', (e) => { e.stopPropagation(); minimizeWindow(id); });
  win.querySelector('.max').addEventListener('click', (e) => { e.stopPropagation(); toggleMaximize(id); });

  makeDraggable(win, win.querySelector('.win-bar'));
  makeResizable(win, win.querySelector('.rz'));

  return { id, el: win, body: win.querySelector('.win-body') };
}

function closeWindow(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.el.style.animation = 'winIn .3s cubic-bezier(.22,1,.36,1) reverse forwards';
  setTimeout(() => { entry.el.remove(); openWindows.delete(id); updateDock(); }, 260);
  playGlitch();
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

/* ---------- HELPERS ---------- */
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
        ['decrypt', 'minijuego de descifrado'],
        ['cowsay <texto>', 'vaca que dice cosas'],
        ['fortune', 'frase aleatoria'],
        ['weather [ciudad]', 'clima simulado'],
        ['crypto [symbol]', 'precios de cripto simulados'],
        ['theme <color>', 'cambia el color de acento'],
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
        win.el.classList.add('corrupt-shake');
        setTimeout(() => win.el.classList.remove('corrupt-shake'), 700);
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
     FASTFETCH — Ojo + info
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

      // ---- OJO ----
      eye.forEach(line => {
        printLine(body, `<span class="eye">${escapeHTML(line)}</span>`, 'eye');
      });

      printLine(body, '', '');

      // ---- INFO ----
      printLine(body, `  <span class="ok">muncixop</span><span class="dim">@</span><span class="ok">void</span>`, '');
      printLine(body, '  ' + '-'.repeat(30), 'dim');

      const info = [
        ['OS',       'VOID SYSTEMS v3.0'],
        ['Host',     'muncixop.github.io'],
        ['Kernel',   'glitch-6.6.6-x64'],
        ['Shell',    'voidsh 3.0'],
        ['Uptime',   uptime + 's'],
        ['CPU',      'Void Core (64) @ 3.20GHz'],
        ['GPU',      'Phantom Renderer'],
        ['RAM',      mem + 'GB / 128GB'],
        ['Latencia', lat + ' ms'],
        ['Theme',    (document.body.className.match(/theme-\w+/)?.[0] || 'glitch-cyberpunk').replace('theme-', '')],
        ['Links',    unlocked + '/' + total + ' desbloqueados'],
        ['User',     achievements.first_unlock ? 'hacker' : 'guest'],
      ];

      info.forEach(([k, v]) => {
        printLine(body, `  <span class="ok">${padEnd(k, 10)}</span><span class="info">${escapeHTML(v)}</span>`, '');
      });

      printLine(body, '');

      // ---- PARPADEO (opcional, creepy) ----
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
        printLine(body, `  ${padEnd(h.ip, 16)}${padEnd(h.mac, 20)}${padEnd(h.name, 18)}${h.port}`);
        playTick(700 + Math.random() * 500);
      }

      printLine(body, '');
      printLine(body, '[OK] Escaneo completado. 5 hosts detectados.', 'ok');
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
      unlockAch('cow', 'Vaca filósofa');
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
     THEME
     ============================================================ */
  theme: {
    desc: 'Cambia el color de acento',
    run: (body, win, args) => {
      const valid = ['green', 'red', 'blue', 'purple', 'amber', 'cyan', 'pink', 'mono'];
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
      unlockAch('themer', 'Estilista');
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
      printLine(body, '[!] SOBRECARGA DE SENAL DETECTADA...', 'err');
      setTimeout(() => {
        document.body.classList.remove('mx-hit');
        win.el.classList.remove('corrupt-shake');
        printLine(body, '[OK] Sistema estabilizado.', 'ok');
      }, 700);
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
      setTimeout(() => {
        body.innerHTML = '';
        bootSequence(true);
      }, 800);
    }
  },

  sudo: {
    desc: 'Intenta escalar privilegios',
    run: (body) => {
      printLine(body, '[sudo] password for muncixop: ', 'warn');
      setTimeout(() => printLine(body, 'Nice try. Pero no.', 'err'), 800);
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
        ['  --- VOID SYSTEMS ---', 'accent'],
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
  // Doble parpadeo ocasional
  if (Math.random() > .5) {
    setTimeout(() => {
      eyeLines.forEach(l => l.style.opacity = '0');
      setTimeout(() => eyeLines.forEach(l => l.style.opacity = '1'), 70);
    }, 180);
  }
}

/* ============================================================
   BOOT SEQUENCE
   ============================================================ */
let booted = false;
async function bootSequence(isReboot = false) {
  if (booted && !isReboot) return;
  booted = true;

  const term = createWindow('voidsh - ~', { width: 740, height: 580 });
  const body = term.body;
  body.style.minHeight = '100%';

  if (!isReboot) playBoot();

  const bootLines = [
    ['VOID BIOS v6.6.6 - Inicializando...', 'dim', 120],
    ['  [OK] CPU Void Core x64 @ 3.20GHz', 'ok', 90],
    ['  [OK] Memoria ECC 128GB verificada', 'ok', 90],
    ['  [OK] GPU Phantom Renderer', 'ok', 80],
    ['  [OK] Dispositivos de entrada', 'ok', 70],
    ['  [OK] Red eth0 192.168.1.42/24', 'ok', 70],
    ['', '', 60],
    ['Cargando VOID SYSTEMS v3.0...', 'info', 220],
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
    ['  Bienvenido a VOID SYSTEMS v3.0, muncixop.', 'accent'],
    ['  Escribe <span class="ok">help</span> para ver los comandos.', 'dim'],
    ['  Prueba <span class="ok">fastfetch</span> para ver el ojo.', 'dim'],
    ['  Prueba <span class="ok">social</span> para ver paginas bloqueadas.', 'dim'],
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

  const createInputLine = () => {
    if (currentLine) currentLine.remove();
    currentLine = document.createElement('div');
    currentLine.className = 'input-line';
    currentLine.style.position = 'relative';
    currentLine.innerHTML = getPromptHTML() + '<span class="typed"></span><span class="cur">_</span>';
    body.appendChild(currentLine);
    body.scrollTop = body.scrollHeight;
    updateSuggest();
  };

  const renderTyped = () => {
    if (!currentLine) return;
    currentLine.querySelector('.typed').textContent = typed;
    body.scrollTop = body.scrollHeight;
    updateSuggest();
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
    currentLine.appendChild(suggestBox);
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
    if (e.key === 'Escape') { e.preventDefault(); typed = ''; renderTyped(); return; }
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
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

/* ---------- GLOBAL ---------- */
window.addEventListener('load', () => {
  setTimeout(bootSequence, 300);
});

let lastTouch = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, { passive: false });
