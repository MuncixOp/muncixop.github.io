const c = document.getElementById('c');
const x = c.getContext('2d');
let W, H;

function resize() { 
  W = c.width = innerWidth; 
  H = c.height = innerHeight; 
}
resize();
addEventListener('resize', resize);

const chars = 'アイウエオカキクケコ0123456789$#@%&';
const fs = 13;
let cols, drops;

function initMatrix() {
  cols = Math.floor(W / fs);
  drops = Array(cols).fill(1);
}
initMatrix();
addEventListener('resize', initMatrix);

// Animación de matriz fluida optimizada
(function loop() {
  x.fillStyle = 'rgba(5,5,5,.07)';
  x.fillRect(0, 0, W, H);
  x.fillStyle = '#0f0';
  x.font = fs + 'px monospace';
  
  for (let i = 0; i < cols; i++) {
    const char = chars[Math.random() * chars.length | 0];
    x.fillText(char, i * fs, drops[i] * fs);
    if (drops[i] * fs > H && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(loop);
})();

// Secuencia de arranque del sistema (Boot)
const lines = [
  ['dim', '[ 0.000000] BIOS v4.2.1 — VOID SYSTEMS'],
  ['dim', '[ 0.000312] CPU: unknown @ 4.2GHz'],
  ['dim', '[ 0.001044] RAM: 65536MB OK'],
  ['',     '> cargando kernel...'],
  ['',     '> montando /dev/null...'],
  ['ok',   '> acceso concedido ✓'],
  ['warn', '> 3 nodos disponibles:'],
];

const out = document.getElementById('out');
const lnk = document.getElementById('lnk');
const term = document.getElementById('term');

let i = 0;
(function type() {
  if (i >= lines.length) { showLinks(); return; }
  const [cls, txt] = lines[i];
  const el = document.createElement('div');
  el.className = 'out' + (cls ? ' ' + cls : '');
  el.textContent = txt;
  out.appendChild(el);
  i++;
  setTimeout(type, 240 + Math.random() * 180);
})();

function showLinks() {
  const data = [
    ['CURSEFORGE', 'https://www.curseforge.com/members/muncixop/projects'],
    ['X / TWITTER', 'https://x.com/MuncixOp'],
    ['TIKTOK', 'https://www.tiktok.com/@muncixop'],
  ];
  
  data.forEach(([label, href], idx) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = `<span class="n">[${idx + 1}]</span>${label}`;
    a.style.opacity = 0;
    lnk.appendChild(a);
    
    setTimeout(() => {
      a.style.transition = 'opacity .35s ease';
      a.style.opacity = 1;
    }, 120 * idx + 100);
  });
}

// Navegación por teclado rápida (1-3)
addEventListener('keydown', e => {
  const links = lnk.querySelectorAll('a');
  const n = parseInt(e.key, 10) - 1;
  if (n >= 0 && n < links.length) {
    location.href = links[n].href;
  }
});

// Glitches visuales aleatorios de la interfaz
setInterval(() => {
  if (Math.random() > .92) {
    term.classList.add('shake');
    term.style.boxShadow = '0 0 60px #f0f3,0 0 120px #0ff1';
    setTimeout(() => {
      term.classList.remove('shake');
      term.style.boxShadow = '';
    }, 120);
  }
}, 3000);
