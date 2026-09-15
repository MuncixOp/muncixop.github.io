/* ============================================================
   VOID SYSTEMS v9.1 — Terminal / OS Simulator
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

/* OJO ASCII */
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
const STORAGE_VERSION = '9.1';
const STORAGE_KEYS = {
  version: 'void_storage_version',
  history: 'void_history',
  achievements: 'void_achievements',
  unlocked: 'void_unlocked_links',
  notes: 'void_notes',
  balance: 'void_balance',
  stats: 'void_stats',
  settings: 'void_settings',
  packages: 'void_packages'
};
(function migrateStorage() {
  try {
    const oldVer = localStorage.getItem(STORAGE_KEYS.version);
    if (oldVer !== STORAGE_VERSION) localStorage.setItem(STORAGE_KEYS.version, STORAGE_VERSION);
  } catch (e) {}
})();

/* ============================================================
   PAQUETES
   ============================================================ */
const PACKAGES = {
  games:         { name:'games', desc:'Minijuegos de terminal', version:'1.2.0', size:'2.1 MB', commands:['coin','rps','guess','dice','8ball'], deps:[], icon:'🎮' },
  gambling:      { name:'gambling', desc:'Sistema de apuestas', version:'1.1.0', size:'1.8 MB', commands:['gamble'], deps:['games'], icon:'💰' },
  'crypto-utils':{ name:'crypto-utils', desc:'Herramientas criptográficas', version:'1.3.0', size:'3.4 MB', commands:['base64','rot13','hash','password','uuid','pick'], deps:[], icon:'🔐' },
  fun:           { name:'fun', desc:'Comandos de entretenimiento', version:'1.6.0', size:'2.7 MB', commands:['quote','joke','fact','meme','cowsay','fortune','random'], deps:[], icon:'🎭' },
  'net-tools':   { name:'net-tools', desc:'Diagnóstico de red', version:'2.1.0', size:'5.6 MB', commands:['ping','trace','nmap','whois','scan','curl'], deps:[], icon:'🌐' },
  'sys-tools':   { name:'sys-tools', desc:'Información del sistema', version:'1.4.0', size:'1.2 MB', commands:['ps','top','tree','ls','pwd'], deps:[], icon:'⚙️' },
  effects:       { name:'effects', desc:'Efectos visuales', version:'1.5.0', size:'4.1 MB', commands:['confetti','glitch','hypnotize','flash','quake','rainbow','scramble','type','spinner','countdown'], deps:[], icon:'✨' },
  'ascii-art':   { name:'ascii-art', desc:'Arte ASCII y banners', version:'1.1.0', size:'1.5 MB', commands:['ascii'], deps:[], icon:'🎨' },
  security:      { name:'security', desc:'Herramientas de seguridad', version:'3.1.0', size:'6.8 MB', commands:['decrypt'], deps:[], icon:'🛡️' }
};

let installedPackages = (() => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEYS.packages) || '[]');
    return raw.filter(n => PACKAGES[n]);
  } catch { return []; }
})();
function savePackages() {
  try { localStorage.setItem(STORAGE_KEYS.packages, JSON.stringify(installedPackages)); } catch {}
}
function findPackageForCommand(cmd) {
  for (const p of Object.values(PACKAGES)) if (p.commands.includes(cmd)) return p;
  return null;
}

/* STORAGE HELPERS */
let cmdHistory = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]'); } catch { return []; }})();
function saveHistory() { try { localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(cmdHistory.slice(-200))); } catch {} }

let achievements = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.achievements) || '{}'); } catch { return {}; }})();
function saveAchievements() { try { localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(achievements)); } catch {} }
function unlockAch(key, name) {
  if (achievements[key]) return;
  achievements[key] = { name, at: Date.now() };
  saveAchievements();
  showAchToast(name);
  playSuccess();
  haptic([30, 30, 30]);
}
function showAchToast(name) {
  const toast = document.createElement('div');
  toast.className = 'ach-toast';
  toast.innerHTML = `<div class="ach-title">LOGRO DESBLOQUEADO</div><div class="ach-desc">${escapeHTML(name)}</div><div class="ach-meta">${new Date().toLocaleTimeString()}</div>`;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'achIn .4s reverse forwards'; setTimeout(() => toast.remove(), 400); }, 3400);
}

let unlockedLinks = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.unlocked) || '{}'); } catch { return {}; }})();
function saveUnlocked() { try { localStorage.setItem(STORAGE_KEYS.unlocked, JSON.stringify(unlockedLinks)); } catch {} }

let userNotes = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]'); } catch { return []; }})();
function saveNotes() { try { localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(userNotes)); } catch {} }

let userBalance = (() => { try { return parseInt(localStorage.getItem(STORAGE_KEYS.balance) || '100', 10); } catch { return 100; }})();
function saveBalance() { try { localStorage.setItem(STORAGE_KEYS.balance, String(userBalance)); } catch {} }

let userStats = (() => {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.stats) || '{}');
    return {
      commandsUsed: s.commandsUsed || 0,
      uniqueCommands: s.uniqueCommands || [],
      sessionStart: Date.now(),
      totalTime: s.totalTime || 0,
      gamesWon: s.gamesWon || 0,
      gamesLost: s.gamesLost || 0,
      gamblesWon: s.gamblesWon || 0,
      gamblesLost: s.gamblesLost || 0,
      linksUnlocked: s.linksUnlocked || 0,
      notesCreated: s.notesCreated || 0,
      packagesInstalled: s.packagesInstalled || 0,
      bruteSuccess: s.bruteSuccess || 0,
      bruteFail: s.bruteFail || 0,
      lastCommand: s.lastCommand || ''
    };
  } catch {
    return { commandsUsed:0, uniqueCommands:[], sessionStart:Date.now(), totalTime:0, gamesWon:0, gamesLost:0, gamblesWon:0, gamblesLost:0, linksUnlocked:0, notesCreated:0, packagesInstalled:0, bruteSuccess:0, bruteFail:0, lastCommand:'' };
  }
})();
function saveStats() {
  try {
    const s = { ...userStats };
    delete s.sessionStart;
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(s));
  } catch {}
}

let userSettings = (() => {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || '{}');
    return {
      audioEnabled: s.audioEnabled !== false,
      matrixActive: s.matrixActive !== false,
      glitchesAuto: s.glitchesAuto !== false,
      notifications: s.notifications !== false
    };
  } catch {
    return { audioEnabled:true, matrixActive:true, glitchesAuto:true, notifications:true };
  }
})();
function saveSettings() { try { localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(userSettings)); } catch {} }

/* ============================================================
   AUDIO
   ============================================================ */
let actx = null;
let audioEnabled = userSettings.audioEnabled;

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
    o1.type='square'; o1.frequency.value=600+Math.random()*600;
    o2.type='sawtooth'; o2.frequency.value=1200+Math.random()*1200;
    g.gain.setValueAtTime(.018, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .028);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .028); o2.start(t); o2.stop(t + .028);
  } catch (e) {}
}
function playEnter() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), g = a.createGain();
    o1.type='square';
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
    o1.type='sawtooth';
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
      o.type='square'; o.frequency.value=f;
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
    o1.type='sine';
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
    o.type='square';
    o.frequency.value=freq || (600 + Math.random() * 400);
    g.gain.setValueAtTime(.012, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .018);
    o.connect(g); g.connect(a.destination);
    o.start(t); o.stop(t + .018);
  } catch (e) {}
}
function playBeep(freq, dur) {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o = a.createOscillator(), g = a.createGain();
    o.type='sine';
    o.frequency.value=freq || 880;
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
    f.type='lowpass';
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
    o.type='sine';
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
      o.type='square';
      o.frequency.setValueAtTime(300 + i * 200, t + i * .06);
      g.gain.setValueAtTime(.03, t + i * .06);
      g.gain.exponentialRampToValueAtTime(.001, t + i * .06 + .1);
      o.connect(g); g.connect(a.destination);
      o.start(t + i * .06); o.stop(t + i * .06 + .1);
    }
  } catch (e) {}
}
function playCoin() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain();
    o1.type='square'; o1.frequency.value=1800;
    o2.type='square'; o2.frequency.value=2400;
    g.gain.setValueAtTime(.06, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .15);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .15); o2.start(t); o2.stop(t + .15);
    const o3 = a.createOscillator(), g2 = a.createGain();
    o3.type='square'; o3.frequency.value=1400;
    g2.gain.setValueAtTime(.04, t + .12);
    g2.gain.exponentialRampToValueAtTime(.001, t + .35);
    o3.connect(g2); g2.connect(a.destination);
    o3.start(t + .12); o3.stop(t + .35);
  } catch (e) {}
}
function playWin() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    [523, 659, 784, 1047].forEach((f, i) => {
      const o = a.createOscillator(), g = a.createGain();
      o.type='triangle'; o.frequency.value=f;
      g.gain.setValueAtTime(.05, t + i * .1);
      g.gain.exponentialRampToValueAtTime(.001, t + i * .1 + .2);
      o.connect(g); g.connect(a.destination);
      o.start(t + i * .1); o.stop(t + i * .1 + .2);
    });
  } catch (e) {}
}
function playLose() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o = a.createOscillator(), g = a.createGain();
    o.type='sawtooth';
    o.frequency.setValueAtTime(400, t);
    o.frequency.exponentialRampToValueAtTime(80, t + .5);
    g.gain.setValueAtTime(.07, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .5);
    o.connect(g); g.connect(a.destination);
    o.start(t); o.stop(t + .5);
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
let matrixActive = userSettings.matrixActive;
let lastMatrixFrame = 0;
function drawMatrix(now) {
  if (!now) now = performance.now();
  if (now - lastMatrixFrame < 55) { requestAnimationFrame(drawMatrix); return; }
  lastMatrixFrame = now;
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
if (!reducedMotion) requestAnimationFrame(drawMatrix);

/* PARTICLES */
const pcanvas = document.getElementById('p');
const pctx = pcanvas.getContext('2d');
let pW, pH;
function resizeParticles() { pW = pcanvas.width = window.innerWidth; pH = pcanvas.height = window.innerHeight; }
resizeParticles();
window.addEventListener('resize', resizeParticles);
const particles = [];
const PARTICLE_COUNT = mob ? 20 : 60;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
    vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
    size: Math.random() * 2 + .5, alpha: Math.random() * .5 + .2,
    char: Math.random() > .5 ? '·' : '˙'
  });
}
let lastParticleFrame = 0;
function drawParticles(now) {
  if (!now) now = performance.now();
  if (reducedMotion) { requestAnimationFrame(drawParticles); return; }
  if (now - lastParticleFrame < 40) { requestAnimationFrame(drawParticles); return; }
  lastParticleFrame = now;
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
requestAnimationFrame(drawParticles);

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
  setTimeout(() => { entry.el.remove(); openWindows.delete(id); updateDock(); updateLauncher(); }, 380);
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
function updateLauncher() { launcher.classList.toggle('on', openWindows.size === 0); }

function makeDraggable(win, handle) {
  let sx, sy, ox, oy, dragging = false, rafId = null, nx = 0, ny = 0;
  const start = (e) => {
    if (win.classList.contains('maximized')) return;
    if (e.target.closest('.btn')) return;
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX; sy = p.clientY; ox = win.offsetLeft; oy = win.offsetTop;
    dragging = true; win.classList.add('dragging'); win.style.zIndex = ++zIndex;
    document.addEventListener('mousemove', move, { passive: false });
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('mouseup', end);
    document.addEventListener('touchend', end);
  };
  const move = (e) => {
    if (!dragging) return;
    if (e.cancelable) e.preventDefault();
    const p = e.touches ? e.touches[0] : e;
    nx = ox + (p.clientX - sx);
    ny = oy + (p.clientY - sy);
    nx = Math.max(-win.offsetWidth + 80, Math.min(nx, window.innerWidth - 80));
    ny = Math.max(0, Math.min(ny, window.innerHeight - 40));
    if (!rafId) rafId = requestAnimationFrame(() => { win.style.left = nx + 'px'; win.style.top = ny + 'px'; rafId = null; });
  };
  const end = () => {
    dragging = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    win.style.left = nx + 'px'; win.style.top = ny + 'px';
    win.classList.remove('dragging');
    document.removeEventListener('mousemove', move);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchend', end);
  };
  handle.addEventListener('mousedown', start);
  handle.addEventListener('touchstart', start, { passive: false });
}

function makeSwipeGestures(win, handle, id) {
  if (!mob) return;
  let startX = 0, startY = 0, startTime = 0, tracking = false;
  handle.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    startX = t.clientX; startY = t.clientY; startTime = Date.now(); tracking = true;
  }, { passive: true });
  handle.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX, dy = t.clientY - startY;
    const dt = Date.now() - startTime;
    const absX = Math.abs(dx), absY = Math.abs(dy);
    if (dt > 500 || (absX < 40 && absY < 40)) return;
    if (absY > absX) { if (dy > 60) minimizeWindow(id); else if (dy < -60) toggleMaximize(id); }
    else if (absX > 120) closeWindow(id);
  }, { passive: true });
}

