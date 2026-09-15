/* ============================================================
   VOID SYSTEMS v8.1 — Terminal / OS Simulator
   Author: MuncixOp
   Novedades v8.1: Sistema de Paquetes
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
   SISTEMA DE GUARDADO COMPLETO
   ============================================================ */
const STORAGE_KEYS = {
  history: 'void_history',
  achievements: 'void_achievements',
  unlocked: 'void_unlocked_links',
  notes: 'void_notes',
  balance: 'void_balance',
  stats: 'void_stats',
  settings: 'void_settings',
  packages: 'void_packages'
};

/* ============================================================
   SISTEMA DE PAQUETES — Definición
   ============================================================ */
const PACKAGES = {
  games: {
    name: 'games',
    desc: 'Minijuegos de terminal',
    version: '1.0.0',
    size: '2.1 MB',
    commands: ['coin', 'rps', 'guess', 'dice', '8ball'],
    deps: []
  },
  gambling: {
    name: 'gambling',
    desc: 'Sistema de apuestas',
    version: '1.0.0',
    size: '1.8 MB',
    commands: ['gamble'],
    deps: ['games']
  },
  'crypto-utils': {
    name: 'crypto-utils',
    desc: 'Herramientas criptográficas',
    version: '1.2.0',
    size: '3.4 MB',
    commands: ['base64', 'rot13', 'hash', 'password', 'uuid', 'pick'],
    deps: []
  },
  fun: {
    name: 'fun',
    desc: 'Comandos de entretenimiento',
    version: '1.5.0',
    size: '2.7 MB',
    commands: ['quote', 'joke', 'fact', 'meme', 'cowsay', 'fortune', 'random'],
    deps: []
  },
  'net-tools': {
    name: 'net-tools',
    desc: 'Diagnóstico de red',
    version: '2.0.1',
    size: '5.6 MB',
    commands: ['ping', 'trace', 'nmap', 'whois', 'scan', 'curl'],
    deps: []
  },
  'sys-tools': {
    name: 'sys-tools',
    desc: 'Información del sistema',
    version: '1.3.0',
    size: '1.2 MB',
    commands: ['ps', 'top', 'tree', 'ls', 'pwd'],
    deps: []
  },
  effects: {
    name: 'effects',
    desc: 'Efectos visuales',
    version: '1.4.0',
    size: '4.1 MB',
    commands: ['confetti', 'glitch', 'hypnotize', 'flash', 'quake', 'rainbow', 'scramble', 'type', 'spinner', 'countdown'],
    deps: []
  },
  'ascii-art': {
    name: 'ascii-art',
    desc: 'Arte ASCII y banners',
    version: '1.0.0',
    size: '1.5 MB',
    commands: ['ascii'],
    deps: []
  },
  security: {
    name: 'security',
    desc: 'Herramientas de seguridad',
    version: '3.0.0',
    size: '6.8 MB',
    commands: ['decrypt'],
    deps: []
  }
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
  for (const p of Object.values(PACKAGES)) {
    if (p.commands.includes(cmd)) return p;
  }
  return null;
}
function isCommandAvailable(cmd) {
  if (COMMANDS[cmd]) return true;
  const pkg = findPackageForCommand(cmd);
  if (!pkg) return false;
  return installedPackages.includes(pkg.name);
}

/* --- STORAGE: HISTORY --- */
let cmdHistory = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]'); }
  catch { return []; }
})();
function saveHistory() {
  try { localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(cmdHistory.slice(-200))); } catch {}
}

