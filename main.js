/* ============================================================
   VOID SYSTEMS — Terminal / OS Simulator
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

/* ---------- AUDIO ENGINE ---------- */
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
    o2.detune.value = Math.random() * 50 - 25;
    g.gain.setValueAtTime(.02, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .03);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .03); o2.start(t); o2.stop(t + .03);
    const n = a.createBufferSource(), ng = a.createGain();
    n.buffer = noiseBuf(a, .02); ng.gain.setValueAtTime(.012, t);
    ng.gain.exponentialRampToValueAtTime(.001, t + .02);
    n.connect(ng); ng.connect(a.destination); n.start(t); n.stop(t + .02);
  } catch (e) {}
}
function playEnter() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain();
    o1.type = 'square'; o1.frequency.setValueAtTime(400, t);
    o1.frequency.exponentialRampToValueAtTime(1600, t + .06);
    o2.type = 'sawtooth'; o2.frequency.setValueAtTime(800, t);
    o2.frequency.exponentialRampToValueAtTime(200, t + .08);
    g.gain.setValueAtTime(.05, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .1);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .1); o2.start(t); o2.stop(t + .1);
  } catch (e) {}
}
function playError() {
  if (!audioEnabled) return;
  try {
    const a = audio(), t = a.currentTime;
    const o1 = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain();
    o1.type = 'sawtooth'; o1.frequency.setValueAtTime(300, t);
    o1.frequency.exponentialRampToValueAtTime(60, t + .3);
    o2.type = 'square'; o2.frequency.setValueAtTime(150, t);
    o2.frequency.exponentialRampToValueAtTime(30, t + .25);
    g.gain.setValueAtTime(.08, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .35);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .35); o2.start(t); o2.stop(t + .35);
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
    o.type = 'sawtooth'; o.frequency.setValueAtTime(2000, t);
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
    o1.type = 'sine'; o1.frequency.setValueAtTime(110, t);
    o1.frequency.exponentialRampToValueAtTime(440, t + .4);
    o2.type = 'square'; o2.frequency.setValueAtTime(220, t);
    o2.frequency.exponentialRampToValueAtTime(880, t + .3);
    g.gain.setValueAtTime(.04, t);
    g.gain.exponentialRampToValueAtTime(.001, t + .5);
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(t); o1.stop(t + .5); o2.start(t); o2.stop(t + .5);
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
  if (!matrixActive || reducedMotion) { requestAnimationFrame(drawMatrix); return; }
  ctx.fillStyle = 'rgba(6,6,6,0.06)';
  ctx.fillRect(0, 0, W, H);
  ctx.font = fontSize + 'px monospace';
  for (let i = 0; i < drops.length; i++) {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    const y = drops[i] * fontSize;
    ctx.fillStyle = Math.random() > 0.98 ? '#3ddc84' : '#0f0';
    ctx.fillText(ch, i * fontSize, y);
    if (y > H && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}
if (!reducedMotion) drawMatrix();

/* ---------- WINDOW SYSTEM ---------- */
const winsContainer = document.getElementById('wins');
const dock = document.getElementById('dock');
let zIndex = 10;
const openWindows = new Map(); // id -> {el, title, minimized}

function createWindow(title, options = {}) {
  const id = 'w_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  const win = document.createElement('div');
  win.className = 'win';
  win.dataset.id = id;

  const w = options.width || 680;
  const h = options.height || 480;
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

  // Focus
  win.addEventListener('mousedown', () => { win.style.zIndex = ++zIndex; });

  // Buttons
  win.querySelector('.close').addEventListener('click', (e) => {
    e.stopPropagation();
    closeWindow(id);
  });
  win.querySelector('.min').addEventListener('click', (e) => {
    e.stopPropagation();
    minimizeWindow(id);
  });
  win.querySelector('.max').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMaximize(id);
  });

  makeDraggable(win, win.querySelector('.win-bar'));
  makeResizable(win, win.querySelector('.rz'));

  return { id, el: win, body: win.querySelector('.win-body') };
}