function makeResizable(win, handle) {
  let sx, sy, ow, oh, resizing = false, rafId = null, nw = 0, nh = 0;
  const start = (e) => {
    if (win.classList.contains('maximized')) return;
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX; sy = p.clientY; ow = win.offsetWidth; oh = win.offsetHeight;
    resizing = true; win.classList.add('resizing');
    document.addEventListener('mousemove', move, { passive: false });
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('mouseup', end);
    document.addEventListener('touchend', end);
  };
  const move = (e) => {
    if (!resizing) return;
    if (e.cancelable) e.preventDefault();
    const p = e.touches ? e.touches[0] : e;
    nw = Math.max(280, ow + (p.clientX - sx));
    nh = Math.max(180, oh + (p.clientY - sy));
    if (!rafId) rafId = requestAnimationFrame(() => { win.style.width = nw + 'px'; win.style.height = nh + 'px'; rafId = null; });
  };
  const end = () => {
    resizing = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    win.style.width = nw + 'px'; win.style.height = nh + 'px';
    win.classList.remove('resizing');
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
  r.style.left = x + 'px'; r.style.top = y + 'px';
  r.style.width = '20px'; r.style.height = '20px';
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
function effectConfetti(count = 40) {
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
function effectIntrusion() {
  document.body.classList.add('intrusion');
  setTimeout(() => document.body.classList.remove('intrusion'), 1100);
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
async function animateProgress(body, label = 'Procesando', duration = 2000, onComplete = null) {
  const container = document.createElement('div');
  container.className = 'out progress-container';
  container.innerHTML = `
    <span class="dim" style="min-width:140px">${escapeHTML(label)}</span>
    <div class="progress-bar"><div class="progress-fill"></div></div>
    <span class="accent" style="min-width:50px;text-align:right">0%</span>
  `;
  body.appendChild(container);
  moveInputToEnd(body);
  const fill = container.querySelector('.progress-fill');
  const pctLabel = container.querySelector('.accent');
  const startTime = performance.now();
  while (true) {
    const elapsed = performance.now() - startTime;
    const pct = Math.min(elapsed / duration, 1);
    fill.style.width = (pct * 100).toFixed(1) + '%';
    pctLabel.textContent = Math.round(pct * 100) + '%';
    if (pct >= 1) break;
    if (Math.random() > .7) playTick(500 + Math.random() * 400);
    await sleep(40);
  }
  if (onComplete) onComplete();
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

/* ✅ FIX: mover el input al fondo siempre */
function moveInputToEnd(body) {
  if (typeof currentInputLineRef !== 'undefined' && currentInputLineRef && currentInputLineRef.parentNode === body) {
    const inputEl = currentInputLineRef.querySelector('.ki');
    const hadFocus = inputEl && document.activeElement === inputEl;
    body.appendChild(currentInputLineRef);
    if (hadFocus && inputEl) {
      setTimeout(() => { try { inputEl.focus({ preventScroll: true }); } catch (e) {} }, 0);
    }
  }
  body.scrollTop = body.scrollHeight;
}

function printLine(body, text, cls = '') {
  const line = document.createElement('div');
  line.className = 'out ' + cls;
  line.innerHTML = text;
  body.appendChild(line);
  moveInputToEnd(body);
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
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const m = [];
  for (let i = 0; i <= b.length; i++) m[i] = [i];
  for (let j = 0; j <= a.length; j++) m[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) m[i][j] = m[i - 1][j - 1];
      else m[i][j] = Math.min(m[i - 1][j - 1] + 1, m[i][j - 1] + 1, m[i - 1][j] + 1);
    }
  }
  return m[b.length][a.length];
}

/* ============================================================
   PKG — Instalar / Eliminar
   ============================================================ */
async function installPackage(name, body) {
  const pkg = PACKAGES[name];
  if (!pkg) {
    printLine(body, `x Paquete no encontrado: <span class="warn">${escapeHTML(name)}</span>`, 'err');
    printLine(body, '');
    const names = Object.keys(PACKAGES);
    const suggestions = [];
    for (const n of names) {
      const dist = levenshtein(name.toLowerCase(), n.toLowerCase());
      if (dist <= 3 || n.includes(name) || name.includes(n)) suggestions.push({ name: n, dist });
    }
    suggestions.sort((a, b) => a.dist - b.dist);
    if (suggestions.length > 0) {
      printLine(body, '  ¿Quisiste decir?', 'info');
      suggestions.slice(0, 3).forEach(s => {
        const p = PACKAGES[s.name];
        printLine(body, `    <span class="ok">pkg install ${s.name}</span>  <span class="dim">— ${escapeHTML(p.desc)}</span>`);
      });
    } else {
      printLine(body, '  Paquetes disponibles:', 'dim');
      names.forEach(n => printLine(body, `    · <span class="ok">${n}</span>`, 'dim'));
    }
    printLine(body, '');
    printLine(body, '  Usa <span class="ok">pkg list</span> para ver todos los paquetes.', 'dim');
    printLine(body, '');
    playError();
    effectGlitchSlice();
    return false;
  }
  if (installedPackages.includes(name)) {
    printLine(body, `[!] "${name}" ya está instalado.`, 'warn');
    printLine(body, `    Versión: v${pkg.version}`, 'dim');
    return false;
  }
  for (const dep of pkg.deps) {
    if (!installedPackages.includes(dep)) {
      printLine(body, `[!] Requiere dependencia: "${dep}"`, 'warn');
      await sleep(300);
      await installPackage(dep, body);
    }
  }
  printLine(body, '');
  printLine(body, `:: Instalando paquete "${name}"...`, 'accent');
  printLine(body, `   ${pkg.icon} ${pkg.desc}`, 'dim');
  printLine(body, `   v${pkg.version} · ${pkg.size}`, 'dim');
  printLine(body, '');
  await sleep(200);

  const log = document.createElement('div');
  log.className = 'pkg-install-log';
  log.innerHTML = `
    <div class="step" data-step="1">Resolviendo dependencias...</div>
    <div class="step" data-step="2">Descargando paquete...</div>
    <div class="step" data-step="3">Verificando checksum SHA-256...</div>
    <div class="step" data-step="4">Extrayendo archivos...</div>
    <div class="step" data-step="5">Registrando comandos...</div>
    <div class="step" data-step="6">Actualizando índices...</div>
  `;
  body.appendChild(log);
  moveInputToEnd(body);

  const steps = log.querySelectorAll('.step');
  for (let i = 0; i < steps.length; i++) {
    await sleep(240 + Math.random() * 180);
    steps[i].classList.add('done');
    playTick(500 + i * 80);
    body.scrollTop = body.scrollHeight;
  }
  await sleep(120);
  const duration = 1400 + Math.random() * 800;
  await animateProgress(body, `Descargando ${name}`, duration);

  installedPackages.push(name);
  savePackages();
  userStats.packagesInstalled = installedPackages.length;
  saveStats();
  effectFlash('rgba(61,220,132,.25)');
  printLine(body, '');
  printLine(body, `[OK] Paquete "${name}" instalado correctamente.`, 'ok glow-pulse');
  printLine(body, `     Comandos: <span class="info">${pkg.commands.join(', ')}</span>`, '');
  printLine(body, '');
  playSuccess();
  effectConfetti(30);
  haptic([50, 30, 50, 30, 100]);
  unlockAch('first_pkg', 'Instalador');
  if (installedPackages.length >= 5) unlockAch('pkg_master', 'Package Master');
  if (installedPackages.length === Object.keys(PACKAGES).length) unlockAch('all_pkgs', 'Completo');
  return true;
}

function removePackage(name, body) {
  const pkg = PACKAGES[name];
  if (!pkg) { printLine(body, `x Paquete no encontrado: ${escapeHTML(name)}`, 'err'); return; }
  if (!installedPackages.includes(name)) { printLine(body, `[!] "${name}" no está instalado.`, 'warn'); return; }
  const dependents = Object.values(PACKAGES).filter(p => installedPackages.includes(p.name) && p.deps.includes(name) && p.name !== name);
  if (dependents.length > 0) {
    printLine(body, `x No se puede desinstalar "${name}"`, 'err');
    printLine(body, `  Paquetes que dependen: <span class="warn">${dependents.map(p => p.name).join(', ')}</span>`, 'dim');
    printLine(body, `  Desinstálalos primero.`, 'dim');
    playError();
    effectGlitchSlice();
    return;
  }
  installedPackages = installedPackages.filter(n => n !== name);
  savePackages();
  userStats.packagesInstalled = installedPackages.length;
  saveStats();
  playWhoosh();
  printLine(body, `[OK] Paquete "${name}" eliminado.`, 'ok');
  printLine(body, `     Comandos deshabilitados: <span class="dim">${pkg.commands.join(', ')}</span>`, 'dim');
}

/* ACHIEVEMENTS LIST */
const ACHIEVEMENTS_LIST = {
  first_fetch:'El ojo te vio', first_unlock:'Primer desbloqueo', hacker:'Hacker',
  scanner:'Escaneo completo', tracer:'Rastreador', pinger:'Ping Master',
  nmap:'Puertos Abiertos', curler:'HTTP Client', decryptor:'Descifrador',
  cow:'Vaca filósofa', fortune:'Sabio', themer:'Estilista', rainbow:'Arcoíris',
  confetti:'Fiestero', void:'Multi-terminal', glitch:'Glitch Master',
  quake:'Terremoto', konami:'Código Konami', sudo_fail:'Intento de sudo',
  ascii_artist:'ASCII Artist', notes_master:'Escritor', note_collector:'Coleccionista',
  gambler:'Apostador', rich:'Millonario', poor:'En bancarrota',
  cryptographer:'Criptógrafo', gamer:'Gamer', winner:'Ganador', loser:'Mala suerte',
  explorer:'Explorador', all_links:'Coleccionista de links',
  night_owl:'Búho nocturno', early_bird:'Madrugador', combo_king:'Combo King',
  perfectionist:'Perfeccionista', hacker_elite:'Hacker Élite',
  philosopher:'Filósofo', mathematician:'Matemático',
  first_pkg:'Instalador', pkg_master:'Package Master', all_pkgs:'Completo'
};

/* ============================================================
   BRUTEFORCE con 60/40
   ============================================================ */
function launchBruteforce(win, linkKey) {
  const link = LINKS_DB[linkKey];
  if (!link) return;
  const body = win.body;

  const willSucceed = Math.random() < 0.40;
  const failAt = 0.25 + Math.random() * 0.55;

  printLine(body, '');
  printLine(body, `:: INICIANDO PROTOCOLO DE FUERZA BRUTA sobre ${escapeHTML(link.name)}`, 'accent');
  printLine(body, `:: Objetivo: ${escapeHTML(link.url)}`, 'dim');
  printLine(body, `:: Tiempo estimado: ~15s`, 'dim');
  printLine(body, `:: Probabilidad de éxito: <span class="warn">40%</span>`, 'dim');
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
      <span>ETA: <span class="stat-val" id="brute-eta-${linkKey}">15s</span></span>
    </div>
    <div class="brute-terminal" id="brute-term-${linkKey}"></div>
  `;
  body.appendChild(panel);
  moveInputToEnd(body);

  const displayEl = panel.querySelector(`#brute-display-${linkKey}`);
  const barEl = panel.querySelector(`#brute-bar-${linkKey}`);
  const attEl = panel.querySelector(`#brute-attempts-${linkKey}`);
  const speedEl = panel.querySelector(`#brute-speed-${linkKey}`);
  const etaEl = panel.querySelector(`#brute-eta-${linkKey}`);
  const termEl = panel.querySelector(`#brute-term-${linkKey}`);
  const hashEl = panel.querySelector(`#brute-hash-${linkKey}`);

  const TOTAL_TIME = 15000;
  const startTime = performance.now();
  let attempts = 0, running = true, finished = false;

  const termPhrases = [
    '[+] Estableciendo conexion con el objetivo...', '[+] Evadiendo firewall perimetral...',
    '[+] Inyectando payload en el handshake...', '[+] Analizando entropia del token...',
    '[+] Correlacionando patrones debiles...', '[+] Fuerza bruta paralela iniciada (64 hilos)...',
    '[!] Bloqueo temporal detectado, rotando proxy...', '[+] Consultando rainbow tables...',
    '[!] Reduciendo espacio de busqueda...', '[+] Atacando vector secundario...',
    '[+] Cruzando datos con leaks conocidos...', '[!] Detectada defensa por rate-limiting...',
    '[+] Ajustando heuristica de fuerza bruta...'
  ];
  const failPhrases = [
    '[!] Servidor rechazando conexiones...', '[!] Objetivo bloqueando la IP...',
    '[!] Detectado honeypot en el objetivo...', '[!] Timeout en el handshake...',
    '[!] Certificado TLS cambiado de repente...', '[!] Posible contramedida activa...'
  ];

  const termInterval = setInterval(() => {
    if (!running || finished) return;
    const curProg = (performance.now() - startTime) / TOTAL_TIME;
    const useFailPhrases = !willSucceed && curProg > failAt - 0.15;
    const phrases = useFailPhrases ? failPhrases : termPhrases;
    if (Math.random() > (useFailPhrases ? 0.25 : 0.5)) {
      const line = document.createElement('div');
      line.textContent = `[${new Date().toLocaleTimeString()}] ${randomFrom(phrases)}`;
      if (useFailPhrases) line.style.color = '#ff453a';
      termEl.appendChild(line);
      termEl.scrollTop = termEl.scrollHeight;
      if (termEl.children.length > 30) termEl.removeChild(termEl.firstChild);
    }
  }, 700);

  function addAttemptLines() {
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
  }

  function tick() {
    if (!running || finished) return;
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / TOTAL_TIME, 1);
    const remaining = Math.max(0, TOTAL_TIME - elapsed);
    if (Math.random() > progress * 0.4) {
      addAttemptLines();
      attempts += Math.floor(Math.random() * 800) + 200;
    }
    const speed = Math.floor(Math.random() * 50000) + 20000;
    attEl.textContent = attempts.toLocaleString();
    speedEl.textContent = speed.toLocaleString();
    barEl.style.width = (progress * 100).toFixed(1) + '%';
    etaEl.textContent = Math.ceil(remaining / 1000) + 's';
    hashEl.textContent = randomHex(32);
    if (!willSucceed && progress > failAt - 0.1 && progress < failAt) {
      barEl.style.background = 'linear-gradient(90deg, #ff453a, #ff8a00)';
      barEl.style.boxShadow = '0 0 20px #ff453a';
    }
    if (Math.random() > .7) playTick(600 + Math.random() * 400);
    if (!willSucceed && progress >= failAt) { finishFailure(); return; }
    if (progress >= 1) { finishSuccess(); return; }
    setTimeout(tick, progress > 0.85 ? 80 : 180);
  }

  function finishSuccess() {
    finished = true; running = false; clearInterval(termInterval);
    barEl.style.width = '100%'; etaEl.textContent = '0s';
    barEl.style.background = 'linear-gradient(90deg, #3ddc84, #5eaaff)';
    barEl.style.boxShadow = '0 0 20px #3ddc84';
    const l1 = document.createElement('div');
    l1.className = 'brute-line';
    l1.innerHTML = `<span class="success">[+] >>> MATCH ENCONTRADO <<<</span>`;
    displayEl.appendChild(l1);
    const l2 = document.createElement('div');
    l2.className = 'brute-line';
    l2.innerHTML = `<span class="success">[+] TOKEN VALIDADO: ${escapeHTML(link.token)}</span>`;
    displayEl.appendChild(l2);
    displayEl.scrollTop = displayEl.scrollHeight;
    effectFlash('rgba(61,220,132,.45)');
    playSuccess();
    haptic([50, 30, 50, 30, 100]);
    userStats.bruteSuccess = (userStats.bruteSuccess || 0) + 1;
    saveStats();
    setTimeout(() => showUnlockResult(win, linkKey), 900);
  }

  function finishFailure() {
    finished = true; running = false; clearInterval(termInterval);
    barEl.style.transition = 'all .3s ease';
    barEl.style.background = '#ff453a';
    barEl.style.boxShadow = '0 0 30px #ff453a, 0 0 60px #ff453a80';
    etaEl.textContent = 'FAIL';
    etaEl.style.color = '#ff453a';
    etaEl.style.fontWeight = '700';
    const l1 = document.createElement('div');
    l1.className = 'brute-line';
    l1.style.animation = 'outShake .4s cubic-bezier(.36,.07,.19,.97)';
    l1.innerHTML = `<span style="color:#ff453a;font-weight:700">[x] CONEXION PERDIDA — OBJETIVO BLOQUEADO</span>`;
    displayEl.appendChild(l1);
    const l2 = document.createElement('div');
    l2.className = 'brute-line';
    l2.innerHTML = `<span style="color:#ff453a">[x] Intento abortado tras ${attempts.toLocaleString()} combinaciones</span>`;
    displayEl.appendChild(l2);
    const l3 = document.createElement('div');
    l3.className = 'brute-line';
    l3.innerHTML = `<span style="color:#666">[!] Vuelve a intentarlo — puede que tengas suerte.</span>`;
    displayEl.appendChild(l3);
    displayEl.scrollTop = displayEl.scrollHeight;
    const termLine = document.createElement('div');
    termLine.style.color = '#ff453a';
    termLine.textContent = `[${new Date().toLocaleTimeString()}] [x] Brute-force fallido — firewall endurecido.`;
    termEl.appendChild(termLine);
    termEl.scrollTop = termEl.scrollHeight;
    effectFlash('rgba(255,69,58,.5)');
    effectQuake();
    effectGlitchSlice();
    playError();
    haptic([100, 50, 100, 50, 200]);
    panel.querySelector('.brute-header').innerHTML = `<span class="lock" style="color:#ff453a">[FAIL]</span> BRUTEFORCE ABORTADO - TARGET: ${escapeHTML(link.name)}`;
    panel.querySelector('.brute-header').style.color = '#ff453a';
    panel.querySelector('.brute-header').style.borderBottomColor = '#ff453a40';
    userStats.bruteFail = (userStats.bruteFail || 0) + 1;
    saveStats();
    setTimeout(() => {
      printLine(body, '');
      printLine(body, `x BRUTEFORCE FALLIDO`, 'err');
      printLine(body, `  El objetivo ha bloqueado la conexión.`, 'dim');
      printLine(body, `  Vuelve a intentarlo con: <span class="ok">hack ${linkKey}</span>`, 'info');
      printLine(body, '');
      printLine(body, `  [i] Probabilidad de éxito: <span class="warn">40%</span> · Intento actual: <span class="err">fallido</span>`, 'dim');
      printLine(body, '');
    }, 1200);
  }

  tick();
  body._bruteforce = body._bruteforce || {};
  body._bruteforce[linkKey] = { stop: () => { running = false; finished = true; clearInterval(termInterval); } };
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
  userStats.linksUnlocked = Object.keys(unlockedLinks).length;
  saveStats();
  playSuccess();
  effectConfetti(40);
  effectFlash('rgba(61,220,132,.3)');
  haptic([30, 40, 30, 40, 60]);
  unlockAch('first_unlock', 'Primer desbloqueo');
  if (Object.keys(unlockedLinks).length === Object.keys(LINKS_DB).length) unlockAch('all_links', 'Coleccionista de links');
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
  moveInputToEnd(body);

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

// ⚠️ Continúa en la PARTE 2
/* ============================================================
   VOID SYSTEMS v9.1 — Terminal / OS Simulator
   main.js — PARTE 2 de 2
   Author: MuncixOp
   ============================================================ */

/* ============================================================
   GLOBAL REFS (usadas por moveInputToEnd de la Parte 1)
   ============================================================ */
var currentInputLineRef = null;
var currentWindowRef = null;
var inputLocked = false;

/* ============================================================
   COMBO COUNTER
   ============================================================ */
let comboCount = 0;
let comboTimer = null;
function bumpCombo() {
  comboCount++;
  const el = document.getElementById('combo-counter') || (() => {
    const d = document.createElement('div');
    d.id = 'combo-counter';
    d.className = 'combo-counter';
    document.body.appendChild(d);
    return d;
  })();
  el.textContent = 'x' + comboCount + ' COMBO';
  el.classList.add('on');
  el.classList.remove('big');
  void el.offsetWidth;
  el.classList.add('big');
  clearTimeout(comboTimer);
  comboTimer = setTimeout(() => {
    el.classList.remove('on');
    if (comboCount >= 10) unlockAch('combo_king', 'Combo King');
    comboCount = 0;
  }, 4000);
}

/* ============================================================
   THEMES
   ============================================================ */
const THEMES = ['default', 'red', 'blue', 'purple', 'amber', 'cyan', 'pink', 'mono', 'rainbow'];
function setTheme(name) {
  THEMES.forEach(t => {
    if (t !== 'default') document.body.classList.remove('theme-' + t);
  });
  if (name && name !== 'default') document.body.classList.add('theme-' + name);
}

/* ============================================================
   BANNER / EYE
   ============================================================ */
function printBanner(body) {
  printLine(body, '');
  printLine(body, '  ██╗   ██╗ ██████╗ ██╗██████╗ ', 'accent');
  printLine(body, '  ██║   ██║██╔═══██╗██║██╔══██╗', 'accent');
  printLine(body, '  ██║   ██║██║   ██║██║██║  ██║', 'accent');
  printLine(body, '  ╚██╗ ██╔╝██║   ██║██║██║  ██║', 'accent');
  printLine(body, '   ╚████╔╝ ╚██████╔╝██║██████╔╝', 'accent');
  printLine(body, '    ╚═══╝   ╚═════╝ ╚═╝╚═════╝ ', 'accent');
  printLine(body, '        S Y S T E M S   v 9 . 1', 'dim');
  printLine(body, '');
}

function printEye(body) {
  const eye = getEye();
  eye.forEach(line => printLine(body, line, 'eye'));
  printLine(body, '');
}

/* ============================================================
   WAKE-UP ANIMATION (Boot)
   ============================================================ */
const BOOT_LINES = [
  ['[ OK ] Inicializando VOID SYSTEMS v9.1...', 'ok'],
  ['[ OK ] Cargando kernel 6.9.0-void', 'dim'],
  ['[ OK ] Montando /dev/matrix', 'dim'],
  ['[ OK ] Enlazando modulo de audio', 'dim'],
  ['[ OK ] Iniciando gestor de ventanas', 'dim'],
  ['[ OK ] Cargando paquetes instalados', 'dim'],
  ['[ OK ] Restaurando historial de comandos', 'dim'],
  ['[ OK ] Restaurando logros', 'dim'],
  ['[ OK ] Sistema listo.', 'ok'],
];

async function bootSequence(body) {
  playBoot();
  for (const [text, cls] of BOOT_LINES) {
    printLine(body, text, cls);
    playTick(500 + Math.random() * 400);
    await sleep(90 + Math.random() * 70);
  }
  printLine(body, '');
  await sleep(200);
  printBanner(body);
  printEye(body);
  printLine(body, '  Bienvenido a VOID SYSTEMS.', 'info');
  printLine(body, '  Escribe <span class="ok">help</span> para ver los comandos disponibles.', 'dim');
  printLine(body, '  Pista: <span class="warn">hack curseforge</span> para desbloquear el primer enlace.', 'dim');
  printLine(body, '');
  playSuccess();
}

/* ============================================================
   COMMANDS — Diccionario principal
   ============================================================ */
const COMMANDS = {};

/* ---------- CORE ---------- */
COMMANDS.help = {
  desc: 'Lista de comandos disponibles',
  fn: async (args, body) => {
    printLine(body, '');
    printLine(body, '  COMANDOS DISPONIBLES', 'h1');
    printLine(body, '  ────────────────────────────────', 'dim');

    const groups = {
      'Sistema': ['help', 'clear', 'about', 'stats', 'achievements', 'fastfetch', 'whoami', 'date', 'history', 'theme', 'cyberpunk', 'sound', 'matrix'],
      'Portfolio': ['projects', 'skills', 'social', 'links', 'banner'],
      'Desbloqueo': ['hack', 'decrypt'],
      'Notas': ['notes'],
      'Paquetes': ['pkg'],
      'Efectos': ['confetti', 'glitch', 'hypnotize', 'flash', 'quake', 'rainbow', 'scramble', 'spinner', 'countdown'],
    };

    for (const [group, cmds] of Object.entries(groups)) {
      printLine(body, `  ${group}`, 'accent');
      cmds.forEach(c => {
        const pkg = findPackageForCommand(c);
        const locked = pkg && !installedPackages.includes(pkg.name);
        const name = locked ? `<span class="dim">${c}</span>` : `<span class="ok">${c}</span>`;
        const desc = locked ? `— [paquete ${pkg.name}]` : (COMMANDS[c]?.desc || '');
        printLine(body, `    ${padEnd(name, 40)} <span class="dim">${desc}</span>`);
      });
      printLine(body, '');
    }
    printLine(body, '  Usa <span class="ok">pkg list</span> para ver todos los paquetes.', 'dim');
    printLine(body, '');
  }
};

COMMANDS.clear = {
  desc: 'Limpia la pantalla',
  fn: async (args, body) => {
    body.querySelectorAll('.out').forEach(el => el.remove());
  }
};

COMMANDS.about = {
  desc: 'Sobre MuncixOp y el proyecto',
  fn: async (args, body) => {
    printLine(body, '');
    printLine(body, '  SOBRE VOID SYSTEMS', 'h1');
    printLine(body, '  ────────────────────────────────', 'dim');
    printLine(body, '  Un simulador de terminal/OS en el navegador.', '');
    printLine(body, '  Hecho por <span class="ok">MuncixOp</span> — Creative Developer & UI Engineer.', '');
    printLine(body, '  Sin frameworks. Sin dependencias. Solo HTML, CSS y JS.', 'dim');
    printLine(body, '');
    printLine(body, '  Stack:', 'accent');
    printLine(body, '    · HTML5 + CSS3 (grid, animaciones, custom properties)', 'dim');
    printLine(body, '    · JavaScript vanilla (Web Audio API, Canvas 2D, localStorage)', 'dim');
    printLine(body, '    · 0 dependencias externas', 'dim');
    printLine(body, '');
    printLine(body, '  Inspirado en terminales Unix, CRT de los 80 y cyberpunk.', 'dim');
    printLine(body, '');
    playBeep(660, .08);
  }
};

COMMANDS.whoami = {
  desc: 'Muestra el usuario actual',
  fn: async (args, body) => printLine(body, '  muncixop', 'ok')
};

COMMANDS.date = {
  desc: 'Fecha y hora actual',
  fn: async (args, body) => printLine(body, '  ' + new Date().toString(), 'info')
};

COMMANDS.banner = {
  desc: 'Muestra el banner de VOID',
  fn: async (args, body) => { printBanner(body); printEye(body); }
};

COMMANDS.echo = {
  desc: 'Imprime texto',
  fn: async (args, body) => printLine(body, '  ' + escapeHTML(args.join(' ')))
};

COMMANDS.sudo = {
  desc: 'Intenta elevar privilegios',
  fn: async (args, body) => {
    unlockAch('sudo_fail', 'Intento de sudo');
    playError();
    effectGlitchSlice();
    printLine(body, '  [sudo] contraseña para muncixop:', 'warn');
    await sleep(600);
    printLine(body, '  Lo siento, muncixop no esta en el archivo sudoers.', 'err');
    printLine(body, '  Este incidente sera reportado.', 'err');
    printLine(body, '');
  }
};

COMMANDS.history = {
  desc: 'Historial de comandos',
  fn: async (args, body) => {
    printLine(body, '');
    printLine(body, '  HISTORIAL', 'h1');
    cmdHistory.slice(-20).forEach((c, i) => {
      printLine(body, `    ${padStart(String(cmdHistory.length - 20 + i + 1), 4)}  ${escapeHTML(c)}`, 'dim');
    });
    printLine(body, '');
  }
};

COMMANDS.stats = {
  desc: 'Estadísticas de uso',
  fn: async (args, body) => {
    const session = Math.floor((Date.now() - userStats.sessionStart) / 1000);
    const mins = Math.floor(session / 60);
    const secs = session % 60;
    printLine(body, '');
    printLine(body, '  ESTADISTICAS', 'h1');
    printLine(body, '  ────────────────────────────────', 'dim');
    printLine(body, `  Comandos usados     <span class="ok">${userStats.commandsUsed}</span>`);
    printLine(body, `  Comandos unicos     <span class="ok">${userStats.uniqueCommands.length}</span>`);
    printLine(body, `  Sesion actual       <span class="info">${mins}m ${secs}s</span>`);
    printLine(body, `  Juegos ganados      <span class="ok">${userStats.gamesWon}</span>`);
    printLine(body, `  Juegos perdidos     <span class="err">${userStats.gamesLost}</span>`);
    printLine(body, `  Apuestas ganadas    <span class="ok">${userStats.gamblesWon}</span>`);
    printLine(body, `  Apuestas perdidas   <span class="err">${userStats.gamblesLost}</span>`);
    printLine(body, `  Links desbloqueados <span class="info">${Object.keys(unlockedLinks).length}/${Object.keys(LINKS_DB).length}</span>`);
    printLine(body, `  Notas creadas       <span class="info">${userNotes.length}</span>`);
    printLine(body, `  Paquetes instalados <span class="ok">${installedPackages.length}/${Object.keys(PACKAGES).length}</span>`);
    printLine(body, `  Brute-force OK/FAIL <span class="ok">${userStats.bruteSuccess}</span> / <span class="err">${userStats.bruteFail}</span>`);
    printLine(body, `  Balance             <span class="warn">$${userBalance}</span>`);
    printLine(body, `  Ultimo comando      <span class="dim">${escapeHTML(userStats.lastCommand || '—')}</span>`);
    printLine(body, '');
  }
};

COMMANDS.achievements = {
  desc: 'Lista de logros',
  fn: async (args, body) => {
    const total = Object.keys(ACHIEVEMENTS_LIST).length;
    const got = Object.keys(achievements).length;
    printLine(body, '');
    printLine(body, `  LOGROS  <span class="ok">${got}</span>/<span class="dim">${total}</span>`, 'h1');
    printLine(body, '  ────────────────────────────────', 'dim');
    for (const [key, name] of Object.entries(ACHIEVEMENTS_LIST)) {
      if (achievements[key]) {
        const date = new Date(achievements[key].at).toLocaleDateString();
        printLine(body, `  <span class="ok">[✓]</span> ${padEnd(escapeHTML(name), 28)} <span class="dim">${date}</span>`);
      } else {
        printLine(body, `  <span class="dim">[ ] ${escapeHTML(name)}</span>`);
      }
    }
    printLine(body, '');
  }
};

COMMANDS.fastfetch = {
  desc: 'Info del sistema al estilo neofetch',
  fn: async (args, body) => {
    unlockAch('first_fetch', 'El ojo te vio');
    const eye = getEye();
    const info = [
      ['OS', 'VOID SYSTEMS v9.1'],
      ['Host', 'MuncixOp Creative Suite'],
      ['Kernel', '6.9.0-void'],
      ['Shell', 'voidsh 9.1'],
      ['WM', 'VoidWM'],
      ['Terminal', 'void-term'],
      ['CPU', 'Void Core @ ' + (2 + Math.random() * 4).toFixed(1) + 'GHz'],
      ['GPU', 'WebGL Renderer'],
      ['Memory', (Math.random() * 500 + 200).toFixed(0) + ' MB / 4096 MB'],
      ['Uptime', Math.floor((Date.now() - userStats.sessionStart) / 60000) + ' min'],
      ['Packages', installedPackages.length + ' (pkg)'],
      ['Theme', THEMES.find(t => t !== 'default' && document.body.classList.contains('theme-' + t)) || 'default'],
      ['Resolution', window.innerWidth + 'x' + window.innerHeight],
      ['Locale', navigator.language],
    ];
    printLine(body, '');
    const maxRows = Math.max(eye.length, info.length);
    for (let i = 0; i < maxRows; i++) {
      const eyeLine = (eye[i] || '').padEnd(34, ' ');
      const infoLine = info[i] ? `<span class="accent">${padEnd(info[i][0], 12)}</span><span class="dim">·</span> ${escapeHTML(info[i][1])}` : '';
      printLine(body, `<span class="ok">${eyeLine}</span>  ${infoLine}`);
    }
    printLine(body, '');
    playSuccess();
    effectFlash('rgba(61,220,132,.15)');
  }
};

COMMANDS.theme = {
  desc: 'Cambia el tema (red/blue/purple/amber/cyan/pink/mono/rainbow/default)',
  fn: async (args, body) => {
    const name = (args[0] || '').toLowerCase();
    if (!name) {
      printLine(body, '  Temas: ' + THEMES.join(', '), 'dim');
      printLine(body, '  Uso: <span class="ok">theme red</span>', 'dim');
      return;
    }
    if (!THEMES.includes(name)) {
      printLine(body, `  Tema desconocido: ${escapeHTML(name)}`, 'err');
      return;
    }
    setTheme(name);
    unlockAch('themer', 'Estilista');
    playPowerUp();
    effectFlash('rgba(61,220,132,.15)');
    printLine(body, `  Tema aplicado: <span class="ok">${name}</span>`, 'ok');
  }
};

COMMANDS.cyberpunk = {
  desc: 'Activa/desactiva modo cyberpunk',
  fn: async (args, body) => {
    const on = document.body.classList.toggle('cyberpunk');
    playWhoosh();
    effectGlitchSlice();
    printLine(body, on ? '  ⚡ CYBERPUNK MODE: ON' : '  CYBERPUNK MODE: OFF', 'accent');
  }
};

COMMANDS.sound = {
  desc: 'Activa/desactiva sonido',
  fn: async (args, body) => {
    userSettings.audioEnabled = !userSettings.audioEnabled;
    audioEnabled = userSettings.audioEnabled;
    saveSettings();
    printLine(body, userSettings.audioEnabled ? '  Sonido: ON' : '  Sonido: OFF', 'info');
    if (userSettings.audioEnabled) playBeep(880, .1);
  }
};

COMMANDS.matrix = {
  desc: 'Activa/desactiva la lluvia matrix',
  fn: async (args, body) => {
    userSettings.matrixActive = !userSettings.matrixActive;
    matrixActive = userSettings.matrixActive;
    saveSettings();
    printLine(body, userSettings.matrixActive ? '  Matrix: ON' : '  Matrix: OFF', 'info');
  }
};

COMMANDS.eyes = {
  desc: 'Hace parpadear los ojos en pantalla',
  fn: async (args, body) => blinkEye(body)
};

/* ---------- PORTFOLIO ---------- */
COMMANDS.projects = {
  desc: 'Proyectos destacados',
  fn: async (args, body) => {
    printLine(body, '');
    printLine(body, '  PROYECTOS', 'h1');
    printLine(body, '  ────────────────────────────────', 'dim');
    const projects = [
      ['VOID SYSTEMS', 'Simulador de terminal/OS en el navegador', 'JS, Canvas, Web Audio'],
      ['CurseForge Mods', 'Mods para Minecraft Java Edition', 'Java, Forge'],
      ['UI Experiments', 'Laboratorio de interfaces creativas', 'HTML, CSS'],
      ['Terminal Portfolio', 'Portfolio personal en formato terminal', 'JS, CSS'],
    ];
    projects.forEach(([name, desc, stack]) => {
      printLine(body, `  <span class="ok">${name}</span>  <span class="dim">— ${desc}</span>`);
      printLine(body, `    <span class="info">${stack}</span>`);
      printLine(body, '');
    });
  }
};

COMMANDS.skills = {
  desc: 'Habilidades técnicas',
  fn: async (args, body) => {
    printLine(body, '');
    printLine(body, '  SKILLS', 'h1');
    printLine(body, '  ────────────────────────────────', 'dim');
    const skills = [
      ['JavaScript', 90], ['HTML/CSS', 95], ['Node.js', 75],
      ['Java', 70], ['Python', 65], ['UI/UX', 85],
      ['WebGL/Canvas', 80], ['Git', 85],
    ];
    for (const [name, pct] of skills) {
      const filled = Math.round(pct / 5);
      const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);
      printLine(body, `  ${padEnd(name, 14)} <span class="ok">${bar}</span> <span class="dim">${pct}%</span>`);
      await sleep(40);
      playTick(600 + pct * 4);
    }
    printLine(body, '');
  }
};

COMMANDS.social = {
  desc: 'Redes sociales',
  fn: async (args, body) => {
    printLine(body, '');
    printLine(body, '  REDES', 'h1');
    printLine(body, '  ────────────────────────────────', 'dim');
    printLine(body, '  Las redes estan protegidas. Desbloquealas con:', 'dim');
    printLine(body, '    <span class="ok">hack curseforge</span>', '');
    printLine(body, '    <span class="ok">hack tiktok</span>', '');
    printLine(body, '    <span class="ok">hack twitter</span>', '');
    printLine(body, '');
    COMMANDS.links.fn([], body);
  }
};

COMMANDS.links = {
  desc: 'Enlaces desbloqueados',
  fn: async (args, body) => {
    printLine(body, '');
    printLine(body, '  ENLACES', 'h1');
    printLine(body, '  ────────────────────────────────', 'dim');
    for (const [key, link] of Object.entries(LINKS_DB)) {
      if (unlockedLinks[key]) {
        printLine(body, `  <span class="ok">[✓]</span> ${link.icon} ${escapeHTML(link.name)}`);
        printLine(body, `      <a href="${escapeHTML(link.url)}" target="_blank" rel="noopener" style="color:var(--accent-2)">${escapeHTML(link.url)}</a>`);
      } else {
        printLine(body, `  <span class="dim">[ ] ${link.icon} ${escapeHTML(link.name)} — bloqueado (hint: ${escapeHTML(link.hint)})</span>`);
      }
    }
    printLine(body, '');
  }
};

/* ---------- HACK ---------- */
COMMANDS.hack = {
  desc: 'Inicia brute-force sobre un link (hack <nombre>)',
  fn: async (args, body, win) => {
    const key = (args[0] || '').toLowerCase();
    if (!key) {
      printLine(body, '  Uso: <span class="ok">hack <nombre></span>', 'dim');
      printLine(body, '  Objetivos: ' + Object.keys(LINKS_DB).join(', '), 'dim');
      return;
    }
    if (!LINKS_DB[key]) {
      printLine(body, `  Objetivo desconocido: ${escapeHTML(key)}`, 'err');
      const names = Object.keys(LINKS_DB);
      const sug = names.map(n => ({ n, d: levenshtein(key, n) })).sort((a, b) => a.d - b.d);
      if (sug[0].d <= 4) printLine(body, `  ¿Quisiste decir? <span class="ok">${sug[0].n}</span>`, 'dim');
      return;
    }
    if (unlockedLinks[key]) {
      printLine(body, `  [i] "${key}" ya esta desbloqueado.`, 'info');
      showUnlockResult(win, key);
      return;
    }
    unlockAch('hacker', 'Hacker');
    launchBruteforce(win, key);
  }
};

COMMANDS.decrypt = {
  desc: 'Descifra un token',
  fn: async (args, body) => {
    const input = args.join(' ');
    if (!input) {
      printLine(body, '  Uso: <span class="ok">decrypt <texto></span>', 'dim');
      return;
    }
    printLine(body, '');
    printLine(body, '  Descifrando...', 'accent');
    const line = document.createElement('div');
    line.className = 'out ok';
    body.appendChild(line);
    moveInputToEnd(body);
    await new Promise(res => scrambleText(line, '  Resultado: ' + input.split('').reverse().join(''), 900) || setTimeout(res, 900));
    printLine(body, '');
    unlockAch('decryptor', 'Descifrador');
    playSuccess();
  }
};

/* ---------- NOTES ---------- */
COMMANDS.notes = {
  desc: 'Gestiona notas (notes [add|del|clear] [texto])',
  fn: async (args, body) => {
    const sub = (args[0] || 'list').toLowerCase();
    if (sub === 'list' || !args.length) {
      printLine(body, '');
      printLine(body, `  NOTAS (${userNotes.length})`, 'h1');
      if (!userNotes.length) printLine(body, '  No hay notas. Usa: <span class="ok">notes add <texto></span>', 'dim');
      userNotes.forEach((n, i) => {
        printLine(body, `  <span class="info">${i + 1}.</span> ${escapeHTML(n.text)}  <span class="dim">${new Date(n.at).toLocaleString()}</span>`, 'note-item');
      });
      printLine(body, '');
      return;
    }
    if (sub === 'add') {
      const text = args.slice(1).join(' ');
      if (!text) { printLine(body, '  Uso: notes add <texto>', 'dim'); return; }
      userNotes.push({ text, at: Date.now() });
      saveNotes();
      userStats.notesCreated++;
      saveStats();
      unlockAch('notes_master', 'Escritor');
      if (userNotes.length >= 10) unlockAch('note_collector', 'Coleccionista');
      printLine(body, `  [OK] Nota agregada: ${escapeHTML(text)}`, 'ok');
      playBeep(880, .08);
      return;
    }
    if (sub === 'del' || sub === 'delete') {
      const idx = parseInt(args[1], 10) - 1;
      if (isNaN(idx) || idx < 0 || idx >= userNotes.length) { printLine(body, '  Indice invalido.', 'err'); return; }
      const removed = userNotes.splice(idx, 1)[0];
      saveNotes();
      printLine(body, `  [OK] Nota eliminada: ${escapeHTML(removed.text)}`, 'ok');
      playWhoosh();
      return;
    }
    if (sub === 'clear') {
      userNotes = [];
      saveNotes();
      printLine(body, '  [OK] Notas eliminadas.', 'ok');
      playWhoosh();
      return;
    }
    printLine(body, '  Subcomandos: list, add, del, clear', 'dim');
  }
};

/* ---------- PKG ---------- */
COMMANDS.pkg = {
  desc: 'Gestor de paquetes (pkg [list|installed|install|remove|info] [nombre])',
  fn: async (args, body) => {
    const sub = (args[0] || 'list').toLowerCase();
    if (sub === 'list') {
      printLine(body, '');
      printLine(body, '  PAQUETES DISPONIBLES', 'h1');
      printLine(body, '  ────────────────────────────────', 'dim');
      Object.values(PACKAGES).forEach(p => {
        const inst = installedPackages.includes(p.name);
        const tag = inst ? '<span class="ok">[✓]</span>' : '<span class="dim">[ ]</span>';
        printLine(body, `  ${tag} ${p.icon} <span class="ok">${padEnd(p.name, 14)}</span> <span class="dim">v${p.version} · ${p.size} · ${p.desc}</span>`);
      });
      printLine(body, '');
      printLine(body, '  Instala con: <span class="ok">pkg install <nombre></span>', 'dim');
      printLine(body, '');
      return;
    }
    if (sub === 'installed') {
      printLine(body, '');
      printLine(body, '  PAQUETES INSTALADOS', 'h1');
      if (!installedPackages.length) printLine(body, '  Ninguno.', 'dim');
      installedPackages.forEach(n => {
        const p = PACKAGES[n];
        printLine(body, `  ${p.icon} <span class="ok">${n}</span> <span class="dim">v${p.version}</span>`);
      });
      printLine(body, '');
      return;
    }
    if (sub === 'install') {
      const name = args[1];
      if (!name) { printLine(body, '  Uso: pkg install <nombre>', 'dim'); return; }
      await installPackage(name, body);
      return;
    }
    if (sub === 'remove' || sub === 'uninstall') {
      const name = args[1];
      if (!name) { printLine(body, '  Uso: pkg remove <nombre>', 'dim'); return; }
      removePackage(name, body);
      return;
    }
    if (sub === 'info') {
      const name = args[1];
      const p = PACKAGES[name];
      if (!p) { printLine(body, `  Paquete no encontrado: ${escapeHTML(name)}`, 'err'); return; }
      printLine(body, '');
      printLine(body, `  ${p.icon} ${p.name}`, 'h1');
      printLine(body, `  ${p.desc}`, 'dim');
      printLine(body, `  Version: <span class="ok">${p.version}</span>`);
      printLine(body, `  Tamano:  <span class="info">${p.size}</span>`);
      printLine(body, `  Estado:  ${installedPackages.includes(name) ? '<span class="ok">instalado</span>' : '<span class="dim">no instalado</span>'}`);
      printLine(body, `  Deps:    ${p.deps.length ? p.deps.join(', ') : '<span class="dim">ninguna</span>'}`);
      printLine(body, `  Comandos: <span class="info">${p.commands.join(', ')}</span>`);
      printLine(body, '');
      return;
    }
    printLine(body, '  Subcomandos: list, installed, install, remove, info', 'dim');
  }
};

/* ---------- GAMES (paquete games) ---------- */
COMMANDS.coin = {
  desc: 'Lanza una moneda',
  fn: async (args, body) => {
    const r = Math.random() < .5 ? 'CARA' : 'CRUZ';
    printLine(body, '  Lanzando...', 'dim');
    await sleep(400);
    printLine(body, `  → <span class="ok">${r}</span>`, 'accent');
    playCoin();
  }
};

COMMANDS.dice = {
  desc: 'Lanza un dado (1-6)',
  fn: async (args, body) => {
    const sides = Math.max(2, Math.min(100, parseInt(args[0], 10) || 6));
    const r = randInt(1, sides);
    printLine(body, '  Rodando d' + sides + '...', 'dim');
    await sleep(300);
    printLine(body, `  → <span class="ok">${r}</span>`, 'accent');
    playBeep(700, .05);
  }
};

COMMANDS.rps = {
  desc: 'Piedra, papel o tijera (rps <piedra|papel|tijera>)',
  fn: async (args, body) => {
    const opts = ['piedra', 'papel', 'tijera'];
    const user = (args[0] || '').toLowerCase();
    if (!opts.includes(user)) { printLine(body, '  Uso: rps <piedra|papel|tijera>', 'dim'); return; }
    const cpu = randomFrom(opts);
    printLine(body, `  Tu:  <span class="info">${user}</span>`, '');
    await sleep(300);
    printLine(body, `  CPU: <span class="warn">${cpu}</span>`, '');
    await sleep(300);
    const wins = { piedra: 'tijera', papel: 'piedra', tijera: 'papel' };
    if (user === cpu) printLine(body, '  → EMPATE', 'accent');
    else if (wins[user] === cpu) { printLine(body, '  → GANASTE', 'ok'); userStats.gamesWon++; saveStats(); playWin(); }
    else { printLine(body, '  → PERDISTE', 'err'); userStats.gamesLost++; saveStats(); playLose(); }
  }
};

COMMANDS.guess = {
  desc: 'Adivina el numero (1-100)',
  fn: async (args, body) => {
    const n = parseInt(args[0], 10);
    if (isNaN(n)) { printLine(body, '  Uso: guess <1-100>', 'dim'); return; }
    if (!body._guess || body._guess.done) {
      body._guess = { target: randInt(1, 100), tries: 0, done: false };
    }
    body._guess.tries++;
    if (n === body._guess.target) {
      printLine(body, `  → <span class="ok">CORRECTO! Era ${n}. Intentos: ${body._guess.tries}</span>`, 'ok');
      userStats.gamesWon++; saveStats();
      playWin(); effectConfetti(20);
      body._guess.done = true;
    } else if (n < body._guess.target) printLine(body, '  → El numero es MAYOR', 'warn');
    else printLine(body, '  → El numero es MENOR', 'warn');
  }
};

COMMANDS['8ball'] = {
  desc: 'Bola magica (8ball <pregunta>)',
  fn: async (args, body) => {
    const q = args.join(' ');
    if (!q) { printLine(body, '  Uso: 8ball <pregunta>', 'dim'); return; }
    const answers = [
      'Si, definitivamente.', 'No lo creo.', 'Pregunta de nuevo.', 'Sin duda.',
      'No cuentes con ello.', 'Las señales apuntan a que si.', 'Muy dudoso.',
      'Concentrate y pregunta.', 'El resultado es incierto.', 'Claro que si.',
    ];
    printLine(body, `  <span class="dim">> ${escapeHTML(q)}</span>`, '');
    await sleep(500);
    printLine(body, `  → <span class="ok">${randomFrom(answers)}</span>`, 'accent');
    playBeep(500, .06);
  }
};

/* ---------- GAMBLING ---------- */
COMMANDS.gamble = {
  desc: 'Apuesta dinero (gamble <monto>)',
  fn: async (args, body) => {
    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount <= 0) { printLine(body, `  Uso: gamble <monto>. Balance: $${userBalance}`, 'dim'); return; }
    if (amount > userBalance) { printLine(body, `  Saldo insuficiente. Balance: $${userBalance}`, 'err'); return; }
    unlockAch('gambler', 'Apostador');
    printLine(body, `  Apostando $${amount}...`, 'dim');
    await sleep(600);
    playTick(500);
    if (Math.random() < 0.45) {
      userBalance += amount;
      userStats.gamblesWon++; saveStats(); saveBalance();
      printLine(body, `  → GANASTE $${amount}. Balance: <span class="ok">$${userBalance}</span>`, 'ok');
      playWin(); effectConfetti(15);
      if (userBalance >= 10000) unlockAch('rich', 'Millonario');
    } else {
      userBalance -= amount;
      userStats.gamblesLost++; saveStats(); saveBalance();
      printLine(body, `  → PERDISTE $${amount}. Balance: <span class="err">$${userBalance}</span>`, 'err');
      playLose();
      if (userBalance <= 0) unlockAch('poor', 'En bancarrota');
    }
  }
};

/* ---------- CRYPTO-UTILS ---------- */
COMMANDS.base64 = {
  desc: 'Codifica/decodifica base64 (base64 [-d] <texto>)',
  fn: async (args, body) => {
    const dec = args[0] === '-d';
    const text = (dec ? args.slice(1) : args).join(' ');
    if (!text) { printLine(body, '  Uso: base64 <texto> | base64 -d <texto>', 'dim'); return; }
    try {
      const out = dec ? atob(text) : btoa(text);
      printLine(body, `  → <span class="ok">${escapeHTML(out)}</span>`, '');
      unlockAch('cryptographer', 'Criptógrafo');
    } catch { printLine(body, '  Error de codificacion.', 'err'); }
  }
};

COMMANDS.rot13 = {
  desc: 'ROT13',
  fn: async (args, body) => {
    const text = args.join(' ');
    const out = text.replace(/[a-zA-Z]/g, c => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
    printLine(body, `  → <span class="ok">${escapeHTML(out)}</span>`, '');
    unlockAch('cryptographer', 'Criptógrafo');
  }
};

COMMANDS.hash = {
  desc: 'Simula un hash',
  fn: async (args, body) => {
    const text = args.join(' ');
    if (!text) { printLine(body, '  Uso: hash <texto>', 'dim'); return; }
    printLine(body, `  SHA-256: <span class="info">${randomHex(64)}</span>`, '');
    printLine(body, `  MD5:     <span class="dim">${randomHex(32)}</span>`, '');
  }
};

COMMANDS.password = {
  desc: 'Genera una contrasena segura',
  fn: async (args, body) => {
    const len = Math.max(8, Math.min(64, parseInt(args[0], 10) || 20));
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*';
    let p = '';
    for (let i = 0; i < len; i++) p += chars[Math.floor(Math.random() * chars.length)];
    printLine(body, `  → <span class="ok">${p}</span>`, '');
    unlockAch('cryptographer', 'Criptógrafo');
  }
};

COMMANDS.uuid = {
  desc: 'Genera un UUID v4',
  fn: async (args, body) => {
    const u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    printLine(body, `  → <span class="ok">${u}</span>`, '');
  }
};

COMMANDS.pick = {
  desc: 'Elige al azar de una lista (pick a b c)',
  fn: async (args, body) => {
    if (!args.length) { printLine(body, '  Uso: pick <a> <b> ...', 'dim'); return; }
    printLine(body, `  → <span class="ok">${escapeHTML(randomFrom(args))}</span>`, '');
  }
};

/* ---------- FUN ---------- */
COMMANDS.quote = {
  desc: 'Frase aleatoria',
  fn: async (args, body) => {
    const quotes = [
      'La simplicidad es la maxima sofisticacion. — Da Vinci',
      'Habla poco, haz mucho.', 'El codigo es poesia.',
      'Primero resuelve el problema. Luego escribe el codigo.',
      'La mejor interfaz es la que no se nota.',
    ];
    printLine(body, `  "${randomFrom(quotes)}"`, 'info');
  }
};

COMMANDS.joke = {
  desc: 'Chiste aleatorio',
  fn: async (args, body) => {
    const jokes = [
      'Hay 10 tipos de personas: las que entienden binario y las que no.',
      'Un byte entra a un bar. El bartender: "¿Que va a tomar?" — "Un bit, por favor."',
      '¿Por que los programadores prefieren el modo oscuro? Porque la luz atrae bugs.',
      '!false — Es gracioso porque es true.',
    ];
    printLine(body, `  ${randomFrom(jokes)}`, '');
    playBeep(600, .05);
  }
};

COMMANDS.fact = {
  desc: 'Dato curioso',
  fn: async (args, body) => {
    const facts = [
      'El primer bug informatico fue una polilla real (1947).',
      'El 90% del codigo de una app es mantenimiento.',
      'La primera programadora fue Ada Lovelace (1843).',
      'El nombre "JavaScript" fue puro marketing.',
      'Un programador promedio escribe ~10 lineas utiles al dia.',
    ];
    printLine(body, `  ${randomFrom(facts)}`, 'info');
  }
};

COMMANDS.meme = {
  desc: 'Meme ASCII aleatorio',
  fn: async (args, body) => {
    const memes = [
      ['(╯°□°)╯︵ ┻━┻', 'table flip'],
      ['┬─┬ノ( º _ ºノ)', 'table unflip'],
      ['(•_•) ( •_•)>⌐■-■ (⌐■_■)', 'deal with it'],
      ['¯\\_(ツ)_/¯', 'shrug'],
      ['( ͡° ͜ʖ ͡°)', 'lenny'],
    ];
    const [art, name] = randomFrom(memes);
    printLine(body, `  ${art}  <span class="dim">${name}</span>`, 'accent');
  }
};

COMMANDS.cowsay = {
  desc: 'Vaca filosofa (cowsay <texto>)',
  fn: async (args, body) => {
    const text = args.join(' ') || 'Muuu';
    const top = ' ' + '_'.repeat(text.length + 2);
    const bot = ' ' + '-'.repeat(text.length + 2);
    printLine(body, top, 'dim');
    printLine(body, `< ${text} >`, '');
    printLine(body, bot, 'dim');
    printLine(body, '        \\   ^__^', 'dim');
    printLine(body, '         \\  (oo)\\_______', 'dim');
    printLine(body, '            (__)\\       )\\/\\', 'dim');
    printLine(body, '                ||----w |', 'dim');
    printLine(body, '                ||     ||', 'dim');
    unlockAch('cow', 'Vaca filósofa');
    playBeep(440, .15);
  }
};

COMMANDS.fortune = {
  desc: 'Fortune cookie',
  fn: async (args, body) => {
    const fortunes = [
      'Tendras un dia productivo si cierras el navegador.',
      'El bug que buscas esta en la linea 42.',
      'Hoy es un buen dia para refactorizar.',
      'No hagas deploy los viernes.',
      'El cafe es tu mejor aliado.',
    ];
    printLine(body, `  🥠 ${randomFrom(fortunes)}`, 'info');
    unlockAch('fortune', 'Sabio');
  }
};

COMMANDS.random = {
  desc: 'Numero aleatorio (random [min] [max])',
  fn: async (args, body) => {
    const min = parseInt(args[0], 10) || 1;
    const max = parseInt(args[1], 10) || 100;
    printLine(body, `  → <span class="ok">${randInt(Math.min(min, max), Math.max(min, max))}</span>`, '');
  }
};

/* ---------- NET-TOOLS ---------- */
COMMANDS.ping = {
  desc: 'Simula ping (ping <host>)',
  fn: async (args, body) => {
    const host = args[0] || 'void.systems';
    unlockAch('pinger', 'Ping Master');
    printLine(body, `  PING ${escapeHTML(host)} (${randInt(1, 255)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}) 56(84) bytes of data.`, 'dim');
    for (let i = 0; i < 4; i++) {
      await sleep(500);
      const t = (Math.random() * 80 + 5).toFixed(1);
      printLine(body, `  64 bytes from ${escapeHTML(host)}: icmp_seq=${i + 1} ttl=${randInt(50, 64)} time=<span class="ok">${t} ms</span>`, '');
      playTick(700);
    }
    await sleep(200);
    printLine(body, `  --- ${escapeHTML(host)} ping statistics ---`, 'dim');
    printLine(body, `  4 packets transmitted, 4 received, 0% packet loss`, 'ok');
    printLine(body, '');
  }
};

COMMANDS.trace = {
  desc: 'Traceroute simulado',
  fn: async (args, body) => {
    const host = args[0] || 'void.systems';
    unlockAch('tracer', 'Rastreador');
    printLine(body, `  traceroute to ${escapeHTML(host)}, 30 hops max`, 'dim');
    for (let i = 1; i <= 8; i++) {
      await sleep(200);
      const ip = `${randInt(1, 223)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`;
      const t = (Math.random() * 50 + i * 5).toFixed(1);
      printLine(body, `  ${padStart(String(i), 2)}  ${ip}  <span class="ok">${t} ms</span>`, '');
      playTick(500 + i * 50);
    }
    printLine(body, '');
  }
};

COMMANDS.nmap = {
  desc: 'Escaneo de puertos simulado',
  fn: async (args, body) => {
    const host = args[0] || 'localhost';
    unlockAch('nmap', 'Puertos Abiertos');
    printLine(body, `  Starting Nmap 7.94 ( https://nmap.org )`, 'dim');
    printLine(body, `  Nmap scan report for ${escapeHTML(host)}`, '');
    await sleep(400);
    printLine(body, '  PORT     STATE  SERVICE', 'accent');
    const ports = [
      [22, 'open', 'ssh'], [80, 'open', 'http'], [443, 'open', 'https'],
      [3000, 'open', 'node'], [5432, 'closed', 'postgres'], [8080, 'open', 'http-alt'],
    ];
    for (const [p, s, svc] of ports) {
      await sleep(150);
      const cls = s === 'open' ? 'ok' : 'dim';
      printLine(body, `  ${padEnd(String(p), 8)} <span class="${cls}">${padEnd(s, 6)}</span> ${svc}`);
      playTick(600);
    }
    printLine(body, '');
    printLine(body, `  Nmap done: 1 IP address (1 host up) scanned`, 'dim');
    printLine(body, '');
  }
};

COMMANDS.whois = {
  desc: 'WHOIS simulado',
  fn: async (args, body) => {
    const host = args[0] || 'void.systems';
    printLine(body, `  Domain Name: ${escapeHTML(host).toUpperCase()}`, '');
    printLine(body, `  Registrar: VOID Registrar Inc.`, 'dim');
    printLine(body, `  Created: ${new Date(Date.now() - 86400000 * 365).toLocaleDateString()}`, 'dim');
    printLine(body, `  Expires: ${new Date(Date.now() + 86400000 * 365).toLocaleDateString()}`, 'dim');
    printLine(body, `  Status: clientTransferProhibited`, 'dim');
    printLine(body, '');
  }
};

COMMANDS.scan = {
  desc: 'Escaneo general simulado',
  fn: async (args, body) => {
    unlockAch('scanner', 'Escaneo completo');
    const target = args[0] || 'red-local';
    printLine(body, `  Escaneando ${escapeHTML(target)}...`, 'accent');
    for (let i = 0; i < 12; i++) {
      await sleep(140);
      const ip = `192.168.1.${randInt(1, 254)}`;
      const status = Math.random() > .3 ? '<span class="ok">UP</span>' : '<span class="dim">DOWN</span>';
      printLine(body, `  ${padEnd(ip, 18)} ${status}  ${randomHex(6)}`, '');
      playTick(600);
    }
    printLine(body, '  Escaneo completo.', 'ok');
  }
};

COMMANDS.curl = {
  desc: 'HTTP request simulado',
  fn: async (args, body) => {
    const url = args[0] || 'https://void.systems';
    unlockAch('curler', 'HTTP Client');
    printLine(body, `  * Trying ${randInt(1, 223)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}:443...`, 'dim');
    await sleep(400);
    printLine(body, '  * Connected', 'dim');
    await sleep(200);
    printLine(body, '  > GET / HTTP/1.1', '');
    printLine(body, `  > Host: ${escapeHTML(url.replace(/^https?:\/\//, ''))}`, '');
    printLine(body, '  > User-Agent: void-curl/9.1', '');
    await sleep(400);
    printLine(body, '  < HTTP/1.1 200 OK', 'ok');
    printLine(body, '  < Content-Type: text/html', 'dim');
    printLine(body, '  < Server: void-server', 'dim');
    printLine(body, '  < Content-Length: 1337', 'dim');
    printLine(body, '');
  }
};

/* ---------- SYS-TOOLS ---------- */
COMMANDS.ps = {
  desc: 'Procesos activos',
  fn: async (args, body) => {
    printLine(body, '  PID    USER      CPU%   MEM%   COMMAND', 'accent');
    const procs = [
      ['1', 'root', '0.1', '0.4', 'void-init'],
      ['42', 'muncixop', '1.2', '3.1', 'voidsh'],
      ['133', 'muncixop', '4.8', '8.2', 'matrix-render'],
      ['256', 'muncixop', '2.1', '5.5', 'particle-engine'],
      ['512', 'muncixop', '0.5', '1.8', 'audio-synth'],
    ];
    procs.forEach(p => printLine(body, `  ${padEnd(p[0], 6)} ${padEnd(p[1], 9)} ${padEnd(p[2], 6)} ${padEnd(p[3], 6)} ${p[4]}`));
    printLine(body, '');
  }
};

COMMANDS.top = {
  desc: 'Monitor de sistema',
  fn: async (args, body) => {
    const cpu = (Math.random() * 30 + 5).toFixed(1);
    const mem = (Math.random() * 40 + 30).toFixed(1);
    printLine(body, `  CPU:  <span class="ok">${cpu}%</span>   MEM: <span class="info">${mem}%</span>`, '');
    printLine(body, '  ' + '█'.repeat(Math.round(cpu / 4)) + '░'.repeat(25 - Math.round(cpu / 4)), 'ok');
    printLine(body, '  ' + '█'.repeat(Math.round(mem / 4)) + '░'.repeat(25 - Math.round(mem / 4)), 'info');
  }
};

COMMANDS.tree = {
  desc: 'Arbol de archivos',
  fn: async (args, body) => {
    const lines = [
      '  <span class="ok">void/</span>',
      '  ├── <span class="info">index.html</span>',
      '  ├── <span class="info">style.css</span>',
      '  ├── <span class="info">main.js</span>',
      '  ├── <span class="ok">assets/</span>',
      '  │   ├── icons/',
      '  │   └── sounds/',
      '  ├── <span class="ok">docs/</span>',
      '  │   └── README.md',
      '  └── <span class="dim">.git/</span>',
    ];
    lines.forEach(l => printLine(body, l, ''));
    printLine(body, '');
  }
};

COMMANDS.ls = {
  desc: 'Lista archivos',
  fn: async (args, body) => {
    printLine(body, '  <span class="ok">index.html</span>  <span class="ok">style.css</span>  <span class="ok">main.js</span>  <span class="dim">assets/</span>  <span class="dim">docs/</span>', '');
  }
};

COMMANDS.pwd = {
  desc: 'Ruta actual',
  fn: async (args, body) => printLine(body, '  /home/muncixop/void', 'info')
};

/* ---------- EFFECTS ---------- */
COMMANDS.confetti = {
  desc: 'Lanza confetti',
  fn: async (args, body) => { effectConfetti(60); playSuccess(); unlockAch('confetti', 'Fiestero'); }
};

COMMANDS.glitch = {
  desc: 'Efecto glitch',
  fn: async (args, body) => {
    effectGlitchSlice();
    document.body.classList.add('mx-hit');
    setTimeout(() => document.body.classList.remove('mx-hit'), 500);
    playGlitch();
    unlockAch('glitch', 'Glitch Master');
  }
};

COMMANDS.hypnotize = {
  desc: 'Modo hipnotico',
  fn: async (args, body) => {
    document.body.classList.toggle('hypnotize');
    playWhoosh();
    printLine(body, '  Hipnotizando... (escribe de nuevo para detener)', 'accent');
  }
};

COMMANDS.flash = {
  desc: 'Flash de pantalla',
  fn: async (args, body) => { effectFlash(); playBeep(1200, .1); }
};

COMMANDS.quake = {
  desc: 'Terremoto',
  fn: async (args, body) => { effectQuake(); unlockAch('quake', 'Terremoto'); }
};

COMMANDS.rainbow = {
  desc: 'Texto arcoiris',
  fn: async (args, body) => {
    const text = args.join(' ') || 'VOID SYSTEMS';
    printLine(body, `  <span class="rainbow-text">${escapeHTML(text)}</span>`, '');
    unlockAch('rainbow', 'Arcoíris');
  }
};

COMMANDS.scramble = {
  desc: 'Descifra texto animado',
  fn: async (args, body) => {
    const text = args.join(' ') || 'VOID SYSTEMS 9.1';
    const line = document.createElement('div');
    line.className = 'out accent';
    body.appendChild(line);
    moveInputToEnd(body);
    await new Promise(res => { scrambleText(line, '  ' + text, 900); setTimeout(res, 900); });
  }
};

COMMANDS.type = {
  desc: 'Efecto de escritura',
  fn: async (args, body) => {
    const text = args.join(' ') || 'Bienvenido a VOID SYSTEMS';
    const line = document.createElement('div');
    line.className = 'out';
    body.appendChild(line);
    moveInputToEnd(body);
    for (let i = 0; i < text.length; i++) {
      line.textContent += text[i];
      playTick(900);
      body.scrollTop = body.scrollHeight;
      await sleep(35);
    }
  }
};

COMMANDS.spinner = {
  desc: 'Spinner animado',
  fn: async (args, body) => {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    const line = document.createElement('div');
    line.className = 'out';
    body.appendChild(line);
    moveInputToEnd(body);
    for (let i = 0; i < 30; i++) {
      line.textContent = '  ' + frames[i % frames.length] + ' procesando...';
      await sleep(80);
    }
    line.textContent = '  ✓ listo';
    line.className = 'out ok';
  }
};

COMMANDS.countdown = {
  desc: 'Cuenta atras (countdown [n])',
  fn: async (args, body) => {
    const n = Math.max(1, Math.min(20, parseInt(args[0], 10) || 5));
    for (let i = n; i > 0; i--) {
      printLine(body, `  ${i}...`, 'accent');
      playBeep(600 + i * 50, .08);
      await sleep(500);
    }
    printLine(body, '  ¡CERO!', 'ok glow-pulse');
    playImpact();
    effectFlash();
  }
};

/* ---------- ASCII-ART ---------- */
COMMANDS.ascii = {
  desc: 'Arte ASCII y banners',
  fn: async (args, body) => {
    const text = args.join(' ') || 'VOID';
    printLine(body, '');
    printLine(body, `  ${text}`, 'h1');
    printLine(body, '');
    printLine(body, '     ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄', 'ok');
    printLine(body, `     █  ${padEnd(text.toUpperCase(), 19)}█`, 'ok');
    printLine(body, '     ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀', 'ok');
    printLine(body, '');
    unlockAch('ascii_artist', 'ASCII Artist');
    playBeep(700, .1);
  }
};

/* ============================================================
   RUN COMMAND
   ============================================================ */
async function runCommand(input, body, win) {
  const raw = input.trim();
  if (!raw) return;

  // Comandos de control del shell (no cuentan como comando de paquete)
  const [cmd, ...args] = raw.split(/\s+/);

  cmdHistory.push(raw);
  saveHistory();
  userStats.commandsUsed++;
  userStats.lastCommand = cmd;
  if (!userStats.uniqueCommands.includes(cmd)) userStats.uniqueCommands.push(cmd);
  saveStats();

  // Eco del comando
  const prompt = document.createElement('div');
  prompt.className = 'out cmd';
  prompt.innerHTML = getPromptHTML() + escapeHTML(raw);
  body.appendChild(prompt);
  moveInputToEnd(body);

  // Verificar si requiere paquete
  const pkg = findPackageForCommand(cmd);
  if (pkg && !installedPackages.includes(pkg.name)) {
    printLine(body, `  x Comando no disponible: "${cmd}"`, 'err');
    printLine(body, `  Requiere el paquete: <span class="warn">${pkg.name}</span>`, 'dim');
    printLine(body, `  Instala con: <span class="ok">pkg install ${pkg.name}</span>`, 'dim');
    playError();
    effectGlitchSlice();
    return;
  }

  if (!COMMANDS[cmd]) {
    printLine(body, `  x Comando desconocido: "${cmd}"`, 'err');
    // Sugerencia
    const all = Object.keys(COMMANDS);
    const sug = all.map(n => ({ n, d: levenshtein(cmd, n) })).sort((a, b) => a.d - b.d);
    if (sug[0].d <= 3) printLine(body, `  ¿Quisiste decir? <span class="ok">${sug[0].n}</span>`, 'dim');
    playError();
    effectGlitchSlice();
    return;
  }

  try {
    await COMMANDS[cmd].fn(args, body, win);
    // Logros contextuales
    if (cmd === 'projects' || cmd === 'skills' || cmd === 'about') unlockAch('explorer', 'Explorador');
    if (cmd === 'clear') effectFlash();
    // Hora
    const h = new Date().getHours();
    if (h >= 22 || h < 5) unlockAch('night_owl', 'Búho nocturno');
    if (h >= 5 && h < 8) unlockAch('early_bird', 'Madrugador');
    // Combo
    bumpCombo();
    // Multi-terminal
    if (openWindows.size >= 2) unlockAch('void', 'Multi-terminal');
  } catch (e) {
    printLine(body, `  x Error al ejecutar "${cmd}": ${escapeHTML(e.message)}`, 'err');
    console.error(e);
    playError();
  }
}

/* ============================================================
   INPUT SYSTEM
   ============================================================ */
function createInputLine(body) {
  const line = document.createElement('div');
  line.className = 'input-line';
  line.innerHTML = `${getPromptHTML()}<input class="ki" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Entrada de comando">`;
  body.appendChild(line);
  currentInputLineRef = line;
  const input = line.querySelector('.ki');
  input.focus();
  return input;
}

function bindInput(input, body, win) {
  let histIdx = cmdHistory.length;
  let tabBuffer = [];
  let tabIdx = 0;

  input.addEventListener('keydown', async (e) => {
    playKey();

    // ENTER
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = input.value;
      input.value = '';
      playEnter();
      haptic(15);
      if (value.trim()) {
        await runCommand(value, body, win);
      }
      body.scrollTop = body.scrollHeight;
      input.focus();
      return;
    }

    // BACKSPACE
    if (e.key === 'Backspace') {
      haptic(5);
      return;
    }

    // TAB autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const cur = input.value;
      if (tabBuffer.length && input.value === tabBuffer[0]) {
        // Rotar sugerencias
        tabIdx = (tabIdx + 1) % tabBuffer.length;
        input.value = tabBuffer[tabIdx];
      } else {
        tabBuffer = Object.keys(COMMANDS).filter(c => c.startsWith(cur)).sort();
        if (tabBuffer.length === 1) {
          input.value = tabBuffer[0] + ' ';
          tabBuffer = [];
        } else if (tabBuffer.length > 1) {
          tabIdx = 0;
          input.value = tabBuffer[0];
          // Mostrar opciones
          printLine(body, '  ' + tabBuffer.map(c => `<span class="ok">${c}</span>`).join('  '), 'dim');
        } else {
          playError();
        }
      }
      return;
    }

    // ARRIBA (historial)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!cmdHistory.length) return;
      histIdx = Math.max(0, histIdx - 1);
      input.value = cmdHistory[histIdx] || '';
      setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
      return;
    }

    // ABAJO (historial)
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!cmdHistory.length) return;
      histIdx = Math.min(cmdHistory.length, histIdx + 1);
      input.value = cmdHistory[histIdx] || '';
      setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
      return;
    }

    // CTRL+L → clear
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      body.querySelectorAll('.out').forEach(el => el.remove());
      return;
    }

    // CTRL+C → cancelar input
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      input.value = '';
      printLine(body, '  ^C', 'dim');
      return;
    }
  });

  // Click en cualquier parte del body → focus en input
  body.addEventListener('click', (e) => {
    if (window.getSelection().toString()) return;
    if (e.target.closest('a, button')) return;
    input.focus();
  });

  // Glitch flash al tipear
  input.addEventListener('input', () => {
    if (Math.random() > .93) {
      input.classList.add('glitch-flash');
      setTimeout(() => input.classList.remove('glitch-flash'), 130);
    }
  });
}

