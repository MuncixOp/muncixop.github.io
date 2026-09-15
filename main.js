/* ============================================================
   VOID SYSTEMS v9.0 — Terminal / OS Simulator
   Author: MuncixOp
   La versión definitiva
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

/* Haptic */
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
   STORAGE CON MIGRACIÓN
   ============================================================ */
const STORAGE_VERSION = '9.0';
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

// Migración de versiones viejas
(function migrateStorage() {
  try {
    const oldVer = localStorage.getItem(STORAGE_KEYS.version);
    if (oldVer !== STORAGE_VERSION) {
      // Asegurar que existan todas las keys
      localStorage.setItem(STORAGE_KEYS.version, STORAGE_VERSION);
    }
  } catch (e) {}
})();

/* ============================================================
   SISTEMA DE PAQUETES v2 — Mejorado
   ============================================================ */
const PACKAGES = {
  games: {
    name: 'games',
    desc: 'Minijuegos de terminal',
    version: '1.2.0',
    size: '2.1 MB',
    commands: ['coin', 'rps', 'guess', 'dice', '8ball'],
    deps: [],
    icon: '🎮'
  },
  gambling: {
    name: 'gambling',
    desc: 'Sistema de apuestas',
    version: '1.1.0',
    size: '1.8 MB',
    commands: ['gamble'],
    deps: ['games'],
    icon: '💰'
  },
  'crypto-utils': {
    name: 'crypto-utils',
    desc: 'Herramientas criptográficas',
    version: '1.3.0',
    size: '3.4 MB',
    commands: ['base64', 'rot13', 'hash', 'password', 'uuid', 'pick'],
    deps: [],
    icon: '🔐'
  },
  fun: {
    name: 'fun',
    desc: 'Comandos de entretenimiento',
    version: '1.6.0',
    size: '2.7 MB',
    commands: ['quote', 'joke', 'fact', 'meme', 'cowsay', 'fortune', 'random'],
    deps: [],
    icon: '🎭'
  },
  'net-tools': {
    name: 'net-tools',
    desc: 'Diagnóstico de red',
    version: '2.1.0',
    size: '5.6 MB',
    commands: ['ping', 'trace', 'nmap', 'whois', 'scan', 'curl'],
    deps: [],
    icon: '🌐'
  },
  'sys-tools': {
    name: 'sys-tools',
    desc: 'Información del sistema',
    version: '1.4.0',
    size: '1.2 MB',
    commands: ['ps', 'top', 'tree', 'ls', 'pwd'],
    deps: [],
    icon: '⚙️'
  },
  effects: {
    name: 'effects',
    desc: 'Efectos visuales',
    version: '1.5.0',
    size: '4.1 MB',
    commands: ['confetti', 'glitch', 'hypnotize', 'flash', 'quake', 'rainbow', 'scramble', 'type', 'spinner', 'countdown'],
    deps: [],
    icon: '✨'
  },
  'ascii-art': {
    name: 'ascii-art',
    desc: 'Arte ASCII y banners',
    version: '1.1.0',
    size: '1.5 MB',
    commands: ['ascii'],
    deps: [],
    icon: '🎨'
  },
  security: {
    name: 'security',
    desc: 'Herramientas de seguridad',
    version: '3.1.0',
    size: '6.8 MB',
    commands: ['decrypt'],
    deps: [],
    icon: '🛡️'
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

/* ============================================================
   STORAGE: History
   ============================================================ */
let cmdHistory = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]'); }
  catch { return []; }
})();
function saveHistory() {
  try { localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(cmdHistory.slice(-200))); } catch {}
}

/* ============================================================
   STORAGE: Achievements
   ============================================================ */
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

/* ============================================================
   STORAGE: Unlocked Links
   ============================================================ */
let unlockedLinks = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.unlocked) || '{}'); }
  catch { return {}; }
})();
function saveUnlocked() {
  try { localStorage.setItem(STORAGE_KEYS.unlocked, JSON.stringify(unlockedLinks)); } catch {}
}

/* ============================================================
   STORAGE: Notes
   ============================================================ */
let userNotes = (() => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || '[]'); }
  catch { return []; }
})();
function saveNotes() {
  try { localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(userNotes)); } catch {}
}

/* ============================================================
   STORAGE: Balance
   ============================================================ */
let userBalance = (() => {
  try { return parseInt(localStorage.getItem(STORAGE_KEYS.balance) || '100', 10); }
  catch { return 100; }
})();
function saveBalance() {
  try { localStorage.setItem(STORAGE_KEYS.balance, String(userBalance)); } catch {}
}

/* ============================================================
   STORAGE: Stats
   ============================================================ */
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
  try {
    const s = { ...userStats, sessionStart: undefined };
    delete s.sessionStart;
    localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(s));
  } catch {}
}

/* ============================================================
   STORAGE: Settings
   ============================================================ */
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
   AUDIO ENGINE
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
  let sx, sy, ox, oy, dragging = false, rafId = null, nx = 0, ny = 0;
  const start = (e) => {
    if (win.classList.contains('maximized')) return;
    if (e.target.closest('.btn')) return;
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX; sy = p.clientY;
    ox = win.offsetLeft; oy = win.offsetTop;
    dragging = true;
    win.classList.add('dragging');
    win.style.zIndex = ++zIndex;
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
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        win.style.left = nx + 'px';
        win.style.top = ny + 'px';
        rafId = null;
      });
    }
  };
  const end = () => {
    dragging = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    win.style.left = nx + 'px';
    win.style.top = ny + 'px';
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
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        win.style.width = nw + 'px';
        win.style.height = nh + 'px';
        rafId = null;
      });
    }
  };
  const end = () => {
    resizing = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    win.style.width = nw + 'px';
    win.style.height = nh + 'px';
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

// printLine con FIX: SIEMPRE mueve el input al fondo
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
    printLine(body, `    Versión: v${pkg.version}`, 'dim');
    return false;
  }

  // Dependencias primero
  for (const dep of pkg.deps) {
    if (!installedPackages.includes(dep)) {
      printLine(body, `[!] Requiere dependencia: "${dep}"`, 'warn');
      await sleep(300);
      await installPackage(dep, body);
    }
  }

  // Header
  printLine(body, '');
  printLine(body, `:: Instalando paquete "${name}"...`, 'accent');
  printLine(body, `   ${pkg.icon} ${pkg.desc}`, 'dim');
  printLine(body, `   v${pkg.version} · ${pkg.size}`, 'dim');
  printLine(body, '');
  await sleep(200);

  // Panel visual
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
  if (currentInputLineRef && currentInputLineRef.parentNode === body) body.appendChild(currentInputLineRef);
  body.scrollTop = body.scrollHeight;

  const steps = log.querySelectorAll('.step');
  for (let i = 0; i < steps.length; i++) {
    await sleep(240 + Math.random() * 180);
    steps[i].classList.add('done');
    playTick(500 + i * 80);
    body.scrollTop = body.scrollHeight;
  }

  // Download progress
  await sleep(120);
  const duration = 1400 + Math.random() * 800;
  await animateProgress(body, `Descargando ${name}`, duration);

  // Registrar
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
  explorer: 'Explorador',
  all_links: 'Coleccionista de links',
  night_owl: 'Búho nocturno',
  early_bird: 'Madrugador',
  combo_king: 'Combo King',
  perfectionist: 'Perfeccionista',
  hacker_elite: 'Hacker Élite',
  philosopher: 'Filósofo',
  mathematician: 'Matemático',
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
    barEl.style.background = 'linear-gradient(90deg, #3ddc84, #5eaaff)';

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

// ⚠️ Continúa en PARTE 2
/* ============================================================
   COMANDOS
   ============================================================ */