function closeWindow(id) {
  const entry = openWindows.get(id);
  if (!entry) return;
  entry.el.style.animation = 'winIn .3s cubic-bezier(.22,1,.36,1) reverse forwards';
  setTimeout(() => {
    entry.el.remove();
    openWindows.delete(id);
    updateDock();
  }, 260);
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

/* ---------- DRAG ---------- */
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

/* ---------- RESIZE ---------- */
function makeResizable(win, handle) {
  let sx, sy, ow, oh, resizing = false;
  const start = (e) => {
    if (win.classList.contains('maximized')) return;
    const p = e.touches ? e.touches[0] : e;
    sx = p.clientX; sy = p.clientY;
    ow = win.offsetWidth; oh = win.offsetHeight;
    resizing = true;
    win.classList.add('resizing');
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
    resizing = false;
    win.classList.remove('resizing');
    document.removeEventListener('mousemove', move);
    document.removeEventListener('touchmove', move);
    document.removeEventListener('mouseup', end);
    document.removeEventListener('touchend', end);
  };
  handle.addEventListener('mousedown', start);
  handle.addEventListener('touchstart', start, { passive: false });
}

/* ---------- ERROR POPUP ---------- */
function showError(title, message) {
  const pop = document.createElement('div');
  pop.className = 'err-pop';
  pop.innerHTML = `
    <h3>${title}</h3>
    <p>${message}</p>
    <button class="err-btn">Entendido</button>
  `;
  document.body.appendChild(pop);
  playError();
  const close = () => { pop.style.animation = 'errIn .3s reverse'; setTimeout(() => pop.remove(), 260); };
  pop.querySelector('.err-btn').addEventListener('click', close);
  setTimeout(() => { if (pop.parentNode) close(); }, 6000);
}

/* ---------- TERMINAL ---------- */
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

/* ---------- COMMANDS ---------- */
const COMMANDS = {
  help: {
    desc: 'Muestra los comandos disponibles',
    run: (body) => {
      printLine(body, '╭─ COMANDOS DISPONIBLES ─────────────────────╮', 'accent');
      const cmds = [
        ['help', 'esta ayuda'],
        ['about', 'información sobre mí'],
        ['projects', 'proyectos destacados'],
        ['skills', 'habilidades técnicas'],
        ['contact', 'formas de contacto'],
        ['social', 'redes sociales'],
        ['neofetch', 'info del sistema'],
        ['whoami', 'quién eres'],
        ['date', 'fecha y hora actual'],
        ['clear', 'limpia la pantalla'],
        ['matrix', 'activa/desactiva fondo Matrix'],
        ['glitch', 'efecto glitch'],
        ['os <mac|win|linux|android|ios>', 'cambia el tema de SO'],
        ['sound', 'activa/desactiva audio'],
        ['sudo', 'prueba suerte'],
        ['exit', 'cierra la ventana'],
      ];
      cmds.forEach(([c, d]) => {
        printLine(body, `  <span class="ok">${c.padEnd(28, ' ')}</span><span class="dim">${d}</span>`);
      });
      printLine(body, '╰────────────────────────────────────────────╯', 'accent');
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
        ['  Escribí <span class="ok">projects</span> o <span class="ok">skills</span> para más info.', 'dim'],
      ]);
    }
  },
  projects: {
    desc: 'Proyectos destacados',
    run: (body) => {
      printLine(body, '🚀 PROYECTOS DESTACADOS', 'accent');
      printLine(body, '');
      printLine(body, '  ⚔️  <span class="h1">Jujutsu Shenanigans Scripting</span>', 'ok');
      printLine(body, '     Sistemas avanzados de combate y mecánicas personalizadas en Roblox.', 'dim');
      printLine(body, '');
      printLine(body, '  🧊  <span class="h1">Blockbench 3D Asset Pipeline</span>', 'ok');
      printLine(body, '     Modelado y rigging de alta fidelidad optimizado para motores gráficos.', 'dim');
      printLine(body, '');
      printLine(body, '  Escribe <span class="ok">contact</span> para colaborar.', 'info');
    }
  },
  skills: {
    desc: 'Habilidades técnicas',
    run: (body) => {
      printLine(body, '⚡ HABILIDADES TÉCNICAS', 'accent');
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
        printLine(body, `  ${name.padEnd(28, ' ')} <span class="ok">${bar}</span> ${pct}%`);
      });
    }
  },
  contact: {
    desc: 'Información de contacto',
    run: (body) => {
      printLine(body, '📬 CONTACTO', 'accent');
      printLine(body, '');
      printLine(body, '  GitHub   <span class="info">github.com/muncixop</span>');
      printLine(body, '  Email    <span class="info">contacto@muncixop.dev</span>');
      printLine(body, '  Discord  <span class="info">muncixop</span>');
      printLine(body, '');
      printLine(body, '  También puedes escribir <span class="ok">social</span>.', 'dim');
    }
  },
  social: {
    desc: 'Redes sociales',
    run: (body) => {
      printLine(body, '🌐 REDES SOCIALES', 'accent');
      printLine(body, '');
      const socials = [
        ['GitHub', 'https://github.com/muncixop'],
        ['Roblox', 'https://www.roblox.com/users/profile'],
        ['YouTube', 'https://youtube.com/@muncixop'],
      ];
      socials.forEach(([name, url]) => {
        const lnk = document.createElement('div');
        lnk.className = 'lnk';
        lnk.innerHTML = `<a href="${url}" target="_blank" rel="noopener"><span class="n">→</span>${name} <span class="dim">(${url})</span></a>`;
        body.appendChild(lnk);
      });
      body.scrollTop = body.scrollHeight;
    }
  },
  neofetch: {
    desc: 'Info del sistema',
    run: (body) => {
      printLines(body, [
        ['       ▄▄▄▄▄▄▄▄▄▄▄       ', 'accent'],
        ['     ▄█████████████▄     ', 'accent'],
        ['   ▄████▀▀▀▀▀▀▀▀████▄   ', 'accent'],
        ['  ████▀  ▄▄▄▄▄▄  ▀████  ', 'accent'],
        ['  ███   ████████   ███  ', 'accent'],
        ['  ███   ████████   ███  ', 'accent'],
        ['  ████▄  ▀▀▀▀▀▀  ▄████  ', 'accent'],
        ['   ▀████▄▄▄▄▄▄▄▄████▀   ', 'accent'],
        ['     ▀█████████████▀     ', 'accent'],
        ['       ▀▀▀▀▀▀▀▀▀▀▀       ', 'accent'],
        ['', ''],
        ['  <span class="ok">OS</span>       VOID SYSTEMS 1.0', ''],
        ['  <span class="ok">Host</span>     muncixop@void', ''],
        ['  <span class="ok">Kernel</span>   glitch-6.6.6', ''],
        ['  <span class="ok">Shell</span>    voidsh 2.0', ''],
        ['  <span class="ok">Uptime</span>   ' + Math.floor(performance.now() / 1000) + 's', ''],
        ['  <span class="ok">Theme</span>    Glitch-Cyberpunk', ''],
        ['  <span class="ok">CPU</span>      Void Core (64) @ 3.20GHz', ''],
        ['  <span class="ok">GPU</span>      Phantom Renderer', ''],
        ['  <span class="ok">RAM</span>      ' + (40 + Math.random() * 10).toFixed(1) + 'GB / 128GB', ''],
      ]);
    }
  },
  whoami: {
    desc: 'Quién eres',
    run: (body) => {
      printLine(body, 'muncixop', 'ok');
      printLine(body, 'Creative Developer & UI Engineer.', 'dim');
    }
  },
  date: {
    desc: 'Fecha actual',
    run: (body) => {
      printLine(body, new Date().toString(), 'info');
    }
  },
  clear: {
    desc: 'Limpia la pantalla',
    run: (body) => {
      body.innerHTML = '';
    }
  },
  matrix: {
    desc: 'Toggle fondo Matrix',
    run: (body) => {
      matrixActive = !matrixActive;
      printLine(body, matrixActive ? '✓ Matrix activado' : '✗ Matrix desactivado', matrixActive ? 'ok' : 'warn');
    }
  },
  glitch: {
    desc: 'Efecto glitch',
    run: (body, win) => {
      document.body.classList.add('mx-hit');
      win.el.classList.add('corrupt-shake');
      playGlitch();
      printLine(body, '⚠ SOBRECARGA DE SEÑAL DETECTADA...', 'err');
      setTimeout(() => {
        document.body.classList.remove('mx-hit');
        win.el.classList.remove('corrupt-shake');
        printLine(body, '✓ Sistema estabilizado.', 'ok');
      }, 700);
    }
  },
  os: {
    desc: 'Cambia el tema',
    run: (body, win, args) => {
      const target = (args[0] || '').toLowerCase();
      const valid = ['mac', 'win', 'linux', 'android', 'ios'];
      if (!target) {
        printLine(body, `Uso: os <${valid.join('|')}>`, 'warn');
        return;
      }
      if (!valid.includes(target)) {
        printLine(body, `SO no válido: ${target}`, 'err');
        return;
      }
      document.body.className = document.body.className.replace(/\bos-\w+/g, '').trim();
      document.body.classList.add('os-' + target);
      printLine(body, `✓ Tema cambiado a: ${target}`, 'ok');
      playSuccess();
    }
  },
  sound: {
    desc: 'Toggle audio',
    run: (body) => {
      audioEnabled = !audioEnabled;
      printLine(body, audioEnabled ? '🔊 Audio activado' : '🔇 Audio desactivado', audioEnabled ? 'ok' : 'warn');
    }
  },
  sudo: {
    desc: 'Intenta escalar privilegios',
    run: (body) => {
      printLine(body, '[sudo] password for muncixop: ', 'warn');
      setTimeout(() => {
        printLine(body, 'Nice try. Pero no. 😏', 'err');
      }, 800);
    }
  },
  exit: {
    desc: 'Cierra la ventana',
    run: (body, win) => {
      printLine(body, 'Cerrando sesión...', 'warn');
      setTimeout(() => closeWindow(win.id), 400);
    }
  },
  echo: {
    desc: 'Repite texto',
    run: (body, win, args) => {
      printLine(body, args.join(' ') || '');
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
        ['  ─── VOID SYSTEMS ───', 'accent'],
      ]);
    }
  }
};