/* ============================================================
   MOBILE ASSISTS (chips + barra)
   ============================================================ */
function initMobile() {
  if (!mob) return;

  // Chips rápidos
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      if (!cmd) return;
      const body = currentWindowRef?.body;
      if (!body) return;
      const input = body.querySelector('.ki');
      if (input) { input.value = cmd; input.focus(); }
      haptic(15);
      playKey();
    });
  });

  // Teclas virtuales
  document.querySelectorAll('.mb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const body = currentWindowRef?.body;
      if (!body) return;
      const input = body.querySelector('.ki');
      if (!input) return;
      haptic(10);
      playKey();
      switch (action) {
        case 'esc':
          input.value = '';
          break;
        case 'tab': {
          const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
          input.dispatchEvent(ev);
          break;
        }
        case 'up': {
          const ev = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true });
          input.dispatchEvent(ev);
          break;
        }
        case 'down': {
          const ev = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
          input.dispatchEvent(ev);
          break;
        }
        case 'backspace':
          input.value = input.value.slice(0, -1);
          break;
        case 'enter': {
          const ev = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
          input.dispatchEvent(ev);
          break;
        }
      }
    });
  });

  // Detectar teclado virtual abierto
  const vp = window.visualViewport;
  if (vp) {
    vp.addEventListener('resize', () => {
      const kb = window.innerHeight - vp.height > 150;
      document.body.classList.toggle('kb-open', kb);
    });
  }
}