const COMMANDS = {

  /* ============================================================
     CORE COMMANDS
     ============================================================ */

  help: { desc: 'Ayuda', run: (body) => {
    const core = [
      ['help', 'esta ayuda'], ['about', 'info'], ['projects', 'proyectos'],
      ['skills', 'habilidades'], ['contact', 'contacto'], ['social', 'redes'],
      ['links', 'paginas bloqueadas'], ['hack <key>', 'bruteforce'],
      ['unlock <key> <token>', 'desbloquea'], ['list', 'tokens'],
      ['notes [add|del|clear]', 'sistema de notas'],
      ['balance', 'tu saldo'], ['stats', 'estadisticas'],
      ['settings', 'preferencias'], ['save', 'guardar'], ['reset-all', 'reset total'],
      ['pkg <cmd>', 'gestor de paquetes'],
      ['theme <color>', 'tema'], ['os <mac|win|linux>', 'tema SO'],
      ['matrix', 'toggle matrix'], ['cyberpunk', 'glitch mode'],
      ['fastfetch', 'sistema'], ['neofetch', 'alias'],
      ['history', 'historial'], ['achievements', 'logros'],
      ['whoami', 'quien'], ['date', 'fecha'], ['clear', 'limpiar'],
      ['sound', 'audio'], ['reboot', 'reiniciar'], ['void', 'nueva terminal'],
      ['close', 'cerrar'], ['sudo', 'escalar'], ['banner', 'banner'],
      ['exit', 'salir'], ['echo <txt>', 'repetir'], ['reset', 'borrar tokens'],
    ];
    printLine(body, '+-- COMANDOS CORE ---------------------------------+', 'accent');
    core.forEach(([c, d]) => {
      printLine(body, `  <span class="ok">${escapeHTML(padEnd(c, 34))}</span><span class="dim">${escapeHTML(d)}</span>`);
    });

    if (installedPackages.length > 0) {
      printLine(body, '');
      printLine(body, '+-- COMANDOS DE PAQUETES --------------------------+', 'accent');
      for (const pkgName of installedPackages) {
        const pkg = PACKAGES[pkgName];
        if (!pkg) continue;
        for (const c of pkg.commands) {
          const cmdDef = COMMANDS[c];
          if (cmdDef) {
            printLine(body, `  <span class="ok">${escapeHTML(padEnd(c, 34))}</span><span class="dim">${escapeHTML(cmdDef.desc)}</span>`);
          }
        }
      }
    }

    printLine(body, '+--------------------------------------------------+', 'accent');

    const remaining = Object.keys(PACKAGES).length - installedPackages.length;
    if (remaining > 0) {
      printLine(body, `[!] ${remaining} paquete${remaining > 1 ? 's' : ''} disponible${remaining > 1 ? 's' : ''}. Usa <span class="ok">pkg list</span> para verlos.`, 'warn');
    } else {
      printLine(body, `[OK] Todos los paquetes instalados.`, 'ok');
    }
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

  notes: { desc: 'Sistema de notas', run: (body, win, args) => {
    const sub = (args[0] || '').toLowerCase();
    const rest = args.slice(1).join(' ');
    if (sub === 'add' || sub === 'nueva') {
      if (!rest) { printLine(body, 'Uso: notes add <texto>', 'warn'); return; }
      userNotes.push({ text: rest, at: Date.now() });
      saveNotes();
      userStats.notesCreated++;
      saveStats();
      printLine(body, `[OK] Nota guardada (${userNotes.length} totales)`, 'ok');
      playSuccess();
      if (userNotes.length >= 1) unlockAch('notes_master', 'Escritor');
      if (userNotes.length >= 10) unlockAch('note_collector', 'Coleccionista');
      return;
    }
    if (sub === 'del' || sub === 'borrar') {
      const idx = parseInt(rest, 10) - 1;
      if (isNaN(idx) || idx < 0 || idx >= userNotes.length) {
        printLine(body, 'Índice inválido.', 'err');
        return;
      }
      userNotes.splice(idx, 1);
      saveNotes();
      printLine(body, '[OK] Nota borrada.', 'ok');
      return;
    }
    if (sub === 'clear' || sub === 'vaciar') {
      userNotes = [];
      saveNotes();
      printLine(body, '[OK] Todas las notas borradas.', 'ok');
      return;
    }
    printLine(body, ':: NOTAS GUARDADAS', 'accent');
    printLine(body, '');
    if (!userNotes.length) {
      printLine(body, '  No tienes notas. Usa: <span class="ok">notes add &lt;texto&gt;</span>', 'dim');
      return;
    }
    userNotes.forEach((n, i) => {
      const fecha = new Date(n.at).toLocaleString();
      const el = document.createElement('div');
      el.className = 'out note-item';
      el.innerHTML = `<span class="dim">#${i + 1}</span> ${escapeHTML(n.text)} <span class="dim" style="font-size:.85em">— ${fecha}</span>`;
      body.appendChild(el);
    });
    if (currentInputLineRef && currentInputLineRef.parentNode === body) body.appendChild(currentInputLineRef);
    printLine(body, '');
    printLine(body, `  Total: ${userNotes.length} · <span class="ok">notes del &lt;n&gt;</span> · <span class="ok">notes clear</span>`, 'dim');
  }},

  balance: { desc: 'Tu saldo actual', run: (body) => {
    printLine(body, ':: BALANCE', 'accent');
    printLine(body, '');
    printLine(body, `  Saldo actual: <span class="h1">$${userBalance}</span>`, '');
    printLine(body, `  Ganados:      <span class="ok">${userStats.gamblesWon}</span>`, '');
    printLine(body, `  Perdidos:     <span class="err">${userStats.gamblesLost}</span>`, '');
    printLine(body, '');
    printLine(body, '  Usa <span class="ok">gamble &lt;n&gt;</span> para apostar (requiere paquete gambling).', 'dim');
  }},

  stats: { desc: 'Estadísticas personales', run: (body) => {
    printLine(body, ':: ESTADÍSTICAS', 'accent');
    printLine(body, '');
    const session = Math.floor((Date.now() - userStats.sessionStart) / 1000);
    const stats = [
      ['Comandos usados', userStats.commandsUsed],
      ['Comandos únicos', userStats.uniqueCommands.length],
      ['Sesión actual', session + 's'],
      ['Juegos ganados', userStats.gamesWon],
      ['Juegos perdidos', userStats.gamesLost],
      ['Apuestas ganadas', userStats.gamblesWon],
      ['Apuestas perdidas', userStats.gamblesLost],
      ['Links desbloqueados', userStats.linksUnlocked],
      ['Notas creadas', userStats.notesCreated],
      ['Paquetes instalados', userStats.packagesInstalled + '/' + Object.keys(PACKAGES).length],
      ['Logros', Object.keys(achievements).length + '/' + Object.keys(ACHIEVEMENTS_LIST).length],
      ['Saldo', '$' + userBalance],
    ];
    stats.forEach(([k, v]) => {
      printLine(body, `  <span class="dim">${padEnd(k, 24)}</span><span class="ok">${escapeHTML(String(v))}</span>`);
    });
  }},

  settings: { desc: 'Preferencias', run: (body, win, args) => {
    const sub = (args[0] || '').toLowerCase();
    const toggle = (key) => {
      userSettings[key] = !userSettings[key];
      saveSettings();
      printLine(body, `[OK] ${key}: ${userSettings[key] ? 'ON' : 'OFF'}`, 'ok');
      if (key === 'audioEnabled') audioEnabled = userSettings[key];
      if (key === 'matrixActive') matrixActive = userSettings[key];
    };
    if (sub === 'audio' || sub === 'sound') { toggle('audioEnabled'); return; }
    if (sub === 'matrix') { toggle('matrixActive'); return; }
    if (sub === 'glitches') { toggle('glitchesAuto'); return; }
    if (sub === 'notifications') { toggle('notifications'); return; }

    printLine(body, ':: SETTINGS', 'accent');
    printLine(body, '');
    Object.entries(userSettings).forEach(([k, v]) => {
      const color = v ? 'ok' : 'err';
      printLine(body, `  <span class="dim">${padEnd(k, 20)}</span><span class="${color}">${v ? 'ON' : 'OFF'}</span>`);
    });
    printLine(body, '');
    printLine(body, '  Usa: <span class="ok">settings audio|matrix|glitches|notifications</span>', 'dim');
  }},

  save: { desc: 'Guardar todo', run: (body) => {
    saveHistory(); saveAchievements(); saveUnlocked();
    saveNotes(); saveBalance(); saveStats(); saveSettings(); savePackages();
    playSuccess();
    printLine(body, '[OK] Todo guardado en localStorage.', 'ok');
  }},

  'reset-all': { desc: 'Resetear TODO', run: (body) => {
    if (!confirm('¿Borrar TODOS los datos? (notas, logros, tokens, saldo, paquetes)')) return;
    Object.values(STORAGE_KEYS).forEach(k => { try { localStorage.removeItem(k); } catch(e){} });
    unlockedLinks = {};
    userNotes = [];
    userBalance = 100;
    achievements = {};
    cmdHistory = [];
    installedPackages = [];
    playError();
    printLine(body, '[OK] Todo reseteado. Reinicia para ver los cambios.', 'ok');
  }},

  /* ============================================================
     PKG — Gestor de paquetes
     ============================================================ */
  pkg: { desc: 'Gestor de paquetes', run: async (body, win, args) => {
    const sub = (args[0] || 'list').toLowerCase();
    const name = (args[1] || '').toLowerCase();

    if (sub === 'list' || sub === 'ls' || sub === '') {
      printLine(body, ':: PAQUETES DISPONIBLES', 'accent');
      printLine(body, '');
      printLine(body, `  <span class="info">${padEnd('PAQUETE', 16)}${padEnd('VERSIÓN', 10)}${padEnd('TAMAÑO', 10)}ESTADO</span>`, 'dim');
      printLine(body, '  ' + '-'.repeat(58), 'dim');
      Object.values(PACKAGES).forEach(p => {
        const inst = installedPackages.includes(p.name);
        const status = inst ? '<span class="ok">[INSTALADO]</span>' : '<span class="dim">[ ]</span>';
        printLine(body, `  <span class="ok">${padEnd(p.name, 16)}</span>${padEnd('v' + p.version, 10)}${padEnd(p.size, 10)}${status}`);
      });
      printLine(body, '');
      printLine(body, `  ${installedPackages.length}/${Object.keys(PACKAGES).length} instalados`, 'dim');
      printLine(body, '  Usa <span class="ok">pkg install &lt;nombre&gt;</span> para instalar.', 'dim');
      printLine(body, '  Usa <span class="ok">pkg info &lt;nombre&gt;</span> para ver comandos.', 'dim');
      return;
    }

    if (sub === 'installed' || sub === 'i-ls') {
      if (!installedPackages.length) {
        printLine(body, 'No tienes paquetes instalados.', 'warn');
        printLine(body, 'Usa <span class="ok">pkg install &lt;nombre&gt;</span>.', 'dim');
        return;
      }
      printLine(body, ':: PAQUETES INSTALADOS', 'accent');
      printLine(body, '');
      installedPackages.forEach(n => {
        const p = PACKAGES[n];
        if (!p) return;
        printLine(body, `  <span class="ok">✓</span> <span class="h1">${p.name}</span> <span class="dim">v${p.version}</span>`);
        printLine(body, `     ${p.commands.length} comandos · ${p.desc}`, 'dim');
      });
      return;
    }

    if (sub === 'install' || sub === 'add' || sub === 'i') {
      if (!name) { printLine(body, 'Uso: pkg install <nombre>', 'warn'); return; }
      await installPackage(name, body);
      return;
    }

    if (sub === 'remove' || sub === 'rm' || sub === 'uninstall' || sub === 'del') {
      if (!name) { printLine(body, 'Uso: pkg remove <nombre>', 'warn'); return; }
      removePackage(name, body);
      return;
    }

    if (sub === 'info' || sub === 'show') {
      if (!name) { printLine(body, 'Uso: pkg info <nombre>', 'warn'); return; }
      const p = PACKAGES[name];
      if (!p) { printLine(body, `x Paquete no encontrado: ${escapeHTML(name)}`, 'err'); return; }
      const inst = installedPackages.includes(p.name);
      printLine(body, `:: ${p.name}`, 'accent');
      printLine(body, '');
      printLine(body, `  Descripción:  ${escapeHTML(p.desc)}`, '');
      printLine(body, `  Versión:      v${p.version}`, '');
      printLine(body, `  Tamaño:       ${p.size}`, '');
      printLine(body, `  Estado:       ${inst ? '<span class="ok">INSTALADO</span>' : '<span class="dim">no instalado</span>'}`, '');
      printLine(body, `  Dependencias: ${p.deps.length ? escapeHTML(p.deps.join(', ')) : 'ninguna'}`, '');
      printLine(body, '');
      printLine(body, `  Comandos (${p.commands.length}):`, 'info');
      p.commands.forEach(c => printLine(body, `    · <span class="ok">${escapeHTML(c)}</span>`, ''));
      printLine(body, '');
      if (!inst) printLine(body, `  Instalar: <span class="ok">pkg install ${p.name}</span>`, 'dim');
      return;
    }

    if (sub === 'search' || sub === 'find') {
      const q = name || '';
      if (!q) { printLine(body, 'Uso: pkg search <query>', 'warn'); return; }
      const results = Object.values(PACKAGES).filter(p =>
        p.name.includes(q) || p.desc.toLowerCase().includes(q) ||
        p.commands.some(c => c.includes(q))
      );
      if (!results.length) { printLine(body, `Sin resultados para "${escapeHTML(q)}".`, 'dim'); return; }
      printLine(body, `:: Resultados para "${escapeHTML(q)}"`, 'accent');
      printLine(body, '');
      results.forEach(p => {
        const inst = installedPackages.includes(p.name);
        printLine(body, `  <span class="ok">${p.name}</span> <span class="dim">v${p.version}</span> ${inst ? '<span class="ok">[INSTALADO]</span>' : ''}`);
        printLine(body, `    ${escapeHTML(p.desc)}`, 'dim');
      });
      return;
    }

    if (sub === 'update' || sub === 'upgrade') {
      if (!installedPackages.length) { printLine(body, 'No hay paquetes que actualizar.', 'warn'); return; }
      printLine(body, ':: Actualizando paquetes...', 'accent');
      printLine(body, '');
      for (const n of installedPackages) {
        await animateProgress(body, `Verificando ${n}`, 600);
        printLine(body, `  <span class="ok">✓</span> ${n} <span class="dim">v${PACKAGES[n]?.version || '?'} — ya actualizado</span>`, '');
      }
      printLine(body, '');
      printLine(body, '[OK] Todos los paquetes están al día.', 'ok');
      playSuccess();
      return;
    }

    if (sub === 'help' || sub === '--help' || sub === '-h') {
      printLine(body, ':: GESTOR DE PAQUETES', 'accent');
      printLine(body, '');
      printLine(body, '  pkg                      Lista todos los paquetes');
      printLine(body, '  pkg list                 Igual que arriba');
      printLine(body, '  pkg installed            Solo instalados');
      printLine(body, '  pkg install <name>       Instalar paquete');
      printLine(body, '  pkg remove <name>        Desinstalar paquete');
      printLine(body, '  pkg info <name>          Información detallada');
      printLine(body, '  pkg search <query>       Buscar paquetes');
      printLine(body, '  pkg update               Actualizar todos');
      return;
    }

    printLine(body, `Subcomando desconocido: ${escapeHTML(sub)}`, 'err');
    printLine(body, 'Usa <span class="ok">pkg help</span> para ver los subcomandos.', 'dim');
  }},

  /* ============================================================
     PAQUETE: GAMES
     ============================================================ */

  coin: { desc: 'Lanza una moneda', run: (body, w, args) => {
    const n = Math.min(Math.max(parseInt(args[0], 10) || 1, 1), 10);
    for (let i = 0; i < n; i++) {
      const r = Math.random() > .5 ? 'CARA' : 'SELLO';
      const cls = r === 'CARA' ? 'ok' : 'info';
      printLine(body, `  Lanzamiento #${i + 1}: <span class="${cls}">${r}</span>`);
      playCoin();
    }
  }},

  rps: { desc: 'Piedra papel tijeras', run: (body, w, args) => {
    const opciones = ['piedra', 'papel', 'tijeras'];
    const user = (args[0] || '').toLowerCase();
    if (!opciones.includes(user)) {
      printLine(body, `Uso: rps <piedra|papel|tijeras>`, 'warn');
      return;
    }
    const bot = randomFrom(opciones);
    printLine(body, `  Tú:  <span class="info">${user}</span>`);
    printLine(body, `  Bot: <span class="warn">${bot}</span>`);
    printLine(body, '');
    if (user === bot) {
      printLine(body, '  EMPATE', 'dim');
    } else if (
      (user === 'piedra' && bot === 'tijeras') ||
      (user === 'papel' && bot === 'piedra') ||
      (user === 'tijeras' && bot === 'papel')
    ) {
      printLine(body, '  GANASTE', 'ok glow-pulse');
      userStats.gamesWon++; saveStats();
      playWin();
      unlockAch('winner', 'Ganador');
      userBalance += 10; saveBalance();
    } else {
      printLine(body, '  PERDISTE', 'err shake');
      userStats.gamesLost++; saveStats();
      playLose();
      userBalance = Math.max(0, userBalance - 5); saveBalance();
    }
  }},

  guess: { desc: 'Adivina el número 1-100', run: (body, w, args) => {
    const n = parseInt(args[0], 10);
    if (isNaN(n)) { printLine(body, 'Uso: guess <1-100>', 'warn'); return; }
    if (!w.el._guessTarget) w.el._guessTarget = randInt(1, 100);
    const target = w.el._guessTarget;
    if (n === target) {
      printLine(body, `[OK] ¡ACERTASTE! El número era ${target}.`, 'ok glow-pulse');
      w.el._guessTarget = null;
      userStats.gamesWon++; saveStats();
      userBalance += 50; saveBalance();
      playWin();
      effectConfetti(30);
      unlockAch('gamer', 'Gamer');
      if (userBalance >= 1000) unlockAch('rich', 'Millonario');
    } else if (n < target) {
      printLine(body, `  ${n} es MUY BAJO. Intenta más alto.`, 'warn');
    } else {
      printLine(body, `  ${n} es MUY ALTO. Intenta más bajo.`, 'warn');
    }
  }},

  dice: { desc: 'Dado', run: (body, w, args) => {
    const faces = parseInt(args[0], 10) || 6;
    const r = randInt(1, faces);
    printLine(body, `Tirando dado de ${faces} caras...`, 'dim');
    const line = printLine(body, '', '');
    scrambleText(line, `-> ${r}`, 400);
    playCoin();
  }},

  '8ball': { desc: 'Bola mágica', run: (body, w, args) => {
    const q = args.join(' ') || '(sin pregunta)';
    const a = ['Si, definitivamente.','No lo creo.','Sin duda.','Pregunta otra vez.','No cuentes con eso.','Es seguro.','Muy dudoso.','Las señales apuntan a si.','No.'];
    printLine(body, `Pregunta: ${escapeHTML(q)}`, 'dim');
    const line = printLine(body, '', '');
    scrambleText(line, randomFrom(a), 500);
  }},

  /* ============================================================
     PAQUETE: GAMBLING
     ============================================================ */

  gamble: { desc: 'Apuesta', run: (body, w, args) => {
    const n = parseInt(args[0], 10);
    if (isNaN(n) || n <= 0) { printLine(body, 'Uso: gamble <cantidad>', 'warn'); return; }
    if (n > userBalance) { printLine(body, 'No tienes suficiente saldo.', 'err'); return; }
    const win = Math.random() > .55;
    if (win) {
      userBalance += n; saveBalance();
      userStats.gamblesWon++; saveStats();
      printLine(body, `[+] Ganaste $${n}. Nuevo saldo: <span class="h1">$${userBalance}</span>`, 'ok glow-pulse');
      playWin();
      effectFlash('rgba(61,220,132,.3)');
      unlockAch('gambler', 'Apostador');
      if (userBalance >= 1000) unlockAch('rich', 'Millonario');
    } else {
      userBalance -= n; saveBalance();
      userStats.gamblesLost++; saveStats();
      printLine(body, `[-] Perdiste $${n}. Nuevo saldo: <span class="h1">$${userBalance}</span>`, 'err shake');
      playLose();
      if (userBalance <= 0) unlockAch('poor', 'En bancarrota');
    }
  }},

  /* ============================================================
     PAQUETE: CRYPTO-UTILS
     ============================================================ */

  base64: { desc: 'Codifica/decodifica base64', run: (body, w, args) => {
    const sub = (args[0] || '').toLowerCase();
    const txt = args.slice(1).join(' ');
    if (!txt) { printLine(body, 'Uso: base64 <texto>   |   base64 decode <texto>', 'warn'); return; }
    try {
      if (sub === 'decode') {
        const out = atob(txt);
        printLine(body, `<span class="ok">${escapeHTML(out)}</span>`);
      } else {
        const out = btoa(unescape(encodeURIComponent(txt)));
        printLine(body, `<span class="ok">${escapeHTML(out)}</span>`);
      }
      unlockAch('cryptographer', 'Criptógrafo');
    } catch (e) {
      printLine(body, 'Error al codificar.', 'err');
    }
  }},

  rot13: { desc: 'Cifrado ROT13', run: (body, w, args) => {
    const txt = args.join(' ');
    if (!txt) { printLine(body, 'Uso: rot13 <texto>', 'warn'); return; }
    const out = txt.replace(/[a-zA-Z]/g, c => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
    printLine(body, `<span class="ok">${escapeHTML(out)}</span>`);
    unlockAch('cryptographer', 'Criptógrafo');
  }},

  hash: { desc: 'Hash simulado del texto', run: (body, w, args) => {
    const txt = args.join(' ');
    if (!txt) { printLine(body, 'Uso: hash <texto>', 'warn'); return; }
    let h = 0;
    for (let i = 0; i < txt.length; i++) {
      h = ((h << 5) - h) + txt.charCodeAt(i);
      h |= 0;
    }
    const hex = Math.abs(h).toString(16).padStart(8, '0') + randomHex(56);
    printLine(body, `<span class="ok">${hex}</span>`);
    unlockAch('cryptographer', 'Criptógrafo');
  }},

  password: { desc: 'Genera una contraseña segura', run: (body, w, args) => {
    const n = Math.min(Math.max(parseInt(args[0], 10) || 16, 8), 64);
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}';
    let pw = '';
    for (let i = 0; i < n; i++) pw += charset[randInt(0, charset.length - 1)];
    printLine(body, ':: PASSWORD GENERADA', 'accent');
    printLine(body, '');
    printLine(body, `  <span class="h1">${escapeHTML(pw)}</span>`, 'ok neon');
    printLine(body, '');
    printLine(body, `  Longitud: ${n} · Fuerza: ${n >= 16 ? 'Muy fuerte' : n >= 12 ? 'Fuerte' : 'Media'}`, 'dim');
    unlockAch('cryptographer', 'Criptógrafo');
  }},

  uuid: { desc: 'Genera un UUID v4', run: (body) => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    printLine(body, `<span class="ok">${uuid}</span>`);
  }},

  pick: { desc: 'Elige uno al azar', run: (body, w, args) => {
    if (!args.length) { printLine(body, 'Uso: pick <a> <b> <c> ...', 'warn'); return; }
    const elegido = randomFrom(args);
    printLine(body, `<span class="h1">${escapeHTML(elegido)}</span>`, 'ok glow-pulse');
    playCoin();
  }},

  /* ============================================================
     PAQUETE: FUN
     ============================================================ */

  quote: { desc: 'Frase célebre', run: (body) => {
    const quotes = [
      'La única forma de hacer un gran trabajo es amar lo que haces. — Steve Jobs',
      'El éxito es la suma de pequeños esfuerzos repetidos día tras día. — R. Collier',
      'No cuentes los días, haz que los días cuenten. — Muhammad Ali',
      'La mejor forma de predecir el futuro es crearlo. — Peter Drucker',
      'Primero resuelve el problema. Luego escribe el código. — John Johnson',
      'La simplicidad es la máxima sofisticación. — Leonardo da Vinci',
      'Cualquier tecnología suficientemente avanzada es indistinguible de la magia. — A. Clarke',
    ];
    printLine(body, ':: QUOTE', 'accent');
    printLine(body, '');
    printLine(body, `  "${escapeHTML(randomFrom(quotes))}"`, 'info');
    unlockAch('philosopher', 'Filósofo');
  }},

  joke: { desc: 'Chiste aleatorio', run: (body) => {
    const jokes = [
      '¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs.',
      'Un byte entra a un bar. El barman le dice: "¿Qué va a tomar?" — "Un bit".',
      'Hay 10 tipos de personas: las que entienden binario y las que no.',
      '¿Cuántos programadores hacen falta para cambiar una bombilla? Ninguno, eso es problema de hardware.',
      '¿Qué le dijo un bit a otro? Nos vemos en la próxima generación.',
      'Un SQL entra a un bar, se acerca a dos mesas y pregunta: "¿Puedo unirme?"',
      'Programa: máquina que convierte café en bugs.',
      'Yo no tengo problemas de memoria. Tengo problemas de RAM.',
    ];
    printLine(body, ':: JOKE', 'accent');
    printLine(body, '');
    printLine(body, `  ${escapeHTML(randomFrom(jokes))}`, 'info');
  }},

  fact: { desc: 'Dato curioso', run: (body) => {
    const facts = [
      'El primer bug fue una polilla real atrapada en un relé de Harvard Mark II (1947).',
      'La primera programadora fue Ada Lovelace, hija de Lord Byron (1843).',
      'El código más antiguo aún en uso es COBOL, de 1959.',
      'Linux empezó como un hobby de Linus Torvalds en 1991.',
      'JavaScript se creó en solo 10 días.',
      'Python se llama así por Monty Python, no por la serpiente.',
      'El código del Apolo 11 tenía solo 145,000 líneas.',
      'La primera web sigue online: info.cern.ch',
      'El 90% del código del mundo es COBOL.',
      'Las primeras computadoras pesaban más de 27 toneladas.',
    ];
    printLine(body, ':: DATO CURIOSO', 'accent');
    printLine(body, '');
    printLine(body, `  ${escapeHTML(randomFrom(facts))}`, 'info');
  }},

  meme: { desc: 'Meme random', run: (body) => {
    const memes = [
      '( ͡° ͜ʖ ͡°)  Cuando el código compila a la primera.',
      '▄︻̷̿┻̿═━一  Legado.',
      '(╯°□°）╯︵ ┻━┻  Cuando el CSS no funciona.',
      '┬─┬ノ( º _ ºノ)  Lo arreglé.',
      '( ˘ ³˘)♥  El bug no existe si no lo buscas.',
      'ʕ•ᴥ•ʔ  Ok.',
      '(づ｡◕‿‿◕｡)づ  Necesitas abrazos.',
    ];
    printLine(body, randomFrom(memes), 'ok');
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
    unlockAch('cow', 'Vaca filósofa');
  }},

  fortune: { desc: 'Frase', run: (body) => {
    const f = ['El que madruga, encuentra todo cerrado.', 'No es un bug, es una feature.', 'Si funciona, no lo toques.', 'La simplicidad es la máxima sofisticación.'];
    printLine(body, `"${escapeHTML(randomFrom(f))}"`, 'info');
    unlockAch('fortune', 'Sabio');
  }},

  random: { desc: 'Dato random', run: (body) => {
    const f = ['El primer bug fue una polilla en 1947.','JavaScript se hizo en 10 días.','Python se llama por Monty Python.','Linux empezó como hobby de Linus en 1991.'];
    printLine(body, `  ${escapeHTML(randomFrom(f))}`, 'info');
  }},

  /* ============================================================
     PAQUETE: NET-TOOLS
     ============================================================ */

  ping: { desc: 'Ping', run: async (body, w, args) => {
    const host = (args[0] || 'muncixop.github.io').toLowerCase();
    printLine(body, `PING ${escapeHTML(host)}`, 'accent');
    for (let i = 0; i < 4; i++) {
      await sleep(500);
      printLine(body, `64 bytes: icmp_seq=${i + 1} time=${(Math.random() * 30 + 8).toFixed(1)} ms`, 'ok');
    }
    unlockAch('pinger', 'Ping Master');
  }},

  trace: { desc: 'Trace', run: async (body, w, args) => {
    const host = (args[0] || 'void.systems').toLowerCase();
    printLine(body, `traceroute a ${escapeHTML(host)}`, 'accent');
    const hops = ['192.168.1.1','10.0.0.1','172.16.0.1','209.85.252.1','142.250.185.14','185.199.108.153'];
    for (let i = 0; i < hops.length; i++) {
      await sleep(200);
      printLine(body, `  ${padStart(i + 1, 2)}  ${padEnd(hops[i], 18)}${(Math.random() * 40 + 5).toFixed(2)} ms`, 'mono-dim');
    }
    unlockAch('tracer', 'Rastreador');
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
    unlockAch('nmap', 'Puertos Abiertos');
  }},

  scan: { desc: 'Scan', run: async (body) => {
    printLine(body, ':: ESCANEO DE RED', 'accent');
    await animateProgress(body, 'Escaneando', 1500);
    const hosts = [
      { ip: '192.168.1.1', mac: 'A4:2B:B0:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'router', port: '80,443' },
      { ip: '192.168.1.14', mac: 'F0:18:98:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'macbook', port: '22,5900' },
      { ip: '192.168.1.31', mac: 'D8:BB:C1:' + randomHex(2) + ':' + randomHex(2) + ':' + randomHex(2), name: 'iphone', port: '62078' },
    ];
    for (const h of hosts) {
      await sleep(200);
      printLine(body, `  ${padEnd(h.ip, 16)}${padEnd(h.mac, 20)}${padEnd(h.name, 12)}${h.port}`);
      playTick(700);
    }
    printLine(body, '[OK] ' + hosts.length + ' hosts detectados.', 'ok');
    unlockAch('scanner', 'Escaneo completo');
  }},

  curl: { desc: 'Curl', run: async (body, w, args) => {
    const url = args[0] || 'https://muncixop.github.io';
    printLine(body, `curl ${escapeHTML(url)}`, 'accent');
    await sleep(400);
    printLine(body, 'HTTP/2 200', 'ok');
    printLine(body, 'server: GitHub.com', '');
    printLine(body, '<!DOCTYPE html>...', 'mono-dim');
    unlockAch('curler', 'HTTP Client');
  }},

  /* ============================================================
     PAQUETE: SYS-TOOLS
     ============================================================ */

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

  /* ============================================================
     PAQUETE: EFFECTS
     ============================================================ */

  confetti: { desc: 'Confetti', run: (body) => {
    effectConfetti(80);
    playSuccess();
    haptic([20, 30, 20, 30, 60]);
    printLine(body, '[OK] Confetti!', 'ok');
    unlockAch('confetti', 'Fiestero');
  }},

  glitch: { desc: 'Glitch', run: (body, win) => {
    document.body.classList.add('mx-hit');
    win.el.classList.add('corrupt-shake');
    playGlitch();
    effectGlitchSlice();
    effectQuake();
    printLine(body, '[!] SOBRECARGA...', 'err shake');
    setTimeout(() => {
      document.body.classList.remove('mx-hit');
      win.el.classList.remove('corrupt-shake');
      printLine(body, '[OK] Estabilizado.', 'ok');
    }, 900);
    unlockAch('glitch', 'Glitch Master');
  }},

  hypnotize: { desc: 'Hypno', run: (body) => {
    document.body.classList.add('hypnotize');
    printLine(body, '[!] MIRAME...', 'warn pulse');
    playBeep(300, .5);
    setTimeout(() => { document.body.classList.remove('hypnotize'); printLine(body, '[OK] Despierta.', 'ok'); }, 4000);
  }},

  flash: { desc: 'Flash', run: (body) => { effectFlash(); playBeep(1200, .05); printLine(body, '[!] Flash!', 'warn'); }},
  quake: { desc: 'Quake', run: (body) => { effectQuake(); printLine(body, '[!] TERREMOTO', 'err shake'); unlockAch('quake', 'Terremoto'); }},

  rainbow: { desc: 'Texto arcoíris', run: (body, w, args) => {
    const text = args.join(' ') || 'MUNCIXOP';
    const line = printLine(body, '', '');
    line.classList.add('rainbow-text');
    line.textContent = text;
    unlockAch('rainbow', 'Arcoíris');
  }},

  scramble: { desc: 'Scramble', run: async (body, w, args) => {
    const text = args.join(' ') || 'VOID SYSTEMS';
    const line = printLine(body, '', 'accent');
    scrambleText(line, text, 800);
    playGlitch();
  }},

  type: { desc: 'Typewriter', run: async (body, w, args) => {
    const text = args.join(' ') || 'Hola mundo desde VOID SYSTEMS';
    const line = printLine(body, '', 'accent');
    for (let i = 0; i < text.length; i++) {
      line.textContent += text[i];
      if (i % 3 === 0) playTick(600 + Math.random() * 300);
      await sleep(40);
    }
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

  countdown: { desc: 'Cuenta atrás', run: async (body, w, args) => {
    let n = Math.min(Math.max(parseInt(args[0], 10) || 5, 1), 20);
    for (let i = n; i > 0; i--) {
      const el = printLine(body, `  ${i}...`, 'accent');
      if (i <= 3) el.classList.add('pulse');
      playBeep(400 + i * 60, .15);
      haptic(20);
      await sleep(500);
    }
    printLine(body, '  DESPEGUE!', 'ok glow-pulse');
    effectConfetti(30);
    playPowerUp();
  }},

  /* ============================================================
     PAQUETE: ASCII-ART
     ============================================================ */

  ascii: { desc: 'Banner ASCII con neón', run: async (body, w, args) => {
    const rawText = args.join(' ') || 'VOID';
    const text = rawText.toUpperCase().slice(0, 16);
    if (!text.trim()) { printLine(body, 'Uso: ascii <texto>', 'warn'); return; }
    const F = {
      'A':[' ▄▄▄ ','█   █','█████','█   █','█   █'],
      'B':['████ ','█   █','████ ','█   █','████ '],
      'C':[' ▄▄▄▄','█    ','█    ','█    ',' ▀▀▀▀'],
      'D':['████ ','█   █','█   █','█   █','████ '],
      'E':['█████','█    ','███  ','█    ','█████'],
      'F':['█████','█    ','███  ','█    ','█    '],
      'G':[' ▄▄▄▄','█    ','█  ██','█   █',' ▀▀▀▀'],
      'H':['█   █','█   █','█████','█   █','█   █'],
      'I':['███  ',' █   ',' █   ',' █   ','███  '],
      'J':['  ███','   █ ','   █ ','█  █ ',' ▀▀  '],
      'K':['█   █','█  █ ','███  ','█  █ ','█   █'],
      'L':['█    ','█    ','█    ','█    ','█████'],
      'M':['█▄ ▄█','█ █ █','█ █ █','█   █','█   █'],
      'N':['█▄  █','█ █ █','█  ██','█   █','█   █'],
      'O':[' ▄▄▄ ','█   █','█   █','█   █',' ▀▀▀ '],
      'P':['████ ','█   █','████ ','█    ','█    '],
      'Q':[' ▄▄▄ ','█   █','█   █','█  ██',' ▀▀██'],
      'R':['████ ','█   █','████ ','█ █  ','█  █ '],
      'S':[' ▄▄▄▄','█    ',' ▀▀▀▄','    █',' ▀▀▀▀'],
      'T':['█████','  █  ','  █  ','  █  ','  █  '],
      'U':['█   █','█   █','█   █','█   █',' ▀▀▀ '],
      'V':['█   █','█   █','█   █',' █ █ ','  █  '],
      'W':['█   █','█   █','█ █ █','█ █ █',' ▀ ▀ '],
      'X':['█   █',' █ █ ','  █  ',' █ █ ','█   █'],
      'Y':['█   █',' █ █ ','  █  ','  █  ','  █  '],
      'Z':['█████','   █ ','  █  ',' █   ','█████'],
      '0':[' ▄▄▄ ','█  ██','█ █ █','██  █',' ▀▀▀ '],
      '1':[' ██  ','█ █  ','  █  ','  █  ','█████'],
      '2':[' ▄▄▄ ','█   █','  ▄▀ ',' ▄▀  ','█████'],
      '3':['████ ','    █',' ███ ','    █','████ '],
      '4':['█   █','█   █','█████','    █','    █'],
      '5':['█████','█    ','████ ','    █','████ '],
      '6':[' ▄▄▄ ','█    ','████ ','█   █',' ▀▀▀ '],
      '7':['█████','   █ ','  █  ',' █   ',' █   '],
      '8':[' ▄▄▄ ','█   █',' ███ ','█   █',' ▀▀▀ '],
      '9':[' ▄▄▄ ','█   █',' ▀▀▀█','    █',' ▀▀▀ '],
      '!':[' █   ',' █   ',' █   ','     ',' █   '],
      '?':[' ▄▄▄ ','█   █','  ▄▀ ','     ','  █  '],
      '.':['     ','     ','     ','     ',' █   '],
      ',':['     ','     ','     ',' █   ','█    '],
      '-':['     ','     ','█████','     ','     '],
      '_':['     ','     ','     ','     ','█████'],
      '+':['     ','  █  ','█████','  █  ','     '],
      '=':['     ','█████','     ','█████','     '],
      ':':['     ',' █   ','     ',' █   ','     '],
      '/':['    █','   █ ','  █  ',' █   ','█    '],
      '*':['     ','█ █ █',' ███ ','█ █ █','     '],
      '@':[' ▄▄▄ ','█ ███','█  █ ','█    ',' ▀▀▀ '],
      '#':['█ █ █','█████','█ █ █','█████','█ █ █'],
      '$':[' ▄█▄ ','█ █  ',' ███ ','  █ █',' ▀█▀ '],
      '%':['█   █','   █ ','  █  ',' █   ','█   █'],
      '(':['  █  ',' █   ',' █   ',' █   ','  █  '],
      ')':['  █  ','   █ ','   █ ','   █ ','  █  '],
      ' ':['     ','     ','     ','     ','     ']
    };
    const ROWS = 5, GAP = ' ';
    const cs = getComputedStyle(document.body);
    const rgb1 = (cs.getPropertyValue('--accent-rgb').trim() || '61,220,132').split(',').map(n => parseInt(n.trim(), 10));
    const rgb2 = (cs.getPropertyValue('--accent-2-rgb').trim() || '94,170,255').split(',').map(n => parseInt(n.trim(), 10));

    const lines = [];
    for (let row = 0; row < ROWS; row++) {
      let l = '';
      for (let i = 0; i < text.length; i++) {
        const glyph = F[text[i]] || F['?'];
        l += glyph[row];
        if (i < text.length - 1) l += GAP;
      }
      lines.push(l);
    }
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:inline-block;margin:12px 0 8px;padding:12px 18px;background:rgba(var(--accent-rgb),.03);border:1px solid rgba(var(--accent-rgb),.15);border-radius:8px;white-space:pre;font-weight:700;line-height:1.05;font-family:inherit;box-shadow:0 0 40px rgba(var(--accent-rgb),.06) inset;overflow-x:auto;max-width:100%;';
    body.appendChild(wrapper);
    if (currentInputLineRef && currentInputLineRef.parentNode === body) body.appendChild(currentInputLineRef);
    body.scrollTop = body.scrollHeight;

    for (let i = 0; i < lines.length; i++) {
      const t = i / (lines.length - 1);
      const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * t);
      const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * t);
      const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * t);
      const el = document.createElement('div');
      el.style.color = `rgb(${r},${g},${b})`;
      el.style.textShadow = `0 0 8px rgba(${r},${g},${b},.55), 0 0 18px rgba(${r},${g},${b},.28)`;
      el.textContent = lines[i];
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity .4s ease, transform .4s ease';
      wrapper.appendChild(el);
      void el.offsetHeight;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      if (currentInputLineRef && currentInputLineRef.parentNode === body) body.appendChild(currentInputLineRef);
      body.scrollTop = body.scrollHeight;
      playTick(380 + i * 90);
      await sleep(65);
    }
    playSuccess();
    haptic([10, 30, 10]);
    unlockAch('ascii_artist', 'ASCII Artist');
  }},

  /* ============================================================
     PAQUETE: SECURITY
     ============================================================ */

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

  /* ============================================================
     SISTEMA — Siempre disponibles
     ============================================================ */

  fastfetch: { desc: 'Sistema', run: (body) => {
    const eye = getEye();
    const uptime = Math.floor(performance.now() / 1000);
    eye.forEach(line => printLine(body, `<span class="eye">${escapeHTML(line)}</span>`, 'eye'));
    printLine(body, '', '');
    printLine(body, `  <span class="ok">muncixop</span><span class="dim">@</span><span class="ok">void</span>`, '');
    printLine(body, '  ' + '-'.repeat(30), 'dim');
    const info = [
      ['OS', 'VOID SYSTEMS v9.0'],
      ['Host', 'muncixop.github.io'],
      ['Kernel', 'glitch-6.6.6'],
      ['Shell', 'voidsh 9.0'],
      ['Uptime', uptime + 's'],
      ['CPU', 'Void Core (64)'],
      ['GPU', 'Phantom Renderer'],
      ['RAM', (40 + Math.random() * 10).toFixed(1) + 'GB / 128GB'],
      ['Paquetes', installedPackages.length + '/' + Object.keys(PACKAGES).length],
      ['Logros', Object.keys(achievements).length + '/' + Object.keys(ACHIEVEMENTS_LIST).length],
    ];
    info.forEach(([k, v]) => printLine(body, `  <span class="ok">${padEnd(k, 10)}</span><span class="info">${escapeHTML(v)}</span>`, ''));
    setTimeout(() => blinkEye(body), 1200);
    unlockAch('first_fetch', 'El ojo te vio');
  }},
  neofetch: { desc: 'Alias', run: (body, w, a) => COMMANDS.fastfetch.run(body, w, a) },

  theme: { desc: 'Tema', run: (body, w, args) => {
    const valid = ['green','red','blue','purple','amber','cyan','pink','mono','rainbow'];
    const t = (args[0] || '').toLowerCase();
    if (!valid.includes(t)) { printLine(body, `Uso: theme <${valid.join('|')}>`, 'warn'); return; }
    document.body.className = document.body.className.replace(/\btheme-\w+/g, '').trim();
    if (t !== 'green') document.body.classList.add('theme-' + t);
    printLine(body, `[OK] Tema: ${t}`, 'ok');
    playSuccess();
    unlockAch('themer', 'Estilista');
    if (t === 'rainbow') unlockAch('rainbow', 'Arcoíris');
  }},

  cyberpunk: { desc: 'Cyberpunk', run: (body) => {
    document.body.classList.toggle('cyberpunk');
    const on = document.body.classList.contains('cyberpunk');
    printLine(body, on ? '[!] CYBERPUNK ON' : '[OK] OFF', on ? 'err glow-pulse' : 'ok');
    playGlitch();
    effectGlitchSlice();
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
    userSettings.audioEnabled = audioEnabled;
    saveSettings();
    printLine(body, audioEnabled ? '[ON]' : '[OFF]', audioEnabled ? 'ok' : 'warn');
  }},

  matrix: { desc: 'Matrix', run: (body) => {
    matrixActive = !matrixActive;
    userSettings.matrixActive = matrixActive;
    saveSettings();
    printLine(body, matrixActive ? '[OK] Matrix ON' : '[!] OFF', matrixActive ? 'ok' : 'warn');
  }},

  history: { desc: 'History', run: (body) => {
    if (!cmdHistory.length) { printLine(body, 'Vacio.', 'dim'); return; }
    printLine(body, ':: HISTORIAL', 'accent');
    cmdHistory.slice(-30).forEach((c, i) => printLine(body, `  ${padStart(i + 1, 4)}  ${escapeHTML(c)}`, 'mono-dim'));
  }},

  achievements: { desc: 'Logros', run: (body) => {
    const list = Object.entries(ACHIEVEMENTS_LIST);
    printLine(body, ':: LOGROS', 'accent');
    printLine(body, '');
    list.forEach(([key, name]) => {
      const unlocked = !!achievements[key];
      const icon = unlocked ? '<span class="ok">[+]</span>' : '<span class="dim">[ ]</span>';
      const cls = unlocked ? 'ok' : 'dim';
      printLine(body, `  ${icon} <span class="${cls}">${escapeHTML(name)}</span>`);
    });
    printLine(body, '');
    printLine(body, `  ${Object.keys(achievements).length}/${list.length} desbloqueados`, 'dim');
  }},

  whoami: { desc: 'Whoami', run: (body) => { printLine(body, 'muncixop', 'ok'); printLine(body, 'Creative Developer & UI Engineer.', 'dim'); }},
  date: { desc: 'Date', run: (body) => printLine(body, new Date().toString(), 'info') },
  clear: { desc: 'Clear', run: (body) => { body.innerHTML = ''; }},

  reset: { desc: 'Reset tokens', run: (body) => {
    unlockedLinks = {}; saveUnlocked();
    userStats.linksUnlocked = 0; saveStats();
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

  sudo: { desc: 'Escalar privilegios', run: (body, win, args) => {
    if (args.length > 0) {
      printLine(body, '[sudo] no puedes pasar la password como argumento.', 'warn');
      return;
    }
    printLine(body, '[sudo] password for muncixop:', 'warn');
    if (window._enterPasswordMode) {
      window._enterPasswordMode((password) => {
        const checkLine = printLine(body, '', 'dim');
        checkLine.textContent = 'Verificando credenciales...';
        setTimeout(() => {
          checkLine.remove();
          if (!password || password.length < 1) {
            printLine(body, 'sudo: se requiere una contraseña', 'err');
            playError();
            return;
          }
          printLine(body, `sudo: 3 intentos fallidos. Cuenta bloqueada temporalmente.`, 'err');
          printLine(body, 'Nice try. Pero no.', 'err shake');
          playError();
          effectQuake();
          unlockAch('sudo_fail', 'Intento de sudo');
        }, 900);
      });
    } else {
      setTimeout(() => {
        printLine(body, 'Nice try. Pero no.', 'err');
        effectQuake();
      }, 800);
    }
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

  if (!isReboot) playBoot();
  else playPowerUp();

  const bootLines = [
    ['VOID BIOS v9.0 - Inicializando...', 'dim', 100],
    ['  [OK] CPU Void Core x64 @ 3.20GHz', 'ok', 80],
    ['  [OK] Memoria ECC 128GB', 'ok', 80],
    ['  [OK] GPU Phantom Renderer', 'ok', 70],
    ['  [OK] Red local activa', 'ok', 70],
    ['  [OK] Asistencias moviles cargadas', 'ok', 60],
    ['  [OK] Sistema de guardado listo', 'ok', 60],
    ['  [OK] Gestor de paquetes v2.0', 'ok', 60],
    ['', '', 60],
    ['Cargando VOID SYSTEMS v9.0...', 'info', 200],
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
    ['  Bienvenido a VOID SYSTEMS v9.0, muncixop.', 'accent'],
    ['  Escribe <span class="ok">help</span> para ver los comandos.', 'dim'],
    ['  Prueba <span class="ok">pkg list</span> para ver los paquetes.', 'dim'],
    ['', ''],
  ]);
  await sleep(200);

  startInput(term);
}

/* ============================================================
   INPUT LOOP
   ============================================================ */
let currentTerm = null;
let currentInputLineRef = null;
let globalKeydownInstalled = false;
let comboCount = 0;
let comboTimeout = null;
let idleTimer = null;
let idleZzz = null;

function startInput(term) {
  currentTerm = term;
  const body = term.body;

  let currentLine = null;
  let typed = '';
  let histIdx = cmdHistory.length;
  let suggestBox = null;
  let suggestItems = [];
  let suggestIdx = 0;
  let passwordMode = false;

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
      if (!passwordMode) updateSuggest();
      if (currentLine.classList.contains('idle')) currentLine.classList.remove('idle');
      resetIdleTimer();
      body.scrollTop = body.scrollHeight;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (passwordMode) {
          const val = input.value;
          passwordMode = false;
          input.type = 'text';
          input.value = '';
          const pr = currentLine.querySelector('.pr');
          if (pr) pr.innerHTML = `${PROMPT_USER}@${PROMPT_HOST}:<span class="path">${PROMPT_PATH}</span>$&nbsp;`;
          typed = '';
          if (typeof window._currentPasswordCallback === 'function') {
            const cb = window._currentPasswordCallback;
            window._currentPasswordCallback = null;
            cb(val);
          }
          return;
        }
        submit();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (passwordMode) return;
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
        if (passwordMode) return;
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
        if (passwordMode) return;
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
        comboCount++;
        if (comboTimeout) clearTimeout(comboTimeout);
        comboTimeout = setTimeout(() => { comboCount = 0; hideCombo(); }, 1500);
        if (comboCount >= 15) showCombo(comboCount);
        if (comboCount >= 50) unlockAch('combo_king', 'Combo King');
        if (comboCount >= 20 && !document.body.classList.contains('matrix-boost')) {
          document.body.classList.add('matrix-boost');
          setTimeout(() => document.body.classList.remove('matrix-boost'), 800);
        }
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

  const showCombo = (n) => {
    let el = document.querySelector('.combo-counter');
    if (!el) {
      el = document.createElement('div');
      el.className = 'combo-counter';
      document.body.appendChild(el);
    }
    el.textContent = `COMBO x${n}`;
    el.classList.add('on', 'big');
    setTimeout(() => el.classList.remove('big'), 300);
  };
  const hideCombo = () => {
    const el = document.querySelector('.combo-counter');
    if (el) el.classList.remove('on');
  };

  const resetIdleTimer = () => {
    if (idleTimer) clearTimeout(idleTimer);
    if (idleZzz) idleZzz.classList.remove('on');
    idleTimer = setTimeout(() => {
      if (currentLine && typed === '' && !passwordMode) {
        if (!idleZzz) {
          idleZzz = document.createElement('div');
          idleZzz.className = 'idle-zzz';
          document.body.appendChild(idleZzz);
        }
        idleZzz.classList.add('on');
      }
    }, 15000);
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

    if (!cmd) {
      input.value = '';
      body.scrollTop = body.scrollHeight;
      return;
    }

    const cmdLine = document.createElement('div');
    cmdLine.className = 'out cmd';
    cmdLine.innerHTML = getPromptHTML() + escapeHTML(cmd);
    currentLine.replaceWith(cmdLine);
    currentLine = null;
    currentInputLineRef = null;

    cmdHistory.push(cmd);
    saveHistory();
    histIdx = cmdHistory.length;
    playEnter();
    haptic(10);

    userStats.commandsUsed++;
    const cmdName = cmd.split(/\s+/)[0].toLowerCase();
    if (!userStats.uniqueCommands.includes(cmdName)) {
      userStats.uniqueCommands.push(cmdName);
      if (userStats.uniqueCommands.length >= 30) unlockAch('explorer', 'Explorador');
      if (userStats.uniqueCommands.length >= 50) unlockAch('perfectionist', 'Perfeccionista');
    }
    userStats.lastCommand = cmd;
    saveStats();

    runCommand(cmd, body, term);

    createInputLine();
    body.scrollTop = body.scrollHeight;
  };

  window._submitCurrent = submit;
  window._getCurrentInput = () => {
    if (!currentInputLineRef) return null;
    return currentInputLineRef.querySelector('.ki');
  };

  window._enterPasswordMode = (cb) => {
    if (!currentLine) createInputLine();
    const input = currentLine.querySelector('.ki');
    const pr = currentLine.querySelector('.pr');
    passwordMode = true;
    window._currentPasswordCallback = cb;
    input.value = '';
    input.type = 'password';
    input.focus();
    if (pr) pr.innerHTML = `<span style="color:#ffcc00;font-weight:700">[sudo] password:</span>&nbsp;`;
    currentLine.classList.remove('idle');
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
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
      } else if (action === 'up') {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true }));
      } else if (action === 'down') {
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
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
   RUN COMMAND — con validación de paquetes
   ============================================================ */
function runCommand(input, body, win) {
  const parts = input.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const command = COMMANDS[cmd];
  if (!command) {
    const pkg = findPackageForCommand(cmd);
    if (pkg) {
      const installed = installedPackages.includes(pkg.name);
      if (!installed) {
        printLine(body, `x Comando no disponible: <span class="warn">${escapeHTML(cmd)}</span>`, 'err');
        printLine(body, `  Este comando pertenece al paquete "${pkg.name}".`, 'dim');
        printLine(body, `  Instálalo con: <span class="ok">pkg install ${pkg.name}</span>`, 'info');
        printLine(body, '');
        playError();
        effectGlitchSlice();
        return;
      }
    }
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
   EVENTOS AUTOMÁTICOS
   ============================================================ */
function checkTimeAchievements() {
  const h = new Date().getHours();
  if (h >= 0 && h < 5) unlockAch('night_owl', 'Búho nocturno');
  if (h >= 5 && h < 7) unlockAch('early_bird', 'Madrugador');
}

function randomGlitch() {
  if (!userSettings.glitchesAuto) return;
  if (reducedMotion) return;
  if (Math.random() > 0.15) return;
  effectGlitchSlice();
  playGlitch();
}

function randomIntrusion() {
  if (!userSettings.glitchesAuto) return;
  if (Math.random() > 0.03) return;
  effectIntrusion();
  effectFlash('rgba(255,69,58,.2)');
  playError();
  const toast = document.createElement('div');
  toast.className = 'ach-toast';
  toast.style.borderColor = 'rgba(255,69,58,.5)';
  toast.innerHTML = `
    <div class="ach-title" style="color:#ff453a">⚠ INTRUSIÓN DETECTADA</div>
    <div class="ach-desc">Firewall ha bloqueado un intento de acceso.</div>
    <div class="ach-meta">${new Date().toLocaleTimeString()}</div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'achIn .4s reverse forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3400);
  unlockAch('hacker_elite', 'Hacker Élite');
}

/* ============================================================
   GLOBAL EVENTS
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(bootSequence, 300);
  setTimeout(initMobileAssists, 200);
  checkTimeAchievements();
  setInterval(randomGlitch, 25000);
  setInterval(randomIntrusion, 120000);
  setInterval(() => { userStats.totalTime = Date.now() - userStats.sessionStart; saveStats(); }, 30000);
});

window.addEventListener('beforeunload', () => {
  userStats.totalTime = Date.now() - userStats.sessionStart;
  saveStats();
  saveHistory();
  saveNotes();
  saveBalance();
  saveSettings();
  savePackages();
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
      unlockAch('konami', 'Código Konami');
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

console.log('%c VOID SYSTEMS v9.0 ', 'background:#3ddc84;color:#000;font-weight:bold;padding:4px 8px;border-radius:4px;font-size:14px');
console.log('%c Bienvenido, muncixop. ', 'color:#3ddc84;font-weight:bold;font-size:12px');
console.log('%c v9.0: RAF drag, storage migrado, packages v2, todo mejorado ', 'color:#5eaaff;font-style:italic');