/* ---------- BOOT SEQUENCE ---------- */
async function bootSequence() {
  const term = createWindow('voidsh — ~', { width: 720, height: 520 });
  const body = term.body;
  body.style.minHeight = '100%';

  playBoot();

  const bootLines = [
    ['VOID BIOS v6.6.6 — Inicializando...', 'dim', 120],
    ['  [OK] CPU Void Core x64 @ 3.20GHz', 'ok', 90],
    ['  [OK] Memoria ECC 128GB verificada', 'ok', 90],
    ['  [OK] GPU Phantom Renderer', 'ok', 80],
    ['  [OK] Dispositivos de entrada', 'ok', 70],
    ['', '', 60],
    ['Cargando VOID SYSTEMS 1.0...', 'info', 220],
    ['', '', 100],
  ];

  for (const [text, cls, delay] of bootLines) {
    printLine(body, text, cls);
    await sleep(delay);
  }

  // Banner
  printLines(body, [
    ['  ██████╗ ███████╗███████╗████████╗', 'ok'],
    ['  ██╔══██╗██╔════╝██╔════╝╚══██╔══╝', 'ok'],
    ['  ██████╔╝█████╗  █████╗     ██║   ', 'ok'],
    ['  ██╔══██╗██╔══╝  ██╔══╝     ██║   ', 'ok'],
    ['  ██║  ██║███████╗██║        ██║   ', 'ok'],
    ['  ╚═╝  ╚═╝╚══════╝╚═╝        ╚═╝   ', 'ok'],
    ['', ''],
    ['  Bienvenido a VOID SYSTEMS, muncixop.', 'accent'],
    ['  Escribe <span class="ok">help</span> para ver los comandos disponibles.', 'dim'],
    ['', ''],
  ]);
  await sleep(200);

  startInput(term);
}