/* ============================================================
   KONAMI CODE
   ============================================================ */
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIdx = 0;
function initKonami() {
  document.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === KONAMI[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0;
        triggerKonami();
      }
    } else {
      konamiIdx = 0;
    }
  });
}
function triggerKonami() {
  unlockAch('konami', 'Código Konami');
  effectConfetti(80);
  effectFlash('rgba(199,125,255,.4)');
  playPowerUp();
  haptic([50, 30, 50, 30, 100, 50, 200]);
  document.body.classList.add('hypnotize');
  setTimeout(() => document.body.classList.remove('hypnotize'), 4000);
  const body = currentWindowRef?.body;
  if (body) {
    printLine(body, '');
    printLine(body, '  ★ ★ ★  KONAMI CODE ACTIVADO  ★ ★ ★', 'accent glow-pulse');
    printLine(body, '  Balance +1000', 'ok');
    userBalance += 1000;
    saveBalance();
    printLine(body, '');
  }
}

/* ============================================================
   IDLE / AUTO EVENTS
   ============================================================ */
function initAuto() {
  // Contador de inactividad
  let idleEl = document.createElement('div');
  idleEl.className = 'idle-zzz';
  document.body.appendChild(idleEl);
  let idleTimeout;
  function resetIdle() {
    idleEl.classList.remove('on');
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      idleEl.classList.add('on');
    }, 60000);
  }
  ['mousemove', 'keydown', 'touchstart', 'click'].forEach(ev =>
    document.addEventListener(ev, resetIdle, { passive: true })
  );
  resetIdle();

  // Saludo por hora
  const h = new Date().getHours();
  if (h >= 22 || h < 5) unlockAch('night_owl', 'Búho nocturno');
  if (h >= 5 && h < 8) unlockAch('early_bird', 'Madrugador');

  // Guardar tiempo total cada 30s
  setInterval(() => {
    userStats.totalTime += 30;
    saveStats();
  }, 30000);

  // Glitch aleatorio (raro)
  if (!reducedMotion && userSettings.glitchesAuto) {
    setInterval(() => {
      if (Math.random() < 0.03) effectGlitchSlice();
    }, 30000);
  }
}