/* --- STORAGE: ACHIEVEMENTS --- */
let achievements = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.achievements) || '{}'); }
  catch { return {}; }
})();
function saveAchievements() {
  try { localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(achievements)); } catch {}
}
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
  toast.innerHTML = `
    <div class="ach-title">LOGRO DESBLOQUEADO</div>
    <div class="ach-desc">${escapeHTML(name)}</div>
    <div class="ach-meta">${new Date().toLocaleTimeString()}</div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'achIn .4s reverse forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3400);
}

/* --- STORAGE: UNLOCKED LINKS --- */
let unlockedLinks = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.unlocked) || '{}'); }
  catch { return {}; }
})();
function saveUnlocked() {
  try { localStorage.setItem(STORAGE_KEYS.unlocked, JSON.stringify(unlockedLinks)); } catch {}
}

/* --- STORAGE: NOTES --- */
let userNotes = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]'); }
  catch { return []; }
})();
function saveNotes() {
  try { localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(userNotes)); } catch {}
}

/* --- STORAGE: BALANCE --- */
let userBalance = (() => {
  try { return parseInt(localStorage.getItem(STORAGE_KEYS.balance) || '100', 10); }
  catch { return 100; }
})();
function saveBalance() {
  try { localStorage.setItem(STORAGE_KEYS.balance, String(userBalance)); } catch {}
}

/* --- STORAGE: STATS --- */
let userStats = (() => {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.stats) || '{}');
    return {
      commandsUsed: s.commandsUsed || 0,
      uniqueCommands: s.uniqueCommands || [],
      sessionStart: s.sessionStart || Date.now(),
      totalTime: s.totalTime || 0,
      gamesWon: s.gamesWon || 0,
      gamesLost: s.gamesLost || 0,
      gamblesWon: s.gamblesWon || 0,
      gamblesLost: s.gamblesLost || 0,
      linksUnlocked: s.linksUnlocked || 0,
      notesCreated: s.notesCreated || 0,
      packagesInstalled: s.packagesInstalled || 0,
      lastCommand: s.lastCommand || ''
    };
  } catch {
    return {
      commandsUsed: 0, uniqueCommands: [], sessionStart: Date.now(),
      totalTime: 0, gamesWon: 0, gamesLost: 0, gamblesWon: 0,
      gamblesLost: 0, linksUnlocked: 0, notesCreated: 0,
      packagesInstalled: 0, lastCommand: ''
    };
  }
})();
function saveStats() {
  try { localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(userStats)); } catch {}
}

/* --- STORAGE: SETTINGS --- */
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
    return { audioEnabled: true, matrixActive: true, glitchesAuto: true, notifications: true };
  }
})();
function saveSettings() {
  try { localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(userSettings)); } catch {}
}

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
function playCoin() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain();
    o1.type = 'square'; o1.frequency.value = 1800;
    o2.type = 'square'; o2.frequency.value = 2400;
    g.gain.setValueAtTime(.06, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .15);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .15); o2.start(t); o2.stop(t + .15);
    const o3 = a.createOscillator(), g2 = a.createGain();
    o3.type = 'square'; o3.frequency.value = 1400;
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
      o.type = 'triangle'; o.frequency.value = f;
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
    o.type = 'sawtooth';
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
const PARTICLE_COUNT = mob ? 20 : 60;
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
let lastParticleTime = 0;
function drawParticles(now) {
  if (reducedMotion) { requestAnimationFrame(drawParticles); return; }
  if (now - lastParticleTime < 40) { requestAnimationFrame(drawParticles); return; }
  lastParticleTime = now;
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

function makeSwipeGestures(win, handle, id) {
  if (!mob) return;
  let startX = 0, startY = 0, startTime = 0;
  let tracking = false;
  handle.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    startX = t.clientX; startY = t.clientY;
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
  if (typeof currentInputLineRef !== 'undefined' && currentInputLineRef && currentInputLineRef.parentNode === body) body.appendChild(currentInputLineRef);
  body.scrollTop = body.scrollHeight;
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

// printLine con FIX: mueve el input al fondo siempre
function printLine(body, text, cls = '') {
  const line = document.createElement('div');
  line.className = 'out ' + cls;
  line.innerHTML = text;
  body.appendChild(line);

  if (typeof currentInputLineRef !== 'undefined' && currentInputLineRef && currentInputLineRef.parentNode === body) {
    const inputEl = currentInputLineRef.querySelector('.ki');
    const hadFocus = inputEl && document.activeElement === inputEl;
    body.appendChild(currentInputLineRef);
    if (hadFocus && inputEl) {
      setTimeout(() => { try { inputEl.focus({ preventScroll: true }); } catch (e) {} }, 0);
    }
  }

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
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

/* ============================================================
   GESTOR DE PAQUETES — funciones
   ============================================================ */
async function installPackage(name, body) {
  const pkg = PACKAGES[name];
  if (!pkg) {
    printLine(body, `x Paquete no encontrado: ${escapeHTML(name)}`, 'err');
    printLine(body, `  Usa <span class="ok">pkg list</span> para ver los disponibles.`, 'dim');
    playError();
    return false;
  }
  if (installedPackages.includes(name)) {
    printLine(body, `[!] "${name}" ya está instalado.`, 'warn');
    return false;
  }

  // Dependencias
  for (const dep of pkg.deps) {
    if (!installedPackages.includes(dep)) {
      printLine(body, `[!] Requiere dependencia: "${dep}"`, 'warn');
      await sleep(300);
      await installPackage(dep, body);
    }
  }

  printLine(body, '');
  printLine(body, `:: Instalando paquete "${name}"...`, 'accent');
  printLine(body, `   ${pkg.desc}`, 'dim');
  printLine(body, `   v${pkg.version} · ${pkg.size}`, 'dim');
  printLine(body, '');
  await sleep(200);

  const duration = 1800 + Math.random() * 900;
  await animateProgress(body, `Descargando ${name}`, duration);
  await sleep(120);
  printLine(body, `  <span class="ok">✓</span> Descarga completa`, '');
  await sleep(160);
  printLine(body, `  <span class="ok">✓</span> Checksum verificado <span class="dim">(SHA-256)</span>`, '');
  await sleep(160);
  printLine(body, `  <span class="ok">✓</span> Archivos extraídos <span class="dim">(${pkg.commands.length} módulos)</span>`, '');
  await sleep(160);
  printLine(body, `  <span class="ok">✓</span> Comandos registrados`, '');
  await sleep(200);

  installedPackages.push(name);
  savePackages();
  userStats.packagesInstalled = installedPackages.length;
  saveStats();
  effectFlash('rgba(61,220,132,.25)');

  printLine(body, '');
  printLine(body, `[OK] Paquete "${name}" instalado correctamente.`, 'ok glow-pulse');
  printLine(body, `     Comandos disponibles: <span class="info">${pkg.commands.join(', ')}</span>`, '');
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
  if (!pkg) {
    printLine(body, `x Paquete no encontrado: ${escapeHTML(name)}`, 'err');
    return;
  }
  if (!installedPackages.includes(name)) {
    printLine(body, `[!] "${name}" no está instalado.`, 'warn');
    return;
  }

  const dependents = Object.values(PACKAGES).filter(p =>
    installedPackages.includes(p.name) &&
    p.deps.includes(name) &&
    p.name !== name
  );
  if (dependents.length > 0) {
    printLine(body, `x No se puede desinstalar "${name}"`, 'err');
    printLine(body, `  Paquetes que dependen: <span class="warn">${dependents.map(p => p.name).join(', ')}</span>`, 'dim');
    printLine(body, `  Desinstálalos primero.`, 'dim');
    playError();
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

/* ============================================================
   ACHIEVEMENTS LIST
   ============================================================ */
const ACHIEVEMENTS_LIST = {
  first_fetch: 'El ojo te vio',
  first_unlock: 'Primer desbloqueo',
  hacker: 'Hacker',
  scanner: 'Escaneo completo',
  tracer: 'Rastreador',
  pinger: 'Ping Master',
  nmap: 'Puertos Abiertos',
  curler: 'HTTP Client',
  decryptor: 'Descifrador',
  cow: 'Vaca filósofa',
  fortune: 'Sabio',
  themer: 'Estilista',
  rainbow: 'Arcoíris',
  confetti: 'Fiestero',
  void: 'Multi-terminal',
  glitch: 'Glitch Master',
  quake: 'Terremoto',
  konami: 'Código Konami',
  sudo_fail: 'Intento de sudo',
  ascii_artist: 'ASCII Artist',
  notes_master: 'Escritor',
  note_collector: 'Coleccionista',
  gambler: 'Apostador',
  rich: 'Millonario',
  poor: 'En bancarrota',
  cryptographer: 'Criptógrafo',
  gamer: 'Gamer',
  winner: 'Ganador',
  loser: 'Mala suerte',
  time_lord: 'Señor del tiempo',
  explorer: 'Explorador',
  social_butterfly: 'Mariposa social',
  all_links: 'Coleccionista de links',
  night_owl: 'Búho nocturno',
  early_bird: 'Madrugador',
  combo_king: 'Combo King',
  perfectionist: 'Perfeccionista',
  hacker_elite: 'Hacker Élite',
  poet: 'Poeta',
  musician: 'Músico',
  philosopher: 'Filósofo',
  mathematician: 'Matemático',
  // PAQUETES
  first_pkg: 'Instalador',
  pkg_master: 'Package Master',
  all_pkgs: 'Completo'
};

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
  printLine(body, `:: Tiempo estimado: ~15s`, 'dim');
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
  if (currentInputLineRef && currentInputLineRef.parentNode === body) body.appendChild(currentInputLineRef);
  body.scrollTop = body.scrollHeight;

  const displayEl = panel.querySelector(`#brute-display-${linkKey}`);
  const barEl = panel.querySelector(`#brute-bar-${linkKey}`);
  const attEl = panel.querySelector(`#brute-attempts-${linkKey}`);
  const speedEl = panel.querySelector(`#brute-speed-${linkKey}`);
  const etaEl = panel.querySelector(`#brute-eta-${linkKey}`);
  const termEl = panel.querySelector(`#brute-term-${linkKey}`);
  const hashEl = panel.querySelector(`#brute-hash-${linkKey}`);

  const TOTAL_TIME = 15000;
  const startTime = performance.now();
  let attempts = 0;
  let running = true;
  let unlocked = false;

  const termPhrases = [
    '[+] Estableciendo conexion con el objetivo...',
    '[+] Evadiendo firewall perimetral...',
    '[+] Inyectando payload en el handshake...',
    '[+] Analizando entropia del token...',
    '[+] Correlacionando patrones debiles...',
    '[+] Fuerza bruta paralela iniciada (64 hilos)...',
    '[!] Bloqueo temporal detectado, rotando proxy...',
    '[+] Consultando rainbow tables...',
    '[!] Reduciendo espacio de busqueda...',
    '[+] Atacando vector secundario...',
    '[+] Cruzando datos con leaks conocidos...',
    '[!] Detectada defensa por rate-limiting...',
    '[+] Ajustando heuristica de fuerza bruta...',
  ];

  const termInterval = setInterval(() => {
    if (!running || unlocked) return;
    if (Math.random() > .5) {
      const line = document.createElement('div');
      line.textContent = `[${new Date().toLocaleTimeString()}] ${randomFrom(termPhrases)}`;
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
    if (!running || unlocked) return;
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
    if (Math.random() > .7) playTick(600 + Math.random() * 400);
    if (progress >= 1) { finishSuccess(); return; }
    const interval = progress > 0.85 ? 80 : 180;
    setTimeout(tick, interval);
  }

  function finishSuccess() {
    unlocked = true;
    running = false;
    clearInterval(termInterval);
    barEl.style.width = '100%';
    etaEl.textContent = '0s';

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

    setTimeout(() => showUnlockResult(win, linkKey), 900);
  }

  tick();
  body._bruteforce = body._bruteforce || {};
  body._bruteforce[linkKey] = { stop: () => { running = false; clearInterval(termInterval); } };
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

  if (Object.keys(unlockedLinks).length === Object.keys(LINKS_DB).length) {
    unlockAch('all_links', 'Coleccionista de links');
  }

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

// ⚠️ CONTINÚA EN EL SIGUIENTE MENSAJE