/* ---------- INPUT LOOP ---------- */
function startInput(term) {
  const body = term.body;
  let currentLine = null;
  let typed = '';
  let history = [];
  let histIdx = -1;

  const createInputLine = () => {
    if (currentLine) currentLine.remove();
    currentLine = document.createElement('div');
    currentLine.className = 'input-line';
    currentLine.innerHTML = getPromptHTML() +
      '<span class="typed"></span><span class="cur">▊</span>';
    body.appendChild(currentLine);
    body.scrollTop = body.scrollHeight;
  };

  const renderTyped = () => {
    if (!currentLine) return;
    currentLine.querySelector('.typed').textContent = typed;
    body.scrollTop = body.scrollHeight;
  };

  createInputLine();

  // Hidden input for mobile keyboard
  const ki = document.getElementById('ki');
  ki.value = '';
  ki.focus();

  const focusInput = () => { ki.focus(); };

  body.addEventListener('click', focusInput);
  ki.addEventListener('blur', () => setTimeout(focusInput, 50));

  ki.addEventListener('input', () => {
    const val = ki.value;
    if (val.length > typed.length) {
      // Added char
      const added = val.slice(typed.length);
      typed = val;
      playKey();
      // Glitch flash occasionally
      if (Math.random() > 0.85) {
        const t = currentLine.querySelector('.typed');
        t.classList.add('glitch-flash');
        setTimeout(() => t.classList.remove('glitch-flash'), 80);
      }
    } else {
      typed = val;
    }
    renderTyped();
  });

  ki.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = typed.trim();
      ki.value = '';
      typed = '';

      // Replace input line with the command as an out line
      const cmdLine = document.createElement('div');
      cmdLine.className = 'out cmd';
      cmdLine.innerHTML = getPromptHTML() + escapeHTML(cmd);
      currentLine.replaceWith(cmdLine);
      currentLine = null;

      if (cmd) {
        history.push(cmd);
        histIdx = history.length;
        playEnter();
        runCommand(cmd, body, term);
      }

      // Recreate input line
      setTimeout(() => createInputLine(), 10);
      body.scrollTop = body.scrollHeight;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx > 0) {
        histIdx--;
        typed = history[histIdx] || '';
        ki.value = typed;
        renderTyped();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < history.length - 1) {
        histIdx++;
        typed = history[histIdx] || '';
      } else {
        histIdx = history.length;
        typed = '';
      }
      ki.value = typed;
      renderTyped();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = typed.trim();
      if (!partial) return;
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
      if (matches.length === 1) {
        typed = matches[0] + ' ';
        ki.value = typed;
        renderTyped();
      } else if (matches.length > 1) {
        printLine(body, matches.join('  '), 'dim');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      body.innerHTML = '';
      currentLine = null;
      createInputLine();
    }
  });
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
    command.run(body, win, args);
  } catch (e) {
    printLine(body, `Error al ejecutar "${cmd}": ${e.message}`, 'err');
    playError();
  }
}

/* ---------- HELPERS ---------- */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function escapeHTML(s) {
  return s.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/* ---------- GLOBAL KEY HANDLING ---------- */
window.addEventListener('keydown', (e) => {
  // Focus hidden input unless user is typing elsewhere
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
    const ki = document.getElementById('ki');
    if (ki) ki.focus();
  }
});

/* ---------- START ---------- */
window.addEventListener('load', () => {
  setTimeout(bootSequence, 300);
});

// Prevent zoom on double tap
let lastTouch = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouch <= 300) e.preventDefault();
  lastTouch = now;
}, { passive: false });