/* ============================================================
   BOOT / MAIN
   ============================================================ */
async function main() {
  // Crear ventana principal
  const win = createWindow('muncixop@void: ~', { width: 760, height: 560, x: 40, y: 40 });
  currentWindowRef = win;

  // Crear input (queda "flotando" hasta que se imprima algo)
  const input = createInputLine(win.body);
  bindInput(input, win.body, win);

  // Secuencia de arranque
  await bootSequence(win.body);

  // Sistema inicializado
  initMobile();
  initKonami();
  initAuto();

  // Marcar "void" si hay más de una ventana
  // (ya se maneja en runCommand)

  // Logros de instalación iniciales
  if (installedPackages.length > 0) {
    unlockAch('first_pkg', 'Instalador');
    if (installedPackages.length >= 5) unlockAch('pkg_master', 'Package Master');
    if (installedPackages.length === Object.keys(PACKAGES).length) unlockAch('all_pkgs', 'Completo');
  }

  // Links desbloqueados previos
  if (Object.keys(unlockedLinks).length === Object.keys(LINKS_DB).length) {
    unlockAch('all_links', 'Coleccionista de links');
  }

  // Aplicar settings
  audioEnabled = userSettings.audioEnabled;
  matrixActive = userSettings.matrixActive;

  // Click en el launcher → nueva ventana
  launcher.addEventListener('click', () => {
    haptic(20);
    playEnter();
    const nw = createWindow('muncixop@void: ~', { width: 760, height: 560 });
    const ni = createInputLine(nw.body);
    bindInput(ni, nw.body, nw);
    currentWindowRef = nw;
  });
}

/* ============================================================
   ARRANQUE
   ============================================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
